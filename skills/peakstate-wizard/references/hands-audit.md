# The hands audit and the Why block

Every step in a wizard passes two tests before it is written. The Why block says why the step
exists at all. The hands audit says who does it, and why it is not Claude.

## The Why block (every step)

**Every step opens with a Why block: one or two concrete sentences on why the step exists, the
purpose it serves and the harm it prevents.** It comes before the hands-audit line, the warning
and every instruction. It answers the question the person would ask first ("why do I need to do
this at all?"), so it names the real thing at stake, not the action.

| Weak (fails the test) | Strong |
|---|---|
| **Why:** This step closes Claude windows. | **Why:** The export file holds every password in plain text, and an AI coding tool keeps every tool output in its transcripts. Closing every agent first means no transcript can ever hold the file. |
| **Why:** We need to test the key. | **Why:** A key that saves but does not work fails later, when nobody is watching. One test call proves the provider accepts it while you are still here. |
| **Why:** For security. | **Why:** A key you no longer use still works for anyone who copied it. Turning it off closes that door for good. |

The test: a person who reads only the Why block can say what goes wrong if they skip the step.
"For security", "best practice" and a restatement of the heading all fail it.

## The five-rung ladder (every Hands and Terminal step)

**Climb the ladder for each step and stop at the first rung that holds. Only what fails every
lower rung reaches the person.** Do this before you write the step, not after.

| Rung | Who does it | Example |
|---|---|---|
| 1. Claude does it | Claude, with access it already has (files on disk, a command-line tool already signed in, SSH to a box) | Search the app folder for other copies of a key name |
| 2. Claude with a scoped, short-lived credential | Claude, with a token the person mints once, scoped to the one job, that expires or is deleted after | An OAuth client whose tokens expire within an hour, deleted by the last stage |
| 3. Your terminal holds the secret, a script does the rest | The person types the secret into a terminal process Claude cannot see; the script carries on and prints PASS or FAIL | Paste a new API key at a hidden prompt; the script writes and tests it |
| 4. Claude prepares, you click or paste once | Claude writes the exact values and the direct link; the person does one click or one paste | A vendor console with no API: Claude gives the menu path and the values |
| 5. By hand | The person, because it needs their body, money, voice, signature or judgement | Paying for hardware, a phone call to a carrier, tapping a hardware key |

For each step, ask in order:

1. Can Claude do it now, with what it has? Then it is a **Claude** step: do it before you build
   the wizard and show the result on the page.
2. Would a temporary, scoped token let Claude do it? Look for an API, a command-line tool, SSH or
   a headless browser. If the person minting the token is one short Hands step and Claude then
   does the rest, that is cheaper than many hand steps. Say what the token can do and how it is
   deleted.
3. Can the secret stay in the person's terminal while a script does the work? Then it is a
   **Terminal** step at rung 3.
4. Can Claude prepare everything so the person does one click or paste? Rung 4.
5. Only then is it rung 5.

**A wall the ladder does not climb.** When the person's own security rule keeps every agent off
an account or a device (for example, the accounts that can reset all others), the ladder stops at
rung 4 for that account: Claude prepares a card with the direct link and the exact change, and the
person makes it. Say so in the hands-audit line.

## The hands-audit line

Write it straight after the Why block, on every Hands and Terminal step, in this form:

    **Why this is yours (rung 4, Claude prepares, you click):** the provider makes keys only for
    a signed-in person, and an admin token for Claude would be a stronger secret than the key.
    Claude checked for an API first and found none that a short-lived token can use.

- Name the rung by number and by its short name.
- Say what the lower rungs would need and why they fail here, in one or two sentences.
- A Hands step is rung 4 or 5. A Terminal step is rung 3, 4 or 5 (rung 4 or 5 when the script
  pauses for a click it then checks). Rung 1 or 2 is a Claude step, never a Hands step.

## Instructions match how things run

**Every instruction describes what the person will see and do, in the way it actually runs.**

- A background job has no window to press Ctrl-C in. Give the exact stop command (`kill <pid>`
  printed by the script, or a stop script) on the page and in the terminal.
- A step that says "the terminal asks for X" matches a prompt that exists in the segment, with
  the same words.
- A menu path comes from the vendor's current documentation, checked this session. If you could
  not check it, the step says so and says what to look for.
- A step that tells the person to wait says how long and what they will see when it ends.
