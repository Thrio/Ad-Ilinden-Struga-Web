import type { MetadataRoute } from "next";
import { languages, pagePath, pages } from "@/lib/routes";
import { getSiteUrl } from "@/lib/site-url";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  return languages.flatMap((language) =>
    pages.map((page) => {
      const path = pagePath(language, page.path);
      return {
        url: new URL(path, base).href,
        alternates: {
          languages: {
            mk: new URL(pagePath("mk", page.path), base).href,
            en: new URL(pagePath("en", page.path), base).href,
            "x-default": new URL(pagePath("mk", page.path), base).href,
          },
        },
      };
    }),
  );
}
