# DESIGN.md — AD Ilinden Struga

Art direction + token rationale. Band tables and signature-moment rows live in `plan.md`.

**Layer:** cms.

---

## The business

| | |
|---|---|
| What it is | AD Ilinden Struga, a construction company in Struga, North Macedonia |
| Who visits | Private clients and businesses considering construction work |
| The one action | Make contact — call, email, or send the form |
| **The characteristic thing** | Trust and precision: a modern professional firm, shown through work rather than claims |
| Does NOT want to look like | A shop, a clip-art brochure, a careers site, or a page of invented statistics |

---

## Direction: Limestone

A bright limestone page. Off-white plates mark photographs and cards. Dark brown and iron are accents only: type, the contact pill, a short rule, and small details. Construction photographs, once supplied, are the large visual. They do not turn the page into a brown field. About 70% limestone, 20% white and off-white, 10% brown and iron. The reference's section order and CTA grammar stay. Its blue, peach, name, and pictures do not.

| Axis | Position | Why |
|---|---|---|
| editorial ↔ corporate | Corporate | A construction firm asking for contact, not a magazine |
| warm ↔ cool | Warm | Limestone ground and iron field. The reference's blue is not our brand |
| dense ↔ airy | Airy | Photo bands carry the space. Type sits in the 1360px content box |
| geometric ↔ organic | Geometric type, photographed material | Display is a geometric grotesque. Pictures do the texture |
| understated ↔ bold | Bold headlines, quiet body | Uppercase display, plain body, one pill |

---

## Principles

1. A missing fact stays pending. History, services, projects, counts, quotes, team, and values are not written until the client supplies them.
2. One filled control, the contact pill. Heroes are not cards. A dropped band stays dropped.
3. Two families. Display is uppercase with normal tracking. Body stays inside 75ch. A third family is refused.

---

## Signature element

**What:** The pinned scope story on home band 5: images travel beside a step while the heading holds.  
**Why it belongs:** It shows how the firm works without a statistics row.  
**Where:** Once, on home. About band 3 is the second pin, kept because the confirmed motion map follows the non-hero reference motion.

---

## Imagery direction

| | |
|---|---|
| Photo subjects + mood | Built work, sites, and materials in clear daylight. Precise, not glossy lifestyle |
| What imagery must avoid | The reference's photos, people, logos, and line drawing. Clip-art. Stock handshakes. Invented project images |
| Product role (box/pack · cutout · portrait · none) | None. No cutouts |
| Peer comps in use → replace with | None downloaded. Empty `ImageSlot` until the client supplies a photo |

---

## Token rationale

| Group | Decision | Why |
|---|---|---|
| Color anchor | Limestone ground `oklch(0.965 0.014 95)`. Off-white `oklch(0.988 0.008 95)` and photo plate `oklch(0.94 0.012 95)`. Iron `oklch(0.34 0.055 55)` and ink `oklch(0.28 0.025 65)` as accents | Brown stays in the palette and does not fill a section. Balance about 70% light ground, 20% white variation, 10% brown and iron |
| Neutral temperature | Warm ink `oklch(0.28 0.025 65)`, muted `oklch(0.39 0.028 65)` | Body and secondary text stay warm, not a neutral grey template |
| Display / body type | League Spartan + Schibsted Grotesk | Stand-ins. Geom Graphic → League Spartan (geometric display, OFL). Arialnova → Schibsted Grotesk (neo-grotesk, OFL). Azeret Mono is not used; indexes use the body family. Max 2. Not loaded from another host |
| Type scale / tracking | 12, 14, 16, 20, 24, 40, 48, 64, 78px → the `--text-*` steps. Display tracking 0. Label tracking 0.24em | Nearest steps to the capture. Headlines in the capture were tracking normal. Wide tracking stays on small labels |
| Spacing / section rhythm | 4–80px steps. Alternating section space 64 / 40. Content max 85rem (1360px). Gutters 24 / 16 | Plan rhythm is Alternating. Photo bands use their own insets, not the section step |
| Radius / elevation | Photo 8px, tight 4px, control 10px, pill full. Shadow none | The capture's radii. The capture recorded no shadows |
| Motion signature | Scroll appear 16px, 0.85s, `cubic-bezier(0.22, 1, 0.36, 1)`, stagger 0.07s. UI 0.3s on that curve. Menu 0.6s. Two pins are scroll-linked, not timed | Medium budget. The capture's `ease` keyword is not used for reveals |

Empty photo slots use `--color-media`, a light plate. Type on that plate is `--color-on-media` (ink). `--color-on-photo` is for type sitting on a real photograph only. Iron is not used as a stand-in for a missing picture.

---

## Contrast

WCAG 4.5:1 body · 3:1 large/UI. APCA Lc from the SAPC 0.98G formula, design-time only. `culori` and `apca-w3` are not installed; these figures were computed in Node without adding a package.

| Foreground | Background | WCAG | Pass | APCA Lc |
|---|---|---|---|---|
| ink | surface | 13.31 | body | 84.8 |
| muted | surface | 8.76 | body | 75.0 |
| on-field | field | 10.80 | body | −83.3 |
| field | surface | 10.80 | UI | 79.9 |
| ink | media plate | 12.30 | body | 79.9 |
| ink | surface-raised | 14.20 | body | 89.0 |

---

## Layout plan

The band table lives in `plan.md` **Clone Blueprint**. Spacing below is the token, not a second blueprint.

| Peer band | Spacing token | Max-width token | Type roles (tokens) | Notes |
|---|---|---|---|---|
| home 1 | `--hero-min-height` | `--content-max` | `--text-display-lg` / `--text-lead` | Still photo. 100svh, not the captured 1350px desktop height. Scrub is not rebuilt |
| home 2 | `--section-space` | `--content-max` | `--text-display` + `--text-lead` | Transparent on the page wash |
| home 3, 8, 9 | — | — | — | Dropped |
| home 4 | `--section-space-tight` | full bleed | `--text-display` in ink on the light plate; `--color-on-photo` only on a real photo | Pills use `--radius-pill` and iron |
| home 5 | pin, not section padding | `--content-max` | `--text-display` + `--text-lead` | Signature. At 375 a short stack |
| home 6 | `--section-space` | `--content-max` | `--text-display` | Figures dropped. Small scrub stays |
| home 7 | `--section-space` | `--content-max` | `--text-display` + `--text-lead` | Hidden until a real project exists |
| home 10 | `--section-space` | `--content-max` | ink display + muted lead | Sample band. Large off-white photo plate, brown type, one iron pill |
| about 1, services 1, projects 1 | `--hero-min-height` | `--content-max` | `--text-display-lg` | Static photo heroes |
| about 3 | pin | `--content-max` | `--text-display` | Second pin |
| about 4, about 5 | — | — | — | Dropped |
| services 2–3, projects 2–3, about 2, about 6 | `--section-space` | `--content-max` | `--text-display` + `--text-body` | Small scrubs stay under 100px |
| contact 1 | `--hero-min-height` | form card on `--content-max` | `--text-display` on the photo, `--text-body` on `--color-surface-raised` | No map |
| contact 2 | `--section-space-tight` | `--content-max` | `--text-body` | Phone and email only |
| Privacy, project detail | `--section-space` | `--measure` | `--text-body` | No peer page |

- [x] Band order matches the blueprint · Do not invent respected
- [x] Peer grammar logged in Decisions
- [x] Measured px mapped to tokens (no raw px in markup)
- [ ] band-check sheets (375 + 1440) per band (`clone-fidelity.mdc`) — build, not this stage
- [x] Agreed structure respected · hero min-height stays `100svh` · header 104px / 59px, both at least 40px
- [x] L1–L13 respected — no invention outside Blueprint / DESIGN / plan
- [x] Motion map + signature moments locked · rebuilt with our stack (L13)

---

## Motion plan

**Default scroll animation:** Scroll appear (`ScrollReveal` + `--motion-reveal-*` tokens).

| Moment # (from plan) | Duration / easing rationale | Reduced-motion behavior |
|---|---|---|
| 1 | Home 5 pin follows scroll position. No duration token | Final frame at once |
| 2 | About 3 pin follows scroll position. No duration token | Final frame at once |
| 3 | `--motion-reveal-duration` 0.85s, `--motion-reveal-ease`, distance 16px, stagger 0.07s | Instant final state. First screen is never wrapped |

Header state uses `--motion-ui-duration` (0.3s). The mobile menu uses `--motion-menu-duration` (0.6s), about 93% of the width. Both use `--motion-ui-ease`, not the keyword `ease`.

- [x] Plan Motion map + contract locked · Medium budget, two signature pins
- [x] `design/tokens.css` has the four `--motion-reveal-*` tokens, `--hero-min-height`, and `--header-height`
- [ ] Shared `ScrollReveal` — arrives with the app at `/scaffold` and `/build`
- [x] Rebuild with `motion`, not the reference script
- [ ] `prefers-reduced-motion` verified on the built pages

---

## Decisions log

| Date | Considered | Rejected because |
|---|---|---|
| 2026-11-05 | Use the reference blue and peach as our palette | Their colours are not our brand. Roles kept, values replaced |
| 2026-11-05 | Ship Geom Graphic, Arialnova, and Azeret Mono | Paid or unlicensed, and three families. Two OFL stand-ins |
| 2026-11-05 | Set the hero token to the captured 1350px desktop height | Agreed structure is a full-bleed still. The lock stays `100svh` |
| 2026-11-05 | Add a drop shadow on the contact card | The capture recorded no shadows |
| 2026-11-05 | Fill empty photo bands with dark brown | The user wants limestone to dominate. Brown and iron stay as type, the pill, and details. The photograph is the large visual, on a light plate until a real photo exists |

**Clone overrides** (peer grammar kept): warm full-bleed photo bands, oversized uppercase headlines, one solid pill, rounded photos (8px), pinned image story, work carousel, one-column project list, overlapping enquiry card. Our pill says Contact us.

**Clone exceptions:**

`Clone exception: home hero scrub is not rebuilt — the reference clips a photograph into a line drawing with a background video and a play control — home 1`

Header measured 104px at 1440 and 59px at 375. Both meet the 40px lock, so this is not an exception.
