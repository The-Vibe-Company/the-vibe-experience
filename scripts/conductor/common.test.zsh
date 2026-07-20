#!/bin/zsh

set -eu
set -o pipefail

export CONDUCTOR_COMMON_NO_AUTO_CONFIGURE=1
source "${0:A:h}/common.zsh"

TEST_ROOT="$(mktemp -d)"
trap 'rm -rf "$TEST_ROOT"' EXIT HUP INT TERM

pass_count=0

assert_equal() {
  local expected="$1"
  local actual="$2"
  local message="$3"
  [[ "$actual" == "$expected" ]] || fail "$message (attendu: $expected, obtenu: $actual)"
}

assert_contains() {
  local haystack="$1"
  local needle="$2"
  local message="$3"
  [[ "$haystack" == *"$needle"* ]] || fail "$message (texte absent: $needle)"
}

run_test() {
  local name="$1"
  shift
  ( "$@" )
  pass_count=$((pass_count + 1))
  print "ok - $name"
}

test_branch_name_is_workspace_stable() {
  PROJECT_ROOT="$TEST_ROOT/stable-workspace"
  CONDUCTOR_WORKSPACE_NAME="Singapore V3"
  GIT_BRANCH="feature/avant"
  local before="$(generated_branch_name)"
  GIT_BRANCH="feature/apres"
  local after="$(generated_branch_name)"

  assert_equal "$before" "$after" "Le nom Supabase ne doit pas changer avec le nom de branche Git"
  assert_contains "$before" "conductor-singapore-v3-" "Le nom doit identifier le workspace"
}

test_branch_statuses_are_kept_separate() {
  PROJECT_ROOT="$TEST_ROOT/status-workspace"
  CONDUCTOR_WORKSPACE_NAME="Status Workspace"
  GIT_BRANCH="feature/status"
  SUPABASE_BRANCH_STATE_FILE="$PROJECT_ROOT/.context/supabase-branch-name"
  TEST_EXPECTED_NAME="$(generated_branch_name)"

  branch_list_json() {
    print -r -- "[{\"name\":\"$TEST_EXPECTED_NAME\",\"project_ref\":\"branchprojectref00001\",\"status\":\"MIGRATIONS_FAILED\",\"preview_project_status\":\"ACTIVE_HEALTHY\",\"is_default\":false}]"
  }

  load_remote_branch
  assert_equal "MIGRATIONS_FAILED" "$SUPABASE_BRANCH_WORKFLOW_STATUS" "Le statut du workflow doit rester visible"
  assert_equal "ACTIVE_HEALTHY" "$SUPABASE_BRANCH_PROJECT_STATUS" "Le statut du projet doit rester distinct"
}

test_login_failure_is_literal() {
  PROJECT_ROOT="$TEST_ROOT/login-workspace"
  CONDUCTOR_WORKSPACE_NAME="Login Workspace"
  GIT_BRANCH="feature/login"
  SUPABASE_BRANCH_STATE_FILE="$PROJECT_ROOT/.context/supabase-branch-name"
  local unexpected_call="$TEST_ROOT/unexpected-login-call"

  branch_list_json() { return 1 }
  supabase() { print called > "$unexpected_call" }

  local output
  if output="$(load_remote_branch 2>&1)"; then
    fail "La lecture des branches devait echouer"
  fi

  assert_contains "$output" "npm run supabase -- login" "Le message doit afficher la commande de connexion"
  [[ ! -e "$unexpected_call" ]] || fail "Le message d'erreur ne doit jamais executer supabase login"
}

test_create_is_cli_owned_and_retry_safe() {
  PROJECT_ROOT="$TEST_ROOT/create-workspace"
  CONDUCTOR_WORKSPACE_NAME="Create Workspace"
  GIT_BRANCH="feature/create"
  SUPABASE_BRANCH_STATE_FILE="$PROJECT_ROOT/.context/supabase-branch-name"
  local cli_args="$TEST_ROOT/create-args"

  supabase_cli() {
    print -r -- "$*" > "$cli_args"
    return 0
  }

  create_remote_branch
  local args="$(<"$cli_args")"
  assert_contains "$args" "branches create" "La CLI doit creer une branche"
  [[ "$args" != *"--git-branch"* ]] || fail "Conductor doit etre l'unique proprietaire des migrations"
}

test_workflow_must_settle_before_manual_migrations() {
  SUPABASE_BRANCH_WORKFLOW_STATUS="CREATING_PROJECT"
  if workflow_is_terminal; then
    fail "Conductor ne doit pas pousser les migrations pendant la creation Supabase"
  fi

  SUPABASE_BRANCH_WORKFLOW_STATUS="MIGRATIONS_FAILED"
  workflow_is_terminal || fail "Un echec terminal doit laisser Conductor reprendre les migrations"

  SUPABASE_BRANCH_WORKFLOW_STATUS="FUNCTIONS_DEPLOYED"
  workflow_is_terminal || fail "Un workflow termine doit autoriser la suite"
}

test_public_env_preserves_unrelated_values() {
  PROJECT_ROOT="$TEST_ROOT/env-workspace"
  mkdir -p "$PROJECT_ROOT"
  print 'OTHER_VALUE="keep-me"' > "$PROJECT_ROOT/.env.local"
  print 'NEXT_PUBLIC_SUPABASE_URL="old"' >> "$PROJECT_ROOT/.env.local"
  print 'NEXT_PUBLIC_SUPABASE_ANON_KEY="old"' >> "$PROJECT_ROOT/.env.local"
  SUPABASE_URL="https://workspace.supabase.co"
  SUPABASE_ANON_KEY="public-test-key"

  write_public_env
  local contents="$(<"$PROJECT_ROOT/.env.local")"
  assert_contains "$contents" 'OTHER_VALUE="keep-me"' "Les variables non Supabase doivent etre conservees"
  assert_contains "$contents" 'NEXT_PUBLIC_SUPABASE_URL="https://workspace.supabase.co"' "L'URL doit etre remplacee"
  assert_contains "$contents" 'NEXT_PUBLIC_SUPABASE_ANON_KEY="public-test-key"' "La cle publique doit etre remplacee"
}

test_cleanup_removes_credentials_and_lock() {
  PROJECT_ROOT="$TEST_ROOT/cleanup-workspace"
  WORKSPACE_LOCK_DIR="$PROJECT_ROOT/.context/conductor-supabase.lock"
  CREDENTIALS_TEMP_FILE="$TEST_ROOT/branch-credentials"
  WORKSPACE_LOCK_HELD=1
  mkdir -p "$WORKSPACE_LOCK_DIR"
  print secret > "$CREDENTIALS_TEMP_FILE"

  cleanup_runtime
  [[ ! -e "$CREDENTIALS_TEMP_FILE" ]] || fail "Le fichier de credentials temporaire doit etre supprime"
  [[ ! -d "$WORKSPACE_LOCK_DIR" ]] || fail "Le verrou du workspace doit etre libere"
}

test_clear_branch_credentials_removes_named_api_keys() {
  SUPABASE_ANON_KEY="anon"
  SUPABASE_CUSTOM_PREVIEW_KEY="custom"
  SUPABASE_PARENT_PROJECT_REF="keep-project-ref"
  POSTGRES_URL_NON_POOLING="postgres://secret"

  clear_branch_credentials

  [[ -z "${SUPABASE_ANON_KEY:-}" ]] || fail "La cle anon doit etre retiree"
  [[ -z "${SUPABASE_CUSTOM_PREVIEW_KEY:-}" ]] || fail "Toute cle API nommee doit etre retiree"
  [[ -z "${POSTGRES_URL_NON_POOLING:-}" ]] || fail "L'URL Postgres doit etre retiree"
  assert_equal "keep-project-ref" "$SUPABASE_PARENT_PROJECT_REF" "Le project ref non secret doit rester disponible"
}

run_test "stable workspace identity" test_branch_name_is_workspace_stable
run_test "separate workflow and project statuses" test_branch_statuses_are_kept_separate
run_test "literal login guidance" test_login_failure_is_literal
run_test "CLI-owned idempotent creation" test_create_is_cli_owned_and_retry_safe
run_test "hosted workflow settles before CLI migrations" test_workflow_must_settle_before_manual_migrations
run_test "public env preservation" test_public_env_preserves_unrelated_values
run_test "credential and lock cleanup" test_cleanup_removes_credentials_and_lock
run_test "dynamic API key cleanup" test_clear_branch_credentials_removes_named_api_keys

print "1..$pass_count"
