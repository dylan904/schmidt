#!/usr/bin/env bash
# Assembles the deployable site into dist/.
#
#   bash build.sh
#
# The site itself has no build step: it is static HTML and Lit, and server.js
# only serves it locally. This exists because the repo root holds things that
# must not ship. Cloudflare Pages publishes its output directory wholesale, so
# without this, DESIGN.md, the case-study docs and roughly 7 MB of PNG masters
# would all be reachable, and robots.txt already promises the masters "are not
# served at all".
#
# Ships: the pages, components, CSS, the derived WebP, the social images, and
# the gallery videos. Everything else stays behind.
set -euo pipefail
cd "$(dirname "$0")"

rm -rf dist
mkdir -p dist

# Pages and code.
cp index.html services.html 404.html robots.txt sitemap.xml dist/
cp -R portfolio components css dist/

# Derived rasters only. The per-project directories hold PNG masters that never
# ship, but they also hold the gallery videos, which do.
mkdir -p dist/images
cp -R images/full images/thumbs images/cards images/og dist/images/
cp images/dylan.webp dist/images/
find images -name '*.mp4' -exec bash -c '
  for f; do mkdir -p "dist/$(dirname "$f")"; cp "$f" "dist/$f"; done
' _ {} +

# Cloudflare reads this from the output directory, so it is generated here
# rather than kept at the repo root where it would look like site content.
# Mirrors the one redirect server.js performs locally.
printf '/portfolio / 301\n' > dist/_redirects

echo "dist: $(du -sh dist | cut -f1), $(find dist -type f | wc -l | tr -d ' ') files"
