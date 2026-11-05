"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { contactCtaLabel, navLabel, primaryNavSlugs } from "@/lib/nav";
import { pagePath, pages, type Language } from "@/lib/routes";

const SCROLL_THRESHOLD_PX = 12;

export function SiteHeader({ language, onPhoto = false }: { language: Language; onPhoto?: boolean }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const other = language === "mk" ? "en" : "mk";
  const tone = onPhoto && !scrolled ? "on-photo" : "on-surface";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD_PX);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "site-header fixed inset-x-0 top-0 z-50",
        tone === "on-photo" && "site-header--on-photo",
        scrolled && "site-header--scrolled",
      )}
    >
      <div className="mx-auto flex h-full max-w-[var(--content-max)] items-center justify-between px-[var(--gutter-narrow)] md:px-[var(--gutter)]">
        <Link href={pagePath(language, "")} className="site-header__logo inline-flex items-center gap-[var(--space-8)] whitespace-nowrap text-xs font-semibold uppercase md:text-base">
          <img src="/images/logo.jpg" alt="" width={180} height={180} className="site-header__mark" />
          AD Ilinden Struga
        </Link>
        <nav className="hidden items-center gap-[var(--space-32)] md:flex" aria-label="Primary">
          {primaryNavSlugs.map((slug) => {
            const item = pages.find((p) => p.slug === slug);
            if (!item) return null;
            return (
              <Link key={slug} href={pagePath(language, item.path)} className="site-header__link text-sm font-medium uppercase tracking-[var(--tracking-label)]">
                {navLabel(language, slug)}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-[var(--space-12)]">
          <Link href={pagePath(other, "")} className="site-header__link hidden text-xs uppercase tracking-[var(--tracking-label)] md:inline">
            {other === "mk" ? "MK" : "EN"}
          </Link>
          <Link
            href={pagePath(language, "contact")}
            className="site-header__cta site-header__cta--bar inline-flex min-h-[var(--space-48)] items-center px-[var(--space-20)] text-sm font-semibold"
          >
            {contactCtaLabel(language)}
          </Link>
          <button
            type="button"
            className="site-header__menu inline-flex min-h-[var(--space-48)] min-w-[var(--space-48)] items-center justify-center md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            Menu
          </button>
        </div>
      </div>
      {open ? (
        <nav
          id="mobile-nav"
          className="site-header__panel fixed inset-y-0 right-0 z-50 flex w-[93%] flex-col gap-[var(--space-24)] p-[var(--space-24)] md:hidden"
          style={{ transitionDuration: "var(--motion-menu-duration)" }}
        >
          {primaryNavSlugs.map((slug) => {
            const item = pages.find((p) => p.slug === slug);
            if (!item) return null;
            return (
              <Link key={slug} href={pagePath(language, item.path)} className="text-lg font-medium uppercase" onClick={() => setOpen(false)}>
                {navLabel(language, slug)}
              </Link>
            );
          })}
          <Link href={pagePath(other, "")} onClick={() => setOpen(false)}>
            {other === "mk" ? "MK" : "EN"}
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
