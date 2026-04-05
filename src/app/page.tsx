import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Section from "@/components/section";
import SkillsTicker from "@/components/skills-ticker";
import ProjectCard from "@/components/project-card";
import HeroNodes from "@/components/hero-nodes";
import Typewriter from "@/components/typewriter";
import { getFeaturedProjects } from "@/lib/notion";
import { Project } from "@/lib/types";

export const revalidate = 3600;

const staticFeatured: Project[] = [
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
    id: "vaani",
    title: "Vaani — Multilingual AI Chatbot",
    description:
      "Real-time, voice-enabled AI chatbot using OpenAI's API supporting 5+ Indian languages with speech-to-text and text-to-speech pipelines.",
    tags: ["OpenAI API", "Speech Recognition", "NLP"],
    image: "",
    github: "https://github.com/ArnavGoel03/vani",
    demo: "",
    featured: true,
    date: "2024-07",
  },
  {
    id: "style-it",
    title: "Style It — AI Wardrobe Assistant",
    description:
      "AI-powered wardrobe assistant with TensorFlow recommendation engine. Boosted recommendation performance by 30% with semantic vector matching.",
    tags: ["Python", "TensorFlow", "ML"],
    image: "",
    github: "",
    demo: "",
    featured: true,
    date: "2024-04",
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

        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 h-72 w-72 rounded-full bg-indigo-500/5 blur-[100px]" />

        <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full glass px-5 py-2 text-sm">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse-glow" />
            <span className="text-muted-foreground">
              Data Science + Entrepreneurship
            </span>
          </div>

          <h1 className="font-serif text-6xl font-bold leading-[1.1] tracking-tight md:text-8xl lg:text-9xl">
            <span className="text-foreground">Hi, I&apos;m </span>
            <Typewriter
              text="Arnav"
              delay={100}
              startDelay={500}
              className="heading-gradient text-glow"
            />
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            <span className="font-mono text-xs tracking-wider text-primary/60 uppercase block mb-3">
              // ucsd &middot; data science &middot; ml &middot; graph theory
            </span>
            Building at the intersection of Machine Learning, Graph Theory, and
            real-world business — from algorithms to jewelry.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/projects"
              className="btn-glow group inline-flex h-12 items-center gap-2 rounded-xl bg-primary px-7 text-sm font-medium text-primary-foreground transition-all duration-500 hover:bg-primary/90"
            >
              View Projects
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
            <Link
              href="/contact"
              className="btn-border-flow group inline-flex h-12 items-center gap-2 rounded-xl px-7 text-sm font-medium transition-all duration-300"
            >
              Get in Touch
              <ArrowRight
                size={14}
                className="text-primary/70 transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </div>
      </section>

      <SkillsTicker />

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
