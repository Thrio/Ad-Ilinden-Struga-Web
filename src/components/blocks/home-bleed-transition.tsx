"use client";

import { ScrollReveal } from "@/components/motion/scroll-reveal";

/** METRIC home band 10 close plate (comp stand-in). Replace with client photo before launch. */
const IMAGE = {
  src: "/images/home-bleed-transition.webp",
  width: 1600,
  height: 1033,
} as const;

export function HomeBleedTransition() {
  return (
    <section data-band="2b" className="home-bleed-transition" aria-label="Construction showcase">
      <ScrollReveal className="home-bleed-transition__reveal">
        <div className="home-bleed-transition__frame">
          <img
            src={IMAGE.src}
            alt=""
            width={IMAGE.width}
            height={IMAGE.height}
            className="home-bleed-transition__photo"
            draggable={false}
          />
        </div>
      </ScrollReveal>
    </section>
  );
}
