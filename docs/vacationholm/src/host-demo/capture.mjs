#!/usr/bin/env node
import { execFileSync, spawn } from 'node:child_process';
import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '../../../..');
const listings = process.env.LISTINGS_REPO || '/Users/devbydylan/Documents/projects/listings';
const { launch } = createRequire(resolve(listings, 'package.json'))('puppeteer');
const mastersDir = resolve(root, 'images/vacationholm');
mkdirSync(mastersDir, { recursive: true });

const sourceFiles = [
  'app/host/dashboard/page.tsx',
  'components/header.tsx',
  'components/host-work-queue.tsx',
  'components/premium-insights.tsx',
  'components/portfolio-action-center.tsx',
  'components/reply-insights-panel.tsx',
  'components/charts/bar.tsx',
];
const demoFiles = [
  'build.mjs', 'capture.mjs', 'entry.tsx', 'fixtures.json', 'demo-extra.css',
  'auth-shim.ts', 'i18n-shim.ts', 'availability-shim.ts', 'search-context-shim.ts',
  'primary-search-shim.tsx', 'language-switcher-shim.tsx', 'analytics-shim.ts',
  'navigation-shim.ts', 'link-shim.tsx', 'image-shim.tsx', 'google-font-shim.ts',
  'local-font-shim.ts', 'courtyard.webp',
];
const sha256 = path => createHash('sha256').update(readFileSync(path)).digest('hex');

execFileSync(process.execPath, [resolve(here, 'build.mjs')], {
  stdio: 'inherit',
  env: { ...process.env, LISTINGS_REPO: listings },
});
const server = spawn('python3', [resolve(here, 'demo-server.py')], {
  stdio: ['ignore', 'ignore', 'inherit'],
});
const close = () => { if (!server.killed) server.kill('SIGTERM'); };
process.on('exit', close);
process.on('SIGINT', () => { close(); process.exit(130); });

try {
  for (let attempt = 0; attempt < 40; attempt++) {
    try {
      if ((await fetch('http://127.0.0.1:8795/')).ok) break;
    } catch {}
    await new Promise(resolveWait => setTimeout(resolveWait, 100));
    if (attempt === 39) throw new Error('Fixture server did not start.');
  }

  const browser = await launch({ headless: true });
  const browserVersion = await browser.version();
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 940, deviceScaleFactor: 1 });
  await page.goto('http://127.0.0.1:8795/', { waitUntil: 'networkidle0' });
  await page.waitForFunction(() => document.body.innerText.includes('Needs your attention') && document.body.innerText.includes('Your Listings'));
  await page.evaluate(async () => { await Promise.all([...document.images].map(image => image.complete ? null : new Promise(resolveImage => image.addEventListener('load', resolveImage, { once: true })))); });
  await page.screenshot({ path: resolve(mastersDir, 'host-dashboard.png') });
  console.log('Captured host-dashboard.png at 1280x940.');

  const buttons = await page.$$('button');
  let clicked = false;
  for (const button of buttons) {
    if ((await button.evaluate(node => node.textContent?.trim())) === 'Show Insights') {
      await button.click();
      clicked = true;
      break;
    }
  }
  if (!clicked) throw new Error('Dashboard Insights toggle was not found.');
  await page.waitForFunction(() => document.body.innerText.includes('Inquiries & Messages') && !document.body.innerText.includes('Loading insights'));
  await page.setViewport({ width: 1280, height: 1100, deviceScaleFactor: 1 });
  await page.evaluate(() => {
    document.documentElement.style.zoom = '0.8';
    const heading = [...document.querySelectorAll('h2')].find(node => node.textContent?.trim() === 'Insights');
    if (!heading) throw new Error('Insights overview heading was not found.');
    window.scrollTo(0, heading.getBoundingClientRect().top + window.scrollY - 120);
  });
  await page.screenshot({ path: resolve(mastersDir, 'insights-overview.png') });
  console.log('Captured insights-overview.png at 1280x1100.');

  for (const name of ['host-dashboard', 'insights-overview']) {
    const master = resolve(mastersDir, `${name}.png`);
    execFileSync('cwebp', ['-quiet', '-q', '86', master, '-o', resolve(root, `images/full/vacationholm/${name}.webp`)]);
    execFileSync('cwebp', ['-quiet', '-q', '82', '-resize', '400', '0', master, '-o', resolve(root, `images/thumbs/vacationholm/${name}.webp`)]);
  }

  writeFileSync(resolve(here, 'capture-provenance.json'), JSON.stringify({
    notice: 'All properties, inquiries, calendar states, counts, and timings are fictional portfolio fixtures.',
    source_repository: 'VacationHolm local source checkout',
    source_components: Object.fromEntries(sourceFiles.map(file => [file, sha256(resolve(listings, file))])),
    demo_sources: Object.fromEntries(demoFiles.map(file => [file, sha256(resolve(here, file))])),
    browser: browserVersion,
    viewports: {
      host_dashboard: { width: 1280, height: 940, device_scale_factor: 1 },
      insights_overview: { width: 1280, height: 1100, device_scale_factor: 1 },
    },
    overview_capture_scale: 0.8,
    source_asset: 'Legacy VacationHolm courtyard image referenced by app/home/index.tsx',
    masters: ['host-dashboard.png', 'insights-overview.png'],
    boundaries: ['fictional auth', 'English translations', 'Next.js navigation, image and font shims', 'read-only fixture HTTP responses'],
  }, null, 2) + '\n');
  await browser.close();
} finally {
  close();
  rmSync(resolve(here, 'dist'), { recursive: true, force: true });
}
