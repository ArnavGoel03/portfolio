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

      {items.map((item, index) => (
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
              <div className="absolute inset-0 animate-pulse-glow rounded-full bg-primary/30 blur-md" />
              <div className="relative flex h-12 w-12 items-center justify-center rounded-full border border-primary/30 bg-card backdrop-blur-sm">
                {item.type === "work" ? (
                  <Briefcase size={18} className="text-primary" />
                ) : (
                  <GraduationCap size={18} className="text-primary" />
                )}
              </div>
            </div>
          </div>

          <div
            className={`ml-16 md:ml-0 md:w-1/2 ${
              index % 2 === 0 ? "md:pr-16" : "md:pl-16"
            }`}
          >
            <div className="gradient-border glow-card rounded-2xl bg-card p-6 backdrop-blur-sm">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="font-serif text-lg font-semibold tracking-tight">
                    {item.role}
                  </h3>
                  <p className="text-sm font-medium text-primary">{item.company}</p>
                </div>
                <span className="flex-shrink-0 rounded-full border border-primary/10 bg-primary/5 px-3 py-1 text-xs text-muted-foreground">
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
                      className="border-primary/10 bg-primary/5 text-xs font-normal text-primary/80"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
