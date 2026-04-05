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
      <div className="absolute left-6 top-0 bottom-0 w-px bg-border/50 md:left-1/2" />
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className={`relative mb-12 flex flex-col md:flex-row ${
            index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
          }`}
        >
          <div className="hidden md:block md:w-1/2" />
          <div className="absolute left-6 z-10 -translate-x-1/2 md:left-1/2">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border/50 bg-card">
              {item.type === "work" ? (
                <Briefcase size={18} className="text-primary" />
              ) : (
                <GraduationCap size={18} className="text-primary" />
              )}
            </div>
          </div>
          <div
            className={`ml-16 md:ml-0 md:w-1/2 ${
              index % 2 === 0 ? "md:pr-16" : "md:pl-16"
            }`}
          >
            <div className="gradient-border glow-hover rounded-xl bg-card p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold">{item.role}</h3>
                  <p className="text-sm text-primary">{item.company}</p>
                </div>
                <span className="flex-shrink-0 text-xs text-muted-foreground">
                  {item.startDate} — {item.endDate || "Present"}
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
              {item.skills.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="text-xs font-normal"
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
