/**
 * Colour scheme: Automatic, Light or Dark, remembered per browser.
 *
 * The site was designed dark and dark stays the default, so a visitor who never
 * touches the switcher sees exactly the page they saw before it existed.
 * Automatic follows the OS and keeps following it while the page is open.
 *
 * The choice lives in localStorage under `colorScheme`. Every read and write is
 * wrapped, because storage throws in some private windows and when site data is
 * blocked; the switcher still works for the page view in that case, it just
 * forgets on reload.
 *
 * Theming is the `.dark` class on <html>, which is what Tailwind's `dark:`
 * variant and the token blocks in globals.css key off. `color-scheme` follows
 * from the class in CSS, so native controls and scrollbars match.
 */

export type ColorScheme = "auto" | "light" | "dark";

export const COLOR_SCHEMES: readonly ColorScheme[] = ["auto", "light", "dark"];

export const DEFAULT_COLOR_SCHEME: ColorScheme = "dark";

const STORAGE_KEY = "colorScheme";
const DARK_QUERY = "(prefers-color-scheme: dark)";

export function isColorScheme(value: unknown): value is ColorScheme {
  return value === "auto" || value === "light" || value === "dark";
}

/**
 * Runs inline in <head>, before first paint, so a reader who chose Light does
 * not get a flash of the dark page on every navigation. It has to be a string:
 * it runs before any bundle loads. Keep it in step with `apply()` below.
 */
export const THEME_BOOT_SCRIPT = `(function(){var s;try{s=localStorage.getItem("${STORAGE_KEY}")}catch(e){}if(s!=="auto"&&s!=="light"&&s!=="dark")s="${DEFAULT_COLOR_SCHEME}";var d=s==="dark"||(s==="auto"&&window.matchMedia("${DARK_QUERY}").matches);document.documentElement.classList.toggle("dark",d)})();`;

function readStored(): ColorScheme {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return isColorScheme(value) ? value : DEFAULT_COLOR_SCHEME;
  } catch {
    return DEFAULT_COLOR_SCHEME;
  }
}

function systemPrefersDark(): boolean {
  return window.matchMedia(DARK_QUERY).matches;
}

function apply(scheme: ColorScheme) {
  const dark = scheme === "dark" || (scheme === "auto" && systemPrefersDark());
  document.documentElement.classList.toggle("dark", dark);
}

// A tiny external store so React components read the choice through
// useSyncExternalStore: no effect-driven state, and the server snapshot is
// the default, so hydration always matches the HTML that was sent.
const listeners = new Set<() => void>();

function notify() {
  for (const listener of listeners) listener();
}

export function subscribeColorScheme(listener: () => void): () => void {
  listeners.add(listener);
  // Runs after React commits. If React ever re-renders <html> from the server
  // markup (a hydration recovery does exactly that), the server's `dark` class
  // comes back; re-applying here puts the reader's choice back on top of it.
  apply(readStored());
  const media = window.matchMedia(DARK_QUERY);
  const onSystemChange = () => {
    if (readStored() === "auto") apply("auto");
    listener();
  };
  // Another tab changing the theme should change this one too.
  const onStorage = (event: StorageEvent) => {
    if (event.key !== STORAGE_KEY) return;
    apply(readStored());
    listener();
  };
  media.addEventListener("change", onSystemChange);
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    media.removeEventListener("change", onSystemChange);
    window.removeEventListener("storage", onStorage);
  };
}

export const getColorScheme = readStored;
export const getServerColorScheme = (): ColorScheme => DEFAULT_COLOR_SCHEME;

export const getSystemDark = systemPrefersDark;
export const getServerSystemDark = () => true;

export function setColorScheme(scheme: ColorScheme) {
  try {
    window.localStorage.setItem(STORAGE_KEY, scheme);
  } catch {
    // Storage unavailable: still switch for this page view.
  }
  apply(scheme);
  notify();
}
