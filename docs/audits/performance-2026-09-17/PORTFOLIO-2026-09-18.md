# Portfolio analytics continuation

Baseline: merged main `369d366`. Public `/projects` returns HTTP 503 with
`x-vercel-error: DEPLOYMENT_PAUSED`, checked after restart on 18 September IST.
Browser selection reports no browser, and supported discovery returns `[]`.

The static import in `lib/analytics.ts` forced PostHog into initial scripts.
One lazy loader now owns initialization and capture for both instrumentation
and interactions. It preserves existing initialization settings and event names,
coalesces imports, queues early events in order and permits retry after failure.
The queue retains the latest 100 events to bound a stalled load. Failed loads
discard pending events, so no delivery guarantee is claimed during an outage.

## Build evidence

Same lockfile, local production builds, distinct script src references in built
HTML. Gzip is a level-9 local estimate, not negotiated wire transfer or browser
request timing. Routes can also load transitive/dynamic imports.

| Route | Baseline raw JS | Candidate raw JS | Baseline gzip estimate | Candidate gzip estimate |
| --- | ---: | ---: | ---: | ---: |
| Home | 1,182,250 | 929,149 | 379,118 | 297,328 |
| Projects | 1,211,229 | 958,128 | 389,833 | 308,046 |
| Contact | 1,125,046 | 871,945 | 361,744 | 279,955 |

The 253,186-byte emitted SDK chunk remains in the build and is absent from
initial HTML. This is the bundle detector's positive control. The net reduction
is 253,101 raw bytes per route after including the small loader changes.

Four production-module tests pass: idle evaluation and shared initialization,
disabled/server paths, failed-import retry and bounded pending events. Tests
transpile the actual TypeScript module and substitute only the external SDK.
Lint, TypeScript, crawler-index check, production build and calibrated bundle
gate pass without warnings. The behavior and bundle gates now run in CI.

## Remaining acceptance

Rendered route/contact/card behavior, network scheduling and LCP/INP comparisons
need an available browser. Hosting restoration is still required for live
verification. This change is a source candidate, not a completed release.

Preview splitting remains separate: its existing dialog already has unresolved
focus, viewport, scroll and dismissal acceptance. Adding asynchronous mounting
without verifying loading/failure/focus behavior would not establish a safe
improvement. No preview module or public wording changed in this candidate.
