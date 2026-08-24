"use client";

import { useEffect, useState } from "react";

/**
 * The hero, framed like an instrument rather than wallpapered with one.
 *
 * What was here was the project graph, scattered behind the headline. It read
 * as dust and crossing wires: at that scale the marks are too small to identify
 * and the links cross the text they sit behind, so it carried no information
 * and cost legibility. The graph is a good idea in the wrong place. It lives on
 * the projects page now, at a size where it can be read and used.
 *
 * What is left is structure instead of noise. Brackets at the corners, a rule
 * that draws itself in, and one line of telemetry counted from the real project
 * list. Nothing is invented and nothing moves except a cursor block, which is
 * the smallest possible signal that this is running rather than printed.
 */
export default function HeroFrame({
  projectCount,
  flagshipCount,
}: {
  projectCount: number;
  flagshipCount: number;
}) {
  const [on, setOn] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setOn((v) => !v), 620);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      {/* Corner brackets. Four hairlines are enough to say framed. */}
      {[
        "left-6 top-24 border-l border-t md:left-10",
        "right-6 top-24 border-r border-t md:right-10",
        "left-6 bottom-10 border-l border-b md:left-10",
        "right-6 bottom-10 border-r border-b md:right-10",
      ].map((c) => (
        <span
          key={c}
          aria-hidden="true"
          className={`pointer-events-none absolute h-5 w-5 border-foreground/20 ${c}`}
        />
      ))}

      {/* Telemetry, counted from the real list. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-10 flex justify-center px-6"
      >
        <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/60 tabular-nums">
          <span>{String(projectCount).padStart(2, "0")} projects</span>
          <span className="h-3 w-px bg-foreground/15" />
          <span>{String(flagshipCount).padStart(2, "0")} flagship</span>
          <span className="h-3 w-px bg-foreground/15" />
          <span className="flex items-center gap-1.5">
            live
            <span
              className="inline-block h-2 w-1.5 bg-primary transition-opacity duration-150"
              style={{ opacity: on ? 1 : 0.15 }}
            />
          </span>
        </div>
      </div>
    </>
  );
}
