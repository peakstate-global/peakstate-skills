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
| `--sidecar-url` | URL of the SOURCED sidecar. Referenced, never inlined |
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
