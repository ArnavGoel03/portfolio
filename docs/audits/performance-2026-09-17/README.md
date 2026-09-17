# Performance opportunities across the portfolio

Audited 17 September 2026 against the 20 recommendations in the owner's AirDropped `IMG_8935.PNG`. Scope: all 28 project entries linked by the live Projects page, including studio apps, named website surfaces and the folded micromobility research entry. This is an opportunity audit, not a claim that all 28 projects are slow.

Implementation follow-through: [current queue and live receipts](IMPLEMENTATION.md).
The findings and measurement limits below describe the original audit snapshot;
implementation status is maintained in that queue.

## What to improve first

| Order | Project | Concrete improvement | Evidence and practical benefit |
|---|---|---|---|
| 1 | Pidilite Fevicreate | Apply search/date filters on the server, then paginate; make exports cover the requested range | Source limits visits to the newest 1,000 before client filtering/export. Once that limit is exceeded, older matching records cannot appear. Fixes completeness and reduces list work. Production record count was not read. |
| 2 | Review record, under Links | Generate responsive derivatives of the home photograph | Live referenced original transfers **2,746,090 bytes**, dimensions 6240 x 4160. The home image has lazy loading but no srcset. This is the strongest measured image opportunity. It is not proof the image is the LCP element. |
| 3 | CUTROOM and Q Branch | Make the opening animation nonblocking | Shipped JavaScript confirms a **2.9-second** CUTROOM intro schedule and **1.7-second** Q Branch boot wait before its exit transition. These timers are independent of asset readiness; repeat-session, skip and reduced-motion behavior must be preserved. |
| 4 | Library Walk | Extract game JavaScript and CSS into versioned assets, then split optional features | The document embeds about **396,080 characters of executable code** and **89,060 characters of CSS**. Its live HTML alone transfers **170,881 gzip bytes**. Separate cache lifetimes help repeat navigation and make feature splitting possible. |
| 5 | Glass Table Games, especially Deal | Deliver compressed HTML while retaining the existing no-transform protection | All six sampled surfaces served identity HTML; Deal transferred **287,609 bytes** for its document. Compression already works on static JS. `no-transform` prevents previously observed injected analytics: deleting it is not an acceptable shortcut. |
| 6 | Gondilal Saraf | Read the existing rate cache before querying the database; batch related settings | Homepage currently queries rates first and consults cache only on fallback. Catalogue already demonstrates the correct read-through pattern. Preserve explicit price freshness and write invalidation. Warm-cache latency savings still need measurement. |
| 7 | Buzz and PITCREW | Delay below-fold map/3D initialization until near visibility or intent | Both use heavy interactive renderers that mount before the documented/desired visibility gate. Measure initial requests and scroll-to-ready time together so moving work does not create a scroll hitch. |
| 8 | Trove / Relay and Tend | Cache expensive response formatting; derive task groups/counts once and page old history | SwiftUI body formats/parses potentially 16 MiB JSON repeatedly; Tend retrieves full history and repeatedly filters/sorts. Source-confirmed large-input risks, not measured native latency. |
| 9 | Serenity and Power Grid | Add navigable archive pagination; lazy-load below-fold chart frames | Serenity exposes only 50 reports with no cursor. Power Grid embeds ten eager chart/table documents. These are distinct completeness and loading opportunities. |

Vani needs correctness repair before performance work: compile-only verification fails with `'async with' outside async function`. Stature and Saycut have useful source improvements, but neither is linked as a running public app. They should not displace fixes to active products simply to tick a checklist box.

## What was actually checked

- Extracted the source inventory with the installed TypeScript parser and compared it with live `/projects` links: **28 expected, 28 found, zero missing or extra IDs**.
- **31 public document/artifact URLs**, **298 distinct same-origin HTML-referenced script/CSS assets**, and **20 sampled image URLs** returned HTTP 200 with successful bounded GETs. Authentication pages and marketing shells can return 200; this does not establish working protected app flows.
- Requested compression and recorded response headers, transfer bytes, decoded content hashes and individual response timings. Every network operation had a 25-second total curl deadline, with at most four concurrent requests.
- Read project status/instruction documents where present, then traced relevant source callers and current worktrees. Production-source identity remains explicitly qualified where only release documentation or a different branch is available.
- Read authenticated/public GitHub metadata and source where needed. The five coursework analysis repositories were not identifiable in the owner's 86-repository inventory; their video presentations remain assessed as third-party hosted artifacts.
- Verified the parser on a known-positive fixture. Compression has positive controls: the portfolio document and static assets return gzip while GTG HTML does not. Directly inspected deployed CUTROOM/Q Branch code, not only local timer values.
- Vercel inspection reports the portfolio alias READY at `dpl_Fw25bv2ZDA222nFzb7tLC6m4cUUT`. This establishes the inspected deployment's status, not deployment identities for every other project.

**Not measured:** Lighthouse, LCP/INP/CLS, rendered screenshots, actual browser request waterfalls, protected user journeys, database execution plans/installed indexes, real-user percentiles, native CPU/GPU traces or device thermals. Browser discovery returned no available browser; Firecrawl has exhausted credits. HTTP timing is a single transport observation, not user-perceived load time. No performance scores or percentage speedups are invented.

At the audit snapshot, no product code, database, infrastructure or deployment had been changed. Application-wide test/build sweeps were not run because this task produces audit evidence and recommendations. The sole application executable check was Vani's compile-only validation, which failed as recorded.

## All project entries

Details, exact source paths, line references, revisions and verification suggestions are in the linked subreports. "No priority change" means no material opportunity established in inspected paths, not comprehensive performance certification.

| Portfolio ID | Verdict against the image | Recommended next action | Detail |
|---|---|---|---|
| `studio` | Several focused improvements | Trove/Relay formatted-response cache; Tend history and derived state; Quiver release-request deduplication | [Native/reference](native-reference.md) |
| `buzz` | Worth improving | Visibility-gated map; page organization event history; verify public/private cache split | [Data apps](data-apps.md) |
| `glass-table-games` | Worth improving across six surfaces | HTML compression preserving no-transform; current lazy engines, bounded queries and HTTP DB reuse already help | [Interactive](interactive-apps.md) |
| `claude-skills` | Web infrastructure checklist mostly N/A | No evidenced application runtime bottleneck; documentation/plugin distribution | [Native/reference](native-reference.md) |
| `soma` | Targeted rendering improvement | Suspend paused/offscreen figure rendering; existing lazy tools, quality caps and indexes are strong | [Data apps](data-apps.md) |
| `meshport` | Conditional bandwidth tradeoff | Coordinate intent/idle WASM warmup with offline precache; keep conversion workers and memory bounds | [Interactive](interactive-apps.md) |
| `halation` | No new priority source defect found | Profile actual Halation/Emulsion capture, grading, memory and thermals; coalescing and bounds already exist | [Native/reference](native-reference.md) |
| `saycut` | Improve before long-clip support | Retain cancellation handles, finite transcription budgets, chunking and efficient playback-range lookup | [Native/reference](native-reference.md) |
| `links` | Shelf itself strong; linked sites have opportunities | Review photo variants; investigate Upkeep matrix payload; repair Fitout failed-index caching; measure Larder bundles before changes | [Native/reference](native-reference.md) |
| `pitcrew` | Worth improving | Actually gate 3D scene mount on visibility; retain poster and reduced-motion path | [Interactive](interactive-apps.md) |
| `meridian` | Lower-priority experiment | Selective GPU backend import and idle redraw if traces justify it | [Interactive](interactive-apps.md) |
| `qbranch` | Worth improving | Nonblocking boot; existing 3D visibility/lazy-loading controls already work in source | [Interactive](interactive-apps.md) |
| `cutroom` | High-value small change | Remove fixed intro wait; measure poster loading once real media is supplied | [Interactive](interactive-apps.md) |
| `stature` | Source improvements, no linked live app | Batch per-cart design reads; move request-time schema work to migrations before launch | [Interactive](interactive-apps.md) |
| `library-walk` | Worth improving | External versioned executable/CSS; completion-scheduled classroom polling | [Interactive](interactive-apps.md) |
| `syn100-micromobility` | Mostly handled | Reconcile lazy search with eager offline precache; preserve intentional offline coverage | [Interactive](interactive-apps.md) |
| `pidilite-fevicreate` | Highest correctness/performance priority | Filter then paginate visits. Fevicryl surface: share scoring results; current image derivatives and lazy loading already help | [Data apps](data-apps.md) |
| `watch-together` | Targeted landing-page work | Suspend idle/offscreen demo loop and bound failed-embed polling; live room responses should not be globally cached | [Data apps](data-apps.md) |
| `serenity` | Backend/native archive improvement | Cursor-based lab archive and smaller list projection; preserve private health-data boundaries | [Data apps](data-apps.md) |
| `mlb-playoff-cogs108` | Presentation artifact; computational audit unavailable | YouTube infrastructure outside project control; notebook/source required for training/runtime assessment | [Native/reference](native-reference.md) |
| `arkinvest-anduril-mgt127r` | Presentation artifact | No owned application read path established; avoid artificial database/CDN work | [Native/reference](native-reference.md) |
| `arkinvest-mgt127r` | Presentation artifact | Same boundary; analyze underlying computation only if source is identified | [Native/reference](native-reference.md) |
| `har-cse158` | Presentation artifact; computational audit unavailable | Source needed to evaluate model/data pipeline performance | [Native/reference](native-reference.md) |
| `cogs9-final` | Presentation artifact | No runtime optimization justified from a video link alone | [Native/reference](native-reference.md) |
| `gondilal-saraf` | Worth improving | Effective warm rate cache and batched settings; eventual review-management pagination | [Data apps](data-apps.md) |
| `redbull-youtube-analytics` | No priority change established | Bounded offline pipeline and a small static report already fit the workload | [Native/reference](native-reference.md) |
| `power-grid-analysis` | Worth improving | Lazy chart/table frames with reserved geometry; keep static GitHub Pages delivery | [Native/reference](native-reference.md) |
| `vaani` | Runnable baseline missing | Fix compilation and audio/backend contract before optimization | [Data apps](data-apps.md) |

The micromobility collection also links its Google Sites course deliverable and an adjacent Synthesis writing portfolio. Those are provider-hosted documents, not additional owned runtime stacks; the course link is explicitly labeled as requiring Google sign-in. No authenticated document access or Google Sites performance certification was attempted.

## Every recommendation in the screenshot

| Recommendation | Portfolio-specific conclusion |
|---|---|
| Cache responses | Many public sites are already cached; preserve auth/health/territory boundaries. Use explicit freshness for mutable public data. |
| Load balancer | No evidence of saturation or need for additional infrastructure. Vercel/Cloudflare already provide distributed request handling; one Durable Object room is still a stateful scaling unit. |
| Index the database | Existing indexes are common. Pidilite cursor/order is a candidate to EXPLAIN, not a proven missing production index. |
| Compress images | Review record's 2.75 MB original is a concrete target. Portfolio already uses WebP; Larder already has responsive AVIF/WebP/JPEG sources. Probe bytes alone do not reveal which srcset candidate a browser selects. |
| Loading skeletons | Useful around genuinely asynchronous map/3D/native work; Quiver and SOMA already provide them. Fixed cinematic waits are not loading feedback. |
| Cache expensive queries | Gondilal rate cache is the clearest actionable path. Cache only with invalidation/freshness contracts. |
| Avoid N+1 queries | Stature checkout reads per cart line can be batched. Pidilite already joins; Larder's four parallel bulk reads are not N+1. |
| Debounce input handlers | Share Fevicryl scores and Upkeep ranking first. Defer expensive results if profiles justify it; do not delay cheap local inputs indiscriminately. |
| Split code into chunks | Library Walk inline game is the main target. A dynamic import only saves initial work if its consumer does not immediately mount. |
| Add CDN | Already present on the sampled web deployments. No reason to buy another. |
| Server-side caching | Scope to public projections. Gondilal's nonce/private HTML and personal health or field-operation data should not be blanket cached. |
| Paginate large lists | Pidilite, Serenity, Buzz organization history and Tend Logbook. A hard LIMIT without a next page can hide valid records. |
| Lighthouse audit | Unexecuted due to unavailable browser. Obtain mobile/desktop cold and repeat profiles before claiming Web Vitals or numerical scores. |
| Compress API payloads | GTG HTML is a confirmed transport target; protected JSON encoding was not measured. Project only needed list fields and measure representative authorized endpoints. |
| Avoid unnecessary re-renders | Native JSON formatting and repeated task derivation are concrete; SOMA/Watch Together/Quiver have idle-loop opportunities. Browser React commit costs remain unprofiled. |
| Minify JS and CSS | Sampled production bundle output is already minified/versioned in many projects; Library Walk embedded author code is a target for a proper build output. Do not add a second minifier blindly. |
| Add lazy loading | Review/photo variants, Power Grid frames, Buzz/PITCREW visibility gating; keep critical above-fold content prompt. |
| Defer non-critical scripts | Portfolio PostHog still arrives in initial referenced assets despite idle initialization. Trace static and instrumentation imports together. |
| Remove unused dependencies | No package was proved unused from a manifest alone. Use bundle/import attribution before removal; do not delete used renderers or SDKs because they are large. |
| Database connection pooling | Several apps use reused Neon/Supabase HTTP clients; adding a conventional pool is not the applicable fix. Native Relay URLSession reuse is a separate HTTP connection opportunity. |

## Portfolio itself

Live Projects HTML is 42,125 gzip bytes; its distinct HTML-referenced same-origin scripts total 394,102 transfer bytes and CSS 16,316. These exclude dynamic/transitive imports and other resources, so they are not a full page-load weight. Static assets use one-year immutable caching; sampled screenshots have a one-week freshness policy and are already modest WebP files (41,340 and 50,120 bytes).

The useful code-splitting target is the quick-preview dialog: `src/components/project-card.tsx:4` imports Base UI Dialog eagerly, defines the entire modal in the same module, and only conditionally renders it at `:548`. Conditional rendering does not defer its module download. Split on interaction if a production bundle trace shows a useful reduction; retain accessible dialog focus and dismissal semantics.

`src/lib/analytics.ts:1` statically imports PostHog, while `src/instrumentation-client.ts:35` dynamically imports it and defers initialization. Live initial script references include a 253,186-decoded-byte / 82,935-transfer-byte chunk containing the PostHog runtime. Removing only one import path will not necessarily remove that initial download. Existing instrumentation comments already document the limitation. No exact removable-byte claim is made without module attribution.

Project cards use raw lazy WebP images without responsive variants (`project-card.tsx:389`), so width variants are a secondary option. Do not make the first flagship image lazy solely to improve a checklist score; determine its actual viewport/LCP role. No database, connection-pool or large-list pagination change is justified for a 28-entry public directory.

## Evidence and follow-through

- [Data applications](data-apps.md), [interactive applications](interactive-apps.md), [native/reference/coursework](native-reference.md): source findings and acceptance checks.
- [Delivery table](delivery.md): all public document measurements with exact scope limits.
- `inventory.json`, `live-probes.json`, `asset-probes.json`, `image-probes.json`: reproducible inventory and response metadata with decoded SHA256 values.
- `probe.py`, `probe-assets.py`: bounded public GET collectors. Rerun from this directory with Python 3 and curl; the inventory snapshot is the input. No schedule was created.
- Raw responses remain in ignored `.firecrawl/performance-2026-09-17/`. No secrets or private API bodies are included in the report.

Implementation subsequently proceeded under the owner's follow-up authorization; see [the implementation queue](IMPLEMENTATION.md) for completed releases and held candidates. Browser/device/database-plan validation remains explicitly unexecuted. Start with the first six findings, measure each baseline, implement one coherent change per project, then verify its actual user-visible result before declaring a speedup.
