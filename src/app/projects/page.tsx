import Section from "@/components/section";
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
// Deliberately NOT here: power-grid-analysis (has a Zenodo DOI),
// redbull-youtube-analytics (flagship), library-walk and syn100-micromobility
// (course-originated but shipped, live products).
const COURSEWORK_IDS = new Set([
  "mlb-playoff-cogs108",
  "arkinvest-anduril-mgt127r",
  "arkinvest-mgt127r",
  "har-cse158",
  "cogs9-final",
]);

const isCoursework = (p: Project) => COURSEWORK_IDS.has(p.id);

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
  // Everything the flagship strip already showed is excluded below, so a
  // project appears once on this page rather than twice.
  const rest = merged.filter((p) => !flagshipIds.has(p.id));

  const inProgress = sortByRelevance(
    rest.filter((p) => p.inProgress && !isCoursework(p))
  );
  const personal = sortByRelevance(
    rest.filter((p) => !p.inProgress && !p.team && !isCoursework(p))
  );
  const team = sortByRelevance(
    rest.filter((p) => !p.inProgress && !!p.team && !isCoursework(p))
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

      <ProjectsView
        inProgress={inProgress}
        personal={personal}
        team={team}
        coursework={coursework}
      />
    </>
  );
}
