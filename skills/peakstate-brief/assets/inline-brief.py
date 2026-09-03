#!/usr/bin/env python3
"""Make an already-delivered brief self-contained, in place.

    python3 inline-brief.py <brief.html> [more.html ...]
    python3 inline-brief.py --check <brief.html>     report, change nothing
    python3 inline-brief.py --self-check

`build-brief.mjs` inlines the runtime when it renders from markdown. This does
the same job to a brief that already exists, which matters because most briefs
worth fixing were delivered before inlining existed and no longer have their
markdown source. Converting HTML back to markdown and re-rendering would risk
the content; this touches only the two tags that load the runtime.

What it replaces:

  <link rel="stylesheet" href="brief.css" ...>  + the CDN bootstrap <script>
  <script src="brief.js" ...></script>

with the current brief.css and brief.js inlined. Everything between <main> and
</main> is untouched, byte for byte, and that is asserted before the file is
written. A brief is a delivered document; the one thing this must never do is
alter what it says.

A reader's ticks, answers and comments live in localStorage under the brief id,
which this does not touch, so they survive.
"""

import argparse
import re
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent

CSS_TAG = re.compile(r'<link rel="stylesheet" href="brief\.css"[^>]*>', re.I)
BOOTSTRAP = re.compile(r'<script>\s*(?:/\*[\s\S]*?\*/\s*)?var BRIEF_CDN[\s\S]*?</script>', re.I)
JS_TAG = re.compile(r'<script src="brief\.js"[^>]*>\s*</script>', re.I)
MAIN = re.compile(r'<main\b[\s\S]*</main>', re.I)


def body(html: str) -> str:
    """The content, normalised for comparison. Whitespace between tags is not content."""
    m = MAIN.search(html)
    return re.sub(r'\s+', ' ', m.group(0)) if m else ''


def classify(html: str) -> str:
    if '<script src="brief.js"' in html or CSS_TAG.search(html):
        # BRIEF_CDN, not a hostname: the fallback outlives whichever CDN it named.
        return 'cdn-fallback' if BOOTSTRAP.search(html) else 'linked-only'
    return 'self-contained'


def inline(html: str, css: str, js: str) -> str:
    """Swap the loader tags for the runtime itself. Raises if it cannot be done safely."""
    for name, text, tag in (('brief.css', css, 'style'), ('brief.js', js, 'script')):
        if re.search(r'</' + tag, text, re.I):
            raise ValueError(f'{name} contains a closing </{tag}> and cannot be inlined safely')

    # A lambda replacement, never a string: re.sub reads backslashes in a string
    # replacement as group escapes, and brief.js is full of \u, \n and \d inside
    # its regexes. A string here fails on the real asset and passes on any
    # fixture simple enough to write by hand, which is exactly how it got through.
    out = BOOTSTRAP.sub(lambda _: '', html)
    out = CSS_TAG.sub(lambda _: '<style>\n' + css + '\n</style>', out)
    out = JS_TAG.sub(lambda _: '<script>\n' + js + '\n</script>', out)

    if '<style>' not in out or 'briefUI' not in out:
        raise ValueError('the runtime did not land — the file does not match the expected shape')
    if body(out) != body(html):
        raise ValueError('the document body changed; refusing to write')
    return out


def run(paths, check_only: bool) -> int:
    css = (HERE / 'brief.css').read_text(encoding='utf-8')
    js = (HERE / 'brief.js').read_text(encoding='utf-8')
    failed = 0
    for p in paths:
        p = Path(p)
        try:
            html = p.read_text(encoding='utf-8')
        except OSError as e:
            print(f'  FAILED       {p}: {e}')
            failed += 1
            continue
        if 'data-brief-id' not in html:
            print(f'  skipped      {p}: not a brief')
            continue
        # The skill's own template and smoke-test fixture carry data-brief-id and
        # are therefore indistinguishable from a brief by content alone. They are
        # sources, not deliverables: inlining them destroys the very tags the
        # renderer substitutes. Caught the hard way, on a batch run.
        if '{{BRIEF_ID}}' in html or p.name in ('brief-template.html', 'test-fixture.html'):
            print(f'  skipped      {p}: a source file, not a delivered brief')
            continue
        kind = classify(html)
        if kind == 'self-contained':
            print(f'  already ok   {p}')
            continue
        if check_only:
            print(f'  would fix    {p}  ({kind})')
            continue
        try:
            out = inline(html, css, js)
        except ValueError as e:
            print(f'  FAILED       {p}: {e}')
            failed += 1
            continue
        tmp = p.with_suffix(p.suffix + '.tmp')
        tmp.write_text(out, encoding='utf-8')
        tmp.replace(p)
        print(f'  inlined      {p}  ({kind}, {len(html) // 1024}K -> {len(out) // 1024}K)')
    return 1 if failed else 0


def self_check() -> int:
    # Backslashes on purpose. A fixture without them passes even when the
    # replacement is a plain string, which is the bug this pair now catches.
    css, js = '.x{color:red}\\2014', r'var briefUI={}; var re=/\u00e9\n\d/g; var s="c:\\path";'
    linked = ('<html><head><link rel="stylesheet" href="brief.css" onerror="briefCdnCss(this)">'
              '<script>\nvar BRIEF_CDN = "https://cdn.example/x";\nfunction f(){}\n</script>'
              '</head><body data-brief-id="t"><main><p>content</p></main>'
              '<script src="brief.js" onerror="briefCdnJs(this)"></script></body></html>')
    assert classify(linked) == 'cdn-fallback'
    out = inline(linked, css, js)
    assert classify(out) == 'self-contained', 'a second run is a no-op'
    assert 'cdn.example' not in out, 'the CDN bootstrap is removed'
    assert 'href="brief.css"' not in out and 'src="brief.js"' not in out
    assert css in out and js in out, 'assets land byte-for-byte, backslashes included'
    assert '<p>content</p>' in out, 'the document survives'
    assert body(out) == body(linked), 'the body is byte-identical after normalising whitespace'
    try:
        inline(linked, '</style>', js)
    except ValueError:
        pass
    else:
        raise AssertionError('a closing tag inside an asset must be refused')
    plain = linked.replace(' onerror="briefCdnCss(this)"', '').replace(
        '<script>\nvar BRIEF_CDN = "https://cdn.example/x";\nfunction f(){}\n</script>', '')
    assert classify(plain) == 'linked-only'
    assert classify(inline(plain, css, js)) == 'self-contained'

    # The template carries data-brief-id, so content alone cannot tell it from a
    # brief. A batch run inlined it and broke the renderer until git restored it.
    import tempfile
    with tempfile.TemporaryDirectory() as d:
        tpl = Path(d) / 'brief-template.html'
        tpl.write_text(linked.replace('data-brief-id="t"', 'data-brief-id="{{BRIEF_ID}}"'))
        before = tpl.read_text()
        run([tpl], check_only=False)
        assert tpl.read_text() == before, 'the template must never be rewritten'
    print('inline-brief: all checks passed')
    return 0


if __name__ == '__main__':
    ap = argparse.ArgumentParser(description=__doc__.split('\n')[0])
    ap.add_argument('paths', nargs='*')
    ap.add_argument('--check', action='store_true', help='report, change nothing')
    ap.add_argument('--self-check', action='store_true')
    a = ap.parse_args()
    if a.self_check:
        sys.exit(self_check())
    if not a.paths:
        ap.error('give at least one .html file')
    sys.exit(run(a.paths, a.check))
