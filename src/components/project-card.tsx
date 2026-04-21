"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  AudioWaveform,
  ScanEye,
  PawPrint,
  Gem,
  HeartPulse,
  Clapperboard,
  Dice6,
  Trophy,
  Building2,
  TrendingUp,
  Activity,
  GraduationCap,
  PlayCircle,
  CreditCard,
  BarChart3,
  Zap,
  X,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import { Project } from "@/lib/types";

const projectIcons: Record<string, typeof AudioWaveform> = {
  vaani: AudioWaveform,
  "handwritten-digits": ScanEye,
  "pet-classifier": PawPrint,
  "pcod-tracker": HeartPulse,
  "gondilal-saraf": Gem,
  "watch-together": Clapperboard,
  "fair-ludo": Dice6,
  "mlb-playoff-cogs108": Trophy,
  "arkinvest-anduril-mgt127r": Building2,
  "arkinvest-mgt127r": TrendingUp,
  "har-cse158": Activity,
  "cogs9-final": GraduationCap,
  cardranker: CreditCard,
  "redbull-youtube-analytics": BarChart3,
  "power-grid-analysis": Zap,
};

function isYoutube(url: string): boolean {
  return /youtu\.?be/.test(url);
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const Icon = projectIcons[project.id] || ScanEye;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-8"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-background/80 backdrop-blur-md" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto gradient-border rounded-2xl bg-card backdrop-blur-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 rounded-full border border-foreground/10 bg-card/80 p-2 text-muted-foreground backdrop-blur-sm transition-all hover:border-foreground/20 hover:text-foreground"
        >
          <X size={16} />
        </button>

        <div className="relative h-48 overflow-hidden rounded-t-2xl bg-gradient-to-br from-primary/5 via-background to-accent/10">
          {project.image ? (
            <>
              <img
                src={project.image}
                alt={project.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
            </>
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <div className="relative">
                <div className="absolute inset-0 animate-pulse-glow rounded-full bg-primary/20 blur-2xl" />
                <div className="relative rounded-2xl border border-foreground/10 bg-foreground/5 p-6 backdrop-blur-sm">
                  <Icon size={48} className="text-foreground/80 icon-glow" />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-8">
          <h2 className="font-serif text-2xl font-bold tracking-tight">
            {project.title}
          </h2>

          {project.date && (
            <p className="mt-2 font-mono text-xs text-muted-foreground/60">
              {new Date(project.date + "-01").toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </p>
          )}

          {project.team && (
            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
              {project.team.members && project.team.members.length > 0
                ? `With: ${project.team.members.join(", ")}`
                : `Team project · ${project.team.size} members`}
            </p>
          )}

          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="border-foreground/10 bg-foreground/5 text-xs font-normal text-foreground/75"
              >
                {tag}
              </Badge>
            ))}
          </div>

          <div className="mt-8 flex items-center gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-lg border border-foreground/10 bg-foreground/5 px-4 py-2 text-sm font-medium text-foreground/70 transition-all hover:border-foreground/20 hover:bg-foreground/5 hover:text-foreground"
              >
                <FaGithub size={15} />
                View Code
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(167,139,250,0.3)]"
              >
                {isYoutube(project.demo) ? (
                  <PlayCircle size={15} />
                ) : (
                  <ExternalLink size={15} />
                )}
                {isYoutube(project.demo)
                  ? "Watch Video"
                  : project.demo.endsWith(".pdf")
                  ? "Read Report"
                  : project.demo.includes("chromewebstore")
                  ? "Install Extension"
                  : project.demo.includes("vercel.app")
                  ? "View Demo"
                  : "Visit Site"}
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const Icon = projectIcons[project.id] || ScanEye;
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.12 }}
        className="card-3d group cursor-pointer"
        onClick={() => setOpen(true)}
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
                  <div className="relative rounded-2xl border border-foreground/10 bg-foreground/5 p-5 backdrop-blur-sm">
                    <Icon
                      size={40}
                      className="text-foreground/80 icon-glow transition-transform duration-500 group-hover:scale-110"
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
            {project.team && (
              <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                {project.team.members && project.team.members.length > 0
                  ? `With ${project.team.members.join(", ")}`
                  : `Team of ${project.team.size}`}
              </p>
            )}
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-3">
              {project.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {project.tags.slice(0, 4).map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="border-foreground/10 bg-foreground/5 text-xs font-normal text-foreground/75"
                >
                  {tag}
                </Badge>
              ))}
              {project.tags.length > 4 && (
                <Badge
                  variant="secondary"
                  className="border-foreground/10 bg-foreground/5 text-xs font-normal text-foreground/75"
                >
                  +{project.tags.length - 4}
                </Badge>
              )}
            </div>
            <div className="mt-5 flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-lg border border-foreground/10 bg-foreground/5 px-3 py-1.5 text-xs font-medium text-foreground/70 transition-all hover:border-foreground/20 hover:bg-foreground/5 hover:text-foreground"
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
                  {isYoutube(project.demo) ? (
                    <PlayCircle size={13} />
                  ) : (
                    <ExternalLink size={13} />
                  )}
                  {isYoutube(project.demo)
                    ? "Video"
                    : project.demo.endsWith(".pdf")
                    ? "Report"
                    : project.demo.includes("chromewebstore")
                    ? "Install"
                    : project.demo.includes("vercel.app")
                    ? "Demo"
                    : "Live Site"}
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {open && <ProjectModal project={project} onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
