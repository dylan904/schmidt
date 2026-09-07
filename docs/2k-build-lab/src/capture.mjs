#!/usr/bin/env node
// Re-shoots every 2K Build Lab screenshot from the live site into images/2kbuildlab/.
// Run this when the product changes enough that the gallery looks dated.
//
//   NODE_PATH=/path/to/a/repo/with/playwright/node_modules \
//     node docs/2k-build-lab/src/capture.mjs
//
// Playwright is not a dependency of this static site, so point NODE_PATH at a
// project that already has it. Two images are NOT captured here:
//   result.png       exported from the app itself while signed in
//   measurements.png rendered from src/measurements.html, see README

import { execFileSync } from 'node:child_process';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const { chromium } = createRequire(import.meta.url)('playwright');

const SRC = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(SRC, '../../../images/2kbuildlab');
const BASE = 'https://2kbuildlab.com';
const requested = new Set(process.argv.slice(2));

// Matches the example build used across the landing page copy.
const TARGETS = [
  ['Three-Point', 96],
  ['Perimeter Defense', 92],
  ['Speed w/ Ball', 91],
  ['Agility', 90],
  ['Driving Dunk', 87],
];

const shot = async (page, name, opts = {}) => {
  if (requested.size && !requested.has(name)) return;
  const file = join(OUT, `${name}.png`);
  await page.screenshot({ path: file, ...opts });
  execFileSync('sips', ['-Z', '1440', file], { stdio: 'ignore' });
  console.log('  ', name);
};

async function startFresh(page) {
  const fresh = page.getByRole('button', { name: /Start fresh/i });
  if (await fresh.count()) {
    await fresh.first().click().catch(() => {});
    await page.waitForTimeout(700);
  }
}

async function setAttr(page, label, value) {
  const input = page.locator(`input[aria-label="${label} value"]`);
  if (!(await input.count())) throw new Error(`no attribute input labelled "${label}"`);
  await input.first().fill(String(value));
  await input.first().press('Tab');
  await page.waitForTimeout(250);
}

async function scrollHeadingTo(page, name, top = 150) {
  const el = page.getByRole('heading', { name, exact: true }).first();
  if (!(await el.count())) return false;
  await el.evaluate((heading, targetTop) => {
    window.scrollTo({
      top: window.scrollY + heading.getBoundingClientRect().top - targetTop,
      behavior: 'instant',
    });
  }, top);
  await page.waitForTimeout(1000);
  return true;
}

const browser = await chromium.launch(process.env.PLAYWRIGHT_EXECUTABLE_PATH
  ? { executablePath: process.env.PLAYWRIGHT_EXECUTABLE_PATH }
  : undefined);
const desktop = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
const page = await desktop.newPage();

console.log('marketing pages');
await page.goto(BASE, { waitUntil: 'networkidle' });
await page.waitForTimeout(1500);
await shot(page, 'landing');
if (await scrollHeadingTo(page, 'See the tradeoffs before you commit.')) await shot(page, 'tradeoffs');
if (await scrollHeadingTo(page, 'From targets to a build plan in five steps.')) await shot(page, 'how-it-works');

await page.goto(`${BASE}/pricing`, { waitUntil: 'networkidle' });
await page.waitForTimeout(1500);
if (await scrollHeadingTo(page, 'Choose how you want to optimize.', 250)) await shot(page, 'pricing');

console.log('builder');
await page.goto(`${BASE}/2k27/app`, { waitUntil: 'networkidle' });
await page.waitForTimeout(2500);
await startFresh(page);
await shot(page, 'builder');

for (const [label, value] of TARGETS) await setAttr(page, label, value);
const capBreakers = page.locator('input[aria-label*="Cap" i]');
if (await capBreakers.count()) {
  await capBreakers.first().fill('12');
  await capBreakers.first().press('Tab');
}
await page.waitForTimeout(2000);
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(800);
await shot(page, 'targets');
await shot(page, 'cap-breakers');

const rail = page.locator('text=BUILD READINESS').first();
if (await rail.count()) {
  const box = await rail.evaluate(el => {
    const { x, y, width, height } = (el.closest('aside,section,div') || el).getBoundingClientRect();
    return { x, y, width, height };
  });
  if (box.width > 50) {
    await shot(page, 'readiness', {
      clip: {
        x: Math.max(0, box.x - 10),
        y: Math.max(0, box.y - 10),
        width: Math.min(box.width + 20, 1440),
        height: Math.min(box.height + 20, 900 - box.y),
      },
    });
  }
}

const run = page.getByRole('button', { name: /Optimize anyway|Run full optimization/i });
if (await run.count()) {
  await run.first().click({ force: true }).catch(() => {});
  await page.waitForTimeout(3000);
  await shot(page, 'sign-in-gate');
}

console.log('conflicts and badges');
await page.goto(`${BASE}/2k27/app`, { waitUntil: 'networkidle' });
await page.waitForTimeout(2500);
await startFresh(page);
for (const label of ['Three-Point', 'Driving Dunk', 'Interior Defense', 'Perimeter Defense', 'Speed', 'Strength', 'Block', 'Ball Handle']) {
  await setAttr(page, label, 95);
}
await page.waitForTimeout(2000);
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(800);
await shot(page, 'conflicts');

await page.goto(`${BASE}/2k27/app`, { waitUntil: 'networkidle' });
await page.waitForTimeout(2500);
await startFresh(page);
const badges = page.getByRole('button', { name: /Build by Badges/i });
if (await badges.count()) {
  await badges.first().click();
  await page.waitForTimeout(1500);
  await shot(page, 'badges');
}

console.log('mobile');
const phone = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 3 });
const phonePage = await phone.newPage();
await phonePage.goto(`${BASE}/2k27/app`, { waitUntil: 'networkidle' });
await phonePage.waitForTimeout(3000);
await startFresh(phonePage);
await shot(phonePage, 'mobile');

await browser.close();
console.log('done');
