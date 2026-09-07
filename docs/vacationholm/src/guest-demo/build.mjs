#!/usr/bin/env node
import { build } from '/Users/devbydylan/Documents/projects/listings/node_modules/esbuild/lib/main.js';
import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here=dirname(fileURLToPath(import.meta.url));
const listings=process.env.LISTINGS_REPO||'/Users/devbydylan/Documents/projects/listings';
const out=resolve(here,'.build'); mkdirSync(out,{recursive:true}); const stub=resolve(here,'stubs.tsx');
const aliases=new Map([
  ['next/navigation',stub],['next/link',resolve(here,'link-shim.tsx')],['next/image',resolve(here,'image-shim.tsx')],['@/components/auth-provider',stub],
  ['@/hooks/use-currency',stub],['@/lib/analytics',stub],['@/components/listings-map',stub],
  ['@/components/language-switcher',stub],
  ['@/components/nearby',stub],['@/components/listing-detail-map',stub],['@/lib/amenities',stub],
  ['@/lib/attractions',stub],['react-i18next',stub],['gsap',resolve(here,'gsap-shim.ts')],['gsap/ScrollToPlugin',resolve(here,'gsap-shim.ts')]
]);
await build({absWorkingDir:listings,entryPoints:[resolve(here,'entry.tsx')],outfile:resolve(out,'guest-demo.js'),bundle:true,format:'esm',platform:'browser',jsx:'automatic',nodePaths:[resolve(listings,'node_modules')],plugins:[{name:'guest-fixture-adapters',setup(b){
  b.onResolve({filter:/^@listings-page\/search$/},()=>({path:resolve(listings,'app/search/page.tsx')}));
  b.onResolve({filter:/^@listings-page\/listing$/},()=>({path:resolve(listings,'app/listings/[id]/page.tsx')}));
  b.onResolve({filter:/^@listings\//},args=>({path:resolve(listings,args.path.slice('@listings/'.length)+'.tsx')}));
  b.onResolve({filter:/.*/},args=>aliases.has(args.path)?{path:aliases.get(args.path)}:null);
}}]});
const componentCss=existsSync(resolve(out,'guest-demo.css'))?readFileSync(resolve(out,'guest-demo.css'),'utf8'):'';
copyFileSync(resolve(here,'index.html'),resolve(out,'index.html'));
const cssDir=resolve(listings,'.next/static/css');
const cssName=readdirSync(cssDir).find(name=>name.endsWith('.css')&&readFileSync(join(cssDir,name),'utf8').includes('--color-primary-900')&&readFileSync(join(cssDir,name),'utf8').includes('.text-muted-foreground'));
if(!cssName) throw new Error('Compiled listings CSS not found.');
writeFileSync(resolve(out,'guest-demo.css'),readFileSync(join(cssDir,cssName),'utf8')+'\n'+componentCss+'\n'+readFileSync(resolve(here,'guest-extra.css'),'utf8'));
console.log(`Built real guest pages with adapters and ${cssName}.`);
