# Data applications: performance audit, 2026-09-17

Read-only source audit against the screenshot's recommendations: caching, indexes and query counts, bounded retrieval, connection reuse, payloads, lazy loading, dependencies, input work and loading feedback. Live HTTP evidence is collected centrally in the parent audit. No private API data, credentials, writes, deployments or paid services were used. No Lighthouse scores, database execution plans, production row counts, field INP, or GPU timings were measured. Impact below is expected from the traced implementation, not measured latency savings.

## Scope and source identity

| Project | Branch / HEAD inspected | Status source |
| --- | --- | --- |
| Gondilal | Main checkout `kit/passkeys` / `0e29730`; findings rechecked in `.worktrees/storefront-red-team`, `docs/hero-polish-release` / `776fa7f` | `docs/STATE.md`; production release `c5546e2` is ancestor of `776fa7f`; diff is documentation only, so inspected application code matches that documented release |
| Pidilite tracker | `main` / `864247d` | `docs/STATE.md` |
| SOMA | `main` / `b126ef4` | `docs/STATE.md` |
| Buzz | `main` / `a41aa44` | No `docs/STATE.md`; README and `SESSION_STATE.md` |
| Serenity | `main` / `5577831` | Root `STATE.md`, visibly historical; current source supersedes its old feature counts |
| Vani | `main` / `a89288c` | No STATE; `documentation/README.md` contains only the project heading |
| Watch Together | `fix/spacious-site` / `9c0e0a6` | `docs/STATE.md` |
| Fevicryl Art On Sale | `main` / `77fe6e1` | No STATE or README; `CLAUDE.md` |

Paths below are relative to each repository. Gondilal paths refer to its production-aligned worktree above. No project status file was modified during this read-only audit; missing/stale records are recorded here for follow-up.

## Pidilite tracker

**P1, high confidence: paginate visits at the server with search/date filters applied before the limit.** `src/app/api/admin/data/route.ts:54` joins visits to employees and schools and returns only the newest 1,000 (`:71`). `src/components/AdminDashboard.tsx:302` loads that one payload; `:1264` searches and date-filters the truncated array; `:1346` exports that array; `:1374` mounts every matching row. After 1,000 visits, an older date filter can show no matches even when the database contains them, and the local visit export cannot include those records. The overview's server aggregates intentionally cover the full dataset, so do not replace those with page counts. Split summary aggregates from a cursor-based visits endpoint, retain permission/territory/test-mode predicates, and return total/next-cursor metadata. Start with 50-100 rows; check a fixture with more than 1,000 visits and an older matching date, including export behavior. This fixes a concrete completeness issue and reduces transfer/DOM work.

**P2, medium confidence on speed: plan-check indexes for the actual dashboard query.** `src/lib/db.ts:353` has school, employee and captured-time indexes; the dashboard orders by `created_at`, filtered by `is_test`, and joins through territory. A candidate `(is_test, created_at DESC, id DESC)` matches the proposed stable visit cursor better than a captured-time index. Confirm with EXPLAIN on realistic, anonymized cardinalities before adding it; this audit does not assert a production sequential scan.

Existing controls: seven dashboard query groups execute concurrently (`src/app/api/admin/data/route.ts:54`), joins avoid client N+1 lookups, photo bodies are excluded in favor of `has_photo`, and settings are loaded as a group. Neon HTTP client reuse is in `src/lib/db.ts:28`, so an additional browser-side or TCP connection pool is not the relevant fix. The map is dynamically imported (`src/components/AdminDashboard.tsx:20`). School lists are territory-scoped and private/no-store (`src/app/api/schools/route.ts:18`, `:69`); putting these on a shared CDN would undo an intentional privacy correction. Offline school selection needs a complete authorized local list, so indiscriminate pagination there would harm field use.

## Buzz

**P1, high confidence in eager work, medium confidence in user impact: defer the map until it approaches the viewport.** `web/app/page.tsx:5` statically imports `EventMap`, and `:67` mounts it below the feed. `web/components/EventMap.tsx:4` imports MapLibre's React bindings and `:32` mounts the map immediately, which requests the remote Carto style and its resources. The same structure is in `web/app/feed/page.tsx`. Use one lazy map wrapper with reserved dimensions and an observer or explicit opening action. Validate initial route bytes and tile requests before scrolling, followed by marker interaction. Dependency weight is not measured here; removing the map library entirely is not justified.

**P2, high confidence: bound and page organization event history.** `web/lib/data.ts:68` (`getEventsByOrg`) selects all columns and orders the complete organization event query without an explicit limit, date window or cursor. `web/app/o/[handle]/page.tsx:34` calls it and renders the result. The feed and organization directory already cap results at 50 and 100 (`web/lib/data.ts:23`, `:61`), so carry the bounded policy to the organization page and separate upcoming events from paged history. Supabase can impose a server row ceiling, but that is not a navigable pagination contract. Check an organization with more events than the configured server ceiling.

Existing controls: homepage data requests run concurrently; indexed host lookups exist in `supabase/migrations/0003_indexes_and_payments.sql:10`; feed retrieval is bounded. `web/app/page.tsx:10` declares 60-second revalidation, but the configured data client reads cookies (`web/lib/supabase-server.ts:7`), so that declaration alone is not proof of a public CDN hit. Separate public cacheable data from personalized data only after reviewing RLS and auth semantics. Do not globally cache the current-profile getter. No database pooling defect was established through the Supabase HTTP client.

## Gondilal

**P1, high confidence in the dependency chain, medium confidence in latency impact: make the homepage rate cache a read-through cache.** `src/app/(public)/page.tsx:62` awaits business configuration, then `:64` starts catalogue, three separate settings lookups and a rates query. Only after the rates query returns does `:112` write the warm rate cache, or `:114` read it as fallback. A warm cached rate therefore does not avoid database latency. The code already has the reusable Redis abstraction (`src/lib/cache.ts:12`) and catalogue uses it before the database (`src/lib/catalogue.ts:73`). Reuse that pattern with an explicit short freshness policy and rate-write invalidation, and group the three independent settings lookups. Preserve timestamps/staleness presentation and avoid extending yesterday's prices silently. Verify the number of database calls on a warm home request and an admin rate update.

**P2, high confidence, scale-dependent impact: page staff review management.** `src/app/api/reviews/route.ts:11` fetches every review ordered by creation date, while `src/components/admin/ReviewManager.tsx:36` reloads that complete list. Add a cursor and server-side status/search filters once review growth warrants it. Confirm management actions update the visible page without a full-history reload.

Existing controls: Redis catalogue read-through cache, public catalogue `s-maxage=300, stale-while-revalidate=3600` (`src/app/api/public/catalogue/route.ts:19`), bounded inventory/customer/transaction APIs, dynamically loaded admin tabs (`src/app/(admin)/admin/page.tsx:21`) and AR/3D try-on modules (`src/components/shop/ProductModal.tsx:15`). HTML is intentionally private/no-store for per-request CSP nonces according to the production record; do not recommend blanket HTML caching. Data caching is the relevant layer. Pool connection saturation and Redis configuration were not inspected.

## SOMA

**P2, high confidence in continuous rendering, medium confidence in impact: pause WebGL rendering when the study is paused or the figure is outside the viewport.** `components/study/Stage.tsx:156` stops clock advancement when `running` is false, but `:278` keeps a default continuous Canvas active. `components/study/Flow.tsx:495` still has a frame callback. The main figure uses continuous rendering unless reduced motion is enabled (`components/figure/Figure.tsx:818`). Neither those stages nor their inspected wrapper provides an intersection-based suspend. The paused study can use demand rendering, with invalidation for orbit/interaction; offscreen figures can suspend and reset timing on return. Verify that pause means no continuing render loop, and that drag, selection, labels and timeline resume correctly. Background-tab rAF throttling does not address a scrolled-away figure in a visible tab.

Existing controls are unusually strong: lazy Console/Figure/Reader and secondary tools (`components/ConsoleDoor.tsx:96`, `components/Console.tsx:90`), capped DPR and a lower quality path (`components/figure/quality.ts:111`), schematic loading fallback (`components/figure/Figure.tsx:787`), shared MotionValue timing (`components/Console.tsx:333`) and shader updates instead of React state per frame. Lazy singleton Neon HTTP/Drizzle client is in `lib/db/index.ts:57`. The schema already declares person/date indexes for panels, reports, notes, access logs and measurements (`lib/db/schema.ts:887`, `:1131`, `:1273`, `:1337`, `:2367`). No generic "add indexes", pool, or N+1 recommendation is warranted without query plans. This audit did not exercise protected record uploads or claim frame-rate measurements.

## Serenity

**P2, high confidence: make lab archive limits navigable.** `src/app/api/mobile/labs/route.ts:81` returns only 50 reports with every nested lab value, with no cursor; the flat mode at `:72` returns 200 values with no cursor. The iOS archive uses `ios/Serenity/Features/Labs/LabsViewModel.swift:56` -> `ios/Serenity/Networking/EndpointsRecords.swift:80` -> that endpoint, replacing the complete archive array on each load. Add stable `(date, id)` pagination and a lightweight list projection; load full report values in detail when appropriate. This preserves bounded reads while making older records reachable and reducing nested payloads. Check 51+ reports with duplicate dates. This is a backend/native archive improvement, not evidence that the marketing homepage is slow.

Existing controls: mood, symptom and cycle APIs cap reads at 200; letters cap at 24. Insights batch queries concurrently and constrain symptom/mood history to 90 days (`src/app/api/mobile/insights/route.ts:96`). Prisma schema contains user/date indexes for the traced paths (`prisma/schema.prisma:168`, `:195`, `:210`, `:257`). PrismaPg is created through one module singleton (`src/lib/prisma.ts:8`). The public homepage is a server component with no data fetch (`src/app/page.tsx:29`). Do not cache health data on a shared CDN. The old STATE claim that loading flags are missing is not repeated: current LabsViewModel explicitly sets `isInitialLoading` (`:53`). No new index or connection-pool defect was demonstrated.

## Watch Together

**P2, high confidence in unnecessary work, unmeasured impact: suspend the landing demo's animation loop when offscreen or idle.** `site/app.js:475` starts a perpetual rAF loop as soon as the homepage starts. `Room.tick` (`:285`) always reconciles members and triggers rendering (`:301`); `room.onchange` (`:340`) renders both screens and updates the play label. The mini diagrams already use IntersectionObserver (`:486`), but that guard does not cover the main demo loop. Extend visibility control to the main demo and skip DOM writes when values have not changed, while keeping actual player state correct when a visitor returns. Test scrolling away, paused playback and resuming after an interruption.

**P3, high confidence: bound fallback recovery polling.** After failed embeds, `site/app.js:392` polls once per second and clears only after a player engages. A permanently blocked provider therefore keeps the interval alive for the page's lifetime. Stop after an explicit retry window or suspend when offscreen, with recovery on a user retry.

Existing controls: no framework runtime on the static landing site; YouTube players attach only after a user action (`site/app.js:367`); decorative animations already suspend offscreen. Asset policy requires revalidation (`site/vercel.json:32`), which is appropriate for unhashed names and should not be replaced by immutable caching unless filenames are versioned. Relay has explicit room/member/message caps and rate limits (`server-cf/src/worker.js:19`, `:162`, `:714`, `:989`). SQL indexing, HTTP response caching of live room state and database pooling are not applicable to the static page/real-time relay architecture. No actual video stream was played or relay load test run.

## Fevicryl Art On Sale

**P3, high confidence in duplicate CPU work, scale-dependent impact: score each artwork once per query and reuse the score for results and facets.** `components/Catalog.tsx:158` runs `scoreArtwork` for every product, then `:187` repeats scoring for facet counts. Both depend on immediate input (`:236`); all results mount (`:305`). Existing memoization avoids unrelated renders but not this repeated work on every keystroke. Share query-score results, then profile a realistic large catalogue before adding deferred rendering or incremental display. Do not introduce a remote search service or debounce a small local list without measured need.

Existing controls: homepage data and route revalidate after 30 seconds (`app/page.tsx:9`, `:30`), admin writes call `revalidatePath`, R2 hosts assets, uploads derive full/thumbnail/blur tiers with lazy Sharp (`app/api/listings/route.ts:50`), and gallery images are lazy with async decoding (`components/Catalog.tsx:924`). Search has no third-party library and filters are memoized. No SQL database exists, so indexes, SQL N+1 and connection pooling are N/A. `CLAUDE.md` saying "no server calls" is stale: `app/page.tsx:30` fetches `listings.json` and admin API routes exist. No catalogue cardinality or browser typing latency was measured.

## Vani

**P1, verified execution blocker: establish a runnable baseline before performance tuning.** A compile-only Python check of `micro-services/processing/processing.py` fails at line 172: `'async with' outside async function`. Nothing was imported or executed; no network, microphone or call action occurred. Move the entrypoint into an async function and verify it with mocked transports before describing this as a running app.

**P2, high confidence in source behavior, runtime blocked: correct the audio pacing and bound I/O.** `micro-services/processing/processing.py:31` configures 24 kHz capture, `:41` reads 1,024 frames, and `:68` sleeps one second per loop. That requests about 43 ms of audio per second, so it cannot keep up with real-time capture. It also performs blocking reads inside the async task and buffers globally. Use a bounded producer/consumer queue at the device's cadence with explicit backpressure and cancellation. `micro-services/handling/handling.py:38` and `:53` make upstream requests with no timeout; use bounded timeouts and a reused HTTP session. First fix the incompatible browser/server contract: `frontend/app.js:46` uploads multipart audio and expects JSON, while the handler reads a Twilio recording URL and returns TwiML. These are prerequisite correctness fixes, not measured production speed issues.

Existing controls: recording duration is limited to 30 seconds in the browser and Twilio handler. The browser gives recording/sending status. No functioning deployed website URL, database, cacheable public data path, or production workload was established, so CDN/SQL/index/pooling comparisons are N/A. Do not load-test or place real calls to validate this prototype.

## Order of work and verification

1. Fix Pidilite's truncated visit filtering/export contract and add stable server pagination. It has the clearest current product correctness consequence.
2. Fix Vani's runnable baseline if it is intended to remain an active product; otherwise label it as an archived prototype in project records.
3. Make Gondilal's homepage cache bypass actual database work, and defer Buzz's below-fold map. Measure cold/warm request counts and initial assets to establish the benefit.
4. Add navigable archive/event pagination to Serenity and Buzz, preserving privacy and authorization boundaries.
5. Measure and suspend unnecessary rendering in SOMA and Watch Together; reuse Fevicryl query scores if typing cost warrants it.

No implementation was authorized in this audit stream. All listed improvements remain recommendations. Broad builds were intentionally not run: they cannot establish production database plans, cache hit rates or field responsiveness, and this task made no application changes. The only executable verification was Vani's isolated, non-executing compilation check, which failed as reported.
