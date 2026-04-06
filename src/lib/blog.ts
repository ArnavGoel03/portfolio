export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  content: string[];
}

export const posts: BlogPost[] = [
  {
    slug: "building-gondilal-saraf",
    title: "Building a Full-Stack Jewelry Platform for a Century-Old Family Business",
    excerpt:
      "How I designed and built gondilalsaraf.com — a bilingual e-commerce platform with AI-powered descriptions, AR try-on, and an admin ERP for my family's 110-year-old gold & silver business.",
    date: "2025-02-15",
    readTime: "8 min read",
    tags: ["Next.js", "Prisma", "Gemini AI", "Full-Stack"],
    content: [
      "My family has been in the gold and silver jewelry business since 1915 — that's over a century of trust, craftsmanship, and community in Banda, Uttar Pradesh. When I started studying Data Science at UCSD, I saw an opportunity to bridge that legacy with modern technology.",
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
      "I graduate in June 2026 with a BS in Data Science and a minor in Entrepreneurship & Innovation. I'm looking for roles where I can combine technical depth with business impact — whether that's ML engineering, data science, or building products. If you're working on something interesting, I'd love to talk.",
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
