import type { Metadata } from "next";
import { alternates, pages, type Language, type PageSlug } from "@/lib/routes";
import { getPage } from "@/sanity/load";

export async function metadataFor(language: Language, slug: PageSlug): Promise<Metadata> {
  const page = await getPage(language, slug);
  const path = pages.find((item) => item.slug === slug)?.path ?? "";
  return {
    title: { absolute: page?.seo.title ?? "AD Ilinden Struga" },
    description: page?.seo.description,
    alternates: alternates(language, path),
  };
}
