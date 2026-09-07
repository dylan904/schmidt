#!/usr/bin/env node
import { build } from '/Users/devbydylan/Documents/projects/listings/node_modules/esbuild/lib/main.js';
import { copyFileSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const listings = process.env.LISTINGS_REPO || '/Users/devbydylan/Documents/projects/listings';
const out = resolve(here, 'dist');
mkdirSync(out, { recursive: true });

const aliases = new Map([
  ['next/link', 'link-shim.tsx'],
  ['next/image', 'image-shim.tsx'],
  ['next/navigation', 'navigation-shim.ts'],
  ['next/font/google', 'google-font-shim.ts'],
  ['next/font/local', 'local-font-shim.ts'],
  ['react-i18next', 'i18n-shim.ts'],
  ['@/components/auth-provider', 'auth-shim.ts'],
  ['@/contexts/search-context', 'search-context-shim.ts'],
  ['@/components/ui/primary-search', 'primary-search-shim.tsx'],
  ['@/components/language-switcher', 'language-switcher-shim.tsx'],
  ['@/hooks/use-availability', 'availability-shim.ts'],
  ['@/lib/analytics', 'analytics-shim.ts'],
]);

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
  loader: { '.json': 'json' },
  plugins: [{
    name: 'portfolio-host-demo-boundaries',
    setup(esbuild) {
      esbuild.onResolve({ filter: /.*/ }, args => {
        const shim = aliases.get(args.path);
        if (shim) return { path: resolve(here, shim) };
        if (args.path === '@listings/app/host/dashboard/page') {
          return { path: resolve(listings, 'app/host/dashboard/page.tsx') };
        }
        if (args.path === '@listings/components/header') {
          return { path: resolve(listings, 'components/header.tsx') };
        }
        return null;
      });
    },
  }],
});

for (const file of ['index.html', 'demo-extra.css', 'courtyard.webp', 'lagoon-house.svg', 'cliff-cottage.svg']) {
  copyFileSync(resolve(here, file), resolve(out, file));
}
mkdirSync(resolve(out, 'icons/brand'), { recursive: true });
for (const file of ['logo-icon.svg', 'logo-verbiage.svg']) {
  copyFileSync(resolve(listings, 'public/icons/brand', file), resolve(out, 'icons/brand', file));
}

const cssDir = resolve(listings, '.next/static/css');
const cssName = readdirSync(cssDir).find(name => {
  if (!name.endsWith('.css')) return false;
  const css = readFileSync(join(cssDir, name), 'utf8');
  return css.includes('--color-primary-900') && css.includes('.text-muted-foreground');
});
if (!cssName) throw new Error('Compiled VacationHolm application CSS was not found.');
writeFileSync(
  resolve(out, 'demo.css'),
  readFileSync(join(cssDir, cssName), 'utf8') + '\n' + readFileSync(resolve(here, 'demo-extra.css'), 'utf8')
);
console.log(`Built the actual host dashboard and Insights components with ${cssName}.`);
