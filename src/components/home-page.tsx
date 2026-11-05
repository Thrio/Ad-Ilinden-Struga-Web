import { HomeHero } from "@/components/blocks/home-hero";
import type { Language } from "@/lib/routes";
import { getPage } from "@/sanity/load";
import type { HeroBlock } from "@/sanity/types";

function heroBlock(sections: Array<HeroBlock | { _type: string }> | undefined): HeroBlock | null {
  const block = sections?.find((section) => section._type === "hero");
  if (!block || !("heading" in block) || !("image" in block)) return null;
  return block;
}

export async function HomePage({ language }: { language: Language }) {
  const page = await getPage(language, "home");
  const hero = heroBlock(page?.sections);
  return (
    <main id="content">
      {hero ? <HomeHero heading={hero.heading} body={hero.body} image={hero.image} /> : null}
    </main>
  );
}
