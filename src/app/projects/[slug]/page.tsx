import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Section from "@/components/section";
import {
  caseStudies,
  getCaseStudy,
  type CaseStudyLink,
} from "@/lib/case-studies";
import { SITE_URL } from "@/lib/constants";

export async function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return {};
  return {
    title: cs.title,
    description: `${cs.oneLiner} — case study by Arnav Goel.`,
    alternates: { canonical: `${SITE_URL}/projects/${cs.slug}` },
    openGraph: {
      title: `${cs.title} — Case Study`,
      description: cs.oneLiner,
    },
  };
}

function linkLabel(link: CaseStudyLink): string {
  if (link.kind === "github") return "Code";
  if (link.kind === "demo") return link.label.toLowerCase().includes("install")
    ? "Install"
    : "Open";
  if (link.kind === "video") return "Watch";
  if (link.kind === "pdf") return "Read";
  return "Open";
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();

  return (
    <>
      <Section className="pt-36 pb-8">
        <Link
          href="/projects"
          className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft size={14} />
          All projects
        </Link>

        <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Case study · {cs.status}
        </p>
        <h1 className="mt-3 font-serif text-5xl font-bold tracking-tight md:text-6xl">
          {cs.title}
        </h1>
        <p className="mt-3 font-serif text-xl italic text-foreground/75 md:text-2xl">
          {cs.subtitle}
        </p>

        <div className="mt-8 grid max-w-2xl gap-6 sm:grid-cols-2">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
              Role
            </p>
            <p className="mt-1.5 text-sm text-foreground/85">{cs.role}</p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
              Period
            </p>
            <p className="mt-1.5 text-sm text-foreground/85">{cs.period}</p>
          </div>
        </div>

        {cs.links.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-3">
            {cs.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-foreground/5 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-foreground/30 hover:bg-foreground/8"
              >
                {link.kind === "github" ? (
                  <FaGithub size={14} />
                ) : (
                  <ArrowUpRight size={14} />
                )}
                {link.label}
              </a>
            ))}
          </div>
        )}
      </Section>

      <Section className="pt-4">
        <div className="max-w-3xl">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            The Pitch
          </p>
          <p className="mt-4 font-serif text-2xl italic leading-snug text-foreground/90 md:text-3xl">
            {cs.oneLiner}
          </p>
        </div>
      </Section>

      <Section className="pt-4">
        <div className="grid gap-10 md:grid-cols-5 md:gap-14">
          <div className="md:col-span-1">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              The Problem
            </p>
          </div>
          <div className="md:col-span-4 space-y-4 text-[15px] leading-relaxed text-muted-foreground">
            {cs.problem.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </Section>

      <Section className="pt-4">
        <div className="grid gap-10 md:grid-cols-5 md:gap-14">
          <div className="md:col-span-1">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              The Approach
            </p>
          </div>
          <div className="md:col-span-4 space-y-10">
            {cs.approach.map((section, i) => (
              <div key={i}>
                <h3 className="font-serif text-xl font-semibold tracking-tight text-foreground">
                  {section.heading}
                </h3>
                <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-muted-foreground">
                  {section.body.map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section className="pt-4">
        <div className="grid gap-10 md:grid-cols-5 md:gap-14">
          <div className="md:col-span-1">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Key Decisions
            </p>
          </div>
          <div className="md:col-span-4 space-y-6">
            {cs.decisions.map((d, i) => (
              <div
                key={i}
                className="rounded-2xl border border-foreground/10 bg-foreground/5 p-6"
              >
                <p className="font-serif text-base font-semibold tracking-tight text-foreground">
                  {d.decision}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {d.rationale}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section className="pt-4">
        <div className="grid gap-10 md:grid-cols-5 md:gap-14">
          <div className="md:col-span-1">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Metrics
            </p>
          </div>
          <div className="md:col-span-4 grid grid-cols-2 gap-5 sm:grid-cols-3">
            {cs.metrics.map((m) => (
              <div
                key={m.label}
                className="rounded-xl border border-foreground/10 bg-foreground/5 p-5"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                  {m.label}
                </p>
                <p className="mt-2 font-serif text-xl font-semibold tracking-tight text-foreground">
                  {m.value}
                </p>
                {m.note && (
                  <p className="mt-1 text-[11px] text-muted-foreground/80">
                    {m.note}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section className="pt-4 pb-20">
        <div className="grid gap-10 md:grid-cols-5 md:gap-14">
          <div className="md:col-span-1">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Stack
            </p>
          </div>
          <div className="md:col-span-4 space-y-6">
            {cs.stack.map((group) => (
              <div key={group.category}>
                <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                  {group.category}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-foreground/10 bg-foreground/5 px-3 py-1 text-xs text-foreground/85"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 border-t border-foreground/10 pt-10">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft size={14} />
            Back to all projects
          </Link>
        </div>
      </Section>
    </>
  );
}
