# StellarGPT portfolio materials

The entry presents Dylan's extension of Microsoft's sample as a prototype, with
three annotated UI screenshots and a self-contained document for BIM teams.

- Case study: `portfolio/azure-openai-assistant/index.html`.
- Public document: `portfolio/azure-openai-assistant/use-cases.html`.
- Identical offline copy: `docs/azure-openai-assistant/use-cases.html`.
- Document source: `src/use-cases.template.html`.
- Screenshot masters: `images/azure-openai-assistant/`.

## Sources and claim boundaries

Evidence snapshot: 7 September 2026. Source project:
`/Users/devbydylan/Documents/projects/app-aoai-chatGPT`.
The reviewed custom branch is `temp`, at `9a7b27a`. The upstream fork point is
Microsoft commit `54f0af2c09bfe71f93da4acfb06422e11f984d71` in
<https://github.com/microsoft/sample-app-aoai-chatGPT>.

The prior comparison recorded two authored commits and 20 changed application
files, with 1,526 insertions and 237 deletions. These counts establish scope, not
quality, and are not used as outcome metrics in the public copy.

Relevant implementation:

- `app.py`: Responses/Chat Completions dispatch and model/assistant selection.
- `backend/utils.py`: streaming and non-streaming response normalization.
- `backend/settings.py` and `frontend/src/api/models.ts`: typed tool definitions.
- `frontend/src/pages/layout/Layout.tsx`: model and assistant selection controls.
- `backend/history/cosmosdbservice.py`: model/assistant conversation metadata.

Microsoft supplied the base chat application, authentication, retrieval and Azure
deployment foundation. Dylan's claimed contribution is the extension above. The
case study does not claim authorship of the whole application.

The review identified shared global selection state, unfinished tool/history
behavior and verbose logging. It did not validate a production deployment,
customer usage, answer quality, citation correctness or savings. The earlier
audit parsed four Python files, but no application test suite or new frontend
build was validated. The documentation preset asks for sources and page numbers;
that instruction does not prove grounding. Existing internal names, identifiers
and documents must not appear in public assets.

## Screenshot provenance

The captures show the existing static React application served with an isolated
fixture API. The preset is the fictional `BIM SOPs`, and all questions, procedures
and responses are scripted demo data. No live model or database requests are
made. These are captures of real UI, not hand-built interface mockups.

| Master | Route and state |
|---|---|
| `model-selection.png` | `/`, click the model picker |
| `assistant-preset.png` | `/`, open the top-right hamburger menu, then BIM SOPs |
| `document-question.png` | `/`, click the Model handoff checklist history entry |

Captured in a dedicated browser tab at 1280 x 720, with zero browser console
errors. The screen contents were not modified. Captions annotate the controls
and disclose fixture responses. The answer itself says Demonstration response,
identifies itself as a scripted fixture and names page 12 of a fictional handbook.
It does not provide a validated clickable citation. Model descriptions in the
selector are the existing UI labels, not benchmark results.

The source assets came from the existing working-tree build, not a newly rebuilt
or independently verified HEAD build:

- `index-8701f4d9.js`, SHA-256
  `bf6007773ca28fa12953a52db7923258c67e534f65aac998fcf578e386209b05`.
- `index-a9f60eaf.css`, SHA-256
  `a9f60eaf4b1aa3507c3a600ea64b60413f6527070fbb520ecde475d06fa02d8b`.

To reproduce, from the portfolio root:

```sh
python3 docs/azure-openai-assistant/src/demo-server.py /Users/devbydylan/Documents/projects/app-aoai-chatGPT/static
```

Open `http://127.0.0.1:8794/` in a dedicated tab. The adapter imports no source
application code and uses no credentials. Selection requests are acknowledged
locally, history reads return fixture messages, and other mutations are rejected.

## Regenerate

From the portfolio root, after the project's screenshot derivatives exist:

```sh
bash docs/azure-openai-assistant/src/build-derivatives.sh
node docs/azure-openai-assistant/src/build.mjs
bash build.sh
node check-build.cjs
node --check components/work-list.js
git diff --check
```

The document builder embeds `model-selection.webp` and `document-question.webp`
from `images/full/azure-openai-assistant/`. It fails on absent files, an unexpected
image count or unresolved template tokens. Its two output files must match byte
for byte. The existing site build should exclude document sources, capture/demo
helpers and image masters from `dist/`.

## Verification limits

Dylan confirmed that Stellar considered Copilot licenses for everyone and that he
persuaded the team to choose usage-based API billing instead. The case study and
use-case document describe the cost-avoidance rationale without an audited savings
figure or a claim of feature parity. No current vendor prices are asserted.

Dylan confirmed the product name StellarGPT and that it was built for and adopted by Stellar. The existing azure-openai-assistant paths are retained for link stability. The work-page label,
adopted-project count, case study and use-case document reflect that confirmation.
Adoption does not establish user counts, measured savings or answer accuracy.

Portfolio validation covers local links, image loading, gallery captions,
desktop/mobile layout, document parity and the existing build checks. It does
not constitute application integration testing or validate any model response.
Checks passed on 7 September 2026: site build, fingerprint/cache validation,
JavaScript syntax, sitemap XML, new local page links and assets, and byte-identical
document copies with two embedded screenshots and no external rendering assets.
The deployment output excludes documentation sources, demo helpers and masters.

Browser review covered desktop and 390px mobile layouts, all three gallery images
and captions, project count/order, case-study links and the served document.
The document rendered with both embedded images. The browser policy blocks
`file://` navigation, so opening the standalone file directly was not verified;
the self-contained asset structure was checked instead. This limitation is not
an application or model test result.
