#!/bin/zsh

source "${0:A:h}/common.zsh"

ensure_docker
print "Suppression de la stack et des volumes de $SUPABASE_PROJECT_ID..."
supabase_cli stop --project-id "$SUPABASE_PROJECT_ID" --no-backup
