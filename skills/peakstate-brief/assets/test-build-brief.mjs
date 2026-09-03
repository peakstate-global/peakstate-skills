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
assert.ok(html.includes('brief.js'), 'the runtime script tag survives');
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
has('<p class="assume"><strong>My assumption:</strong>', 'assumption block');
has('<strong>If wrong:</strong>', 'the if-wrong half stays in the same paragraph');
has('<ul class="options">\n  <li><b>a)</b> ', 'options list');
has('<dl class="provblock">', 'provenance renders as one four-label block');
assert.equal((main.match(/<dl/g) || []).length, 1, 'the provenance terms are one list, not four');

/* ── blocks the ticket names ─────────────────────────────────────────────── */

has('<div class="tblwrap nopin"><table>', 'GFM pipe table');
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

has('<sup class="fn"><a href="#ref1-q1">1</a></sup>', 'footnote marker');
has('<sup class="fn"><a href="#ref1-q2">1</a></sup>', 'a marker may point at a later quote');
has('<blockquote class="pull" id="ref1-q2">', 'each quote gets its own anchor');
has('<span class="qref">Standfirst, second sentence</span>', 'a quote carries its locator');
has('<span class="apa-note">', 'an unretrievable source says so');
has('<sup class="fn"><a href="#ref3">3</a></sup>', 'a quoteless source is cited on its entry');
assert.ok(!main.includes('id="ref3-q1"'), 'no quote means no quote anchor');

/* ── attribute escaping ──────────────────────────────────────────────────── */

assert.ok(html.includes('data-addressed="a comment with a &quot;quoted&quot; phrase in it||another one"'),
  'a double quote in data-addressed is escaped, not left to truncate the value');

const ids = new Set([...main.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
const dead = [...main.matchAll(/href="#([^"]+)"/g)].map((m) => m[1]).filter((h) => !ids.has(h));
assert.deepEqual(dead, [], 'every internal anchor resolves');

assert.throws(() => render('# P\n\n## Q1 Broken\n\nA claim[^9].\n'),
  /footnote markers with no target/, 'a footnote with no target is a build error');

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
