---
name: publish-brief
description: Ingest a brief's markdown into PRIMA as a tagged note, then link the resulting artefact to a Navigator project or action in one step. Use when a brief, plan or research synthesis should become searchable knowledge AND show up against the work it belongs to, or when the user says "publish this brief", "send this brief to PRIMA and link it", or invokes /publish-brief.
---

# publish-brief

One verb, two systems, no transaction between them.

```bash
python3 skills/publish-brief/publish_brief.py <brief.md> --project "<name or uuid>"
python3 skills/publish-brief/publish_brief.py <brief.md> --action <action-uuid>
```

The input is the **markdown** source a brief is authored from (see the
`peakstate-brief` skill), not the rendered HTML. Markdown is the durable form;
the HTML is a render of it.

## What it does, in order

1. Reads the brief's front matter and converts the body to the knowledge base's
   artefact markdown: `type: note`, the `brief` tag, the standfirst as the TLDR,
   one derived insight per section.
2. Resolves the target and the **origin** from the user's connection row. No
   connection row, no link: the origin is only knowable from there, and it is
   stamped on the attachment and never rewritten.
3. **Ingests to the knowledge base first.** The artefact's immutable uuid is the
   pointer, so it must exist before anything points at it.
4. **Writes the pointer second**, as an external attachment carrying the uuid,
   the origin and the brief's title.

## Options

| Flag | What |
|---|---|
| `--project` | project uuid, or its exact name for that user |
| `--action` | action uuid; its parent project is resolved for you |
| `--user` | owner uuid; defaults to `NAV_USER_ID` |
| `--tags` | extra tags, comma separated. `brief` is always present |
| `--author` | byline for the artefact |
| `--provenance` | the source of record, e.g. `<repo>, <path> @ <sha>` |
| `--sidecar-url` | URL of the SOURCED sidecar. Referenced, never inlined. Unset, a `<brief>.md.sourced` or `<brief>.html.sourced` file beside the source is used |
| `--nav-env` | an env file holding the two variables below |
| `--convert-only` | print the artefact markdown and write nothing |
| `--dry-run` | resolve everything, write nothing |
| `--self-check` | offline asserts over the conversion and the operation id |

## Configuration

| Variable | What |
|---|---|
| `NAV_SUPABASE_URL` | PostgREST origin of the Navigator database |
| `NAV_SERVICE_KEY` | service-role key for it |
| `NAV_USER_ID` | the owner, unless `--user` is given |
| `PRIMA_INGEST_URL` | optional override of the ingest webhook |
| `PRIMA_SKILL` | optional path to the `prima` skill's client |

The knowledge base's own credentials come from the `prima` skill. This verb does
not hold a second copy of them and does not implement a second client.

**Why a service key.** Navigator's token API attaches *files*: it uploads bytes.
There is no endpoint that creates an external pointer row. When one exists, this
becomes a bearer-token POST and the service key goes away.

## Idempotency

Three independent layers, so a retry is always safe:

- **The ingest upserts by slug** and keeps the artefact's uuid. Re-running with
  the same title cannot mint a second artefact. Measured, not assumed.
- **The pointer row is unique** per (target, kind, ref, origin). The verb reads
  before it writes and adopts an existing row rather than inserting a second.
- **A local ledger**, keyed by an operation id derived only from the origin, the
  target and the slug, records both ids and the content hash. An unchanged brief
  is not re-ingested; a recovered partial does the pointer half only.
- **An unconfirmed ingest records no content hash**, so it is never cached as
  done. "I do not know" must not become "done": the next run ingests again.

## Reporting

`OK` (exit 0), `PARTIAL` (exit 3), `FAILED` (exit 1). A partial always names both
what landed and what did not, and gives the command that finishes it.

- **Ingest refused the connection** → `FAILED`. Nothing was written anywhere.
- **Ingest answered 5xx or timed out** → `PARTIAL`, unconfirmed. The write may
  have landed and the read path cannot say, so no pointer is written. Re-run.
- **Artefact live, pointer failed** → `PARTIAL`, with the artefact uuid. Re-run;
  it skips the ingest.
- **Artefact live, derived items incomplete** → `PARTIAL`. The pointer is valid
  and the card renders; the artefact is under-indexed until a re-run.

A pointer to a missing artefact is impossible by construction, because the
pointer is only ever written after the uuid is known.

## Two contract details that are easy to get wrong

- **The origin must be the one the client writes to.** The connection's
  `base_url` is compared with the client's base before anything is written. A
  mismatch is refused, because the pointer would carry a uuid that does not
  exist on the host it names.
- **A fenced code block is copied through untouched**, and the target of
  `--action` is only accepted once its parent project is confirmed to belong to
  the owner.
- **The pointer is the uuid, never the slug.** A slug is derived from the title,
  so renaming a brief would break every pointer and two briefs sharing a title
  would collide. The slug is for display and routing only.
- **A quoted source keeps its attribution on the quote line.** Retrieval cuts
  the body into chunks at a fixed size and can separate a quote from the
  reference entry above it. Without the inline attribution, a quoted source
  comes back looking like the author's own conclusion.

## Known limit

A brief is ingested as a `note`, which is owner-commentary class. An agent
client at the public-corpus ceiling is told "not found" for one whether or not it
exists, so the `prima` skill cannot search or fetch a published brief until its
client is granted the higher ceiling. This is a grant, not a code change.

## Reconciling: `reconcile.py`

The publish verb writes. `reconcile.py` beside it reads, and reports where the two
systems have drifted apart. It changes nothing without `--repair --confirm`.

```bash
python3 skills/publish-brief/reconcile.py                 # report
python3 skills/publish-brief/reconcile.py --json          # the same, machine readable
python3 skills/publish-brief/reconcile.py --repair        # print the removals, change nothing
python3 skills/publish-brief/reconcile.py --repair --confirm
python3 skills/publish-brief/reconcile.py --self-check
```

Exit codes match the publish verb: `0` no drift · `3` drift or unknowns · `1` failed.

| Class | What it means | Can it be indeterminate? |
|---|---|---|
| `dangling` | a pointer whose artefact does not exist | no — it is only ever raised on the determinate read |
| `unknown` | the artefact could not be checked at all | this class **is** the indeterminate outcome |
| `unlinked` | a brief-tagged artefact with no pointer from this owner | yes, when the artefact list cannot be read |
| `duplicate` | one target carries two artefacts under one title, which a re-ingest under a fresh uuid produces | no, it is read entirely from the planner |
| `metadata` | the pointer's filename and the artefact's title disagree | no, it needs the artefact, so it is determinate by definition |
| `origin` | the pointer names a deployment that is not the owner's current connection, or the owner has no connection | no |
| `ledger` | the local record disagrees with the planner: an unfinished publish, a pointer that no longer exists, or an ingest left unconfirmed | no |

**Absence is never inferred from a "not found".** A brief is a `note`, the agent-surface
client sits at the public-corpus ceiling, and it is told "not found" for a note whether or
not one exists. So existence is decided on the knowledge base's own database, and where
that read is unavailable every pointer is reported `unknown` with the reason. `--repair`
only ever offers `dangling`, so an unknown can never be deleted.

## Deletion semantics

Nav holds no bytes for an external pointer, so no deletion on either side ever destroys
the other side's content. What a deletion destroys is the **link**, and the rules are:

| Deleted | Defined behaviour | What happens today |
|---|---|---|
| A project | every pointer on it goes with it; the artefact is untouched | as defined (`on delete cascade`) |
| An action | the action-level pointer goes; a project-level pointer to the same artefact survives | as defined (`on delete cascade`) — **but see the gap below** |
| The pointer row | the link goes, the artefact is untouched, no storage call is made | as defined |
| The connection row | existing pointers survive and stay resolvable through the origin stamped on them; no new link can be made | as defined (the origin guard refuses an insert with no connection) |
| The artefact | the pointer is left dangling and nothing notifies the planner | as defined; `reconcile` is the detector and `--repair` is the cure |

**The gap, stated plainly.** When a brief is linked to an action and to nothing else,
deleting that action removes the artefact's only link and nothing says so. The cascade is
right — a link to an action is meaningless once the action is gone — so the fix is not a
different foreign key, it is detection: `reconcile` reports it as `ledger` drift, naming
the artefact and the pointer that vanished, and the cure is to run the publish verb against
a target that still exists. Demoting the link to project level on delete was rejected: it
would collide with an existing project-level link and make an ordinary action delete fail.
