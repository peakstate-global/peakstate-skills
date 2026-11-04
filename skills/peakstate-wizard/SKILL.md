---
name: peakstate-wizard
description: Long manual procedures fail part-way, leave secrets in chat logs and make people do steps a machine could do. This skill builds a combo wizard for one such procedure. A browser companion walks the person through it one step per page, with saved progress, comments and deep links, and short terminal segments do the parts that need code or a secret, each stage ending in PASS or FAIL. Every step opens with why it exists, and every hand step passes a five-rung hands audit that asks first whether Claude can do it instead. Use when someone says "make a wizard", "walk me through this", "combo wizard", "I need a runbook I can click through", or faces a multi-stage setup, migration, key rotation or cutover that mixes clicks, terminal commands and secrets.
license: Apache-2.0
metadata:
  author: "Peak State Global"
  source: "https://github.com/peakstate-global/peakstate-skills"
  version: "0.1"
  profile: "artefact"
  output: "file"
---

This skill builds a combo wizard, an HTML companion plus short terminal segments, that takes a person through a long procedure and leaves them only the steps a machine cannot do.

## Adapt to your host

Hosts differ, and the same host differs by plan and by organisation. Before you
make the output, check what you can do here.

1. List the tools you can call right now, such as code execution, file creation,
   image generation or a live preview (an artifact or a canvas).
2. Take the first rung of the ladder below that your tools support. Trust your
   own tool list over any host name or table.
3. Tell the user in one line which rung you took and why. For example: "There is
   no file tool here, so the SVG is in a code block for you to save."
4. If the user names a format, use that format instead of the ladder.

### Ladder

This skill uses the file ladder: write the wizard folder to disk and run the lint and the dry runs yourself; then, with file tools but no shell, write the files and give the user the lint and dry-run commands; then one code block per file for the user to save, with the same commands. A companion needs the peakstate-brief builder; where it is missing, deliver the markdown source and the segments, and say the page is not built.

## Steps

Ask at most three questions in the whole run, one per reply, and only what the procedure and the files in front of you do not answer.

1. **Scope the procedure.** List every step in order, from the person's request, the repo, the vendor's current documentation and any plan they point to. Read before you ask. Mark each value the procedure produces and where it goes, and mark which values are secret.
2. **Run the hands audit on every step.** Climb the five-rung ladder in `references/hands-audit.md` and stop at the first rung that holds: Claude does it; Claude with a scoped, short-lived credential; the person's terminal holds the secret and a script does the rest; Claude prepares and the person clicks or pastes once; by hand. For each step, ask first whether a lower rung works (a temporary scoped token, an API, SSH, a headless browser). Only what fails every lower rung reaches the person. Do the rung 1 and rung 2 work now, before you build, and record it as a Claude step with its result.
3. **Write each step's Why block.** Every step opens with `**Why:**` and one or two concrete sentences: why the step exists at all, the purpose, and the harm it prevents. The person who asks "why do I need to do this at all?" finds the answer on the page. The Why block comes before the hands-audit line.
4. **Write the hands-audit line.** Every Hands and Terminal step carries `**Why this is yours (rung N, short name):**` straight after the Why block, naming the rung and why the lower rungs fail.
5. **Group the stages and segments.** Each `#` part is a stage of the journey, and its lede says what to have ready, how long it takes, and where it is safe to stop. Group consecutive Terminal steps into segments of at most six stages, the preflight first. Use the six step kinds: Read, Hands, Terminal, Claude, Date gate, Decision.
6. **Write the companion.** Write `<name>.md` in a new wizard folder from `references/companion.md`, and paste its add-on block in unchanged. Give every step a stable id. State an irreversible step's warning first, after its Why lines. Name each secret's slot ("the terminal asks for the key at a hidden prompt") and never put a secret, or a place to type one, on the page. Every instruction matches how the thing really runs: a background job gets its exact stop command, never "press Ctrl-C".
7. **Write each segment.** Copy the library from `references/segment.md` into `<segment>.sh`, then write the stages below it. Each segment is idempotent, takes `--from N` and `--dry-run`, ends every stage with PASS or FAIL, writes `wizard-status.js` beside the HTML, and writes a fix request on failure. Follow its safety rules: restore the safe state (eject, lock, close) before writing any fix request; never name a sensitive path or value in a fix request; run the safety check on every start, `--from N` included, and again right before the dangerous moment; re-check the preconditions of the stage `--from N` jumps to; verify the end state before saying done; never advise destroying existing data when the failure may be a typo.
8. **Schedule the date gates.** For each Date gate, if `wizard-schedule` is on PATH, run `wizard-schedule <brief-id> <step id> "<deep link>" <YYYY-MM-DD> "<title>"`, where the deep link is the companion's `file://` address plus `#` and the step id. The reminder is keyed on the brief-id and the step id, so a rerun with a new date moves the date and never makes a second one. If it is not on PATH, give the date and a pre-filled Google Calendar link in your reply.
9. **Check, then build.** Write out `references/wizard-lint.md` as `wizard-lint.py` and run it until it passes. Run every segment's three dry runs from `references/segment.md`. Never run a real segment yourself. Build the page with the peakstate-brief builder.
10. **Deliver.** Give the path to the HTML companion, the first command to paste, any date gates and what each dry run showed. When the person sends comments or a fix request back, fix the wizard, rebuild with the same `brief-id` and step ids, and say which segment to rerun with which `--from`.

## The take-away

In this order:

- The procedure in one sentence, and the number of steps that reached the person against the number in the procedure.
- The hands audit as a table: each step, its kind, its rung and the one-line reason.
- The rung of the file ladder you took, in one line.
- The wizard folder: `<name>.html` (the companion), `<name>.md` (its source), one `<segment>.sh` per segment, `wizard-lint.py` and `.gitignore`. See `references/example.md` for a complete one.
- The first command to paste, as one fenced block with a `cd` into the wizard folder.
- The lint result and each segment's dry-run results, with what each proved.
- The date gates: scheduled with `wizard-schedule`, or the date and the calendar link.
- What is still `[to confirm]`, such as a menu path you could not check, or "Nothing to confirm."

Any fact from memory, such as a vendor's menu path, is labelled RECALLED until checked against the vendor's current documentation.

## Next

Your next three moves. Each has an owner, a first action and an observable result.

1. You open the companion and read every page before you start. Result: no step surprises you, and any comment goes back through Copy or Download.
2. You run the first segment from the companion's first Terminal page. Result: the page ticks each stage as the terminal prints PASS.
3. You send any fix request to Claude, then rerun the segment with the `--from` it names. Result: the segment ends with "Segment complete" and the page moves on by itself.

## Self-check before you deliver

- Every step opens with a `**Why:**` block of one or two concrete sentences that says what goes wrong if the step is skipped.
- Every Hands and Terminal step has a hands-audit line naming its rung, and you tried every lower rung first.
- No secret, secret-shaped value or password field is on the page or in the payload, and every secret is read at a hidden prompt in the terminal.
- Every segment has at most six stages, the preflight first, and restores the safe state before it writes a fix request.
- Fix requests name no sensitive path or value, and no fail message advises deleting data that a typo could explain.
- Every instruction matches how the step really runs, including the stop command for a background job.
- `wizard-lint.py` passes, and each segment passed its three dry runs. You ran no real segment.
- The public files name no person, private service, personal domain, home path, email or credential.

## Read this when

| File | When |
|---|---|
| `references/hands-audit.md` | Auditing who does each step, or writing a Why block or a hands-audit line |
| `references/companion.md` | Writing the companion source, the step kinds, date gates, or pasting the add-on block |
| `references/segment.md` | Writing a terminal segment: the rules, the safety rules, the library and the skeleton |
| `references/wizard-lint.md` | Writing out and running the lint |
| `references/example.md` | Checking shape and tone against a complete small wizard |

Sources for the libraries in this skill: SOURCES.md. Open it only if the user asks where an entry comes from.
