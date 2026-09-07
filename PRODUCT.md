# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Currently plain static HTML pages with Lit web components (loaded from a CDN), Bootstrap 5, and an express static server on port 8080 — no build step. **This is not binding.** The user confirmed a full rebuild is on the table, including a framework (Astro, Vite, or similar) and a build step, if the design calls for it. Treat the current stack as the incumbent implementation, not as a constraint.

## Users

Primary and confirmed: **hiring managers and technical recruiters** evaluating Dylan Maxey for a role. They arrive with limited time, likely from a resume link or an application, and are deciding whether the work is deep enough to warrant a conversation. Success is that they read far enough into a case study to see the reasoning, and reach out.

Secondary audiences (peer engineers, prospective clients, 2K Build Lab customers) were offered and not selected. Do not design for them at the primary audience's expense.

## Product Purpose

A personal portfolio for Dylan Maxey ("Dev By Dylan"). It exists to make the depth of the work legible to someone who has not seen the code — not to list technologies, but to show the reasoning, the correctness work, and the measured results behind each project.

The site's own framing, written by the user and live on `/portfolio`, states the thesis directly: what he cares about most is "the part after it works: proving it stays correct, making it fast enough that people actually use it, and being straight with whoever is on the other side of the screen."

## Positioning

The differentiator is verified depth, not breadth of stack. The flagship project (2K Build Lab) required reverse-engineering a shipped game's own rating engine and cap-breaker cost model before it could return a correct answer, and it now runs as a business with paying customers. The portfolio's claim is that the work is provably correct and measurably fast, with the evidence attached — parity harnesses, A/B tested performance changes, documented regression classes. A neighboring portfolio cannot truthfully copy that because the artifacts are real and inspectable.

## Operating Context

- Visitors typically arrive at `/portfolio` — `index.html` currently redirects there.
- The portfolio grid is the primary surface: ten project entries, each offering some combination of "Read more" (inline lightbox or a dedicated case-study page), "View Site," and "View gallery" (a lightGallery slideshow of annotated screenshots).
- The 2K Build Lab case study exists in two forms that must stay in sync: the on-site page at `/portfolio/2k-build-lab/` and a standalone single-file document at `docs/2k-build-lab/case-study.html` with all images inlined as data URIs, built by `docs/2k-build-lab/src/build.mjs` so it can be emailed or opened offline. That standalone build is ASCII-only and fails loudly on unreplaced tokens, because it gets embedded into a host page whose `<head>` it does not control.
- Screenshots are re-shot by `docs/2k-build-lab/src/capture.mjs` (Playwright, resolved via `NODE_PATH` since it is not a dependency here). Two images are produced by hand: `result.png` from the app's own signed-in PNG export, and `measurements.png` from `docs/2k-build-lab/src/measurements.html`.

## Capabilities and Constraints

- Ten projects are currently represented, defined as data in `components/work-list.js`: 2K Build Lab, Destination Home, Casa Agent, VacationHolm, beeline.com, Beeline Business Case Tool, Brood, OpenAI Feedback Classifier, Chatbot Decision Tree, and Vue Devtools Auditor.
- 2K Build Lab, Destination Home, Casa Agent and VacationHolm have dedicated case-study pages. Casa and VacationHolm also have self-contained use-case documents. Each project has an annotated screenshot gallery.
- Two projects link to a live URL: 2kbuildlab.com and beeline.com. The remainder are internal or unreleased and have no public link.
- Contact is a `mailto:` to devbydylan@gmail.com. There is no contact form and no backend to receive one.
- The nav (`components/nav-pane.js`) exposes Services, Portfolio, and Contact. About, Blog, Blog Single, Experience, and Contact template pages exist in the repo root but are unlinked and carry unmodified Colorlib template content.
- **Colorlib is being dropped.** The site is a modified Colorlib "Schmidt" Bootstrap 5 template; the user confirmed the attribution and the template lineage go away with the redesign. `readme.txt`, `main.html`, and the Colorlib references remaining in the unlinked template pages are all slated for removal, not preservation.
- Template residue that is factually wrong and must not be carried forward: `index.html` still advertises "I'm John Schmidt" and "UI/UX Designer & Developer," and its `<title>` is still the Colorlib template name. The real identity is Dylan Maxey / "Dev By Dylan."
- `index.html` hardcodes a Google Maps API key in a script tag it does not need.
- `server.js` routes `/portfolio` to `work.html`, a file that no longer exists; the live page is served from `portfolio/index.html`.

### Open decisions

- **What `/services` is now.** The user confirmed the Services page is still a live surface, and separately that they **no longer offer website-building as a service** — the focus has moved to AI and process improvement. The page's current four pillars (Web Development, AI Implementation, UI/UX Design, IT Consultancy) therefore no longer describe what is on offer. The four service descriptions are the user's own writing; the framing around them is stale. What this page should actually say is undecided and must be settled with the user, not inferred.
- Whether an About page becomes a real surface. Currently the About route holds untouched template content.

## Brand Commitments

- Name: **Dev By Dylan**. Person: Dylan Maxey.
- Contact: devbydylan@gmail.com.
- Voice, as demonstrated in the user's own copy: plain, specific, and unhedged. It names the hard part, quantifies results, and volunteers limitations — "Speed that changes the answer is not speed"; "It advises and never blocks"; a heuristic that hard-blocked buildable configurations is called "a documented regression class in this codebase." Understated rather than promotional.
- **Standing visual preference: the category standard, executed at full craft.** Offered a hand of authored visual worlds across three rounds, the user took the standing exit: a polished developer portfolio with a clear intro, a project grid, and case-study pages. Palette `#f7f7f5` ground, `#151515` ink, `#315efb` accent; clean grid, product screenshots, restrained cards. Recorded 2026-08-31 as a durable preference, not a one-off: future work executes convention at full fidelity, without irony and without smuggling a concept back in.
- **Craft bar: joshwcomeau.com and brittanychiang.com.** Their level of finish is the standard to meet — approachable and thorough rather than austere. Warm color, a single accent, a scroll-linked project list, and generous explanation. The accepted card's own stated risk is "easy to scan and easy to forget," so the counter-pressure lives in craft and in the writing, never in visual novelty.
- The previous Poppins / `#3e63dd` / dark card-grid look was inherited from the Colorlib template, not chosen, and is being replaced.

## Evidence on Hand

Real and usable:

- **2K Build Lab** — a shipped, revenue-generating product at 2kbuildlab.com. 14 annotated screenshots in `images/2kbuildlab/`. Claimed measured result: roughly 70% off solve latency across eight independently A/B tested changes, each required to return the identical winning build before it counted, each behind an environment-variable kill switch. `docs/2k-build-lab/README.md` states every quoted figure traces back to the 2K Build Lab repo's own `docs/context/*` notes and its A/B and parity harnesses, and that if a figure here disagrees with that repo, that repo wins.
- **beeline.com** — public site, delivered in ~1 year against a projected 1.5–2 years, as lead Vue.js developer. Named collaborators exist in the write-ups.
- Screenshot and video assets for most projects under `images/<project>/`, including `.mp4` walkthroughs for the Business Case Tool.
- Detailed first-person write-ups for every project, already in `components/portfolio-item.js`.

- **Casa Agent** — a working prototype for property-manager/contractor questions. Five annotated console screenshots use fictional, read-only records. The 5 September 2026 verification recorded 66/66 passing scenarios before and after six changes, on the same authored fixtures and corrected grader. Token use increased. Production WhatsApp delivery and a supervised customer pilot remain unfinished. The Casa repository's verification and comparison documents are the source of truth.
- **VacationHolm** — a direct-booking marketplace MVP for holiday rentals in the Azores and Madeira. Search, server-calculated quotes, calendar provenance, inquiries, durable host reply drafts, approved reply knowledge, a host work queue, recorded booking outcomes and six Insights views are implemented in local source. Thirteen targeted assertion checks and an isolated PostgreSQL migration harness passed during the 6 September 2026 review. Hosted migrations, deployment and authenticated end-to-end testing remain unfinished. Eight component screenshots use fictional fixtures and perform no live writes or model calls. The VacationHolm repository is the source of truth.

The Business Case Tool, Chatbot Decision Tree, OpenAI Feedback Classifier, Vue Devtools Auditor and Brood were adopted internally by Beeline, as confirmed by Dylan on 7 September 2026. Adoption does not establish organization-wide usage, user counts or measured business impact.

Absences that must not be filled with invention:

- No testimonials, client quotes, press mentions, awards, or logos.
- No customer counts, revenue figures, or traffic numbers for 2K Build Lab.
- No pricing. The four tiers on `/services` ($49 / $79 / $109 / $149, "Personal" through "Gigantic Business") are unmodified Colorlib filler and are confirmed **not real**. They must not be presented as offers, and replacement numbers must not be invented.
- No resume, dates of employment, or job titles beyond the per-project role lines already written.
- No headshot of Dylan. `images/jschmidt.png` and `jschmidt-2.png` are template stock photos of a different person and must not be used as him.

## Product Principles

1. **Show the reasoning, not the stack list.** The tech chips are the least interesting thing on a card. What earns the callback is the problem that was hard and how it was proven solved.
2. **Every claim traces to an artifact.** Numbers come from harnesses and A/B tests that exist. If a figure cannot be sourced, it does not ship.
3. **Volunteer the limitation.** The voice already names regressions, kill switches, and what a heuristic gets wrong. That candor is the credibility, not a flaw to polish out.
4. **Respect a short visit.** The primary reader is scanning under time pressure and deciding fast. Depth must be reachable, not mandatory — the surface has to pay off in seconds and reward minutes.
5. **Never dress up an absence.** No invented testimonials, metrics, pricing, or stand-in portraits. An honest gap beats a plausible fabrication for an audience trained to spot both.
