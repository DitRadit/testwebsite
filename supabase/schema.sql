-- Tempel seluruh file ini di Supabase: SQL Editor > New query > Run

create table if not exists users (
  id bigint generated always as identity primary key,
  email text unique not null,
  password_hash text not null,
  role text not null default 'admin' check (role in ('admin', 'manager')),
  created_at timestamptz not null default now()
);

-- Informasi website: selalu satu baris (id = 1)
create table if not exists site_info (
  id int primary key default 1 check (id = 1),
  lab_name text not null default 'Laboratorium',
  tagline text not null default '',
  about text not null default '',
  email text not null default '',
  address text not null default '',
  instagram text not null default '',
  logo_url text not null default '',
  hero_image_url text not null default '',
  updated_at timestamptz not null default now()
);

-- Postingan tugas praktikum
create table if not exists posts (
  id bigint generated always as identity primary key,
  title text not null,
  slug text unique not null,
  content text not null,
  course text not null,
  deadline date,
  status text not null default 'draft' check (status in ('draft', 'published')),
  is_pinned boolean not null default false,
  cover_image_url text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Anggota aslab
create table if not exists members (
  id bigint generated always as identity primary key,
  name text not null,
  position text not null,
  division text not null default '',
  bio text not null default '',
  photo_url text not null default '',
  instagram text not null default '',
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Index (tambah sendiri di sini saat butuh, contoh ada di README)
create index if not exists posts_status_created_idx on posts (status, created_at desc);
create index if not exists posts_course_idx on posts (course);
create index if not exists members_sort_idx on members (sort_order, name);

-- Keamanan: akses hanya lewat backend (service role). Anon key tidak bisa baca langsung.
alter table users enable row level security;
alter table site_info enable row level security;
alter table posts enable row level security;
alter table members enable row level security;
