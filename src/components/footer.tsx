import { Mail } from "lucide-react";
import { FaGithub, FaLinkedinIn, FaOrcid } from "react-icons/fa";

const socials = [
  { icon: FaGithub, href: "https://github.com/ArnavGoel03", label: "GitHub" },
  { icon: FaLinkedinIn, href: "https://www.linkedin.com/in/arnav-goel--/", label: "LinkedIn" },
  { icon: FaOrcid, href: "https://orcid.org/0009-0007-6477-6501", label: "ORCID" },
  { icon: Mail, href: "mailto:arnav@example.com", label: "Email" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border/30">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex flex-col items-center gap-8">
          <div className="text-center">
            <span className="font-serif text-2xl font-bold heading-gradient">
              Arnav
            </span>
            <p className="mt-2 text-sm text-muted-foreground">
              Data Science &middot; Machine Learning &middot; Entrepreneurship
            </p>
          </div>

          <div className="flex items-center gap-3">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="group relative flex h-11 w-11 items-center justify-center rounded-xl border border-primary/10 bg-primary/5 transition-all duration-300 hover:border-primary/30 hover:bg-primary/10 hover:shadow-[0_0_20px_rgba(167,139,250,0.2)]"
              >
                <social.icon
                  size={17}
                  className="text-muted-foreground transition-colors group-hover:text-primary"
                />
              </a>
            ))}
          </div>

          <div className="h-px w-32 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

          <p className="text-xs text-muted-foreground/60">
            &copy; {new Date().getFullYear()} Arnav. Crafted with Next.js & Notion.
          </p>
        </div>
      </div>
    </footer>
  );
}
