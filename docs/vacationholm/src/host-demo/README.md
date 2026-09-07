# VacationHolm host screenshots

This isolated demo bundles the current `Header`, `HostDashboard`,
`HostWorkQueue`, and `PremiumInsights` React components from the local
VacationHolm checkout. It
mocks only framework boundaries: authentication, translations, Next.js
navigation, fonts, images, and HTTP responses.

Every listing, inquiry, calendar state, count, and timing is fictional. The
fixture server rejects write methods and never loads credentials, Supabase,
authentication, model APIs, or third-party services.

From the portfolio root:

```sh
node docs/vacationholm/src/host-demo/capture.mjs
```

Set `LISTINGS_REPO` to use another local VacationHolm checkout. That checkout
must already contain its dependencies and compiled application CSS. The script
creates a 1280x940 host master, a 1280x1100 Insights master, and 400px-wide
WebP derivatives. The Insights frame uses 80% browser zoom so the overview heading,
six view controls, period selector, Action Center, and summary metrics remain
visible together:

- `images/vacationholm/host-dashboard.png`
- `images/vacationholm/insights-overview.png`

`capture-provenance.json` records source, fixture, and capture-script SHA-256
hashes with the browser version and viewport. The build directory is temporary.
