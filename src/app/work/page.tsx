import Link from "next/link";
import { ArrowUpRight, CalendarClock, Mail } from "lucide-react";
import { FaLinkedinIn } from "react-icons/fa";
import Section from "@/components/section";
import { FAQPageJsonLd } from "@/components/json-ld";
import { SOCIAL_LINKS } from "@/lib/constants";

export const metadata = {
  title: "Work",
  description:
    "Arnav Goel — graduating June 2027 from UC San Diego (BS Data Science). Considering new-grad Applied Scientist, ML Engineer, Data Scientist, and SWE roles. Roles, timeline, and interests.",
  openGraph: {
    title: "Work — Arnav Goel",
    description:
      "What I'm looking for after graduation — roles, timeline, and how to reach me.",
  },
};

const roles = [
  "Applied Scientist / ML Engineer",
  "Data Scientist (generalist or infra-leaning)",
  "Software Engineer on data or ML platforms",
  "Founding or early engineer at seed → Series A",
];

const interests = [
  "Problems where models actually ship to production users — not research for research",
  "Applied ML systems: recommender systems, time-series, graph-theoretic methods",
  "Domains I care about: health, commerce, developer tooling, infrastructure",
  "Small teams over big-corp rotational programs",
];

const notInterested = [
  "Crypto / gambling-adjacent products",
  "Roles that are 95% dashboarding with no modelling",
];

type Fact = {
  label: string;
  value: string;
  detail?: string;
};

const facts: Fact[] = [
  {
    label: "Graduating",
    value: "June 2027",
    detail: "BS Data Science · Minor: Entrepreneurship & Innovation · UCSD",
  },
  {
    label: "Start Date",
    value: "Summer 2027 onward",
    detail: "Flexible — happy to discuss earlier for part-time bridge roles.",
  },
  {
    label: "Location",
    value: "SF Bay · NYC · San Diego · Remote",
    detail: "Open to relocation for the right team.",
  },
  {
    label: "Status",
    value: "International student",
  },
  {
    label: "Currently",
    value: "Triton Quantitative Trading · Digital Platform Lead @ Gondilal Saraf",
    detail:
      "Quant research at UCSD, and running the full-stack platform for my family's 150-year jewelry business.",
  },
];

const faqs = [
  {
    question: "Is Arnav Goel available for hire?",
    answer:
      "Yes. Graduating June 2027 from UC San Diego with a BS in Data Science and a minor in Entrepreneurship & Innovation. Considering new-grad Applied Scientist, ML Engineer, Data Scientist, and Software Engineer roles starting summer 2027 onward. Flexible on start date.",
  },
  {
    question: "What is Arnav Goel's GPA?",
    answer:
      "UC GPA 3.911 out of 4.0, with a Major GPA of 3.860 and a Minor GPA of 3.950. Source: official UCSD degree audit, April 2026.",
  },
  {
    question: "When does Arnav Goel graduate?",
    answer:
      "June 2027. BS Data Science with a minor in Entrepreneurship & Innovation from the Rady School of Management at UC San Diego.",
  },
  {
    question: "Where is Arnav Goel located, and what locations is he open to?",
    answer:
      "Currently in San Diego (UCSD). Open to the San Francisco Bay Area, New York City, San Diego, or remote with regular travel. Willing to relocate for the right team.",
  },
  {
    question: "Is Arnav Goel the same person as Yash Goel?",
    answer:
      "Yes. Arnav Goel is the legal name — used on this site, GitHub (ArnavGoel03), LinkedIn, and in official documentation. Yash Goel is an alias that still appears on the email address (yashgoel0304@gmail.com) and some older university records. Same person.",
  },
  {
    question: "What companies has Arnav Goel worked at?",
    answer:
      "ADA (SWE Intern, Oct–Dec 2024 — built Flask microservices for a 50,000-patient multi-region hospital platform), Espire Infolabs (Cloud Engineering Intern, Jul–Sep 2024 — Azure/AWS dashboards), AGS (Algorithmic Trading Intern, Jun–Sep 2023 — high-frequency arbitrage strategies). Currently at Triton Quantitative Trading at UCSD and Digital Platform Lead at Gondilal Saraf.",
  },
  {
    question: "What technical stack does Arnav Goel use?",
    answer:
      "Python (pandas, NumPy), scikit-learn, TensorFlow/Keras, PyTorch for data and ML. TypeScript, Next.js, React, Prisma, PostgreSQL for web. Flask for backend services. Swift/SwiftUI for iOS/macOS. Docker, WebSockets, Git. See /about for the honest three-tier skills matrix.",
  },
];

export default function Work() {
  return (
    <>
      <FAQPageJsonLd faqs={faqs} />
      <Section className="pt-36 pb-8">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-foreground/80">
          Work
        </p>
        <h1 className="mt-3 font-serif text-5xl font-bold tracking-tight md:text-6xl">
          What I&apos;m{" "}
          <span className="heading-gradient text-glow">Looking For</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Graduating June 2027 and considering new-grad roles where rigorous
          modelling meets real products. This page is the short version of
          what&apos;s useful to know before reaching out.
        </p>
      </Section>

      <Section className="pt-4">
        <div className="grid gap-5 md:grid-cols-2">
          {facts.map((fact) => (
            <div
              key={fact.label}
              className="gradient-border rounded-2xl bg-card p-6"
            >
              <p className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                {fact.label}
              </p>
              <p className="mt-3 font-serif text-lg font-semibold tracking-tight text-foreground">
                {fact.value}
              </p>
              {fact.detail && (
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {fact.detail}
                </p>
              )}
            </div>
          ))}
        </div>
      </Section>

      <Section className="pt-4">
        <div className="grid gap-10 md:grid-cols-2 md:gap-14">
          <div>
            <h2 className="font-serif text-2xl font-bold tracking-tight">
              Roles I&apos;m excited about
            </h2>
            <ul className="mt-6 space-y-3">
              {roles.map((role) => (
                <li key={role} className="flex items-start gap-3">
                  <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-foreground/50" />
                  <span className="text-sm leading-relaxed text-foreground/85">
                    {role}
                  </span>
                </li>
              ))}
            </ul>

            <h2 className="mt-12 font-serif text-2xl font-bold tracking-tight">
              What draws me in
            </h2>
            <ul className="mt-6 space-y-3">
              {interests.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-foreground/50" />
                  <span className="text-sm leading-relaxed text-muted-foreground">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <h2 className="mt-12 font-serif text-2xl font-bold tracking-tight">
              Probably not a fit
            </h2>
            <ul className="mt-6 space-y-3">
              {notInterested.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-muted-foreground/50" />
                  <span className="text-sm leading-relaxed text-muted-foreground">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="gradient-border rounded-2xl bg-card p-7">
              <h2 className="font-serif text-xl font-bold tracking-tight">
                Easiest ways to reach me
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Any of these work. A short note about the role and what drew
                you to reach out goes further than a cold template.
              </p>

              <div className="mt-6 space-y-3">
                <a
                  href="https://cal.com/arnavgoel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-3 rounded-xl border border-foreground/10 bg-foreground/5 px-4 py-3 transition-colors hover:border-foreground/20 hover:bg-foreground/8"
                >
                  <span className="flex items-center gap-3 text-sm font-medium text-foreground">
                    <CalendarClock size={16} className="text-muted-foreground" />
                    Book 15 minutes
                  </span>
                  <ArrowUpRight
                    size={14}
                    className="text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>

                <a
                  href={SOCIAL_LINKS.email}
                  className="group flex items-center justify-between gap-3 rounded-xl border border-foreground/10 bg-foreground/5 px-4 py-3 transition-colors hover:border-foreground/20 hover:bg-foreground/8"
                >
                  <span className="flex items-center gap-3 text-sm font-medium text-foreground">
                    <Mail size={16} className="text-muted-foreground" />
                    a2goel@ucsd.edu
                  </span>
                  <ArrowUpRight
                    size={14}
                    className="text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>

                <a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-3 rounded-xl border border-foreground/10 bg-foreground/5 px-4 py-3 transition-colors hover:border-foreground/20 hover:bg-foreground/8"
                >
                  <span className="flex items-center gap-3 text-sm font-medium text-foreground">
                    <FaLinkedinIn size={14} className="text-muted-foreground" />
                    LinkedIn
                  </span>
                  <ArrowUpRight
                    size={14}
                    className="text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>
              </div>
            </div>

            <div className="mt-6 gradient-border rounded-2xl bg-card p-7">
              <h2 className="font-serif text-xl font-bold tracking-tight">
                Before the call
              </h2>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
                <li>
                  &mdash;{" "}
                  <Link
                    href="/projects"
                    className="text-foreground underline decoration-foreground/30 underline-offset-4 hover:decoration-foreground"
                  >
                    Projects
                  </Link>{" "}
                  is the most signal-dense tab.
                </li>
                <li>
                  &mdash;{" "}
                  <Link
                    href="/about"
                    className="text-foreground underline decoration-foreground/30 underline-offset-4 hover:decoration-foreground"
                  >
                    About
                  </Link>{" "}
                  has the honest Skills matrix and Writing links.
                </li>
                <li>
                  &mdash;{" "}
                  <Link
                    href="/coursework"
                    className="text-foreground underline decoration-foreground/30 underline-offset-4 hover:decoration-foreground"
                  >
                    Coursework
                  </Link>{" "}
                  shows the full UCSD transcript with grades.
                </li>
                <li>
                  &mdash;{" "}
                  <Link
                    href="/resume"
                    className="text-foreground underline decoration-foreground/30 underline-offset-4 hover:decoration-foreground"
                  >
                    Resume
                  </Link>{" "}
                  is the structured, printable version (also on{" "}
                  <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground underline decoration-foreground/30 underline-offset-4 hover:decoration-foreground"
                  >
                    PDF
                  </a>
                  ).
                </li>
                <li>
                  &mdash;{" "}
                  <Link
                    href="/experience"
                    className="text-foreground underline decoration-foreground/30 underline-offset-4 hover:decoration-foreground"
                  >
                    Experience
                  </Link>{" "}
                  has the full role-by-role timeline.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      <Section className="pt-4 pb-20">
        <h2 className="font-serif text-2xl font-bold tracking-tight md:text-3xl">
          Common recruiter questions
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Quick answers to what usually comes up in the first email.
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {faqs.map((faq) => (
            <div
              key={faq.question}
              className="gradient-border rounded-2xl bg-card p-6"
            >
              <h3 className="font-serif text-base font-semibold tracking-tight">
                {faq.question}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
