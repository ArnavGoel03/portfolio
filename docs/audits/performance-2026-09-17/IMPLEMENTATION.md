# Performance implementation queue

User authorization, 2026-09-17: finish the best audit recommendations, one project
at a time. Understand each project in detail and finish its verification/live
publication before opening the next. No parallel project implementation agents.

Follow-up authorization: finish the other projects without stopping for the
Fevicreate browser block. Process each project sequentially; preserve any genuine
verification/deployment blockers explicitly and continue the remaining queue.
Shared rules: `~/dev/standards/BEST_PRACTICES.md`, referenced from shared CORE
and DEVELOP_RULES so every configured harness/agent reads the same source.

| Status | Project | Work |
|---|---|---|
| Awaiting browser verification | Fevicreate | Implemented at 2cd452d, browser harness at b74caf6, draft PR #1. 228 HTTP checks, SQL/restore/static gates and warning-free build pass. Rendered checks blocked by macOS browser denial and GitHub billing rejection (run 35157835149); merge and live verification remain. |
| Live | Review record | PR #3 merged as 5d38b79. Production homepage verified with responsive srcset/sizes, optimized WebP inspected (750px 11,860 bytes; 1080px 21,332 bytes). 142 tests, lint, typecheck and build pass. Browser candidate/layout measurement remains unverified. |
| Live | CUTROOM | PR #1 merged as 3afc6dc. Production HTML contains the reel controls and no intro gate. Removed countdown component/CSS; lint, typecheck, build and calibrated HTML checks pass. Browser interaction measurement unavailable. |
| Live | Q Branch | PR #1 merged as bcad903. Live HTML, CSS, app.js and service worker match source bytes. Fixed boot delay removed; release/cache markers generated consistently. Syntax/calibration checks pass; browser/offline/3D measurements unavailable. |
| Live | Library Walk | PR #1 merged as d813619; production HTML, JS, CSS, polling and SW match source bytes; immutable cache headers verified. HTML 518,348 to 33,297 raw bytes. Lint and 171 API/poll checks pass. Browser/gameplay/offline verification remains unavailable. |
| Candidate; release blocked | Glass Table Games | Implemented at 760e273; five production builds and full gate (4,100 package tests, 102 Node checks) pass. Workerd gzip/identity bytes pass at supported compatibility date. Exact-candidate browsers and runtime date unavailable; promotion and separate studio mirror remain recorded in project LEFTOVERS. |
| Live | Gondilal | PR #22 merged as deaed7d; production v1.2.6 verified on home/shop with private/no-store and fresh matching CSP nonces. Full 412 tests and production build pass. Warm rates avoid DB for 60s; settings batched. Redis-outage consistency window documented; browser device acceptance remains open. |
| Live | Buzz | PR #1 merged as 5ac9b5b. Five live routes return 200; all map routes show the gate; initial JS/CSS excludes map payloads. Seven Node tests, typecheck/build and Chromium desktop/phone run 35163988412 pass. Map/event-list screenshots inspected with a Carto fixture; live tiles, production RLS and native acceptance remain outside this pass. |
| Candidate; browser acceptance pending | PITCREW | a4d34a5 defers GL probe and renderer until scrolling into the visible story. Lint, 56 tests, TypeScript/build and byte budgets pass (137 kB route, 264 kB deferred, Brotli). Required desktop/phone render and network verification unavailable; production unchanged. |
| Relay live; Trove candidate held | Trove / Relay shared core | Relay 0.3.2 public ZIP matches signed universal build, PR #7 merged b67a96c. 81 shared/138 Relay tests, builds, response renders and packaged HTTP smoke pass. Trove signed 1.13.1 candidate held: both it and installed 1.13.0 abort CLI here. Shared draft PR #9 records blocker. Suite website now advertises Relay 0.3.2; production download target verified. |
| Live | Tend | PR #12 merged decba828; public 0.13.3 ZIP matches signed universal build. 164 tests, 56-file iOS typecheck and builds pass; numeric page controls inspected. Aggregated counts/groups and 100-row Logbook pages. Physical iPhone testing remains deferred; installed app remains 0.13.2. Suite website now advertises 0.13.3 and its correct public download. |
| Candidate; release gates blocked | Serenity | 46ef7de adds opt-in report/value cursors, native lazy pages and stale-response guards; removes destructive DB mutation from build. 293 tests, real PostgreSQL 137-report/437-value traversal, typecheck/build and nine native checks pass. Existing lint/DTO failures and missing Xcode project hold release; see project docs/STATE.md. |
| Live | Power Grid | PR #1 merged 1de25f28; Pages build passed and ten live frame attributes match. Chromium run35168433667 passed desktop1440x1000/phone393x852: five/three initial frame requests versus ten in eager control; all six Plotly charts and four tables render on scroll. Reserved heights/viewport bounds pass; screenshots inspected. |

Shared best-practices document and harness references: committed locally in
standards a5f7c55 (latest checklist/image reference; subsequent lessons included). CORE is the shared Codex symlink and Claude import; every
configured agent reads the same BEST_PRACTICES.md. Shipping receipts and remaining work are tracked in the table above.
Fevicreate draft: https://github.com/ArnavGoel03/pidilite-school-checkin/pull/1.

Conditional/archived ideas remain in the audit and are not higher priority than
this queue. Do not silently add paid infrastructure or speculative dependencies.

## Final priority-pass status, 2026-09-17

All 28 portfolio entries have an audit verdict. Every selected priority row above
has been processed sequentially: nine named releases are live (counting Relay
and Tend separately), while five candidates remain held: Fevicreate, Glass Table
Games, PITCREW, Trove and Serenity. Those holds are not completed releases.

The best-practices reference links the original AirDropped image and project
receipts. It remains local in standards, which intentionally has no remote.
Atlas records were updated; its Power Grid identity addition is committed source
only because Atlas has a separate pre-existing undeployed application rebuild.
Do not deploy that larger rebuild as a side effect of updating this audit index.

## Continuation authorized, 2026-09-17

Owner requested "finish all" again. Recheck held release blockers, then process
remaining actionable audit findings one project at a time. This is the current
work queue; the previous final-pass section is a dated checkpoint.

| Status | Remaining work |
|---|---|
| Blocked on browser access | Fevicreate: 3f38352 fixes refresh/focus and export races; build and228 HTTP checks pass. Private Actions attempt2 still refused, no connected browser. Initial fixture transfer increases about5%; no bandwidth win claimed. |
| Checkpoint, unshipped | Glass Table Games: current workerd now certifies2026-08-09; streaming regression fixed by restricting gzip to completed cached prerenders. Full rebuild/browser/publication gates remain. |
| Pending | PITCREW: desktop/phone render and network acceptance, publish |
| Pending | Trove: diagnose CLI failure, verify release and publish |
| Pending | Serenity: repair release gates/client contracts and establish native build |
| Pending | SOMA: pause offscreen/idle rendering |
| Pending | Watch Together: idle demo and failed-embed polling |
| Pending | Quiver: release-request deduplication and scroll work |
| Next, owner priority | Upkeep: audit and extend knowledge graph depth across every aspect, with progressive disclosure; retain Fitout cache repair in queue. |
| Pending | Fevicryl: share repeated scoring work |
| Pending | Portfolio: attribute and defer preview/analytics modules |
| Pending | Vaani: repair runnable baseline before optimizing |
| Pending | Saycut: cancellation and bounded transcription/playback work |
| Pending | Stature: batch cart reads and separate schema work |
| Pending | Meshport and micromobility: reconcile lazy work with offline precache |
| Pending | Meridian, Halation/Emulsion and Larder: measure conditional opportunities before changing |

Coursework entries without identifiable computation source remain artifact-only
audits; no artificial runtime changes are warranted for hosted video links.

### Added acceptance requirement

The owner explicitly requires verification that changes did not break behavior or
make performance worse, and asks whether the checklist delivered real benefits.
For each project compare affected behavior against its previous release, including
failure/cancellation/offline paths where relevant. Record measured benefits,
tradeoffs and unmeasured outcomes separately. Smaller initial payloads alone do
not establish better interaction or scroll-to-ready latency. Revisit the nine
already-live releases for remaining browser/device comparison gaps after the
active project's checks. Do not claim universal improvement or no regressions
from source review, HTTP status, or unit tests alone.

### Upkeep scope added by owner

Inspect how deep the knowledge graph and the rest of Upkeep can go. It must be
thorough in every aspect while progressively disclosing detail to avoid overload.
Establish actual graph/data coverage, provenance, relationship depth, missing
concepts and end-to-end user paths before choosing architecture or UI changes.
Preserve the full cross-project queue and the explicit regression requirement.
