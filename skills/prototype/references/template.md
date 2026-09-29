# prototype template

Copy the block below into one `.html` file. Replace every `{{...}}` placeholder. Repeat the
screen block once per screen, and build each screen's content from the archetype in
`references/archetypes.md`. Copy the `<meta>` security line, the banner, the `<style>` rules
marked "keep" and the `<script>` byte for byte.

Rules for filling it in:

- **Insert user text as text** (S26). Escape `&` as `&amp;`, `<` as `&lt;`, `>` as `&gt;` and
  `"` as `&quot;` in anything the user gave you, including headings they ask for "exactly".
- **Synthetic data only.** Every name, email, phone, id, amount and date is made up and looks
  made up: "Sample Person 1", "person1@example.test", "Desk A-01", "Order 0001". Never paste a
  real record the user supplied; make a record of the same shape instead.
- **No external requests** (S25). No `<link>`, no `<img>` or font from a URL, no `@import`, no
  `<iframe>`, no form `action`, no `fetch`. The security line blocks them anyway; do not remove it.
  Images are inline SVG or plain boxes with a label such as "Photo".
- **No inline handlers.** No `onclick=` or other `on...=` attributes. Controls work through
  `data-` attributes, which the script reads.
- **Screens.** Each screen is a `<section class="screen" id="{{SCREEN_ID}}">`. The first screen
  in the file shows first. Any element with `data-go="{{SCREEN_ID}}"` shows that screen. A
  `<form data-next="{{SCREEN_ID}}">` shows that screen on submit and sends nothing.
- **Working slice only:** an `<input data-filter="{{LIST_ID}}">` hides the children of the
  element with that id whose text does not contain what the user types. Put the id on a
  `<tbody>`, `<ul>` or `<ol>`, so each child is one row or item.
- **Fidelity** is the body class: `fi-sketch` (paper sketch), `fi-click` (clickable) or
  `fi-slice` (working slice).
- **Design system.** If the user names one, set the `:root` variables to its colours, type and
  spacing, and say in the reply that you applied them from memory, labelled RECALLED. Never load
  its files. If the user names none, keep the neutral values.

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; script-src 'unsafe-inline'; img-src data:; form-action 'none'; base-uri 'none'">
<title>{{TITLE}} (prototype)</title>
<style>
/* Change these for a named design system. */
:root { --font: system-ui, -apple-system, "Segoe UI", sans-serif; --text: #1d1d1f; --muted: #5f6368;
  --bg: #ffffff; --panel: #f4f5f7; --line: #d0d4da; --accent: #2b59c3; --accent-text: #ffffff; --radius: 6px; --gap: 16px; }
/* keep: banner, screens and fidelity */
#proto-banner { position: sticky; top: 0; z-index: 10; margin: 0; padding: 8px var(--gap); background: #ffe14d; color: #1d1d1f;
  font: 600 14px/1.4 var(--font); text-align: center; border-bottom: 2px solid #1d1d1f; }
.screen[hidden] { display: none; }
body { margin: 0; font: 16px/1.5 var(--font); color: var(--text); background: var(--bg); }
main { max-width: 1100px; margin: 0 auto; padding: var(--gap); }
.fi-sketch { --font: "Comic Sans MS", "Chalkboard SE", system-ui, sans-serif; --accent: #1d1d1f; --text: #1d1d1f; --panel: #ffffff; --line: #1d1d1f; }
.fi-sketch .card, .fi-sketch button, .fi-sketch input, .fi-sketch select, .fi-sketch textarea, .fi-sketch table { border-style: dashed !important; }
.fi-sketch button { background: #ffffff; color: #1d1d1f; }
/* layout helpers: change freely */
h1 { font-size: 1.6rem; margin: 0 0 var(--gap); } h2 { font-size: 1.2rem; margin: var(--gap) 0 8px; }
.row { display: flex; gap: var(--gap); flex-wrap: wrap; align-items: flex-start; }
.card { background: var(--panel); border: 1px solid var(--line); border-radius: var(--radius); padding: var(--gap); flex: 1 1 220px; }
.muted { color: var(--muted); }
button, .button { font: inherit; padding: 8px 14px; border-radius: var(--radius); border: 1px solid var(--accent); background: var(--accent); color: var(--accent-text); cursor: pointer; }
button.secondary { background: transparent; color: var(--accent); }
input, select, textarea { font: inherit; padding: 8px; border: 1px solid var(--line); border-radius: var(--radius); width: 100%; box-sizing: border-box; }
label { display: block; font-weight: 600; margin: var(--gap) 0 4px; }
table { border-collapse: collapse; width: 100%; } th, td { text-align: left; padding: 8px; border-bottom: 1px solid var(--line); }
nav.tabs { display: flex; gap: 8px; margin-bottom: var(--gap); }
:focus-visible { outline: 3px solid var(--accent); outline-offset: 2px; }
</style>
</head>
<body class="{{FIDELITY_CLASS}}">
<p id="proto-banner" role="note">Prototype, not for production use. All data is made up.</p>
<main>

<!-- Repeat this block once per screen. The first screen shows first. -->
<section class="screen" id="{{SCREEN_ID}}" aria-label="{{SCREEN_NAME}}">
  <h1>{{SCREEN_HEADING}}</h1>
  {{SCREEN_CONTENT}}
  <button type="button" data-go="{{NEXT_SCREEN_ID}}">{{BUTTON_LABEL}}</button>
</section>

</main>
<script>
(function () {
  'use strict';
  var screens = Array.prototype.slice.call(document.querySelectorAll('.screen'));
  function show(id) {
    var found = false;
    screens.forEach(function (s) { var on = s.id === id; s.hidden = !on; if (on) { found = true; } });
    if (!found && screens.length) { screens[0].hidden = false; }
    window.scrollTo(0, 0);
  }
  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-go]');
    if (el) { e.preventDefault(); show(el.getAttribute('data-go')); }
  });
  document.addEventListener('submit', function (e) {
    e.preventDefault();
    var next = e.target.getAttribute('data-next');
    if (next) { show(next); }
  });
  document.addEventListener('input', function (e) {
    var id = e.target.getAttribute('data-filter');
    var list = id ? document.getElementById(id) : null;
    if (!list) { return; }
    var q = e.target.value.toLowerCase();
    Array.prototype.forEach.call(list.children, function (item) {
      item.hidden = q !== '' && item.textContent.toLowerCase().indexOf(q) === -1;
    });
  });
  if (screens.length) { show(screens[0].id); }
})();
</script>
</body>
</html>
```
