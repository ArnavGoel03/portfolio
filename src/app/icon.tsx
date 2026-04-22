import { ImageResponse } from "next/og";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

// Monogram-style favicon in the warm editorial palette that matches the site.
// Serif "A" on a dark-espresso background with a tiny amber serif-foot dot
// for personality. Deliberately minimal so it reads at 16x16.
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#121110",
          borderRadius: "112px",
          border: "6px solid #26221e",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#ede6d5",
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontWeight: 700,
            fontSize: 360,
            letterSpacing: "-0.04em",
            lineHeight: 1,
          }}
        >
          A
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 120,
            right: 140,
            width: 22,
            height: 22,
            borderRadius: "50%",
            background: "#d4a96a",
            display: "flex",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
