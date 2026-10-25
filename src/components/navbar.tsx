"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useState } from "react";
import { NAV_LINKS, isCurrentHref, isExternalHref } from "@/lib/constants";
import { cn } from "@/lib/utils";
import ThemeSwitcher from "@/components/theme-switcher";

const links = NAV_LINKS;

/**
 * The attributes every nav link gets from its data: current-page marking for
 * internal links, a new tab for external ones. The desktop bar and the mobile
 * menu both spread this, so they cannot come to treat a link differently.
 */
function linkProps(href: string, pathname: string | null) {
  const external = isExternalHref(href);
  return {
    current: isCurrentHref(href, pathname),
    external,
    attrs: external
      ? { target: "_blank", rel: "noopener noreferrer" }
      : {},
  };
}

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      aria-label="Main"
      className="fixed top-4 left-1/2 z-50 w-[95%] max-w-5xl -translate-x-1/2"
    >
      <div className="glass-strong rounded-2xl px-6 py-3">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-base font-semibold tracking-tight text-foreground transition-opacity hover:opacity-70"
          >
            Arnav Goel
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {links.map((link) => {
              const { current, external, attrs } = linkProps(link.href, pathname);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  {...attrs}
                  aria-current={current ? "page" : undefined}
                  className={cn(
                    "relative rounded-xl px-3 py-2 text-sm font-medium transition-all duration-300",
                    current
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {current && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-xl bg-foreground/5 border border-foreground/10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10 inline-flex items-center gap-0.5">
                    {link.label}
                    {external && (
                      <ArrowUpRight size={12} aria-hidden="true" className="opacity-60" />
                    )}
                    {external && <span className="sr-only"> (opens in a new tab)</span>}
                  </span>
                </Link>
              );
            })}
            <span aria-hidden="true" className="mx-1 h-5 w-px bg-foreground/10" />
            <ThemeSwitcher />
          </div>

          <div className="flex items-center gap-1 md:hidden">
            <ThemeSwitcher />

          <button
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-nav-menu"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            /* 44x44, the size Apple documents as the smallest reliable touch
               target. Padding alone gave 36x36 around a 20px icon, which is a
               discrete primary control on a phone and the one worth raising.
               Inline text links stay as they are: WCAG 2.5.5 exempts them. */
            className="flex h-11 w-11 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:hidden"
          >
            {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
          </div>
        </div>

        {open && (
          <motion.div
            id="mobile-nav-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 border-t border-border/50 pt-3 md:hidden"
          >
            <div className="flex flex-col gap-1">
              {links.map((link) => {
                const { current, external, attrs } = linkProps(link.href, pathname);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    {...attrs}
                    onClick={() => setOpen(false)}
                    aria-current={current ? "page" : undefined}
                    className={cn(
                      "flex items-center gap-1 rounded-xl px-4 py-3 text-sm font-medium transition-all",
                      current
                        ? "bg-foreground/5 text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {link.label}
                    {external && (
                      <ArrowUpRight size={13} aria-hidden="true" className="opacity-60" />
                    )}
                    {external && <span className="sr-only"> (opens in a new tab)</span>}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
