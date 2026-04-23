import { getAllPosts } from "@/lib/blog";
import { SITE_URL, SITE_NAME, EMAIL, SITE_DESCRIPTION } from "@/lib/constants";

export const dynamic = "force-static";

function escape(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const posts = getAllPosts();
  const updated = posts[0]?.date
    ? new Date(posts[0].date).toUTCString()
    : new Date().toUTCString();

  const items = posts
    .map((post) => {
      const url = `${SITE_URL}/blog/${post.slug}`;
      const description = post.content
        .filter((b) => !b.startsWith("## "))
        .join("\n\n");
      return `    <item>
      <title>${escape(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description>${escape(post.excerpt)}</description>
      <content:encoded><![CDATA[${description
        .split("\n\n")
        .map((p) => `<p>${p}</p>`)
        .join("\n")}]]></content:encoded>
      ${post.tags.map((t) => `<category>${escape(t)}</category>`).join("\n      ")}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(SITE_NAME)}: Blog</title>
    <link>${SITE_URL}/blog</link>
    <description>${escape(SITE_DESCRIPTION)}</description>
    <language>en-us</language>
    <managingEditor>${EMAIL} (${escape(SITE_NAME)})</managingEditor>
    <webMaster>${EMAIL} (${escape(SITE_NAME)})</webMaster>
    <lastBuildDate>${updated}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
