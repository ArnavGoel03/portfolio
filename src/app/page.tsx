import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import Section from "@/components/section";
import SkillsTicker from "@/components/skills-ticker";
import ProjectCard from "@/components/project-card";
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
      <Section className="pt-32 pb-16">
        <div className="flex flex-col items-center text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/50 bg-secondary/50 px-4 py-1.5 text-sm text-muted-foreground">
            <Sparkles size={14} className="text-primary" />
            Data Science + Entrepreneurship
          </div>
          <h1 className="max-w-3xl text-5xl font-bold leading-tight tracking-tight md:text-7xl">
            Hi, I&apos;m{" "}
            <span className="bg-gradient-to-r from-purple-400 via-indigo-400 to-purple-300 bg-clip-text text-transparent">
              Arnav
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            UCSD Data Science student building at the intersection of Machine
            Learning, Graph Theory, and real-world business — from algorithms to
            jewelry.
          </p>
          <div className="mt-8 flex gap-4">
            <Link
              href="/projects"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              View Projects
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-11 items-center rounded-full border border-border bg-background px-6 text-sm font-medium transition-colors hover:bg-muted"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </Section>

      <SkillsTicker />

      <Section>
        <div className="mb-12 flex items-end justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-primary">
              Featured Work
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">
              Selected Projects
            </h2>
          </div>
          <Link
            href="/projects"
            className="hidden items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground md:flex"
          >
            View all
            <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </Section>
    </>
  );
}
