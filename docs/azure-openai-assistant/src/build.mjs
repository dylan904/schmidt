// Embed screenshots so the public and offline use-case documents are identical.
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import assert from 'node:assert/strict';

const src = dirname(fileURLToPath(import.meta.url));
const root = resolve(src, '../../..');
let images = 0;
const html = readFileSync(resolve(src, 'use-cases.template.html'), 'utf8')
  .replace(/\{\{IMG:([a-z-]+)\}\}/g, (_, name) => {
    images++;
    return 'data:image/webp;base64,' + readFileSync(resolve(root, `images/full/azure-openai-assistant/${name}.webp`)).toString('base64');
  });
assert.equal(images, 2, 'The document should include both evidence screenshots');
assert.ok(!html.includes('{{'), 'Unresolved document token');
writeFileSync(resolve(root, 'portfolio/azure-openai-assistant/use-cases.html'), html);
writeFileSync(resolve(src, '../use-cases.html'), html);
console.log('Built identical public and offline use-case documents with two embedded screenshots.');
