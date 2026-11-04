# Worked example: rotate an app's API key

A small, complete wizard: four stages, one terminal segment of three stages, and all six step
kinds. The app, the provider and its address (`api.example.com`) are made up. Use it as the
pattern for shape and tone, never as content.

The hands audit for it, step by step:

| Step | Kind | Rung | Why that rung |
|---|---|---|---|
| Why the key changes today | Read | none | Context only |
| Check where else the old key lives | Claude | 1 | Claude can search the app folder itself, so it did, before the build |
| Make the new key | Hands | 4 | The provider makes keys only for a signed-in person, and has no API a short-lived token can use |
| Preflight, Save, Test | Terminal | 3 | The key is a secret, so it goes into a hidden prompt in the person's own terminal |
| Does the app run on a hosted server? | Decision | none | Only the person knows |
| Turn the old key off | Hands | 4 | Same console, and it cannot be undone, so it carries a warning |
| Check nothing uses the old key | Date gate | none | Waits a month |

## The folder

    key-rotation/
      key-rotation.md      the companion source below, with the add-on block pasted in
      key-rotation.html    built by the brief builder
      rotate.sh            the library from references/segment.md, then the stages below
      wizard-lint.py       from references/wizard-lint.md
      .gitignore           wizard-status.js

## key-rotation.md

Paste the add-on block from `references/companion.md` where the comment line sits.

````markdown
---
title: Rotate the example app's API key
head-title: Rotate the example app's API key (wizard)
brief-id: key-rotation-wizard
eyebrow: Combo wizard · four stages · about 25 minutes
sub: One step per page. The terminal saves and tests the new key, and this page walks you through the rest.
tabs: parts
---

## Answers

What does this wizard do?
: It makes a new API key at the provider, saves it into the app through a hidden terminal prompt, tests it, then turns the old key off.

How long does it take?
: About 25 minutes, then one check in a month's time.

What do I paste?
: One command, on the page "Start the segment": `cd ~/wizards/key-rotation && ./rotate.sh`.

<!-- The add-on block from references/companion.md goes here, unchanged. -->

# Before you start

Have ready: your provider sign-in and one Terminal window. Takes about 5 minutes. Safe to stop after this stage.

## Why the key changes today {#s-why} :: Why rotate | read first

<p class="wz-step" data-kind="Read"></p>

**Why:** This page says what changes and what stays the same, so nothing later in the wizard is a surprise. A rotation that stops half-way is the one that breaks the app.

- The app gets a new key. The old key keeps working until the last stage turns it off.
- This page never asks for the key. The terminal asks for it, at a hidden prompt.

## Check where else the old key lives {#s-claude-scan} :: Other copies | Claude did this

<p class="wz-step" data-kind="Claude"></p>

**Why:** A key copied into a second place keeps the old key alive after you turn it off, and that place then breaks without warning. Claude searched the app folder before it built this wizard.

**Result:** Claude found the key name in one file only, `.env`, which the terminal segment updates. No other copy needs a change.

# Make the new key

Have ready: your provider sign-in. Takes about 5 minutes. Safe to stop after this stage.

## Make the new key at the provider {#s-mint} :: New key | your sign-in

<p class="wz-step" data-kind="Hands"></p>

**Why:** The app can only switch to a new key once the provider has made one. Making it first means the old key still works while you install the new one, so the app never goes down.

**Why this is yours (rung 4, Claude prepares, you click):** the provider makes keys only for a signed-in person, and an admin token for Claude would be a stronger secret than the key itself. Claude checked for an API first and found none that a short-lived token can use.

- Open the provider's console and sign in.
- Go to Settings > API keys. If the menu differs, look for "API keys" or "Tokens".
- Click Create key, and name it `example-app` with today's date.
- Click Copy. Keep the key on the clipboard for the next stage, and do not paste it anywhere else.

# Install and test the key

Have ready: the new key on your clipboard. Takes about 10 minutes. Do not stop during this stage: stop only before it starts or after the last PASS.

## Start the segment: the preflight {#s-t1} :: 1 Preflight | checks first

<p class="wz-step" data-kind="Terminal" data-segment="rotate" data-stage="1"></p>

**Why:** The preflight finds a missing tool or a wrong folder before the key goes anywhere, so a failure costs nothing.

**Why this is yours (rung 3, your terminal holds the secret):** the next stage asks for the key at a hidden prompt in your terminal, so Claude's session never holds it. The whole segment runs in that one terminal.

Paste this into your Terminal window and press Return:

```
cd ~/wizards/key-rotation && ./rotate.sh
```

The terminal checks that curl is installed, that the app's `.env` file is there, and that `.gitignore` lists `.env`. That last check runs on every start, even with `--from`.

## Save the new key {#s-t2} :: 2 Save | hidden prompt

<p class="wz-step" data-kind="Terminal" data-segment="rotate" data-stage="2"></p>

**Why:** The app reads its key from `.env`, so the new key must go there before the app can use it. A hidden prompt keeps the key off the screen, out of the ledger and out of this page.

**Why this is yours (rung 3, your terminal holds the secret):** you paste the key into a prompt that only your terminal sees.

- The terminal checks `.gitignore` again, right before it writes.
- Paste the key at the prompt "New key:" and press Return. Nothing shows as you paste.
- If the stage fails, the terminal deletes any half-written file first, then shows the fix request here.

## Test the new key {#s-t3} :: 3 Test | one call

<p class="wz-step" data-kind="Terminal" data-segment="rotate" data-stage="3"></p>

**Why:** A key that saves but does not work fails later, when nobody is watching. One test call proves the provider accepts it while you are still here.

**Why this is yours (rung 3, your terminal holds the secret):** the test call reads the key from `.env` inside your terminal.

When the terminal prints "Segment complete. Safe to stop here.", this page moves on by itself. If it does not move within a few seconds, click "Terminal wizard complete".

# Turn the old key off

Have ready: your provider sign-in. Takes about 5 minutes. Safe to stop after this stage.

## Q1 Does the app also run on a hosted server? {#s-q1} :: Hosted server | yes or no

<p class="wz-step" data-kind="Decision"></p>

**Why:** A hosted copy of the app still holds the old key, and it stops working the moment the old key is off. Answer this before the next page.

a) No, it runs on this computer only (Recommended: the setup Claude found)
b) Yes, it also runs on a hosted server. Put the new key in the server's settings first, then go on

## Turn the old key off {#s-revoke} :: Old key | cannot be undone

<p class="wz-step" data-kind="Hands" data-irreversible="true"></p>

**Why:** A key you no longer use still works for anyone who copied it. Turning it off closes that door for good.

**Why this is yours (rung 4, Claude prepares, you click):** the provider turns keys off only for a signed-in person.

**Warning:** turning a key off cannot be undone. Do it only after stage 3 printed PASS.

- In the provider's console, go to Settings > API keys.
- Find the old key, the one without today's date.
- Click Revoke, then type the confirmation word the provider asks for.

# Check back

Have ready: nothing until the date. Takes about 2 minutes. Safe to stop at any point.

## Check that nothing uses the old key {#s-check} :: One-month check | 5 December 2026

<p class="wz-step" data-kind="Date gate" data-date="2026-12-05"></p>

**Why:** A forgotten copy of the old key shows up as failed calls in the provider's log. Looking once, a month on, catches it before it causes harm.

- On the date, open the provider's console and go to the usage or audit page.
- Check that no call used the old key since you turned it off.
- If one did, find where it came from before you do anything else.
````

## rotate.sh, below the library

````bash
SEGMENT="rotate"            # the data-segment value on the companion pages
TITLE="Key rotation: install and test the new key"
NAMES=("" "Preflight" "Save the new key" "Test the new key")
DANGER_FROM=2               # from stage 2 a half-written key file is possible
SAFE_BY_HAND="Delete the file .env.new in the app folder, if it is there, before you open Claude."
DONE_LINE="Segment complete. The app now reads the new key. Safe to stop here."
SENSITIVE=()                # every secret goes in here the moment it is read
APP_DIR="" ENV_FILE="" NEW_KEY=""

setup() {
  if (( DRY )); then
    APP_DIR="$WORK/app"; mkdir -p "$APP_DIR"
    printf '.env\n.env.new\n' > "$APP_DIR/.gitignore"
    ( umask 077; printf "EXAMPLE_API_KEY='dry-run-old-key'\n" > "$APP_DIR/.env" )
  else
    APP_DIR="${APP_DIR_OVERRIDE:-$HOME/apps/example-app}"
  fi
  ENV_FILE="$APP_DIR/.env"
}

# The key file must never be committed. Runs on every start and again right
# before the write in stage 2.
safety_check() {
  if ! { [[ -f "$APP_DIR/.gitignore" ]] && awk '$0 == ".env" {f=1} END {exit !f}' "$APP_DIR/.gitignore"; }; then
    fail "$CUR" "The app's .gitignore does not list .env, so the key could be committed. Add the line .env to it, then run again."
  fi
  say "The key file is listed in .gitignore."
}

# Returns 0 only when the safe state is verified: no half-written key file.
restore_safe() {
  rm -f "$APP_DIR/.env.new"
  [[ ! -e "$APP_DIR/.env.new" ]]
}

verify_end_state() {
  [[ -f "$ENV_FILE" ]] || fail "$CUR" "The key file is missing."
  [[ -n "$(find "$ENV_FILE" -perm 600 2>/dev/null)" ]] \
    || fail "$CUR" "The key file can be read by other users. Run again from stage 2."
  [[ ! -e "$APP_DIR/.env.new" ]] || fail "$CUR" "A half-written key file is still there. Run again from stage 2."
}

require_1() { :; }
stage_1() {
  why "Stage 1 checks the tools and the folder before anything changes, so a missing piece stops the run before the key exists anywhere."
  stepn "1 of 2" "Checking that curl is installed, for the test call."
  command -v curl >/dev/null 2>&1 || fail 1 "curl is not installed. Install it, then run again."
  stepn "2 of 2" "Checking the app folder."
  [[ -f "$ENV_FILE" ]] || fail 1 "The app's .env file is not where the wizard expects it. Check the folder name in the companion page, then run again."
  pass "curl ready, the app's key file found."
}

require_2() { [[ -f "$ENV_FILE" ]] || fail 2 "The app's .env file is missing. Run again from stage 1."; }
stage_2() {
  why "The new key goes into the app's key file through a hidden prompt, so the key is never on screen, in a log or in the companion page."
  stepn "1 of 3" "Checking again that the key file cannot be committed, right before the write."
  safety_check
  stepn "2 of 3" "Paste the new key at the hidden prompt. Nothing shows as you paste."
  ask_secret NEW_KEY "New key:"
  SENSITIVE+=("$NEW_KEY")
  stepn "3 of 3" "Writing the key file."
  ( umask 077; grep -v '^EXAMPLE_API_KEY=' "$ENV_FILE" > "$APP_DIR/.env.new" || true )
  printf "EXAMPLE_API_KEY='%s'\n" "$NEW_KEY" >> "$APP_DIR/.env.new"
  chmod 600 "$APP_DIR/.env.new"
  mv "$APP_DIR/.env.new" "$ENV_FILE"
  pass "The key file holds the new key, readable by you only."
}

require_3() {
  awk -F= '$1 == "EXAMPLE_API_KEY" {f=1} END {exit !f}' "$ENV_FILE" \
    || fail 3 "The key file has no EXAMPLE_API_KEY line. Run again from stage 2."
}
stage_3() {
  why "A key that saves but does not work fails later, at a worse time. One test call now proves the provider accepts it."
  local code key
  key="$(awk -F= '$1 == "EXAMPLE_API_KEY" {v=substr($0, index($0, "=") + 1)} END {print v}' "$ENV_FILE")"
  key="${key#\'}"; key="${key%\'}"
  SENSITIVE+=("$key")
  stepn "1 of 1" "Calling the provider's test address with the new key."
  if (( DRY )); then
    dry_note "no network call; a 200 answer stands in"
    code=200
  else
    # The key goes to curl on stdin as a config line, never in argv where ps can list it.
    # printf is a shell builtin, so it starts no process that shows the key.
    code="$(printf 'header = "Authorization: Bearer %s"\n' "$key" \
      | curl -s -o /dev/null -w '%{http_code}' --config - https://api.example.com/v1/ping || true)"
  fi
  [[ "$code" == 200 ]] || fail 3 "The test call answered $code, not 200. Check that you pasted the whole key, then run again from stage 2."
  pass "The provider accepted the new key (HTTP 200)."
}

main "$@"
````

## What the checks showed

- `python3 wizard-lint.py key-rotation.md`: PASS, 0 problems.
- `./rotate.sh --dry-run`: stages 1 to 3 PASS, end state verified, exit 0.
- `WIZARD_DRY_FAIL=3 ./rotate.sh --dry-run`: FAIL at stage 3, exit 1. The half-written key file
  was deleted before the fix request was written, and the ledger holds no key value.
- `./rotate.sh --dry-run --from 3`: the safety check and `require_3` ran first, then stage 3.
