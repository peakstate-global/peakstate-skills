#!/usr/bin/env python3
"""Codex CLI reader — rollout files under CODEX_HOME.

    $CODEX_HOME/sessions/YYYY/MM/DD/rollout-<iso>-<uuid>.jsonl

**Read the caveat before trusting a retro over this data.** Codex here is a delegate: it is
driven headlessly by another agent, so a Codex `user_message` is usually the ORCHESTRATOR's
prompt, not something a person typed. Measured on this machine: 120 of 120 recent sessions
carried `originator: codex_exec`, and the prompts were review commands, not conversation. A
retro over Codex history therefore measures how the orchestrator prompts, which is a real
question but not the same one the skill answers for an interactive agent. `iter_events()`
attaches `originator` to every event so a caller can split or exclude on it.

Codex signs in under several accounts and `~/.codex` is a symlink to whichever is active, so
sibling profiles hold history the active one cannot see. All of them are read unless
CODEX_HOME names one explicitly.
"""
import glob
import json
import os

PROFILES = os.path.expanduser("~/.codex-profiles")


def roots():
    """Every Codex home to read, newest-profile-agnostic.

    CODEX_HOME wins when set — that is the documented override and the way to look at one
    account. Otherwise take every profile, because the symlinked-active-profile layout
    means "the one Codex is using right now" is a moving target and a retro that follows
    it silently drops months of history belonging to the other accounts.
    """
    if os.environ.get("CODEX_HOME"):
        return [os.environ["CODEX_HOME"]]
    if os.path.isdir(PROFILES):
        found = sorted(
            os.path.join(PROFILES, d) for d in os.listdir(PROFILES)
            if os.path.isdir(os.path.join(PROFILES, d, "sessions"))
        )
        if found:
            return found
    return [os.path.expanduser("~/.codex")]


def _text(payload):
    m = payload.get("message")
    if isinstance(m, str):
        return m
    return "\n".join(
        c.get("text", "") for c in (payload.get("content") or [])
        if isinstance(c, dict) and c.get("type") in ("input_text", "output_text", "text")
    )


def iter_events():
    """Yield normalised events in file order. Contract: see readers/__init__.py."""
    files = []
    for root in roots():
        files.extend(glob.glob(os.path.join(root, "sessions", "*", "*", "*", "*.jsonl")))
    if not files:
        raise SystemExit(
            "no Codex rollout files found. Set CODEX_HOME, or RETRO_READER to another reader."
        )
    for path in sorted(files):
        project, session, originator = None, os.path.basename(path)[:-6], None
        pending_tools, pending_bash = [], []
        try:
            fh = open(path, errors="replace")
        except OSError:
            continue
        with fh:
            for line in fh:
                try:
                    d = json.loads(line)
                except ValueError:
                    continue            # a torn line from a live run; skip it
                kind, p = d.get("type"), d.get("payload") or {}
                if kind == "session_meta":
                    # cwd is the only project label Codex records; fall back to the id so a
                    # session with no cwd still groups with itself rather than with None.
                    project = os.path.basename(p.get("cwd") or "") or p.get("id") or session
                    session = p.get("id") or session
                    originator = p.get("originator")
                elif kind == "response_item" and p.get("type") in (
                    "custom_tool_call", "function_call", "local_shell_call"
                ):
                    name = p.get("name") or p.get("type")
                    pending_tools.append(name)
                    # Codex puts the whole call in `input` as a string; keep a slice, the
                    # same budget the Claude Code reader keeps for a Bash command.
                    if "exec" in str(name) or "shell" in str(name):
                        pending_bash.append(str(p.get("input") or "")[:300])
                elif kind == "event_msg" and p.get("type") in ("user_message", "agent_message"):
                    human = p.get("type") == "user_message"
                    yield {
                        "kind": "human" if human else "assistant",
                        "project": project or session, "session": session,
                        "ts": d.get("timestamp"), "text": _text(p),
                        "tools": [] if human else pending_tools,
                        "bash": [] if human else pending_bash,
                        "originator": originator,
                    }
                    pending_tools, pending_bash = [], []
