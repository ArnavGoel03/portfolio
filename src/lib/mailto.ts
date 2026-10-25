/**
 * Build a `mailto:` URL with every field percent-encoded.
 *
 * A plain GET form encodes spaces as `+`, which many mail clients show
 * literally ("Hello+there"). encodeURIComponent uses `%20`, the RFC 3986 form
 * every client decodes, and it also escapes `&`, `?`, `#` and newlines, so a
 * message containing them cannot break out of its own parameter.
 */
export function buildMailto(
  to: string,
  fields: Record<string, string | undefined>,
): string {
  const query = Object.entries(fields)
    .filter((entry): entry is [string, string] => Boolean(entry[1]))
    .map(([name, value]) => `${encodeURIComponent(name)}=${encodeURIComponent(value)}`)
    .join("&");
  return `mailto:${to}${query ? `?${query}` : ""}`;
}

/** The contact form's fields, as an email the visitor can send themselves. */
export function contactMailto(
  to: string,
  { name, email, message }: { name: string; email: string; message: string },
): string {
  const signature = [name, email].filter(Boolean).join(" · ");
  return buildMailto(to, {
    subject: `Portfolio message from ${name || "a visitor"}`,
    body: signature ? `${message}\n\n${signature}` : message,
  });
}
