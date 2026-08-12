import { Project } from "@/lib/types";

// Canonical project list. Anything listed here gets a /projects/[slug] page.
// Flagship entries render the deep case study from lib/case-studies, everything
// else renders a lighter profile page from this metadata alone.
//
// featured:true is reserved for the four absolute flagship case studies. When
// everything is featured, nothing is, so this is intentionally narrow.
// The studio (folds Trove, Relay, and Tend into ONE entry, they are never
// listed separately). Single source of truth, referenced by the homepage too.
export const studioProject: Project = {
  id: "studio",
  title: "Quiver: A Studio of Private, Native Mac Apps",
  description:
    "A one-person studio building a suite of local-first macOS apps that never phone home: no accounts, no telemetry, nothing leaves your Mac, all unlocked by a single subscription key. Trove packs 40+ utilities (clipboard manager, window manager, system and GPU monitors, OCR, a full PDF kit, disk cleaner, and more) into one native app. Relay is a private, local API client (a Postman / Bruno alternative) with collections, environments, OAuth / AWS / digest auth, and JavaScript pre and post-request scripting, keys stored in the Keychain. Tend is a calm, local-first tasks and calendar app. Built in Swift 6 and SwiftUI with a shared code core and one licensing model across every app, direct-distributed and Developer-ID signed, with a marketing site and per-app SEO.",
  tags: ["Swift 6", "SwiftUI", "macOS", "Local-first", "Keychain", "SwiftPM"],
  image: "/shots/studio.webp",
  github: "",
  // The studio's own site. Not `gettrove.vercel.app`, which belongs to an
  // unrelated company and has never had anything to do with these apps.
  demo: "https://trove.arnavgoel.dev",
  featured: true,
  date: "2026-07",
  inProgress: true,
};

/** True for a standalone suite app (so it can be folded into `studioProject`). */
export function isSuiteApp(p: Project): boolean {
  if (p.id === "studio") return false;
  const t = p.title.trim().toLowerCase();
  return t.startsWith("trove") || t.startsWith("relay") || t.startsWith("tend");
}

export const staticProjects: Project[] = [
  studioProject,
  {
    id: "buzz",
    title: "Buzz: College Event Discovery",
    description:
      "Building a native event discovery app for US college students, launching first at UCSD. True multiplatform SwiftUI target compiling for iOS 17+ and macOS 14+ from a single codebase (no Catalyst), with an App Clip for instant check-in and an ARKit 'Look Around' mode that anchors events to real-world buildings. Supabase backend (Postgres + PostGIS + Row Level Security + Realtime), Stripe Connect for paid ticketing, and unified push fan-out across APNs / FCM / Web Push. Next.js 16 PWA mirror with JSON-LD structured data, per-campus landing pages, and llms.txt for AEO. Full club admin tools, Greek-life rush flows, textbook marketplace, and safety features baked in.",
    tags: ["SwiftUI", "Swift 6", "Supabase", "PostGIS", "Stripe Connect", "ARKit", "Next.js 16", "PWA"],
    image: "/shots/buzz.webp",
    github: "https://github.com/ArnavGoel03/buzz",
    demo: "https://web-eta-two-84.vercel.app/",
    featured: false,
    date: "2026-04",
    inProgress: true,
  },
  {
    id: "simple-games",
    title: "Simple Games: A Studio of Provably Fair Board and Card Games",
    description:
      "A two-site game studio built around one claim: every roll and every shuffle is committed to before anyone knows who it helps, and a player can check it afterwards without trusting the operator. Simple Games is the developer of record for both sites and owns the single legal surface they share, which is the reason the studio exists at all: writing terms three times is how three sets of terms drift apart. Chaupal is the dice half, Ludo and Snakes and Ladders, where the server publishes a hash of its seed before the roll and reveals the seed after, so any player can replay the match and verify every die themselves, and a Luck Ledger at the end separates how much of the result was the dice from how much was the play. Taash is the card half, a card room holding Judgement (Kachuful), 29, Call Break and Pachisa, dealt from a frozen deck order under the same commitment scheme. Both run off one pnpm monorepo of 15 shared packages: the fairness primitives, the board and card engines, a WebSocket realtime layer on a Cloudflare Worker where each room is a Durable Object, a multi-table room protocol in which players sit, stand and spectate across several sittings in one room, identity with Google and password sign-in linked to a single account, ratings, and bot opponents. Judgement seats up to 10 players with dynamic seat reassignment. 85 test files gate it, and the studio site carries byte-exact mirrors of the fairness and card code, pinned to recorded vectors, so the commit-reveal ceremony it runs in the browser cannot drift from what the games actually deal.",
    tags: [
      "Next.js 16",
      "TypeScript",
      "Cloudflare Workers",
      "Durable Objects",
      "WebSockets",
      "Commit-Reveal",
      "Game Design",
      "Monorepo",
    ],
    image: "/shots/simple-games.webp",
    github: "",
    privateRepo: true,
    demo: "https://simplegames-chi.vercel.app",
    surfaces: [
      {
        label: "Simple Games",
        href: "https://simplegames-chi.vercel.app",
        image: "/shots/simple-games.webp",
        blurb: "The studio. The fairness argument in full, and the legal surface both games share.",
      },
      {
        label: "Chaupal",
        href: "https://chaupal-games.vercel.app",
        image: "/shots/s-chaupal.webp",
        blurb: "Ludo and Snakes and Ladders. Board games with dice you can check afterwards.",
      },
      {
        label: "Taash",
        href: "https://judgement-games.vercel.app",
        image: "/shots/s-taash.webp",
        blurb: "The card room: Judgement, 29, Call Break and Pachisa, dealt where anybody can check the deal.",
      },
      {
        label: "Fair play, explained",
        href: "https://simplegames-chi.vercel.app/fair-play",
        image: "/shots/s-fairplay.webp",
        blurb: "The commit-reveal ceremony, with a widget that runs the real thing in your browser.",
      },
    ],
    featured: false,
    date: "2026-08",
    inProgress: true,
  },
  {
    id: "goel-studio",
    title: "Goel Studio: Client Websites and the Software Behind Them",
    description:
      "The commercial practice, kept deliberately separate from my own products: these are other people's businesses, built and written end to end, and the code stays in their repository rather than mine. Six sites are live. Fitout is a reference for planning an Indian room, materials, glass, lighting and controls, costed by what each choice takes to live with. Upkeep covers what a house is made of, what to put on it, and which two bottles under the sink must never meet. Larder is an Indian kitchen reference, heat, vessels, storage and what is actually in the food, sourced row by row. Brighter Rainbow is a music academy in Ulsoor, Bengaluru, with courses, teachers and a drum machine you can play on the front page. Get Fit With Rajat puts a fitness coach's whole practice on one page and was the studio's first paying client. Fevicryl Art On Sale is a retail catalogue assembled from stock that until then existed only as photographs on a phone. Two more, a Delhi cafe and a Lahore restaurant, were built as pitch templates rather than commissions. One standard holds across all of them: prerendered and served from the edge with self-hosted fonts and no third-party trackers, so nothing waits on a script to draw the first screen; copy written as part of the build rather than left as a box for the client to fill; and everything running on free tiers wherever the work allows, so there is no monthly platform they cannot leave. Enquiries from the studio site write straight into Handover Studio, the CRM I built to run the client tier.",
    tags: [
      "Next.js",
      "TypeScript",
      "Client Work",
      "Static Rendering",
      "SEO",
      "Copywriting",
      "Vercel",
    ],
    image: "/shots/goel-studio.webp",
    github: "",
    privateRepo: true,
    demo: "https://goel-studio.vercel.app",
    surfaces: [
      {
        label: "Goel Studio",
        href: "https://goel-studio.vercel.app",
        image: "/shots/goel-studio.webp",
        blurb: "The practice itself. What it builds, what holds true of every site, and the enquiry form.",
      },
      {
        label: "Fitout",
        href: "https://yashgoel-interiors.vercel.app",
        image: "/shots/s-fitout.webp",
        blurb: "A reference for planning an Indian room: materials, glass, lighting, controls, and what each costs to live with.",
      },
      {
        label: "Upkeep",
        href: "https://yashgoel-handyman.vercel.app",
        image: "/shots/s-upkeep.webp",
        blurb: "What a house is made of, what to put on it, and which two bottles under the sink must never meet.",
      },
      {
        label: "Larder",
        href: "https://yashgoel-larder.vercel.app",
        image: "/shots/s-larder.webp",
        blurb: "An Indian kitchen reference: heat, vessels, storage, and what is actually in the food, sourced row by row.",
      },
      {
        label: "Brighter Rainbow",
        href: "https://brma.vercel.app",
        image: "/shots/s-brma.webp",
        blurb: "A music academy in Ulsoor, Bengaluru, with a drum machine you can play on the front page.",
      },
      {
        label: "Get Fit With Rajat",
        href: "https://getfitwithrajat.vercel.app",
        image: "/shots/s-rajat.webp",
        blurb: "A fitness coach's whole practice on one page. The studio's first paying client.",
      },
      {
        label: "Fevicryl Art On Sale",
        href: "https://fevicryl-art-catalog.vercel.app",
        image: "/shots/s-fevicryl.webp",
        blurb: "A retail catalogue built from stock that until then existed only as photographs on a phone.",
      },
    ],
    featured: false,
    date: "2026-08",
    inProgress: true,
  },
  {
    id: "claude-skills",
    title: "arnav-skills: Claude Code Skills Marketplace",
    description:
      "A published marketplace of Claude Code skills distilled from shipping real software with AI agents, each one a workflow paid for in real mistakes rather than a checklist written in the abstract. red-team-ledger closes the loop on automated code-review findings with a checked-in ledger of every finding ever reported, born from a nightly AI red-team that filed 20 reports and re-filed the same critical bug 7 times while nothing got fixed. game-smoke is a headless testing harness pattern for browser games and canvas/WebGL apps: a seedable debug hook, deterministic forced events, poll-not-sleep discipline, and screenshot verification, because a green test suite cannot see a black screen. server-verified-scores is an anti-cheat leaderboard pattern for deterministic games where the client submits a seed and input trace, and the server re-simulates with byte-exact shared physics and stores only the score it computed itself. Installable in any Claude Code session via /plugin marketplace add ArnavGoel03/claude-skills.",
    tags: ["Claude Code", "AI Agents", "Developer Tools", "Code Review", "Testing", "Anti-Cheat"],
    image: "/shots/claude-skills.webp",
    github: "https://github.com/ArnavGoel03/claude-skills",
    demo: "",
    featured: false,
    date: "2026-07",
  },
  {
    id: "library-walk",
    title: "Library Walk: A Playable Micromobility Thesis",
    description:
      "A campus micromobility runner that makes the argument instead of illustrating it, built solo for Group 3 in SYN 100 (Seventh College, UC San Diego). You ride a scooter to class down the real route: the Blue Line drops you at Central Campus station, you take the protected green lane down Gilman Drive past live traffic, and the lane ends exactly where Library Walk and the weekday dismount ban begin, so from there the crowd is the infrastructure. Every ending cites its receipt, a crash logs why it happened (speeding through a crowd, rushing the clock, boxed in uphill, forced to the path edge) and surfaces the research finding that matches that cause, not a random one. Perfect world replays the identical route with the lane never ending, the counterfactual as a second playthrough. Custom Three.js / WebGL renderer with anatomically rigged figures and two-bone IK, Verlet ragdoll crashes over those same joints, one height function shared byte-for-byte between JavaScript and the vertex shader, and 61 OpenStreetMap building footprints projected onto the route. The synthesized score holds a fifth for as long as there is a protected lane under you and drops to a fourth the metre it ends. Class Race puts 25 to 40 phones in a lecture hall on one seed from a projected QR code, over a SQLite-backed Cloudflare Durable Object, and the leaderboard is anti-cheat by re-simulation: the client submits a seed and input trace, and the server recomputes the score itself with byte-exact shared physics on Neon Postgres. A 247-check headless smoke suite gates every release.",
    tags: ["Three.js", "WebGL", "Game Development", "Cloudflare Workers", "Durable Objects", "Neon", "PWA", "SYN 100"],
    image: "/shots/library-walk.webp",
    github: "",
    privateRepo: true,
    demo: "https://library-walk.vercel.app",
    featured: false,
    date: "2026-07",
    collection: "built-for-cars",
  },
  {
    id: "syn100-micromobility",
    title: "Built for Cars, Banned for Bikes: Micromobility Research Site",
    description:
      "The research site behind our SYN 100 project (Seventh College, UC San Diego) on micromobility as climate infrastructure, with Yuvia Cabral and Rut. A single-page explainer plus a working toolkit: the short-trip problem, ridership evidence, UC San Diego as a field site, the barriers that actually stop riders (nowhere to park, nowhere to charge, restricted zones), a peer-campus benchmark, and a policy playbook, every statistic cited. Three pieces of our own fieldwork are published rather than summarised, a 31-response survey across 12 institutions and 4 countries, two structured field observations at Sichuan University and Victor Valley College covering 87 riders, and seven on-site interviews across three campuses, with raw exports withheld, interviewees unnamed, and the one who declined recording paraphrased and never quoted. Ships an interactive trip calculator (car vs bike on cost, CO2, and calories), a resource finder covering all ten UC campuses, a printable flyer, and a share card. It is hand-authored static HTML with no build step, so nothing can import a shared constant, a data/facts.json single source of truth plus a Python drift checker does that job instead: 9 checks, one version string across the worker and the footer, and all 55 published survey figures re-verified against the raw export before every commit. Stale-while-revalidate service worker with a Chrome-dino-style offline ride, and a connection lamp that tests the network rather than trusting navigator.onLine.",
    tags: ["Static HTML", "Service Worker", "PWA", "Data Visualization", "SVG", "Python", "Field Research", "SYN 100"],
    image: "/shots/syn100-micromobility.webp",
    github: "",
    privateRepo: true,
    demo: "https://syn100-micromobility.vercel.app",
    featured: false,
    date: "2026-07",
    collection: "built-for-cars",
    team: {
      size: 3,
      members: ["Yuvia Cabral", "Rut"],
    },
  },
  {
    id: "pidilite-fevicreate",
    title: "Pidilite Fevicreate: Internal School-Engagement Tracker",
    description:
      "Built an internal tool for Pidilite Industries, the FMCG company behind Fevicol and Fevicreate, to track their Fevicreate school-outreach engagement on the ground. Field marketing executives across 8 PSFME territories (Kolkata, Delhi, Bangalore, Chennai, Hyderabad, Mumbai, Pune, Ahmedabad) log GPS-verified visits at schools with live geolocation, on-device camera capture, and anti-spoof guards, working fully offline-first via a service worker and syncing when back online. Territory-scoped FME accounts drive which schools each rep sees, and an admin dashboard gives the team a live view of engagement, who visited which school and when, on an interactive map. Next.js 16 + Neon Postgres (self-initializing schema, no migration step), passcode and email-OTP admin auth, peppered session secrets, and CDN-cached school data for low India latency.",
    tags: ["Next.js 16", "PostgreSQL", "Neon", "PWA", "Geolocation", "Service Worker", "TypeScript"],
    image: "/shots/pidilite-fevicreate.webp",
    github: "",
    privateRepo: true,
    demo: "https://pidilite-school-checkin.vercel.app",
    featured: false,
    date: "2026-05",
  },
  {
    id: "watch-together",
    title: "Watch Together: Cross-Site Video Sync",
    description:
      "Built a Chrome/Firefox/Safari extension that syncs video playback across any number of devices worldwide. Works on Netflix, YouTube, JioHotstar, Disney+, HBO Max, and Amazon Prime Video, anyone can play, pause, seek, or change speed and it propagates instantly. WebSocket relay server on Render with heartbeat-based drift correction (within 0.5s), per-IP rate limiting, host-only mode, ad detection, and built-in chat. 59 server tests + Puppeteer browser tests. Manifest V3 with site-specific player adapters.",
    tags: ["Chrome Extension", "WebSocket", "Node.js", "Manifest V3", "Render", "Vitest"],
    image: "/shots/watch-together.webp",
    github: "https://github.com/ArnavGoel03/watch-together",
    demo: "https://chromewebstore.google.com/detail/kilmggcpfkcfpkaapillgloabbgmeeoa",
    featured: true,
    date: "2026-04",
  },
  {
    id: "serenity",
    title: "Serenity: AI Health Companion",
    description:
      "Built an AI-powered health management app for women with PCOD/PCOS. Users vent freely and Claude AI auto-extracts symptoms, mood, diet, and medications. Upload lab PDFs and AI parses hormone levels, flags abnormals, and detects medications. Features cycle tracking, medication streaks, lab trend charts via Recharts, calendar heatmaps, and Google OAuth. 15 Prisma models, 14 API routes, and a supportive, privacy-first UX.",
    tags: ["Next.js 16", "Claude AI", "PostgreSQL", "Prisma", "NextAuth", "Recharts"],
    image: "/shots/serenity.webp",
    github: "",
    privateRepo: true,
    demo: "https://serenity-pcos.vercel.app",
    featured: true,
    date: "2025-03",
  },
  {
    id: "mlb-playoff-cogs108",
    title: "MLB Playoff Prediction: COGS 108",
    description:
      "Final group project (Team 021, Winter 2026) investigating how early-season team run differential per game, on-base-plus-slugging (OPS), and pitching ERA measured over the first 81 games relate to MLB playoff qualification from 2015 to 2023 (excluding 2020), and how the predictive power of those metrics shifts by season's end. Pulled team-season data from Fangraphs via pybaseball, cleaned and aggregated to half-season and full-season splits, then compared classification performance across both windows. Scope covered proposal → data checkpoint → EDA → final analysis across four notebooks. I led the ethics section, scoping collection bias, downstream misuse, and limitations on any causal claims.",
    tags: ["Python", "pandas", "pybaseball", "scikit-learn", "Jupyter", "COGS 108"],
    image: "/shots/mlb-playoff-cogs108.webp",
    github: "",
    privateRepo: true,
    demo: "https://youtu.be/nEdCi9loxAI",
    featured: false,
    date: "2026-03",
    team: {
      size: 5,
      members: [
        "Lincoln Wirschem",
        "Ricardo Hernandez",
        "Vedant Patel",
        "Aleksey Dykhno",
      ],
    },
  },
  {
    id: "arkinvest-anduril-mgt127r",
    title: "Anduril Industries: MGT 127R S-Curve Case",
    description:
      "Final group case study for MGT 127R (Winter 2026) analysing Anduril Industries as a potential new S-curve in defense technology. Structured around the technology-S-curve framework from class, mapping Anduril's product portfolio (Lattice, Ghost, Sentry, etc.), evaluating incumbents' innovator's-dilemma posture, and arguing where Anduril sits on the substitution curve against legacy defense primes. Delivered as a group presentation with strategic recommendations on investment and competitive response.",
    tags: ["Technology Strategy", "S-Curve Analysis", "MGT 127R", "Case Study", "Defense Tech"],
    image: "/shots/arkinvest-anduril-mgt127r.webp",
    github: "",
    privateRepo: true,
    demo: "https://youtu.be/gMxLb814kPM",
    featured: false,
    date: "2026-03",
    team: { size: 6 },
  },
  {
    id: "arkinvest-mgt127r",
    title: "ARK Invest: MGT 127R Disruptive-Tech Case",
    description:
      "Mid-quarter case opening (Week 9, Winter 2026) for MGT 127R examining ARK Invest's disruptive-technology investment strategy. Broke down ARK's thesis framework (genomics, robotics, energy storage, AI, blockchain), their concentrated-portfolio approach, and the return/volatility trade-offs of betting on exponential-technology curves. Framed the fund as an explicit wager on the S-curve adoption rate of multiple compounding innovations, and flagged where that thesis has historically cracked.",
    tags: ["Investment Analysis", "Disruptive Innovation", "MGT 127R", "Case Study", "Technology Strategy"],
    image: "/shots/arkinvest-mgt127r.webp",
    github: "",
    privateRepo: true,
    demo: "https://youtu.be/iEqXolIMZVE",
    featured: false,
    date: "2026-03",
    team: { size: 6 },
  },
  {
    id: "har-cse158",
    title: "Human Activity Recognition: CSE 158",
    description:
      "Final group project for CSE 158 (Web Mining and Recommender Systems, Fall 2025) at UCSD. Built a model to classify human activities, walking, sitting, standing, stairs, and more, from wearable-sensor time-series data. Handled the full pipeline: windowing raw accelerometer/gyroscope streams, engineering time- and frequency-domain features, training classifiers, and comparing performance across model families. Covered feature selection, cross-validation, and error analysis against a confusion matrix.",
    tags: ["Python", "scikit-learn", "Time-Series", "Signal Processing", "CSE 158"],
    image: "/shots/har-cse158.webp",
    github: "",
    privateRepo: true,
    demo: "https://youtu.be/5Jzb_5LDcEg",
    featured: false,
    date: "2025-12",
    team: { size: 2 },
  },
  {
    id: "cogs9-final",
    title: "COGS 9: Final Group Project",
    description:
      "Final group project for COGS 9 (Introduction to Data Science) at UCSD, Spring 2025, a two-person data-science investigation completed end-to-end from question to presentation. Covered the full COGS 9 arc: formulating a research question, sourcing and cleaning data, exploratory analysis, visualisation, and delivering findings as a recorded presentation.",
    tags: ["Python", "pandas", "Data Analysis", "Jupyter", "COGS 9"],
    image: "/shots/cogs9-final.webp",
    github: "",
    privateRepo: true,
    demo: "https://youtu.be/ZcxTi0N75BI",
    featured: false,
    date: "2025-06",
    team: { size: 2 },
  },
  {
    id: "gondilal-saraf",
    title: "Gondilal Saraf: Full-Stack Jewelry Platform",
    description:
      "Built a full-stack platform for my family's century-old jewelry business, bilingual storefront with live gold rates, 10-year investment charts, and a cinematic heritage design system. Includes a product catalogue with AR virtual try-on, AI-generated descriptions via Gemini 2.0 Flash, and an admin ERP with image processing pipeline (Photoroom + Sharp). 15 Prisma models, 26 API routes, OTP auth, AES encryption, and 85 tests.",
    tags: ["Next.js 15", "PostgreSQL", "Gemini AI", "Prisma", "TypeScript", "Framer Motion"],
    image: "/shots/gondilal-saraf.webp",
    github: "",
    privateRepo: true,
    demo: "https://gondilalsaraf.com",
    featured: true,
    date: "2025-01",
  },
  {
    id: "redbull-youtube-analytics",
    title: "Red Bull YouTube Sentiment Analytics",
    description:
      "End-term Social Media Analytics project analysing the Red Bull brand on YouTube. Collected 500 comments from the 5 most-commented recent videos via the YouTube Data API v3 and pulled hashtags from 50 video descriptions with yt-dlp. Scored every comment with VADER, 47% positive, 34.6% neutral, 18.4% negative, for a Net Sentiment Score of +28.6 percentage points (roughly double the industry benchmark). Every Red Bull video uses exactly 2 hashtags (#RedBull + #GivesYouWiiings, 100% of catalog), top organic keywords are 'gives' and 'wings', and the main genuine complaint is viewer anxiety about stunt safety. Delivered an 8-chart Excel dashboard, Word report, and a one-page executive summary PDF.",
    tags: ["Python", "pandas", "VADER", "YouTube Data API", "yt-dlp", "Matplotlib", "openpyxl"],
    image: "/shots/redbull-youtube-analytics.webp",
    github: "https://github.com/ArnavGoel03/redbull-youtube-analytics",
    demo: "/artifacts/redbull-youtube-executive-summary.pdf",
    featured: true,
    date: "2026-04",
  },
  {
    id: "power-grid-analysis",
    title: "U.S. Power Outages: DSC 80",
    description:
      "Two-person DSC 80 project (with Paulina Pelayo) analysing 1,534 major U.S. power outages from 2000 to 2016 across 53 features from the DOE. Covered the full data-science arc: cleaning and timestamp reconciliation, NMAR missingness reasoning, permutation tests, and predictive modelling. Found severe weather drives the longest outages, fuel-supply emergencies are rare but disruptive, and higher residential electricity prices correlate with shorter restoration times (p ≈ 0.007), suggesting greater grid-reliability investment. Random Forest regressor with log-transformed population density and a severe-weather indicator reached RMSE 6,189 min and R² 0.220, with fairness checks across weather vs. non-weather outages.",
    tags: ["Python", "pandas", "scikit-learn", "Random Forest", "Permutation Testing", "DSC 80"],
    image: "/shots/power-grid-analysis.webp",
    github: "https://github.com/ArnavGoel03/Power-grid-analysis",
    demo: "https://arnavgoel03.github.io/Power-grid-analysis/",
    featured: false,
    date: "2024-12",
    doi: "10.5281/zenodo.19707994",
    team: {
      size: 2,
      members: ["Paulina Pelayo"],
    },
  },
  {
    id: "vaani",
    title: "Vaani: Multilingual AI Chatbot",
    description:
      "Co-built with Ahaskar: a voice-first AI chatbot for Indian-language customer support. OpenAI's LLM + speech APIs behind a Flask microservice backend, with a speech-to-text → intent → text-to-speech pipeline across 5+ Indian languages. Shelved mid-build after a clear-eyed market-fit check, in the Indian SME market we were targeting, a human customer-support agent costs less per conversation than bleeding-edge LLM inference. Keeping it listed as a reminder that the right call is sometimes to stop, not ship.",
    tags: ["OpenAI API", "Flask", "Speech Recognition", "NLP", "Python"],
    image: "",
    github: "",
    privateRepo: true,
    demo: "",
    featured: false,
    date: "2024-07",
    team: {
      size: 2,
      members: [
        {
          name: "Ahaskar",
          url: "https://www.linkedin.com/in/kashyapahaskar/",
        },
      ],
    },
  },
];

export function getProjectById(id: string): Project | undefined {
  return staticProjects.find((p) => p.id === id);
}