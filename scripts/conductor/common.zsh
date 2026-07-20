#!/bin/zsh

set -eu
set -o pipefail

SCRIPT_DIR="${0:A:h}"
PROJECT_ROOT="${SCRIPT_DIR:h:h}"

SUPABASE_PARENT_PROJECT_REF="${SUPABASE_PARENT_PROJECT_REF:-qzqtbaepzdmsvgfupsdm}"
SUPABASE_BRANCH_REGION="${SUPABASE_BRANCH_REGION:-eu-central-1}"
SUPABASE_BRANCH_SIZE="${SUPABASE_BRANCH_SIZE:-nano}"

fail() {
  print -u2 "\nConductor Supabase: $*"
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

  GIT_BRANCH="$(git -C "$PROJECT_ROOT" symbolic-ref --quiet --short HEAD 2>/dev/null || true)"
  [[ -n "$GIT_BRANCH" ]] || fail "Le workspace est en HEAD detache ; aucune branche Supabase ne peut lui etre associee."
  [[ "$GIT_BRANCH" != "main" ]] || fail "Le Run Conductor refuse d'utiliser la base Supabase de production. Cree une branche de workspace."
}

supabase_cli() {
  local binary="$PROJECT_ROOT/node_modules/.bin/supabase"
  [[ -x "$binary" ]] || fail "Supabase CLI est absent. Execute npm ci dans ce workspace."
  "$binary" --workdir "$PROJECT_ROOT" "$@"
}

ensure_web_port_available() {
  if command -v lsof >/dev/null 2>&1 && \
    lsof -nP -iTCP:"$CONDUCTOR_PORT" -sTCP:LISTEN >/dev/null 2>&1; then
    fail "Le port web $CONDUCTOR_PORT est deja utilise. Arrete l'autre serveur de ce workspace, puis relance Run."
  fi
}

branch_list_json() {
  supabase_cli branches list \
    --project-ref "$SUPABASE_PARENT_PROJECT_REF" \
    --output json
}

load_remote_branch() {
  local branches_json
  local branch_record

  branches_json="$(branch_list_json)" || fail "Impossible de lire les branches Supabase. Verifie `supabase login` et tes droits sur le projet."
  branch_record="$(TARGET_GIT_BRANCH="$GIT_BRANCH" node -e '
    let input = "";
    process.stdin.on("data", (chunk) => { input += chunk; });
    process.stdin.on("end", () => {
      const branches = JSON.parse(input);
      const branch = branches.find((item) => !item.is_default && item.git_branch === process.env.TARGET_GIT_BRANCH);
      if (branch) {
        const status = branch.preview_project_status ?? branch.status;
        process.stdout.write([branch.name, branch.project_ref, status].join("\t"));
      }
    });
  ' <<< "$branches_json")"

  if [[ -z "$branch_record" ]]; then
    SUPABASE_BRANCH_NAME=""
    SUPABASE_BRANCH_PROJECT_REF=""
    SUPABASE_BRANCH_STATUS=""
    return 1
  fi

  IFS=$'\t' read -r SUPABASE_BRANCH_NAME SUPABASE_BRANCH_PROJECT_REF SUPABASE_BRANCH_STATUS <<< "$branch_record"
  return 0
}

generated_branch_name() {
  local slug
  local digest

  slug="$(print -rn -- "$GIT_BRANCH" | tr '[:upper:]' '[:lower:]' | sed -E 's/[^a-z0-9]+/-/g; s/^-+//; s/-+$//' | cut -c1-38)"
  [[ -n "$slug" ]] || slug="workspace"
  digest="$(print -rn -- "$GIT_BRANCH" | shasum -a 256 | awk '{print substr($1, 1, 8)}')"
  print -r -- "conductor-${slug}-${digest}"
}

create_remote_branch() {
  SUPABASE_BRANCH_NAME="$(generated_branch_name)"
  print "Creation de la branche Supabase $SUPABASE_BRANCH_NAME pour $GIT_BRANCH..."
  supabase_cli branches create "$SUPABASE_BRANCH_NAME" \
    --project-ref "$SUPABASE_PARENT_PROJECT_REF" \
    --git-branch "$GIT_BRANCH" \
    --region "$SUPABASE_BRANCH_REGION" \
    --size "$SUPABASE_BRANCH_SIZE" \
    --yes \
    >/dev/null || fail "La creation de la branche Supabase a echoue."
}

unpause_remote_branch_if_needed() {
  local deadline

  if [[ "$SUPABASE_BRANCH_STATUS" == "PAUSING" ]]; then
    deadline=$((SECONDS + 120))
    while (( SECONDS < deadline )); do
      sleep 2
      load_remote_branch || fail "La branche Supabase a disparu pendant sa mise en pause."
      [[ "$SUPABASE_BRANCH_STATUS" != "PAUSING" ]] && break
    done
    [[ "$SUPABASE_BRANCH_STATUS" != "PAUSING" ]] || fail "La branche Supabase reste bloquee en mise en pause."
  fi

  if [[ "$SUPABASE_BRANCH_STATUS" == *"PAUSED"* || "$SUPABASE_BRANCH_STATUS" == "INACTIVE" ]]; then
    print "Reveil de la branche Supabase $SUPABASE_BRANCH_NAME..."
    supabase_cli branches unpause "$SUPABASE_BRANCH_NAME" \
      --project-ref "$SUPABASE_PARENT_PROJECT_REF" \
      --yes \
      >/dev/null || fail "La branche Supabase n'a pas pu etre reveillee."
  fi
}

load_branch_credentials() {
  local temporary_env
  local deadline=$((SECONDS + 300))
  local next_update=$((SECONDS + 10))

  temporary_env="$(mktemp)"
  chmod 600 "$temporary_env"

  while (( SECONDS < deadline )); do
    if load_remote_branch; then
      if [[ "$SUPABASE_BRANCH_STATUS" == *"FAILED"* ]]; then
        rm -f "$temporary_env"
        fail "Le deploiement Supabase a echoue avec le statut $SUPABASE_BRANCH_STATUS. Consulte les logs Branching du dashboard."
      fi

      unpause_remote_branch_if_needed

      if supabase_cli branches get "$SUPABASE_BRANCH_NAME" \
        --project-ref "$SUPABASE_PARENT_PROJECT_REF" \
        -o env \
        > "$temporary_env" 2>/dev/null; then
        set -a
        source "$temporary_env"
        set +a

        if [[ -n "${SUPABASE_URL:-}" && -n "${SUPABASE_ANON_KEY:-}" && \
          -n "${SUPABASE_SERVICE_ROLE_KEY:-}" && -n "${POSTGRES_URL_NON_POOLING:-}" ]] && \
          curl -fsS --max-time 10 \
            -H "apikey: $SUPABASE_ANON_KEY" \
            "$SUPABASE_URL/auth/v1/health" \
            >/dev/null 2>&1; then
          rm -f "$temporary_env"
          return
        fi
      fi
    fi

    if (( SECONDS >= next_update )); then
      print "Supabase prepare $GIT_BRANCH (${SUPABASE_BRANCH_STATUS:-creation en cours})..."
      next_update=$((next_update + 10))
    fi
    sleep 2
  done

  rm -f "$temporary_env"
  fail "La branche Supabase n'est pas devenue disponible apres 5 minutes."
}

ensure_remote_branch() {
  if load_remote_branch; then
    unpause_remote_branch_if_needed
  else
    create_remote_branch
  fi

  load_branch_credentials
}

sync_migrations() {
  local deadline

  print "Synchronisation des migrations avec $SUPABASE_BRANCH_NAME..."
  supabase_cli --log-level error db push \
    --db-url "$POSTGRES_URL_NON_POOLING" \
    --include-all \
    --yes || fail "Les migrations n'ont pas pu etre appliquees a la branche Supabase."

  # PostgREST recharge son schema de maniere asynchrone apres les migrations.
  # Attendre ici evite que le seed Auth voie les tables SQL avant l'API REST.
  deadline=$((SECONDS + 90))
  while (( SECONDS < deadline )); do
    if curl -fsS --max-time 10 \
      -H "apikey: $SUPABASE_SERVICE_ROLE_KEY" \
      -H "Authorization: Bearer $SUPABASE_SERVICE_ROLE_KEY" \
      "$SUPABASE_URL/rest/v1/profiles?select=id&limit=1" \
      >/dev/null 2>&1; then
      return
    fi
    sleep 2
  done
  fail "L'API Supabase n'a pas recharge le schema apres les migrations."
}

write_public_env() {
  local temporary_env="$PROJECT_ROOT/.env.local.tmp.$$"

  umask 077
  if [[ -f "$PROJECT_ROOT/.env.local" ]]; then
    grep -Ev '^NEXT_PUBLIC_SUPABASE_(URL|ANON_KEY)=' "$PROJECT_ROOT/.env.local" > "$temporary_env" || true
  else
    : > "$temporary_env"
  fi

  print -r -- "NEXT_PUBLIC_SUPABASE_URL=\"$SUPABASE_URL\"" >> "$temporary_env"
  print -r -- "NEXT_PUBLIC_SUPABASE_ANON_KEY=\"$SUPABASE_ANON_KEY\"" >> "$temporary_env"
  mv "$temporary_env" "$PROJECT_ROOT/.env.local"
}

remove_public_env() {
  local temporary_env="$PROJECT_ROOT/.env.local.tmp.$$"

  [[ -f "$PROJECT_ROOT/.env.local" ]] || return
  umask 077
  grep -Ev '^NEXT_PUBLIC_SUPABASE_(URL|ANON_KEY)=' "$PROJECT_ROOT/.env.local" > "$temporary_env" || true

  if [[ -s "$temporary_env" ]]; then
    mv "$temporary_env" "$PROJECT_ROOT/.env.local"
  else
    rm -f "$temporary_env" "$PROJECT_ROOT/.env.local"
  fi
}

bootstrap_local_users() {
  export CONDUCTOR_SUPABASE_URL="$SUPABASE_URL"
  export CONDUCTOR_SUPABASE_SERVICE_ROLE_KEY="$SUPABASE_SERVICE_ROLE_KEY"
  node "$SCRIPT_DIR/seed-local.mjs"
  unset CONDUCTOR_SUPABASE_URL CONDUCTOR_SUPABASE_SERVICE_ROLE_KEY
}

clear_branch_credentials() {
  unset POSTGRES_URL POSTGRES_URL_NON_POOLING SUPABASE_ANON_KEY SUPABASE_DEFAULT_KEY
  unset SUPABASE_JWT_SECRET SUPABASE_PUBLISHABLE_KEY SUPABASE_SERVICE_ROLE_KEY SUPABASE_URL
}

delete_remote_branch() {
  if ! load_remote_branch; then
    print "Aucune branche Supabase n'est associee a $GIT_BRANCH."
    return
  fi

  print "Suppression de la branche Supabase $SUPABASE_BRANCH_NAME..."
  supabase_cli branches delete "$SUPABASE_BRANCH_NAME" \
    --project-ref "$SUPABASE_PARENT_PROJECT_REF" \
    --yes \
    >/dev/null || fail "La branche Supabase n'a pas pu etre supprimee."
}

wait_for_branch_deletion() {
  local deadline=$((SECONDS + 120))
  while (( SECONDS < deadline )); do
    if ! load_remote_branch; then
      return
    fi
    sleep 2
  done
  fail "La suppression de la branche Supabase n'est pas terminee apres 2 minutes."
}

pause_remote_branch() {
  local deadline

  if ! load_remote_branch; then
    print "Aucune branche Supabase n'est associee a $GIT_BRANCH."
    return
  fi

  print "Mise en pause de la branche Supabase $SUPABASE_BRANCH_NAME..."
  supabase_cli branches pause "$SUPABASE_BRANCH_NAME" \
    --project-ref "$SUPABASE_PARENT_PROJECT_REF" \
    --yes \
    >/dev/null || fail "La branche Supabase n'a pas pu etre mise en pause."

  deadline=$((SECONDS + 120))
  while (( SECONDS < deadline )); do
    load_remote_branch || fail "La branche Supabase a disparu pendant sa mise en pause."
    [[ "$SUPABASE_BRANCH_STATUS" == "PAUSED" || "$SUPABASE_BRANCH_STATUS" == "INACTIVE" ]] && return
    sleep 2
  done
  fail "La branche Supabase n'est pas passee en pause apres 2 minutes."
}

print_workspace_summary() {
  print ""
  print "The Vibe Experience est pret."
  print "  Web:       http://localhost:${CONDUCTOR_PORT}"
  print "  Supabase:  ${SUPABASE_BRANCH_NAME} (${SUPABASE_BRANCH_PROJECT_REF})"
  print "  Nouveau:   nouveau@local.test / vibe-local-123"
  print "  Demo:      demo@local.test / vibe-local-123"
  print ""
}

cd "$PROJECT_ROOT"
configure_workspace
