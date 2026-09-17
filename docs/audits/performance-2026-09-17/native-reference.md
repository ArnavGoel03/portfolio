# Native, reference sites and coursework: performance audit

Audit date: 2026-09-17. Read-only source review. Live HTTP/asset evidence is in the sibling `live-probes.json` and `asset-probes.json`, collected centrally. No native profiling, browser trace, Lighthouse run, database EXPLAIN, build, deployment or application mutation was performed by this reviewer. A source risk is not a measured latency regression.

## Coverage and revisions

| Portfolio entry/surface | Source reviewed | Branch / HEAD | Result |
| --- | --- | --- | --- |
| Quiver marketing, Trove/Relay/Tend pages | `~/dev/trove/site` | main / 91965cd | Good caching and split rendering; residual scroll CPU and duplicate release fetch opportunities |
| Trove native | `~/dev/trove/macos` | docs/patch-release-evidence / 6f5a3a6 | Shared API response rendering is the clearest large-input risk |
| Relay native | `~/dev/trove/relay`, canonical shared Trove sources | docs/patch-release-evidence / 7916fe9 | Same response-render issue; connection reuse opportunity |
| Tend native | `~/dev/trove/tend` | docs/defer-iphone-testing / a2fb47c | Unbounded task-history queries and repeated derived scans |
| Halation and Emulsion | `~/dev/halation` | fix/adversarial-qa-20260912 / 731c430 | Bounded media and coalesced work already present; actual device performance unknown |
| Saycut | `~/Documents/Projects/saycut` | main / 30bbf89 | Prototype lacks long-clip cancellation/bounds; found at legacy Atlas path, not `dev/chop` |
| Links | `~/dev/links` | main / 4f099eb | Static, zero runtime JS; no material source performance defect found |
| Review record | `~/dev/yashgoel` | main / 83c6106 | Static cache posture; substantial HTML and unoptimized product image delivery worth measuring |
| Upkeep, Fitout, Larder | `~/dev/upkeep` | main / 456141e | Static/reference architecture, lazy search; specific search and scale improvements below |
| claude-skills | `~/dev/claude-skills` | main / 72ef35d | Documentation/plugin marketplace, not a hosted application |
| Red Bull analytics | GitHub public source | 39846b4c84d78077c66421bda3c7753cc125a73d | Bounded batch data pipeline and published artifacts; no service bottleneck established |
| Power-grid-analysis | GitHub public source | eeb9e9f13407844118c6728a514dcc7e77c7a5ee | Ten eager embedded documents; lazy figures are a concrete opportunity |
| MLB, Anduril, ARK, HAR, COGS 9 | Portfolio metadata and linked YouTube presentation URLs | No local or matching owner GitHub repository located | Presentation delivery is third-party controlled; computational performance unverified |

Read project STATE first where present. Saycut uses `docs/ROADMAP.md`; Links and claude-skills use README. Upkeep's top-level STATE still says two sites while its code and CLAUDE describe three: document drift, not evidence Larder is absent. Tend site STATE says CoreData, but current app target explicitly includes Sources with SwiftData `@Model` and `@Query`; use the actual SwiftData calls below, not that website prose, when implementing.

## Priority findings

### N1: Trove and Relay repeatedly format large responses during rendering

Priority P2, high confidence in source, user-visible latency unmeasured. Trigger: request a large JSON response and view Pretty, then cause the response pane to render again.

- `trove/macos/Sources/Trove/core_api_types.swift:21` permits responses up to 16 MiB.
- `core_api_types.swift:207` decodes the complete body on each `bodyString` access. At :210, `prettyJSON` parses the complete JSON, serializes it again with pretty printing and sorted keys, then creates a String. It is a computed property with no memoized result.
- `api_tester_pane.swift:1648` calls `resp.prettyJSON ?? resp.bodyString` directly in SwiftUI body construction, and :1656 renders the complete raw response into one `Text`.
- The Hex tab at :1678 already limits its displayed bytes to 8192. The response transport in `api_runtime.swift:15` is bounded and cancellable; this is a display/formatting issue, not an unlimited network download claim.

Compute formatted response once off the main actor, cache it by response identity with an explicit byte budget, and provide a bounded/virtualized visual preview while preserving full export/copy behavior. Verify with small JSON, near-limit JSON, non-JSON and repeated tab changes, measuring main-thread work and memory rather than just a functional test.

Related P3 opportunity: `api_tester_pane.swift:532` passes `delegate: self` to the session pool; `api_runtime.swift:47` only reuses sessions when delegate is nil, so this common path creates a new URLSession and :538 invalidates it after each request. Cleanup is correct, but repeated requests cannot benefit from that pool's reuse. A session-level delegate with per-task metrics bookkeeping could retain connection reuse without mixing state, TLS or redirect policies. Do not add HTTP response caching to an API testing tool by default.

### N2: Tend work grows with full task history and project heading count

Priority P2 for large imports/history, high confidence in source, no measured task-count threshold.

- `Sources/Views/SidebarView.swift:18` queries every Todo, including completed and trashed tasks, sorted by manual order. :30 scans that collection for a bucket count, and :48/:49 call the count twice for each nonempty bucket. Today additionally derives its shared plan.
- `Sources/Views/TodoListView.swift:230` requests all completed nontrashed tasks for Logbook with no explicit fetch limit/page boundary.
- :259 computes open project tasks by filtering and sorting. :271 maps headings and reevaluates `openTodos` for every heading, then filters each heading's members. One project with many headings repeatedly sorts the same task collection.

Start with one derived grouped/sorted snapshot per update and one bucket-count aggregation. Bound/paginate Logbook and use narrower descriptors/count queries where the UI does not need full objects. Profile representative 100, 1,000 and 10,000-task stores and inspect fetches before selecting indexes. No N+1 database query or missing-index runtime claim is established by these source scans alone. Existing List-based rendering and shared TodayPlan logic should be retained. Physical iPhone testing remains explicitly deferred by the user in STATE; this audit does not resume it.

### N3: Saycut long transcription has no deadline or cancellation handoff

Priority P2 before expanding beyond short-form prototype, high source confidence.

- `ios/Saycut/EditorViewModel.swift:50` guards duplicate imports, but :57 starts an unretained Task. :61 reads duration and then extracts/transcribes the full asset without a duration limit.
- `Engine/Transcriber.swift:51` waits on a checked continuation; :54 starts `recognitionTask` without retaining its cancellation handle. There is no timeout or task-cancellation handler in this method. A late/missing final recognition callback can leave the import busy; long clips have no chunking path.
- `Engine/PreviewPlayer.swift:26` observes every 30 ms and :35 scans kept ranges linearly while playing. Fine for short clips; maintain a current range cursor or binary search before supporting very fragmented long transcripts.
- `docs/ROADMAP.md` already acknowledges long-clip memory/time bounds, background-safe transcription and cancellation as unfinished. This is confirmed in the code, not a new claim that a shipped release is slow.

Retain/cancel operation handles, add finite time/duration/storage budgets and chunk long transcription. Keep the existing non-destructive preview: it seeks over cuts without rendering a new movie. On-device processing is the correct cost architecture; Redis, a CDN and a paid transcription server do not solve this native path.

### W1: Power Grid loads ten embedded documents eagerly

Priority P2, high source confidence. `README.md:48-148` embeds ten iframes without `loading="lazy"`, including six interactive chart documents and four table documents. `assets/duration_ecdf.html` loads `https://cdn.plot.ly/plotly-2.35.2.min.js` and calls `Plotly.newPlot`. The asset folder contains separate Plotly chart HTML files, so iframe runtime initialization is a relevant cost even when the common script's network response is cached.

Add lazy loading to below-fold frames with reserved dimensions. Prefer static posters that activate interactive figures on demand when acceptable, or consolidate chart initialization in one document if interaction across charts is useful. Do not claim ten separate downloads of the same library: browser cache behavior is unmeasured, and table frames need not use Plotly. The Jekyll site already has static GitHub Pages hosting; a backend cache or database index is inapplicable. Central probes found 268,512 bytes of same-origin script responses plus 9,099 CSS bytes; external chart scripts and embedded-document work are additional to that probe scope.

### W2: Quiver residual scroll work and repeated release lookups

Priority P3. The site already does the major recommendations correctly: `components/stage/Track.tsx:23` dynamically imports the 3D scene; :44 gates it on capability and reduced motion. `scene/Scene.tsx:268` observes visibility and :282 stops the GPU loop out of view. `components/demos/Demo.tsx:19-24` splits each demo with a Skeleton. `lib/releases.ts:265` fetches a capped 30-release list with 900-second revalidation; `app/api/releases/route.ts:18` supplies shared-cache and stale-while-revalidate headers.

The separate DOM scroll driver at `Track.tsx:74-84` still schedules an animation frame and calls getBoundingClientRect every frame, including while stationary or below the stage. The progress-equality check occurs after the geometry read. Use scroll/resize events with one scheduled rAF, or gate this loop on stage visibility and dirty state; preserve its single-driver synchronization.

`DownloadButton.tsx:21/:35` fetches `/api/releases` per mounted button, and `Footer.tsx:154-158` fetches separately. The CDN protects GitHub, but the browser can still initiate repeated identical requests. Share an in-flight promise/result or resolve once and pass it to consumers. Verify actual network requests before claiming a wire-byte saving because browser cache/coalescing behavior may reduce the cost already.

### W3: Reference sites need payload discipline, not backend replacement

Review record P1 payload fix: the homepage photo at `app/page.tsx:297-302` directly renders `pageHero.src` with no srcset, although it is lazy loaded and the wrapper reserves aspect ratio. The selected hero metadata is a 6240 x 4160 sunset JPEG from GitHub Releases. Central `image-probes.json` measured 2,746,090 transferred bytes for that original. Deliver responsive compressed variants (or the existing controlled optimizer) for this cover, keeping the full original for explicit viewing/download. Lazy loading delays the cost; it does not resize the image. Exact current rendered dimensions and browser LCP contribution remain unmeasured. Separately, central probes measured 499,942 decoded HTML bytes / 113,483 gzip. `app/page.tsx:81-99` already caps starter columns to 4, 4 and 5; this is not an unbounded all-review home grid. `next.config.ts:51` enables cacheComponents; the public content path reads local content, and `components/search-client.tsx:92/:125/:135` already defers and memoizes ranking. `components/product-card-photo.tsx:99` uses lazy, async-decoded raw images; `product-photo-gallery.tsx:67` uses the original src with no responsive srcset. Measure requested image sizes against rendered cards and provide width variants or a controlled image optimizer where oversized. Attribute HTML/RSC/SVG contribution with a browser/response analysis before rewriting the home layout: the exact byte cause was not isolated here.

Upkeep P2 investigation: central probes measured 422,385 decoded HTML bytes / 90,017 gzip. `apps/site/app/(site)/page.tsx:373` renders the complete surface compatibility Board; `components/board.tsx:83/:106` renders rows times chemicals. This is a concrete source of DOM that scales multiplicatively, but its share of those bytes is not measured. Consider keeping a compact first view and moving/activating the complete matrix separately if a trace shows initial parsing/rendering cost. Preserve a useful server-rendered reference and accessibility.

Upkeep P3 search: `components/search.tsx:52` lazily fetches its index and stores it per tab, which is good. At :90 it ranks on every component render, including cursor/open-state changes. Memoize by query/docs and measure typing latency before adding debounce or a worker. It has no in-flight promise guard, unlike Fitout and Larder, so rapid reopen before the first request resolves can repeat the fetch.

Fitout search already shares an in-flight request in `apps/interiors/lib/search-client.ts:25-46`. Reliability finding adjacent to caching: at :45 a non-OK HTTP response becomes `[]`, then is assigned to `cached` at :47, so a transient HTTP failure can persist as an empty index for the tab. Throw on non-OK like Larder does, then clear in-flight state and permit retry. Do not describe this as a slow query.

Larder image evidence: direct candidate probes measured 411,134 bytes for cumin-1600.webp and 121,766 for turmeric. However `components/specimen-strip.tsx:118-135` already supplies AVIF/WebP/JPEG srcsets and sizes, and `lib/media.ts:427` defines a 480/960/1600 width ladder. Those direct GET sizes do not establish what a phone browser selects. Inspect actual currentSrc before recommending a responsive-image fix already present.

Larder P3 scale opportunity: `apps/larder/lib/catalog.ts:136-141` performs four parallel reads (published dishes/pantry/recipes plus all media). :210-231 caches their merged catalogue with tags and a shorter fallback lifetime. This is four bounded-in-number bulk queries, not an N+1. `lib/db/index.ts:25-32` reuses a Neon HTTP client, so a conventional Postgres connection pool is not a required fix. If catalogue/media grows substantially, project needed columns and split per-page/slug reads or page the admin list; profile and EXPLAIN before adding indexes. Current primary-key lookups are already indexed by definition. Central script-tag probes measured 317,711 transferred JS bytes, excluding dynamic/module imports; bundle attribution is still needed before naming a dependency to remove.

### N4: Halation and Emulsion already implement the native equivalents

No confirmed new performance defect from the reviewed paths. Do not apply a blanket web checklist.

- `ios/Halation/Sources/Core/Jpeg/OpenedPhotograph.swift:33-35` bounds encoded bytes, dimensions and pixels before decode (128 MiB / 16,384 / 32 million); :59 disables ImageIO caching while probing, then decodes orientation-correct pixels.
- Android `core/media/.../PhotoLimits.kt:9-17` bounds inputs and derives a memory-aware pixel budget.
- `emulsion/.../GradeState.kt:46` serializes work on a single executor, :179-207 cancels/coalesces superseded slider work, :414 sets 120 ms coalescing, :412-413 caps preview and thumbnail edges to 1920 and 160. Revision checks prevent stale results being published.
- Apple `HalationRender/.../FrameRenderer.swift:95` reuses cached pipelines. These are the useful equivalents of caching, batching, small payloads and avoiding redundant renders.

Next meaningful measurement is device frame time, memory peak, sustained capture thermals and slider-to-preview latency across small/near-limit photographs. STATE explicitly says native hardware/GPU verification remains incomplete and latest source is not a newly installed production app. No frame-rate or release-readiness assertion is made here.

## Entries where no optimization project is justified yet

- Links: `build.mjs:1-6` emits one static HTML document without framework/runtime JS; :35-42 removes CSS comments/indentation. `src/template.mjs:240` preconnects all five destination origins even though they are navigation targets. Reducing unnecessary preconnects is optional P3, subject to measured navigation benefit. Do not add a framework, server cache, pagination or skeleton for five static books.
- claude-skills: README and three plugin workflows; it is installed into an agent, not a site with an application read path. GitHub controls repository page performance. Keep instructions scoped/on demand; no evidenced runtime bottleneck to fix.
- Red Bull: public `scrape_youtube.py:26-28` caps comments/videos/pages; :66-69 batches video metadata in groups of 50. Saved CSV/JSON and PDF/XLSX/DOCX outputs avoid recomputing analysis for each reader. The PDF artifact is 51,411 bytes in GitHub metadata, but size does not validate its content or prove delivery performance. No need for pooling, Redis or DB indexes for a 500-comment offline analysis. Repeated sentiment computation may be consolidated if rerun profiling shows it matters, but it is not a reader-facing site bottleneck.
- MLB Playoff COGS 108, Anduril MGT 127R, ARK Invest MGT 127R, HAR CSE 158, COGS 9: portfolio points to five YouTube presentations, not owned deployed web apps. Ownable improvements are portfolio thumbnails/lazy embeds and accessible local summaries if desired; YouTube player servers, compression and CDN are outside repo control. Analysis notebooks/private source were not located in the scoped local inventory or in the authenticated owner repository name inventory (`gh repo list ArnavGoel03 --limit 200` returned 86 repositories, matching MLB/COGS/Anduril/ARK/HAR/CSE158/MGT127); course-team repositories under another owner remain possible, so training/query performance is unknown. This is explicit incomplete computational coverage, not a clean bill of health.

## Verification boundaries and implementation order

Implement/evaluate the review-record 2.75 MB original photo, Power Grid lazy frames, shared Trove/Relay formatted-response caching, Tend derived aggregation, and Saycut cancellable bounded operations first. Measure reference-site HTML/image composition next, then low-impact Quiver/search request deduplication. No evidence currently warrants paid infrastructure, Redis, database indexes everywhere, or backend migrations for these entries.

Source review and bounded GitHub API reads are complete for the listed paths. Outstanding: browser Lighthouse/INP/LCP/CLS and interaction traces, actual image transfer dimensions, native profiler/device runs, production DB query plans, and private coursework source review. These checks were not silently replaced by HTTP status or source inspection.
