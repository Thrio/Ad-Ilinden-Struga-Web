import { getSiteSettings } from "@/sanity/load";

export async function ContactForm() {
  const site = await getSiteSettings();
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  return (
    <form aria-live="polite" action="/api/contact" method="post">
      <p>
        {siteKey
          ? "Send a message."
          : `Form opens soon — call or write to ${site.phone} or ${site.email}`}
      </p>
      <fieldset disabled={!siteKey}>
        <label>
          Name
          <input name="name" autoComplete="name" required={Boolean(siteKey)} />
        </label>
        <label>
          Email
          <input name="email" type="email" autoComplete="email" required={Boolean(siteKey)} />
        </label>
        <label>
          Message
          <textarea name="message" required={Boolean(siteKey)} />
        </label>
        <label hidden>
          Company
          <input name="company_name" tabIndex={-1} autoComplete="off" />
        </label>
        <button type="submit">Send message</button>
      </fieldset>
      <p>
        <a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a>
        {" · "}
        <a href={`mailto:${site.email}`}>{site.email}</a>
      </p>
    </form>
  );
}
