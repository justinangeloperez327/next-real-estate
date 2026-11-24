/**
 * Returns `path` only if it is a same-origin relative path ("/foo"),
 * otherwise `fallback`. Prevents open redirects via "//evil.com",
 * "/\\evil.com" or "@evil.com".
 */
export function safeRedirectPath(
  path: string | null | undefined,
  fallback = "/",
): string {
  if (!path || !path.startsWith("/") || path.startsWith("//")) return fallback;
  if (path.includes("\\")) return fallback;
  return path;
}
