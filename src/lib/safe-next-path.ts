export function safeNextPath(value: string | null | undefined, fallback = "/parcours") {
  if (!value) return fallback;
  try {
    const base = new URL("https://the-vibe-experience.local");
    const target = new URL(value, base);
    if (target.origin !== base.origin) return fallback;
    return `${target.pathname}${target.search}${target.hash}`;
  } catch {
    return fallback;
  }
}
