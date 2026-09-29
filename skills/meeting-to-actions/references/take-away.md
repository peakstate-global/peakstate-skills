# Reply template

Keep every heading, in this order. Write "None recorded in the notes." under a heading with
no items. In the Actions table, escape any `|` in the notes' own text as `\|` and replace a
line break with a space or `<br>`, so the table still renders.

    [Sensitive-information line, once, only if it applies.]

    ### Decisions
    - [what was agreed, in the notes' words]

    ### Actions
    | Action | Owner | Date | From the notes |
    |---|---|---|---|
    | [task] | [name, role or team, or [NO OWNER]] | [timing as written, or [NO DATE]] | [speaker and short quote, or the note line, or "added by you in the chat"] |

    ### Open questions
    - [question not answered, or "Proposed, not agreed: ..."]

    ### Risks
    - [the worry, as the notes say it]

    ### Updates noted
    - [a status, fact or figure that is not a decision, action, question or risk, in the notes' words]

    Next step: [the one gap that most needs a person, or "Send the list to the attendees to check."]

After a follow-up, give the whole output again in the same template. Mark each field the user
added with "(added by you)".

# Worked example

The user pasted:

> Library committee. Membership is up 12% this quarter. Agreed: the summer reading programme
> starts on 5 January. Mei will print the posters by the end of the month. Somebody needs to
> ask the council about hall hire. Do we charge for the craft sessions? No answer yet. Worry:
> not enough volunteers in week two.

The reply:

    ### Decisions
    - The summer reading programme starts on 5 January.

    ### Actions
    | Action | Owner | Date | From the notes |
    |---|---|---|---|
    | Print the posters | Mei | by the end of the month | "Mei will print the posters by the end of the month" |
    | Ask the council about hall hire | [NO OWNER] | [NO DATE] | "Somebody needs to ask the council about hall hire" |

    ### Open questions
    - Do we charge for the craft sessions?

    ### Risks
    - Not enough volunteers in week two.

    ### Updates noted
    - Membership is up 12% this quarter.

    Next step: find an owner for asking the council about hall hire.
