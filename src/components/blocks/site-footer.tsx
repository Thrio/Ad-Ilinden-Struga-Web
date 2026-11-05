import Link from "next/link";
import { pagePath, pages, type Language } from "@/lib/routes";
import { getSiteSettings } from "@/sanity/load";

const navSlugs = ["about", "services", "projects", "contact"] as const;

export async function SiteFooter({ language }: { language: Language }) {
  const site = await getSiteSettings();
  const year = new Date().getFullYear();
  const phoneHref = `tel:${site.phone.replace(/\s/g, "")}`;

  return (
    <footer className="site-footer">
      <div className="site-footer__inner mx-auto max-w-[var(--content-max)] px-[var(--gutter-narrow)] md:px-[var(--gutter)]">
        <div className="site-footer__grid">
          <div className="site-footer__brand">
            <Link href={pagePath(language, "")} className="site-footer__logo">
              <img src="/images/logo.jpg" alt="" width={180} height={180} className="site-footer__mark" />
              <span className="site-footer__name">{site.name}</span>
            </Link>
            <p className="site-footer__location">
              {site.city}, {site.country}
            </p>
          </div>

          <div className="site-footer__col">
            <p className="site-footer__label">Navigation</p>
            <nav className="site-footer__nav" aria-label="Footer">
              <Link href={pagePath(language, "")} className="site-footer__link">
                Home
              </Link>
              {navSlugs.map((slug) => {
                const item = pages.find((p) => p.slug === slug);
                if (!item) return null;
                return (
                  <Link key={slug} href={pagePath(language, item.path)} className="site-footer__link">
                    {slug}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="site-footer__col">
            <p className="site-footer__label">Contact</p>
            <div className="site-footer__contact">
              <a href={phoneHref} className="site-footer__link site-footer__link--strong">
                {site.phone}
              </a>
              <a href={`mailto:${site.email}`} className="site-footer__link site-footer__link--strong">
                {site.email}
              </a>
            </div>
          </div>

          <div className="site-footer__col">
            <p className="site-footer__label">Social</p>
            <a
              href={site.facebook}
              className="site-footer__link site-footer__link--strong"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
          </div>
        </div>

        <p className="site-footer__statement">{site.defaultSeo.description}</p>

        <p className="site-footer__signature" aria-hidden="true">
          {site.name}
        </p>

        <div className="site-footer__bar">
          <p className="site-footer__copyright">
            © {year} {site.name}
          </p>
          <Link href={pagePath(language, "privacy")} className="site-footer__link site-footer__link--legal">
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
}
