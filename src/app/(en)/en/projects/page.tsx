import { PageScreen } from "@/components/page-screen";
import { PageWithShell } from "@/components/page-with-shell";
import { metadataFor } from "@/lib/metadata";

export function generateMetadata() {
  return metadataFor("en", "projects");
}

export default function Page() {
  return (
    <PageWithShell language="en">
      <PageScreen language="en" slug="projects" />
    </PageWithShell>
  );
}
