#!/usr/bin/env node
import { execFileSync,spawn } from 'node:child_process';
import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';
import { mkdirSync,readFileSync,rmSync,writeFileSync } from 'node:fs';
import { dirname,resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
const here=dirname(fileURLToPath(import.meta.url)),root=resolve(here,'../../../..');
const listings=process.env.LISTINGS_REPO||'/Users/devbydylan/Documents/projects/listings';
const {launch}=createRequire(resolve(listings,'package.json'))('puppeteer'); const out=resolve(root,'images/vacationholm'); mkdirSync(out,{recursive:true});
const sha=p=>createHash('sha256').update(readFileSync(p)).digest('hex');
const fixture=JSON.parse(readFileSync(resolve(here,'fixtures.json'),'utf8'));
const photoUrls=[...new Set(fixture.search.flatMap(listing=>listing.listing_images.map(image=>image.url)))];
execFileSync(process.execPath,[resolve(here,'build.mjs')],{stdio:'inherit',env:{...process.env,LISTINGS_REPO:listings}});
const server=spawn('python3',[resolve(here,'demo-server.py')],{stdio:['ignore','ignore','inherit']}); const stop=()=>{if(!server.killed)server.kill('SIGTERM')};
try{
  for(let i=0;i<40;i++){try{if((await fetch('http://127.0.0.1:8796/')).ok)break}catch{} await new Promise(r=>setTimeout(r,100)); if(i===39)throw new Error('Guest fixture server did not start')}
  const browser=await launch({headless:true}); const page=await browser.newPage(); await page.setViewport({width:1280,height:800,deviceScaleFactor:1});
  const guests=encodeURIComponent(JSON.stringify({rooms:1,adults:2,children:0,childAges:[],infants:0,pets:0}));
  await page.goto(`http://127.0.0.1:8796/?view=search&island=S%C3%A3o%20Miguel&checkIn=2026-09-18&checkOut=2026-09-25&guests=${guests}`,{waitUntil:'networkidle0'});
  await page.waitForFunction(()=>document.body.innerText.includes('3 Properties Found')); await page.screenshot({path:resolve(out,'guest-search.png')});
  await page.setViewport({width:1280,height:900,deviceScaleFactor:1});
  await page.goto(`http://127.0.0.1:8796/?view=listing&checkIn=2026-09-18&checkOut=2026-09-25&guests=2`,{waitUntil:'networkidle0'});
  await page.waitForFunction(()=>document.body.innerText.includes('Fictional Lagoon House')&&document.body.innerText.includes('Stay total'));
  await page.evaluate(()=>{const button=[...document.querySelectorAll('button')].find(node=>node.textContent?.trim()==='Send Inquiry'); if(!(button instanceof HTMLElement))throw new Error('Send Inquiry button missing'); button.click()});
  await page.waitForSelector('[role="dialog"]'); await page.type('#inquiry-message','Hello, we are visiting São Miguel for a week and would love to stay near Lagoa. Is parking available after 8 PM?'); await page.screenshot({path:resolve(out,'guest-inquiry.png')});
  writeFileSync(resolve(here,'capture-provenance.json'),JSON.stringify({notice:'All properties, guest details, dates, prices, availability and outcomes are fictional.',source_components:{'components/header.tsx':sha(resolve(listings,'components/header.tsx')),'components/ui/primary-search/index.tsx':sha(resolve(listings,'components/ui/primary-search/index.tsx')),'app/search/page.tsx':sha(resolve(listings,'app/search/page.tsx')),'app/listings/[id]/page.tsx':sha(resolve(listings,'app/listings/[id]/page.tsx'))},fixture_sha256:sha(resolve(here,'fixtures.json')),adapters:['Next navigation, Link and Image','anonymous auth','EUR currency','no-op analytics','offline map and nearby panels','read-only JSON endpoints'],photos:{source_reference:'app/home/index.tsx',urls:photoUrls},viewports:{'guest-search.png':{width:1280,height:800},'guest-inquiry.png':{width:1280,height:900}},browser:await browser.version()},null,2)+'\n');
  await browser.close(); console.log('Captured guest-search.png at 1280x800 and guest-inquiry.png at 1280x900.');
}finally{stop();rmSync(resolve(here,'.build'),{recursive:true,force:true})}
