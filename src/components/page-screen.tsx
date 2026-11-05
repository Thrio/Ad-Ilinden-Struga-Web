import { ContactForm } from "@/components/contact-form";
import { JsonLd } from "@/components/json-ld";
import { pagePath, type Language, type PageSlug } from "@/lib/routes";
import { getSiteUrl } from "@/lib/site-url";
import { getPage, getSiteSettings } from "@/sanity/load";
import type { PageStub } from "@/sanity/types";

function privacyBody(language: Language, siteName: string) {
  if (language === "mk") {
    return `Оваа страница опишува како ${siteName} ги третира информациите што ги испраќате преку контакт формата на веб-страницата.`;
  }
  return `This page describes how ${siteName} handles information you send through the contact form on this website.`;
}

function pageCopy(page: { seo: { description: string }; stub?: PageStub } | null, slug: PageSlug): PageStub | null {
  if (!page || slug === "home") return null;
  if (page.stub) return page.stub;
  return { lead: page.seo.description, paragraph: "" };
}

export async function PageScreen({ language, slug }: { language: Language; slug: PageSlug }) {
  const site = await getSiteSettings();
  const page = await getPage(language, slug);
  const path = page?.path ?? "";
  const copy = pageCopy(page, slug);
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
    <main id="content" className="inner-page">
      {crumbs ? <JsonLd data={crumbs} /> : null}
      <div className="inner-page__frame mx-auto max-w-[var(--content-max)] px-[var(--gutter-narrow)] md:px-[var(--gutter)]">
        <header className="inner-page__header">
          <h1 className="inner-page__title">{page?.title ?? slug}</h1>
        </header>

        {copy && slug !== "contact" ? (
          <div className="inner-page__prose">
            <p className="inner-page__lead">{copy.lead}</p>
            {slug === "privacy" ? (
              <p className="inner-page__body">{privacyBody(language, site.name)}</p>
            ) : copy.paragraph ? (
              <p className="inner-page__body">{copy.paragraph}</p>
            ) : null}
            {copy.note ? <p className="inner-page__note">{copy.note}</p> : null}
          </div>
        ) : null}

        {slug === "contact" ? (
          <div className="inner-page__prose">
            {copy ? <p className="inner-page__lead">{copy.lead}</p> : null}
            {copy?.paragraph ? <p className="inner-page__body">{copy.paragraph}</p> : null}
            <ContactForm language={language} />
          </div>
        ) : null}
      </div>
    </main>
  );
}
