"use client";

import { motion } from "framer-motion";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  mode?: "chars" | "words";
  as?: "span" | "div";
}

/**
 * Keeping the separators is the whole trick.
 *
 * `text.split(" ")` drops them, and since every unit is rendered as an
 * inline-block, the words then sit flush against each other: the hero tagline
 * rendered as "Ibuilddatasciencethatships." Splitting on a capturing group
 * keeps the whitespace as its own token, and emitting that token as ordinary
 * text (not an inline-block) leaves the browser a place to break the line.
 */
const WHITESPACE = /(\s+)/;

export default function SplitText({
  text,
  className,
  delay = 0,
  duration = 0.7,
  stagger = 0.035,
  mode = "chars",
  as = "span",
}: SplitTextProps) {
  const Wrapper = as;
  const tokens = text.split(WHITESPACE).filter(Boolean);

  // Stagger runs across the whole string, not per word, so the reveal reads as
  // one sweep rather than restarting at every space.
  let unit = 0;

  return (
    <Wrapper className={className} style={{ display: "inline-block" }}>
      {tokens.map((token, t) => {
        if (WHITESPACE.test(token)) return <span key={t}>{token}</span>;

        // Characters animate individually but stay wrapped in their word, so a
        // line break can never land inside one ("I b / uild ML").
        const parts = mode === "words" ? [token] : Array.from(token);

        return (
          <span
            key={t}
            style={{ display: "inline-block", whiteSpace: "nowrap" }}
          >
            {parts.map((part, p) => {
              const i = unit++;
              return (
                <span
                  key={p}
                  style={{
                    display: "inline-block",
                    overflow: "hidden",
                    verticalAlign: "top",
                  }}
                >
                  <motion.span
                    initial={{ y: "110%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      duration,
                      delay: delay + i * stagger,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    style={{
                      display: "inline-block",
                      willChange: "transform, opacity",
                    }}
                  >
                    {part}
                  </motion.span>
                </span>
              );
            })}
          </span>
        );
      })}
    </Wrapper>
  );
}
