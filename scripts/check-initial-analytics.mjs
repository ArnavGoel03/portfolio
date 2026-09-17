import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { gzipSync } from "node:zlib";

const root = new URL("../.next/", import.meta.url);
const chunks = await readdir(new URL("static/chunks/", root));
const runtime = [];
const previews = [];
for (const name of chunks.filter(name => name.endsWith(".js"))) {
  const bytes = await readFile(new URL(`static/chunks/${name}`, root));
  if (bytes.includes("Cite (DOI)") && bytes.includes("max-w-2xl")) {
    previews.push(`/_next/static/chunks/${name}`);
  }
  // Calibrate against the emitted SDK before trusting absence from HTML.
  if (bytes.includes("capture_dead_clicks") && bytes.includes("sessionRecordingStarted")) {
    runtime.push(`/_next/static/chunks/${name}`);
  }
}
assert.ok(previews.length > 0, "Preview positive control must exist in build output");
assert.ok(runtime.length > 0, "PostHog runtime positive control must exist in build output");

const results = {};
for (const route of ["index", "projects", "contact"]) {
  const html = await readFile(new URL(`server/app/${route}.html`, root), "utf8");
  const paths = [...new Set([...html.matchAll(/<script[^>]+src="(\/_next\/[^"?]+)/g)].map(match => match[1]))];
  assert.ok(paths.length > 0, `${route}: script extraction must match`);
  for (const path of [...runtime, ...previews]) {
    assert.ok(!html.includes(path), `${route}: eagerly references deferred runtime ${path}`);
  }
  const files = await Promise.all(paths.map(path => readFile(new URL(path.replace("/_next/", ""), root))));
  results[route] = {
    scripts: paths.length,
    raw: files.reduce((sum, file) => sum + file.length, 0),
    gzipEstimate: files.reduce((sum, file) => sum + gzipSync(file, { level: 9 }).length, 0),
  };
}
console.log(JSON.stringify({ deferredRuntime: runtime, deferredPreviews: previews, routes: results }, null, 2));
