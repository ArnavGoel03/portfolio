import type { NextConfig } from "next";

// Every origin this site actually talks to, confirmed by watching the live
// page over CDP rather than by guessing: itself, and PostHog. Vercel's own
// analytics and speed-insights beacons go to /_vercel/* on this same origin,
// which is why no vercel.com origin appears here and why 'self' covers them.
//
// PostHog reaches four hostnames depending on what it is doing (assets,
// ingest, and two legacy app hosts), so it is allowed by suffix. Getting this
// wrong does not fail loudly: a blocked connect-src silently stops analytics
// and nothing on the page looks different, so widen this list rather than
// trimming it if PostHog ever goes quiet.
const POSTHOG = "https://*.posthog.com https://*.i.posthog.com";

// script-src carries 'unsafe-inline' deliberately. Next inlines its own
// bootstrap and this site inlines four JSON-LD blocks, so a strict policy
// needs per-request nonces, and a nonce has to come from middleware, which
// would make every page dynamic and give up the CDN cache that is the whole
// point of the rest of this pass. The XSS surface it would buy back is close
// to nil: nothing here renders user input, the one dangerouslySetInnerHTML is
// JSON-LD built from hardcoded objects, and there is no comment or search box
// to inject through. frame-ancestors, base-uri, form-action and object-src do
// the load-bearing work and none of them are weakened by inline scripts.
const CSP = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' ${POSTHOG}`,
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: blob: ${POSTHOG}`,
  "font-src 'self' data:",
  `connect-src 'self' ${POSTHOG}`,
  "media-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const SECURITY_HEADERS = [
  { key: "Content-Security-Policy", value: CSP },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      { source: "/:path*", headers: SECURITY_HEADERS },
      {
        // Everything under public/ was being served with
        // `max-age=0, must-revalidate`, which is the Next default and which
        // means a returning reader re-checks every screenshot on every visit.
        // On the projects page that is 924 KB of images revalidated to be
        // told nothing changed. These filenames are not content hashed, so
        // this is deliberately not `immutable`: a week fresh, a month of
        // stale-while-revalidate behind it, so replacing a shot in place
        // still reaches people inside a week without a rename.
        source: "/shots/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=604800, stale-while-revalidate=2592000",
          },
        ],
      },
      {
        source: "/artifacts/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=604800, stale-while-revalidate=2592000",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/projects/pcod-tracker",
        destination: "/projects/serenity",
        permanent: true,
      },
      // The studio was called Simple Games until 19 August 2026, when it took
      // a name whose .com was actually available. Anything already linking to
      // the old slug still lands.
      {
        source: "/projects/simple-games",
        destination: "/projects/glass-table-games",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
