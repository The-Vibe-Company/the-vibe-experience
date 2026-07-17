-- Les policies RLS definissent quelles lignes sont accessibles, mais les roles API
-- ont aussi besoin des privileges SQL sur les tables exposees par PostgREST.
grant select, insert, update, delete
  on table public.profiles, public.progression, public.module_progress
  to authenticated;

grant all
  on table public.profiles, public.progression, public.module_progress
  to service_role;
