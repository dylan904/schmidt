#!/usr/bin/env bash
# Convert original browser JPEG captures to PNG masters and shipping derivatives.
set -euo pipefail
cd "$(dirname "$0")/../../.."
mkdir -p images/full/azure-openai-assistant images/thumbs/azure-openai-assistant images/cards images/og
for name in model-selection assistant-preset document-question; do
  src="images/azure-openai-assistant/$name"
  sips -s format png "$src.jpg" --out "$src.png" >/dev/null
  cwebp -quiet -q 85 "$src.png" -o "images/full/azure-openai-assistant/$name.webp"
  cwebp -quiet -q 75 -resize 400 0 "$src.png" -o "images/thumbs/azure-openai-assistant/$name.webp"
done
cp images/azure-openai-assistant/document-question.png images/azure-openai-assistant.png
cwebp -quiet -q 85 -resize 1000 563 images/azure-openai-assistant.png -o images/cards/azure-openai-assistant.webp
capture_tmp=$(mktemp -d)
sips -s format jpeg -z 630 1120 images/azure-openai-assistant/document-question.png --out "$capture_tmp/social.jpg" >/dev/null
sips -p 630 1200 --padColor F7F7F5 "$capture_tmp/social.jpg" --out images/og/azure-openai-assistant.jpg >/dev/null
