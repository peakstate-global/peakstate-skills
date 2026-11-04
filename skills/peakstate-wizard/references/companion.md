# The HTML companion

The companion is a peakstate-brief with `tabs: parts`, built from a markdown source by the
brief's own builder. Each `#` part is a stage, each `##` section is a step, and the brief runtime
supplies the tabs, Back and Next, saved progress, ticks, deep links, comments and the Copy and
Download payload. The add-on block below adds what a wizard needs on top. Never copy or change
the brief runtime: reference it.

## The wizard folder

Write every file into one folder, named after the wizard, such as `key-rotation/`:

| File | What it is | Where it comes from |
|---|---|---|
| `<name>.md` | The companion source, with the add-on block | You write it, from this file |
| `<name>.html` | The built companion | The brief builder |
| `<segment>.sh` | One file per terminal segment, executable | `references/segment.md` |
| `wizard-lint.py` | The mechanical check | `references/wizard-lint.md` |
| `.gitignore` | One line, `wizard-status.js` | You write it |
| `wizard-status.js` | Written by a running segment, read by the page | The segment, never you |
| `wizard-ledger.log` | Every PASS and FAIL with its time, no values | The segment, never you |

Build the page with the peakstate-brief builder:

    node <peakstate-brief-dir>/assets/build-brief.mjs <name>.md

## Front matter

    ---
    title: Rotate the example app's API key
    head-title: Rotate the example app's API key (wizard)
    brief-id: key-rotation-wizard
    eyebrow: Combo wizard · four stages · about 25 minutes
    sub: One step per page. The terminal saves and tests the new key, and this page walks you through the rest.
    tabs: parts
    ---

`brief-id` never changes across rebuilds, so progress and comments survive. Add `consumed:` with
a new token on each rebuild that acts on comments, exactly as for a brief.

## The top of the page

An `## Answers` block comes first: what the wizard does, how long it takes, and the one command to
paste, if there is one. Then the add-on block. Then the first `#` part.

## A stage (a `#` part)

The paragraph straight after `#` is the stage lede. It always carries three things, in this order:

    Have ready: your provider sign-in and one Terminal window. Takes about 5 minutes. Safe to stop after this stage.

- **Have ready:** what to have at hand (a hardware key, a phone, a second person, a sign-in).
  Write "nothing" when nothing is needed.
- **Takes about:** the time, as a range or a round number.
- **Safe to stop** or **Do not stop**: where the person may walk away. A stage that must not be
  interrupted says "Do not stop during this stage" and why, and says where the safe points are.

## A step (a `##` section)

Every step has an explicit, stable id, a marker line, a Why block, and then the step's content:

    ## Make the new key at the provider {#s-mint} :: New key | your sign-in

    <p class="wz-step" data-kind="Hands"></p>

    **Why:** The app can only switch to a new key once the provider has made one. Making it first
    means the old key still works while you install the new one, so the app never goes down.

    **Why this is yours (rung 4, Claude prepares, you click):** the provider makes keys only for a
    signed-in person. Claude checked for an API first and found none that a short-lived token can use.

    - Open the provider's console and sign in.
    - Go to Settings > API keys.

- **The id** (`{#s-mint}`) never changes once the wizard is delivered, even when the heading does.
  A new step gets a new id. The `:: Short label | note` part names the sub-tab.
- **The marker** is the first line of the body, exactly as shown, with no text inside it.
- **The Why block** comes next on every step (`references/hands-audit.md`).
- **The hands-audit line** comes next on every Hands and Terminal step.
- **A warning** comes next on an irreversible step: mark it `data-irreversible="true"` and start the
  next paragraph with `**Warning:**`. The segment asks for a typed word before the action
  (`confirm_word`).
- **Instructions** follow: one action per bullet, condition before action, exact menu paths.

## The six step kinds

| Kind | Marker attributes | What the person does | What the page does |
|---|---|---|---|
| Read | `data-kind="Read"` | Reads, ticks | Shows the page |
| Hands | `data-kind="Hands"` | One physical or sign-in action, with its exact menu path | Shows the hands-audit line |
| Terminal | `data-kind="Terminal" data-segment="<segment>" data-stage="<n>"` | Runs one segment; one page per stage | Shows the stage state, ticks a PASS, moves on by itself, shows a fix request on a FAIL, and offers "Terminal wizard complete" as the fallback |
| Claude | `data-kind="Claude"` | Nothing | Shows what Claude did and its result, in a `**Result:**` paragraph |
| Date gate | `data-kind="Date gate" data-date="YYYY-MM-DD"` | Nothing until the date | Locks the tick until the date and shows an "Add it to Google Calendar" link with the step's deep link |
| Decision | `data-kind="Decision"` on a `## Qn ...` question section | Picks an option in the answer box | Records the choice in the payload |

- **Claude steps run before the build.** Do the work, then write what was done and the evidence.
  Never write a Claude step for work you have not done.
- **A Decision step does not hide steps in version one.** A later step that applies to one road
  only says so in its first instruction ("If you answered b, ...").
- **Terminal pages, one per stage, in stage order.** The first page of a segment carries the run
  command in a fenced block, with an absolute or home-relative `cd`. The page explains each stage
  before it runs, so the person can read what the terminal is about to do.

## Date gates and scheduling

For every Date gate, when you build the wizard:

1. Work out the deep link: the companion's `file://` address, then `#` and the step id.
2. If a command named `wizard-schedule` is on PATH (`command -v wizard-schedule`), run
   `wizard-schedule <brief-id> <step id> "<deep link>" <YYYY-MM-DD> "<wizard title>: <step heading>"`.
   It is an optional add-on that the person installs. It keys the reminder on the brief-id and the
   step id, never on the link, so moving or renaming the wizard folder does not make a second
   reminder, and a rerun with a new date moves the date.
3. If it is not on PATH, give the person the date and a pre-filled Google Calendar link in your
   reply. The page shows the same link on the step. The event details carry the title, the step id
   and the brief-id only: never the `file://` link, which holds the person's home folder name and
   would go to Google.

       https://calendar.google.com/calendar/render?action=TEMPLATE&text=<title>&dates=<YYYYMMDD>/<next day YYYYMMDD>&details=<title>. Step <step id> of wizard <brief-id>.

## Secrets never touch the page

The page names the slot ("the terminal asks for the new key at a hidden prompt") and never takes
a secret. It has no password field, no secret-shaped value and no place to paste one. The
payload from Copy or Download carries progress, comments and answers, never a secret. A fix
request carries the stage, the error line and the ledger name, never a value.

## Comments and rebuilds

Comments work exactly as in a brief: the person selects text or adds a general comment, then
copies or downloads the payload and pastes it back. Rebuild with the same `brief-id`, the same
step ids and a new `consumed:` token. Changed steps carry the brief's New and Changed markers,
and replies go in `replies:` so they show in a thread under the comment.

## The add-on block

Paste this block, exactly as it is, straight after the `## Answers` block of every companion. It
is one raw HTML block with no blank line inside it, so the brief builder passes it through
unchanged. It adds the kind badges, the Why and hands-audit styling, the step counter, the
terminal status box and fix request, the date-gate lock and calendar link, and the phone layout.
It reloads `wizard-status.js` from the page's own folder every three seconds by adding a fresh
script tag, which works on a page opened from disk.

````html
<script>/* WIZARD_ADDON v1, from the peakstate-wizard skill. Copy as is. */
(function () {
  var KINDS = ['Read', 'Hands', 'Terminal', 'Claude', 'Date gate', 'Decision'];
  var st = document.createElement('style');
  st.textContent = '.wz-badge{display:inline-block;font:600 11px/1 system-ui,sans-serif;letter-spacing:.04em;text-transform:uppercase;padding:4px 7px;border-radius:4px;margin-right:8px;vertical-align:middle;color:#fff}' +
    '.wz-Read{background:#6b7280}.wz-Hands{background:#b45309}.wz-Terminal{background:#1d4ed8}.wz-Claude{background:#7c3aed}.wz-Date-gate{background:#0f766e}.wz-Decision{background:#be185d}' +
    '.wz-why{border-left:3px solid #6b7280;padding:6px 10px;background:rgba(107,114,128,.08)}.wz-hands{border-left:3px solid #b45309;padding:6px 10px;background:rgba(180,83,9,.07)}.wz-warn{border-left:3px solid #b91c1c;padding:6px 10px;background:rgba(185,28,28,.07)}' +
    '.wz-progress{font:600 13px/1.4 system-ui,sans-serif;padding:6px 0 6px var(--btabs-pl,0);opacity:.8}' +
    '.wz-term,.wz-gate{margin-top:18px;padding:12px 14px;border:1px solid rgba(29,78,216,.35);border-radius:6px;background:rgba(29,78,216,.05)}.wz-gate{border-color:rgba(15,118,110,.4);background:rgba(15,118,110,.05)}' +
    '.wz-state{font-weight:600}.wz-fix{margin-top:10px;padding:10px;border:1px solid #b91c1c;border-radius:6px;background:rgba(185,28,28,.06)}.wz-fix pre{white-space:pre-wrap;font-size:12px;margin:6px 0}' +
    '.wz-term button{margin-top:8px;margin-right:8px;padding:6px 12px;border-radius:6px;border:1px solid currentColor;background:transparent;cursor:pointer;font:inherit}' +
    '@media (max-width:640px){.wz-badge{font-size:10px}.wz-term button{display:block;width:100%}}';
  document.head.appendChild(st);
  var handled = '';
  function steps() { return Array.prototype.filter.call(document.querySelectorAll('section.brief-section, section.q'), function (s) { return s.querySelector('.wz-step'); }); }
  function attr(s, a) { return s.querySelector('.wz-step').getAttribute(a) || ''; }
  function kindOf(s) { var k = attr(s, 'data-kind'); return KINDS.indexOf(k) < 0 ? 'Read' : k; }
  function current() { var on = steps().filter(function (s) { return !s.classList.contains('tab-off'); }); return on.length === 1 ? on[0] : null; }
  function go(s) { if (s) location.hash = '#' + s.id; }
  function tick(s) { var b = s.querySelector('.tick input'); if (b && !b.checked && !b.disabled) b.click(); }
  function inSeg(s, seg) { return kindOf(s) === 'Terminal' && attr(s, 'data-segment') === seg; }
  function afterSeg(seg) { var all = steps(), last = -1; all.forEach(function (s, i) { if (inSeg(s, seg)) last = i; }); return all[last + 1] || null; }
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function ymd(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function title() { var h = document.querySelector('h1'); return h ? h.textContent.trim() : document.title; }
  function heading(s) { var h = s.querySelector('h3'); return h ? h.textContent.replace(/^(Read|Hands|Terminal|Claude|Date gate|Decision)/, '').trim() : s.id; }
  function calendar(date, text, details) {
    var next = new Date(date + 'T12:00:00'); next.setDate(next.getDate() + 1);
    return 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=' + encodeURIComponent(text) +
      '&dates=' + date.replace(/-/g, '') + '/' + ymd(next).replace(/-/g, '') + '&details=' + encodeURIComponent(details);
  }
  function copy(text, btn) {
    function done() { btn.textContent = 'Copied'; setTimeout(function () { btn.textContent = 'Copy fix request'; }, 1500); }
    function fallback() { var t = document.createElement('textarea'); t.value = text; document.body.appendChild(t); t.select(); document.execCommand('copy'); t.remove(); done(); }
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, fallback); else fallback();
  }
  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text) e.textContent = text; return e; }
  function gate(s) {
    var date = attr(s, 'data-date'), box = el('div', 'wz-gate'), a = el('a', '', 'Add it to Google Calendar');
    var locked = date && ymd(new Date()) < date, input = s.querySelector('.tick input');
    box.appendChild(el('div', 'wz-state', locked ? 'This step unlocks on ' + date + '.' : 'This step unlocked on ' + date + '.'));
    var text = title() + ': ' + heading(s);
    a.href = calendar(date, text, text + '. Step ' + s.id + ' of wizard ' + (document.body.getAttribute('data-brief-id') || '') + '.');
    a.target = '_blank'; a.rel = 'noopener';
    box.appendChild(a);
    if (locked && input) input.disabled = true;
    (s.querySelector('.sec-body') || s).appendChild(box);
  }
  function terminal(s) {
    var box = el('div', 'wz-term'), fix = el('div', 'wz-fix'), cp = el('button', 'wz-copy', 'Copy fix request'), skip = el('button', 'wz-skip', 'Terminal wizard complete');
    box.appendChild(el('div', 'wz-state', 'Waiting for the terminal to reach this stage.'));
    fix.hidden = true; fix.appendChild(el('div', 'wz-lead')); fix.appendChild(el('pre')); fix.appendChild(cp);
    box.appendChild(fix); box.appendChild(skip);
    cp.type = skip.type = 'button';
    cp.addEventListener('click', function () { copy(fix.querySelector('pre').textContent, cp); });
    skip.addEventListener('click', function () { var seg = attr(s, 'data-segment'); steps().forEach(function (t) { if (inSeg(t, seg)) tick(t); }); go(afterSeg(seg)); });
    (s.querySelector('.sec-body') || s).appendChild(box);
  }
  function decorate() {
    steps().forEach(function (s) {
      var k = kindOf(s), h = s.querySelector('h3');
      if (h && !h.querySelector('.wz-badge')) h.insertBefore(el('span', 'wz-badge wz-' + k.replace(/ /g, '-'), k), h.firstChild);
      Array.prototype.forEach.call(s.querySelectorAll('p'), function (p) {
        var b = p.firstElementChild; if (!b || p.firstChild !== b || !/^(STRONG|B)$/.test(b.tagName)) return;
        var t = b.textContent;
        if (/^Why:/.test(t)) p.classList.add('wz-why'); else if (/^Why this is yours/.test(t)) p.classList.add('wz-hands'); else if (/^Warning:/.test(t)) p.classList.add('wz-warn');
      });
      if (k === 'Date gate' && !s.querySelector('.wz-gate')) gate(s);
      if (k === 'Terminal' && !s.querySelector('.wz-term')) terminal(s);
    });
  }
  function progress() {
    var p = document.querySelector('.wz-progress');
    if (!p) { p = el('div', 'wz-progress'); p.setAttribute('aria-live', 'polite'); var nav = document.querySelector('.btabs-nav'), m = document.querySelector('main') || document.body; if (nav) nav.appendChild(p); else m.insertBefore(p, m.firstChild); }
    var all = steps(), c = current(), i = all.indexOf(c);
    p.textContent = i < 0 ? all.length + ' steps' : 'Step ' + (i + 1) + ' of ' + all.length + ' · ' + kindOf(c);
  }
  function apply() {
    var w = window.WIZARD_STATUS; progress();
    if (!w || !w.stages) return;
    var fix = w.fix, c = current(), seg = w.segment;
    steps().forEach(function (s) {
      if (!inSeg(s, seg)) return;
      var n = attr(s, 'data-stage'), r = w.stages[n], box = s.querySelector('.wz-term'); if (!box) return;
      var fx = box.querySelector('.wz-fix'), dry = w.dryRun ? ' (dry run)' : '';
      box.querySelector('.wz-state').textContent = r === 'PASS' ? 'Stage ' + n + ': PASS' + dry : r === 'FAIL' ? 'Stage ' + n + ': FAIL' + dry : r === 'SKIP' ? 'Stage ' + n + ': skipped (the run started later)' : 'Waiting for the terminal to reach this stage.';
      if (r === 'PASS' && !w.dryRun) tick(s);
      if (!fix || String(fix.stage) !== n) { fx.hidden = true; return; }
      fx.hidden = false;
      var lead = fx.querySelector('.wz-lead'), pre = fx.querySelector('pre');
      if (fix.safe === 'not-restored') {
        lead.textContent = 'The terminal stopped here and could not restore the safe state. Do not open Claude yet. Do this first:';
        pre.textContent = fix.error; fx.querySelector('.wz-copy').hidden = true; return;
      }
      fx.querySelector('.wz-copy').hidden = false;
      lead.textContent = fix.safe === 'restored' ? 'The terminal stopped here and restored the safe state first. Copy the fix request and paste it into a new Claude thread. It holds the stage, the error line and the ledger name, never a secret.' : 'The terminal stopped here. Copy the fix request and paste it into a new Claude thread. It holds the stage, the error line and the ledger name, never a secret.';
      pre.textContent = 'Fix request from the wizard "' + title() + '"\nSegment ' + seg + ', stage ' + fix.stage + ' (' + fix.name + ') failed: ' + fix.error + '\nLedger (no values in it): ' + fix.ledger + '\nRun again after the fix: ' + fix.rerun;
    });
    if (w.updated === handled) return;
    handled = w.updated;
    if (fix) { var bad = steps().filter(function (s) { return inSeg(s, seg) && attr(s, 'data-stage') === String(fix.stage); })[0]; if (bad && c !== bad) go(bad); return; }
    if (!c || !inSeg(c, seg)) return;
    if (w.done) { go(afterSeg(seg)); return; }
    if (w.stages[attr(c, 'data-stage')] === 'PASS') { var nx = steps().filter(function (s) { return inSeg(s, seg) && attr(s, 'data-stage') === String(Number(attr(c, 'data-stage')) + 1); })[0]; if (nx) go(nx); }
  }
  function poll() { var s = document.createElement('script'); s.src = 'wizard-status.js?t=' + Date.now(); s.onload = s.onerror = function () { s.remove(); apply(); }; document.head.appendChild(s); }
  function start() {
    decorate(); progress(); poll(); setInterval(poll, 3000);
    window.addEventListener('hashchange', function () { setTimeout(progress, 0); });
    window.addEventListener('brief-hash-replaced', function () { setTimeout(progress, 0); });
  }
  if (document.readyState === 'complete') setTimeout(start, 0); else window.addEventListener('load', function () { setTimeout(start, 0); });
})();
</script>
````
