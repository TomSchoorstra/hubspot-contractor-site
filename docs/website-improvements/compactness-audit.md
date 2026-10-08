# Compactness audit — minder herhaling, dezelfde kern

Datum: 8 oktober 2026. Status: auditcheckpoint 1 afgerond; 2–4 volgen.
Scope: audit en voorstel, uitsluitend documentatie. Geen websitewijzigingen, verwijderingen, push of deploy.

## Leeswijzer en voortgang

Dit document houdt vier auditcheckpoints bij. De verkorte teksten en toekomstige implementatielijst zijn voorstellen; zij veranderen de live website niet. Tom heeft zowel inkorten als samenvoegen laten onderzoeken.

| Auditcheckpoint | Status | Lokale documentatiecommit |
|---|---|---|
| 1. Inventaris en beschermde kern | Zelfcontrole afgerond | Checkpoint-1-commit |
| 2. Overlap en sectieadviezen | Gepland | — |
| 3. Varianten, structuur en Engelse copy | Gepland | — |
| 4. Kerncontrole en uitvoeringsplan | Gepland | — |

## Checkpoint 1 — Inventarisatie

### Bronbasis en telmethode

- Lokale bronversie: `f877ff3`; publieke websitecode gelijk aan gepubliceerde bron `13d4e32`. Gegenereerde HTML: `/private/tmp/hs-website-validation/.next/server/app`, uit de geslaagde previewbuild met dezelfde bronbestanden/configuratie/lockfile. Bron/script/migratiebestanden byte-voor-byte vergeleken vóór de audit.
- 27 publieke contentpagina’s: acht vaste pagina’s, zes diensten, vijf cases en acht blogs. API’s, OAuth, cron, privé-loopschema’s, sitemap/robots en foutpagina’s zijn geen auditcontentpagina’s. De presentatie van de Slack-app is wel meegenomen; installeren of backend testen niet.
- **W = woorden in pagina-eigen gegenereerde HTML**, inclusief koppen, kaarttekst, badges, formulierveldlabels, link-/knoplabels en FAQ-vragen; exclusief globale header/footer, scripts/schema, SVG en aria-hidden duplicaten van counters. Getallen tellen als woorden, samenstellingen en contractions als één. Dit is geen gemeten schermhoogte of gebruikersgedrag.
- Verborgen responsive tekst telt eenmaal in de HTML. De client-only beschikbaarheidsbanner en mobiele menulaag ontbreken in deze SSR-snapshot; hun broncode is apart bekeken. `opacity:0` reveal-content blijft in de inhoudstelling. “HTML aanwezig” betekent niet “visueel bevestigd”.
- **+FAQ** = bestaande service-antwoorden die pas na openen verschijnen; apart uit de contentbron geteld. Geen inkorting claimen door tekst achter accordions te verbergen.
- **K** = prominente pagina-eigen acties met de gedeelde Button-stijl, inclusief formulier-submit; gewone navigatie/kaartlinks apart benoemd. **C** = alle pagina-eigen contactlinks, ook gewone tekstlinks. Header en footer voegen elk één contactknop toe en zijn niet in K/C opgenomen. Een contactknop is zowel K als C, geen extra derde actie.

### Alle 27 pagina’s

| Pagina | Eén hoofddoel / bezoekersvraag | Hoofdonderdelen | W | +FAQ | K / C | Unieke informatie die moet blijven |
|---|---|---|---:|---:|---:|---|
| `/` | **Oriëntatie** — Wat doet Tom en welk werk bewijst dat? | Hero → cases → expertise → aanpak/AI → zes diensten → contact | 514 | — | 4 / 2 | Persoonlijke kop, AIHR-context, twee geselecteerde projecten. |
| `/about` | **Persoon en verantwoordelijkheid** — Wie is Tom, wat doet hij zelf en hoe werkt hij? | Hero → AIHR-rolstrook → feiten/foto → profiel → aanpak → doelgroep → expertise → certificeringen → tools → dubbele afsluiters | 573 | — | 6 / 2 | Formele AIHR-rol, eigen projectlead-bijdrage, historisch gelabelde certificeringen. |
| `/services` | **Aanbod selecteren** — Waarvoor kan ik Tom inschakelen? | Hero → zes dienstkaarten → contact | 301 | — | 4 / 2 | Zes bestaande diensten en hun grenzen. |
| `/services/automation` | **Dienst afbakenen** — Welke handovers kan ik automatiseren? | Hero/quickstats → outcomes → deliverables → vier processtappen → FAQ/referenties → casevoorbeeld → contact | 351 | 95 | 4 / 2 | Workflowlogica, triggers, reviewpunten, exceptionchecks en relevante planvoorwaarde. |
| `/services/consultancy` | **Dienst afbakenen** — Welke structurele keuzes of verbeteringen zijn nodig? | Hero/quickstats → outcomes → deliverables → vier processtappen → FAQ/referenties → casevoorbeeld → contact | 320 | 57 | 4 / 2 | Portalreview, prioriteiten, roadmap en afbakening onderzoek versus uitvoering. |
| `/services/integrations` | **Dienst afbakenen** — Hoe verbind ik HubSpot met andere systemen? | Hero/quickstats → outcomes → deliverables → vier processtappen → FAQ/referenties → casevoorbeeld → contact | 342 | 84 | 4 / 2 | Bronverantwoordelijkheid, mappings, syncrichting, connectors en foutafhandeling. |
| `/services/custom-objects` | **Dienst afbakenen** — Wanneer heb ik een ander CRM-model nodig? | Hero/quickstats → outcomes → deliverables → vier processtappen → FAQ/referenties → casevoorbeeld → contact | 373 | 87 | 4 / 2 | Objecten, associaties, migratie, reporting en Enterprise/standard-objectafweging. |
| `/services/pipeline-optimization` | **Dienst afbakenen** — Hoe sluit de pipeline op ons werkelijke proces aan? | Hero/quickstats → outcomes → deliverables → vier processtappen → FAQ/referenties → casevoorbeeld → contact | 306 | 48 | 4 / 2 | Stages, exitcriteria, verplichte velden en monitoring. |
| `/services/custom-app-cards` | **Dienst afbakenen** — Hoe krijg ik de juiste context op een record? | Hero/quickstats → outcomes → deliverables → vier processtappen → FAQ/referenties → casevoorbeeld → contact | 412 | 161 | 4 / 2 | UI extensions, data-access, hosting/onderhoud en onderbouwde renewal-case. |
| `/case-studies` | **Bewijs selecteren** — Welk project lijkt op mijn situatie? | Hero → vijf cases met badges/metrics → contact | 358 | — | 4 / 2 | Vijf verschillende praktijkcases met resultaten en grenzen. |
| `/case-studies/customer-lifecycle` | **CRM-architectuur bewijzen** — Hoe heeft Tom klantrelaties over records verbonden? | Hero/status → resultaatstrook → probleem → aanpak → oplossing → beheer/review → diagram → stack → diensten → case-navigatie → contact | 695 | — | 2 / 1 | Eigen projectlead-rol, Account-model, fictief diagram, handmatig gestarte AI-review en open enrichment. |
| `/case-studies/crm-data-quality` | **Detectieaanpak bewijzen** — Hoe onderzoek je verschillen tussen CRM en leerplatform? | Hero/status → resultaatstrook → probleem → aanpak → oplossing → controles → stack → diensten → case-navigatie → contact | 610 | — | 2 / 1 | Drie directionele datasets, ontwikkel-dashboard, bronfreshness/member-countgrenzen en geen geleverd automatisch herstel. |
| `/case-studies/finance-automation` | **Systeemoverdracht bewijzen** — Hoe houd je finance betrokken terwijl ordergegevens doorstromen? | Hero → resultaatstrook → probleem → aanpak → oplossing → stack → diensten → case-navigatie → contact | 418 | — | 2 / 1 | HubSpot/WooCommerce/Exact-flow, finance-review en kwalitatieve resultaten. |
| `/case-studies/renewal-status-card` | **Recordinterface bewijzen** — Hoe maak je gekoppelde licentiedata zichtbaar op een deal? | Hero → resultaatstrook → probleem → aanpak → oplossing → stack → diensten → case-navigatie → contact | 453 | — | 2 / 1 | Read-only License-lookup, drie renewal-statussen en de live gevalideerde kaartvariant. |
| `/case-studies/pipeline-consolidation` | **Processtructuur bewijzen** — Hoe maak je het salesproces over de hele funnel zichtbaar? | Hero → resultaatstrook → probleem → aanpak → oplossing → stack → diensten → case-navigatie → contact | 405 | — | 2 / 1 | Eén pipeline MQL–Closed Won; eigen procesmapping zonder extra conversieclaim. |
| `/blog` | **Verdieping vinden** — Welk artikel beantwoordt mijn vraag? | Titel → acht artikelkaarten | 332 | — | 0 / 0 | Acht artikelen met titel, datum, leesduur en excerpt. |
| `/blog/hubspot-aeo-smb` | **Vraag verdiepen** — Moet een SMB in AI-search/AEO investeren? | Titel/datum → artikel (7 H2-onderdelen) → gedeelde contact-CTA | 1849 | — | 2 / 2 | AEO-afweging, eerst eigen vindbaarheid/fundament, onderscheid productfeature versus marketingprobleem. |
| `/blog/hubspot-app-cards-guide` | **Vraag verdiepen** — Welke app card past bij mijn behoefte? | Titel/datum → artikel (7 H2-onderdelen) → gedeelde contact-CTA | 1872 | — | 2 / 2 | Default/marketplace/custom-vergelijking, toepassingen en keuzecriteria. |
| `/blog/hubspot-breeze-ai-smb` | **Vraag verdiepen** — Welke Breeze-onderdelen zijn bruikbaar voor een klein team? | Titel/datum → artikel (8 H2-onderdelen) → gedeelde contact-CTA | 2745 | — | 2 / 2 | Afweging per Copilot/agent/Intelligence en benodigde datakwaliteit. |
| `/blog/hubspot-classic-crm-cards-sunset` | **Vraag verdiepen** — Moet ik bestaande kaarten vóór de genoemde sunset migreren? | Titel/datum → artikel (6 H2-onderdelen) → gedeelde contact-CTA | 1643 | — | 2 / 2 | Getroffen kaarttypes, migratiebeslissing en acties rond de gedateerde deadline. |
| `/blog/hubspot-contractor-vs-agency` | **Vraag verdiepen** — Wanneer past een contractor of bureau? | Titel/datum → artikel (8 H2-onderdelen) → gedeelde contact-CTA | 2315 | — | 2 / 2 | Samenwerkingsmodel, kosten/timing, keuzecriteria en vragen vóór inhuur. |
| `/blog/hubspot-lifecycle-stages-setup-guide` | **Vraag verdiepen** — Hoe definieer en automatiseer ik lifecycle stages? | Titel/datum → artikel (8 H2-onderdelen) → gedeelde contact-CTA | 2087 | — | 2 / 2 | Lifecycle/dealstage/leadstatus-onderscheid, MQL/SQL-definities en implementatie. |
| `/blog/hubspot-onboarding-mistakes` | **Vraag verdiepen** — Welke onboardingfouten moet ik voorkomen? | Titel/datum → artikel (11 H2-onderdelen) → gedeelde contact-CTA | 1548 | — | 2 / 1 | Negen concrete fouten en een pre-buildchecklist. |
| `/blog/hubspot-spring-2026-spotlight` | **Vraag verdiepen** — Welke releasewijzigingen verdienen aandacht? | Titel/datum → artikel (9 H2-onderdelen) → gedeelde contact-CTA | 2106 | — | 2 / 2 | Gedateerd releaseoverzicht en prioritering; geen vervanger voor de detailguides. |
| `/contact` | **Contact opnemen** — Hoe neem ik contact op en wat kan ik verwachten? | Intro → verwachtingen → budgetkaarten → LinkedIn → formulier | 113 | — | 1 / 0 | Formulier, directe LinkedIn-route, bestaande budgetbanden en responsverwachting. |
| `/app-catalog` | **Een gratis tool vinden** — Welke tool kan ik gebruiken? | Intro → één appkaart | 47 | — | 0 / 0 | Verwijzing naar de enige vermelde app: HubSpot Tips for Slack. |
| `/hubspot-enablement` | **Slack-app begrijpen en installeren** — Wat doet de app en hoe installeer ik die? | Hero/installatie → status → uitleg → drie stappen | 146 | — | 1 / 0 | Installatie-CTA, kanaalkeuze, wekelijkse tips en statusfeedback. |

### Gedeelde inhoud, apart geteld

| Onderdeel | Woorden | Acties / unieke functie | Auditobservatie |
|---|---:|---|---|
| Desktopheader | 13 | Brandlink, vier navigatiebestemmingen, één contactknop | Nodige oriëntatie; telt niet als te schrappen uitleg. |
| Footer | 59 | Brand, LinkedIn, zes navigatiebestemmingen incl. App Catalog, Contact-link plus contactknop | Herhaalt profielbelofte en contactuitnodiging; navigatiefunctie behouden. |
| Beschikbaarheidsbanner | 14 bronwoorden | Dismiss; “Not taking on clients just yet…” | Client-only, niet in bovenstaande HTML-woorden. Dit is betekenisvolle status, geen commerciële belofte toevoegen/veranderen. |
| Mobiel menu | Niet uit SSR gemeten | Dezelfde hoofdnavigatie/contact | Geen interactie- of schermhoogtemeting uitgevoerd. |

Iedere pagina bevat 72 globale header/footerwoorden naast de tabel. 27 × 72 = 1.944 herhaalde HTML-woorden over de routes; dat is geen extra unieke redactionele inhoud. Ook de twee globale contactknoppen zijn niet 54 verschillende conversiedoelen.

### Beschermde kern

| Kern | Primaire bewijsplek | Wat niet weg mag |
|---|---|---|
| CRM-architectuur | Account-case | Eigen projectlead-bijdrage, Account versus Company, associaties en fictief diagram. |
| Automatisering/integraties | Finance-case; automation/integrations | Systeemoverdracht, finance-review, bron-/mappingkeuzes; geen oude besparingspercentages terugbrengen. |
| Datakwaliteit/monitoring | Data-quality-case | Richting van checks, ontwikkelstatus, freshness/member-countgrenzen en herstel nog niet geleverd. |
| Custom interfaces | Renewal-case; custom-app-cards | Read-only License-lookup op deal, drie statusuitkomsten, rechten/hosting/onderhoud. |
| Tom als uitvoerder | About + concrete cases | Exacte AIHR-rol, eigen bijdrage, ontwerp/bouw/controle, historische certificeringen geen actuele credentials. |
| AI als werkwijze | Account-case; korte verwijzing op About | Review handmatig gestart, AI adviseert, Tom beslist, deze review schrijft zelf niet naar HubSpot. |
| Goedgekeurde toon/stijl | Homepage | “I work on the complicated bits of HubSpot.”, Engels, Geist met serifaccent; geen nieuwe marketingbelofte. |
| Verdieping en vervolgstap | Cases, blogs, diensten, contact | Unieke vragen blijven bereikbaar; contact/LinkedIn/formulier niet verstoppen. |

### Controle checkpoint 1

27/27 routes geïnventariseerd en gekoppeld aan broncontent. Zes ingeklapte FAQ-blokken uit de servicebron meegerekend als apart volume. Header/footer en client-only componenten onderscheiden. 81 hashes vastgelegd voor beschermde bron/configuratie en vijf niet-gerelateerde documenten; alleen dit auditdocument wordt gewijzigd. Geen browser of externe systeemwrites. Volgende stap: overlap beoordelen.
