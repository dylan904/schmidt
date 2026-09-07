#!/usr/bin/env bash
# Match the existing portfolio's WebP gallery/card and JPEG social assets.
set -euo pipefail
cd "$(dirname "$0")/../../.."
mkdir -p images/full/casa-agent images/thumbs/casa-agent images/cards images/og
for src in images/casa-agent/*.png; do
  name=$(basename "$src" .png)
  cwebp -quiet -q 82 "$src" -o "images/full/casa-agent/$name.webp"
  cwebp -quiet -q 72 -resize 400 0 "$src" -o "images/thumbs/casa-agent/$name.webp"
done
cp images/casa-agent/sop-library.png images/casa-agent.png
cwebp -quiet -q 82 -resize 1000 0 images/casa-agent.png -o images/cards/casa-agent.webp
temp=$(mktemp -d)
trap 'rm -rf "$temp"' EXIT
sips -z 675 1200 images/casa-agent.png --out "$temp/social.png" >/dev/null
sips -c 630 1200 "$temp/social.png" >/dev/null
sips -s format jpeg -s formatOptions 82 "$temp/social.png" --out images/og/casa-agent.jpg >/dev/null
