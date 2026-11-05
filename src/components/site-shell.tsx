import type { ReactNode } from "react";
import { SiteFooter } from "@/components/blocks/site-footer";
import { SiteHeader } from "@/components/blocks/site-header";
import type { Language } from "@/lib/routes";

export function SiteShell({ language, children, onPhoto = false }: { language: Language; children: ReactNode; onPhoto?: boolean }) {
  return (
    <>
      <SiteHeader language={language} onPhoto={onPhoto} />
      <div className="site-main">{children}</div>
      <SiteFooter language={language} />
    </>
  );
}
