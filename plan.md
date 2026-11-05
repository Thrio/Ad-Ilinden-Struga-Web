# plan.md — AD Ilinden Struga · cms

| | |
|---|---|
| Template | **3.3** — client facts, decisions and the clone index (process lives in `.cursor/`) |
| Updated | 2026-11-05 |
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
| Home | Still full-bleed hero (not the reference scrub), intro split, capability accordions, pinned image story, selected-work carousel, contact close. Logo row, statistics, quotes, and careers dropped. | ✅ |
| About | Still photo hero, story split, pinned numbered cards, contact close. Values, team grid, and careers dropped until the client supplies them. | ✅ |
| Services | Still photo hero, numbered service steps, three text cards. No service names until the client supplies them. | ✅ |
| Projects | Still photo hero, featured carousel, then a one-column list with a thumbnail. Not a 3-column grid. | ✅ |
| Project | No reference page captured. Summary and gallery, only fields the client supplies. | ✅ |
| Contact | Photo with an overlapping enquiry card, then phone and email rows. No map embed. Street address stays pending. | ✅ |
| Privacy | Legal prose page. No reference page. | ✅ |

## Collection index UX

Projects index follows the reference: a featured carousel, then one row per project (title, place, category, thumbnail) · filters stay hidden until the client supplies real categories · pagination only when confirmed projects exceed one page · empty state stays empty and the nav item is hidden when zero projects are published · a row opens the project · no sample projects.

## Content model

landing / multipage: typed modules in `src/content/*.ts` (`site.ts` = name, NAP, channels, nav, default SEO; one module per page). cms / shop: Sanity — `page.sections[]` (one block per Blueprint band archetype) + `siteSettings` + `seo` object; confirm before schema code.

| Type / module | Purpose | Key fields |
|---|---|---|
| `siteSettings` | Name, NAP, channels, nav, default SEO | name AD Ilinden Struga · phone +389 46 781 902 · email ilindenad@gmail.com · city Struga · country North Macedonia · street [[PENDING: street address]] · hours [[PENDING: opening hours]] · Facebook URL · logo · nav · default SEO |
| `page` | Home, About, Services, Contact, Privacy | title, slug, `sections[]`, SEO |
| `page.sections[]` | One block per Blueprint band archetype | heading, body, media, CTA. Kept blocks: hero, intro, capabilities, scope story, story (figures omitted), selected work, close, principles, service steps, three cards, featured carousel, project list, enquiry card, direct contact. Logo row, quotes, careers, values, and team stay dropped |
| `project` | Confirmed work only. No seed projects. | title, slug, summary, gallery, location, year — omit any field the client did not supply |
| `seo` | Shared meta | title, description, og image |

## Design System

Expanded by `/design` into `DESIGN.md` + `design/tokens.css` (`@theme`; copied into `src/app/globals.css` at `/scaffold`). A logo gives palette + mark only.

- Brand / logo on hand: none usable. The current mark is outdated clip-art and is not the site logo. Need an SVG or transparent PNG. · Style: premium, modern, professional, trustworthy · Must not look like: a shop, a clip-art brochure, or a page with invented project stats
- Section rhythm: Alternating (default)
- Tokens: limestone ground dominant, off-white photo plates, iron and dark brown as accents only (~70/20/10) · League Spartan + Schibsted Grotesk (OFL stand-ins, max 2) · pill radius, photo 8px, no shadow — `design/tokens.css`. Palette, type, and the home 10 sample approved 2026-11-05

### Asset brief

Single source; `DESIGN.md` explains, never lists. Reference media = internal stand-ins, replaced before any client preview. Missing client photos never block: empty `ImageSlot` + `[[PENDING: photo — <slot>]]`.

- Clone target (name + URL): METRIC — https://www.metriccivil.ca/
- Reference grammar kept: warm off-white ground, full-bleed photo heroes, oversized uppercase headlines, one solid pill button, rounded photos, pinned image stories, a work carousel, a project list with thumbnails. Their name, text, photos, logos, people, and colours are not our brand.
- Stand-ins (role → `public/_peer/` file → source URL): none. Their images were not downloaded.
- Icons / cutouts / shapes / illustrations: Lucide for the phone, place, and arrow icons. No cutouts. The home hero's line drawing is not reused.

### Clone exceptions log

A hard lock that yields to a measured reference value. Log here **and** in `DESIGN.md` Decisions, or the lock applies.

| Lock | Reference measured value | Band / page | Date |
|---|---|---|---|
| Home hero scrub is not rebuilt | The reference clips a full-bleed photograph into a matching line drawing while the page scrolls, with a background video and a play control | home 1 | 2026-11-05 |

### Clone Blueprint

`#` = the capture's band number for that page (never renumber; dropped bands stay as `dropped`; an approved new band = `<n>a`). Build roots carry `data-band="<#>"`. Pages map reference ↔ build in `research/page-map.json`. Required fields: `clone-fidelity.mdc`.

| Page | # | Band | Archetype | Element map | Type roles | CTA anatomy | Interaction | Motion | Measures (375/1440) | Screenshots | Client content / dropped | Do not invent |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| home | 1 | Hero | Full-bleed media, centered headline | bg photo · centered type · small media control | Display uppercase, centered. Subline under it. | none in the hero | scroll | reference scrub/parallax — not rebuilt | `research/peers/metric/measures/home/band-1.md` | `research/peers/metric/pages/home/band-1-*.png` | pending hero copy · still photo later | Do not rebuild the photo-to-line-drawing scrub, the background video, or the play control |
| home | 2 | Intro | Split headline and two photos | L headline · R paragraph · two photos below | Display uppercase left. Body 20px right. | none | scroll | reveal | `research/peers/metric/measures/home/band-2.md` | `research/peers/metric/pages/home/band-2-*.png` | pending copy and photos | Do not use their headline or photos |
| home | 3 | Logo row | Centered label and a logo strip | centered label · row of marks | Small uppercase label | none | static | none | `research/peers/metric/measures/home/band-3.md` | `research/peers/metric/pages/home/band-3-*.png` | dropped — no client logos | Do not use their client marks |
| home | 4 | Capabilities | Photo with four expanding labels | bg photo · type bottom left · four pills | Display on the photo. Pill labels uppercase. | pill expands on click | scroll + click | reveal | `research/peers/metric/measures/home/band-4.md` | `research/peers/metric/pages/home/band-4-*.png` | labels pending until services are named | Do not invent the four labels |
| home | 5 | Scope story | Pinned images beside a step | heading · images travel · step text | Display heading. Step title and a short body. | none | scroll | sticky/pin | `research/peers/metric/measures/home/band-5.md` | `research/peers/metric/states/home/sweep-1440-014.jpg` | step names pending | Do not invent service steps. On 375 the band is short, not the tall pin |
| home | 6 | Story and figures | Split headline, photo, four figures | L/R headlines · photo · figure row | Display split around the photo. Figure plus caption. | text button, dropped with careers | scroll | small scrub | `research/peers/metric/measures/home/band-6.md` | `research/peers/metric/pages/home/band-6-1440.png` | figures dropped · story copy pending | Do not invent counts, years, or rates |
| home | 7 | Selected work | Carousel, center card open | heading · side images · center card | Display heading. Card title, place, short body. | pill "See all" and arrow controls · text link on the card | scroll + click | reveal | `research/peers/metric/measures/home/band-7.md` | `research/peers/metric/pages/home/band-7-1440.png` | hidden until a real project exists | Do not seed their projects |
| home | 8 | Quotes | Quote cards in a row | heading · cards | Display heading. Quote, name, role. | none | scroll | reveal | `research/peers/metric/measures/home/band-8.md` | `research/peers/metric/pages/home/band-8-1440.png` | dropped until real quotes | Do not copy their quotes or names |
| home | 9 | Careers | Text beside a stacked video | L copy · R stacked frames | Display headline | pill, careers | scroll | scrub/parallax | `research/peers/metric/measures/home/band-9.md` | `research/peers/metric/pages/home/band-9-1440.png` | dropped — careers are out of scope | Do not add a careers page or their video |
| home | 10 | Close | Full-bleed photo and one button | bg photo · centered type · one pill | Display centered. Short subline. | one solid pill, Contact us. The second button is dropped. | scroll | reveal | `research/peers/metric/measures/home/band-10.md` | `research/peers/metric/pages/home/band-10-1440.png` | pending close copy | Do not use their slogan or a join-team button |
| about | 1 | Hero | Full-bleed photo, centered headline | bg photo · centered type | Display uppercase | none | static | none | `research/peers/metric/measures/about/band-1.md` | `research/peers/metric/pages/about/first-screen-1440.png` | pending copy | This hero is static. Do not add the home scrub. |
| about | 2 | Story | Photo and copy | L photo · R paragraphs · pill | Display heading. Body. | one pill | scroll | reveal | `research/peers/metric/measures/about/band-2.md` | `research/peers/metric/pages/about/band-2-1440.png` | pending. No invented history. | Do not write a founding story |
| about | 3 | Principles | Pinned numbered cards | heading · two cards advance | Display on each card | none | scroll | sticky/pin | `research/peers/metric/measures/about/band-3.md` | `research/peers/metric/pages/about/band-3-1440.png` | card copy pending | Do not invent principles |
| about | 4 | Values | A row of large words | words in a line, edges clipped | Display uppercase | none | scroll | reveal | `research/peers/metric/measures/about/band-4.md` | `research/peers/metric/pages/about/band-4-1440.png` | dropped until the client names the words | Do not invent values |
| about | 5 | Team | Portrait grid | heading · 4-col cards | Name and role under a photo | pill, dropped with careers | scroll | reveal | `research/peers/metric/measures/about/band-5.md` | `research/peers/metric/pages/about/band-5-1440.png` | dropped — no staff photos | Do not use their people |
| about | 6 | Two stories | Alternating photo and copy | photo and text swap sides | Display and body | careers pill dropped | scroll | small scrub | `research/peers/metric/measures/about/band-6.md` | `research/peers/metric/pages/about/band-6-1440.png` | careers half dropped · other half pending | Do not invent community claims |
| about | 7 | Close | Same close band as home 10 | bg photo · centered type · one pill | Display centered | Contact us | scroll | reveal | `research/peers/metric/measures/about/band-7.md` | `research/peers/metric/pages/about/band-7-1440.png` | pending close copy | Do not use their slogan |
| services | 1 | Hero | Full-bleed photo, headline low | bg photo · type bottom left | Display and a short subline | none | static | none | `research/peers/metric/measures/services/band-1.md` | `research/peers/metric/pages/services/first-screen-1440.png` | pending copy | Static hero. Do not add the home scrub. |
| services | 2 | Service steps | Numbered rail and a photo | rail across the top · L text · R photo | Index, display name, body | pill to a project, hidden until a project exists | scroll + click | small scrub | `research/peers/metric/measures/services/band-2.md` | `research/peers/metric/pages/services/band-2-1440.png` | steps pending | Do not invent service names. Scroll frames stayed on step 01, so the step change is a click. |
| services | 3 | Three cards | Heading and three cards | heading · 3 cards | Display heading. Card title and body. | none | scroll | small scrub | `research/peers/metric/measures/services/band-3.md` | `research/peers/metric/pages/services/band-3-1440.png` | copy pending | Do not invent the three statements |
| projects | 1 | Hero | Full-bleed photo, type at the left | bg photo · L type · two pills | Display and body | two pills: featured, and all projects | static | none | `research/peers/metric/measures/projects/band-1.md` | `research/peers/metric/pages/projects/first-screen-1440.png` | pending copy | Static hero. Do not add the home scrub. |
| projects | 2 | Featured | Image carousel | heading · cards peek off the right · arrows | Title, place, category on the photo | arrow controls | scroll + click | reveal | `research/peers/metric/measures/projects/band-2.md` | `research/peers/metric/pages/projects/band-2-1440.png` | hidden until a real project exists | Do not seed their projects |
| projects | 3 | Project list | Rows, not a 3-column grid | filters · row · thumbnail at the right | Title, place, category pill | row is the link | scroll + click | reveal | `research/peers/metric/measures/projects/band-3.md` | `research/peers/metric/pages/projects/band-3-1440.png` | filters hidden · rows pending | Do not invent categories or projects |
| projects | 4 | Close | Same close band | bg photo · one pill | Display centered | Contact us | scroll | reveal | `research/peers/metric/measures/projects/band-4.md` | `research/peers/metric/pages/projects/band-4-1440.png` | pending close copy | Do not use their slogan |
| contact | 1 | Enquiry | Photo with a form card | bg photo · cream card overlapping | Display on the photo. Form labels. | submit pill | static | none | `research/peers/metric/measures/contact/band-1.md` | `research/peers/metric/pages/contact/first-screen-1440.png` | form to ilindenad@gmail.com | Do not copy their bid wording |
| contact | 2 | Direct contact | Rows for phone and email | icon · label · detail · value | Row label and the value | phone and email links | scroll | reveal | `research/peers/metric/measures/contact/band-2.md` | `research/peers/metric/pages/contact/band-2-1440.png` | phone and email in · address pending | Do not invent a street or hours |

### Motion map

Every Blueprint band, `none` if static, within the Animation level budget (beyond it → simplified, written here as an intended difference).

| Route | # | Motion | What moves (reference) | Trigger | Rebuild (tokens) | State PNGs |
|---|---|---|---|---|---|---|
| `/` | 1 | none — hero scrub excluded | Photograph clips upward into a line drawing of the same scene. Background video. | scroll | Confirmed: still full-bleed image. Headline visible immediately. No video scrub and no line drawing. | `research/peers/metric/states/home/sweep-1440-001.jpg` to `004.jpg` |
| `/` | 2 | reveal | Block fades in | scroll into view | Scroll appear, once | `research/peers/metric/states/home/band-2-1440-after.png` |
| `/` | 3 | none | Logo set changes between frames; the probe recorded no transform | — | dropped | `research/peers/metric/states/home/sweep-1440-008.jpg` |
| `/` | 4 | reveal | Block fades in. Four labels expand on click. | scroll, then click | Scroll appear. Click opens one label. | `research/peers/metric/states/home/band-4-1440-after.png` |
| `/` | 5 | sticky/pin | Images travel on the cream field. The step changes from 01 to 02 while the heading holds. | scroll | Rebuild the pin. This is the signature sticky moment. At 375 it is a short stack, not the tall pin. | `research/peers/metric/states/home/sweep-1440-014.jpg`, `017.jpg` |
| `/` | 6 | small scrub | A child shifts about 56px inside the band | scroll | Keep the small shift. Do not show figures. | `research/peers/metric/states/home/band-6-1440-after.png` |
| `/` | 7 | reveal | Carousel fades in. Arrows move it. | scroll, then click | Scroll appear plus click arrows | `research/peers/metric/pages/home/band-7-1440.png` |
| `/` | 8 | reveal | Quote row fades in | scroll | dropped | `research/peers/metric/pages/home/band-8-1440.png` |
| `/` | 9 | scrub/parallax | Stacked frames shift about 37px | scroll | dropped | `research/peers/metric/pages/home/band-9-1440.png` |
| `/` | 10 | reveal | Close band fades in | scroll | Scroll appear. Not on the first screen. | `research/peers/metric/pages/home/band-10-1440.png` |
| `/about` | 1 | none | Hero does not move while scrolling | static | Still photo. No home-hero scrub. | `research/peers/metric/pages/about/first-screen-1440.png` |
| `/about` | 2 | reveal | Story fades in | scroll | Scroll appear | `research/peers/metric/states/about/band-2-1440-before.png` |
| `/about` | 3 | sticky/pin | A child stays put for about 271px of scroll. The band is 3600px tall at 1440. | scroll | Rebuild the pin. Second sticky moment, kept because the non-hero motion is to be followed closely. | `research/peers/metric/pages/about/band-3-1440.png` |
| `/about` | 4 | reveal | Word row fades in | scroll | dropped | `research/peers/metric/pages/about/band-4-1440.png` |
| `/about` | 5 | reveal | Team grid fades in | scroll | dropped | `research/peers/metric/pages/about/band-5-1440.png` |
| `/about` | 6 | small scrub | A child shifts about 94px | scroll | Careers half dropped. Remaining story may keep the small shift. | `research/peers/metric/pages/about/band-6-1440.png` |
| `/about` | 7 | reveal | Close band fades in | scroll | Scroll appear | `research/peers/metric/pages/about/band-7-1440.png` |
| `/services` | 1 | none | Hero does not move | static | Still photo | `research/peers/metric/pages/services/first-screen-1440.png` |
| `/services` | 2 | small scrub | A child shifts about 46px. Eight click candidates. Opened frames stayed on step 01. | scroll + click | Small shift. Step change on click, not a second pinned story. | `research/peers/metric/states/services/sweep-1440-005.jpg` |
| `/services` | 3 | small scrub | A child shifts about 47px | scroll | Small shift on the card group | `research/peers/metric/pages/services/band-3-1440.png` |
| `/projects` | 1 | none | Hero does not move | static | Still photo | `research/peers/metric/pages/projects/first-screen-1440.png` |
| `/projects` | 2 | reveal | Featured carousel fades in. Arrows move it. | scroll, then click | Scroll appear plus click arrows | `research/peers/metric/pages/projects/band-2-1440.png` |
| `/projects` | 3 | reveal | List fades in. A row is a link. | scroll + click | Scroll appear | `research/peers/metric/pages/projects/band-3-1440.png` |
| `/projects` | 4 | reveal | Close band fades in | scroll | Scroll appear | `research/peers/metric/pages/projects/band-4-1440.png` |
| `/contact` | 1 | none | Form card does not move | static | Still photo behind the card | `research/peers/metric/pages/contact/first-screen-1440.png` |
| `/contact` | 2 | reveal | Contact rows fade in | scroll | Scroll appear | `research/peers/metric/pages/contact/band-2-1440.png` |

Header: fixed. Light type on photographs, dark type on the cream ground. The reference pill is a careers link; ours is Contact us. Mobile menu covers about 93% of the width and opens over 0.6s ease. Measured UI transitions are 0.3s ease (66 of them). Pinned sections are tied to scroll position, not to a duration. Reduced motion shows the final state at once.

Chrome is shared. The reference stack is GSAP 3.15, ScrollTrigger, Lenis, and Swiper. Rebuild with `motion` and the kit scroll reveal. Do not paste their script. Cloneability in the report is medium.

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
| Reference motion stack observed | GSAP 3.15, ScrollTrigger, Lenis, Swiper — note only. Rebuild with `motion`, not their script. |
| Default in-view entrance | **Scroll appear** (below) — change only on the user's explicit ask |
| Reduced motion | Always: final state at once, layout intact |

**Scroll appear** — shared `ScrollReveal` (`src/components/motion/scroll-reveal.tsx`, `motion/react`): content renders **visible** in the static HTML; after mount the reveal arms only for units still below the viewport and only when reduced motion is off · initial `opacity: 0`, `y: var(--motion-reveal-distance)` (~16px) → `opacity: 1`, `y: 0` · `whileInView`, `once: true`, `amount: 0.3` · duration `--motion-reveal-duration` (~0.85s) · ease `--motion-reveal-ease` (cubic-bezier(0.22, 1, 0.36, 1)) · stagger `--motion-reveal-stagger` (~0.07s). Never wrap the first screen. JS values come from `src/lib/motion-tokens.ts`, generated from `design/tokens.css`.

| # | Band / route | What moves | Trigger | Tokens | Evidence (state PNGs) |
|---|---|---|---|---|---|
| 1 | home 5 scope story | Images travel and the step label changes | scroll position | pin, not `--motion-reveal-*` | `research/peers/metric/states/home/sweep-1440-014.jpg` |
| 2 | about 3 principles | Numbered cards stay while the page scrolls | scroll position | pin | `research/peers/metric/pages/about/band-3-1440.png` |
| 3 | other live bands | Opacity reveal, or a shift under 100px | scroll into view | `--motion-reveal-*` for reveals | `research/peers/metric/behaviors.md` |

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
| 2026-11-05 | Reference is METRIC, https://www.metriccivil.ca/. Cloneability medium. Not a direct competitor: a civil firm in Canada, not the Struga market. Their branding, text, photos, logos, and people are not used. | User named it as the primary reference | user |
| 2026-11-05 | Do not rebuild the home hero scrub (photo into a matching line drawing, background video, play control). Other captured motion is rebuilt close to the reference, including the home scope pin and the about principles pin. | User | user |
| 2026-11-05 | Confirmed: home hero is a still full-bleed image, headline visible immediately, no video scrub and no line drawing. Project index is METRIC's featured carousel plus a one-column list, not a 3-column grid. METRIC is not a direct competitor. | User | user |
| 2026-11-05 | Home and about captures are flagged incomplete: the layout pass stopped at 8450 of 10693px on home and short of the end on about. Lenis was on the page. The footer element was photographed and the home filmstrip reached scroll 10693. Refs is not approved while `report.md` says incomplete. | Capture check | agent |
| 2026-11-05 | Project-scoped waiver: the incomplete METRIC home and about footer captures are accepted for design. The research report is left unchanged. This does not change the capture tool or shared files. | User explicitly approved proceeding to design | user |
| 2026-11-05 | Agreed structure confirmed at design. Reference grammar kept: full-bleed photos, uppercase display, one pill, pinned stories, carousel, one-column project list. Conflicts already logged: still hero, no 3-column project grid. | Design | agent |
| 2026-11-05 | Direction Limestone proposed. Iron field and limestone ground, not the reference blue and peach. League Spartan and Schibsted Grotesk replace Geom Graphic and Arialnova. Azeret Mono dropped. Approval of palette, type, and the home 10 sample is still open. | Design, awaiting user ok | agent |
| 2026-11-05 | Limestone stays dominant. Dark brown and iron are accents for type, the contact pill, and details, about 10% of the page. Empty photographs are an off-white plate, not a brown field. Real construction photos carry the large visual. | User refinement | user |
| 2026-11-05 | Palette, type, and the home 10 sample are approved. Direction remains Limestone. | User replied ok | user |
| 2026-11-05 | Scaffold uses Next 16.4.5, which is above the security floor 16.4.1. metadataBase falls back to https://example.com until NEXT_PUBLIC_SITE_URL is set. The approved fonts have no Cyrillic subset, so Macedonian text will use the fallback face until a Cyrillic pair is approved. The contact form stays disabled until the Turnstile site key exists. | Scaffold | agent |
| 2026-11-05 | Pre-ship HIGH: our built site has not been captured yet, so copy-check has nothing to compare. That capture waits until the pages exist. | preship-scrub | agent |

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
