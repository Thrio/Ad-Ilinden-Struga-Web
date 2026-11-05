/** Live URL is pending. The fallback keeps metadata absolute until NEXT_PUBLIC_SITE_URL is set. */
export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
}
