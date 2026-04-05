"use client";

import { motion } from "framer-motion";
import { ExternalLink, AudioWaveform, Shirt, ScanEye, PawPrint, Gem } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import { Project } from "@/lib/types";

const projectIcons: Record<string, typeof AudioWaveform> = {
  vaani: AudioWaveform,
  "style-it": Shirt,
  "handwritten-digits": ScanEye,
  "pet-classifier": PawPrint,
  "gondilal-saraf": Gem,
};

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const Icon = projectIcons[project.id] || ScanEye;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      className="card-3d group"
    >
      <div className="card-3d-inner gradient-border glow-card rounded-2xl bg-card overflow-hidden">
        <div className="relative h-44 overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/10">
          {project.image ? (
            <>
              <img
                src={project.image}
                alt={project.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
            </>
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <div className="relative">
                <div className="absolute inset-0 animate-pulse-glow rounded-full bg-primary/20 blur-2xl" />
                <div className="relative rounded-2xl border border-primary/20 bg-primary/5 p-5 backdrop-blur-sm">
                  <Icon
                    size={40}
                    className="text-primary icon-glow transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-6">
          <h3 className="font-serif text-lg font-semibold tracking-tight">
            {project.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-3">
            {project.description}
          </p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.tags.slice(0, 4).map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="border-primary/10 bg-primary/5 text-xs font-normal text-primary/80"
              >
                {tag}
              </Badge>
            ))}
          </div>
          <div className="mt-5 flex items-center gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-lg border border-primary/10 bg-primary/5 px-3 py-1.5 text-xs font-medium text-foreground/70 transition-all hover:border-primary/30 hover:bg-primary/10 hover:text-foreground"
              >
                <FaGithub size={13} />
                Code
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(167,139,250,0.3)]"
              >
                <ExternalLink size={13} />
                Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
