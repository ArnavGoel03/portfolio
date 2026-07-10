import posthog from "posthog-js";

const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
const isLocalhost =
  typeof window !== "undefined" && window.location.hostname === "localhost";

if (token && !isLocalhost) {
  posthog.init(token, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.posthog.com",
    person_profiles: "identified_only",
    capture_pageview: false,
    session_recording: {
      maskAllInputs: true,
    },
  });
}

export function onRouterTransitionStart(url: string) {
  if (!token || isLocalhost) return;
  posthog.capture("$pageview", { $current_url: url });
}
