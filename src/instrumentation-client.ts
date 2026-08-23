import type { PostHog } from "posthog-js";

const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
const isLocalhost =
  typeof window !== "undefined" && window.location.hostname === "localhost";
const enabled = Boolean(token) && !isLocalhost;

// posthog-js used to be a static import at the top of this file, which put
// roughly 250 KB of analytics into the first script the browser had to parse
// on every page, ahead of anything a reader came here to look at. It is the
// same library doing the same job, just fetched once the page has gone idle.
//
// The capture behaviour below is deliberately unchanged: `capture_pageview`
// stays false and the only event sent is the one this file already sent, from
// `onRouterTransitionStart`. A transition that happens before the library has
// finished loading is queued rather than dropped, which is the one thing
// deferring it could otherwise have cost.
let client: PostHog | null = null;
let loading: Promise<PostHog | null> | null = null;
const queued: string[] = [];

function load(): Promise<PostHog | null> {
  if (!enabled) return Promise.resolve(null);
  if (loading) return loading;

  loading = import("posthog-js")
    .then(({ default: posthog }) => {
      posthog.init(token as string, {
        api_host:
          process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.posthog.com",
        person_profiles: "identified_only",
        capture_pageview: false,
        session_recording: {
          maskAllInputs: true,
        },
      });
      client = posthog;
      for (const url of queued.splice(0)) {
        posthog.capture("$pageview", { $current_url: url });
      }
      return posthog;
    })
    .catch(() => null);

  return loading;
}

if (enabled && typeof window !== "undefined") {
  const start = () => {
    void load();
  };
  // requestIdleCallback is not in Safari before 26, so the timeout is the
  // floor rather than the exception.
  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(start, { timeout: 5000 });
  } else {
    setTimeout(start, 2000);
  }
}

export function onRouterTransitionStart(url: string) {
  if (!enabled) return;
  if (client) {
    client.capture("$pageview", { $current_url: url });
    return;
  }
  queued.push(url);
  void load();
}
