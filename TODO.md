# OpenMOVR site to-do

Open items for openmovr.github.io. Check an item off in the same commit that finishes it, and add new items at the bottom of the right section. Anything security related stays out of this file, since the repo is public.

Owner: [Andre Paredes](https://github.com/ADParedes), founder & technical lead.

## Content and figures

- [ ] **Pilot figures.** Agree on a source of truth for MOVR 2.0 pilot numbers before any count goes back on the site. Today the site shows only "100+ consented" as a range (`data/progress.json`, `data/front-door-today.json`).
- [ ] **Cures Act sentence.** Reverify the HL7 FHIR and 21st Century Cures Act statement in the Health records section of `movr2.html` before it is cited anywhere.
- [ ] **Early extraction results.** The "Why this is promising" paragraph in `movr2.html` refers to early pilot work. Replace it with a link once MDA MOVR publishes official results, or cut it to a general statement.
- [ ] **Older Data Hub figures.** Reconcile the 3,570 participants and 11,501 encounters that appear in older docs history with the current Community Snapshot figures (3,444 and 10,489).

## When MDA MOVR publishes

- [ ] Link the official MOVR 2.0 pilot lessons learned from the pilot highlights section of `movr2.html`.
- [ ] Link the white paper *Patient Registries Reimagined* (expected January 2027).
- [ ] Replace the "What's coming" placeholders in `movr2.html` with MDA MOVR's announcements, including the disease communities for recruitment.
- [ ] Point the MDA MOVR links at the MOVR 2.0 sign-up page once recruitment opens in Q1 2027.

## Pages

- [ ] **GSoC.** The page now says the 2026 program has ended and 2027 is to be announced. Update it once the 2027 plan is decided.
- [ ] **Front door.** Move `data/front-door-today.json` to MOVR 2.0 counts at launch, then generate it on a schedule (stage 3 on `front-door.html`).
- [ ] **Progress page.** Refresh `data/progress.json` each time the Community Snapshot is recomputed, keeping population, data-through and computed dates.

## Repository

- [x] **Old branches.** Deleted the section branches. Everything merged into `main` first, and `main` is now the only long-lived branch.
- [x] **README.** Aligned with the site, "the open source program of MDA's MOVR registry".

## Rules for this repo

- No AI attribution in commits or pull requests. No `Co-Authored-By` lines for Claude, Copilot or any other assistant, and no "Generated with" footers. The `attribution-check` workflow fails any push or pull request that has one, and `link-check` fails on broken internal links or anchors.
- Every published figure names its population and source. Never publish a bare rate.
