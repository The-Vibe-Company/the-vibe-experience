#!/bin/zsh

set -eu
set -o pipefail

SCRIPT_DIR="${0:A:h}"
PROJECT_ROOT="${SCRIPT_DIR:h}"
SUPABASE_BINARY="$PROJECT_ROOT/node_modules/.bin/supabase"

[[ -x "$SUPABASE_BINARY" ]] || {
  print -u2 "Supabase CLI est absent. Execute npm ci avant cette commande."
  exit 1
}

cd "$PROJECT_ROOT"
exec "$SUPABASE_BINARY" --workdir "$PROJECT_ROOT" "$@"
