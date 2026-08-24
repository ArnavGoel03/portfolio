import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Section from "@/components/section";
import SkillsTicker from "@/components/skills-ticker";
import ProjectCard from "@/components/project-card";
import HeroNodes from "@/components/hero-nodes";
import SplitText from "@/components/split-text";
import KineticHeading from "@/components/kinetic-heading";
import Magnetic from "@/components/magnetic";
import FocusParagraph from "@/components/focus-paragraph";
import { getFeaturedProjects } from "@/lib/notion";
import { flagshipProjects, isSuiteApp } from "@/lib/projects";
import { Project } from "@/lib/types";
import { UC_GPA, formatGpa } from "@/lib/constants";

export const revalidate = 3600;

/**
 * The home page leads with the flagships, and does not decide which they are.
 *
 * This used to hold its own hand-typed list of ids, which is two lists for one
 * question and they disagreed: Red Bull was flagged a flagship in projects.ts
 * and missing here, buzz was here and unflagged there, and nothing reconciled
 * them. The list now comes from `featured` in projects.ts, so promoting or
 * demoting a project is one edit in one file.
 */
const staticFeatured: Project[] = flagshipProjects;

export default async function Home() {
  const notionFeatured = await getFeaturedProjects();
  const notionIds = new Set(notionFeatured.map((p) => p.title.toLowerCase()));
  const extraStatic = staticFeatured.filter(
    (p) => !notionIds.has(p.title.toLowerCase())
  );
  const mergedRaw =
    notionFeatured.length > 0
      ? [...notionFeatured, ...extraStatic]
      : staticFeatured;
  // Fold the individual suite apps into the single "studio" entry: never list
  // Trove, Relay, or Tend as separate projects (they live inside the studio).
  const merged = mergedRaw.filter((p) => !isSuiteApp(p));
  const hasLinks = (p: Project) => Boolean(p.github || p.demo);
  const featured = [
    ...merged.filter(hasLinks),
    ...merged.filter((p) => !hasLinks(p)),
  ];

  return (
    <>
      <section className="relative min-h-screen flex items-start md:items-center justify-center overflow-hidden pt-28 pb-16 md:pt-20 md:pb-20">
        <HeroNodes />

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />

        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <p className="font-mono text-[9px] font-medium uppercase tracking-[0.24em] text-muted-foreground sm:text-[10px] sm:tracking-[0.3em]">
            Data Science &middot; UC San Diego &middot; Jun 2027
          </p>

          <h1 className="mt-6 font-serif text-[3rem] font-semibold leading-[0.98] tracking-[-0.02em] text-foreground sm:text-[4.25rem] md:text-[6.5rem] md:leading-[0.96]">
            <KineticHeading text="Arnav Goel" />
          </h1>

          <p className="mt-5 font-serif text-lg font-normal tracking-tight text-foreground/70 md:mt-6 md:text-xl">
            <SplitText
              text="I build data science that ships."
              delay={1.1}
              duration={0.6}
              stagger={0.03}
              mode="words"
            />
          </p>

          <p className="mx-auto mt-7 max-w-2xl text-[15px] leading-[1.65] text-muted-foreground md:mt-8 md:text-base md:leading-[1.7]">
            <SplitText
              text="A Chrome Web Store extension used by real people every week. The full-stack platform behind my family's 150-year jewelry business. AI-powered health tools in production. I build ML and full-stack systems that land in the hands of actual users, not README demos, while finishing a BS in Data Science at UCSD."
              delay={1.7}
              duration={0.5}
              stagger={0.004}
              mode="chars"
            />
          </p>

          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Magnetic strength={0.3}>
              <Link
                href="/projects"
                className="btn-glow group inline-flex h-11 items-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground"
              >
                See the work
                <ArrowRight
                  size={15}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </Link>
            </Magnetic>
            <Magnetic strength={0.3}>
              <Link
                href="/work"
                className="btn-border-flow group inline-flex h-11 items-center gap-2 rounded-full px-6 text-sm font-medium"
              >
                What I&apos;m looking for
                <ArrowRight
                  size={14}
                  className="opacity-70 transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </Link>
            </Magnetic>
          </div>


          <p className="mt-10 text-xs text-muted-foreground">
            Building something of your own?{" "}
            <Link
              href="/ideas"
              className="text-foreground underline decoration-foreground/30 underline-offset-4 hover:decoration-foreground"
            >
              I&apos;m open to co-founding &rarr;
            </Link>
          </p>
        </div>
      </section>

      <SkillsTicker />

      <Section>
        <div className="grid gap-10 md:grid-cols-5 md:gap-14">
          <div className="md:col-span-3">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-foreground/80">
              About
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight md:text-4xl">
              Data science at the intersection of research and real products
            </h2>
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-muted-foreground">
              <FocusParagraph>
                <p>
                  I&apos;m a senior in the BS Data Science program at UC San
                  Diego (minor in Entrepreneurship &amp; Innovation) graduating
                  June 2027 with a {formatGpa(UC_GPA)} GPA. My work sits where machine
                  learning meets systems that actually ship: Flask
                  microservices for a 50,000-patient hospital platform at ADA,
                  quantitative research at Triton Quant, and the full-stack
                  platform for{" "}
                  <Link
                    href="/projects"
                    className="text-foreground underline decoration-primary/40 underline-offset-4 hover:decoration-primary"
                  >
                    Gondilal Saraf
                  </Link>
                  , my family&apos;s century-old jewelry business.
                </p>
              </FocusParagraph>
              <FocusParagraph>
                <p>
                  I care more about a model that&apos;s honest about its
                  limitations than one with a flashy accuracy number, and more
                  about code that an on-call engineer can debug at 3 a.m. than
                  code that looks clever in a notebook. Considering new-grad
                  applied-scientist, ML-engineer, and SWE roles for summer 2027
                  onward, especially in health, commerce, or infra.{" "}
                  <Link
                    href="/work"
                    className="text-foreground underline decoration-foreground/30 underline-offset-4 hover:decoration-foreground"
                  >
                    What I&apos;m looking for →
                  </Link>
                </p>
              </FocusParagraph>
            </div>
          </div>

          <div className="md:col-span-2">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-foreground/80">
              Selected Outcomes
            </p>
            <ul className="mt-6 space-y-5">
              <li>
                <p className="text-xs font-mono uppercase tracking-[0.15em] text-muted-foreground">
                  SWE Intern · ADA
                </p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  Flask microservices + Nurse Panel API for a multi-region
                  hospital platform projected to onboard 50k+ patients across
                  120+ hospitals. Cut setup time 60% via Docker.
                </p>
              </li>
              <li>
                <p className="text-xs font-mono uppercase tracking-[0.15em] text-muted-foreground">
                  Triton Quantitative Trading · UCSD
                </p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  Research &amp; backtest systematic strategies on tick-level
                  data. Feature engineering, time-series normalisation,
                  volatility-adjusted Monte Carlo.
                </p>
              </li>
              <li>
                <p className="text-xs font-mono uppercase tracking-[0.15em] text-muted-foreground">
                  Digital Platform Lead · Gondilal Saraf
                </p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  Full-stack e-commerce + admin ERP for a 150-year jewelry
                  business. 15 Prisma models, 26 API routes, 85 tests.
                </p>
              </li>
              <li>
                <p className="text-xs font-mono uppercase tracking-[0.15em] text-muted-foreground">
                  Power Outages · DSC 80
                </p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  Analysed 1,534 U.S. outages (2000 to 2016). Random Forest with
                  engineered features: R² 0.220, fairness checks across
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
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-foreground/80">
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
