import {
  Brain,
  BarChart3,
  Sigma,
  Code2,
  Briefcase,
  Feather,
  Microscope,
  ExternalLink,
  ChevronDown,
} from "lucide-react";
import Section from "@/components/section";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Coursework",
  description:
    "Courses taken by Arnav Goel during his BS in Data Science at UC San Diego: Machine Learning, Data Science, Mathematics, CS foundations, the Entrepreneurship & Innovation minor, and the Seventh College Synthesis writing program. Sourced from the official UCSD degree audit.",
  openGraph: {
    title: "Coursework: Arnav Goel",
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
      "Upper-division ML, deep learning, and probabilistic reasoning, the core of the Data Science major.",
    courses: [
      {
        code: "CSE 150A",
        name: "AI: Probabilistic Reasoning & Decision-Making",
        quarter: "Winter 2026",
        grade: "A",
        description:
          "Introduction to probabilistic models at the heart of modern AI. Probabilistic methods for reasoning and decision-making under uncertainty, inference and learning in Bayesian networks, prediction and planning in Markov decision processes, applications to intelligent systems.",
      },
      {
        code: "CSE 151A",
        name: "ML: Learning Algorithms",
        quarter: "Spring 2025",
        grade: "B+",
        description:
          "Broad introduction to machine learning. Supervised learning, k-nearest-neighbor classifiers, decision trees, boosting, perceptrons, and unsupervised learning such as k-means and hierarchical clustering.",
      },
      {
        code: "CSE 151B",
        name: "Deep Learning",
        quarter: "Summer 2026",
        wip: true,
        description:
          "Fundamentals of deep neural networks: linear regression, multi-layer perceptrons, backpropagation, and automatic differentiation. Convolutional neural networks, recurrent neural networks, and transformers.",
      },
      {
        code: "CSE 158R",
        name: "Recommender Systems & Web Mining",
        quarter: "Fall 2025",
        grade: "B+",
        description:
          "Current methods for data mining and predictive analytics. Emphasis on studying real-world data sets, building working systems, and putting current ideas from machine-learning research into practice.",
      },
      {
        code: "LIGN 167",
        name: "Deep Learning for Natural Language",
        quarter: "Fall 2025",
        grade: "A",
        description:
          "Introduction to neural-network methods for analyzing linguistic data. Basic architectures and optimization via backpropagation and stochastic gradient descent. Word vectors and recurrent neural networks, and their uses and limitations in modeling the structure of natural language.",
      },
    ],
  },
  {
    id: "data-science",
    title: "Data Science",
    icon: BarChart3,
    blurb:
      "Core Data Science major coursework, from Python and Pandas through production pipelines and web-scale practice. Senior project (DSC 180A/180B) still to come.",
    courses: [
      {
        code: "DSC 10",
        name: "Principles of Data Science",
        quarter: "Winter 2024",
        grade: "A",
        description:
          "First course in data science. Data exploration, statistical inference, and prediction, using the Python programming language for tabular data manipulation, visualization, and simulation. Homework and projects on real-world datasets across a variety of domains.",
      },
      {
        code: "DSC 20",
        name: "Programming & Basic Data Structures for Data Science",
        quarter: "Spring 2024",
        grade: "A",
        description:
          "The structures underlying the programs, algorithms, and languages used in data science. Taught in Python: recursion, higher-order functions, function composition, object-oriented programming, interpreters, classes, and simple data structures such as arrays, lists, and linked lists.",
      },
      {
        code: "DSC 30",
        name: "Data Structures & Algorithms for Data Science",
        quarter: "Summer 2025",
        grade: "A+",
        description:
          "Practical experience composing larger computational systems through several programming projects in Java. Encapsulation, abstract data types, interfaces, algorithms and complexity, and data structures including stacks, queues, priority queues, heaps, linked lists, binary trees, BSTs, and hash tables.",
      },
      {
        code: "DSC 40A",
        name: "Theoretical Foundations of Data Science I",
        quarter: "Spring 2025",
        grade: "B",
        description:
          "First of the theoretical-foundations sequence. Mathematical theory underlying fundamental topics in machine learning: empirical risk minimization, optimization, regression, classification, and discrete probability.",
      },
      {
        code: "DSC 40B",
        name: "Theoretical Foundations of Data Science II",
        quarter: "Fall 2025",
        grade: "A",
        description:
          "Second of the theoretical-foundations sequence. Fundamentals of computer science with applications to data science: time-complexity analysis, analysis of recursive algorithms, graph theory, and graph-search algorithms.",
      },
      {
        code: "DSC 80",
        name: "The Practice & Application of Data Science",
        quarter: "Fall 2025",
        grade: "A",
        description:
          "Bridges lower- and upper-division data science. Students master the data-science life-cycle and the fundamental principles and techniques spanning algorithms, statistics, machine learning, visualization, and data systems.",
      },
      {
        code: "DSC 100",
        name: "Introduction to Data Management",
        quarter: "Winter 2026",
        grade: "A+",
        description:
          "Storage and management of large-scale data using classical relational (SQL) systems, with an eye toward applications in data science. SQL data model and query language, relational data modeling and schema design, cost-based query optimization, relational-database architecture, and database-backed applications.",
      },
      {
        code: "DSC 190",
        name: "Topics in Data Science",
        quarter: "Winter 2026",
        grade: "A",
        description:
          "Topics of special interest in data science. Content varies from quarter to quarter.",
      },
      {
        code: "COGS 9",
        name: "Introduction to Data Science",
        quarter: "Spring 2025",
        grade: "A+",
        description:
          "Concepts of data and its role in science, and the ideas behind data-mining, text-mining, machine learning, and graph theory, and how scientists and companies are leveraging those methods to uncover new insights into human cognition.",
      },
      {
        code: "COGS 108",
        name: "Data Science in Practice",
        quarter: "Winter 2026",
        grade: "A+",
        description:
          "Data science is multidisciplinary, computer science, statistics, cognitive science and psychology, data visualization, AI, and machine learning. The course teaches critical skills needed to pursue a data-science career using hands-on programming and experimental challenges.",
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
          "Matrix algebra, Gaussian elimination, determinants. Linear and affine subspaces, bases of Euclidean spaces. Eigenvalues and eigenvectors, quadratic forms, orthogonal matrices, diagonalization of symmetric matrices. Applications. Symbolic and graphical solutions using MATLAB.",
      },
      {
        code: "MATH 20A",
        name: "Calculus for Science & Engineering",
        quarter: "Fall 2022",
        grade: "A+",
        description:
          "Foundations of differential and integral calculus of one variable. Functions, graphs, continuity, limits, derivative, tangent line. Applications with algebraic, exponential, logarithmic, and trigonometric functions. Introduction to the integral.",
      },
      {
        code: "MATH 20B",
        name: "Calculus for Science & Engineering",
        quarter: "Spring 2023",
        grade: "A+",
        description:
          "Integral calculus of one variable and its applications, with exponential, logarithmic, hyperbolic, and trigonometric functions. Methods of integration. Infinite series. Polar coordinates in the plane and complex exponentials.",
      },
      {
        code: "MATH 20C",
        name: "Calculus & Analytic Geometry for Science & Engineering",
        quarter: "Fall 2023",
        grade: "A",
        description:
          "Vector geometry, vector functions and their derivatives. Partial differentiation. Maxima and minima. Double integration.",
      },
      {
        code: "MATH 20D",
        name: "Introduction to Differential Equations",
        quarter: "Winter 2024",
        grade: "A",
        description:
          "Ordinary differential equations: exact, separable, and linear; constant coefficients, undetermined coefficients, variation of parameters. Systems. Series solutions. Laplace transforms. Techniques for engineering sciences.",
      },
      {
        code: "MATH 109",
        name: "Mathematical Reasoning",
        quarter: "Winter 2025",
        grade: "A",
        description:
          "A variety of topics in mathematics used to introduce rigorous mathematical proof, emphasizing quantifiers, induction, negation, proof by contradiction, naive set theory, equivalence relations, and epsilon-delta proofs.",
      },
      {
        code: "MATH 183",
        name: "Statistical Methods",
        quarter: "Winter 2024",
        grade: "A+",
        description:
          "Introduction to probability. Discrete and continuous random variables, binomial, Poisson, and Gaussian distributions. Central limit theorem. Data analysis and inferential statistics: graphical techniques, confidence intervals, hypothesis tests, curve fitting.",
      },
      {
        code: "MATH 189",
        name: "Exploratory Data Analysis & Inference",
        quarter: "Summer 2025",
        grade: "A",
        description:
          "Quantitative methods and statistical techniques for analyzing data, in particular big data. Quick review of probability, then how to process, analyze, and visualize data using the statistical language R.",
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
        description:
          "Accelerated introductory programming with an object-oriented approach. Variables, conditionals, loops, functions, structured data storage, and mutation in Java; class design, interfaces, basic class hierarchies, recursion, event-based programming, and file I/O. Basics of command-line navigation for file management and running programs.",
      },
      {
        code: "CSE 12",
        name: "Basic Data Structures & Object-Oriented Design",
        quarter: "Winter 2023",
        grade: "Pass",
        description:
          "Use and implementation of basic data structures including linked lists, stacks, and queues, and of advanced structures such as binary trees and hash tables. Object-oriented design including interfaces, polymorphism, encapsulation, abstract data types, pre-/post-conditions, and recursion. Java and Java Collections.",
      },
      {
        code: "CSE 15L",
        name: "Software Tools & Techniques Laboratory",
        quarter: "Winter 2023",
        grade: "A",
        description:
          "Hands-on exploration of software-development tools and techniques. Investigation of the scientific process as applied to software development and debugging, with weekly hands-on laboratory experiences and development of laboratory-notebooking techniques as applied to software design.",
      },
      {
        code: "CSE 20",
        name: "Discrete Mathematics",
        quarter: "Fall 2023",
        grade: "A",
        description:
          "Introduces the ways logic is used in computer science, for reasoning, as a language for specifications, and as operations in computation. Sets, relations, functions, equivalence relations, partial orders, number systems, and proof methods (especially induction and recursion).",
      },
    ],
  },
  {
    id: "entrepreneurship",
    title: "Entrepreneurship & Innovation (Minor)",
    icon: Briefcase,
    blurb:
      "Rady School minor (M077) coursework, startups, product, finance, and technology strategy. Minor GPA: 3.950.",
    courses: [
      {
        code: "MGT 16",
        name: "Personal Ethics at Work",
        quarter: "Winter 2025",
        grade: "Pass",
        description:
          "Examines the ethical foundation for choices individuals make every day both in the workplace and in their private lives, the connection between economic and ethical obligations, with examples related to privacy, reporting, whistle-blowing, workplace relationships, confidentiality, and intellectual property.",
      },
      {
        code: "MGT 103",
        name: "Product Marketing & Management",
        quarter: "Winter 2025",
        grade: "A",
        description:
          "Defining markets for products and services, segmenting those markets, and targeting critical customers within segments. Strategies to position products and services within segments. The critical role of pricing, as well as market research, product management, promotion, selling, and customer support.",
      },
      {
        code: "MGT 121A",
        name: "Innovation to Market A",
        quarter: "Winter 2025",
        grade: "A−",
        description:
          "Consider new project concepts. Discern market needs, competitive environment, and determine 'go-to-market' strategy. Research potential markets, customers, partners, and competitors. Consider price versus attributes and alternative distribution channels. Examine the need and structure of a start-up team.",
      },
      {
        code: "MGT 121B",
        name: "Innovation to Market B",
        quarter: "Spring 2025",
        grade: "A+",
        description:
          "Build a business plan. Establish intellectual-property rights. Provide financial projections and determine financing needs. Explore investment sourcing, business valuation, and harvesting opportunities. Determine operational plans and key employee requirements.",
      },
      {
        code: "MGT 127R",
        name: "AI & Technology Strategy",
        quarter: "Winter 2026",
        grade: "A",
        description:
          "Focusing on how AI will redefine businesses in the digital age, studies the fundamental topics of innovation driven by the AI+X revolution, disruptive technologies, and digital transformation.",
      },
      {
        code: "MGT 175",
        name: "Supply Chain Management",
        quarter: "Spring 2025",
        grade: "A+",
        description:
          "Supply-chain management involves the flows of materials and information that contribute value to a product, from the source of raw materials to end customers. Explains how supply chains work and describes the major challenges in managing an efficient supply chain.",
      },
      {
        code: "MGT 187",
        name: "New Venture Finance",
        quarter: "Winter 2025",
        grade: "A",
        description:
          "Taking a global perspective, examines how innovation is funded and the financial tools necessary over the life cycle of a new venture, development, growth, maturity, and exit.",
      },
    ],
  },
  {
    id: "synthesis",
    title: "Writing & Synthesis: Seventh College",
    icon: Feather,
    blurb:
      "Seventh College's writing and GE sequence themed around \"A Changing Planet.\" Intensive writing alongside the Analytical Writing Program (AWP). My coursework threads a personal research focus on combating climate change.",
    courses: [
      {
        code: "AWP 4A",
        name: "Analytical Writing & Academic English A",
        quarter: "Winter 2023",
        grade: "Pass",
        description:
          "First of a two-quarter sequence designed to offer students who need extra English-language support and/or more time to develop their critical-thinking and writing abilities.",
      },
      {
        code: "AWP 4B",
        name: "Analytical Writing & Academic English B",
        quarter: "Spring 2023",
        grade: "B+",
        description:
          "Second of the AWP 4A/4B sequence. Continuing English-language support and critical-thinking / writing development; a grade of C or better satisfies the UC Entry Level Writing Requirement.",
      },
      {
        code: "SYN 1",
        name: "Communicating for a Changing Planet",
        quarter: "Spring 2024",
        grade: "A",
        description:
          "Critically examines, through an interdisciplinary and antiracist lens, how we communicate about the climate crisis and how to encourage action. Students develop awareness of messaging and rhetorical context through assignments and activities.",
      },
      {
        code: "SYN 2",
        name: "Inquiring about a Changing Planet",
        quarter: "Summer 2024",
        grade: "A",
        description:
          "Builds on the skills developed in Synthesis 1. Students learn connections between climate change and racial justice, conduct group research on climate aspects, and receive an introduction to project design and proposal drafting.",
      },
      {
        code: "SYN 100",
        name: "Engaging with a Changing Planet",
        quarter: "Summer 2026",
        wip: true,
        description:
          "Project-based course that builds upon foundational skills by taking a collaborative, interdisciplinary approach to complex global problems. Each section explores different climate-related themes through team project design and execution.",
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
      "Breadth coursework outside the major, economics grounding, chemistry fundamentals, and humanities electives for GE.",
    courses: [
      {
        code: "ECON 1",
        name: "Principles of Microeconomics",
        quarter: "Spring 2023",
        grade: "A+",
        description:
          "Introduction to the study of the economic system. The standard economic models used to examine how individuals and firms make decisions in perfectly competitive markets, and how those decisions affect supply and demand in output markets.",
      },
      {
        code: "ECON 3",
        name: "Principles of Macroeconomics",
        quarter: "Winter 2024",
        grade: "A+",
        description:
          "Introductory macroeconomics: unemployment, inflation, business cycles, monetary and fiscal policy.",
      },
      {
        code: "CHEM 4",
        name: "Chemical Thinking",
        quarter: "Fall 2022",
        grade: "A",
        description:
          "One-quarter preparatory chemistry course intended for students continuing on to general chemistry. Focuses on the development and analysis of submicroscopic models of matter and structure-property relationships to explain, predict, and control chemical behavior.",
      },
      {
        code: "CHEM 6A",
        name: "General Chemistry I",
        quarter: "Winter 2023",
        grade: "A",
        description:
          "First quarter of a three-quarter sequence for science and engineering majors. Atomic theory, bonding, molecular geometry, stoichiometry, and types of reactions.",
      },
      {
        code: "CHEM 6B",
        name: "General Chemistry II",
        quarter: "Spring 2023",
        grade: "Pass",
        description:
          "Second quarter of the science-and-engineering general-chemistry sequence. Gases, liquids, and solids; thermochemistry and thermodynamics; physical and chemical equilibria; solubility.",
      },
      {
        code: "LIGN 17",
        name: "Making and Breaking Codes",
        quarter: "Spring 2024",
        grade: "A",
        description:
          "A rigorous analysis of symbolic systems and their interpretations. Students learn to encode and decode information using progressively more sophisticated methods, ancient and modern phonetic writing systems, hieroglyphics, computer languages, and ciphers.",
      },
      {
        code: "MUS 17",
        name: "Hip-Hop",
        quarter: "Spring 2024",
        grade: "Pass",
        description:
          "Broad chronological overview of the development of hip-hop as a musical form from the late 1970s through today. Examines the style in relation to direct context and to earlier African American musical and cultural forms, and considers the technological and legal issues that have impacted its development.",
      },
      {
        code: "TDAC 1",
        name: "Introduction to Acting",
        quarter: "Summer 2026",
        wip: true,
        description:
          "Beginning course in the fundamentals of acting: establishing a working vocabulary and acquiring the basic skills of the acting process. Through exercises, compositions, and improvisations, the student actor explores the imagination as the actor's primary resource and the basic approach to text through action.",
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
                <details
                  key={course.code}
                  className="group gradient-border glow-card overflow-hidden rounded-2xl bg-card backdrop-blur-sm"
                >
                  <summary className="flex cursor-pointer list-none flex-col gap-3 p-6 transition-colors hover:bg-foreground/[0.02] [&::-webkit-details-marker]:hidden [&::marker]:hidden">
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
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-serif text-lg font-semibold leading-snug tracking-tight">
                        {course.name}
                      </h3>
                      {course.description && (
                        <ChevronDown
                          size={16}
                          aria-hidden="true"
                          className="mt-1 flex-shrink-0 text-muted-foreground transition-transform duration-300 group-open:rotate-180"
                        />
                      )}
                    </div>
                  </summary>
                  {course.description && (
                    <div className="border-t border-foreground/5 px-6 py-5">
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {course.description}
                      </p>
                    </div>
                  )}
                </details>
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
