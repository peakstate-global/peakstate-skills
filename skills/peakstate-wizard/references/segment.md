# Terminal segments

A segment is a short terminal wizard that covers a run of consecutive Terminal steps. It is the
house terminal-wizard pattern (why first, numbered steps, white space, PASS or FAIL decided by
the script) with a status file and a fix request added, so the companion page can follow it.

## The rules

- **At most six stages, the preflight first.** Stage 1 is named `Preflight ...`. It checks every
  tool, file and folder the later stages need, and refuses with a plain message when one is
  missing. Split a longer run into two segments.
- **Idempotent.** Running it again is safe. A stage that finds its work already done says so and
  passes.
- **`--from N` and `--dry-run`.** `--from N` starts at stage N. `--dry-run` uses synthetic data in
  a temp folder and makes no real change. `WIZARD_DRY_FAIL=N` forces a failure at stage N in a
  dry run only, to prove the failure path.
- **PASS or FAIL per stage, decided by the script.** Each stage ends with a check the script runs
  itself (a file test, a command's answer, an HTTP status). The person never judges a log.
- **The status file sits in the segment's own folder.** The segment writes `wizard-status.js`
  beside itself, atomically, after every stage. A dry run writes it in the temp folder instead.
  When one companion serves segments in several folders, each Terminal page names its folder with
  `data-dir`, and the page reads that folder's file.
- **Every failure writes a fix request.** It holds the stage, the error line, the ledger name and
  the rerun command, and nothing else.

## The safety rules

These come from a reviewed segment that handled a file holding every password in plain text.
Apply them whenever a failure could leave something unsafe (a decrypted file, a mounted volume, a
half-written key, an open session).

- **Restore the safe state before writing any fix request.** Set `DANGER_FROM` to the first stage
  whose failure leaves something unsafe. From that stage on, `fail` calls `restore_safe` (eject,
  lock, close, delete the temp file) first, and only then writes the fix request. A Ctrl-C, a kill
  signal or an unexpected error goes through `fail` too.
- **If the restore fails, say only how to restore by hand.** The fix request then carries the
  one `SAFE_BY_HAND` sentence and nothing else, and the page says "Do not open Claude yet".
- **Fix requests never name a sensitive path or value.** Add every secret, and every path that
  reveals one, to `SENSITIVE` the moment the script knows it. `scrub` replaces them in the ledger
  and the status file. Write error messages that name a thing ("the image", "the key file"), not
  its path.
- **The safety check runs on every start, `--from N` included, and again right before the
  dangerous moment.** The library calls `safety_check` before the first stage that runs. Call it
  again inside the stage, straight before the step that creates the risk.
- **`--from N` re-checks the preconditions of the stage it jumps to.** The library calls
  `require_N` before every `stage_N`. Put there what stage N needs from the stages before it.
- **"Done" verifies the end state.** `verify_end_state` checks the state the segment promised (a
  file mode, a closed volume, a removed temp file). The segment reports done only when it holds.
- **Never advise destroying existing data when the failure may be a typo.** A wrong passphrase
  and a corrupt file look the same to a script. Advise deleting only what this run made, and only
  when the script proved this run made it. Otherwise advise a retry.
- **Secrets only at a hidden prompt.** Use `ask_secret`, which reads with echo off. A tool that
  reads its own passphrase (a disk-image tool, an SSH key prompt) reads it from the terminal
  directly, so the script never sees it. Never `set -x` (or `set -o xtrace`, or `bash -x`), and
  never echo or print a secret to the screen.
- **A secret never appears in argv.** Any other process on the machine can list a command line
  (`ps`), so a secret never goes into a command's arguments: no `-H "Authorization: Bearer $key"`,
  no `-u user:$pass`. Pass it on stdin (`printf 'header = "Authorization: Bearer %s"\n' "$key" |
  curl --config - ...`, where `printf` is a shell builtin and lists nothing), or in a mode 600
  file inside a private temp folder that a trap deletes. The lint fails a segment that does it.
- **A background job gets its exact stop command.** It has no window to press Ctrl-C in. Print
  the stop command (`kill <pid>`, or a stop script) when the job starts, and give the same
  command on the companion page.

## The house terminal format

- **Why first.** Each stage opens with `why "..."`: two or three plain sentences on what the stage
  sets up and what breaks without it.
- **Every step, numbered.** `stepn "2 of 4" "..."`, one action per step, the small ones included
  (sign in, pick the account, click Save, wait for the confirmation).
- **Where you are, first.** Set `WHERE` to one line that names the sitting or stage of the journey
  this segment belongs to. The library prints it under the title.
- **A stage that waits on the person prints their steps.** Before any prompt, typed word or wait
  for something only the person does, call `yours "time" "what happens next" "hint" "step" ...`.
  The steps are numbered and use the same words as the companion page, the hint is its key point,
  and the time and the next line say how long this takes and what the terminal does after. The
  person must never need the page to know what to do while the terminal waits. The lint fails a
  waiting stage that does not call `yours`.
- **White space above every block.** The helpers print a blank line before each why, step,
  prompt and confirmation. Keep that.
- **Exact paths, checked.** A menu path comes from the vendor's current documentation, checked
  this session.
- **The handover.** Give the run command as one fenced block with a `cd` into the wizard folder.

## Verify it, then hand it over

1. `bash -n <segment>.sh`, then `shellcheck <segment>.sh`, then `chmod +x <segment>.sh`.
2. `./<segment>.sh --dry-run`. Every stage passes, and the status file says `"done":true`.
3. `WIZARD_DRY_FAIL=<a stage at or after DANGER_FROM> ./<segment>.sh --dry-run`. It exits 1, the
   safe state is restored before the fix request, and the fix request holds no value from
   `SENSITIVE`.
4. `./<segment>.sh --dry-run --from <a later stage>`. The safety check and that stage's
   `require_N` run first.
5. Never run the real segment yourself. It is for the person, in their own terminal.

## The library

Copy this block as the top of every segment file, unchanged. It is written for Bash 3.2, the
version macOS ships, and passes shellcheck.

```bash
#!/usr/bin/env bash
# shellcheck disable=SC2329
#
# WIZARD_SEGMENT_LIB v2: one terminal segment of a combo wizard, from the peakstate-wizard skill.
# Everything above the STAGES marker is the segment library: copy it as is.
# Author the stages below the marker.
#
#   ./SEGMENT.sh             run every stage
#   ./SEGMENT.sh --from N    start at stage N (the safety check still runs)
#   ./SEGMENT.sh --dry-run   synthetic data in a temp folder, no real change
set -euo pipefail

if [[ -t 1 ]] && command -v tput >/dev/null 2>&1 && [[ "$(tput colors 2>/dev/null || echo 0)" -ge 8 ]]; then
  BOLD=$(tput bold); DIM=$(tput dim); RESET=$(tput sgr0)
  BLUE=$(tput setaf 4); GREEN=$(tput setaf 2); YELLOW=$(tput setaf 3)
else
  BOLD=""; DIM=""; RESET=""; BLUE=""; GREEN=""; YELLOW=""
fi

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SELF="./$(basename "${BASH_SOURCE[0]}")"
FROM=1 DRY=0 CUR=1 FAILING=0 ARMED=0 TOTAL=0
WORK="" STATUS_FILE="" LEDGER=""
declare -a RESULT=()

clear_screen() { [[ -t 1 ]] || return 0; tput clear 2>/dev/null || printf '\033[2J\033[3J\033[H'; }
say()  { printf '  %s\n' "$1"; }
note() { printf '  %s%s%s\n' "$DIM" "$1" "$RESET"; }
warn() { printf '\n  %s%sWarning:%s %s\n' "$BOLD" "$YELLOW" "$RESET" "$1"; }
why()  { printf '\n  %sWhy we are doing this:%s %s\n' "$BOLD" "$RESET" "$1"; }
stepn() { printf '\n  %s>%s Step %s: %s\n' "$BLUE" "$RESET" "$1" "$2"; }
dry_note() { if (( DRY )); then note "(dry run: $1)"; fi; return 0; }
# yours "time" "what happens next" "hint" "step" ...: the person's own steps while a stage waits
# on them, numbered, with the time it takes, the hint's key point and what happens after.
yours() {
  if (( $# < 3 )); then echo "yours: needs time, next-step and hint before the step list" >&2; return 1; fi
  local t="$1" nx="$2" h="$3" s i=0
  shift 3
  printf '\n  %sYour steps now%s (about %s):\n' "$BOLD" "$RESET" "$t"
  for s in "$@"; do i=$((i + 1)); printf '\n    %s. %s\n' "$i" "$s"; done
  if [[ -n "$h" ]]; then printf '\n  %sHint:%s %s\n' "$BOLD" "$RESET" "$h"; fi
  printf '\n  %sNext:%s %s\n' "$BOLD" "$RESET" "$nx"
}

# wait_enter "message": waits for Return. A dry run never waits.
wait_enter() {
  printf '\n'
  if (( DRY )); then note "(dry run: no pause)"; return 0; fi
  printf '  %s%s%s ' "$DIM" "${1:-Press Return when that is done.}" "$RESET"
  read -r _ || true
}

# ask_secret VAR "Prompt": hidden input into VAR. Never echo, log or write VAR
# anywhere but its one destination, and add it to SENSITIVE straight after.
ask_secret() {
  local _v=""
  if (( DRY )); then _v="dry-run-value-$RANDOM$RANDOM"; note "(dry run: a synthetic value stands in for the hidden prompt)"
  else
    printf '\n  %s%s%s ' "$BOLD" "$2" "$RESET"
    read -rs _v || true
    printf '\n'
  fi
  [[ -n "$_v" ]] || fail "$CUR" "Nothing was typed at the hidden prompt. Run again from this stage."
  printf -v "$1" '%s' "$_v"
}

# confirm_word WORD "warning": the typed confirmation before an irreversible action.
confirm_word() {
  local reply=""
  warn "$2"
  if (( DRY )); then note "(dry run: typed confirmation skipped)"; return 0; fi
  printf '\n  Type %s%s%s to go on, or anything else to stop: ' "$BOLD" "$1" "$RESET"
  read -r reply || true
  [[ "$reply" == "$1" ]] || fail "$CUR" "Stopped at the typed confirmation. Nothing irreversible ran."
}

# json "text": a JSON string body. Escapes the backslash, the quote and every control
# character, so the status file always parses.
json() {
  local s="${1//\\/\\\\}" out="" c i
  s="${s//\"/\\\"}"; s="${s//$'\n'/\\n}"; s="${s//$'\r'/\\r}"; s="${s//$'\t'/\\t}"
  case "$s" in *[[:cntrl:]]*) ;; *) printf '%s' "$s"; return 0 ;; esac
  for (( i = 0; i < ${#s}; i++ )); do
    c="${s:i:1}"
    case "$c" in [[:cntrl:]]) printf -v c '\\u%04X' "'$c" ;; esac
    out+="$c"
  done
  printf '%s' "$out"
}
scrub() {
  local m="$1" s
  for s in ${SENSITIVE[@]+"${SENSITIVE[@]}"}; do [[ -n "$s" ]] && m="${m//"$s"/[hidden]}"; done
  printf '%s' "$m"
}
ledger() {
  printf '%s\t%s\tstage %s\t%s\t%s\n' "$(date '+%Y-%m-%dT%H:%M:%S%z')" "$SEGMENT" "$1" "$2" "$(scrub "$3")" >> "$LEDGER"
}

# write_status DONE [STAGE ERROR SAFE]: rewrites the status file atomically.
# Only stage numbers, result words and scrubbed script-written messages go in.
write_status() {
  local done="$1" fs="${2:-}" fe="${3:-}" safe="${4:-}" stages="" fix=null tmp i
  for (( i = 1; i <= TOTAL; i++ )); do
    [[ -n "${RESULT[i]:-}" ]] && stages+="${stages:+,}\"$i\":\"${RESULT[i]}\""
  done
  if [[ -n "$fs" ]]; then
    fix="{\"stage\":$fs,\"name\":\"$(json "${NAMES[fs]}")\",\"safe\":\"$safe\",\"error\":\"$(json "$fe")\""
    [[ "$safe" == not-restored ]] || fix+=",\"ledger\":\"$(json "${LEDGER##*/}")\",\"rerun\":\"$(json "cd $HERE && $SELF --from $fs")\""
    fix+="}"
  fi
  tmp="$(mktemp "$STATUS_FILE.XXXXXX")"
  printf 'window.WIZARD_STATUS={"segment":"%s","updated":"%s","dryRun":%s,"stages":{%s},"done":%s,"fix":%s};\n' \
    "$(json "$SEGMENT")" "$(date '+%Y-%m-%dT%H:%M:%S%z')" "$( ((DRY)) && echo true || echo false)" "$stages" "$done" "$fix" > "$tmp"
  mv "$tmp" "$STATUS_FILE"
}

pass() {
  RESULT[CUR]=PASS; ledger "$CUR" PASS "$1"; write_status false
  printf '\n  %s%sPASS%s  %s\n' "$BOLD" "$GREEN" "$RESET" "$(scrub "$1")"
}

# fail STAGE MESSAGE: restores the safe state FIRST, then writes the fix request.
fail() {
  local s="$1" msg safe=""
  msg="$(scrub "$2")"
  FAILING=1
  trap '' INT TERM   # a second Ctrl-C must not interrupt the restore
  if (( ARMED )); then
    if restore_safe >/dev/null 2>&1; then safe=restored
    else safe=not-restored; msg="$(scrub "$SAFE_BY_HAND")"; fi
  fi
  RESULT[s]=FAIL; ledger "$s" FAIL "$msg"; write_status false "$s" "$msg" "$safe"
  printf '\n  %s%sFAIL%s  %s\n' "$BOLD" "$YELLOW" "$RESET" "$msg"
  if [[ "$safe" == not-restored ]]; then
    warn "Do not open Claude yet. $msg"; printf '\n'; exit 1
  fi
  [[ "$safe" == restored ]] && say "The safe state is restored. Only now send the fix request to Claude."
  say "The companion page now shows the fix request with a Copy button."
  printf '\n  After the fix, run again from this stage:\n\n    cd %s && %s --from %s\n\n' "$HERE" "$SELF" "$s"
  exit 1
}

on_signal() { fail "$CUR" "Stopped with Ctrl-C or a kill signal."; }
on_exit() {
  local rc=$?
  (( FAILING || rc == 0 )) && return 0
  fail "$CUR" "Stopped by an unexpected error (exit code $rc)."
}

main() {
  local i
  while (( $# )); do
    case "$1" in
      --from) FROM="${2:-}"; shift; (( $# )) && shift ;;
      --from=*) FROM="${1#--from=}"; shift ;;
      --dry-run) DRY=1; shift ;;
      -h|--help) printf 'Usage: %s [--from N] [--dry-run]\n' "$SELF"; exit 0 ;;
      *) printf 'Unknown option: %s\n' "$1" >&2; exit 64 ;;
    esac
  done
  TOTAL=$(( ${#NAMES[@]} - 1 ))
  if (( TOTAL < 1 || TOTAL > 6 )); then echo "A segment has 1 to 6 stages; this one has $TOTAL." >&2; exit 70; fi
  # Base 10, so --from 08 is stage 8 and never a bad octal number.
  if ! [[ "$FROM" =~ ^[0-9]{1,3}$ ]] || (( 10#$FROM < 1 || 10#$FROM > TOTAL )); then
    echo "--from takes a stage number from 1 to $TOTAL." >&2; exit 64
  fi
  FROM=$(( 10#$FROM ))
  if (( DRY )); then
    WORK="$(mktemp -d "${TMPDIR:-/tmp}/$SEGMENT-dryrun.XXXXXX")"
    STATUS_FILE="${WIZARD_STATUS_FILE:-$WORK/wizard-status.js}"; LEDGER="$WORK/wizard-ledger.log"
  else
    WORK="$HERE"
    STATUS_FILE="${WIZARD_STATUS_FILE:-$HERE/wizard-status.js}"; LEDGER="$HERE/wizard-ledger.log"
  fi
  # The traps go first, so a failure or a Ctrl-C during setup still goes through fail.
  trap on_signal INT TERM
  trap on_exit EXIT
  setup
  clear_screen
  printf '\n%s%s  %s%s\n' "$BOLD" "$BLUE" "$TITLE" "$RESET"
  if [[ -n "${WHERE:-}" ]]; then printf '  %sWhere you are:%s %s\n' "$BOLD" "$RESET" "$WHERE"; fi
  printf '%s  %s stages. Each one ends with PASS or FAIL.%s\n' "$DIM" "$TOTAL" "$RESET"
  (( DRY )) && printf '\n  %sDRY RUN:%s temp folder %s, synthetic data, no real change.\n' "$BOLD" "$RESET" "$WORK"
  printf '\n  Ledger (no values in it): %s\n  Status file for the companion page: %s\n' "$LEDGER" "$STATUS_FILE"
  (( FROM > 1 )) && printf '\n  Starting at stage %s.\n' "$FROM"
  write_status false
  wait_enter "Press Return to start."

  # The safety check runs on every start, whatever stage the run starts from.
  CUR=$FROM
  (( DANGER_FROM > 0 && FROM >= DANGER_FROM )) && ARMED=1
  printf '\n'; say "Safety check (it runs whatever stage you start from)."
  safety_check

  for (( i = 1; i <= TOTAL; i++ )); do
    if (( i < FROM )); then RESULT[i]=SKIP; continue; fi
    CUR=$i
    (( DANGER_FROM > 0 && i >= DANGER_FROM )) && ARMED=1
    clear_screen
    printf '\n%s%s> Stage %s/%s: %s%s\n' "$BOLD" "$BLUE" "$i" "$TOTAL" "${NAMES[i]}" "$RESET"
    # ponytail: a dry-run-only hook that proves the failure path; a real run ignores it.
    if (( DRY )) && [[ "${WIZARD_DRY_FAIL:-}" == "$i" ]]; then fail "$i" "Forced dry-run failure at stage $i."; fi
    "require_$i"   # this stage's own preconditions, so --from N is safe
    "stage_$i"
    [[ "${RESULT[i]:-}" == PASS ]] || fail "$i" "Stage $i ended without a PASS."
    (( i < TOTAL )) && wait_enter "Press Return for the next stage."
  done
  CUR=$TOTAL
  verify_end_state
  ledger "$TOTAL" DONE "segment complete, end state verified"
  write_status true
  printf '\n  %s%sPASS%s  %s\n\n' "$BOLD" "$GREEN" "$RESET" "$DONE_LINE"
}

# ── STAGES ─────────────────────────────────────────────────────────────────
```

## The stages

Write the stages below the library. Fill every hook: the library calls each one, and the lint
fails a segment with a hook missing. This skeleton passes `--dry-run` as it stands.

```bash
SEGMENT="SEGMENT-NAME"     # the data-segment value on the companion pages
TITLE="Wizard title: what this segment does"
WHERE="Stage 2 of the journey: what this segment does for the person, in one line."
NAMES=("" "Preflight" "STAGE 2 NAME")   # 1 to 6 stages, the preflight first
DANGER_FROM=0              # first stage after which a failure leaves something unsafe; 0 = never
SAFE_BY_HAND="One sentence: how the person restores the safe state by hand before opening Claude."
DONE_LINE="Segment complete. Safe to stop here."
SENSITIVE=()               # add every secret and sensitive path here the moment it is known

# Sets every path that depends on DRY. A dry run builds synthetic data under $WORK.
setup() { :; }

# The safety check: runs on every start, --from N included. Call it again inside
# the stage, right before the dangerous moment.
safety_check() { :; }

# Puts the safe state back (eject, lock, close, delete a temp file) and returns
# 0 only when a check proves it. fail() calls it before it writes a fix request.
restore_safe() { return 0; }

# Checks the end state the segment promised. Call fail when it does not hold.
verify_end_state() { :; }

require_1() { :; }
stage_1() {
  why "One or two sentences: what this stage checks and the harm a missing piece would cause."
  stepn "1 of 1" "What the script checks."
  command -v curl >/dev/null 2>&1 || fail 1 "curl is not installed. Install it, then run again."
  pass "What passed, in words a person can read."
}

# Each require_N checks what stage N needs, so a jump with --from N is safe.
require_2() { :; }
stage_2() {
  why "One or two sentences."
  stepn "1 of 1" "One action."
  pass "What passed."
}

main "$@"
```

The helpers you call from a stage:

| Helper | What it does |
|---|---|
| `why "..."` | Prints the "Why we are doing this" block |
| `stepn "2 of 4" "..."` | Prints one numbered step |
| `say`, `note`, `warn` | A plain line, a dim line, a warning that starts with "Warning:" |
| `wait_enter "..."` | Waits for Return; a dry run never waits |
| `yours "time" "next" "hint" "step" ...` | Prints the person's numbered steps while a stage waits on them, with the time, the hint and what happens next |
| `ask_secret VAR "Prompt:"` | Hidden input into `VAR`; a dry run uses a synthetic value. Add `VAR` to `SENSITIVE` straight after |
| `confirm_word WORD "warning"` | States the warning, then asks the person to type `WORD` before an irreversible action |
| `pass "..."` | Records PASS for the current stage in the ledger and the status file |
| `fail N "..."` | Restores the safe state when armed, records FAIL, writes the fix request, exits 1 |
| `dry_note "..."` | Says in one line what the dry run does in place of a real step |
