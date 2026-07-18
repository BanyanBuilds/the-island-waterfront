-- The Island Waterfront Bar & Grill
-- Complete Supabase schema for website content, menu management, hours,
-- announcements, contact submissions, and admin access.
-- Run this entire file in the Supabase SQL Editor on a new project.

begin;

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- Shared helpers
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.is_site_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_users
    where user_id = auth.uid()
  );
$$;

-- ---------------------------------------------------------------------------
-- Admin authorization
-- ---------------------------------------------------------------------------
create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;

create policy "Admins can read their own admin record"
on public.admin_users for select
to authenticated
using (user_id = auth.uid());

-- ---------------------------------------------------------------------------
-- Site-wide settings and editable page content
-- ---------------------------------------------------------------------------
create table if not exists public.site_settings (
  id smallint primary key default 1 check (id = 1),
  restaurant_name text not null default 'The Island Waterfront Bar & Grill',
  phone_display text not null default '(321) 806-3661',
  phone_href text not null default 'tel:+13218063661',
  address text not null default '1891 E Merritt Island Causeway, Merritt Island, FL 32952',
  maps_url text,
  facebook_url text,
  live_music_message text not null default 'LIVE MUSIC EVERY FRIDAY–SUNDAY',
  landing_image_url text,
  waterfront_image_url text,
  announcement text,
  announcement_enabled boolean not null default false,
  updated_at timestamptz not null default now()
);

insert into public.site_settings (id)
values (1)
on conflict (id) do nothing;

create trigger site_settings_set_updated_at
before update on public.site_settings
for each row execute function public.set_updated_at();

alter table public.site_settings enable row level security;

create policy "Anyone can read site settings"
on public.site_settings for select
to anon, authenticated
using (true);

create policy "Admins can update site settings"
on public.site_settings for update
to authenticated
using (public.is_site_admin())
with check (public.is_site_admin());

create table if not exists public.pages (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  eyebrow text,
  title text not null,
  body text,
  image_url text,
  is_published boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger pages_set_updated_at
before update on public.pages
for each row execute function public.set_updated_at();

alter table public.pages enable row level security;

create policy "Anyone can read published pages"
on public.pages for select
to anon, authenticated
using (is_published or public.is_site_admin());

create policy "Admins can manage pages"
on public.pages for all
to authenticated
using (public.is_site_admin())
with check (public.is_site_admin());

insert into public.pages (slug, eyebrow, title, body, sort_order)
values
  ('home', 'Where the locals go', 'The Island Waterfront Bar & Grill', 'LIVE MUSIC EVERY FRIDAY–SUNDAY', 10),
  ('waterfront', 'Banana River views', 'Waterfront Dining', 'Cold drinks, coastal air, and an Old Florida waterfront atmosphere.', 20),
  ('menu', 'Food & cold drinks', 'The Island Menu', 'Seafood, burgers, bowls, cocktails, and local favorites.', 30),
  ('visit', 'Come as you are', 'Visit The Island', 'Find directions, hours, and contact information.', 40)
on conflict (slug) do nothing;

-- ---------------------------------------------------------------------------
-- Menu CMS
-- ---------------------------------------------------------------------------
create table if not exists public.menu_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger menu_categories_set_updated_at
before update on public.menu_categories
for each row execute function public.set_updated_at();

create table if not exists public.menu_items (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.menu_categories(id) on delete cascade,
  name text not null,
  description text,
  price numeric(10,2),
  price_label text,
  image_url text,
  sort_order integer not null default 0,
  is_available boolean not null default true,
  is_featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (price is not null or price_label is not null)
);

create index if not exists menu_items_category_sort_idx
on public.menu_items(category_id, sort_order);

create trigger menu_items_set_updated_at
before update on public.menu_items
for each row execute function public.set_updated_at();

alter table public.menu_categories enable row level security;
alter table public.menu_items enable row level security;

create policy "Anyone can read active menu categories"
on public.menu_categories for select
to anon, authenticated
using (is_active or public.is_site_admin());

create policy "Anyone can read available menu items"
on public.menu_items for select
to anon, authenticated
using (is_available or public.is_site_admin());

create policy "Admins can manage menu categories"
on public.menu_categories for all
to authenticated
using (public.is_site_admin())
with check (public.is_site_admin());

create policy "Admins can manage menu items"
on public.menu_items for all
to authenticated
using (public.is_site_admin())
with check (public.is_site_admin());

-- ---------------------------------------------------------------------------
-- Hours, music notices, and specials
-- ---------------------------------------------------------------------------
create table if not exists public.business_hours (
  day_of_week smallint primary key check (day_of_week between 0 and 6),
  day_name text not null,
  opens_at time,
  closes_at time,
  is_closed boolean not null default false,
  note text,
  updated_at timestamptz not null default now()
);

create trigger business_hours_set_updated_at
before update on public.business_hours
for each row execute function public.set_updated_at();

alter table public.business_hours enable row level security;

create policy "Anyone can read business hours"
on public.business_hours for select
to anon, authenticated
using (true);

create policy "Admins can manage business hours"
on public.business_hours for all
to authenticated
using (public.is_site_admin())
with check (public.is_site_admin());

insert into public.business_hours (day_of_week, day_name, is_closed)
values
  (0, 'Sunday', false),
  (1, 'Monday', false),
  (2, 'Tuesday', false),
  (3, 'Wednesday', false),
  (4, 'Thursday', false),
  (5, 'Friday', false),
  (6, 'Saturday', false)
on conflict (day_of_week) do nothing;

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  starts_at timestamptz not null,
  ends_at timestamptz,
  performer_name text,
  facebook_url text,
  image_url text,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (ends_at is null or ends_at >= starts_at)
);

create index if not exists events_starts_at_idx on public.events(starts_at);

create trigger events_set_updated_at
before update on public.events
for each row execute function public.set_updated_at();

alter table public.events enable row level security;

create policy "Anyone can read published events"
on public.events for select
to anon, authenticated
using (is_published or public.is_site_admin());

create policy "Admins can manage events"
on public.events for all
to authenticated
using (public.is_site_admin())
with check (public.is_site_admin());

create table if not exists public.specials (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  starts_at timestamptz,
  ends_at timestamptz,
  is_published boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (ends_at is null or starts_at is null or ends_at >= starts_at)
);

create trigger specials_set_updated_at
before update on public.specials
for each row execute function public.set_updated_at();

alter table public.specials enable row level security;

create policy "Anyone can read published specials"
on public.specials for select
to anon, authenticated
using (is_published or public.is_site_admin());

create policy "Admins can manage specials"
on public.specials for all
to authenticated
using (public.is_site_admin())
with check (public.is_site_admin());

-- ---------------------------------------------------------------------------
-- Contact submissions
-- ---------------------------------------------------------------------------
create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text,
  phone text,
  subject text,
  message text not null,
  status text not null default 'new' check (status in ('new', 'read', 'resolved', 'spam')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists contact_submissions_created_at_idx
on public.contact_submissions(created_at desc);

create trigger contact_submissions_set_updated_at
before update on public.contact_submissions
for each row execute function public.set_updated_at();

alter table public.contact_submissions enable row level security;

create policy "Anyone can submit contact messages"
on public.contact_submissions for insert
to anon, authenticated
with check (
  char_length(name) between 1 and 120
  and char_length(message) between 1 and 5000
);

create policy "Admins can read contact messages"
on public.contact_submissions for select
to authenticated
using (public.is_site_admin());

create policy "Admins can update contact messages"
on public.contact_submissions for update
to authenticated
using (public.is_site_admin())
with check (public.is_site_admin());

create policy "Admins can delete contact messages"
on public.contact_submissions for delete
to authenticated
using (public.is_site_admin());

-- ---------------------------------------------------------------------------
-- Storage bucket for public site images
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'site-media',
  'site-media',
  true,
  10485760,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

create policy "Anyone can view site media"
on storage.objects for select
to public
using (bucket_id = 'site-media');

create policy "Admins can upload site media"
on storage.objects for insert
to authenticated
with check (bucket_id = 'site-media' and public.is_site_admin());

create policy "Admins can update site media"
on storage.objects for update
to authenticated
using (bucket_id = 'site-media' and public.is_site_admin())
with check (bucket_id = 'site-media' and public.is_site_admin());

create policy "Admins can delete site media"
on storage.objects for delete
to authenticated
using (bucket_id = 'site-media' and public.is_site_admin());

commit;

-- AFTER creating your first Supabase Auth user, grant admin access manually:
-- insert into public.admin_users (user_id, display_name)
-- values ('YOUR-AUTH-USER-UUID', 'Owner');
