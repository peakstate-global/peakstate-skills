"""Pick the transcript reader for the agent whose history is being analysed.

The retro's ANALYSIS is agent-agnostic — pair each assistant turn with the human reply it
drew, count what repeats, count what gets corrected. Its READER is not: transcripts live in
a different place and a different shape for every agent. This package is the seam between
the two, so supporting another agent means writing one more reader, not editing the retro.

Select with RETRO_READER; the default is Claude Code, which is where this started.

A reader supplies one generator and one listing:

    iter_events() -> yields dicts, in file order, one per turn:
        kind      'human' | 'assistant'   (required)
        project   str   grouping label, usually a repo or working directory
        session   str   stable id for the conversation the turn belongs to
        ts        str   ISO 8601 timestamp, or None if the agent records none
        text      str   the turn's plain text, tool calls and results excluded
        tools     list[str]  tool names this assistant turn invoked  ('assistant' only)
        bash      list[str]  shell commands it ran, truncated        ('assistant' only)

    files() -> list[str]   every session file it would read, so the run can be sized
                           and an empty store reported before any work starts. Return an
                           empty list when the agent is simply not installed; do not raise.

Order matters and is the reader's job: events of one session must arrive together and in
sequence, or the pairing logic downstream cannot tell which reply answered which turn.
"""
import importlib
import os

DEFAULT = "claude_code"


def names():
    """Every reader that exists, by name."""
    here = os.path.dirname(os.path.abspath(__file__))
    return sorted(f[:-3] for f in os.listdir(here)
                  if f.endswith(".py") and not f.startswith("_"))


def resolve(name):
    """The reader module name for what a person typed.

    Hyphens and underscores are interchangeable, and a unique prefix is enough, so `claude`
    reaches `claude_code`. The thing being named is the agent; the module name is an
    implementation detail nobody should have to remember. An ambiguous prefix resolves to
    nothing and is reported rather than guessed.
    """
    name = (name or "").replace("-", "_")
    have = names()
    if name in have:
        return name
    hits = [h for h in have if h.startswith(name)] if name else []
    return hits[0] if len(hits) == 1 else name


def load(name=None):
    """Import the named reader, or say plainly which ones exist."""
    name = resolve(name or os.environ.get("RETRO_READER") or DEFAULT)
    try:
        return importlib.import_module(f"{__name__}.{name}")
    except ModuleNotFoundError as exc:
        if name not in str(exc):
            raise
        here = os.path.dirname(os.path.abspath(__file__))
        raise SystemExit(
            f"unknown reader {name!r}. RETRO_READER must be one of: {', '.join(names())}.\n"
            f"To add an agent, write {name}.py in {here} supplying iter_events() and "
            f"files(); see this package's docstring for the contract."
        )
