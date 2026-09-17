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
  for (const name of chunks.filter(name => name.endsWith(".js"))) {
    const bytes = await readFile(`.next/static/chunks/${name}`);
    if (bytes.includes("capture_dead_clicks") && bytes.includes("sessionRecordingStarted")) sdkPaths.push(`/_next/static/chunks/${name}`);
  }
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
    page.on("pageerror", error => errors.push(error.message));
    const sdkRequests = [];
    page.on("request", request => {
      if (sdkPaths.includes(new URL(request.url()).pathname)) sdkRequests.push(request.url());
    });
    await page.goto(`${origin}/projects`, { waitUntil: "networkidle" });
    assert.equal(sdkRequests.length, 0, "SDK loaded before idle or interaction");
    const card = page.locator(".card-3d").filter({ has: page.getByRole("heading", { name: "Halation: Two Apps on One Core", exact: true }) });
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
