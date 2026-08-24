import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Mail } from "lucide-react";
import Section from "@/components/section";
import { Badge } from "@/components/ui/badge";
import { ArticleJsonLd } from "@/components/json-ld";
import ReadingProgress from "@/components/reading-progress";
import { getPost, getAllPosts, getAdjacentPosts } from "@/lib/blog";
import { EMAIL } from "@/lib/constants";

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const { previous, next } = getAdjacentPosts(slug);

  const firstParagraphIndex = post.content.findIndex(
    (b) => !b.startsWith("## ")
  );

  return (
    <>
      <ReadingProgress />
      <ArticleJsonLd
        title={post.title}
        description={post.excerpt}
        date={post.date}
        slug={post.slug}
        tags={post.tags}
      />
      <Section className="pt-36 pb-4">
        <Link
          href="/blog"
          className="group mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft
            size={14}
            className="transition-transform group-hover:-translate-x-0.5"
          />
          Back to Blog
        </Link>

        <div className="mx-auto max-w-3xl">
          <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            <time>
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </time>
            <span className="h-1 w-1 rounded-full bg-foreground/30" />
            <span>{post.readTime}</span>
          </div>

          <h1 className="mt-5 font-serif text-4xl font-bold leading-[1.1] tracking-tight md:text-5xl">
            {post.title}
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            {post.excerpt}
          </p>

          <div className="mt-6 flex flex-wrap gap-1.5">
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
        </div>
      </Section>

      <Section className="pt-8 pb-16">
        <article className="mx-auto max-w-3xl">
          <div className="prose-custom space-y-5">
            {post.content.map((block, i) => {
              if (block.startsWith("## ")) {
                return (
                  <h2
                    key={i}
                    className="mt-12 mb-3 font-serif text-2xl font-bold tracking-tight text-foreground md:text-[1.625rem]"
                  >
                    {block.slice(3)}
                  </h2>
                );
              }
              const isLead = i === firstParagraphIndex;
              return (
                <p
                  key={i}
                  className={
                    isLead
                      ? "text-[15px] leading-[1.8] text-muted-foreground first-letter:mr-2 first-letter:float-left first-letter:pt-1 first-letter:font-serif first-letter:text-[3.25rem] first-letter:font-bold first-letter:leading-[0.85] first-letter:text-foreground"
                      : "text-[15px] leading-[1.8] text-muted-foreground"
                  }
                >
                  {block}
                </p>
              );
            })}
          </div>

          <div className="mt-16 gradient-border rounded-2xl bg-card p-7">
            <p className="font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
              Written by
            </p>
            <p className="mt-2 font-serif text-lg font-semibold tracking-tight">
              Arnav Goel
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Data Science senior at UC San Diego, shipping ML systems and a
              150-year-old family jewelry business.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Link
                href="/about"
                className="inline-flex items-center gap-1.5 rounded-full border border-foreground/15 bg-foreground/5 px-3.5 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-foreground/30 hover:bg-foreground/10"
              >
                About
              </Link>
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-foreground/15 bg-foreground/5 px-3.5 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-foreground/30 hover:bg-foreground/10"
              >
                <Mail size={11} />
                {EMAIL}
              </a>
            </div>
          </div>

          {(previous || next) && (
            <nav
              aria-label="Other posts"
              className="mt-10 grid gap-4 md:grid-cols-2"
            >
              {previous ? (
                <Link
                  href={`/blog/${previous.slug}`}
                  className="group flex flex-col justify-between rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-6 transition-colors hover:border-foreground/20 hover:bg-foreground/5"
                >
                  <p className="flex items-center gap-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                    <ArrowLeft size={11} /> Older
                  </p>
                  <p className="mt-3 font-serif text-base font-semibold leading-snug tracking-tight group-hover:text-foreground/85">
                    {previous.title}
                  </p>
                </Link>
              ) : (
                <span aria-hidden="true" />
              )}
              {next ? (
                <Link
                  href={`/blog/${next.slug}`}
                  className="group flex flex-col justify-between rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-6 text-right transition-colors hover:border-foreground/20 hover:bg-foreground/5"
                >
                  <p className="flex items-center justify-end gap-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                    Newer <ArrowRight size={11} />
                  </p>
                  <p className="mt-3 font-serif text-base font-semibold leading-snug tracking-tight group-hover:text-foreground/85">
                    {next.title}
                  </p>
                </Link>
              ) : (
                <span aria-hidden="true" />
              )}
            </nav>
          )}
        </article>
      </Section>
    </>
  );
}
