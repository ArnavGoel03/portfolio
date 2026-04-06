import { ImageResponse } from "next/og";

export const alt = "Arnav Goel — Data Science & Entrepreneurship";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #06050b 0%, #0e0b18 40%, #1a1030 100%)",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "radial-gradient(ellipse 60% 50% at 50% 30%, rgba(139,92,246,0.15), transparent)",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
            <polygon
              points="12,2 4,9 8,22 16,22 20,9"
              stroke="#a78bfa"
              strokeWidth="1.5"
              fill="none"
              strokeLinejoin="round"
            />
            <line x1="4" y1="9" x2="20" y2="9" stroke="#a78bfa" strokeWidth="1" />
            <line x1="12" y1="2" x2="8" y2="9" stroke="#a78bfa" strokeWidth="1" />
            <line x1="12" y1="2" x2="16" y2="9" stroke="#a78bfa" strokeWidth="1" />
            <line x1="8" y1="9" x2="12" y2="22" stroke="#a78bfa" strokeWidth="1" />
            <line x1="16" y1="9" x2="12" y2="22" stroke="#a78bfa" strokeWidth="1" />
            <circle cx="12" cy="2" r="2" fill="#c4b5fd" />
            <circle cx="4" cy="9" r="1.5" fill="#a78bfa" />
            <circle cx="20" cy="9" r="1.5" fill="#a78bfa" />
            <circle cx="8" cy="22" r="1.5" fill="#818cf8" />
            <circle cx="16" cy="22" r="1.5" fill="#818cf8" />
          </svg>
          <span
            style={{
              fontSize: 28,
              color: "#8b7fb3",
              letterSpacing: "0.15em",
              textTransform: "uppercase" as const,
            }}
          >
            Portfolio
          </span>
        </div>

        <h1
          style={{
            fontSize: 72,
            fontWeight: 700,
            background: "linear-gradient(135deg, #c4b5fd, #a78bfa, #818cf8)",
            backgroundClip: "text",
            color: "transparent",
            margin: 0,
            lineHeight: 1.1,
          }}
        >
          Arnav Goel
        </h1>

        <p
          style={{
            fontSize: 24,
            color: "#8b7fb3",
            marginTop: "16px",
            letterSpacing: "0.05em",
          }}
        >
          Data Science · Machine Learning · Entrepreneurship
        </p>

        <div
          style={{
            display: "flex",
            gap: "12px",
            marginTop: "32px",
          }}
        >
          {["UCSD", "Graph Theory", "Full-Stack", "AI"].map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: 14,
                color: "#a78bfa",
                border: "1px solid rgba(167,139,250,0.3)",
                borderRadius: "999px",
                padding: "6px 16px",
                background: "rgba(167,139,250,0.08)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
