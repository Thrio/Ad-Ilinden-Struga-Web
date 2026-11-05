import { HomePage } from "@/components/home-page";
import { PageWithShell } from "@/components/page-with-shell";
import { metadataFor } from "@/lib/metadata";

export function generateMetadata() {
  return metadataFor("en", "home");
}

export default function Page() {
  return (
    <PageWithShell language="en">
      <HomePage language="en" />
    </PageWithShell>
  );
}
