"use client";

import { useState } from "react";
import { Send, Mail } from "lucide-react";
import { FaGithub, FaLinkedinIn, FaOrcid } from "react-icons/fa";
import { motion } from "framer-motion";
import Section from "@/components/section";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const socials = [
  {
    icon: FaGithub,
    label: "GitHub",
    href: "https://github.com/ArnavGoel03",
  },
  {
    icon: FaLinkedinIn,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/arnav-goel--/",
  },
  {
    icon: FaOrcid,
    label: "ORCID",
    href: "https://orcid.org/0009-0007-6477-6501",
  },
  {
    icon: Mail,
    label: "Email",
    href: "mailto:arnav@example.com",
  },
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      <Section className="pt-32 pb-8">
        <p className="text-sm font-medium uppercase tracking-widest text-primary">
          Contact
        </p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">
          Let&apos;s{" "}
          <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
            Connect
          </span>
        </h1>
        <p className="mt-4 max-w-xl text-muted-foreground">
          Have a project idea, question, or just want to say hi? Drop me a
          message.
        </p>
      </Section>

      <Section className="pt-4">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex h-full items-center justify-center rounded-xl border border-border/50 bg-card p-12"
              >
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Send size={20} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">Message Sent!</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Thanks for reaching out. I&apos;ll get back to you soon.
                  </p>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium"
                  >
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    required
                    placeholder="Your name"
                    className="bg-card"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium"
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="bg-card"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-medium"
                  >
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="What's on your mind?"
                    className="bg-card resize-none"
                  />
                </div>
                <Button type="submit" size="lg" className="w-full rounded-xl">
                  Send Message
                  <Send size={16} className="ml-2" />
                </Button>
              </form>
            )}
          </div>

          <div className="flex flex-col justify-center">
            <h2 className="text-xl font-semibold">Other ways to reach me</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Feel free to connect on any platform.
            </p>
            <div className="mt-6 space-y-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-border/50 bg-card p-4 transition-colors hover:bg-secondary glow-hover"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <social.icon size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{social.label}</p>
                    <p className="text-xs text-muted-foreground">
                      {social.href
                        .replace("https://", "")
                        .replace("www.", "")
                        .replace("mailto:", "")}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
