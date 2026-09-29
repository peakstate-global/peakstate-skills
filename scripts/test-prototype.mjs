// Open a prototype HTML file from file:// in Chromium and run the prototype safety checks.
// Playwright is not a repo dependency. Install it anywhere, then run from that folder:
//   mkdir -p /tmp/pw && cd /tmp/pw && npm init -y && npm install playwright
//   node <repo>/scripts/test-prototype.mjs file.html [shot.png]   (exit 0 = safe and working)
// Checks: the banner shows, no request leaves file:/data:, no page error, no dialog, every
// data-go control and data-next form shows exactly its own target screen, and the static rules are clean.
import { createRequire } from 'node:module';
import { join } from 'node:path';
import fs from 'fs';
const { chromium } = createRequire(join(process.cwd(), 'x.js'))('playwright');
const f = process.argv[2]; const shot = process.argv[3] || f.replace(/\.html$/, '.png');
const src = fs.readFileSync(f, 'utf8'); const bad = [];
const rules = {
  'no-csp': !/<meta http-equiv="Content-Security-Policy" content="default-src 'none'/i.test(src),
  link: /<link[\s>]/i.test(src), '@import': /@import/i.test(src),
  'external-url': /(https?:)?\/\/[a-z0-9.-]+\.[a-z]{2,}/i.test(src.replace(/<!--[\s\S]*?-->/g, '')),
  'embed': /<(iframe|object|embed|base)[\s>]/i.test(src), 'on-attribute': /<[^>]+\son[a-z]+\s*=/i.test(src),
  'javascript-url': /javascript:/i.test(src), 'form-action': /<form[^>]*\saction\s*=/i.test(src),
  'network-api': /\b(fetch\s*\(|XMLHttpRequest|WebSocket|sendBeacon|EventSource)/.test(src),
  'unsafe-dom': /(innerHTML|outerHTML|insertAdjacentHTML|document\.write|\beval\s*\(|new Function)/.test(src),
};
for (const [k, v] of Object.entries(rules)) if (v) bad.push(k);
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1200, height: 800 } });
const errs = [], reqs = [], dialogs = [];
p.on('pageerror', e => errs.push(e.message)); p.on('dialog', d => { dialogs.push(d.message()); d.dismiss(); });
p.on('request', r => { const u = r.url(); if (!u.startsWith('file:') && !u.startsWith('data:')) reqs.push(u); });
const url = 'file://' + fs.realpathSync(f);
await p.goto(url);
const banner = await p.evaluate(() => { const e = document.getElementById('proto-banner'); if (!e) return null;
  const r = e.getBoundingClientRect(), s = getComputedStyle(e);
  return { text: e.textContent.trim(), visible: r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none' && r.top < innerHeight }; });
const bannerOk = !!banner && banner.visible && banner.text.includes('Prototype, not for production use');
// Each data-go click and each data-next submit must show exactly its own target screen.
const nav = await p.evaluate(() => { const out = { controls: 0, forms: 0, broken: [] };
  const check = (kind, t) => { const shown = [...document.querySelectorAll('.screen')].filter(s => !s.hidden);
    if (shown.length !== 1 || shown[0].id !== t) out.broken.push(kind + ':' + t); };
  document.querySelectorAll('[data-go]').forEach(el => { out.controls++; el.click(); check('go', el.getAttribute('data-go')); });
  document.querySelectorAll('form[data-next]').forEach(f => { out.forms++;
    f.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true })); check('next', f.getAttribute('data-next')); });
  return out; });
await p.goto(url); await p.screenshot({ path: shot }); await b.close();
const ok = bannerOk && !errs.length && !reqs.length && !dialogs.length && !bad.length && !nav.broken.length;
console.log(JSON.stringify({ file: f, screenshot: shot, banner, pageErrors: errs, externalRequests: reqs, dialogs, nav, static: bad.length ? bad : 'clean' }));
process.exit(ok ? 0 : 1);
