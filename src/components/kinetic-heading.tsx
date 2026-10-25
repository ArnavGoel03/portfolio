"use client";

import { motion } from "framer-motion";

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
  const words = text.split(" ");

  // One markup for everyone. This used to return a plain <span> when
  // useReducedMotion() was true, but that hook is null on the server, so a
  // reduced-motion reader got different HTML from the client than from the
  // server: React error #418, and a full client re-render of the root that
  // also reset <html>'s class. Reduced motion is already honoured globally by
  // <MotionConfig reducedMotion="user"> in motion-provider.tsx, which skips
  // the transform below.
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
