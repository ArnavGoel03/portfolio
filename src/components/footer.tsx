import Link from "next/link";
import { Mail, ArrowUpRight } from "lucide-react";
import { FaGithub, FaLinkedinIn, FaOrcid } from "react-icons/fa";
import GemIcon from "@/components/gem-icon";
import { SOCIAL_LINKS, NAV_LINKS } from "@/lib/constants";

const socials = [
  { icon: FaGithub, href: SOCIAL_LINKS.github, label: "GitHub" },
  { icon: FaLinkedinIn, href: SOCIAL_LINKS.linkedin, label: "LinkedIn" },
  { icon: FaOrcid, href: SOCIAL_LINKS.orcid, label: "ORCID" },
  { icon: Mail, href: SOCIAL_LINKS.email, label: "Email" },
];

const navLinks = NAV_LINKS;

export default function Footer() {
  return (
    <footer className="relative border-t border-border/30">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <GemIcon size={18} />
              <span className="font-serif text-xl font-bold heading-gradient">
                Arnav
              </span>
            </div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
              UCSD Data Science student building at the intersection of Machine
              Learning, Graph Theory, and Entrepreneurship.
            </p>
            <div className="mt-5 flex items-center gap-2.5">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="group flex h-9 w-9 items-center justify-center rounded-lg border border-primary/10 bg-primary/5 transition-all duration-300 hover:border-primary/30 hover:bg-primary/10 hover:shadow-[0_0_15px_rgba(167,139,250,0.2)]"
                >
                  <social.icon
                    size={14}
                    className="text-muted-foreground transition-colors group-hover:text-primary"
                  />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-primary/70">
              Navigation
            </p>
            <nav className="mt-4 flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                  <ArrowUpRight
                    size={12}
                    className="opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-primary/70">
              Get in Touch
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Have a project idea or just want to connect? I&apos;d love to hear
              from you.
            </p>
            <Link
              href="/contact"
              className="btn-border-flow mt-5 inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-all"
            >
              Send a Message
              <ArrowUpRight size={14} className="text-primary/70" />
            </Link>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center gap-4 border-t border-border/20 pt-8 sm:flex-row sm:justify-between">
          <p className="text-xs text-muted-foreground/50">
            &copy; {new Date().getFullYear()} Arnav Goel. Built with Next.js &
            Notion.
          </p>
          <p className="font-mono text-[10px] tracking-wider text-muted-foreground/30">
            SAN DIEGO, CA
          </p>
        </div>
      </div>
    </footer>
  );
}
