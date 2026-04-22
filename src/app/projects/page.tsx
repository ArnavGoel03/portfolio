import Section from "@/components/section";
import ProjectsView from "./projects-view";
import { getProjects } from "@/lib/notion";
import { Project } from "@/lib/types";

export const revalidate = 3600;

export const metadata = {
  title: "Projects",
  description:
    "Explore projects by Arnav Goel — from multilingual AI chatbots and ML-powered wardrobe assistants to deep learning classifiers and family business web development.",
  openGraph: {
    title: "Projects by Arnav Goel",
    description:
      "Machine Learning, AI, and Web Development projects built by Arnav Goel at UCSD.",
  },
};

const staticProjects: Project[] = [
  {
    id: "buzz",
    title: "Buzz — College Event Discovery",
    description:
      "Building a native event discovery app for US college students, launching first at UCSD. True multiplatform SwiftUI target compiling for iOS 17+ and macOS 14+ from a single codebase (no Catalyst), with an App Clip for instant check-in and an ARKit 'Look Around' mode that anchors events to real-world buildings. Supabase backend (Postgres + PostGIS + Row Level Security + Realtime), Stripe Connect for paid ticketing, and unified push fan-out across APNs / FCM / Web Push. Next.js 16 PWA mirror with JSON-LD structured data, per-campus landing pages, and llms.txt for AEO. Full club admin tools, Greek-life rush flows, textbook marketplace, and safety features baked in.",
    tags: ["SwiftUI", "Swift 6", "Supabase", "PostGIS", "Stripe Connect", "ARKit", "Next.js 16", "PWA"],
    image: "",
    github: "",
    demo: "",
    featured: true,
    date: "2026-04",
    inProgress: true,
  },
  {
    id: "fair-ludo",
    title: "Fair Ludo — Provably Fair Dice Game",
    description:
      "Building a Ludo game for web and mobile around a single principle: no rigged dice, no new-user luck, no hidden handicaps. Server-authoritative rolls using a commit-reveal scheme — the server publishes a hashed seed before each game and reveals it after, so players can replay and verify every roll. Planned stack: Next.js for web, React Native (Expo) for iOS/Android, shared TypeScript game logic, Node.js + WebSockets backend, Postgres for accounts and match history. Core RNG and game logic to be open-sourced so fairness claims are independently auditable.",
    tags: ["Next.js", "React Native", "Expo", "TypeScript", "WebSockets", "Node.js"],
    image: "",
    github: "",
    demo: "",
    featured: true,
    date: "2026-04",
    inProgress: true,
  },
  {
    id: "watch-together",
    title: "Watch Together — Cross-Site Video Sync",
    description:
      "Built a Chrome/Firefox/Safari extension that syncs video playback across any number of devices worldwide. Works on Netflix, YouTube, JioHotstar, Disney+, HBO Max, and Amazon Prime Video — anyone can play, pause, seek, or change speed and it propagates instantly. WebSocket relay server on Render with heartbeat-based drift correction (within 0.5s), per-IP rate limiting, host-only mode, ad detection, and built-in chat. 59 server tests + Puppeteer browser tests. Manifest V3 with site-specific player adapters.",
    tags: ["Chrome Extension", "WebSocket", "Node.js", "Manifest V3", "Render", "Vitest"],
    image: "",
    github: "https://github.com/ArnavGoel03/watch-together",
    demo: "https://chromewebstore.google.com/detail/kilmggcpfkcfpkaapillgloabbgmeeoa",
    featured: true,
    date: "2026-04",
  },
  {
    id: "pcod-tracker",
    title: "PCOD Tracker — AI Health Companion",
    description:
      "Built an AI-powered health management app for women with PCOD/PCOS. Users vent freely and Claude AI auto-extracts symptoms, mood, diet, and medications. Upload lab PDFs and AI parses hormone levels, flags abnormals, and detects medications. Features cycle tracking, medication streaks, lab trend charts via Recharts, calendar heatmaps, and Google OAuth. 15 Prisma models, 14 API routes, and a supportive, privacy-first UX.",
    tags: ["Next.js 16", "Claude AI", "PostgreSQL", "Prisma", "NextAuth", "Recharts"],
    image: "",
    github: "https://github.com/ArnavGoel03/pcod-tracker",
    demo: "https://pcod-tracker.vercel.app",
    featured: true,
    date: "2025-03",
  },
  {
    id: "mlb-playoff-cogs108",
    title: "MLB Playoff Prediction — COGS 108",
    description:
      "Final group project (Team 021, Winter 2026) investigating how early-season team run differential per game, on-base-plus-slugging (OPS), and pitching ERA measured over the first 81 games relate to MLB playoff qualification from 2015–2023 (excluding 2020), and how the predictive power of those metrics shifts by season's end. Pulled team-season data from Fangraphs via pybaseball, cleaned and aggregated to half-season and full-season splits, then compared classification performance across both windows. Scope covered proposal → data checkpoint → EDA → final analysis across four notebooks. I led the ethics section — scoping collection bias, downstream misuse, and limitations on any causal claims.",
    tags: ["Python", "pandas", "pybaseball", "scikit-learn", "Jupyter", "COGS 108"],
    image: "",
    github: "",
    demo: "https://youtu.be/nEdCi9loxAI",
    featured: true,
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
    title: "Anduril Industries — MGT 127R S-Curve Case",
    description:
      "Final group case study for MGT 127R (Winter 2026) analysing Anduril Industries as a potential new S-curve in defense technology. Structured around the technology-S-curve framework from class — mapping Anduril's product portfolio (Lattice, Ghost, Sentry, etc.), evaluating incumbents' innovator's-dilemma posture, and arguing where Anduril sits on the substitution curve against legacy defense primes. Delivered as a group presentation with strategic recommendations on investment and competitive response.",
    tags: ["Technology Strategy", "S-Curve Analysis", "MGT 127R", "Case Study", "Defense Tech"],
    image: "",
    github: "",
    demo: "https://youtu.be/gMxLb814kPM",
    featured: true,
    date: "2026-03",
    team: { size: 6 },
  },
  {
    id: "arkinvest-mgt127r",
    title: "ARK Invest — MGT 127R Disruptive-Tech Case",
    description:
      "Mid-quarter case opening (Week 9, Winter 2026) for MGT 127R examining ARK Invest's disruptive-technology investment strategy. Broke down ARK's thesis framework (genomics, robotics, energy storage, AI, blockchain), their concentrated-portfolio approach, and the return/volatility trade-offs of betting on exponential-technology curves. Framed the fund as an explicit wager on the S-curve adoption rate of multiple compounding innovations — and flagged where that thesis has historically cracked.",
    tags: ["Investment Analysis", "Disruptive Innovation", "MGT 127R", "Case Study", "Technology Strategy"],
    image: "",
    github: "",
    demo: "https://youtu.be/iEqXolIMZVE",
    featured: true,
    date: "2026-03",
    team: { size: 6 },
  },
  {
    id: "har-cse158",
    title: "Human Activity Recognition — CSE 158",
    description:
      "Final group project for CSE 158 (Web Mining and Recommender Systems, Fall 2025) at UCSD. Built a model to classify human activities — walking, sitting, standing, stairs, and more — from wearable-sensor time-series data. Handled the full pipeline: windowing raw accelerometer/gyroscope streams, engineering time- and frequency-domain features, training classifiers, and comparing performance across model families. Covered feature selection, cross-validation, and error analysis against a confusion matrix.",
    tags: ["Python", "scikit-learn", "Time-Series", "Signal Processing", "CSE 158"],
    image: "",
    github: "",
    demo: "https://youtu.be/5Jzb_5LDcEg",
    featured: true,
    date: "2025-12",
    team: { size: 2 },
  },
  {
    id: "cogs9-final",
    title: "COGS 9 — Final Group Project",
    description:
      "Final group project for COGS 9 (Introduction to Data Science) at UCSD, Spring 2025 — a two-person data-science investigation completed end-to-end from question to presentation. Covered the full COGS 9 arc: formulating a research question, sourcing and cleaning data, exploratory analysis, visualisation, and delivering findings as a recorded presentation.",
    tags: ["Python", "pandas", "Data Analysis", "Jupyter", "COGS 9"],
    image: "",
    github: "",
    demo: "https://youtu.be/ZcxTi0N75BI",
    featured: false,
    date: "2025-06",
    team: { size: 2 },
  },
  {
    id: "gondilal-saraf",
    title: "Gondilal Saraf — Full-Stack Jewelry Platform",
    description:
      "Built a full-stack platform for my family's century-old jewelry business — bilingual storefront with live gold rates, 10-year investment charts, and a cinematic heritage design system. Includes a product catalogue with AR virtual try-on, AI-generated descriptions via Gemini 2.0 Flash, and an admin ERP with image processing pipeline (Photoroom + Sharp). 15 Prisma models, 26 API routes, OTP auth, AES encryption, and 85 tests.",
    tags: ["Next.js 15", "PostgreSQL", "Gemini AI", "Prisma", "TypeScript", "Framer Motion"],
    image: "",
    github: "https://github.com/ArnavGoel03/Gondilal",
    demo: "https://gondilalsaraf.com",
    featured: true,
    date: "2025-01",
  },
  {
    id: "redbull-youtube-analytics",
    title: "Red Bull YouTube Sentiment Analytics",
    description:
      "End-term Social Media Analytics project analysing the Red Bull brand on YouTube. Collected 500 comments from the 5 most-commented recent videos via the YouTube Data API v3 and pulled hashtags from 50 video descriptions with yt-dlp. Scored every comment with VADER — 47% positive, 34.6% neutral, 18.4% negative, for a Net Sentiment Score of +28.6 percentage points (roughly double the industry benchmark). Every Red Bull video uses exactly 2 hashtags (#RedBull + #GivesYouWiiings — 100% of catalog), top organic keywords are 'gives' and 'wings', and the main genuine complaint is viewer anxiety about stunt safety. Delivered an 8-chart Excel dashboard, Word report, and a one-page executive summary PDF.",
    tags: ["Python", "pandas", "VADER", "YouTube Data API", "yt-dlp", "Matplotlib", "openpyxl"],
    image: "",
    github: "https://github.com/ArnavGoel03/redbull-youtube-analytics",
    demo: "/artifacts/redbull-youtube-executive-summary.pdf",
    featured: true,
    date: "2026-04",
  },
  {
    id: "power-grid-analysis",
    title: "U.S. Power Outages — DSC 80",
    description:
      "Two-person DSC 80 project (with Paulina Pelayo) analysing 1,534 major U.S. power outages from 2000–2016 across 53 features from the DOE. Covered the full data-science arc: cleaning and timestamp reconciliation, NMAR missingness reasoning, permutation tests, and predictive modelling. Found severe weather drives the longest outages, fuel-supply emergencies are rare but disruptive, and higher residential electricity prices correlate with shorter restoration times (p ≈ 0.007) — suggesting greater grid-reliability investment. Random Forest regressor with log-transformed population density and a severe-weather indicator reached RMSE 6,189 min and R² 0.220, with fairness checks across weather vs. non-weather outages.",
    tags: ["Python", "pandas", "scikit-learn", "Random Forest", "Permutation Testing", "DSC 80"],
    image: "",
    github: "https://github.com/ArnavGoel03/Power-grid-analysis",
    demo: "",
    featured: true,
    date: "2024-12",
    team: {
      size: 2,
      members: ["Paulina Pelayo"],
    },
  },
  {
    id: "cardranker",
    title: "CardRanker — Credit Card Value Calculator",
    description:
      "A small SwiftUI iOS tool that ranks credit cards by net annual value given your spending profile across groceries, dining, travel, and other categories. Takes per-card reward rates and annual fees, then surfaces the card that actually earns you the most after fees — not just the highest sticker rate. A quick personal-finance utility to sharpen my Swift fundamentals.",
    tags: ["SwiftUI", "Swift", "iOS"],
    image: "",
    github: "",
    demo: "",
    featured: false,
    date: "2025-10",
  },
  {
    id: "vaani",
    title: "Vaani — Multilingual AI Chatbot",
    description:
      "Co-built with Ahaskar: a voice-first AI chatbot for Indian-language customer support. OpenAI's LLM + speech APIs behind a Flask microservice backend, with a speech-to-text → intent → text-to-speech pipeline across 5+ Indian languages. Shelved mid-build after a clear-eyed market-fit check — in the Indian SME market we were targeting, a human customer-support agent costs less per conversation than bleeding-edge LLM inference. Keeping it listed as a reminder that the right call is sometimes to stop, not ship.",
    tags: ["OpenAI API", "Flask", "Speech Recognition", "NLP", "Python"],
    image: "",
    github: "",
    demo: "",
    featured: false,
    date: "2024-07",
    team: {
      size: 2,
      members: ["Ahaskar"],
    },
  },
  {
    id: "handwritten-digits",
    title: "Handwritten Digits Classifier",
    description:
      "My first machine-learning project — a TensorFlow/Keras CNN trained on the MNIST dataset to recognise handwritten digits 0–9. Built during the AI elective at Delhi Public School, R. K. Puram, and recently cleaned up into a reproducible repo reaching ~99.2% test accuracy in under a minute on CPU. Walks through the full pipeline end-to-end: data loading and normalisation, a two-block Conv → Pool architecture, training, confusion-matrix evaluation, and a single-image prediction CLI.",
    tags: ["TensorFlow", "Keras", "CNN", "MNIST", "Python"],
    image: "",
    github: "https://github.com/ArnavGoel03/handwritten-digits-classifier",
    demo: "",
    featured: false,
    date: "2022-01",
    learning: true,
  },
  {
    id: "pet-classifier",
    title: "Pet Classifier Model",
    description:
      "Early computer-vision project — a CNN that classifies pets from photographs. Originally built during my high-school AI elective at Delhi Public School, R. K. Puram on a private school-provided dataset, then rebuilt as a public, reproducible repo on the Oxford-IIIT Pet Dataset (37 breeds, ~7,400 images). Uses MobileNetV2 transfer learning with a two-stage schedule — head training then fine-tuning the last ~30 base layers — targeting ~92% test accuracy. Ships with training, evaluation, and a single-image breed-prediction CLI.",
    tags: ["TensorFlow", "Keras", "Transfer Learning", "MobileNetV2", "Computer Vision", "Python"],
    image: "",
    github: "https://github.com/ArnavGoel03/pet-classifier",
    demo: "",
    featured: false,
    date: "2022-01",
    learning: true,
  },
];

// Tag-boost lists for ?focus=<x> URL param. When present, projects whose tags
// match these terms are ranked higher within their section. Fully dynamic —
// adding a new Project with a matching tag auto-participates.
const FOCUS_BOOSTS: Record<string, string[]> = {
  ml: [
    "machine learning",
    "deep learning",
    "cnn",
    "keras",
    "tensorflow",
    "pytorch",
    "scikit-learn",
    "transfer learning",
    "recommender",
    "mobilenetv2",
    "vader",
    "nlp",
    "claude ai",
    "gemini ai",
    "openai api",
  ],
  data: [
    "python",
    "pandas",
    "numpy",
    "scikit-learn",
    "jupyter",
    "data analysis",
    "random forest",
    "permutation testing",
    "pybaseball",
    "dsc 80",
    "cogs 108",
    "time-series",
    "signal processing",
  ],
  fullstack: [
    "next.js",
    "next.js 15",
    "next.js 16",
    "typescript",
    "react",
    "prisma",
    "postgresql",
    "supabase",
    "flask",
    "swiftui",
    "chrome extension",
    "websocket",
    "manifest v3",
    "pwa",
    "framer motion",
  ],
  quant: [
    "time-series",
    "backtesting",
    "monte carlo",
    "pandas",
    "python",
    "quantitative",
    "numpy",
  ],
  strategy: [
    "mgt 127r",
    "case study",
    "technology strategy",
    "s-curve analysis",
    "investment analysis",
    "disruptive innovation",
    "defense tech",
  ],
};

function focusBoost(project: Project, focus?: string): number {
  if (!focus) return 0;
  const terms = FOCUS_BOOSTS[focus.toLowerCase()];
  if (!terms) return 0;
  const tags = project.tags.map((t) => t.toLowerCase());
  const matches = terms.filter((term) =>
    tags.some((t) => t.includes(term))
  ).length;
  return matches * 15;
}

function relevanceScore(p: Project, focus?: string): number {
  let score = 0;
  if (p.demo) score += 50;
  if (p.github) score += 30;
  if (p.featured) score += 20;
  score += new Date(p.date + "-01").getTime() / 1e11;
  score += focusBoost(p, focus);
  return score;
}

function sortByRelevance(projects: Project[], focus?: string): Project[] {
  return [...projects].sort(
    (a, b) => relevanceScore(b, focus) - relevanceScore(a, focus)
  );
}

export default async function Projects({
  searchParams,
}: {
  searchParams: Promise<{ focus?: string }>;
}) {
  const { focus } = await searchParams;

  const notionProjects = await getProjects();
  const notionIds = new Set(notionProjects.map((p) => p.title.toLowerCase()));
  const extraStatic = staticProjects.filter(
    (p) => !notionIds.has(p.title.toLowerCase())
  );
  const merged =
    notionProjects.length > 0
      ? [...notionProjects, ...extraStatic]
      : staticProjects;

  const inProgress = sortByRelevance(
    merged.filter((p) => p.inProgress && !p.learning),
    focus
  );
  const personal = sortByRelevance(
    merged.filter((p) => !p.inProgress && !p.team && !p.learning),
    focus
  );
  const team = sortByRelevance(
    merged.filter((p) => !p.inProgress && !!p.team && !p.learning),
    focus
  );
  const learning = sortByRelevance(
    merged.filter((p) => p.learning),
    focus
  );

  return (
    <>
      <Section className="pt-36 pb-6">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-foreground/80">
          Projects
        </p>
        <h1 className="mt-3 font-serif text-5xl font-bold tracking-tight md:text-6xl">
          Things I&apos;ve{" "}
          <span className="heading-gradient text-glow">Built</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted-foreground">
          Work spanning machine learning, full-stack platforms, and data science
          — split into what I&apos;m building now, solo work, and collaborations
          with named teammates. Click a tag to filter.
        </p>
      </Section>

      <ProjectsView
        inProgress={inProgress}
        personal={personal}
        team={team}
        learning={learning}
        focus={focus}
      />
    </>
  );
}
