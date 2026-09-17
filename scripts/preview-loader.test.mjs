import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";

const source = ts.transpileModule(
  readFileSync(new URL("../src/lib/preview-loader.ts", import.meta.url), "utf8"),
  { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } },
).outputText;
const context = {
  exports: {},
  setTimeout(callback, delay) {
    assert.ok(this == null || this === context, "Timer must not be invoked with the loader as receiver");
    return setTimeout(callback, delay);
  },
  clearTimeout(timer) {
    assert.ok(this == null || this === context, "Timer must not be invoked with the loader as receiver");
    clearTimeout(timer);
  },
};
vm.runInNewContext(source, context);
const { createPreviewLoader, PREVIEW_WAIT_MS } = context.exports;
const settle = () => new Promise(resolve => setImmediate(resolve));

function fixture() {
  const timers = new Map();
  const attempts = [];
  const events = [];
  let id = 0;
  const loader = createPreviewLoader(() => new Promise((resolve, reject) => attempts.push({ resolve, reject })), {
    setTimeout(callback, delay) {
      assert.equal(delay, PREVIEW_WAIT_MS);
      timers.set(++id, callback);
      return id;
    },
    clearTimeout(key) { timers.delete(key); },
  });
  return {
    attempts, events, timers,
    request(name) {
      return loader.request({
        ready: value => events.push([name, "ready", value]),
        failed: () => events.push([name, "failed"]),
        cancelled: () => events.push([name, "cancelled"]),
      });
    },
    expire() { for (const callback of [...timers.values()]) callback(); },
  };
}

test("no eager import; competing cards share a download and only the latest opens", async () => {
  const f = fixture();
  assert.equal(f.attempts.length, 0);
  f.request("first");
  f.request("second");
  await settle();
  assert.equal(f.attempts.length, 1);
  f.attempts[0].resolve("modal");
  await settle();
  assert.deepEqual(f.events, [["first", "cancelled"], ["second", "ready", "modal"]]);
  assert.equal(f.timers.size, 0);
  f.request("cached");
  await settle();
  assert.equal(f.attempts.length, 1);
  assert.deepEqual(f.events.at(-1), ["cached", "ready", "modal"]);
});

test("Escape or unmount cancels late success and late failure without fallback", async () => {
  for (const outcome of ["resolve", "reject"]) {
    const f = fixture();
    const cancel = f.request("dismissed");
    await settle();
    cancel();
    cancel();
    f.attempts[0][outcome]("late result");
    await settle();
    f.expire();
    assert.deepEqual(f.events, [["dismissed", "cancelled"]]);
    assert.equal(f.timers.size, 0);
  }
});

test("deadline falls back once and ignores a late successful download", async () => {
  const f = fixture();
  f.request("slow");
  await settle();
  f.expire();
  f.attempts[0].resolve("late modal");
  await settle();
  assert.deepEqual(f.events, [["slow", "failed"]]);
  assert.equal(f.timers.size, 0);
});

test("failed downloads fall back once and a later card can retry", async () => {
  const f = fixture();
  f.request("failed");
  await settle();
  f.attempts[0].reject(new Error("offline"));
  await settle();
  f.expire();
  assert.deepEqual(f.events, [["failed", "failed"]]);
  f.request("retry");
  await settle();
  assert.equal(f.attempts.length, 2);
  f.attempts[1].resolve("recovered modal");
  await settle();
  assert.deepEqual(f.events.at(-1), ["retry", "ready", "recovered modal"]);
});

test("default timer adapter preserves browser timer invocation and clears on completion", async () => {
  const events = [];
  const loader = createPreviewLoader(async () => "modal");
  loader.request({ ready: value => events.push(value), failed: assert.fail, cancelled: assert.fail });
  await settle();
  assert.deepEqual(events, ["modal"]);
});
