"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Experience } from "@/lib/types";

interface TimelineProps {
  items: Experience[];
}

export default function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative">
      <div className="absolute left-6 top-0 bottom-0 w-px md:left-1/2">
        <div className="h-full w-full bg-gradient-to-b from-primary/40 via-primary/20 to-transparent" />
      </div>

      {items.map((item, index) => {
        const isPresent =
          !item.endDate || item.endDate.toLowerCase() === "present";

        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: index * 0.1,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className={`relative mb-14 flex flex-col md:flex-row ${
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            }`}
          >
            <div className="hidden md:block md:w-1/2" />

            <div className="absolute left-6 z-10 -translate-x-1/2 md:left-1/2">
              <div className="relative">
                {isPresent && (
                  <div className="absolute -inset-1 animate-pulse-glow rounded-full bg-primary/40 blur-lg" />
                )}
                <div className="absolute inset-0 rounded-full bg-primary/20 blur-md" />
                <div
                  className={`relative flex h-12 w-12 items-center justify-center rounded-full border bg-card backdrop-blur-sm transition-all duration-300 ${
                    isPresent
                      ? "border-primary/50 shadow-[0_0_15px_rgba(167,139,250,0.3)]"
                      : "border-foreground/10"
                  }`}
                >
                  {item.type === "work" ? (
                    <Briefcase size={18} className="text-foreground/80" />
                  ) : (
                    <GraduationCap size={18} className="text-foreground/80" />
                  )}
                </div>
              </div>
            </div>

            <div
              className={`ml-16 md:ml-0 md:w-1/2 ${
                index % 2 === 0 ? "md:pr-16" : "md:pl-16"
              }`}
            >
              <div className="group gradient-border glow-card rounded-2xl bg-card p-6 backdrop-blur-sm transition-all duration-300 hover:shadow-[0_0_30px_rgba(167,139,250,0.1)]">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="font-serif text-lg font-semibold tracking-tight">
                      {item.role}
                    </h3>
                    <p className="text-sm font-medium text-foreground/80">
                      {item.company}
                    </p>
                  </div>
                  <span
                    className={`flex-shrink-0 rounded-full border px-3 py-1 text-xs ${
                      isPresent
                        ? "border-foreground/20 bg-foreground/5 text-foreground/80 font-medium"
                        : "border-foreground/10 bg-foreground/5 text-muted-foreground"
                    }`}
                  >
                    {item.startDate} — {item.endDate || "Present"}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
                {item.skills.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {item.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="border-foreground/10 bg-foreground/5 text-xs font-normal text-foreground/75"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
