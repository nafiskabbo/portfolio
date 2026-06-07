-- Portfolio tracking + API security schema (Supabase)
-- Run in Supabase SQL Editor. Service role key is used only on the server.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- tracking_events: minimal lead attribution (no PII)
-- ---------------------------------------------------------------------------
create table if not exists public.tracking_events (
  id uuid primary key default gen_random_uuid(),
  lead_token uuid not null,
  event_type text not null check (event_type in ('pixel', 'click', 'redirect')),
  destination text not null default 'unknown',
  source text not null default 'unknown',
  ip_hash text,
  country_code char(2),
  user_agent_hash text,
  created_at timestamptz not null default now()
);

create index if not exists tracking_events_lead_token_idx
  on public.tracking_events (lead_token);

create index if not exists tracking_events_created_at_idx
  on public.tracking_events (created_at desc);

create index if not exists tracking_events_lead_event_idx
  on public.tracking_events (lead_token, event_type, created_at desc);

-- ---------------------------------------------------------------------------
-- api_rate_limits: distributed rate limiting for serverless
-- ---------------------------------------------------------------------------
create table if not exists public.api_rate_limits (
  id uuid primary key default gen_random_uuid(),
  bucket_key text not null,
  endpoint text not null,
  window_start timestamptz not null,
  request_count integer not null default 1,
  updated_at timestamptz not null default now(),
  unique (bucket_key, endpoint, window_start)
);

create index if not exists api_rate_limits_lookup_idx
  on public.api_rate_limits (bucket_key, endpoint, window_start);

-- ---------------------------------------------------------------------------
-- blocked_ips: auto/manual IP blocks (stores hashed IP only)
-- ---------------------------------------------------------------------------
create table if not exists public.blocked_ips (
  ip_hash text primary key,
  reason text not null default 'manual',
  blocked_at timestamptz not null default now(),
  expires_at timestamptz
);

create index if not exists blocked_ips_expires_idx
  on public.blocked_ips (expires_at);

-- ---------------------------------------------------------------------------
-- RLS: deny all client access; server uses service role only
-- ---------------------------------------------------------------------------
alter table public.tracking_events enable row level security;
alter table public.api_rate_limits enable row level security;
alter table public.blocked_ips enable row level security;

-- No policies = anon/authenticated cannot read or write.

-- Optional: purge old rate-limit rows (run via cron)
-- delete from public.api_rate_limits where window_start < now() - interval '2 days';
