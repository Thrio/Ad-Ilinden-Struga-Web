import { defineArrayMember, defineField, defineType } from "sanity";

const alt = defineField({
  name: "alt",
  title: "Alt text",
  type: "string",
  validation: (rule) => rule.required(),
});

function block(name: string, title: string) {
  return defineType({
    name,
    title,
    type: "object",
    fields: [
      defineField({ name: "heading", type: "string", description: "Short heading. Do not invent facts." }),
      defineField({ name: "body", type: "text", rows: 4, description: "Body copy supplied by the client." }),
      defineField({ name: "media", type: "image", options: { hotspot: true }, fields: [alt] }),
      defineField({ name: "ctaLabel", title: "Button label", type: "string" }),
      defineField({ name: "ctaHref", title: "Button link", type: "string" }),
    ],
    preview: {
      select: { title: "heading" },
      prepare: ({ title: heading }) => ({ title: heading || title }),
    },
  });
}

const blocks = [
  ["hero", "Hero"],
  ["intro", "Intro"],
  ["capabilities", "Capabilities"],
  ["scopeStory", "Scope story"],
  ["story", "Story"],
  ["selectedWork", "Selected work"],
  ["close", "Close"],
  ["principles", "Principles"],
  ["serviceSteps", "Service steps"],
  ["threeCards", "Three cards"],
  ["featuredCarousel", "Featured carousel"],
  ["projectList", "Project list"],
  ["enquiry", "Enquiry"],
  ["directContact", "Direct contact"],
].map(([name, title]) => block(name, title));

const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({ name: "title", type: "string", validation: (rule) => rule.max(60) }),
    defineField({ name: "description", type: "text", rows: 3, validation: (rule) => rule.max(155) }),
    defineField({ name: "ogImage", title: "Social image", type: "image", fields: [alt] }),
  ],
});

const page = defineType({
  name: "page",
  title: "Page",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title" }, validation: (rule) => rule.required() }),
    defineField({ name: "language", type: "string", options: { list: ["mk", "en"] }, initialValue: "mk", validation: (rule) => rule.required() }),
    defineField({
      name: "sections",
      type: "array",
      of: blocks.map((item) => defineArrayMember({ type: item.name })),
    }),
    defineField({ name: "seo", type: "seo" }),
  ],
});

const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title" }, validation: (rule) => rule.required() }),
    defineField({ name: "language", type: "string", options: { list: ["mk", "en"] }, initialValue: "mk" }),
    defineField({ name: "summary", type: "text", rows: 3 }),
    defineField({ name: "location", type: "string" }),
    defineField({ name: "year", type: "string" }),
    defineField({ name: "gallery", type: "array", of: [defineArrayMember({ type: "image", fields: [alt] })] }),
    defineField({ name: "seo", type: "seo" }),
  ],
});

const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "phone", type: "string" }),
    defineField({ name: "email", type: "string" }),
    defineField({ name: "city", type: "string" }),
    defineField({ name: "country", type: "string" }),
    defineField({ name: "street", type: "string" }),
    defineField({ name: "hours", type: "string" }),
    defineField({ name: "facebook", type: "url" }),
    defineField({ name: "logo", type: "image", fields: [alt] }),
    defineField({ name: "defaultSeo", title: "Default SEO", type: "seo" }),
  ],
});

export const schemaTypes = [...blocks, seo, page, project, siteSettings];
