#!/usr/bin/env bash
# Assembles the deployable site into dist/.
#
#   bash build.sh
#
# The browser app is static HTML and Lit, and server.js only serves it locally.
# This build pre-renders the work list and keeps repo-only files out of the site.
# The repo root holds things that
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
node scripts/prerender-work-list.cjs dist/index.html components/work-list.js

# Changed CSS/components need new URLs so returning browsers cannot reuse an
# older release for a week. Keep original paths for already-open older pages.
node <<'JS'
const fs = require('node:fs');
const path = require('node:path');
const { createHash } = require('node:crypto');
const assets = new Map();
for (const directory of ['css', 'components']) {
  for (const name of fs.readdirSync(`dist/${directory}`)) {
    if (!/\.(css|js)$/.test(name)) continue;
    const original = `/${directory}/${name}`;
    const hash = createHash('sha256').update(fs.readFileSync(`dist${original}`)).digest('hex').slice(0, 12);
    const versioned = original.replace(/\.(css|js)$/, `.${hash}.$1`);
    fs.copyFileSync(`dist${original}`, `dist${versioned}`);
    assets.set(original, versioned);
  }
}
function updatePages(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) updatePages(file);
    else if (entry.name.endsWith('.html')) {
      const html = fs.readFileSync(file, 'utf8');
      fs.writeFileSync(file, html.replace(/(?:src|href)="(\/(?:css|components)\/[^"?]+)"/g,
        (match, url) => assets.has(url) ? match.replace(url, assets.get(url)) : match));
    }
  }
}
updatePages('dist');
JS

# Derived rasters only. The per-project directories hold PNG masters that never
# ship, but they also hold the gallery videos, which do.
mkdir -p dist/images
cp -R images/full images/thumbs images/cards images/og dist/images/
cp images/dylan.webp dist/images/
find images -name '*.mp4' -exec bash -c '
  for f; do mkdir -p "dist/$(dirname "$f")"; cp "$f" "dist/$f"; done
' _ {} +

# Cloudflare reads these from the output directory only, which is why they are
# kept in cloudflare/ rather than at the site root.
cp cloudflare/_redirects cloudflare/_headers dist/

echo "dist: $(du -sh dist | cut -f1), $(find dist -type f | wc -l | tr -d ' ') files"
