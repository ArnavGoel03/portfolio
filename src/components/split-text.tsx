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
  const units =
    mode === "words" ? text.split(" ") : Array.from(text);

  return (
    <Wrapper className={className} style={{ display: "inline-block" }}>
      {units.map((unit, i) => {
        const isSpace = unit === " ";
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              overflow: "hidden",
              verticalAlign: "top",
              whiteSpace: isSpace ? "pre" : "normal",
            }}
            aria-hidden={false}
          >
            <motion.span
              initial={{ y: "110%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration,
                delay: delay + i * stagger,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{ display: "inline-block", willChange: "transform, opacity" }}
            >
              {isSpace ? " " : unit}
            </motion.span>
          </span>
        );
      })}
    </Wrapper>
  );
}
