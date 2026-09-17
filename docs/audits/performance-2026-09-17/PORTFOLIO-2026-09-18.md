# Portfolio initial JavaScript and preview continuation

Baseline: merged main `369d366`. Verified candidate: `e936ac4`, PR2.
Public `/projects` returns HTTP 503 `DEPLOYMENT_PAUSED`. Local browser discovery
is empty; rendered acceptance below comes from hosted Linux Chromium.

The static import in `lib/analytics.ts` forced PostHog into initial scripts.
One lazy loader now owns initialization and capture for both instrumentation
and interactions. It preserves initialization settings and event names,
coalesces imports and queues early events in order. Failed loads discard the
bounded 100-event queue and permit retry; outage delivery is not guaranteed.

The project preview is imported on demand. One loader coalesces imports, caches
successful loading, bounds each wait to eight seconds and makes the latest card
request win. Escape and unmount cancel the consumer so late imports cannot open
an old dialog or redirect. Failure/timeout navigates to the existing project
detail route. Pending feedback reuses the existing spinner and project title;
existing modal content and public wording are unchanged.

## Build evidence

Distinct script src references in locally built production HTML, same lockfile.
Gzip is a level-9 estimate, not negotiated wire transfer or browser timing.
Routes can also load transitive/dynamic imports.

| Route | Baseline raw JS | Candidate raw JS | Baseline gzip estimate | Candidate gzip estimate |
| --- | ---: | ---: | ---: | ---: |
| Home | 1,182,250 | 858,544 | 379,118 | 274,988 |
| Projects | 1,211,229 | 887,636 | 389,833 | 285,489 |
| Contact | 1,125,046 | 871,890 | 361,744 | 278,992 |

Home/projects save about 324 KB raw and 104 KB gzip estimate overall. Preview
splitting contributes 70,605/70,492 raw bytes versus the analytics-only build.
The emitted SDK and preview chunks remain available but are absent from initial
HTML; emitted-module positive controls calibrate both absence checks.

Hosted output differs slightly with platform/build environment: raw/gzip9
home 858,513/275,400, projects 887,605/285,939, contact 871,859/279,426.
No LCP/INP or first-preview latency improvement is claimed. A first preview now
needs its deferred module; the delayed/error tests qualify that tradeoff.

## Verification

[Hosted gate 35266518327](https://github.com/ArnavGoel03/portfolio/actions/runs/35266518327)
passes at exact candidate `e936ac4`: nine calibrated production-module tests,
lint, TypeScript, crawler index, warning-free build and initial-bundle checks.
The receiver-sensitive timer regression fails the original incorrect binding.

Chromium covers desktop 1440 and phone 393 widths: modal viewport bounds,
settled focus, actual inner scrolling, background lock, Escape/backdrop dismissal,
analytics scheduling, delayed preview, cancellation, unmount, failed download,
eight-second deadline and competing-card selection. No page errors occurred.
External analytics are intercepted with fixtures. Final pending/open/scrolled
screenshots were inspected; layout is preserved and scrolling remains contained.
Artifacts are attached to the run, with local copies under
`.firecrawl/browser-20260918-run35266518327`.

Initial harness runs exposed a native timer receiver defect (fixed in source)
and test assumptions about focus/overflow/hidden background content (fixed
in the harness). Final success belongs to the exact corrected candidate above.

## Remaining acceptance

Hosting restoration and live verification remain. Browser coverage is Chromium,
not all engines/devices; real production analytics delivery, contact completion
and LCP/INP comparisons remain unmeasured. This is verified source, not a live
release. No spending setting or local browser restriction was changed.
