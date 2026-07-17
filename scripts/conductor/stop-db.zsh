#!/bin/zsh

source "${0:A:h}/common.zsh"

if ! command -v docker >/dev/null 2>&1 || ! docker_is_ready; then
  print "Le moteur Docker n'est pas disponible ; aucune stack locale ne peut etre stoppee."
  exit 0
fi

print "Arret de $SUPABASE_PROJECT_ID en conservant ses donnees..."
supabase_cli stop --project-id "$SUPABASE_PROJECT_ID"
