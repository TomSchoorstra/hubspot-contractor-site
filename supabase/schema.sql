-- HubSpot Tips Slack Bot — database schema
-- Uitvoeren in de Supabase SQL editor

-- Tabel: installations
-- Slaat per Slack workspace op hoe de app is geïnstalleerd.
create table if not exists installations (
  id               uuid primary key default gen_random_uuid(),
  team_id          text not null unique,
  team_name        text not null,
  channel_id       text not null,
  access_token     text not null,
  is_active        boolean not null default true,
  installed_at     timestamptz not null default now(),
  last_tip_sent_at timestamptz,
  tip_index        integer not null default 0
);

-- Tabel: training_state
-- Loopschema-app: één JSON-document per persoon (id = 'tom' / 'denise').
-- De volledige app-state wordt in z'n geheel gelezen/geschreven (upsert).
create table if not exists training_state (
  id         text primary key,          -- 'tom' | 'denise'
  data       jsonb not null,            -- {athletes:{a:{name,logs}}}
  updated_at timestamptz not null default now()
);

-- RLS aan, geen publieke policies: alleen de service-role (de server-side
-- proxy in /api/loopschema) mag hierbij. De anon-key kan er nooit bij, ook
-- niet als die zou lekken. De service-role bypasst RLS.
alter table training_state enable row level security;

-- Tabel: tips
-- Bevat alle HubSpot tips die wekelijks verstuurd worden.
create table if not exists tips (
  id              uuid primary key default gen_random_uuid(),
  tip             text not null,
  category        text not null,
  object          text not null default 'all',  -- contact/company/deal/ticket/all
  difficulty      text not null default 'easy', -- easy/moderate/expert
  hubspot_edition text not null default 'all',  -- starter/professional/enterprise/all
  tip_type        text not null default 'productivity', -- productivity/automation/reporting/best_practice
  is_active       boolean not null default true,
  created_at      timestamptz not null default now()
);
