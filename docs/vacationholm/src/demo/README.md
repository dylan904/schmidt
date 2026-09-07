# VacationHolm insight screenshots

These screenshots bundle the current `QuestionInsights`, `FunnelInsights`, and
`ChangeInsights` React components from the local listings repository. The demo
adds only a disclosure strip and a fixed capture frame. It does not recreate or
redraw product screens.

All properties, conversations, dates, counts, and rates in `fixtures.json` are
fictional portfolio examples. The local server mocks the three GET endpoints
used by the components and returns HTTP 405 for every write method. It does not
load credentials, Supabase, authentication, models, or third-party services.

From the portfolio root:

```sh
node docs/vacationholm/src/demo/capture.mjs
bash docs/vacationholm/src/build-derivatives.sh
```

`LISTINGS_REPO` may point to another listings checkout. That checkout must have
its existing dependencies and a compiled `.next` CSS asset. The build resolves
the React components directly from that checkout and records the CSS filename
in its console output. Capture also writes `capture-provenance.json` with the
component and fixture SHA-256 hashes, browser version, and viewport; its build
directory is temporary. Masters are 1280x720 PNG files; derivatives match the
portfolio's existing full, 400px thumbnail, 1000px card, and 1200x630 OG formats.
