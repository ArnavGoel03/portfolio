import type { PostHog } from "posthog-js";

const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
const isLocalhost =
  typeof window !== "undefined" && window.location.hostname === "localhost";
const enabled = Boolean(token) && !isLocalhost;

// One loader owns initialization for both route and interaction events.
let client: PostHog | null = null;
let loading: Promise<PostHog | null> | null = null;
const queued: { event: string; properties?: Record<string, unknown> }[] = [];
const MAX_QUEUED_EVENTS = 100;

export function loadAnalytics(): Promise<PostHog | null> {
  if (!enabled || typeof window === "undefined") return Promise.resolve(null);
  if (loading) return loading;

  loading = import("posthog-js")
    .then(({ default: posthog }) => {
      posthog.init(token as string, {
        api_host:
          process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.posthog.com",
        person_profiles: "identified_only",
        capture_pageview: false,
        session_recording: { maskAllInputs: true },
      });
      client = posthog;
      for (const { event, properties } of queued.splice(0)) {
        posthog.capture(event, properties);
      }
      return posthog;
    })
    .catch(() => {
      loading = null;
      queued.length = 0;
      return null;
    });

  return loading;
}

export function track(event: string, properties?: Record<string, unknown>) {
  if (!enabled || typeof window === "undefined") return;
  if (client) {
    client.capture(event, properties);
    return;
  }
  if (queued.length === MAX_QUEUED_EVENTS) queued.shift();
  queued.push({ event, properties });
  void loadAnalytics();
}
