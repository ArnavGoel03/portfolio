import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";

// Same harness as analytics.test.mjs: transpile the real module, no bundler.
const source = ts.transpileModule(
  readFileSync(new URL("../src/lib/mailto.ts", import.meta.url), "utf8"),
  { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } },
).outputText;
const context = { exports: {}, encodeURIComponent };
vm.runInNewContext(source, context);
const { buildMailto, contactMailto } = context.exports;

test("spaces are %20, never +", () => {
  const url = buildMailto("a@b.co", { subject: "Hello there friend" });
  assert.equal(url, "mailto:a@b.co?subject=Hello%20there%20friend");
});

test("characters that would break the query are escaped", () => {
  const url = buildMailto("a@b.co", { body: "a&b=c?d#e 100%\nnext" });
  assert.equal(url, "mailto:a@b.co?body=a%26b%3Dc%3Fd%23e%20100%25%0Anext");
  assert.equal(new URL(url).searchParams.get("body"), "a&b=c?d#e 100%\nnext");
});

test("empty fields are dropped, and no fields means no query", () => {
  assert.equal(buildMailto("a@b.co", { subject: "", body: undefined }), "mailto:a@b.co");
});

test("contact form message round-trips with a signature", () => {
  const url = contactMailto("me@x.dev", { name: "Ada", email: "ada@ex.com", message: "Hi" });
  const params = new URL(url).searchParams;
  assert.equal(params.get("subject"), "Portfolio message from Ada");
  assert.equal(params.get("body"), "Hi\n\nAda · ada@ex.com");
});
