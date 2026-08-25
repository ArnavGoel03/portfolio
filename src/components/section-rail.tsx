"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export interface RailStop {
  id: string;
  label: string;
  accent: string;
}

/**
 * The sections on this page, and which one you are in.
 *
 * The complaint it answers is that a long page gave a reader no way to reach
 * anything: you landed at the top, scrolled a wall, and could neither tell how
 * much was left nor jump to the part you wanted. A table of contents at the top
 * would be read once and then be gone; this stays.
 *
 * Two presentations, one at a time. Wide enough for a margin beside the
 * content, it is a vertical rail down the left. Narrower, there is no margin to
 * put it in, so it is a strip under the header that scrolls sideways. The strip
 * used not to exist at all, which meant every one of these stops was desktop
 * furniture and a phone got none of it.
 *
 * Which one renders is decided after mount by matchMedia rather than by CSS
 * over both, because two navigation landmarks carrying the same name is a
 * worse answer for a screen reader than either one alone. The server renders
 * the rail, which is hidden below xl anyway, so a phone swaps to the strip
 * before the strip has any reason to be on screen.
 *
 * Active is geometric, not observed. This used to pick the section showing the
 * most of itself, measured with an IntersectionObserver, which is wrong at the
 * foot of a page and wrong for short sections: two collapsed bands at the
 * bottom of /projects were both fully on screen, both scored a ratio of 1, and
 * the tie went to whichever came first in document order, so the last stop
 * could never light up. The section you are in is the last one whose top has
 * passed the reading line, and at the very bottom of the page it is the last
 * section, because there is nothing below it to scroll to. Measured behind a
 * rAF gate, which is one layout read per frame at most and nothing at all
 * while the page is still.
 */
const READING_LINE = 0.35;

/** How far down the page before the strip is worth the space it covers. */
const STRIP_APPEARS_AT = 220;

const WIDE = "(min-width: 1280px)";

export default function SectionRail({ stops }: { stops: RailStop[] }) {
  const [active, setActive] = useState<string | null>(stops[0]?.id ?? null);
  const [scrolled, setScrolled] = useState(false);
  // null until measured: render the rail, which CSS hides on a phone anyway.
  const [wide, setWide] = useState<boolean | null>(null);
  const frame = useRef<number | null>(null);
  const strip = useRef<HTMLUListElement | null>(null);

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
    setScrolled(window.scrollY > STRIP_APPEARS_AT);
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

  useEffect(() => {
    const mq = window.matchMedia(WIDE);
    const apply = () => setWide(mq.matches);
    requestAnimationFrame(apply);
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // Keep the current chip in view. Written as a scrollLeft assignment rather
  // than scrollIntoView, which on a horizontal scroller will happily scroll the
  // page as well and take the reader somewhere they did not ask to go.
  useEffect(() => {
    const list = strip.current;
    if (!list || !active) return;
    const chip = list.querySelector<HTMLElement>(`[data-stop="${active}"]`);
    if (!chip) return;
    const target = chip.offsetLeft - list.clientWidth / 2 + chip.offsetWidth / 2;
    list.scrollTo({ left: Math.max(0, target), behavior: "smooth" });
  }, [active]);

  // Set immediately rather than waiting for the scroll that follows: at the
  // foot of a page there may be no scroll at all, and a control that answers a
  // tap with nothing reads as broken whatever the reason.
  const mark = (id: string) => setActive(id);

  if (wide === false) {
    return (
      <nav
        aria-label="Sections on this page"
        className={`fixed left-1/2 top-[5.5rem] z-40 w-[95%] max-w-5xl -translate-x-1/2 transition-all duration-300 print:!hidden xl:hidden ${
          scrolled
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        <ul
          ref={strip}
          className="no-scrollbar glass-strong flex gap-1 overflow-x-auto rounded-xl px-2 py-1.5"
        >
          {stops.map((stop) => {
            const on = stop.id === active;
            return (
              <li key={stop.id} className="shrink-0">
                <a
                  href={`#${stop.id}`}
                  data-stop={stop.id}
                  aria-current={on ? "true" : undefined}
                  onClick={() => mark(stop.id)}
                  className="block rounded-lg px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] transition-colors duration-300"
                  style={{
                    color: on ? stop.accent : "var(--muted-foreground)",
                    background: on ? "rgba(237, 230, 213, 0.06)" : undefined,
                    opacity: on ? 1 : 0.7,
                  }}
                >
                  {stop.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }

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
                onClick={() => mark(stop.id)}
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
