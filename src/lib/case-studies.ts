export interface CaseStudyLink {
  label: string;
  href: string;
  kind: "github" | "demo" | "video" | "pdf";
}

export interface CaseStudyMetric {
  label: string;
  value: string;
  note?: string;
}

export interface CaseStudySection {
  heading: string;
  body: string[];
}

export interface CaseStudyDecision {
  decision: string;
  rationale: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  subtitle: string;
  role: string;
  period: string;
  status: string;
  thesis: string;
  oneLiner: string;
  problem: string[];
  approach: CaseStudySection[];
  decisions: CaseStudyDecision[];
  metrics: CaseStudyMetric[];
  stack: { category: string; items: string[] }[];
  links: CaseStudyLink[];
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "watch-together",
    title: "Watch Together",
    subtitle: "Cross-site video sync as a browser extension",
    role: "Solo, design, server, extension, deploy",
    period: "Apr 2026 · shipping on Chrome Web Store",
    status: "Live",
    thesis:
      "Proves I can ship production-grade real-time systems under constraints that break most side projects: Manifest V3 kill windows, per-site player quirks, sync-vs-heartbeat races, and hold it together with 59 tests.",
    oneLiner:
      "One extension, any streaming site, any number of devices, anywhere on Earth, sub-second playback sync over WebSocket.",
    problem: [
      "Watching a movie \"together\" over a call has always been broken. Someone says \"play in 3, 2, 1\" and within thirty seconds you're four seconds out of sync arguing about whether the next line was \"I am your father\" or \"no, I am.\"",
      "On paper the spec is one sentence: when one person plays, pauses, or seeks, do the same on every other browser. In practice, every word in that sentence is a trap. \"Plays\" depends on which streaming site: Netflix's player exposes nothing useful, YouTube has ads, JioHotstar reloads its video element on quality changes. \"Seeks\" fights with browser autoplay policies. \"Every other browser\" has to survive Chrome killing your service worker every 30 seconds.",
    ],
    approach: [
      {
        heading: "Three pieces",
        body: [
          "A WebSocket relay server on Render, a Manifest V3 extension with site-specific player adapters, and an injected in-player overlay that lives inside YouTube / Netflix / Disney+ controls so users never have to leave the video.",
          "All state is in memory on the server, rooms are ephemeral with a 12-hour TTL. One Node.js process handles the whole thing.",
        ],
      },
      {
        heading: "The heartbeat drift problem",
        body: [
          "Sync events handle play / pause / seek, but they don't catch drift. Two browsers playing the \"same\" frame will diverge, different decoder pipelines, different buffer pressure, occasional dropped frames. Without correction, two viewers end up 2 to 3 seconds apart by the end of a 90-minute movie.",
          "Solution: a 5-second heartbeat carrying the current playback position. Clients nudge themselves if they're more than 0.5 s off. The naive implementation has a fatal flaw, if every member broadcasts heartbeats, you get N² messages and the room melts at scale. So the server elects a single heartbeat leader per room. When the leader leaves, leadership transfers to the next member.",
          "The other gotcha: heartbeats fight with sync events. If Alice seeks to 0:30 and Bob's heartbeat from 0:25 arrives 200 ms later, Bob yanks everyone back to 0:25. Fix: a 2-second cooldown on heartbeats after every sync event. Simple rule, eliminated an entire class of sync ping-pong bugs.",
        ],
      },
      {
        heading: "Surviving Manifest V3",
        body: [
          "MV3 service workers can be killed after 30 seconds of inactivity. Mid-movie, that's a disaster. The fix is paranoid state restoration: current room and user ID are mirrored to chrome.storage.local on every change. When the worker wakes back up, it reads storage, reconnects the WebSocket with exponential backoff, and rejoins. From the user's perspective, nothing happened.",
          "Port management was another MV3 pitfall. Each tab connects multiple ports to the worker (one for the content script, one for the overlay). Naive keying by port name causes collisions across tabs. The fix: key ports by `tabId:portName`.",
        ],
      },
      {
        heading: "Site-specific player adapters",
        body: [
          "Every streaming site lies to you in a different way. Each site gets its own adapter module. The YouTube adapter watches for the `.ad-showing` class and pauses sync during ads. The JioHotstar adapter handles their habit of replacing the video element on quality changes, we re-attach listeners every time. Netflix needed custom play / pause buttons because their native API isn't exposed to extensions.",
        ],
      },
    ],
    decisions: [
      {
        decision: "WebSocket relay, not WebRTC",
        rationale:
          "Built a WebRTC prototype first and killed it. For a few-bytes-per-event payload, peer-to-peer's latency advantage is meaningless, and WebRTC fails behind corporate firewalls and certain mobile carriers. A single TCP connection per client works behind every firewall, and lets the server enforce rules (host mode, rate limits, TTL) that you can't enforce in a P2P mesh.",
      },
      {
        decision: "Host-mode enforcement server-side, not client",
        rationale:
          "Clients can't be trusted. Sync messages from non-hosts are rejected at the relay. When a host leaves, ownership transfers to the next member and mode switches back to \"everyone.\"",
      },
      {
        decision: "Share links with query-param auto-join",
        rationale:
          "`youtube.com/watch?v=xyz&wt_room=ABC123`, click and you're in. YouTube strips unknown params within milliseconds, so `auto-join-extract.js` runs at `document_start`, captures `wt_room`, writes to storage, and cleans the URL. Then `content.js` at `document_idle` reads and connects.",
      },
    ],
    metrics: [
      { label: "Platforms", value: "Chrome · Firefox · Safari" },
      { label: "Sync drift", value: "< 0.5s", note: "heartbeat correction" },
      { label: "Server tests", value: "59", note: "vitest" },
      { label: "E2E tests", value: "Puppeteer", note: "two-tab sync + auto-join" },
      { label: "Per-IP limits", value: "10 / 20 msg·s⁻¹", note: "abuse defence" },
      { label: "Room TTL", value: "12 hours", note: "auto-cleanup" },
    ],
    stack: [
      {
        category: "Server",
        items: ["Node.js", "ws (WebSocket)", "Docker", "Render"],
      },
      {
        category: "Extension",
        items: ["Chrome Manifest V3", "Service Worker", "Content Scripts"],
      },
      {
        category: "Testing",
        items: ["Vitest (59 server tests)", "Puppeteer (browser e2e)"],
      },
      {
        category: "Sites supported",
        items: [
          "Netflix",
          "YouTube",
          "Disney+",
          "Prime Video",
          "JioHotstar",
          "HBO Max",
          "any HTML5 video",
        ],
      },
    ],
    links: [
      {
        label: "Install on Chrome Web Store",
        href: "https://chromewebstore.google.com/detail/kilmggcpfkcfpkaapillgloabbgmeeoa",
        kind: "demo",
      },
      {
        label: "Source on GitHub",
        href: "https://github.com/ArnavGoel03/watch-together",
        kind: "github",
      },
    ],
  },
  {
    slug: "gondilal-saraf",
    title: "Gondilal Saraf",
    subtitle: "Full-stack platform for a 150-year-old family jewelry business",
    role: "Solo, design, full-stack, admin ERP, deploy",
    period: "2022 → present · live at gondilalsaraf.com",
    status: "Live",
    thesis:
      "Proves I can own a full-stack product end-to-end under real commercial pressure, storefront, catalogue with AR try-on, and an admin ERP with 15 Prisma models and 26 API routes, for a customer base that actually pays.",
    oneLiner:
      "Took my family's 150-year-old gold and silver jewelry shop in Banda, UP, online, public storefront, bilingual catalogue, and an admin ERP that runs daily operations.",
    problem: [
      "My family has been in the gold and silver business since 1873: Banda, Uttar Pradesh, across four generations. The business has always run on trust built over decades and a physical showroom. Customers on WhatsApp wanting to browse inventory, verify hallmarks, or track a gold rate had no digital surface to point them at.",
      "The challenge wasn't \"build another e-commerce site.\" It was: respect the heritage aesthetic, serve a bilingual Hindi / English customer base, run on 3G connections, and give the shop's internal team a real admin ERP, all from one codebase I could maintain alone from San Diego.",
    ],
    approach: [
      {
        heading: "Three surfaces, one codebase",
        body: [
          "Public home page at `/`. Bilingual catalogue at `/shop` with search, filters, EMI calculator, and virtual try-on. Admin ERP at `/admin` with POS, inventory, customer database, daily-rate manager, and barcode generation. All three live in a single Next.js 15 App Router project sharing a Prisma schema.",
          "Content sits in a single `content.json` with `hi` and `en` keys. A React context provider handles language switching, the entire UI updates instantly without a page reload.",
        ],
      },
      {
        heading: "The image pipeline",
        body: [
          "The most interesting technical piece. When someone uploads a jewelry photo from the shop, it goes through Photoroom API for background removal → Sharp for contrast and colour correction → WebP conversion for performance. Then Gemini 2.0 Flash generates bilingual product names and descriptions from the processed image. No manual copywriting needed.",
          "For model images, Replicate's SDXL inpainting composites jewelry onto body-part templates, upload a necklace photo and the AI generates a realistic \"worn\" preview for the catalogue.",
        ],
      },
      {
        heading: "Heritage design system",
        body: [
          "Three switchable themes, ivory-gold, dark-gold, marble-gold, all persisted in localStorage with an inline `<ThemeScript>` to prevent FOUC.",
          "The signature element is a heritage-gate animation on first visit: rosewood doors part with Framer Motion spring physics (stiffness 40, damping 20, mass 2) to reveal the site. Gold ornamental details, diamond motifs, custom cursor with a gold dot on desktop. Every interaction uses 500 ms cubic-bezier easing.",
        ],
      },
      {
        heading: "Trust surface, not just polish",
        body: [
          "Performance matters when your users are on 3G in rural UP. BIS-hallmark certificate badges and transparent pricing breakdowns matter more than flashy animations. The admin panel uses Hindi labels so my uncle can upload product photos without training. Every new feature gets measured against \"does this help a real customer trust us more?\" before shipping.",
        ],
      },
    ],
    decisions: [
      {
        decision: "PostgreSQL + Prisma, not a headless CMS",
        rationale:
          "A headless CMS would have been quicker to start. But daily gold-rate updates, customer OTP auth via WhatsApp, encrypted PII, inventory reconciliation, and barcode printing are all relational problems. Prisma gave me type-safe queries across 15 models and let the admin ERP and catalogue share one source of truth.",
      },
      {
        decision: "WhatsApp OTP over SMS",
        rationale:
          "SMS OTP delivery in rural India is unreliable and expensive. Most customers already use WhatsApp every day. A WhatsApp business link with a pre-filled OTP request is higher conversion, cheaper, and lets the shop reply directly.",
      },
      {
        decision: "Static catalogue seed, live database",
        rationale:
          "A `catalogue-products.json` file seeds the database on deploy, so the shop never ships with an empty catalogue even if the database is fresh. The admin can then overwrite anything live, the static file is a fallback, not a source of truth.",
      },
    ],
    metrics: [
      { label: "Prisma models", value: "15" },
      { label: "API routes", value: "26" },
      { label: "Test suite", value: "85 vitest tests" },
      { label: "Themes", value: "3", note: "ivory · dark · marble" },
      { label: "Languages", value: "Hindi · English" },
      { label: "Legacy", value: "Since 1873" },
    ],
    stack: [
      {
        category: "App",
        items: [
          "Next.js 15 (App Router)",
          "React 19",
          "TypeScript",
          "Tailwind CSS",
          "Framer Motion",
        ],
      },
      {
        category: "Data & auth",
        items: [
          "PostgreSQL",
          "Prisma",
          "NextAuth.js",
          "WhatsApp OTP",
          "Google OAuth",
          "Zod",
          "CryptoJS (PII encryption)",
        ],
      },
      {
        category: "AI",
        items: [
          "Gemini 2.0 Flash (bilingual descriptions)",
          "Replicate SDXL (model-image inpainting)",
          "Photoroom (background removal)",
          "Sharp (image processing)",
        ],
      },
      {
        category: "Other",
        items: [
          "Razorpay (payments)",
          "bwip-js (barcode printing)",
          "Vitest + GitHub Actions",
        ],
      },
    ],
    links: [
      {
        label: "Live at gondilalsaraf.com",
        href: "https://gondilalsaraf.com",
        kind: "demo",
      },
    ],
  },
  {
    slug: "serenity",
    title: "Serenity",
    subtitle: "AI-parsed health logging for women with PCOD",
    role: "Solo, product, design, full-stack",
    period: "Mar 2025 · live at serenity-pcos.vercel.app",
    status: "Live",
    thesis:
      "Proves I can turn an LLM from a chat toy into a structured health-data extractor, and design the schema to absorb free-form rants and OCR'd lab PDFs without fabricating values in a domain where precision matters.",
    oneLiner:
      "Type about your day in plain language. Claude extracts symptoms, mood, diet, medications, sleep, and energy into structured data, no forms, no severity sliders.",
    problem: [
      "PCOD (Polycystic Ovarian Disease) affects roughly 1 in 10 women. Managing it requires tracking a complex web of symptoms, hormones, medications, diet, exercise, mood, and menstrual cycles. Most health apps make this a chore, endless forms, dropdowns, and manual data entry.",
      "The goal was to flip the friction: let users talk about their day in plain language and let the app figure out the rest. Also: parse lab-report PDFs automatically so nobody has to type hormone values by hand.",
    ],
    approach: [
      {
        heading: "Rant-first health logging",
        body: [
          "The central feature is a chat-style \"Rant & Vent\" screen. Users type freely, \"had terrible cramps today, skipped my metformin, ate pizza for lunch, couldn't sleep until 2 a.m., feeling really anxious about everything\", no forms.",
          "Behind the scenes, Claude parses the text and extracts structured data: symptoms (cramps, severity 4/5; insomnia, severity 3/5), medications (metformin, skipped), diet (pizza, lunch), mood (anxious), sleep (estimated 5 hours), energy (low). All of it gets saved to the right database tables.",
        ],
      },
      {
        heading: "Prompt engineering as the bottleneck",
        body: [
          "The trickiest piece was getting Claude to return strict JSON without hallucinating symptoms that weren't mentioned, while still being smart enough to infer things like sleep duration from \"couldn't sleep until 2 a.m.\"",
          "The system prompt is a tight schema contract with worked examples, explicit anti-patterns (\"do not infer a symptom from the absence of one\"), and a JSON-parseable response format. Every response is validated against a Zod schema before hitting the database. Anything that fails validation falls back to a manual entry form so the user never loses the rant.",
        ],
      },
      {
        heading: "Lab report parsing",
        body: [
          "Users upload a PDF, usually a dense hormone panel (LH, FSH, testosterone, insulin, thyroid). PDF text is extracted locally with `pdf-parse`, then Claude extracts every lab value, identifies the normal range, flags abnormals, and detects any medications mentioned in the report.",
          "The extracted medications automatically merge into the user's existing medication list with case-insensitive deduplication. No re-entry.",
        ],
      },
      {
        heading: "Visualising patterns",
        body: [
          "Raw data is useless without patterns. The app shows: a calendar heatmap of symptom frequency and intensity by day, Recharts line graphs for hormone levels over time with normal ranges as reference bands, a 7-day medication adherence streak, and cycle history with gap analysis.",
        ],
      },
    ],
    decisions: [
      {
        decision: "Local PDF extraction, not cloud",
        rationale:
          "Lab reports are sensitive. PDF text extraction happens on the server but PDFs themselves are never stored, only the structured lab values persist. The Claude API call sees the extracted text, not the PDF. Nothing is retained by the AI provider.",
      },
      {
        decision: "Fallback form on every AI call",
        rationale:
          "If Claude returns malformed JSON, the user still sees their rant pre-filled into a manual form, they never lose the data. This was the difference between a demo and a tool people could actually rely on.",
      },
      {
        decision: "Rant UI over dashboards as the primary surface",
        rationale:
          "Most health apps lead with a dashboard full of charts. That's backwards, users need to log before they can see patterns. Leading with the lowest-friction log flow (typing in plain language) fixes the dropout at step one.",
      },
    ],
    metrics: [
      { label: "Prisma models", value: "15" },
      { label: "API routes", value: "14" },
      { label: "Auth", value: "Google OAuth + credentials" },
      { label: "AI provider", value: "Claude" },
      { label: "Privacy", value: "PDFs never stored" },
      { label: "Open source", value: "MIT", note: "free to self-host" },
    ],
    stack: [
      {
        category: "App",
        items: [
          "Next.js 16",
          "React 19",
          "TypeScript",
          "Tailwind CSS",
          "Recharts",
        ],
      },
      {
        category: "Data & auth",
        items: [
          "PostgreSQL",
          "Prisma (15 models)",
          "NextAuth.js",
          "JWT sessions",
          "bcryptjs",
        ],
      },
      {
        category: "AI & PDF",
        items: [
          "Anthropic Claude API",
          "pdf-parse (local PDF text extraction)",
        ],
      },
    ],
    links: [
      {
        label: "Live at serenity-pcos.vercel.app",
        href: "https://serenity-pcos.vercel.app",
        kind: "demo",
      },
    ],
  },
];

caseStudies.push({
  slug: "redbull-youtube-analytics",
  title: "Red Bull YouTube Sentiment Analytics",
  subtitle: "500 comments, VADER-scored, told a story",
  role: "Solo, data collection, analysis, report",
  period: "Apr 2026 · end-term SMA project",
  status: "Complete",
  thesis:
    "Proves I can take a vague 'analyse a brand' brief, pick defensible metrics, pull real data at scale, and deliver a decision-ready artifact a non-technical stakeholder can act on.",
  oneLiner:
    "Net Sentiment Score of +28.6 pp, roughly 2× the consumer-brand benchmark, with 100% hashtag discipline across a 50-video catalog.",
  problem: [
    "Every marketing-ops deck claims \"audience sentiment trending positive.\" Few of them show the math. I wanted to build a sentiment analysis I'd actually trust for a recommendation, starting from the raw comments, with a reproducible pipeline end-to-end.",
    "Red Bull was the right target: a 27.9-million-subscriber channel, consistent content type, and a brand identity that's either working or it isn't. If the methodology holds on a hard case (stunts, POVs, Formula 1) it holds anywhere.",
  ],
  approach: [
    {
      heading: "Pipeline, six scripts",
      body: [
        "`scrape_youtube.py` pulls 500 comments across the 5 most-commented recent videos via YouTube Data API v3. `fetch_descriptions.py` enriches video metadata with hashtags from 50 video descriptions via yt-dlp, no API quota burned.",
        "`analysis.py` cleans, scores with VADER (compound ≥ 0.05 → positive, ≤ −0.05 → negative, else neutral), extracts keywords, and categorises complaints. Then `build_excel_dashboard.py`, `build_report.py`, and `build_executive_summary.py` emit the three deliverables: an 8-chart Excel dashboard, a Word report, and a one-page executive PDF.",
      ],
    },
    {
      heading: "Sampling choices worth defending",
      body: [
        "Capped at 100 comments per video × 5 videos = 500 total. A single mega-viral video would dominate if uncapped, and the story I needed was brand-level not video-level.",
        "Hashtag analysis pulled across a wider 50-video catalog, hashtags are brand policy, not audience reaction, so a bigger sample reveals the discipline pattern. That's how the \"100% hashtag adoption on every video\" finding surfaced.",
      ],
    },
    {
      heading: "The findings that matter",
      body: [
        "Organic keyword frequency: \"gives\" (35) and \"wings\" (31) are the top two, ahead of any adrenaline or F1 term. The slogan has genuine unprompted recall.",
        "Hashtag discipline: #RedBull and #GivesYouWiiings appear on 100% of the 50-video catalog. That's unusually strict brand-policy enforcement for an entertainment channel.",
        "The main genuine complaint is viewer anxiety about stunt safety (18 comments), not product taste or price (2). That's a brand-equity signal, not a marketing failure to fix.",
      ],
    },
    {
      heading: "Why the numbers are defensible",
      body: [
        "I chose VADER's official thresholds rather than tuning to taste, deduplicated on comment_id before analysis, and flagged complaint categories by keyword rules that are visible in `analysis.py`, anyone can re-run the pipeline and audit the exact classification rule for any comment.",
        "YouTube Data API v3 quota usage for the full run: under 250 units of the free 10,000/day budget. Reproducible on a free account.",
      ],
    },
  ],
  decisions: [
    {
      decision: "VADER, not a fine-tuned transformer",
      rationale:
        "A fine-tuned BERT-family model would beat VADER on accuracy by maybe 5 to 10 percentage points. But VADER is deterministic, auditable, runs locally in seconds, and uses published cut-offs. For a brand-sentiment report going to stakeholders, auditability beats incremental accuracy, \"this comment scored negative because its compound score is −0.34\" is a defensible claim.",
    },
    {
      decision: "yt-dlp for descriptions, API for comments",
      rationale:
        "The YouTube Data API is rate-limited and expensive when you need 50 video descriptions. yt-dlp parses the public page, no API key, no quota. Using both tools for what each is best at cut the full pipeline quota usage by roughly 80%.",
    },
    {
      decision: "Ship three deliverable formats, not one",
      rationale:
        "Excel dashboard for the analyst, Word report for the write-up, one-page PDF for the executive. A single format leaves one audience under-served. The executive PDF is the link I'd share first to a marketing director.",
    },
  ],
  metrics: [
    { label: "Comments analysed", value: "500" },
    { label: "Hashtag catalog", value: "50 videos" },
    { label: "Net Sentiment Score", value: "+28.6 pp", note: "≈2× benchmark" },
    { label: "Positive / neutral / negative", value: "47 / 34.6 / 18.4" },
    { label: "Hashtag discipline", value: "100%", note: "#RedBull + #GivesYouWiiings" },
    { label: "API quota used", value: "< 250 units" },
  ],
  stack: [
    {
      category: "Collection",
      items: [
        "YouTube Data API v3",
        "yt-dlp",
        "google-api-python-client",
      ],
    },
    {
      category: "Analysis",
      items: [
        "Python",
        "pandas",
        "NumPy",
        "VADER (vaderSentiment)",
      ],
    },
    {
      category: "Deliverables",
      items: [
        "Matplotlib + Seaborn (9 charts)",
        "WordCloud",
        "openpyxl (Excel dashboard)",
        "python-docx (Word report)",
        "reportlab (Executive PDF)",
      ],
    },
  ],
  links: [
    {
      label: "Read the Executive Summary (PDF)",
      href: "/artifacts/redbull-youtube-executive-summary.pdf",
      kind: "pdf",
    },
    {
      label: "Source on GitHub",
      href: "https://github.com/ArnavGoel03/redbull-youtube-analytics",
      kind: "github",
    },
  ],
});

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}

export function getAllCaseStudySlugs(): string[] {
  return caseStudies.map((c) => c.slug);
}
