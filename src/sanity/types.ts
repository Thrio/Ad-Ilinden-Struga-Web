export type Seo = {
  title: string;
  description: string;
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

export type PageDocument = {
  language: "mk" | "en";
  slug: string;
  path: string;
  title: string;
  seo: Seo;
  sections: Array<HeroBlock | { _type: string }>;
};
