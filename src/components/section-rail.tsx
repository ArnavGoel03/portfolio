"use client";

import { useCallback, useEffect, useRef, useState } from "react";

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
 * Hidden below xl, where there is no room beside the content and the reader can
 * use the page itself.
 *
 * This used to pick the section showing the most of itself, measured with an
 * IntersectionObserver. That is wrong at the foot of a page and wrong for short
 * sections, which is the same bug twice: two collapsed bands at the bottom of
 * /projects were both fully on screen, both scored a ratio of 1, and the tie
 * went to whichever came first in document order. The last stop on that page
 * could therefore never light up, no matter where the reader was, and clicking
 * it did nothing visible either, because the page was already scrolled as far
 * as it goes.
 *
 * So the answer is geometric instead: the section you are in is the last one
 * whose top has passed the reading line, and at the very bottom of the page it
 * is the last section, because there is nothing below it to scroll to. Measured
 * on scroll behind a rAF gate, which is one layout read per frame at most and
 * nothing at all while the page is still.
 */
const READING_LINE = 0.35;

export default function SectionRail({ stops }: { stops: RailStop[] }) {
  const [active, setActive] = useState<string | null>(stops[0]?.id ?? null);
  const frame = useRef<number | null>(null);

  const measure = useCallback(() => {
    const line = window.innerHeight * READING_LINE;
    const doc = document.documentElement;
    const atBottom =
      window.innerHeight + window.scrollY >= doc.scrollHeight - 2;

    let current: string | null = null;
    let last: string | null = null;

    for (const stop of stops) {
      const el = document.getElementById(stop.id);
      if (!el) continue;
      last = stop.id;
      if (el.getBoundingClientRect().top <= line) current = stop.id;
    }

    setActive(atBottom && last ? last : (current ?? stops[0]?.id ?? null));
  }, [stops]);

  useEffect(() => {
    const onScroll = () => {
      if (frame.current !== null) return;
      frame.current = requestAnimationFrame(() => {
        frame.current = null;
        measure();
      });
    };

    // Scheduled rather than called straight from the effect body: the first
    // measurement is a state update, and a synchronous one here cascades a
    // render. The frame gate is already the right place for it.
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, [measure]);

  return (
    <nav
      aria-label="Sections on this page"
      className="fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 print:!hidden xl:block"
    >
      <ul className="flex flex-col gap-3">
        {stops.map((stop) => {
          const on = stop.id === active;
          return (
            <li key={stop.id}>
              <a
                href={`#${stop.id}`}
                aria-current={on ? "true" : undefined}
                onClick={() => {
                  // Set immediately rather than waiting for the scroll that
                  // follows: at the foot of a page there may be no scroll at
                  // all, and a control that answers a click with nothing reads
                  // as broken whatever the reason.
                  setActive(stop.id);
                }}
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
                {/* Capped and truncated rather than shortened by hand: a stop
                    label is the section's own heading, and abbreviating one
                    here would be a second, quieter name for the same block.
                    The full string stays in the DOM for a screen reader and in
                    the title attribute for a cursor. */}
                <span
                  title={stop.label}
                  className="max-w-[11rem] truncate font-mono text-[10px] uppercase tracking-[0.18em] transition-colors duration-300"
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
