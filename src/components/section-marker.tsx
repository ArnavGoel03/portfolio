"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * The head of a section, and the thing that tells a reader where they are.
 *
 * Every section on this site used to open the same way: a small grey kicker, a
 * serif heading, then the same rounded card as the section before it. Nine
 * certifications looked exactly like nine of anything else, so nothing read as
 * more important than anything else and the eye had nowhere to land.
 *
 * A number and a rule fix that cheaply. The number says how far through you
 * are, which is what makes a long page feel finite rather than endless, and the
 * rule draws itself on arrival so a section announces that it has started. The
 * accent is the section's identity and repeats on its own content below, so
 * colour sorts the page rather than decorating it.
 *
 * Colour is never the only signal here: the number, the kicker and the heading
 * all say the same thing in text, so the page reads with no colour at all.
 */
export default function SectionMarker({
  index,
  kicker,
  title,
  accent,
  id,
}: {
  /** 1-based. Printed as 01, 02, and used for nothing else. */
  index: number;
  kicker: string;
  title: string;
  /** A CSS colour, normally one of the four --accent tokens. */
  accent: string;
  id?: string;
}) {
  const still = useReducedMotion();

  return (
    <div id={id} className="mb-10 scroll-mt-28">
      <div className="flex items-baseline gap-4">
        <span
          className="font-mono text-xs font-medium tabular-nums"
          style={{ color: accent }}
        >
          {String(index).padStart(2, "0")}
        </span>
        <span className="font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
          {kicker}
        </span>
        <motion.span
          aria-hidden="true"
          className="h-px flex-1 origin-left"
          style={{ background: accent, opacity: 0.55 }}
          initial={still ? false : { scaleX: 0 }}
          whileInView={still ? undefined : { scaleX: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      <motion.h2
        className="mt-4 font-serif text-3xl font-bold tracking-tight md:text-4xl"
        initial={still ? false : { opacity: 0, y: 14 }}
        whileInView={still ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
      >
        {title}
      </motion.h2>
    </div>
  );
}
