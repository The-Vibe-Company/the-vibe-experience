-- Profils : 1 par utilisateur
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  niveau text,
  objectif text,
  created_at timestamptz not null default now()
);
alter table public.profiles enable row level security;
create policy "profiles_select_own" on public.profiles for select using (auth.uid() = id);
create policy "profiles_update_own" on public.profiles for update using (auth.uid() = id);
create policy "profiles_insert_own" on public.profiles for insert with check (auth.uid() = id);

-- Progression : parcours généré + avancement
create table if not exists public.progression (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  parcours jsonb,
  module_courant text,
  updated_at timestamptz not null default now()
);
alter table public.progression enable row level security;
create policy "progression_all_own" on public.progression for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Créer un profil automatiquement à l'inscription
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email) values (new.id, new.email) on conflict (id) do nothing;
  return new;
end;
$$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();
