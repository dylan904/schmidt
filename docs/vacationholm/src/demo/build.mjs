#!/usr/bin/env node
import { build } from '/Users/devbydylan/Documents/projects/listings/node_modules/esbuild/lib/main.js';
import { copyFileSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const listings = process.env.LISTINGS_REPO || '/Users/devbydylan/Documents/projects/listings';
const out = resolve(here, 'dist');
mkdirSync(out, { recursive: true });

await build({
  absWorkingDir: listings,
  entryPoints: [resolve(here, 'entry.tsx')],
  outfile: resolve(out, 'app.js'),
  bundle: true,
  format: 'esm',
  platform: 'browser',
  jsx: 'automatic',
  sourcemap: false,
  nodePaths: [resolve(listings, 'node_modules')],
  plugins: [{
    name: 'portfolio-next-link-shim',
    setup(build) {
      build.onResolve({ filter: /^next\/link$/ }, () => ({ path: resolve(here, 'link-shim.tsx') }));
      build.onResolve({ filter: /^@listings\// }, args => ({ path: resolve(listings, `${args.path.slice('@listings/'.length)}.tsx`) }));
    },
  }],
});

copyFileSync(resolve(here, 'index.html'), resolve(out, 'index.html'));
const cssDir = resolve(listings, '.next/static/css');
const cssName = readdirSync(cssDir).find((name) => {
  if (!name.endsWith('.css')) return false;
  const css = readFileSync(join(cssDir, name), 'utf8');
  return css.includes('--color-primary-900') && css.includes('.text-muted-foreground');
});
if (!cssName) throw new Error('Run the listings Next build first; its compiled application CSS was not found.');
writeFileSync(
  resolve(out, 'demo.css'),
  readFileSync(join(cssDir, cssName), 'utf8') + '\n' + readFileSync(resolve(here, 'demo-extra.css'), 'utf8')
);
console.log(`Built actual insight components with ${cssName}.`);
