import { Quote, ArrowUpRight } from "lucide-react";
import Section from "@/components/section";
import { testimonials } from "@/lib/testimonials";

export default function TestimonialWall() {
  if (testimonials.length === 0) return null;

  return (
    <Section>
      <div className="mb-10 flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-foreground/10 bg-foreground/5">
          <Quote size={22} className="text-foreground/80 icon-glow" />
        </div>
        <div>
          <h2 className="font-serif text-3xl font-bold tracking-tight">
            What people I&apos;ve worked with say
          </h2>
          <p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Direct quotes from past managers, collaborators, and professors. Every
            one is linked to the person&apos;s LinkedIn — verify anything you&apos;d
            like.
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {testimonials.map((t) => (
          <figure
            key={t.id}
            className="gradient-border relative rounded-2xl bg-card p-7 backdrop-blur-sm"
          >
            <Quote
              size={24}
              className="absolute right-5 top-5 text-foreground/10"
              aria-hidden
            />
            <blockquote className="text-[15px] leading-relaxed text-foreground/90">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-6 flex items-start justify-between gap-3 border-t border-foreground/10 pt-5">
              <div>
                <p className="font-serif text-base font-semibold tracking-tight text-foreground">
                  {t.author}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {t.role} · {t.company}
                </p>
                {t.relationship && (
                  <p className="mt-1.5 text-xs italic text-muted-foreground/75">
                    {t.relationship}
                  </p>
                )}
                {t.date && (
                  <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground/60">
                    {t.date}
                  </p>
                )}
              </div>
              {t.linkedinUrl && (
                <a
                  href={t.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${t.author} on LinkedIn`}
                  className="group flex-shrink-0 rounded-full border border-foreground/15 bg-foreground/5 p-2 text-muted-foreground transition-colors hover:border-foreground/30 hover:bg-foreground/10 hover:text-foreground"
                >
                  <ArrowUpRight size={14} />
                </a>
              )}
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
