# SEO and link sharing

The homepage, services page, five case studies and three use-case documents carry
canonical URLs, descriptions, Open Graph metadata and large-image Twitter cards.
The homepage identifies Dylan and the website with JSON-LD. The build includes
project content in the initial HTML rather than relying on crawler JavaScript.

Run `bash build.sh`, `node check-seo.cjs` and `node check-build.cjs` before release.
Run `node scripts/prerender-work-list.cjs --check dist/index.html components/work-list.js`
to check the rendered list against its source data.
Document metadata belongs in each `docs/<project>/src/use-cases.template.html`;
run that directory's `build.mjs` to regenerate identical online/offline copies.

## Social image

`social-card.html` is the editable HTML/CSS design for
`images/og/dev-by-dylan-2026-09.jpg`. Serve this directory locally, capture the
settled page through the supported browser at 1200 by 630 CSS pixels, and verify
the saved JPEG dimensions. The image has no volatile project count. Its new URL
avoids reusing cached copies of the previous seven-project image. The old image
remains available to cached pages. Do not publish this source directory.

## WhatsApp investigation, 7 September 2026

The production homepage returned HTTP 200 with HTML and existing Open Graph tags
when fetched with `facebookexternalhit/1.1`. A `WhatsApp/2.24.7.81 A` request also
returned 200. The production default image returned 200, image/jpeg, 73,078 bytes.
These checks do not reproduce Meta's network, prove bot access from its IPs, or
verify WhatsApp's actual preview cache. The screenshot's domain-only fallback
does not establish a unique cause.

After deployment, verify the new image URL and metadata on the public host.
Retest a newly pasted link in WhatsApp. Check whether Settings, Privacy, Advanced,
Disable link previews is enabled. If the problem persists, inspect Cloudflare
security events for the affected request before changing any bot rules. Do not
disable site-wide protections to guess at a fix.

Reference: https://faq.whatsapp.com/445453537819972/

## Local verification

The build, both check scripts, prerender parity check, sitemap XML validation and
Git whitespace check passed. The browser showed 11 unique projects after Lit
loaded, a working StellarGPT gallery with its image and caption, no console errors,
and no horizontal overflow at 390px. The new JPEG was inspected at 1200 by 630.
Production WhatsApp sharing has not been verified with these unpublished changes.
