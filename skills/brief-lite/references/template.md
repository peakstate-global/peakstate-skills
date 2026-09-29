# brief-lite template

Copy the block below into one `.html` file. Replace every `{{...}}` placeholder. Repeat the
section, question and reference blocks as many times as you need, and keep their class
names and `data-` attributes. Copy the `<style>` and `<script>` parts byte for byte.

Rules for filling it in:

- Insert user text as text. Escape `&` as `&amp;`, `<` as `&lt;`, `>` as `&gt;` and `"` as
  `&quot;` in anything you paste in (S4).
- `{{BRIEF_ID}}` is a kebab-case slug plus the build date, such as
  `rostering-options-2026-09-29`. Keep the same id if you rebuild the brief, so saved answers
  come back.
- Question ids are `q1`, `q2` and so on, in page order. Section ids are `s1`, `s2`.
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
  <section class="sec" data-sec="s1">
    <h2>{{SECTION_POINT}}</h2>
    <p>{{SUPPORTING_TEXT}}<sup><a href="#ref-1" id="fn-1">1</a></sup></p>
  </section>

  <!-- Repeat per question. -->
  <section class="q" data-q="q1">
    <h2>Q1. {{QUESTION}}</h2>
    <p class="assume">My assumption: {{ASSUMPTION}} If wrong: {{WHAT_CHANGES}}</p>
    <label class="sr" for="a-q1">Your answer to question 1</label>
    <textarea id="a-q1" data-answer="q1"></textarea>
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
  function wrap(range, cid) {
    try {
      var m = document.createElement('mark');
      m.className = 'cmt'; m.dataset.cid = cid;
      range.surroundContents(m);
      return true;
    } catch (e) { return false; }
  }
  function anchor(c) {
    if (document.querySelector('mark[data-cid="' + c.id + '"]')) return;
    var walk = document.createTreeWalker(doc, NodeFilter.SHOW_TEXT);
    var node;
    while ((node = walk.nextNode())) {
      if (node.parentElement.closest('textarea, mark')) continue;
      var at = node.nodeValue.indexOf(c.text);
      if (at < 0) continue;
      var r = document.createRange();
      r.setStart(node, at); r.setEnd(node, at + c.text.length);
      wrap(r, c.id);
      return;
    }
  }
  function unwrap(cid) {
    var m = document.querySelector('mark[data-cid="' + cid + '"]');
    if (!m) return;
    while (m.firstChild) m.parentNode.insertBefore(m.firstChild, m);
    m.remove();
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
    var text = sel && !sel.isCollapsed ? sel.toString().trim() : '';
    if (!text || !doc.contains(sel.anchorNode)) return;
    var range = sel.getRangeAt(0);
    pending = { range: range.cloneRange(), text: text };
    var box = range.getBoundingClientRect(), pop = byId('bl-pop');
    pop.style.top = Math.min(box.bottom + 8, window.innerHeight - 160) + 'px';
    pop.style.left = Math.max(8, Math.min(box.left, window.innerWidth - 340)) + 'px';
    pop.hidden = false;
  }
  function saveComment() {
    var note = byId('bl-ctext').value.trim();
    if (!pending || !note) return;
    var c = { id: 'c' + Date.now().toString(36), text: pending.text,
              near: nearest(pending.range.startContainer), comment: note };
    wrap(pending.range, c.id);
    state.comments.push(c);
    save(); renderComments(); closePop();
    window.getSelection().removeAllRanges();
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
                 highlight: 'yellow', anchored: !!document.querySelector('mark[data-cid="' + c.id + '"]') };
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
