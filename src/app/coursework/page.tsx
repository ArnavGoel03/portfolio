import {
  Brain,
  BarChart3,
  Sigma,
  Code2,
  Briefcase,
  Feather,
  Microscope,
  ExternalLink,
} from "lucide-react";
import Section from "@/components/section";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Coursework",
  description:
    "Courses taken by Arnav Goel during his BS in Data Science at UC San Diego — Machine Learning, Data Science, Mathematics, CS foundations, the Entrepreneurship & Innovation minor, and the Seventh College Synthesis writing program. Sourced from the official UCSD degree audit.",
  openGraph: {
    title: "Coursework — Arnav Goel",
    description:
      "A running log of courses taken at UC San Diego, with grades and quarters.",
  },
};

type Course = {
  code: string;
  name: string;
  quarter?: string;
  grade?: string;
  wip?: boolean;
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
    id: "ml-ai",
    title: "Machine Learning & AI",
    icon: Brain,
    blurb:
      "Upper-division ML, deep learning, and probabilistic reasoning — the core of the Data Science major.",
    courses: [
      {
        code: "CSE 150A",
        name: "AI: Probabilistic Models",
        quarter: "Winter 2026",
        grade: "A",
        description:
          "Bayesian networks, hidden Markov models, and reinforcement-learning foundations.",
      },
      {
        code: "CSE 151A",
        name: "ML: Learning Algorithms",
        quarter: "Spring 2025",
        grade: "B+",
        description:
          "Supervised and unsupervised learning algorithms from the ground up.",
      },
      {
        code: "CSE 151B",
        name: "Deep Learning",
        quarter: "Summer 2026",
        wip: true,
        description:
          "Neural-network architectures, optimisation, and modern deep-learning practice.",
      },
      {
        code: "CSE 158R",
        name: "Recommender Systems & Web Mining",
        quarter: "Fall 2025",
        grade: "B+",
        description:
          "Large-scale recommendation, text mining, and graph-based ML methods.",
      },
      {
        code: "LIGN 167",
        name: "Deep Learning for Natural Language",
        quarter: "Fall 2025",
        grade: "A",
        description:
          "Neural language models, attention, and modern NLP pipelines.",
      },
    ],
  },
  {
    id: "data-science",
    title: "Data Science",
    icon: BarChart3,
    blurb:
      "Core Data Science major coursework — from Python and Pandas through production pipelines and web-scale practice. Senior project (DSC 180A/180B) still to come.",
    courses: [
      {
        code: "DSC 10",
        name: "Principles of Data Science",
        quarter: "Winter 2024",
        grade: "A",
        description:
          "Python, Pandas, probability, hypothesis testing, and prediction.",
      },
      {
        code: "DSC 20",
        name: "Programming & Data Structures for Data Science",
        quarter: "Spring 2024",
        grade: "A",
        description:
          "Object-oriented programming, recursion, and core structures applied to data problems.",
      },
      {
        code: "DSC 30",
        name: "Data Structures & Algorithms for Data Science",
        quarter: "Summer 2025",
        grade: "A+",
        description:
          "Performance-oriented data structures and algorithms for scale.",
      },
      {
        code: "DSC 40A",
        name: "Theoretical Foundations of Data Science I",
        quarter: "Spring 2025",
        grade: "B",
        description:
          "Loss functions, gradient methods, and the mathematics of model fitting.",
      },
      {
        code: "DSC 40B",
        name: "Theoretical Foundations of Data Science II",
        quarter: "Fall 2025",
        grade: "A",
        description:
          "Graph algorithms, computational complexity, and theoretical ML.",
      },
      {
        code: "DSC 80",
        name: "The Practice of Data Science",
        quarter: "Fall 2025",
        grade: "A",
        description:
          "End-to-end: scraping, cleaning, missingness reasoning, modelling, and communication.",
      },
      {
        code: "DSC 100",
        name: "Introduction to Data Management",
        quarter: "Winter 2026",
        grade: "A+",
        description:
          "Relational algebra, SQL at scale, and storage-layer design.",
      },
      {
        code: "DSC 190",
        name: "Topics in Data Science",
        quarter: "Winter 2026",
        grade: "A",
      },
      {
        code: "COGS 9",
        name: "Introduction to Data Science",
        quarter: "Spring 2025",
        grade: "A+",
      },
      {
        code: "COGS 108",
        name: "Data Science in Practice",
        quarter: "Winter 2026",
        grade: "A+",
        description:
          "Team project — ethics, data, EDA, and modelling through a reproducible notebook.",
      },
    ],
  },
  {
    id: "mathematics",
    title: "Mathematics & Statistics",
    icon: Sigma,
    blurb:
      "Calculus, linear algebra, differential equations, and the statistical inference that underpins ML and data science.",
    courses: [
      {
        code: "MATH 18",
        name: "Linear Algebra",
        quarter: "Fall 2022",
        grade: "A+",
        description:
          "Vector spaces, linear maps, eigenvalues, and matrix decompositions.",
      },
      {
        code: "MATH 20A",
        name: "Calculus I — Science & Engineering",
        quarter: "Fall 2022",
        grade: "A+",
      },
      {
        code: "MATH 20B",
        name: "Calculus II — Science & Engineering",
        quarter: "Spring 2023",
        grade: "A+",
      },
      {
        code: "MATH 20C",
        name: "Calculus III — Multivariable",
        quarter: "Fall 2023",
        grade: "A",
      },
      {
        code: "MATH 20D",
        name: "Introduction to Differential Equations",
        quarter: "Winter 2024",
        grade: "A",
      },
      {
        code: "MATH 109",
        name: "Mathematical Reasoning",
        quarter: "Winter 2025",
        grade: "A",
        description:
          "Proof techniques, logical structure, and foundations of rigorous mathematics.",
      },
      {
        code: "MATH 183",
        name: "Statistical Methods",
        quarter: "Winter 2024",
        grade: "A+",
        description:
          "Probability, estimation, hypothesis testing, and regression.",
      },
      {
        code: "MATH 189",
        name: "Data Analysis and Inference",
        quarter: "Summer 2025",
        grade: "A",
        description:
          "Applied statistical inference and experimental design for data-science problems.",
      },
    ],
  },
  {
    id: "computer-science",
    title: "Computer Science",
    icon: Code2,
    blurb:
      "Programming foundations, data structures, and the practical toolchain that supports everything else.",
    courses: [
      {
        code: "CSE 11",
        name: "Accelerated Introduction to Programming",
        quarter: "Fall 2022",
        grade: "A",
      },
      {
        code: "CSE 12",
        name: "Basic Data Structures & Object-Oriented Design",
        quarter: "Winter 2023",
        grade: "Pass",
      },
      {
        code: "CSE 15L",
        name: "Software Tools & Techniques Laboratory",
        quarter: "Winter 2023",
        grade: "A",
        description:
          "Unix, Git, debugging, and testing — the toolchain of real software.",
      },
      {
        code: "CSE 20",
        name: "Discrete Mathematics",
        quarter: "Fall 2023",
        grade: "A",
      },
    ],
  },
  {
    id: "entrepreneurship",
    title: "Entrepreneurship & Innovation (Minor)",
    icon: Briefcase,
    blurb:
      "Rady School minor (M077) coursework — startups, product, finance, and technology strategy. Minor GPA: 3.950.",
    courses: [
      {
        code: "MGT 16",
        name: "Personal Ethics at Work",
        quarter: "Winter 2025",
        grade: "Pass",
      },
      {
        code: "MGT 103",
        name: "Product Marketing & Management",
        quarter: "Winter 2025",
        grade: "A",
      },
      {
        code: "MGT 121A",
        name: "Innovation to Market A",
        quarter: "Winter 2025",
        grade: "A−",
      },
      {
        code: "MGT 121B",
        name: "Innovation to Market B",
        quarter: "Spring 2025",
        grade: "A+",
      },
      {
        code: "MGT 127R",
        name: "AI & Technology Strategy",
        quarter: "Winter 2026",
        grade: "A",
        description:
          "S-curve framework, innovator's dilemma, and disruptive-technology case studies (ARK Invest, Anduril).",
      },
      {
        code: "MGT 175",
        name: "Supply Chain Management",
        quarter: "Spring 2025",
        grade: "A+",
      },
      {
        code: "MGT 187",
        name: "New Venture Finance",
        quarter: "Winter 2025",
        grade: "A",
      },
    ],
  },
  {
    id: "synthesis",
    title: "Writing & Synthesis — Seventh College",
    icon: Feather,
    blurb:
      "Seventh College's writing and GE sequence themed around \"A Changing Planet.\" Intensive writing alongside the Analytical Writing Program (AWP). My coursework threads a personal research focus on combating climate change.",
    courses: [
      {
        code: "AWP 4A",
        name: "Analytical Writing A",
        quarter: "Winter 2023",
        grade: "Pass",
      },
      {
        code: "AWP 4B",
        name: "Analytical Writing B",
        quarter: "Spring 2023",
        grade: "B+",
      },
      {
        code: "SYN 1",
        name: "Synthesis I — Communicating / Changing Planet",
        quarter: "Spring 2024",
        grade: "A",
      },
      {
        code: "SYN 2",
        name: "Synthesis II — Inquiring / Changing Planet",
        quarter: "Summer 2024",
        grade: "A",
        description: "Taken remotely.",
      },
      {
        code: "SYN 100",
        name: "Synthesis III — Engaging / Changing Planet",
        quarter: "Summer 2026",
        wip: true,
        description: "Upper-division project-based capstone.",
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
    id: "electives",
    title: "Economics, Humanities & Natural Sciences",
    icon: Microscope,
    blurb:
      "Breadth coursework outside the major — economics grounding, chemistry fundamentals, and humanities electives for GE.",
    courses: [
      {
        code: "ECON 1",
        name: "Principles of Microeconomics",
        quarter: "Spring 2023",
        grade: "A+",
      },
      {
        code: "ECON 3",
        name: "Principles of Macroeconomics",
        quarter: "Winter 2024",
        grade: "A+",
      },
      {
        code: "CHEM 4",
        name: "Chemical Thinking",
        quarter: "Fall 2022",
        grade: "A",
      },
      {
        code: "CHEM 6A",
        name: "General Chemistry I",
        quarter: "Winter 2023",
        grade: "A",
      },
      {
        code: "CHEM 6B",
        name: "General Chemistry II",
        quarter: "Spring 2023",
        grade: "Pass",
      },
      {
        code: "LIGN 17",
        name: "Making and Breaking Codes",
        quarter: "Spring 2024",
        grade: "A",
        description: "Cryptography and the history of coded communication.",
      },
      {
        code: "MUS 17",
        name: "Hip-Hop",
        quarter: "Spring 2024",
        grade: "Pass",
      },
      {
        code: "TDAC 1",
        name: "Introduction to Acting",
        quarter: "Summer 2026",
        wip: true,
      },
    ],
  },
];

function GradeBadge({ grade, wip }: { grade?: string; wip?: boolean }) {
  if (wip) {
    return (
      <span className="shrink-0 rounded-full border border-foreground/15 bg-foreground/5 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
        In Progress
      </span>
    );
  }
  if (!grade) return null;
  const isTop = grade === "A+";
  return (
    <span
      className={`shrink-0 rounded-full px-2.5 py-0.5 font-mono text-xs font-medium ${
        isTop
          ? "border border-foreground/20 bg-foreground/10 text-foreground"
          : "border border-foreground/10 bg-foreground/5 text-foreground/80"
      }`}
    >
      {grade}
    </span>
  );
}

export default function Coursework() {
  return (
    <>
      <Section className="pt-36 pb-8">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-foreground/80">
          Coursework
        </p>
        <h1 className="mt-3 font-serif text-5xl font-bold tracking-tight md:text-6xl">
          What I&apos;ve{" "}
          <span className="heading-gradient text-glow">Studied</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          Courses from my BS in Data Science at UC San Diego (Seventh College,
          Sep 2022 &mdash; Jun 2027), organised by subject. Sourced from my
          official degree audit.
        </p>

        <div className="mt-8 grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
              UC GPA
            </p>
            <p className="mt-1 font-serif text-2xl font-semibold text-foreground">
              3.911
            </p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
              Major GPA
            </p>
            <p className="mt-1 font-serif text-2xl font-semibold text-foreground">
              3.860
            </p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
              Minor GPA
            </p>
            <p className="mt-1 font-serif text-2xl font-semibold text-foreground">
              3.950
            </p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
              Units Earned
            </p>
            <p className="mt-1 font-serif text-2xl font-semibold text-foreground">
              181
              <span className="ml-1 text-sm font-normal text-muted-foreground">
                + 12 WIP
              </span>
            </p>
          </div>
        </div>
      </Section>

      {groups.map((group) => (
        <Section key={group.id} className="pt-4">
          <div className="mb-8 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-foreground/10 bg-foreground/5">
              <group.icon size={22} className="text-foreground/80 icon-glow" />
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
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="font-mono text-xs font-medium uppercase tracking-widest text-foreground/80">
                      {course.code}
                    </p>
                    <div className="flex items-center gap-2">
                      {course.quarter && (
                        <Badge
                          variant="secondary"
                          className="border-foreground/10 bg-foreground/5 text-xs font-normal text-foreground/75"
                        >
                          {course.quarter}
                        </Badge>
                      )}
                      <GradeBadge grade={course.grade} wip={course.wip} />
                    </div>
                  </div>
                  <h3 className="mt-3 font-serif text-lg font-semibold tracking-tight">
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
                  className="flex items-center gap-2 rounded-xl border border-foreground/10 bg-foreground/5 px-4 py-2.5 text-sm font-medium text-foreground/80 transition-all hover:border-foreground/20 hover:bg-foreground/8 hover:text-foreground"
                >
                  <ExternalLink size={15} />
                  {artifact.label}
                </a>
              ))}
            </div>
          )}
        </Section>
      ))}

      <Section className="pb-20">
        <p className="max-w-3xl text-sm italic text-muted-foreground/70">
          Grades and quarters above are pulled from my UCSD degree audit. DSC
          102, DSC 106, and the DSC 180A/180B senior project sequence are still
          on the schedule before graduation in June 2027.
        </p>
      </Section>
    </>
  );
}
