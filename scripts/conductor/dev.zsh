#!/bin/zsh

source "${0:A:h}/common.zsh"

ensure_web_port_available
start_supabase
bootstrap_local_users
write_public_env
print_workspace_summary

exec npm run dev -- --port "$CONDUCTOR_PORT"
