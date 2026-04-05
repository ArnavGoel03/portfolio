"use client";

import { motion } from "framer-motion";

const skills = [
  "Python",
  "TypeScript",
  "React",
  "Next.js",
  "Machine Learning",
  "Graph Theory",
  "PyTorch",
  "TensorFlow",
  "Pandas",
  "SQL",
  "Node.js",
  "Tailwind CSS",
  "Data Visualization",
  "NLP",
  "Scikit-learn",
  "Docker",
];

export default function SkillsTicker() {
  const doubled = [...skills, ...skills];

  return (
    <div className="relative overflow-hidden py-6">
      <div className="absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-background to-transparent" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex gap-4 animate-ticker"
      >
        {doubled.map((skill, i) => (
          <div
            key={`${skill}-${i}`}
            className="flex-shrink-0 rounded-full border border-border/50 bg-secondary/50 px-5 py-2 text-sm font-medium text-muted-foreground"
          >
            {skill}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
