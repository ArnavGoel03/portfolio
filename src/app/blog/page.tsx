import Link from "next/link";
import { ArrowRight, Rss } from "lucide-react";
import Section from "@/components/section";
import { Badge } from "@/components/ui/badge";
import { getAllPosts } from "@/lib/blog";
import type { BlogPost } from "@/lib/types";

export const metadata = {
  title: "Blog",
  description:
    "Technical writing by Arnav Goel — building full-stack platforms, AI-powered health tools, and bridging Data Science with Entrepreneurship.",
  openGraph: {
    title: "Blog — Arnav Goel",
    description:
      "Technical writing on ML, full-stack development, and entrepreneurship.",
  },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function FeaturedCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block"
    >
      <article className="gradient-border glow-card relative overflow-hidden rounded-3xl bg-card p-10 backdrop-blur-sm transition-all duration-500 hover:shadow-[0_20px_60px_-20px_rgba(167,139,250,0.15)] md:p-12">
        <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
          <span className="rounded-full border border-foreground/15 bg-foreground/5 px-2.5 py-0.5 text-foreground/90">
            Latest
          </span>
          <time>{formatDate(post.date)}</time>
          <span className="h-1 w-1 rounded-full bg-foreground/30" />
          <span>{post.readTime}</span>
        </div>
        <h2 className="mt-6 font-serif text-3xl font-bold leading-[1.15] tracking-tight md:text-[2.5rem]">
          {post.title}
        </h2>
        <p className="mt-5 max-w-3xl text-[15px] leading-relaxed text-muted-foreground md:text-base">
          {post.excerpt}
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="border-foreground/10 bg-foreground/5 text-xs font-normal text-foreground/75"
              >
                {tag}
              </Badge>
            ))}
          </div>
          <span className="flex items-center gap-1.5 text-sm font-medium text-foreground/90 transition-transform group-hover:translate-x-0.5">
            Read
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </article>
    </Link>
  );
}

function PostRow({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="flex flex-col gap-3 border-b border-foreground/10 py-7 transition-colors hover:bg-foreground/[0.02] md:flex-row md:items-baseline md:justify-between md:gap-8">
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono uppercase tracking-[0.15em] text-muted-foreground">
            <time>{formatDate(post.date)}</time>
            <span className="h-1 w-1 rounded-full bg-foreground/30" />
            <span>{post.readTime}</span>
          </div>
          <h3 className="mt-2 font-serif text-xl font-semibold tracking-tight transition-colors group-hover:text-foreground/80 md:text-[1.375rem]">
            {post.title}
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground line-clamp-2">
            {post.excerpt}
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {post.tags.slice(0, 3).map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="border-foreground/10 bg-foreground/5 text-[10px] font-normal text-foreground/70"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        <ArrowRight
          size={16}
          className="flex-shrink-0 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-foreground/80"
        />
      </article>
    </Link>
  );
}

export default function Blog() {
  const posts = getAllPosts();
  const [featured, ...rest] = posts;

  return (
    <>
      <Section className="pt-36 pb-8">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-foreground/80">
          Blog
        </p>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-6">
          <h1 className="font-serif text-5xl font-bold tracking-tight md:text-6xl">
            Thoughts &{" "}
            <span className="heading-gradient text-glow">Builds</span>
          </h1>
          <a
            href="/feed.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-foreground/15 bg-foreground/5 px-4 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-foreground/30 hover:bg-foreground/10 hover:text-foreground"
          >
            <Rss size={12} />
            RSS
          </a>
        </div>
        <p className="mt-6 max-w-xl text-lg text-muted-foreground">
          Writing about what I build, how I build it, and why it matters. Long
          engineering walkthroughs, occasional notes on the family business, and
          the odd reflection from UCSD.
        </p>
      </Section>

      {featured && (
        <Section className="pt-2">
          <FeaturedCard post={featured} />
        </Section>
      )}

      {rest.length > 0 && (
        <Section className="pt-8 pb-20">
          <p className="mb-2 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Archive &middot; {rest.length} post{rest.length === 1 ? "" : "s"}
          </p>
          <div className="border-t border-foreground/10">
            {rest.map((post) => (
              <PostRow key={post.slug} post={post} />
            ))}
          </div>
        </Section>
      )}

      {posts.length === 0 && (
        <Section className="pt-8 pb-20">
          <div className="rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-10 text-center">
            <p className="text-sm text-muted-foreground">
              No posts yet. Subscribe to the{" "}
              <a
                href="/feed.xml"
                className="text-foreground underline decoration-foreground/30 underline-offset-4 hover:decoration-foreground"
              >
                RSS feed
              </a>{" "}
              and they&rsquo;ll arrive when they do.
            </p>
          </div>
        </Section>
      )}
    </>
  );
}
