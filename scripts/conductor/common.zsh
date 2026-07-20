#!/bin/zsh

set -eu
set -o pipefail

SCRIPT_DIR="${0:A:h}"
PROJECT_ROOT="${SCRIPT_DIR:h:h}"
SUPABASE_PORT_STATE_FILE="$PROJECT_ROOT/.context/conductor-supabase-port-base"

fail() {
  print -u2 "\nConductor local dev: $*"
  exit 1
}

require_conductor_port() {
  if [[ -z "${CONDUCTOR_PORT:-}" || ! "$CONDUCTOR_PORT" =~ '^[0-9]+$' ]]; then
    fail "CONDUCTOR_PORT est absent. Lance cette commande depuis le menu Run de Conductor."
  fi

  if (( CONDUCTOR_PORT < 1024 || CONDUCTOR_PORT > 65535 )); then
    fail "CONDUCTOR_PORT=$CONDUCTOR_PORT n'est pas un port web valide."
  fi
}

configure_workspace() {
  require_conductor_port

  local supabase_port_base
  if [[ -r "$SUPABASE_PORT_STATE_FILE" ]]; then
    supabase_port_base="$(<"$SUPABASE_PORT_STATE_FILE")"
  else
    # CONDUCTOR_PORT ne reserve qu'un port. Supabase utilise donc un bloc
    # distinct et stable, pour ne pas entrer en collision avec un autre chat.
    supabase_port_base=$((56000 + (CONDUCTOR_PORT % 900) * 10))
    mkdir -p "${SUPABASE_PORT_STATE_FILE:h}"
    print -r -- "$supabase_port_base" > "$SUPABASE_PORT_STATE_FILE"
  fi

  if [[ ! "$supabase_port_base" =~ '^[0-9]+$' ]] || \
    (( supabase_port_base < 56000 || supabase_port_base > 64990 )); then
    fail "Le bloc de ports Supabase local est invalide. Supprime $SUPABASE_PORT_STATE_FILE, puis relance Run."
  fi

  export SUPABASE_PROJECT_ID="the-vibe-${CONDUCTOR_PORT}"
  export SUPABASE_API_PORT=$((supabase_port_base + 1))
  export SUPABASE_DB_PORT=$((supabase_port_base + 2))
  export SUPABASE_DB_SHADOW_PORT=$((supabase_port_base + 3))
  export SUPABASE_STUDIO_PORT=$((supabase_port_base + 4))
  export SUPABASE_INBUCKET_PORT=$((supabase_port_base + 5))
  export SUPABASE_POOLER_PORT=$((supabase_port_base + 6))
  export SUPABASE_EDGE_INSPECTOR_PORT=$((supabase_port_base + 7))
  export SUPABASE_ANALYTICS_PORT=$((supabase_port_base + 8))
  export SUPABASE_AUTH_SITE_URL="http://localhost:${CONDUCTOR_PORT}"
}

supabase_cli() {
  local binary="$PROJECT_ROOT/node_modules/.bin/supabase"
  [[ -x "$binary" ]] || fail "Supabase CLI est absent. Execute npm ci dans ce workspace."
  "$binary" --workdir "$PROJECT_ROOT" "$@"
}

ensure_docker() {
  command -v docker >/dev/null 2>&1 || fail "Docker est absent. Installe Docker Desktop pour Mac, puis relance Run."

  if docker_is_ready; then
    return
  fi

  local docker_app=""
  if [[ -d "/Applications/Docker.app" ]]; then
    docker_app="/Applications/Docker.app"
  elif [[ -d "$HOME/Applications/Docker.app" ]]; then
    docker_app="$HOME/Applications/Docker.app"
  else
    fail "Le daemon Docker est arrete et Docker Desktop est introuvable dans Applications."
  fi

  if pgrep -f "${docker_app}/Contents/" >/dev/null 2>&1; then
    print "Docker Desktop est ouvert, mais son moteur n'est pas encore disponible. Attente..."
  else
    print "Docker Desktop n'est pas demarre. Demarrage automatique..."
    open -gj "$docker_app"
  fi

  local deadline=$((SECONDS + 120))
  local elapsed=0
  local next_update=10
  while (( SECONDS < deadline )); do
    if docker_is_ready; then
      print "Docker Desktop est pret."
      return
    fi
    elapsed=$((120 - (deadline - SECONDS)))
    if (( elapsed >= next_update )); then
      print "Toujours en attente du moteur Docker (${elapsed}s/120s)..."
      next_update=$((next_update + 10))
    fi
    sleep 1
  done

  fail "Le moteur Docker ne repond toujours pas apres 120 secondes. Ouvre Docker Desktop pour voir son diagnostic ou redemarre-le, puis relance Run."
}

docker_is_ready() {
  local pid
  local attempt

  docker info >/dev/null 2>&1 &
  pid=$!

  for attempt in {1..10}; do
    if ! kill -0 "$pid" >/dev/null 2>&1; then
      if wait "$pid" >/dev/null 2>&1; then
        return 0
      fi
      return 1
    fi
    sleep 0.1
  done

  kill "$pid" >/dev/null 2>&1 || true
  wait "$pid" >/dev/null 2>&1 || true
  return 1
}

ensure_web_port_available() {
  if command -v lsof >/dev/null 2>&1 && \
    lsof -nP -iTCP:"$CONDUCTOR_PORT" -sTCP:LISTEN >/dev/null 2>&1; then
    fail "Le port web $CONDUCTOR_PORT est deja utilise. Arrete l'autre serveur de ce workspace, puis relance Run."
  fi
}

start_supabase() {
  ensure_docker
  print "Demarrage de Supabase pour $SUPABASE_PROJECT_ID..."
  supabase_cli start \
    --exclude "edge-runtime,imgproxy,logflare,mailpit,realtime,storage-api,supavisor,vector" \
    --yes \
    >/dev/null
}

write_public_env() {
  local temporary_env="$PROJECT_ROOT/.env.local.tmp.$$"

  supabase_cli status -o env \
    --override-name api.url=NEXT_PUBLIC_SUPABASE_URL \
    --override-name auth.anon_key=NEXT_PUBLIC_SUPABASE_ANON_KEY \
    | grep '^NEXT_PUBLIC_' > "$temporary_env"

  if ! grep -q '^NEXT_PUBLIC_SUPABASE_URL=' "$temporary_env" || \
    ! grep -q '^NEXT_PUBLIC_SUPABASE_ANON_KEY=' "$temporary_env"; then
    rm -f "$temporary_env"
    fail "Supabase n'a pas retourne les variables publiques attendues."
  fi

  mv "$temporary_env" "$PROJECT_ROOT/.env.local"
}

bootstrap_local_users() {
  local bootstrap_exports

  bootstrap_exports="$(supabase_cli status -o env \
    --override-name api.url=CONDUCTOR_SUPABASE_URL \
    --override-name auth.service_role_key=CONDUCTOR_SUPABASE_SERVICE_ROLE_KEY \
    | grep '^CONDUCTOR_SUPABASE_')"

  eval "$bootstrap_exports"
  export CONDUCTOR_SUPABASE_URL CONDUCTOR_SUPABASE_SERVICE_ROLE_KEY
  node "$SCRIPT_DIR/seed-local.mjs"
  unset CONDUCTOR_SUPABASE_URL CONDUCTOR_SUPABASE_SERVICE_ROLE_KEY
}

print_workspace_summary() {
  print ""
  print "The Vibe Experience est pret."
  print "  Web:       http://localhost:${CONDUCTOR_PORT}"
  print "  Studio:    http://localhost:${SUPABASE_STUDIO_PORT}"
  print "  Nouveau:   nouveau@local.test / vibe-local-123"
  print "  Demo:      demo@local.test / vibe-local-123"
  print "  Supabase:  ${SUPABASE_PROJECT_ID}"
  print ""
}

cd "$PROJECT_ROOT"
configure_workspace
