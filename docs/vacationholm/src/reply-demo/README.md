# VacationHolm reply-drafting capture

This harness bundles the current `ConversationView` directly from the local VacationHolm source
and supplies only the browser adapters it needs for a deterministic portfolio capture. It does not
redraw the conversation or draft-review interface.

The capture stylesheet hides the separate direct-booking outcome section so the 1280x900 frame can
focus on the unchanged reply workflow. This focused omission is recorded in the provenance file.

`reply-drafting.png` shows the English Smart Reply review with supporting sources expanded and the
real Use and edit, Send now, Decline, editable composer, and final Send controls. The fixture also
contains the matching Portuguese draft used by the component when that locale is active.

All names, dates, messages, amounts, listing facts, and policy text are fictional. The fixture is a
single host-owned inquiry with a saved quote and a ready bilingual draft. The local server returns
the fixture for reads. Draft shown, accept, and decline PATCH requests receive a read-only
acknowledgement and are not persisted; the capture itself triggers only the automatic shown receipt.
Message sends, inquiry changes, outcome changes, knowledge changes, and every other write are
rejected. The capture script does not click Send and does not load authentication, a database, a
model, or an external service.

## Build and capture

From the portfolio root:

```sh
node docs/vacationholm/src/reply-demo/capture.mjs
bash docs/vacationholm/src/reply-demo/build-derivatives.sh
```

`LISTINGS_REPO` may point to another VacationHolm checkout. It must contain the existing project
dependencies and compiled application CSS. No package is installed by this harness.

The capture script writes `capture-provenance.json` with SHA-256 hashes for the production source
files, fixture, and adapters, plus the browser version, viewport, and focused omission. The PNG
master is 1280x900. Derivatives are written to `images/full/vacationholm/` and
`images/thumbs/vacationholm/`.
