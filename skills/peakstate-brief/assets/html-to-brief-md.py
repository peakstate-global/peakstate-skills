#!/usr/bin/env python3
"""Convert a hand-authored brief HTML back into build-brief markdown.

The migration path for a brief written before the skill became markdown-first.
It is a one-way tool: convert once, keep the markdown, then author the markdown
from then on.

    python3 html-to-brief-md.py old-brief.html > old-brief.md
    node build-brief.mjs old-brief.md /tmp/rebuilt.html
    python3 structdiff.py old-brief.html /tmp/rebuilt.html --drop=s-toc

The third step is the point: it proves the conversion lost nothing. Drop the
contents section from the comparison, because build-brief generates that list
from the headings rather than carrying the hand-written one across.

Anything with no markdown equivalent (a styled table, an inline diagram, a
classed paragraph) is emitted inside a :::html block, so it survives verbatim.
"""
import re
import sys
from html.parser import HTMLParser

VOID = {"br", "hr", "img", "input", "meta", "link", "source"}
PARTWORDS = ("zero", "one", "two", "three", "four", "five", "six", "seven",
             "eight", "nine", "ten", "eleven", "twelve")


class Node:
    def __init__(self, tag, attrs=None):
        self.tag = tag
        self.attrs = dict(attrs or [])
        self.kids = []
        self.text = ""

    def cls(self):
        return self.attrs.get("class", "").split()


class Tree(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.root = Node("#root")
        self.stack = [self.root]

    def handle_starttag(self, tag, attrs):
        n = Node(tag, attrs)
        self.stack[-1].kids.append(n)
        if tag not in VOID:
            self.stack.append(n)

    def handle_startendtag(self, tag, attrs):
        self.stack[-1].kids.append(Node(tag, attrs))

    def handle_endtag(self, tag):
        for i in range(len(self.stack) - 1, 0, -1):
            if self.stack[i].tag == tag:
                del self.stack[i:]
                return

    def handle_data(self, data):
        t = Node("#text")
        t.text = data
        self.stack[-1].kids.append(t)


def find(node, pred):
    if pred(node):
        return node
    for k in node.kids:
        r = find(k, pred)
        if r:
            return r
    return None


def ws(s):
    return re.sub(r"\s+", " ", s)


def inline(node):
    """Element subtree -> inline markdown."""
    out = []
    for k in node.kids:
        if k.tag == "#text":
            out.append(ws(k.text))
        elif k.tag in ("b", "strong"):
            out.append("**" + inline(k).strip() + "**")
        elif k.tag in ("i", "em"):
            out.append("*" + inline(k).strip() + "*")
        elif k.tag == "code":
            out.append("`" + inline(k).strip() + "`")
        elif k.tag == "a":
            out.append("[" + inline(k).strip() + "](" + k.attrs.get("href", "") + ")")
        elif k.tag == "sup" and "fn" in k.cls():
            out.append(fnmarker(k))
        elif k.tag == "br":
            out.append(" ")
        else:
            out.append(inline(k))
    return ws("".join(out))


def fnmarker(node):
    """<sup class="fn"><a href="#refN-qM">N</a></sup> -> [^N] or [^NqM]."""
    a = find(node, lambda n: n.tag == "a")
    m = re.match(r"#ref(\d+)-q(\d+)$", a.attrs.get("href", "") if a else "")
    if not m:
        return inline(node)
    return "[^%s]" % m.group(1) if m.group(2) == "1" else "[^%sq%s]" % m.groups()


def esc(s, quote=False):
    """The parser decodes entities, so serialising has to put them back."""
    s = s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
    return s.replace('"', "&quot;") if quote else s


def serialise(node):
    """Element subtree -> raw HTML, for the :::html escape hatch."""
    if node.tag == "#text":
        return esc(node.text)
    attrs = "".join((" " + k) if v is None else ' %s="%s"' % (k, esc(v, True))
                    for k, v in node.attrs.items())
    if node.tag in VOID:
        return "<%s%s>" % (node.tag, attrs)
    return "<%s%s>%s</%s>" % (node.tag, attrs, "".join(serialise(k) for k in node.kids), node.tag)


def textof(node):
    if node.tag == "#text":
        return node.text
    return "".join(textof(k) for k in node.kids)


def raw(node):
    return ":::html\n" + serialise(node).strip() + "\n:::"


def listmd(node, depth=0):
    marker = "1." if node.tag == "ol" else "-"
    lines = []
    n = 0
    for li in [k for k in node.kids if k.tag == "li"]:
        n += 1
        lead = ("%d." % n) if node.tag == "ol" else marker
        own = Node("li")
        own.kids = [k for k in li.kids if k.tag not in ("ul", "ol")]
        lines.append("   " * depth + lead + " " + inline(own))
        for sub in [k for k in li.kids if k.tag in ("ul", "ol")]:
            lines.append(listmd(sub, depth + 1))
    return "\n".join(lines)


def reflistmd(node):
    """<ol class="reflist"> -> [^n] footnote definitions, keeping every refN-qM.

    One definition per source, its APA entry on the first line, then the
    optional note, then one quoted line per pull quote with its locator after
    ` -- `. build-brief re-derives the ids from that order, so the anchors a
    footnote marker points at survive the migration.
    """
    out = []
    for li in [k for k in node.kids if k.tag == "li"]:
        n = re.sub(r"\D", "", li.attrs.get("id", "")) or str(len(out) + 1)
        apa = find(li, lambda x: x.tag == "span" and "apa" in x.cls())
        # An APA entry ends in a naked URL that renderRefs autolinks itself, so
        # a self-titled link goes back to being a bare URL.
        out.append("[^%s]: %s" % (n, re.sub(r"\[([^\]]+)\]\(\1\)", r"\1",
                                            inline(apa if apa else li))))
        note = find(li, lambda x: "apa-note" in x.cls())
        if note:
            out.append("    note: " + inline(note))
        for q in [k for k in li.kids if k.tag == "blockquote"]:
            qref = find(q, lambda x: "qref" in x.cls())
            body = Node("blockquote")
            body.kids = [k for k in q.kids if k is not qref]
            out.append("    > " + inline(body) + (" -- " + inline(qref) if qref else ""))
    return "\n".join(out)


def blockmd(node):
    cls = node.cls()
    if node.tag == "#text":
        return ws(node.text).strip() and ws(node.text).strip() or ""
    if node.tag == "p":
        if "assume" in cls:
            t = inline(node)
            t = t.replace("**My assumption:**", "My assumption:")
            t = t.replace("**If wrong:**", "\nIf wrong:")
            return t.strip()
        if cls:
            # A classed paragraph (.cost, .flag, .ex-label) has no markdown
            # equivalent; it goes through the raw escape hatch.
            return raw(node)
        return inline(node)
    if node.tag in ("ul", "ol"):
        if "reflist" in cls:
            return reflistmd(node)
        if "options" in cls:
            out = []
            for li in [k for k in node.kids if k.tag == "li"]:
                t = inline(li)
                t = re.sub(r"^\*\*([a-z]\))\*\*\s*", r"\1 ", t)
                out.append(t)
            return "\n".join(out)
        return listmd(node)
    if node.tag in ("h3", "h4", "h5"):
        return "#" * (int(node.tag[1]) - 1) + " " + inline(node)
    if node.tag == "pre":
        return "````\n" + textof(node).strip("\n") + "\n````"
    if node.tag == "hr":
        return "---"
    if node.tag == "blockquote":
        return "\n".join("> " + l for l in inline(node).split("\n"))
    if node.tag == "dl":
        out = []
        for k in node.kids:
            if k.tag == "dt":
                out.append(inline(k))
            elif k.tag == "dd":
                out[-1] += "\n: " + inline(k)
        return "\n\n".join(out)
    if node.tag == "div" and set(cls) & {"verdict", "cost", "phase", "flag", "cap"}:
        inner = "\n\n".join(x for x in (blockmd(k) for k in node.kids if k.tag != "#text") if x)
        return ":::" + " ".join(cls) + "\n" + inner + "\n:::"
    return raw(node)


def convert(path):
    html = open(path, encoding="utf-8").read()
    main = re.search(r"<main>.*</main>", html, re.S).group(0)
    tree = Tree()
    tree.feed(main)
    root = find(tree.root, lambda n: n.tag == "main")

    head = find(root, lambda n: "brief-title" in n.cls())
    meta = {
        "title": inline(find(head, lambda n: n.tag == "h1")),
        "brief-id": re.search(r'data-brief-id="([^"]+)"', html).group(1),
        "eyebrow": inline(find(head, lambda n: "eyebrow" in n.cls())),
        "sub": inline(find(head, lambda n: "sub" in n.cls())),
    }
    addressed = re.search(r'<body[^>]*\sdata-addressed="([^"]*)"', html)
    if addressed:
        meta["addressed"] = addressed.group(1).replace("&quot;", '"').replace("&amp;", "&")
    page = re.search(r"<title>([^<]*)</title>", html).group(1)
    if page != meta["title"]:
        meta["head-title"] = page

    # Carry the hand-written contents labels/notes onto their headings, so the
    # regenerated contents list reproduces the original wording.
    toc = {}
    tocnav = find(root, lambda n: "toc" in n.cls())
    if tocnav:
        items = []

        def walk(n):
            for k in n.kids:
                if k.tag == "li":
                    items.append(k)
                walk(k)

        walk(tocnav)
        for li in items:
            own = Node("li")
            own.kids = [k for k in li.kids if k.tag not in ("ul", "ol")]
            a = find(own, lambda n: n.tag == "a")
            note = find(own, lambda n: "tnote" in n.cls())
            if a:
                toc[a.attrs.get("href", "")[1:]] = (inline(a), inline(note) if note else "")

    out = ["---"] + ["%s: %s" % (k, v) for k, v in meta.items()] + ["---", ""]
    for node in root.kids:
        if node.tag == "#text" or node is head:
            continue
        cls = node.cls()
        if node.tag == "h2" and "part" in cls:
            title = inline(node)
            # The old r"^Part \w+\s*" had no token boundary: with no space
            # after </span> the greedy \w+ ate "oneThe" and the title lost its
            # first word. Anchor on the actual part words, and refuse to split
            # one ("onerous") in half.
            title = re.sub(r"^Part (?:%s)(?![a-z])\s*" % "|".join(PARTWORDS), "", title).strip()
            out += ["# " + title, ""]
        elif node.tag == "p" and "partlede" in cls:
            out += [inline(node), ""]
        elif node.tag == "section":
            h = find(node, lambda n: n.tag in ("h3", "h2") and n is not node)
            title = inline(h)
            qid = node.attrs.get("data-q")
            if qid:
                title = re.sub(r"^" + qid + r"\s*", "", title).strip()
                head_line = "## %s %s" % (qid, title)
            else:
                head_line = "## " + title
                slug = re.sub(r"[^a-z0-9]+", "-", title.lower()).strip("-")
                if node.attrs.get("id") not in ("s-" + slug, "s-toc"):
                    head_line += " {#%s}" % node.attrs["id"]
            label, note = toc.get(node.attrs.get("id", ""), ("", ""))
            if qid:
                label = re.sub(r"^" + qid + r"\s*[-\u2014]\s*", "", label).strip()
            if label == title:
                label = ""
            if label or note:
                head_line += " :: " + (label + " | " + note if label else note)
            out += [head_line, ""]
            body = find(node, lambda n: set(n.cls()) & {"sec-body", "q-body"})
            if node.attrs.get("id") == "s-toc":
                out += [""]
                continue
            for k in body.kids:
                if k.tag == "#text":
                    continue
                md = blockmd(k)
                if md.strip():
                    out += [md, ""]
    return "\n".join(out).rstrip() + "\n"


if __name__ == "__main__":
    sys.stdout.write(convert(sys.argv[1]))
