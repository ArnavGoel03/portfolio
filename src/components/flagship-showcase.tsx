"use client";

// The four flagships, shown rather than described.
//
// This replaced a pinned horizontal track: 340vh of scrolling that moved the
// page sideways while the reader scrolled down, showed nothing but text, and
// was hidden below 1024px entirely. It cost a third of the page's height and
// added no information the grid underneath did not already carry.
//
// What earns that space instead is the thing a card cannot fit: the screenshot
// at a size where it can actually be read, the thesis sentence, and the two or
// three numbers the case study is built on. Vertical scroll stays vertical,
// and every row is a link into the full write-up.

import Link from "next/link";
import { accentFor } from "@/lib/projects";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { caseStudies } from "@/lib/case-studies";
import { Project } from "@/lib/types";

interface FlagshipShowcaseProps {
  projects: Project[];
}

/** Numbers carry further than adjectives, but only while they stay scannable. */
const METRICS_SHOWN = 3;

/**
 * The opening of a description, for a project with no case study.
 *
 * The showcase shows a case study's oneLiner when there is one, and fell back to
 * the whole description when there was not. Glass Table Games has no case study
 * and a 2,171 character description, so its card was a wall of text while the
 * cards beside it were a sentence. This takes the opening sentences and nothing
 * else; the full text is on the project's own page, which the card links to.
 * No words are written here, only fewer of them shown.
 */
function opening(text: string): string {
  const sentences = text.split(/(?<=\.)\s+/);
  let out = "";
  for (const sentence of sentences) {
    if (out && (out + " " + sentence).length > 260) break;
    out = out ? out + " " + sentence : sentence;
  }
  return out;
}

export default function FlagshipShowcase({ projects }: FlagshipShowcaseProps) {
  if (projects.length === 0) return null;

  return (
    <section aria-label="Flagship projects" className="pt-4 pb-16 md:pb-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-foreground/10 pb-6">
          <div>
            <p className="font-mono text-[10px] font-medium uppercase tracking-[0.26em] text-muted-foreground">
              Flagships
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold tracking-[-0.01em] md:text-4xl">
              Four projects, in depth
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            The ones with a real user count, a real dataset, or a real bill
            attached. Each has a full write-up: the problem, the calls I made,
            and what the numbers came back as.
          </p>
        </div>

        <div className="mt-14 flex flex-col gap-20 md:gap-28">
          {projects.map((project, i) => (
            <FlagshipRow key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FlagshipRow({ project, index }: { project: Project; index: number }) {
  const study = caseStudies.find((s) => s.slug === project.id);
  const metrics = study?.metrics.slice(0, METRICS_SHOWN) ?? [];
  // Rows alternate so the eye has to travel, which keeps a long column of
  // large screenshots from reading as a single repeating template.
  const flipped = index % 2 === 1;
  const href = `/projects/${project.id}`;
  // The same hue this project wears on its card and on the home page graph.
  const accent = accentFor(project.id);
  // Three of the five flagships have no case study, and everything on the right
  // of this card was read off one: status, thesis, metrics, role. So Quiver,
  // Glass Table Games and Pidilite rendered as a bare number and a paragraph
  // while the two with studies carried a status and three figures beside them.
  //
  // The status at least is a fact this project already holds rather than
  // something a case study has to restate, so it is derived: still being worked
  // on, or shipped and reachable. The word LIVE is the one the existing studies
  // already use, so nothing new is written here.
  const status =
    study?.status ?? (project.inProgress ? "IN PROGRESS" : project.demo ? "LIVE" : null);

  // The reveal is CSS now. It used to be a motion wrapper whose initial state
  // was opacity 0, which shipped in the HTML and left this card blank for
  // anything that paints the page instead of parsing it.
  return (
    <article className="section-reveal grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
      <div
        className={`lg:col-span-7 ${flipped ? "lg:order-2" : ""}`}
      >
        <Link
          href={href}
          aria-label={`Read the ${project.title} case study`}
          className="group relative block overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/[0.03] shadow-[0_24px_60px_-30px_rgba(0,0,0,0.85)]"
        >
          {project.image ? (
            <img
              src={project.image}
              alt={`${project.title} screenshot`}
              loading="lazy"
              decoding="async"
              className="aspect-[16/10] w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
          ) : (
            <div className="flex aspect-[16/10] w-full items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/10">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                {project.title}
              </span>
            </div>
          )}

          <span className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background/80 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          <span className="pointer-events-none absolute bottom-4 right-4 inline-flex translate-y-2 items-center gap-1.5 rounded-full bg-background/90 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground opacity-0 backdrop-blur-sm transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            Case study
            <ArrowUpRight size={12} aria-hidden="true" />
          </span>
        </Link>
      </div>

      <div className={`lg:col-span-5 ${flipped ? "lg:order-1" : ""}`}>
        <p className="font-mono text-[10px] font-medium uppercase tracking-[0.26em] text-muted-foreground">
          {String(index + 1).padStart(2, "0")}
          {status && (
            <>
              <span className="mx-2.5 text-foreground/25">/</span>
              {status}
            </>
          )}
        </p>

        <h3 className="mt-4 font-serif text-2xl font-semibold leading-[1.15] tracking-[-0.01em] md:text-3xl">
          {study?.title ?? project.title}
        </h3>

        {study?.thesis && (
          <p className="mt-4 text-[15px] leading-[1.6] text-foreground/85">
            {study.thesis}
          </p>
        )}

        <p className="mt-3 text-sm leading-[1.7] text-muted-foreground">
          {study?.oneLiner ?? opening(project.description)}
        </p>

        {metrics.length > 0 && (
          <dl className="mt-7 grid grid-cols-3 gap-4 border-t border-foreground/10 pt-5">
            {metrics.map((metric) => (
              <div key={metric.label} className="group/metric">
                {/* The numbers are the strongest evidence on the card and they
                    were set in the same cream as the sentence above them, so a
                    reader scanning for proof found a paragraph. A rule in the
                    card's rotation of hues gives each one somewhere to land,
                    and the label above still says what it is without colour. */}
                <span
                  aria-hidden="true"
                  className="block h-[3px] w-6 origin-left rounded-full transition-transform duration-500 group-hover/metric:scale-x-[1.6]"
                  style={{ background: accent }}
                />
                <dt className="mt-2 font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
                  {metric.label}
                </dt>
                <dd className="mt-1 font-serif text-2xl font-semibold tracking-tight text-foreground">
                  {metric.value}
                </dd>
              </div>
            ))}
          </dl>
        )}

        <div className="mt-7 flex flex-wrap items-center gap-4">
          <Link
            href={href}
            className="btn-glow group inline-flex h-10 items-center gap-2 rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground"
          >
            Read case study
            <ArrowRight
              size={14}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </Link>
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground/75 underline decoration-foreground/25 underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground/60"
            >
              {project.demo.includes("chromewebstore")
                ? "Install it"
                : project.demo.endsWith(".pdf")
                ? "Read the report"
                : "See it live"}
              <ArrowUpRight size={13} aria-hidden="true" />
            </a>
          )}
        </div>

        {study?.role && (
          <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            {study.role}
          </p>
        )}
      </div>
    </article>
  );
}
