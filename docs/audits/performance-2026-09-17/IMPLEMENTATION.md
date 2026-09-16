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
| Deploying | CUTROOM | Removed the artificial full-screen 2.9-second countdown and unused assets in 91c614c. Existing hero entrance/reel controls remain. Lint, typecheck, build and calibrated generated-HTML check pass; browser verification unavailable. |
| Queued | Q Branch | Nonblocking boot and correct first/repeat/reduced-motion behavior |
| Queued | Library Walk | Versioned external executable/CSS and safe startup/offline caching; polling overlap where verified |
| Queued | Glass Table Games | HTML compression preserving no-transform and deployed cache correctness |
| Queued | Gondilal | Rate cache read-through, freshness/invalidation and batched settings |
| Queued | Buzz | Visibility-gated map; complete organization history where practical |
| Queued | PITCREW | Actual visibility gate for heavy scene |
| Queued | Trove / Relay shared core | Bounded cached response formatting off main; verify both apps sequentially |
| Queued | Tend | Reuse derived counts/groups and bound history; preserve deferred iPhone testing |
| Queued | Serenity | Navigable lab archive, compatible API/native consumption |
| Queued | Power Grid | Lazy chart/table frames with stable dimensions |

Shared best-practices document and harness references: committed locally in
standards c991a32. CORE is the shared Codex symlink and Claude import; every
configured agent reads the same BEST_PRACTICES.md. No application improvement
has shipped yet. Fevicreate draft: https://github.com/ArnavGoel03/pidilite-school-checkin/pull/1.
Review record is now active; later projects remain queued.

Conditional/archived ideas remain in the audit and are not higher priority than
this queue. Do not silently add paid infrastructure or speculative dependencies.
