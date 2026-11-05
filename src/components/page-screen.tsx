import { ContactForm } from "@/components/contact-form";
import { JsonLd } from "@/components/json-ld";
import { PendingText } from "@/components/ui/pending-text";
import { pagePath, type Language, type PageSlug } from "@/lib/routes";
import { getSiteUrl } from "@/lib/site-url";
import { getPage, getSiteSettings } from "@/sanity/load";

export async function PageScreen({ language, slug }: { language: Language; slug: PageSlug }) {
  const site = await getSiteSettings();
  const page = await getPage(language, slug);
  const path = page?.path ?? "";
  const crumbs =
    slug === "home"
      ? null
      : {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: site.name, item: new URL(pagePath(language, ""), getSiteUrl()).href },
            { "@type": "ListItem", position: 2, name: page?.title ?? slug, item: new URL(pagePath(language, path), getSiteUrl()).href },
          ],
        };

  return (
    <main id="content">
      {crumbs ? <JsonLd data={crumbs} /> : null}
      <h1>{slug === "home" ? site.name : page?.title}</h1>
      {slug === "about" || slug === "services" || slug === "projects" ? <PendingText lines={3}>{slug}</PendingText> : null}
      {slug === "privacy" ? <PendingText lines={12}>privacy policy</PendingText> : null}
      {slug === "contact" ? <ContactForm /> : null}
    </main>
  );
}
