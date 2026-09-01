#!/usr/bin/env node
// Re-shoots the Destination Home screenshots by driving a real intake against a
// local build of the app. Writes PNG masters into images/destination-home/;
// run build-derivatives.sh afterwards to regenerate the WebP the site ships.
//
//   NODE_PATH=/path/to/a/repo/with/playwright/node_modules \
//     node docs/destination-home/src/capture.mjs
//
// Prerequisites, all in the lexicon_v2 repo:
//   docker compose up -d                          SQL Server, or sessions 500
//   OPENAI_API_KEY=... dotnet run --urls http://localhost:5283
//   cd angular && npx ng serve --port 4200
//
// Note the API needs its SessionDb connection string PRESENT even if SQL is
// down. With it blank the app takes its no-database path, where one endpoint's
// `sessions` parameter gets inferred as a body parameter and poisons the whole
// route matcher, so every request 500s. That is a known gap in the repo.

import { execFileSync } from 'node:child_process';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const { chromium } = createRequire(import.meta.url)('playwright');

const SRC = dirname(fileURLToPath(import.meta.url));
const OUT = process.env.SHOTS || resolve(SRC, '../../../images/destination-home');
const APP = process.env.APP || 'http://localhost:4200';

// One sentence that answers several intake cards at once, which is the feature
// the free-text shot exists to show. The taco truck is deliberate: it maps to no
// scorable factor, so the UI has to show it as something it did not rank on.
const INTAKE = "I need to be in Austin by November 14th. We want to rent a 2 bedroom, "
  + "budget about $2,600 a month. It's me, my partner and our dog. Full container move "
  + "plus one car. I'd love somewhere walkable with good coffee, live music nearby, a "
  + "short commute, and close to a decent taco truck.";

const mk = (page) => ({
  shot: async (name, opts = {}) => {
    const file = join(OUT, `${name}.png`);
    await page.screenshot({ path: file, ...opts });
    execFileSync('sips', ['-Z', '1440', file], { stdio: 'ignore' });
    console.log('   ', name);
  },
  // A reply is still arriving while a typing indicator or "Thinking" line is up.
  idle: async (max = 45000) => {
    const start = Date.now();
    while (Date.now() - start < max) {
      const busy = await page.evaluate(() =>
        /Thinking|Typing/i.test((document.querySelector('main') || document.body).innerText));
      if (!busy) { await page.waitForTimeout(1200); return; }
      await page.waitForTimeout(1000);
    }
  },
});

const say = async (page, text, waitMs = 24000) => {
  const box = page.locator('input[aria-label*="Answer or ask"], textarea[aria-label*="Answer or ask"]').first();
  await box.click();
  await box.fill(text);
  await page.getByRole('button', { name: /Send message/i }).click();
  await page.waitForTimeout(waitMs);
};

// Sessions persist, so clear whatever the previous run left behind.
const reset = async (page, shooter) => {
  const resume = page.getByRole('button', { name: /Pick up where I left off/i });
  if (await resume.count()) {
    await resume.click();
    await page.waitForTimeout(4000);
    await page.getByRole('button', { name: /^Restart$/ }).click({ force: true });
    await page.waitForTimeout(1800);
    if (shooter) await shooter.shot('confirm-dialog');
    await page.getByRole('button', { name: /^Start over$/ }).click({ force: true });
    await page.waitForTimeout(4000);
  }
  const start = page.getByRole('button', { name: 'Start my plan' });
  if (await start.count()) { await start.click(); await page.waitForTimeout(4000); }
};

// Answers the open card by taking the first option in each group, which is
// enough to reach the ranked areas without encoding the whole intake here.
const answerCard = async (page) => {
  const cards = await page.$$('.card');
  if (!cards.length) return false;
  const card = cards[cards.length - 1];
  const confirm = await card.$('.confirmRow button:not([disabled])');
  if (!confirm) return false;
  for (const g of await card.$$('.group')) {
    const date = await g.$('input[type="date"], input[inputmode="numeric"], input[placeholder*="/"]');
    if (date) { await date.fill('11/14/2026').catch(() => {}); continue; }
    const opt = await g.$('.optionGrid > *, .chipRow > *, .checkGrid > *');
    if (opt) await opt.click({ force: true }).catch(() => {});
  }
  await confirm.click({ force: true }).catch(() => {});
  await page.waitForTimeout(9000);
  return true;
};

const browser = await chromium.launch();

console.log('desktop');
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
const d = mk(page);
await page.goto(APP, { waitUntil: 'networkidle' });
await page.waitForTimeout(2500);
await d.shot('welcome');
await reset(page, d);
await d.shot('on-file');

// The account panel, taken before the thread grows past it.
await page.getByRole('button', { name: /^Account$/ }).first().click({ force: true }).catch(() => {});
await page.waitForTimeout(2500);
await d.shot('account');
await page.keyboard.press('Escape').catch(() => {});
await page.waitForTimeout(1200);

// A program question answered only from the corpus, with the source named.
await page.getByRole('button', { name: /What does my \$4,500 actually cover/i }).click().catch(() => {});
await page.waitForTimeout(16000);
await d.idle();
await d.shot('grounded-answer');

await page.getByRole('button', { name: /That's right/i }).click().catch(() => {});
await page.waitForTimeout(5000);
await say(page, INTAKE, 26000);
await d.idle();
await d.shot('free-text');

const hasMatches = () => page.locator('dh-neighborhood-matches').count().then(c => c > 0);
for (let i = 0; i < 10; i++) {
  if (await hasMatches()) break;
  if (!(await answerCard(page))) await say(page, "That's everything. Can you show me the neighborhood matches?", 24000);
  await d.idle();
}
if (!(await hasMatches())) console.log('   !! never reached the ranked areas');

const anythingElse = page.locator('.card:has-text("ANYTHING ELSE")').last();
if (await anythingElse.count()) {
  await anythingElse.scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  await d.shot('escalation');
}

if (await hasMatches()) {
  const matches = page.locator('dh-neighborhood-matches').first();
  if (!(await matches.locator('.collapsible.open').count())) {
    await matches.locator('.toggle').first().click({ force: true }).catch(() => {});
    await page.waitForTimeout(1500);
  }
  await matches.scrollIntoViewIfNeeded();
  await d.idle();
  await d.shot('neighborhoods');

  // The provenance plate is the top area expanded, clipped to itself.
  await matches.locator('.areaHead').first().click({ force: true }).catch(() => {});
  await page.waitForTimeout(1500);
  const box = await matches.locator('.area').first().boundingBox();
  if (box) await d.shot('provenance', {
    clip: {
      x: Math.max(0, box.x - 8), y: Math.max(0, box.y - 8),
      width: Math.min(box.width + 16, 1440),
      height: Math.min(box.height + 16, 900 - Math.max(0, box.y - 8)),
    },
  });
}
await page.close();

console.log('phone');
const phone = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 3 });
const mp = await phone.newPage();
const m = mk(mp);
await mp.goto(APP, { waitUntil: 'networkidle' });
await mp.waitForTimeout(2500);
await reset(mp, null).catch(() => {});
await m.idle();
await m.shot('mobile');

await browser.close();
console.log('done');
