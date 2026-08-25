import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * True when a link actually goes to YouTube.
 *
 * This was `/youtu\.?be/` tested against the whole URL, in two files. It read
 * as a host check and was a substring check, so
 * `/artifacts/redbull-youtube-executive-summary.pdf` matched: the Red Bull card
 * offered a play icon and the word "Video" for a link that opens a PDF. A file
 * name is not a host. Relative links are resolved against a dummy origin so a
 * site-relative path answers false rather than throwing.
 */
export function isYoutube(url: string): boolean {
  if (!url) return false;
  try {
    const host = new URL(url, "https://example.invalid").hostname.replace(
      /^www\./,
      ""
    );
    return host === "youtube.com" || host === "m.youtube.com" || host === "youtu.be";
  } catch {
    return false;
  }
}
