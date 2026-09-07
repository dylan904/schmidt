#!/usr/bin/env bash
# Build the shipped portfolio variants from the PNG masters.
set -euo pipefail

cd "$(dirname "$0")/../../.."
command -v cwebp >/dev/null || { echo "need cwebp (brew install webp)"; exit 1; }
mkdir -p images/full/vacationholm images/thumbs/vacationholm images/cards images/og

for src in images/vacationholm/*.png; do
  name=$(basename "$src" .png)
  cwebp -quiet -q 82 "$src" -o "images/full/vacationholm/$name.webp"
  cwebp -quiet -q 72 -resize 400 0 "$src" -o "images/thumbs/vacationholm/$name.webp"
done

cp images/vacationholm/guest-search.png images/vacationholm.png
cwebp -quiet -q 82 -resize 1000 0 images/vacationholm.png -o images/cards/vacationholm.webp

temp=$(mktemp -d)
trap 'rm -rf "$temp"' EXIT
sips --resampleWidth 1200 images/vacationholm.png --out "$temp/social.png" >/dev/null
sips -c 630 1200 "$temp/social.png" >/dev/null
sips -s format jpeg -s formatOptions 82 "$temp/social.png" --out images/og/vacationholm.jpg >/dev/null

echo "Built full images, thumbnails, a card, and an OG image."
