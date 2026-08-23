import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { caseStudies } from "@/lib/case-studies";
import { getProjectById } from "@/lib/projects";

/**
 * A band of real screenshots for pages that are otherwise all prose.
 *
 * /work and /about were making strong claims in paragraphs and showing nothing,
 * which is the weakest possible form of the argument in front of someone
 * skimming. This puts the artifact next to the sentence.
 *
 * Nothing here is retyped: pass ids and the screenshot, title, status and
 * headline number are read from the canonical project and case-study lists, so
 * a page using this can never drift from /projects the way the home page did.
 */
/** A metric value that leads with a figure, which is what reads at card size. */
const NUMERIC = /^[+\d]/;

interface ProofStripProps {
  ids: string[];
  eyebrow?: string;
  heading?: string;
  blurb?: string;
}

export default function ProofStrip({
  ids,
  eyebrow = "Receipts",
  heading,
  blurb,
}: ProofStripProps) {
  // metrics[0] is whatever the case study happened to list first, which is not
  // the one that carries here: Watch Together led with "Chrome · Firefox ·
  // Safari" rather than its 59 server tests, and two cards in a row both
  // announced "15 Prisma models". Prefer a metric that opens with a number, and
  // never repeat a label inside one strip.
  const claimed = new Set<string>();
  const items = ids
    .map((id) => {
      const project = getProjectById(id);
      if (!project) return null;
      const study = caseStudies.find((s) => s.slug === id);
      const metrics = study?.metrics ?? [];
      const headline =
        metrics.find((m) => NUMERIC.test(m.value) && !claimed.has(m.label)) ??
        metrics.find((m) => !claimed.has(m.label)) ??
        metrics[0];
      if (headline) claimed.add(headline.label);
      return { project, study, headline };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  if (items.length === 0) return null;

  // Four items in a three-up grid leaves one orphan on its own row.
  const columns = items.length % 3 === 0 ? "lg:grid-cols-3" : "lg:grid-cols-2";

  return (
    <section aria-label={heading ?? "Shipped work"}>
      {(heading || blurb) && (
        <div className="mb-8">
          <p className="font-mono text-[10px] font-medium uppercase tracking-[0.26em] text-muted-foreground">
            {eyebrow}
          </p>
          {heading && (
            <h2 className="mt-3 font-serif text-2xl font-bold tracking-tight md:text-3xl">
              {heading}
            </h2>
          )}
          {blurb && (
            <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
              {blurb}
            </p>
          )}
        </div>
      )}

      <div className={`grid gap-5 sm:grid-cols-2 ${columns}`}>
        {items.map(({ project, study, headline }) => (
          <Link
            key={project.id}
            href={`/projects/${project.id}`}
            className="group flex flex-col overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/[0.03] transition-colors hover:border-foreground/25 hover:bg-foreground/[0.06]"
          >
            {project.image ? (
              <img
                src={project.image}
                alt={`${project.title} screenshot`}
                loading="lazy"
                decoding="async"
                className="aspect-[16/10] w-full border-b border-foreground/10 object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            ) : (
              <div className="aspect-[16/10] w-full border-b border-foreground/10 bg-gradient-to-br from-primary/5 via-background to-accent/10" />
            )}

            <div className="flex flex-1 flex-col p-5">
              {headline ? (
                <>
                  <p className="font-serif text-2xl font-semibold tracking-tight text-foreground">
                    {headline.value}
                  </p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                    {headline.label}
                  </p>
                  <p className="mt-3 text-sm font-medium leading-snug text-foreground/90">
                    {study?.title ?? project.title}
                  </p>
                </>
              ) : (
                // No case study to quote a number from, so the title takes the
                // large slot instead of leaving a hole where one card's figure
                // should be.
                <>
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                    {project.inProgress ? "In progress" : "Live"}
                  </p>
                  <p className="mt-2 font-serif text-lg font-semibold leading-snug tracking-tight text-foreground">
                    {project.title}
                  </p>
                </>
              )}
              <span className="mt-4 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground transition-colors group-hover:text-foreground">
                {study ? "Case study" : "Details"}
                <ArrowUpRight
                  size={12}
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
