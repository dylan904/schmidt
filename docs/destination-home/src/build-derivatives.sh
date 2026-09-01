#!/usr/bin/env bash
# Regenerates the WebP the site actually ships from the PNG masters.
#
#   bash docs/destination-home/src/build-derivatives.sh
#
# The site never loads a PNG. work-list.js maps each source path through its
# variant() helper into /images/{cards,thumbs,full}/, so a new screenshot is
# invisible until this has run. Masters stay on disk and do not ship.
#
# sips reads WebP on macOS but cannot write it, so encoding is cwebp.
# Sizes match the other projects: full 1440, thumbs 400, card 1000x563.
set -euo pipefail

cd "$(dirname "$0")/../../.."
command -v cwebp >/dev/null || { echo "need cwebp (brew install webp)"; exit 1; }

mkdir -p images/full/destination-home images/thumbs/destination-home images/cards

for src in images/destination-home/*.png; do
  n=$(basename "$src" .png)
  cwebp -quiet -q 80 -resize 1440 0 "$src" -o "images/full/destination-home/$n.webp"
  cwebp -quiet -q 72 -resize 400 0  "$src" -o "images/thumbs/destination-home/$n.webp"
done

# The card is the ranked-areas frame, cropped to the 16:9 the list renders at.
cp images/destination-home/neighborhoods.png images/destination-home.png
tmp=$(mktemp -t dh-card).png
cp images/destination-home.png "$tmp"
sips -c 810 1440 "$tmp" >/dev/null
cwebp -quiet -q 82 -resize 1000 0 "$tmp" -o images/cards/destination-home.webp

# Social card, same crop at the 1200x630 the meta tags declare.
ogtmp=$(mktemp -t dh-og).png
cp images/destination-home.png "$ogtmp"
sips -c 630 1200 "$ogtmp" >/dev/null
sips -s format jpeg -s formatOptions 82 -Z 1200 "$ogtmp" --out images/og/destination-home.jpg >/dev/null

rm -f "$tmp" "$ogtmp"
echo "full:   $(ls images/full/destination-home | wc -l | tr -d ' ') files"
echo "thumbs: $(ls images/thumbs/destination-home | wc -l | tr -d ' ') files"
echo "card + og image rebuilt"
