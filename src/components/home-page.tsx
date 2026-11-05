import { HomeHero } from "@/components/blocks/home-hero";
import { HomeIntro } from "@/components/blocks/home-intro";
import { HomeBleedTransition } from "@/components/blocks/home-bleed-transition";
import { HomeSequence } from "@/components/blocks/home-sequence";
import type { Language } from "@/lib/routes";
import { getPage } from "@/sanity/load";
import type { HeroBlock, IntroBlock } from "@/sanity/types";

function heroBlock(sections: Array<HeroBlock | IntroBlock | { _type: string }> | undefined): HeroBlock | null {
  const block = sections?.find((section) => section._type === "hero");
  if (!block || !("heading" in block) || !("image" in block)) return null;
  return block;
}

function introBlock(sections: Array<HeroBlock | IntroBlock | { _type: string }> | undefined): IntroBlock | null {
  const block = sections?.find((section) => section._type === "intro");
  if (!block || !("heading" in block) || !("body" in block)) return null;
  return block as IntroBlock;
}

export async function HomePage({ language }: { language: Language }) {
  const page = await getPage(language, "home");
  const hero = heroBlock(page?.sections);
  const intro = introBlock(page?.sections);
  return (
    <main id="content">
      {hero ? <HomeHero heading={hero.heading} body={hero.body} image={hero.image} /> : null}
      <HomeIntro heading={intro?.heading} body={intro?.body} />
      <HomeSequence language={language} />
      <HomeBleedTransition />
    </main>
  );
}
