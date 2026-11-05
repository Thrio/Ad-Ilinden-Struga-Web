export type Seo = {
  title: string;
  description: string;
};

/** Short presentational copy for pages not fully built yet. */
export type PageStub = {
  lead: string;
  paragraph: string;
  note?: string;
};

export type SiteSettings = {
  name: string;
  phone: string;
  email: string;
  city: string;
  country: string;
  street: string | null;
  hours: string | null;
  facebook: string;
  defaultSeo: Seo;
};

export type HeroBlock = {
  _type: "hero";
  heading: string;
  body: string;
  image: { src: string; alt: string };
};

export type IntroBlock = {
  _type: "intro";
  heading: string;
  body: string;
};

export type PageDocument = {
  language: "mk" | "en";
  slug: string;
  path: string;
  title: string;
  seo: Seo;
  stub?: PageStub;
  sections: Array<HeroBlock | IntroBlock | { _type: string }>;
};
