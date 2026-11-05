import type { Language } from "@/lib/routes";
import { getSiteSettings } from "@/sanity/load";

const copy = {
  mk: {
    introLive: "Испратете порака.",
    introSoon: (phone: string, email: string) =>
      `Формата наскоро ќе биде активна — во меѓувреме јавете се на ${phone} или ${email}.`,
    name: "Име",
    email: "Е-пошта",
    message: "Порака",
    company: "Компанија",
    submit: "Испрати",
  },
  en: {
    introLive: "Send a message.",
    introSoon: (phone: string, email: string) =>
      `Form opens soon — in the meantime, call or write to ${phone} or ${email}.`,
    name: "Name",
    email: "Email",
    message: "Message",
    company: "Company",
    submit: "Send message",
  },
} as const;

export async function ContactForm({ language }: { language: Language }) {
  const site = await getSiteSettings();
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const t = copy[language];
  return (
    <form className="inner-page__form" aria-live="polite" action="/api/contact" method="post">
      <p className="inner-page__form-intro">
        {siteKey ? t.introLive : t.introSoon(site.phone, site.email)}
      </p>
      <fieldset disabled={!siteKey}>
        <label>
          {t.name}
          <input name="name" autoComplete="name" required={Boolean(siteKey)} />
        </label>
        <label>
          {t.email}
          <input name="email" type="email" autoComplete="email" required={Boolean(siteKey)} />
        </label>
        <label>
          {t.message}
          <textarea name="message" required={Boolean(siteKey)} />
        </label>
        <label hidden>
          {t.company}
          <input name="company_name" tabIndex={-1} autoComplete="off" />
        </label>
        <button type="submit">{t.submit}</button>
      </fieldset>
      <p className="inner-page__form-meta">
        <a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a>
        {" · "}
        <a href={`mailto:${site.email}`}>{site.email}</a>
      </p>
    </form>
  );
}
