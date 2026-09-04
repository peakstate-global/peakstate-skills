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

import { readFileSync, writeFileSync, realpathSync } from 'node:fs';
import { dirname, join, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

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
  t = t.replace(/\[\^(\d+)(?:q(\d+))?\]/g, (m, n, q) => {
    /* Every marker lands on the ENTRY. Quotes no longer render at the back, so
       there is no per-quote anchor to jump to — the quote itself is in the
       evidence block of the section the reader is already standing in.
       The qN part of the syntax is still validated, so a marker naming a quote
       the source does not have is still a build error rather than a silent
       link to the wrong place. */
    const id = 'ref' + n;
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
function citedIn(lines) {
  const seen = [];
  let fence = null;
  for (const l of lines) {
    /* A fenced block shows its text; it does not cite anything. Without this a
       literal [^1] in a code sample gives the section an evidence block for a
       source its prose never mentions. */
    const f = fenceOpen(l);
    if (fence) { if (l.trim().startsWith(fence) && /^[`~]+$/.test(l.trim())) fence = null; continue; }
    if (f) { fence = f[1]; continue; }
    if (/^\s*\[\^\d+\]:/.test(l)) continue;
    for (const m of l.matchAll(/\[\^(\d+)(?:q\d+)?\]/g)) {
      if (!seen.includes(m[1])) seen.push(m[1]);
    }
  }
  return seen;
}

function proveIt(lines, index, reg) {
  const cited = citedIn(lines).filter((n) => index[n] && index[n].label);
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
    if (c[1] === 'html' || c[1] === '') return inner.join('\n');
    const cls = c[1] + (c[2] ? ' ' + c[2] : '');
    return '<div class="' + cls + '">\n' + renderBody(inner, ctx) + '\n</div>';
  }

  if (t.startsWith('<')) return lines.join('\n');

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
    return '<ul class="options">\n' + opts.map((o) =>
      '  <li><b>' + o.k + '</b> ' + inline(o.text.join(' '), refs) + '</li>').join('\n') + '\n</ul>';
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
     block, so it carries the class the stylesheet keys off. */
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
    const cls = /^provenance/.test(ctx.sec || '') ? ' class="provblock"' : '';
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
    const kv = /^([a-z-]+):\s*(.*)$/.exec(line.trim());
    if (kv) meta[kv[1]] = kv[2];
  }
  return [meta, src.slice(m[0].length)];
}

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
  return '    <li><a href="#' + s.id + '">' + inline(s.q ? s.q + ' — ' + label : label) + '</a>' +
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
  const listed = (p) => p.sections.filter((s) => s.id !== 's-toc');
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
        out.push('  <p><b><a href="#' + p.id + '">Part ' + PARTWORDS[i] + ' — ' + inline(p.title) + '</a></b></p>');
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

function renderSection(sec, ctx) {
  const data = sec.id.replace(/^s-/, '');
  const body = renderBody(sec.lines, { ...ctx, sec: data });
  if (sec.q) {
    return '<section class="q" id="' + sec.id + '" data-q="' + sec.q + '">\n' +
      '  <div class="q-head">\n' +
      '    <label class="tick"><input type="checkbox" aria-label="Mark ' + sec.q + ' resolved"></label>\n' +
      '    <h3><span class="qid">' + sec.q + '</span> ' + inline(sec.title, ctx.refs) + '</h3>\n' +
      '  </div>\n  <div class="q-body">\n' + body + '\n  </div>' +
      proveIt(sec.lines, ctx.index || {}, ctx.refs) + '\n</section>';
  }
  return '<section class="brief-section" id="' + sec.id + '" data-sec="' + data + '">\n' +
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
      '<style>\n' + guard(css, 'style') + '\n</style>')
    .replace(/<script src="brief\.js"[^>]*><\/script>/,
      '<script>\n' + guard(js, 'script') + '\n</script>');
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
  /* Line endings and a BOM are editor artefacts, never content. Normalising
     here is what makes the same source render the same page on any machine. */
  const src = source.replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n');
  const [meta, body] = frontMatter(src);
  /* Dropping runs before the anchor index is built, so a footnote DEFINITION
     that lived in a private section still fails the build loudly rather than
     orphaning every marker that cited it. That gate is not weakened here. */
  const parts = opts.publish ? dropPrivate(outline(body)) : outline(body);
  const { anchors, index, quoteCount, display, all } = collectAnchors(parts, opts.publish);
  const refs = { anchors, missing: [], quoteCount, display, all, listed: false };
  const ctx = { refs, index, publish: !!opts.publish };

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
  const tocSec = hoist(parts, 's-toc');
  if (tocSec) {
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

  if (refs.missing.length) {
    throw new Error('footnote markers with no target: ' + [...new Set(refs.missing)].join(', '));
  }

  const dark = darkModeFaults(out.join('\n'));
  if (dark.length) throw new Error(dark.join('\n'));
  checkAnchors(out.join('\n'));

  const template = inlineRuntime(opts.template || readFileSync(join(HERE, 'brief-template.html'), 'utf8'), opts);
  const addressed = meta.addressed ? ' data-addressed="' + escAttr(meta.addressed) + '"' : '';
  /* Two things the FILE tells the runtime, which the reader cannot set:
     what work Claude has already taken (so the unsent-work marker clears), and
     which highlights are now part of the document rather than of one browser. */
  const consumed = meta.consumed ? ' data-consumed="' + escAttr(meta.consumed) + '"' : '';
  const baked = meta.highlights ? ' data-highlights="' + escAttr(meta.highlights) + '"' : '';
  /* Publish-only, and private unless the front matter says otherwise. The
     ordinary render never carries these, so a brief that was never published
     cannot be mistaken for one that was. */
  const pub = opts.publish
    ? ' data-publish-slug="' + escAttr(meta['publish-slug'] || slug(meta.title || 'brief')) + '"' +
      ' data-visibility="' + escAttr(meta.visibility || 'private') + '"'
    : '';
  return template
    .replace(/\{\{TITLE\}\}/g, escAttr(meta['head-title'] || meta.title || 'Brief'))
    .replace(/<body data-brief-id="\{\{BRIEF_ID\}\}">/, '<body data-brief-id="' +
      escAttr(meta['brief-id'] || slug(meta.title || 'brief')) + '"' + addressed + consumed + baked + pub + '>')
    .replace(/<main>[\s\S]*<\/main>/, '<main>\n\n' + out.join('\n\n') + '\n\n</main>');
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
  writeFileSync(dest, render(readFileSync(input, 'utf8'), { publish }));
  console.log('wrote ' + dest + (publish ? ' (publish render)' : ''));
}
