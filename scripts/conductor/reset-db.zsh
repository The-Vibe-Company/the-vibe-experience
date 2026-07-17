#!/bin/zsh

source "${0:A:h}/common.zsh"

start_supabase
print "Reinitialisation de la base locale $SUPABASE_PROJECT_ID..."
supabase_cli db reset --local --yes
bootstrap_local_users
write_public_env
print_workspace_summary
print "La base locale a ete reinitialisee et reseedee."
