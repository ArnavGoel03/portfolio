"use client";

import { useEffect, useState } from "react";

interface TypewriterProps {
  text: string;
  delay?: number;
  startDelay?: number;
  className?: string;
}

export default function Typewriter({
  text,
  delay = 90,
  startDelay = 600,
  className,
}: TypewriterProps) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);
  // Derived rather than stored. Whether the typing has finished is a fact about
  // `displayed`, not a second thing to keep in step with it, and setting it
  // from inside the effect below was a synchronous setState in an effect: an
  // extra render pass on the one frame where the last character lands.
  const done = started && displayed.length >= text.length;

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), startDelay);
    return () => clearTimeout(t);
  }, [startDelay]);

  useEffect(() => {
    if (!started || displayed.length >= text.length) return;
    const t = setTimeout(
      () => setDisplayed(text.slice(0, displayed.length + 1)),
      delay
    );
    return () => clearTimeout(t);
  }, [started, displayed, text, delay]);

  return (
    <span className={className}>
      {displayed}
      <span
        className={`inline-block w-[3px] h-[0.85em] ml-1 align-middle bg-primary rounded-full ${done ? "animate-pulse-glow" : "animate-blink"}`}
      />
    </span>
  );
}
