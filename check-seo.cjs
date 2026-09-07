// Run after bash build.sh. Checks the exact deployment output, without JavaScript.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const sitemap = fs.readFileSync('dist/sitemap.xml', 'utf8');
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
assert.equal(new Set(urls).size, urls.length, 'Duplicate sitemap URL');
let pages = 0;
function visit(directory) {
  for (const entry of fs.readdirSync(directory, {withFileTypes: true})) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) { visit(file); continue; }
    if (!file.endsWith('.html') || entry.name === '404.html') continue;
    const html = fs.readFileSync(file, 'utf8');
    const head = html.split('</head>')[0];
    const meta = (key) => head.match(new RegExp(`<meta (?:name|property)="${key}" content="([^"]+)"`))?.[1];
    assert.match(head, /<title>[^<]+<\/title>/, file);
    const canonical = head.match(/rel="canonical" href="([^"]+)"/)?.[1];
    assert(urls.includes(canonical), `${file}: canonical absent from sitemap`);
    assert.equal(meta('og:url'), canonical, file);
    for (const key of ['description', 'og:title', 'og:description', 'og:image', 'og:image:alt', 'twitter:title', 'twitter:description']) assert(meta(key), `${file}: missing ${key}`);
    assert.equal(meta('twitter:card'), 'summary_large_image', file);
    assert.equal(meta('twitter:image'), meta('og:image'), file);
    const image = new URL(meta('og:image'));
    assert.equal(image.origin, 'https://devbydylan.com');
    const bytes = fs.readFileSync(path.join('dist', image.pathname));
    assert(bytes.length > 0 && bytes.length < 1000000, `${file}: empty or excessive social image`);
    assert.equal(bytes.readUInt16BE(0), 0xffd8, `${file}: expected JPEG`);
    assert.equal(meta('og:image:width'), '1200', file);
    assert.equal(meta('og:image:height'), '630', file);
    pages++;
  }
}
visit('dist');
const home = fs.readFileSync('dist/index.html', 'utf8');
const schema = JSON.parse(home.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
assert(schema['@graph'].some(x => x['@type'] === 'Person' && x.name === 'Dylan Maxey'));
assert(schema['@graph'].some(x => x['@type'] === 'WebSite'));
assert.equal((home.match(/<article class="proj\b/g) || []).length, 11, 'Projects missing from initial HTML');
assert.match(fs.readFileSync('dist/robots.txt', 'utf8'), /Sitemap: https:\/\/devbydylan.com\/sitemap.xml/);
console.log(`${pages} indexable pages have sitemap entries, share metadata and local JPEG images; structured data and 11 static projects verified.`);
