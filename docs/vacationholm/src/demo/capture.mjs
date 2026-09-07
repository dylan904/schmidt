#!/usr/bin/env node
import { execFileSync, spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import { createHash } from 'node:crypto';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '../../../..');
const listings = process.env.LISTINGS_REPO || '/Users/devbydylan/Documents/projects/listings';
const { launch } = createRequire(resolve(listings, 'package.json'))('puppeteer');
const out = resolve(root, 'images/vacationholm');
mkdirSync(out, { recursive: true });
const sourceFiles = [
  'components/question-insights.tsx',
  'components/funnel-insights.tsx',
  'components/change-insights.tsx',
];
const sha256 = path => createHash('sha256').update(readFileSync(path)).digest('hex');

execFileSync(process.execPath, [resolve(here, 'build.mjs')], { stdio: 'inherit', env: { ...process.env, LISTINGS_REPO: listings } });
const server = spawn('python3', [resolve(here, 'demo-server.py')], { stdio: ['ignore', 'ignore', 'inherit'] });
const close = () => { if (!server.killed) server.kill('SIGTERM'); };
process.on('exit', close);
process.on('SIGINT', () => { close(); process.exit(130); });

try {
  for (let attempt = 0; attempt < 40; attempt++) {
    try {
      const response = await fetch('http://127.0.0.1:8794/');
      if (response.ok) break;
    } catch {}
    await new Promise(resolveWait => setTimeout(resolveWait, 100));
    if (attempt === 39) throw new Error('Fixture server did not start.');
  }

  const browser = await launch({ headless: true });
  const browserVersion = await browser.version();
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720, deviceScaleFactor: 1 });
  for (const view of ['questions', 'funnel', 'changes']) {
    await page.goto(`http://127.0.0.1:8794/?view=${view}`, { waitUntil: 'networkidle0' });
    await page.waitForSelector('.demo-disclosure');
    await page.waitForFunction(() => !document.body.innerText.includes('Loading'));
    await page.screenshot({ path: resolve(out, `${view}.png`) });
    console.log(`Captured ${view}.png at 1280x720.`);
  }
  writeFileSync(resolve(here, 'capture-provenance.json'), JSON.stringify({
    notice: 'Every property, conversation, date, count, and rate is fictional portfolio fixture data.',
    source_repository: listings,
    source_components: Object.fromEntries(sourceFiles.map(file => [file, sha256(resolve(listings, file))])),
    fixture_sha256: sha256(resolve(here, 'fixtures.json')),
    browser: browserVersion,
    viewport: { width: 1280, height: 720, device_scale_factor: 1 },
    masters: ['questions.png', 'funnel.png', 'changes.png'],
  }, null, 2) + '\n');
  await browser.close();
} finally {
  close();
  rmSync(resolve(here, 'dist'), { recursive: true, force: true });
}
