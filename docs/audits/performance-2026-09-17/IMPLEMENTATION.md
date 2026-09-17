# Performance implementation queue

User authorization, 2026-09-17: finish the best audit recommendations, one project
at a time. Understand each project in detail and finish its verification/live
publication before opening the next. This original sequencing instruction was
superseded by explicit parallel-work authorization below.

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
| Candidate, browser acceptance pending | Upkeep/Fitout: 66021a7, draft PR #1. Both private PDFs integrated without home details, 452 model/family records and 12 reference topics. 970 tests, nine HTTP-verifier tests, all three builds and 44/460 owner-route HTTP checks pass. Catalogue completeness and browser/publication gates remain. Retain remaining Fitout cache work. |
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


### Upkeep/Fitout knowledge checkpoint, 2026-09-17

Source `0dd5dd9`, draft https://github.com/ArnavGoel03/upkeep/pull/1, integrates
all three private reference PDFs with public citations and no home details.
825 canonical model/family records span 42 ranges and 21 manufacturers; graph
projection has 1,164 nodes and 2,063 authored/structural edges. All 13 existing
videos have source previews and visible play controls. Search retry and handoff
repairs reuse shared helpers. Exact descriptions/specifications cite their sources.

1,001 tests, nine verifier tests, lint and three production builds pass; local
HTTP covers 45 Upkeep and 834 Fitout reference/model routes. Current Vercel previews
were blocked before building by spend-management enforcement. Earlier preview
success belongs to `66021a7`. Full browser/keyboard acceptance and publication
remain held, and catalogue/manual coverage is bounded rather than exhaustive.

## Claude audit repair queue, 17 September 2026

Owner explicitly authorized subagents and parallel project repairs at 22:21 IST.
This supersedes sequential-only implementation. One writer per target; preserve
existing work and validate findings against current code and live deployments.
The supplied audit reviewed 465 commits across 25 repositories, excluded Upkeep,
and did not run most builds. Its assertions are inputs to verify, not new receipts.

| Status | Owner | Finding and acceptance |
|---|---|---|
| Verified changed | Root | Disk now has about 20 GiB available. Another session cleared regenerable caches; no further deletion requested or performed here. |
| Merged, promotion held | Studio agent | PR17 source 63a9c5f removes studio telemetry, preserves recovery and restores Prize Wheel probe. 167 application/33 release tests, functional Chromium/WebKit and 144 HTTP checks pass. WebKit 840 ms exceeds unchanged 750 ms budget; controlled diagnosis continues. |
| Exact proposal awaiting owner | Studio agent | Legal corrections in simplegames/docs/LEGAL-APPROVAL.diff are checked and reviewable; no new legal copy published. Fair-play uses earlier approved About text. Gallery/probe reviewed in project receipt. |
| Merged | Studio agent | PR16 merged bef637a; live/main ancestry mismatch resolved. Later telemetry candidate is merged but not promoted, so live remains prior 0.5.2. |
| Local/D1 fixed; frontend held | Atlas agent | PR17 and PR18 merged through b217566. Canonical briefing: 131 actions, 114 open; missing Chaupal/Serenity/Gondilal records retained. 58 tests/typecheck/build pass with existing adapter warning; 27 D1 fields across 11 projects read back. One Halation identity added. Bundled frontend remains held. |
| Local fix; push blocked | Trove agent | d1a7c92 fixes reproduced rollback defect; 22 installer + 81 shared tests and 178-file lint pass. Normal pre-push refused Relay sandbox/Tend SwiftData build failures; no bypass or installation. |
| Merged, hosting paused | Repair agent | Buzz PR2 merge 66846ab preserves profile and retry during event-fetch failure. 11 tests, typecheck/build, four browser cases and desktop/phone screenshots pass. Public 503 is Vercel spend-budget pause, not a verified code regression. |
| Merged, private launch held | Repair agent | Unmet PR2 merge 8ddf8dd integrates stranded hardening and fixes moderated titles leaking through undone-fold history. 25 tests, lint/types/build and disposable HTTP pass. No public host; copy/browser/moderator/persistence gates remain. |
| Complete locally | Root | Standards a4aa577 on clean main: preserved the existing uncommitted lessons, corrected garbled date text, retained a byte-verified local checklist image. No remote configured; no private charter copied into projects. |
| PR publication in progress | Root | Portfolio audit/index queue is preserved on docs/performance-audit-20260917; documentation changes only. Shared dirty checkouts remain untouched. |
| Draft PR9 | Restaurant agent | 3c2fdec fixes active quotas, paginated history and seated overrun; strategy updated with primary competitor sources. 10 HTTP/SQLite tests, lint, types and build pass. Postgres connection/sandbox gate blocked; production 0.4.0 unchanged. Stable client rotation/receipt retention remain. |
| Released and verified, hosting recheck needed | Repair agent | Collab 6012c9a fails closed on partial auth and corrects current/historical STATE. 562 tests and 51 live checks passed deployment dpl_9GcDsXBWtdutdKtkEag3EJLjGvDK before later team spend pause. No founder visual sign-in claimed. |
| Audited; editorial work held | Repair agent | Gondilal PR23 d5c38de preserves removal: original substantive paragraph promised perpetual gains and cannot safely be restored. Unrelated dirty files preserved. Existing investment guide needs dated tax/product review; image credentials remain separate. CI billing blocked. |
| Rationale resolved; gates held | Repair agent | Pidilite 50a3321 restores comments, dataset/syntax checks pass; browser CI receives zero steps due billing. Halation rationale already committed 1c43129/dfd7921. Its permission detector misses uses-permission-sdk-23, calibrated source fixture; active writer owns that file, fix still needed. |
| Seen documented; branch review partial | Root | Seen b5d0f57 documents Node24 as supported Vercel runtime, confirmed by provider deployment metadata; no invented Node26 failure. Shared dirty checkouts preserved. Broader branch/deploy review remains partial. |
| Pushed candidate; publication held | Root | Upkeep 0dd5dd9 has all three PDFs, source provenance, 13 video previews, bounded product/manual data and shared helper repairs. 1,001 tests and local HTTP pass. Browser and spend-budget deployment gates remain. |

No operator interviews, new public legal wording, paid infrastructure, scheduled
jobs or third-party outreach are authorized by this repair queue. Personal shared
memory remains local and inactive until its model/provider privacy route is settled.

### Provider availability, 17 September 2026

Vercel `/v3/events` records 47 projects paused at 23:02:45 IST because the
spend-management budget was reached. Buzz, Seen and Pidilite named events are
confirmed; their public routes return 503 DEPLOYMENT_PAUSED. Upkeep's three new
previews are BLOCKED before build. Team Pro billing remains active; this is not
the separate GitHub Actions failed-payment gate. No spending limit, pause,
paid plan or provider setting was changed. Earlier successful deployments are
historical evidence, not proof of current availability.

Watch Together's demo scheduling/retry repair and Stature's batched checkout
lookup are now in progress. Serenity's native lab detail/update contract remains
queued, alongside the original unresolved projects above. Private shared memory
is not activated while the provider privacy route remains unresolved.
