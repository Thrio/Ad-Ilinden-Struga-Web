export const languages = ["mk", "en"] as const;
export type Language = (typeof languages)[number];

export const pages = [
  { slug: "home", path: "" },
  { slug: "about", path: "about" },
  { slug: "services", path: "services" },
  { slug: "projects", path: "projects" },
  { slug: "contact", path: "contact" },
  { slug: "privacy", path: "privacy" },
] as const;

export type PageSlug = (typeof pages)[number]["slug"];

export function pagePath(language: Language, path: string) {
  const suffix = path ? `/${path}` : "/";
  return language === "mk" ? suffix : `/en${suffix === "/" ? "" : suffix}`;
}

export function alternates(language: Language, path: string) {
  const mk = pagePath("mk", path);
  const en = pagePath("en", path);
  return {
    canonical: pagePath(language, path),
    languages: { mk, en, "x-default": mk },
  };
}
