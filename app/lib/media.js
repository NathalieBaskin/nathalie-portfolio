export const R2_BASE = "https://pub-ff3078a376e0426785394f30bba2fe21.r2.dev";

export function r2(path) {
  if (!path) return path;
  if (path.startsWith("http")) return path;
  if (path.startsWith("/")) return `${R2_BASE}${encodeURI(path)}`;
  return `${R2_BASE}/${encodeURI(path)}`;
}
