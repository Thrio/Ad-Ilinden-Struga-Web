import { contactSchema } from "./lib/contact-schema";

type Env = {
  ASSETS: { fetch(request: Request): Promise<Response> };
  EMAIL: { send(message: { to: string; from: string; subject: string; text: string }): Promise<void> };
  FORM_LIMIT: { limit(options: { key: string }): Promise<{ success: boolean }> };
  TURNSTILE_SECRET_KEY?: string;
  FORM_TO_ADDRESS?: string;
  FORM_FROM_ADDRESS?: string;
};

const securityHeaders: Record<string, string> = {
  "Content-Security-Policy":
    "default-src 'self'; script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com https://static.cloudflareinsights.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://cdn.sanity.io; font-src 'self'; connect-src 'self' https://cloudflareinsights.com; frame-src https://challenges.cloudflare.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
};

function json(body: unknown, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", ...securityHeaders },
  });
}

async function readForm(request: Request) {
  const contentType = request.headers.get("content-type") || "";
  if (contentType.includes("application/json")) return request.json();
  const form = await request.formData();
  return Object.fromEntries(form.entries());
}

async function handleContact(request: Request, env: Env) {
  const raw = await readForm(request).catch(() => null);
  const record = raw && typeof raw === "object" ? (raw as Record<string, unknown>) : null;
  if (record && String(record.company_name ?? "").trim()) return json({ ok: true }, 200);

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) return json({ ok: false }, 400);
  const data = parsed.data;
  if (Date.now() - data.rendered_at < 3000) return json({ ok: true }, 200);

  const ip = request.headers.get("cf-connecting-ip") || "unknown";
  const limit = await env.FORM_LIMIT.limit({ key: ip });
  if (!limit.success) return json({ ok: false }, 429);

  if (!env.TURNSTILE_SECRET_KEY || !data.turnstileToken) return json({ ok: false }, 503);
  const verify = new FormData();
  verify.set("secret", env.TURNSTILE_SECRET_KEY);
  verify.set("response", data.turnstileToken);
  verify.set("remoteip", ip);
  const checked = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body: verify });
  const verdict = (await checked.json()) as { success?: boolean };
  if (!verdict.success) return json({ ok: false }, 400);

  if (!env.FORM_TO_ADDRESS || !env.FORM_FROM_ADDRESS) return json({ ok: false }, 503);
  await env.EMAIL.send({
    to: env.FORM_TO_ADDRESS,
    from: env.FORM_FROM_ADDRESS,
    subject: `Message from ${data.name}`,
    text: `${data.name} <${data.email}>\n\n${data.message}`,
  });
  return json({ ok: true }, 200);
}

const worker = {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (request.method === "POST" && url.pathname === "/api/contact") return handleContact(request, env);
    return env.ASSETS.fetch(request);
  },
};

export default worker;
