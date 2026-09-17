import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";

const source = ts.transpileModule(
  readFileSync(new URL("../src/lib/analytics.ts", import.meta.url), "utf8"),
  { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } },
).outputText;

function fixture({ token = "test-token", hostname = "example.test", server = false, fail = false } = {}) {
  const calls = [];
  let imports = 0;
  let failing = fail;
  const client = {
    init: (...args) => calls.push(["init", ...args]),
    capture: (...args) => calls.push(["capture", ...args]),
  };
  const context = {
    exports: {},
    process: { env: { NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN: token } },
    ...(server ? {} : { window: { location: { hostname } } }),
    require(name) {
      assert.equal(name, "posthog-js");
      imports++;
      if (failing) throw new Error("fixture import failure");
      return { __esModule: true, default: client };
    },
  };
  vm.runInNewContext(source, context);
  return {
    ...context.exports,
    calls,
    imports: () => imports,
    recover: () => { failing = false; },
  };
}

test("module evaluation is idle; concurrent route and click events initialize once and retain order", async () => {
  const f = fixture();
  assert.equal(f.imports(), 0);
  f.track("$pageview", { $current_url: "/projects" });
  f.track("project_card_open", { project_id: "serenity" });
  const first = f.loadAnalytics();
  assert.equal(first, f.loadAnalytics());
  await first;
  assert.equal(f.imports(), 1);
  assert.deepEqual(f.calls.map(call => call.slice(0, 2)), [
    ["init", "test-token"], ["capture", "$pageview"], ["capture", "project_card_open"],
  ]);
  assert.equal(f.calls[0][2].capture_pageview, false);
  assert.equal(f.calls[0][2].session_recording.maskAllInputs, true);
  assert.equal(f.calls[1][2].$current_url, "/projects");
  f.track("contact_form_submit");
  assert.equal(f.calls.at(-1)[1], "contact_form_submit");
  assert.equal(f.imports(), 1);
});

test("disabled, localhost and server paths never import or capture", async () => {
  for (const options of [{ token: "" }, { hostname: "localhost" }, { server: true }]) {
    const f = fixture(options);
    f.track("project_card_open");
    assert.equal(await f.loadAnalytics(), null);
    assert.equal(f.imports(), 0);
    assert.equal(f.calls.length, 0);
  }
});

test("failed import does not reject into UI and a later interaction can retry", async () => {
  const f = fixture({ fail: true });
  f.track("old_event");
  assert.equal(await f.loadAnalytics(), null);
  f.recover();
  f.track("new_event");
  await f.loadAnalytics();
  assert.equal(f.imports(), 2);
  assert.deepEqual(f.calls.map(call => call[1]), ["test-token", "new_event"]);
});

test("events accumulated during a delayed import have a bounded queue", async () => {
  const f = fixture();
  for (let n = 0; n < 150; n++) f.track(`event_${n}`);
  await f.loadAnalytics();
  assert.equal(f.calls.length, 101);
  assert.equal(f.calls[1][1], "event_50");
  assert.equal(f.calls.at(-1)[1], "event_149");
});
