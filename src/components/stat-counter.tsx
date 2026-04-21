"use client";

import { useEffect, useRef, useState } from "react";

interface StatCounterProps {
  value: number;
  suffix?: string;
  label: string;
  decimals?: number;
  duration?: number;
}

export default function StatCounter({
  value,
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
      <p className="font-serif text-4xl font-bold tracking-tight md:text-5xl">
        <span className="heading-gradient">
          {decimals > 0 ? display.toFixed(decimals) : Math.round(display)}
        </span>
        <span className="text-muted-foreground">{suffix}</span>
      </p>
      <p className="mt-2 text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
