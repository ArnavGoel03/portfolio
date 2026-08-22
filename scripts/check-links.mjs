#!/usr/bin/env node
// Every address this site sends a reader to, fetched.
//
// Deliberately NOT in the CI gate. It talks to thirty other people's servers,
// so it fails for reasons that have nothing to do with this repository: a rate
// limit, a slow cold start, somebody else's outage. A gate that goes red on
// somebody else's bad afternoon is a gate people learn to ignore. Run it by
// hand every month or so, and before anything that matters.
//
// It reports four things, and the first pass reported the wrong two, which is
// the reason the categories exist at all:
//
//   BROKEN   the link does not resolve. Fix it or remove it.
//   GATED    it resolves to a sign-in page and the data does not say so. Green
//            to a script, useless to a recruiter, which is the worst kind of
//            link on a portfolio. A surface that carries `gated: "..."` is
//            already rendered with that warning beside it, so it is expected
//            and reported as EXPECTED rather than as a finding. A checker that
//            flags what the site already tells the reader is a checker nobody
//            runs twice.
//   STALE    it resolves through a redirect to a different host. Working today
//            and pointing at a name somebody else controls. `web-eta-two-84`
//            sat on the Buzz card for months as a 308 to `buzzcampus`, because
//            a redirect is exactly as green as a real link right up to the day
//            it is not.
//   UNCHECKED  the host refuses robots. LinkedIn answers HTTP 999 to anything
//            that is not a browser; reporting that as broken trains you to
//            ignore the report, which is worse than not running it.
//
// Usage: node scripts/check-links.mjs

import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const SOURCES = [
  "src/lib/projects.ts",
  "src/lib/case-studies.ts",
  "src/lib/collections.ts",
  "src/lib/constants.ts",
  "public/llms.txt",
];

const urls = new Set();
/** URLs the data already labels as needing a sign-in, with that label. */
const declaredGated = new Map();
for (const file of SOURCES) {
  const text = readFileSync(join(ROOT, file), "utf8");
  for (const match of text.matchAll(/https?:\/\/[^\s"'`)<>\]]+/g)) {
    // Trailing punctuation belongs to the prose, not to the address.
    const url = match[0].replace(/[.,;:]+$/, "");
    urls.add(url);
    // `gated` sits a line or two below the `href` it belongs to, inside the
    // same object literal. Reading forward a few hundred characters is enough
    // to pair them without parsing TypeScript for one field.
    const nearby = text.slice(match.index, match.index + 400);
    const declared = /gated:\s*"([^"]+)"/.exec(nearby.split(/\n\s*\},?\n/)[0] ?? "");
    if (declared) declaredGated.set(url, declared[1]);
  }
}

// Its own pages are covered by the sitemap and by the build, and hammering
// them from here would report this site's own cold start as a defect.
const external = [...urls].filter((u) => !u.startsWith("https://arnavgoel.dev")).sort();

const broken = [];
const gated = [];
const stale = [];
const unchecked = [];
const expected = [];

/** Hosts that answer a script differently from a browser. Not defects. */
const REFUSES_ROBOTS = /(^|\.)linkedin\.com$/;

/** A redirect that is the destination's own canonical form, not a move. */
const CANONICAL_PAIRS = [
  [/(^|\.)youtu\.be$/, /(^|\.)youtube\.com$/],
  [/(^|\.)goo\.gl$/, /(^|\.)google\.com$/],
];

/** Somewhere a reader lands and is asked who they are. */
const SIGN_IN = /accounts\.google\.com|\/login|\/signin|auth0\.com|okta\.com/i;

await Promise.all(
  external.map(async (url) => {
    const control = new AbortController();
    const timer = setTimeout(() => control.abort(), 20000);
    try {
      const response = await fetch(url, {
        redirect: "follow",
        signal: control.signal,
        // Some hosts serve a challenge page to a bare fetch and 200 to a
        // browser. This is not evasion, it is asking the question a reader's
        // browser would ask.
        headers: { "user-agent": "Mozilla/5.0 (portfolio link check)" },
      });
      const from = new URL(url).host;
      const to = new URL(response.url).host;
      const canonical = CANONICAL_PAIRS.some(([a, b]) => a.test(from) && b.test(to));
      if (REFUSES_ROBOTS.test(from)) unchecked.push(`${url} (HTTP ${response.status} to a script)`);
      else if (response.status >= 400) broken.push(`${response.status}  ${url}`);
      else if (SIGN_IN.test(response.url)) {
        const declared = declaredGated.get(url);
        if (declared) expected.push(`${url} (labelled "${declared}")`);
        else gated.push(`${url}\n         asks the reader to sign in, and nothing on the page warns them`);
      }
      else if (response.redirected && to !== from && !canonical)
        stale.push(`${url}\n         now serves ${response.url}`);
    } catch (error) {
      if (REFUSES_ROBOTS.test(new URL(url).host)) unchecked.push(`${url} (${error.name})`);
      else broken.push(`${error.name.padEnd(4)}  ${url}`);
    } finally {
      clearTimeout(timer);
    }
  }),
);

for (const line of broken) console.log(`BROKEN    ${line}`);
for (const line of gated) console.log(`GATED     ${line}`);
for (const line of stale) console.log(`STALE     ${line}`);
for (const line of unchecked) console.log(`UNCHECKED ${line}`);
for (const line of expected) console.log(`EXPECTED  ${line}`);
console.log(
  `\n${external.length} links: ${broken.length} broken, ${gated.length} behind a sign-in, ` +
    `${stale.length} redirecting elsewhere, ${unchecked.length} unreachable by a script, ` +
    `${expected.length} gated and labelled as such.`,
);
// Broken and gated both mean a reader hits a wall. The other two are notes.
process.exit(broken.length + gated.length > 0 ? 1 : 0);
