import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { mkdir, readFile, readdir } from "node:fs/promises";
import { createRequire } from "node:module";
import { chromium, expect } from "@playwright/test";

// This runner is for hosted Linux CI. The local Mac cannot launch Chromium.
assert.equal(process.env.CI, "true", "Run browser verification in hosted CI");
assert.equal(process.platform, "linux", "This runner requires the CI Linux host");
const require = createRequire(import.meta.url);
const server = spawn(process.execPath, [require.resolve("next/dist/bin/next"), "start", "--hostname", "127.0.0.1", "--port", "0"], {
  stdio: ["ignore", "pipe", "pipe"],
});
const errors = [];
server.stderr.on("data", chunk => process.stderr.write(chunk));
let browser;
try {
  const origin = await new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("Owned server did not announce readiness")), 20_000);
    let output = "";
    server.once("exit", code => { clearTimeout(timer); reject(new Error(`Server exited ${code}`)); });
    server.stdout.on("data", chunk => {
      output += chunk.toString();
      if (!output.includes("Ready in")) return;
      const match = output.match(/http:\/\/127\.0\.0\.1:\d+/);
      if (match) { clearTimeout(timer); resolve(match[0]); }
    });
  });
  const chunks = await readdir(".next/static/chunks");
  const sdkPaths = [];
  const previewPaths = [];
  for (const name of chunks.filter(name => name.endsWith(".js"))) {
    const bytes = await readFile(`.next/static/chunks/${name}`);
    if (bytes.includes("Cite (DOI)") && bytes.includes("max-w-2xl")) previewPaths.push(`/_next/static/chunks/${name}`);
    if (bytes.includes("capture_dead_clicks") && bytes.includes("sessionRecordingStarted")) sdkPaths.push(`/_next/static/chunks/${name}`);
  }
  assert.ok(previewPaths.length, "Preview positive control missing");
  assert.ok(sdkPaths.length, "SDK positive control missing");
  await mkdir(".firecrawl/browser-20260918", { recursive: true });
  browser = await chromium.launch();
  for (const viewport of [{ width: 1440, height: 1000 }, { width: 393, height: 852 }]) {
    const context = await browser.newContext({ viewport, serviceWorkers: "block" });
    // Hold idle callbacks so the initial assertion covers a busy page before
    // idle initialization. SDK HTTP is a fixture, never a real analytics call.
    await context.addInitScript(() => { window.requestIdleCallback = () => 1; });
    await context.route("**/*", async route => {
      const url = new URL(route.request().url());
      if (url.origin === origin) return route.continue();
      return route.fulfill({ status: 200, contentType: "application/json", body: "{}" });
    });
    const page = await context.newPage();
    page.on("pageerror", error => { errors.push(error.message); console.error("Browser page error:", error.message); });
    const sdkRequests = [];
    const previewRequests = [];
    page.on("request", request => {
      if (previewPaths.includes(new URL(request.url()).pathname)) previewRequests.push(request.url());
      if (sdkPaths.includes(new URL(request.url()).pathname)) sdkRequests.push(request.url());
    });
    await page.goto(`${origin}/projects`, { waitUntil: "networkidle" });
    assert.equal(previewRequests.length, 0, "Preview loaded before intent");
    assert.equal(sdkRequests.length, 0, "SDK loaded before idle or interaction");
    const card = page.locator(".card-3d").filter({ has: page.getByRole("heading", { name: "Halation: Two Apps on One Core", exact: true, includeHidden: true }) });
    await card.scrollIntoViewIfNeeded();
    await card.click({ position: { x: 30, y: 30 } });
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect.poll(() => sdkRequests.length).toBe(1);
    await expect(dialog.getByRole("heading", { name: "Halation: Two Apps on One Core", exact: true })).toBeVisible();
    const bounds = await dialog.boundingBox();
    assert.ok(bounds && bounds.y >= 0 && bounds.y + bounds.height <= viewport.height + 1);
    assert.ok(bounds.x >= 0 && bounds.x + bounds.width <= viewport.width + 1);
    await page.screenshot({ path: `.firecrawl/browser-20260918/modal-open-${viewport.width}.png` });
    await expect.poll(() => dialog.evaluate(node => node.contains(document.activeElement))).toBe(true);
    for (let n = 0; n < 12; n++) {
      await page.keyboard.press(n < 6 ? "Tab" : "Shift+Tab");
      // Base UI redirects focus guards on the next frame. Observe settled
      // containment, not the transient sentinel immediately after Tab.
      await expect.poll(() => dialog.evaluate(node => node.contains(document.activeElement))).toBe(true);
    }
    // The desktop popup fits at 1000px tall. Constrain height to exercise
    // actual overflow rather than expecting a fitting document to scroll.
    if (await dialog.evaluate(node => node.scrollHeight <= node.clientHeight)) {
      await page.setViewportSize({ width: viewport.width, height: 700 });
    }
    await expect.poll(() => dialog.evaluate(node => node.scrollHeight > node.clientHeight)).toBe(true);
    const pageScroll = await page.evaluate(() => scrollY);
    await dialog.hover();
    await page.mouse.wheel(0, 700);
    await expect.poll(() => dialog.evaluate(node => node.scrollTop)).toBeGreaterThan(0);
    assert.equal(await page.evaluate(() => scrollY), pageScroll, "Background scrolled behind dialog");
    await page.screenshot({ path: `.firecrawl/browser-20260918/modal-${viewport.width}.png` });
    await page.keyboard.press("Escape");
    await expect(dialog).toHaveCount(0);
    await card.click({ position: { x: 30, y: 30 } });
    await expect(dialog).toBeVisible();
    await page.mouse.click(2, 2);
    await expect(dialog).toHaveCount(0);
    assert.equal(sdkRequests.length, 1, "Repeated open downloaded SDK again");
    await page.screenshot({ path: `.firecrawl/browser-20260918/projects-${viewport.width}.png` });
    await context.close();
    console.log(`Browser ${viewport.width}x${viewport.height}: deferred SDK, modal bounds, focus, inner scroll, background lock and dismissal pass`);
  }
  // Fresh contexts keep module cache from hiding chunk failures or delays.
  for (const scenario of ["delayed", "escape", "unmount", "failed", "timeout", "latest"]) {
    const context = await browser.newContext({ viewport: { width: 393, height: 852 }, serviceWorkers: "block" });
    await context.addInitScript(() => { window.requestIdleCallback = () => 1; });
    let release;
    let intercepted = 0;
    const held = new Promise(resolve => { release = resolve; });
    await context.route("**/*", async route => {
      const url = new URL(route.request().url());
      if (url.origin !== origin) return route.fulfill({ status: 200, contentType: "application/json", body: "{}" });
      if (previewPaths.includes(url.pathname)) {
        intercepted++;
        if (scenario === "failed") return route.abort("failed");
        await held;
      }
      return route.continue();
    });
    const page = await context.newPage();
    page.on("pageerror", error => { errors.push(error.message); console.error("Browser page error:", error.message); });
    const completed = [];
    page.on("requestfinished", request => {
      if (previewPaths.includes(new URL(request.url()).pathname)) completed.push(request.url());
    });
    try {
      await page.goto(`${origin}/projects`, { waitUntil: "networkidle" });
      assert.equal(intercepted, 0, "Preview requested before intent");
      const cards = page.locator(".card-3d");
      const card = cards.filter({ has: page.getByRole("heading", { name: "Halation: Two Apps on One Core", exact: true, includeHidden: true }) });
      const detail = await card.getByRole("link", { name: "Details", exact: true }).getAttribute("href");
      await card.click({ position: { x: 30, y: 30 } });
      await expect.poll(() => intercepted).toBeGreaterThan(0);
      const dialog = page.getByRole("dialog");
      if (scenario === "failed") {
        await expect(page).toHaveURL(`${origin}${detail}`);
        await expect(dialog).toHaveCount(0);
      } else {
        await expect(card).toHaveAttribute("aria-busy", "true");
        await expect(card.getByRole("status")).toBeVisible();
        await expect(dialog).toHaveCount(0);
        if (scenario === "delayed") {
          await page.screenshot({ path: ".firecrawl/browser-20260918/preview-pending-393.png" });
          release();
          await expect(dialog).toBeVisible();
          await expect(card).toHaveAttribute("aria-busy", "false");
        } else if (scenario === "latest") {
          const next = cards.filter({ hasNot: page.getByRole("heading", { name: "Halation: Two Apps on One Core", exact: true }) }).first();
          const title = await next.getByRole("heading").innerText();
          await next.click({ position: { x: 30, y: 30 } });
          await expect(card).toHaveAttribute("aria-busy", "false");
          release();
          await expect(dialog.getByRole("heading", { name: title, exact: true })).toBeVisible();
          await expect(dialog).toHaveCount(1);
        } else {
          if (scenario === "escape") {
            await page.keyboard.press("Escape");
            await expect(card).toHaveAttribute("aria-busy", "false");
          } else if (scenario === "unmount") {
            await card.getByRole("link", { name: "Details", exact: true }).click();
            await expect(page).toHaveURL(`${origin}${detail}`);
          } else {
            await expect(page).toHaveURL(`${origin}${detail}`, { timeout: 10_000 });
          }
          release();
          await expect.poll(() => completed.length).toBeGreaterThan(0);
          // Allow the imported module and React update to settle after download.
          await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
          await expect(dialog).toHaveCount(0);
          await expect(page).toHaveURL(`${origin}${scenario === "escape" ? "/projects" : detail}`);
        }
      }
      console.log(`Preview ${scenario}: pass`);
    } finally {
      release();
      await context.close();
    }
  }
  assert.deepEqual(errors, [], "Browser page errors");
} finally {
  await browser?.close();
  if (server.exitCode === null) {
    const exited = new Promise(resolve => server.once("exit", resolve));
    server.kill("SIGTERM");
    const timer = setTimeout(() => server.kill("SIGKILL"), 3000);
    await exited;
    clearTimeout(timer);
  }
}
