"use client";

import { motion } from "framer-motion";
import {
  Brain,
  Database,
  BarChart3,
  Globe,
  Cpu,
  Layers,
  Workflow,
  Code2,
  Terminal,
  Boxes,
  Network,
  Sigma,
} from "lucide-react";

const skills = [
  { name: "Python", icon: Terminal },
  { name: "TensorFlow", icon: Brain },
  { name: "Machine Learning", icon: Cpu },
  { name: "Graph Theory", icon: Network },
  { name: "React", icon: Code2 },
  { name: "Next.js", icon: Layers },
  { name: "TypeScript", icon: Terminal },
  { name: "SQL", icon: Database },
  { name: "Pandas", icon: BarChart3 },
  { name: "PyTorch", icon: Brain },
  { name: "NLP", icon: Sigma },
  { name: "Data Viz", icon: BarChart3 },
  { name: "Docker", icon: Boxes },
  { name: "Node.js", icon: Globe },
  { name: "Scikit-learn", icon: Workflow },
  { name: "Deep Learning", icon: Cpu },
];

export default function SkillsTicker() {
  const doubled = [...skills, ...skills];

  return (
    <div className="relative py-12">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass rounded-2xl p-1 overflow-hidden"
        >
          <div className="relative rounded-xl bg-background/30 py-5">
            <div className="absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-background to-transparent" />
            <div className="absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-background to-transparent" />
            <div className="flex gap-3 animate-ticker">
              {doubled.map((skill, i) => {
                const Icon = skill.icon;
                return (
                  <div
                    key={`${skill.name}-${i}`}
                    className="flex flex-shrink-0 items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-5 py-2.5 transition-all duration-300 hover:border-primary/30 hover:bg-primary/10 hover:shadow-[0_0_20px_rgba(167,139,250,0.15)]"
                  >
                    <Icon size={14} className="text-primary icon-glow" />
                    <span className="text-sm font-medium text-foreground/80">
                      {skill.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
