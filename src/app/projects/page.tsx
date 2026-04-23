import Section from "@/components/section";
import ProjectsView from "./projects-view";
import PinnedFlagships from "@/components/pinned-flagships";
import { getProjects } from "@/lib/notion";
import { Project } from "@/lib/types";
import { staticProjects } from "@/lib/projects";

const FLAGSHIP_ORDER = [
  "watch-together",
  "gondilal-saraf",
  "pcod-tracker",
  "redbull-youtube-analytics",
];

export const revalidate = 3600;

export const metadata = {
  title: "Projects",
  description:
    "Explore projects by Arnav Goel, from multilingual AI chatbots and ML-powered wardrobe assistants to deep learning classifiers and family business web development.",
  openGraph: {
    title: "Projects by Arnav Goel",
    description:
      "Machine Learning, AI, and Web Development projects built by Arnav Goel at UCSD.",
  },
};


// Tag-boost lists for ?focus=<x> URL param. When present, projects whose tags
// match these terms are ranked higher within their section. Fully dynamic:
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

  const flagshipMap = new Map(
    merged.filter((p) => p.featured).map((p) => [p.id, p])
  );
  const flagships = FLAGSHIP_ORDER.map((id) => flagshipMap.get(id)).filter(
    (p): p is Project => Boolean(p)
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
         , split into what I&apos;m building now, solo work, and collaborations
          with named teammates. Click a tag to filter.
        </p>
      </Section>

      <PinnedFlagships projects={flagships} />

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
