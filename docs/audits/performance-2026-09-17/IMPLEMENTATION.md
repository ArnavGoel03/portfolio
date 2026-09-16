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
| In progress | Gondilal | Tracing rate refresh, cache invalidation and settings callers. |
| Queued | Buzz | Visibility-gated map; complete organization history where practical |
| Queued | PITCREW | Actual visibility gate for heavy scene |
| Queued | Trove / Relay shared core | Bounded cached response formatting off main; verify both apps sequentially |
| Queued | Tend | Reuse derived counts/groups and bound history; preserve deferred iPhone testing |
| Queued | Serenity | Navigable lab archive, compatible API/native consumption |
| Queued | Power Grid | Lazy chart/table frames with stable dimensions |

Shared best-practices document and harness references: committed locally in
standards c991a32. CORE is the shared Codex symlink and Claude import; every
configured agent reads the same BEST_PRACTICES.md. Shipping receipts and remaining work are tracked in the table above.
Fevicreate draft: https://github.com/ArnavGoel03/pidilite-school-checkin/pull/1.

Conditional/archived ideas remain in the audit and are not higher priority than
this queue. Do not silently add paid infrastructure or speculative dependencies.
