// Run after bash build.sh. Checks every deployed page's CSS/component URLs.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { createHash } = require('node:crypto');
let references = 0;
function checkPages(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) checkPages(file);
    else if (entry.name.endsWith('.html')) {
      const html = fs.readFileSync(file, 'utf8');
      for (const [, url] of html.matchAll(/(?:src|href)="(\/(?:css|components)\/[^\"]+)"/g)) {
        const match = url.match(/^(.*)\.([a-f0-9]{12})\.(css|js)$/);
        assert(match, `${file} still references an unversioned asset: ${url}`);
        const bytes = fs.readFileSync(`dist${url}`);
        const original = fs.readFileSync(`dist${match[1]}.${match[3]}`);
        assert.deepEqual(bytes, original, `${url} differs from its source`);
        assert.equal(createHash('sha256').update(bytes).digest('hex').slice(0, 12), match[2]);
        references++;
      }
    }
  }
}
checkPages('dist');
assert(references > 0, 'No asset references checked');
assert.match(fs.readFileSync('dist/_headers', 'utf8'), /Cache-Control: no-cache/);
console.log(`${references} fingerprinted asset references checked; cache revalidation enabled.`);
