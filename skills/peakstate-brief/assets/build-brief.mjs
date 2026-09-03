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

import { readFileSync, writeFileSync } from 'node:fs';
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

/* Code spans are lifted out before any other rule runs, so `**not bold**`
   inside backticks stays literal. A fence of two or more backticks lets a span
   hold a backtick, the same way CommonMark does. */
function inline(text, refs) {
  const spans = [];
  let t = text.replace(/(`+)([\s\S]*?)\1/g, (_, ticks, body) => {
    spans.push('<code>' + esc(body.replace(/^ (.*) $/, '$1')) + '</code>');
    return SENTINEL + (spans.length - 1) + SENTINEL;
  });
  t = esc(t);
  t = t.replace(/\[\^(\d+)(?:q(\d+))?\]/g, (m, n, q) => {
    let id = 'ref' + n + '-q' + (q || 1);
    /* A source with no pull quote has no quote anchor, so a bare marker lands
       on the entry itself rather than on an id nothing renders. */
    if (refs && !refs.anchors.has(id)) {
      if (!q && refs.anchors.has('ref' + n)) id = 'ref' + n;
      else refs.missing.push(m + ' -> #' + id);
    }
    return '<sup class="fn"><a href="#' + id + '">' + n + '</a></sup>';
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
    if (def) { cur = { n: def[1], apa: [def[2]], quotes: [], note: null }; refs.push(cur); continue; }
    if (!cur) continue;
    const line = raw.trim();
    if (!line) continue;
    if (line.startsWith('>')) {
      cur.quotes.push(line.replace(/^>\s?/, ''));
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

function renderRefs(refs, reg) {
  const items = refs.map((r) => {
    let html = '  <li id="ref' + r.n + '">\n    <span class="apa">' +
      autolink(inline(r.apa.join(' '), reg)) + '</span>';
    if (r.note) html += '\n    <span class="apa-note">' + inline(r.note, reg) + '</span>';
    r.quotes.forEach((q, i) => {
      const parts = q.split(/\s+--\s+/);
      const qref = parts.length > 1 ? parts.pop() : null;
      html += '\n    <blockquote class="pull" id="ref' + r.n + '-q' + (i + 1) + '">' +
        inline(parts.join(' -- '), reg) +
        (qref ? '<span class="qref">' + inline(qref, reg) + '</span>' : '') + '</blockquote>';
    });
    return html + '\n  </li>';
  });
  return '<ol class="reflist">\n' + items.join('\n') + '\n</ol>';
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

  const h = /^(#{3,6})\s+(.*)$/.exec(t);
  if (h) {
    const lvl = Math.min(h[1].length + 1, 6);
    return '<h' + lvl + '>' + inline(h[2], refs) + '</h' + lvl + '>';
  }

  if (/^(---|\*\*\*)$/.test(t)) return '<hr>';

  if (lines.length > 1 && first.includes('|') && isDivider(lines[1])) return renderTable(lines, refs);

  if (/^\[\^\d+\]:/.test(t)) return renderRefs(parseRefs(lines), refs);

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
    const cls = ctx.sec === 'provenance' ? ' class="provblock"' : '';
    return '<dl' + cls + '>\n' + rows.map((r) =>
      '  <dt>' + inline(r.dt, refs) + '</dt>\n  <dd>' + inline(r.dd.join(' '), refs) + '</dd>').join('\n') + '\n</dl>';
  }

  if (ITEM.test(first)) return renderList(lines, refs);

  return '<p>' + inline(lines.map((l) => l.trim()).join(' '), refs) + '</p>';
}

/* A definition list is usually written with a blank line between terms, which
   the block splitter reads as separate lists. Rejoin them so the provenance
   block comes out as one <dl> rather than four. */
const renderBody = (lines, ctx) => blocks(lines).map((b) => renderBlock(b, ctx)).join('\n\n')
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

/* One pass down the file, cutting it at part (#) and section (##) headings.
   A heading inside a fence or a ::: container is content, not structure. */
function outline(body) {
  const parts = [{ title: null, lede: [], sections: [] }];
  let fence = null, depth = 0, sink = parts[0].lede;
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
      }
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
      '  </div>\n  <div class="q-body">\n' + body + '\n  </div>\n</section>';
  }
  return '<section class="brief-section" id="' + sec.id + '" data-sec="' + data + '">\n' +
    '  <div class="sec-head">\n' +
    '    <label class="tick"><input type="checkbox" aria-label="Mark section read"></label>\n' +
    '    <h3>' + inline(sec.title, ctx.refs) + '</h3>\n' +
    '  </div>\n  <div class="sec-body">\n' + body + '\n  </div>\n</section>';
}

/* Footnote targets are collected before anything renders, so a marker pointing
   at a quote that does not exist is a build error rather than a dead link the
   reader finds. */
function collectAnchors(parts) {
  const anchors = new Set();
  for (const p of parts) {
    for (const s of p.sections) {
      for (const b of blocks(s.lines)) {
        if (!/^\[\^\d+\]:/.test(b[0].trim())) continue;
        for (const r of parseRefs(b)) {
          anchors.add('ref' + r.n);
          r.quotes.forEach((_, i) => anchors.add('ref' + r.n + '-q' + (i + 1)));
        }
      }
    }
  }
  return anchors;
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

export function render(source, opts = {}) {
  /* Line endings and a BOM are editor artefacts, never content. Normalising
     here is what makes the same source render the same page on any machine. */
  const src = source.replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n');
  const [meta, body] = frontMatter(src);
  const parts = outline(body);
  const refs = { anchors: collectAnchors(parts), missing: [] };
  const ctx = { refs };

  const out = ['<header class="brief-title">\n  <p class="eyebrow">' + inline(meta.eyebrow || '', refs) +
    '</p>\n  <h1>' + inline(meta.title || 'Brief', refs) + '</h1>\n  <p class="sub">' +
    inline(meta.sub || '', refs) + '</p>\n</header>'];

  const named = parts.filter((p) => p.title);
  for (const part of parts) {
    if (part.title) {
      out.push('<h2 class="part" id="' + part.id + '"><span class="pnum">Part ' +
        PARTWORDS[named.indexOf(part) + 1] + '</span> ' + inline(part.title, refs) + '</h2>');
      const lede = part.lede.filter((l) => l.trim());
      if (lede.length) out.push('<p class="partlede">' + inline(lede.map((l) => l.trim()).join(' '), refs) + '</p>');
    }
    for (const sec of part.sections) {
      if (sec.id === 's-toc' && !sec.lines.some((l) => l.trim())) sec.lines = renderToc(parts).split('\n');
      out.push(renderSection(sec, ctx));
    }
  }

  if (refs.missing.length) {
    throw new Error('footnote markers with no target: ' + [...new Set(refs.missing)].join(', '));
  }

  const dark = darkModeFaults(out.join('\n'));
  if (dark.length) throw new Error(dark.join('\n'));

  const template = inlineRuntime(opts.template || readFileSync(join(HERE, 'brief-template.html'), 'utf8'), opts);
  const addressed = meta.addressed ? ' data-addressed="' + escAttr(meta.addressed) + '"' : '';
  return template
    .replace(/\{\{TITLE\}\}/g, escAttr(meta['head-title'] || meta.title || 'Brief'))
    .replace(/<body data-brief-id="\{\{BRIEF_ID\}\}">/, '<body data-brief-id="' +
      escAttr(meta['brief-id'] || slug(meta.title || 'brief')) + '"' + addressed + '>')
    .replace(/<main>[\s\S]*<\/main>/, '<main>\n\n' + out.join('\n\n') + '\n\n</main>');
}

const invoked = process.argv[1] && import.meta.url === new URL('file://' + process.argv[1]).href;
if (invoked) {
  const [, , input, output] = process.argv;
  if (!input) { console.error('usage: build-brief.mjs <source.md> [out.html]'); process.exit(2); }
  const dest = output || join(dirname(input), basename(input).replace(/\.md$/, '') + '.html');
  writeFileSync(dest, render(readFileSync(input, 'utf8')));
  console.log('wrote ' + dest);
}
