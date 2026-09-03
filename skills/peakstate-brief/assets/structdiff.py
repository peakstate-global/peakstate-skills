#!/usr/bin/env python3
"""Structural diff of two brief HTML files.

Canonical form per file: the ordered stream of structural elements inside
<main> (tag, id, class, data-* attributes), plus the whitespace-normalised
text of each section, plus the id/anchor sets. Presentational differences the
comparison deliberately ignores: b vs strong, i vs em, thead/tbody wrappers,
HTML entities vs their characters, and whitespace.

    python3 structdiff.py a.html b.html
"""
import re
import sys
import unicodedata
from html.parser import HTMLParser

STRUCTURAL = {"main", "header", "section", "h1", "h2", "h3", "h4", "nav", "ol", "ul",
              "li", "table", "tr", "th", "td", "dl", "dt", "dd", "blockquote", "pre",
              "sup", "dl", "div", "p"}
NOISE_CLASS = {"tick"}


class Skel(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.rows = []
        self.text = []
        self.ids = set()
        self.anchors = []

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if "id" in a:
            self.ids.add(a["id"])
        href = a.get("href", "")
        if href.startswith("#"):
            self.anchors.append(href[1:])
        if tag in ("b", "strong"):
            tag = "strong"
        if tag in ("i", "em"):
            tag = "em"
        if tag in ("thead", "tbody"):
            return
        if tag not in STRUCTURAL and tag not in ("strong", "em", "a", "code", "span"):
            return
        cls = " ".join(sorted(set(a.get("class", "").split()) - NOISE_CLASS))
        data = " ".join("%s=%s" % (k, v) for k, v in sorted(a.items()) if k.startswith("data-"))
        self.rows.append(" ".join(x for x in (tag, a.get("id", ""), cls, data) if x))

    def handle_data(self, d):
        self.text.append(d)


def norm_text(s):
    s = unicodedata.normalize("NFC", s)
    s = s.replace("\u2014", "-").replace("\u2013", "-").replace("\u2026", "...")
    s = s.replace("\u00b7", "-").replace("\u2019", "'").replace("\u201c", '"').replace("\u201d", '"')
    return re.sub(r"\s+", " ", s).strip()


def skeleton(path, drop=()):
    html = open(path, encoding="utf-8").read()
    main = re.search(r"<main>.*</main>", html, re.S).group(0)
    for sid in drop:
        main = re.sub(r'<section[^>]*id="%s".*?</section>' % sid, "", main, flags=re.S)
    p = Skel()
    p.feed(main)
    return p


def report(name, a, b):
    if a == b:
        print("  OK   %s (%d)" % (name, len(a)))
        return 0
    print("  FAIL %s" % name)
    for i, (x, y) in enumerate(zip(a, b)):
        if x != y:
            print("       first difference at %d:\n         expected: %r\n         got:      %r" % (i, x, y))
            break
    if len(a) != len(b):
        print("       length %d vs %d" % (len(a), len(b)))
        extra = a[len(b):] or b[len(a):]
        print("       tail: %r" % (extra[:5],))
    return 1


def main():
    drop = [x[len("--drop="):] for x in sys.argv[3:] if x.startswith("--drop=")]
    a, b = skeleton(sys.argv[1], drop), skeleton(sys.argv[2], drop)
    bad = 0
    print("structural diff: %s  vs  %s" % (sys.argv[1], sys.argv[2]))
    bad += report("element skeleton", a.rows, b.rows)
    bad += report("text stream", norm_text("".join(a.text)).split(" "),
                  norm_text("".join(b.text)).split(" "))
    bad += report("ids", sorted(a.ids), sorted(b.ids))
    dead_a = [x for x in a.anchors if x not in a.ids]
    dead_b = [x for x in b.anchors if x not in b.ids]
    bad += report("anchors resolve", dead_a, dead_b)
    print("RESULT:", "EQUIVALENT" if not bad else "%d difference group(s)" % bad)
    sys.exit(1 if bad else 0)


main()
