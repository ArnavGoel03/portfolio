"use client";

import { useEffect, useState } from "react";

export interface RailStop {
  id: string;
  label: string;
  accent: string;
}

/**
 * A fixed rail of the sections on this page, showing which one you are in.
 *
 * The complaint it answers is that a long page gave a reader no way to reach
 * anything: you landed at the top, scrolled a wall, and could neither tell how
 * much was left nor jump to the part you wanted. A table of contents at the top
 * would be read once and then be gone; a rail stays.
 *
 * Observed with IntersectionObserver rather than by measuring scroll offsets on
 * every frame, so it costs nothing while idle and cannot drift when a section
 * above it changes height. Hidden below xl, where there is no room beside the
 * content and the reader can use the page itself.
 */
export default function SectionRail({ stops }: { stops: RailStop[] }) {
  const [active, setActive] = useState<string | null>(stops[0]?.id ?? null);

  useEffect(() => {
    const nodes = stops
      .map((s) => document.getElementById(s.id))
      .filter((n): n is HTMLElement => Boolean(n));
    if (nodes.length === 0) return;

    const seen = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          seen.set(entry.target.id, entry.intersectionRatio);
        }
        // The section showing the most of itself wins, which is what a reader
        // would say they are looking at. Ties keep document order.
        let best: string | null = null;
        let bestRatio = 0;
        for (const s of stops) {
          const ratio = seen.get(s.id) ?? 0;
          if (ratio > bestRatio) {
            bestRatio = ratio;
            best = s.id;
          }
        }
        if (best) setActive(best);
      },
      { threshold: [0, 0.15, 0.35, 0.6, 0.9], rootMargin: "-15% 0px -35% 0px" }
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [stops]);

  return (
    <nav
      aria-label="Sections on this page"
      className="fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 xl:block"
    >
      <ul className="flex flex-col gap-3">
        {stops.map((stop) => {
          const on = stop.id === active;
          return (
            <li key={stop.id}>
              <a
                href={`#${stop.id}`}
                aria-current={on ? "true" : undefined}
                className="group flex items-center gap-3 py-1"
              >
                <span
                  aria-hidden="true"
                  className="h-px transition-all duration-300"
                  style={{
                    width: on ? 28 : 14,
                    background: on ? stop.accent : "var(--muted-foreground)",
                    opacity: on ? 1 : 0.4,
                  }}
                />
                <span
                  className="font-mono text-[10px] uppercase tracking-[0.18em] transition-colors duration-300"
                  style={{
                    color: on ? stop.accent : "var(--muted-foreground)",
                    opacity: on ? 1 : 0.55,
                  }}
                >
                  {stop.label}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
