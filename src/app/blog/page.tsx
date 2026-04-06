import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Section from "@/components/section";
import { Badge } from "@/components/ui/badge";
import { getAllPosts } from "@/lib/blog";

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

export default function Blog() {
  const posts = getAllPosts();

  return (
    <>
      <Section className="pt-36 pb-8">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
          Blog
        </p>
        <h1 className="mt-3 font-serif text-5xl font-bold tracking-tight md:text-6xl">
          Thoughts &{" "}
          <span className="heading-gradient text-glow">Builds</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted-foreground">
          Writing about what I build, how I build it, and why it matters.
        </p>
      </Section>

      <Section className="pt-4">
        <div className="space-y-6">
          {posts.map((post, i) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="block">
              <article className="group gradient-border glow-card rounded-2xl bg-card p-7 backdrop-blur-sm transition-all duration-300">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <time>
                        {new Date(post.date).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </time>
                      <span className="h-1 w-1 rounded-full bg-primary/40" />
                      <span>{post.readTime}</span>
                    </div>
                    <h2 className="mt-2 font-serif text-xl font-semibold tracking-tight transition-colors group-hover:text-primary">
                      {post.title}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {post.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="border-primary/10 bg-primary/5 text-xs font-normal text-primary/80"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <ArrowRight
                    size={18}
                    className="mt-2 flex-shrink-0 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-primary sm:mt-1"
                  />
                </div>
              </article>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
