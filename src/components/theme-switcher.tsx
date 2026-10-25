"use client";

import { useSyncExternalStore } from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import {
  COLOR_SCHEMES,
  type ColorScheme,
  getColorScheme,
  getServerColorScheme,
  getServerSystemDark,
  getSystemDark,
  isColorScheme,
  setColorScheme,
  subscribeColorScheme,
} from "@/lib/theme";

const ICONS = { auto: Monitor, light: Sun, dark: Moon } as const;

/**
 * A labelled <select>, not a toggle. Three states need three options, and a
 * native select is keyboard and screen-reader complete without any help. The
 * Automatic option names what the OS is currently asking for, so "Auto" is not
 * a mystery about which of the other two it will look like.
 */
export default function ThemeSwitcher() {
  const scheme = useSyncExternalStore(
    subscribeColorScheme,
    getColorScheme,
    getServerColorScheme,
  );
  const systemDark = useSyncExternalStore(
    subscribeColorScheme,
    getSystemDark,
    getServerSystemDark,
  );
  const Icon = ICONS[scheme];

  const label = (s: ColorScheme) =>
    s === "auto" ? `Auto (${systemDark ? "dark" : "light"})` : s === "light" ? "Light" : "Dark";

  return (
    <label className="relative flex h-9 items-center gap-1.5 rounded-xl px-2.5 text-muted-foreground transition-colors focus-within:text-foreground hover:text-foreground">
      <span className="sr-only">Theme</span>
      <Icon size={15} aria-hidden="true" />
      <select
        value={scheme}
        onChange={(event) => {
          if (isColorScheme(event.target.value)) setColorScheme(event.target.value);
        }}
        className="cursor-pointer appearance-none bg-transparent pr-1 font-mono text-[11px] uppercase tracking-[0.12em] text-inherit outline-none"
      >
        {COLOR_SCHEMES.map((s) => (
          <option key={s} value={s}>
            {label(s)}
          </option>
        ))}
      </select>
    </label>
  );
}
