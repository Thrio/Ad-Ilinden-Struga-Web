# PROGRESS.md — approvals, bands and run log

Committed. Updated by the agent after every stage and band; `node tools/check-project.mjs` reads it. Approvals are the user's words only ("ok", "approved") — never assumed.

## Stage approvals

| Stage | Approved by | Date | Note |
|---|---|---|---|
| kickoff (plan summary) | user | 2026-11-04 | ok — defaults accepted |
| refs (reference pick + Blueprint table) | user | 2026-11-05 | approved for design — incomplete METRIC footer captures waived for this project |
| design (palette, type, sample band) | user | 2026-11-05 | ok — Limestone, brown and iron as accents, home 10 sample |
| qa (BLOCKER/HIGH list cleared) | | | |
| deploy go-ahead (coordinator) | | | |

## Bands

Page = the `--page` name used with band-check (as in `research/page-map.json`). Status: `ok` (user approved) · `needs review` (3 rounds or 45 min reached — reason in note) · `dropped` (no client content).

| Page | Band | Status | Rounds | Minutes | Note |
|---|---|---|---|---|---|
| | | | | | |

## Run log

Overnight and long runs: one line per step — time · step · result · next. Decisions also go to `plan.md` Decisions.

| Time | Step | Result | Next |
|---|---|---|---|
| 2026-11-04 | kickoff | Plan confirmed from user notes. Kosova Wine brief files not used. | /refs |
| 2026-11-05 | refs | METRIC captured. Blueprint and motion map drafted. Home and about footer check incomplete. Not approved. | wait |
| 2026-11-05 | refs | Hero, project list, and competitor answers confirmed. | clear the incomplete capture |
| 2026-11-05 | refs | Footer re-run not started. The capture scroll stops short on these Lenis pages, so a re-run would not clear the flag. Report was not edited. Refs not approved. | coordinator or an allowed kit change |
| 2026-11-05 | refs | User approved refs for design and waived the incomplete METRIC footer captures for this project. Research report not edited. | check the design gate |
| 2026-11-05 | design | Tokens, DESIGN.md, and the home 10 sample drafted. Agreed structure confirmed. Palette and type not approved yet. | wait for ok |
| 2026-11-05 | design | Limestone kept dominant. Brown and iron limited to type, the pill, and details. Sample updated. | wait for ok |
| 2026-11-05 | design | User approved the palette, type, and home 10 sample. | /scaffold |
| 2026-11-05 | scaffold | Empty shell builds. Next 16.4.5. Mock Sanity content. Preship has no BLOCKER. | /build home band 1 |
