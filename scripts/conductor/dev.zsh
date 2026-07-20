#!/bin/zsh

source "${0:A:h}/common.zsh"

ensure_web_port_available
ensure_remote_branch
sync_migrations
bootstrap_local_users
write_public_env
print_workspace_summary
clear_branch_credentials
release_workspace_lock

exec npm run dev -- --port "$CONDUCTOR_PORT"
