import Link from "next/link";
import { ArrowUpRight, Layers, Lock, PenLine } from "lucide-react";
import type { Collection } from "@/lib/collections";

// Renders the "these sites are one project" block. Shown on every detail page
// belonging to a collection, so a viewer who arrives at one surface leaves
// knowing about the others. `currentProjectId` marks the page you are on
// instead of linking it back to itself.
export default function CollectionRail({
  collection,
  currentProjectId,
}: {
  collection: Collection;
  currentProjectId?: string;
}) {
  return (
    <div className="rounded-2xl border border-foreground/10 bg-foreground/[0.03] p-6 md:p-8">
      <p className="flex items-center gap-2 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
        <Layers size={12} aria-hidden="true" />
        One project, {collection.surfaces.length} sites
      </p>

      <h2 className="mt-3 font-serif text-2xl font-bold tracking-tight">
        {collection.label}
      </h2>
      <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
        {collection.kicker}
      </p>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        {collection.summary}
      </p>

      <ul className="mt-7 grid gap-3">
        {collection.surfaces.map((surface) => {
          const isCurrent =
            !!currentProjectId && surface.projectId === currentProjectId;

          const body = (
            <>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="text-sm font-medium text-foreground">
                  {surface.label}
                </span>
                {isCurrent ? (
                  <span className="rounded-full border border-primary/40 bg-primary/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-foreground/85">
                    You are here
                  </span>
                ) : (
                  <ArrowUpRight
                    size={13}
                    className="text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                )}
                {surface.gated && (
                  <span
                    title={surface.gated}
                    className="inline-flex items-center gap-1 rounded-full border border-dashed border-foreground/20 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground"
                  >
                    <Lock size={9} aria-hidden="true" />
                    {surface.gated}
                  </span>
                )}
              </div>
              <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
                {surface.blurb}
              </p>
            </>
          );

          const shell =
            "block rounded-xl border border-foreground/10 bg-background/40 p-4 transition-colors";

          return (
            <li key={surface.href}>
              {isCurrent ? (
                <div className={`${shell} border-primary/25 bg-primary/[0.06]`}>
                  {body}
                </div>
              ) : surface.projectId ? (
                <Link
                  href={surface.href}
                  className={`group ${shell} hover:border-foreground/25 hover:bg-foreground/5`}
                >
                  {body}
                </Link>
              ) : (
                <a
                  href={surface.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group ${shell} hover:border-foreground/25 hover:bg-foreground/5`}
                >
                  {body}
                </a>
              )}

              {surface.liveUrl && !isCurrent && (
                <a
                  href={surface.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1.5 ml-4 inline-flex items-center gap-1 font-mono text-[11px] text-muted-foreground underline decoration-foreground/20 underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground/50"
                >
                  {surface.liveUrl.replace("https://", "")}
                </a>
              )}
            </li>
          );
        })}
      </ul>

      {collection.related && collection.related.length > 0 && (
        <div className="mt-8 border-t border-foreground/10 pt-6">
          <p className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Alongside it
          </p>
          <ul className="mt-3 grid gap-3">
            {collection.related.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex gap-2.5"
                >
                  <PenLine
                    size={13}
                    className="mt-1 shrink-0 text-muted-foreground"
                    aria-hidden="true"
                  />
                  <span>
                    <span className="text-sm font-medium text-foreground/90 underline decoration-foreground/20 underline-offset-4 transition-colors group-hover:decoration-foreground/60">
                      {item.label}
                    </span>
                    <span className="mt-1 block text-[13px] leading-relaxed text-muted-foreground">
                      {item.blurb}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
