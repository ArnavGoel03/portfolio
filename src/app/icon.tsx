import { ImageResponse } from "next/og";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

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
          background: "linear-gradient(135deg, #06050b 0%, #1a1030 100%)",
          borderRadius: "96px",
        }}
      >
        <svg width="320" height="320" viewBox="0 0 24 24" fill="none">
          <polygon
            points="12,2 4,9 8,22 16,22 20,9"
            stroke="#a78bfa"
            strokeWidth="1"
            fill="none"
            strokeLinejoin="round"
          />
          <line x1="4" y1="9" x2="20" y2="9" stroke="#a78bfa" strokeWidth="0.7" />
          <line x1="12" y1="2" x2="8" y2="9" stroke="#a78bfa" strokeWidth="0.7" />
          <line x1="12" y1="2" x2="16" y2="9" stroke="#a78bfa" strokeWidth="0.7" />
          <line x1="8" y1="9" x2="12" y2="22" stroke="#a78bfa" strokeWidth="0.7" />
          <line x1="16" y1="9" x2="12" y2="22" stroke="#a78bfa" strokeWidth="0.7" />
          <circle cx="12" cy="2" r="1.5" fill="#c4b5fd" />
          <circle cx="4" cy="9" r="1.2" fill="#a78bfa" />
          <circle cx="20" cy="9" r="1.2" fill="#a78bfa" />
          <circle cx="8" cy="22" r="1.2" fill="#818cf8" />
          <circle cx="16" cy="22" r="1.2" fill="#818cf8" />
          <circle cx="8" cy="9" r="1" fill="#c4b5fd" opacity="0.7" />
          <circle cx="16" cy="9" r="1" fill="#c4b5fd" opacity="0.7" />
          <circle cx="12" cy="22" r="1" fill="#6366f1" opacity="0.7" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
