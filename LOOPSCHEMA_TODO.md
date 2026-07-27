# Loopschema — voortgang & openstaande to-do's

Laatste update: 27 juli 2026. De app staat live op twee niet-geïndexeerde URL's; alle code is af. Tom's schema is bijgewerkt naar de FINAL-spec (zie §0). Enig openstaand punt: de update testen/deployen en het interactieve racetempo-veld (nog niet gebouwd).

---

## 0. Tom's schema bijgewerkt naar TOM_TRAININGSPLAN_FINAL.md ✅ KLAAR (27 juli 2026, nog niet gedeployed)

`PLAN_TOM` en `ZONES_TOM` in `src/app/l/[slug]/loopschema-html.ts` volledig herschreven volgens de FINAL-spec:
- Elke week nu 3 sessies (rustig/kwaliteit/long) i.p.v. de oude 2×rustig+long-opzet.
- Dubbele 18km-piek: week 9 (vóór vakantie) én week 14 (na vakantie, herhaling).
- Q-sessies met concrete opbouw (inlopen/hoofddeel/uitlopen, exacte tempo's en tijden) i.p.v. losse teksten.
- Zones herzien: rustig 7:15/km (startpunt, geen ondergrens), racetempo 6:24/km (voorlopig), tempo 5:55–6:10, interval 5:30–5:45.
- Streeftijd-tekst bijgewerkt naar 2:10–2:20, definitief na de 5k-test in week 7.
- `SEED_TOM` aangevuld met de 26 juli-long run (10,42 km/66:04, HR 167, hamstring goed) — het nieuwe long-run-ijkpunt.

**Nog open:**
- [ ] Niet meegenomen: het interactieve racetempo-veld dat na de 5k-test (week 7) automatisch 6:24/km moet vervangen door het berekende tempo (FINAL §7 punt 4). Nu nog statische "voorlopig"-tekst.
- [ ] Testen op telefoon + deployen naar main.

---

## 1. Supabase koppelen → data slaat écht op ✅ KLAAR (22 juli 2026)

Gedaan: nieuw Supabase-project `loopschema` + tabel `training_state`, env-vars in Vercel (`SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `LOOP_SLUG_TOM`, `LOOP_SLUG_DENISE`), redeploy. Live geverifieerd: `/api/loopschema` geeft 200, Denise' rij bevat haar logs + tennis-weken. Data is nu persistent en cross-device.

<details><summary>Oorspronkelijke stappen (ter referentie)</summary>


**Waarom:** nu bewaart de app alles nog lokaal per toestel. Pas na dit stukje blijft data bewaard tussen sessies én tussen apparaten. Lokaal gelogde runs syncen automatisch omhoog bij de eerste verbinding, er gaat niks verloren.

**Doel dat hiermee bereikt wordt (afgestemd):**
- Aanpassing op laptop → later op mobiel openen = dezelfde, laatste stand.
- Alleen wat je aanpast verandert; de rest blijft staan.
- Geen wijzigingsgeschiedenis nodig — "laatste stand betrouwbaar bewaard" is genoeg. (Kanttekeningen: niet live-realtime, dus even verversen om de laatste stand te zien; en last-write-wins bij gelijktijdig bewerken op 2 schermen — bij normaal gebruik geen issue.)

**Te doen:**
- [ ] In Vercel → site-project → **Settings → Environment Variables**, bijwerken naar het nieuwe `loopschema`-Supabase-project:
  - [ ] `SUPABASE_URL` = `https://evkktimtdvjrzpgihafo.supabase.co`
  - [ ] `SUPABASE_SERVICE_ROLE_KEY` = de **service_role** key (Supabase → Project Settings → API Keys → "Reveal")
  - [ ] (optioneel) `LOOP_SLUG_TOM` = `9fqz3k7mx2rp8wtn`, `LOOP_SLUG_DENISE` = `4vhn8key2md6rqxs`
- [ ] Eén keer **Redeploy** op de laatste deployment (env-wijzigingen worden pas dan actief).
- [ ] Testen: run loggen → verversen → data komt terug. Daarna op een tweede toestel → zelfde data.

> Aantal env-vars blijft klein en vast (2 verplicht, 2 optioneel), groeit NIET mee met de data. Alle runs/edits/tennis-toggles gaan in de database-tabel `training_state` (één jsonb-rij per persoon), niet in env-vars.
> De tabel `training_state` bestaat al in het nieuwe project (SQL is gedraaid). RLS staat aan, geen publieke policies.
</details>

---

## 2. Schema's & app-features ✅ KLAAR

**Denise — schema op maat (coach-gereviewd):**
- [x] Eigen 16-weeks schema (`PLAN_DENISE`), coach-versie **v2**: 3-op-1 periodisering, eerste 3 weken vlak/laag (knie laten settelen), doordeweekse runs groeien mee, long run oplopend naar **16 km piek** (geleidelijke aanloop 12→13→14→14→16), alles rustig (geen harde tempoblokken).
- [x] Long-run-lijn: 5·6·6·8·9·7·10·11·12·10·13·14·14·16·10·21,1.
- [x] Eigen tempo-zones (`ZONES_DENISE`), streeftijd ±2:20–2:30.
- [x] Knie-waarschuwing + cadans-advies (165–170) prominent bovenaan (`renderAlert`).
- [x] Knie-check per run mét trend-dots en waarschuwing bij "pijn" (`CHECK`/`CHECK_META`).
- [x] 1 krachtsessie per week (compacte, gecentreerde knop). Tom houdt er 2.
- [x] Twee recente runs (18 + 20 juli) ingebakken onder de long-run-slot, beide knie = pijn.

**Beide atleten:**
- [x] "Getennist deze week"-toggle per week: schrapt de kortste easy run, beschermt long run + kwaliteit, persistent per atleet, telt niet mee als gemist.

**Nog open (klein / optioneel):**
- [ ] Schema samen met Denise doornemen, tweaken waar nodig.
- [ ] Fysio-afspraak voor de knie voordat het volume omhoog gaat (staat in het schema vermeld).

_Bestanden: `src/app/l/[slug]/loopschema-html.ts` (o.a. `PLAN_DENISE`, `ZONES_DENISE`, `KRACHT_*`, `KRACHT_COUNT`, `SEED_DENISE`, `renderAlert`, `CHECK`, tennis-toggle) en `src/lib/loopschema.ts` (profielen)._

---

## 3. Klein na te kijken / op te ruimen (niet urgent)

- [ ] **Productie-URL check:** `tomschoorstra.com/l/…` gaf een 307-redirect bij een test. Waarschijnlijk onschuldig (www/https), maar even op de telefoon verifiëren dat de pagina echt opent.
- [ ] **Oude Slack-bot uitfaseren:** de wekelijkse Vercel-cron (`vercel.json` → `/api/cron/send-tips`) verwijderen zodat die geen foutjes logt (het oude Supabase-project is vervangen). Evt. ook de Slack-routes/lib weghalen.

---

## Referentie
- Deel-links: Tom `…/l/9fqz3k7mx2rp8wtn`, Denise `…/l/4vhn8key2md6rqxs`
- Definitief schema Denise: `DENISE_LOOPSCHEMA.md`
- Uitleg & achtergrond: `LOOPSCHEMA_README.md`

---

## Logboek — wat is er tot nu toe gedaan (21 juli 2026)

Alles hieronder staat op `main` en is gedeployd via Vercel (behalve de Supabase-koppeling, zie stap 1).

**Fundament & opzet**
- Bestaande single-file HTML-app geïntegreerd in de Next.js-site als niet-geïndexeerde route `/l/<slug>` (noindex-meta + `X-Robots-Tag` + `Disallow: /l/` in robots, niet in sitemap).
- Opslaglaag omgebouwd van localStorage naar een serverless proxy (`/api/loopschema`) die server-side met de Supabase service-role key praat → geen sleutel in de browser. Offline-tolerant: lokale cache + auto-sync bij eerste DB-verbinding.
- Twee losse, onafhankelijke URL's (Tom + Denise), ieder eigen data-rij. Athlete-switch verwijderd.
- Nieuw Supabase-project `loopschema` opgezet (oud project stond gepauzeerd); tabel `training_state` + RLS aangemaakt.
- UI-verbeteringen: auto-pace, handmatig HR-veld, sync-indicator, focus-states, menselijke foutmeldingen.

**Denise' schema**
- Eerst een schema op maat gemaakt uit haar Huawei-data; daarna herzien naar de running-coach-feedback (3-op-1 opbouw, knie-voorzichtige aanloop, piek 14 km, alleen rustige runs).
- Knie-waarschuwing + cadans-advies bovenaan, knie-check per run met trend, 1 krachtsessie/week.
- "Aanloop"-kaart met haar 7 runs van vóór de schemastart.

**Beide atleten**
- "Getennist deze week"-toggle per week (schrapt kortste easy run, beschermt long run + kwaliteit).

**Docs**
- `LOOPSCHEMA_README.md` (deel-instructies), `DENISE_LOOPSCHEMA.md` (definitief schema), dit TODO-bestand.

**Commits (main):**
- `c7dbb1c` private app op 2 URL's + Supabase-persistentie
- `940d02d` schema + zones op maat voor Denise
- `bea10aa` knie-voorzichtige aanloop
- `fd95610` "Aanloop"-kaart met eerdere runs
- `1a6d639` coach-revisie + knie-check + tennis-toggle
- `b9fd5ba` Denise 1 krachtsessie + compacte knop
