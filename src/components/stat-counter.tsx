"use client";

import { useEffect, useRef, useState } from "react";

interface StatCounterProps {
  value: number;
  /** The hue this number wears. Four numbers in one row all in the same cream
   *  read as one block of text; a reader picks out none of them. */
  accent?: string;
  suffix?: string;
  label: string;
  decimals?: number;
  duration?: number;
}

export default function StatCounter({
  value,
  accent,
  suffix = "",
  label,
  decimals = 0,
  duration = 2000,
}: StatCounterProps) {
  const [display, setDisplay] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const start = performance.now();
    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(eased * value);
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [started, value, duration]);

  return (
    <div ref={ref} className="text-center">
      {accent && (
        <span
          aria-hidden="true"
          className="mx-auto mb-3 block h-[3px] w-8 rounded-full"
          style={{ background: accent }}
        />
      )}
      <p className="font-serif text-5xl font-bold tracking-tight md:text-6xl">
        <span className={accent ? undefined : "heading-gradient"} style={accent ? { color: accent } : undefined}>
          {decimals > 0 ? display.toFixed(decimals) : Math.round(display)}
        </span>
        <span className="text-muted-foreground">{suffix}</span>
      </p>
      <p className="mt-2 text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
