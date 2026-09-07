# VacationHolm guest journey fixture

This isolated harness bundles the repository's actual `SearchPage` and
`ListingDetailPage`. It replaces only framework providers, analytics, maps,
authentication, translations, currency and HTTP reads needed outside Next.js.
All writes return HTTP 405. No Supabase client, model, credential or live user
session is loaded.

The property, guest, availability and quote records are fictional and every
capture retains the disclosure strip. The listings repository has no safe local
listing photography outside scraped debug material, which this harness never
uses. The capture loads the three property-photo URLs already referenced by
`app/home/index.tsx`; their exact URLs and source reference are recorded in the
provenance file.

Run from the staged portfolio root:

```sh
node docs/vacationholm/src/guest-demo/capture.mjs
bash docs/vacationholm/src/build-derivatives.sh
```

`LISTINGS_REPO` may select another checkout with the existing dependencies and
compiled Next CSS. Capture writes SHA-256 source and fixture provenance, then
removes its temporary browser bundle.

The desktop search capture keeps the application's existing result-card and
search-control components. Fixture-only CSS widens the result column from 60%
to 72% at the 1280 px capture breakpoint and limits the deliberately offline
map panel to 340 px high, so the unavailable map does not obscure the guest
journey. The inquiry capture uses the application's default desktop detail and
dialog layout without those search-page adjustments.
