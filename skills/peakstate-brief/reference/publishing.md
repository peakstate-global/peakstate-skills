## Publishing a brief to a reader who is not you

A brief is written for one reader who already knows everything about you. Publishing it
sends it to a stranger. Three things make that safe, and they are the only three ways a
published brief may differ from the local one. Divergence for any other reason is a
defect: no rewriting for a stranger's benefit, no separate published edition, no
improved opening.

### 1. `private: true` drops a section

Put `private: true` on its own line anywhere in an H3 section. The section renders
normally in the ordinary build and is absent from the published one. The directive
itself never prints in either.

```
## What this means for your own week
private: true

Prose that only makes sense to the person who commissioned this.
```

Numbering is left alone. A reference cited only from a dropped section keeps its number
and stays in the list, uncited — renumbering would make the two documents differ for a
reason that is not privacy, and would break a citation someone had already written down.
A whole part left empty is dropped, which does shift part numbers; the alternative is a
part heading with nothing under it, announcing the removal it was meant to make quiet.

**Two things still fail the build, in both renders.** A footnote marker with no target,
which is what happens if you make the section holding a definition private. And an
internal link with no target, which is what happens if prose elsewhere cross-references
a section you dropped. Both are loud on purpose.

### 2. `origin:` cites the source, not your copy of it

An entry in your own library is usually a copy of somebody else's work. Citing the copy
credits the wrong party and sends the reader to a page they cannot open. Add an
`origin:` line to the reference, in the same place a `note:` goes:

```
[^7]: Library, T. (2024). A copy of a talk. https://library.example/artefact/a-talk
origin: Speaker, S. (2023). The talk itself. https://origin.example/talk
note: Read through the library copy, not the recording.
> the quoted sentence -- 04:11
```

The published render shows the origin entry and no library URL. The note goes with the
copy, because it describes reaching a document the published version no longer cites.
The quotes stay: they are verbatim from the same material.

Cite your own library only where it genuinely is the origin — your own note or synthesis
— and then as your own corpus, with no login-walled URL. **A library reference with no
`origin:` is refused by the scanner rather than quietly published.**

### 3. `check-publishable.py` reads the published render before it goes

```
node assets/build-brief.mjs my-brief.md --publish     # -> my-brief.publish.html
python3 assets/check-publishable.py my-brief.publish.html
python3 assets/check-publishable.py --json my-brief.publish.html   # for a caller
```

`--publish` writes to a different filename on purpose, so the ordinary render and
the published one can never be confused for each other.

Four refuse-by-default classes: you and your family, tooling exhaust, secrets and private
infrastructure, other people's private material. Each finding carries the line, the match,
why, and a concrete replacement where one is derivable — `null` where the only honest
answer is to cut the sentence.

**The exit code is not the interface.** The findings are, because each one needs a choice:
sanitise, block, or publish anyway. Only the first two are ever recommended; publish-anyway
is the author's call alone.

Real names cannot live in a public repo, so put them one per line in
`~/.claude/brief-private-terms.txt` (or pass `--terms <file>`). Without that file the
scanner cannot catch your family, which is the first thing it is for.

### Front matter

```
publish-slug: where-briefs-live      # stable id on the server; written back after the first publish
visibility: private                  # private (default) | unlisted
```

Both land on `<body>` in the published render only, so a brief that was never published
cannot be mistaken for one that was. Private is the default, exactly as it is for decks:
publishing means storing, not sharing.
