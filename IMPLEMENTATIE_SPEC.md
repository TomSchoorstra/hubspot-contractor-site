# Implementatie-spec: Loopschema-app → live op tomschoorstra.com (Vercel + Supabase)

> **Voor de agent die deze prompt inleest:** je zit al in de repo van `tomschoorstra.com` (Vercel-gehost). Deze spec vertelt je *wat* te bouwen en *welke keuzes al vastliggen* — niet hoe de site in elkaar zit; dat weet je zelf. Lees eerst de hele spec, stel daarna verhelderende vragen als iets botst met de bestaande projectstructuur, en bouw pas daarna. Er is een begeleidend bestand `loopschema_current.html` — dat is de **volledige werkende frontend** en de bron van waarheid voor alle UI/logica. Je taak is die frontend integreren in de site en de opslag omzetten van browser-localStorage naar Supabase.

---

## 1. Context & doel in één alinea

Tom (de eigenaar van deze site) en zijn vriendin trainen voor een halve marathon op **1 november 2026**. Er is een single-file HTML-app (`loopschema_current.html`) die een 16-weeks trainingsschema toont, runs laat loggen (afstand, tijd, gevoel, hamstring-check, notitie), krachtsessies afvinkt, en voortgang visualiseert. De app werkt nu al volledig, maar slaat data op in `localStorage` (per apparaat, gaat verloren bij device-wissel/cache-clear). **De opdracht: die opslag vervangen door Supabase, zodat data device-onafhankelijk bewaard blijft, en het geheel als een niet-geïndexeerde, deelbare pagina live zetten op de site.** Primaire gebruiker is de vriendin; zij heeft géén Claude-abonnement en géén technische kennis — ze krijgt één link, opent die op haar telefoon, zet 'm op het beginscherm, en loggt haar runs. Het moet voor haar aanvoelen als een app.

## 2. Harde eisen (deze zijn met Tom afgestemd — niet heronderhandelen zonder overleg)

1. **Persistentie is niet-onderhandelbaar.** Data moet bewaard blijven over sessies én over apparaten. Dit is de hele reden dat we van localStorage af gaan. localStorage mag hooguit als offline-cache/fallback blijven, nooit als enige bron.
2. **Gratis.** Alles binnen de free tiers van Vercel Hobby + Supabase. Geen betaalde add-ons introduceren.
3. **Niet-commercieel / persoonlijk gebruik.** Bewust: Vercel Hobby mag alleen niet-commercieel. Dit is een privé-loopschema → prima. Als dit later commercieel wordt, moet de hosting heroverwogen worden (buiten scope nu).
4. **Deelbaar zonder account.** De vriendin opent een URL, meer niet. Geen login, geen signup, geen Claude/Vercel/Supabase-account aan haar kant.
5. **Niet geïndexeerd & losstaand van de hoofdsite.** De pagina mag niet vindbaar zijn via Google en niet gelinkt worden vanaf de reguliere site-navigatie. Obscure URL + `noindex` + robots-regel. Zie §6.
6. **Alle bestaande functionaliteit blijft behouden.** De frontend in `loopschema_current.html` is af en getest — niets weghalen. Zie §4 voor de volledige feature-inventaris zodat je kunt verifiëren dat er niks sneuvelt bij de integratie.
7. **De sleutel/secret mag niet misbruikbaar zijn.** Supabase anon-key in publieke frontend is acceptabel MITS Row Level Security (RLS) correct staat. Zie §5.3 voor de security-aanpak. Overweeg een serverless proxy-functie als dat schoner past in de bestaande architectuur.

## 3. Beslissingen die al genomen zijn (met rationale, zodat je ze niet opnieuw hoeft af te wegen)

| Beslissing | Keuze | Waarom |
|---|---|---|
| Hosting | Bestaande Vercel-setup van tomschoorstra.com | Al aanwezig, gratis Hobby, Tom kent het |
| Database | **Supabase** | Tom heeft al een account; gratis tier ruim; ingebouwde RLS lost het publieke-key-probleem op |
| Datamodel | Eén JSON-document (key-value), niet relationeel | De hele app-state is één klein JSON-object (`{athletes:{a,b}}`). Geen joins/queries nodig. Simpelste dat werkt. Zie §5.2 |
| Frontend | Hergebruik `loopschema_current.html` 1:1, alleen opslaglaag omwisselen | Frontend is af en getest; alleen `loadState()`/`saveState()` moeten naar Supabase |
| Multi-user? | **Nee, nu niet.** Twee "atleten" (a/b) leven in één gedeeld document | Het is voor Tom + vriendin samen. Geen auth-systeem nodig. Later uitbreidbaar — zie §8 |
| Deel-mechanisme | Obscure niet-geïndexeerde URL | Geen account-eis; voldoet aan "deelbaar zonder Claude" |

## 4. Volledige feature-inventaris van de bestaande frontend (verificatie-checklist)

De app in `loopschema_current.html` bevat de volgende werkende features. **Na integratie moet elk van deze nog werken.** Loop dit na als acceptatietest:

- **16-weeks schema** in fases (Basis / Opbouw / Vakantie / Herstart / Piek / Taper / Race), start **ma 13 juli 2026**, race **zo 1 november 2026**. Elke week is een uitklapbare `<details>` met focus-tekst, 3 runs (Dag 1/2/3) en 2 krachtsessies.
- **Run-typen** met kleurcodering/tags: `e` rustig, `q` kwaliteit, `l` long run, `t` test (5k-test in week 8), `r` race, `h` vakantie/hike (week 10-11, Kirgizië 14-30 sep — geen km-eis, alleen afvinken).
- **Logging per run** via bottom-sheet: afstand (km), tijd (mm:ss of u:mm:ss), gevoel (1-5 emoji), hamstring-check (goed/licht/verergerd — alleen voor atleet a/Tom), notitie. Bij hamstring "verergerd" verschijnt een waarschuwingsbox.
- **Krachtsessies**: simpele toggle (afgevinkt/niet).
- **Atleet-switch** bovenin (Tom / Partner, naam van partner aanpasbaar via prompt). Elke atleet heeft eigen logs en eigen tempo-zones.
- **Tempo-zones** per atleet (Tom heeft ingevulde zones; partner "nog te kalibreren").
- **Statistieken**: weken te gaan (live berekend t.o.v. racedatum), km gelopen, % sessies klaar, hamstring-trend (laatste 3 checks als stoplicht-dots, alleen Tom).
- **Route-visualisatie**: een SVG-pad dat oranje inkleurt naar rato van voltooide km richting finishvlag. Gebruikt `getTotalLength()`/`getPointAtLength()` — let op: sommige webviews hebben hier issues; de huidige code heeft daarom een resilient render (elk onderdeel in eigen try/catch) en een init-timeout. **Behoud die resilience.**
- **Weekvolume-grafiek**: staafdiagram gepland vs. gelopen per week.
- **Export/import**: JSON-data als tekst kopiëren/plakken (was de handmatige sync-fallback; blijft nuttig als backup-knop, ook na Supabase-integratie — niet weghalen).
- **Countdown** en "huidige week" highlight (week met oranje rand, automatisch open).
- **Volledig Nederlandstalig**, mobiel-first, donker thema, custom fonts (Barlow Condensed + Inter via Google Fonts).

## 5. De kern van de opdracht: opslag naar Supabase

### 5.1 Wat er nu gebeurt (de code die je vervangt)
In `loopschema_current.html` zit een opslaglaag rond deze twee functies en een storage-detectie:
- `hasClaude` — detecteert of de Claude-artifact-storage-API bestaat.
- `async function loadState()` — leest state uit `window.storage` (Claude) of `localStorage`, en draait die door `mergeSeed()`.
- `function saveState()` — debounced schrijven (250ms) naar `window.storage` of `localStorage`.
- `const SEED = {...}` + `function mergeSeed(stored)` — ingebakken startdata die altijd aanwezig is; stored data wordt eroverheen gemerged.

**De `window.storage`/Claude-tak is buiten claude.ai irrelevant en mag eruit.** Vervang de opslaglaag door Supabase-calls. **Behoud `SEED` en `mergeSeed()` exact** — dat is de correcte startstate (zie §5.4) en zorgt dat de app ook werkt vóór de eerste succesvolle DB-load.

### 5.2 Datamodel in Supabase
Kies de simpelste vorm die werkt. De hele app-state is één JSON-object. Voorstel:

```
tabel: training_state
kolommen:
  id           text primary key      -- vaste waarde, bijv. 'shared' (één gedeeld document)
  data         jsonb                  -- de volledige state: {athletes:{a:{name,logs},b:{name,logs}}}
  updated_at   timestamptz default now()
```

Eén rij, id = `'shared'`. De app leest die rij bij opstarten, en schrijft de hele `data` terug bij elke wijziging (upsert). Geen relationeel model nodig — de dataset is klein (twee atleten × ~48 sessies) en wordt altijd in z'n geheel gelezen/geschreven. Last-write-wins is acceptabel (twee gebruikers, lage schrijf-frequentie, race-conditions vrijwel uitgesloten). Als je toch fijnmaziger wil: een rij per atleet (`id='a'`, `id='b'`) beperkt de kans dat ze elkaars schrijf overschrijven — jouw keuze, maar overkill is ook prima te vermijden.

### 5.3 Security (belangrijk — dit is de reden dat Supabase de goede keuze is)
De Supabase **anon key** mag in de publieke frontend staan, MAAR alleen veilig als **Row Level Security (RLS)** correct is:
- Zet RLS **aan** op `training_state`.
- Maak policies die **alleen `select` en `update`/`insert` op de rij(en) van deze app** toestaan, en verder niets. Geen `delete`. Geen toegang tot andere tabellen.
- Overweeg de rij te beveiligen met een niet-raadbare id (bijv. een lange random string i.p.v. `'shared'`) zodat zelfs mét de anon-key niemand zonder de exacte id/URL bij de data komt.
- **Alternatief dat schoner kan zijn binnen Tom's bestaande architectuur:** een Vercel serverless function (`/api/training-state`) die de Supabase **service-role key** server-side gebruikt (nooit naar de client), en waar de frontend simpele GET/POST naartoe doet. Dan staat er helemaal geen Supabase-key in de client. **Kies deze route als de repo al een `/api`-conventie of server-side env-vars heeft** — dat is netter en past waarschijnlijk beter bij een bestaande Next.js/Vercel-site. Gebruik Vercel env-vars voor de keys. Beslis op basis van wat je in de repo aantreft en leg je keuze aan Tom voor.

### 5.4 Startdata die in de DB moet (of via SEED behouden blijft)
De huidige `SEED` bevat Tom's al-gelogde runs. Zorg dat deze data de bron-van-waarheid-start is. Ofwel je seed de DB-rij hiermee bij eerste deploy, ofwel je laat `mergeSeed()` z'n werk doen (DB-data over SEED heen). **Verlies deze logs niet.** Ze staan volledig in `loopschema_current.html`; de kern:
- Atleet **a = "Tom"**: `w1r1` (13 juli, gelopen, geen data), `w1r3` (long run 6,26 km / 41:25, hamstring "licht", coach-notitie over te hoog tempo), `w2r1` (loopband 4,27 km / 31:01, HR-kalibratie, hamstring "goed").
- Atleet **b = "Partner"**: nog lege logs, zones "nog te kalibreren".

### 5.5 Gedrag dat behouden moet blijven bij de opslag-omzetting
- **Optimistic UI + debounced write:** de UI moet direct reageren (zoals nu), schrijven mag async/debounced op de achtergrond.
- **Offline-tolerantie:** als de DB-call faalt (geen netwerk), niet crashen. Toon eventueel een subtiele "niet opgeslagen"-indicatie en/of val terug op localStorage-cache die later synct. Minimaal: de app blijft bruikbaar en de eerder geladen state blijft zichtbaar.
- **Init-resilience:** behoud de bestaande `Promise.race`-timeout in de init zodat de app óók rendert (met SEED/cache) als de DB traag/onbereikbaar is.
- **Geen flicker:** laad state vóór of tijdens de eerste render zonder dat de gebruiker eerst lege data ziet en dan een sprong.

## 6. Niet-indexeren & deelbaarheid (concreet)

- **URL:** plaats de app op een obscure, niet-gelinkte route. Voorstel: een subpad met een onraadbaar segment (bijv. `/l/<random-slug>` of een apart subdomein). **Link er nergens vanaf de hoofdsite naartoe** (geen nav, geen sitemap-entry).
- **`noindex`:** voeg `<meta name="robots" content="noindex, nofollow">` toe aan de pagina.
- **robots.txt:** disallow de route (in lijn met hoe de bestaande site robots beheert — Next.js `app/robots.ts` of static `public/robots.txt`, kies wat er al is).
- **Sitemap:** zorg dat de route niet in een gegenereerde sitemap belandt.
- **Deel-instructie voor Tom's vriendin (voeg toe aan de deliverable-README):** open de link in Safari/Chrome op de telefoon → deel-menu → "Zet op beginscherm". Dan staat het als app-icoon op haar telefoon. (Optioneel PWA-manifest, zie §7.)

## 7. Optioneel maar aanbevolen (alleen als het snel meekan — anders overslaan/noteren voor later)

- **PWA-manifest + service worker:** eigen icoon, fullscreen, offline. LET OP iOS-eigenaardigheid: iOS kan opgeslagen web-app-data wissen na ~7 dagen inactiviteit — juist daarom is de Supabase-persistentie (server-side) essentieel; de PWA is puur cosmetisch/gemak, niet de opslag. Bouw de PWA-laag alleen als het weinig extra werk is binnen de bestaande build.
- **Kleine "laatst gesynct"-indicatie** in de footer i.p.v. de huidige "storage mode"-tekst.

## 8. Expliciet buiten scope (voor later — niet nu bouwen)

- Echte multi-user/auth (meerdere losse gebruikers met eigen accounts).
- Commerciële uitrol naar andere mensen (vergt herziening hosting-tier én security-model).
- Automatische import van Strava/Garmin/TCX. **Belangrijke context:** Tom stuurt zijn TCX-bestanden nu naar een aparte Claude-chat waar de "coach" ze analyseert en handmatig in de `SEED` bijwerkt. Die workflow blijft voorlopig extern. Bouw hier nu geen upload/parser voor, maar houd het datamodel zo dat een `hr`/`splits`-veld later toegevoegd kan worden per log-entry.

## 9. Concrete stappen die je (agent) waarschijnlijk gaat zetten — pas aan op de echte repo

1. Inspecteer de repo: framework (vermoedelijk Next.js), bestaande `/api`-conventie, env-var-setup, robots/sitemap-aanpak. **Rapporteer wat je vindt aan Tom vóór je bouwt.**
2. Kies op basis daarvan: anon-key-in-client-met-RLS **of** serverless-proxy-met-service-role-key (§5.3). Leg de keuze + rationale voor.
3. Zet de Supabase-tabel + RLS-policies op (lever de SQL, laat Tom 'm draaien in de Supabase SQL-editor — of doe het via Supabase CLI als die in de repo zit).
4. Integreer `loopschema_current.html` als een route/pagina in de site (behoud alle inline CSS/JS, of splits netjes conform de repo-conventie — zolang gedrag identiek blijft).
5. Vervang de opslaglaag (`loadState`/`saveState`/`hasClaude`) door Supabase-calls; behoud `SEED`/`mergeSeed`, debounce, optimistic UI, init-resilience.
6. Voeg noindex + robots-disallow + geen-sitemap toe (§6).
7. (Optioneel) PWA-manifest.
8. Test tegen de checklist in §4 op een echte telefoon. Specifiek: log een run → herlaad → verifieer dat data uit de DB komt; open op een tweede device → verifieer dezelfde data.
9. Lever Tom een korte README met: de deel-link, de "zet op beginscherm"-instructie voor zijn vriendin, en waar de env-vars/keys staan.

## 10. Env-vars die je nodig hebt (namen indicatief — volg repo-conventie)
- `SUPABASE_URL` — projecturl uit Tom's Supabase-dashboard.
- `SUPABASE_ANON_KEY` — publieke anon-key (client-side, alleen met RLS) **of**
- `SUPABASE_SERVICE_ROLE_KEY` — service-role (server-side only, in Vercel env-vars, nóóit naar client) als je de proxy-route kiest.

## 11. Toon & taal
De hele UI is Nederlands, informeel, mobiel-first, donker thema met oranje accent. Houd dat aan in eventuele nieuwe UI-elementen (bijv. sync-indicatie, foutmeldingen). Foutmeldingen richting de vriendin moeten menselijk en niet-technisch zijn ("Even geen verbinding — je run is bewaard en wordt zo gesynct").

---

### Samenvatting voor de agent in 3 zinnen
Neem de complete, werkende frontend uit `loopschema_current.html`, integreer 'm als niet-geïndexeerde route op tomschoorstra.com, en vervang uitsluitend de opslaglaag door Supabase (één jsonb-document, RLS aan, of via een serverless proxy met service-role key — kies wat past bij de repo). Behoud alle bestaande functionaliteit, de SEED-startdata en de render-resilience. Eindresultaat: één deelbare link die Tom's vriendin op haar telefoon zet, waar haar runs device-onafhankelijk en permanent bewaard blijven.
