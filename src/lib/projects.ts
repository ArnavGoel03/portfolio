import { Project } from "@/lib/types";
import { WATCH_TOGETHER_INSTALLS } from "@/lib/constants";

// Canonical project list. Anything listed here gets a /projects/[slug] page.
// Flagship entries render the deep case study from lib/case-studies, everything
// else renders a lighter profile page from this metadata alone.
//
// featured:true is reserved for the four absolute flagship case studies. When
// everything is featured, nothing is, so this is intentionally narrow.
// The studio (folds Trove, Relay, and Tend into ONE entry, they are never
// listed separately). Single source of truth, referenced by the homepage too.
export const studioProject: Project = {
  id: "studio",
  title: "Quiver: A Studio of Private, Native Mac Apps",
  description:
    "A one-person studio building a suite of local-first macOS apps that never phone home: no accounts, no telemetry, nothing leaves your Mac, all unlocked by a single subscription key. Trove packs 40+ utilities (clipboard manager, window manager, system and GPU monitors, OCR, a full PDF kit, disk cleaner, and more) into one native app. Relay is a private, local API client (a Postman / Bruno alternative) with collections, environments, OAuth / AWS / digest auth, and JavaScript pre and post-request scripting, keys stored in the Keychain. Tend is a calm, local-first tasks and calendar app. Built in Swift 6 and SwiftUI with a shared code core and one licensing model across every app, direct-distributed and Developer-ID signed, with a marketing site and per-app SEO.",
  tags: ["Swift 6", "SwiftUI", "macOS", "Local-first", "Keychain", "SwiftPM"],
  image: "/shots/studio.webp",
  github: "",
  // The studio's own site. Not `gettrove.vercel.app`, which belongs to an
  // unrelated company and has never had anything to do with these apps.
  demo: "https://trove.arnavgoel.dev",
  // Every label, blurb and version below is copied verbatim from the suite own
  // source of truth, ~/dev/trove/macos/suite.config.json and the VERSION file
  // each app owns. Nothing here is written for the portfolio. When an app ships,
  // update it there first and mirror it here; the two repos cannot import each
  // other, so this is the one place a copy is allowed to exist.
  surfaces: [
    {
      label: "Quiver",
      href: "https://quiver.arnavgoel.dev",
      image: "/shots/studio.webp",
      holds: "The studio",
      blurb: "Private, native Mac apps. One subscription.",
    },
    {
      label: "Trove",
      href: "https://quiver.arnavgoel.dev/",
      image: "/shots/s-trove.webp",
      holds: "v1.12.8\u00A0\u00B7\u00A0macOS 13+",
      blurb: "One app instead of a dozen.",
    },
    {
      label: "Relay",
      href: "https://quiver.arnavgoel.dev/relay",
      image: "/shots/s-relay.webp",
      holds: "v0.1.0\u00A0\u00B7\u00A0macOS 13+",
      blurb: "A private, local API client.",
    },
    {
      label: "Tend",
      href: "https://quiver.arnavgoel.dev/tend",
      image: "/shots/s-tend.webp",
      holds: "v0.11.0\u00A0\u00B7\u00A0macOS 14+",
      blurb: "Tasks and calendar that never leave your Mac.",
    },
  ],
  featured: true,
  date: "2026-07",
  inProgress: true,
};

/** True for a standalone suite app (so it can be folded into `studioProject`). */
export function isSuiteApp(p: Project): boolean {
  if (p.id === "studio") return false;
  const t = p.title.trim().toLowerCase();
  return t.startsWith("trove") || t.startsWith("relay") || t.startsWith("tend");
}

export const staticProjects: Project[] = [
  studioProject,
  {
    id: "buzz",
    title: "Buzz: College Event Discovery",
    description:
      "Building a native event discovery app for US college students, launching first at UCSD. True multiplatform SwiftUI target compiling for iOS 17+ and macOS 14+ from a single codebase (no Catalyst), with an App Clip for instant check-in and an ARKit 'Look Around' mode that anchors events to real-world buildings. Supabase backend (Postgres + PostGIS + Row Level Security + Realtime), Stripe Connect for paid ticketing, and unified push fan-out across APNs / FCM / Web Push. Next.js 16 PWA mirror with JSON-LD structured data, per-campus landing pages, and llms.txt for AEO. Full club admin tools, Greek-life rush flows, textbook marketplace, and safety features baked in.",
    tags: ["SwiftUI", "Swift 6", "Supabase", "PostGIS", "Stripe Connect", "ARKit", "Next.js 16", "PWA"],
    image: "/shots/buzz.webp",
    github: "https://github.com/ArnavGoel03/buzz",
    // The project's own address. It answered on `web-eta-two-84.vercel.app`
    // for a while, which is Vercel's generated name and now a 308 to this one:
    // a redirect is a working link and a stale one at the same time, and the
    // generated name is the half that will disappear first.
    demo: "https://buzzcampus.vercel.app",
    featured: false,
    date: "2026-04",
    inProgress: true,
  },
  {
    id: "glass-table-games",
    title: "Glass Table Games: A Studio of Provably Fair Board and Card Games",
    description:
      "A four-game studio built around one claim: every roll and every shuffle is committed to before anyone knows who it helps, and a player can check it afterwards without trusting the operator. Glass Table Games is the developer of record for all four sites and owns the single legal surface they share, which is the reason the studio exists at all: writing terms four times is how four sets of terms drift apart. Circuit is the dice half, Ludo and Snakes and Ladders, where the server publishes a hash of its seed before the roll and reveals the seed after, so any player can replay the match and verify every die themselves, and a Luck Ledger at the end separates how much of the result was the dice from how much was the play. Deal is the card room, eight games from one table: Judgement (Kachuful), 29, Call Break, Pachisa and 3-2-5 for a group, and FreeCell, Klondike and Spider for one, every hand dealt from a frozen deck order under the same commitment. Charade is the drawing game, one person draws and everybody else races to name it, or the whole table draws the same word at once and then votes on whose is best. Lattice is the word board, words that cross for what the squares say they are worth, played with friends or alone against five strengths of opponent that keep working offline after the first visit. All four run off one pnpm monorepo of 18 shared packages: the fairness primitives, the board, card, drawing and word engines, a WebSocket realtime layer on a Cloudflare Worker where each room is a Durable Object, a multi-table room protocol in which players sit, stand and spectate across several sittings in one room, identity with Google and password sign-in linked to a single account, ratings, and bot opponents. Judgement seats up to 10 players with dynamic seat reassignment. 173 test files gate it, and the studio site carries byte-exact mirrors of the fairness and card code, pinned to recorded vectors, so the commit-reveal ceremony it runs in the browser cannot drift from what the games actually deal. Every site is a Cloudflare Worker built on a laptop and uploaded, so the whole studio spends no build minutes and costs nothing to keep up.",
    tags: [
      "Next.js 16",
      "TypeScript",
      "Cloudflare Workers",
      "Durable Objects",
      "WebSockets",
      "Commit-Reveal",
      "Game Design",
      "Monorepo",
    ],
    image: "/shots/glass-table-games.webp",
    github: "",
    privateRepo: true,
    demo: "https://glasstablegames.com",
    // One card per site, and every card names the games inside it. A studio
    // that lists four containers and expects a reader to guess what is in
    // "Deal" is asking to be clicked on trust, which is the opposite of the
    // thing these games are built to prove.
    //
    // The \u00A0 either side of the separator in `holds` is deliberate: the
    // card room names eight games, so that line wraps, and without the
    // non-breaking spaces the second line opens with an orphaned middot.
    surfaces: [
      {
        label: "Glass Table Games",
        href: "https://glasstablegames.com",
        image: "/shots/glass-table-games.webp",
        holds: "The studio",
        blurb: "The fairness argument in full, and the legal surface all four games share.",
      },
      {
        label: "Circuit",
        href: "https://circuit.glasstablegames.com",
        image: "/shots/s-circuit.webp",
        holds: "Ludo, Snakes and Ladders\u00A0·\u00A02 to 4 players",
        blurb:
          "The dice half. Every roll is sealed before it happens and published after, and a Luck Ledger at the end separates the dice from the play.",
      },
      {
        label: "Deal",
        href: "https://deal.glasstablegames.com",
        image: "/shots/s-deal.webp",
        holds:
          "Judgement, 29, Call Break, Pachisa, 3-2-5, FreeCell, Klondike, Spider\u00A0·\u00A01 to 10 players",
        blurb:
          "The card room: five games for a table and three games of patience for one, dealt from a shuffle nobody at the table chose.",
      },
      {
        label: "Charade",
        href: "https://charade.glasstablegames.com",
        image: "/shots/s-charade.webp",
        holds: "Charade, Everyone Draws\u00A0·\u00A02 to 12 players",
        blurb:
          "One person draws it and everybody else races to name it, or the whole table draws the same word at once and then votes.",
      },
      {
        label: "Lattice",
        href: "https://lattice.glasstablegames.com",
        image: "/shots/s-lattice.webp",
        holds: "Lattice, at a table or solo\u00A0·\u00A02 to 4 players",
        blurb:
          "Words that cross, on a board that says what counts. Solo play runs against five strengths of opponent and works offline after the first visit.",
      },
      {
        label: "Fair play, explained",
        href: "https://glasstablegames.com/fair-play",
        image: "/shots/s-fairplay.webp",
        holds: "The commit-reveal ceremony",
        blurb: "The whole proof, with a widget that runs the real thing in your browser.",
      },
    ],
    featured: true,
    date: "2026-08",
    inProgress: true,
  },
  {
    id: "claude-skills",
    title: "arnav-skills: Claude Code Skills Marketplace",
    description:
      "A published marketplace of Claude Code skills distilled from shipping real software with AI agents, each one a workflow paid for in real mistakes rather than a checklist written in the abstract. red-team-ledger closes the loop on automated code-review findings with a checked-in ledger of every finding ever reported, born from a nightly AI red-team that filed 20 reports and re-filed the same critical bug 7 times while nothing got fixed. game-smoke is a headless testing harness pattern for browser games and canvas/WebGL apps: a seedable debug hook, deterministic forced events, poll-not-sleep discipline, and screenshot verification, because a green test suite cannot see a black screen. server-verified-scores is an anti-cheat leaderboard pattern for deterministic games where the client submits a seed and input trace, and the server re-simulates with byte-exact shared physics and stores only the score it computed itself. Installable in any Claude Code session via /plugin marketplace add ArnavGoel03/claude-skills.",
    tags: ["Claude Code", "AI Agents", "Developer Tools", "Code Review", "Testing", "Anti-Cheat"],
    image: "/shots/claude-skills.webp",
    github: "https://github.com/ArnavGoel03/claude-skills",
    demo: "",
    featured: false,
    date: "2026-07",
  },
  // Copied verbatim out of ~/dev/soma's own README and its shipped eyebrow.
  // The disclaimer travels with the entry on purpose: the panels are synthetic
  // and the console says so on its own first screen, so a card that quoted the
  // rest of the page and dropped that line would be the one place the claim
  // goes unqualified.
  {
    id: "soma",
    title: "SOMA: An Anatomical Diagnostic Console",
    description:
      "A holographic human body rendered from real anatomical geometry: select an organ to read the panels that report on it, and scrub the timeline to watch every marker move. A lab report you can look at from the inside. The figure is not decoration for the data, it is the data: an organ's colour is the worst verdict among the markers that report on it, so a red liver means something specific and the number that proves it is one tap away. WebGL and Motion sit on different axes. WebGL is a renderer; Motion is a driver. This page has two renderers, the canvas and the DOM, and they must never disagree, so they get exactly one driver. A single MotionValue holds the current draw. The DOM readouts subscribe to it directly. The canvas subscribes to it inside useFrame and writes it into a shader uniform. The number on screen and the colour of the organ behind it are therefore incapable of desyncing, and dragging across five years of bloodwork animates 24 readouts and 10 organs at 60fps with zero React re-renders. Interpolate the value, never the verdict: between two draws the panel lerps the measured value and then resolves the verdict, so an organ can't flicker through a colour that no draw ever recorded. Heat is pathology: an organ shows the worst verdict among its markers, not an average, because averaging hides exactly the finding you opened the page for. Two figures, male and female. Layer switches (surface, skeleton, vessels, muscles), system filters, verdict heat, per-organ cutaway, ghost mode, labels on and off, every merged structure named. 112 authored markers across 14 clinical systems, 15 prose files, reference bands, print aliases and SI factors. The record is Postgres on Neon with six tables and Clerk accounts. Every document a person is carrying is accepted, not only a lab PDF: 19 extensions across PDF, photographs (JPEG, PNG, HEIC, WebP, TIFF), DOCX, plain text, CSV and DICOM, worked out from the file name when the browser will not say, then filed as lab, prescription, imaging, discharge, vaccination, insurance, dental, eye or document, correctable in one select and searchable afterwards. Every panel here is synthetic. Reference ranges are conventional clinical ranges, and nothing on the page is medical advice.",
    tags: [
      "Next.js 16",
      "React Three Fiber",
      "WebGL",
      "GLSL",
      "Motion",
      "Neon",
      "Clerk",
      "TypeScript",
    ],
    image: "/shots/soma.webp",
    github: "",
    privateRepo: true,
    demo: "https://soma.arnavgoel.dev",
    eyebrow: "Synthetic panels · no medical advice",
    featured: false,
    date: "2026-08",
  },
  // Every sentence below is copied verbatim out of ~/dev/meshport's own README
  // and src/lib/site.ts. The two repos cannot import each other, so this is the
  // one place a copy of that wording is allowed to exist; when the converter's
  // own words change, change them there first and mirror them here.
  {
    id: "meshport",
    title: "Meshport: Convert 3D files, right in your browser",
    description:
      "A 3D file converter that runs entirely in your browser. Drop a model, pick a format, download the result. Nothing is uploaded, there is no size limit, and it works offline. Typical online 3D converters upload your file to a server, make you wait in a queue behind ads, and cap the size unless you pay. Meshport does the conversion on your own machine using WebAssembly. Reads 13 formats, writes 5. Read: STL, OBJ, PLY, GLB, glTF, DAE (COLLADA), 3MF, FBX, 3DS, DirectX (X), Blender (.blend), OFF, DXF. Write: STL, OBJ, PLY, GLB, glTF. Any readable format can convert to any writable format (60 combinations). Conversion is two stages, both off the main thread: assimp compiled to WASM (assimpjs) reads the source format and normalizes it to GLB, and a three.js module worker parses that GLB and writes the final STL / OBJ / PLY. The 3D preview uses three.js with a consistent clay material so previews never depend on external textures. Vite + React, prerendered to static HTML. There is no server and no server runtime: the build produces a directory of finished pages. Each page ships its own head (title, description, canonical, Open Graph, JSON-LD) and its own Content-Security-Policy meta tag, whose script hashes are computed from the bytes that actually shipped.",
    tags: [
      "WebAssembly",
      "three.js",
      "React",
      "Vite",
      "TypeScript",
      "Web Workers",
      "PWA",
    ],
    image: "/shots/meshport.webp",
    github: "",
    privateRepo: true,
    demo: "https://meshport.vercel.app",
    eyebrow: "Reads 13 formats, writes 5",
    featured: false,
    date: "2026-07",
  },
  // The personal sites, listed once as the index that already binds them
  // rather than as five entries competing with the engineering work. Labels,
  // roles and ledes are copied verbatim from ~/dev/links/src/config.mjs, which
  // is the shelf's own source of truth; the count in the title is that file's
  // count and moves when SITES does.
  {
    id: "links",
    title: "Links: Five places I keep things",
    description:
      "The index of my five sites: an engineering portfolio, a review record of everything I own written after a month or more of use, a maintenance reference for Indian homes, a specification record for fitting one out, and a kitchen reference for Indian cooking. One static HTML file, no runtime JavaScript, no framework, no dependencies. The set is drawn spine-first: five matched volumes on a board, each in its own binding cloth. Clicking a spine takes that volume off the shelf. It hooks out by the headcap, draws forward, turns to face the reader, travels to the far end of the board and swings open on its hinge, with the two front leaves going over to leave a frontispiece facing a title page. The rest of the set stands down behind it and stays in view, which is the reason to draw a book off a shelf in front of somebody at all. Everything a reader or a crawler sees comes from one config file: add an entry to SITES and it appears on the shelf, in its record, in the JSON-LD and in the preconnect hints with no other edit. That single source is the only reason this page has a build step: without it the same URL and description would be typed twice and would drift.",
    tags: [
      "Static HTML",
      "CSS 3D",
      "JSON-LD",
      "Zero Dependencies",
      "Prerendering",
    ],
    image: "/shots/links.webp",
    github: "",
    privateRepo: true,
    demo: "https://goel-links.vercel.app",
    surfacesLabel: "Five places I keep things",
    surfaces: [
      {
        label: "Portfolio",
        href: "/",
        image: "/shots/s-portfolio.webp",
        holds: "The professional record",
        blurb:
          "What I have built, what I built it with, and the reasoning behind each one written out at length.",
      },
      {
        label: "The review record",
        href: "https://yashgoel.vercel.app",
        image: "/shots/s-reviews.webp",
        holds: "Everything I own, judged after living with it",
        blurb:
          "Nothing is reviewed here until I have used it daily for a month or more.",
      },
      {
        label: "Upkeep",
        href: "https://yashgoel-handyman.vercel.app",
        image: "/shots/s-upkeep.webp",
        holds: "What goes on what, and what quietly ruins it",
        blurb:
          "A maintenance reference for Indian homes, written so that the advice cannot be wrong in one place and right in another.",
      },
      {
        label: "Fitout",
        href: "https://yashgoel-interiors.vercel.app",
        image: "/shots/s-fitout.webp",
        holds: "What a room is made of, before it is built",
        blurb:
          "The other half of the same house: not what has gone wrong with a room, but what you are about to commit it to.",
      },
      {
        label: "Larder",
        href: "https://yashgoel-larder.vercel.app",
        image: "/shots/s-larder.webp",
        holds: "What keeps, what burns, and what the packet is not saying",
        blurb:
          "The same engine again, pointed at an Indian kitchen: the questions that get asked every day, answered as charts rather than as paragraphs.",
      },
    ],
    featured: false,
    date: "2026-08",
  },
  // The five below sit in the "Ideas I'm exploring" band on /projects, not
  // beside the shipped work: four of them are built and online, but they are
  // pieces being explored rather than products being run, and standing them in
  // the same grid would flatten the things that are. Every sentence is copied
  // verbatim from each project's own README or its own shipped page.
  {
    id: "pitcrew",
    title: "PITCREW: The Pit Lane for Robot Fleets",
    description:
      "A repair cell that lives inside your building. Downed robots drive in, get diagnosed, get a new module, and get proven before they rejoin the fleet. An investor-facing site whose centrepiece is one continuous WebGL scene, scroll-scrubbed through ten stages, where the 3D carries the argument rather than decorating it. Nothing on this site may fabricate traction. No invented metrics, no logos, no partners, no advisors, no customer counts. Every economic figure is a computed output of assumptions the visitor can see and edit in the calculator, never a statistic stated as fact. Three external anchors are cited and all three are verifiable: F1 pit stop timing, Northrop Grumman's MEV-1 docking with Intelsat-901 in 2020, and NIO automated battery swap.",
    tags: ["Next.js 16", "React Three Fiber", "WebGL", "Three.js", "Lenis"],
    image: "/shots/pitcrew.webp",
    github: "",
    privateRepo: true,
    demo: "https://pitcrew-five.vercel.app",
    eyebrow: "A robot that repairs robots",
    featured: false,
    date: "2026-08",
  },
  {
    id: "meridian",
    title: "Meridian: An Interactive 3D Earth",
    description:
      "Every country is drawn from real Natural Earth vector borders, every land dot is sampled from a real land mask, and the whole thing runs on WebGPU with a WebGL2 fallback and a still 2D poster below that. Turn the globe by dragging, zoom with the wheel or a pinch, reset with R or a double click. It drifts on its own after four seconds idle, and not at all under prefers-reduced-motion. Hover or click any country and the readout names it, gives its official long form, ISO codes, capital, region, area and land neighbours, and lights that country's dots and border on the sphere. Search any of 241 countries and territories by name, ISO alpha-2 or alpha-3, or official long form, and the camera slerps to it. Toggle borders, the 15 degree graticule, and a network overlay of 48 real cities with great-circle arcs between them. Arc labels quote the physical floor for light in fibre, which is a distance calculation and is labelled as such, not a measured latency. Drag the density slider to resample the dot field live, from about 14,000 to about 140,000 dots. There is no build step and no dependency at runtime.",
    tags: ["WebGPU", "WebGL2", "GLSL", "Natural Earth", "Zero Dependencies"],
    image: "/shots/meridian.webp",
    github: "https://github.com/ArnavGoel03/region-earth",
    demo: "https://region-earth.vercel.app",
    eyebrow: "Real borders, real coastlines, one dot per sampled square of land",
    featured: false,
    date: "2026-08",
  },
  {
    id: "qbranch",
    title: "Q Branch: Covert Instruments",
    description:
      "A cinematic, Bond-inspired concept armoury: classified gadget dossiers as photoreal SVG bench renders with lab annotations. Pure static HTML/CSS/JS, zero build step, zero dependencies, edge-cached. A boot and clearance sequence on first visit, session-scoped, skippable and reduced-motion aware. A HUD targeting reticle in the hero that locks onto targets under the cursor. Five gadget dossiers, spectacles, blast ring, laser watch, class-four pen and vehicle fob, each a hand-authored photoreal-style SVG render with metallic gradients, glass, spotlight, contact shadow and glowing LEDs, with gold callouts that draw in on scroll. Hover-to-declassify redaction bars in the dossier copy, a division manifest table, a standing directive and a live UTC clock. Each dossier defaults to a real-time 3D model, drag to rotate, tap empty space to expand into a fullscreen inspect mode, built procedurally from the same tokens as the SVG plates; a per-gadget view toggle switches back to the annotated plate, which also remains the no-JS and no-WebGL fallback. A service worker precaches the shell, so repeat visits paint from cache.",
    tags: ["Static HTML", "SVG", "WebGL", "Service Worker", "Zero Dependencies"],
    image: "/shots/qbranch.webp",
    github: "",
    privateRepo: true,
    demo: "https://q-armoury.vercel.app",
    eyebrow: "5 instruments · 3 field-ready · 1 armed",
    featured: false,
    date: "2026-07",
  },
  {
    id: "cutroom",
    title: "CUTROOM: A Cinematic Editing-Studio Showcase",
    description:
      "The site itself is the reel: a scroll-driven color grade, an NLE-style sequence timeline, hover-scrub work tiles, a custom cursor, and a running timecode. Built to look like the room where footage gets cut. It ships with a curated demo reel and a passcode-gated /studio admin so the editor can add projects and upload video without touching code. Next.js 16 on the App Router with React 19 and TypeScript, Tailwind v4 and bleeding-edge CSS (animation-timeline, scroll(), view(), @property, color-mix), so the animation is mostly zero-JS. Neon Postgres holds project metadata and Cloudflare R2 holds video and poster files, both optional: everything degrades gracefully, and with no database or storage configured the public site still runs and serves the demo reel while the admin reports exactly what is missing.",
    tags: ["Next.js 16", "React 19", "Tailwind 4", "Neon", "Cloudflare R2"],
    image: "/shots/cutroom.webp",
    github: "",
    privateRepo: true,
    demo: "https://cutroom-one.vercel.app",
    eyebrow: "The site itself is the reel",
    featured: false,
    date: "2026-06",
  },
  {
    id: "stature",
    title: "STATURE: Clothing for Men Built Tall",
    description:
      "Premium clothing engineered exclusively for tall people in India. STATURE sits in the premium-quality category, not loud luxury. The promise is narrow and real: every garment is drafted from a tall block first, so length and proportion are right before anything is sewn. Sleeves that end at the wrist, bodies that stay tucked, trousers that break at the shoe. Quiet, editorial, and built around the one thing the high street keeps getting wrong for tall frames. The v0.1 brand and lookbook site is a single-page editorial experience with an interactive Fit Engine and a pre-launch waitlist: enter your height, see your STATURE size, the engineered sleeve, body and inseam, and exactly how much wrist a standard shirt leaves bare. Your size is remembered on-device for return visits. The Collection is a six-piece first-drop lookbook, composed placeholders until final photography lands.",
    tags: ["Next.js 16", "Tailwind 4", "Brand System", "Pre-launch Waitlist"],
    image: "/shots/stature.webp",
    github: "",
    privateRepo: true,
    // No link on purpose. `statureindia.vercel.app` answers 404 today and the
    // Vercel project reports no production deployment, so the only reachable
    // address is a per-deployment URL that disappears on the next push. A card
    // with no link is better than a card with a dead one; put the alias back
    // and the address goes here.
    demo: "",
    eyebrow: "Cut for six foot and over",
    featured: false,
    date: "2026-06",
    inProgress: true,
  },
  {
    id: "library-walk",
    title: "Library Walk: A Playable Micromobility Thesis",
    description:
      "A campus micromobility runner that makes the argument instead of illustrating it, built solo for Group 3 in SYN 100 (Seventh College, UC San Diego). You ride a scooter to class down the real route: the Blue Line drops you at Central Campus station, you take the protected green lane down Gilman Drive past live traffic, and the lane ends exactly where Library Walk and the weekday dismount ban begin, so from there the crowd is the infrastructure. Every ending cites its receipt, a crash logs why it happened (speeding through a crowd, rushing the clock, boxed in uphill, forced to the path edge) and surfaces the research finding that matches that cause, not a random one. Perfect world replays the identical route with the lane never ending, the counterfactual as a second playthrough. Custom Three.js / WebGL renderer with anatomically rigged figures and two-bone IK, Verlet ragdoll crashes over those same joints, one height function shared byte-for-byte between JavaScript and the vertex shader, and 61 OpenStreetMap building footprints projected onto the route. The synthesized score holds a fifth for as long as there is a protected lane under you and drops to a fourth the metre it ends. Class Race puts 25 to 40 phones in a lecture hall on one seed from a projected QR code, over a SQLite-backed Cloudflare Durable Object, and the leaderboard is anti-cheat by re-simulation: the client submits a seed and input trace, and the server recomputes the score itself with byte-exact shared physics on Neon Postgres. A 247-check headless smoke suite gates every release.",
    tags: ["Three.js", "WebGL", "Game Development", "Cloudflare Workers", "Durable Objects", "Neon", "PWA", "SYN 100"],
    image: "/shots/library-walk.webp",
    github: "",
    privateRepo: true,
    demo: "https://library-walk.vercel.app",
    featured: false,
    date: "2026-07",
    collection: "built-for-cars",
  },
  {
    id: "syn100-micromobility",
    title: "Built for Cars, Banned for Bikes: Micromobility Research Site",
    description:
      "The research site behind our SYN 100 project (Seventh College, UC San Diego) on micromobility as climate infrastructure, with Yuvia Cabral and Rut. A single-page explainer plus a working toolkit: the short-trip problem, ridership evidence, UC San Diego as a field site, the barriers that actually stop riders (nowhere to park, nowhere to charge, restricted zones), a peer-campus benchmark, and a policy playbook, every statistic cited. Three pieces of our own fieldwork are published rather than summarised, a 31-response survey across 12 institutions and 4 countries, two structured field observations at Sichuan University and Victor Valley College covering 87 riders, and seven on-site interviews across three campuses, with raw exports withheld, interviewees unnamed, and the one who declined recording paraphrased and never quoted. Ships an interactive trip calculator (car vs bike on cost, CO2, and calories), a resource finder covering all ten UC campuses, a printable flyer, and a share card. It is hand-authored static HTML with no build step, so nothing can import a shared constant, a data/facts.json single source of truth plus a Python drift checker does that job instead: 9 checks, one version string across the worker and the footer, and all 55 published survey figures re-verified against the raw export before every commit. Stale-while-revalidate service worker with a Chrome-dino-style offline ride, and a connection lamp that tests the network rather than trusting navigator.onLine.",
    tags: ["Static HTML", "Service Worker", "PWA", "Data Visualization", "SVG", "Python", "Field Research", "SYN 100"],
    image: "/shots/syn100-micromobility.webp",
    github: "",
    privateRepo: true,
    demo: "https://syn100-micromobility.vercel.app",
    featured: false,
    date: "2026-07",
    collection: "built-for-cars",
    team: {
      size: 3,
      members: ["Yuvia Cabral", "Rut"],
    },
  },
  {
    id: "pidilite-fevicreate",
    title: "Pidilite Fevicreate: Internal School-Engagement Tracker",
    description:
      "Built an internal tool for Pidilite Industries, the FMCG company behind Fevicol and Fevicreate, to track their Fevicreate school-outreach engagement on the ground. Field marketing executives across 8 PSFME territories (Kolkata, Delhi, Bangalore, Chennai, Hyderabad, Mumbai, Pune, Ahmedabad) log GPS-verified visits at schools with live geolocation, on-device camera capture, and anti-spoof guards, working fully offline-first via a service worker and syncing when back online. Territory-scoped FME accounts drive which schools each rep sees, and an admin dashboard gives the team a live view of engagement, who visited which school and when, on an interactive map. Next.js 16 + Neon Postgres (self-initializing schema, no migration step), passcode and email-OTP admin auth, peppered session secrets, and CDN-cached school data for low India latency.",
    tags: ["Next.js 16", "PostgreSQL", "Neon", "PWA", "Geolocation", "Service Worker", "TypeScript"],
    image: "/shots/pidilite-fevicreate.webp",
    github: "",
    privateRepo: true,
    demo: "https://pidilite-school-checkin.vercel.app",
    // Both Pidilite pieces under one entry: the tracker is this project, and
    // the catalogue is the other half of the same client relationship. The
    // catalogue blurb is moved verbatim from the retired Goel Studio entry.
    surfaces: [
      {
        label: "Fevicryl Art On Sale",
        href: "https://fevicryl-art-catalog.vercel.app",
        image: "/shots/s-fevicryl.webp",
        blurb:
          "A retail catalogue built from stock that until then existed only as photographs on a phone.",
      },
    ],
    featured: true,
    date: "2026-05",
  },
  {
    id: "watch-together",
    title: "Watch Together: Cross-Site Video Sync",
    description: `Built a Chrome/Firefox/Safari extension that syncs video playback across any number of devices worldwide. Works on Netflix, YouTube, JioHotstar, Disney+, HBO Max, and Amazon Prime Video, anyone can play, pause, seek, or change speed and it propagates instantly. WebSocket relay server on Render with heartbeat-based drift correction (within 0.5s), per-IP rate limiting, host-only mode, ad detection, and built-in chat. 59 server tests + Puppeteer browser tests. Manifest V3 with site-specific player adapters. Published on the Chrome Web Store and rated 5.0, with ${WATCH_TOGETHER_INSTALLS} profiles running it today, and submitted to the Microsoft Edge Add-ons store.`,
    tags: ["Chrome Extension", "WebSocket", "Node.js", "Manifest V3", "Render", "Vitest"],
    image: "/shots/watch-together.webp",
    github: "https://github.com/ArnavGoel03/watch-together",
    demo: "https://chromewebstore.google.com/detail/kilmggcpfkcfpkaapillgloabbgmeeoa",
    eyebrow: "Chrome Web Store",
    featured: true,
    date: "2026-04",
  },
  {
    id: "serenity",
    title: "Serenity: AI Health Companion",
    description:
      "Built an AI-powered health management app for women with PCOD/PCOS. Users vent freely and Claude AI auto-extracts symptoms, mood, diet, and medications. Upload lab PDFs and AI parses hormone levels, flags abnormals, and detects medications. Features cycle tracking, medication streaks, lab trend charts via Recharts, calendar heatmaps, and Google OAuth. 15 Prisma models, 14 API routes, and a supportive, privacy-first UX. Native iOS (SwiftUI) + Android (Kotlin/Compose) + iPad/Mac (Catalyst) + web (Next.js).",
    tags: [
      "SwiftUI",
      "Kotlin",
      "Jetpack Compose",
      "Mac Catalyst",
      "Next.js 16",
      "Claude AI",
      "PostgreSQL",
      "Prisma",
      "NextAuth",
      "Recharts",
    ],
    image: "/shots/serenity.webp",
    github: "",
    privateRepo: true,
    demo: "https://serenity-pcos.vercel.app",
    featured: false,
    date: "2025-03",
  },
  {
    id: "mlb-playoff-cogs108",
    title: "MLB Playoff Prediction: COGS 108",
    description:
      "Final group project (Team 021, Winter 2026) investigating how early-season team run differential per game, on-base-plus-slugging (OPS), and pitching ERA measured over the first 81 games relate to MLB playoff qualification from 2015 to 2023 (excluding 2020), and how the predictive power of those metrics shifts by season's end. Pulled team-season data from Fangraphs via pybaseball, cleaned and aggregated to half-season and full-season splits, then compared classification performance across both windows. Scope covered proposal → data checkpoint → EDA → final analysis across four notebooks. I led the ethics section, scoping collection bias, downstream misuse, and limitations on any causal claims.",
    tags: ["Python", "pandas", "pybaseball", "scikit-learn", "Jupyter", "COGS 108"],
    image: "/shots/mlb-playoff-cogs108.webp",
    github: "",
    privateRepo: true,
    demo: "https://youtu.be/nEdCi9loxAI",
    featured: false,
    date: "2026-03",
    team: {
      size: 5,
      members: [
        "Lincoln Wirschem",
        "Ricardo Hernandez",
        "Vedant Patel",
        "Aleksey Dykhno",
      ],
    },
  },
  {
    id: "arkinvest-anduril-mgt127r",
    title: "Anduril Industries: MGT 127R S-Curve Case",
    description:
      "Final group case study for MGT 127R (Winter 2026) analysing Anduril Industries as a potential new S-curve in defense technology. Structured around the technology-S-curve framework from class, mapping Anduril's product portfolio (Lattice, Ghost, Sentry, etc.), evaluating incumbents' innovator's-dilemma posture, and arguing where Anduril sits on the substitution curve against legacy defense primes. Delivered as a group presentation with strategic recommendations on investment and competitive response.",
    tags: ["Technology Strategy", "S-Curve Analysis", "MGT 127R", "Case Study", "Defense Tech"],
    image: "/shots/arkinvest-anduril-mgt127r.webp",
    github: "",
    privateRepo: true,
    demo: "https://youtu.be/gMxLb814kPM",
    featured: false,
    date: "2026-03",
    team: { size: 6 },
  },
  {
    id: "arkinvest-mgt127r",
    title: "ARK Invest: MGT 127R Disruptive-Tech Case",
    description:
      "Mid-quarter case opening (Week 9, Winter 2026) for MGT 127R examining ARK Invest's disruptive-technology investment strategy. Broke down ARK's thesis framework (genomics, robotics, energy storage, AI, blockchain), their concentrated-portfolio approach, and the return/volatility trade-offs of betting on exponential-technology curves. Framed the fund as an explicit wager on the S-curve adoption rate of multiple compounding innovations, and flagged where that thesis has historically cracked.",
    tags: ["Investment Analysis", "Disruptive Innovation", "MGT 127R", "Case Study", "Technology Strategy"],
    image: "/shots/arkinvest-mgt127r.webp",
    github: "",
    privateRepo: true,
    demo: "https://youtu.be/iEqXolIMZVE",
    featured: false,
    date: "2026-03",
    team: { size: 6 },
  },
  {
    id: "har-cse158",
    title: "Human Activity Recognition: CSE 158",
    description:
      "Final group project for CSE 158 (Web Mining and Recommender Systems, Fall 2025) at UCSD. Built a model to classify human activities, walking, sitting, standing, stairs, and more, from wearable-sensor time-series data. Handled the full pipeline: windowing raw accelerometer/gyroscope streams, engineering time- and frequency-domain features, training classifiers, and comparing performance across model families. Covered feature selection, cross-validation, and error analysis against a confusion matrix.",
    tags: ["Python", "scikit-learn", "Time-Series", "Signal Processing", "CSE 158"],
    image: "/shots/har-cse158.webp",
    github: "",
    privateRepo: true,
    demo: "https://youtu.be/5Jzb_5LDcEg",
    featured: false,
    date: "2025-12",
    team: { size: 2 },
  },
  {
    id: "cogs9-final",
    title: "COGS 9: Final Group Project",
    description:
      "Final group project for COGS 9 (Introduction to Data Science) at UCSD, Spring 2025, a two-person data-science investigation completed end-to-end from question to presentation. Covered the full COGS 9 arc: formulating a research question, sourcing and cleaning data, exploratory analysis, visualisation, and delivering findings as a recorded presentation.",
    tags: ["Python", "pandas", "Data Analysis", "Jupyter", "COGS 9"],
    image: "/shots/cogs9-final.webp",
    github: "",
    privateRepo: true,
    demo: "https://youtu.be/ZcxTi0N75BI",
    featured: false,
    date: "2025-06",
    team: { size: 2 },
  },
  {
    id: "gondilal-saraf",
    title: "Gondilal Saraf: Full-Stack Jewelry Platform",
    description:
      "Built a full-stack platform for my family's century-old jewelry business, bilingual storefront with live gold rates, 10-year investment charts, and a cinematic heritage design system. Includes a product catalogue with AR virtual try-on, AI-generated descriptions via Gemini 2.0 Flash, and an admin ERP with image processing pipeline (Photoroom + Sharp). 15 Prisma models, 26 API routes, OTP auth, AES encryption, and 85 tests.",
    tags: ["Next.js 15", "PostgreSQL", "Gemini AI", "Prisma", "TypeScript", "Framer Motion"],
    image: "/shots/gondilal-saraf.webp",
    github: "",
    privateRepo: true,
    demo: "https://gondilalsaraf.com",
    eyebrow: "Family business · est. 1873",
    featured: true,
    date: "2025-01",
  },
  {
    id: "redbull-youtube-analytics",
    title: "Red Bull YouTube Sentiment Analytics",
    description:
      "End-term Social Media Analytics project analysing the Red Bull brand on YouTube. Collected 500 comments from the 5 most-commented recent videos via the YouTube Data API v3 and pulled hashtags from 50 video descriptions with yt-dlp. Scored every comment with VADER, 47% positive, 34.6% neutral, 18.4% negative, for a Net Sentiment Score of +28.6 percentage points (roughly double the industry benchmark). Every Red Bull video uses exactly 2 hashtags (#RedBull + #GivesYouWiiings, 100% of catalog), top organic keywords are 'gives' and 'wings', and the main genuine complaint is viewer anxiety about stunt safety. Delivered an 8-chart Excel dashboard, Word report, and a one-page executive summary PDF.",
    tags: ["Python", "pandas", "VADER", "YouTube Data API", "yt-dlp", "Matplotlib", "openpyxl"],
    image: "/shots/redbull-youtube-analytics.webp",
    github: "https://github.com/ArnavGoel03/redbull-youtube-analytics",
    demo: "/artifacts/redbull-youtube-executive-summary.pdf",
    featured: false,
    date: "2026-04",
  },
  {
    id: "power-grid-analysis",
    title: "U.S. Power Outages: DSC 80",
    description:
      "Two-person DSC 80 project (with Paulina Pelayo) analysing 1,534 major U.S. power outages from 2000 to 2016 across 53 features from the DOE. Covered the full data-science arc: cleaning and timestamp reconciliation, NMAR missingness reasoning, permutation tests, and predictive modelling. Found severe weather drives the longest outages, fuel-supply emergencies are rare but disruptive, and higher residential electricity prices correlate with shorter restoration times (p ≈ 0.007), suggesting greater grid-reliability investment. Random Forest regressor with log-transformed population density and a severe-weather indicator reached RMSE 6,189 min and R² 0.220, with fairness checks across weather vs. non-weather outages.",
    tags: ["Python", "pandas", "scikit-learn", "Random Forest", "Permutation Testing", "DSC 80"],
    image: "/shots/power-grid-analysis.webp",
    github: "https://github.com/ArnavGoel03/Power-grid-analysis",
    demo: "https://arnavgoel03.github.io/Power-grid-analysis/",
    featured: false,
    date: "2024-12",
    doi: "10.5281/zenodo.19707994",
    team: {
      size: 2,
      members: ["Paulina Pelayo"],
    },
  },
  {
    id: "vaani",
    title: "Vaani: Multilingual AI Chatbot",
    description:
      "Co-built with Ahaskar: a voice-first AI chatbot for Indian-language customer support. OpenAI's LLM + speech APIs behind a Flask microservice backend, with a speech-to-text → intent → text-to-speech pipeline across 5+ Indian languages. Shelved mid-build after a clear-eyed market-fit check, in the Indian SME market we were targeting, a human customer-support agent costs less per conversation than bleeding-edge LLM inference. Keeping it listed as a reminder that the right call is sometimes to stop, not ship.",
    tags: ["OpenAI API", "Flask", "Speech Recognition", "NLP", "Python"],
    image: "",
    github: "",
    privateRepo: true,
    demo: "",
    featured: false,
    date: "2024-07",
    team: {
      size: 2,
      members: [
        {
          name: "Ahaskar",
          url: "https://www.linkedin.com/in/kashyapahaskar/",
        },
      ],
    },
  },
];

/**
 * Every project, studio included.
 *
 * `studioProject` deliberately lives outside `staticProjects` so the suite apps
 * can be folded into it, but that made it invisible to id lookups: its card
 * renders a Details link to /projects/studio and the route answered 404,
 * because the only lookup searched `staticProjects` alone. Anything resolving a
 * project by id or enumerating routes should read this, not `staticProjects`.
 */
export const allProjects: Project[] = [studioProject, ...staticProjects];

export function getProjectById(id: string): Project | undefined {
  return allProjects.find((p) => p.id === id);
}
/**
 * The four the home page leads with, and the only place prominence is decided.
 *
 * There used to be a second hand-typed list of ids in app/page.tsx. Two lists
 * meant two answers: Red Bull was flagged here and absent there, buzz was there
 * and unflagged here, and nothing reconciled them. Membership is now exactly
 * `featured`, so a project is promoted or demoted in one edit, and the order is
 * the order they are declared above.
 *
 * Everything else still appears on /projects. Demoted is not deleted.
 */
export const flagshipProjects: Project[] = staticProjects.filter((p) => p.featured);

/**
 * The colour a project wears wherever it appears.
 *
 * Identity, not rank. The same project is the same hue on its card, on its node
 * in the home page graph and on its metrics, so colour answers "which project
 * is this" rather than "which position is this in a list". That is the only
 * thing on this site with enough entities to deserve a palette.
 *
 * Keyed off the id rather than the index, so inserting a project does not
 * repaint every project after it, and the six hues are the validated set in
 * globals.css. Reuse across eighteen projects is fine because two cards wearing
 * the same hue never sit adjacent as a chart series would; each one is labelled
 * with its own name, so colour is never the only thing telling them apart.
 */
export function accentFor(id: string): string {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return `var(--accent-${(h % 6) + 1})`;
}
