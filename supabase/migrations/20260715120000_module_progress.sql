-- Avancement fin (par sous-étape) d'un module, rattaché au compte.
-- Complète public.progression (qui garde le parcours généré par le quiz) :
-- ici, ce sont les cases cochées, une ligne par (utilisateur, module).
create table if not exists public.module_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  module_key text not null,
  done text[] not null default '{}',
  updated_at timestamptz not null default now(),
  primary key (user_id, module_key)
);

alter table public.module_progress enable row level security;

-- Chacun ne voit et ne modifie que ses propres lignes.
create policy "module_progress_all_own" on public.module_progress
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
