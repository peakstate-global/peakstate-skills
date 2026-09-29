// Browser test for the brief-lite template, from file://.
//
//   cd <a folder where `npm install playwright` has run>
//   node <repo>/scripts/test-brief-lite.mjs [brief.html]
//
// With no argument it fills the template in skills/brief-lite/references/template.md
// with sample text. With a path it tests a brief a model built from the skill.
// Checks: answer, comment, reload persists, Copy, Download, the JSON shape against
// evals/fixtures/brief-lite.json, the peakstate-brief filing flow, no external
// requests, comment text rendered as text, and the storage-blocked banner.
import { createRequire } from 'node:module';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync, existsSync, copyFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname, resolve, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const { chromium } = createRequire(join(process.cwd(), 'x.js'))('playwright');
const repo = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const work = mkdtempSync(join(tmpdir(), 'brief-lite-test-'));
const downloads = join(work, 'downloads');
const fails = [];
const check = (ok, what) => { console.log((ok ? 'ok   ' : 'FAIL ') + what); if (!ok) fails.push(what); };

let file = process.argv[2];
if (file) {
  file = resolve(file);
  const copy = join(work, basename(file));
  copyFileSync(file, copy);
  file = copy;
} else {
  const md = readFileSync(join(repo, 'skills/brief-lite/references/template.md'), 'utf8');
  const fill = {
    TITLE: 'Rostering options &amp; the Friday gap', BRIEF_ID: 'brief-lite-test-2026-09-29',
    ONE_SENTENCE_ANSWER: 'Adopt the four-day roster from next quarter.',
    SECTION_POINT: 'The four-day roster cut overtime', SUPPORTING_TEXT: 'The trial cut overtime, but cover drops on Fridays.',
    QUESTION: 'Do you accept the four-day roster as the default?', ASSUMPTION: 'You accept it.',
    WHAT_CHANGES: 'We keep five days.', APA_7_REFERENCE: 'Support team. (2026). Roster trial notes [Unpublished internal report].',
  };
  const html = md.match(/```html\n([\s\S]*?)\n```/)[1].replace(/\{\{(\w+)\}\}/g, (_, k) => fill[k] ?? `[${k}]`);
  file = join(work, 'brief-lite-test-2026-09-29.html');
  writeFileSync(file, html);
}
const url = 'file://' + file;
const fixture = JSON.parse(readFileSync(join(repo, 'evals/fixtures/brief-lite.json'), 'utf8'));

function sameShape(got, want, path = '$') {
  const errs = [];
  const t = v => Array.isArray(v) ? 'array' : v === null ? 'null' : typeof v;
  if (t(want) === 'object') {
    if (t(got) !== 'object') return [`${path}: want object, got ${t(got)}`];
    if (Object.keys(got).join() !== Object.keys(want).join())
      errs.push(`${path}: keys ${Object.keys(got).join()} != ${Object.keys(want).join()}`);
    for (const k of Object.keys(want)) if (k in got) errs.push(...sameShape(got[k], want[k], `${path}.${k}`));
  } else if (t(want) === 'array') {
    if (t(got) !== 'array') return [`${path}: want array, got ${t(got)}`];
    if (want.length) got.forEach((g, i) => errs.push(...sameShape(g, want[0], `${path}[${i}]`)));
  } else if (!(t(want) === t(got) || (path.endsWith('near_question') && t(got) === 'null'))) {
    errs.push(`${path}: want ${t(want)}, got ${t(got)}`);
  }
  return errs;
}
function checkPayload(json, label) {
  const p = JSON.parse(json);
  const errs = sameShape(p, fixture);
  check(!errs.length, `${label}: shape matches the golden fixture${errs.length ? ' (' + errs.join('; ') + ')' : ''}`);
  check(p.answers.every(a => a.ticked === false) && p.comments.every(c => c.highlight === 'yellow'), `${label}: ticked false, highlight yellow`);
  check(!p.notes.length && !p.edits.length && !p.drafts.length, `${label}: notes, edits and drafts are empty arrays`);
  return p;
}

const browser = await chromium.launch();
const external = [];
async function open(ctx) {
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('request', r => { if (!r.url().startsWith('file:') && !r.url().startsWith('blob:') && !r.url().startsWith('data:')) external.push(r.url()); });
  await page.goto(url);
  return { page, errors };
}

// 1. Normal run
const ctx = await browser.newContext({ acceptDownloads: true, permissions: ['clipboard-read', 'clipboard-write'] });
let { page, errors } = await open(ctx);
check(await page.locator('#bl-banner').isHidden(), 'storage banner hidden when storage works');
const firstQ = await page.locator('section.q[data-q]').first().getAttribute('data-q');
await page.fill(`textarea[data-answer="${firstQ}"]`, 'Yes, from next quarter.');
check((await page.locator('#bl-progress').textContent()).startsWith('1 of'), 'progress counts the answer');

// Select about 12 characters with a real mouse drag, as a reader does.
const box = await page.evaluate(() => {
  const w = document.createTreeWalker(document.querySelector('#bl-doc section.sec'), NodeFilter.SHOW_TEXT);
  let n; while ((n = w.nextNode())) if (n.nodeValue.trim().length >= 12) break;
  n.parentElement.scrollIntoView({ block: 'center' });
  const at = n.nodeValue.search(/\S/), r = document.createRange();
  r.setStart(n, at); r.setEnd(n, at + 12);
  const b = r.getClientRects()[0];
  return { x0: b.left + 1, x1: b.right - 1, y: b.top + b.height / 2 };
});
await page.mouse.move(box.x0, box.y); await page.mouse.down();
await page.mouse.move(box.x1, box.y, { steps: 5 }); await page.mouse.up();
const quote = await page.evaluate(() => getSelection().toString().trim());
await page.waitForSelector('#bl-pop:not([hidden])');
const evil = '<img src=x id=pwned> check this';
await page.fill('#bl-ctext', evil);
await page.click('#bl-csave');
check(await page.locator('mark.cmt').count() === 1, 'comment marks the selected text');
check((await page.locator('#bl-clist li p').first().textContent()) === evil && await page.locator('#pwned').count() === 0,
  'comment text rendered as text, not markup');

await page.reload();
check(await page.inputValue(`textarea[data-answer="${firstQ}"]`) === 'Yes, from next quarter.', 'answer persists after reload');
check(await page.locator('mark.cmt').count() === 1 && await page.locator('#bl-clist li').count() === 1, 'comment persists and re-anchors after reload');

await page.click('#bl-copy');
await page.waitForFunction(() => document.getElementById('bl-status').textContent.includes('copied'));
const copied = checkPayload(await page.evaluate(() => navigator.clipboard.readText()), 'Copy');
check(copied.answers[0].resolved && copied.answers[0].answer === 'Yes, from next quarter.', 'Copy carries the answer');
check(copied.comments[0].selected_text === quote && copied.comments[0].anchored === true && copied.comments[0].near_question,
  'Copy carries the comment, anchored, with near_question');

const [dl] = await Promise.all([page.waitForEvent('download'), page.click('#bl-download')]);
check(/-responses-\d{4}-\d{2}-\d{2}\.json$/.test(dl.suggestedFilename()), `Download names the file ${dl.suggestedFilename()}`);
const saved = join(downloads, dl.suggestedFilename());
await dl.saveAs(saved);
const downloaded = checkPayload(readFileSync(saved, 'utf8'), 'Download');
check(JSON.stringify(downloaded.answers) === JSON.stringify(copied.answers), 'Download and Copy carry the same answers');

const filed = execFileSync('python3', [join(repo, 'skills/peakstate-brief/assets/file-answers.py'),
  '--downloads', downloads, '--root', work, '--keep'], { encoding: 'utf8' });
check(existsSync(file + '.answers.json') && /1 filed/.test(filed), 'peakstate-brief file-answers.py files the payload beside the brief');
check(!errors.length, 'no page errors' + (errors.length ? ': ' + errors.join('; ') : ''));
await ctx.close();

// 2. Storage blocked, clipboard refused
const blocked = await browser.newContext({ acceptDownloads: true });
await blocked.addInitScript(() => {
  Object.defineProperty(window, 'localStorage', { get() { throw new DOMException('blocked', 'SecurityError'); } });
  Object.defineProperty(navigator, 'clipboard', { get() { return { writeText: () => Promise.reject(new Error('denied')) }; } });
});
({ page, errors } = await open(blocked));
check(await page.locator('#bl-banner').isVisible(), 'storage-blocked banner shown');
await page.fill(`textarea[data-answer="${firstQ}"]`, 'Still here.');
await page.click('#bl-copy');
await page.waitForFunction(() => document.getElementById('bl-status').textContent.includes('Download'));
check(true, 'failed Copy points to Download');
const [dl2] = await Promise.all([page.waitForEvent('download'), page.click('#bl-download')]);
await dl2.saveAs(join(work, 'blocked.json'));
check(JSON.parse(readFileSync(join(work, 'blocked.json'), 'utf8')).answers[0].answer === 'Still here.', 'Download still works with storage blocked');
check(!errors.length, 'no page errors with storage blocked' + (errors.length ? ': ' + errors.join('; ') : ''));
await blocked.close();

check(!external.length, 'no external requests' + (external.length ? ': ' + external.join(', ') : ''));
await browser.close();
console.log(fails.length ? `\n${fails.length} check(s) failed` : '\nall checks passed');
process.exit(fails.length ? 1 : 0);
