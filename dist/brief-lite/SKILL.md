---
name: brief-lite
description: Decisions stall when questions are buried in long documents and answers come back scattered across email. This skill gives readers one page to answer in, and gives you all their answers in one paste. Builds one self-contained HTML brief that readers answer in their browser. It opens with the answer, sets out the sections in pyramid order, asks numbered questions with answer boxes, lets readers comment on selected text, footnotes its sources, and exports the responses with Copy responses or Download responses. Use when someone says "make a brief", "build a brief", "I need decisions from my team", "put these questions to my manager", "get sign-off on this", "a document people can answer", or needs readers to answer questions about a proposal, plan or decision.
license: Apache-2.0
metadata:
  author: "Peak State Global"
  source: "https://github.com/peakstate-global/peakstate-skills"
  version: "0.1"
  profile: "artefact"
  output: "file"
---

This skill builds one self-contained HTML brief with the answer first, numbered questions with answer boxes, simple comments, footnoted references and exportable responses.

## Adapt to your host

Hosts differ, and the same host differs by plan and by organisation. Before you
make the output, check what you can do here.

1. List the tools you can call right now, such as code execution, file creation,
   image generation or a live preview (an artifact or a canvas).
2. Take the first rung of the ladder below that your tools support. Trust your
   own tool list over any host name or table.
3. Tell the user in one line which rung you took and why. For example: "There is
   no file tool here, so the SVG is in a code block for you to save."
4. If the user names a format, use that format instead of the ladder.

### Ladder

This skill uses the file ladder: an artifact or live preview of the HTML, then a downloadable `.html` file, then one code block the user saves as a `.html` file. Where a preview cannot run scripts, also give the file, because the answer boxes need the script.

## Steps

If the input may be sensitive, say once: "Use only a tool your organisation has approved for this information."

1. **Intake.** Ask at most four questions, one at a time, and only the ones the opening message does not already answer: what you need from the readers (a decision, sign-off or input), who reads it, the facts and sources to include, and the questions you want answered. If the user says "just build it", build now with what you have. Show every missing fact as "[to confirm]". Never invent an owner, a date, an amount or a source.
2. **Write the answer first.** Write one sentence that says what you recommend or what the readers must decide. Then write the sections in pyramid order: each heading states its point, and the text under it supports that point (S1, see `references/writing.md`).
3. **Write the questions.** Number them Q1, Q2 and so on, and give each a stable id such as `q-default-roster` that no rebuild changes. Each leads with the plain ask, then one line: "My assumption: ... If wrong: ...". Ask only what the reader can answer.
4. **Footnote the facts.** Every fact from a source gets a numbered footnote that links to a numbered entry in References. Only list sources the user gave you or that you opened in this session. Label a fact from memory "[RECALLED]", with no footnote.
5. **Build the file.** Copy the block in `references/template.md`, fill the placeholders, and repeat the section, question and reference blocks as needed. Insert user text as text: escape `&`, `<`, `>` and `"`. Copy the style and script byte for byte. Name the file after the brief id, such as `rostering-options-2026-09-29.html`.
6. **Deliver.** Give the file by the rung you took. Tell the user how to open it, that answers and comments save in that browser, and how responses come back: Copy responses, or Download responses when copy fails or the storage banner shows.

## The take-away

One `.html` file with, in order: the title, the one-sentence answer, the sections in pyramid order, the numbered questions with answer boxes, and the References. It has a Comments panel, a progress count, and Copy responses and Download responses buttons. It makes no external requests and works from a local file. The template is in `references/template.md`. When responses come back, read them with the field table in `references/writing.md`.

## Next

Your next three moves. Each has an owner, a first action this week and an observable result. The owner is "you" or a role the user named. Never invent a person, a date or a source.

1. You open the file and check every "[to confirm]" and "[RECALLED]" item before it goes out.
2. You send the file to the readers with the date you need their answers by.
3. You paste the responses back here, and the brief is revised with the same brief id.

If the brief needs a deeper check of its claims, the user may also like a skill for grounding claims, if they have one. Do not run it for them.

## Self-check before you deliver

- The file opens with the title and the one-sentence answer, and every section heading states a point.
- Every question is numbered, has its own answer box, and states an assumption first.
- No owner, date, amount, source, quote or URL was invented; gaps show as "[to confirm]" and memory facts as "[RECALLED]".
- Every footnote links to a References entry, and every entry links back.
- The script and style are copied byte for byte, and user text is escaped.
- The file has no `<link>`, remote font, external image or `on...=` attribute.
- The body carries a `data-brief-id`. A rebuilt brief keeps that id, every question and section id, and the file path.
- You told the user which ladder rung you took and how responses come back.

## Read this when

| File | When |
|---|---|
| `references/template.md` | Building the HTML file |
| `references/writing.md` | Writing the answer, sections, questions and references, or reading responses that come back |

Sources for the libraries in this skill: SOURCES.md. Open it only if the user asks where an entry comes from.

## Reference: template.md

# brief-lite template

Copy the block below into one `.html` file. Replace every `{{...}}` placeholder. Repeat the
section, question and reference blocks as many times as you need, and keep their class
names and `data-` attributes. Copy the `<style>` and `<script>` parts byte for byte.

Rules for filling it in:

- Insert user text as text. Escape `&` as `&amp;`, `<` as `&lt;`, `>` as `&gt;` and `"` as
  `&quot;` in anything you paste in (S4).
- `{{BRIEF_ID}}` is a kebab-case slug plus the build date, such as
  `rostering-options-2026-09-29`. Keep the same id and the same file path if you rebuild the
  brief, so saved answers come back.
- `{{QUESTION_ID}}` is `q-` plus a short slug of what the question asks, such as
  `q-default-roster`, and `{{SECTION_ID}}` is `s-` plus a slug of its point, such as
  `s-friday-cover`. Saved answers and comments are stored against these ids. Write each id
  once and keep it on every rebuild, even when the question moves or its Q number changes.
  Never renumber an id, and never give a new question an old question's id.
- Footnote `n` links to `#ref-n`, and reference `n` links back to `#fn-n`. Use `fn-n-2` for a
  second citation of the same reference.
- Do not add a `<link>`, a remote font, an image URL or any other external request. Do not
  add `on...=` attributes.

The script keeps answers and comments in `localStorage` inside `try`/`catch` (S2). If the
browser refuses storage, a banner tells the reader to use Download responses. Copy uses the
clipboard and says so when it fails (S3). The exported JSON matches the fields that
peakstate-brief exports (S5), so the same paste-back flow reads both. Light and dark colours follow the reader's system
setting (S8).

```html
<!doctype html>
<html lang="en-AU">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{{TITLE}}</title>
<style>
:root { color-scheme: light dark; --bg: #ffffff; --fg: #1d2330; --muted: #5a6475; --line: #d8dde6; --accent: #1f5fbf; --panel: #f4f6fa; --mark: #fff2a8; --warn: #8a1c1c; --warnbg: #fde8e8; }
@media (prefers-color-scheme: dark) {
  :root { --bg: #14171d; --fg: #e6e9ef; --muted: #a3acbb; --line: #333a46; --accent: #7fb0ff; --panel: #1d222b; --mark: #6b5d12; --warn: #ffd2d2; --warnbg: #4a1717; }
}
* { box-sizing: border-box; }
body { margin: 0; background: var(--bg); color: var(--fg); font: 17px/1.6 system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; }
.wrap { max-width: 72rem; margin: 0 auto; padding: 1.5rem; display: grid; gap: 2rem; }
@media (min-width: 64rem) { .wrap { grid-template-columns: minmax(0, 1fr) 20rem; } }
header { position: sticky; top: 0; z-index: 2; background: var(--bg); border-bottom: 1px solid var(--line); padding: .75rem 1.5rem; }
header h1 { margin: 0; font-size: 1.35rem; line-height: 1.3; }
.bar { display: flex; flex-wrap: wrap; gap: .5rem; align-items: center; margin-top: .5rem; }
#bl-progress, #bl-status { color: var(--muted); font-size: .9rem; }
button { font: inherit; font-size: .9rem; padding: .35rem .8rem; border: 1px solid var(--accent); border-radius: 6px; background: var(--panel); color: var(--fg); cursor: pointer; }
button:hover, button:focus-visible { background: var(--accent); color: var(--bg); }
.banner { margin: 0; padding: .6rem 1.5rem; background: var(--warnbg); color: var(--warn); font-weight: 600; }
.answer { font-size: 1.2rem; font-weight: 600; border-left: 4px solid var(--accent); padding: .5rem 1rem; background: var(--panel); }
section { margin-bottom: 2rem; }
h2 { font-size: 1.15rem; line-height: 1.35; }
.q { border: 1px solid var(--line); border-radius: 8px; padding: 1rem 1.25rem; }
.q h2 { margin-top: 0; }
.assume { color: var(--muted); }
textarea { width: 100%; min-height: 6rem; font: inherit; padding: .5rem; border: 1px solid var(--line); border-radius: 6px; background: var(--bg); color: var(--fg); }
mark.cmt { background: var(--mark); color: inherit; }
sup a { text-decoration: none; }
a { color: var(--accent); }
aside h2 { margin-top: 0; }
#bl-clist { padding-left: 1.2rem; }
#bl-clist li { margin-bottom: 1rem; }
#bl-clist blockquote { margin: 0; color: var(--muted); font-style: italic; }
.hint { color: var(--muted); font-size: .9rem; }
#bl-pop { position: fixed; z-index: 3; width: 20rem; padding: .75rem; background: var(--panel); border: 1px solid var(--line); border-radius: 8px; box-shadow: 0 4px 16px rgba(0,0,0,.2); }
#bl-pop textarea { min-height: 4rem; margin-bottom: .5rem; }
.sr { position: absolute; left: -9999px; }
@media print { header { position: static; } #bl-pop, .bar button { display: none; } }
</style>
</head>
<body data-brief-id="{{BRIEF_ID}}">
<p id="bl-banner" class="banner" role="alert" hidden>This browser will not keep your answers in this file. Use Download responses before you close it.</p>
<header>
  <h1>{{TITLE}}</h1>
  <div class="bar">
    <span id="bl-progress" aria-live="polite"></span>
    <button type="button" id="bl-copy">Copy responses</button>
    <button type="button" id="bl-download">Download responses</button>
    <span id="bl-status" role="status"></span>
  </div>
</header>
<div class="wrap">
<main id="bl-doc">
  <p class="answer">{{ONE_SENTENCE_ANSWER}}</p>

  <!-- Repeat per section, in pyramid order. The heading states the point. -->
  <section class="sec" data-sec="{{SECTION_ID}}">
    <h2>{{SECTION_POINT}}</h2>
    <p>{{SUPPORTING_TEXT}}<sup><a href="#ref-1" id="fn-1">1</a></sup></p>
  </section>

  <!-- Repeat per question. -->
  <section class="q" data-q="{{QUESTION_ID}}">
    <h2>Q1. {{QUESTION}}</h2>
    <p class="assume">My assumption: {{ASSUMPTION}} If wrong: {{WHAT_CHANGES}}</p>
    <label class="sr" for="a-{{QUESTION_ID}}">Your answer</label>
    <textarea id="a-{{QUESTION_ID}}" data-answer="{{QUESTION_ID}}"></textarea>
  </section>

  <section class="refs" id="references">
    <h2>References</h2>
    <ol>
      <li id="ref-1">{{APA_7_REFERENCE}} <a href="#fn-1" aria-label="Back to footnote 1">Back</a></li>
    </ol>
  </section>
</main>
<aside>
  <h2>Comments</h2>
  <p class="hint">Select any text in the brief, then type a comment in the box that appears.</p>
  <ol id="bl-clist"></ol>
</aside>
</div>
<div id="bl-pop" role="dialog" aria-label="Add a comment" hidden>
  <textarea id="bl-ctext" aria-label="Your comment"></textarea>
  <button type="button" id="bl-csave">Save comment</button>
  <button type="button" id="bl-ccancel">Cancel</button>
</div>
<script>
(function () {
  'use strict';
  var BRIEF = document.body.dataset.briefId || location.pathname;
  var KEY = 'brief-lite:' + BRIEF;
  var state = { answers: {}, comments: [] };
  var storageOk = true;
  var pending = null;
  var doc = byId('bl-doc');
  var qs = Array.prototype.slice.call(document.querySelectorAll('section.q[data-q]'));

  function byId(id) { return document.getElementById(id); }
  function storageFailed() { storageOk = false; byId('bl-banner').hidden = false; }
  function load() {
    try {
      var store = window.localStorage;
      var raw = store.getItem(KEY);
      if (raw) {
        var o = JSON.parse(raw) || {};
        state.answers = o.answers || {};
        state.comments = Array.isArray(o.comments) ? o.comments : [];
      }
      store.setItem(KEY + ':probe', '1');
      store.removeItem(KEY + ':probe');
    } catch (e) { storageFailed(); }
  }
  function save() {
    if (!storageOk) return;
    try { window.localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { storageFailed(); }
  }
  function say(msg) { byId('bl-status').textContent = msg; }

  /* Answers */
  function answerOf(id) { return state.answers[id] || ''; }
  function progress() {
    var n = qs.filter(function (s) { return answerOf(s.dataset.q).trim(); }).length;
    byId('bl-progress').textContent = n + ' of ' + qs.length + ' questions answered';
  }
  function wireAnswers() {
    qs.forEach(function (sec) {
      var ta = sec.querySelector('textarea[data-answer]');
      if (!ta) return;
      ta.value = answerOf(sec.dataset.q);
      ta.addEventListener('input', function () {
        state.answers[sec.dataset.q] = ta.value; save(); progress();
      });
    });
  }

  /* Comments */
  function nearest(node) {
    var el = node.nodeType === 1 ? node : node.parentElement;
    var s = el && el.closest('section.q, section.sec');
    return s ? (s.dataset.q || s.dataset.sec) : null;
  }
  function scopeOf(near) {
    var s = near && doc.querySelector('[data-q="' + CSS.escape(near) + '"], [data-sec="' + CSS.escape(near) + '"]');
    return s || doc;
  }
  function marked(cid) { return !!document.querySelector('mark[data-cid="' + CSS.escape(cid) + '"]'); }
  /* Finds the quote in its saved section, at the occurrence nearest its saved offset, and
     marks it one text node at a time, so a quote that crosses elements still highlights. */
  function anchor(c) {
    if (!c.text || marked(c.id)) return;
    var scope = scopeOf(c.near), full = scope.textContent, want = c.at || 0, at = -1, i = -1;
    while ((i = full.indexOf(c.text, i + 1)) >= 0) {
      if (at < 0 || Math.abs(i - want) < Math.abs(at - want)) at = i;
    }
    if (at < 0) return;
    var end = at + c.text.length, pos = 0, parts = [], n;
    var walk = document.createTreeWalker(scope, NodeFilter.SHOW_TEXT);
    while ((n = walk.nextNode()) && pos < end) {
      var s = Math.max(at - pos, 0), e = Math.min(end - pos, n.nodeValue.length);
      if (s < e && n.nodeValue.slice(s, e).trim() && !n.parentElement.closest('textarea')) parts.push([n, s, e]);
      pos += n.nodeValue.length;
    }
    parts.forEach(function (p) {
      var r = document.createRange(), m = document.createElement('mark');
      r.setStart(p[0], p[1]); r.setEnd(p[0], p[2]);
      m.className = 'cmt'; m.dataset.cid = c.id;
      r.surroundContents(m);
    });
  }
  function unwrap(cid) {
    document.querySelectorAll('mark[data-cid="' + CSS.escape(cid) + '"]').forEach(function (m) {
      while (m.firstChild) m.parentNode.insertBefore(m.firstChild, m);
      m.remove();
    });
  }
  function renderComments() {
    var list = byId('bl-clist');
    list.textContent = '';
    state.comments.forEach(function (c) {
      var li = document.createElement('li');
      var q = document.createElement('blockquote');
      q.textContent = c.text;
      var p = document.createElement('p');
      p.textContent = c.comment;
      if (!marked(c.id)) q.append(' (not highlighted: this text is no longer in the brief)');
      var del = document.createElement('button');
      del.type = 'button'; del.textContent = 'Delete comment';
      del.addEventListener('click', function () {
        unwrap(c.id);
        state.comments = state.comments.filter(function (x) { return x.id !== c.id; });
        save(); renderComments();
      });
      li.append(q, p, del);
      list.appendChild(li);
    });
  }
  function closePop() { byId('bl-pop').hidden = true; byId('bl-ctext').value = ''; pending = null; }
  function onSelect() {
    var a = document.activeElement;
    if (a && a.tagName === 'TEXTAREA') return;
    var sel = window.getSelection();
    if (!sel || sel.isCollapsed || !doc.contains(sel.anchorNode)) return;
    var range = sel.getRangeAt(0), raw = range.toString(), text = raw.trim();
    if (!text) return;
    var near = nearest(range.commonAncestorContainer), pre = document.createRange();
    pre.setStart(scopeOf(near), 0); pre.setEnd(range.startContainer, range.startOffset);
    pending = { text: text, near: near, at: pre.toString().length + raw.search(/\S/) };
    var box = range.getBoundingClientRect(), pop = byId('bl-pop');
    pop.style.top = Math.min(box.bottom + 8, window.innerHeight - 160) + 'px';
    pop.style.left = Math.max(8, Math.min(box.left, window.innerWidth - 340)) + 'px';
    pop.hidden = false;
  }
  function saveComment() {
    var note = byId('bl-ctext').value.trim();
    if (!pending || !note) return;
    var c = { id: 'c' + Date.now().toString(36), text: pending.text, near: pending.near,
              at: pending.at, comment: note };
    window.getSelection().removeAllRanges();
    anchor(c);
    state.comments.push(c);
    save(); renderComments(); closePop();
  }

  /* Responses, in the same shape as peakstate-brief */
  function payload() {
    return JSON.stringify({
      brief: BRIEF, title: document.title, exported: new Date().toISOString(),
      answers: qs.map(function (s) {
        var h = s.querySelector('h2'), a = answerOf(s.dataset.q);
        return { id: s.dataset.q, question: h ? h.textContent.replace(/\s+/g, ' ').trim() : s.dataset.q,
                 resolved: !!a.trim(), ticked: false, answer: a };
      }),
      comments: state.comments.map(function (c) {
        return { selected_text: c.text, near_question: c.near || null, comment: c.comment,
                 highlight: 'yellow', anchored: marked(c.id) };
      }),
      notes: [], edits: [], drafts: []
    }, null, 2);
  }
  function copyFailed() { say('Copy did not work in this browser. Use Download responses instead.'); }
  function copy() {
    var txt = payload();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(txt).then(function () { say('Responses copied. Paste them back to the author.'); }, copyFailed);
    } else { copyFailed(); }
  }
  function download() {
    var slug = BRIEF.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60) || 'brief';
    var url = URL.createObjectURL(new Blob([payload()], { type: 'application/json' }));
    var a = document.createElement('a');
    a.href = url; a.download = slug + '-responses-' + new Date().toISOString().slice(0, 10) + '.json';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
    say('Responses downloaded. Send the file to the author.');
  }

  load();
  wireAnswers();
  progress();
  state.comments.forEach(anchor);
  renderComments();
  doc.addEventListener('mouseup', function () { setTimeout(onSelect, 0); });
  doc.addEventListener('keyup', function (e) { if (e.shiftKey) onSelect(); });
  byId('bl-csave').addEventListener('click', saveComment);
  byId('bl-ccancel').addEventListener('click', closePop);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closePop(); });
  byId('bl-copy').addEventListener('click', copy);
  byId('bl-download').addEventListener('click', download);
})();
</script>
</body>
</html>
```

## Reference: writing.md

# Writing the brief

## Pyramid order (S1)

- The one-sentence answer comes first: what you recommend, or what you need the readers to
  decide. A reader who stops after one line still knows the point.
- Each section heading states its point as a sentence, such as "The four-day roster cut
  overtime", not a topic label such as "Overtime".
- Under each heading, give the support for that point and nothing else. Put the sections in
  the order a reader needs them to answer the questions.
- Situation, complication, question, answer is a good order for the opening paragraph when
  the reader needs context first.

## Plain English (S6)

- One idea per sentence. Short sentences, active voice, present tense.
- Use the reader's words. Define a term the first time you use it.
- Australian spelling.

## Questions

- Number them Q1, Q2 and so on, in the order the reader should answer them. Two to eight
  questions is a good range. Put the question that blocks the most first.
- The Q number is only a label. Each question also has an id, `q-` plus a short slug such as
  `q-default-roster`, and saved answers are stored against it. Keep the id on every rebuild,
  even when the question moves. Never renumber ids.
- Lead with the plain ask. Then one line that starts "My assumption:" and ends with "If
  wrong:" and what would change. The reader can answer "yes" to the assumption quickly.
- Ask only what the reader can answer. Never ask a reader to look up a fact you could find.
- Never assign an owner, a date or an amount the user did not give. Ask for it as a
  question, or show it as "[to confirm]".

## Facts, footnotes and references (S7)

- Every fact from a source gets a numbered footnote. The footnote links to a numbered entry
  in the References section, and the entry links back.
- Write each reference in APA 7 when you have author, date, title and where it came from.
  When a field is not known, write a descriptive entry and state which field is missing.
- Only list sources the user gave you or that you opened in this session. Never invent a
  source, a quote, a page, a URL or a date.
- A fact you state from memory is labelled `[RECALLED]` in the text, has no footnote, and is
  not in References. Suggest in your reply that the user checks it before the brief goes out.

## Comments

Readers select text and type a note. Comments are single notes: no threads, replies or
follow-ups. The script shows comment text with `textContent`, never as markup (S4).

## When responses come back

The reader clicks Copy responses and pastes the JSON to you, or sends the downloaded
`<brief-id>-responses-<date>.json` file. The shape (S5):

| Field | What it holds |
|---|---|
| `brief` | The brief id from `data-brief-id` |
| `title`, `exported` | The page title and the export time |
| `answers[]` | `id` (such as `q-default-roster`), `question` (its heading text), `resolved` (true when answered), `ticked` (always false here), `answer` |
| `comments[]` | `selected_text`, `near_question` (the `q` or `s` id it sits in, or null), `comment`, `highlight` (always `"yellow"`), `anchored` (true when the text is still marked on the page) |
| `notes`, `edits`, `drafts` | Always empty arrays, kept so tools that read the fuller brief format read this one too |

Read the answers by id, act on each comment where it sits, and say what changed. Rebuild
with the same brief id, the same question ids and the same file path, and overwrite the old
file. Some browsers keep a local file's saved answers against its exact path, so a rebuild
saved under a new name opens empty. The responses you already have are the record: if the
reader needs to see an earlier answer again, quote it in the rebuilt brief.

## Sources

# Sources

All entries retrieved 29 September 2026.

[S1] Minto, B. (n.d.). *The Minto Pyramid Principle*. Barbara Minto. Retrieved September 29, 2026, from https://www.barbaraminto.com/

[S2] WHATWG. (2026). Web storage. In *HTML Living Standard*. Retrieved September 29, 2026, from https://html.spec.whatwg.org/multipage/webstorage.html

[S3] MDN contributors. (2026). *Clipboard: writeText() method*. MDN Web Docs. Retrieved September 29, 2026, from https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText

[S4] OWASP Foundation. (2026). *Cross site scripting prevention cheat sheet*. OWASP Cheat Sheet Series. Retrieved September 29, 2026, from https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html

[S5] Peak State Global. (2026). *peakstate-brief* [Computer software]. GitHub. Retrieved September 29, 2026, from https://github.com/peakstate-global/peakstate-skills/tree/main/skills/peakstate-brief

[S6] Plain Language Action and Information Network. (n.d.). *Federal plain language guidelines*. Retrieved September 29, 2026, from https://www.plainlanguage.gov/guidelines/

[S7] American Psychological Association. (n.d.). *Reference examples*. APA Style. Retrieved September 29, 2026, from https://apastyle.apa.org/style-grammar-guidelines/references/examples

[S8] MDN contributors. (2026). *prefers-color-scheme*. MDN Web Docs. Retrieved September 29, 2026, from https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme
