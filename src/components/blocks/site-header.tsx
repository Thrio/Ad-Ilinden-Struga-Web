"use client";

import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { pagePath, pages, type Language } from "@/lib/routes";

const navSlugs = ["about", "services", "projects", "contact"] as const;

export function SiteHeader({ language, onPhoto = false }: { language: Language; onPhoto?: boolean }) {
  const [open, setOpen] = useState(false);
  const other = language === "mk" ? "en" : "mk";
  const tone = onPhoto ? "on-photo" : "on-surface";

  return (
    <header className={cn("site-header fixed inset-x-0 top-0 z-50", tone === "on-photo" && "site-header--on-photo")}>
      <div className="mx-auto flex h-full max-w-[var(--content-max)] items-center justify-between px-[var(--gutter-narrow)] md:px-[var(--gutter)]">
        <Link href={pagePath(language, "")} className="site-header__logo whitespace-nowrap text-xs font-semibold uppercase md:text-base">
          AD Ilinden Struga
        </Link>
        <nav className="hidden items-center gap-[var(--space-32)] md:flex" aria-label="Primary">
          {navSlugs.map((slug) => {
            const item = pages.find((p) => p.slug === slug);
            if (!item) return null;
            return (
              <Link key={slug} href={pagePath(language, item.path)} className="site-header__link text-sm font-medium uppercase tracking-[var(--tracking-label)]">
                {slug}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-[var(--space-12)]">
          <Link href={pagePath(other, "")} className="site-header__link hidden text-xs uppercase tracking-[var(--tracking-label)] md:inline">
            {other}
          </Link>
          <Link
            href={pagePath(language, "contact")}
            className="site-header__cta site-header__cta--bar inline-flex min-h-[var(--space-48)] items-center px-[var(--space-20)] text-sm font-semibold"
          >
            Contact us
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
          {navSlugs.map((slug) => {
            const item = pages.find((p) => p.slug === slug);
            if (!item) return null;
            return (
              <Link key={slug} href={pagePath(language, item.path)} className="text-lg font-medium uppercase" onClick={() => setOpen(false)}>
                {slug}
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
