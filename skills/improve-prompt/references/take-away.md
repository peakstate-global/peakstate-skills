# Reply template

## Before the yes

    [One line on what the prompt is for, and the sensitive-information line if it applies.]

    [The improved prompt, whole, in one code block.]

    | Change | Why |
    |---|---|
    | [What changed] | [Reason] (Sn) |
    | Assumed [goal or audience]: [reading] | You left this to me, so I picked the most likely reading. |
    | [Or, when nothing changed:] No change | [Why it already works] |

    Reply yes to run it, tell me what to change, or say no.

After an edit, use the same template: the whole edited prompt, a row for each new change, and the same question.

## After the yes

    [The output of the confirmed prompt. A missing input or tool is stated in one line, never faked. Placeholders stay visible.]

    Next step: [one thing to check or fill in the output].

## After a no

    Next step: [the one change from the table worth keeping in your version, or "none needed"].

# Worked example

The user pasted: "Summarise the attached report for the managers."

The reply:

    This prompt asks for a report summary for managers.

    Summarise the report below for the managers. They will use it to [to confirm: what the managers will decide with it].

    Write at most five bullet points, most important first, in plain English. Use only the report. If a number is missing, write [to confirm].

    <report>
    [to confirm: paste the report here]
    </report>

(The prompt above goes in one code block in the real reply.)

    | Change | Why |
    |---|---|
    | Added a placeholder for what the managers will do with it | Context lets the model choose what matters, and the purpose was not given (S1) |
    | Added length, order and style | Stated expectations shape the output (S3) |
    | Put the report between markers, after the instructions | Separates the material from the instructions (S1) |
    | Added "use only the report" and a placeholder rule | Names the source and stops invented numbers (S4) |

    Reply yes to run it, tell me what to change, or say no.

The report was not attached. After a yes, the run reply says so in one line, writes no summary, and ends: "Next step: paste the report so the summary runs on real numbers."
