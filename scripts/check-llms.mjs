#!/usr/bin/env node
// Holds the two files an AI crawler reads to the two files a person reads.
//
// `public/llms.txt` and `public/llms-full.txt` are hand written. Nothing
// generates them and nothing imports from them, so they drift silently, and on
// 22 August 2026 all three ways of drifting were true at once: eight shipped
// projects were missing entirely, the games studio was described under a name
// it had stopped using days earlier, and the GPA read 3.96 in two places while
// the audited figure in `lib/constants.ts` was 3.913. A crawler had been served
// all of it for weeks.
//
// Generating the files instead was the other option and is worse. The entries
// carry real editorial judgement, a sentence each about what a thing is and why
// it was built, and a generator would flatten that into a list of tags. So the
// prose stays hand written and this checks the two things a human forgets:
// every project is mentioned, and the numbers match their source.
//
// Run by `pnpm check:llms`, which the CI gate runs.

import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const read = (path) => readFileSync(join(ROOT, path), "utf8");

const problems = [];

const projectsSource = read("src/lib/projects.ts");
const constantsSource = read("src/lib/constants.ts");
const index = read("public/llms.txt");
const full = read("public/llms-full.txt");

/**
 * Every project's title, straight out of the source of truth.
 *
 * Parsed rather than imported: `projects.ts` imports through the `@/` alias,
 * which a plain Node script cannot resolve without a bundler, and a check that
 * needs a build step is a check that gets skipped. The shape it parses is
 * enforced by the count assertion below.
 */
const titles = [...projectsSource.matchAll(/^\s{2,4}title: "([^"]+)"/gm)].map((m) => m[1]);

// Calibration, and the most important line in the file. A regex that silently
// matches nothing passes every other assertion here forever, which is a check
// that reports "all good" precisely when the file it reads has been restructured
// out from under it.
const FEWEST_PLAUSIBLE = 15;
if (titles.length < FEWEST_PLAUSIBLE) {
  console.error(
    `check:llms cannot read src/lib/projects.ts: found ${titles.length} titles, expected at least ${FEWEST_PLAUSIBLE}.\n` +
      "The file's shape changed. Fix the pattern in this script rather than lowering the floor.",
  );
  process.exit(1);
}

/**
 * The name a reader would search for, which is the title up to its colon.
 *
 * "Glass Table Games: A Studio of Provably Fair Board and Card Games" is listed
 * as "Glass Table Games", and the subtitle is prose that belongs in the entry
 * rather than in its name.
 */
const nameOf = (title) => title.split(":")[0].trim();

const projectsSection = index.slice(index.indexOf("## Projects"), index.indexOf("## Experience"));
if (projectsSection.length < 500) {
  problems.push("public/llms.txt has no readable '## Projects' section, so nothing below was checked.");
}

for (const title of titles) {
  const name = nameOf(title);
  if (!projectsSection.includes(name)) {
    problems.push(
      `public/llms.txt never mentions "${name}", which ships as a project in src/lib/projects.ts.`,
    );
  }
}

/**
 * The GPA figures, which exist as numbers in one place and as prose in three.
 *
 * `lib/constants.ts` is the source, sourced in turn from the official degree
 * audit. Both text files quote it, and quoting is how 3.96 survived in
 * llms-full.txt long after the audited number moved.
 */
const gpaOf = (name) => {
  const found = new RegExp(`export const ${name} = ([0-9.]+)`).exec(constantsSource);
  return found ? found[1] : null;
};

for (const name of ["UC_GPA", "MAJOR_GPA", "MINOR_GPA"]) {
  const value = gpaOf(name);
  if (value === null) {
    problems.push(`src/lib/constants.ts no longer exports ${name}, so the GPA in the text files is unchecked.`);
    continue;
  }
  // Trailing zeros are a formatting choice, not a different number: 3.86 in the
  // constant and 3.860 in the prose are the same GPA, and demanding one form
  // would fail an accurate file.
  const forms = [value, Number(value).toFixed(3), Number(value).toFixed(2)];
  for (const [file, text] of [
    ["public/llms.txt", index],
    ["public/llms-full.txt", full],
  ]) {
    if (!forms.some((form) => text.includes(form))) {
      problems.push(`${file} does not quote ${name} (${value}) in any form. It is stale or missing.`);
    }
  }
}

/**
 * Any GPA-shaped number in the prose that is not one of the three real ones.
 *
 * This is the assertion that would have caught 3.96. A missing figure is
 * invisible; a wrong figure is a claim, and a wrong claim about a transcript on
 * the page a recruiter's crawler reads is the worst kind of stale on this site.
 */
const real = new Set(
  ["UC_GPA", "MAJOR_GPA", "MINOR_GPA"]
    .map(gpaOf)
    .filter(Boolean)
    .flatMap((value) => [value, Number(value).toFixed(3), Number(value).toFixed(2)]),
);
for (const [file, text] of [
  ["public/llms.txt", index],
  ["public/llms-full.txt", full],
]) {
  for (const match of text.matchAll(/GPA[^.\n]{0,40}?([0-9]\.[0-9]{2,3})/g)) {
    if (!real.has(match[1])) {
      problems.push(`${file} claims a GPA of ${match[1]}, which is not in src/lib/constants.ts.`);
    }
  }
}

if (problems.length > 0) {
  console.error(`The files a crawler reads disagree with the site in ${problems.length} place${problems.length === 1 ? "" : "s"}:\n`);
  for (const problem of problems) console.error(`  ${problem}`);
  console.error("\nBoth files are hand written. Edit them in the same commit as src/lib/projects.ts.");
  process.exit(1);
}

// Says what was actually checked, and no more. Coverage is asserted against
// llms.txt alone, because that file is the index and every project belongs in
// it; llms-full.txt is a curated subset of detailed write-ups and most projects
// are deliberately absent from it, so the same assertion there would fail on a
// correct file. The GPA assertions above do cover both. The older wording
// claimed llms-full.txt was checked for coverage too, which was a green tick on
// something nothing had looked at.
console.log(
  `llms.txt: all ${titles.length} projects are listed. Both files: every GPA matches lib/constants.ts.`,
);
