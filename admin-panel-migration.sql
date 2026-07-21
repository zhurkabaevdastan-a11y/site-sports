-- Запустите один раз в Supabase SQL Editor
alter table public.profiles add column if not exists role text not null default 'participant' check (role in ('participant','instructor','admin'));
alter table public.profiles add column if not exists email text;
create or replace function public.is_admin() returns boolean language sql stable security definer set search_path=public as $$ select exists(select 1 from public.profiles where id=auth.uid() and role='admin'); $$;
revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;
drop policy if exists "Admins read all profiles" on public.profiles;
create policy "Admins read all profiles" on public.profiles for select to authenticated using (public.is_admin());
drop policy if exists "Admins read all registrations" on public.registrations;
create policy "Admins read all registrations" on public.registrations for select to authenticated using (public.is_admin());
drop policy if exists "Admins update all registrations" on public.registrations;
create policy "Admins update all registrations" on public.registrations for update to authenticated using (public.is_admin()) with check (public.is_admin());
create or replace function public.protect_profile_role() returns trigger language plpgsql security definer set search_path=public as $$ begin if new.role is distinct from old.role and not public.is_admin() then raise exception 'Only an administrator can change roles'; end if; return new; end; $$;
drop trigger if exists protect_profile_role_trigger on public.profiles;
create trigger protect_profile_role_trigger before update on public.profiles for each row execute function public.protect_profile_role();
create index if not exists profiles_region_idx on public.profiles(region);
create index if not exists registrations_status_idx on public.registrations(status);
create index if not exists registrations_created_at_idx on public.registrations(created_at desc);
