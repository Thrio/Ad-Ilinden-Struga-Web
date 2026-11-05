import { PageScreen } from "@/components/page-screen";
import { PageWithShell } from "@/components/page-with-shell";
import { metadataFor } from "@/lib/metadata";

export function generateMetadata() {
  return metadataFor("mk", "projects");
}

export default function Page() {
  return (
    <PageWithShell language="mk">
      <PageScreen language="mk" slug="projects" />
    </PageWithShell>
  );
}
