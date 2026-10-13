import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { demoRoutes, allDemoLandmarks } from '../lib/seed.ts';
import { distanceMeters, humanDistance, slugify } from '../lib/utils.ts';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');

test('two curated routes and six unique seeded landmarks',()=>{
 assert.equal(demoRoutes.length,2);
 assert.equal(allDemoLandmarks.length,6);
 assert.equal(new Set(demoRoutes.map(r=>r.slug)).size,2);
 assert.equal(new Set(allDemoLandmarks.map(l=>l.slug)).size,6);
 assert.deepEqual(new Set(demoRoutes.map(r=>r.city)),new Set(['Agra','Delhi']));
});

test('all landmark sources use a distinct UNESCO World Heritage list URL',()=>{
 const sources=allDemoLandmarks.map(l=>l.sourceUrl);
 assert.equal(new Set(sources).size,sources.length);
 for(const source of sources)assert.match(source,/^https:\/\/whc\.unesco\.org\/en\/list\/\d+\/$/);
});

test('all seed landmark data includes narrative, translation, timeline and valid coordinates',()=>{
 for(const l of allDemoLandmarks){
  assert.ok(l.storyEn.length>80,`${l.slug} English story`);
  assert.ok(l.storyHi.length>40,`${l.slug} Hindi story`);
  assert.ok(l.timeline.length>=3,`${l.slug} timeline`);
  assert.ok(l.latitude>=-90&&l.latitude<=90);
  assert.ok(l.longitude>=-180&&l.longitude<=180);
  assert.ok(demoRoutes.find(r=>r.id===l.routeId),`${l.slug} parent`);
  for(const event of l.timeline)assert.ok(event.year&&event.en&&event.hi);
 }
});

test('all bundled artwork referenced by seed and hero exists on disk and is SVG',()=>{
 const assets=[...demoRoutes.map(r=>r.image),...allDemoLandmarks.map(l=>l.image),'/images/hero.svg','/images/experience.svg','/images/auth.svg'];
 for(const asset of assets){
  assert.match(asset,/^\/images\/[\w-]+\.svg$/);
  const contents=fs.readFileSync(path.join(root,'public',asset),'utf8');
  assert.match(contents,/^<svg[\s>]/);
  assert.match(contents,/<\/svg>\s*$/);
 }
});

test('seed IDs reference existing route IDs consistently',()=>{
 for(const r of demoRoutes){assert.equal(r.landmarks.length,3);for(const l of r.landmarks)assert.equal(l.routeId,r.id)}
});

test('GPS distance: same coordinate = zero; symmetric; realistic Delhi–Agra gap',()=>{
 assert.equal(distanceMeters(27.1751,78.0421,27.1751,78.0421),0);
 const a=distanceMeters(28.6562,77.2410,27.1751,78.0421);
 const b=distanceMeters(27.1751,78.0421,28.6562,77.2410);
 assert.ok(a>150000&&a<230000);
 assert.ok(Math.abs(a-b)<.000001);
 assert.equal(humanDistance(250),'250 m');assert.equal(humanDistance(1500),'1.5 km');
});

test('slug normalizer removes unsafe URL characters',()=>{
 assert.equal(slugify('Taj Mahal!'),'taj-mahal');
 assert.equal(slugify('  Red Fort  '),'red-fort');
 assert.equal(slugify('Qutb Minar / Delhi'),'qutb-minar-delhi');
});

test('required public and private routes exist',()=>{
 for(const file of ['app/page.tsx','app/routes/page.tsx','app/routes/[slug]/page.tsx','app/landmarks/[slug]/page.tsx','app/ar/[slug]/page.tsx','app/scan/page.tsx','app/login/page.tsx','app/register/page.tsx','app/saved/page.tsx','app/admin/page.tsx','app/admin/content/page.tsx','app/admin/analytics/page.tsx'])assert.ok(fs.existsSync(path.join(root,file)),file);
});

test('Postgres migration declares the expected functional tables',()=>{
 const text=fs.readFileSync(path.join(root,'scripts/migrate.mjs'),'utf8');
 for(const name of ['users','routes','landmarks','favorites','visits','interactions','reviews'])assert.match(text,new RegExp(`CREATE TABLE IF NOT EXISTS ${name}\\s*\\(`));
});

test('no credentials are hardcoded in example environment file',()=>{
 const text=fs.readFileSync(path.join(root,'.env.example'),'utf8');
 assert.match(text,/DATABASE_URL=""/);assert.match(text,/JWT_SECRET=""/);assert.match(text,/ADMIN_PASSWORD=""/);
 assert.equal(fs.existsSync(path.join(root,'.env.local')),false);
});
