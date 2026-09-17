@AGENTS.md

Read `docs/STATE.md` before editing. `src/lib/analytics.ts` owns the PostHog
loader and event queue; instrumentation and components must reuse it without
static SDK imports. After a build run `node scripts/check-initial-analytics.mjs`;
behavior checks are `node --test scripts/analytics.test.mjs`.
`scripts/browser-check.mjs` is restricted to hosted Linux CI and uses fixture
analytics responses. Never run it locally to bypass the browser launch denial.
