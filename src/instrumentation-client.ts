import { loadAnalytics, track } from "@/lib/analytics";

if (typeof window !== "undefined") {
  const start = () => { void loadAnalytics(); };
  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(start, { timeout: 5000 });
  } else {
    setTimeout(start, 2000);
  }
}

export function onRouterTransitionStart(url: string) {
  track("$pageview", { $current_url: url });
}
