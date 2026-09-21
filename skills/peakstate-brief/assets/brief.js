(function () {
  'use strict';
  /* ── where this document's state lives ──────────────────────────────────
     Two homes, one seam. Normally it is this browser's localStorage. Published,
     the brief is served inside a sandboxed frame with no allow-same-origin, so
     its origin is opaque and localStorage does not merely come back empty --
     reading the property THROWS. The page that frames it holds the storage
     instead: it hands the whole store over on `brief-sync-init` and takes every
     change back as `brief-store-set`. Everything else in this file goes through
     get() and put() and never learns which of the two it is talking to.

     HOSTED is the gate, and it is the same gate the sync uses: a published brief
     inside a frame. An unpublished brief, a file:// copy, and a published brief
     opened at the top level are all unaffected and behave exactly as before. */
  var BRIEF = '', KEY = '';
  var PUB = '', FRAMED = false, HOSTED = false;
  var host = null;        // the origin the host page spoke from; pinned on the first init
  var hostStore = null;   // the store the host handed over; null until it does

  /* Reading is a seam too: in a frame with an opaque origin the getItem call
     itself throws before it can return null. */
  function get(k) {
    if (HOSTED) return hostStore ? hostStore[k] : null;
    try { return localStorage.getItem(k); } catch (e) { return null; }
  }
  /* ── writing to localStorage can THROW, not just fail: Safari treats a file://
     page as an opaque origin, private mode and a full quota do the same. A bare
     setItem there breaks every tick and every keystroke, so all writes go through
     put() and the reader is told once, visibly, that nothing is being kept. ── */
  var storeOK = true;
  /* The host refuses a store whose JSON is over this, and `brief-store-set` is
     fire-and-forget, so a refusal comes back as silence. Measuring it here is what
     turns that silence into the same warning the unframed path gets from a quota
     throw. Keep in step with MAX_REVIEW_BYTES on the host. */
  var MAX_STORE_BYTES = 256000;
  function put(k, v) {
    if (HOSTED) {
      /* No hostStore means no init ever arrived: there is nowhere to put this and
         no origin to send it to, so it is dropped -- and the reader has already
         been told, once, that nothing is being kept. Sending only on a change
         keeps a fresh load from writing the host a value it just handed over. */
      if (!hostStore || hostStore[k] === v) return !!hostStore;
      /* Built beside the store rather than in it: an over-cap value the host will
         refuse must not be left in memory either, or this device reads back a
         value no reload will ever return. */
      var candidate = {}, ck;
      for (ck in hostStore) candidate[ck] = hostStore[ck];
      candidate[k] = v;
      if (JSON.stringify(candidate).length > MAX_STORE_BYTES) {
        warnNoPersist('This brief has grown past what the page holding it will keep, so your '
          + 'latest ticks, answers and comments are no longer being stored — they will be gone '
          + 'when you reload or close the page. Use "Download responses" before you leave.');
        return false;
      }
      hostStore = candidate;
      window.parent.postMessage({ v: 1, type: 'brief-store-set', data: hostStore }, host);
      return true;
    }
    if (!storeOK) return false;
    try { localStorage.setItem(k, v); return true; }
    catch (e) { storeOK = false; warnNoPersist(); return false; }
  }
  function warnNoPersist(msg) {
    if (document.getElementById('nopersist')) return;
    var n = document.createElement('p');
    n.id = 'nopersist';
    n.setAttribute('role', 'status');
    n.style.cssText = 'font:14px/1.55 system-ui,sans-serif;max-width:62ch;margin:1rem auto;' +
      'padding:.75rem 1rem;border:1px solid #c9821f;border-radius:6px;background:#fdf3e3;color:#5a3c0a';
    n.textContent = msg || 'This browser is not storing anything for this brief, so your ticks and ' +
      'answers will be lost when you reload or close the page. Use "Download responses" before ' +
      'you leave — it does not need storage. Opening the file from a web address instead of a ' +
      'file:// path also fixes it.';
    document.body.insertBefore(n, document.body.firstChild);
  }
  /* The host hands over a store shaped like localStorage itself: keys to strings.
     A host that sends this brief's own blob instead means the same thing, so a
     misreading of the protocol lands as a brief that works rather than as a
     silently empty one. */
  function normaliseStore(o) {
    if (!o || typeof o !== 'object') return {};
    if (o.ticks || o.answers || o.comments) { var one = {}; one[KEY] = JSON.stringify(o); return one; }
    var out = {}, k;
    for (k in o) if (typeof o[k] === 'string') out[k] = o[k];
    return out;
  }
  function init() {
  var isMac = /Mac|iP(hone|ad|od)/.test(navigator.platform || navigator.userAgent);
  var MOD = isMac ? '\u2318' : 'Ctrl-';
  /* Stroke SVGs rather than glyphs: the old \u21F2 / \u2194 pair for width read as
     "resize window", not "narrow column vs full bleed". Rails + arrows say it. */
  function svg(body) {
    return '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" ' +
      'stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + body + '</svg>';
  }
  var ICON = {
    goFull: svg('<path d="M2.5 4v16"/><path d="M21.5 4v16"/><path d="M10 12H5.5"/><path d="m8 9-3 3 3 3"/><path d="M14 12h4.5"/><path d="m16 9 3 3-3 3"/>'),
    goFixed: svg('<path d="M2.5 4v16"/><path d="M21.5 4v16"/><path d="M5.5 12H10"/><path d="m7.5 9 3 3-3 3"/><path d="M18.5 12H14"/><path d="m16.5 9-3 3 3 3"/>'),
    auto: svg('<circle cx="12" cy="12" r="8"/><path d="M12 4a8 8 0 0 0 0 16Z" fill="currentColor" stroke="none"/>'),
    light: svg('<circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2"/><path d="M12 19.5v2"/><path d="M2.5 12h2"/><path d="M19.5 12h2"/><path d="m5.3 5.3 1.4 1.4"/><path d="m17.3 17.3 1.4 1.4"/><path d="m18.7 5.3-1.4 1.4"/><path d="m6.7 17.3-1.4 1.4"/>'),
    dark: svg('<path d="M20.5 14.3A8.6 8.6 0 0 1 9.7 3.5a8.6 8.6 0 1 0 10.8 10.8Z"/>'),
    comment: svg('<path d="M20.5 11.8a7.8 7.8 0 0 1-7.8 7.8H8.4L4 22.3v-4.6a7.8 7.8 0 0 1-.5-2.7v-3.2A7.8 7.8 0 0 1 11.3 4h1.4a7.8 7.8 0 0 1 7.8 7.8Z"/>'),
    copy: svg('<rect x="9" y="9" width="11.5" height="11.5" rx="2.2"/><path d="M15.5 5.6A2.2 2.2 0 0 0 13.4 3.5H5.7a2.2 2.2 0 0 0-2.2 2.2v7.7a2.2 2.2 0 0 0 2.1 2.1"/>'),
    download: svg('<path d="M12 3.5v11"/><path d="m7.5 10.5 4.5 4.5 4.5-4.5"/><path d="M4 20.5h16"/>')
  };
  /* No title-attribute tooltips: they are slow, unstyleable and invisible to
     touch. data-tip renders through CSS, and carries the keyboard shortcut. */
  function tip(el, text, key) {
    if (!el) return;
    el.setAttribute('data-tip', text + (key ? '  \u00b7  ' + key : ''));
    el.setAttribute('aria-label', text + (key ? ' (' + key + ')' : ''));
  }
  /* bootstrap chrome if the page didn't include it */
  if (!document.querySelector('.topbar')) {
    var tb = document.createElement('div');
    tb.className = 'topbar';
    tb.innerHTML = '<h1></h1><a class="progress" id="progress"></a>' +
      '<button class="btn icon" id="cmtBtn" type="button"></button>' +
      '<button class="btn icon" id="widthBtn" type="button"></button>' +
      '<button class="btn icon" id="themeBtn" type="button"></button>' +
      '<span class="btncombo" id="btnCombo">' +
      '<button class="btn icon" id="copyBtn" type="button"></button>' +
      '<button class="btn icon" id="downloadBtn" type="button"></button>' +
      '</span>';
    tb.querySelector('h1').textContent = document.title;
    document.body.insertBefore(tb, document.body.firstChild);
  }
  /* ── shared UI prefs: theme (system/light/dark) + width (fixed/full) ── */
  var ui = { theme: 'auto', width: 'fixed', rate: 1 };
  try { ui = Object.assign(ui, JSON.parse(get('briefUI') || '{}')); } catch {}
  var THEMES = ['auto', 'light', 'dark'];
  var TICON = { auto: '\u25D0', light: '\u2600\uFE0E', dark: '\u263E' };
  var TLABEL = { auto: 'Theme: system', light: 'Theme: light', dark: 'Theme: dark' };
  function applyUI() {
    if (ui.theme === 'auto') document.documentElement.removeAttribute('data-theme');
    else document.documentElement.setAttribute('data-theme', ui.theme);
    document.body.classList.toggle('fullwidth', ui.width === 'full');
    var tbn = document.getElementById('themeBtn'), wbn = document.getElementById('widthBtn');
    if (tbn) {
      tbn.innerHTML = ICON[ui.theme === 'auto' ? 'auto' : ui.theme];
      tip(tbn, TLABEL[ui.theme] + ' \u2014 click to switch');
    }
    if (wbn) {
      /* The icon shows what the click DOES, not the current state: an arrow set
         pointing outward means "widen", inward means "narrow back". */
      wbn.innerHTML = ui.width === 'full' ? ICON.goFixed : ICON.goFull;
      tip(wbn, ui.width === 'full' ? 'Narrow to fixed width' : 'Expand to full width');
    }
    put('briefUI', JSON.stringify(ui));
  }
  var themeBtn = document.getElementById('themeBtn');
  if (themeBtn) themeBtn.addEventListener('click', function () {
    ui.theme = THEMES[(THEMES.indexOf(ui.theme) + 1) % THEMES.length]; applyUI();
  });
  var widthBtn = document.getElementById('widthBtn');
  if (widthBtn) widthBtn.addEventListener('click', function () {
    ui.width = ui.width === 'full' ? 'fixed' : 'full'; applyUI();
  });
  /* ── playback speed, only on briefs that actually carry audio/video ──
     One control for every player on the page: a review deck of 40 clips is
     unlistenable if each one needs its own speed set. */
  var MEDIA_RATES = [1, 1.5, 2];
  function applyRate() {
    var r = MEDIA_RATES.indexOf(ui.rate) < 0 ? 1 : ui.rate;
    ui.rate = r;
    document.querySelectorAll('audio, video').forEach(function (m) { m.playbackRate = r; });
    var b = document.getElementById('rateBtn');
    if (b) {
      b.textContent = r + '×';
      b.setAttribute('aria-label', 'Playback speed ' + r + '× — click to change');
    }
    put('briefUI', JSON.stringify(ui));
  }
  if (document.querySelector('audio, video')) {
    var rb = document.createElement('button');
    rb.className = 'btn icon'; rb.id = 'rateBtn'; rb.type = 'button';
    var anchor = document.getElementById('widthBtn') || document.getElementById('themeBtn');
    if (anchor) anchor.parentNode.insertBefore(rb, anchor);
    rb.addEventListener('click', function () {
      ui.rate = MEDIA_RATES[(MEDIA_RATES.indexOf(ui.rate) + 1) % MEDIA_RATES.length];
      applyRate();
    });
    /* A player created or loaded later must not silently revert to 1x. */
    document.addEventListener('play', function (e) {
      if (e.target.playbackRate !== ui.rate) e.target.playbackRate = ui.rate;
    }, true);
    applyRate();
  }
  applyUI();
  if (!document.getElementById('toast')) {
    var t0 = document.createElement('div');
    t0.id = 'toast'; t0.setAttribute('role', 'status');
    document.body.appendChild(t0);
  }
  if (!document.getElementById('briefMain')) {
    var m = document.querySelector('main');
    if (m) m.id = 'briefMain';
  }
  var state = { ticks: {}, answers: {}, notes: {}, edits: {}, comments: [], drafts: [] };
  if (!state.notes) state.notes = {};
  if (!state.edits) state.edits = {};
  try { state = Object.assign(state, JSON.parse(get(KEY) || '{}')); } catch {}
  if (!Array.isArray(state.drafts)) state.drafts = [];
  if (!Array.isArray(state.comments)) state.comments = [];
  /* The signature of what is currently persisted. save() stamps lastEdit only
     when this changes, because lastEdit is what wins a merge: a load-time
     migration that stamps it makes merely OPENING the brief beat another
     device's newer answer and destroy it. contentSig/shape are declarations in
     this same scope, so they are hoisted and usable here. */
  var lastSig = contentSig(state);
  function persist() { lastSig = contentSig(state); put(KEY, JSON.stringify(state)); renderDirty(); }
  /* Every save stamps a numeric lastEdit, because that number is what decides a
     conflict once the brief is published: Publish merges this blob whole, highest
     lastEdit wins, and a tie resolves to whatever the server already holds. It is
     clamped forward rather than set to the clock, so a device whose clock runs
     behind the one it just merged with does not lose every later edit. */
  function save() {
    if (contentSig(state) !== lastSig) state.lastEdit = Math.max(Date.now(), (state.lastEdit || 0) + 1);
    persist();
    syncSoon();
  }

  /* ── unsent work ────────────────────────────────────────────────────────
     The reader has no way of knowing whether what is in this document has been
     carried back to the chat, and a brief answered but never copied is the one
     failure that wastes the whole exchange. So the copy button carries a dot
     whenever the document holds something the last copy did not.

     Clean is stored as a SIGNATURE of the state, not as a boolean: a boolean
     survives a reload and goes on claiming clean while the reader keeps typing.
     The signature is compared to what is on the page right now, so a reload
     recomputes the same answer and a single keystroke changes it. */
  function sig() {
    return JSON.stringify([state.ticks, state.answers, state.notes, state.edits,
      state.comments.map(function (c) { return [c.cid, c.comment, c.hl, c.unhl, (c.thread || []).length]; }),
      state.drafts.map(function (d) { return [d.key, d.comment]; })]);
  }
  function hasWork() {
    var k, any = false;
    for (k in state.answers) if ((state.answers[k] || '').trim()) any = true;
    for (k in state.notes) if ((state.notes[k] || '').trim()) any = true;
    /* A sent comment is not unsent work: once the file has moved past it, it
       must not keep the red marker lit. */
    if (state.comments.some(function (c) { return !isSent(c); })) any = true;
    if (state.drafts.some(function (d) { return (d.comment || '').trim(); })) any = true;
    Array.prototype.forEach.call(document.querySelectorAll('[data-doc]'), function (doc) {
      var e = state.edits[doc.dataset.doc];
      if (e != null && e !== docSource(doc)) any = true;
    });
    return any;
  }
  var DIRTY_TIP = 'This document holds answers, comments or highlights that have not '
    + 'reached Claude yet. Nothing here travels on its own \u2014 press this to put the '
    + 'whole lot on your clipboard as JSON, then paste it into the chat. Copying does '
    + 'not clear this marker: it stays until Claude sends the brief back having read '
    + 'them, so a copy you never pasted cannot look like work delivered.';
  var COPIED_TIP = 'Copied. The answers, comments and highlights in this document are '
    + 'on your clipboard \u2014 paste them into the chat. The glow stays red until '
    + 'Claude sends the brief back having read them, because a copy you never pasted '
    + 'is not work delivered.';
  /* Copying is recorded against the SIGNATURE it copied, not as a flag: type one
     more character and the green tick is wrong, so it must go back to red. */
  function markCopied() { state.copiedSig = sig(); save(); renderDirty(); }
  function renderDirty() {
    if (!copyBtnEl) return;
    /* The dot hangs off the COMBO, not off the copy button. Both halves send
       the work back, so a marker on one of them says the other does not — and
       the tooltip has to be measured against the pair's box or its right edge
       lands in the middle of the group. */
    var combo = document.getElementById('btnCombo') || copyBtnEl;
    var dirty = hasWork() && sig() !== state.cleanSig;
    var copied = dirty && state.copiedSig === sig();
    var tipText = copied ? COPIED_TIP : DIRTY_TIP;
    var dot = combo.querySelector(':scope > .cdot');
    if (dirty && !dot) {
      dot = document.createElement('span');
      dot.className = 'cdot';
      dot.setAttribute('aria-hidden', 'true');
      combo.appendChild(dot);
    } else if (!dirty && dot) { dot.remove(); dot = null; }
    if (dot) {
      dot.classList.toggle('copied', copied);
      dot.setAttribute('data-tip', tipText);
    }
    copyBtnEl.setAttribute('aria-label',
      'Copy responses JSON (' + MOD + 'C)' + (dirty ? '. ' + tipText : ''));
    var dl = document.getElementById('downloadBtn');
    if (dl) dl.setAttribute('aria-label',
      'Download responses JSON' + (dirty ? '. ' + tipText : ''));
  }
  /* Only a regenerated brief clears the marker, never the reader. Copying is
     not evidence the work arrived: the clipboard can be lost, the paste can be
     forgotten, the tab can be closed. So the file declares what it has taken —
     data-consumed changes when Claude regenerates the brief after reading the
     responses — and seeing a NEW token is what marks the state clean. The
     reader cannot set it, which is the point. */
  function consumeToken() {
    var tok = document.body.dataset.consumed || '';
    if (!tok || tok === state.consumedTok) return;
    state.consumedTok = tok;
    state.cleanSig = sig();
    save();
  }
  function toast(msg) {
    var t = document.getElementById('toast');
    t.textContent = msg; t.classList.add('show');
    clearTimeout(t._h); t._h = setTimeout(function () { t.classList.remove('show'); }, 1800);
  }


  /* ── comments the author has replied to ──
     A regenerated brief can declare which comments it has acted on AND what it
     said back, so the reader reads the answer in place instead of carrying the
     same point over twice. Put on <body>:

         data-replies='[{"match":"first 40 chars of a comment","reply":"what the author said"}]'
         data-addressed="first 40 chars of a comment||another one"

     Matching is on a normalised prefix of the comment text, because the comment
     itself is the only stable identifier: it lives in the reader's
     localStorage, not in the file, so the file cannot carry an id it never saw.
     `data-addressed` is the older form and is the same thing with no words.
     A replied comment keeps its colour, gains a reply marker, and opens as a
     thread the reader can carry on. Nothing is struck out and nothing is
     deleted. */
  function addrKey(x) { return (x || '').replace(/\s+/g, ' ').trim().toLowerCase().slice(0, 40); }
  /* Highlights the file itself carries. A reader's marks live in localStorage,
     which does not follow them to another machine and does not survive being
     sent to somebody else — so once Claude has seen them they are written into
     the document and arrive already painted. The file is the record: deleting a
     baked highlight in the browser holds until the next regeneration, exactly
     as a replied comment behaves. */
  function tombKey(h) {
    return (document.body.dataset.consumed || '') + '\u0000' + h.text + '\u0000' + (h.nth || 0);
  }
  function buryBaked(c) {
    if (!c || !c.baked) return;
    if (!state.bakedGone) state.bakedGone = {};
    state.bakedGone[tombKey(c)] = 1;
  }
  function adoptBaked() {
    var raw = document.body.dataset.highlights;
    if (!raw) return;
    var list;
    try { list = JSON.parse(raw); } catch { return; }
    if (!Array.isArray(list)) return;
    var seen = {};
    state.comments.forEach(function (c) { seen[c.text + '\u0000' + (c.nth || 0)] = true; });
    list.forEach(function (h, i) {
      if (!h || !h.text) return;
      var k = h.text + '\u0000' + (h.nth || 0);
      if (seen[k]) return;
      /* A deletion has to be remembered, or the next load re-adopts the mark
         from the file and the reader cannot get rid of it at all. The tombstone
         is scoped to the token that delivered it, so a NEW regeneration
         legitimately brings it back. */
      if ((state.bakedGone || {})[tombKey(h)]) return;
      seen[k] = true;
      state.comments.push({
        cid: 'baked' + i + '-' + (h.nth || 0), text: h.text, comment: h.comment || '',
        hl: h.hl || 'yellow', near: h.near || null, nth: h.nth || 0,
        baked: true, at: h.at || null
      });
    });
    save();
  }
  adoptBaked();

  /* Both sources land in one list of {key, reply}. `addressed` carries no
     words, so it becomes a reply with an empty string. */
  var REPLIES = (document.body.dataset.addressed || '')
    .split('||').map(addrKey).filter(Boolean)
    .map(function (k) { return { key: k, reply: '' }; });
  (function () {
    var raw = document.body.dataset.replies, list;
    if (!raw) return;
    try { list = JSON.parse(raw); } catch { return; }
    if (!Array.isArray(list)) return;
    list.forEach(function (r) {
      var k = addrKey(r && r.match);
      if (k) REPLIES.push({ key: k, reply: String(r.reply == null ? '' : r.reply) });
    });
  }());
  /* Highlighter colours. The reader assigns the meaning — "this bit is for the
     client" is not a meaning a tool can name — so the chips are named by colour
     and nothing else. Yellow is first and is what every pre-existing comment
     already is, so saved state carries forward untouched. */
  var HLS = ['yellow', 'green', 'blue', 'pink', 'purple'];
  var hlOf = function (c) { return HLS.indexOf(c && c.hl) > -1 ? c.hl : 'yellow'; };

  /* The reply the file holds for this comment, or null if it names none. */
  function replyFor(c) {
    var n = addrKey(c.comment);
    /* An empty key is a prefix of every entry, so a highlight with no words
       matched all of them and came back marked as answered without anybody
       having answered it. A mark with nothing written on it cannot have been
       replied to. */
    if (!n) return null;
    var hits = REPLIES.filter(function (a) {
      return n.indexOf(a.key) === 0 || a.key.indexOf(n) === 0;
    });
    if (!hits.length) return null;
    /* A comment can match a legacy `addressed` entry AND a `replies` entry at
       once, and the wordless one is first in the list. The written answer is the
       one the reader has to see, so an entry that carries words always wins. */
    /* Prefer the most specific key: an exact match, then the longest prefix, so a
       legacy `fix header` entry cannot inherit the written reply meant for
       `fix header and footer`. Words only beat silence at the same key. */
    hits.sort(function (a, b) {
      var ea = a.key === n ? 1 : 0, eb = b.key === n ? 1 : 0;
      if (ea !== eb) return eb - ea;
      if (a.key.length !== b.key.length) return b.key.length - a.key.length;
      return (b.reply ? 1 : 0) - (a.reply ? 1 : 0);
    });
    return hits[0].reply;
  }
  function hasReply(c) { return typeof c.reply === 'string'; }
  /* The file is the record, so a regenerated brief updates the reply it holds.
     A `resolved` flag from an older runtime is a reply with no words. Runs at
     load AND after every remote merge: a comment made on another device arrives
     later than this, and an unmatched one would be shown and exported as though
     the author had never answered it. */
  function applyReplies() {
    state.comments.forEach(function (c) {
      var r = replyFor(c);
      if (r !== null) c.reply = r;
      else if (c.resolved && c.reply === undefined) c.reply = '';
    });
  }
  applyReplies();
  save();

  /* Mark the replied comments once the marks exist. Runs after init rather than
     inside it, because a mark is created when its text is found in the DOM and
     that happens later in this file. The glyph goes on the LAST mark of a cid:
     a selection that crosses an element boundary becomes several marks, and one
     glyph per fragment reads as several replies. */
  function paintReplied() {
    state.comments.forEach(function (c) {
      if (!hasReply(c)) return;
      var marks = document.querySelectorAll('mark.cmt[data-cid="' + c.cid + '"]');
      Array.prototype.forEach.call(marks, function (m, i) {
        m.classList.toggle('replied', i === marks.length - 1);
        m.setAttribute('data-tip', 'Replied — click to read');
      });
    });
  }
  setTimeout(paintReplied, 0);

  /* ── free-standing note fields ──
     Any <textarea data-note="key"> persists under state.notes[key] and is
     exported in the JSON. Unlike the per-question answer boxes these are not
     tied to a section.q, so a brief can put a note box under each audio sample,
     table row, or mockup without inventing a question for every one of them. */
  Array.prototype.forEach.call(document.querySelectorAll('textarea[data-note]'), function (ta) {
    var k = ta.dataset.note;
    if (state.notes[k]) ta.value = state.notes[k];
    ta.addEventListener('input', function () {
      if (ta.value.trim()) state.notes[k] = ta.value; else delete state.notes[k];
      save();
    });
  });

  /* ── ticks (questions + sections) ── */
  var sections = Array.prototype.slice.call(document.querySelectorAll('section.q, section.brief-section'));
  function idOf(sec) { return sec.dataset.q || 'sec:' + sec.dataset.sec; }
  sections.forEach(function (sec) {
    var box = sec.querySelector('.tick input');
    if (!box) return;
    if (state.ticks[idOf(sec)]) { box.checked = true; sec.classList.add('done'); }
    box.addEventListener('change', function () {
      sec.classList.toggle('done', box.checked);
      state.ticks[idOf(sec)] = box.checked; save(); renderProgress();
    });
    /* Clicking anywhere on the heading ticks it — the box is small, quiet and
       in the margin, and the heading is the thing the reader is actually
       finished with. A drag that left a selection is the reader reaching for a
       comment, so it is left alone; so is a click that landed on the label,
       which would toggle twice and cancel itself out. */
    var head = sec.querySelector('.sec-head, .q-head');
    if (!head) return;
    head.addEventListener('click', function (e) {
      if (e.target.closest && e.target.closest('label.tick, a, button, input, textarea, select')) return;
      var sel = window.getSelection();
      if (sel && !sel.isCollapsed && sel.toString().trim()) return;
      box.checked = !box.checked;
      box.dispatchEvent(new Event('change', { bubbles: true }));
    });
  });
  /* A question counts as resolved once it has an answer typed into it, OR it has
     been ticked. Typing an answer IS resolving it — requiring a separate tick made
     the counter read 0/4 on a brief whose four answers had already been sent back,
     which is worse than useless. The tick stays meaningful on its own: it's how you
     resolve a question by accepting the stated assumption without typing anything. */
  function answered(qid) { return !!(state.answers[qid] || '').trim(); }
  function resolved(qid) { return !!state.ticks[qid] || answered(qid); }

  /* The progress counter doubles as a jump-link to the next unresolved question,
     so a long brief never has to be scrolled to find what's still outstanding. */
  function renderProgress() {
    var qs = sections.filter(function (s) { return s.dataset.q; });
    var done = qs.filter(function (s) { return resolved(s.dataset.q); }).length;
    var el = document.getElementById('progress');
    if (!el) return;
    var next = qs.find(function (s) { return !resolved(s.dataset.q); });
    /* A brief with nothing to answer says so plainly. "0/0 questions resolved"
       reads as a broken counter; "0 questions for you" is the actual message,
       and it tells a reader this document is to be read, not filled in. */
    if (!qs.length) {
      el.textContent = '0 questions for you';
      el.removeAttribute('href');
      el.removeAttribute('data-tip');
      el.setAttribute('aria-label', 'This brief asks no questions.');
      el.classList.add('all-done', 'no-questions');
      return;
    }
    el.textContent = done + '/' + qs.length + ' questions resolved';
    if (next) {
      el.setAttribute('href', '#' + (next.id || (next.id = 'q-' + next.dataset.q)));
      el.setAttribute('data-tip', 'Jump to ' + next.dataset.q + ' — next unresolved');
      el.setAttribute('aria-label', done + ' of ' + qs.length +
        ' questions resolved. Jump to ' + next.dataset.q + ', the next unresolved question.');
      el.classList.remove('all-done');
    } else {
      /* Everything answered still jumps somewhere: to the first question, so the
         reader can re-read their answers from the top instead of scrolling for
         them. A counter that stops being a link the moment it reads full was
         the one state in which it was most often clicked (2026-09-15). */
      var first = qs[0];
      el.setAttribute('href', '#' + (first.id || (first.id = 'q-' + first.dataset.q)));
      el.setAttribute('data-tip', 'All resolved. Jump to ' + first.dataset.q + ', the first question');
      el.setAttribute('aria-label', 'All ' + qs.length + ' questions resolved. Jump to ' + first.dataset.q + ', the first question.');
      el.classList.add('all-done');
    }
  }

  /* ── answers ── */
  /* Auto-inject a Response textarea into every question that lacks one, so an
     author can never ship a question with no way to answer it. */
  sections.forEach(function (sec) {
    if (!sec.dataset.q) return;
    if (sec.querySelector('textarea.answer')) return;
    var body = sec.querySelector('.q-body') || sec;
    var wrap = document.createElement('div');
    wrap.className = 'answerwrap';
    var qid = sec.dataset.q;
    var lbl = document.createElement('label');
    lbl.setAttribute('for', 'ans-' + qid);
    lbl.textContent = 'Your answer';
    var ta = document.createElement('textarea');
    ta.className = 'answer';
    ta.id = 'ans-' + qid;
    ta.setAttribute('placeholder', 'Type answer — saved locally as you type');
    wrap.appendChild(lbl); wrap.appendChild(ta);
    body.appendChild(wrap);
  });
  document.querySelectorAll('textarea.answer').forEach(function (ta) {
    var q = ta.closest('section.q'); if (!q) return;
    var qid = q.dataset.q;
    if (state.answers[qid]) ta.value = state.answers[qid];
    ta.addEventListener('input', function () {
      var was = answered(qid);
      state.answers[qid] = ta.value; clearTimeout(ta._h);
      ta._h = setTimeout(save, 250);
      /* Only re-render when the answered/empty state actually flips, so the
         counter tracks typing live without doing work on every keystroke. */
      if (answered(qid) !== was) renderProgress();
    });
  });

  /* ── legend pairs ──
     A .legend is a flat row of <span class="chip"> swatches each followed by
     its label text, so the flex gap falls BETWEEN a chip and its own words as
     well as between pairs, and the two read the wrong way round. Wrapping each
     pair gives the pair its own, tighter gap. Done here rather than in the
     renderer so every brief already written gets it. */
  Array.prototype.forEach.call(document.querySelectorAll('.legend'), function (lg) {
    var wrap = null;
    Array.prototype.slice.call(lg.childNodes).forEach(function (n) {
      if (n.nodeType === 1 && n.classList.contains('chip')) {
        wrap = document.createElement('span');
        wrap.className = 'legend-i';
        lg.insertBefore(wrap, n);
        wrap.appendChild(n);
        return;
      }
      if (!wrap) return;
      if (n.nodeType === 3 && !n.nodeValue.trim()) return;
      wrap.appendChild(n);
    });
  });

  /* ── responses JSON ── */
  function responsesJSON() {
    var out = { brief: BRIEF, title: document.title, exported: new Date().toISOString(), answers: [], comments: [] };
    sections.forEach(function (sec) {
      if (!sec.dataset.q) return;
      var h = sec.querySelector('.q-head h2');
      /* `resolved` matches the on-screen counter: answered OR ticked. `ticked` is
         reported separately so an explicit "assumption accepted, nothing to add"
         (ticked, no answer) stays distinguishable from a typed reply. */
      out.answers.push({
        id: sec.dataset.q,
        question: h ? h.textContent.replace(/\s+/g, ' ').trim() : sec.dataset.q,
        resolved: resolved(sec.dataset.q),
        ticked: !!state.ticks[sec.dataset.q],
        answer: state.answers[sec.dataset.q] || ''
      });
    });
    out.notes = [];
    Array.prototype.forEach.call(document.querySelectorAll('textarea[data-note]'), function (ta) {
      var k = ta.dataset.note;
      if (state.notes[k]) {
        out.notes.push({ id: k, label: ta.dataset.noteLabel || ta.getAttribute('aria-label') || k,
                         note: state.notes[k] });
      }
    });
    /* An edited document ships as the reader left it, with the original beside it,
       because a rewrite the author cannot diff is a rewrite they have to re-read whole. */
    out.edits = [];
    Array.prototype.forEach.call(document.querySelectorAll('[data-doc]'), function (doc) {
      var k = doc.dataset.doc, edited = state.edits[k];
      if (edited == null || edited === docSource(doc)) return;
      out.edits.push({ id: k, label: doc.dataset.docLabel || k,
                       original: docSource(doc), edited: edited });
    });
    state.comments.forEach(function (c) {
      var follow = (c.thread || []).map(function (m) { return m.text; });
      /* A comment the author has answered only travels again if the reader has
         carried the conversation on. Without a follow-up it is settled, and
         round-tripping it makes the author read their own answer back. */
      if (hasReply(c) && !follow.length) return;
      if (isSent(c)) return;
      var o = { selected_text: c.text, near_question: c.near || null, comment: c.comment };
      if (hasReply(c)) { o.reply = c.reply; o.follow_up = follow; }
      o.highlight = c.unhl ? null : hlOf(c);
      o.anchored = !!document.querySelector('mark.cmt[data-cid="' + c.cid + '"]');
      out.comments.push(o);
    });
    /* Drafts are comments the reader typed but never saved. They ship in the
       payload rather than being dropped: losing a typed thought to a stray
       click outside the box is the failure this whole subsystem exists to stop. */
    out.drafts = state.drafts.filter(function (d) { return (d.comment || '').trim(); })
      .map(function (d) {
        return { selected_text: d.text || '', near_question: d.near || null,
                 comment: d.comment, draft: true };
      });
    return JSON.stringify(out, null, 2);
  }
  function copyText(txt, msg) {
    function fallback() {
      var ta = document.createElement('textarea');
      ta.value = txt; document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); } catch {}
      ta.remove(); toast(msg);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(txt).then(function () { toast(msg); }, fallback);
    } else fallback();
  }
  /* Sent comments. A comment the reader exported under one build of the file,
     and has not changed since, reached Claude once the file is rebuilt: the new
     build is Claude's work on what it received. It then leaves later exports,
     so a re-copy carries only what is new or changed, never the whole history.
     It stays on the page and in the drawer. Editing it, recolouring it or
     adding a follow-up makes it travel again. No build token (an older file)
     means nothing is ever treated as sent. */
  function buildTok() { return document.body.dataset.build || ''; }
  function csig(c) { return JSON.stringify([c.comment, c.hl, c.unhl, (c.thread || []).length]); }
  function isSent(c) {
    return !!(c.sent && buildTok() && c.sent.tok !== buildTok() && c.sent.sig === csig(c));
  }
  function markSent() {
    var tok = buildTok(); if (!tok) return;
    state.comments.forEach(function (c) {
      if (isSent(c)) return;          // keep the older stamp; it already left
      c.sent = { tok: tok, sig: csig(c) };
    });
    save();
  }
  function copyJSON() { copyText(responsesJSON(), 'Responses JSON copied'); markSent(); markCopied(); }
  var copyBtnEl = document.getElementById('copyBtn');
  copyBtnEl.innerHTML = ICON.copy;
  tip(copyBtnEl, 'Copy responses JSON', MOD + 'C');
  copyBtnEl.addEventListener('click', copyJSON);
  consumeToken();
  renderDirty();
  /* Download the same payload as a file — a brief read offline, or one whose
     answers must be kept, needs an artefact rather than a clipboard. */
  function downloadJSON() {
    var slug = (BRIEF || document.title || 'brief').toLowerCase()
      .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60) || 'brief';
    var date = new Date().toISOString().slice(0, 10);
    var url = URL.createObjectURL(new Blob([responsesJSON()], { type: 'application/json' }));
    var a = document.createElement('a');
    a.href = url; a.download = slug + '-responses-' + date + '.json';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
    toast('Responses JSON downloaded');
    markSent();
    markCopied();
  }
  var dlBtn = document.getElementById('downloadBtn');
  if (dlBtn) {
    dlBtn.innerHTML = ICON.download;
    tip(dlBtn, 'Download responses JSON');
    dlBtn.addEventListener('click', downloadJSON);
  }
  document.addEventListener('keydown', function (e) {
    if ((e.metaKey || e.ctrlKey) && e.key === 'c') {
      var sel = window.getSelection();
      var active = document.activeElement;
      var inField = active && (active.tagName === 'TEXTAREA' || active.tagName === 'INPUT');
      if ((!sel || sel.isCollapsed) && !inField) { e.preventDefault(); copyJSON(); }
    }
    if (e.key === 'Escape') closePop();
  });

  /* ── selection comments ───────────────────────────────────────────────
     Three defects fixed here, all of which presented as "my comment vanished":
       1. surroundContents() throws on any selection crossing an element
          boundary, so the comment saved but was never highlighted, and nothing
          in the UI could reach it again.
       2. re-anchoring searched one text node at a time, so a quote spanning a
          <strong> or two paragraphs could never re-match on reload.
       3. text typed into the popup was lost the moment the reader clicked away.
     The drawer is the backstop: every comment and every draft is reachable
     from it whether or not its highlight survived. */
  var CHROME = '.topbar, #cpop, #cdrawer, #toast, .codecopy';
  var pop = null, editing = null, pendingRange = null, popDraftKey = null;

  function main() { return document.getElementById('briefMain') || document.querySelector('main'); }
  function norm(t) { return String(t).replace(/\s+/g, ' ').trim(); }
  function nearestQ(node) {
    var el = node && node.nodeType === 1 ? node : (node && node.parentElement);
    var q = el && el.closest ? el.closest('section.q, section.brief-section') : null;
    return q ? (q.dataset.q || q.dataset.sec) : null;
  }

  function textNodesIn(root) {
    if (!root) return [];
    var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        if (!n.nodeValue || !n.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        var pe = n.parentElement;
        if (!pe || pe.closest(CHROME)) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    var out = [], n;
    while ((n = w.nextNode())) out.push(n);
    return out;
  }

  /* Flatten the document to one whitespace-normalised string with an index map
     back into its text nodes, so a quote spanning several elements still
     resolves to a single Range. */
  function flatten(root) {
    var nodes = textNodesIn(root), str = '', map = [];
    nodes.forEach(function (n) {
      var v = n.nodeValue;
      for (var i = 0; i < v.length; i++) {
        var ch = /\s/.test(v[i]) ? ' ' : v[i];
        if (ch === ' ' && str.slice(-1) === ' ') continue;
        str += ch; map.push({ node: n, offset: i });
      }
    });
    return { text: str, map: map };
  }

  function findRange(root, quote, nth) {
    if (!root || !quote) return null;
    var f = flatten(root), q = norm(quote);
    if (!q) return null;
    var from = 0, at = -1, seen = 0, hit;
    while ((hit = f.text.indexOf(q, from)) !== -1) {
      at = hit;
      if (seen === (nth || 0)) break;
      seen++; from = hit + 1; at = -1;
    }
    if (at === -1 || !f.map[at] || !f.map[at + q.length - 1]) return null;
    var a = f.map[at], b = f.map[at + q.length - 1];
    var r = document.createRange();
    r.setStart(a.node, a.offset); r.setEnd(b.node, b.offset + 1);
    return r;
  }

  /* Which occurrence of this text the reader actually selected — without it,
     a repeated phrase re-anchors onto the first match on reload. */
  function occurrenceOf(root, range) {
    var f = flatten(root), q = norm(range.toString());
    if (!q) return 0;
    var probe = document.createRange(), from = 0, at, i = 0;
    while ((at = f.text.indexOf(q, from)) !== -1) {
      var a = f.map[at], b = f.map[at + q.length - 1];
      if (a && b) {
        probe.setStart(a.node, a.offset); probe.setEnd(b.node, b.offset + 1);
        if (probe.compareBoundaryPoints(Range.START_TO_START, range) === 0) return i;
      }
      i++; from = at + 1;
    }
    return 0;
  }

  /* Wrap every text node the range touches in its own <mark>, instead of one
     surroundContents() that throws the moment the range crosses an element. */
  function wrapRange(range, cid, hl) {
    var all = textNodesIn(main()).filter(function (n) {
      try { return range.intersectsNode(n); } catch { return false; }
    });
    if (!all.length) return false;
    var sc = range.startContainer, so = range.startOffset;
    var ec = range.endContainer, eo = range.endOffset;
    var made = false;
    all.forEach(function (node) {
      var a = (node === sc) ? so : 0;
      var b = (node === ec) ? eo : node.nodeValue.length;
      if (b <= a) return;
      var r = document.createRange();
      try { r.setStart(node, a); r.setEnd(node, b); } catch { return; }
      var mk = document.createElement('mark');
      mk.className = 'cmt'; mk.dataset.cid = cid; mk.dataset.hl = hl || 'yellow';
      try { r.surroundContents(mk); made = true; } catch {}
    });
    return made;
  }

  function unpaint(cid) {
    Array.prototype.forEach.call(document.querySelectorAll('mark.cmt[data-cid="' + cid + '"]'), function (m) {
      var parent = m.parentNode;
      while (m.firstChild) parent.insertBefore(m.firstChild, m);
      m.remove(); parent.normalize();
    });
  }
  function recolour(cid, hl) {
    Array.prototype.forEach.call(document.querySelectorAll('mark.cmt[data-cid="' + cid + '"]'),
      function (m) { m.dataset.hl = hl; });
  }
  function isAnchored(cid) { return !!document.querySelector('mark.cmt[data-cid="' + cid + '"]'); }

  /* ── drafts ── */
  function draftKey(existing, quote) { return existing ? 'cid:' + existing.cid : 'sel:' + norm(quote); }
  function draftFor(key) {
    return state.drafts.filter(function (d) { return d.key === key; })[0] || null;
  }
  function putDraft(key, quote, body, near, cid) {
    var d = draftFor(key);
    if (!body.trim()) { return dropDraft(key); }
    if (!d) { d = { key: key, text: quote || '', near: near || null, cid: cid || null }; state.drafts.push(d); }
    d.comment = body; d.at = new Date().toISOString();
    save(); renderDrawer();
  }
  function dropDraft(key) {
    var before = state.drafts.length;
    state.drafts = state.drafts.filter(function (d) { return d.key !== key; });
    if (state.drafts.length !== before) { save(); renderDrawer(); }
  }

  /* ── the popup ── */
  function closePop() { if (pop) { pop.remove(); pop = null; editing = null; popDraftKey = null; } }

  /* A comment the author has answered opens as a conversation, not as an edit
     box: the reader reads the answer where they asked the question, and can
     carry it on without starting a second comment about the same passage. */
  function openThread(x, y, quote, c) {
    var key = draftKey(c, quote);
    popDraftKey = key;
    var draft = draftFor(key);
    pop = document.createElement('div');
    pop.id = 'cpop'; pop.className = 'thread';
    pop.innerHTML =
      '<div class="quote">“' + esc(String(quote)).slice(0, 180) + '”</div>' +
      threadHTML(c) +
      '<label class="ctlabel" for="ctreply">Continue the conversation</label>' +
      '<textarea id="ctreply" placeholder="Reply to this response"></textarea>' +
      '<div class="row">' +
      '<button class="btn small" data-act="editorig" type="button">Edit original</button>' +
      '<button class="btn small" data-act="cancel" type="button">Cancel</button>' +
      '<button class="btn small primary" data-act="save" type="button">Save</button></div>' +
      '<p class="pophint">' + MOD + 'Enter saves \u00b7 Esc closes and keeps a draft</p>';
    document.body.appendChild(pop);
    var vw = document.documentElement.clientWidth;
    var w = pop.offsetWidth;
    pop.style.left = Math.max(8, Math.min(x - w / 2, vw - w - 8)) + 'px';
    pop.style.top = (y + 8) + 'px';

    var ta = pop.querySelector('textarea');
    ta.value = draft ? draft.comment : '';
    setTimeout(function () { ta.focus(); }, 10);
    ta.addEventListener('input', function () { putDraft(key, quote, ta.value, c.near || null, c.cid); });

    function commit() {
      var val = ta.value.trim();
      if (!val) { dropDraft(key); closePop(); return; }
      if (!c.thread) c.thread = [];
      c.thread.push({ by: 'reader', text: val, at: new Date().toISOString() });
      dropDraft(key); save(); renderDrawer();
      /* Stay open and repaint: the reader sees their follow-up land in the
         thread, which is the whole reason for showing the conversation. */
      var box = document.createElement('div');
      box.innerHTML = threadHTML(c);
      pop.replaceChild(box.firstChild, pop.querySelector('.cthread'));
      ta.value = ''; ta.focus();
      toast('Reply added');
    }

    pop.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); closePop(); return; }
      if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) { e.preventDefault(); e.stopPropagation(); commit(); }
    }, true);
    pop.addEventListener('mousedown', function (e) { e.stopPropagation(); });
    pop.addEventListener('click', function (e) {
      var btn = e.target.closest && e.target.closest('button');
      var act = btn && btn.dataset.act;
      if (!act) return;
      if (act === 'cancel') { dropDraft(key); closePop(); return; }
      if (act === 'editorig') { dropDraft(key); editing = c; openPop(x, y, quote, c, null, true); return; }
      if (act === 'save') commit();
    });
  }

  /* The conversation on one comment: what the reader wrote, what the author
     said back, then every follow-up in the order they were written. Line breaks
     survive through CSS (white-space: pre-wrap), so the text itself is escaped
     and never parsed. */
  function threadHTML(c) {
    var h = '<div class="cthread">' +
      '<div class="ctmsg"><span class="ctwho">You</span>' +
      '<div class="cttext">' + esc(c.comment) + '</div></div>' +
      '<div class="ctmsg ctreply"><span class="ctwho">Response</span><div class="cttext">' +
      (c.reply ? esc(c.reply) : '<em class="ctnone">Marked as addressed, with no written response.</em>') +
      '</div></div>';
    (c.thread || []).forEach(function (m) {
      h += '<div class="ctmsg"><span class="ctwho">You</span>' +
        '<div class="cttext">' + esc(m && m.text) + '</div></div>';
    });
    return h + '</div>';
  }

  /* `plain` forces the ordinary editor onto a comment that HAS a reply, which is
     what the "Edit original" link in the thread does. */
  function openPop(x, y, quote, existing, prefill, plain) {
    closePop();
    if (existing && hasReply(existing) && !plain) return openThread(x, y, quote, existing);
    var key = draftKey(existing, quote);
    popDraftKey = key;
    var draft = draftFor(key);
    pop = document.createElement('div');
    pop.id = 'cpop';
    pop.innerHTML =
      '<div class="quote">“' + String(quote).replace(/[<&]/g, function (c) { return c === '<' ? '&lt;' : '&amp;'; }).slice(0, 180) + '”</div>' +
      '<div class="chips" role="group" aria-label="Highlight colour">' +
      HLS.map(function (h) {
        return '<button class="chip" type="button" data-hl="' + h + '" aria-pressed="false"' +
               ' aria-label="' + h.charAt(0).toUpperCase() + h.slice(1) + ' highlight"></button>';
      }).join('') +
      '<button class="chip chipoff" type="button" data-act="clear"></button>' +
      '</div>' +
      '<textarea placeholder="Comment — or pick a colour to just highlight"></textarea>' +
      '<div class="row">' +
      (existing ? '<button class="btn small danger" data-act="del" type="button">Delete</button>' : '') +
      (existing ? '' : '<button class="btn small" data-act="copy" type="button">Copy text</button>') +
      '<button class="btn small" data-act="cancel" type="button">Discard</button>' +
      '<button class="btn small primary" data-act="save" type="button">Save</button></div>' +
      '<p class="pophint">' + MOD + 'Enter saves · Esc closes and keeps a draft' +
      (existing ? '' : ' · a colour with no comment highlights straight away') +
      (existing ? '' : ' · selection stays live, ' + MOD + 'C copies it') + '</p>';
    document.body.appendChild(pop);
    var vw = document.documentElement.clientWidth;
    var w = pop.offsetWidth;
    pop.style.left = Math.max(8, Math.min(x - w / 2, vw - w - 8)) + 'px';
    pop.style.top = (y + 8) + 'px';

    var chosen = existing ? hlOf(existing) : 'yellow';
    /* True only once a chip has been clicked in THIS popover. It is what lets
       an empty comment box still be a complete action, and what stops a
       words-only edit repainting a highlight the reader had cleared. */
    var hlPicked = false;
    function paintChips() {
      Array.prototype.forEach.call(pop.querySelectorAll('.chip[data-hl]'), function (b) {
        var on = b.dataset.hl === chosen;
        b.classList.toggle('on', on);
        b.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
    }

    var ta = pop.querySelector('textarea');
    ta.value = (prefill != null ? prefill : (draft ? draft.comment : (existing ? existing.comment : '')));
    /* On a FRESH selection we deliberately do not focus: focusing collapses the
       document selection and would break a plain copy. */
    if (existing || prefill != null) setTimeout(function () { ta.focus(); }, 10);

    ta.addEventListener('input', function () {
      putDraft(key, quote, ta.value, existing ? existing.near : (pendingRange ? nearestQ(pendingRange.startContainer) : null),
               existing ? existing.cid : null);
    });
    pop.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); closePop(); return; }
      if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) { e.preventDefault(); e.stopPropagation(); commit(); }
    }, true);
    pop.addEventListener('mousedown', function (e) { e.stopPropagation(); });

    function commit() {
      var val = ta.value.trim();
      /* A colour with no words is a legitimate mark — highlighting is the
         whole action for a reader flagging a passage rather than replying to
         it. Without an explicit colour, an empty box still means "cancel". */
      /* An empty box on a FRESH selection with no colour picked means cancel.
         On an existing mark it means "remove the words, keep the highlight" —
         bailing there would silently discard the edit. */
      if (!val && !hlPicked && !existing) { dropDraft(key); closePop(); return; }
      if (existing) {
        existing.comment = val; existing.at = new Date().toISOString();
        if (isAnchored(existing.cid)) { existing.hl = chosen; recolour(existing.cid, chosen); }
        /* Key on the reader's own decision, not on this popover's state. A mark
           can be unanchored for reasons nobody chose — re-rendering a document
           block wipes its marks — and those must still re-anchor on an edit.
           Only an explicit clear (unhl) means "leave it off". */
        else if (!existing.unhl || hlPicked) {
          /* The highlight was cleared earlier, and a colour was chosen just now
             — that puts it back. Editing the WORDS of a cleared mark must not:
             saving a typo fix used to repaint it yellow, silently undoing the
             clear the reader had asked for. */
          existing.hl = chosen;
          delete existing.unhl;
          var rr = findRange(main(), existing.text, existing.nth || 0);
          if (rr) wrapRange(rr, existing.cid, chosen);
        }
        dropDraft(key); save(); renderDrawer(); closePop(); toast('Comment updated');
        return;
      }
      var cid = 'c' + Date.now() + Math.floor(Math.random() * 1000);
      var range = pendingRange || (draft ? findRange(main(), draft.text, draft.nth || 0) : null);
      var c = {
        cid: cid, text: quote, comment: val, hl: chosen,
        near: range ? nearestQ(range.startContainer) : (draft ? draft.near : null),
        nth: range ? occurrenceOf(main(), range) : 0,
        at: new Date().toISOString()
      };
      state.comments.push(c);
      if (range) wrapRange(range, cid, chosen);
      dropDraft(key); save(); renderDrawer(); closePop();
      var sel = window.getSelection(); if (sel) sel.removeAllRanges();
      toast(isAnchored(cid) ? (val ? 'Comment saved' : 'Highlighted')
                            : 'Saved (no highlight — find it in Comments)');
    }

    paintChips();
    tip(pop.querySelector('.chipoff'), existing ? 'Remove this highlight' : 'Close without highlighting');
    pop.addEventListener('click', function (e) {
      var btn = e.target.closest && e.target.closest('button');
      if (btn && btn.dataset.hl) {
        chosen = btn.dataset.hl; hlPicked = true; paintChips();
        /* One click is the whole gesture when there is nothing to write: an
           existing mark recolours, a fresh selection with an empty box is
           highlighted and done. A box with words in it only takes the colour,
           so the reader can still finish the sentence. */
        if (existing || !ta.value.trim()) commit();
        return;
      }
      var act = btn && btn.dataset.act;
      if (!act) return;
      /* Taking the highlight off is not the same as deleting the thought. If
         there are words, the comment stays and travels in the payload without a
         colour; if there are none, the mark WAS the whole record, so it goes. */
      if (act === 'clear') {
        if (!existing) { dropDraft(key); closePop(); return; }
        unpaint(existing.cid);
        var body = (ta.value || '').trim();
        if (body) {
          existing.comment = body; existing.unhl = true; existing.at = new Date().toISOString();
          dropDraft(key); save(); renderDrawer(); closePop(); toast('Highlight removed, comment kept');
        } else {
          state.comments = state.comments.filter(function (c) { return c.cid !== existing.cid; });
          dropDraft(key); save(); renderDrawer(); closePop(); toast('Highlight removed');
        }
        return;
      }
      if (act === 'cancel') { dropDraft(key); closePop(); return; }
      if (act === 'copy') { copyText(quote, 'Selected text copied'); return; }
      if (act === 'del' && existing) {
        buryBaked(existing);
        unpaint(existing.cid);
        state.comments = state.comments.filter(function (c) { return c.cid !== existing.cid; });
        dropDraft(key); save(); renderDrawer(); closePop(); toast('Comment deleted');
        return;
      }
      if (act === 'save') commit();
    });
  }

  function editComment(c) {
    editing = c;
    var mk = document.querySelector('mark.cmt[data-cid="' + c.cid + '"]');
    var r = mk ? mk.getBoundingClientRect() : { left: innerWidth / 2 - 170, width: 0, bottom: 120 };
    if (mk) mk.scrollIntoView({ block: 'center', behavior: 'smooth' });
    openPop(r.left + r.width / 2 + window.scrollX, r.bottom + window.scrollY, c.text, c, null);
  }

  document.addEventListener('mouseup', function (e) {
    if (pop && pop.contains(e.target)) return;
    if (e.target.closest && e.target.closest('#cdrawer, .topbar')) return;
    var mark = e.target.closest && e.target.closest('mark.cmt');
    setTimeout(function () {
      var sel = window.getSelection();
      if (sel && !sel.isCollapsed && sel.toString().trim() && main() && main().contains(sel.anchorNode)) {
        pendingRange = sel.getRangeAt(0).cloneRange();
        var r = pendingRange.getBoundingClientRect();
        openPop(r.left + r.width / 2 + window.scrollX, r.bottom + window.scrollY, sel.toString().trim(), null, null);
      } else if (mark) {
        var c = state.comments.filter(function (x) { return x.cid === mark.dataset.cid; })[0];
        if (c) editComment(c);
      } else if (pop) closePop();
    }, 0);
  });

  function reanchor() {
    state.comments.forEach(function (c) {
      if (isAnchored(c.cid)) return;
      /* A comment whose quoted text is no longer in the document cannot anchor,
         and findRange walks every text node to discover that. Retrying it on
         every drawer open made the first few clicks crawl on a brief carrying
         two dozen comments from earlier versions. Remember the miss instead. */
      if (c.noAnchor || c.unhl) return;
      var r = findRange(main(), c.text, c.nth || 0);
      if (r) wrapRange(r, c.cid, hlOf(c)); else c.noAnchor = true;
    });
    paintReplied();
    renderDrawer();
  }

  /* ── comments drawer ──
     Every comment and draft in one list, anchored or not. This is what makes a
     lost highlight a cosmetic problem instead of a lost thought. */
  var drawer = document.createElement('div');
  drawer.id = 'cdrawer'; drawer.hidden = true;
  drawer.setAttribute('role', 'dialog');
  drawer.setAttribute('aria-label', 'Comments and drafts');
  document.body.appendChild(drawer);

  function esc(t) {
    return String(t == null ? '' : t).replace(/[<>&]/g, function (c) {
      return c === '<' ? '&lt;' : c === '>' ? '&gt;' : '&amp;';
    });
  }

  function renderDrawer() {
    var cmtBtn = document.getElementById('cmtBtn');
    var drafts = state.drafts.filter(function (d) { return (d.comment || '').trim(); });
    var n = state.comments.length;
    if (cmtBtn) {
      cmtBtn.innerHTML = ICON.comment +
        (n || drafts.length ? '<span class="cbadge' + (drafts.length ? ' hasdraft' : '') + '">' + (n + drafts.length) + '</span>' : '');
      tip(cmtBtn, 'Comments' + (drafts.length ? ' — ' + drafts.length + ' unsaved draft' + (drafts.length > 1 ? 's' : '') : ''), 'C');
    }
    if (drawer.hidden) return;
    var html = '<div class="dhead"><strong>Comments</strong><button class="btn small" data-d="close" type="button">Close</button></div>';
    if (drafts.length) {
      html += '<p class="dlabel">Unsaved drafts</p>';
      drafts.forEach(function (d) {
        html += '<div class="drow draft" data-key="' + esc(d.key) + '">' +
          '<div class="dq">' + (d.text ? '“' + esc(d.text).slice(0, 160) + '”' : '<em>no selection</em>') + '</div>' +
          '<div class="db">' + esc(d.comment) + '</div>' +
          '<div class="dacts"><button class="btn small" data-d="resume" type="button">Resume</button>' +
          '<button class="btn small danger" data-d="discard" type="button">Discard</button></div></div>';
      });
    }
    if (!n) {
      html += '<p class="dempty">No saved comments yet. Select any text in the brief to comment on it.</p>';
    } else {
      html += '<p class="dlabel">Saved</p>';
      state.comments.forEach(function (c) {
        var anchored = isAnchored(c.cid);
        html += '<div class="drow" data-cid="' + esc(c.cid) + '">' +
          '<div class="dq"><span class="ddot"' + (c.unhl ? '' : ' data-hl="' + hlOf(c) + '"') + '></span>“' + esc(c.text).slice(0, 160) + '”' +
          (hasReply(c) ? '<span class="dbadge done">replied</span>' : '') +
          (anchored ? '' : '<span class="dbadge">not highlighted</span>') + '</div>' +
          '<div class="db">' + esc(c.comment) + '</div>' +
          '<div class="dacts">' +
          (anchored ? '<button class="btn small" data-d="goto" type="button">Show</button>' : '') +
          '<button class="btn small" data-d="edit" type="button">Edit</button>' +
          '<button class="btn small danger" data-d="del" type="button">Delete</button></div></div>';
      });
    }
    drawer.innerHTML = html;
  }

  drawer.addEventListener('click', function (e) {
    var btn = e.target.closest && e.target.closest('button');
    if (!btn) return;
    var act = btn.dataset.d;
    var row = btn.closest('.drow');
    if (act === 'close') return toggleDrawer(false);
    if (act === 'discard') { dropDraft(row.dataset.key); return; }
    if (act === 'resume') {
      var d = draftFor(row.dataset.key);
      if (!d) return;
      toggleDrawer(false);
      if (d.cid) {
        var c0 = state.comments.filter(function (c) { return c.cid === d.cid; })[0];
        if (c0) { editing = c0; return openPop(innerWidth / 2, window.scrollY + 100, c0.text, c0, d.comment); }
      }
      pendingRange = d.text ? findRange(main(), d.text, d.nth || 0) : null;
      return openPop(innerWidth / 2, window.scrollY + 100, d.text || '(no selection)', null, d.comment);
    }
    var c = state.comments.filter(function (x) { return x.cid === row.dataset.cid; })[0];
    if (!c) return;
    if (act === 'goto') {
      toggleDrawer(false);
      var mk = document.querySelector('mark.cmt[data-cid="' + c.cid + '"]');
      if (mk) { mk.scrollIntoView({ block: 'center', behavior: 'smooth' }); mk.classList.add('flash');
                setTimeout(function () { mk.classList.remove('flash'); }, 1600); }
      return;
    }
    if (act === 'edit') { toggleDrawer(false); return editComment(c); }
    if (act === 'del') {
      buryBaked(c);
      unpaint(c.cid);
      state.comments = state.comments.filter(function (x) { return x.cid !== c.cid; });
      save(); renderDrawer(); toast('Comment deleted');
    }
  });

  function toggleDrawer(on) {
    drawer.hidden = (on === undefined) ? !drawer.hidden : !on;
    if (!drawer.hidden) renderDrawer();
  }
  var cmtBtnEl = document.getElementById('cmtBtn');
  /* stopPropagation, because opening the drawer re-renders this button's icon:
     by the time the document listener below runs, the <svg> the click landed on
     has been replaced, its closest('#cmtBtn') walks a detached tree, the
     click-outside guard misses, and the drawer closes on the very click that
     opened it. Hitting the button's padding worked, the icon did not. */
  if (cmtBtnEl) cmtBtnEl.addEventListener('click', function (e) { e.stopPropagation(); toggleDrawer(); });
  document.addEventListener('click', function (e) {
    if (drawer.hidden) return;
    /* composedPath() is captured at dispatch, so it still names the button even
       if the node the click hit has since been re-rendered. */
    var path = e.composedPath ? e.composedPath() : [];
    for (var i = 0; i < path.length; i++) {
      var el = path[i];
      if (el && el.id && /^(cdrawer|cmtBtn|cpop)$/.test(el.id)) return;
    }
    if (e.target.closest && e.target.closest('#cdrawer, #cmtBtn, #cpop')) return;
    toggleDrawer(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'c' && e.key !== 'C') return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    var a = document.activeElement;
    if (a && (a.tagName === 'TEXTAREA' || a.tagName === 'INPUT' || a.isContentEditable)) return;
    var sel = window.getSelection();
    if (sel && !sel.isCollapsed) return;
    e.preventDefault(); toggleDrawer();
  });

  /* ── footnotes → references ──
     A footnote target may sit inside a collapsed <details> or a ticked-off
     (collapsed) section, so jumping to it must reveal it first, else the click
     appears to do nothing. Also back-links each reference to its first citation. */
  function revealTarget(hash) {
    if (!hash || hash.length < 2) return;
    var el;
    try { el = document.querySelector(hash); } catch { return; }
    if (!el) return;
    var p = el;
    while (p && p !== document.body) {
      if (p.tagName === 'DETAILS') p.open = true;
      if (p.classList && p.classList.contains('done')) {
        var cb = p.querySelector('.tick input');
        if (cb && cb.checked) { cb.checked = false; cb.dispatchEvent(new Event('change', { bubbles: true })); }
      }
      p = p.parentElement;
    }
    el.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }
  /* Published, the host page cannot see this frame's hash, so a jump in here
     never reaches the address bar and nobody can copy a deep link. Tell the host,
     which mirrors it into its own URL. `host` is only set once an init has named
     it, so an unpublished or unframed brief sends nothing. An empty hash is sent
     as '' and means CLEAR: Back past the first jump drops the host's fragment too. */
  var hashFromHost = null;
  function tellHostHash() {
    if (!host || !FRAMED) return;
    /* The host moved us with brief-hash-set; its URL already says so, and echoing
       it back would be a ping-pong. One-shot, so the reader's own next jump to
       the same place is still reported. */
    if (hashFromHost !== null && location.hash === hashFromHost) { hashFromHost = null; return; }
    hashFromHost = null;
    window.parent.postMessage({ v: 1, type: 'brief-hash', hash: location.hash }, host);
  }
  window.addEventListener('hashchange', function () { revealTarget(location.hash); tellHostHash(); });
  /* The host page's own fragment moved after init (a same-document link or a
     bookmark to this brief), so the frame did not reload and no init carries it.
     Same origin and validation rules as every other host message. */
  window.addEventListener('message', function (e) {
    var d = e.data;
    if (!host || !d || d.v !== 1 || d.type !== 'brief-hash-set') return;
    if (e.source !== window.parent || e.origin !== host) return;
    var h = d.hash;
    if (typeof h !== 'string' || h.length > 200 || (h !== '' && !/^#[A-Za-z0-9._~:-]+$/.test(h))) return;
    if (h === location.hash) return;
    if (h === '') {
      /* replaceState, not `location.hash = ''`, which would leave a bare '#'.
         It fires no hashchange, so there is nothing to echo. */
      history.replaceState(history.state, '', location.pathname + location.search);
      return;
    }
    hashFromHost = h;
    location.hash = h;
  });
  if (location.hash) setTimeout(function () { revealTarget(location.hash); tellHostHash(); }, 0);

  var citedBy = {};
  Array.prototype.forEach.call(document.querySelectorAll('sup.fn > a[href^="#"]'), function (a, i) {
    var sup = a.parentElement;
    if (!sup.id) sup.id = 'cite-' + (i + 1);
    var key = a.getAttribute('href').slice(1);
    if (!citedBy[key]) citedBy[key] = sup.id;
    /* aria-label, not title: a superscript link into the references needs no
       hover hint (the affordance is the shape), and a title attribute here put
       50 of them in one document, against this file's own rule. */
    if (!a.getAttribute('aria-label')) a.setAttribute('aria-label', 'Jump to reference ' + (a.textContent || '').trim());
  });
  Object.keys(citedBy).forEach(function (key) {
    var target = document.getElementById(key);
    if (!target || target.querySelector('a.backref')) return;
    var back = document.createElement('a');
    back.className = 'backref'; back.href = '#' + citedBy[key];
    back.textContent = '↩'; back.setAttribute('aria-label', 'Back to the text that cites this');
    (target.querySelector('.apa') || target).appendChild(back);
  });

  /* ── copy buttons on code blocks ── */
  /* Every <pre> gets a copy icon top-right that copies its text content. */
  Array.prototype.slice.call(document.querySelectorAll('#briefMain pre, main pre')).forEach(function (pre) {
    if (pre.querySelector(':scope > .codecopy')) return;
    pre.classList.add('has-copy');
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'codecopy';
    btn.setAttribute('aria-label', 'Copy code');
    btn.innerHTML = '<span class="ci" aria-hidden="true">⎘</span>';
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var code = pre.querySelector('code');
      var txt = (code || pre).textContent;
      function done() { btn.classList.add('copied'); toast('Copied'); clearTimeout(btn._h); btn._h = setTimeout(function () { btn.classList.remove('copied'); }, 1200); }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(txt).then(done, function () {
          var ta = document.createElement('textarea'); ta.value = txt; document.body.appendChild(ta); ta.select();
          try { document.execCommand('copy'); } catch {} ta.remove(); done();
        });
      } else {
        var ta2 = document.createElement('textarea'); ta2.value = txt; document.body.appendChild(ta2); ta2.select();
        try { document.execCommand('copy'); } catch {} ta2.remove(); done();
      }
    });
    pre.appendChild(btn);
  });

  /* ── copy buttons on the standfirst and the summary page ──
     Two affordances at the top of the pyramid: the standfirst copies the
     question and the answer as plain text, and the summary page copies itself
     as markdown. Both reuse copyText, the toast and the data-tip helper. */
  function copybtn(tipText, extraClass, onCopy) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'copybtn' + (extraClass ? ' ' + extraClass : '');
    b.innerHTML = ICON.copy;
    tip(b, tipText);
    b.addEventListener('click', function (e) {
      e.stopPropagation();
      onCopy();
      b.classList.add('copied');
      clearTimeout(b._h);
      b._h = setTimeout(function () { b.classList.remove('copied'); }, 1200);
    });
    return b;
  }

  var titleEl = document.querySelector('.brief-title');
  var subEl = titleEl && titleEl.querySelector('.sub');
  if (subEl && !titleEl.querySelector('.subrow')) {
    var row = document.createElement('div');
    row.className = 'subrow';
    subEl.parentNode.insertBefore(row, subEl);
    row.appendChild(subEl);
    row.appendChild(copybtn('Copy question + answer', '', function () {
      var h1 = titleEl.querySelector('h1');
      copyText(((h1 && h1.textContent) || '').trim() + '\n' + subEl.textContent.trim(),
        'Question and answer copied');
    }));
  }

  /* The footnote markers inside one part of the document, resolved against the
     brief's own reference list. Numbering follows the markers, so the copied
     extract and the page agree. Returns '' when the part cites nothing. */
  function citedRefs(scope) {
    var seen = {}, cited = [];
    scope.querySelectorAll('sup.fn a[href^="#ref"]').forEach(function (a) {
      var id = a.getAttribute('href').slice(1);
      if (seen[id]) return;
      seen[id] = 1;
      var li = document.getElementById(id);
      if (!li) return;
      /* The entry is the li's own text: its number badge, any note and the
         back-link are apparatus, not the citation. A hand-authored brief wraps
         it in .apa, a rendered one does not, so both shapes are handled. */
      var apaEl = li.querySelector('.apa');
      var src = apaEl || li.cloneNode(true);
      if (!apaEl) src.querySelectorAll('.rnum, .backref, .apa-note, blockquote').forEach(function (n) { n.remove(); });
      var apa = (src.textContent || '').trim().replace(/\s+/g, ' ');
      if (apa) cited.push({ n: parseInt(a.textContent, 10) || 0, apa: apa });
    });
    if (!cited.length) return '';
    cited.sort(function (x, y) { return x.n - y.n; });
    return '\n\n## References\n\n' + cited.map(function (c) { return c.n + '. ' + c.apa; }).join('\n\n');
  }

  var summary = document.querySelector('.summary-page');
  if (summary && !summary.querySelector(':scope > .pagecopy')) {
    summary.insertBefore(copybtn('Copy summary as markdown', 'pagecopy', function () {
      /* htmlToMd walks block children, so the section shells are flattened
         first — otherwise a whole section collapses into one inline run. */
      var clone = summary.cloneNode(true);
      clone.querySelectorAll('.copybtn, label.tick, .cmt-btn').forEach(function (n) { n.remove(); });
      /* "Part one" is a label, not the first words of the heading. */
      clone.querySelectorAll('.pnum').forEach(function (n) { n.textContent = n.textContent.trim() + ' —'; });
      var shell;
      while ((shell = clone.querySelector('section, .sec-head, .q-head, .sec-body, .q-body'))) {
        while (shell.firstChild) shell.parentNode.insertBefore(shell.firstChild, shell);
        shell.remove();
      }
      /* The evidence block is a collapsed on-page control, and htmlToMd would
         flatten it into one unreadable run. Pasted markdown gets the same
         information as a short References list instead — only the sources the
         summary actually cites, numbered as they are numbered on the page, so a
         copied verdict carries its footnotes rather than bare digits. */
      clone.querySelectorAll('.l5').forEach(function (n) { n.remove(); });
      copyText(htmlToMd(clone) + citedRefs(summary), 'Summary copied as markdown');
    }), summary.firstChild);
  }

  reanchor();
  renderProgress();

  /* ── editable documents ──────────────────────────────────────────────────
     A `[data-doc]` block is a document the reader may rewrite, not just comment
     on. Source is source, so Edit mode is mono, wrapped and syntax-tinted, the
     same call prima's workbench makes; the reading view stays serif. The
     original is held in the DOM (a <script type="text/markdown">) so a revert is
     always possible and the export can carry both sides.

     ponytail: a ~40-line markdown renderer, not a parser. It covers what an
     article uses (headings, emphasis, links, code, lists, quotes, rules, tables
     are NOT covered) and the source is always one keystroke away in Edit mode,
     which is the escape hatch that makes the small renderer safe. Swap in a real
     parser the day a brief needs one. */
  function docSource(doc) {
    var src = doc.querySelector('script[type="text/markdown"]');
    return src ? src.textContent.replace(/^\n/, '') : '';
  }
  function esc(t) {
    return t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function inline(t) {
    return esc(t)
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/(^|[^*])\*([^*\n]+)\*/g, '$1<em>$2</em>')
      .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2">$1</a>');
  }
  /* GFM pipe tables. A brief's editable document is usually a draft of something
     that ships, and shipping prose has tables in it; without this a pasted table
     is silently flattened on the way back to markdown. */
  function tableRow(line) {
    return line.replace(/^\s*\|/, '').replace(/\|\s*$/, '').split('|').map(function (c) { return c.trim(); });
  }
  function isTableDivider(line) {
    return /^\s*\|?[\s:-]*-[\s:|-]*\|?\s*$/.test(line) && line.indexOf('-') > -1;
  }
  function mdToHtml(md) {
    var out = [], para = [], list = null, fence = null;
    function flush() {
      if (para.length) { out.push('<p>' + inline(para.join(' ')) + '</p>'); para = []; }
      if (list) { out.push('</' + list + '>'); list = null; }
    }
    var lines = md.split('\n');
    /* Tables are handled by a pre-pass so the line loop below stays a line loop:
       a table needs two lines of lookahead, which the per-line reducer cannot do. */
    var html = [], i = 0;
    while (i < lines.length) {
      if (/\|/.test(lines[i]) && lines[i + 1] !== undefined && isTableDivider(lines[i + 1]) &&
          !/^```/.test(lines[i])) {
        var head = tableRow(lines[i]), rows = [];
        i += 2;
        while (i < lines.length && /\|/.test(lines[i]) && lines[i].trim()) { rows.push(tableRow(lines[i])); i += 1; }
        var t = '<div class="tblwrap nopin"><table><thead><tr>' +
          head.map(function (c) { return '<th>' + inline(c) + '</th>'; }).join('') + '</tr></thead><tbody>' +
          rows.map(function (r) {
            return '<tr>' + r.map(function (c) { return '<td>' + inline(c) + '</td>'; }).join('') + '</tr>';
          }).join('') + '</tbody></table></div>';
        html.push({ raw: t });
        continue;
      }
      html.push(lines[i]); i += 1;
    }
    html.forEach(function (line) {
      if (line && line.raw !== undefined) { flush(); out.push(line.raw); return; }
      if (/^```/.test(line)) {
        if (fence === null) { flush(); fence = []; }
        else { out.push('<pre><code>' + esc(fence.join('\n')) + '</code></pre>'); fence = null; }
        return;
      }
      if (fence !== null) { fence.push(line); return; }
      var h = line.match(/^(#{1,6})\s+(.*)$/);
      if (h) { flush(); out.push('<h' + h[1].length + '>' + inline(h[2]) + '</h' + h[1].length + '>'); return; }
      if (/^\s*(---|\*\*\*)\s*$/.test(line)) { flush(); out.push('<hr>'); return; }
      if (/^>\s?/.test(line)) { flush(); out.push('<blockquote>' + inline(line.replace(/^>\s?/, '')) + '</blockquote>'); return; }
      var li = line.match(/^\s*([-*]|\d+\.)\s+(.*)$/);
      if (li) {
        var want = /^\d/.test(li[1]) ? 'ol' : 'ul';
        if (list !== want) { flush(); out.push('<' + want + '>'); list = want; }
        out.push('<li>' + inline(li[2]) + '</li>');
        return;
      }
      if (!line.trim()) { flush(); return; }
      if (list) { out.push('</' + list + '>'); list = null; }
      para.push(line.trim());
    });
    flush();
    return out.join('\n');
  }
  /* The way back: the rich view is edited in place, so what the reader sees is
     what gets serialised. Markdown stays the stored form — it is what rides in
     the responses JSON and what Revert compares against — so every keystroke in
     rich mode walks the DOM back to markdown. Covers the same subset mdToHtml
     renders; anything else the browser produces (a stray <div>, a <b>) is
     normalised to its markdown equivalent rather than passed through. */
  function mdInline(node) {
    var out = '';
    Array.prototype.forEach.call(node.childNodes, function (n) {
      if (n.nodeType === 3) { out += n.nodeValue.replace(/\s+/g, ' '); return; }
      if (n.nodeType !== 1) return;
      var tag = n.nodeName.toLowerCase(), inner = mdInline(n);
      if (tag === 'br') out += '\n';
      else if (tag === 'strong' || tag === 'b') out += inner.trim() ? '**' + inner.trim() + '**' : '';
      else if (tag === 'em' || tag === 'i') out += inner.trim() ? '*' + inner.trim() + '*' : '';
      else if (tag === 'code') out += '`' + inner + '`';
      else if (tag === 'a') out += '[' + inner + '](' + (n.getAttribute('href') || '') + ')';
      else out += inner;
    });
    return out;
  }
  function htmlToMd(root) {
    var out = [];
    Array.prototype.forEach.call(root.childNodes, function (n) {
      if (n.nodeType === 3) { if (n.nodeValue.trim()) out.push(n.nodeValue.trim()); return; }
      if (n.nodeType !== 1) return;
      var tag = n.nodeName.toLowerCase();
      if (/^h[1-6]$/.test(tag)) out.push(new Array(+tag[1] + 1).join('#') + ' ' + mdInline(n).trim());
      else if (tag === 'hr') out.push('---');
      else if (tag === 'blockquote') out.push(htmlToMd(n).split('\n').map(function (l) {
        return l.trim() ? '> ' + l : '>';
      }).join('\n'));
      else if (tag === 'pre') out.push('```\n' + (n.textContent || '').replace(/\n$/, '') + '\n```');
      else if (tag === 'ul' || tag === 'ol') {
        var i = 0;
        Array.prototype.forEach.call(n.children, function (li) {
          i += 1;
          out.push((tag === 'ol' ? i + '. ' : '- ') + mdInline(li).trim());
        });
      } else if (tag === 'table' || (tag === 'div' && n.querySelector('table'))) {
        var tbl = tag === 'table' ? n : n.querySelector('table');
        var rows = tbl.querySelectorAll('tr'), lines = [], cols = 0;
        Array.prototype.forEach.call(rows, function (tr, ri) {
          var cells = Array.prototype.map.call(tr.children, function (td) {
            return mdInline(td).trim().replace(/\|/g, '\\|');
          });
          cols = Math.max(cols, cells.length);
          lines.push('| ' + cells.join(' | ') + ' |');
          if (ri === 0) lines.push('| ' + new Array(cells.length + 1).join('--- |').replace(/ \|$/, ' |').split('--- |').join('--- | ').trim());
        });
        if (lines[1]) lines[1] = '|' + new Array(cols + 1).join(' --- |');
        out.push(lines.join('\n'));
      } else if (tag === 'div' && n.children.length && !mdInline(n).trim()) out.push(htmlToMd(n));
      else { var t = mdInline(n).trim(); if (t) out.push(t); }
    });
    return out.join('\n\n');
  }

  /* ── the editor ──────────────────────────────────────────────────────────
     Ported from the project-lightbox Description field in a sibling app
     (its src/components/ui/{MarkdownEditor,RichTextEditor,MiniTocSidebar}.tsx).
     That app runs TipTap through a bundler; a brief is one file opened from disk, so
     the behaviour is rebuilt on contenteditable + execCommand. What is copied
     deliberately: click the rendered text to start editing with the caret where
     you clicked, a sticky toolbar whose buttons light up for the caret's
     context, a Raw MD / Rich editor toggle over the same markdown string, and a
     hover-to-expand heading rail of thin bars.

     ponytail: execCommand is deprecated and still the only zero-dependency way
     to format a contenteditable selection. Swap for Selection/Range surgery the
     day a browser drops it — apply() is the only caller. */

  /* MiniTocSidebar.tsx:39 — width per level, non-linear so H1 and H2 read
     as different things at a glance. */
  var TOC_BAR = [22, 15, 9, 6, 4, 3];
  /* MiniTocSidebar.tsx:79 — the active heading is the last one whose top
     edge is at or above the fold. */
  var TOC_FOLD = 112;

  var DOC_TOOLS = [
    { block: 'h1', label: 'H1', tip: 'Heading 1', is: 'h1' },
    { block: 'h2', label: 'H2', tip: 'Heading 2', is: 'h2' },
    { block: 'h3', label: 'H3', tip: 'Heading 3', is: 'h3' },
    { sep: true },
    { cmd: 'bold', label: 'B', tip: 'Bold (⌘B)', cls: 'b', state: 'bold' },
    { cmd: 'italic', label: 'I', tip: 'Italic (⌘I)', cls: 'i', state: 'italic' },
    { cmd: 'strikeThrough', label: 'S', tip: 'Strikethrough', cls: 's', state: 'strikeThrough' },
    { code: true, label: '‹›', tip: 'Inline code', is: 'code' },
    { block: 'pre', label: '{ }', tip: 'Code block', is: 'pre' },
    { sep: true },
    { cmd: 'insertUnorderedList', label: '•', tip: 'Bullet list', state: 'insertUnorderedList' },
    { cmd: 'insertOrderedList', label: '1.', tip: 'Ordered list', state: 'insertOrderedList' },
    { sep: true },
    { block: 'blockquote', label: '❝', tip: 'Blockquote (>)', is: 'blockquote' },
    { block: 'p', label: '¶', tip: 'Body text', is: 'p' },
    { hr: true, label: '—', tip: 'Horizontal rule (---)' },
    { sep: true },
    { link: true, label: '🔗', tip: 'Add link (⌘K)', is: 'a' },
    { unlink: true, label: '⛓', tip: 'Remove link' },
    { table: true, label: '▦', tip: 'Table controls' },
    { sep: true },
    { copy: true, label: '⧉', tip: 'Copy as markdown' }
  ];
  var TABLE_TOOLS = [
    { act: 'insert', label: 'Insert 3×3', tip: 'Insert 3×3 table' },
    { act: 'rowAfter', label: '+ row', tip: 'Add row below' },
    { act: 'rowDel', label: '− row', tip: 'Delete row' },
    { act: 'colAfter', label: '+ col', tip: 'Add column right' },
    { act: 'colDel', label: '− col', tip: 'Delete column' }
  ];

  /* MarkdownEditor.tsx:355 — resolve a click to a plain-text character
     offset in the rendered document. the source app needs this because its preview
     and its editor are two different DOMs; here they are the same DOM, so the offset
     round-trips exactly rather than approximately. */
  function offsetFromPoint(root, x, y) {
    var node = null, off = 0;
    if (document.caretPositionFromPoint) {
      var pos = document.caretPositionFromPoint(x, y);
      if (pos) { node = pos.offsetNode; off = pos.offset; }
    } else if (document.caretRangeFromPoint) {
      var rg = document.caretRangeFromPoint(x, y);
      if (rg) { node = rg.startContainer; off = rg.startOffset; }
    }
    if (!node || !root.contains(node)) return null;
    var count = 0, w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT), n = w.nextNode();
    while (n) {
      if (n === node) return count + off;
      count += (n.nodeValue || '').length;
      n = w.nextNode();
    }
    return null;
  }
  function caretToOffset(root, offset) {
    var count = 0, w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT), n = w.nextNode();
    while (n) {
      var len = (n.nodeValue || '').length;
      if (count + len >= offset) {
        var r = document.createRange();
        r.setStart(n, Math.max(0, Math.min(len, offset - count)));
        r.collapse(true);
        var s = window.getSelection();
        s.removeAllRanges(); s.addRange(r);
        return true;
      }
      count += len; n = w.nextNode();
    }
    return false;
  }

  Array.prototype.forEach.call(document.querySelectorAll('[data-doc]'), function (doc) {
    var key = doc.dataset.doc;
    var label = doc.dataset.docLabel || 'document';
    var view = document.createElement('div'); view.className = 'doc-view';
    view.setAttribute('role', 'textbox');
    view.setAttribute('aria-label', label + ' — click the text to edit it');
    var ta = document.createElement('textarea'); ta.className = 'doc-src';
    ta.setAttribute('aria-label', 'Edit ' + label + ' markdown source');
    ta.spellcheck = false;
    var bar = document.createElement('div'); bar.className = 'doc-bar';
    var tools = document.createElement('div'); tools.className = 'doc-tools';
    var tblbar = document.createElement('div'); tblbar.className = 'doc-tablebar'; tblbar.hidden = true;
    var done = document.createElement('button'); done.type = 'button'; done.className = 'doc-btn doc-done';
    done.textContent = 'Done';
    var srcBtn = document.createElement('button'); srcBtn.type = 'button'; srcBtn.className = 'doc-btn doc-srcbtn';
    var revert = document.createElement('button'); revert.type = 'button'; revert.className = 'doc-btn doc-revert';
    revert.textContent = 'Revert';
    var flag = document.createElement('span'); flag.className = 'doc-flag';
    var hint = document.createElement('span'); hint.className = 'doc-hint'; hint.textContent = 'Click the text to edit';
    var rail = document.createElement('div'); rail.className = 'doc-rail';
    var bars = document.createElement('div'); bars.className = 'doc-bars';
    var fly = document.createElement('div'); fly.className = 'doc-fly'; fly.hidden = true;
    rail.appendChild(fly); rail.appendChild(bars);
    rail.setAttribute('aria-label', 'Headings in ' + label);

    function editing() { return doc.classList.contains('editing'); }
    function raw() { return doc.classList.contains('raw'); }
    function current() {
      var e = state.edits[key];
      return e == null ? docSource(doc) : e;
    }
    function store(md) {
      state.edits[key] = md; save();
      var changed = md !== docSource(doc);
      flag.textContent = changed ? 'edited' : '';
      doc.classList.toggle('is-edited', changed);
      revert.hidden = !changed;
    }
    function inTable() {
      var s = window.getSelection();
      if (!s || !s.rangeCount) return null;
      var n = s.getRangeAt(0).startContainer;
      n = n.nodeType === 1 ? n : n.parentNode;
      return n && n.closest ? n.closest('td, th') : null;
    }
    function activeTag(tag) {
      var s = window.getSelection();
      if (!s || !s.rangeCount || !view.contains(s.anchorNode)) return false;
      var n = s.anchorNode;
      n = n.nodeType === 1 ? n : n.parentNode;
      return !!(n && n.closest && n.closest(tag) && view.contains(n.closest(tag)));
    }
    /* the source app lights its buttons from editor.isActive(); execCommand gives the same
       answer for inline marks, and the caret's ancestors give it for blocks. */
    function syncTools() {
      Array.prototype.forEach.call(tools.children, function (b) {
        if (!b.dataset.i) return;
        var t = DOC_TOOLS[+b.dataset.i], on = false;
        try {
          if (t.state) on = document.queryCommandState(t.state);
          else if (t.is) on = activeTag(t.is);
        } catch (err) { on = false; }
        b.classList.toggle('on', !!on);
      });
      var cell = inTable();
      if (cell) tblbar.hidden = false;      /* RichTextEditor.tsx:502 — the table
                                               controls open themselves when the caret
                                               lands in a table, and close by hand. */
    }
    function apply(t) {
      if (!editing() || raw()) return;
      view.focus();
      if (t.block) {
        /* Toggle back to a paragraph when the caret is already in that block,
           the way the source app's toggleHeading does. */
        document.execCommand('formatBlock', false, t.is && activeTag(t.is) && t.block !== 'p' ? 'p' : t.block);
      } else if (t.code) {
        var s = window.getSelection();
        if (s && !s.isCollapsed) {
          if (activeTag('code')) document.execCommand('removeFormat', false, null);
          else {
            var c = document.createElement('code');
            try { s.getRangeAt(0).surroundContents(c); }
            catch (err) { document.execCommand('insertHTML', false, '<code>' + esc(s.toString()) + '</code>'); }
          }
        }
      } else if (t.hr) document.execCommand('insertHorizontalRule', false, null);
      else if (t.link) {
        var href = window.prompt('Link URL');
        if (href) document.execCommand('createLink', false, href);
      } else if (t.unlink) document.execCommand('unlink', false, null);
      else if (t.table) { tblbar.hidden = !tblbar.hidden; return; }
      else if (t.copy) {
        copyText(current(), 'Markdown copied');
        return;
      } else document.execCommand(t.cmd, false, null);
      onRichInput();
    }
    function tableAct(act) {
      view.focus();
      var cell = inTable();
      if (act === 'insert') {
        var rows = [], head = [];
        for (var c = 0; c < 3; c++) head.push('<th>Head ' + (c + 1) + '</th>');
        for (var r = 0; r < 2; r++) rows.push('<tr><td> </td><td> </td><td> </td></tr>');
        document.execCommand('insertHTML', false,
          '<div class="tblwrap nopin"><table><thead><tr>' + head.join('') + '</tr></thead><tbody>' +
          rows.join('') + '</tbody></table></div><p><br></p>');
      } else if (cell) {
        var tr = cell.parentNode, tbl = cell.closest('table');
        var idx = Array.prototype.indexOf.call(tr.children, cell);
        if (act === 'rowAfter') {
          var nr = tr.cloneNode(true);
          Array.prototype.forEach.call(nr.children, function (td) { td.textContent = ' '; });
          tr.parentNode.insertBefore(nr, tr.nextSibling);
        } else if (act === 'rowDel') { if (tbl.querySelectorAll('tr').length > 2) tr.remove(); }
        else if (act === 'colAfter') {
          Array.prototype.forEach.call(tbl.querySelectorAll('tr'), function (row) {
            var ref = row.children[idx];
            var cellEl = document.createElement(ref && ref.tagName === 'TH' ? 'th' : 'td');
            cellEl.textContent = ' ';
            row.insertBefore(cellEl, ref ? ref.nextSibling : null);
          });
        } else if (act === 'colDel') {
          Array.prototype.forEach.call(tbl.querySelectorAll('tr'), function (row) {
            if (row.children.length > 1 && row.children[idx]) row.children[idx].remove();
          });
        }
      }
      onRichInput();
    }
    function onRichInput() {
      store(htmlToMd(view));
      buildRail();
      syncTools();
    }

    /* ── heading rail (the source app's MiniTocSidebar) ──
       Thin bars, one per heading, width by level; hovering the rail opens a
       flyout of titles to its left; the bar for the heading you are reading is
       highlighted. */
    var entries = [];
    function buildRail() {
      entries = [];
      var hs = view.querySelectorAll('h1, h2, h3, h4, h5, h6');
      bars.innerHTML = ''; fly.innerHTML = '';
      Array.prototype.forEach.call(hs, function (h, i) {
        if (!h.id) h.id = key + '-h' + i;
        var lvl = +h.nodeName[1];
        var text = h.textContent.trim();
        var b = document.createElement('div'); b.className = 'doc-bar-i';
        var line = document.createElement('span'); line.className = 'doc-bar-l';
        line.style.width = TOC_BAR[Math.min(lvl, 6) - 1] + 'px';
        b.appendChild(line);
        b.setAttribute('aria-label', 'Scroll to ' + text);
        var a = document.createElement('button');
        a.type = 'button'; a.className = 'doc-fly-i lv' + lvl; a.textContent = text;
        function go(e) { e.preventDefault(); e.stopPropagation(); h.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
        b.addEventListener('click', go); a.addEventListener('click', go);
        b.addEventListener('mouseenter', function () { hover(i, true); });
        a.addEventListener('mouseenter', function () { hover(i, true); });
        bars.appendChild(b); fly.appendChild(a);
        entries.push({ h: h, bar: b, item: a });
      });
      rail.hidden = !entries.length;
      markActive();
    }
    function hover(i, on) {
      entries.forEach(function (e, j) {
        e.bar.classList.toggle('hov', on && j === i);
        e.item.classList.toggle('hov', on && j === i);
      });
    }
    function markActive() {
      if (!entries.length) return;
      var hit = 0;
      entries.forEach(function (e, i) {
        if (e.h.getBoundingClientRect().top <= TOC_FOLD) hit = i;
      });
      entries.forEach(function (e, i) {
        e.bar.classList.toggle('on', i === hit);
        e.item.classList.toggle('on', i === hit);
      });
    }
    var flyTimer = null;
    rail.addEventListener('mouseenter', function () { clearTimeout(flyTimer); fly.hidden = false; });
    rail.addEventListener('mouseleave', function () {
      /* 180ms, MiniTocSidebar.tsx:112 — long enough to cross the gap from
         the rail to the flyout without it vanishing. */
      flyTimer = setTimeout(function () { fly.hidden = true; hover(-1, false); }, 180);
    });
    window.addEventListener('scroll', markActive, { passive: true });

    function paint() {
      var changed = current() !== docSource(doc);
      view.innerHTML = mdToHtml(current());
      flag.textContent = changed ? 'edited' : '';
      doc.classList.toggle('is-edited', changed);
      revert.hidden = !changed;
      srcBtn.textContent = raw() ? 'Rich editor' : 'Raw MD';
      srcBtn.hidden = !editing();
      done.hidden = !editing();
      hint.hidden = editing();
      tools.hidden = !editing() || raw();
      tblbar.hidden = true;
      view.contentEditable = editing() && !raw() ? 'true' : 'false';
      if (editing() && raw()) { ta.style.height = 'auto'; ta.style.height = ta.scrollHeight + 'px'; }
      buildRail();
    }
    /* MarkdownEditor.tsx:463 — the reading view IS the edit affordance. No
       Edit button: click the sentence you want to change and the caret is there. */
    view.addEventListener('click', function (e) {
      if (editing()) return;
      if (e.target.closest && e.target.closest('a')) return;      /* let links be links */
      var off = offsetFromPoint(view, e.clientX, e.clientY);
      doc.classList.add('editing');
      paint();
      view.focus();
      if (off != null) caretToOffset(view, off);
      syncTools();
    });
    view.addEventListener('keydown', function (e) {
      if (!editing() && e.key === 'Enter') { doc.classList.add('editing'); paint(); view.focus(); return; }
      if (e.key === 'Escape' && editing()) { e.stopPropagation(); finish(); return; }
      if (!(e.metaKey || e.ctrlKey)) return;
      var k = e.key.toLowerCase();
      if (k === 'k') { e.preventDefault(); apply({ link: true }); }
      else if (k === 'enter' || k === 's') { e.preventDefault(); finish(); }
      else if (k === 'b' || k === 'i') setTimeout(onRichInput, 0);
    });
    function finish() {
      if (!raw()) store(htmlToMd(view));
      doc.classList.remove('editing', 'raw');
      paint();
    }
    done.addEventListener('click', finish);
    /* Both modes edit the same markdown string, so the switch is a conversion
       either way and never a merge. */
    srcBtn.addEventListener('click', function () {
      if (raw()) { doc.classList.remove('raw'); paint(); view.focus(); }
      else { store(htmlToMd(view)); ta.value = current(); doc.classList.add('raw'); paint(); ta.focus(); }
    });
    revert.addEventListener('click', function () {
      delete state.edits[key]; save(); ta.value = docSource(doc); paint();
      toast('Reverted to the original');
    });
    view.addEventListener('input', onRichInput);
    view.addEventListener('keyup', syncTools);
    view.addEventListener('mouseup', syncTools);
    ta.addEventListener('input', function () {
      store(ta.value);
      ta.style.height = 'auto'; ta.style.height = ta.scrollHeight + 'px';
    });

    DOC_TOOLS.forEach(function (t, i) {
      if (t.sep) { var s = document.createElement('span'); s.className = 'doc-sep'; tools.appendChild(s); return; }
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'doc-tool' + (t.cls ? ' t-' + t.cls : '');
      b.textContent = t.label; b.dataset.tip = t.tip; b.dataset.i = i;
      /* mousedown, not click: the caret must still be in the document when the
         command runs, and focusing a button collapses the selection. */
      b.addEventListener('mousedown', function (e) { e.preventDefault(); apply(t); });
      tools.appendChild(b);
    });
    TABLE_TOOLS.forEach(function (t) {
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'doc-tool'; b.textContent = t.label; b.dataset.tip = t.tip;
      b.addEventListener('mousedown', function (e) { e.preventDefault(); tableAct(t.act); });
      tblbar.appendChild(b);
    });
    var tclose = document.createElement('button');
    tclose.type = 'button'; tclose.className = 'doc-tool'; tclose.textContent = '×'; tclose.dataset.tip = 'Hide table controls';
    tclose.addEventListener('mousedown', function (e) { e.preventDefault(); tblbar.hidden = true; });
    tblbar.appendChild(tclose);

    bar.appendChild(tools);
    bar.appendChild(hint); bar.appendChild(flag); bar.appendChild(revert);
    bar.appendChild(srcBtn); bar.appendChild(done);
    doc.appendChild(bar); doc.appendChild(tblbar); doc.appendChild(view); doc.appendChild(ta); doc.appendChild(rail);
    ta.value = current();
    paint();
  });

  /* ── syncing a published brief ───────────────────────────────────────────
     A brief that is published is read on more than one device, so what the
     reader ticks, answers and comments has to leave the browser that typed it.
     The local store stays the source of truth -- whether that store is this
     browser's localStorage or the host page's, which is the storage seam's
     business and not this section's. This whole section is layered OVER the
     local path and never replaces it: an unpublished brief, a file:// copy
     and a reader with no network all behave exactly as they did before, and a
     failed write never blocks or discards a local one. A brief that needs the
     network to hold a comment has stopped being a document.

     THE DOCUMENT DOES NOT MAKE THE REQUEST. Publish serves it inside a sandboxed
     frame with no allow-same-origin, so anything issued from here carries a null
     origin and is not the same-origin call the review endpoint expects. The host
     page issues the write. This module owns the protocol instead: what to send,
     which `base` to send it against, and how to fold the reply back in.

     Nothing at all happens unless <body> carries data-publish-slug. That gate is
     the first thing this section reads, so an unpublished brief posts no message
     and makes no request of any kind. */
  /* PUB, FRAMED, HOSTED and `host` are declared at the storage seam at the top
     of this file, because the seam needs them before init() ever runs. By the
     time anything here executes, `host` is already pinned (or the wait timed out
     and this whole section stays idle, because flush() will not run without it). */
  var base = null;        // the last store Publish returned to THIS browser
  /* The correlation id is a STRING on the wire, because the host normalises every
     id it echoes back to one (host-protocol.ts). A number here would be compared
     against "1" with !==, never match, and every reply would be dropped. */
  var seq = 0, inflight = '', mode = '', needWrite = false;
  var pending = false, syncTimer = null, dropTimer = null, capWarned = false;
  var failures = 0;

  /* One shape for both sides of a merge, so a blob written by an older runtime
     (no drafts, no bakedGone) compares equal to one that simply has none. */
  function shape(o) {
    o = o || {};
    return {
      ticks: o.ticks || {}, answers: o.answers || {}, notes: o.notes || {},
      edits: o.edits || {}, bakedGone: o.bakedGone || {},
      comments: (Array.isArray(o.comments) ? o.comments : []).map(stripLocal),
      drafts: Array.isArray(o.drafts) ? o.drafts : [],
      lastEdit: o.lastEdit || 0
    };
  }
  /* noAnchor records that THIS device could not find a comment's quoted text.
     It is device-local: another device where the text does exist must still
     highlight it, and reanchor() recomputes it on every load anyway. Stripping
     it here keeps it out of the signature, out of a merge, and out of what goes
     up -- so a miss on one device neither travels nor forces an extra write. */
  function stripLocal(c) {
    if (!c || !c.noAnchor) return c;
    var out = {}, k;
    for (k in c) if (k !== 'noAnchor') out[k] = c[k];
    return out;
  }
  function contentSig(o) {
    var x = shape(o);
    return JSON.stringify([x.ticks, x.answers, x.notes, x.edits, x.bakedGone, x.comments, x.drafts]);
  }
  /* ponytail: a union, so nothing is ever deleted by a merge — a key one device
     removed comes back from the other. That matches what the server does when it
     has no base to compare against, and losing a comment is the failure this
     ticket exists to prevent. Add tombstones if deletion ever has to propagate. */
  function mergeMaps(win, lose) { return Object.assign({}, lose, win); }
  function mergeList(win, lose, keyOf) {
    var out = [], at = {};
    lose.concat(win).forEach(function (item) {
      var k = keyOf(item);
      if (k in at) out[at[k]] = item; else { at[k] = out.length; out.push(item); }
    });
    return out;
  }
  /* Two devices can each carry the same comment on, so neither thread is a
     prefix of the other and taking the longer array silently drops one side's
     follow-ups. Merge by identity instead: the same (at, text) is the same
     message, and the order is the order they were written in. */
  function mergeThreads(a, b) {
    var seen = {}, out = [];
    (a || []).concat(b || []).forEach(function (m) {
      if (!m) return;
      var k = (m.at || '') + '\u0000' + (m.text || '');
      if (k in seen) return;
      seen[k] = 1; out.push(m);
    });
    return out.sort(function (x, y) {
      return String(x.at || '') < String(y.at || '') ? -1 : String(x.at || '') > String(y.at || '') ? 1 : 0;
    });
  }
  function mergeComments(win, lose) {
    var threads = {};
    win.concat(lose).forEach(function (c) {
      threads[c.cid] = mergeThreads(threads[c.cid], c.thread);
    });
    return mergeList(win, lose, function (c) { return c.cid; }).map(function (c) {
      var t = threads[c.cid];
      if (t && t.length) c.thread = t;
      return c;
    });
  }
  /* Both devices apply the same rule to the same pair, so both land on the same
     answer: the newer blob wins every field it and the older one both carry, and
     everything either of them holds alone survives. A tie goes to the server copy,
     which is how the server itself breaks a tie. */
  function mergeBlobs(mineRaw, theirsRaw) {
    var mine = shape(mineRaw), theirs = shape(theirsRaw);
    var win = theirs.lastEdit >= mine.lastEdit ? theirs : mine;
    var lose = win === theirs ? mine : theirs;
    return {
      ticks: mergeMaps(win.ticks, lose.ticks),
      answers: mergeMaps(win.answers, lose.answers),
      notes: mergeMaps(win.notes, lose.notes),
      edits: mergeMaps(win.edits, lose.edits),
      bakedGone: mergeMaps(win.bakedGone, lose.bakedGone),
      comments: mergeComments(win.comments, lose.comments),
      drafts: mergeList(win.drafts, lose.drafts, function (d) { return d.key; }),
      lastEdit: Math.max(mine.lastEdit, theirs.lastEdit)
    };
  }

  /* Put what arrived from elsewhere on the page. Only the surfaces that can be
     refreshed without touching the reader: a box being typed in is left alone,
     because overwriting it mid-sentence is worse than being a moment behind.
     ponytail: an edited [data-doc] block is not repainted — it picks the remote
     version up on the next load. Repaint it here if two people ever edit one
     document block at the same time and complain. */
  function applyRemote() {
    document.querySelectorAll('textarea.answer').forEach(function (ta) {
      var q = ta.closest('section.q');
      if (!q || ta === document.activeElement) return;
      ta.value = state.answers[q.dataset.q] || '';
    });
    Array.prototype.forEach.call(document.querySelectorAll('textarea[data-note]'), function (ta) {
      if (ta === document.activeElement) return;
      ta.value = state.notes[ta.dataset.note] || '';
    });
    sections.forEach(function (sec) {
      var box = sec.querySelector('.tick input');
      if (!box) return;
      box.checked = !!state.ticks[idOf(sec)];
      sec.classList.toggle('done', box.checked);
    });
    renderProgress();
    applyReplies();
    reanchor();
  }

  function adopt(store) {
    base = store || {};
    var theirs = null;
    try { theirs = base[KEY] ? JSON.parse(base[KEY]) : null; } catch (e) { theirs = null; }
    /* Publish is holding nothing for this brief yet, so there is nothing to fold
       in — but there is something to send, and only if this browser actually has
       something. An empty brief does not need a commit to say it is empty. */
    if (!theirs) { needWrite = contentSig(state) !== contentSig(null); return; }
    /* A device with a skewed clock -- or a reader editing the blob -- can put
       lastEdit far in the future. Math.max would adopt it, every device would
       clamp forward to it, and the poisoned value would win every shared field
       for good. Five minutes is the tolerance: wider than the drift an
       unsynchronised consumer clock actually shows, and narrow enough that any
       honest device can write again within five minutes. */
    theirs.lastEdit = Math.min(theirs.lastEdit || 0, Date.now() + 5 * 60 * 1000);
    var was = contentSig(state), theirSig = contentSig(theirs);
    var merged = mergeBlobs(state, theirs);
    Object.keys(merged).forEach(function (k) { if (k !== 'lastEdit') state[k] = merged[k]; });
    var now = contentSig(state);
    /* The merge produced something Publish does not hold. It has to go back with
       a HIGHER lastEdit than either side, or the next write ties and the server
       keeps its own copy — silently throwing the merge away. */
    needWrite = now !== theirSig;
    if (needWrite) state.lastEdit = merged.lastEdit + 1;
    else state.lastEdit = merged.lastEdit;
    persist();
    if (now !== was) applyRemote();
  }

  /* ── read before you write ───────────────────────────────────────────────
     A brief key has no prefix, so the server merges it WHOLE: the higher
     lastEdit wins the entire blob and the other one is gone. Writing straight
     out therefore destroys whatever the other device wrote while this one was
     not looking — which is how a brief loses a comment.

     So every round is a probe and then a write. The probe sends the store back
     exactly as it was last received, which the server's own tie rule resolves to
     the copy it already holds: it is a read wearing a write's clothes, it changes
     no bytes, and the git driver has nothing to commit. What comes back is folded
     in locally, and only then does the merged result go up — with a lastEdit
     above both sides, so the write cannot tie and be discarded.

     ponytail: nothing polls. A device hears what the others wrote on its next
     save or its next load, which is when it is about to overwrite them and the
     only moment it has to matter. Add an interval or a socket if two people ever
     sit in one brief together and want to watch each other type. */
  function post(next, kind) {
    mode = kind;
    inflight = String(++seq);
    window.parent.postMessage({ v: 1, type: 'brief-sync-put', id: inflight,
      briefId: BRIEF, slug: PUB, base: base, next: next }, host);
    /* A host that never answers must not wedge the sync for the rest of the
       session, so an unanswered write is treated as a lost one: base is left
       alone, and the next round re-applies the same intent against it. */
    clearTimeout(dropTimer);
    dropTimer = setTimeout(function () {
      if (!inflight) return;
      inflight = ''; pending = true; schedule();
    }, 15000);
  }
  function flush() {
    if (!host || !pending || inflight) return;
    pending = false;
    post(Object.assign({}, base), 'probe');
  }
  function write() {
    /* `next` carries every key the store handed back, not just this brief's.
       Not because omitting one would delete it -- the server merges the UNION of
       the client's keys and the stored ones, and a key only it holds is returned
       unchanged, which is why the opening probe can send an empty `next` and
       change nothing. It is so a key this device merged is written back with the
       merged value rather than left at whatever the server still holds. */
    var next = Object.assign({}, base);
    next[KEY] = JSON.stringify(Object.assign({}, state,
      { comments: state.comments.map(stripLocal) }));
    post(next, 'write');
  }
  function schedule(delay) {
    if (!host) { pending = true; return; }
    pending = true;
    clearTimeout(syncTimer);
    syncTimer = setTimeout(flush, delay || 1200);
  }
  function syncSoon() { if (HOSTED) schedule(); }

  if (HOSTED) {
    window.addEventListener('message', function (e) {
      var d = e.data;
      if (!d || d.v !== 1 || e.source !== window.parent) return;
      if (e.origin !== host || d.type !== 'brief-sync-res' || d.id !== inflight) return;
      var was = mode;
      inflight = '';
      clearTimeout(dropTimer);
      /* A refused round is a round that still has to happen. Without this the
         sync stalls until the reader's next save or an `online` event, with
         nothing on screen saying so. Backed off to 1.2s, 2.4s ... 60s, so a
         host that is failing persistently is not hammered. */
      if (!d.ok) { failures++; schedule(Math.min(1200 * Math.pow(2, failures - 1), 60000)); return; }
      failures = 0;
      if (d.overCap && !capWarned) {
        capWarned = true;
        toast('This brief has passed its size limit on Publish. The change was still saved.');
      }
      adopt(d.store);
      /* The probe has told us what is up there. Send the merge only if it says
         something the server does not already hold. */
      if (was === 'probe' && needWrite) write();
      else if (needWrite || pending) schedule();
    });
    window.addEventListener('online', function () { pending = true; flush(); });
    /* The hello went out before init() ran, so the very first round is due now.
       A host that never answered leaves `host` null and flush() a no-op, which is
       the idle state the protocol asks for. */
    if (host) { pending = true; flush(); }
  }
  }

  /* ── nothing runs until the state is here ────────────────────────────────
     Unframed, get() answers synchronously and the first paint is already right.
     Hosted, the state is a round trip away — so init() is HELD until it arrives
     rather than being run twice against two different states. Holding it is what
     makes the hosted path identical to the local one: every load-time migration,
     every restored answer and every painted highlight runs once, in order, with
     the real state already in hand.

     The gap between the browser painting the HTML and init() running is the
     dangerous part, because the answer boxes and tick boxes are plain markup and
     are answerable before any script touches them. `inert` says "readable, not
     answerable yet" with one native attribute and no overlay, and it is removed
     whichever way the wait ends. A browser too old to know the attribute ignores
     it and behaves as it does today. */
  function boot() {
    BRIEF = document.body.dataset.briefId || location.pathname;
    KEY = 'brief:' + BRIEF;
    PUB = document.body.dataset.publishSlug || '';
    FRAMED = !!(window.parent && window.parent !== window);
    HOSTED = !!(PUB && FRAMED);
    if (!HOSTED) { init(); return; }
    document.body.inert = true;
    var started = false, wait, helloTimer, hellos = 0;
    function start() {
      if (started) return;
      started = true;
      clearTimeout(wait);
      clearTimeout(helloTimer);
      document.body.inert = false;
      init();
    }
    /* No init came. The brief still opens, so the reader is never left staring at
       a document that will not answer — but hostStore stays null, so get() finds
       nothing and put() keeps nothing, and no message is ever sent to a page that
       does not speak this protocol. Empty and idle, with one line saying so. */
    wait = setTimeout(function () {
      warnNoPersist('The page holding this brief has not answered it, so nothing you tick, '
        + 'answer or comment here is being kept — it will be gone when you reload or close '
        + 'the page. Use "Download responses" before you leave, which needs no storage.');
      start();
    }, 8000);
    window.addEventListener('message', function (e) {
      var d = e.data;
      if (!d || d.v !== 1 || e.source !== window.parent || d.type !== 'brief-sync-init') return;
      /* The host names its own origin by speaking first, and everything after this
         goes to that origin alone. The document never has to be told an address,
         and never broadcasts the reader's answers to whoever framed it. Accepting
         the FIRST init is only safe because Publish serves the brief with
         `Content-Security-Policy: ... frame-ancestors 'self'`, so no third-party
         page can frame it and speak first. That header is a load-bearing
         dependency of this code, not an incidental one: drop it and any origin
         could frame the document and harvest the answers. */
      /* `started`, not just `host`: once the wait above has given up and opened the
         brief, this document is running with no store and the reader has been told
         so. Adopting a store now would replace an empty in-memory state's home with
         the reader's real saved answers, and the next tick would persist the empty
         state straight over them. Losing the sync for this visit is recoverable;
         losing the answers is not. The hello retries below are what keep this
         branch rare -- a host that speaks at all is heard well before the wait
         ends. */
      if (host || started) return;
      host = e.origin;
      hostStore = normaliseStore(d.state);
      start();
      /* A deep link to the host page: its `#fragment` rides on the init. Set only
         after start(), so the hashchange listener init() installs does the reveal
         and scroll, once. The frame's own hash wins if it already has one. */
      if (typeof d.hash === 'string' && d.hash.charAt(0) === '#' && !location.hash) location.hash = d.hash;
    });
    /* Carries no reader data — it only says this document is ready and asks the
       host to name itself. Answers and comments go to a known origin, never to '*'.

       Re-sent until an init lands, because ONE hello can be lost outright: the host
       installs its listener in an effect after hydration, while the browser starts
       fetching these bytes during the server render, so a warm cache posts this
       before there is anything listening. Every send is identical and carries no
       state, and the host answers each one with the same init, of which this
       document keeps the first. It stops as soon as the brief starts, either way. */
    function hello() {
      window.parent.postMessage({ v: 1, type: 'brief-sync-hello', briefId: BRIEF, slug: PUB }, '*');
      if (++hellos < 8) helloTimer = setTimeout(hello, 1000);
    }
    hello();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();

})();

/* ── Definition links and the gutter contents rail ────────────────────────
   Both build themselves after load from what the page already has, so an
   author writes nothing extra: the Definitions block drives the links, and the
   part and section headings drive the rail. Both run after the brief is
   interactive and neither can block it. */
(function () {
  'use strict';
  if (window.__briefExtras) return;
  window.__briefExtras = true;

  /* Tooltip engine, bundled from the tooltip skill's tooltip-core.ts with
     esbuild (iife). Regenerate from the skill rather than editing it here. */
  var TT = (function () {
var __briefTip = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

  // tooltip-core.ts
  var tooltip_core_exports = {};
  __export(tooltip_core_exports, {
    attach: () => attach,
    configure: () => configure,
    onResolve: () => onResolve
  });

  // solve.ts
  var OPP = {
    top: "bottom",
    bottom: "top",
    left: "right",
    right: "left"
  };
  var AXIS = { top: "y", bottom: "y", left: "x", right: "x" };
  var clamp = (v, lo, hi) => v < lo ? lo : v > hi ? hi : v;
  function candidates(pref) {
    const perp = AXIS[pref] === "y" ? ["right", "left"] : ["bottom", "top"];
    return [pref, OPP[pref], perp[0], perp[1]];
  }
  function rawPos(p, a, w, h, off) {
    const cx = a.left + a.width / 2;
    const cy = a.top + a.height / 2;
    if (p === "top") return { x: cx - w / 2, y: a.top - h - off };
    if (p === "bottom") return { x: cx - w / 2, y: a.bottom + off };
    if (p === "left") return { x: a.left - w - off, y: cy - h / 2 };
    return { x: a.right + off, y: cy - h / 2 };
  }
  function solve(a, w, h, pref, off, b, pad = 8) {
    const L = b.left + pad;
    const T = b.top + pad;
    const R = b.right - pad;
    const B = b.bottom - pad;
    let best = null;
    for (const p of candidates(pref)) {
      const r = rawPos(p, a, w, h, off);
      let x = r.x;
      let y = r.y;
      let shifted = 0;
      let overflow = 0;
      if (p === "top" || p === "bottom") {
        const nx = clamp(x, L, Math.max(L, R - w));
        shifted = Math.abs(nx - x);
        x = nx;
        overflow = p === "top" ? Math.max(0, T - y) : Math.max(0, y + h - B);
      } else {
        const ny = clamp(y, T, Math.max(T, B - h));
        shifted = Math.abs(ny - y);
        y = ny;
        overflow = p === "left" ? Math.max(0, L - x) : Math.max(0, x + w - R);
      }
      const candidate = { x, y, placement: p, shifted, overflow };
      if (overflow <= 0.5) return candidate;
      if (!best || overflow < best.overflow) best = candidate;
    }
    return best;
  }
  function classify(pref, chosen, shifted) {
    if (chosen === pref) return shifted > 0.5 ? "shift" : "none";
    if (AXIS[chosen] === AXIS[pref]) return shifted > 0.5 ? "flip + shift" : "flip";
    return "re-anchor";
  }
  function solveFollow(mx, my, w, h, off, vw, vh, pad = 8) {
    let x = mx + off;
    let y = my + off;
    let flipped = false;
    if (x + w > vw - pad) {
      x = mx - w - off;
      flipped = true;
    }
    if (y + h > vh - pad) {
      y = my - h - off;
      flipped = true;
    }
    x = clamp(x, pad, Math.max(pad, vw - w - pad));
    y = clamp(y, pad, Math.max(pad, vh - h - pad));
    return { x, y, flipped };
  }

  // tooltip-core.ts
  var PAD = 8;
  var GROUP_WINDOW = 400;
  var LAYER_CLASS = "";
  var booted = false;
  var layer = null;
  var canPopover = false;
  var layerShown = false;
  var reduceMotion = false;
  var registry = [];
  function boot() {
    var _a;
    if (booted || typeof document === "undefined") return;
    booted = true;
    reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = document.createElement("div");
    el.id = "tt-layer";
    if (LAYER_CLASS) el.className = LAYER_CLASS;
    canPopover = typeof el.showPopover === "function";
    if (canPopover) el.setAttribute("popover", "manual");
    ((_a = document.body) != null ? _a : document.documentElement).appendChild(el);
    layer = el;
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") registry.forEach((t) => t.dismiss());
    });
    const reflow = () => registry.forEach((t) => t.reflow());
    window.addEventListener("scroll", reflow, { passive: true, capture: true });
    window.addEventListener("resize", reflow);
  }
  function ensureLayerShown() {
    if (canPopover && layer && !layerShown) {
      try {
        layer.showPopover();
        layerShown = true;
      } catch {
      }
    }
  }
  var group = { open: 0, lastClose: 0 };
  var groupWarm = () => group.open > 0 || Date.now() - group.lastClose < GROUP_WINDOW;
  var reporter = null;
  var report = (info) => reporter == null ? void 0 : reporter(info);
  function boundsOf(el) {
    const v = { left: 0, top: 0, right: window.innerWidth, bottom: window.innerHeight };
    if (!el) return v;
    const r = el.getBoundingClientRect();
    return {
      left: Math.max(v.left, r.left),
      top: Math.max(v.top, r.top),
      right: Math.min(v.right, r.right),
      bottom: Math.min(v.bottom, r.bottom)
    };
  }
  var seq = 0;
  var Tip = class {
    constructor(target, opts) {
      __publicField(this, "t");
      __publicField(this, "o");
      __publicField(this, "el", null);
      __publicField(this, "arrow", null);
      __publicField(this, "showT", null);
      __publicField(this, "hideT", null);
      __publicField(this, "raf", 0);
      __publicField(this, "open", false);
      __publicField(this, "overBubble", false);
      __publicField(this, "suppressed", false);
      // set by hideOnClick until the pointer leaves
      __publicField(this, "lastDown", 0);
      // timestamp of the last pointerdown, to spot mouse-driven focus
      __publicField(this, "mouse", { x: 0, y: 0 });
      __publicField(this, "followMove", null);
      __publicField(this, "id");
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
      this.t = target;
      this.o = {
        content: opts.content,
        placement: (_a = opts.placement) != null ? _a : "top",
        mode: (_b = opts.mode) != null ? _b : "anchored",
        showDelay: (_c = opts.showDelay) != null ? _c : 420,
        hideDelay: (_d = opts.hideDelay) != null ? _d : 90,
        offset: (_e = opts.offset) != null ? _e : 12,
        hoverable: (_f = opts.hoverable) != null ? _f : false,
        onlyIfTruncated: (_g = opts.onlyIfTruncated) != null ? _g : false,
        boundary: (_h = opts.boundary) != null ? _h : null,
        hideOnClick: (_i = opts.hideOnClick) != null ? _i : false,
        decorative: (_j = opts.decorative) != null ? _j : false,
        anchor: (_k = opts.anchor) != null ? _k : null,
        awayFromCursor: (_l = opts.awayFromCursor) != null ? _l : false
      };
      this.id = `tt-${++seq}`;
      this.bind();
    }
    resolveContent(ev) {
      const c = this.o.content;
      return typeof c === "function" ? c(ev != null ? ev : this.mouse) : c;
    }
    fill(el, c) {
      var _a;
      Array.from(el.childNodes).forEach((n) => {
        if (n !== this.arrow) el.removeChild(n);
      });
      const frag = document.createDocumentFragment();
      if (c instanceof HTMLElement) {
        frag.appendChild(c);
      } else if (typeof c === "object") {
        const t = document.createElement("div");
        t.className = "tt-title";
        t.textContent = c.title;
        frag.appendChild(t);
        if (c.sub) {
          const s = document.createElement("div");
          s.className = "tt-sub";
          s.textContent = c.sub;
          frag.appendChild(s);
        }
      } else {
        frag.appendChild(document.createTextNode(c));
      }
      el.insertBefore(frag, (_a = this.arrow) != null ? _a : null);
    }
    build(ev) {
      const el = document.createElement("div");
      el.className = "tt" + (this.o.hoverable && this.o.mode === "anchored" ? " tt-hoverable" : "");
      el.setAttribute("role", "tooltip");
      if (this.o.decorative) el.setAttribute("aria-hidden", "true");
      el.id = this.id;
      if (this.o.mode === "anchored") {
        const arrow = document.createElement("div");
        arrow.className = "tt-arrow";
        el.appendChild(arrow);
        this.arrow = arrow;
      }
      this.fill(el, this.resolveContent(ev));
      if (this.o.hoverable && this.o.mode === "anchored") {
        el.addEventListener("pointerenter", () => {
          this.overBubble = true;
          this.clearHide();
        });
        el.addEventListener("pointerleave", () => {
          this.overBubble = false;
          this.scheduleHide();
        });
      }
      return el;
    }
    place() {
      var _a, _b, _c;
      if (!this.el) return;
      let w = this.el.offsetWidth;
      let h = this.el.offsetHeight;
      const off = this.o.offset;
      if (this.o.mode === "follow") {
        if (typeof this.o.content === "function") {
          this.fill(this.el, this.resolveContent());
          w = this.el.offsetWidth;
          h = this.el.offsetHeight;
        }
        const sol2 = solveFollow(
          this.mouse.x,
          this.mouse.y,
          w,
          h,
          off,
          window.innerWidth,
          window.innerHeight,
          PAD
        );
        this.el.style.left = `${sol2.x}px`;
        this.el.style.top = `${sol2.y}px`;
        report({
          mode: "follow",
          pref: "cursor",
          resolved: sol2.flipped ? "flipped" : "bottom",
          collision: sol2.flipped ? "flip" : "none",
          x: Math.round(this.mouse.x),
          y: Math.round(this.mouse.y)
        });
        return;
      }
      const anchorEl = (_c = (_b = (_a = this.o).anchor) == null ? void 0 : _b.call(_a)) != null ? _c : null;
      const a = anchorEl ? anchorEl.getBoundingClientRect() : this.t.getBoundingClientRect();
      let pref = this.o.placement;
      if (this.o.awayFromCursor && (pref === "top" || pref === "bottom")) {
        pref = this.mouse.y < a.top + a.height / 2 ? "bottom" : "top";
      }
      const sol = solve(a, w, h, pref, off, boundsOf(this.o.boundary), PAD);
      this.el.style.left = `${sol.x}px`;
      this.el.style.top = `${sol.y}px`;
      this.placeArrow(sol.placement, sol.x, sol.y, a, w, h);
      report({
        mode: "anchored",
        pref,
        resolved: sol.placement,
        collision: classify(pref, sol.placement, sol.shifted),
        x: Math.round(a.left + a.width / 2),
        y: Math.round(a.top + a.height / 2)
      });
    }
    placeArrow(p, x, y, a, w, h) {
      if (!this.arrow) return;
      const arw = 8;
      const acx = a.left + a.width / 2;
      const acy = a.top + a.height / 2;
      const s = this.arrow.style;
      s.left = s.top = s.right = s.bottom = s.transform = "";
      if (p === "top" || p === "bottom") {
        s.left = `${Math.min(Math.max(acx - x, 11), w - 11) - arw / 2}px`;
        if (p === "top") {
          s.bottom = `${-arw / 2}px`;
          s.transform = "rotate(45deg)";
        } else {
          s.top = `${-arw / 2}px`;
          s.transform = "rotate(225deg)";
        }
      } else {
        s.top = `${Math.min(Math.max(acy - y, 11), h - 11) - arw / 2}px`;
        if (p === "left") {
          s.right = `${-arw / 2}px`;
          s.transform = "rotate(-45deg)";
        } else {
          s.left = `${-arw / 2}px`;
          s.transform = "rotate(135deg)";
        }
      }
    }
    show(ev) {
      var _a, _b, _c;
      if (this.open || !booted || !layer) return;
      if (this.o.onlyIfTruncated) {
        const measured = (_c = (_b = (_a = this.o).anchor) == null ? void 0 : _b.call(_a)) != null ? _c : this.t;
        if (measured.scrollWidth <= measured.clientWidth + 1) return;
      }
      ensureLayerShown();
      const el = this.build(ev);
      el.style.visibility = "hidden";
      layer.appendChild(el);
      this.el = el;
      this.place();
      el.style.visibility = "";
      if (!this.o.decorative) this.t.setAttribute("aria-describedby", this.id);
      const target = el;
      requestAnimationFrame(() => {
        if (this.el === target) target.classList.add("tt-in");
      });
      this.open = true;
      group.open += 1;
      if (this.o.mode === "follow") {
        this.followMove = (e) => {
          this.mouse.x = e.clientX;
          this.mouse.y = e.clientY;
          if (!this.raf) {
            this.raf = requestAnimationFrame(() => {
              this.raf = 0;
              this.place();
            });
          }
        };
        window.addEventListener("pointermove", this.followMove, { passive: true });
      }
    }
    hide() {
      if (!this.open) return;
      this.open = false;
      group.open = Math.max(0, group.open - 1);
      group.lastClose = Date.now();
      if (!this.o.decorative) this.t.removeAttribute("aria-describedby");
      if (this.followMove) {
        window.removeEventListener("pointermove", this.followMove);
        this.followMove = null;
      }
      if (this.raf) {
        cancelAnimationFrame(this.raf);
        this.raf = 0;
      }
      const el = this.el;
      this.el = null;
      this.arrow = null;
      if (!el) return;
      if (reduceMotion) {
        el.remove();
        return;
      }
      el.classList.remove("tt-in");
      setTimeout(() => el.remove(), 160);
    }
    clearHide() {
      if (this.hideT) {
        clearTimeout(this.hideT);
        this.hideT = null;
      }
    }
    clearShow() {
      if (this.showT) {
        clearTimeout(this.showT);
        this.showT = null;
      }
    }
    scheduleShow(ev) {
      if (this.suppressed) return;
      this.clearHide();
      this.clearShow();
      const pt = { x: ev ? ev.clientX : 0, y: ev ? ev.clientY : 0 };
      if (ev) this.mouse = { x: ev.clientX, y: ev.clientY };
      const delay = groupWarm() ? 0 : this.o.showDelay;
      this.showT = setTimeout(() => this.show(pt), delay);
    }
    scheduleHide() {
      this.clearShow();
      this.clearHide();
      if (this.overBubble) return;
      this.hideT = setTimeout(() => this.hide(), this.o.hideDelay);
    }
    /**
     * Focus-driven show, gated so a mouse click never pins the tip. A focus that
     * lands right after a pointerdown is mouse-driven (the click's residual focus);
     * a focus with no recent press is keyboard navigation, which should show. This
     * is env-independent — it doesn't rely on `:focus-visible` support.
     */
    focusShow() {
      if (this.o.mode === "follow") return;
      if (Date.now() - this.lastDown < 300) return;
      this.scheduleShow();
    }
    bind() {
      this.t.addEventListener("pointerenter", (e) => {
        if (e.pointerType !== "touch") this.scheduleShow(e);
      });
      this.t.addEventListener("pointerleave", () => {
        this.suppressed = false;
        this.scheduleHide();
      });
      this.t.addEventListener("pointermove", (e) => {
        this.mouse = { x: e.clientX, y: e.clientY };
      });
      this.t.addEventListener("pointerdown", () => {
        this.lastDown = Date.now();
        if (this.o.hideOnClick) {
          this.suppressed = true;
          this.clearShow();
          this.hide();
        }
      });
      this.t.addEventListener("focus", () => this.focusShow(), true);
      this.t.addEventListener("blur", () => this.scheduleHide(), true);
    }
    /** Reposition if open — called on scroll/resize. */
    reflow() {
      if (this.open && this.o.mode === "anchored") this.place();
    }
    /** Dismiss immediately (Escape). */
    dismiss() {
      this.clearShow();
      this.hide();
    }
    destroy() {
      this.clearShow();
      this.clearHide();
      this.hide();
      const i = registry.indexOf(this);
      if (i >= 0) registry.splice(i, 1);
    }
  };
  function attach(target, opts) {
    boot();
    const t = new Tip(target, opts);
    registry.push(t);
    return t;
  }
  function configure({
    padding,
    groupWindow,
    layerClass
  }) {
    if (padding != null) PAD = padding;
    if (groupWindow != null) GROUP_WINDOW = groupWindow;
    if (layerClass != null) {
      LAYER_CLASS = layerClass;
      if (layer) layer.className = layerClass;
    }
  }
  function onResolve(fn) {
    reporter = fn;
  }
  return __toCommonJS(tooltip_core_exports);
})();
  return __briefTip;
  })();

  var idle = window.requestIdleCallback
    ? function (fn) { return window.requestIdleCallback(fn, { timeout: 600 }); }
    : function (fn) { return setTimeout(function () { fn({ timeRemaining: function () { return 6; } }); }, 30); };
  function mainEl() { return document.getElementById('briefMain') || document.querySelector('main'); }

  /* ── definition links ──────────────────────────────────────────────────
     First use of each term per section, not every use: a page where every
     "bootstrap" is underlined reads as noise. Skips headings, code, links,
     table header cells, the Definitions and Answers blocks, and any widget
     that carries its own script. */
  var SKIP = 'h1,h2,h3,h4,h5,h6,code,pre,kbd,a,button,label,th,textarea,select,svg,script,style,' +
    'sup.fn,.l5,#s-definitions,dl.answers,nav.toc,.brief-title,.topbar,.bterm,[contenteditable],[data-noterms]';

  function defLinks() {
    var root = mainEl();
    var cards = document.querySelectorAll('section#s-definitions .defs-in .term');
    if (!root || !cards.length) return;
    var byKey = {}, words = [];
    Array.prototype.forEach.call(cards, function (card, idx) {
      var h = card.querySelector('h4'); if (!h) return;
      var li = card.querySelector('li'), k = li && li.querySelector('.k');
      var def = li ? li.textContent.slice(k ? k.textContent.length : 0).trim() : '';
      var entry = { id: idx, title: h.textContent.trim(), def: def };
      /* "Authored blend / AI-bust-tilted blend" defines two names for one card. */
      h.textContent.split(/\s+\/\s+/).forEach(function (w) {
        w = w.trim();
        if (w.length < 2 || byKey[w.toLowerCase()]) return;
        byKey[w.toLowerCase()] = entry; words.push(w);
      });
    });
    if (!words.length) return;
    words.sort(function (a, b) { return b.length - a.length; });
    var esc = words.map(function (w) { return w.replace(/[.*+?^${}()|[\]\\]/g, function (c) { return '\\' + c; }); });
    var RE = new RegExp('(?<![\\w-])(?:' + esc.join('|') + ')(?![\\w-])', 'gi');

    /* A widget with its own script owns its DOM: leave all of it alone. */
    var widgets = [];
    Array.prototype.forEach.call(root.querySelectorAll('script'), function (s) {
      if (s.parentElement && s.parentElement !== root) widgets.push(s.parentElement);
    });
    function skipped(el) {
      if (el.closest(SKIP)) return true;
      for (var i = 0; i < widgets.length; i++) if (widgets[i].contains(el)) return true;
      return false;
    }
    var used = new WeakMap();
    function seen(scope, id) {
      var s = used.get(scope); if (!s) { s = {}; used.set(scope, s); }
      if (s[id]) return true; s[id] = 1; return false;
    }
    function card(entry) {
      var d = document.createElement('div'); d.className = 'bterm-card';
      var t = document.createElement('strong'); t.textContent = entry.title;
      var p = document.createElement('span'); p.textContent = entry.def;
      d.appendChild(t); d.appendChild(p); return d;
    }
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        if (n.nodeType === 1) return skipped(n) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_SKIP;
        return n.nodeValue && n.nodeValue.trim().length > 1 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
      }
    });
    function linkNode(tn) {
      var text = tn.nodeValue, m, last = 0, frag = null;
      var scope = tn.parentElement.closest('section, p.partlede, .summary-page') || root;
      RE.lastIndex = 0;
      while ((m = RE.exec(text))) {
        var entry = byKey[m[0].toLowerCase()];
        if (!entry || seen(scope, entry.id)) continue;
        frag = frag || document.createDocumentFragment();
        frag.appendChild(document.createTextNode(text.slice(last, m.index)));
        var s = document.createElement('span');
        s.className = 'bterm'; s.tabIndex = 0; s.textContent = m[0];
        TT.attach(s, { content: (function (en) { return function () { return card(en); }; })(entry),
          hoverable: true, placement: 'top', showDelay: 300 });
        frag.appendChild(s);
        last = m.index + m[0].length;
      }
      if (!frag) return tn;
      var tail = document.createTextNode(text.slice(last));
      frag.appendChild(tail);
      tn.parentNode.replaceChild(frag, tn);
      return tail;
    }
    /* Small slices in idle time: a 500KB brief never freezes the page. */
    function slice(deadline) {
      var n, count = 0;
      while ((deadline.timeRemaining() > 2 || count < 5) && (n = walker.nextNode())) {
        walker.currentNode = linkNode(n);
        count++;
      }
      if (n) idle(slice);
    }
    idle(slice);
  }

  /* ── gutter contents rail ──────────────────────────────────────────────
     One short line per part (long) and section (short). Hover or keyboard
     focus opens the labels beside it; the current section is marked as the
     reader scrolls. Shown in both width modes, hidden below the mobile
     breakpoint (brief.css), and hidden while page content sits under it. */
  function rail() {
    var root = mainEl(); if (!root || document.querySelector('.ptoc')) return;
    var heads = root.querySelectorAll('h2.part[id], section.brief-section[id] > .sec-head h3, section.q[id] > .q-head h3');
    var items = [];
    Array.prototype.forEach.call(heads, function (h) {
      var part = h.tagName === 'H2', target = part ? h : h.closest('section');
      var pn = part && h.querySelector('.pnum');
      var label = part ? (pn ? pn.textContent.trim() + ': ' : '') + h.textContent.slice(pn ? pn.textContent.length : 0).trim()
        : h.textContent.trim();
      if (label && target && target.id) items.push({ level: part ? 2 : 3, label: label, el: target, head: h });
    });
    if (items.length < 3) return;
    var nav = document.createElement('nav');
    nav.className = 'ptoc'; nav.setAttribute('aria-label', 'Page contents');
    var bars = document.createElement('div'); bars.className = 'ptoc-bars'; bars.setAttribute('aria-hidden', 'true');
    /* The flyout reads like the page's own Contents: a CONTENTS label, each part
       as an uppercase accent label, its sections in a ruled list beneath. */
    var list = document.createElement('div'); list.className = 'ptoc-list';
    var cap = document.createElement('p'); cap.className = 'ptoc-cap'; cap.textContent = 'Contents';
    list.appendChild(cap);
    var group = null;
    items.forEach(function (it, i) {
      var b = document.createElement('span');
      b.className = 'ptoc-bar l' + it.level; b.style.setProperty('--i', i);
      b.addEventListener('click', function () { go(it); });
      b.addEventListener('mouseenter', function () { wave(i); });
      bars.appendChild(b); it.bar = b;
      var a = document.createElement('a');
      a.href = '#' + it.el.id; a.textContent = it.label;
      a.addEventListener('click', function (e) { e.preventDefault(); go(it); });
      a.addEventListener('mouseenter', function () { wave(i); });
      a.addEventListener('focus', function () { wave(i); });
      if (it.level === 2) {
        var ph = document.createElement('p'); ph.className = 'ptoc-part';
        ph.appendChild(a); list.appendChild(ph); group = null;
      } else {
        if (!group) { group = document.createElement('ol'); list.appendChild(group); }
        var li = document.createElement('li'); li.appendChild(a); group.appendChild(li);
      }
      it.link = a;
    });
    nav.appendChild(bars); nav.appendChild(list);
    nav.addEventListener('mouseleave', function () { wave(-1); });
    document.body.appendChild(nav);
    document.body.classList.add('has-ptoc');

    function go(it) {
      var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      /* Land the heading just below the sticky top bar. scrollIntoView put it
         under the bar, because sections carry no scroll margin. */
      var bar = document.querySelector('.topbar');
      var off = (bar ? bar.getBoundingClientRect().bottom : 0) + 12;
      window.scrollTo({ top: it.head.getBoundingClientRect().top + window.scrollY - off,
        behavior: reduce ? 'auto' : 'smooth' });
      if (history.replaceState) history.replaceState(null, '', '#' + it.el.id);
    }
    /* Keep the hovered entry in view by scrolling the LIST only. scrollIntoView
       also scrolled the page whenever the pointer merely crossed a line on its
       way somewhere else, and a click aimed at the page then landed on whatever
       had moved under it. A closed flyout is left alone. */
    function follow(a, i) {
      if (getComputedStyle(list).visibility === 'hidden') return;
      if (i === 0) { list.scrollTop = 0; return; }
      var lr = list.getBoundingClientRect(), ar = a.getBoundingClientRect();
      var top = lr.top + cap.getBoundingClientRect().height + 4;
      if (ar.top < top) list.scrollTop -= top - ar.top;
      else if (ar.bottom > lr.bottom - 8) list.scrollTop += ar.bottom - lr.bottom + 8;
    }
    /* The playful part: bars near the pointer swell like a fisheye, and the
       swell follows the cursor down the rail. */
    function wave(h) {
      items.forEach(function (it, i) {
        var d = h < 0 ? 99 : Math.abs(i - h);
        // '0px', never a bare 0: calc(14px + 0) is invalid and collapses the line.
        it.bar.style.setProperty('--swell', d > 3 ? '0px' : (4 - d) * 3 + 'px');
        it.bar.classList.toggle('hot', d === 0);
        it.link.classList.toggle('hot', d === 0);
        if (d === 0) follow(it.link, i);
      });
    }
    var active = -1, ticking = false;
    function mark() {
      ticking = false;
      var hit = 0;
      for (var i = 0; i < items.length; i++) {
        if (items[i].head.getBoundingClientRect().top <= 120) hit = i; else break;
      }
      if (hit === active) return;
      if (active >= 0) { items[active].bar.classList.remove('on'); items[active].link.removeAttribute('aria-current'); }
      active = hit;
      items[hit].bar.classList.add('on'); items[hit].link.setAttribute('aria-current', 'location');
    }
    /* Full width lets tables and narrow-window prose reach the rail's strip.
       When anything in the page sits under the lines, the rail steps aside
       rather than draw over it. Sampled with elementsFromPoint down both edges
       of the lines; the rail itself and bare page padding (main) never count. */
    function covered() {
      if (nav.matches(':hover, :focus-within')) return false;
      var r = bars.getBoundingClientRect();
      if (!r.height) return false;
      for (var y = r.top + 4; y < r.bottom; y += 24) {
        var xs = [r.left + 2, r.right - 2];
        for (var k = 0; k < 2; k++) {
          var stack = document.elementsFromPoint(xs[k], y);
          for (var j = 0; j < stack.length; j++) {
            var e = stack[j];
            if (nav.contains(e)) continue;
            if (e === root || !root.contains(e)) break;
            return true;
          }
        }
      }
      return false;
    }
    /* Only full width can put content under the rail: fixed width reserves the
       gutter. And only once scrolling settles: sampling elementsFromPoint on
       every scroll frame disturbed the page's hover state mid-gesture, so a
       click aimed at a tick box landed on the heading beside it. */
    var settle = 0;
    function check() {
      nav.classList.toggle('ptoc-covered', document.body.classList.contains('fullwidth') && covered());
    }
    function checkSoon() { clearTimeout(settle); settle = setTimeout(check, 150); }
    /* Current-section tracking runs only when a heading crosses the marker
       line, not on every scroll frame: measuring headings each frame forced a
       layout per frame during smooth scrolls, and on a loaded machine that made
       the page too unsteady for a click to land where it was aimed. */
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function () {
        if (!ticking) { ticking = true; requestAnimationFrame(mark); }
      }, { rootMargin: '-120px 0px 0px 0px' });
      items.forEach(function (it) { io.observe(it.head); });
    }
    window.addEventListener('scroll', checkSoon, { passive: true });
    window.addEventListener('resize', checkSoon);
    /* The width toggle flips body.fullwidth; re-check when it does. */
    new MutationObserver(checkSoon)
      .observe(document.body, { attributes: true, attributeFilter: ['class'] });
    mark(); check();
  }

  function start() { rail(); idle(defLinks); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
