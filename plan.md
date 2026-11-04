# plan.md — AD Ilinden Struga · cms

| | |
|---|---|
| Template | **3.3** — client facts, decisions and the clone index (process lives in `.cursor/`) |
| Updated | 2026-11-04 |
| Document status | ✅ Draft → ✅ Confirmed → ⬜ In build → ⬜ Pre-ship → ⬜ Launched |

`[REQUIRED]` blocks the next stage. `(default)` = keep unless overridden. `⚠️ CONFIRM WITH CLIENT` = assumed. Missing facts → `[[PENDING: what is needed]]`, never invented.

Commands: `/kickoff` → `/refs` → `/design` → `/scaffold` → `/build` → `/qa` → `/launch` · unsure → `/next` (`AGENTS.md`).

## Project Overview

| Field | Value |
|---|---|
| Layer | cms |
| Client | AD Ilinden Struga |
| Industry (slug in `references/industries/`) | construction-industrial |
| Primary goal (one action) | Get potential clients to make contact |
| Target audience | Private clients and businesses considering construction work |
| Languages (ISO codes) · main | mk, en · main mk |
| Animation level | Medium |
| One-line summary | Premium corporate site for the Struga construction company AD Ilinden Struga: present the firm and its work, and get potential clients to make contact. |
| Characteristic thing this design should express | Trust and precision — a modern, professional construction company. No shop layout, no clip-art mark, no invented statistics. |

## Conversion

At least one channel on. List only the channels that are on. A channel without its data is hidden; a form without an inbox is built but disabled.

| Channel | Detail |
|---|---|
| phone | +389 46 781 902 |
| email | ilindenad@gmail.com |
| form | To ilindenad@gmail.com. Never Sanity. |

WhatsApp, booking, and store visit are off until a number, URL, or street address is supplied. Social link (not a conversion channel): Facebook https://www.facebook.com/adilindenstruga/ — other networks stay hidden. Do not show the follower count or last-post date.

| Field | Value |
|---|---|
| Primary CTA label | Contact us |
| Form destination | ilindenad@gmail.com via Cloudflare `send_email` |

## Regulated products and business customers

| Field | Value |
|---|---|
| Regulated products | none |
| Age gate · legal age | N/A |
| Delivery countries · regulated allowed? | N/A — no shop and no delivery |
| Business customers (B2B) | No shop and no public prices. Enquiries from private clients and businesses. |

## Sitemap & Routes

Layer defaults: landing = Home, Privacy, 404 · multipage/cms = chosen pages + Contact + Privacy + 404 · shop = Home, Shop (grid), Product, Cart, Checkout, Contact, Shipping & returns, Privacy, Terms, 404. Status: `live` · `hidden` · `deferred`.

No service names, project entries, or history are invented. Empty sections stay pending.

| Page | Type | Route | Status | Content source | Visitor action |
|---|---|---|---|---|---|
| Home | Sanity page | `/` | live | Sanity `page` | Make contact |
| About | Sanity page | `/about` | live | Sanity `page` | Read who the company is — copy [[PENDING: about copy]] |
| Services | Sanity page | `/services` | live | Sanity `page` | Read services — list [[PENDING: confirmed services]] |
| Projects | Collection index | `/projects` | live | Sanity `project` | Browse work — entries [[PENDING: confirmed projects]] |
| Project | Collection detail | `/projects/[slug]` | live | Sanity `project` | Read one confirmed project |
| Contact | Sanity page | `/contact` | live | Sanity `page` | Call, email, or send the form |
| Privacy | Sanity page | `/privacy` | live | Sanity `page` | Read the policy — text [[PENDING: privacy policy]] |
| 404 | code-only | — | live | — | Match direction |

## Agreed structure

The page layouts agreed with the client. The reference restyles inside them but never changes an archetype. Conflict → ask once: "Reference uses X, plan agreed Y. Keep Y [default] or switch to X?" and log it in Decisions. Filled at kickoff, confirmed at `/design`.

| Page | Agreed archetype (e.g. "product grid, 3 col desktop / 2 col mobile") | Confirmed at /design |
|---|---|---|
| Home | Corporate hero, company intro, selected work, contact close | ⬜ |
| About | Company profile. No timeline until the client supplies dates. | ⬜ |
| Services | Service list. No items until the client names them. | ⬜ |
| Projects | Project grid, 3 col desktop / 1 col mobile. Card opens the project. | ⬜ |
| Project | One project: summary and gallery. Fields only where the client supplied them. | ⬜ |
| Contact | Phone, email, Facebook link, and enquiry form. No map embed. | ⬜ |
| Privacy | Legal prose page | ⬜ |

## Collection index UX

Projects index: 3 col desktop / 1 col mobile · no filters or sort until the client supplies real categories · no pagination until there are more than 12 confirmed projects · empty state stays empty (no sample projects) and the nav item is hidden when zero projects are published · card shows only fields the client supplied (image, title, and location or year when provided).

## Content model

landing / multipage: typed modules in `src/content/*.ts` (`site.ts` = name, NAP, channels, nav, default SEO; one module per page). cms / shop: Sanity — `page.sections[]` (one block per Blueprint band archetype) + `siteSettings` + `seo` object; confirm before schema code.

| Type / module | Purpose | Key fields |
|---|---|---|
| `siteSettings` | Name, NAP, channels, nav, default SEO | name AD Ilinden Struga · phone +389 46 781 902 · email ilindenad@gmail.com · city Struga · country North Macedonia · street [[PENDING: street address]] · hours [[PENDING: opening hours]] · Facebook URL · logo · nav · default SEO |
| `page` | Home, About, Services, Contact, Privacy | title, slug, `sections[]`, SEO |
| `page.sections[]` | One block per Blueprint band archetype | heading, body, media, CTA — block list fixed at `/design` after the reference pick |
| `project` | Confirmed work only. No seed projects. | title, slug, summary, gallery, location, year — omit any field the client did not supply |
| `seo` | Shared meta | title, description, og image |

## Design System

Expanded by `/design` into `DESIGN.md` + `design/tokens.css` (`@theme`; copied into `src/app/globals.css` at `/scaffold`). A logo gives palette + mark only.

- Brand / logo on hand: none usable. The current mark is outdated clip-art and is not the site logo. Need an SVG or transparent PNG. · Style: premium, modern, professional, trustworthy · Must not look like: a shop, a clip-art brochure, or a page with invented project stats
- Section rhythm: Alternating (default)
- Tokens: primary/accent · surface/text/border · display + body fonts (max 2; Inter/Poppins/Roboto only as a logged clone exception) · radius/shadow — [TBD until /design]

### Asset brief

Single source; `DESIGN.md` explains, never lists. Reference media = internal stand-ins, replaced before any client preview. Missing client photos never block: empty `ImageSlot` + `[[PENDING: photo — <slot>]]`.

- Clone target (name + URL): [REQUIRED after pick]
- Reference grammar kept: [REQUIRED after pick / none]
- Stand-ins (role → `public/_peer/` file → source URL): [after pick / none]
- Icons / cutouts / shapes / illustrations: [REQUIRED after pick]

### Clone exceptions log

A hard lock that yields to a measured reference value. Log here **and** in `DESIGN.md` Decisions, or the lock applies.

| Lock | Reference measured value | Band / page | Date |
|---|---|---|---|
| | | | |

### Clone Blueprint

`#` = the capture's band number for that page (never renumber; dropped bands stay as `dropped`; an approved new band = `<n>a`). Build roots carry `data-band="<#>"`. Pages map reference ↔ build in `research/page-map.json`. Required fields: `clone-fidelity.mdc`.

| Page | # | Band | Archetype | Element map | Type roles | CTA anatomy | Interaction | Motion | Measures (375/1440) | Screenshots | Client content / dropped | Do not invent |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| home | 1 | [REQUIRED after pick] | | L/R/float/bg · layered media | | | scroll / click / hover / time / static | none / reveal / sticky / scrub / hover / load | `research/peers/…/measures/home/band-1.md` | `research/peers/…` | | |

### Motion map

Every Blueprint band, `none` if static, within the Animation level budget (beyond it → simplified, written here as an intended difference).

| Route | # | Motion | What moves (reference) | Trigger | Rebuild (tokens) | State PNGs |
|---|---|---|---|---|---|---|
| `/` | 1 | [REQUIRED after pick] | | | | `research/peers/…/states/` or — |

### Clone build lessons (Blockers on every band — full text: `.cursor/skills/build-page/references/clone-lessons.md`)

| # | Rule |
|---|---|
| L1 | Count header clearance once — never the site spacer plus the full reference padding |
| L2 | Transparent reference section stays transparent; put the page wash on body or wrapper |
| L3 | Match border sides, radius and gap between items exactly, not just "has lines" |
| L4 | Reference width is the content box; gutters go outside it, never on the same node |
| L5 | Copy the reference's height and alignment model; enlarge hit areas without growing the box |
| L6 | Keep a fixed reference box fixed; fit the copy and size the CTA from that band |
| L7 | Live reference computed styles beat old measure notes; fix the notes when they differ |
| L8 | Placement on the page is part of the gate, not only inner width and height |
| L9 | Matching asset checksums mean the bug is structure, paint or placement — stop re-fetching |
| L10 | No band is shown without overlays at 375 and 1440 that were opened and read |
| L11 | Every in-scope route gets measure, build and overlay — never home only |
| L12 | Build only what the Blueprint, DESIGN.md and plan specify; ask once instead of inventing |
| L13 | Rebuild the reference's motion driver within the budget; static is a Blocker when it moves |

## Copy lock

Missing copy renders as `<PendingText lines={n}>` (n from the capture's copy budget) — never lorem, never invented.

| Key | Locked copy |
|---|---|
| `brand.name` | AD Ilinden Struga |
| `nav.primaryCta` | Contact us |
| `home.hero.headline` · `.subline` · `.cta` | [[PENDING: client-approved hero copy]] · [[PENDING: client-approved hero subline]] · Contact us |
| `footer.tagline` | [[PENDING: footer tagline]] |
| `contact.form.submit` | Send message |
| `404.title` | [[PENDING: 404 title in the main language]] |
| `ageGate.question` · `.yes` · `.no` · `.blocked` | N/A |

## Motion contract

Budget by Animation level: `.cursor/rules/design.mdc` → Motion budget (single source). Write the level below; never copy the table here.

| Field | Value |
|---|---|
| Animation level | Medium |
| Reference motion stack observed | [REQUIRED after pick: none / CSS / IntersectionObserver / GSAP / Lenis — note only] |
| Default in-view entrance | **Scroll appear** (below) — change only on the user's explicit ask |
| Reduced motion | Always: final state at once, layout intact |

**Scroll appear** — shared `ScrollReveal` (`src/components/motion/scroll-reveal.tsx`, `motion/react`): content renders **visible** in the static HTML; after mount the reveal arms only for units still below the viewport and only when reduced motion is off · initial `opacity: 0`, `y: var(--motion-reveal-distance)` (~16px) → `opacity: 1`, `y: 0` · `whileInView`, `once: true`, `amount: 0.3` · duration `--motion-reveal-duration` (~0.85s) · ease `--motion-reveal-ease` (cubic-bezier(0.22, 1, 0.36, 1)) · stagger `--motion-reveal-stagger` (~0.07s). Never wrap the first screen. JS values come from `src/lib/motion-tokens.ts`, generated from `design/tokens.css`.

| # | Band / route | What moves | Trigger | Tokens | Evidence (state PNGs) |
|---|---|---|---|---|---|
| 1 | [REQUIRED after pick, per budget] | | scroll into view / scrub / sticky / hover / load | `--motion-reveal-*` | `research/peers/…/states/…` |

## Content checklist

Status: Pending / Requested / Received / Entered / Approved

| Asset | Who | Status |
|---|---|---|
| Logo (SVG or transparent PNG) | Client | Pending — do not use the clip-art mark |
| NAP, hours, social, WhatsApp | Client | Pending — phone, email, city, country, and Facebook URL are in. Street, hours, and WhatsApp are not. |
| Home + page copy | Client | Pending |
| Photos (replace stand-ins; product photos plain or transparent background) | Client | Pending |
| Legal (Privacy; Terms for shop) | Client / lawyer | Pending |
| Image + font licenses | Client / Me | Pending |

## Features

Sticky header + mobile menu always on. Form / call / booking = Conversion.

| Feature | On? | Notes |
|---|---|---|
| Multi-level nav · collection pagination · anchors | ❌ · ❌ · ❌ | Flat nav. Projects show all until more than 12 confirmed entries. |
| Age gate | ❌ | Not regulated |
| Search · draft preview | ❌ default | preview needs the OpenNext path |
| Cookie banner | ❌ unless cookie tracking is added | Cloudflare Web Analytics is cookieless |

## Ops

| Field | Value |
|---|---|
| Domain · GitHub repo | [[PENDING: domain]] · [[PENDING: GitHub remote]] |
| Host (Cloudflare) · CMS (Sanity, cms/shop only) | Cloudflare, not deployed yet · Sanity CMS |
| Sanity project ID · live URL | [[PENDING: Sanity project id when created]] · [[PENDING: live URL]] |
| Form backend | Cloudflare `send_email` → ilindenad@gmail.com |
| Image path | Sanity CDN loader |
| Analytics | (default: Cloudflare Web Analytics) |
| Reference media in production | ❌ never — only with a written license from the rights holder, logged here (client acceptance is not a license) |
| Lighthouse (prod, mobile, median of 3) | [after /deploy] |

## Decisions

Every choice made without a lock: clone pick, competitor check, clone exceptions, reference conflicts, server needs (OpenNext), deploy go-ahead, waivers, cutouts.

| Date | Decision | Why | Who |
|---|---|---|---|
| 2026-11-04 | Ignore `brief/client-questions.docx` and `brief/client-card.md`. Do not read, modify, or delete them. They are Kosova Wine and are not input for this project. Layer is cms for a construction company (AD Ilinden Struga). Facts come only from what the user provides in chat. Do not modify Web Brain or Thrio OS. | User instruction this chat | user |
| 2026-11-04 | Kickoff draft uses only the user's AD Ilinden notes. Research is context, not site copy: zk.mk and club200.mk listing; a Facebook-linked site did not load on 2026-11-03; Google Maps shows no website; Facebook https://www.facebook.com/adilindenstruga/ (417 followers, last visible post 2023-03-07); current logo is outdated clip-art. Do not publish rankings, history, services, projects, certifications, or achievements until the client confirms the wording. | User notes | user |
| 2026-11-04 | Plan confirmed. Languages mk, en (main mk). Animation Medium. Pages: Home, About, Services, Projects, Contact, Privacy, 404. CTA "Contact us"; form to ilindenad@gmail.com; WhatsApp off. Audience: private clients and businesses; no public prices. Street, hours, domain, and logo stay pending. Logo redesign and social-account management stay out of scope. | User replied ok | user |

## Pre-ship gate

- [ ] `node tools/preship-scrub.mjs --audit --launch`, `node tools/copy-check.mjs` → no BLOCKER · `node tools/scan-kit.mjs` → no HIGH · `node tools/check-site.mjs --serve out --launch --pages <all>` → no BLOCKER

| Gate | Done? |
|---|---|
| Every in-scope band: band-check + sheets at 375 and 1440 + "ok" in `PROGRESS.md` | ⬜ |
| L1–L13 and M1–M18 — no open Blockers | ⬜ |
| Motion within budget · reduced motion OK · content visible without JS | ⬜ |
| Copy lock / CTA / NAP consistent sitewide · no `[[PENDING` left (or accepted in writing) | ⬜ |
| Stand-ins replaced · `public/_peer/` deleted · empty `ImageSlot`s accepted | ⬜ |
| Clone exceptions logged in both places | ⬜ |
| Conversion paths and forms tested on production | ⬜ |
| A11y: no serious/critical axe violations | ⬜ |
| Lighthouse floor for the animation level met / waiver logged | ⬜ |
| SEO launch checklist (`seo-site`) | ⬜ |
| Handoff export checked (`preship-scrub --handoff`) | ⬜ |

## Handoff & ownership

The client gets a **new repo** from `node tools/handoff-export.mjs <dir>`: the site only, plus `HANDOFF.md` (accounts, env names, how to edit). Never `research/`, `references/`, `brief/`, kit files or internal notes.

| Asset | Owner after launch | Dev access kept? |
|---|---|---|
| Domain · Cloudflare · GitHub · Sanity · form/analytics | [[PENDING: owner after launch]] | [[PENDING: whether dev access stays]] |

## Out of scope

Unless you expand it: types beyond the Content model · languages beyond Overview · migrating an existing site · search (unless Features) · pro copy/photo/logo · SEO after launch · dark mode · paid typefaces (unless bought).

Also out of this website build unless you expand it: ecommerce (cart, checkout, catalogue) · publishing unverified history, services, projects, certifications, or the zk.mk / club200.mk listing · designing a new logo · opening or running social accounts. The site links the verified Facebook page and uses a logo file you supply.
