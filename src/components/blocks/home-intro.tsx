import { ImageSlot } from "@/components/ui/image-slot";
import { PendingText } from "@/components/ui/pending-text";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

export function HomeIntro() {
  return (
    <section data-band="2" className="home-intro">
      <ScrollReveal className="home-intro__inner mx-auto flex w-full max-w-[var(--content-max)] flex-col gap-[var(--space-64)]">
        <div className="home-intro__copy">
          <PendingText lines={2} as="h3" className="home-intro__heading">
            headline
          </PendingText>
          <PendingText lines={3} as="p" className="home-intro__body">
            intro body
          </PendingText>
        </div>
        <div className="home-intro__media">
          <div className="home-intro__frame">
            <ImageSlot fill className="home-intro__photo h-full w-full" />
          </div>
          <div className="home-intro__frame">
            <ImageSlot fill className="home-intro__photo h-full w-full" />
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
