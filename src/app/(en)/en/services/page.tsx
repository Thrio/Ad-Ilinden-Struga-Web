import { PageScreen } from "@/components/page-screen";
import { PageWithShell } from "@/components/page-with-shell";
import { metadataFor } from "@/lib/metadata";

export function generateMetadata() {
  return metadataFor("en", "services");
}

export default function Page() {
  return (
    <PageWithShell language="en">
      <PageScreen language="en" slug="services" />
    </PageWithShell>
  );
}
