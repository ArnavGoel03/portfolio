"use client";

import { motion, useReducedMotion } from "framer-motion";

interface KineticHeadingProps {
  text: string;
  className?: string;
  stagger?: number;
  duration?: number;
  delay?: number;
}

export default function KineticHeading({
  text,
  className,
  stagger = 0.08,
  duration = 0.9,
  delay = 0,
}: KineticHeadingProps) {
  const prefersReduced = useReducedMotion();
  const words = text.split(" ");

  if (prefersReduced) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span
      className={className}
      style={{ display: "inline-block" }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span
          key={i}
          aria-hidden="true"
          style={{
            display: "inline-block",
            overflow: "hidden",
            verticalAlign: "top",
            paddingBottom: "0.08em",
            marginRight: i === words.length - 1 ? 0 : "0.28em",
          }}
        >
          <motion.span
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{
              duration,
              delay: delay + i * stagger,
              ease: [0.19, 1, 0.22, 1],
            }}
            style={{
              display: "inline-block",
              willChange: "transform",
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
