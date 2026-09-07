# Casa Agent portfolio materials

The entry follows the existing portfolio: project data in `components/work-list.js`,
a case-study page, annotated gallery, PNG masters kept out of deployment, and
WebP derivatives for the site.

- Public case study: `portfolio/casa-agent/index.html`.
- Public and downloadable use-case document: `portfolio/casa-agent/use-cases.html`.
- Identical offline copy: `docs/casa-agent/use-cases.html`.
- Edit the document in `src/use-cases.template.html`; its generated copies embed
  their two screenshots and CSS. No network is needed to read the saved document.
- The full gallery contains five screenshots under `images/casa-agent/`.

## Evidence and scope

Snapshot: 5 September 2026. The Casa repository is the source of truth:
`docs/six-changes-verification.md`, `docs/property-manager-value-and-market-comparison.md`,
and the saved `eval-results/baseline-0352080.json` and `current-validation-2.json` runs.
Do not publish raw evaluation outputs or transcripts as portfolio assets.

The 66/66 result is a recorded comparison, not a fresh evaluation run for these
portfolio edits. Earlier decision code ran through an isolated adapter on the
migrated database. Both sides used the same authored scenarios and corrected
Portuguese count matcher. The sample does not prove production reliability.
Token totals increased. WhatsApp delivery and a supervised pilot remain unfinished.
Official competitor pages are linked beside claims in the use-case document;
no competitor was tested hands-on.

## Screenshot provenance

All five images show the real exported Casa console with fictional records from
`src/demo-server.py`. Three contacts, two properties, three roles, one proposed
addition and one waiting escalation are illustrative. No model calls, database
access, messages, real contact details or credentials are involved. The demo is
read-only; its POST and DELETE routes reject changes. It is not included in `dist/`.

To reproduce the UI, pass an existing Casa static build:

```sh
python3 docs/casa-agent/src/demo-server.py ../casa-agent/web/out
```

Open a dedicated browser tab at `http://127.0.0.1:8791` with these routes:

| Image | Route and state |
|---|---|
| `contacts.png` | `/admin/contacts/?sel=rui` |
| `sop-library.png` | `/admin/sop/?open=sop%2Farrival-checklist.md` |
| `proposal-review.png` | `/admin/proposals/`; expand Original answer |
| `attention.png` | `/admin/attention/?sel=escalation%3Ademo-escalation` |
| `property-scope.png` | `/admin/properties/?sel=casa-azul`; scroll to assignments and sheets |

Captured in the in-app browser at its default 1280 x 720 viewport, dark theme.
The browser's JPEG captures were converted to PNG masters without content edits.
The property image is a scrolled detail. Image captions identify the demo status;
an answering toggle is a setting, not evidence that production delivery works.

## Regenerate

From the portfolio root (macOS `sips`, `cwebp`, Node; no new npm dependency):

```sh
bash docs/casa-agent/src/build-derivatives.sh
node docs/casa-agent/src/build.mjs
bash build.sh
```

The last command uses the existing deployment allowlist. It includes the public
case study and self-contained use-case document; it excludes source templates,
the demo server, PNG masters and private project evidence. Review locally before
deploying through the portfolio's existing process.

## Portfolio validation, 5 September 2026

- Existing `build.sh` passes; JavaScript syntax and `git diff --check` pass.
- The rendered list contains nine projects with Casa third. Its gallery opens
  and reaches all five annotated screens; no browser console errors were recorded.
- Case study, standalone document and project list have no horizontal overflow
  at 390 pixels. Desktop and mobile screenshots were visually inspected.
- Both embedded document images load. Public/offline document bytes match.
- New local links, alt text, gallery derivatives and sitemap parse checks pass.
- The build excludes the demo server, source templates and PNG masters.
- Portfolio work did not run paid model evaluations or modify Casa's application
  data. No deployment or commit was made.
