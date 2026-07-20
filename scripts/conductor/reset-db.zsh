#!/bin/zsh

source "${0:A:h}/common.zsh"

delete_remote_branch
wait_for_branch_deletion
ensure_remote_branch
sync_migrations
bootstrap_local_users
write_public_env
print_workspace_summary
clear_branch_credentials
print "La branche Supabase a ete recreee et reseedee."
