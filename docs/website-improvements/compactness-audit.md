# Compactness audit — minder herhaling, dezelfde kern

Datum: 8 oktober 2026. Status: alle vier auditcheckpoints afgerond; voorstel gereed voor inhoudelijke beoordeling.
Scope: audit en voorstel, uitsluitend documentatie. Geen websitewijzigingen, verwijderingen, push of deploy.

## Leeswijzer en voortgang

Dit document houdt vier auditcheckpoints bij. De verkorte teksten en toekomstige implementatielijst zijn voorstellen; zij veranderen de live website niet. Tom heeft zowel inkorten als samenvoegen laten onderzoeken.

| Auditcheckpoint | Status | Lokale documentatiecommit |
|---|---|---|
| 1. Inventaris en beschermde kern | Zelfcontrole afgerond | `75cb8b4` |
| 2. Overlap en sectieadviezen | Zelfcontrole afgerond | `33f8b07` |
| 3. Varianten, structuur en Engelse copy | Zelfcontrole afgerond | `c8d1de8` |
| 4. Kerncontrole en uitvoeringsplan | Zelfcontrole afgerond | Commit die deze sectie toevoegt; zie git-log |

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

## Checkpoint 2 — Herhaling en eigenaarschap

### Waar de volledige uitleg hoort

| Vraag | Hoofdplek | Elders alleen |
|---|---|---|
| Wat doet Tom? | Homepage: vier expertisegebieden met bewijslinks | Korte herkenning in titel/intro, geen tweede expertisegrid op About. |
| Wie is Tom en hoe werkt hij? | About: rol, eigen bijdrage, werkwijze, achtergrond | Homepage één korte werkwijzeparagraaf; dienstpagina alleen specifieke uitvoeringsvoorwaarden. |
| Wat omvat een opdracht? | Betreffende dienstpagina | `/services` één compacte keuzebeschrijving per dienst; cases alleen dienstlinks. |
| Wat is werkelijk gebouwd? | Betreffende case | Korte teaser met statuscue; details en beperkingen in case, nooit generieke resultaatbelofte. |
| Hoe werkt een HubSpot-onderwerp? | Betreffend blogartikel | Andere artikelen verwijzen bij verdieping; dienstscope blijft op de dienstpagina. |
| Hoe bereik ik Tom? | Contact: formulier en verwachtingen | Eén contextuele contactactie per pagina; headercontact en eenvoudige footerlink. |
| Wat doet de Slack-app? | `/hubspot-enablement` | Rechtstreekse navigatielink; catalogus heeft nu geen eigen keuze-informatie. |

### Overlap: concrete signalen en verwachte winst

| Signaal uit bron/HTML | Beoordeling | Voorstel en winst |
|---|---|---|
| Vier expertisebeschrijvingen letterlijk op homepage én About | Overbodige tweede volledige uitleg | About verwijst naar werk/diensten; homepage houdt het overzicht. Vier About-kaarten vervallen. |
| Homepage drie aanpakkaarten + AI-paragraaf; About beschrijft dezelfde volgorde en review | Werkwijze dubbel, AI-detail hoort bij praktijkbewijs | Homepage korte alinea; About volledige persoonlijke aanpak; precieze review in Account-case. Drie kaarten minder op homepage. |
| Home zes diensten, dienstenindex zes, gerelateerde diensten op cases met volledige beschrijvingen | Herkenning nuttig, opnieuw zes opties uitleggen niet | Home één dienstenlink; index houdt keuzefunctie; cases gebruiken tekstlinks. Zes homepagekaarten minder. |
| Home en case-index herhalen casesummaries/status; diensten tonen case plus metrics | Teaser is nuttig; hetzelfde volledige resultaatverhaal niet | Korter projectteaser met relevante statuscue; volledige bewijsvoering uitsluitend in case. Geen verwijderen van een projectgrens uit een claim. |
| About AIHR-rol in heroomgeving én profiel; dubbele portretpresentatie | Herkenning eenmaal genoeg | Eén rolintro en één foto. Feiten over locatie/engagement opnemen in lopende tekst. |
| About twee afsluitende knopparen; zes prominente acties totaal | Twee opeenvolgende vervolgstappen beantwoorden dezelfde vraag | Eén gewone contactlink aan eind; werk/diensten via relevante tekstlinks. Geen groot eindpaneel. |
| Elke dienst dezelfde vier processtappen + uitkomstlijst + deliverablelijst + drie tel-statistieken | Scope overlapt; vier stappen zeggen weinig over deze dienst | Outcomes/deliverables één concreet scopeblok; algemene aanpak naar About; tel-statistieken weg. Specifieke voorwaarden blijven. |
| Zes diensten dezelfde contactuitleg; acht blogs dezelfde contactuitleg van 24 woorden | Templateherhaling naast globale footer | Grote eind-CTA verwijderen; zeven blogs hebben al een contextuele contactlink. Alleen blogwrapper: 8 × 24 = 192 HTML-woorden minder. |
| Footer 59 woorden, twee contactroutes, bovenliggende eind-CTA op veel pagina’s | Gedeelde navigatie nuttig; derde uitnodiging niet | Compacte footer van circa 28 woorden, gewone Contact-link; geen apart contactpaneel of footerknop. Verwachte 31 woorden per route minder, apart van hoofdtekst. |
| App Catalog: één kaart/47 woorden naast volledige apppagina/146 woorden | Extra bestemming zonder extra keuze | Voorstel index samenvoegen met apppagina en oude URL redirecten. Eén bestemming minder; appinformatie en installatie blijven. |

“Verwachte winst” is een redactionele inschatting of een brongetelde verwijdering, geen gemeten conversiewinst. Indexteasers, projectstatus en korte expertiseherkenning zijn doelmatige herhaling. Niet alle identieke tekst moet verdwijnen.

### Sectieregister — homepage, About en gedeelde onderdelen

Iedere rij heeft één primaire actie. Bij samenvoegen noemt de bestemming de ontvangende sectie; bij schrappen/verplaatsen staat waar noodzakelijke informatie blijft.

| Pagina / huidig onderdeel | Actie | Reden en bestemming |
|---|---|---|
| Home: hero + contextregel | Inkorten | Goedgekeurde kop exact behouden; AIHR en Nederland één keer. |
| Home: Selected work | Inkorten | Twee duidelijke teasers, statuscue en case-link; technische uitwerking en gedateerde grenzen in de case. |
| Home: vier expertisegebieden | Inkorten | Vier scanbare regels met bewijslink; geen vier extra kaartvlakken. |
| Home: How I work / drie kaarten | Samenvoegen | Eén korte persoonlijke alinea in slotblok, volledige werkwijze op About. |
| Home: gedetailleerde AI-reviewalinea | Verplaatsen | Details op Account-case; korte AI-vermelding op About. Menselijke beslisser en read-only review blijven daar expliciet. |
| Home: zes dienstkaarten | Verplaatsen | Keuzeoverzicht op `/services`; homepage-slot bevat één dienstenlink. |
| Home: groot contactblok | Samenvoegen | Eén slotblok met werkwijze, About/dienstenlinks en gewone contactlink. |
| About: hero / rolstrook / Who I am | Samenvoegen | Eén introductie met exacte functie en eigen verantwoordelijkheid; geen losse tweede rolstrook. |
| About: facts-sidebar / twee portretten | Samenvoegen | Locatie/engagement in intro; één portret bij profiel. Geen unieke achtergrond verloren. |
| About: How I work | Inkorten | Proces, tests, uitzonderingen en menselijke AI-controle blijven; detailreview linkt naar Account-case. |
| About: When your CRM needs a clearer structure | Verplaatsen | Doelgroep en opdrachtscope horen op dienstenindex/-details; About één relevante dienstenlink. |
| About: Areas of expertise / vier bewijskaarten | Verplaatsen | Overzicht op homepage; inhoudelijke bewijsvoering in vier cases. About noemt werk concreet zonder tweede grid. |
| About: Learning & past certifications | Inkorten | Alle zeven historische entries + jaren + uitgevers blijven in één lijst, expliciet geen actuele credentials. |
| About: vijf toolgroepen | Samenvoegen | Eén compacte achtergrondlijst; alle namen behouden, geen vijf blokken. |
| About: narratief afsluitend knoppenpaar | Samenvoegen | Eén slotzin/contactlink na achtergrond. |
| About: Want to see if this is a fit? / groot CTA-paneel | Schrappen | Contactslot, header en footer behouden bereikbaarheid; geen uniek bewijs in dit paneel. |
| Header: hoofdlinks en contact | Behouden | Route naar werk/contact blijft direct; bestaand mobiel menu niet inhoudelijk verbouwen. |
| Footer: navigatie, LinkedIn, copyright | Inkorten | Navigatie behouden; App Catalog in voorkeursvariant direct naar Slack-tool. |
| Footer: aparte contactkolom/knop | Schrappen | Contact-link in footernavigatie + headercontact blijft; verwachtingen staan op Contact. |
| Beschikbaarheidsbanner | Behouden | Betekenis van huidige beschikbaarheid blijft; geen nieuwe belofte over aannemen van klanten. |

### Sectieregister — overzichtspagina’s, contact en app

| Pagina / onderdeel | Actie | Reden en bestemming |
|---|---|---|
| Services: intro | Inkorten | Help kiezen, zonder homepagepositionering opnieuw uit te leggen. |
| Services: zes dienstkaarten | Inkorten | Eén onderscheidende vraag/scopezin per kaart; zes detailroutes blijven. |
| Services: groot CTA-paneel | Samenvoegen | Korte contactregel onder keuzes; geen tweede paneel. |
| Cases: intro | Inkorten | Alleen wat de bezoeker hier vindt. |
| Cases: vijf projectkaarten | Inkorten | Vraag, bijdrage en relevante statuscue; volledige metrics/grenzen op detailpagina. |
| Cases: groot CTA-paneel | Samenvoegen | Gewone contactregel, geen herhaalde algemene uitnodiging. |
| Blog: titel/datum/excerpt per kaart | Behouden | Acht onderwerpen blijven selecteerbaar; excerpt als teaser is functioneel. Geen nieuwe lange indexintro. |
| Contact: intro en verwachtingen | Inkorten | Responsverwachting eenmaal bij formulier; geen tweede verkoopverhaal. |
| Contact: drie budgetkaarten | Samenvoegen | Bestaande bedragen compact bij formulier, huidige selectopties niet zonder apart akkoord veranderen. |
| Contact: formulier en LinkedIn | Behouden | Velden, bereikbaarheid, labels, fout-/succesfeedback en submit blijven; backend niet aanraken. |
| App Catalog: intro + enige kaart | Samenvoegen | Naar `/hubspot-enablement`; unieke toolnaam/tagline en gratis-toolcontext blijven daar. Redirect alleen na goedkeuring. |
| Slack-tool: hero/installatie | Behouden | Appdoel en bestaande installatieactie direct bereikbaar. |
| Slack-tool: statusfeedback | Behouden | OAuth-resultaat hoort bij functionele interface; niet schrappen voor lengte. |
| Slack-tool: how it works / drie stappen | Inkorten | Zelfde informatie over kanaal, wekelijkse tips en installatie; geen nieuwe functieclaim. |

### Sectieregister — alle zes diensten

De volgende rijset geldt **afzonderlijk** voor automation, consultancy, integrations, custom-objects, pipeline-optimization en custom-app-cards.

| Huidig onderdeel | Actie | Reden en bestemming |
|---|---|---|
| Hero/scope-intro | Inkorten | Dienstvraag, scope en één contactactie; geen losse claim zonder grens. |
| Quickstats: deliverable-/proces-/outcomeaantallen | Schrappen | Aantallen voegen geen beslisinformatie toe; echte scope blijft onder What I build. |
| Outcomes | Samenvoegen | Met deliverables in één What I build-blok; uitkomst aan concrete werkzaamheden koppelen. |
| Deliverables | Samenvoegen | Zelfde What I build-blok; unieke deliverables blijven, geen twee lijsten van dezelfde scope. |
| Algemene vier processtappen | Verplaatsen | Volledig naar How I work op About; diensten houden één zin + link en specifieke checks in scope. |
| FAQ-vragen/antwoorden | Inkorten | Beslisvoorwaarden in zichtbaar Before we start-blok, zonder antwoorden alleen achter accordion te laten verdwijnen. |
| Referenties/documentatielinks, waar aanwezig | Behouden | Links ondersteunen technische randvoorwaarden; geen los groot paneel nodig. |
| Related case met metrics | Inkorten | Eén relevante bewijszin + case-link; projectstatus/grenzen blijven bij de claim en volledig in case. |
| Generiek eind-CTA-paneel | Schrappen | Hero-contactactie + globale routes; geen inhoudelijk verlies. |

| Dienst | Voorwaarden en scope die in de nieuwe tekst moeten blijven |
|---|---|
| Automation | Triggers/handovers, reviewpunten, uitzonderingen en planvereisten voor gebruikte workflow/custom-codefeatures. |
| Consultancy | Review, prioritering, roadmap; analyse versus uitvoering duidelijk. |
| Integrations | Mappings, broneigenaarschap, syncrichting, connector/API-toegang en foutafhandeling; geen belofte dat iedere koppeling kan. |
| Custom objects | Objectmodel, associaties, migratie/reporting en afweging standaardobjecten versus vereiste HubSpot-licentie. |
| Pipeline optimization | Stages, exitcriteria, velden en monitoring; geen ononderbouwde conversie- of forecastwinst. |
| Custom app cards | UI-extensionkeuze, associaties/data-access, rechten/hosting/onderhoud en read-only renewal-voorbeeld; de 161 bestaande FAQ-antwoordwoorden zijn meegenomen. |

### Sectieregister — alle vijf cases

De volgende rijset geldt afzonderlijk voor customer-lifecycle, crm-data-quality, finance-automation, renewal-status-card en pipeline-consolidation; optionele onderdelen gelden alleen waar ze bestaan.

| Huidig onderdeel | Actie | Reden en bestemming |
|---|---|---|
| Hero / context / status | Inkorten | Situatie en eigen rol kort; gedateerde status en grenzen behouden. |
| Resultaatstrook | Samenvoegen | Resultaten/structurele aantallen in oplossing; aantallen geen bedrijfsimpact noemen. |
| Probleem | Inkorten | Startpunt helder, geen herhaling van hero. |
| Aanpak | Samenvoegen | Met Solution in één What I changed-sectie; beslissingen, uitvoering en tests blijven. |
| Solution | Samenvoegen | Ontvangende What I changed-sectie; unieke technische details blijven. |
| Operating model / terugkerende review | Behouden | Account- en Data-quality-case: wie controleert, wat de check doet en wat niet; geen generiek procesverhaal. |
| Accountdiagram | Behouden | Fictieve gegevens en toegankelijke uitleg blijven; niet schrappen om de pagina te verkorten. |
| Stack | Inkorten | Compacte regel; gebruikte systemen blijven. |
| Gerelateerde dienstenkaarten | Inkorten | Tekstlinks naar scopes; geen opnieuw vertelde dienstbeschrijvingen. |
| Vorige/volgende casekaarten | Inkorten | Eenvoudige titellinks behouden doorklikroute. |
| Groot contactpaneel | Samenvoegen | Eén slotcontactzin, geen extra kaart. |

Bij CRM-architectuur blijft enrichment in progress; bij datakwaliteit blijven dashboard/detectie versus nog open member-count/freshness en geen automatisch herstel expliciet. Finance behoudt finance-review; renewal behoudt read-only statuslookup en drie uitkomsten; pipeline behoudt MQL–Closed Won en procesmapping zonder nieuwe impactcijfers.

### Sectieregister — acht artikelen, ieder H2-onderdeel

Generieke CTA na het artikel: **Schrappen** op alle acht routes. Contact blijft via bestaande contextlink (zeven artikelen), header/footer en Contact; op onboarding is globale contactnavigatie voldoende. Artikelkop, datum, auteur en bronnen: **Behouden** op alle acht routes. Bloginhoud is verdieping, niet automatisch te lang omdat het veel woorden heeft. FAQ-informatie gaat alleen weg als het antwoord al elders staat; unieke antwoorden worden expliciet in de relevante sectie opgenomen.

#### `/blog/hubspot-aeo-smb`

| Huidige sectie | Actie | Reden / behoudplek |
|---|---|---|
| What is HubSpot AEO? | Samenvoegen | Met What does HubSpot AEO actually do?: één productintro. |
| Is AI search actually eating your traffic? | Inkorten | Trafficcontext en bronnen blijven; geen tweede productuitleg. |
| What does HubSpot AEO actually do? | Samenvoegen | Ontvangende productintro; functionaliteit en unieke plan/prijsvoorwaarden uit FAQ hier. |
| Should your SMB pay for it? (honest take) | Behouden | Unieke SMB-keuze en afweging. |
| What to do first if you're not ready for AEO | Behouden | Concrete alternatieve eerste stappen. |
| Frequently Asked Questions | Verplaatsen | Unieke plan-/prijsvragen naar productintro, overige antwoorden naar SMB-keuze/eerste stappen. |
| The bottom line | Samenvoegen | Afsluitende keuzezin in SMB-keuze; bestaande contactlink als tekstslot. |

#### `/blog/hubspot-app-cards-guide`

| Huidige sectie | Actie | Reden / behoudplek |
|---|---|---|
| What is a HubSpot app card, exactly? | Inkorten | Korte definitie; details in typevergelijking. |
| Default cards vs marketplace cards vs custom app cards | Behouden | Default/marketplace/custom-keuze is kern van deze guide. |
| What can a custom app card actually do? (real use cases) | Behouden | Unieke toepassingen en grenzen. |
| When does it make sense to build a custom one? | Behouden | Criteria voor custom bouwen. |
| How do app cards relate to the classic CRM card sunset? | Inkorten | Twee contextzinnen + link naar de sunset-checklist; deadline/context niet opnieuw uitwerken. |
| Frequently Asked Questions | Verplaatsen | Developer-/onderhouds-/accessantwoorden naar typevergelijking of buildcriteria. |
| The bottom line | Samenvoegen | Keuze en bestaande contactlink aan eind van buildcriteria. |

#### `/blog/hubspot-breeze-ai-smb`

| Huidige sectie | Actie | Reden / behoudplek |
|---|---|---|
| What is HubSpot Breeze AI, and why does the distinction matter? | Inkorten | Productkaart kort; beoordelingen per onderdeel volgen. |
| Is Breeze Copilot worth using for everyday tasks? | Behouden | Eigen Copilot-afweging. |
| Does the Customer Agent actually resolve support conversations? | Behouden | Supportafweging en voorwaarden. |
| Are Content Agent and Prospecting Agent worth it yet? | Behouden | Content/prospecting-afweging. |
| Is Breeze Intelligence worth the cost for SMBs? | Behouden | Intelligence-kosten/datavoorwaarden. |
| Does AI work if your HubSpot data is a mess? | Behouden | Datakwaliteit als voorwaarde, geen ongefundeerde effectclaim. |
| FAQ | Verplaatsen | Elk uniek antwoord naar bijbehorende product-/datakwaliteitsectie. |
| The bottom line | Samenvoegen | Korte afsluitende keuze binnen data-/prioriteitsafweging. |

#### `/blog/hubspot-classic-crm-cards-sunset`

| Huidige sectie | Actie | Reden / behoudplek |
|---|---|---|
| What exactly is sunsetting? | Behouden | Exacte scope van gedateerde sunset, geen andere kaarttypes mee schrappen. |
| Who is actually affected? | Behouden | Wie geraakt wordt en dat appinstallatie niet automatisch verdwijnt. |
| What do you actually need to do before October 31? | Behouden | Deze route is hoofdplek van de migratiechecklist. |
| What are interactive app cards, the replacement? | Inkorten | Vervanging kort + link naar app-cards-guide; unieke migratiekeuze blijft. |
| Frequently Asked Questions | Verplaatsen | Appinstallatieantwoord naar Who is affected; reden/vervangingsvoorwaarden naar replacement. |
| The bottom line | Samenvoegen | Eindactie in checklist; bestaande contactlink behouden. |

#### `/blog/hubspot-contractor-vs-agency`

| Huidige sectie | Actie | Reden / behoudplek |
|---|---|---|
| What does a HubSpot agency actually sell you? | Samenvoegen | Met contractor-sectie in één vergelijking van samenwerking. |
| What does working with a contractor actually look like? | Samenvoegen | Ontvangende vergelijking; directe uitvoering/eigenaarschap behouden. |
| Does the 2x rate gap reflect a real difference in output? | Samenvoegen | Met kosten/timeline: geen tweede prijsverhaal; AI-outputclaims niet als portfolio-bewijs presenteren. |
| How does implementation cost and timeline actually compare? | Samenvoegen | Ontvangende kosten/timeline-sectie; bronnen/caveats behouden en bij herschrijven verifiëren. |
| When does it actually make sense to hire an agency? | Behouden | Situaties waar een bureau passend is. |
| What questions should you ask before hiring either one? | Behouden | Selectievragen beantwoorden eigen praktische vraag. |
| Frequently Asked Questions | Verplaatsen | Unieke kostenantwoorden naar kosten; selectie/risicoantwoorden naar vragen vóór inhuur. Statistiekclaims eerst verifiëren bij wijziging. |
| The bottom line | Samenvoegen | Eindadvies/contactslot onder selectievragen. |

#### `/blog/hubspot-lifecycle-stages-setup-guide`

| Huidige sectie | Actie | Reden / behoudplek |
|---|---|---|
| What are HubSpot lifecycle stages, and why do they matter? | Inkorten | Definitie/stagelijst helder, geen herhaalde intro. |
| How is lifecycle stage different from deal stage and lead status? | Behouden | Verschil lifecycle/dealstage/leadstatus essentieel. |
| How to define your MQL and SQL before you build anything | Behouden | MQL/SQL-definities vóór techniek. |
| Which lifecycle stages does HubSpot set automatically? | Samenvoegen | Met automation-instructies; native transitions blijven expliciet onderscheiden. |
| How to set up lifecycle stage automation in HubSpot | Samenvoegen | Ontvangende configuratiesectie, inclusief native versus eigen workflows. |
| The most common lifecycle stage mistakes I see | Behouden | Concrete fouten en herstelgrenzen. |
| Frequently Asked Questions | Verplaatsen | Backwards-/cleanupantwoorden naar configuratie/fouten; benchmarkantwoord alleen met huidige bron/caveat behouden in definities. |
| The bottom line | Samenvoegen | Eindcontrole/contactslot bij fouten en controles. |

#### `/blog/hubspot-onboarding-mistakes`

| Huidige sectie | Actie | Reden / behoudplek |
|---|---|---|
| 1. You start building before documenting your process | Behouden | Eigen procesdocumentatiepunt. |
| 2. You confuse onboarding with implementation | Behouden | Onboarding versus implementatie. |
| 3. You import dirty data | Behouden | Data-import/kwaliteit. |
| 4. Your lifecycle stages and deal stages are wrong | Inkorten | Kernfout + link naar lifecycle-guide; stappenplan daar. |
| 5. You build automation before anyone is using the system | Behouden | Volgorde adoptie en automatisering. |
| 6. You treat adoption as a one-time training session | Behouden | Doorlopende adoptie. |
| 7. You add custom properties for everything | Behouden | Propertykeuzes. |
| 8. You connect integrations without defining the rules | Behouden | Integratieregels vóór aansluiten, geen dienstscope dupliceren. |
| 9. The marketing contacts pricing trap nobody warns you about | Behouden | Unieke marketing-contacts-/budgetvalkuil. |
| Before you open HubSpot: a checklist | Behouden | Checklist heeft eigen actieformaat, geen extra secties toevoegen. |
| The Bottom Line | Samenvoegen | Korte eindzin onder checklist; geen tweede samenvatting. |

#### `/blog/hubspot-spring-2026-spotlight`

| Huidige sectie | Actie | Reden / behoudplek |
|---|---|---|
| The headline: Breeze AI agents now charge per result, not per use | Inkorten | Gedateerde wijziging kort en bron behouden; detailafweging linkt naar Breeze-guide. |
| Breeze agents now work inside your workflows | Inkorten | Unieke releasewijziging blijft, geen volledige workflowguide. |
| Data Hub: more than a rebrand of Operations Hub | Behouden | Unieke Data Hub-releasecontext. |
| Commerce Hub gets AI-assisted quoting | Behouden | Unieke Commerce Hub-releasecontext. |
| UI Extensions: App Home pages and Settings pages are live | Inkorten | Releaseverschil blijft; gebruiksafweging linkt naar app-cards-guide. |
| One deadline that affects you if you have custom apps | Behouden | Gedateerde augustuscontext duidelijk historisch; actualiteit verifiëren bij toekomstige wijziging. |
| What I'd actually prioritize as an SMB | Behouden | Eigen SMB-prioritering. |
| FAQ | Verplaatsen | Unieke antwoorden naar relevant product/deadline, geen tweede mini-releaseoverzicht. |
| The bottom line | Samenvoegen | Eindactie/contactslot onder prioriteiten. |

### Ruimte, kaarten en visuele beperkingen

Bronklassen laten veel opeenvolgende `py-20 lg:py-28` en `space-y-20 lg:space-y-28` zien, naast ruime CTA-panelen en About-blokken. Dat zijn aanwijzingen voor stapeling, **geen gemeten paginahoogte**. Voorstel: eerst hele redundante blokken verwijderen, dan resterende secties bijvoorbeeld `py-12 lg:py-16` en binnenafstanden `space-y-8 lg:space-y-12`; bij de gebruikelijke spacingbasis zijn dat 48/64 en 32/48 px. Pas bij uitvoering per template toetsen op bruikbare ruimte, zonder kleinere bodytekst of dichtgeplakte layouts. Bestaande typografie en creatieve serifaccent blijven.

Homepage heeft 15 inhoudskaarten: 2 cases, 4 expertise, 3 aanpak, 6 diensten. About heeft 12 framed inhoudskaarten: 1 feitenkaart, 4 expertise en 7 historische certificeringen; portretten en groot CTA-paneel apart. Voorstel houdt alleen de twee projectkaarten op home; About gebruikt tekst en een leesbare certificeringslijst. Een lijst is geen verborgen accordion en behoudt inhoud.

### Controle checkpoint 2

27/27 routes hebben sectieadvies: vaste pagina’s expliciet, zes diensten en vijf cases via benoemde template-rijsets plus unieke voorwaarden, acht artikelen met iedere H2. Elke rij heeft precies één primaire actie. Bestemmingen voor noodzakelijke informatie zijn genoemd. Overlap onderbouwd met bron/HTML; geen gebruikersgedrag, SEO-effect of hoogte gemeten. Websitecode en overige documenten blijven ongewijzigd. Volgende stap: twee structuren vergelijken en complete voorbeeldcopy op woorden tellen.

## Checkpoint 3 — Twee varianten en voorkeursstructuur

### Vergelijking

| Aspect | A: alle 27 contentpagina’s behouden | B: inkorten + catalogus met Slack-tool samenvoegen |
|---|---|---|
| Inhoud | Dezelfde selectie/sectieadviezen uit checkpoint 2 | Dezelfde selectie, plus enige cataloguskaart naar toolpagina |
| Bestemmingen | 27, inclusief extra index voor één tool | 26 canonieke contentpagina’s; alle 27 oude paden bereikbaar, één via redirect |
| Vindbaarheid | Bestaande URL’s en navigatie volledig behouden | Diensten/cases/blogs behouden hun eigen URLs; tool direct bereikbaar, catalogus permanent doorgestuurd |
| Duidelijkheid | Compactere pagina’s, maar toolindex voegt nog steeds een tussenstap toe | Eén plek voor tooluitleg en installatie; geen andere bezoekervragen geforceerd combineren |
| Onderhoud | Dubbele catalogus-/appintro blijven onderhouden | Eén appintro; redirect, interne links en sitemap eenmalig aanpassen |
| Unieke inhoud | Geen noodzakelijk verlies | Geen noodzakelijk verlies: toolnaam, gratis context en uitleg op bestemming behouden |
| Risico | Kleinste routewijziging, minder structurele winst | Beperkt migratierisico; redirect/canonical/sitemap als één pakket controleren |

**Voorkeur: B.** Het aantal pagina’s is niet de hoofdreden dat de site groot aanvoelt; de stapeling binnen pagina’s is dat waarschijnlijk wel, afgeleid uit bronstructuur. Daarom alleen samenvoegen waar geen eigen vraag overblijft. De zes diensten verschillen in scope, de vijf cases in bewijs en de acht artikelen in leervraag. Die pagina’s samenpersen zou detail in één grotere pagina stoppen en gerichte bestemmingen verliezen. Er is geen analytics-/Search Console-basis om te beweren dat samenvoegen ranking of conversie verbetert.

Ook onderzocht: zes dienstpagina’s geheel opnemen in `/services` zou van 27 naar 21 bestemmingen gaan (20 met catalogusmerge), maar levert een veel langer keuzeoverzicht en minder precieze scope-/bewijslinks op. About naar home verplaatsen zou juist opnieuw alle persoonlijke achtergrond op home stapelen. Daarom beide niet aanbevolen. Geen case of artikel samenvoegen: vooral gericht linken tussen app-cards/sunset/Spotlight en onboarding/lifecycle.

### Aanbevolen sitestructuur

Hoofdnavigatie blijft Services → Case studies → Blog → About, met contactactie. Homepage is oriëntatie en bewijs; About is persoon/werkwijze. Services heeft zes gerichte subpagina’s, Case studies vijf, Blog acht. Contact blijft zelfstandig. De footer linkt rechtstreeks naar de gratis Slack-tool op `/hubspot-enablement` (label bijvoorbeeld “Free Slack tool”), naast bestaande routes en LinkedIn. API/OAuth-/privéroutes vallen buiten deze structuurwijziging.

### Sectievolgorde en tekstbudgetten

Budget = voorgestelde **totale pagina-eigen zichtbare tekst**, inclusief koppen/linklabels, exclusief globale navigatie/footer. Bij diensten inclusief alle antwoorden en randvoorwaarden; niet vergelijken met alleen ingeklapte SSR. Voor home/About zijn hieronder complete drafts echt geteld. Alle andere “na”-getallen zijn planningsbudgetten, nog geen herschreven of gegenereerde pagina’s. Bij coreverlies mag de bovengrens worden overschreden met gedocumenteerde reden.

| Route / groep | Concrete volgorde | Budget |
|---|---|---:|
| `/` | Hero → twee Selected work-kaarten → vier expertise-regels met bewijslinks → één werkwijze/links/contactslot | **346 woorden**: 49 + 123 + 106 + 68 |
| `/about` | Intro/rol/één foto → eigen werk → How I work/AI → historische achtergrond/tools/contact | **382 woorden**: 58 + 99 + 120 + 105 |
| `/services` | Korte keuze-intro → zes scopekeuzes → één contactzin | 200–230; circa 25 + 170–195 + 5–10 |
| Alle dienst-details | Hero/contact + gewone All services-link → What I build → Before we start + documentatielinks → bewijszin/case-link | Circa 45–55 + 100–130 + 65–100 + 20–35; routebudget hieronder |
| `/case-studies` | Korte intro → vijf teasers/eigen bijdrage/status → contactzin | 250–290; circa 20 + 220–260 + 10 |
| Account-case | Context/status → probleem → What I changed/resultaten → review/grenzen → diagram → stack/dienstlinks/casenavigatie/contact | 540–600; circa 75 + 45 + 145 + 120 + 110 + 45 |
| Data-quality-case | Context/status → probleem → What I changed/resultaten → controles/open grenzen → stack/dienstlinks/casenavigatie/contact | 460–510; circa 80 + 45 + 175 + 130 + 55 |
| Andere drie cases | Context/rol → probleem → What I changed/resultaten en beperkingen → stack/dienstlinks/casenavigatie/contact | Routebudget hieronder; circa 60 + 45 + 155–205 + 40–50 |
| `/blog` | Titel → acht bestaande artikelteasers/datum/leesduur | 332, geen verplichte inkorting |
| Alle blog-details | Kop/datum/auteur → beantwoording volgens eigen sectieadvies → bronnen/contextuele eindlink | Routebudget hieronder; geen generiek CTA-paneel |
| `/contact` | Korte vraag/verwachting → LinkedIn en formulier met compacte bestaande budgetcontext | 95–110; bestaande veldlabels/functies blijven |
| `/hubspot-enablement` | Appdoel/gratis context/installatie → bestaande statusfeedback → compacte drie stappen | 140–160; extra cataloguscontext kan inkorting compenseren |
| `/app-catalog` | Geen eigen nieuwe body: redirectvoorstel, toolcontext naar bestemming | 0 eigen woorden na goedgekeurde merge |
| Globale footer | Naam/korte specialismevermelding → routes/LinkedIn/contact → copyright | Circa 28 woorden, geen knop/contactkolom |

#### Routebudgetten voor diensten en cases

| Route | Huidig W inclusief FAQ | Voorstel totaal |
|---|---:|---:|
| `/services/automation` | 446 | 260–300 |
| `/services/consultancy` | 377 | 230–270 |
| `/services/integrations` | 426 | 260–310 |
| `/services/custom-objects` | 460 | 290–340 |
| `/services/pipeline-optimization` | 354 | 230–270 |
| `/services/custom-app-cards` | 573 | 330–380 |
| `/case-studies/customer-lifecycle` | 695 | 540–600 |
| `/case-studies/crm-data-quality` | 610 | 460–510 |
| `/case-studies/finance-automation` | 418 | 300–340 |
| `/case-studies/renewal-status-card` | 453 | 320–360 |
| `/case-studies/pipeline-consolidation` | 405 | 300–340 |

De app-carddienst krijgt bewust meer ruimte voor rechten, hosting en onderhoud. Account- en data-qualitycases krijgen meer ruimte voor beheer/status; finance-review en read-only renewal zijn niet inwisselbaar met een algemene “resultaten”-zin.

#### Artikel-outlines na selectie

| Artikel | Nieuwe volgorde van inhoudelijke H2-blokken | Budget incl. kop/context/linklabels |
|---|---|---:|
| AEO | Product/voorwaarden → trafficcontext → SMB-keuze/eindadvies → eerst fundamentals | 1.400–1.600 |
| App cards guide | Definitie → drie kaarttypes → toepassingen → buildcriteria/eindadvies → korte sunsetverwijzing | 1.450–1.650 |
| Breeze | Productintro → Copilot → Customer Agent → Content/Prospecting → Intelligence → datakwaliteit/eindadvies | 2.300–2.550 |
| Classic cards sunset | Scope → getroffen gebruikers → migratiechecklist/eindactie → korte vervangingskeuze | 1.300–1.450 |
| Contractor vs agency | Samenwerking vergelijken → kosten/timing → wanneer bureau → selectievragen/eindadvies | 1.850–2.100 |
| Lifecycle stages | Definitie → stageverschillen → MQL/SQL → native/eigen automatisering → fouten/controle/eindadvies | 1.650–1.850 |
| Onboarding mistakes | Negen fouten → checklist met korte afsluiting | 1.400–1.500 |
| Spring 2026 Spotlight | Zes gedateerde product-/deadlinewijzigingen → SMB-prioritering/eindactie | 1.650–1.850 |

Unieke FAQ-antwoorden integreren in genoemde blokken; bronnen en technische stappen behouden. Geen standaard maxwoordenaantal afdwingen op een nuttige guide. Productprijzen, licenties, deadlines en bestaande statistiekclaims zijn **niet door deze compactheidsaudit geverifieerd**. Wanneer toekomstige herschrijving die claims wijzigt of als actueel presenteert, eerst primaire bronnen controleren; bij Spotlight historische context van publicatiedatum behouden. Dat is geen browsercheck van de website.

### Verkorte Engelse homepage — complete voorstelcopy

Geen nieuwe offerings of beloofde impact. Goedgekeurde H1 blijft exact; de twee projecten hebben status en de overige twee expertisegebieden direct bewijs. Linklabels zijn meegeteld. “How I approach it” is één klein slotblok, geen nieuwe kaartsectie.

HubSpot & RevOps specialist

# I work on the complicated bits of HubSpot.

CRM structure, workflows, integrations and data quality. At AIHR, I work on these from designing the setup to building it and checking what happens afterwards.

[See the work](/case-studies)

Based in the Netherlands. Working in Revenue Operations at AIHR.

## Selected work

### Connecting the full customer relationship

At AIHR, I led the account-based CRM project, connecting customer records through a custom Account object, associations and workflows. The aim was to make the relationship visible across licenses, deals and professional services, rather than treating each record as a separate customer.

September 2026 snapshot: the core setup is live; enrichment remains in progress.

[Read the Account case](/case-studies/customer-lifecycle)

### Finding data mismatches

I built a detection layer comparing HubSpot and learning-platform data through Snowflake. The dashboard helps investigate missing links and conflicting statuses before deciding which record needs attention.

August 2026 snapshot: datasets and dashboard are in place; member-count validation and source freshness still need follow-up. This is detection, not automatic repair.

[Read the data quality case](/case-studies/crm-data-quality)

## Four parts of the work

**CRM architecture** — Customer records, objects and associations that reflect the customer relationship. [See the Account model](/case-studies/customer-lifecycle).

**Automation & integrations** — Connecting handovers between HubSpot, commerce and finance, with review points. In the order flow, Finance checks the billing details before starting the automation; that decision stays with Finance. [See the order-to-invoice flow](/case-studies/finance-automation).

**Data quality & monitoring** — Surfacing missing links and inconsistent data for investigation. [See the monitoring setup](/case-studies/crm-data-quality).

**Custom HubSpot interfaces** — Bringing associated information onto the record where someone needs it. The read-only renewal card shows whether auto-renewal is active, manual renewal is required, or the subscription is cancelled. [See the renewal status card](/case-studies/renewal-status-card).

## How I approach it

I start with the process: where data comes from, which records belong together and who owns the next decision. Then I build, test the expected paths and exceptions, and document how the setup works. Recurring checks help identify what changes after launch.

[More about me](/about) · [Explore the six services](/services)

If your HubSpot setup has become difficult to follow, [tell me where you’re getting stuck](/contact).

### Verkorte Engelse About — complete voorstelcopy

Eén foto zonder extra tekstblok. Historische entries blijven met jaar/uitgever, tools blijven benoemd; geen opnieuw uitgewerkt expertisegrid. Het huidige label “2020 HubSpot Champion User” wordt in de lijst “HubSpot Champion User — HubSpot Academy, 2020”: dezelfde historische erkenning, geen actuele certificering.

HubSpot & RevOps specialist

# Tom Schoorstra.

I’m based in the Netherlands. At AIHR, I work as System Operations Manager Senior within Revenue Operations, connecting CRM processes with the systems around them.

My work runs from defining the customer model to building workflows, integrations and record interfaces. I also build checks that help investigate missing links and inconsistent operational data.

## What I work on

I led AIHR’s account-based CRM project: defining the model, connecting historical records and building workflows that link licenses, deals and professional services to the right Account. I developed recurring reviews to investigate missing associations and potential duplicates. The core setup is live; enrichment is still in progress in the September 2026 snapshot.

Other work includes the HubSpot–WooCommerce–Exact order flow, data quality dashboards and a read-only renewal status card on deals. These are different problems, with different checks and limits. The cases explain what I built and what remained open.

[Explore the case studies](/case-studies)

## How I work

I follow the process first: where the data comes from, who owns each decision and what should happen in the next system. That helps distinguish a record problem from a gap in the workflow.

From there, I design the model or automation, test the expected paths and exceptions, and document how the team can maintain it. After launch, checks help surface issues as records and processes change.

I use AI for investigation, documentation and quality reviews. In the account review, Codex and Claude Code help assess candidate matches and prepare recommendations. I start the review and decide what to do with the findings; the review itself does not write to HubSpot.

[See the account review in practice](/case-studies/customer-lifecycle)

## Background

Past certifications and recognition, not current credentials:

- HubSpot Sales Hub Software — HubSpot Academy, 2024
- Form Concierge Admin Certificate — Chili Piper, 2022
- Inbound Marketing — HubSpot Academy, 2022
- HubSpot Sales Software — HubSpot Academy, 2022
- HubSpot Champion User — HubSpot Academy, 2020
- Inbound Marketing Certified — HubSpot Academy, 2020
- Inbound Certified — HubSpot, 2017

Tools I work with include HubSpot CRM, custom objects, workflows, Data Studio and the HubSpot API; Zapier, JavaScript, WooCommerce and Exact; Codex and Claude Code; Gong, Chili Piper, Aircall and Typeform; Google Workspace, Jira, Confluence, 1Password and Trelica.

For project-based work or an ongoing retainer, [view the services](/services). To talk through your setup, [get in touch](/contact).

### Oude-naar-nieuwe URL-mapping — uitsluitend voorstel

Bij variant B één permanente redirect in `next.config.ts` (`permanent: true`, verwachte 308). Interne links gaan rechtstreeks naar bestemming; `/app-catalog` verdwijnt pas dan uit de sitemap. Bestemming blijft self-canonical `/hubspot-enablement`; queryparameters/installatiecallback/statusfeedback niet veranderen. Geen redirectketen, geen OAuth-/API-redirects. Variant A heeft overal identiteitmapping.

| Bestaande URL | Voorgestelde canonieke bestemming | Actie |
|---|---|---|
| `/` | `/` | Behouden, geen redirect |
| `/about` | `/about` | Behouden, geen redirect |
| `/services` | `/services` | Behouden, geen redirect |
| `/case-studies` | `/case-studies` | Behouden, geen redirect |
| `/blog` | `/blog` | Behouden, geen redirect |
| `/contact` | `/contact` | Behouden, geen redirect |
| `/app-catalog` | `/hubspot-enablement` | 308 na goedkeuring; unieke toolcontext op bestemming |
| `/hubspot-enablement` | `/hubspot-enablement` | Behouden, geen redirect |
| `/case-studies/customer-lifecycle` | `/case-studies/customer-lifecycle` | Behouden, geen redirect |
| `/case-studies/crm-data-quality` | `/case-studies/crm-data-quality` | Behouden, geen redirect |
| `/case-studies/finance-automation` | `/case-studies/finance-automation` | Behouden, geen redirect |
| `/case-studies/renewal-status-card` | `/case-studies/renewal-status-card` | Behouden, geen redirect |
| `/case-studies/pipeline-consolidation` | `/case-studies/pipeline-consolidation` | Behouden, geen redirect |
| `/services/automation` | `/services/automation` | Behouden, geen redirect |
| `/services/consultancy` | `/services/consultancy` | Behouden, geen redirect |
| `/services/integrations` | `/services/integrations` | Behouden, geen redirect |
| `/services/custom-objects` | `/services/custom-objects` | Behouden, geen redirect |
| `/services/pipeline-optimization` | `/services/pipeline-optimization` | Behouden, geen redirect |
| `/services/custom-app-cards` | `/services/custom-app-cards` | Behouden, geen redirect |
| `/blog/hubspot-aeo-smb` | `/blog/hubspot-aeo-smb` | Behouden, geen redirect |
| `/blog/hubspot-app-cards-guide` | `/blog/hubspot-app-cards-guide` | Behouden, geen redirect |
| `/blog/hubspot-breeze-ai-smb` | `/blog/hubspot-breeze-ai-smb` | Behouden, geen redirect |
| `/blog/hubspot-classic-crm-cards-sunset` | `/blog/hubspot-classic-crm-cards-sunset` | Behouden, geen redirect |
| `/blog/hubspot-contractor-vs-agency` | `/blog/hubspot-contractor-vs-agency` | Behouden, geen redirect |
| `/blog/hubspot-lifecycle-stages-setup-guide` | `/blog/hubspot-lifecycle-stages-setup-guide` | Behouden, geen redirect |
| `/blog/hubspot-onboarding-mistakes` | `/blog/hubspot-onboarding-mistakes` | Behouden, geen redirect |
| `/blog/hubspot-spring-2026-spotlight` | `/blog/hubspot-spring-2026-spotlight` | Behouden, geen redirect |

### Controle checkpoint 3

Varianten A/B vergeleken op eigen functie, bereikbaarheid, onderhoud en uniek informatieverlies; agressievere service-/Aboutmerge gemotiveerd afgewezen. Voorkeur B heeft 26 canonieke contentbestemmingen en een mapping voor alle 27 oude routes. Outlines/budgetten gelden voor iedere route. Complete Engelse homecopy telt 346 woorden (32,7% minder dan 514), About 382 (33,3% minder dan 573). Telmethode gelijk aan inventaris voor zichtbare labels, Markdownopmaak en URL-doelen uitgesloten. De vier expertisegebieden en hun bewijslinks staan in de homecopy. De copy is nog niet in websitecomponenten toegepast of visueel gecontroleerd. Volgende stap: uitvoeringscheckpoints en behoudcontrole.

## Checkpoint 4 — Kerncontrole en uitvoeringsplan

### Behoudcontrole van het voorstel

| Controle | Resultaat / controlecriterium bij uitvoering |
|---|---|
| Vier expertisegebieden herkenbaar | Home heeft vier expliciet benoemde regels; CRM → Account, automation/integrations → Finance, data quality → monitoring, interfaces → Renewal. Alle vier detailcases en dienstscopes blijven bereikbaar. |
| Eigen bijdrage / rol | About houdt “System Operations Manager Senior, within Revenue Operations” en eigen projectlead/ontwerp/bouw/checks. Cases blijven in ik-vorm en nemen geen teamresultaat over als eigen claim. |
| Correcte grenzen | Account: September 2026 snapshot, core live/enrichment open; data quality: August 2026 snapshot, member-count/source freshness open en geen automatisch herstel; Finance: review vóór start; Renewal: read-only en drie gevalideerde uitkomsten; pipeline: geen nieuwe conversieclaim. |
| AI-werkwijze | About houdt menselijke start/beslisser en geen write vanuit review; Account-case blijft hoofdplek van concrete uitvoering. Geen autonome CRM-correctie suggereren. |
| Unieke achtergrond | Alle zeven historische credentials/erkenningen met jaar/uitgever en historisch label, tools en engagementformats blijven in About. Eén portret. |
| Iedere route eigen taak | Inventoryhoofddoel blijft leidend. Alleen catalogus heeft geen zelfstandige keuzevraag en krijgt daarom redirectvoorstel. Alle zes diensten, vijf cases en acht artikelen blijven. |
| Eén hoofdplek voor uitleg | Home oriënteert; About persoonlijke aanpak; dienst scope/voorwaarden; case bewijs/grens; blog verdieping; Contact formulier/verwachtingen. Teasers mogen verkort terugkomen. |
| Werk/contact eenvoudig bereikbaar | Header bevat werk/contact, home primaire See the work-knop; About/cases/diensten hebben relevante links en één contactroute. Footer gewone Contact/LinkedIn en directe toolroute. |
| Toon en stijl | Goedgekeurde H1 exact, persoonlijk Engels zonder nieuwe claims/offering; Geist en serifaccent behouden. Geen nieuwe designstijl; geen kleinere tekst om reductie te halen. |
| Geen verborgen inkorting | Service-antwoorden inclusief in budget; relevante antwoorden zichtbaar samengevat. Geen accordion als opslag voor ongewijzigde lange tekst. |

Dit is een redactionele/broncontrole van een voorstel. Zij bewijst geen scrollhoogte, mobiele weergave of bezoekerssucces. Visueel oordeel blijft onbevestigd zonder menselijke beoordeling; een succesvolle build/HTML-check mag niet als visuele goedkeuring worden beschreven.

### Voor / na: woorden, secties, kaarten en acties

Huidig = bron/gegenereerde HTML; voorstel = geplande structuur en budget, behalve de twee compleet getelde drafts. **S** = logische tekstclusters, niet het aantal letterlijke `<section>`-tags: bijvoorbeeld hero, outcomes, deliverables en proces tellen ieder apart. Home telt zes; About elf (intro, rolstrip, feiten/foto, profiel, aanpak, doelgroep, expertise, credentials, tools, narratief knopslot, CTA). Blog telt hero + ieder inhoudelijk H2 + generieke CTA; FAQ-subvragen/H3 niet apart. Kleine slotlinks kunnen in één cluster worden gecombineerd.

**Ka** = framed inhoudskaarten uit de bron: project-/dienst-/artikelkaarten, expertise/aanpak, facts/credentials, quickstats/outcomes/deliverablepaneel en voorbeeldmetrics. Nested mini-metrics tellen apart; gewone badges, timeline-nummerbollen, inputvelden, FAQ-disclosures, codevoorbeelden en diagramnodes niet. Diagram blijft als figuur. Grote CTA-panelen tellen apart als eind-CTA, niet als inhoudskaart. Contact heeft drie budgetkaarten plus één formulierpaneel; LinkedIn-knop is een actie, geen inhoudskaart. K/C blijven de SSR-definities uit checkpoint 1: K meet gedeelde Button-stijl, geen volledig overzicht van alle klikbare acties.

| Route | Woorden nu incl. FAQ | Woorden voorstel | S nu → voorstel | Ka nu → voorstel | K/C nu → voorstel |
|---|---:|---:|---:|---:|---|
| `/` | 514 | 346 | 6 → 4 | 15 → 2 | 4/2 → 1/1 |
| `/about` | 573 | 382 | 11 → 4 | 12 → 0 | 6/2 → 0/1 |
| `/services` | 301 | 200–230 | 3 → 3 | 6 → 6 | 4/2 → 0/1 |
| `/case-studies` | 358 | 250–290 | 3 → 3 | 5 → 5 | 4/2 → 0/1 |
| `/blog` | 332 | 332 | 2 → 2 | 8 → 8 | 0/0 → 0/0 |
| `/contact` | 113 | 95–110 | 2 → 2 | 4 → 1 | 1/0 → 1/0 |
| `/app-catalog` | 47 | 0 | 2 → 0 | 1 → 0 | 0/0 → 0/0 |
| `/hubspot-enablement` | 146 | 140–160 | 2 → 2 | 0 → 0 | 1/0 → 1/0 |
| `/case-studies/customer-lifecycle` | 695 | 540–600 | 11 → 6 | 5 → 0 | 2/1 → 0/1 |
| `/case-studies/crm-data-quality` | 610 | 460–510 | 10 → 5 | 6 → 0 | 2/1 → 0/1 |
| `/case-studies/finance-automation` | 418 | 300–340 | 9 → 4 | 5 → 0 | 2/1 → 0/1 |
| `/case-studies/renewal-status-card` | 453 | 320–360 | 9 → 4 | 5 → 0 | 2/1 → 0/1 |
| `/case-studies/pipeline-consolidation` | 405 | 300–340 | 9 → 4 | 3 → 0 | 2/1 → 0/1 |
| `/services/automation` | 446 | 260–300 | 7 → 4 | 12 → 0 | 4/2 → 1/1 |
| `/services/consultancy` | 377 | 230–270 | 7 → 4 | 11 → 0 | 4/2 → 1/1 |
| `/services/integrations` | 426 | 260–310 | 7 → 4 | 12 → 0 | 4/2 → 1/1 |
| `/services/custom-objects` | 460 | 290–340 | 7 → 4 | 11 → 0 | 4/2 → 1/1 |
| `/services/pipeline-optimization` | 354 | 230–270 | 7 → 4 | 10 → 0 | 4/2 → 1/1 |
| `/services/custom-app-cards` | 573 | 330–380 | 7 → 4 | 12 → 0 | 4/2 → 1/1 |
| `/blog/hubspot-aeo-smb` | 1849 | 1400–1600 | 9 → 5 | 0 → 0 | 2/2 → 0/1 |
| `/blog/hubspot-app-cards-guide` | 1872 | 1450–1650 | 9 → 6 | 0 → 0 | 2/2 → 0/1 |
| `/blog/hubspot-breeze-ai-smb` | 2745 | 2300–2550 | 10 → 7 | 0 → 0 | 2/2 → 0/1 |
| `/blog/hubspot-classic-crm-cards-sunset` | 1643 | 1300–1450 | 8 → 5 | 0 → 0 | 2/2 → 0/1 |
| `/blog/hubspot-contractor-vs-agency` | 2315 | 1850–2100 | 10 → 5 | 0 → 0 | 2/2 → 0/1 |
| `/blog/hubspot-lifecycle-stages-setup-guide` | 2087 | 1650–1850 | 10 → 6 | 0 → 0 | 2/2 → 0/1 |
| `/blog/hubspot-onboarding-mistakes` | 1548 | 1400–1500 | 13 → 11 | 0 → 0 | 2/1 → 0/0 |
| `/blog/hubspot-spring-2026-spotlight` | 2106 | 1650–1850 | 11 → 8 | 0 → 0 | 2/2 → 0/1 |

Som pagina-eigen content: **23.766 woorden nu**, inclusief 532 FAQ-antwoordwoorden, versus **18.265–20.420 voorgestelde budgetwoorden** (circa 14,1–23,1% minder). Deze som is een begroting, geen gerealiseerde reductie; acht verdiepende artikelen vormen het grootste deel van het volume. Zonder die artikelen: 7.601 huidige woorden. Home 514 → 346 = **32,7%** minder; About 573 → 382 = **33,3%** minder, beide binnen 25–35% en inclusief zichtbare labels.

| Gedeeld / grote CTA-panelen | Nu | Voorstel |
|---|---|---|
| Header | 13 woorden; één contactknop | Zelfde routes/contact; geen reductie nodig |
| Footer | 59 woorden; drie kolommen + copyright, contacttekstlink én knop | Circa 28 woorden; compact brand/navigatie + copyright, één Contact-link en LinkedIn, geen contactknop |
| Home / About eind-CTA | Elk één groot paneel, About daarnaast narratief knoppenpaar | Geen groot eindpaneel, één contactlink in slottekst |
| Zes dienst-details | Zes grote eindpanelen | Nul; één hero-contactactie per dienst |
| Vijf case-details | Vijf grote eindpanelen | Nul; één contactslot per case |
| Services / Cases index | Twee grote eindpanelen | Nul; één korte contactregel per index |
| Acht blog-details | Acht grote eindpanelen | Nul; bestaande contextuele link waar aanwezig |

Huidig totaal van deze pagina-eigen eindpanelen: **23 → 0 voorgesteld**. Footer is een aanvullend gedeeld blok; zijn woorden worden niet gebruikt om home/About-doel te halen. De homepage houdt twee projectkaarten; diensten-/case-/blogindices houden hun nuttige keuzekaarten. Minder kaarten is gericht, geen algemene verplichting om alle grids te verwijderen.

### Uitvoerbare wijzigingslijst — toekomstige Goals

Onderstaande checkpoints zijn **volgend implementatiewerk**, niet tijdens deze audit uitgevoerd. Eerst de voorkeursstructuur en voorbeeldcopy inhoudelijk beoordelen. Daarna elk checkpoint lokaal opslaan, eigen voortgang registreren en afzonderlijk committen. Geen tussentijdse livepublicaties; één gezamenlijke release na alle checks. Alleen auditdocumentatie is nu gecommit.

| Goal / volgorde | Concrete wijzigingen en betrokken bestanden/templates | Afgerond wanneer |
|---|---|---|
| I1 — Homepage en globale contactherhaling | `src/app/page.tsx`, `src/app/HomeClient.tsx` indien nodig, `src/components/layout/Footer.tsx`, `src/components/layout/Header.tsx` alleen indien linklabel nodig. Goedgekeurde H1/typografie behouden; vier homeclusters met draft, twee projectkaarten, vier bewijsregels, één slot. Compacte footer; availabilitybanner behouden. | Home circa 346 woorden / binnen 334–385; vier expertise-links kloppen; K/C 1/1; footer geen tweede contactknop. Header werk/contact intact; geen algemene fontverkleining. |
| I2 — About | `src/app/about/page.tsx`; geen wijziging aan case-data om About korter te maken. Draft toepassen, één portret, rolstrook/feiten/duplicate expertise samenbrengen; historische lijst en tools. | Circa 382 woorden / binnen 373–430; exacte rol, eigen bijdrage, menselijke AI-review en zeven historische entries aanwezig; één contactlink, geen groot CTA-paneel. |
| I3 — Zes diensten | `src/app/services/page.tsx`, `src/app/services/[slug]/page.tsx`, `src/content/services.ts`. Eén scopeblok uit outcomes/deliverables; drie quickstatkaarten weg; algemene process naar About; voorwaarden zichtbaar/compact; bewijslink zonder dubbele metrics. Hero teruglink als gewone link. | Alle zes oude routes blijven; alle unieke deliverables/voorwaarden uit register teruggevonden. Woorden inclusief volledige antwoorden geteld. Structured data past bij gewijzigde inhoud: FAQPage alleen met overeenkomende zichtbare Q&A, anders verwijderen; Service/Breadcrumb behouden. |
| I4 — Vijf cases | `src/app/case-studies/page.tsx`, `src/app/case-studies/[slug]/page.tsx`, `src/content/caseStudies.ts`; `ArchitectureDiagram.tsx` alleen als toegankelijkheid/plaatsing nodig is. Probleem korter, approach/solution samen, resultaten geïntegreerd; dienst-/vorige-volgende links compact, één contactslot. | Alle vijf eigen bijdragen/grenzen, snapshots, finance-review, read-only renewal en Accountdiagram blijven; geen nieuwe impactcijfers. Account/data-monitoring krijgen benodigde ruimte. |
| I5 — Blogwrapper en gerichte artikelredactie | `src/app/blog/[slug]/page.tsx`, eventueel `src/app/blog/page.tsx`, acht benoemde bestanden in `src/content/blog/`. Eerst generieke CTA verwijderen; daarna artikel voor artikel register volgen en unieke FAQ-antwoorden integreren. Datums/auteur/bronnen/metadata behouden, benodigde claimactualiteit met primaire bronnen controleren. | Acht routes en acht verschillende vragen behouden; geen volledige technische uitleg weggeknipt voor quota. Interne verdiepinglinks werken; metadata en BlogPosting/schema komen overeen met gewijzigde inhoud. Geen SEO-resultaatclaim zonder data. |
| I6 — Contact, tool en goedgekeurde routemerge | `src/app/contact/page.tsx`, `src/app/hubspot-enablement/page.tsx`, `src/app/app-catalog/page.tsx`, `next.config.ts`, `src/app/sitemap.ts`, Footer en eventuele andere interne cataloguslinks. Alleen bij akkoord op variant B: cataloguscontext naar app, één permanente redirect, oude index uit sitemap en de bestaande `/blog`-index toevoegen (die staat nu nog niet in `staticPages`); contactbudgetpresentatie compact, formulierpaneel behouden. | `/app-catalog` één 308 naar `/hubspot-enablement`; 26 canonieke contentroutes. App gratis context/naam/stappen en bestaande installatielink/status blijven. Geen wijzigingen aan `src/app/api/**`, OAuth, cron, Supabase, privétools of formulierbackend; geen live-installatie of echte formulierlead als test. |
| I7 — Gezamenlijke controle en één release | Alle gewijzigde templates/content controleren; `docs/website-improvements/compactness-audit.md` aanvullen met gerealiseerde tellingen/checkresultaten/commitrefs, bestaande voortgangsdocumentatie waar van toepassing. Publicatie pas op afzonderlijke opdracht. | Alle kerncriteria en lokale checks hieronder afgerond, geen onbedoelde bron-/backendwijziging, complete reviewbare diff en releasecommit bekend. Eén deployment met alle geaccepteerde veranderingen en eventueel redirect; daarna HTTP-controle zonder browser. |

Elke Goal begint met het auditdocument en werkt uitsluitend aan zijn rij. I1/I2 kunnen na beoordeling afzonderlijk worden uitgevoerd; I3/I4 gebruiken de nieuwe taakverdeling, I5 de definitieve bewijs-/dienstlinks, I6 de goedgekeurde URL-keuze. I7 wacht op alle voorgaande checkpoints. `CTASection` niet blind globaal versimpelen: callsites bewust verwijderen, component pas opruimen wanneer geen gebruikers overblijven. `ProcessTimeline` blijft nodig voor Slack/overige niet-verplaatste informatie; niet globaal verwijderen omdat diensten hun proces verliezen. Bestaande tone/stijl komt uit huidige bron + goedgekeurde drafts, geen nieuwe skill die extra marketingblokken toevoegt.

#### Blogwerk als kleine, afzonderlijke Goals

I5 is bewust verder opgesplitst: ieder onderdeel krijgt een eigen lokale controle, voortgangsregel en commit. De wrapper kan eerst worden aangepast; artikelredactie volgt daarna zonder tussentijdse deploy. Voorkom dat één Goal alle acht lange artikelen moet herschrijven.

| Subcheckpoint | Scope | Voortgang |
|---|---|---|
| I5a | Blogwrapper: generiek CTA-paneel verwijderen, contextlinks behouden | Niet gestart |
| I5b | App cards guide: types/buildkeuze en korte sunsetlink | Niet gestart |
| I5c | Classic cards sunset: checklist en verwijzing naar kaartguide | Niet gestart |
| I5d | Lifecycle stages: native/eigen automation en unieke FAQ-antwoorden | Niet gestart |
| I5e | Onboarding mistakes: negen fouten/checklist, lifecycleverdieping linken | Niet gestart |
| I5f | Breeze AI: productafwegingen en unieke antwoorden behouden | Niet gestart |
| I5g | Spring 2026 Spotlight: gedateerde releasecontext en guideverwijzingen | Niet gestart |
| I5h | AEO: SMB-keuze/fundamentals met compacte productintro | Niet gestart |
| I5i | Contractor versus agency: samenwerking/kosten/selectievragen | Niet gestart |

I1–I4 en I6–I7 zijn eveneens nog niet gestart: alleen de vier auditcheckpoints zijn voltooid. Gebruik bijvoorbeeld I5b als scope in de onderstaande starttekst en werk na ieder onderdeel de betreffende voortgangsregel bij.

#### Herbruikbare Goal-starttekst

```text
Voer alleen implementatiecheckpoint I[nummer] uit volgens
docs/website-improvements/compactness-audit.md.
Gebruik de goedgekeurde variant [A/B] en voorgestelde copy als basis.
Behoud alle kerncriteria, huidige Engelse toon, homepage-H1 en typografie.
Werk alleen aan de bestanden/scope van dit checkpoint.
Geen Browser-skill of browserchecks; controleer bron en gegenereerde HTML.
Sla lokaal op, voer passende checks uit, tel hoofdtekst/kaarten/CTA's opnieuw,
update de voortgang in het auditdocument en maak één lokale checkpointcommit.
Geen push of deploy. Rapporteer wat is veranderd en welke checks zijn geslaagd.
```

Bij I6 de keuze A/B invullen vóór routewijzigingen; bij I7 expliciete publicatieopdracht nodig om werkelijk live te gaan. Deze template start zelf geen Goal en kent geen impliciete toestemming voor auditvoorstellen.

### Lokale controlecriteria voor de implementatie

1. **Inhoud eerst:** beschermde-kernmatrix en sectieregister afvinken; aan ieder geschrapt/verplaatst uniek gegeven een behoudplek koppelen. Grote claims controleren tegen de oorspronkelijke case. Geen nieuwe cijfers/offering toevoegen.
2. **Metingen:** dezelfde W/K/C-methode opnieuw op gegenereerde HTML, FAQ-antwoorden volledig meetellen, header/footer apart, S/Ka volgens deze definities. Voorstellen in de tabel pas vervangen door “gerealiseerd” na telling. Bij afwijking reden noteren, kern gaat boven budget.
3. **Techniek:** relevante ESLint-check op gewijzigde TS/TSX, TypeScript `npx tsc --noEmit`, daarna `npm run build` met bestaande `validate:tom-plan` en `validate:denise-plan`. Eén volledige build aan einde; per checkpoint passende gerichte checks, niet blind alle checks herhalen zonder nieuwe wijziging. De bestaande hydrated `/private/tmp/hs-website-validation` kan worden gebruikt als iCloud placeholders rootdependencies blokkeren: eerst gewijzigde bronnen/config/lockfile synchroniseren, niet met een oude build succes claimen.
4. **HTML/linkcontrole:** nieuwe productie-HTML inspecteren op H1/koppen, leesbare inhoud/labels, alt/focusmarkup en linkbestemmingen, vier bewijsroutes, huidige casegrenzen en werk/contact. Alle service-/case-/blogslugs blijven statisch genereerbaar; ontbrekende slug geeft 404. HTML bewijst geen echte layout/focusinteractie.
5. **URL/schema:** titel/description/canonical/OG en JSON-LD moeten bij nieuwe inhoud passen. Bij B met lokale productieserver en bijvoorbeeld `curl -I` controleren: oude catalogusroute één 308, Location naar tool, bestemming 200/self-canonical, geen keten; sitemap alle 26 canonieke contentroutes, inclusief de nu ontbrekende `/blog`-index. Installatie-APIroute en status-querycontract blijven byte-voor-byte buiten diff, niet werkelijk autoriseren.
6. **Functionele grenzen:** ContactForm velden/labels/feedback/backend, trackinglabels/events op behouden links, beschikbaarheidsbanner en Slack-statuscomponent behouden. Broncontrole; geen echte lead versturen of Slack-installatie uitvoeren. Als een functie toch verandert, apart testen en de scopewijziging melden.
7. **Release:** schone scope/diff, alle lokale checkpoints/controle-uitkomsten vastgelegd; één gezamenlijke publicatie. Releasecommit en vorige livecommit vastleggen voor rollback. Na deploy HTTP-status/canonical/redirect/content controleren zonder Browser-skill. Geen eerdere 27-route snapshot gebruiken als bewijs voor nieuwe livecode.

Een menselijke beoordeling van localhost kan desgewenst nog layoutfeedback geven, maar wordt hier niet opgelegd als Browser-check of als reeds uitgevoerd genoteerd. Bij probleem met inhoud of techniek: fix en gericht opnieuw controleren vóór gezamenlijke publicatie.

### Uitgevoerde auditchecks en afronding

- Inventory: 27 gegenereerde contentroutes, 6 servicebronnen/FAQ-volumes, 5 cases, 8 artikelen. Volledige URL-mapping dekt exact dezelfde 27 oude routes; voorkeursvariant heeft 26 unieke bestemmingen.
- Sectieadviezen: alle vaste pagina’s, alle dienst-/caseonderdelen via hun expliciete templates en alle artikel-H2’s; acties/bestemmingen gecontroleerd. Na detailcontrole zijn de quickstats in het register gecorrigeerd naar **drie** (deliverables, proces, outcomes).
- Complete copy: zichtbare home/Abouttekst opnieuw geteld met inventarisregex, Markdownlinkdoelen en opmaak uitgesloten; 346/382, binnen doelband. Alle interne links in beide drafts verwijzen naar een bestaande contentroute; vier expertisegebieden/casegrenzen/rol/AI-voorwaarden gecontroleerd.
- Vergelijking: baselinewoorden exact, andere na-volumes expliciet budgetten; secties/kaarten/acties brongeteld versus voorgestelde structuur. Geen grafiek met fictieve bezoekersdata of hoogtemeting.
- Scopebewaking: 81 vastgelegde hashes van bron/config/scripts/migraties en vijf niet-gerelateerde documenten vergeleken; geen verandering. Geen sitebuild nodig voor een uitsluitend documentatie-audit: bestaande gegenereerde HTML was bron-gelijk en is gelezen. Geen browsers, push, deploy of externe applicatiewrites uitgevoerd.
- Vier afzonderlijke lokale documentatiecommits: checkpoint 1 `75cb8b4`, checkpoint 2 `33f8b07`, checkpoint 3 `c8d1de8`, checkpoint 4 de commit die deze sectie toevoegt. Opvragen met `git log -4 --oneline -- docs/website-improvements/compactness-audit.md`.

**Audit afgerond.** Open besluit voor de implementatie: Tom beoordeelt voorkeursvariant B en de Engelse drafts. Daarna kunnen I1–I6 als afzonderlijke Goals worden opgepakt en I7 de gezamenlijke controle/publicatie verzorgen. Tijdens deze audit zijn geen voorgestelde wijzigingen aan de website doorgevoerd.
