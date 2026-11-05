import { PageScreen } from "@/components/page-screen";
import { metadataFor } from "@/lib/metadata";

export function generateMetadata() {
  return metadataFor("mk", "home");
}

export default function Page() {
  return <PageScreen language="mk" slug="home" />;
}
