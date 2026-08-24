"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Section from "@/components/section";
import ProjectCard from "@/components/project-card";
import { Project } from "@/lib/types";
import { isFocusKey, sortByRelevance } from "@/lib/project-ranking";

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

// Back and forward are the only ways the focus param changes without this
// component remounting, so popstate is the whole subscription.
function subscribeToLocation(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  return () => window.removeEventListener("popstate", onChange);
}

// Returns a plain string or undefined, so React's Object.is check on repeated
// getSnapshot calls sees a stable value and does not loop.
function readFocusParam(): string | undefined {
  const raw = new URLSearchParams(window.location.search).get("focus");
  return isFocusKey(raw) ? raw.toLowerCase() : undefined;
}

interface ProjectsViewProps {
  inProgress: Project[];
  personal: Project[];
  team: Project[];
  coursework: Project[];
  aside: Project[];
}

/**
 * A band that stays fully accessible but starts collapsed, so lower-signal
 * work is one click away instead of diluting the sections above it.
 */
function CollapsibleBand({
  id,
  kicker,
  noun,
  blurb,
  projects,
  className,
}: {
  id: string;
  kicker: string;
  noun: string;
  blurb: string;
  projects: Project[];
  className: string;
}) {
  const [open, setOpen] = useState(false);
  if (projects.length === 0) return null;

  return (
    <Section className={className}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={id}
        className="group flex w-full items-center justify-between gap-4 rounded-2xl border border-foreground/10 bg-foreground/[0.02] px-6 py-5 text-left transition-colors hover:border-foreground/20 hover:bg-foreground/5"
      >
        <div>
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            {kicker}
          </p>
          <p className="mt-1 font-serif text-lg font-semibold tracking-tight text-foreground/90">
            {open ? "Hide" : "Show"} {projects.length} {noun}
            {projects.length === 1 ? "" : "s"}
          </p>
          <p className="mt-1 text-sm text-muted-foreground/80">{blurb}</p>
        </div>
        <ChevronDown
          size={20}
          className={`flex-shrink-0 text-muted-foreground transition-transform duration-300 group-hover:text-foreground ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="grid gap-7 pt-8 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
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
      "Live projects I'm actively working on, specs may shift, links go up when they go up.",
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
  coursework,
  aside,
}: ProjectsViewProps) {
  const [filter, setFilter] = useState<string>("All");

  // `?focus=` is read here, after hydration, rather than from searchParams on
  // the server. Reading it on the server made this whole route render per
  // request; reading it through useSearchParams would have needed a Suspense
  // boundary, and a prerender bails out of a Suspense subtree, so the project
  // list would have been missing from the static HTML a crawler sees. This
  // way the default order ships as real prerendered markup and the param,
  // which nothing on the site links to, still works for anyone who types it.
  //
  // useSyncExternalStore rather than an effect that calls setState: the
  // server snapshot is "no focus", which is exactly what the prerendered HTML
  // contains, so hydration matches and React then swaps in the real value on
  // its own. Reading it in an effect would do the same thing by a route
  // react-hooks/set-state-in-effect rightly complains about.
  const focus = useSyncExternalStore(
    subscribeToLocation,
    readFocusParam,
    () => undefined
  );

  const ordered = useMemo(() => {
    if (!focus) return { inProgress, personal, team, coursework };
    return {
      inProgress: sortByRelevance(inProgress, focus),
      personal: sortByRelevance(personal, focus),
      team: sortByRelevance(team, focus),
      coursework: sortByRelevance(coursework, focus),
    };
  }, [focus, inProgress, personal, team, coursework]);

  // Ordered by recruiter-signal strength: shipped solo > actively being
  // built > team work > coursework (collapsed further down).
  const sections: [SectionKey, Project[]][] = [
    ["personal", ordered.personal.filter((p) => matchesFilter(p, filter))],
    ["inProgress", ordered.inProgress.filter((p) => matchesFilter(p, filter))],
    ["team", ordered.team.filter((p) => matchesFilter(p, filter))],
  ];

  const courseworkFiltered = ordered.coursework.filter((p) =>
    matchesFilter(p, filter)
  );

  const totalVisible =
    sections.reduce((acc, [, arr]) => acc + arr.length, 0) +
    courseworkFiltered.length;

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
              <Section key={key} id={`${key}-section`} className="pt-4">
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

          <CollapsibleBand
            id="coursework-section"
            kicker="Coursework"
            noun="course project"
            blurb="Graded UCSD deliverables. Full write-ups and recorded presentations on every card."
            projects={courseworkFiltered}
            className="pt-8 pb-20"
          />

          {/* Its own band, so it is kept without standing beside the studios.
              kicker, noun and blurb are deliberately empty: naming this band is
              Arnav's to write, and the band renders without them until he does. */}
          {aside.length > 0 && (
            <CollapsibleBand
              id="aside-section"
              kicker="Ideas I'm exploring"
              noun="idea"
              blurb=""
              projects={aside}
              className="pt-0 pb-20"
            />
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
