"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValueEvent,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import { caseStudies } from "@/lib/case-studies";
import { Project } from "@/lib/types";

interface PinnedFlagshipsProps {
  projects: Project[];
}

export default function PinnedFlagships({ projects }: PinnedFlagshipsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const [active, setActive] = useState(0);

  const n = projects.length;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0vw", `-${(n - 1) * 100}vw`]
  );

  const hintOpacity = useTransform(scrollYProgress, [0, 0.06], [0.6, 0]);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (n < 2) return;
    const idx = Math.min(n - 1, Math.max(0, Math.round(p * (n - 1))));
    if (idx !== active) setActive(idx);
  });

  if (prefersReduced || n < 2) return null;

  return (
    <section
      ref={ref}
      aria-label="Flagship projects"
      className="relative hidden overflow-x-clip lg:block"
      style={{ height: `${(n - 1) * 80 + 100}vh` }}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex h-full">
          {projects.map((project, i) => (
            <FlagshipSlide
              key={project.id}
              project={project}
              index={i}
              active={i === active}
            />
          ))}
        </motion.div>

        <div className="pointer-events-none absolute inset-x-0 bottom-12 flex items-center justify-center gap-5">
          {projects.map((project, i) => (
            <div key={project.id} className="flex items-center gap-3">
              <span
                className={`font-mono text-[10px] uppercase tracking-[0.22em] transition-colors duration-500 ${
                  i === active ? "text-foreground" : "text-muted-foreground/40"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div
                className={`h-px transition-all duration-500 ${
                  i === active ? "w-14 bg-primary" : "w-8 bg-foreground/15"
                }`}
              />
            </div>
          ))}
        </div>

        <motion.p
          style={{ opacity: hintOpacity }}
          className="pointer-events-none absolute inset-x-0 bottom-24 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground"
        >
          Scroll to advance &darr;
        </motion.p>
      </div>
    </section>
  );
}

function FlagshipSlide({
  project,
  index,
  active,
}: {
  project: Project;
  index: number;
  active: boolean;
}) {
  const study = caseStudies.find((s) => s.slug === project.id);

  return (
    <article className="relative flex h-full w-screen shrink-0 items-center justify-center px-10 xl:px-20">
      <div className="mx-auto w-full max-w-4xl">
        <p
          className={`font-mono text-[10px] font-medium uppercase tracking-[0.26em] transition-colors duration-700 ${
            active ? "text-muted-foreground" : "text-muted-foreground/40"
          }`}
        >
          Flagship {String(index + 1).padStart(2, "0")}
          {study?.status && (
            <>
              <span className="mx-3 text-foreground/20">&mdash;</span>
              {study.status}
            </>
          )}
        </p>

        <motion.h3
          animate={{ y: active ? 0 : 12 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 font-serif text-4xl font-semibold leading-[1.05] tracking-[-0.01em] text-foreground md:text-5xl xl:text-[3.75rem]"
        >
          {study?.title ?? project.title}
        </motion.h3>

        {study?.thesis && (
          <p className="mt-6 max-w-2xl text-lg leading-[1.55] text-foreground/85 xl:text-xl xl:leading-[1.5]">
            {study.thesis}
          </p>
        )}

        <p className="mt-5 max-w-2xl text-[15px] leading-[1.65] text-muted-foreground">
          {study?.oneLiner ?? project.description}
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-5">
          <Link
            href={`/projects/${project.id}`}
            className="btn-glow group inline-flex h-11 items-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground"
          >
            Read case study
            <ArrowRight
              size={15}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </Link>
          {study?.role && (
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              {study.role}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
