"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { ExternalLink, PlayCircle, BookOpen, Quote, Layers, Loader2 } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import { Project, memberName } from "@/lib/types";
import { getCollection } from "@/lib/collections";
import { track } from "@/lib/analytics";
import { isYoutube } from "@/lib/utils";

import { projectIcons, DefaultProjectIcon, type ProjectModalProps } from "./project-preview";
import { createPreviewLoader } from "@/lib/preview-loader";

const previewLoader = createPreviewLoader(() => import("./project-modal").then(module => module.default));

const CASE_STUDY_SLUGS = new Set([
  "watch-together",
  "gondilal-saraf",
  "serenity",
  "redbull-youtube-analytics",
]);

// Projects without enough shipped state or specificity to warrant a dedicated
// detail page. For these, the card click still opens the quick-preview modal
// but no "Details" link is shown.
const NO_DETAIL_PAGE = new Set<string>();

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const Icon = projectIcons[project.id] || DefaultProjectIcon;
  const collection = getCollection(project.collection);
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [Preview, setPreview] = useState<ComponentType<ProjectModalProps> | null>(null);
  const cancel = useRef<(() => void) | null>(null);
  const mounted = useRef(false);
  const router = useRouter();

  useEffect(() => {
    mounted.current = true;
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") cancel.current?.();
    };
    window.addEventListener("keydown", escape);
    return () => {
      mounted.current = false;
      cancel.current?.();
      window.removeEventListener("keydown", escape);
    };
  }, []);

  return (
    <>
      <motion.div
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.12 }}
        className="card-3d group cursor-pointer"
        aria-busy={pending}
        onClick={() => {
          if (pending || open) return;
          track("project_card_open", { project_id: project.id });
          setPending(true);
          cancel.current = previewLoader.request({
            ready: Component => {
              setPreview(() => Component);
              setPending(false);
              setOpen(true);
            },
            failed: () => {
              setPending(false);
              router.push(`/projects/${project.id}`);
            },
            cancelled: () => {
              if (mounted.current) setPending(false);
            },
          });
        }}
      >
        <div className="card-3d-inner gradient-border glow-card rounded-2xl bg-card overflow-hidden">
          <div className="relative h-44 overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/10">
            {pending && (
              <span role="status" aria-label={project.title} className="absolute top-3 right-3 z-10 rounded-full bg-card/80 p-2">
                <Loader2 size={18} aria-hidden="true" className="animate-spin" />
              </span>
            )}
            {project.image ? (
              <>
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
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
                  ? `With ${project.team.members.map(memberName).join(", ")}`
                  : `Team of ${project.team.size}`}
              </p>
            )}
            {collection && (
              <p className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-foreground/10 bg-foreground/5 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground">
                <Layers size={10} aria-hidden="true" />
                {collection.label} · 1 of {collection.surfaces.length} sites
              </p>
            )}
            {project.surfaces && project.surfaces.length > 0 && (
              <p className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-foreground/10 bg-foreground/5 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground">
                <Layers size={10} aria-hidden="true" />
                {project.surfacesLabel ?? `Studio · ${project.surfaces.length} sites`}
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
            <div className="mt-5 flex flex-wrap items-center gap-3" onClick={(e) => e.stopPropagation()}>
              {CASE_STUDY_SLUGS.has(project.id) ? (
                <Link
                  href={`/projects/${project.id}`}
                  className="flex items-center gap-1.5 rounded-lg border border-foreground/15 bg-foreground/8 px-3 py-1.5 text-xs font-medium text-foreground transition-all hover:border-foreground/30 hover:bg-foreground/10"
                >
                  <BookOpen size={13} />
                  Case study
                </Link>
              ) : !NO_DETAIL_PAGE.has(project.id) ? (
                <Link
                  href={`/projects/${project.id}`}
                  className="flex items-center gap-1.5 rounded-lg border border-foreground/10 bg-foreground/5 px-3 py-1.5 text-xs font-medium text-foreground/75 transition-all hover:border-foreground/20 hover:bg-foreground/10 hover:text-foreground"
                >
                  <BookOpen size={13} />
                  Details
                </Link>
              ) : null}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    track("project_link_click", {
                      project_id: project.id,
                      link_type: "github",
                    })
                  }
                  className="flex items-center gap-1.5 rounded-lg border border-foreground/10 bg-foreground/5 px-3 py-1.5 text-xs font-medium text-foreground/70 transition-all hover:border-foreground/20 hover:bg-foreground/5 hover:text-foreground"
                >
                  <FaGithub size={13} />
                  Code
                </a>
              )}
              {!project.github && project.privateRepo && (
                <span
                  title="Source code is private. Email to request access."
                  className="flex items-center gap-1.5 rounded-lg border border-dashed border-foreground/15 px-3 py-1.5 text-xs font-medium text-muted-foreground"
                >
                  <FaGithub size={13} aria-hidden="true" />
                  Private
                </span>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    track("project_link_click", {
                      project_id: project.id,
                      link_type: "demo",
                    })
                  }
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
              {project.doi && (
                <a
                  href={`https://doi.org/${project.doi}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`DOI: ${project.doi}`}
                  className="flex items-center gap-1.5 rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-3 py-1.5 text-xs font-medium text-emerald-400/90 transition-all hover:border-emerald-500/40 hover:bg-emerald-500/10 hover:text-emerald-300"
                >
                  <Quote size={12} />
                  DOI
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {open && Preview && <Preview project={project} onClose={() => setOpen(false)} />}
    </>
  );
}
