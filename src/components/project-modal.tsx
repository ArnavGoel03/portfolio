"use client";

import { Dialog } from "@base-ui/react/dialog";
import Link from "next/link";
import { ExternalLink, PlayCircle, Layers, Quote, Lock, X } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import { memberName } from "@/lib/types";
import { getCollection } from "@/lib/collections";
import { accentFor } from "@/lib/projects";
import { track } from "@/lib/analytics";
import { isYoutube } from "@/lib/utils";
import { projectIcons, DefaultProjectIcon, type ProjectModalProps } from "./project-preview";

export default function ProjectModal({
  project,
  onClose,
}: ProjectModalProps) {
  const Icon = projectIcons[project.id] || DefaultProjectIcon;
  const collection = getCollection(project.collection);
  // Identity, so this project looks the same here as it does in the home page
  // graph and on its own metrics.
  const accent = accentFor(project.id);

  return (
    <Dialog.Root
      open
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      {/* Portal outside animated sections so fixed positioning uses the viewport. */}
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-md" />
        <Dialog.Viewport className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8">
          <Dialog.Popup
            className="relative max-h-[calc(100dvh-2rem)] w-full max-w-2xl overflow-y-auto overscroll-contain gradient-border rounded-2xl bg-card shadow-2xl sm:max-h-[calc(100dvh-4rem)]"
          >
            <Dialog.Close
              aria-label="Close"
              className="absolute top-4 right-4 z-10 rounded-full border border-foreground/10 bg-card/80 p-2 text-muted-foreground backdrop-blur-sm transition-all hover:border-foreground/20 hover:text-foreground"
            >
              <X size={16} />
            </Dialog.Close>

            <div className="relative h-48 overflow-hidden rounded-t-2xl bg-gradient-to-br from-primary/5 via-background to-accent/10">
              {project.image ? (
                <>
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    decoding="async"
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
              {project.eyebrow && (
                <p
                  className="mb-2 font-mono text-[10px] font-medium uppercase tracking-[0.18em]"
                  style={{ color: accent }}
                >
                  {project.eyebrow}
                </p>
              )}
              <Dialog.Title className="font-serif text-2xl font-bold tracking-tight">
                {project.title}
              </Dialog.Title>

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
                    ? `With: ${project.team.members.map(memberName).join(", ")}`
                    : `Team project · ${project.team.size} members`}
                </p>
              )}

              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {project.description}
              </p>

              {collection && (
                <div className="mt-6 rounded-xl border border-foreground/10 bg-foreground/[0.03] p-4">
                  <p className="flex items-center gap-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                    <Layers size={11} aria-hidden="true" />
                    Part of {collection.label} · {collection.surfaces.length} sites
                  </p>
                  <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
                    {collection.summary}
                  </p>
                  <ul className="mt-3 grid gap-2">
                    {collection.surfaces.map((surface) => {
                      const isCurrent = surface.projectId === project.id;
                      if (isCurrent) {
                        return (
                          <li
                            key={surface.href}
                            className="flex flex-wrap items-center gap-2 text-[13px] text-foreground/85"
                          >
                            {surface.label}
                            <span className="rounded-full border border-primary/40 bg-primary/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.12em]">
                              You are here
                            </span>
                          </li>
                        );
                      }
                      const inner = (
                        <>
                          {surface.label}
                          {surface.gated && (
                            <span
                              title={surface.gated}
                              className="ml-1.5 inline-flex items-center gap-1 rounded-full border border-dashed border-foreground/20 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground"
                            >
                              <Lock size={9} aria-hidden="true" />
                              {surface.gated}
                            </span>
                          )}
                        </>
                      );
                      return (
                        <li key={surface.href} className="text-[13px]">
                          {surface.projectId ? (
                            <Link
                              href={surface.href}
                              className="text-foreground/85 underline decoration-foreground/25 underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground/60"
                            >
                              {inner}
                            </Link>
                          ) : (
                            <a
                              href={surface.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-foreground/85 underline decoration-foreground/25 underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground/60"
                            >
                              {inner}
                            </a>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}

              {project.surfaces && project.surfaces.length > 0 && (
                <div className="mt-6 rounded-xl border border-foreground/10 bg-foreground/[0.03] p-4">
                  <p className="flex items-center gap-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                    <Layers size={11} aria-hidden="true" />
                    {project.surfacesLabel ?? `In this studio · ${project.surfaces.length} sites`}
                  </p>
                  <ul className="mt-3 grid gap-2.5">
                    {project.surfaces.map((surface) => (
                      <li key={surface.label} className="flex gap-3 text-[13px]">
                        {surface.image && (
                          <img
                            src={surface.image}
                            alt=""
                            loading="lazy"
                            decoding="async"
                            className="mt-0.5 h-11 w-[72px] shrink-0 rounded-md border border-foreground/10 object-cover object-top"
                          />
                        )}
                        <span>
                          {/* An empty href is a product with no address to send a
                              reader to, which is the same thing `Project.demo: ""`
                              already means one level up. It renders as plain text,
                              because an anchor with no href reloads the page and
                              reads to a screen reader as a link that goes nowhere.
                              The key is the label for the same reason: two unshipped
                              surfaces would otherwise collide on "". */}
                          {surface.href ? (
                            <a
                              href={surface.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-foreground/85 underline decoration-foreground/25 underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground/60"
                            >
                              {surface.label}
                            </a>
                          ) : (
                            <span className="text-foreground/85">{surface.label}</span>
                          )}
                          <span className="text-muted-foreground"> {surface.blurb}</span>
                          {surface.holds && (
                            <span className="mt-0.5 block font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground/70">
                              {surface.holds}
                            </span>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

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

              <div className="mt-8 flex flex-wrap items-center gap-3">
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
                    className="flex items-center gap-1.5 rounded-lg border border-foreground/10 bg-foreground/5 px-4 py-2 text-sm font-medium text-foreground/70 transition-all hover:border-foreground/20 hover:bg-foreground/5 hover:text-foreground"
                  >
                    <FaGithub size={15} />
                    View Code
                  </a>
                )}
                {!project.github && project.privateRepo && (
                  <span
                    title="Source code is private. Email to request access."
                    className="flex items-center gap-1.5 rounded-lg border border-dashed border-foreground/15 px-4 py-2 text-sm font-medium text-muted-foreground"
                  >
                    <FaGithub size={15} aria-hidden="true" />
                    Source · Private
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
                {project.doi && (
                  <a
                    href={`https://doi.org/${project.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`DOI: ${project.doi}`}
                    className="flex items-center gap-1.5 rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-4 py-2 text-sm font-medium text-emerald-400/90 transition-all hover:border-emerald-500/40 hover:bg-emerald-500/10 hover:text-emerald-300"
                  >
                    <Quote size={14} />
                    Cite (DOI)
                  </a>
                )}
              </div>
            </div>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

