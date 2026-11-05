import type { Language, PageSlug } from "@/lib/routes";

/** Primary nav order — home first. */
export const primaryNavSlugs = ["home", "about", "services", "projects", "contact"] as const;

export type PrimaryNavSlug = (typeof primaryNavSlugs)[number];

const NAV_LABELS_EN: Partial<Record<PageSlug, string>> = {
  home: "Home",
  about: "About",
  services: "Services",
  projects: "Projects",
  contact: "Contact",
  privacy: "Privacy",
};

/** Navbar labels are English on every locale. */
export function navLabel(_language: Language, slug: PageSlug): string {
  return NAV_LABELS_EN[slug] ?? slug;
}

/** Navbar CTA — English on every locale. */
export function contactCtaLabel(_language: Language): string {
  return "Contact us";
}
