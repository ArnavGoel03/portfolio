"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Section from "@/components/section";
import ProjectCard from "@/components/project-card";
import { Project } from "@/lib/types";

const FILTERS: Record<string, string[] | null> = {
  All: null,
  "ML & AI": [
    "machine learning",
    "deep learning",
    "cnn",
    "keras",
    "tensorflow",
    "pytorch",
    "transfer learning",
    "recommender",
    "mobilenetv2",
    "nlp",
    "vader",
    "claude ai",
    "gemini ai",
    "openai api",
    "cse 150a",
    "cse 151",
    "cse 158",
    "cogs 108",
  ],
  "Data Science": [
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
    "cogs 9",
    "cogs 108",
    "time-series",
    "signal processing",
    "vader",
  ],
  "Full-Stack": [
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
    "swift 6",
    "swift",
    "chrome extension",
    "websocket",
    "manifest v3",
    "pwa",
    "framer motion",
  ],
  Strategy: [
    "mgt 127r",
    "case study",
    "technology strategy",
    "s-curve analysis",
    "investment analysis",
    "disruptive innovation",
    "defense tech",
  ],
};

function matchesFilter(project: Project, filter: string): boolean {
  const terms = FILTERS[filter];
  if (!terms) return true;
  const tags = project.tags.map((t) => t.toLowerCase());
  return terms.some((term) => tags.some((t) => t.includes(term)));
}

interface ProjectsViewProps {
  inProgress: Project[];
  personal: Project[];
  team: Project[];
  learning: Project[];
  focus?: string;
}

type SectionKey = "inProgress" | "personal" | "team";

const SECTION_META: Record<
  SectionKey,
  { kicker: string; title: string; subtitle: string }
> = {
  inProgress: {
    kicker: "Currently Building",
    title: "In progress",
    subtitle:
      "Live projects I'm actively working on — specs may shift, links go up when they go up.",
  },
  personal: {
    kicker: "Solo Work",
    title: "Personal projects",
    subtitle:
      "Shipped by me, from empty folder to live users or open-source repo.",
  },
  team: {
    kicker: "Collaborations",
    title: "Team projects",
    subtitle:
      "Group work from UCSD classes and research. Teammates credited on each card.",
  },
};

export default function ProjectsView({
  inProgress,
  personal,
  team,
  learning,
  focus,
}: ProjectsViewProps) {
  const [filter, setFilter] = useState<string>("All");
  const [showLearning, setShowLearning] = useState(false);

  const sections: [SectionKey, Project[]][] = [
    ["inProgress", inProgress.filter((p) => matchesFilter(p, filter))],
    ["personal", personal.filter((p) => matchesFilter(p, filter))],
    ["team", team.filter((p) => matchesFilter(p, filter))],
  ];

  const learningFiltered = learning.filter((p) => matchesFilter(p, filter));

  const totalVisible =
    sections.reduce((acc, [, arr]) => acc + arr.length, 0) +
    learningFiltered.length;

  return (
    <>
      <Section className="pt-0 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          {Object.keys(FILTERS).map((f) => {
            const active = filter === f;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={
                  active
                    ? "rounded-full border border-primary/50 bg-primary/10 px-4 py-1.5 text-xs font-medium text-foreground transition-colors"
                    : "rounded-full border border-foreground/10 bg-transparent px-4 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-foreground/20 hover:text-foreground"
                }
              >
                {f}
              </button>
            );
          })}
        </div>

        {(focus || filter !== "All") && (
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            {focus && (
              <>
                Ordered for{" "}
                <span className="text-foreground">{focus}</span> focus
                {filter !== "All" && " · "}
              </>
            )}
            {filter !== "All" && (
              <>
                Showing <span className="text-foreground">{filter}</span> (
                {totalVisible} project{totalVisible === 1 ? "" : "s"})
              </>
            )}
          </p>
        )}
      </Section>

      <AnimatePresence mode="wait">
        <motion.div
          key={filter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {sections.map(([key, items]) => {
            if (items.length === 0) return null;
            const meta = SECTION_META[key];
            return (
              <Section key={key} className="pt-4">
                <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                      {meta.kicker}
                    </p>
                    <h2 className="mt-2 font-serif text-2xl font-bold tracking-tight md:text-3xl">
                      {meta.title}
                    </h2>
                  </div>
                  <p className="max-w-md text-sm text-muted-foreground/80">
                    {meta.subtitle}
                  </p>
                </div>
                <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
                  {items.map((project, i) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      index={i}
                    />
                  ))}
                </div>
              </Section>
            );
          })}

          {learningFiltered.length > 0 && (
            <Section className="pt-8 pb-20">
              <button
                type="button"
                onClick={() => setShowLearning((v) => !v)}
                aria-expanded={showLearning}
                aria-controls="learning-section"
                className="group flex w-full items-center justify-between gap-4 rounded-2xl border border-foreground/10 bg-foreground/[0.02] px-6 py-5 text-left transition-colors hover:border-foreground/20 hover:bg-foreground/5"
              >
                <div>
                  <p className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                    Early Work
                  </p>
                  <p className="mt-1 font-serif text-lg font-semibold tracking-tight text-foreground/90">
                    {showLearning ? "Hide" : "Show"} {learningFiltered.length} learning project
                    {learningFiltered.length === 1 ? "" : "s"}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground/80">
                    High-school-era CV/ML tutorials — kept for transparency, not for signal.
                  </p>
                </div>
                <ChevronDown
                  size={20}
                  className={`flex-shrink-0 text-muted-foreground transition-transform duration-300 group-hover:text-foreground ${
                    showLearning ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence initial={false}>
                {showLearning && (
                  <motion.div
                    id="learning-section"
                    key="learning-grid"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <div className="grid gap-7 pt-8 md:grid-cols-2 lg:grid-cols-3">
                      {learningFiltered.map((project, i) => (
                        <ProjectCard
                          key={project.id}
                          project={project}
                          index={i}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Section>
          )}

          {totalVisible === 0 && (
            <Section className="pt-8 pb-20">
              <div className="rounded-2xl border border-foreground/10 bg-foreground/5 p-8 text-center">
                <p className="text-sm text-muted-foreground">
                  No projects match{" "}
                  <span className="text-foreground">{filter}</span> yet.
                </p>
                <button
                  onClick={() => setFilter("All")}
                  className="mt-3 text-sm font-medium text-foreground underline-offset-4 hover:underline"
                >
                  Clear filter
                </button>
              </div>
            </Section>
          )}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
