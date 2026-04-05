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
    id: "vaani",
    title: "Vaani — Multilingual AI Chatbot",
    description:
      "Real-time, voice-enabled AI chatbot using OpenAI's API supporting 5+ Indian languages with speech-to-text and text-to-speech pipelines.",
    tags: ["OpenAI API", "Speech Recognition", "NLP"],
    image: "",
    github: "",
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
  const featured = notionFeatured.length > 0 ? notionFeatured : staticFeatured;

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
            <span className="heading-gradient text-glow">Arnav</span>
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            UCSD Data Science student building at the intersection of Machine
            Learning, Graph Theory, and real-world business — from algorithms to
            jewelry.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/projects"
              className="group inline-flex h-12 items-center gap-2 rounded-xl bg-primary px-7 text-sm font-medium text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:shadow-[0_0_30px_rgba(167,139,250,0.3)]"
            >
              View Projects
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-12 items-center rounded-xl glass px-7 text-sm font-medium transition-all duration-300 hover:border-primary/30 hover:shadow-[0_0_20px_rgba(167,139,250,0.1)]"
            >
              Get in Touch
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
