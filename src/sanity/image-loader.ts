type LoaderProps = { src: string; width: number; quality?: number };

export default function sanityImageLoader({ src, width, quality }: LoaderProps) {
  if (src.startsWith("/") || src.startsWith("data:")) return src;
  const url = new URL(src);
  url.searchParams.set("w", String(width));
  url.searchParams.set("q", String(quality ?? 75));
  url.searchParams.set("auto", "format");
  return url.href;
}
