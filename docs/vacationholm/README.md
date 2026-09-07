# VacationHolm use-case document

This folder builds a standalone product document for VacationHolm. It is written for hosts,
product reviewers, and hiring readers who want to understand the operating workflow without
reading the application source.

- Public copy: `portfolio/vacationholm/use-cases.html`
- Identical offline copy: `docs/vacationholm/use-cases.html`
- Editable source: `src/use-cases.template.html`
- Builder: `src/build.mjs`

The generated HTML has no network dependencies. Its styles and six illustrative screenshots
are embedded in the file, so it can be opened locally, emailed, or printed without an asset folder.

## Evidence and status

Snapshot: 6 September 2026. The source application is the VacationHolm repository at
`/Users/devbydylan/Documents/projects/listings`. The product workflows described in the document
are implemented in the local MVP source. The newest hosted database migrations have not been
applied, the product has not been deployed from this review, and authenticated end-to-end testing
against a hosted environment remains outstanding. The document does not claim customer outcomes,
revenue, time savings, guaranteed compliance, instantaneous iCal updates, or automatic AI sending.

Useful source map:

| Workflow | Source of truth |
|---|---|
| Search, availability, and inquiry quote validation | `app/api/search/route.ts`, `app/api/inquiries/route.ts`, `lib/availability.ts`, `lib/quotes.ts` |
| Scoped, approved reply knowledge | `lib/reply-knowledge.ts`, `lib/knowledge-store.ts`, `lib/smart-reply-jobs.ts`, `components/reusable-knowledge.tsx` |
| iCal reconciliation and manual blocks | `lib/ical-sync.ts`, `sync-worker/src/calendar-reconciliation.ts`, `app/api/host/listings/[id]/rates/route.ts`, `supabase/migrations/202609060001_calendar.sql` |
| Direct booking outcomes and loss reasons | `components/inquiry-outcome-control.tsx`, `lib/inquiry-outcomes.ts`, `supabase/migrations/202609070002_outcome_history.sql` |
| Question, funnel, demand, booking, and change insights | `lib/question-insights.ts`, `lib/funnel-insights.ts`, `lib/demand-insights.ts`, `lib/booking-insights.ts`, `lib/change-insights.ts` |

## Illustrative images

The document embeds these WebP files:

- `images/full/vacationholm/guest-inquiry.webp`
- `images/full/vacationholm/reply-drafting.webp`
- `images/full/vacationholm/questions.webp`
- `images/full/vacationholm/insights-overview.webp`
- `images/full/vacationholm/funnel.webp`
- `images/full/vacationholm/changes.webp`

They are captures of the real guest, conversation and Insights components populated with synthetic fixtures. Their
figures, property names, and activity are illustrative. They are not production records or
observed customer activity.

## Build and verify

From the portfolio root:

```sh
node docs/vacationholm/src/build.mjs
cmp docs/vacationholm/use-cases.html portfolio/vacationholm/use-cases.html
```

The builder uses only Node built-ins. It fails if any image token remains or if the document does
not contain exactly six embedded images.

## Portfolio review, 6 September 2026

VacationHolm is the fourth entry in the ten-project portfolio. The case study covers the whole
guest-to-host workflow; the use-case document explains six operating situations. Sol agents produced the entry, document and assets, followed by copy, source and visual review.
The expanded eight-slide gallery follows guest search and inquiry, the host workspace, response
drafting, the Insights overview, recurring questions, the listing funnel and change comparisons.

- Desktop at 1280 pixels and mobile at 390 pixels have no horizontal overflow.
- The new card image, case-study images, all eight gallery slides and embedded document images load.
- The standalone document opens offline, and its public and offline copies are byte-identical.
- JavaScript syntax, new local links and sitemap XML checks pass.
- The existing deployment build passes. It excludes documentation sources, demo code and PNG masters.
- Screenshots were visually inspected. Every image labels the fictional data; no customer metrics are implied.

No dependencies were added. Existing unrelated edits were preserved. No deployment or commit was made.

## Reproducing the screens

The original focused Insights captures live under `src/demo/`. The expanded captures use
`src/guest-demo/`, `src/host-demo/` and `src/reply-demo/`; each folder records its fixtures and
capture procedure. These adapters render the application components against local fictional
responses. They do not authenticate to a hosted account, evaluate a model or send guest messages.
After capturing, run `bash docs/vacationholm/src/build-derivatives.sh`, then rebuild the document.
