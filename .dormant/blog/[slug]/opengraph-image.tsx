import { ImageResponse } from "next/og";
import { getPost, getAllPosts } from "@/lib/blog";

export const alt = "Blog post by Arnav Goel";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  const title = post?.title ?? "Blog";
  const excerpt = post?.excerpt ?? "";
  const date = post
    ? new Date(post.date).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "";
  const tags = post?.tags ?? [];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "72px",
          background:
            "linear-gradient(135deg, #06050b 0%, #0e0b18 40%, #1a1030 100%)",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "radial-gradient(ellipse 70% 50% at 30% 20%, rgba(139,92,246,0.18), transparent), radial-gradient(ellipse 50% 40% at 80% 90%, rgba(99,102,241,0.12), transparent)",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            marginBottom: "40px",
          }}
        >
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
            <polygon
              points="12,2 4,9 8,22 16,22 20,9"
              stroke="#a78bfa"
              strokeWidth="1.5"
              fill="none"
              strokeLinejoin="round"
            />
            <line x1="4" y1="9" x2="20" y2="9" stroke="#a78bfa" strokeWidth="1" />
            <line x1="12" y1="2" x2="8" y2="9" stroke="#a78bfa" strokeWidth="1" />
            <line x1="12" y1="2" x2="16" y2="9" stroke="#a78bfa" strokeWidth="1" />
            <circle cx="12" cy="2" r="2" fill="#c4b5fd" />
            <circle cx="4" cy="9" r="1.5" fill="#a78bfa" />
            <circle cx="20" cy="9" r="1.5" fill="#a78bfa" />
          </svg>
          <span
            style={{
              fontSize: 22,
              color: "#8b7fb3",
              letterSpacing: "0.2em",
              textTransform: "uppercase" as const,
            }}
          >
            Arnav Goel · Blog
          </span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            justifyContent: "center",
          }}
        >
          <h1
            style={{
              fontSize: title.length > 60 ? 52 : 64,
              fontWeight: 700,
              background: "linear-gradient(135deg, #f5f3ff, #c4b5fd, #a78bfa)",
              backgroundClip: "text",
              color: "transparent",
              margin: 0,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            {title}
          </h1>

          {excerpt && (
            <p
              style={{
                fontSize: 24,
                color: "#a09cb8",
                marginTop: "28px",
                lineHeight: 1.4,
                maxWidth: "900px",
              }}
            >
              {excerpt.length > 140 ? excerpt.slice(0, 140) + "…" : excerpt}
            </p>
          )}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
          }}
        >
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: 16,
                  color: "#a78bfa",
                  border: "1px solid rgba(167,139,250,0.3)",
                  borderRadius: "999px",
                  padding: "6px 16px",
                  background: "rgba(167,139,250,0.08)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
          {date && (
            <span style={{ fontSize: 18, color: "#8b7fb3" }}>{date}</span>
          )}
        </div>
      </div>
    ),
    { ...size }
  );
}
