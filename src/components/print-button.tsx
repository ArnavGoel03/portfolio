"use client";

import { Printer } from "lucide-react";

export default function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => {
        if (typeof window !== "undefined") window.print();
      }}
      className="inline-flex items-center gap-1.5 rounded-full border border-foreground/15 bg-foreground/5 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-foreground/30 hover:bg-foreground/8"
    >
      <Printer size={13} />
      Print
    </button>
  );
}
