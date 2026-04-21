import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Section from "@/components/section";
import { Badge } from "@/components/ui/badge";
import { ArticleJsonLd } from "@/components/json-ld";
import ReadingProgress from "@/components/reading-progress";
import { getPost, getAllPosts } from "@/lib/blog";

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
          className="group mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft
            size={14}
            className="transition-transform group-hover:-translate-x-0.5"
          />
          Back to Blog
        </Link>

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

        <h1 className="mt-4 font-serif text-4xl font-bold tracking-tight md:text-5xl">
          {post.title}
        </h1>

        <div className="mt-5 flex flex-wrap gap-1.5">
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
      </Section>

      <Section className="pt-4 pb-20">
        <article className="mx-auto max-w-3xl">
          <div className="prose-custom space-y-5">
            {post.content.map((block, i) => {
              if (block.startsWith("## ")) {
                return (
                  <h2
                    key={i}
                    className="mt-10 mb-4 font-serif text-2xl font-bold tracking-tight"
                  >
                    {block.slice(3)}
                  </h2>
                );
              }
              return (
                <p
                  key={i}
                  className="text-[15px] leading-[1.8] text-muted-foreground"
                >
                  {block}
                </p>
              );
            })}
          </div>
        </article>
      </Section>
    </>
  );
}
