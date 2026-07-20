# Loopschema-app — beheer & deel-instructies

Privé trainingsschema-app voor de halve marathon (1 nov 2026). Niet geïndexeerd, niet gelinkt vanaf de site. Twee losse, onafhankelijke pagina's — ieder z'n eigen data.

## De links

| Persoon | URL |
|---|---|
| Tom | `https://tomschoorstra.com/l/9fqz3k7mx2rp8wtn` |
| Denise | `https://tomschoorstra.com/l/4vhn8key2md6rqxs` |

De slug ná `/l/` is de "sleutel": wie de link heeft, ziet en bewerkt die data. Deel 'm dus alleen met wie het aangaat.

## Op je telefoon zetten (voor Denise)

1. Open je link in **Safari** (iPhone) of **Chrome** (Android).
2. Tik op het **deel-icoon** (het vierkantje met pijltje omhoog).
3. Kies **"Zet op beginscherm"** / **"Toevoegen aan startscherm"**.
4. Nu staat het als een app-icoon op je telefoon. Openen = direct je schema.

Je runs worden op de server bewaard, dus je raakt niks kwijt als je van telefoon wisselt of je browser leegmaakt.

## Techniek (voor Tom)

- **Framework**: Next.js (app-router). De pagina wordt geserveerd door `src/app/l/[slug]/route.ts`; de volledige frontend staat in `src/app/l/[slug]/loopschema-html.ts`.
- **Opslag**: Supabase-tabel `training_state`, één rij per persoon (`id` = `tom` / `denise`). De browser praat nooit direct met Supabase — alles loopt via de serverless proxy `src/app/api/loopschema/route.ts` met de **service-role key** (server-side).
- **Env-vars** (in Vercel):
  - `SUPABASE_URL` en `SUPABASE_SERVICE_ROLE_KEY` — bestaan al (worden ook door de Slack-bot gebruikt).
  - `LOOP_SLUG_TOM` en `LOOP_SLUG_DENISE` — de geheime slugs. Zet deze in Vercel zodat ze niet in de (evt. publieke) repo staan; de code-defaults zijn puur voor lokaal.
- **Niet-indexeren**: `noindex`-meta + `X-Robots-Tag`-header op de pagina, `Disallow: /l/` in `robots.ts`, en `/l/` staat niet in de sitemap.

## Eenmalige setup van de database

Draai dit in de **Supabase SQL-editor** (staat ook in `supabase/schema.sql`):

```sql
create table if not exists training_state (
  id         text primary key,
  data       jsonb not null,
  updated_at timestamptz not null default now()
);
alter table training_state enable row level security;
```

RLS staat aan zonder publieke policies: alleen de service-role (de proxy) mag erbij. De rijen worden vanzelf aangemaakt zodra iemand z'n eerste run logt.

## Data & backup

- Tom's al-gelogde runs zitten ingebakken (`SEED_TOM`) en verschijnen automatisch op zijn pagina.
- Onderin elke pagina zit **Data exporteren / importeren** (JSON) als handmatige backup.
- Nieuwe velden (bijv. `hr`, `splits`) kunnen later vrij toegevoegd worden — de `data`-kolom is vrije JSON.
