import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // Every image on this site is a pre-cropped, pre-compressed local .webp
      // in /public, sized for the slot it fills. next/image would hand those
      // same files to Vercel's image optimizer, which is metered, to redo work
      // that is already done at build time. Plain <img> with loading="lazy" is
      // the deliberate choice here, so the rule is off rather than disabled
      // line by line in five files.
      "@next/next/no-img-element": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Build output, not source. `pnpm cf:build` writes a bundled copy of the
    // whole app plus the OpenNext runtime here, and linting it reports other
    // people's `require()` calls and unused catch bindings as defects in this
    // repository. Both directories are gitignored; this is the same statement
    // made to the linter.
    ".open-next/**",
    ".wrangler/**",
  ]),
]);

export default eslintConfig;
