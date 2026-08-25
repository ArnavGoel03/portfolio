import Section from "@/components/section";
import ProjectMatrix from "@/components/project-matrix";
import ProjectsView from "./projects-view";
import FlagshipShowcase from "@/components/flagship-showcase";
import { getProjects } from "@/lib/notion";
import { Project } from "@/lib/types";
import { staticProjects, isSuiteApp, flagshipProjects } from "@/lib/projects";
import { sortByRelevance } from "@/lib/project-ranking";

// Graded course deliverables. Nothing is removed from the site: these keep
// their /projects/[slug] page, their Cmd+K entry, and their sitemap URL, they
// just render in their own collapsed band so they do not sit next to shipped
// work and flatten it. Kept as an explicit id list (same idiom as
// FLAGSHIP_ORDER) so the canonical project list stays untouched.
// The line is what Arnav means by the words, not what the artifact became: a
// class group project is coursework even when it shipped and even when it has a
// DOI. Power Outages keeps its DOI badge and its live link on its own card.
// Deliberately NOT here: library-walk, which is course-originated but is the
// shipped game and carries the whole micromobility collection.
const COURSEWORK_IDS = new Set([
  "power-grid-analysis",
  "mlb-playoff-cogs108",
  "arkinvest-anduril-mgt127r",
  "arkinvest-mgt127r",
  "har-cse158",
  "cogs9-final",
]);

const isCoursework = (p: Project) => COURSEWORK_IDS.has(p.id);

// Kept on the site, out of the shipped-work sections. Built, but not what the
// studios are judged against: Buzz and Serenity do not currently run, and the
// skills repo does not hold up beside them. Standing in the same grid they
// flatten the work that does run, so they sit in their own band instead of
// being removed. Every /projects/[slug] page, Cmd+K entry and sitemap URL is
// untouched.
//
// The five at the bottom are a different case from the five above them. They
// run, and four of the five can be opened right now; what they are not is work
// being carried. A concept armoury, a globe, a studio showcase, an investor
// site and a pre-launch brand are pieces being explored, and this band is
// where the site says so out loud instead of letting the grid imply otherwise.
const ASIDE_IDS = new Set([
  "buzz",
  "vaani",
  "serenity",
  "claude-skills",
  "redbull-youtube-analytics",
  "pitcrew",
  "meridian",
  "qbranch",
  "cutroom",
  "stature",
]);

const isAside = (p: Project) => ASIDE_IDS.has(p.id);

// Folded into another entry rather than listed beside it. Library Walk and the
// research site are one piece of work under the built-for-cars collection, and
// both declared it, so the same four links rendered as two cards.
//
// Library Walk is the entry that shows, not the research site. It is the harder
// build, and its own title already says both halves out loud, so the card reads
// as one argument that was also made playable rather than as two coursework
// pieces. The research site keeps its /projects/syn100-micromobility page and
// is reached from the collection rail, so none of the four URLs change.
const FOLDED_IDS = new Set(["syn100-micromobility"]);

const isFolded = (p: Project) => FOLDED_IDS.has(p.id);

export const revalidate = 3600;

export const metadata = {
  title: "Projects",
  description:
    "Explore projects by Arnav Goel: a Chrome Web Store extension with real weekly users, a native macOS app studio, AI health tools in production, and the full-stack platform behind a 150-year-old family jewelry business.",
  openGraph: {
    title: "Projects by Arnav Goel",
    description:
      "Machine Learning, AI, and Web Development projects built by Arnav Goel at UCSD.",
  },
};



export default async function Projects() {
  const notionProjects = await getProjects();
  const notionIds = new Set(notionProjects.map((p) => p.title.toLowerCase()));
  const extraStatic = staticProjects.filter(
    (p) => !notionIds.has(p.title.toLowerCase())
  );
  const mergedRaw =
    notionProjects.length > 0
      ? [...notionProjects, ...extraStatic]
      : staticProjects;
  // Fold the individual suite apps into the single studio entry.
  const merged = mergedRaw.filter((p) => !isSuiteApp(p));

  const flagshipIds = new Set(flagshipProjects.map((p) => p.id));

  // The filters are the technologies that actually recur, counted rather than
  // chosen, so the row cannot drift from what the projects are made of.
  const tagCounts = new Map<string, number>();
  for (const p of merged) {
    for (const t of p.tags) tagCounts.set(t, (tagCounts.get(t) ?? 0) + 1);
  }
  const explorerTags = [...tagCounts.entries()]
    .filter(([, n]) => n >= 2)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 16)
    .map(([t]) => t);
  // Everything the flagship strip already showed is excluded below, so a
  // project appears once on this page rather than twice.
  const rest = merged.filter(
    (p) => !flagshipIds.has(p.id) && !isAside(p) && !isFolded(p)
  );
  const aside = merged.filter(isAside);

  const inProgress = sortByRelevance(
    rest.filter((p) => p.inProgress && !isCoursework(p))
  );
  // One shipped section, not two. Personal and Team split finished work by who
  // helped, which is a credit question rather than a kind question, and every
  // card already names its teammates. Nothing is a personal collaboration today
  // either, so the second section was empty as well as unclear.
  const personal = sortByRelevance(
    rest.filter((p) => !p.inProgress && !isCoursework(p))
  );
  const coursework = sortByRelevance(rest.filter(isCoursework));

  // The flagships, in the one order decided in projects.ts. This page used to
  // keep a third hand-typed list of ids, which still named Serenity and Red
  // Bull weeks after they were demoted, so the strip contradicted the flag.
  const flagships = merged.filter((p) => flagshipIds.has(p.id));

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

      <FlagshipShowcase projects={flagships} />

      <Section className="pt-4 pb-2">
        <ProjectMatrix projects={merged} columns={explorerTags} />
      </Section>

      <ProjectsView
        inProgress={inProgress}
        personal={personal}
        coursework={coursework}
        aside={aside}
      />
    </>
  );
}
