#!/usr/bin/env node
/* Checks for build-brief.mjs. No framework: plain asserts, one file.

     node test-build-brief.mjs

   Silence and exit 0 means pass. The fixture it drives is test-brief.md, which
   holds one section per block type, so a failure names the block that broke. */

import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { render } from './build-brief.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const src = readFileSync(join(HERE, 'test-brief.md'), 'utf8');
const html = render(src);
const main = /<main>[\s\S]*<\/main>/.exec(html)[0];

const has = (needle, why) => assert.ok(main.includes(needle), why + ' — missing: ' + needle);

/* ── the four hard requirements ──────────────────────────────────────────── */

assert.ok(html.includes('<body data-brief-id="renderer-fixture"'), 'brief id lands on <body>');
assert.ok(html.includes('<title>Renderer fixture brief</title>'), 'title lands in <head>');
assert.ok(html.includes('briefUI'), 'the runtime is present in the page');
has('data-q="Q1"', 'question 1 is a real section.q');
has('data-q="Q2"', 'question 2 is a real section.q');
has('<span class="qid">Q1</span>', 'question carries its visible number');
has('aria-label="Mark Q1 resolved"', 'question carries its tick');
has('<section class="brief-section" id="s-toc" data-sec="toc">', 'contents is a tickable section');
has('<ol class="reflist">', 'references render as a reflist');
assert.equal((main.match(/<section class="q"/g) || []).length, 2, 'exactly two questions');

/* ── structure ───────────────────────────────────────────────────────────── */

has('<header class="brief-title">', 'title block');
has('<h1>Renderer fixture brief</h1>', 'one H1, from the front matter');
has('<h2 class="part" id="part-1"><span class="pnum">Part one</span>', 'parts are numbered in words');
has('<p class="partlede">', 'a part carries its lede');

/* The summary page wraps the FIRST named part and every section under it, and
   nothing else. CSS cannot box a run of siblings, so this wrapper is load-
   bearing: if it moves or repeats, the whole treatment boxes the wrong thing. */
assert.equal((main.match(/<div class="summary-page">/g) || []).length, 1,
  'exactly one summary page');
const page = /<div class="summary-page">([\s\S]*?)\n<\/div>/.exec(main);
assert.ok(page, 'the summary page opens and closes');
assert.ok(page[1].includes('id="part-1"'), 'the summary page opens on the first part');
assert.ok(page[1].includes('id="s-prose"') && page[1].includes('id="s-raw"'),
  "the first part's sections are inside the page");
assert.ok(!page[1].includes('id="part-2"'), 'the second part is outside the page');
assert.ok(!page[1].includes('id="s-toc"'), 'the contents sits above the page');
const solo = /<main>[\s\S]*<\/main>/.exec(
  render('---\ntitle: Single\n---\n\n## Only section\n\nBody.\n'))[0];
assert.ok(!solo.includes('summary-page'),
  'a brief with no named parts gets no summary page');
has('<p class="assume"><strong>My assumption:</strong>', 'assumption block');
has('<strong>If wrong:</strong>', 'the if-wrong half stays in the same paragraph');
has('<ul class="options">\n  <li><b>a)</b> ', 'options list');
has('<dl class="provblock">', 'provenance renders as one four-label block');
assert.equal((main.match(/<dl/g) || []).length, 1, 'the provenance terms are one list, not four');

/* ── blocks the ticket names ─────────────────────────────────────────────── */

has('<div class="tblwrap nopin"><table>', 'GFM pipe table');
has('<span class="hl-warn">Highlighted</span>', 'allowlisted inline HTML survives in a table cell');
has('&lt;script&gt;alert(1)&lt;/script&gt;', 'non-allowlisted inline HTML still escapes');
has('<code>&lt;span&gt;</code>', 'inline HTML inside a code span stays literal');
has('<code>a | b</code>', 'an escaped pipe stays inside its cell');
has('<ol>\n<li>The first step, which has sub-steps.\n<ol>', 'ordered list nested in an ordered list');
has('<ul>\n<li>A bullet.', 'bullets nested under a numbered step');
has('wraps across two source lines', 'a wrapped list item joins into one item');
has('<pre><code>```\necho "a fence inside a fence"\n```</code></pre>', 'a fence may hold a shorter fence');
has('<code>`not a fence`</code>', 'a code span may hold backticks');
has('café, naïve, 20 °C, ±3 %, — em dash, 中文, emoji 🌏', 'Unicode passes through unchanged');
has('&amp; ampersand and a &lt; less-than', 'HTML-significant characters are escaped');
assert.equal((main.match(/<blockquote>/g) || []).length, 1, 'a long quote is one blockquote');
assert.equal((main.match(/<blockquote><p>|<\/p>\n<p>/g) || []).length, 2,
  'a long quote keeps its paragraph breaks');
has('<div class="verdict">', 'a ::: container becomes a div and renders markdown inside');
has('<div class="legend"><span class="chip hl-focus"></span>', 'a :::html block passes through raw');

/* ── footnotes resolve ───────────────────────────────────────────────────── */

const REF_FIXTURE_BAD_QUOTE = '# P\n\n## S\n\nA claim[^1q9].\n\n## References\n\n' +
  '[^1]: Example, A. (2026). *A thing*. Somewhere. https://example.com\n' +
  '    > "one quote only" -- p. 1\n';


has('<a href="#ref1">', 'a footnote marker lands on the reference entry');
assert.ok(!main.includes('href="#ref1-q'), 'markers no longer point at per-quote anchors');
assert.ok(!/<blockquote class="pull" id="ref\d/.test(main),
  'the reference list carries no quotes — they live in each section evidence block');
has('<span class="qref">Standfirst, second sentence</span>',
  'a quote still carries its locator, inside the evidence block');
has('<span class="apa-note">', 'an unretrievable source says so');
assert.throws(() => render(REF_FIXTURE_BAD_QUOTE),
  /footnote markers with no target/, 'a marker naming a quote the source lacks is still a build error');

/* ── attribute escaping ──────────────────────────────────────────────────── */

assert.ok(html.includes('data-addressed="a comment with a &quot;quoted&quot; phrase in it||another one"'),
  'a double quote in data-addressed is escaped, not left to truncate the value');

const ids = new Set([...main.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
const dead = [...main.matchAll(/href="#([^"]+)"/g)].map((m) => m[1]).filter((h) => !ids.has(h));
assert.deepEqual(dead, [], 'every internal anchor resolves');

assert.throws(() => render('# P\n\n## Q1 Broken\n\nA claim[^9].\n'),
  /footnote markers with no target/, 'a footnote with no target is a build error');

/* ── self-containment ────────────────────────────────────────────────────────
   A brief gets emailed, dropped in Drive and opened on a plane. Every one of
   these asserts a way it used to stop working when it travelled. */

assert.ok(!html.includes('<link rel="stylesheet" href="brief.css"'),
  'the stylesheet is inlined, not linked to a sibling file');
assert.ok(!html.includes('<script src="brief.js"'),
  'the runtime is inlined, not linked to a sibling file');
assert.ok(!html.includes('cdn.jsdelivr'), 'no CDN: a delivered brief fetches nothing');
assert.ok(!html.includes('sha384-'), 'no integrity pins left to go stale');
assert.ok(html.includes('main svg text'), 'brief.css really is in the page');
assert.ok(html.includes('briefUI'), 'brief.js really is in the page');

const linked = render(src, { link: true });
assert.ok(linked.includes('<script src="brief.js"'),
  'opts.link keeps the linked form for hosts with no filesystem');

/* ── the prototype's three markup features ───────────────────────────────
   Each is emitted from the document's own structure, so the check is that the
   structure drove it — not just that the class appears somewhere. */

has('<details class="l5">', 'a section that cites a source gets an expandable evidence block');
has('<summary>Ramsden (2026).<span class="l5n">2 quotes</span></summary>',
  'the summary names the sources and counts the quotes, with no label prefix');
has('class="l5src" href="#ref1"', 'each quote in the evidence block links to its reference entry');
has('<div class="l5body">', 'the quotes themselves are inside the block, not just counted');
has('<summary>Internal corpus (2026); Australian Bureau of Statistics (2026).' +
  '<span class="l5n">1 quote</span></summary>',
  'a question cites both its sources and counts only the quotes that exist, singular');
const listsSec = main.slice(main.indexOf('id="s-lists"')).split('</section>')[0];
assert.ok(!listsSec.includes('class="l5"'),
  'a section that cites nothing gets no "Prove it" box');
has('<span class="rnum">', 'each reference carries its number badge');
{
  const list = main.slice(main.indexOf('<ol class="reflist">')).split('</ol>')[0];
  const keys = [...list.matchAll(/<li id="ref(\d+)"/g)].map((m) => m[1]);
  const nums = [...list.matchAll(/<span class="rnum">(\d+)<\/span>/g)].map((m) => m[1]);
  assert.deepEqual(nums, nums.slice().sort((a, b) => a - b),
    'displayed numbers run 1..n down the alphabetical list');
  assert.ok(keys.join() !== nums.join() || keys.length < 2,
    'the authoring key and the displayed number are decoupled');
}
assert.equal((main.match(/<span class="rnum">/g) || []).length, 3,
  'one badge per reference, no more');
assert.equal((main.match(/<div class="endmark" aria-hidden="true"><\/div>/g) || []).length, 1,
  'exactly one endmark, and it closes the document');
assert.ok(/<div class="endmark"[^>]*><\/div>\n\n<\/main>/.test(main),
  'the endmark is the last thing in the document');

/* ── dark mode ───────────────────────────────────────────────────────────────
   These four cases exist because a black-on-black diagram shipped. The author
   could not see it (light mode) and the reader could not read it (dark mode),
   so the only place that catches it is the build. */

const svg = (inner) => '# P\n\n## S\n\n:::html\n<svg>' + inner + '</svg>\n:::\n';

assert.throws(() => render(svg('<text fill="#333">label</text>')),
  /fixed colour/, 'a hex fill on svg text is a build error');
assert.throws(() => render(svg('<text fill="black">label</text>')),
  /fixed colour/, 'a colour keyword on svg text is a build error');
assert.doesNotThrow(() => render(svg('<text>label</text>')),
  'unstyled svg text is correct — it inherits from brief.css');
assert.doesNotThrow(() => render(svg('<text fill="var(--muted)">label</text>')),
  'a theme variable on svg text is allowed');
assert.throws(() => render('# P\n\n## S\n\n:::html\n<style>.diag text { fill: #222 }</style>\n:::\n'),
  /ship in brief.css/, 'a brief re-declaring the shared diagram rules is a build error');

/* ── reproducibility ─────────────────────────────────────────────────────── */

assert.equal(render(src), html, 'rendering is deterministic');
assert.equal(render(src.replace(/\r?\n/g, '\r\n')).replace(/\r/g, ''), html,
  'CRLF source renders the same page');

console.log('build-brief: all checks passed');
