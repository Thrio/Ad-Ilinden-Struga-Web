import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Document } from "@/components/document";
import { JsonLd } from "@/components/json-ld";
import { getSiteUrl } from "@/lib/site-url";
import { getSiteSettings } from "@/sanity/load";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteSettings();
  return {
    metadataBase: new URL(getSiteUrl()),
    title: { default: site.defaultSeo.title, template: `%s — ${site.name}` },
    description: site.defaultSeo.description,
  };
}

export default async function Layout({ children }: { children: ReactNode }) {
  const site = await getSiteSettings();
  const url = getSiteUrl();
  return (
    <Document lang="mk">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: site.name,
          telephone: site.phone,
          email: site.email,
          url,
          address: { "@type": "PostalAddress", addressLocality: site.city, addressCountry: "MK" },
          sameAs: [site.facebook],
        }}
      />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "WebSite", name: site.name, url }} />
      {children}
    </Document>
  );
}
