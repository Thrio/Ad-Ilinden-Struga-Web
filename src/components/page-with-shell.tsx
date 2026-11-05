import type { ReactNode } from "react";
import { SiteShell } from "@/components/site-shell";
import type { Language } from "@/lib/routes";

export function PageWithShell({ language, onPhoto = false, children }: { language: Language; onPhoto?: boolean; children: ReactNode }) {
  return (
    <SiteShell language={language} onPhoto={onPhoto}>
      {children}
    </SiteShell>
  );
}
