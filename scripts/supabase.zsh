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

# Valeurs historiques du projet pour les commandes Supabase lancees hors Conductor
# (migrations, status, link, push, CI). Dans un Run Conductor, les scripts dedies
# remplacent ces valeurs par la plage de ports reservee au workspace.
export SUPABASE_PROJECT_ID="${SUPABASE_PROJECT_ID:-the-vibe-experience}"
export SUPABASE_API_PORT="${SUPABASE_API_PORT:-54321}"
export SUPABASE_DB_PORT="${SUPABASE_DB_PORT:-54322}"
export SUPABASE_DB_SHADOW_PORT="${SUPABASE_DB_SHADOW_PORT:-54320}"
export SUPABASE_STUDIO_PORT="${SUPABASE_STUDIO_PORT:-54323}"
export SUPABASE_INBUCKET_PORT="${SUPABASE_INBUCKET_PORT:-54324}"
export SUPABASE_POOLER_PORT="${SUPABASE_POOLER_PORT:-54329}"
export SUPABASE_EDGE_INSPECTOR_PORT="${SUPABASE_EDGE_INSPECTOR_PORT:-8083}"
export SUPABASE_ANALYTICS_PORT="${SUPABASE_ANALYTICS_PORT:-54327}"
export SUPABASE_AUTH_SITE_URL="${SUPABASE_AUTH_SITE_URL:-http://127.0.0.1:3000}"

cd "$PROJECT_ROOT"
exec "$SUPABASE_BINARY" --workdir "$PROJECT_ROOT" "$@"
