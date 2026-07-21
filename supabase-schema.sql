-- КТЖ SPORT: схема базы данных Supabase
-- Запустите весь файл в Supabase Dashboard → SQL Editor.

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  first_name text,
  last_name text,
  middle_name text,
  birth_date date,
  phone text,
  employee_number text,
  position text,
  department text,
  region text,
  clothing_size text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.events (
  id text primary key,
  title text not null,
  start_date date,
  end_date date,
  location text,
  registration_open boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.registrations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  event_id text not null references public.events(id) on delete restrict,
  discipline text not null,
  team_name text,
  comment text,
  health_confirmed boolean not null default false,
  status text not null default 'new'
    check (status in ('new','review','approved','rejected','cancelled')),
  created_at timestamptz not null default now(),
  unique (user_id, event_id, discipline)
);

insert into public.events (id, title, start_date, end_date, location)
values
  ('futsal-2027','Чемпионат КТЖ по футзалу','2027-04-01','2027-04-04',null),
  ('volleyball-2027','Чемпионат КТЖ по волейболу','2027-04-27','2027-04-30',null),
  ('summer-games-2027','Летняя спартакиада КТЖ',null,null,null)
on conflict (id) do update set
  title = excluded.title,
  start_date = excluded.start_date,
  end_date = excluded.end_date;

alter table public.profiles enable row level security;
alter table public.events enable row level security;
alter table public.registrations enable row level security;

drop policy if exists "Public can read events" on public.events;
create policy "Public can read events"
on public.events for select
to anon, authenticated
using (true);

drop policy if exists "Users read own profile" on public.profiles;
create policy "Users read own profile"
on public.profiles for select
to authenticated
using ((select auth.uid()) = id);

drop policy if exists "Users insert own profile" on public.profiles;
create policy "Users insert own profile"
on public.profiles for insert
to authenticated
with check ((select auth.uid()) = id);

drop policy if exists "Users update own profile" on public.profiles;
create policy "Users update own profile"
on public.profiles for update
to authenticated
using ((select auth.uid()) = id)
with check ((select auth.uid()) = id);

drop policy if exists "Users read own registrations" on public.registrations;
create policy "Users read own registrations"
on public.registrations for select
to authenticated
using ((select auth.uid()) = user_id);

drop policy if exists "Users create own registrations" on public.registrations;
create policy "Users create own registrations"
on public.registrations for insert
to authenticated
with check ((select auth.uid()) = user_id);

drop policy if exists "Users cancel own registrations" on public.registrations;
create policy "Users cancel own registrations"
on public.registrations for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create index if not exists registrations_user_id_idx
  on public.registrations(user_id);

create index if not exists registrations_event_id_idx
  on public.registrations(event_id);
