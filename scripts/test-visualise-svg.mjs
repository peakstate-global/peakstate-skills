// Render an SVG from file:// in Chromium and run the visualise safety checks.
// Playwright is not a repo dependency. Install it anywhere, then run from that folder:
//   mkdir -p /tmp/pw && cd /tmp/pw && npm init -y && npm install playwright
//   node <repo>/scripts/test-visualise-svg.mjs file.svg   (exit 0 = renders and is safe)
// Fail fixture: evals/fixtures/visualise-unsafe.svg (an `<a href="javascript:...">` link)
// must exit 1 with safety including 'a-element' and 'javascript-url'.
import { createRequire } from 'node:module';
import { join } from 'node:path';
import fs from 'fs';
const { chromium } = createRequire(join(process.cwd(), 'x.js'))('playwright');
const f = process.argv[2]; const src = fs.readFileSync(f, 'utf8'); const bad = [];
if (/<script/i.test(src)) bad.push('script');
if (/\son[a-z]+\s*=/i.test(src)) bad.push('on-attribute');
if (/<foreignObject/i.test(src)) bad.push('foreignObject');
if (/<image[\s>]/i.test(src)) bad.push('image');
if (/<a[\s>]/i.test(src)) bad.push('a-element');
if (/javascript:/i.test(src)) bad.push('javascript-url');
if (/@import/i.test(src)) bad.push('@import');
const urls = (src.match(/https?:\/\/[^\s"')]+/g) || []).filter(u => u !== 'http://www.w3.org/2000/svg');
if (urls.length) bad.push('external:' + urls.join(','));
const b = await chromium.launch(); const p = await b.newPage(); const errs = []; const reqs = [];
p.on('pageerror', e => errs.push(e.message)); p.on('request', r => { if (!r.url().startsWith('file:')) reqs.push(r.url()); });
await p.goto('file://' + fs.realpathSync(f));
const ok = await p.evaluate(() => { const s = document.documentElement; return s.tagName.toLowerCase() === 'svg' && !document.querySelector('parsererror'); });
const texts = await p.evaluate(() => [...document.querySelectorAll('text,title')].map(t => t.textContent.trim()));
await p.screenshot({ path: f.replace(/\.svg$/, '.png') }); await b.close();
console.log(JSON.stringify({ file: f, rendered: ok, pageErrors: errs, externalRequests: reqs, safety: bad.length ? bad : 'clean', texts }));
process.exit(ok && !errs.length && !reqs.length && !bad.length ? 0 : 1);
