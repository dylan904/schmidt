#!/usr/bin/env node
// Builds docs/2k-build-lab/case-study.html: a single self-contained file with every
// screenshot inlined as a data URI, so it opens offline and survives being emailed.
//
//   node docs/2k-build-lab/src/build.mjs
//
// Source images come from images/2kbuildlab/*.png. Requires macOS `sips` to
// downscale and re-encode them as JPEG; inlining the PNGs directly would make
// the file roughly five times larger.

import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync, existsSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const SRC = dirname(fileURLToPath(import.meta.url));
const REPO = resolve(SRC, '../../..');
const PNGS = join(REPO, 'images/2kbuildlab');
const TEMPLATE = join(SRC, 'case-study.template.html');
const OUT = join(SRC, '..', 'case-study.html');

const MAX_WIDTH = 1100;
const JPEG_QUALITY = 72;

const TOKEN = /\{\{IMG:([a-z0-9-]+)\|([^|]*)\|([^|]*)\|([^|}]*)(?:\|([^}]*))?\}\}/g;

const escapeHtml = s => s
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const work = mkdtempSync(join(tmpdir(), 'buildlab-case-study-'));
const template = readFileSync(TEMPLATE, 'utf8');
let inlined = 0;

const out = template.replace(TOKEN, (_match, name, plate, title, caption, className) => {
  const png = join(PNGS, `${name}.png`);
  if (!existsSync(png)) throw new Error(`missing screenshot: ${png}`);

  const jpg = join(work, `${name}.jpg`);
  execFileSync('sips', [
    '-s', 'format', 'jpeg',
    '-s', 'formatOptions', String(JPEG_QUALITY),
    '-Z', String(MAX_WIDTH),
    png, '--out', jpg
  ], { stdio: 'ignore' });

  const data = readFileSync(jpg).toString('base64');
  inlined++;

  const alt = escapeHtml(`${title}. ${caption.slice(0, 140)}`);
  return `<figure${className ? ` class="${className.trim()}"` : ''}>
      <img src="data:image/jpeg;base64,${data}" alt="${alt}" loading="lazy">
      <figcaption><b>${escapeHtml(plate)} <span>/</span> ${escapeHtml(title)}</b>${escapeHtml(caption)}</figcaption>
    </figure>`;
});

const leftover = out.match(/\{\{IMG:[^}]*\}\}/g);
if (leftover) throw new Error(`unreplaced tokens: ${leftover.join(', ')}`);

// The published page inherits its <head> from the host, so the document must not
// depend on a charset declaration it does not control.
const nonAscii = [...out].filter(c => c.codePointAt(0) > 126);
if (nonAscii.length) {
  throw new Error(`template must be pure ASCII, use HTML entities. Found: ${JSON.stringify([...new Set(nonAscii)])}`);
}

writeFileSync(OUT, out);
console.log(`inlined ${inlined} screenshots -> ${OUT} (${(statSync(OUT).size / 1024 / 1024).toFixed(2)} MB)`);
