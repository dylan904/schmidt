# 2K Build Lab case study

Two versions of the same case study live in this repo.

| Where | What it is |
|---|---|
| [`/portfolio/2k-build-lab/`](../../portfolio/2k-build-lab/index.html) | The page on the site. Uses the site's nav, footer, CSS and type. This is what the portfolio card links to. |
| [`case-study.html`](case-study.html) | A standalone document. Every screenshot is inlined, so it is one file that opens offline and survives being emailed or handed to someone. |

They carry the same content in different clothes. If you change one, change the other.

## Rebuilding the standalone document

```bash
node docs/2k-build-lab/src/build.mjs
```

Reads [`src/case-study.template.html`](src/case-study.template.html), pulls each
`{{IMG:name|Plate NN|Title|Caption|optional-class}}` token from
`images/2kbuildlab/name.png`, re-encodes it as JPEG, and writes `case-study.html`
with the images embedded as data URIs. Needs macOS `sips`. Roughly 1.2 MB out.

The build fails loudly on a missing screenshot, an unreplaced token, or any
non-ASCII character in the template. That last check matters: the document gets
published into a host page whose `<head>` it does not control, so every dash,
arrow and symbol has to be an HTML entity or it renders as mojibake.

## Re-shooting the screenshots

```bash
NODE_PATH=/path/to/a/repo/with/playwright/node_modules \
  node docs/2k-build-lab/src/capture.mjs
```

Drives the live site and writes into `images/2kbuildlab/`. Playwright is not a
dependency of this static site, so point `NODE_PATH` at a project that has it.

Two images are not captured by that script:

- **`result.png`** is exported from the app's own save-as-PNG feature while signed
  in. The capture script runs signed out, so re-export it by hand.
- **`measurements.png`** renders from [`src/measurements.html`](src/measurements.html).
  Edit the numbers there, then screenshot the `.card` element at 1200px wide and
  2x scale into `images/2kbuildlab/measurements.png`.

## Where the numbers come from

Everything quoted in the case study traces back to the 2K Build Lab repo's own
`docs/context/*` notes and its A/B and parity harnesses. If a figure here starts
disagreeing with that repo, that repo wins.
