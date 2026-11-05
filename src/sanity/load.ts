import { createClient } from "next-sanity";
import pages from "@/sanity/mock/pages.json";
import projects from "@/sanity/mock/projects.json";
import siteSettings from "@/sanity/mock/site-settings.json";
import { pageQuery, projectSlugsQuery, siteSettingsQuery } from "@/sanity/queries";
import type { PageDocument, SiteSettings } from "@/sanity/types";
import type { Language, PageSlug } from "@/lib/routes";

export function usesMock() {
  return process.env.CONTENT_SOURCE !== "sanity";
}

function client() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  if (!projectId) throw new Error("NEXT_PUBLIC_SANITY_PROJECT_ID is required when CONTENT_SOURCE=sanity");
  return createClient({
    projectId,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-11-05",
    useCdn: true,
  });
}

export async function getSiteSettings(): Promise<SiteSettings> {
  if (usesMock()) return siteSettings;
  return client().fetch(siteSettingsQuery);
}

export async function getPage(language: Language, slug: PageSlug): Promise<PageDocument | null> {
  if (usesMock()) return (pages as PageDocument[]).find((page) => page.language === language && page.slug === slug) ?? null;
  return client().fetch(pageQuery, { language, slug });
}

export async function getProjectSlugs(): Promise<{ slug: string; language: Language }[]> {
  if (usesMock()) return projects;
  return client().fetch(projectSlugsQuery);
}
