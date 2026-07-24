export function safeNextPath(value: string | null | undefined, fallback = "/parcours") {
  if (!value || !value.startsWith("/") || value.startsWith("//")) return fallback;
  return value;
}
