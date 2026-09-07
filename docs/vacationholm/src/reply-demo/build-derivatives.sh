#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/../../../.."
command -v cwebp >/dev/null || { echo "need cwebp (brew install webp)"; exit 1; }
mkdir -p images/full/vacationholm images/thumbs/vacationholm

for name in reply-drafting; do
  src="images/vacationholm/$name.png"
  test -f "$src" || { echo "missing $src; run capture.mjs first"; exit 1; }
  cwebp -quiet -q 82 "$src" -o "images/full/vacationholm/$name.webp"
  cwebp -quiet -q 72 -resize 400 0 "$src" -o "images/thumbs/vacationholm/$name.webp"
done

echo "Built full and thumbnail WebP derivatives for the reply-drafting capture."
