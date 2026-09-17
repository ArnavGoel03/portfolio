# Interactive applications performance audit, 2026-09-17

Read-only audit of nine portfolio project entries, including six Glass Table Games surfaces. Recommendations assessed: caching, CDN/load balancing, compression, database indexes and query batching, pagination, loading feedback, debounce, lazy loading and render work. No writes to application code, production mutations, load tests, deployments or broad builds were performed.

Evidence tiers: **live observation** is a bounded HTTP GET from this machine; **source-confirmed** describes checked-out code, not a measured user delay; **conditional** depends on real data volume or a browser profile. HTTP timings are single samples, not Core Web Vitals, p95 or real-user measurements. Raw file sizes and offline gzip estimates are not wire transfer sizes. Browser render/interaction timing and production query plans remain unmeasured in this sub-audit.

All nine canonical folders lacked `docs/STATE.md` and `STATE.md`; README and available CLAUDE files were read first. Glass Table Games has a newer release worktree, used for current shared implementation after reading its STATE/HANDOVER. The older canonical checkout must not be used as evidence that a live fix is missing.

## Highest-value changes

| Priority | Project | Finding | Evidence confidence | Expected benefit |
|---|---|---|---|---|
| P1 | Glass Table Games, especially Deal | HTML is delivered without Content-Encoding in the sampled negotiation, despite large cache-hit documents | Live HTTP plus current shared source | Reduce cold/revalidated document transfer; preserve anti-injection protection |
| P1 | Library Walk | Large executable and stylesheet are embedded in HTML | Source-confirmed plus 170,881-byte compressed live document | Independently cache code; reduce repeated document transfer and HTML parsing |
| P1 | Cutroom | Intro blocks the entire page for a fixed 2.9 seconds after effect starts | Source and live shipped JS, user timing unmeasured | Immediate access to already-loaded content |
| P2 | Stature | Checkout performs sequential per-line product reads | Source-confirmed, live storefront unavailable in portfolio | Batch authoritative pricing into one read when enabled |
| P2 | Pitcrew | Dynamic renderer mounts immediately after capability detection, despite documentation promising scroll gating | Source-confirmed | Avoid heavy renderer download for visitors who stay in hero |
| P2 | Meshport | WASM warms on converter mount and is also precached at service-worker install | Source-confirmed | Offer intent/idle warming on constrained connections; preserve conversion readiness |
| P2 | Library Walk | Classroom polling uses fixed async intervals without in-flight guard | Source-confirmed | Prevent overlap on slow requests and needless background reads |
| P2 | Q Branch | First-visit boot intentionally waits 1.7 seconds, then 550ms removal transition | Source-confirmed | Shorten time to unobstructed content |
| P3 | Region Earth | Both GPU backends are statically imported; render loop runs continuously | Source-confirmed | Reduce unused backend parse work and idle GPU usage |
| P3 | SYN100 Micromobility | Search is lazy at app layer but eagerly precached by service worker | Source-confirmed | Defer secondary page/index downloads while preserving chosen offline contract |

P1 means the first implementation batch, not an outage. Costly scaling infrastructure is unsupported by the evidence: the live sites already use Cloudflare or Vercel edge delivery, and no saturation or load-balancer need was demonstrated.

## Glass Table Games: studio, Circuit, Deal, Charade, Lattice and fair-play

Canonical `chaupal`: branch `feat/manifest-headless`, HEAD `0a1250287aeeab096d288a25a1ce5b9055a1dbf4`. Current release source reviewed in `gtg-casino-ui-release`, branch `fix/shared-glass-material`, HEAD `40f09e688e04940f66ecc1194d8fb7a878bb9ee2`. Its `docs/STATE.md:6` records game build source `2831dad` and studio source `bdd9c16` live on September 15. This is release documentation, not independently verified deployment identity in this sub-audit. Studio is a separate repository; its full source was not audited here.

All six requested surfaces returned HTTP 200, Cloudflare server, `x-opennext-cache: HIT`, and `cache-control: s-maxage=31536000, max-age=0, must-revalidate, no-transform`. No Content-Encoding appeared with `curl --compressed`. Sample transferred body bytes and TTFB:

| Surface | Body transfer bytes | TTFB seconds |
|---|---:|---:|
| https://glasstablegames.com/ | 89,660 | 0.691 |
| https://circuit.glasstablegames.com/ | 95,476 | 0.696 |
| https://deal.glasstablegames.com/ | 287,609 | 0.596 |
| https://charade.glasstablegames.com/ | 95,117 | 0.935 |
| https://lattice.glasstablegames.com/ | 106,387 | 0.935 |
| https://glasstablegames.com/fair-play | 59,906 | 0.717 |

**P1: compress HTML without regressing the privacy/runtime boundary.** The shared wrapper appends `no-transform` in `gtg-casino-ui-release/scripts/html-policy.mjs:17`. `docs/PLAN-CARD-EXPANSION.md:113` records a calibrated live test: Cloudflare inserted an analytics beacon without that directive and did not with it. Simply deleting the directive is an invalid fix. Investigate explicit origin/worker gzip or Brotli negotiation while retaining no-transform, or a provider configuration that proves injection remains disabled. Verify browser HTML, content encoding, Vary/cache correctness, private response handling and hydration under the deployed runtime. Deal offers the largest observed document reduction opportunity. This does not establish that its JS bundle is the largest or that backend latency is poor.

Existing controls, from current release worktree:

- Circuit 3D board/dice use dynamic imports: `apps/web/src/components/board/BoardSurface.tsx:33`, `components/dice/DiceSurface.tsx:14`.
- Deal review CPU work uses a Worker: `apps/judgement/src/hooks/useReview.ts:95`.
- Profile loads use React request memoization: `apps/web/src/lib/player-page.ts:64`.
- Finished scorecards and fairness payloads have explicit public caching: `apps/web/src/app/api/games/[id]/scorecard/route.ts:33`, `fairness/route.ts:30`.
- Shared Neon HTTP accessor is reused: `packages/db/src/client.ts:19-29`. Conventional per-request TCP connection pooling is not the appropriate blanket recommendation for this HTTP driver.
- Schema has query-oriented indexes, including pool/rating, player archive, invitations and diagnostics: `packages/db/src/schema.ts:278`, `:439`, `:531`, `:636`. Ratings queries have LIMITs: `packages/db/src/ratings.ts:177`, `:228`, `:451`.

Charade and Lattice benefit from the shared HTML fix; no separate high-confidence game-specific bottleneck was established. Database cardinality, query plans, room concurrency, actual installed indexes and backend p95 remain unknown. Do not add Redis, global response caching for personalized rooms, or a new load balancer without measurements. Fair-play is a cache-hit reading surface, so skeletons and database optimization are not its first intervention.

## Meshport

Branch `main`, HEAD `59fd183c06314cb90c1d34e07482030041d890cc`. Portfolio target `meshport.vercel.app` redirects 308 to `meshport.arnavgoel.dev`; final response was 200, gzip, Vercel MISS, 6,434 transferred HTML bytes. One redirect-chain sample took 11.64 seconds; this is an outlier to remeasure, not a diagnosed origin bottleneck.

**P2: reconsider unconditional WASM warming on low-bandwidth visits.** `src/components/Converter.tsx:54-64` calls `whenEngineReady()` on mount, which starts the worker in `src/lib/engine.ts:46-50`. `public/sw.js:12-16` independently precaches the engine assets after registration. Local WASM is 4,046,914 bytes raw, with a 1,180,188-byte offline gzip estimate. These are local file measurements, not observed live transfer. Warming eagerly is useful to someone dropping a file immediately; an intent/idle strategy for constrained connections should be measured against time to first conversion, not judged only by first paint. Coordinate service-worker prefetch with that strategy or the network saving will not materialize.

Already strong: sequential conversions limit simultaneous WASM memory, conversion/export run in workers, previews are lazy and capped at 75 MiB (`Converter.tsx:22`), typed imports keep Three out of entry code, and `scripts/check-bundle.mjs` checks the static import graph. `public/sw.js:53-65` caches hashed assets. No server/database exists for conversions, so query caching, indexes, N+1, DB pooling and server load balancing are N/A. A CDN is already present. Prioritize converter responsiveness/memory over generic skeletons or adding dependencies.

## Library Walk

Branch `main`, HEAD `1c6b5069848050026a948bc28352bc7f2c185009`. Live root returned 200, gzip, Vercel HIT, 170,881 transferred HTML bytes, TTFB 0.559s.

**P1: separate cacheable executable/style assets from the document.** `index.html:58` starts an approximately 89,060-character inline stylesheet; `index.html:1988` starts an approximately 396,080-character inline game script. The local HTML is 518,348 bytes raw. Extract into versioned modules/styles with correct service-worker coverage and immutable headers. This reduces document transfer on subsequent navigations independently of game releases and gives a basis for splitting optional garage/social/replay features. It is a source and transfer finding, not a measured main-thread duration; keep semantic loading order and startup globals intact.

**P2: classroom polling should wait for completion.** `class.js:230-238` and `:385` use `setInterval` for async state reads every two seconds; the host interval has no in-flight exclusion or visibility pause. `class.js:56` uses `cache: no-store`; the endpoint still provides a two-second shared-cache policy (`api/class.js:136`). Use one completion-scheduled loop with visibility/backoff and restore current state on resume. A request slower than the interval can overlap; concurrency under real classroom load was not measured.

Already strong: `api/_schema.sql:15`, `:72`, `:132`, `:174` define indexes for leaderboards/class/history. `api/history.js:62` caps pages, `api/top.js:161` and `:191` bound leaderboard results, and `api/top.js:199` parallelizes independent weekly reads. Private APIs are excluded from service-worker caching (`sw.js:46`); preserve this. Network and room code already distinguish private data from publicly cacheable state. Renderer uses procedural assets and shared engines; no evidence supports server image processing or a new database cache. Production query plans/index presence, gameplay frame time and live multiplayer latency remain unverified.

## SYN100 Micromobility

Branch `main`, HEAD `c3a08c33517de1b330607bb21cbf3fb5373c5786`. Root returned 200, gzip, Vercel MISS, 47,395 transferred HTML bytes, TTFB 0.918s.

**P3: reconcile lazy search with eager offline prefetch.** `search.js:5-8` says visitors who never search pay nothing; search loads its index on intent (`:33`). However `sw.js:5-30` precaches the index, facts, data page, podcast scripts and offline game on every first service-worker installation. Local search index is 148,960 bytes raw, 37,114 bytes offline gzip estimate. Choose a minimal essential shell plus idle/visited-route caching for secondary resources, or retain full offline functionality and correct that performance claim. Service worker registers after window load (`script.js:450-452`), so this is primarily post-load bandwidth, not proof of first-paint blocking.

Already strong: poster images explicitly lazy-load with dimensions (`index.html:1124`, `:1128`); audio uses `preload="none"` on home and metadata on podcast (`podcast.html:65`); large audio/range responses are excluded from SW cache (`sw.js:88-94`). Data input is debounced (`data.js:468-473`), transcript search is debounced (`podcast.js:502-506`), and search result count is capped (`search.js:18`). Static site means DB indexes, query pooling, N+1 and server caching are N/A. A new framework or load balancer would add cost without demonstrated benefit. Actual browser INP and podcast Range efficiency were not measured.

## Pitcrew

Branch `main`, HEAD `eff6d2a1940b4463654fedd7abd3f3ed4a058801`. Root returned 200, gzip, Vercel HIT, 20,323 transferred HTML bytes, TTFB 1.039s.

**P2: implement actual visibility gating for the renderer if hero-only visits should avoid it.** `components/Stage.tsx:34` uses dynamic import, but `:205-212` renders Scene as soon as capability detection completes. There is no scroll/near-viewport condition on that mount. README:141 claims a visitor who never scrolls never pays for WebGL; the source does not establish that claim. Keep the existing poster until the stage approaches the viewport, then warm the scene sufficiently early to avoid a scroll hitch. Verify a cold visitor who stays at the hero does not fetch the scene chunk, plus a fast-scrolling positive control that renders promptly.

Already strong: `scene/quality.ts:53-68` adapts population and DPR to device class; `scene/Scene.tsx:332` uses demand rendering for reduced motion; heavy graph subtrees mount during idle (`scene/Scene.tsx:277-291`); poster remains while WebGL initializes (`Stage.tsx:215`). Static scene construction avoids backend/database work. For normal motion, `frameloop="always"` warrants an offscreen pause experiment after visibility gating. FPS/INP/battery and current live asset graph remain unknown; do not label this measured jank.

## Region Earth

Branch `main`, HEAD `4dc16ffb50d1f894657e035be3c4f410ad3b5689`. Root returned 200, gzip, Vercel MISS, 1,797 transferred HTML bytes, TTFB 0.808s.

**P3: lazy-load the selected backend and support idle redraw.** `globe/backend.js:7-8` statically imports both WebGPU and WebGL2 implementations even though only one is selected. Replace those imports with capability-selected dynamic imports if transfer/parse profiling justifies the added request; keep fallback tested. `app.js:685-686` schedules an unconditional animation loop. An idle/dirty-frame mode when auto-motion is disabled could reduce battery use; visible rotation legitimately requires frames, so indiscriminate throttling would harm the product.

Already strong: four geography downloads are parallel (`app.js:109-115`), binary borders/id map reduce payloads, DPR is capped (`app.js:266`), ResizeObserver handles canvas geometry, and SW registration waits for successful boot (`app.js:779-799`). `vercel.json` gives fonts immutable caching and data a day plus stale revalidation. Local borders are 192,119 bytes raw and id map 58,631 bytes raw; these are not transfer observations. No backend queries, indexes, pooling, or load-balancer problem applies. On-device GPU capability, rendered startup and runtime frame timings remain unmeasured.

## Q Branch

Branch `main`, HEAD `2620dec58cb3104da3495d8df0070c21f008d59d`. https://q-armoury.vercel.app returned 200, gzip, Vercel MISS, 8,353 transferred HTML bytes, TTFB 0.892s.

**P2: shorten or make the cinematic boot nonblocking.** `app.js:33-41` waits 1,700ms before ending boot; `:22` waits another 550ms before removal. It is skippable on key/pointer input and bypassed for reduced motion/repeat sessions. This deliberate delay dominates the tiny document transfer for first-time visitors, independent of caching. Preserve the concept through a brief concurrent entrance instead of a full-screen access gate. The 1,700ms delay is also present in downloaded live `https://q-armoury.vercel.app/app.js?v=0.6.0` (evidence `.firecrawl/performance-2026-09-17/3a7566eeee488fcf.body`, SHA-256 `53e01a496082b1768e7a0505747a587dce78000df8c304dd99157c2ec19790c0`). Actual interaction latency has not been measured.

Already strong: Three is imported on demand (`app.js:284`), individual viewers mount when within 400px (`:321-328`), and `qb3d.js:528-545` renders only enabled/visible viewers; DPR is capped at 1.75 (`:561`). Vendor pair totals 750,954 raw bytes locally, but those are deferred and not first-document transfer. Immutable vendor/fonts headers are in `vercel.json`; site is static. Database optimizations and extra load balancing are N/A. No need to replace this architecture with a framework or blanket React memoization.

## Cutroom

Branch `main`, HEAD `2a6ecded7e3b2c31fb5580f76a9ca441207dc2d7`. https://cutroom-one.vercel.app returned 200, gzip, Vercel PRERENDER, 15,176 transferred HTML bytes, TTFB 1.186s.

**P1: remove fixed wait from time to useful content.** `src/components/Preloader.tsx:34-37` schedules 700/1,400/2,100/2,900ms countdown states; the fixed fullscreen overlay is at `:44-47`. It does not reflect network/asset readiness. Existing skip, repeat-session and reduced-motion controls help, but a fresh visitor waits after content arrives. Use a nonblocking entrance or cap it to actual readiness. This is confirmed in the live shipped chunk `https://cutroom-one.vercel.app/_next/static/chunks/2sj5gckcuiuvl.js` (local evidence `.firecrawl/performance-2026-09-17/912753bc4b0ebf9f.body`, SHA-256 `af511245cc29ceb8fd8d2f09153b4c2d3073b41930bab31edeb5ca870f1e7a0f`): the effect schedules `done` at 2,900ms and renders the fullscreen overlay until then. This confirms shipped behavior, not browser-measured LCP.

**P2, conditional on uploaded media:** `src/components/HeroReel.tsx:27-36` creates every poster as a CSS background even when its slide opacity is zero; `src/components/Work.tsx:116-119` also references full poster URLs. Load only active/next hero posters and serve responsive compressed derivatives, with the first frame prioritized. Browser requests and source image sizes must be measured once real media is present. Do not assert all poster bytes transfer before paint without that trace.

DB controls/opportunities: public site is prerendered in the live response; `src/lib/projects.ts:43-50` reads all projects after schema bootstrap, and `src/lib/db.ts:16-36` runs CREATE TABLE once per warm instance. It is not established that every public page hit queries Neon. Move schema bootstrapping to an explicit migration path if cold admin/content reads become slow; add bounded admin pagination and a `(sort, created_at)` index only when table growth/query plans justify it. Neon HTTP is already used, not an unpooled TCP client. R2 presigned uploads keep large media off serverless functions (README backend flow). No load-balancer need demonstrated.

## Stature

Branch `main`, HEAD `8a070a188a91858d28749a64f3a92ee2fe6051fb`. Preexisting modified `CLAUDE.md` was left untouched. The portfolio deliberately omits a demo link (`portfolio/src/lib/projects.ts:451`) because its old deployment was unavailable. No live storefront performance claim is made here.

**P2: batch authoritative checkout reads.** `app/api/checkout/route.ts:117-118` awaits `getDesignBySlug` once per merged `(slug,size)` line. The same slug in multiple sizes causes repeated queries; `lib/designs.ts:169-171` performs a slug lookup each time. Fetch all distinct slugs in one query, map prices back to validated lines, preserve fail-closed pricing semantics and stock/status checks. Do not cache mutable checkout prices globally. Verify a multi-size cart uses a bounded query count and a DB error still returns 503.

**P2: eliminate sequential migration round trips from cold business requests.** Schema initialization is promise-memoized correctly, but `lib/db.ts:137-144` awaits eight ALTER statements after table creation; first published-design/checkout request that needs this schema pays for them. Use deployment migrations rather than initialization in request handlers, preserving free preview behavior. Impact depends on live DB enablement, which was not verified.

**P3, growth-dependent:** public/admin list queries are unbounded (`lib/designs.ts:63`, `:80`) and schema lacks a dedicated published-status/sort index. Add cursor pagination to admin first; public catalogue pagination/filtering only when enough designs justify it. Check EXPLAIN before adding indexes.

Already strong: home has 300-second ISR (`app/page.tsx:17`), schema initialization coalesces concurrent calls (`lib/db.ts:22-32`), Neon accessor is reused, public projection excludes private costs/notes (`lib/designs.ts:58-64`), slug is unique/indexed, and checkout input is bounded. No claim about real buyer latency, R2 image transfer, database cardinality or deployed query plans is possible until the storefront is restored.

## Remaining verification

Central audit should consolidate live compression/asset receipts with these source findings. Before implementation, establish exact production source identity for repositories without release receipts, collect browser traces for cold/repeat navigation plus actual user interactions, and measure query counts/plans on representative data without changing production state. This audit is complete as a read-only opportunity assessment; fixes and release verification are outstanding.
