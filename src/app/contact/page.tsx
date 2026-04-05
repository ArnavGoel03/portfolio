"use client";

import { useState } from "react";
import { Send, Mail, MapPin, Loader2 } from "lucide-react";
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
    color: "group-hover:text-purple-400",
  },
  {
    icon: FaLinkedinIn,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/arnav-goel--/",
    color: "group-hover:text-indigo-400",
  },
  {
    icon: FaOrcid,
    label: "ORCID",
    href: "https://orcid.org/0009-0007-6477-6501",
    color: "group-hover:text-green-400",
  },
  {
    icon: Mail,
    label: "Email",
    href: "mailto:a2goel@ucsd.edu",
    color: "group-hover:text-violet-400",
  },
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    setError("");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    setSending(false);
    if (res.ok) {
      setSubmitted(true);
    } else {
      setError("Something went wrong. Please try again or email me directly.");
    }
  }

  return (
    <>
      <Section className="pt-36 pb-8">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
          Contact
        </p>
        <h1 className="mt-3 font-serif text-5xl font-bold tracking-tight md:text-6xl">
          Let&apos;s{" "}
          <span className="heading-gradient text-glow">Connect</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted-foreground">
          Have a project idea, question, or just want to say hi? Drop me a
          message.
        </p>
      </Section>

      <Section className="pt-4">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-3">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex h-full min-h-[400px] items-center justify-center gradient-border rounded-2xl bg-card backdrop-blur-sm"
              >
                <div className="text-center px-8">
                  <div className="relative mx-auto mb-6 h-16 w-16">
                    <div className="absolute inset-0 animate-pulse-glow rounded-full bg-primary/30 blur-xl" />
                    <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-primary/30 bg-primary/10">
                      <Send size={24} className="text-primary" />
                    </div>
                  </div>
                  <h3 className="font-serif text-2xl font-semibold">
                    Message Sent!
                  </h3>
                  <p className="mt-3 text-muted-foreground">
                    Thanks for reaching out. I&apos;ll get back to you soon.
                  </p>
                </div>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="gradient-border rounded-2xl bg-card p-8 backdrop-blur-sm space-y-6"
              >
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-medium text-foreground/80"
                    >
                      Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      required
                      placeholder="Your name"
                      className="border-primary/10 bg-primary/5 focus:border-primary/30 focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium text-foreground/80"
                    >
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@example.com"
                      className="border-primary/10 bg-primary/5 focus:border-primary/30 focus:ring-primary/20"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-medium text-foreground/80"
                  >
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    placeholder="What's on your mind?"
                    className="border-primary/10 bg-primary/5 resize-none focus:border-primary/30 focus:ring-primary/20"
                  />
                </div>
                {error && (
                  <p className="text-sm text-destructive">{error}</p>
                )}
                <Button
                  type="submit"
                  size="lg"
                  disabled={sending}
                  className="w-full rounded-xl bg-primary text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-[0_0_30px_rgba(167,139,250,0.3)] disabled:opacity-50"
                >
                  {sending ? (
                    <>
                      Sending
                      <Loader2 size={16} className="ml-2 animate-spin" />
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send size={16} className="ml-2" />
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>

          <div className="flex flex-col gap-6 lg:col-span-2">
            <div className="gradient-border rounded-2xl bg-card p-7 backdrop-blur-sm">
              <h3 className="font-serif text-lg font-semibold">Find Me</h3>
              <div className="mt-4 flex items-start gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
                  <MapPin size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">San Diego, California</p>
                  <p className="text-xs text-muted-foreground">
                    UC San Diego Campus
                  </p>
                </div>
              </div>
            </div>

            <div className="gradient-border rounded-2xl bg-card p-7 backdrop-blur-sm">
              <h3 className="font-serif text-lg font-semibold">Socials</h3>
              <div className="mt-5 grid grid-cols-2 gap-3">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col items-center gap-3 rounded-xl border border-primary/10 bg-primary/5 p-5 transition-all duration-300 hover:border-primary/30 hover:bg-primary/10 hover:shadow-[0_0_25px_rgba(167,139,250,0.15)]"
                  >
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full bg-primary/0 blur-lg transition-all duration-300 group-hover:bg-primary/20" />
                      <social.icon
                        size={22}
                        className={`relative text-muted-foreground transition-all duration-300 ${social.color}`}
                      />
                    </div>
                    <span className="text-xs font-medium text-muted-foreground transition-colors group-hover:text-foreground">
                      {social.label}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            <div className="relative overflow-hidden gradient-border rounded-2xl bg-card p-7 backdrop-blur-sm">
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/5 blur-2xl" />
              <div className="absolute -left-4 -bottom-4 h-24 w-24 rounded-full bg-indigo-500/5 blur-xl" />
              <div className="relative">
                <p className="text-sm leading-relaxed text-muted-foreground italic">
                  &ldquo;The best way to predict the future is to create
                  it.&rdquo;
                </p>
                <p className="mt-3 text-xs font-medium text-primary">
                  — Peter Drucker
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
