#!/usr/bin/env node
/* Checks for the publish sync in brief.js. Playwright, one file, plain asserts.

     mkdir -p /tmp/bt && cp assets/{brief.css,brief.js,test-fixture.html} /tmp/bt/
     cp assets/test-sync.mjs <a-repo-with-playwright>/ && node test-sync.mjs /tmp/bt

   Silence and exit 0 means pass; a summary of the observed values is printed
   either way. It serves the fixture over HTTP rather than file://, because the
   thing under test is a document inside a sandboxed frame and file:// does not
   give a frame an origin to be sandboxed away from.

   The fake host page here is the CONTRACT the real Publish page has to meet:
   answer the document's hello, forward its `base`/`next` to the review endpoint,
   and post the reply back. The Node side implements the documented server merge
   — an unprefixed key is taken whole, the highest numeric lastEdit wins, a tie
   resolves to the server — so a regression in how the runtime stamps lastEdit
   shows up here as a lost answer rather than as a passing test. */

import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { chromium } from 'playwright';

const DIR = process.argv[2];
if (!DIR) { console.error('usage: test-sync.mjs <dir with brief.js, brief.css, test-fixture.html>'); process.exit(2); }

/* ── the fixture, published and unpublished ─────────────────────────────── */
const fixture = readFileSync(join(DIR, 'test-fixture.html'), 'utf8');
assert.ok(/<body data-brief-id="[^"]+"/.test(fixture), 'the fixture carries a brief id');
const published = fixture.replace(/<body (data-brief-id="[^"]+")/,
  '<body $1 data-publish-slug="test-brief" data-visibility="private"');
assert.notEqual(published, fixture, 'the published fixture is stamped');

const HOST_PAGE = (sandbox) => `<!doctype html><meta charset="utf-8"><title>host</title>
<iframe id="f" sandbox="${sandbox}" src="/brief.html" style="width:900px;height:600px;border:0"></iframe>
<script>
  window.__seen = [];
  window.__offline = location.search.indexOf('offline') > -1;
  addEventListener('message', async function (e) {
    var d = e.data;
    if (!d || d.v !== 1) return;
    window.__seen.push(d.type);
    var w = document.getElementById('f').contentWindow;
    if (d.type === 'brief-sync-hello') { w.postMessage({ v: 1, type: 'brief-sync-init' }, '*'); return; }
    if (d.type !== 'brief-sync-put') return;
    if (window.__offline) { w.postMessage({ v: 1, type: 'brief-sync-res', id: d.id, ok: false, error: 'offline' }, '*'); return; }
    var r = await window.__review({ base: d.base, next: d.next });
    w.postMessage({ v: 1, type: 'brief-sync-res', id: d.id, ok: true, store: r.store, overCap: false }, '*');
  });
</script>`;

/* ── the fake review endpoint's merge, as documented ────────────────────── */
let STORE = {};
const lastEdit = (v) => { try { return Number(JSON.parse(v).lastEdit) || 0; } catch { return 0; } };
function serverMerge(base, next) {
  const out = Object.assign({}, STORE);
  for (const k of Object.keys(next || {})) {
    if (out[k] === undefined) { out[k] = next[k]; continue; }
    if (lastEdit(next[k]) > lastEdit(out[k])) out[k] = next[k];   // a tie stays with the server
  }
  STORE = out;
  return { store: STORE };
}

/* ── serve it ───────────────────────────────────────────────────────────── */
const TYPES = { '.js': 'text/javascript', '.css': 'text/css', '.html': 'text/html' };
let sandbox = 'allow-scripts allow-same-origin';
let briefHtml = published;
const server = createServer((req, res) => {
  const path = req.url.split('?')[0];
  const send = (type, body) => { res.writeHead(200, { 'content-type': type + '; charset=utf-8' }); res.end(body); };
  if (path === '/' || path === '/host.html') return send('text/html', HOST_PAGE(sandbox));
  if (path === '/brief.html') return send('text/html', briefHtml);
  const ext = path.slice(path.lastIndexOf('.'));
  if (TYPES[ext]) { try { return send(TYPES[ext], readFileSync(join(DIR, path.slice(1)))); } catch {} }
  res.writeHead(404); res.end('no');
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const ORIGIN = 'http://127.0.0.1:' + server.address().port;

const browser = await chromium.launch();
const out = {};

/* ── 1. an unpublished brief makes no request and posts no message ───────
   Counted at the browser, not read off the source: every request the page makes
   after its own document is recorded, and the host records every message it is
   sent. Both have to be empty. */
{
  briefHtml = fixture; sandbox = 'allow-scripts allow-same-origin';
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  const reqs = [];
  page.on('request', (r) => reqs.push(r.url()));
  await page.goto(ORIGIN + '/host.html');
  const frame = page.frameLocator('#f');
  await frame.locator('#ans-Q1').fill('typed on an unpublished brief');
  await frame.locator('section[data-q="Q1"] .tick input').check();
  await page.waitForTimeout(2000);
  /* The page, the frame document, the runtime and the stylesheet, and nothing else. */
  out.unpublishedExtraRequests = reqs.filter((u) => !/\/(host\.html|brief\.html|brief\.js|brief\.css)$/.test(u) && u !== ORIGIN + '/');
  out.unpublishedMessages = await page.evaluate(() => window.__seen);
  out.unpublishedStoreKeys = Object.keys(STORE ?? {});
  await ctx.close();
}
assert.deepEqual(out.unpublishedExtraRequests, [], 'an unpublished brief makes no extra request');
assert.deepEqual(out.unpublishedMessages, [], 'an unpublished brief posts no message to its host');
assert.deepEqual(Object.keys(STORE), [], 'an unpublished brief writes nothing to the server');

/* ── 2. the copy button is untouched by any of this ──────────────────────
   The published document and the unpublished one must put byte-identical JSON
   on the clipboard for the same interactions, so nothing the sync adds to the
   stored blob can leak into what the reader pastes back into the chat. */
async function copyAfterAnswer(html) {
  briefHtml = html;
  const ctx = await browser.newContext();
  await ctx.grantPermissions(['clipboard-read', 'clipboard-write']);
  const page = await ctx.newPage();
  await page.exposeFunction('__review', ({ base, next }) => serverMerge(base, next));
  await page.goto(ORIGIN + '/host.html');
  const frame = page.frameLocator('#f');
  await frame.locator('#ans-Q1').fill('the same answer, both ways');
  await frame.locator('section[data-q="Q1"] .tick input').check();
  await page.waitForTimeout(600);
  await frame.locator('#copyBtn').click();
  const text = await page.evaluate(() => navigator.clipboard.readText());
  await ctx.close();
  return text;
}
const plainCopy = await copyAfterAnswer(fixture);
STORE = {};
const pubCopy = await copyAfterAnswer(published);
const strip = (s) => s.replace(/"exported": "[^"]*"/, '"exported": "-"');
out.copyIdentical = strip(plainCopy) === strip(pubCopy);
out.copyHasNoLastEdit = !/lastEdit/.test(pubCopy);
assert.ok(out.copyIdentical, 'the copy payload is unchanged by publishing');
assert.ok(out.copyHasNoLastEdit, 'lastEdit never reaches the clipboard');

/* ── 3. offline holds the comment, and the next connection sends it ──────── */
STORE = {};
briefHtml = published;
{
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  await page.exposeFunction('__review', ({ base, next }) => serverMerge(base, next));
  /* Offline from the very first byte: the document flushes once as soon as the
     host answers its hello, which is before any evaluate() could land. */
  await page.goto(ORIGIN + '/host.html?offline=1');
  const frame = page.frameLocator('#f');
  await comment(frame, 'section.brief-section .sec-body p', 'written while offline');
  await page.waitForTimeout(2000);
  out.offlineServerEmpty = Object.keys(STORE).length === 0;
  out.offlineHeldLocally = await frameEval(page, () => JSON.parse(
    localStorage.getItem(Object.keys(localStorage).find((k) => k.indexOf('brief:') === 0))
  ).comments.length);
  /* Back on the network: nothing else happens on the page, the reconnection
     itself is what sends the held comment. */
  await page.evaluate(() => { window.__offline = false; });
  await frameEval(page, () => window.dispatchEvent(new Event('online')));
  await page.waitForTimeout(1500);
  out.afterReconnect = serverComments();
  await ctx.close();
}
assert.ok(out.offlineServerEmpty, 'nothing reached the server while offline');
assert.equal(out.offlineHeldLocally, 1, 'the comment was held locally while offline');
assert.equal(out.afterReconnect.length, 1, 'the held comment reached the server on reconnection');

/* ── 4. two browsers, one brief, neither comment lost ────────────────────
   Separate contexts, so separate localStorage — this is two devices, not two
   tabs. Neither device polls: it learns what the other wrote on its next save,
   which is the round the assertions below wait for. */
STORE = {};
{
  const A = await browser.newContext();
  const B = await browser.newContext();
  const pa = await A.newPage(); const pb = await B.newPage();
  for (const p of [pa, pb]) await p.exposeFunction('__review', ({ base, next }) => serverMerge(base, next));
  await pa.goto(ORIGIN + '/host.html');
  const fa = pa.frameLocator('#f');
  await comment(fa, 'section.brief-section .sec-body p', 'comment from device A');
  await fa.locator('#ans-Q1').fill('A typed this answer');
  await pa.waitForTimeout(2000);

  /* B opens after A has written, so it starts from A's store. */
  await pb.goto(ORIGIN + '/host.html');
  const fb = pb.frameLocator('#f');
  await pb.waitForTimeout(1500);
  await comment(fb, 'section[data-q="Q1"] p.assume', 'comment from device B');
  await pb.waitForTimeout(2000);
  out.serverAfterB = serverComments();

  /* A saves again — that is when it hears about B. */
  await fa.locator('section[data-q="Q1"] .tick input').check();
  await pa.waitForTimeout(2500);
  out.deviceA = await frameComments(pa);
  await pb.waitForTimeout(200);
  await fb.locator('section[data-q="Q1"] .tick input').check();
  await pb.waitForTimeout(2500);
  out.deviceB = await frameComments(pb);
  out.serverFinal = serverComments();
  out.answerOnB = await fb.locator('#ans-Q1').inputValue();
  await A.close(); await B.close();
}
const both = ['comment from device A', 'comment from device B'];
assert.deepEqual(out.deviceA.sort(), both, 'device A holds both comments');
assert.deepEqual(out.deviceB.sort(), both, 'device B holds both comments');
assert.deepEqual(out.serverFinal.sort(), both, 'the server holds both comments');
assert.equal(out.answerOnB, 'A typed this answer', "A's answer reached B");

await browser.close();
server.close();
console.log(JSON.stringify(out, null, 1));

/* ── helpers ─────────────────────────────────────────────────────────────── */
function serverComments() {
  const k = Object.keys(STORE).find((x) => x.indexOf('brief:') === 0);
  return k ? JSON.parse(STORE[k]).comments.map((c) => c.comment) : [];
}
function frameEval(page, fn) { return page.frames()[1].evaluate(fn); }
function frameComments(page) {
  return frameEval(page, () => JSON.parse(
    localStorage.getItem(Object.keys(localStorage).find((k) => k.indexOf('brief:') === 0))
  ).comments.map((c) => c.comment));
}
/* Select the block and raise the mouse INSIDE the frame. A page-level
   page.mouse.up() lands outside the iframe and the popover never opens. */
async function comment(frame, selector, text) {
  await frame.locator(selector).first().evaluate((el) => {
    const r = document.createRange();
    r.selectNodeContents(el);
    const s = getSelection(); s.removeAllRanges(); s.addRange(r);
    el.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
  });
  await frame.locator('#cpop textarea').waitFor({ timeout: 3000 });
  await frame.locator('#cpop textarea').fill(text);
  await frame.locator('#cpop [data-act="save"]').click();
}
