import { Document } from "@/components/document";
import { PendingText } from "@/components/ui/pending-text";

export default function GlobalNotFound() {
  return (
    <Document lang="mk">
      <main id="content">
        <PendingText lines={1} as="h1">
          404 title in the main language
        </PendingText>
      </main>
    </Document>
  );
}
