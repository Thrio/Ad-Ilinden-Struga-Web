export const siteSettingsQuery = `*[_type == "siteSettings"][0]{
  name, phone, email, city, country, street, hours, facebook,
  defaultSeo
}`;

export const pageQuery = `*[_type == "page" && language == $language && slug.current == $slug][0]{
  language, "slug": slug.current, title, seo, sections
}`;

export const projectSlugsQuery = `*[_type == "project" && defined(slug.current)]{
  "slug": slug.current, language
}`;
