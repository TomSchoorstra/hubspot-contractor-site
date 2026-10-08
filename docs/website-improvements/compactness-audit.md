# Compactness audit — minder herhaling, dezelfde kern

Datum: 8 oktober 2026. Status: auditcheckpoints 1–2 afgerond; 3–4 volgen.
Scope: audit en voorstel, uitsluitend documentatie. Geen websitewijzigingen, verwijderingen, push of deploy.

## Leeswijzer en voortgang

Dit document houdt vier auditcheckpoints bij. De verkorte teksten en toekomstige implementatielijst zijn voorstellen; zij veranderen de live website niet. Tom heeft zowel inkorten als samenvoegen laten onderzoeken.

| Auditcheckpoint | Status | Lokale documentatiecommit |
|---|---|---|
| 1. Inventaris en beschermde kern | Zelfcontrole afgerond | `75cb8b4` |
| 2. Overlap en sectieadviezen | Zelfcontrole afgerond | Deze checkpointcommit; zie git-log |
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
| Elke dienst dezelfde vier processtappen + uitkomstlijst + deliverablelijst + twee tel-statistieken | Scope overlapt; vier stappen zeggen weinig over deze dienst | Outcomes/deliverables één concreet scopeblok; algemene aanpak naar About; tel-statistieken weg. Specifieke voorwaarden blijven. |
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
| Quickstats: deliverable-/procesaantallen | Schrappen | Aantallen voegen geen beslisinformatie toe; echte scope blijft onder What I build. |
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
