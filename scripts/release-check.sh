#!/usr/bin/env bash
# The hand-off gate. Git hooks can be skipped, so this one command is what a
# skill must pass before it is handed over or published. It runs every check
# and exits non-zero if any of them fails.
#
#   bash scripts/release-check.sh
set -uo pipefail
cd "$(dirname "$0")/.." || exit 2

failed=0
run() {
  echo "== $*"
  if ! "$@"; then
    echo "!! FAILED: $*"
    failed=1
  fi
}

run python3 scripts/check-no-leaks.py --selftest
run python3 scripts/make-portable.py --selftest
run python3 scripts/check-skill-contract.py --selftest
run python3 scripts/check-inventory.py --selftest

run python3 scripts/check-no-leaks.py --all
run python3 scripts/check-skill-contract.py
run python3 scripts/check-inventory.py

# Every skill under the contract must pack as markdown only.
skills=$(python3 scripts/check-skill-contract.py --list) || { echo "!! FAILED: --list"; failed=1; }
for s in $skills; do
  run python3 scripts/make-portable.py "skills/$s" --self-check --md-only
done

if [ "$failed" -ne 0 ]; then
  echo "release check FAILED"
  exit 1
fi
echo "release check passed"
