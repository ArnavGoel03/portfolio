import { Resend } from "resend";
import { EMAIL } from "@/lib/constants";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const MAX_NAME_LENGTH = 200;
const MAX_EMAIL_LENGTH = 320;
const MAX_MESSAGE_LENGTH = 10000;
const MAX_CONTENT_LENGTH_BYTES = 100 * 1024;

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 5;

// In-process rate limit bucket, keyed by client IP. This Map lives in the memory of a
// single serverless function instance, so on Vercel it is per-instance rather than
// shared across instances, and it resets whenever a new instance is spun up. That makes
// it best-effort, not a hard guarantee, which is the accepted tradeoff for staying on
// the free tier instead of adding Redis, Upstash, or Vercel KV.
const rateLimitMap = new Map<string, number[]>();

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (rateLimitMap.get(key) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  recent.push(now);
  rateLimitMap.set(key, recent);
  return recent.length > RATE_LIMIT_MAX_REQUESTS;
}

export async function POST(request: Request) {
  const clientId = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(clientId)) {
    return new Response(null, { status: 429 });
  }

  const contentLength = request.headers.get("content-length");
  if (contentLength && Number(contentLength) > MAX_CONTENT_LENGTH_BYTES) {
    return new Response(null, { status: 413 });
  }

  let name, email, message;
  try {
    ({ name, email, message } = await request.json());
  } catch {
    return Response.json({ error: "All fields are required." }, { status: 400 });
  }

  if (
    !name ||
    !email ||
    !message ||
    !EMAIL_REGEX.test(email) ||
    name.length > MAX_NAME_LENGTH ||
    email.length > MAX_EMAIL_LENGTH ||
    message.length > MAX_MESSAGE_LENGTH
  ) {
    return Response.json({ error: "All fields are required." }, { status: 400 });
  }

  if (!process.env.RESEND_API_KEY) {
    return Response.json({ error: "Email service not configured." }, { status: 500 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const { error } = await resend.emails.send({
    from: "Portfolio Contact <onboarding@resend.dev>",
    to: EMAIL,
    replyTo: email,
    subject: `Portfolio message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
  });

  if (error) {
    return Response.json({ error: "Failed to send message." }, { status: 500 });
  }

  return Response.json({ success: true });
}
