import { PendingText } from "@/components/ui/pending-text";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

export function HomeIntro({ heading, body }: { heading?: string; body?: string }) {
  return (
    <section data-band="2" className="home-intro">
      <ScrollReveal className="home-intro__inner mx-auto flex w-full max-w-[var(--content-max)] flex-col gap-[var(--space-64)]">
        <div className="home-intro__copy">
          {heading ? (
            <h3 className="home-intro__heading">{heading}</h3>
          ) : (
            <PendingText lines={2} as="h3" className="home-intro__heading">
              headline
            </PendingText>
          )}
          {body ? (
            <p className="home-intro__body">{body}</p>
          ) : (
            <PendingText lines={3} as="p" className="home-intro__body">
              intro body
            </PendingText>
          )}
        </div>
        <div className="home-intro__media">
          <div className="home-intro__frame">
            <img
              src="/images/home-intro-primary.jpg"
              alt=""
              width={1600}
              height={1200}
              className="home-intro__photo block h-full w-full object-cover"
              draggable={false}
            />
          </div>
          <div className="home-intro__frame">
            <img
              src="/images/home-intro-secondary.jpg"
              alt=""
              width={1600}
              height={1200}
              className="home-intro__photo block h-full w-full object-cover"
              draggable={false}
            />
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
