"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  Search,
  Home,
  User,
  Briefcase,
  GraduationCap,
  FileText,
  Lightbulb,
  BookOpen,
  Wrench,
  Zap,
  Mail,
  Calendar,
  ExternalLink,
  CornerDownLeft,
  Command as CommandIcon,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import type { IconType } from "react-icons";
import { SOCIAL_LINKS } from "@/lib/constants";

type IconComponent = LucideIcon | IconType;

type CommandItem = {
  id: string;
  label: string;
  section: "Navigation" | "Case Studies" | "External" | "Actions";
  icon: IconComponent;
  href: string;
  external?: boolean;
  keywords?: string[];
  hint?: string;
};

const ITEMS: CommandItem[] = [
  // Navigation
  { id: "home", label: "Home", section: "Navigation", icon: Home, href: "/" },
  { id: "about", label: "About", section: "Navigation", icon: User, href: "/about", keywords: ["skills", "education", "writing"] },
  { id: "projects", label: "Projects", section: "Navigation", icon: Zap, href: "/projects" },
  { id: "ideas", label: "Ideas", section: "Navigation", icon: Lightbulb, href: "/ideas" },
  { id: "experience", label: "Experience", section: "Navigation", icon: Briefcase, href: "/experience" },
  { id: "coursework", label: "Coursework", section: "Navigation", icon: GraduationCap, href: "/coursework", keywords: ["classes", "ucsd", "courses", "grades", "gpa"] },
  { id: "resume", label: "Resume", section: "Navigation", icon: FileText, href: "/resume" },
  { id: "work", label: "Work", section: "Navigation", icon: Briefcase, href: "/work", keywords: ["hire", "availability", "visa"] },
  { id: "now", label: "Now", section: "Navigation", icon: Zap, href: "/now" },
  { id: "uses", label: "Uses", section: "Navigation", icon: Wrench, href: "/uses", keywords: ["tools", "stack"] },
  { id: "blog", label: "Blog", section: "Navigation", icon: BookOpen, href: "/blog" },
  { id: "contact", label: "Contact", section: "Navigation", icon: Mail, href: "/contact" },

  // Case studies
  { id: "cs-watch-together", label: "Watch Together, case study", section: "Case Studies", icon: BookOpen, href: "/projects/watch-together", keywords: ["chrome extension", "websocket", "sync"] },
  { id: "cs-gondilal", label: "Gondilal Saraf, case study", section: "Case Studies", icon: BookOpen, href: "/projects/gondilal-saraf", keywords: ["jewelry", "full-stack", "family business"] },
  { id: "cs-pcod", label: "Serenity, case study", section: "Case Studies", icon: BookOpen, href: "/projects/serenity", keywords: ["health", "claude", "ai"] },
  { id: "cs-redbull", label: "Red Bull YouTube Analytics, case study", section: "Case Studies", icon: BookOpen, href: "/projects/redbull-youtube-analytics", keywords: ["vader", "sentiment", "youtube"] },

  // External
  { id: "ext-github", label: "GitHub · ArnavGoel03", section: "External", icon: FaGithub, href: SOCIAL_LINKS.github, external: true },
  { id: "ext-linkedin", label: "LinkedIn", section: "External", icon: FaLinkedinIn, href: SOCIAL_LINKS.linkedin, external: true },
  { id: "ext-gondilal", label: "gondilalsaraf.com", section: "External", icon: ExternalLink, href: "https://gondilalsaraf.com", external: true, keywords: ["jewelry", "live site"] },
  { id: "ext-pcod", label: "serenity-pcos.vercel.app", section: "External", icon: ExternalLink, href: "https://serenity-pcos.vercel.app", external: true },
  { id: "ext-watch", label: "Watch Together · Chrome Web Store", section: "External", icon: ExternalLink, href: "https://chromewebstore.google.com/detail/kilmggcpfkcfpkaapillgloabbgmeeoa", external: true },
  { id: "ext-orcid", label: "ORCID", section: "External", icon: ExternalLink, href: SOCIAL_LINKS.orcid, external: true },

  // Actions
  { id: "act-email", label: "Send email", section: "Actions", icon: Mail, href: SOCIAL_LINKS.email, keywords: ["contact", "reach out"] },
  { id: "act-cal", label: "Book 15 minutes on Cal.com", section: "Actions", icon: Calendar, href: "https://cal.com/arnavgoel", external: true, keywords: ["meeting", "chat", "recruiter"] },
  { id: "act-resume-pdf", label: "Download resume PDF", section: "Actions", icon: FileText, href: "/resume.pdf", external: true, hint: "PDF" },
];

function fuzzyScore(query: string, item: CommandItem): number {
  if (!query) return 1;
  const q = query.toLowerCase();
  const haystack = [
    item.label,
    item.section,
    ...(item.keywords ?? []),
  ]
    .join(" ")
    .toLowerCase();

  if (haystack.includes(q)) {
    const labelHit = item.label.toLowerCase().indexOf(q);
    if (labelHit === 0) return 4;
    if (labelHit > 0) return 3;
    return 2;
  }

  // Light fuzzy, every query char must appear in order
  let qi = 0;
  for (let i = 0; i < haystack.length && qi < q.length; i++) {
    if (haystack[i] === q[qi]) qi++;
  }
  return qi === q.length ? 1 : 0;
}

export default function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActive(0);
  }, []);

  const filtered = useMemo(() => {
    return ITEMS.map((item) => ({ item, score: fuzzyScore(query, item) }))
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .map(({ item }) => item);
  }, [query]);

  const grouped = useMemo(() => {
    const g: Record<string, CommandItem[]> = {};
    for (const item of filtered) {
      if (!g[item.section]) g[item.section] = [];
      g[item.section].push(item);
    }
    return g;
  }, [filtered]);

  const flatList = useMemo(() => {
    const order: CommandItem["section"][] = [
      "Navigation",
      "Case Studies",
      "External",
      "Actions",
    ];
    const flat: CommandItem[] = [];
    for (const s of order) {
      if (grouped[s]) flat.push(...grouped[s]);
    }
    return flat;
  }, [grouped]);

  const select = useCallback(
    (item: CommandItem) => {
      close();
      if (item.external) {
        window.open(item.href, "_blank", "noopener,noreferrer");
      } else {
        router.push(item.href);
      }
    },
    [close, router]
  );

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const mod = e.metaKey || e.ctrlKey;
      if (mod && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
        return;
      }
      if (!open) return;
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((a) => Math.min(flatList.length - 1, a + 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((a) => Math.max(0, a - 1));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (flatList[active]) select(flatList[active]);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, flatList, active, close, select]);

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  useEffect(() => {
    if (!listRef.current) return;
    const el = listRef.current.querySelector<HTMLElement>(
      `[data-index="${active}"]`
    );
    el?.scrollIntoView({ block: "nearest" });
  }, [active]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[200] flex items-start justify-center px-4 pt-[12vh]"
          onClick={close}
        >
          <div className="absolute inset-0 bg-background/80 backdrop-blur-md" />

          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -10 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-foreground/12 bg-card shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-foreground/10 px-5 py-4">
              <Search size={18} className="text-muted-foreground" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Jump to page, project, or action…"
                className="flex-1 bg-transparent text-[15px] text-foreground outline-none placeholder:text-muted-foreground/60"
              />
              <kbd className="hidden rounded-md border border-foreground/15 bg-foreground/5 px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground sm:inline">
                esc
              </kbd>
            </div>

            <div
              ref={listRef}
              className="max-h-[60vh] overflow-y-auto overscroll-contain py-2"
            >
              {flatList.length === 0 ? (
                <p className="px-5 py-8 text-center text-sm text-muted-foreground">
                  No matches for{" "}
                  <span className="text-foreground">{query}</span>.
                </p>
              ) : (
                (["Navigation", "Case Studies", "External", "Actions"] as const).map(
                  (section) => {
                    const items = grouped[section];
                    if (!items || items.length === 0) return null;
                    return (
                      <div key={section} className="px-2 py-1">
                        <p className="px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                          {section}
                        </p>
                        {items.map((item) => {
                          const flatIdx = flatList.indexOf(item);
                          const isActive = flatIdx === active;
                          const Icon = item.icon;
                          return (
                            <button
                              key={item.id}
                              type="button"
                              data-index={flatIdx}
                              onMouseEnter={() => setActive(flatIdx)}
                              onClick={() => select(item)}
                              className={
                                isActive
                                  ? "flex w-full items-center gap-3 rounded-lg bg-foreground/8 px-3 py-2.5 text-left transition-colors"
                                  : "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors"
                              }
                            >
                              <Icon size={15} className="flex-shrink-0 text-muted-foreground" />
                              <span className="flex-1 truncate text-sm text-foreground/90">
                                {item.label}
                              </span>
                              {item.external && (
                                <ExternalLink
                                  size={12}
                                  className="flex-shrink-0 text-muted-foreground/60"
                                />
                              )}
                              {isActive && (
                                <CornerDownLeft
                                  size={12}
                                  className="flex-shrink-0 text-muted-foreground/80"
                                />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    );
                  }
                )
              )}
            </div>

            <div className="flex items-center justify-between border-t border-foreground/10 px-5 py-3 text-[11px] text-muted-foreground">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <kbd className="rounded border border-foreground/15 bg-foreground/5 px-1.5 py-0.5 font-mono">
                    ↑↓
                  </kbd>
                  navigate
                </span>
                <span className="flex items-center gap-1.5">
                  <kbd className="rounded border border-foreground/15 bg-foreground/5 px-1.5 py-0.5 font-mono">
                    ↵
                  </kbd>
                  select
                </span>
              </div>
              <span className="flex items-center gap-1.5">
                <CommandIcon size={11} />
                <span className="font-mono">K</span>
                <span className="ml-1">to toggle</span>
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
