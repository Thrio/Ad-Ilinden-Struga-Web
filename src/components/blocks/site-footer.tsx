import Link from "next/link";
import { pagePath, type Language } from "@/lib/routes";
import { getSiteSettings } from "@/sanity/load";

export async function SiteFooter({ language }: { language: Language }) {
  const site = await getSiteSettings();
  return (
    <footer className="site-footer px-[var(--gutter-narrow)] py-[var(--section-space-tight)] md:px-[var(--gutter)]">
      <div className="mx-auto flex max-w-[var(--content-max)] flex-col gap-[var(--space-24)] md:flex-row md:items-start md:justify-between">
        <div>
          <p className="font-display text-lg font-semibold uppercase">{site.name}</p>
          <p className="site-footer__muted">
            {site.city}, {site.country}
          </p>
        </div>
        <div className="flex flex-col gap-[var(--space-8)] text-sm">
          <a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <Link href={pagePath(language, "privacy")}>Privacy</Link>
        </div>
      </div>
    </footer>
  );
}
