import assert from 'node:assert/strict';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const src = dirname(fileURLToPath(import.meta.url));
const root = resolve(src, '../../..');
let images = 0;

const html = readFileSync(resolve(src, 'use-cases.template.html'), 'utf8').replace(
  /\{\{IMG:([a-z-]+)\}\}/g,
  (_, name) => {
    images++;
    const image = readFileSync(resolve(root, `images/full/vacationholm/${name}.webp`));
    return `data:image/webp;base64,${image.toString('base64')}`;
  }
);

assert.equal(images, 6, 'The document should include six illustrative screenshots');
assert.ok(!html.includes('{{'), 'Unresolved document token');

mkdirSync(resolve(root, 'portfolio/vacationholm'), { recursive: true });
writeFileSync(resolve(root, 'portfolio/vacationholm/use-cases.html'), html);
writeFileSync(resolve(src, '../use-cases.html'), html);
console.log('Built identical public and offline VacationHolm use-case documents with six embedded screenshots.');
