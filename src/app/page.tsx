import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Section from "@/components/section";
import SkillsTicker from "@/components/skills-ticker";
import ProjectCard from "@/components/project-card";
import HeroNodes from "@/components/hero-nodes";
import { getFeaturedProjects } from "@/lib/notion";
import { Project } from "@/lib/types";

export const revalidate = 3600;

const staticFeatured: Project[] = [
  {
    id: "buzz",
    title: "Buzz — College Event Discovery",
    description:
      "Native iOS + macOS event app for US college students, launching at UCSD. Multiplatform SwiftUI (no Catalyst), Supabase with PostGIS + RLS, Stripe Connect ticketing, App Clip, ARKit 'Look Around', and a Next.js 16 PWA mirror.",
    tags: ["SwiftUI", "Swift 6", "Supabase"],
    image: "",
    github: "",
    demo: "",
    featured: true,
    date: "2026-04",
  },
  {
    id: "watch-together",
    title: "Watch Together — Cross-Site Video Sync",
    description:
      "Chrome/Firefox/Safari extension that syncs playback on Netflix, YouTube, Disney+, Prime Video, and more. WebSocket relay with heartbeat drift correction, host mode, ad detection, and built-in chat. 59 server tests.",
    tags: ["Chrome Extension", "WebSocket", "Node.js"],
    image: "",
    github: "https://github.com/ArnavGoel03/watch-together",
    demo: "https://chromewebstore.google.com/detail/kilmggcpfkcfpkaapillgloabbgmeeoa",
    featured: true,
    date: "2026-04",
  },
  {
    id: "redbull-youtube-analytics",
    title: "Red Bull YouTube Sentiment Analytics",
    description:
      "End-term Social Media Analytics project — 500 YouTube comments on Red Bull scored with VADER. Net Sentiment Score of +28.6 pp (double the industry benchmark), 8-chart Excel dashboard, Word report, and executive summary PDF.",
    tags: ["Python", "pandas", "VADER"],
    image: "",
    github: "https://github.com/ArnavGoel03/redbull-youtube-analytics",
    demo: "/artifacts/redbull-youtube-executive-summary.pdf",
    featured: true,
    date: "2026-04",
  },
  {
    id: "pcod-tracker",
    title: "PCOD Tracker — AI Health Companion",
    description:
      "AI-powered PCOD/PCOS health app — vent freely and Claude AI auto-extracts symptoms, mood, and meds. Upload lab PDFs for instant hormone parsing. 15 Prisma models, medication streaks, and lab trend charts.",
    tags: ["Next.js 16", "Claude AI", "PostgreSQL"],
    image: "",
    github: "https://github.com/ArnavGoel03/pcod-tracker",
    demo: "https://pcod-tracker.vercel.app",
    featured: true,
    date: "2025-03",
  },
  {
    id: "gondilal-saraf",
    title: "Gondilal Saraf — Full-Stack Jewelry Platform",
    description:
      "Full-stack platform for a century-old family jewelry business — bilingual storefront, live gold rates, AR try-on, Gemini AI descriptions, admin ERP, 15 Prisma models, 26 API routes, and 85 tests.",
    tags: ["Next.js 15", "PostgreSQL", "Gemini AI"],
    image: "",
    github: "https://github.com/ArnavGoel03/Gondilal",
    demo: "https://gondilalsaraf.com",
    featured: true,
    date: "2025-01",
  },
  {
    id: "power-grid-analysis",
    title: "U.S. Power Outages — DSC 80",
    description:
      "DSC 80 project analysing 1,534 major U.S. power outages (2000–2016). Found higher electricity prices correlate with shorter outages (p ≈ 0.007). Random Forest with log-pop-density + severe-weather features: RMSE 6,189 min, R² 0.220.",
    tags: ["Python", "scikit-learn", "Random Forest"],
    image: "",
    github: "https://github.com/ArnavGoel03/Power-grid-analysis",
    demo: "",
    featured: true,
    date: "2024-12",
  },
];

export default async function Home() {
  const notionFeatured = await getFeaturedProjects();
  const notionIds = new Set(notionFeatured.map((p) => p.title.toLowerCase()));
  const extraStatic = staticFeatured.filter(
    (p) => !notionIds.has(p.title.toLowerCase())
  );
  const merged =
    notionFeatured.length > 0
      ? [...notionFeatured, ...extraStatic]
      : staticFeatured;
  const hasLinks = (p: Project) => Boolean(p.github || p.demo);
  const featured = [
    ...merged.filter(hasLinks),
    ...merged.filter((p) => !hasLinks(p)),
  ];

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <HeroNodes />

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />

        <div className="relative z-10 mx-auto max-w-2xl px-6 text-center">
          <h1 className="font-serif text-5xl font-medium leading-[1.05] tracking-tight text-foreground md:text-6xl">
            Arnav Goel
          </h1>

          <p className="mx-auto mt-7 max-w-xl text-base leading-[1.65] text-muted-foreground md:text-lg">
            Data science at UC San Diego. I write code and study models, ship
            products with real users, and help run a jewelry business my family
            started in 1914.
          </p>

          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/projects"
              className="btn-glow group inline-flex h-11 items-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground"
            >
              View projects
              <ArrowRight
                size={15}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </Link>
            <Link
              href="/contact"
              className="btn-border-flow group inline-flex h-11 items-center gap-2 rounded-full px-6 text-sm font-medium"
            >
              Get in touch
              <ArrowRight
                size={14}
                className="opacity-70 transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </div>
      </section>

      <SkillsTicker />

      <Section>
        <div className="grid gap-10 md:grid-cols-5 md:gap-14">
          <div className="md:col-span-3">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
              About
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight md:text-4xl">
              Data science at the intersection of research and real products
            </h2>
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-muted-foreground">
              <p>
                I&apos;m a senior in the BS Data Science program at UC San Diego
                (minor in Entrepreneurship &amp; Innovation) graduating June
                2026 with a 3.96 GPA. My work sits where machine learning meets
                systems that actually ship — Flask microservices for a
                50,000-patient hospital platform at ADA, quantitative research
                at Triton Quant, and the full-stack platform for{" "}
                <Link
                  href="/projects"
                  className="text-foreground underline decoration-primary/40 underline-offset-4 hover:decoration-primary"
                >
                  Gondilal Saraf
                </Link>
                , my family&apos;s century-old jewelry business.
              </p>
              <p>
                I care more about a model that&apos;s honest about its
                limitations than one with a flashy accuracy number, and more
                about code that an on-call engineer can debug at 3 a.m. than
                code that looks clever in a notebook. Open to new-grad
                applied-scientist, ML-engineer, and SWE roles for summer 2026 —
                especially in health, commerce, or infra.
              </p>
            </div>
          </div>

          <div className="md:col-span-2">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
              Selected Outcomes
            </p>
            <ul className="mt-6 space-y-5">
              <li>
                <p className="text-xs font-mono uppercase tracking-[0.15em] text-primary/70">
                  SWE Intern · ADA
                </p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  Flask microservices + Nurse Panel API for a multi-region
                  hospital platform projected to onboard 50k+ patients across
                  120+ hospitals. Cut setup time 60% via Docker.
                </p>
              </li>
              <li>
                <p className="text-xs font-mono uppercase tracking-[0.15em] text-primary/70">
                  Triton Quantitative Trading · UCSD
                </p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  Research &amp; backtest systematic strategies on tick-level
                  data. Feature engineering, time-series normalisation,
                  volatility-adjusted Monte Carlo.
                </p>
              </li>
              <li>
                <p className="text-xs font-mono uppercase tracking-[0.15em] text-primary/70">
                  Digital Platform Lead · Gondilal Saraf
                </p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  Full-stack e-commerce + admin ERP for a 110-year jewelry
                  business. 15 Prisma models, 26 API routes, 85 tests.
                </p>
              </li>
              <li>
                <p className="text-xs font-mono uppercase tracking-[0.15em] text-primary/70">
                  Power Outages · DSC 80
                </p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  Analysed 1,534 U.S. outages (2000–2016). Random Forest with
                  engineered features — R² 0.220, fairness checks across
                  weather vs. non-weather.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </Section>

      <Section>
        <div className="mb-14 flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
              Featured Work
            </p>
            <h2 className="mt-3 font-serif text-4xl font-bold tracking-tight">
              Selected Projects
            </h2>
          </div>
          <Link
            href="/projects"
            className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            View all
            <ArrowRight
              size={14}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </div>
        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </Section>
    </>
  );
}
