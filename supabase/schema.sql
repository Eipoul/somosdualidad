-- =============================================
-- Somos Dualidad — Supabase Database Schema
-- Run this in your Supabase SQL editor
-- =============================================

-- Enable UUID extension (usually already enabled)
create extension if not exists "uuid-ossp";

-- =============================================
-- SUBSCRIBERS
-- =============================================
create table if not exists subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  status text default 'active' check (status in ('active', 'unsubscribed')),
  created_at timestamptz default now()
);

-- Row Level Security
alter table subscribers enable row level security;

-- Allow service role full access (for server-side operations)
create policy "Service role full access on subscribers"
  on subscribers for all
  to service_role
  using (true)
  with check (true);

-- Public can insert (subscribe form)
create policy "Public can subscribe"
  on subscribers for insert
  to anon
  with check (true);

-- =============================================
-- EPISODES
-- =============================================
create table if not exists episodes (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  description text,
  show_notes text,
  cover_image_url text,
  audio_url text,
  embed_url text,
  duration text,
  season int,
  tags text[],
  status text default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz,
  created_at timestamptz default now()
);

alter table episodes enable row level security;

-- Public can read published episodes
create policy "Public can read published episodes"
  on episodes for select
  to anon
  using (status = 'published');

-- Authenticated (admin) can do everything
create policy "Authenticated full access on episodes"
  on episodes for all
  to authenticated
  using (true)
  with check (true);

-- Service role full access
create policy "Service role full access on episodes"
  on episodes for all
  to service_role
  using (true)
  with check (true);

-- =============================================
-- POSTS (BLOG)
-- =============================================
create table if not exists posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  content text,
  cover_image_url text,
  category text,
  status text default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz,
  created_at timestamptz default now()
);

alter table posts enable row level security;

create policy "Public can read published posts"
  on posts for select
  to anon
  using (status = 'published');

create policy "Authenticated full access on posts"
  on posts for all
  to authenticated
  using (true)
  with check (true);

create policy "Service role full access on posts"
  on posts for all
  to service_role
  using (true)
  with check (true);

-- =============================================
-- PAGE CONFIGS (Builder + Settings)
-- =============================================
create table if not exists page_configs (
  id uuid primary key default gen_random_uuid(),
  page text unique not null,
  config jsonb not null default '[]',
  updated_at timestamptz default now()
);

alter table page_configs enable row level security;

-- Public can read (needed for homepage to load config)
create policy "Public can read page configs"
  on page_configs for select
  to anon
  using (true);

create policy "Authenticated full access on page_configs"
  on page_configs for all
  to authenticated
  using (true)
  with check (true);

create policy "Service role full access on page_configs"
  on page_configs for all
  to service_role
  using (true)
  with check (true);

-- =============================================
-- INDEXES for performance
-- =============================================
create index if not exists episodes_status_published_at on episodes (status, published_at desc);
create index if not exists posts_status_published_at on posts (status, published_at desc);
create index if not exists episodes_slug on episodes (slug);
create index if not exists posts_slug on posts (slug);
create index if not exists subscribers_email on subscribers (email);
create index if not exists subscribers_status on subscribers (status);
