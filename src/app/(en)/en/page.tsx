import { PageScreen } from "@/components/page-screen";
import { metadataFor } from "@/lib/metadata";

export function generateMetadata() {
  return metadataFor("en", "home");
}

export default function Page() {
  return <PageScreen language="en" slug="home" />;
}
