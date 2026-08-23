"use client";

import { MotionConfig } from "framer-motion";

/**
 * Makes framer-motion honour a visitor's reduced-motion setting.
 *
 * globals.css already zeroes CSS animations and transitions under
 * `prefers-reduced-motion: reduce`, but that rule cannot reach framer-motion:
 * it animates by writing inline transform and opacity values from JavaScript,
 * so there is no CSS animation or transition for the media query to shorten.
 * Only `reducedMotion="user"` makes the library read the preference itself,
 * and it does it once for every motion component under this provider rather
 * than each one remembering to call `useReducedMotion`.
 *
 * Mounted at the root so it covers the chrome as well as the page, since the
 * navbar, the footer and the scroll affordances animate too.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
