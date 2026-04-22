import { BlogPost } from "./types";

export const posts: BlogPost[] = [
  {
    slug: "watch-together-cross-site-sync",
    title: "Engineering Watch Together: Sub-Second Video Sync Across Any Streaming Site",
    excerpt:
      "How I built a Chrome/Firefox/Safari extension that keeps Netflix, YouTube, Disney+, and JioHotstar in lockstep across the globe — and the surprisingly tricky problems hiding behind a 'just sync the videos' brief.",
    date: "2026-04-15",
    readTime: "9 min read",
    tags: ["Chrome Extension", "WebSocket", "Manifest V3", "Real-Time Systems"],
    content: [
      "Watching a movie 'together' over a call has always been broken. Someone says 'play in 3, 2, 1' and within 30 seconds you're 4 seconds out of sync arguing about whether the next line was 'I am your father' or 'no, I am'. I built Watch Together to make that experience disappear — one extension, any streaming site, any number of devices, anywhere on Earth.",
      "## The Brief vs. The Reality",
      "On paper, the spec is one sentence: when one person plays, pauses, or seeks, do the same on every other browser. In practice, every word in that sentence is a trap. 'Plays' depends on which streaming site (Netflix's player exposes nothing useful, YouTube has ads, JioHotstar reloads its video element on quality changes). 'Seeks' fights with browser autoplay policies. 'Every other browser' has to survive Chrome killing your service worker every 30 seconds.",
      "The system is three pieces: a WebSocket relay server on Render, a Manifest V3 extension with site-specific player adapters, and an injected in-player overlay that lives inside YouTube/Netflix/Disney+ controls so users never have to leave the video.",
      "## Why WebSockets, Not WebRTC",
      "The obvious choice for real-time sync is WebRTC — peer-to-peer, no server hop, low latency. I built the first prototype that way and immediately killed it. WebRTC requires NAT traversal, STUN/TURN servers, and falls apart behind corporate firewalls and certain mobile carriers. For our payload — a few bytes per sync event — peer-to-peer's latency advantage is meaningless. WebSocket relay through Render gives me a single TCP connection per client, works behind every firewall, and lets me enforce server-side rules (host mode, rate limits, room TTL) that you can't enforce in a P2P mesh.",
      "## The Heartbeat Drift Problem",
      "Sync events handle play/pause/seek, but they don't catch drift. Two browsers playing the 'same' frame will diverge — different decoder pipelines, different buffer pressure, occasional dropped frames. Without correction, you end up 2-3 seconds apart by the end of a 90-minute movie.",
      "Solution: a 5-second heartbeat carrying the current playback position. Every client compares the heartbeat to its own clock and nudges if it's more than 0.5 seconds off. The naive implementation has a fatal flaw — if every member broadcasts heartbeats, you get N² messages and the room melts at scale. So the server elects a single heartbeat leader per room. When the leader leaves, leadership transfers to the next member.",
      "The other gotcha: heartbeats fight with sync events. If Alice seeks to 0:30 and Bob's heartbeat from 0:25 arrives 200ms later, Bob will yank everyone back to 0:25. Fix: a 2-second cooldown on heartbeats after every sync event. Simple rule, eliminated an entire class of 'sync ping-pong' bugs.",
      "## Site-Specific Player Adapters",
      "Every streaming site lies to you in a different way. The codebase has an `adapters/` folder where each site gets its own module. The generic adapter just attaches to any `<video>` element. The YouTube adapter watches for the `.ad-showing` class and pauses sync during ads (otherwise everyone gets dragged through the same skippable ad five times). The JioHotstar adapter handles their habit of replacing the video element on quality changes — we have to re-attach listeners every time. Netflix needed custom play/pause buttons because their native player API isn't exposed to extensions.",
      "## Surviving Manifest V3",
      "MV3 service workers can be killed after 30 seconds of inactivity. Mid-movie, that's a disaster. The fix is paranoid state restoration: `currentRoom` and `userId` are mirrored to `chrome.storage.local` on every change. When the worker wakes back up, it reads storage, reconnects the WebSocket with exponential backoff, and rejoins the room. From the user's perspective, nothing happened. From the server's perspective, the same user disconnected and reconnected — which is why the server keeps room state for 12 hours instead of dropping it on disconnect.",
      "Port management was another MV3 pitfall. Each tab connects multiple ports to the worker (one for the content script, one for the overlay). Naive keying by port name causes collisions across tabs. The fix: key ports by `tabId:portName`, e.g. `123:content`, `123:overlay`.",
      "## Auto-Join Without Trust",
      "The killer UX feature is share links: `youtube.com/watch?v=xyz&wt_room=ABC123`. Click it and you're in the room with the video already loaded. The implementation is more delicate than it looks. YouTube strips unknown query params from the URL within milliseconds of page load. So `auto-join-extract.js` runs at `document_start` (before the page's JS executes), captures `wt_room`, writes it to `chrome.storage.local`, and cleans the URL. Then `content.js` at `document_idle` reads the pending join, connects to the server, and applies whatever playback state the room is in. The user just sees the video appear and start playing in sync.",
      "## Security as a Default",
      "Public WebSocket servers are a magnet for abuse. The server enforces: 10 connections per IP max, 20 messages per second per user, 50 members per room cap, 10,000 concurrent rooms cap, 12-hour room TTL with auto-cleanup. URLs are validated to allow only `http://` and `https://` (blocks `javascript:` injection through chat or video URLs). Room codes aren't enumerable — there's no `/stats` endpoint and `/room/{code}` doesn't leak member counts or video URLs to unauthorized requests. The join page sets `X-Frame-Options: DENY` and a strict CSP to block clickjacking.",
      "## Testing Real-Time Systems",
      "Unit tests for sync logic are easy. Tests for 'does Alice's pause actually reach Bob's browser within 200ms while Carol is mid-seek' are not. The test suite has 59 vitest tests for the server (rooms, sync, host mode, heartbeats, chat, security, end-to-end) and a Puppeteer suite that launches real Chrome with the extension loaded and verifies two-tab sync, overlay injection, and auto-join. The Puppeteer tests caught a class of race conditions the unit tests missed entirely — specifically, the order in which `document_start` and `document_idle` scripts initialize relative to the WebSocket handshake.",
      "## What's Next",
      "The extension is in Chrome Web Store review now. Next on the list: voice chat (WebRTC for the audio peer mesh, but WebSocket signaling), reaction emojis that float across everyone's screens in sync, and a 'watch party' scheduling feature with calendar invites. The server is sitting at <5% CPU even during stress tests, so scaling is a problem for future me.",
      "If you want to try it, the source is on GitHub. If you want to read the architecture deep-dive, the README has the full sync flow diagrams.",
    ],
  },
  {
    slug: "building-gondilal-saraf",
    title: "Building a Full-Stack Jewelry Platform for a Century-Old Family Business",
    excerpt:
      "How I designed and built gondilalsaraf.com — a bilingual e-commerce platform with AI-powered descriptions, AR try-on, and an admin ERP for my family's 150-year-old gold & silver business.",
    date: "2025-02-15",
    readTime: "8 min read",
    tags: ["Next.js", "Prisma", "Gemini AI", "Full-Stack"],
    content: [
      "My family has been in the gold and silver jewelry business since 1873 — that's over a century of trust, craftsmanship, and community in Banda, Uttar Pradesh. When I started studying Data Science at UCSD, I saw an opportunity to bridge that legacy with modern technology.",
      "The challenge was unique: build a platform that respects the heritage aesthetic (think antique gold accents, Cormorant Garamond typography, parchment textures) while packing serious technical firepower under the hood.",
      "## The Tech Stack",
      "I chose Next.js 15 with the App Router for its hybrid rendering — the public storefront is statically generated for speed, while the admin ERP uses server components for real-time data. PostgreSQL with Prisma ORM handles 15 data models covering everything from daily gold rates to customer encrypted PII.",
      "## AI-Powered Product Management",
      "The most interesting technical challenge was the image processing pipeline. When my uncle uploads a jewelry photo from the shop, it goes through: Photoroom API for background removal → Sharp for contrast and saturation adjustments → WebP conversion for performance. Then Gemini 2.0 Flash generates bilingual product names and descriptions from the processed image — no manual copywriting needed.",
      "For model images, I integrated Replicate's SDXL inpainting to composite jewelry onto body-part templates. Upload a necklace photo, and the AI generates a realistic 'worn' preview.",
      "## The Heritage Design System",
      "The visual identity was critical. I created a 'Modern Heritage' design system with three switchable themes (ivory-gold, dark-gold, marble-gold). The signature element is the Heritage Vault Gate — a cinematic 3-phase animation: logo fade-in → hold → rosewood doors open with a custom cubic-bezier easing. It only plays once per session.",
      "Every interaction is intentional: velvet hover effects (1.2s scale transitions), gold-tinted shadows instead of gray, wide Chanel-style letter spacing on labels, and a custom cursor with a gold dot + glow ring on desktop.",
      "## Bilingual Architecture",
      "All text lives in a single content.json file with Hindi and English keys. A React context provider handles language switching, and the entire UI updates instantly — no page reload. This was essential since most of our customers are more comfortable in Hindi.",
      "## What I Learned",
      "Building for a real business with real users (147+ reviews on JustDial) taught me things no classroom project could. Performance matters when your users are on 3G connections in rural UP. Trust indicators (BIS hallmark badges, transparent pricing breakdowns) matter more than flashy animations. And the best technology is invisible — my uncle doesn't need to know about Prisma or SDXL, he just needs to upload a photo and have it appear on the website looking great.",
      "The platform now handles daily rate updates, catalogue management, customer accounts with OTP auth via WhatsApp, and even barcode printing for inventory. It's the most complex project I've built, and it's live at gondilalsaraf.com.",
    ],
  },
  {
    slug: "pcod-tracker-ai-health",
    title: "Why I Built an AI Health Tracker for Women with PCOD",
    excerpt:
      "The story behind PCOD Tracker — how Claude AI turns free-form health rants into structured data, and why removing friction from health logging matters.",
    date: "2025-03-20",
    readTime: "6 min read",
    tags: ["Claude AI", "Healthcare", "Next.js", "PostgreSQL"],
    content: [
      "PCOD (Polycystic Ovarian Disease) affects roughly 1 in 10 women worldwide. Managing it requires tracking a complex web of symptoms, hormones, medications, diet, exercise, mood, and menstrual cycles. Most health apps make this a chore — endless forms, dropdowns, and manual data entry.",
      "I wanted to flip that. What if you could just talk about your day, and the app would figure out the rest?",
      "## The Core Idea: Rant-First Health Logging",
      "The central feature is the 'Rant & Vent' interface. It's a chat-like screen where you type freely — 'had terrible cramps today, skipped my metformin, ate pizza for lunch, couldn't sleep until 2am, feeling really anxious about everything.' No forms, no dropdowns, no severity sliders.",
      "Behind the scenes, Claude Sonnet 4 parses that text and extracts: symptoms (cramps, severity 4/5; insomnia, severity 3/5), medications (metformin — skipped), diet (pizza, lunch), mood (anxious), sleep (estimated 5 hours), energy (low). All of this gets automatically saved to the right database tables.",
      "The prompt engineering was the trickiest part. I needed Claude to return strict JSON without hallucinating symptoms that weren't mentioned, while still being smart enough to infer things like sleep duration from 'couldn't sleep until 2am.'",
      "## Medical Report Parsing",
      "The second AI feature handles lab reports. Women with PCOD get blood work done regularly — LH, FSH, testosterone, insulin, thyroid panels. These PDFs are dense and hard to interpret. Upload one to PCOD Tracker, and Claude extracts every lab value, identifies the normal ranges, flags abnormals, and detects any medications mentioned in the report.",
      "The extracted medications automatically merge into your medication list (with case-insensitive deduplication), so you don't need to manually add them.",
      "## Visualizing Patterns",
      "Raw data is useless without patterns. The app includes: a calendar heatmap showing symptom frequency and intensity by day, Recharts line graphs for tracking hormone levels over time (with normal ranges as reference lines), medication streak tracking showing the last 7 days of adherence, and cycle history with gap analysis.",
      "## Privacy-First Design",
      "Health data is sensitive. The app uses JWT sessions, bcryptjs password hashing, and cascade deletes (deleting your account removes everything). PDF text is extracted locally and never stored externally — only the structured lab values go to the database. The AI processing happens via API call, but no conversation history is retained.",
      "## The Stack",
      "Next.js 16 + React 19, PostgreSQL with 15 Prisma models, NextAuth.js for Google OAuth + email/password, Anthropic Claude API, pdf-parse for PDF text extraction, and Recharts for data visualization. 14 API routes handle everything from rant submission to medication logging.",
      "The app is live at pcod-tracker.vercel.app and it's completely free. If it helps even one person manage their PCOD with less friction, it was worth building.",
    ],
  },
  {
    slug: "from-algorithms-to-jewelry",
    title: "From Algorithms to Jewelry: My Path Through Data Science & Entrepreneurship",
    excerpt:
      "Reflections on studying Data Science at UCSD while running a family jewelry business — and why the combination is more powerful than either alone.",
    date: "2025-04-01",
    readTime: "5 min read",
    tags: ["Career", "UCSD", "Entrepreneurship", "Data Science"],
    content: [
      "When people hear I'm a Data Science student who also runs a jewelry business, the reaction is usually confusion. What does machine learning have to do with gold necklaces? More than you'd think.",
      "## The Pattern Recognition Connection",
      "Data Science is fundamentally about finding patterns in noise. So is running a century-old jewelry shop. My family has been making decisions about gold inventory, customer preferences, and seasonal demand for generations — all based on intuition built over decades. Data Science just gives us better tools for the same problem.",
      "At UCSD, CSE 258 (Recommender Systems) taught me how to model customer preferences mathematically. I immediately saw applications: which jewelry styles sell best during wedding season? Which customers are likely to come back for anniversary purchases? What's the optimal gold inventory level given price volatility?",
      "## Graph Theory Meets Jewelry Design",
      "My fascination with Graph Theory started in DSC 80 and deepened through independent study. Graphs model relationships — and jewelry design is all about relationships between elements. The vertices and edges of a necklace pattern, the symmetry groups of a pendant design, the network of suppliers and craftsmen. Even the 3D icosahedron visualization on my portfolio is a nod to this connection — a graph-theory structure that doubles as a geometric jewel.",
      "## What Entrepreneurship Teaches That Classes Don't",
      "Running Gondilal Saraf taught me that the best model is useless if you can't explain it to someone who doesn't know what a model is. My uncle doesn't care about Prisma migrations or SDXL inpainting — he cares that the website loads fast on his phone and that uploading a product photo takes less than 30 seconds.",
      "This constraint made me a better engineer. I obsess over performance (our customers are often on slow connections in rural UP), I write interfaces that are obvious (the admin dashboard uses Hindi labels), and I never add complexity that doesn't serve a real user need.",
      "## The Minor in Entrepreneurship",
      "UCSD's Entrepreneurship & Innovation minor gave me frameworks for the intuitions I was already developing. Lean startup methodology, customer discovery, financial modeling — these aren't abstract concepts when you have a real business to apply them to. Every assignment became a chance to improve Gondilal Saraf.",
      "## What's Next",
      "I graduate in June 2027 with a BS in Data Science and a minor in Entrepreneurship & Innovation. I'm looking for roles where I can combine technical depth with business impact — whether that's ML engineering, data science, or building products. If you're working on something interesting, I'd love to talk.",
      "The best part of my unusual path is that I never have to choose between the analytical and the creative, between the technical and the entrepreneurial. They're the same thing, viewed from different angles — just like a well-cut diamond.",
    ],
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getAllPosts(): BlogPost[] {
  return [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getAdjacentPosts(slug: string): {
  previous: BlogPost | null;
  next: BlogPost | null;
} {
  const ordered = getAllPosts();
  const idx = ordered.findIndex((p) => p.slug === slug);
  if (idx === -1) return { previous: null, next: null };
  return {
    previous: idx < ordered.length - 1 ? ordered[idx + 1] : null,
    next: idx > 0 ? ordered[idx - 1] : null,
  };
}
