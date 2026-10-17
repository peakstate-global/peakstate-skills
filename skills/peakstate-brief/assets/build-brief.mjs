#!/usr/bin/env node
/* build-brief.mjs — render a brief HTML file from its markdown source.

   The markdown is the durable artefact; the HTML is a build output. Author the
   .md, run this, deliver the .html. Regenerating from the same .md gives a
   byte-identical page, so the stored markdown and the delivered brief cannot
   silently drift apart.

     node build-brief.mjs my-brief.md              -> my-brief.html
     node build-brief.mjs my-brief.md out/x.html

   Zero dependencies, on purpose. A brief has to render on a laptop, in CI and
   inside a chat tool with no package manager, so the renderer is pinned by
   being vendored rather than by a lockfile.

   ponytail: a purpose-built renderer, not a CommonMark implementation. It
   covers the blocks a brief actually uses (headings, paragraphs, nested lists,
   GFM pipe tables, fenced code, blockquotes, definition lists, footnotes) and
   passes anything else through as raw HTML in a ::: block. Swap in markdown-it
   the day a brief needs reference links, setext headings or autolink edge
   cases. */

import { readFileSync, writeFileSync, realpathSync, existsSync } from 'node:fs';
import { dirname, join, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const HERE = dirname(fileURLToPath(import.meta.url));
const PARTWORDS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven',
  'eight', 'nine', 'ten', 'eleven', 'twelve'];
/* A private-use codepoint, so a parked code span cannot collide with
   anything a brief would legitimately contain. */
const SENTINEL = '\uE000';

/* ── inline ─────────────────────────────────────────────────────────────── */

function esc(t) {
  return t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/* Attribute values need the quote too. A raw " in data-addressed closes the
   attribute early, and the truncated prefix left behind matches — and silently
   resolves — comments the author never addressed. */
const escAttr = (t) => esc(t).replace(/"/g, '&quot;');

/* Inline HTML that survives esc(). A block starting with `<` is already passed
   through verbatim, but there is no block level inside a table cell or a list
   item, so an author following this skill's own advice to put hl-focus /
   hl-warn / hl-info on a cell had no way to do it and got the tag printed at
   the reader. The allowlist is presentational tags carrying at most a class:
   anything else — a script, an iframe, an onclick — still escapes to text, so
   the escaping guarantee holds where it matters. */
const INLINE_HTML =
  /^<\/?(?:span|b|i|em|strong|s|del|ins|sub|sup|kbd|abbr|mark|small|wbr|br)(?:\s+class="[-\w\s]*")?\s*\/?>$/;

/* Per-fact notes (`notes: per-fact`). `[^f<id>]` in prose is a marker; a line
   `[^f<id>]: [^2] [^4q3]` defines that fact's note as the sources it rests on,
   named by their ordinary reference keys. */
const FACT_MARK = /\[\^f([\w-]+)\]/g;
const FACT_DEF = /^\s*\[\^f([\w-]+)\]:\s*(.*)$/;
const ANY_DEF = /^\s*\[\^(?:\d+|f[\w-]+)\]:/;

/* Code spans are lifted out before any other rule runs, so `**not bold**`
   inside backticks stays literal. A fence of two or more backticks lets a span
   hold a backtick, the same way CommonMark does. */
function inline(text, refs) {
  const spans = [];
  const park = (html) => {
    spans.push(html);
    return SENTINEL + (spans.length - 1) + SENTINEL;
  };
  let t = text.replace(/(`+)([\s\S]*?)\1/g, (_, ticks, body) =>
    park('<code>' + esc(body.replace(/^ (.*) $/, '$1')) + '</code>'));
  t = t.replace(/<\/?[a-zA-Z][^<>]*>/g, (m) => (INLINE_HTML.test(m) ? park(m) : m));
  t = esc(t);
  /* A fact note marker, `notes: per-fact` only. The number is the fact's order
     of first appearance in the rendered page, assigned here because inline()
     runs in page order; a fact cited again reuses its number. */
  t = t.replace(FACT_MARK, (m, id) => {
    if (!refs) return m;
    if (!refs.facts) { refs.missing.push(m + ' (a fact note marker needs `notes: per-fact`)'); return m; }
    const f = refs.facts[id];
    if (!f) { refs.missing.push(m + ' -> no fact note definition [^f' + id + ']:'); return m; }
    if (!f.num) f.num = ++refs.factCount;
    return '<sup class="fn fact"><a href="#note-f' + id + '">' + f.num + '</a></sup>';
  });
  t = t.replace(/\[\^(\d+)(?:q(\d+))?\]/g, (m, n, q) => {
    /* Every marker lands on the ENTRY. Quotes no longer render at the back, so
       there is no per-quote anchor to jump to — the quote itself is in the
       evidence block of the section the reader is already standing in.
       The qN part of the syntax is still validated, so a marker naming a quote
       the source does not have is still a build error rather than a silent
       link to the wrong place. */
    const id = 'ref' + n;
    /* One marker per fact: a bare source marker beside fact notes would show a
       second, colliding number series. */
    if (refs && refs.facts) refs.missing.push(m + ' (with `notes: per-fact`, cite a source through a fact note)');
    if (refs) {
      if (!refs.anchors.has(id)) refs.missing.push(m + ' -> #' + id);
      else if (q && refs.quoteCount && +q > (refs.quoteCount[n] || 0)) {
        refs.missing.push(m + ' -> quote ' + q + ' of ' + (refs.quoteCount[n] || 0));
      }
    }
    const shown = (refs && refs.display && refs.display[n]) || n;
    return '<sup class="fn"><a href="#' + id + '">' + shown + '</a></sup>';
  });
  /* Lazy, so bold may hold emphasis: `**a *b* c**` is one bold run, not two. */
  t = t.replace(/\*\*([\s\S]+?)\*\*/g, '<strong>$1</strong>');
  t = t.replace(/(^|[^*])\*([^*\n]+)\*/g, '$1<em>$2</em>');
  t = t.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2">$1</a>');
  return t.replace(new RegExp(SENTINEL + '(\\d+)' + SENTINEL, 'g'), (_, i) => spans[+i]);
}

/* Bare URLs are linked only in reference entries, where an APA 7 entry ends in
   a naked URL by convention. Doing it everywhere would eat URLs that prose
   deliberately left as plain text. */
function autolink(html) {
  return html.replace(/(^|[\s(])(https?:\/\/[^\s<)]+)/g,
    (_, pre, url) => pre + '<a href="' + url + '">' + url + '</a>');
}

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

/* ── block splitting ────────────────────────────────────────────────────── */

const fenceOpen = (l) => /^(`{3,}|~{3,})/.exec(l.trim());

/* Blank lines separate blocks, except inside a code fence or a ::: container,
   where they are content. */
function blocks(lines) {
  const out = [];
  let buf = [], fence = null, depth = 0;
  const flush = () => { if (buf.length) out.push(buf); buf = []; };
  for (const line of lines) {
    const trimmed = line.trim();
    if (fence) {
      buf.push(line);
      if (trimmed.startsWith(fence) && /^[`~]+$/.test(trimmed)) { fence = null; flush(); }
      continue;
    }
    if (depth === 0) {
      const f = fenceOpen(line);
      if (f) { flush(); buf.push(line); fence = f[1]; continue; }
    }
    if (/^:::/.test(trimmed)) {
      if (depth === 0) { flush(); buf.push(line); depth = 1; continue; }
      buf.push(line);
      if (trimmed === ':::') { depth -= 1; if (depth === 0) flush(); } else depth += 1;
      continue;
    }
    if (depth > 0) { buf.push(line); continue; }
    if (!trimmed) { flush(); continue; }
    buf.push(line);
  }
  flush();
  return out;
}

/* ── lists ──────────────────────────────────────────────────────────────── */

const ITEM = /^(\s*)([-*]|\d+[.)])\s+(.*)$/;

/* Indentation decides nesting. A continuation line (indented, no marker) joins
   the item above it, so a long bullet can wrap in the source. */
function renderList(lines, refs) {
  const items = [];
  let cur = null;
  const baseIndent = ITEM.exec(lines[0])[1].length;
  for (const line of lines) {
    const m = ITEM.exec(line);
    if (m && m[1].length <= baseIndent) {
      cur = { ordered: /\d/.test(m[2]), text: [m[3]], kids: [] };
      items.push(cur);
    } else if (cur) {
      cur.kids.push(line);
    }
  }
  const tag = items[0].ordered ? 'ol' : 'ul';
  const body = items.map((it) => {
    const firstKid = it.kids.find((l) => l.trim()) || '';
    if (it.kids.length && ITEM.test(firstKid)) {
      const dedent = ITEM.exec(firstKid)[1].length - baseIndent;
      return '<li>' + inline(it.text.join(' '), refs) + '\n' +
        renderList(it.kids.map((l) => l.slice(dedent)), refs) + '</li>';
    }
    return '<li>' + inline(it.text.concat(it.kids.map((l) => l.trim())).join(' '), refs) + '</li>';
  }).join('\n');
  return '<' + tag + '>\n' + body + '\n</' + tag + '>';
}

/* ── tables ─────────────────────────────────────────────────────────────── */

const isDivider = (l) => /^\s*\|?[\s:|-]*-[\s:|-]*\|?\s*$/.test(l) && l.includes('-');
const cells = (l) => l.replace(/^\s*\|/, '').replace(/\|\s*$/, '')
  .split(/(?<!\\)\|/).map((c) => c.trim().replace(/\\\|/g, '|'));

function renderTable(lines, refs) {
  const head = cells(lines[0]);
  const rows = lines.slice(2).filter((l) => l.trim()).map(cells);
  return '<div class="tblwrap nopin"><table>\n<tr>' +
    head.map((c) => '<th>' + inline(c, refs) + '</th>').join('') + '</tr>\n' +
    rows.map((r) => '<tr>' + r.map((c) => '<td class="wrap">' + inline(c, refs) + '</td>').join('') + '</tr>').join('\n') +
    '\n</table></div>';
}

/* ── references ─────────────────────────────────────────────────────────── */

/* One <li> per source: the APA entry, then every passage that source supports,
   each with its own id so a footnote lands on the sentence rather than the
   page. A trailing ` -- ` on a quote line carries the qref (page, timestamp,
   cell). */
function parseRefs(lines) {
  const refs = [];
  let cur = null;
  for (const raw of lines) {
    if (FACT_DEF.test(raw)) { cur = null; continue; }
    const def = /^\[\^(\d+)\]:\s*(.*)$/.exec(raw);
    if (def) { cur = { n: def[1], apa: [def[2]], quotes: [], note: null, origin: null }; refs.push(cur); continue; }
    if (!cur) continue;
    const line = raw.trim();
    if (!line) continue;
    if (line.startsWith('>')) {
      cur.quotes.push(line.replace(/^>\s?/, ''));
    } else if (/^origin:/i.test(line)) {
      /* Where the material actually came from, when the entry above cites a
         copy. The published render swaps one for the other. */
      cur.origin = line.replace(/^origin:\s*/i, '');
    } else if (/^note:/i.test(line)) {
      cur.note = line.replace(/^note:\s*/i, '');
    } else if (cur.quotes.length) {
      cur.quotes[cur.quotes.length - 1] += ' ' + line;
    } else {
      cur.apa.push(line);
    }
  }
  return refs;
}

/* Sort key: the APA first element, which is what a reader scans down. Markup
   and leading quotes are stripped so "*Anon*" files under A, not under an
   asterisk.

   In the published render it keys on the ORIGIN, because that is the entry the
   reader sees. Keying on the copy would order the bibliography by a line the
   published document does not contain. */
function refSortKey(r, publish) {
  const apa = publish && r.origin ? r.origin : r.apa.join(' ');
  return apa.replace(/[*_`"'\u201c\u2018]/g, '').trim().toLowerCase();
}

/* Alphabetical by first element, numbered in that order. The numbers a reader
   sees are therefore positions in the list, not the order the author happened
   to cite things in — which is why the display number is decoupled from the
   authoring key everywhere else in this file.

   No quotes here. Every quote now sits in the evidence block of the section
   that actually leans on it, where it is read in context; repeating the set at
   the back made the reference list a second copy of the same passages and
   buried the entries a reader came here to find.

   In the published render an entry with an `origin:` line is replaced by that
   origin, and its note goes with it. The reason is credit, not secrecy: a
   library entry is a copy of somebody else's work, so citing the copy credits
   the wrong party and points the reader at a page they cannot open. The note
   goes too, because a note on a copy describes reaching a document the
   published version no longer cites. */
function renderRefs(refs, reg, publish) {
  const items = refs.slice().sort((a, b) => refSortKey(a, publish).localeCompare(refSortKey(b, publish)))
    .map((r) => {
      const swap = publish && r.origin;
      const d = (reg && reg.display && reg.display[r.n]) || r.n;
      let html = '  <li id="ref' + r.n + '"><span class="rnum">' + esc(d) + '</span>' +
        autolink(inline(swap ? r.origin : r.apa.join(' '), reg));
      if (r.note && !swap) html += '\n    <span class="apa-note">' + inline(r.note, reg) + '</span>';
      return html + '</li>';
    });
  return '<ol class="reflist">\n' + items.join('\n') + '\n</ol>';
}

/* ── level 5, the evidence a section rests on ─────────────────────────────
   Built from the footnote markers already in a section's prose: which sources
   it leans on, and — when opened — the verbatim quotes those sources carry,
   with their locators. Nothing is authored for it, so a section that cites
   nothing gets no box rather than an empty one.

   It expands rather than counting. A closed line saying "4 quotes" asks the
   reader to take the evidence on trust, which is the opposite of what a level
   labelled "prove it" is for; the count is the handle, the quotes are the
   point. Closed by default, because this is the bottom of the pyramid and most
   readers stop above it. */

/* "Barker, S. A. (2018). ..." -> "Barker (2018)". Multiple authors collapse to
   "et al." the way a reader would say it aloud. */
function shortCite(apa) {
  /* (n.d.) is a documented APA form, and requiring four digits silently
     dropped every undated source out of the evidence block while its
     reference and quotes rendered normally — a section could show a short
     source list and an understated quote count with nothing to say why. */
  const m = /^([\s\S]*?)\((\d{4}|n\.d\.)/.exec(apa);
  if (!m) return null;
  const head = m[1];
  const first = head.split(',')[0].replace(/\.\s*$/, '').trim();
  if (!first) return null;
  const many = /&|\bet al\b/.test(head) || head.split(',').length > 2;
  return first + (many ? ' et al.' : '') + ' (' + m[2] + ')';
}

/* Markers cited by a section's prose, in first-use order. A reference
   *definition* line is a target, not a citation, so it never counts. */
function citedIn(lines, facts) {
  const seen = [];
  let fence = null;
  for (const l of lines) {
    /* A fenced block shows its text; it does not cite anything. Without this a
       literal [^1] in a code sample gives the section an evidence block for a
       source its prose never mentions. */
    const f = fenceOpen(l);
    if (fence) { if (l.trim().startsWith(fence) && /^[`~]+$/.test(l.trim())) fence = null; continue; }
    if (f) { fence = f[1]; continue; }
    if (ANY_DEF.test(l)) continue;
    for (const m of l.matchAll(/\[\^(?:(\d+)(?:q\d+)?|f([\w-]+))\]/g)) {
      const ns = m[1] ? [m[1]] : ((facts && facts[m[2]]) ? facts[m[2]].sources.map((s) => s.n) : []);
      for (const n of ns) if (!seen.includes(n)) seen.push(n);
    }
  }
  return seen;
}

function proveIt(lines, index, reg) {
  const cited = citedIn(lines, reg && reg.facts).filter((n) => index[n] && index[n].label);
  if (!cited.length) return '';
  const n = cited.reduce((a, k) => a + index[k].quotes.length, 0);
  const heads = esc(cited.map((k) => index[k].label).join('; '));
  /* No quotes anywhere in the cited sources: there is nothing to open, so it
     stays a line rather than pretending to be expandable. */
  if (!n) return '\n  <p class="l5">' + heads + '.</p>';
  let body = '';
  for (const k of cited) {
    const r = index[k];
    r.quotes.forEach((q, i) => {
      const parts = q.split(/\s+--\s+/);
      const qref = parts.length > 1 ? parts.pop() : null;
      body += '\n      <blockquote class="pull"><a class="l5src" href="#ref' + k +
        '">' + esc(r.label) + '</a>' + inline(parts.join(' -- '), reg) +
        (qref ? '<span class="qref">' + inline(qref, reg) + '</span>' : '') + '</blockquote>';
    });
  }
  return '\n  <details class="l5">\n    <summary>' + heads + '.' +
    '<span class="l5n">' + n + ' quote' + (n === 1 ? '' : 's') + '</span></summary>' +
    '\n    <div class="l5body">' + body + '\n    </div>\n  </details>';
}

/* ── per-fact notes ───────────────────────────────────────────────────────
   One note per fact, numbered 1, 2, 3 by first appearance. Inside it one entry
   per distinct source, numbered 1.1, 1.2, each with the source's short citation
   linking to its References entry and every quote the definition named. */
const NOTES_SLOT = '<!--fact-notes-->';

function collectFacts(parts, index, quoteCount) {
  const facts = {};
  const bad = [];
  for (const p of parts) {
    for (const l of [...p.lede, ...p.sections.flatMap((s) => s.lines)]) {
      const d = FACT_DEF.exec(l);
      if (!d) continue;
      const [, id, rest] = d;
      if (facts[id]) { bad.push('[^f' + id + '] is defined twice'); continue; }
      const sources = [];
      for (const m of rest.matchAll(/\[\^(\d+)(?:q(\d+))?\]/g)) {
        const n = m[1], q = +(m[2] || 1);
        if (!index[n]) { bad.push('[^f' + id + '] names ' + m[0] + ', which has no reference'); continue; }
        if (q > (quoteCount[n] || 0)) { bad.push('[^f' + id + '] names ' + m[0] + ', which has no quote ' + q); continue; }
        let s = sources.find((x) => x.n === n);
        if (!s) sources.push(s = { n, qs: [] });
        if (!s.qs.includes(q)) s.qs.push(q);
      }
      const left = rest.replace(/\[\^\d+(?:q\d+)?\]/g, '').trim();
      if (left) bad.push('[^f' + id + '] holds text that is not a source key: ' + left.slice(0, 40));
      if (!sources.length && !left) bad.push('[^f' + id + '] names no source');
      facts[id] = { sources, num: 0 };
    }
  }
  if (bad.length) throw new Error('fact notes: ' + bad.join('; '));
  return facts;
}

function renderFactNotes(reg, index) {
  const used = Object.entries(reg.facts).filter(([, f]) => f.num).sort((a, b) => a[1].num - b[1].num);
  const items = used.map(([id, f]) => '  <li id="note-f' + id + '"><span class="rnum">' + f.num +
    '</span><ol class="factsrc">' + f.sources.map((s, i) => {
      const r = index[s.n];
      const label = r.label || 'Reference ' + ((reg.display && reg.display[s.n]) || s.n);
      return '\n    <li><span class="fsub">' + f.num + '.' + (i + 1) + '</span><a class="fsrc" href="#ref' + s.n +
        '">' + esc(label) + '</a>' + s.qs.map((q) => {
        const parts = r.quotes[q - 1].split(/\s+--\s+/);
        const qref = parts.length > 1 ? parts.pop() : null;
        return '<blockquote class="pull">' + inline(parts.join(' -- '), reg) +
          (qref ? '<span class="qref">' + inline(qref, reg) + '</span>' : '') + '</blockquote>';
      }).join('') + '</li>';
    }).join('') + '\n  </ol></li>');
  return '<ol class="factnotes">\n' + items.join('\n') + '\n</ol>';
}

/* ── block renderer ─────────────────────────────────────────────────────── */

function renderBlock(lines, ctx) {
  const first = lines[0];
  const t = first.trim();
  const refs = ctx.refs;

  const f = fenceOpen(first);
  if (f) {
    const closed = /^[`~]+$/.test(lines[lines.length - 1].trim()) && lines.length > 1;
    return '<pre><code>' + esc(lines.slice(1, closed ? -1 : undefined).join('\n')) + '</code></pre>';
  }

  const c = /^:::(\S*)\s*(.*)$/.exec(t);
  if (c) {
    const inner = lines.slice(1, lines[lines.length - 1].trim() === ':::' ? -1 : undefined);
    /* Raw HTML is one block to the round diff, whatever it holds. */
    if (c[1] === 'html' || c[1] === '') return inner.length ? BLK + inner.join('\n') + BLK_END : '';
    /* A gallery holds one image per line, `![caption](src)`, each becoming a
       captioned figure in a thumbnail grid. A line starting with `<` is a
       figure written by hand and passes through verbatim. `:::gallery pairs`
       adds the class that keeps a before-and-after pair on one row. */
    if (c[1] === 'gallery') {
      const items = inner.map((l) => l.trim()).filter(Boolean).map((l) => {
        if (l.startsWith('<')) return l;
        const m = /^!\[([^\]]*)\]\(([^)\s]+)\)$/.exec(l);
        if (!m) throw new Error('gallery: expected ![caption](src) or a <figure>, got: ' + l);
        return '<figure><img src="' + escAttr(m[2]) + '" alt="' + escAttr(m[1]) + '">' +
          (m[1] ? '<figcaption>' + inline(m[1], refs) + '</figcaption>' : '') + '</figure>';
      });
      return '<div class="gallery' + (c[2] ? ' ' + escAttr(c[2]) : '') + '">\n' + items.join('\n') + '\n</div>';
    }
    /* A message the reader sends on: boxed, rendered as markdown, and given a
       copy button by brief.js, which finds it by the data attribute. */
    if (c[1] === 'draft') return '<div class="draft" data-draft>\n' + renderBody(inner, ctx) + '\n</div>';
    const cls = c[1] + (c[2] ? ' ' + c[2] : '');
    return '<div class="' + cls + '">\n' + renderBody(inner, ctx) + '\n</div>';
  }

  if (t.startsWith('<')) return BLK + lines.join('\n') + BLK_END;

  const h = /^(#{3,6})\s+(.*?)(?:\s*\{#([^}]+)\})?$/.exec(t);
  if (h) {
    const lvl = Math.min(h[1].length + 1, 6);
    /* A sub-heading carries an id derived from its own text, so prose can link
       to it. Every other markdown renderer does this, and a glossary — the one
       document type built entirely out of sub-headings and cross-references to
       them — is unwritable without it. `{#custom}` overrides, the same way it
       does on a part or a section heading.

       ponytail: no de-duplication. Two sub-headings with the same text in one
       brief produce the same id, and the link lands on the first. Add a counter
       the day a brief legitimately repeats a sub-heading title. */
    const hid = h[3] || slug(h[2]);
    return '<h' + lvl + (hid ? ' id="' + escAttr(hid) + '"' : '') + '>' +
      inline(h[2], refs) + '</h' + lvl + '>';
  }

  if (/^(---|\*\*\*)$/.test(t)) return '<hr>';

  if (lines.length > 1 && first.includes('|') && isDivider(lines[1])) return renderTable(lines, refs);

  /* The reference list is rendered ONCE, from every definition in the document,
     at the first block that holds one.

     It used to render per block, and a blank line between two entries makes two
     blocks. The displayed number is computed document-wide in collectAnchors
     while the sort ran per block, so a bibliography written with gaps came out
     ordered 1 2 3 6 7 4 5 — each list internally alphabetical, the numbers
     global, and the two agreeing only when every entry sat in one unbroken run.
     Rendering the whole set at once is what makes the sort and the numbering
     read the same list. */
  /* The fact notes list renders where its first definition block sits, filled
     in once the page is done, because numbers come from first appearance. */
  if (FACT_DEF.test(t)) {
    if (!refs.facts) throw new Error('fact note definition ' + t.slice(0, 40) + ' needs `notes: per-fact` in the front matter');
    if (refs.notesListed) return '';
    refs.notesListed = true;
    return NOTES_SLOT;
  }

  if (/^\[\^\d+\]:/.test(t)) {
    if (refs.listed) return '';
    refs.listed = true;
    /* `refs.all` is empty when every definition sits inside a ::: container,
       which collectAnchors does not descend into. An empty array is truthy, so
       `||` never fell back and the bibliography rendered empty — silently
       losing the sources rather than failing. Length, not truthiness. */
    const all = refs.all && refs.all.length ? refs.all : parseRefs(lines);
    return renderRefs(all, refs, ctx.publish);
  }

  if (/^[a-z]\)\s/.test(t)) {
    const opts = [];
    for (const l of lines) {
      const m = /^([a-z]\))\s+(.*)$/.exec(l.trim());
      if (m) opts.push({ k: m[1], text: [m[2]] });
      else if (opts.length) opts[opts.length - 1].text.push(l.trim());
    }
    /* "Recommended" inside an option becomes a badge, wherever the author put
       it, so a reader scanning the list finds the pick without reading it. */
    const badge = (h) => h.replace(
      /(?:<(?:strong|b)>\s*)?\(?Recommended\)?:?(?:\s*<\/(?:strong|b)>)?:?/i,
      '<span class="rec">Recommended</span>');
    return '<ul class="options">\n' + opts.map((o) => {
      const h = badge(inline(o.text.join(' '), refs));
      const cls = /class="rec"/.test(h) ? ' class="is-rec"' : '';
      return '  <li' + cls + '><b>' + o.k + '</b> ' + h + '</li>';
    }).join('\n') + '\n</ul>';
  }

  /* The assumption block: two labelled sentences, always first in a question
     body, so the reader sees what they are confirming before the argument. */
  if (/^My assumption:/i.test(t)) {
    const joined = lines.map((l) => l.trim()).join(' ');
    const split = /\bIf wrong:\s*/i.exec(joined);
    const assumption = (split ? joined.slice(0, split.index) : joined)
      .replace(/^My assumption:\s*/i, '').trim();
    let html = '<p class="assume"><strong>My assumption:</strong> ' + inline(assumption, refs);
    if (split) html += ' <strong>If wrong:</strong> ' + inline(joined.slice(split.index + split[0].length).trim(), refs);
    return html + '</p>';
  }

  if (t.startsWith('>')) {
    const paras = [];
    let cur = [];
    for (const l of lines) {
      const body = l.trim().replace(/^>\s?/, '');
      if (!body.trim()) { if (cur.length) { paras.push(cur); cur = []; } continue; }
      cur.push(body);
    }
    if (cur.length) paras.push(cur);
    return '<blockquote>' + paras.map((p) => '<p>' + inline(p.join(' '), refs) + '</p>').join('\n') + '</blockquote>';
  }

  /* Definition list. Inside the provenance section it is the SOURCED four-label
     block, and inside the answers section it is the digest of answers at the top
     of the brief. Both carry the class their stylesheet rule keys off. */
  if (lines.length > 1 && lines.some((l) => /^:\s/.test(l.trim()))) {
    const rows = [];
    for (const l of lines) {
      const s = l.trim();
      if (/^:\s/.test(s)) rows[rows.length - 1].dd.push(s.replace(/^:\s*/, ''));
      else if (rows.length && /^\s{2,}/.test(l) && rows[rows.length - 1].dd.length) rows[rows.length - 1].dd.push(s);
      else rows.push({ dt: s, dd: [] });
    }
    /* "Provenance", "Provenance statement" and "Provenance and limitations" are
       all the same block, so match the prefix rather than one exact heading. */
    const cls = /^provenance/.test(ctx.sec || '') ? ' class="provblock"'
      : ctx.sec === 'answers' ? ' class="answers"' : '';
    return '<dl' + cls + '>\n' + rows.map((r) =>
      '  <dt>' + inline(r.dt, refs) + '</dt>\n  <dd>' + inline(r.dd.join(' '), refs) + '</dd>').join('\n') + '\n</dl>';
  }

  if (ITEM.test(first)) return renderList(lines, refs);

  return '<p>' + inline(lines.map((l) => l.trim()).join(' '), refs) + '</p>';
}

/* A definition list is usually written with a blank line between terms, which
   the block splitter reads as separate lists. Rejoin them so the provenance
   block comes out as one <dl> rather than four. */
const renderBody = (lines, ctx) => blocks(lines).map((b) => renderBlock(b, ctx)).filter(Boolean).join('\n\n')
  .replace(/<\/dl>\n\n<dl(?: class="[^"]*")?>\n/g, '\n');

/* ── document structure ─────────────────────────────────────────────────── */

function frontMatter(src) {
  const m = /^---\n([\s\S]*?)\n---\n?/.exec(src);
  if (!m) return [{}, src];
  const meta = {};
  for (const line of m[1].split('\n')) {
    /* Any key-shaped line is kept as written, so checkFrontMatter sees a
       `Title` or a `brief_id` and fails on it rather than it vanishing here. */
    const kv = /^([A-Za-z0-9_-]+):\s*(.*)$/.exec(line.trim());
    if (kv) meta[kv[1]] = kv[2];
  }
  return [meta, src.slice(m[0].length)];
}

/* Every front matter key something reads: this renderer, the runtime, and the
   publish tooling that writes its own state back into the file. A key outside
   this list fails the build, because a misspelt option otherwise does nothing
   and says nothing. Add a key here in the same change that starts reading it. */
const KNOWN_KEYS = new Set(['title', 'head-title', 'brief-id', 'eyebrow', 'sub', 'replies',
  'addressed', 'consumed', 'highlights', 'define', 'notes', 'tabs', 'retired', 'visibility', 'publish-slug', 'publish-project',
  'publish-project-uid', 'publish-brief-uid', 'publish-short-id', 'publish-tenant']);

function checkFrontMatter(meta) {
  const bad = Object.keys(meta).filter((k) => !KNOWN_KEYS.has(k));
  if (bad.length) {
    throw new Error('unknown front matter key ' + bad.map((k) => '"' + k + '"').join(', ') +
      '\n  Known keys: ' + [...KNOWN_KEYS].join(', '));
  }
  if (meta.define && !/^(first-use|every-use)$/.test(meta.define)) {
    throw new Error('define: expected first-use or every-use, got "' + meta.define + '"');
  }
  if (meta.tabs && meta.tabs !== 'parts') {
    throw new Error('tabs: expected parts, got "' + meta.tabs + '"');
  }
  if (meta.notes && meta.notes !== 'per-fact') {
    throw new Error('notes: expected per-fact, got "' + meta.notes + '"');
  }
}

/* A term card's `data-href` becomes a live link in its tooltip, so only two
   shapes are allowed: an https URL, or a relative one. Anything with a scheme
   (javascript:, data:, http:), a protocol-relative `//host`, a control
   character or an entity in the scheme position is dropped. brief.js applies
   the same rule again on the decoded value. */
export function safeHref(v) {
  const s = String(v).trim();
  if (!s || /[\x00-\x1f\x7f]/.test(s)) return false;
  if (/^https:\/\/[^\s/]/i.test(s)) return true;
  if (/^[/\\]{2}/.test(s)) return false;
  return !/[:&\\]/.test(s.split(/[/?#]/)[0]);
}
/* Runs only on the Definitions section, and only inside the opening tag of a
   `term` card, which is the one place brief.js turns data-href into a link.
   A code example or a widget elsewhere that mentions the attribute is left alone. */
const dropUnsafeHrefs = (html) => html.replace(/<[a-z][^>]*\sclass\s*=\s*["'][^"']*\bterm\b[^"']*["'][^>]*>/gi,
  (tag) => tag.replace(/\sdata-href\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/gi,
    (all, a, b, c) => (safeHref(a ?? b ?? c) ? all : '')));

const HEAD = /^(#{1,2})\s+(.*?)(?:\s*\{#([^}]+)\})?(?:\s*::\s*(.*))?$/;

/* `private: true` on its own line anywhere in a section marks it as never
   publishable. It is stripped from BOTH renders, because it is metadata about
   the section rather than something the section says. Written the long way
   rather than as a heading flag so it is visible while editing: the whole risk
   this guards against is a section that was meant to be private and did not
   look private in the source. */
const PRIVATE_DIRECTIVE = /^private:\s*true\s*$/i;

/* One pass down the file, cutting it at part (#) and section (##) headings.
   A heading inside a fence or a ::: container is content, not structure. */
function outline(body) {
  const parts = [{ title: null, lede: [], sections: [] }];
  let fence = null, depth = 0, sink = parts[0].lede, cur = null;
  for (const line of body.split('\n')) {
    const trimmed = line.trim();
    if (fence) { sink.push(line); if (/^[`~]+$/.test(trimmed) && trimmed.startsWith(fence)) fence = null; continue; }
    const f = fenceOpen(line);
    if (f) { sink.push(line); fence = f[1]; continue; }
    if (/^:::/.test(trimmed)) {
      sink.push(line);
      if (trimmed === ':::') depth = Math.max(0, depth - 1); else depth += 1;
      continue;
    }
    if (depth === 0 && /^#{1,2}\s/.test(trimmed)) {
      const h = HEAD.exec(trimmed);
      if (h[1] === '#') {
        parts.push({ title: h[2], lede: [], sections: [], id: h[3] || null });
        sink = parts[parts.length - 1].lede;
        cur = null;
      } else {
        const q = /^Q(\d+)\s+(.*)$/.exec(h[2]);
        const sec = {
          q: q ? 'Q' + q[1] : null,
          title: q ? q[2] : h[2],
          id: h[3] || (q ? 's-q' + q[1] : /^contents$/i.test(h[2]) ? 's-toc' : 's-' + slug(h[2])),
          toc: h[4] ? h[4].split(/\s*\|\s*/) : [],
          lines: [],
        };
        parts[parts.length - 1].sections.push(sec);
        sink = sec.lines;
        cur = sec;
      }
      continue;
    }
    /* Before the first section of a part, the directive marks the PART. It has
       to land somewhere: falling through printed `private: true` as prose in
       both renders and published the lede it was meant to withhold. */
    if (PRIVATE_DIRECTIVE.test(trimmed)) {
      (cur || parts[parts.length - 1]).private = true;
      continue;
    }
    sink.push(line);
  }
  parts.forEach((p) => { if (p.title) p.id = p.id || null; });
  const named = parts.filter((p) => p.title);
  named.forEach((p, i) => { p.id = p.id || 'part-' + (i + 1); });
  return parts.filter((p) => p.title || p.sections.length || p.lede.some((l) => l.trim()));
}

/* `:: note` on a heading is the contents note. `:: label | note` also shortens
   the contents link, which questions need — a whole question read as a link is
   unskimmable, and the heading is still the complete ask. */
function tocEntry(s) {
  const label = s.toc.length > 1 && s.toc[0] ? s.toc[0] : s.title;
  const note = s.toc.length > 1 ? s.toc[1] : s.toc[0];
  // Colon here for the same reason as the part label above: chrome the renderer
  // writes is still copy the reader reads, and the house rule has no exemption.
  return '    <li><a href="#' + s.id + '">' + inline(s.q ? s.q + ': ' + label : label) + '</a>' +
    (note ? ' <span class="tnote">' + inline(note) + '</span>' : '') + '</li>';
}

/* Take a section out of whatever part the author put it in, so the renderer
   can place it where the document needs it. Returns null when there is none. */
function hoist(parts, id) {
  for (const p of parts) {
    const i = p.sections.findIndex((s) => s.id === id);
    if (i >= 0) return p.sections.splice(i, 1)[0];
  }
  return null;
}

/* The contents list is generated, never authored, so a section rename cannot
   leave a dead anchor behind — the commonest defect in a hand-built brief. */
function renderToc(parts) {
  const named = parts.filter((p) => p.title);
  /* The contents and the answers block both render ABOVE the contents list, so
     neither may appear in it: a list that points at something above itself
     sends the reader backwards. */
  const listed = (p) => p.sections.filter((s) => s.id !== 's-toc' && s.id !== 's-answers');
  const out = ['<nav class="toc">'];
  let n = 0;
  if (!named.length) {
    out.push('  <ol>');
    for (const p of parts) for (const s of listed(p)) { n += 1; out.push(tocEntry(s)); }
    out.push('  </ol>');
  } else {
    for (const p of parts) {
      const secs = listed(p);
      if (!p.title) { if (!secs.length) continue; } else {
        const i = named.indexOf(p) + 1;
        // Colon, not an em dash: this is UI copy the reader sees, and the house
        // rule bans the em dash in every artefact including chrome the renderer
        // writes itself. Caught by brief-lint.py on a real brief, 2026-09-07.
        out.push('  <p><b><a href="#' + p.id + '">Part ' + PARTWORDS[i] + ': ' + inline(p.title) + '</a></b></p>');
      }
      if (!secs.length) continue;
      out.push('  <ol' + (n ? ' start="' + (n + 1) + '"' : '') + '>');
      for (const s of secs) { n += 1; out.push(tocEntry(s)); }
      out.push('  </ol>');
    }
  }
  out.push('</nav>');
  return out.join('\n');
}

/* The sub-tab label under `tabs: parts`: the same short label the contents
   list would show, as plain text, so a long heading is shortened by the
   author's own `:: label | note` rather than truncated by the runtime. */
function tabLabel(s) {
  const label = s.toc.length > 1 && s.toc[0] ? s.toc[0] : s.title;
  return escAttr(inline(s.q ? s.q + ': ' + label : label).replace(/<[^>]*>/g, '')
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&'));
}

function renderSection(sec, ctx) {
  const data = sec.id.replace(/^s-/, '');
  const tl = ctx.tabs ? ' data-tablabel="' + tabLabel(sec) + '"' : '';
  const body = renderBody(sec.lines, { ...ctx, sec: data });
  if (sec.q) {
    return '<section class="q" id="' + sec.id + '" data-q="' + sec.q + '"' + tl + '>\n' +
      '  <div class="q-head">\n' +
      '    <label class="tick"><input type="checkbox" aria-label="Mark ' + sec.q + ' resolved"></label>\n' +
      '    <h3><span class="qid">' + sec.q + '</span> ' + inline(sec.title, ctx.refs) + '</h3>\n' +
      '  </div>\n  <div class="q-body">\n' + body + '\n  </div>' +
      proveIt(sec.lines, ctx.index || {}, ctx.refs) + '\n</section>';
  }
  return '<section class="brief-section" id="' + sec.id + '" data-sec="' + data + '"' + tl + '>\n' +
    '  <div class="sec-head">\n' +
    '    <label class="tick"><input type="checkbox" aria-label="Mark section read"></label>\n' +
    '    <h3>' + inline(sec.title, ctx.refs) + '</h3>\n' +
    '  </div>\n  <div class="sec-body">\n' + body + '\n  </div>' +
    proveIt(sec.lines, ctx.index || {}, ctx.refs) + '\n</section>';
}

/* Footnote targets are collected before anything renders, so a marker pointing
   at a quote that does not exist is a build error rather than a dead link the
   reader finds. */
function collectAnchors(parts, publish) {
  const anchors = new Set();
  const index = {};
  const quoteCount = {};
  const all = [];
  for (const p of parts) {
    for (const s of p.sections) {
      for (const b of blocks(s.lines)) {
        if (!/^\[\^\d+\]:/.test(b[0].trim())) continue;
        for (const r of parseRefs(b)) {
          anchors.add('ref' + r.n);
          index[r.n] = { label: shortCite(publish && r.origin ? r.origin : r.apa.join(' ')), quotes: r.quotes };
          quoteCount[r.n] = r.quotes.length;
          all.push(r);
        }
      }
    }
  }
  /* The number a marker shows is the entry's position in the ALPHABETICAL list,
     computed once here so the markers and the list cannot disagree. The [^n]
     key stays whatever the author wrote; it is an id, not a number. */
  const display = {};
  all.slice().sort((a, b) => refSortKey(a, publish).localeCompare(refSortKey(b, publish)))
    .forEach((r, i) => { display[r.n] = String(i + 1); });
  return { anchors, index, quoteCount, display, all };
}

/* A brief is one file, and the renderer makes that literally true: brief.css and
   brief.js are inlined into the page it writes.

   The alternative was a three-rung loader — local copies, then pinned CDN copies
   verified by Subresource Integrity, then a notice. Every rung had a failure the
   reader could not diagnose and could not fix: assets left behind when the file
   moved, a moved tag orphaning the integrity hashes of every brief already sent,
   a commit not yet pushed, a firewall, an offline laptop. All of it existed to
   deliver ~100KB that fits in the document. A brief that has to phone home is
   not a document; it is an app with a dependency, and it gets mailed, dropped in
   Drive and opened on a plane like a document.

   Inlined, the whole class is gone. No network, no third party learning that a
   brief was opened, no version skew, and nothing to keep in sync. The cost is a
   ~240KB file that freezes its runtime at build time — which was already true,
   since an old brief kept whatever brief.js sat beside it.

   `opts.link` restores the linked form for the one case that cannot inline:
   hand-authoring the template inside a chat tool with no filesystem. */
function inlineRuntime(template, opts = {}) {
  if (opts.link) return template;
  const css = readFileSync(join(HERE, 'brief.css'), 'utf8');
  const js = readFileSync(join(HERE, 'brief.js'), 'utf8');
  const guard = (s, tag) => {
    if (new RegExp('</' + tag, 'i').test(s)) {
      throw new Error(tag + ' contains a closing </' + tag + '> and cannot be inlined safely');
    }
    return s;
  };
  return template
    .replace(/<link rel="stylesheet" href="brief\.css"[^>]*>\n<script>[\s\S]*?<\/script>/,
      /* A function, not a string: a string replacement expands `$&` and `$'`
         inside the asset, which silently corrupts the inlined code. */
      () => '<style>\n' + guard(css, 'style') + '\n</style>')
    .replace(/<script src="brief\.js"[^>]*><\/script>/,
      () => '<script>\n' + guard(js, 'script') + '\n</script>');
}

/* A diagram that vanishes in dark mode is the one defect an author cannot see:
   they write it in light mode, it looks right, and it ships black-on-black to
   every reader whose system is dark. brief.css sets `fill: currentColor` on
   `main svg text` so the default is correct — but a default only holds until
   somebody overrides it, and the override is exactly what an author reaches for
   when a label "needs to be darker". So the build refuses it rather than
   trusting the stylesheet to win.

   Allowed on SVG text: a theme variable, currentColor, none, inherit. Anything
   else — a hex, a colour keyword, an rgb() — is a fixed colour on a surface
   whose background is not fixed, which is the bug. Re-declaring the shared rules
   in a brief's own <style> is refused for the same reason: it forks a fix that
   should live in one place. */
export function darkModeFaults(html) {
  const faults = [];
  const OK = /^(var\(--|currentColor$|none$|inherit$)/i;
  for (const m of html.matchAll(/<text\b[^>]*\bfill="([^"]*)"/gi)) {
    if (!OK.test(m[1].trim())) {
      faults.push('svg <text fill="' + m[1] + '"> is a fixed colour, so the label ' +
        'disappears on whichever background it was not written against. Delete the fill ' +
        'and let it inherit, or use var(--fg) / var(--muted) / var(--accent).');
    }
  }
  for (const m of html.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi)) {
    if (/(^|[},;\s])(main\s+svg\s+text|\.diag\s+text|\.diag\b|\.cap\b)\s*\{/i.test(m[1])) {
      faults.push('a <style> block re-declares .diag / .cap / svg text. Those ship in ' +
        'brief.css — delete the local copy so every brief gets the fix, not just this one.');
    }
  }
  return [...new Set(faults)];
}

/* Every `#anchor` the document links to must exist in the document.

   The footnote gate already catches a marker with no target. This catches the
   other half, and it is the half that dropping a section creates: a contents
   entry or a hand-written cross-reference pointing at a section that is no
   longer there. A dead internal link is invisible to the author, who renders
   the ordinary version and never clicks it, and obvious to the stranger. */
function checkAnchors(html) {
  const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]));
  const dead = [...new Set([...html.matchAll(/\bhref="#([^"]+)"/g)]
    .map((m) => m[1]).filter((a) => a && !ids.has(a)))];
  if (dead.length) throw new Error('internal links with no target: #' + dead.join(', #'));
}

/* Drop every section marked `private: true`, and any part left with nothing.

   Numbers are NOT renumbered. A footnote keeps the number it has in the
   ordinary render, so a reference cited only from a dropped section stays in
   the list, uncited. That is deliberate: renumbering would make the two
   documents say different things for a reason that is not privacy, and it
   would break a citation anyone has already written down. An uncited entry in
   a reference list is a bibliography, which is a thing readers already know.

   Part NUMBERING does shift when a whole part goes, because the alternative is
   a part heading with nothing underneath it — a visible hole that announces
   the removal it was supposed to make quiet. */
function dropPrivate(parts) {
  const has = (p) => p.sections.length || p.lede.some((l) => l.trim());
  return parts
    .filter((p) => !p.private)
    .map((p) => ({ ...p, sections: p.sections.filter((s) => !s.private) }))
    .filter(has);
}

export function render(source, opts = {}) {
  return renderDoc(source, opts).html;
}

/* ── rounds ───────────────────────────────────────────────────────────────
   A brief goes back and forth: the reader answers, the author regenerates the
   same brief-id at the same path. The sidecar `<output>.rounds.json` records
   each round's sections (id, heading, a hash of the rendered text), so the
   next round can say what is new, what changed and what went.

   A round is keyed on `consumed:` when the front matter has one, else on the
   source hash. `consumed:` changes once per reply to the reader, so an author
   rebuilding five times while drafting round 3 still gets one round 3,
   compared against round 2. Without it every source edit is a round.

   Returns { html, rounds }. `prev` is the parsed sidecar or null. */
export function renderRound(source, prev, opts = {}) {
  return renderDoc(source, { ...opts, rounds: { prev, date: opts.date } });
}

/* The text a reader sees, minus footnote numbers: adding one source renumbers
   every marker after it alphabetically, and that is not a change to the prose. */
const sectionText = (html) => html.replace(/<sup class="fn[^"]*">[\s\S]*?<\/sup>/g, '')
  .replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
const plainTitle = (s) => (s.q ? s.q + ' ' : '') + inline(s.title).replace(/<[^>]*>/g, '')
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');

function parseRetired(raw) {
  if (!raw) return [];
  let list;
  try { list = JSON.parse(raw); } catch (e) {
    throw new Error('retired: expected a JSON array of {"id": "s-x", "why": "..."}, got: ' + raw.slice(0, 60));
  }
  if (!Array.isArray(list) || list.some((r) => !r || typeof r.id !== 'string' || !r.id)) {
    throw new Error('retired: every entry needs an "id", e.g. [{"id": "s-x", "why": "..."}]');
  }
  return list;
}

/* ── paragraph-level diff ─────────────────────────────────────────────────
   From round two each changed section is compared, block by block, with the
   same section as the last round rendered it. A block is a leaf paragraph,
   list item, dt or dd, table row, heading, blockquote, pre or figure, and a
   raw HTML block (`:::html`, or a line opening with `<`) is one block whole:
   renderBlock fences those with BLK markers, which are stripped before the
   page is written. Blocks are matched on their text (footnote numbers out),
   longest common subsequence first. An added block gets `diff-add`; a removed
   one is put back where it was, struck through, as `diff-del`, with no ids
   and `inert`, so the runtime never counts it as a question, an answer, a
   footnote target or a definition. An edit is a removal and an addition, so
   it reads as the old block above the new one. */
const BLK = '<!--diff:blk-->', BLK_END = '<!--/diff:blk-->';
const ATOMS = new Set(['p', 'li', 'dt', 'dd', 'tr', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'pre', 'figure']);
const LISTY = { tr: 1, li: 1, dt: 1, dd: 1 };
const WRAP = { tr: ['<table class="diff-wrap"><tbody>', '</tbody></table>'], li: ['<ul class="diff-wrap">', '</ul>'],
  dt: ['<dl class="diff-wrap">', '</dl>'], dd: ['<dl class="diff-wrap">', '</dl>'] };

/* Top-level atoms only: a list item is one block with any list nested in it,
   so an edit to a nested item shows the whole item as edited, never missed.
   ponytail: text outside every atom (a bare figure caption in a div) is not
   compared; the section still reads as changed from its hash. */
function leafBlocks(html) {
  const out = [];
  const re = /<!--diff:blk-->|<([a-zA-Z][\w-]*)\b[^>]*>/g;
  let m;
  while ((m = re.exec(html))) {
    let end, tag = '';
    if (m[0] === BLK) {
      const c = html.indexOf(BLK_END, re.lastIndex);
      end = c < 0 ? html.length : c + BLK_END.length;
    } else {
      tag = m[1].toLowerCase();
      if (!ATOMS.has(tag)) continue;
      const t = new RegExp('<(/?)' + tag + '\\b[^>]*>', 'gi');
      t.lastIndex = re.lastIndex;
      let depth = 1, n;
      while (depth && (n = t.exec(html))) depth += n[1] ? -1 : 1;
      end = depth ? html.length : t.lastIndex;
    }
    const h = html.slice(m.index, end);
    out.push({ start: m.index, end, tag, html: h,
      key: tag ? tag + ':' + sectionText(h.replace(/<span class="rnum">[^<]*<\/span>/g, '')) : 'raw:' + h.replace(/\s+/g, ' ') });
    re.lastIndex = end;
  }
  return out;
}

function lcsOps(a, b) {
  const n = a.length, m = b.length;
  const d = Array.from({ length: n + 1 }, () => new Int32Array(m + 1));
  for (let i = n - 1; i >= 0; i--) for (let j = m - 1; j >= 0; j--) {
    d[i][j] = a[i].key === b[j].key ? d[i + 1][j + 1] + 1 : Math.max(d[i + 1][j], d[i][j + 1]);
  }
  const ops = [];
  let i = 0, j = 0;
  while (i < n || j < m) {
    if (i < n && j < m && a[i].key === b[j].key) ops.push(['=', a[i++], b[j++]]);
    else if (j >= m || (i < n && d[i + 1][j] >= d[i][j + 1])) ops.push(['-', a[i++], null]);
    else ops.push(['+', null, b[j++]]);
  }
  return ops;
}

/* Old HTML put back on the page: no ids (they would duplicate the live ones),
   nothing a script or the runtime would pick up, and internal links parked on
   data-ghost-href until the page is done (an old link may point at an id that
   has gone; renderDoc restores the ones that still resolve). */
const GHOST_DROP = new Set(['id', 'for', 'data-doc', 'data-draft', 'data-q', 'data-sec', 'data-tablabel', 'aria-labelledby']);
/* One attribute at a time, so a value is consumed whole and a name inside a
   quoted value is never mistaken for an attribute. Names are case-insensitive;
   values may be double-quoted, single-quoted or bare. */
const ATTR = /(\s+)([^\s"'>\/=]+)(?:\s*=\s*("[^"]*"|'[^']*'|[^\s"'=<>`]+))?/g;
const ghostAttrs = (attrs) => attrs.replace(ATTR, (all, sp, name, val) => {
  const n = name.toLowerCase();
  if (GHOST_DROP.has(n)) return '';
  const v = val ? val.replace(/^(["'])([\s\S]*)\1$/, '$2') : '';
  if (n === 'href' && v.startsWith('#')) return ' data-ghost-href="' + v.replace(/"/g, '&quot;') + '"';
  return all;
});
const ghost = (html) => html
  .replace(/<script\b[\s\S]*?<\/script>/gi, '')
  .replace(/<textarea\b[\s\S]*?<\/textarea>/gi, '')
  .replace(/\s*<label class="tick">[\s\S]*?<\/label>/g, '')
  .replace(/<input\b[^>]*>/gi, '')
  .replace(/<([a-zA-Z][\w-]*)((?:"[^"]*"|'[^']*'|[^'">])*)>/g, (_, t, attrs) => '<' + t + ghostAttrs(attrs) + '>');
const addClass = (html, cls, extra = '') => html.replace(/^<([a-zA-Z][\w-]*)([^>]*)>/, (_, t, attrs) =>
  '<' + t + (/\sclass="/.test(attrs) ? attrs.replace(/\sclass="([^"]*)"/, (__, c) => ' class="' + c + ' ' + cls + '"')
    : ' class="' + cls + '"' + attrs) + extra + '>');
const delHtml = (b) => b.tag ? addClass(ghost(b.html), 'diff-del', ' inert')
  : '<div class="diff-del" inert>' + ghost(b.html) + '</div>';
const addHtml = (b) => b.tag ? addClass(b.html, 'diff-add') : '<div class="diff-add">' + b.html + '</div>';

/* A section's three parts: the head, the body the diff runs on, and the tail
   (the closing div and the evidence block, which is not diffed). */
function splitSection(html) {
  const open = /<div class="(?:sec|q)-body">\n?/.exec(html);
  const tail = /\n {2}<\/div>(?:\n {2}<(?:p|details) class="l5">[\s\S]*)?\n<\/section>$/.exec(html);
  if (!open || !tail || tail.index < open.index) return null;
  const s = open.index + open[0].length;
  return { head: html.slice(0, s), body: html.slice(s, tail.index), tail: html.slice(tail.index) };
}

function diffSection(nw, old) {
  const N = splitSection(nw), O = splitSection(old);
  if (!N || !O) return nw;
  const ops = lcsOps(leafBlocks(O.body), leafBlocks(N.body));
  const before = new Map(), added = new Map();
  const put = (pos, h) => { if (!before.has(pos)) before.set(pos, []); before.get(pos).push(h); };
  const fits = (d, a) => !LISTY[d.tag] || (!!a && (a.tag === d.tag || (d.tag[0] === 'd' && /^d[td]$/.test(a.tag))));
  /* A removed row or item has to land among its own kind, or the parser
     drops it. Before the next block, else after the last kept one, else wrapped. */
  const place = (d, next, prev) => {
    if (next && fits(d, next)) return put(next.start, delHtml(d));
    if (prev && fits(d, prev)) return put(prev.end, delHtml(d));
    const w = WRAP[d.tag];
    put(next ? next.start : prev ? prev.end : N.body.length, w ? w[0] + delHtml(d) + w[1] : delHtml(d));
  };
  let last = null;
  for (let k = 0; k < ops.length;) {
    if (ops[k][0] === '=') { last = ops[k][2]; k++; continue; }
    const dels = [], adds = [];
    let e = k;
    for (; e < ops.length && ops[e][0] !== '='; e++) {
      if (ops[e][0] === '-') dels.push(ops[e][1]); else adds.push(ops[e][2]);
    }
    for (const b of adds) added.set(b.start, b);
    const next = e < ops.length ? ops[e][2] : null;
    /* The whole old run above the whole new run, so a dt/dd pair or a run of
       rows reads as the old version, then the new one. */
    for (const d of dels) place(d, adds[0] || next, last);
    if (adds.length) last = adds[adds.length - 1];
    k = e;
  }
  let res = '', at = 0;
  for (const p of [...new Set([...before.keys(), ...added.keys()])].sort((a, b) => a - b)) {
    res += N.body.slice(at, p) + (before.get(p) || []).map((h) => h + '\n').join('');
    const a = added.get(p);
    if (a) { res += addHtml(a); at = a.end; } else at = p;
  }
  res += N.body.slice(at);
  /* A renamed heading: the old one struck through at the top of the body. */
  let head = N.head, lead = '';
  const h3 = (s) => (/<h3>([\s\S]*?)<\/h3>/.exec(s) || [])[1] || '';
  if (sectionText(h3(O.head)) !== sectionText(h3(N.head))) {
    head = head.replace('<h3>', '<h3 class="diff-add">');
    lead = '<p class="diff-del diff-head" inert>' + ghost(h3(O.head)) + '</p>\n';
  }
  return head + lead + res + N.tail;
}

/* A retired section stays where it was, struck through, with the reason under
   its heading. It keeps its own id (nothing live has it) so the contents entry
   can point at it, and loses the classes the runtime counts sections by. */
function retiredSection(old, sid, why) {
  const body = ghost(old.replace(/^<section[^>]*>/, ''))
    .replace(/(<div class="(?:sec|q)-head">[\s\S]*?\n {2}<\/div>)/, (x) => x +
      '\n  <p class="diff-why">Retired' + (why ? ': ' + inline(why) : '.') + '</p>');
  return '<section class="diff-retired" id="' + sid + '" data-round-state="retired" inert>' + body;
}

const PILL = { new: 'New', changed: 'Changed', retired: 'Retired' };
const tocLi = (inner, st) => '<li class="toc-diff' + (st === 'retired' ? ' toc-retired' : '') + '"><span class="toc-entry">' +
  inner + '</span><span class="toc-pill" data-round="' + st + '">' + PILL[st] + '</span></li>';
const TOC_LI = /<li>(<a href="#([^"]+)"[\s\S]*?)<\/li>/g;

/* Stamps each rendered section in `out` with its state against the last round,
   diffs the changed ones, puts retired ones back, and pills the contents.
   Returns the new sidecar and whether a diff was drawn. Only the last two
   rounds keep their rendered HTML (`html`, `toc`): the next build diffs
   against one of them, and the hash history stays small. */
function stampRounds(out, allSecs, meta, build, cfg, partOf = {}) {
  const id = meta['brief-id'] || slug(meta.title || 'brief');
  const key = meta.consumed || build;
  const prev = cfg.prev && cfg.prev['brief-id'] === id && Array.isArray(cfg.prev.rounds) ? cfg.prev.rounds : [];
  const last = prev[prev.length - 1];
  const same = !!last && last.key === key;
  const base = same ? prev[prev.length - 2] : last;
  const sections = {};
  const titleOf = Object.fromEntries(allSecs.map((s) => [s.id, plainTitle(s)]));
  const ti = out.findIndex((h) => /^<section[^>]* id="s-toc"/.test(h));
  const tocOf = {};
  if (ti >= 0) for (const m of out[ti].matchAll(TOC_LI)) tocOf[m[2]] = m[1];
  const state = {};
  for (let i = 0; i < out.length; i++) {
    const m = /^<section[^>]* id="([^"]+)"/.exec(out[i]);
    if (!m || m[1] === 's-toc' || !titleOf[m[1]]) continue;
    const sid = m[1];
    sections[sid] = { title: titleOf[sid],
      hash: createHash('sha256').update(sectionText(out[i])).digest('hex').slice(0, 12), html: out[i] };
    if (tocOf[sid]) sections[sid].toc = tocOf[sid];
    if (sid in partOf) sections[sid].part = partOf[sid];
    if (!base) continue;
    const was = base.sections && base.sections[sid];
    state[sid] = !was ? 'new' : was.hash === sections[sid].hash ? 'same' : 'changed';
    if (state[sid] === 'changed' && was.html) out[i] = diffSection(out[i], was.html);
    out[i] = out[i].replace(/^(<section[^>]*)>/, (_, open) => open + ' data-round-state="' + state[sid] + '">');
  }
  const round = same ? { ...last, builds: [...new Set([...(last.builds || []), build])], sections }
    : { round: last ? last.round + 1 : 1, date: cfg.date || new Date().toISOString().slice(0, 10), key, builds: [build], sections };
  const kept = [...prev.slice(0, same ? -1 : undefined), round];
  const rounds = { 'brief-id': id, rounds: kept.map((r, i) => i >= kept.length - 2 ? r : { ...r,
    sections: Object.fromEntries(Object.entries(r.sections || {}).map(([k, v]) => [k, { title: v.title, hash: v.hash }])) }) };
  if (!base) return { rounds, diff: false };

  /* No silent trimming. A section the last round had must still be here, or be
     retired on purpose with a reason the reader will see. An answered question
     whose answer now has its own `## Your Qn answer` section retires itself. */
  const why = {};
  for (const r of parseRetired(meta.retired)) why[r.id] = r.why || '';
  const order = Object.keys(base.sections || {}).filter((sid) => sid !== 's-toc');
  const gone = order.filter((sid) => !sections[sid]);
  for (const sid of gone) {
    const q = /^s-q(\d+)$/.exec(sid);
    const ans = q && allSecs.find((s) => new RegExp('^Your Q' + q[1] + ' answer\\b', 'i').test(s.title));
    if (!(sid in why) && ans) why[sid] = 'answered, see ' + plainTitle(ans);
  }
  const missing = gone.filter((sid) => !(sid in why));
  if (missing.length) {
    throw new Error('sections from round ' + base.round + ' are missing: ' +
      missing.map((sid) => sid + ' (' + base.sections[sid].title + ')').join(', ') +
      '\n  Never trim a brief between rounds. Put the section back, or list it in the front matter:' +
      '\n  retired: [{"id": "' + missing[0] + '", "why": "what replaced it"}]');
  }

  /* Each retired section goes back inside the part it was in, after its old
     predecessor in that part (the last earlier section of the part still on the
     page, or just put back), else straight after the part heading and lede. A
     sidecar from before parts were recorded, or a part that has gone, falls
     back to the last earlier section anywhere. */
  const at = (sid) => out.findIndex((h) => h.startsWith('<section') && h.includes(' id="' + sid + '"'));
  const partHead = (pid) => pid ? out.findIndex((h) => h.startsWith('<h2 class="part" id="' + pid + '"')) : -1;
  const partOfNow = (sid) => sections[sid] ? sections[sid].part : base.sections[sid].part;
  const afterIn = new Map();
  let after = null;
  for (const sid of order) {
    const old = base.sections[sid];
    if (sections[sid] || !old.html) {
      if (at(sid) >= 0) { after = sid; afterIn.set(partOfNow(sid), sid); }
      continue;
    }
    const prevIn = afterIn.get(old.part), head = partHead(old.part);
    let pos;
    if (old.part !== undefined && prevIn) pos = at(prevIn) + 1;
    else if (head >= 0) {
      pos = head + 1;
      while (pos < out.length && !/^<(section|h2 class="part"|\/div>|div class="endmark")/.test(out[pos])) pos++;
    } else pos = after ? at(after) + 1 : out.findIndex((h) => h.startsWith('<section') && !h.includes(' id="s-toc"'));
    out.splice(pos < 0 ? out.length - 1 : pos, 0, retiredSection(old.html, sid, why[sid]));
    state[sid] = 'retired';
    after = sid;
    afterIn.set(old.part, sid);
  }

  /* Contents: a pill on each new, changed or retired entry, and the retired
     entries back at their old place, after the entry before them. */
  if (ti >= 0) {
    const toc = out.findIndex((h) => /^<section[^>]* id="s-toc"/.test(h));
    let html = out[toc].replace(TOC_LI, (all, inner, sid) =>
      state[sid] === 'new' || state[sid] === 'changed' ? tocLi(inner, state[sid]) : all);
    /* Same rule as the body: after the entry before it in its own part, else
       first under that part's line in the contents (opening a list if the part
       has no entries left), else after the entry before it anywhere. */
    let prevSid = null;
    const prevIn = new Map();
    for (const sid of order) {
      const old = base.sections[sid];
      if (state[sid] === 'retired' && old.toc) {
        const li = tocLi(ghost(old.toc), 'retired');
        const pin = old.part !== undefined ? prevIn.get(old.part) : null;
        const pref = old.part ? html.indexOf('<a href="#' + old.part + '">') : -1;
        let ins = -1, txt = '';
        if (pin || pref < 0) {
          const p = pin || prevSid, ref = p ? html.indexOf('href="#' + p + '"') : -1;
          ins = ref >= 0 ? html.indexOf('</li>', ref) + 5 : html.search(/<li[\s>]/);
          txt = ref >= 0 ? '\n    ' + li : li + '\n    ';
        } else {
          const pEnd = html.indexOf('</p>', pref) + 4, ol = /^\n\s*<ol[^>]*>/.exec(html.slice(pEnd));
          ins = ol ? pEnd + ol[0].length : pEnd;
          txt = ol ? '\n    ' + li : '\n  <ol>\n    ' + li + '\n  </ol>';
        }
        if (ins >= 0) { html = html.slice(0, ins) + txt + html.slice(ins); prevSid = sid; prevIn.set(old.part, sid); }
      } else if (html.includes('href="#' + sid + '"')) { prevSid = sid; prevIn.set(partOfNow(sid), sid); }
    }
    out[toc] = html;
  }
  return { rounds, diff: true };
}

function renderDoc(source, opts = {}) {
  /* Line endings and a BOM are editor artefacts, never content. Normalising
     here is what makes the same source render the same page on any machine. */
  const src = source.replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n');
  const [meta, body] = frontMatter(src);
  checkFrontMatter(meta);
  /* Dropping runs before the anchor index is built, so a footnote DEFINITION
     that lived in a private section still fails the build loudly rather than
     orphaning every marker that cited it. That gate is not weakened here. */
  const parts = opts.publish ? dropPrivate(outline(body)) : outline(body);
  const allSecs = parts.flatMap((p) => p.sections);
  const { anchors, index, quoteCount, display, all } = collectAnchors(parts, opts.publish);
  const refs = { anchors, missing: [], quoteCount, display, all, listed: false };
  const facts = collectFacts(parts, index, quoteCount);
  if (meta.notes === 'per-fact') {
    refs.facts = facts;
    refs.factCount = 0;
  } else if (Object.keys(facts).length) {
    throw new Error('fact note definitions need `notes: per-fact` in the front matter');
  }
  const tabs = meta.tabs === 'parts';
  if (tabs && !parts.some((p) => p.title)) {
    throw new Error('tabs: parts needs at least one `# ` part heading to make a tab from');
  }
  const ctx = { refs, index, publish: !!opts.publish, tabs };

  const out = ['<header class="brief-title">\n  <p class="eyebrow">' + inline(meta.eyebrow || '', refs) +
    '</p>\n  <h1>' + inline(meta.title || 'Brief', refs) + '</h1>\n  <p class="sub">' +
    inline(meta.sub || '', refs) + '</p>\n</header>'];

  const named = parts.filter((p) => p.title);
  /* The first named part is the summary page. CSS cannot box a run of siblings,
     so the wrapper is the one markup addition the v4 treatment needs. A brief
     with no named parts is a single subject and gets no wrapper. */
  const summaryPart = named[0] || null;

  /* Definitions ride inside the summary page however the author ordered them:
     the words a brief turns on are read BEFORE the verdict that uses them, and
     the hoist runs first so the contents list them in the place they render.

     The contents belong to the document, not to its first part. Authored
     anywhere, they render ABOVE the summary page: a reader arriving at a boxed
     verdict with the list of sections inside the box reads the list as part of
     the verdict, which it never is. */
  const defsSec = summaryPart ? hoist(parts, 's-definitions') : null;
  if (defsSec) summaryPart.sections.push(defsSec);
  /* The answers block is the first thing under the standfirst, above the
     contents. A reader who reads nothing else still leaves with every answer,
     so it cannot sit below a list of the sections it summarises. */
  const ansSec = hoist(parts, 's-answers');
  if (ansSec) out.push(renderSection(ansSec, ctx));
  /* Under `tabs: parts` the tab bar and the gutter rail do the contents list's
     job, so an authored `## Contents` is taken out and not rendered. */
  const tocSec = hoist(parts, 's-toc');
  if (tocSec && !tabs) {
    if (!tocSec.lines.some((l) => l.trim())) tocSec.lines = renderToc(parts).split('\n');
    out.push(renderSection(tocSec, ctx));
  }
  for (const part of parts) {
    if (part === summaryPart) out.push('<div class="summary-page">');
    if (part.title) {
      out.push('<h2 class="part" id="' + part.id + '"><span class="pnum">Part ' +
        PARTWORDS[named.indexOf(part) + 1] + '</span> ' + inline(part.title, refs) + '</h2>');
      const lede = part.lede.filter((l) => l.trim());
      if (lede.length) {
        /* A part lede is ONE paragraph: every line is flattened into it and only
           inline formatting runs. So a block construct here cannot render — it
           used to be emitted as literal text, which put raw `:::html` and table
           markup on the page for the reader to find. Block content belongs in an
           `##` section under the part, and saying so loudly beats shipping it. */
        const stray = lede.find((l) => BLOCK_IN_LEDE.test(l.trim()));
        if (stray) {
          throw new Error('block content in the lede of part "' + part.title + '": ' +
            stray.trim().slice(0, 60) + '\n  A part lede is a single paragraph — inline markup only.' +
            '\n  Move this into an `## ` section under the part.');
        }
        out.push('<p class="partlede">' + inline(lede.map((l) => l.trim()).join(' '), refs) + '</p>');
        /* A part lede that cites sources gets the same collapsed evidence block
           a section gets, listing only the sources IT leans on. Without it the
           summary page — usually a lede and nothing else — is the one place in
           a brief where a footnote has no quote under it, and it is the part
           most likely to be copied out on its own. */
        const led = proveIt(lede, index, refs);
        if (led) out.push(led.trim());
      }
    }
    for (const sec of part.sections) out.push(renderSection(sec, ctx));
    if (part === summaryPart) out.push('</div>');
  }

  /* The printer's diamond: the document is over, and nothing below is missing. */
  out.push('<div class="endmark" aria-hidden="true"></div>');

  for (let i = 0; i < out.length; i++) {
    if (/^<section[^>]* id="s-definitions"/.test(out[i])) out[i] = dropUnsafeHrefs(out[i]);
  }

  if (refs.notesListed) {
    const notes = renderFactNotes(refs, index);
    for (let i = 0; i < out.length; i++) out[i] = out[i].replace(NOTES_SLOT, () => notes);
  }

  const build = createHash('sha256').update(String(source).replace(/\r\n?/g, '\n')).digest('hex').slice(0, 12);
  let rounds = null, diffAttr = '';
  if (opts.rounds) {
    /* Read after the hoists, so a section is recorded in the part it renders in. */
    const partOf = {};
    for (const p of parts) for (const s of p.sections) partOf[s.id] = p.id || '';
    const r = stampRounds(out, allSecs, meta, build, opts.rounds, partOf);
    rounds = r.rounds;
    if (r.diff) diffAttr = ' data-diff';
  } else parseRetired(meta.retired);
  /* Old internal links in struck-through blocks keep only the targets that
     still exist; the raw-block markers the diff reads are never shipped. */
  const liveIds = new Set([...out.join('\n').matchAll(/\sid\s*=\s*(?:"([^"]+)"|'([^']+)'|([^\s"'=<>`]+))/gi)]
    .map((m) => m[1] || m[2] || m[3]));
  for (let i = 0; i < out.length; i++) {
    out[i] = out[i].replace(/ data-ghost-href="#([^"]*)"/g, (_, a) => liveIds.has(a) ? ' href="#' + a + '"' : '')
      .replace(/<!--\/?diff:blk-->/g, '');
  }

  if (refs.missing.length) {
    throw new Error('footnote markers with no target: ' + [...new Set(refs.missing)].join(', '));
  }

  const dark = darkModeFaults(out.join('\n'));
  if (dark.length) throw new Error(dark.join('\n'));
  checkAnchors(out.join('\n'));

  /* The page is filled BEFORE the runtime is inlined. Filling after meant the
     greedy <main> match below could start inside brief.css or brief.js: one
     literal main tag in an asset comment silently blanked every brief. */
  const template = opts.template || readFileSync(join(HERE, 'brief-template.html'), 'utf8');
  const addressed = meta.addressed ? ' data-addressed="' + escAttr(meta.addressed) + '"' : '';
  /* What the author has already replied to, and what they said. A JSON array of
     {match, reply}: `match` is the first forty characters of the reader's own
     comment, because the comment text is the only identifier the file can hold.
     `addressed:` still works and is the same thing with no words. */
  const replies = meta.replies ? ' data-replies="' + escAttr(meta.replies) + '"' : '';
  /* Two things the FILE tells the runtime, which the reader cannot set:
     what work Claude has already taken (so the unsent-work marker clears), and
     which highlights are now part of the document rather than of one browser. */
  const consumed = meta.consumed ? ' data-consumed="' + escAttr(meta.consumed) + '"' : '';
  const define = meta.define === 'every-use' ? ' data-define="every-use"' : '';
  const tabsAttr = meta.tabs === 'parts' ? ' data-tabs="parts"' : '';
  const baked = meta.highlights ? ' data-highlights="' + escAttr(meta.highlights) + '"' : '';
  /* A token that changes whenever the source does. A comment the reader
     exported under one build and has not touched since is treated as received
     once a later build arrives, and leaves the export (brief.js, "sent"). Taken
     from the source, so an unchanged rebuild keeps the same token. */
  const buildAttr = ' data-build="' + build + '"';
  /* Publish-only, and private unless the front matter says otherwise. The
     ordinary render never carries these, so a brief that was never published
     cannot be mistaken for one that was. */
  const pub = opts.publish
    ? ' data-publish-slug="' + escAttr(meta['publish-slug'] || slug(meta.title || 'brief')) + '"' +
      ' data-visibility="' + escAttr(meta.visibility || 'private') + '"'
    : '';
  const html = inlineRuntime(template
    .replace(/\{\{TITLE\}\}/g, escAttr(meta['head-title'] || meta.title || 'Brief'))
    .replace(/<body data-brief-id="\{\{BRIEF_ID\}\}">/, '<body data-brief-id="' +
      escAttr(meta['brief-id'] || slug(meta.title || 'brief')) + '"' + addressed + replies + consumed + baked + define + tabsAttr + buildAttr + diffAttr + pub + '>')
    /* The LAST <main> in the template is the body. A function, so a `$&` or
       `$'` in the brief's own text is not expanded. */
    .replace(/<main>(?![\s\S]*<main>)[\s\S]*<\/main>/, () => '<main>\n\n' + out.join('\n\n') + '\n\n</main>'), opts);
  return { html, rounds };
}

/* Compare real paths, not the raw argv path: ~/.claude/skills is symlinked into
   the skills repo, so the documented invocation reaches this file by a path that
   never equals import.meta.url. That mismatch made the CLI a silent no-op —
   exit 0, no output, no file — which is the worst possible failure for a build. */
/* Block-level constructs that cannot survive being flattened into a part lede.
   Inline tags (span, b, em) are deliberately absent: those work fine mid-sentence. */
const BLOCK_IN_LEDE = /^(:::|\||>\s|#{1,6}\s|[-*+]\s|\d+\.\s|<(table|thead|tbody|tr|td|th|div|figure|svg|ul|ol|li|p|section|details|blockquote|pre|h[1-6])\b)/i;

const invoked = process.argv[1] && fileURLToPath(import.meta.url) === realpathSync(process.argv[1]);
if (invoked) {
  const args = process.argv.slice(2);
  const publish = args.includes('--publish');
  const [input, output] = args.filter((a) => a !== '--publish');
  if (!input) {
    console.error('usage: build-brief.mjs <source.md> [out.html] [--publish]');
    process.exit(2);
  }
  /* The publish render defaults to a DIFFERENT filename, and that is the point.
     Publish mode was reachable only from JavaScript, so anyone following the
     documented build command got the ordinary render and could ship it as the
     published one — `private:` sections intact, library URLs unswapped. Making
     the two land on the same path by default would leave the same trap one
     keystroke away. */
  const stem = join(dirname(input), basename(input).replace(/\.md$/, ''));
  const dest = output || stem + (publish ? '.publish' : '') + '.html';
  /* The publish render is a copy of the current round for someone else, so it
     neither reads nor writes the round history. */
  if (publish) {
    writeFileSync(dest, render(readFileSync(input, 'utf8'), { publish }));
    console.log('wrote ' + dest + ' (publish render)');
  } else {
    const side = dest + '.rounds.json';
    let prev = null;
    if (existsSync(side)) {
      try { prev = JSON.parse(readFileSync(side, 'utf8')); } catch (e) {
        throw new Error(side + ' is not valid JSON (' + e.message + '). Fix it, or delete it to restart the round history.');
      }
    }
    /* Render first, write after: a build that fails on a trimmed section must
       leave both the old brief and its history untouched. */
    const { html, rounds } = renderRound(readFileSync(input, 'utf8'), prev);
    writeFileSync(dest, html);
    writeFileSync(side, JSON.stringify(rounds, null, 2) + '\n');
    const r = rounds.rounds[rounds.rounds.length - 1];
    console.log('wrote ' + dest + ' (round ' + r.round + ')');
  }
}
