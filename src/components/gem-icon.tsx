"use client";

export default function GemIcon({ size = 22 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className="icon-glow"
    >
      <polygon
        points="12,2 4,9 8,22 16,22 20,9"
        stroke="url(#gemGrad)"
        strokeWidth="1.2"
        fill="none"
        strokeLinejoin="round"
      />
      <line x1="4" y1="9" x2="20" y2="9" stroke="url(#gemGrad)" strokeWidth="0.8" />
      <line x1="12" y1="2" x2="8" y2="9" stroke="url(#gemGrad)" strokeWidth="0.8" />
      <line x1="12" y1="2" x2="16" y2="9" stroke="url(#gemGrad)" strokeWidth="0.8" />
      <line x1="8" y1="9" x2="12" y2="22" stroke="url(#gemGrad)" strokeWidth="0.8" />
      <line x1="16" y1="9" x2="12" y2="22" stroke="url(#gemGrad)" strokeWidth="0.8" />
      <circle cx="12" cy="2" r="1.3" fill="#c4b5fd" />
      <circle cx="4" cy="9" r="1.1" fill="#a78bfa" />
      <circle cx="20" cy="9" r="1.1" fill="#a78bfa" />
      <circle cx="8" cy="22" r="1.1" fill="#818cf8" />
      <circle cx="16" cy="22" r="1.1" fill="#818cf8" />
      <circle cx="8" cy="9" r="0.9" fill="#c4b5fd" opacity="0.7" />
      <circle cx="16" cy="9" r="0.9" fill="#c4b5fd" opacity="0.7" />
      <circle cx="12" cy="22" r="0.9" fill="#6366f1" opacity="0.7" />
      <defs>
        <linearGradient id="gemGrad" x1="0" y1="0" x2="24" y2="24">
          <stop offset="0%" stopColor="#c4b5fd" />
          <stop offset="50%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
      </defs>
    </svg>
  );
}
