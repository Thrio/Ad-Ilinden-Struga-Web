import { PageScreen } from "@/components/page-screen";
import { metadataFor } from "@/lib/metadata";

export function generateMetadata() {
  return metadataFor("mk", "about");
}

export default function Page() {
  return <PageScreen language="mk" slug="about" />;
}
