-- Admin allowlist: add your Supabase Auth user id manually (see README).
create table public.admins (user_id uuid primary key references auth.users(id) on delete cascade);
create or replace function public.is_admin() returns boolean language sql stable security definer set search_path=public as $$ select exists(select 1 from public.admins where user_id=auth.uid()) $$;

create table public.projects (id uuid primary key default gen_random_uuid(), title text not null, slug text unique not null, summary text, description text, category text, technologies text[] default '{}', cover_image_path text, gallery_paths text[] default '{}', repository_url text, demo_url text, documentation_url text, status text default 'in_progress', is_featured boolean default false, is_published boolean default false, start_date date, completion_date date, created_at timestamptz default now(), updated_at timestamptz default now());
create table public.certificates (id uuid primary key default gen_random_uuid(), title text not null, issuer text not null, category text, description text, credential_id text, verification_url text, issue_date date, expiry_date date, file_path text, is_featured boolean default false, is_published boolean default false, sort_order int default 0, created_at timestamptz default now(), updated_at timestamptz default now());
create table public.achievements (id uuid primary key default gen_random_uuid(), title text not null, category text, organization text, description text, event_date date, team_name text, rank text, score text, evidence_url text, image_path text, is_featured boolean default false, is_published boolean default false, created_at timestamptz default now(), updated_at timestamptz default now());
create table public.research_papers (id uuid primary key default gen_random_uuid(), title text not null, slug text unique not null, abstract text, authors text[] default '{}', research_area text, methodology text, evaluation text, results text, limitations text, future_work text, publication_status text default 'unpublished', doi text, publication_url text, pdf_path text, repository_url text, is_featured boolean default false, is_published boolean default false, created_at timestamptz default now(), updated_at timestamptz default now());
create table public.blog_posts (id uuid primary key default gen_random_uuid(), title text not null, slug text unique not null, excerpt text, content text, cover_image_path text, tags text[] default '{}', status text default 'draft' check (status in ('draft','published','private','archived')), published_at timestamptz, created_at timestamptz default now(), updated_at timestamptz default now());
create table public.skills (id uuid primary key default gen_random_uuid(), name text not null, category text, proficiency_label text, sort_order int default 0, is_published boolean default false);
create table public.profiles (id uuid primary key default gen_random_uuid(), display_name text, headline text, biography text, education text, location text, avatar_path text, cv_path text, public_email text, social_links jsonb default '{}', updated_at timestamptz default now());
create table public.media (id uuid primary key default gen_random_uuid(), original_filename text, storage_path text unique, content_type text, file_size bigint, created_at timestamptz default now());

-- RLS: anon reads published only; admin does everything.
do $$ declare t text; pub text; begin
 for t,pub in values ('projects','is_published'),('certificates','is_published'),('achievements','is_published'),('research_papers','is_published'),('skills','is_published') loop
  execute format('alter table public.%I enable row level security',t);
  execute format('create policy "public read" on public.%I for select using (%I = true)',t,pub);
  execute format('create policy "admin all" on public.%I for all using (public.is_admin()) with check (public.is_admin())',t);
 end loop; end $$;
alter table public.blog_posts enable row level security;
create policy "public read" on public.blog_posts for select using (status='published');
create policy "admin all" on public.blog_posts for all using (public.is_admin()) with check (public.is_admin());
alter table public.profiles enable row level security;
create policy "public read" on public.profiles for select using (true);
create policy "admin all" on public.profiles for all using (public.is_admin()) with check (public.is_admin());
alter table public.media enable row level security;
create policy "admin all" on public.media for all using (public.is_admin()) with check (public.is_admin());
alter table public.admins enable row level security; -- no policies: only service role / SQL editor
