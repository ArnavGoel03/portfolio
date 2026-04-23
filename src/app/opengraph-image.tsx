import { ImageResponse } from "next/og";

export const alt = "Arnav Goel: Data science that ships";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// OG card in the warm editorial palette, matches the site aesthetic so the
// share-preview and the landing page feel like the same brand.
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "#121110",
          position: "relative",
          fontFamily: "Georgia, 'Times New Roman', serif",
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
              "radial-gradient(ellipse 80% 60% at 15% 0%, rgba(212,169,106,0.08), transparent 60%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            border: "1px solid rgba(237,230,213,0.08)",
            borderRadius: "2px",
            margin: "40px",
            display: "flex",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            color: "#a8a097",
            fontSize: 18,
            letterSpacing: "0.25em",
            textTransform: "uppercase" as const,
            fontFamily: "'Courier New', monospace",
            position: "relative",
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: "12px",
              border: "2px solid #26221e",
              background: "#1a1715",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ede6d5",
              fontFamily: "Georgia, serif",
              fontWeight: 700,
              fontSize: 30,
              letterSpacing: "-0.04em",
            }}
          >
            A
          </div>
          <span style={{ display: "flex" }}>arnavgoel.dev</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", position: "relative" }}>
          <p
            style={{
              fontSize: 18,
              color: "#a8a097",
              letterSpacing: "0.3em",
              textTransform: "uppercase" as const,
              margin: 0,
              fontFamily: "'Courier New', monospace",
            }}
          >
            Arnav Goel &middot; Data Science &middot; UC San Diego
          </p>
          <h1
            style={{
              fontSize: 96,
              fontWeight: 700,
              color: "#ede6d5",
              margin: "24px 0 0 0",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            Data science that ships.
          </h1>
          <p
            style={{
              fontSize: 26,
              color: "#b5ad9f",
              marginTop: "28px",
              maxWidth: "900px",
              lineHeight: 1.4,
              fontStyle: "italic",
            }}
          >
            A Chrome Web Store extension, the full-stack platform behind a
            150-year family jewelry business, and AI-powered health tools in
            production.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#a8a097",
            fontSize: 18,
            letterSpacing: "0.15em",
            textTransform: "uppercase" as const,
            fontFamily: "'Courier New', monospace",
            position: "relative",
          }}
        >
          <span style={{ display: "flex" }}>Portfolio &middot; Graduating Jun 2027</span>
          <span style={{ display: "flex", color: "#d4a96a" }}>
            Open to co-founding
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
