#!/usr/bin/env node
import { createHash } from 'node:crypto';
import { execFileSync, spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '../../../..');
const listings = process.env.LISTINGS_REPO || '/Users/devbydylan/Documents/projects/listings';
const { launch } = createRequire(resolve(listings, 'package.json'))('puppeteer');
const out = resolve(root, 'images/vacationholm');
const sha256 = (path) => createHash('sha256').update(readFileSync(path)).digest('hex');
const sourceFiles = [
  'components/conversation-view.tsx',
  'components/quote-summary.tsx',
  'components/inquiry-outcome-control.tsx',
  'components/reusable-knowledge.tsx',
  'lib/smart-reply.ts',
];
const adapterFiles = [
  'build.mjs',
  'capture.mjs',
  'entry.tsx',
  'auth-shim.ts',
  'i18n-shim.ts',
  'link-shim.tsx',
  'demo-server.py',
  'demo-extra.css',
  'index.html',
];
const port = 18_000 + (process.pid % 10_000);
const baseUrl = `http://127.0.0.1:${port}`;
mkdirSync(out, { recursive: true });

execFileSync(process.execPath, [resolve(here, 'build.mjs')], {
  stdio: 'inherit',
  env: { ...process.env, LISTINGS_REPO: listings },
});
const server = spawn('python3', [resolve(here, 'demo-server.py')], {
  stdio: ['ignore', 'ignore', 'inherit'],
  env: { ...process.env, REPLY_DEMO_PORT: String(port) },
});
const close = () => {
  if (!server.killed) server.kill('SIGTERM');
};
process.on('exit', close);
process.on('SIGINT', () => {
  close();
  process.exit(130);
});

try {
  for (let attempt = 0; attempt < 40; attempt++) {
    try {
      const response = await fetch(`${baseUrl}/`);
      if (response.ok) break;
    } catch {}
    await new Promise((resolveWait) => setTimeout(resolveWait, 100));
    if (attempt === 39) throw new Error('Reply fixture server did not start.');
  }

  const browser = await launch({ headless: true });
  const browserVersion = await browser.version();
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 1 });

  await page.goto(`${baseUrl}/?lang=en`, { waitUntil: 'networkidle0' });
  await page.waitForFunction(() => document.body.innerText.includes('Smart Reply'));
  await page.evaluate(() => {
    const sources = [...document.querySelectorAll('details')].find((node) =>
      node.textContent?.includes('Sources used by this draft')
    );
    if (!(sources instanceof HTMLDetailsElement)) throw new Error('Draft sources were not found.');
    sources.open = true;
    const conversation = document.querySelector('#root > div');
    if (conversation instanceof HTMLElement) conversation.scrollTop = 0;
  });
  await new Promise((resolveWait) => setTimeout(resolveWait, 150));
  await page.screenshot({ path: resolve(out, 'reply-drafting.png') });

  writeFileSync(
    resolve(here, 'capture-provenance.json'),
    `${JSON.stringify(
      {
        notice: 'Every identity, property, message, date, amount, source, and draft is fictional.',
        behavior: 'Read requests return a static fixture. Draft-state PATCH requests return non-persistent acknowledgements; this capture triggers only shown. All other writes are rejected, and Send is never clicked.',
        focused_omission: 'Capture CSS hides the separate InquiryOutcomeControl section. The ConversationView reply, source, and composer markup is unchanged.',
        source_repository: listings,
        source_components: Object.fromEntries(
          sourceFiles.map((file) => [file, sha256(resolve(listings, file))])
        ),
        adapters: Object.fromEntries(adapterFiles.map((file) => [file, sha256(resolve(here, file))])),
        fixture_sha256: sha256(resolve(here, 'fixtures.json')),
        browser: browserVersion,
        viewport: { width: 1280, height: 900, device_scale_factor: 1 },
        masters: ['reply-drafting.png'],
      },
      null,
      2
    )}\n`
  );
  await browser.close();
} finally {
  close();
  rmSync(resolve(here, 'dist'), { recursive: true, force: true });
}
