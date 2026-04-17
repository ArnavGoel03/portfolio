import {
  BarChart3,
  Code2,
  Sigma,
  Feather,
  Briefcase,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import Section from "@/components/section";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Coursework",
  description:
    "Courses taken by Arnav Goel during his BS in Data Science at UC San Diego — Data Science, Computer Science, Mathematics, and the Seventh College Synthesis writing program.",
  openGraph: {
    title: "Coursework — Arnav Goel",
    description:
      "A running log of courses taken at UC San Diego, organized by subject.",
  },
};

type Course = {
  code: string;
  name: string;
  quarter?: string;
  description?: string;
};

type Artifact = {
  label: string;
  href: string;
};

type Group = {
  id: string;
  title: string;
  icon: typeof BarChart3;
  blurb?: string;
  courses: Course[];
  artifacts?: Artifact[];
};

const groups: Group[] = [
  {
    id: "data-science",
    title: "Data Science",
    icon: BarChart3,
    blurb:
      "Core Data Science major coursework — foundations through applied ML and web-scale data mining.",
    courses: [
      {
        code: "DSC 10",
        name: "Principles of Data Science",
        description:
          "Foundations of data science: Python, Pandas, probability, hypothesis testing, and prediction.",
      },
      {
        code: "DSC 20",
        name: "Programming and Basic Data Structures for Data Science",
        description:
          "Object-oriented programming, recursion, and core data structures applied to data problems.",
      },
      {
        code: "DSC 80",
        name: "The Practice and Application of Data Science",
        description:
          "End-to-end data science workflow: scraping, cleaning, EDA, modeling, and communication.",
      },
    ],
  },
  {
    id: "computer-science",
    title: "Computer Science",
    icon: Code2,
    blurb:
      "CS coursework supporting the Data Science major — systems foundations, AI, and large-scale ML.",
    courses: [
      {
        code: "CSE 15L",
        name: "Software Tools & Techniques Laboratory",
        description:
          "Unix, Git, debugging, testing, and the practical toolchain of software development.",
      },
      {
        code: "CSE 30",
        name: "Computer Organization & Systems Programming",
        description:
          "Machine representation, assembly, C programming, and the hardware-software interface.",
      },
      {
        code: "CSE 150A",
        name: "Introduction to Artificial Intelligence: Probabilistic Reasoning & Decision-Making",
        description:
          "Bayesian networks, Markov models, and reinforcement-learning foundations.",
      },
      {
        code: "CSE 258",
        name: "Recommender Systems & Web Mining",
        description:
          "Large-scale recommendation, text mining, and graph-based ML methods.",
      },
    ],
  },
  {
    id: "mathematics",
    title: "Mathematics",
    icon: Sigma,
    blurb:
      "Calculus, linear algebra, and statistics — the mathematical foundations underpinning ML and data science.",
    courses: [
      {
        code: "MATH 20A",
        name: "Calculus for Science & Engineering I",
        description: "Differential calculus of a single variable.",
      },
      {
        code: "MATH 20B",
        name: "Calculus for Science & Engineering II",
        description: "Integral calculus and applications.",
      },
      {
        code: "MATH 20C",
        name: "Calculus for Science & Engineering III",
        description: "Multivariable calculus: partial derivatives and multiple integrals.",
      },
      {
        code: "MATH 20D",
        name: "Introduction to Differential Equations",
        description: "ODEs, Laplace transforms, and systems of differential equations.",
      },
      {
        code: "MATH 18",
        name: "Linear Algebra",
        description: "Vector spaces, linear transformations, eigenvalues, and matrix decompositions.",
      },
      {
        code: "MATH 183",
        name: "Statistical Methods",
        description:
          "Probability, estimation, hypothesis testing, and regression — the statistical foundation for data science.",
      },
    ],
  },
  {
    id: "synthesis",
    title: "Writing & Synthesis Program — Seventh College",
    icon: Feather,
    blurb:
      "Seventh College's writing and general-education sequence, themed around \"A Changing Planet.\" Combines intensive writing instruction with interdisciplinary inquiry and community engagement, alongside the Analytical Writing Program (AWP) courses. My coursework threads a personal research focus on combatting climate change.",
    courses: [
      {
        code: "AWP 4A",
        name: "Analytical Writing I",
      },
      {
        code: "AWP 4B",
        name: "Analytical Writing II",
      },
      {
        code: "SYN 1",
        name: "Synthesis I — Writing, Community & the Changing Planet",
      },
      {
        code: "SYN 2",
        name: "Synthesis II — Research, Evidence & the Changing Planet",
        description: "Taken remotely.",
      },
      {
        code: "SYN 100",
        name: "Upper-Division Project-Based Capstone",
        description: "Upcoming — not yet taken.",
      },
    ],
    artifacts: [
      {
        label: "Synthesis Writing Portfolio",
        href: "https://sites.google.com/ucsd.edu/synthesis-yash/home",
      },
    ],
  },
  {
    id: "entrepreneurship",
    title: "Entrepreneurship & Innovation (Minor)",
    icon: Briefcase,
    blurb:
      "Rady School minor coursework bridging technical work with startups, product, and business strategy.",
    courses: [
      {
        code: "MGT 16",
        name: "Personal Ethics at Work",
      },
      {
        code: "MGT 121A",
        name: "Entrepreneurship I",
      },
      {
        code: "MGT 121B",
        name: "Entrepreneurship II",
      },
    ],
  },
  {
    id: "electives",
    title: "Electives & General Education",
    icon: Sparkles,
    blurb:
      "Cross-disciplinary courses outside the major — economics, chemistry, and music.",
    courses: [
      {
        code: "ECON 1",
        name: "Principles of Microeconomics",
        description: "Markets, supply and demand, consumer and producer behavior.",
      },
      {
        code: "ECON 3",
        name: "Principles of Macroeconomics",
        description: "GDP, inflation, fiscal and monetary policy, and macro models.",
      },
      {
        code: "CHEM 4",
        name: "Chemical Thinking",
        description: "Foundational chemistry concepts for non-majors.",
      },
      {
        code: "CHEM 6A",
        name: "General Chemistry I",
      },
      {
        code: "CHEM 6B",
        name: "General Chemistry II",
      },
      {
        code: "MUS 17",
        name: "Hip Hop",
        description: "Cultural history and musical evolution of hip-hop.",
      },
    ],
  },
];

export default function Coursework() {
  return (
    <>
      <Section className="pt-36 pb-8">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
          Coursework
        </p>
        <h1 className="mt-3 font-serif text-5xl font-bold tracking-tight md:text-6xl">
          What I&apos;ve{" "}
          <span className="heading-gradient text-glow">Studied</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          A running log of courses from my BS in Data Science at UC San Diego
          (Seventh College, Sep 2022 — Jun 2026), organized by subject.
        </p>
      </Section>

      {groups.map((group) => (
        <Section key={group.id} className="pt-4">
          <div className="mb-8 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
              <group.icon size={22} className="text-primary icon-glow" />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-bold tracking-tight md:text-3xl">
                {group.title}
              </h2>
              {group.blurb && (
                <p className="mt-1 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                  {group.blurb}
                </p>
              )}
            </div>
          </div>

          {group.courses.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2">
              {group.courses.map((course) => (
                <div
                  key={course.code}
                  className="gradient-border glow-card rounded-2xl bg-card p-6 backdrop-blur-sm"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="font-mono text-xs font-medium uppercase tracking-widest text-primary">
                      {course.code}
                    </p>
                    {course.quarter && (
                      <Badge
                        variant="secondary"
                        className="border-primary/10 bg-primary/5 text-xs font-normal text-primary/80"
                      >
                        {course.quarter}
                      </Badge>
                    )}
                  </div>
                  <h3 className="mt-2 font-serif text-lg font-semibold tracking-tight">
                    {course.name}
                  </h3>
                  {course.description && (
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {course.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="gradient-border rounded-2xl bg-card p-6 backdrop-blur-sm">
              <p className="text-sm italic text-muted-foreground">
                Courses coming soon.
              </p>
            </div>
          )}

          {group.artifacts && group.artifacts.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-3">
              {group.artifacts.map((artifact) => (
                <a
                  key={artifact.href}
                  href={artifact.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl border border-primary/20 bg-primary/10 px-4 py-2.5 text-sm font-medium text-primary transition-all hover:border-primary/40 hover:bg-primary/15 hover:shadow-[0_0_20px_rgba(167,139,250,0.2)]"
                >
                  <ExternalLink size={15} />
                  {artifact.label}
                </a>
              ))}
            </div>
          )}
        </Section>
      ))}
    </>
  );
}
