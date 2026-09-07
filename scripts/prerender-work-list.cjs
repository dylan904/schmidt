#!/usr/bin/env node
const fs = require('node:fs');
const vm = require('node:vm');

const [modeOrPage, pageOrSource, sourceArg] = process.argv.slice(2);
const checkOnly = modeOrPage === '--check';
const pagePath = checkOnly ? pageOrSource : modeOrPage;
const sourcePath = checkOnly ? sourceArg : pageOrSource;

if (!pagePath || !sourcePath) {
  console.error('Usage: node scripts/prerender-work-list.cjs [--check] PAGE COMPONENT');
  process.exit(2);
}

const source = fs.readFileSync(sourcePath, 'utf8');

function staticValue(name) {
  const marker = `static ${name} =`;
  const markerAt = source.indexOf(marker);
  if (markerAt < 0) throw new Error(`Missing ${marker} in ${sourcePath}`);

  const start = source.slice(markerAt + marker.length).search(/[\[{]/) + markerAt + marker.length;
  const pairs = { '{': '}', '[': ']' };
  const stack = [];
  let quote = '';
  let escaped = false;
  let lineComment = false;
  let blockComment = false;

  for (let i = start; i < source.length; i += 1) {
    const char = source[i];
    const next = source[i + 1];
    if (lineComment) {
      if (char === '\n') lineComment = false;
      continue;
    }
    if (blockComment) {
      if (char === '*' && next === '/') { blockComment = false; i += 1; }
      continue;
    }
    if (quote) {
      if (escaped) escaped = false;
      else if (char === '\\') escaped = true;
      else if (char === quote) quote = '';
      continue;
    }
    if (char === '/' && next === '/') { lineComment = true; i += 1; continue; }
    if (char === '/' && next === '*') { blockComment = true; i += 1; continue; }
    if (char === "'" || char === '"' || char === '`') { quote = char; continue; }
    if (pairs[char]) stack.push(pairs[char]);
    else if (char === stack.at(-1) && stack.pop() && stack.length === 0) {
      return vm.runInNewContext(`(${source.slice(start, i + 1)})`, Object.create(null), { timeout: 1000 });
    }
  }
  throw new Error(`Unclosed static ${name} initializer in ${sourcePath}`);
}

const escape = (value) => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;');
const idFor = (title) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const variant = (path, directory) => path.endsWith('.png')
  ? path.replace('/images/', `/images/${directory}/`).replace(/\.png$/, '.webp')
  : path;

const meta = staticValue('meta');
const items = new Map(staticValue('items').map((item) => [item.title, item]));
const cards = Object.entries(meta).map(([title, details]) => {
  const item = items.get(title);
  if (!item) throw new Error(`No item data for ${title}`);
  const featured = details.no === '01';
  const hasGallery = Array.isArray(item.slides) && item.slides.length > 0;
  const image = `<img src="${escape(variant(item.img, 'cards'))}" width="1000" height="563" loading="${featured ? 'eager' : 'lazy'}" decoding="async" alt="Screenshot of ${escape(title)}">`;
  const shot = item.caseStudy
    ? `<a class="proj-shot" href="${escape(item.caseStudy)}" tabindex="-1" aria-hidden="true">${image}</a>`
    : `<div class="proj-shot">${image}</div>`;
  const heading = item.caseStudy ? `<a href="${escape(item.caseStudy)}">${escape(title)}</a>` : escape(title);
  const actions = [
    item.caseStudy && `<a class="btn primary" href="${escape(item.caseStudy)}">Read the case study</a>`,
    item.url && `<a class="btn" href="https://${escape(item.url)}" target="_blank" rel="noopener noreferrer">Visit ${escape(item.url)} <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8"/></svg></a>`,
    hasGallery && `<button class="btn" type="button" disabled title="Enable JavaScript to open the screenshot gallery">${item.slides.length} annotated screens</button>`,
  ].filter(Boolean).join('');

  return `<article class="proj${featured ? ' featured' : ''}" id="${idFor(title)}">${shot}<div class="proj-head"><h3>${heading}</h3><span class="badge ${escape(details.status)}">${escape(details.statusLabel)}</span></div><p class="proj-role">${escape(details.role)}</p><p class="sum">${escape(details.summary)}</p><ul class="tech">${item.categories.map((category) => `<li>${escape(category)}</li>`).join('')}</ul><div class="actions">${actions}</div></article>`;
}).join('');

let page = fs.readFileSync(pagePath, 'utf8');
const expected = `<work-list data-prerendered>${cards}</work-list>`;
if (checkOnly) {
  if (!page.includes(expected)) throw new Error(`${pagePath} does not contain the current pre-rendered work list`);
  const ids = [...cards.matchAll(/<article class="[^"]*" id="([^"]+)"/g)].map((match) => match[1]);
  if (ids.length !== Object.keys(meta).length || new Set(ids).size !== ids.length) {
    throw new Error('Pre-rendered work list has missing or duplicate project ids');
  }
  if (!source.includes("if (this.hasAttribute('data-prerendered'))")) {
    throw new Error('Client component does not remove the pre-rendered copy before Lit renders');
  }
  console.log(`work list: ${ids.length} unique projects, static HTML matches component data`);
} else {
  const placeholder = /<work-list(?: data-prerendered)?>[\s\S]*?<\/work-list>/;
  if (!placeholder.test(page)) throw new Error(`Expected one <work-list> in ${pagePath}`);
  page = page.replace(placeholder, expected);
  fs.writeFileSync(pagePath, page);
  console.log(`pre-rendered ${Object.keys(meta).length} projects into ${pagePath}`);
}
