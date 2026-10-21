# Marketingaudit website 21 oktober 2026

De website laat Toms HubSpot- en RevOps-expertise overtuigend zien via concrete cases en duidelijke beschrijvingen van zijn eigen bijdrage. De grootste verbeterpunten zitten in de samenhang van het commerciële verhaal, twee onafgewerkte blogs en enkele technische routes. Eerst die punten herstellen; een brede herschrijving van homepage en cases heeft minder prioriteit.

**Vervolgafspraak van 21 oktober 2026:** Tom wil een compacte personal-brandingwebsite met een lichte commerciële laag. De uitvoering volgt het [compacte vervolgplan met checkpoints](compact-vervolgplan-2026-10-21.md). Pas aanbevelingen toe door bestaande inhoud te verduidelijken, in te korten of te vervangen; voeg niet standaard extra marketingblokken toe.

De audit omvat alle **27 publieke pagina's**: acht algemene pagina's inclusief de apppagina's, zes diensten, vijf cases en acht blogs. De live website is uitgelezen en met een aparte Playwright-testsessie gecontroleerd op schermbreedtes van **320, 390 en 1440 pixels**. Lokale code op commit `05d85cc` verklaart de bevindingen; live HTML en browsergedrag bepalen wat daadwerkelijk publiek is.

De aanpak gebruikt Corey Haines' [product-marketing](https://github.com/coreyhaines31/marketingskills/tree/main/skills/product-marketing), [copy-editing](https://github.com/coreyhaines31/marketingskills/tree/main/skills/copy-editing), [cro](https://github.com/coreyhaines31/marketingskills/tree/main/skills/cro) en [seo-audit](https://github.com/coreyhaines31/marketingskills/tree/main/skills/seo-audit). De bestaande positionering uit [het websiteplan](plan.md) is leidend. De aparte beoordeling tegen **Tom Voice volgt hierna**, zoals Tom heeft gevraagd.

## Belangrijkste bevindingen

| Volgorde | Bevinding | Prioriteit | Volgende actie | Inspanning |
|---|---|---|---|---|
| 1 | F02 Schrijfmarkeringen staan zichtbaar in twee live blogs | Hoog | Markeringen vervangen door echte links en gekozen beelden, of verwijderen | Klein |
| 2 | F04 De publieke Slack-installatie mist een app-ID | Hoog | Installatie herstellen en controleren, of aanbod tijdelijk als niet beschikbaar tonen | Klein tot middel |
| 3 | F01 Beschikbaarheidsbanner en commercieel verhaal spreken elkaar tegen | Hoog | Feitelijke beschikbaarheid vaststellen en banner, CTA's en contact daarop afstemmen | Klein, inhoudelijke keuze nodig |
| 4 | F03 Alle canonicals wijzen naar een domeinvariant die doorstuurt | Hoog | Eén voorkeursvariant doorvoeren in redirects, canonicals, sitemap en schema | Klein |
| 5 | F06 Het lifecycle-artikel bevat onjuiste platformuitleg | Hoog | Terugzetten, automatiseringsinstellingen en synchronisatierichting corrigeren | Middel |
| 6 | F05 Het Breeze-artikel scrollt horizontaal op mobiel | Hoog | Schrijfmarkeringen opruimen en lange links afbreekbaar maken | Klein |
| 7 | F07 Blogclaims en ervaringsteksten vragen strengere bewijscontrole | Hoog | Specifieke cijfers en praktijkclaims verifiëren of afzwakken | Middel |
| 8 | F08 Tijdgevoelige artikelen hebben een inhoudelijke update nodig | Middel | Deadlines en actuele adviezen controleren; echte reviewdatum zichtbaar maken | Middel |
| 9 | F11 Formuliermeting mist starters buiten het naamveld | Middel | Start-event op het hele formulier registreren en opnieuw testen | Klein |
| 10 | F12 De primaire knop belooft een afspraak maar opent een contactformulier | Middel | Knop en vervolgstap op elkaar laten aansluiten | Klein |

Prioriteit gaat over de ernst van de waargenomen fout of de aannemelijke hinder. Er is geen conversie- of rankingwinst berekend. Inspanning is een grove implementatie-inschatting.

## Wat al goed aansluit

- De homepage kiest duidelijk voor expertise en praktijkbewijs. “See the work” is een passende primaire actie voor het bestaande portfoliodoel.
- Alle vier expertisegebieden verwijzen naar een relevante case. Diensten en cases linken wederzijds door.
- Cases beschrijven de aanleiding, Toms eigen werk, het gerealiseerde systeem en de grenzen van de oplossing. De nieuwe cases onderscheiden detectie van automatisch herstel.
- De twee gedateerde cases maken openstaand vervolgwerk zichtbaar. Dat is geloofwaardiger dan algemene succesclaims.
- De zes diensten en bestaande URL's vormen een bruikbare structuur. Er is geen reden om op basis van deze audit nieuwe diensten toe te voegen.
- Alle 27 pagina's geven HTTP 200, hebben een unieke titel en beschrijving, en één H1. Alle aangetroffen publieke interne contentlinks komen uit op bereikbare pagina's.
- Alle pagina's zijn binnen maximaal twee links vanaf de homepage te bereiken, inclusief links in header en footer. Er zijn binnen deze inventaris geen verweesde pagina's.
- De gecontroleerde pagina's hebben geen `noindex`-blokkade. Een opzettelijk niet-bestaande URL geeft HTTP 404 met `noindex`.
- Playwright registreerde geen onopgevangen JavaScript-fouten tijdens de ronde over alle 27 pagina's.

## Samenhang en positionering

### F01 Beschikbaarheid is niet eenduidig

**Hoog. Bevestigd in de live browser en lokale code.** Nieuwe bezoekers zien “Not taking on clients just yet, but feel free to have a look around.” Tegelijk toont de header “Plan a call”, presenteren diensten projectaanvragen, vermeldt About projectwerk en retainers en toont Contact budgetten en doorlooptijden.

Een lezer kan daardoor niet goed bepalen of dit een portfolio, toekomstig aanbod of actieve dienstverlening is. De audit stelt niet vast dat de banner onjuist is. Het kan juist de commerciële copy zijn die te ver gaat.

**Actie:** kies de feitelijke situatie. Als het een portfolio is, laat contact vooral kennismaking of inhoudelijke vragen uitnodigen. Als opdrachten mogelijk zijn, beschrijf die beschikbaarheid eerlijk en pas de banner aan. Houd de primaire bewijsroute intact. Bronnen: `src/components/layout/AnnouncementBanner.tsx`, `src/components/layout/Header.tsx`, `src/app/about/page.tsx`, `src/app/contact/page.tsx` en [live screenshot](marketing-audit-2026-10-21/home-desktop.png).

### F09 De bloginsteek is breder dan de specialistische positionering

**Middel. Redactionele beoordeling.** Homepage en cases gaan over bestaande, complexe B2B-omgevingen. Een flink deel van de blogs richt zich op beginnende SMB-gebruikers, algemene AI-productkeuze en contractor versus agency. Deze onderwerpen kunnen een ingang zijn, maar leggen de verbinding met Toms specifieke praktijk niet steeds uit.

**Actie:** behoud waardevolle artikelen en voeg waar relevant een echte caseverbinding toe. Het app-cards-artikel kan direct naar de renewal-case, het lifecycle-artikel naar de pipeline-case en het Breeze-artikel naar de grenzen van de wekelijkse accountreview. Voeg toekomstige inhoud over CRM-modellen, bronconflicten en monitoring toe vanuit de al bestaande artikelbriefings. Het is geen reden om de acht blogs ineens te vervangen. Nieuwe invalshoeken zijn te toetsen hypotheses, geen bewezen zoekvraag.

### F10 De dienstpagina opent met aantallen in plaats van keuzerelevante informatie

**Middel. CRO-hypothese.** De rechterkant van elke dienstenhero toont het aantal deliverables, processtappen en uitkomsten. Dat beschrijft de hoeveelheid tekst, maar helpt beperkt bij de vraag of deze dienst mijn probleem oplost. Bewijs staat pas na uitkomsten, deliverables, proces en FAQ.

**Actie:** vervang de tellers waar nuttig door korte keuze-informatie over passende situaties, een concreet voorbeeld en eventuele platformvereisten. Zet een passende caselink eerder op de pagina. Houd het totale aantal onderdelen gelijk of lager. Maak geen resultaatclaim van de bestaande aantallen. Bron: `src/app/services/[slug]/page.tsx`.

### F16 Sommige beloften zijn algemener dan het bewijs

**Middel. Redactionele beoordeling.** Bij Integrations staat een “single source of truth ... regardless of where it originates”. Bij Pipeline staat “forecasts you can trust”. De gekoppelde cases onderbouwen een overdrachtsproces en betere zichtbaarheid, maar geen algemene datagarantie of gemeten voorspelnauwkeurigheid. De integratie-FAQ belooft bovendien koppeling met “Any tool” met een API; toegangsrechten, limieten en datamodel kunnen dat begrenzen.

**Actie:** beschrijf systeem- of veldverantwoordelijkheid en de concrete verbetering. Formuleer een integratie als iets dat op haalbaarheid wordt beoordeeld. Behoud het onderscheid tussen gerealiseerde technische werking en gewenste zakelijke uitkomst. Bron: `src/content/services.ts`.

## Tekstkwaliteit en inhoudelijk vertrouwen

### F02 Twee blogs bevatten zichtbare productieaanwijzingen

**Hoog. Bevestigd in live HTML en gerenderde browsertekst.** Het contractor-artikel bevat vier `[INTERNAL-LINK: ...]`-markeringen en twee `[IMAGE: ...]`-instructies. Het Breeze-artikel bevat zes linkmarkeringen en drie beeldinstructies. Dat zijn in totaal **15 zichtbare instructies**. De gemarkeerde links zijn geen echte links. De bedoelde foto's worden niet als afbeelding getoond.

**Actie:** werk de verwijzingen af of verwijder de instructies. Voeg alleen beelden toe die inhoudelijk iets uitleggen. Controleer na verwerking tekst, links en mobiele breedte. Bronnen: `src/content/blog/hubspot-contractor-vs-agency.mdx`, `src/content/blog/hubspot-breeze-ai-smb.mdx`, [desktopvoorbeeld](marketing-audit-2026-10-21/contractor-visible-placeholder.png) en [mobielvoorbeeld](marketing-audit-2026-10-21/breeze-mobile-overflow.png).

### F06 Het lifecycle-artikel legt drie belangrijke zaken verkeerd uit

**Hoog. Geverifieerd met actuele primaire documentatie.**

1. De FAQ zegt dat een lifecycle stage niet teruggezet kan worden. HubSpot beschrijft handmatig terugzetten en legt uit dat automatische tools voor een eerdere waarde doorgaans eerst een leegmaakstap nodig hebben. De automatische voorwaartse standaard is geen algemeen verbod op terugzetten.
2. Het artikel stelt dat contactupdates een bedrijf kunnen bijwerken via de lifecycle-syncinstelling. HubSpot beschrijft juist synchronisatie van de primaire **company naar gekoppelde contacts**; een contactupdate werkt de company via die instelling niet bij.
3. “Only three stages” en “everything else requires workflows” is te absoluut. De huidige objectinstellingen laten selecteerbare lifecycle stages en meerdere automatische aanleidingen zien, waaronder het associëren van een lead. Een workflow is één methode, afhankelijk van abonnement en proces.

**Actie:** herschrijf deze passages en bijbehorende FAQ-antwoorden samen; het template neemt FAQ-antwoorden ook op in structured data. Beschrijf handmatig gedrag, standaardautomatisering en workflowgedrag afzonderlijk. Bronnen: [HubSpot lifecycle stages](https://knowledge.hubspot.com/records/use-lifecycle-stages) en [HubSpot lifecycle-automatisering en synchronisatie](https://knowledge.hubspot.com/object-settings/manage-how-lifecycle-stages-sync-between-objects), geraadpleegd 21 oktober 2026.

### F07 Specifieke ervaringsclaims en cijfers missen voldoende controleerbare onderbouwing

**Hoog voor de genoemde voorbeelden.** Het Breeze-artikel noemt onder andere een “40% escalation rate” en concrete ervaring met meerdere klantimplementaties. Het contractor-artikel presenteert 40–60% kostenbesparing voor vergelijkbare projecten. In de lokale websitebronnen staat geen bijbehorende meetperiode, steekproef of primaire onderbouwing voor die precieze claims. Dat bewijst niet dat ze verzonnen zijn; ze mogen wel pas als eigen ervaring of algemeen benchmarkcijfer blijven staan als Tom ze kan staven.

De onboarding-excerpt maakt van “fail to achieve planned objectives” de bredere claim “55% of CRM projects fail”. Hetzelfde artikel beschuldigt bureaus van een financieel motief om over pricing niet te waarschuwen, zonder bewijs. Dat verzwakt de deskundige, feitelijke presentatie.

**Actie:** controleer concrete ervaringsclaims met Tom en maak onderscheid tussen een aantoonbaar praktijkvoorbeeld, persoonlijke inschatting en extern onderzoek. Geef ranges alleen met hun markt, periode en scope. Schrap ongefundeerde motieven van anderen. Een bronlink aan het eind van een alinea onderbouwt niet automatisch alle conclusies in die alinea.

### F08 Tijdgevoelige blogs vragen een inhoudelijke herbeoordeling

**Middel, met hoge actualiteitswaarde voor het sunset-artikel.** Op 21 oktober 2026 verwijst het Spring Spotlight-artikel nog naar “today”, “Worth exploring in Q2” en “August 1 is less than four months away”. Het classic-cards-artikel adviseert testen in september of begin oktober. De artikelen hebben hun oorspronkelijke publicatiedatum; de zichtbare template toont geen aparte laatste inhoudelijke review.

De deadline **31 oktober 2026** voor classic CRM cards is bij HubSpot bevestigd. Die is op de auditdatum nog tien dagen weg. De Projects v2025.1-deadline van **1 augustus 2026** staat ook in de officiële documentatie en ligt inmiddels in het verleden. Het Breeze-artikel noemt als introductie “mid-2025”, terwijl HubSpot Breeze op **18 september 2024** introduceerde.

**Actie:** corrigeer de Breeze-chronologie; geef actuele vervolgstappen bij de deadlines. Een nieuwsartikel mag zijn historische datum behouden, maar maak oud advies herkenbaar en voeg na een echte inhoudelijke controle een reviewdatum toe. Bronnen: [classic-cards-changelog](https://developers.hubspot.com/changelog/deprecating-support-for-classic-crm-cards), [Projects v2025.1-changelog](https://developers.hubspot.com/changelog/upcoming-deprecation-hubspot-projects-v2025-1-aug-1-2026) en [Breeze-introductie](https://www.hubspot.com/company-news/spotlight-product-deep-dive-ai-made-easy-with-breeze-hubspots-new-ai-to-power-the-customer-platform).

### F17 Het AEO-artikel trekt een sterkere conclusie dan de bron

**Middel.** De geciteerde Pew-uitkomsten van 8% en 15% sluiten aan bij het onderzoek, maar de tekst gebruikt die combinatie met HubSpots 27% verkeersdaling als een vastgestelde causale verklaring. Pew onderzocht gedrag van Amerikaanse volwassenen in maart 2025; dat meet niet rechtstreeks waarom het verkeer van HubSpot-klanten daalde.

Daarnaast presenteert het artikel HubSpot AEO vooral als een tool die content automatisch structureert en optimaliseert. De aangehaalde aankondiging beschrijft zichtbaarheid, promptvoorstellen, concurrentievergelijking, citatieanalyse en aanbevelingen. Die aankondiging onderscheidt aanbevelingen van later beschikbare uitvoering.

**Actie:** beperk de conclusie tot wat is waargenomen en controleer de huidige productmogelijkheden voordat een uitvoeringsbelofte wordt opgenomen. Bronnen: [Pew-onderzoek](https://www.pewresearch.org/short-reads/2025/07/22/google-users-are-less-likely-to-click-on-links-when-an-ai-summary-appears-in-the-results/) en [HubSpot AEO-aankondiging](https://www.hubspot.com/company-news/hubspot-aeo).

### Beoordeling met de zeven tekstchecks

| Check uit copy-editing | Oordeel | Onderbouwing |
|---|---|---|
| Helderheid | Sterk bij homepage en cases, wisselend bij blogs | Concrete eigen bijdrage; lifecycle-uitleg vraagt correctie |
| Consistente toon | Deels | Persoonlijke experttekst wisselt met brede bureau- en verkoopclaims; Tom Voice volgt apart |
| Relevantie voor de lezer | Deels | Casetitels beschrijven problemen; sommige diensten leggen vooral de inrichting uit |
| Bewijs | Sterk bij de nieuwe cases, aandacht bij blogclaims | Gedateerde status en scope zijn duidelijk; precieze ervaringscijfers vragen verificatie |
| Concreetheid | Overwegend sterk | Tools, objecten en handelingen zijn benoemd; generieke beloften blijven bij enkele diensten |
| Herkenbaarheid van het probleem | Sterk bij praktijkcases | Ontbrekende koppelingen, herhaalde invoer en onzichtbare context zijn tastbaar |
| Drempels naar een vervolgstap | Deels | Contact heeft verwachtingen, maar beschikbaarheid en “Plan a call” zijn niet consequent |

Deze oordelen zijn redactionele beoordelingen en geen gebruikersmetingen of Google-scores.

## Conversie en functionele werking

### F04 Het publieke Slack-aanbod kan zo niet worden geïnstalleerd

**Hoog. Bevestigd via de publieke redirect en lokale route.** De apppagina belooft “Install once” en een automatische tip op maandag. De installatie-GET-route stuurt door naar Slack met **`client_id=undefined`**. Er is geen geldige appselectie mogelijk met een ontbrekend client-ID. De route vertrouwt op `SLACK_CLIENT_ID` zonder aanwezigheid te controleren.

**Actie:** controleer de productieconfiguratie en de installatiestroom voordat de installatie als beschikbaar wordt aangeboden. Laat de route bij ontbrekende configuratie een begrijpelijke melding geven. Verifieer daarna ook een echte geplande aflevering binnen een toegestane testworkspace. Deze audit heeft geen Slack-app geautoriseerd en geen berichten verstuurd. Bron: `src/app/api/slack/oauth/route.ts`, `/hubspot-enablement` en de GET-redirect van `/api/slack/oauth`.

### F05 Het Breeze-artikel is breder dan het mobiele scherm

**Hoog. Gemeten in de browser.** Bij 390 pixels viewport is de documentbreedte **462 pixels**; bij 320 pixels blijft de documentbreedte **462 pixels**. De ruwe Unsplash- en Pexels-links in de beeldinstructies steken buiten de inhoud. De andere 26 pagina's hadden in deze controle geen horizontale documentoverflow op de drie geteste breedtes.

**Actie:** los F02 op en geef lange URL's een veilige afbreekmogelijkheid. Controleer daarna opnieuw op 320 en 390 pixels. Verberg overflow niet alleen op de body, omdat de inhoud dan afgesneden kan raken. Bewijs: [mobiel screenshot](marketing-audit-2026-10-21/breeze-mobile-overflow.png) en `browser-pages.json` in de bewijsmappen.

### F11 Formulierstart wordt uitsluitend op het naamveld gemeten

**Middel. Gereproduceerd in de browser.** Na eerst het e-mailveld invullen staat het aantal `form_start`-events op nul. Na het naamveld invullen staat het op één. Een bezoeker die via e-mail begint en afhaakt voordat die het naamveld raakt, ontbreekt in de startmeting.

**Actie:** registreer de eerste interactie op formulierniveau, eenmalig per poging of volgens een expliciet gekozen meetdefinitie. Controleer daarna naam-eerst, e-mail-eerst en bericht-eerst. Bron: `src/components/forms/ContactForm.tsx`, `onFocus={handleFocus}` staat alleen op Name.

### F12 De headerknop schept de verkeerde verwachting

**Middel. Bevestigd.** “Plan a call” navigeert naar `/contact`, waar een formulier staat zonder boekingskalender of afspraakselectie. Het label suggereert een directe planningsstap.

**Actie:** gebruik een label dat bij het formulier past, zoals “Get in touch”, of maak pas na een bewuste aanbodkeuze een echte planningsroute. Nieuwe afspraaksoftware is niet nodig om dit tekstprobleem op te lossen. Bronnen: Header en Contact.

### F13 Het formulier kan duidelijker en toegankelijker reageren

**Middel tot laag.** Leeg verzenden toont correct drie veldfouten, maar focus gaat niet naar het eerste ongeldige veld. De visueel verplichte velden hebben geen `required` of `aria-required`; expliciete autocomplete-attributen ontbreken. De minimale berichtlengte van twintig tekens staat pas in de foutmelding. Budget en Timeline zijn technisch optioneel, maar hun labels zeggen dat niet.

**Actie:** maak vereiste en optionele velden programmatisch en tekstueel duidelijk, focus het eerste probleem na verzenden en geef eventuele lengtehulp vooraf. Beoordeel of budget en timing nu al nodig zijn voor het feitelijke contactdoel; zonder uitvaldata is schrappen een hypothese. Behoud naam, e-mail en een inhoudelijke vraag als logisch minimum voor een persoonlijk antwoord.

### F14 Mobiel menu opent en sluit maar de focus verhuist niet mee

**Laag tot middel.** Het menu opent, sluit met Escape en sluit na navigatie. De focus bleef bij openen op de oorspronkelijke “Open menu”-knop achter het paneel. Er is geen dialoogsemantiek of focusbeheer in de component.

**Actie:** bij openen focus naar het paneel of de sluitknop sturen, focus binnen het paneel houden zolang het open is en terugzetten na sluiten. De eerste meting direct na navigatie zag nog de sluitanimatie; na wachten tot de animatie klaar was sloot het menu correct. Er wordt daarom geen blijvend openstaand menu als fout gerapporteerd. Bron: `src/components/layout/Header.tsx`.

### F18 Uitleg over persoonsgegevens ontbreekt bij contact

**Middel als vertrouwensverbetering.** In de publieke navigatie en bij het formulier is geen privacyverklaring of korte uitleg gevonden over de verwerking van inzendingen. Het formulier gebruikt Formspree.

**Actie:** leg kort uit waarvoor de gegevens worden gebruikt en verwijs naar juiste informatie over de daadwerkelijke verwerking. Verzin geen toezegging als “we never share your info” zonder de verwerkingsketen te controleren. Dit is een observatie over transparantie, geen juridisch nalevingsoordeel.

### Geslaagde functionele checks

| Controle | Resultaat |
|---|---|
| Homepage naar cases via primaire CTA | Navigatie en `cta_click` in dataLayer bevestigd |
| Paginawisseling | Nieuwe `page_view` in dataLayer bevestigd |
| Mobiel menu | Openen, sluiten, Escape en sluiten na navigatie bevestigd |
| Dienst-FAQ | Vraag opent en `aria-expanded` wordt `true` |
| Leeg contactformulier | Drie specifieke veldmeldingen |
| Ingesimuleerde serverfout | Foutmelding zichtbaar, ingevulde tekst behouden, geen `generate_lead` |
| Ingesimuleerde successresponse | Bevestiging zichtbaar en één `generate_lead` in dataLayer |
| Contactformulier productieconfiguratie | Geen ontbrekende-endpointmelding; verzendknop actief |

De twee formulierverzoeken zijn lokaal onderschept en met een testresponse beantwoord. Hiermee is de browserafhandeling getest, **niet** de echte aflevering in Formspree of e-mail. Er zijn geen echte testberichten verzonden. De dataLayer-tests bevestigen evenmin ontvangst in GA4 of de configuratie van GTM-tags.

## SEO en zoekpresentatie

### F03 Redirects en canonicals geven tegenstrijdige voorkeuren

**Hoog. Op alle 27 pagina's bevestigd.** `https://tomschoorstra.com` stuurt met HTTP 307 door naar `https://www.tomschoorstra.com/`. Alle gecontroleerde canonicals verwijzen naar de variant zonder `www`. De sitemap en schema-URL's gebruiken eveneens de variant zonder `www`. Daarmee wijzen de signalen verschillende kanten op; dit is geen bewijs dat de site niet geïndexeerd is.

**Actie:** kies één voorkeursvariant. Omdat productie nu op `www` uitkomt, ligt het voor de hand `NEXT_PUBLIC_SITE_URL` en de gerelateerde absolute URL's daarop af te stemmen. Controleer hostingredirects en gebruik voor een permanente voorkeursvariant een passende permanente redirect. Test beide domeinen, HTTP/HTTPS, canonicals, sitemap en schema na afloop samen. Bron: [Google canonicalrichtlijnen](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls), `src/lib/site.ts`, live responseheaders en crawl.

### F15 De blogindex ontbreekt in de sitemap

**Laag.** De acht artikelen staan in de sitemap; `/blog` zelf niet. De index is via de navigatie goed bereikbaar en geeft HTTP 200. Dit blokkeert de ontdekking dus niet, maar de inventaris is onvolledig.

**Actie:** voeg `/blog` toe. Gebruik bij een inhoudelijke artikelupdate een echte `updated`-waarde voor `lastModified`; verander datums niet alleen om versheid te suggereren. Bron: `src/app/sitemap.ts`, live `sitemap.xml`.

### F19 Zeven pagina's missen een afbeelding voor social previews

**Middel voor deelbaarheid.** Geen expliciete `og:image` gevonden op `/contact`, `/app-catalog`, `/hubspot-enablement`, `/blog`, het lifecycle-artikel, Spring Spotlight en onboarding-mistakes. De overige twintig pagina's hebben die wel. Een deelplatform kan zelf een afbeelding kiezen, maar het resultaat is minder voorspelbaar.

**Actie:** geef deze pagina's een bruikbare fallback en behoud waar passend een artikelspecifiek beeld. Werk ook de contact-`og:title` met “HubSpot Contractor” bij als de gekozen profielnaam “HubSpot & RevOps specialist” blijft. Bron: live metadata en `src/app/contact/page.tsx`.

### F20 Enkele titels noemen het onderwerp onvoldoende expliciet

**Laag tot middel.** De titels zijn uniek, maar “Services” en “Custom object development” missen respectievelijk de context van HubSpot-diensten en het platform bij de specifieke dienst. Hetzelfde geldt voor “Pipeline reviews & optimization”. Case- en blogtitels zijn soms lang, maar een vaste tekenlimiet is geen geldige pass/fail-regel.

**Actie:** maak de diensttitel zelfstandig begrijpelijk, bijvoorbeeld “HubSpot custom objects | Tom Schoorstra” en “HubSpot pipeline optimization | Tom Schoorstra”. Houd de persoonlijke homepagekop als redactionele keuze; HubSpot staat daar al in. Bron: [Google title-linkrichtlijnen](https://developers.google.com/search/docs/appearance/title-link).

### F21 Structured data is aanwezig maar kan vollediger

**Laag.** JSON-LD is in de browser aangetroffen en syntactisch parsebaar: Person en ProfessionalService op alle pagina's; Service en FAQPage op diensten; BreadcrumbList op detailpagina's; BlogPosting op alle acht artikelen. De artikelmarkup bevat geen `image`, ook niet bij artikelen met een ingestelde coverafbeelding. De body van blogartikelen toont bovendien geen zichtbare auteurregel met link naar About, terwijl de schema-auteur er wel staat.

**Actie:** neem een inhoudelijk passende afbeelding op waar beschikbaar en toon een compacte auteurregel met een link naar About. Gebruik na echte inhoudelijke updates ook een zichtbare reviewdatum. `image` is een aanbevolen aanvulling, geen ontbrekend verplicht veld: [Google artikelmarkup](https://developers.google.com/search/docs/appearance/structured-data/article).

FAQPage is geen reden om rijkere Google-resultaten te beloven. Google meldt dat FAQ rich results sinds 7 mei 2026 niet meer verschijnen. De aanwezige markup hoeft daarom niet met spoed verwijderd; inhoudelijke antwoorden blijven voor de lezer nuttig. Bron: [Google Search-updates](https://developers.google.com/search/updates), wijziging van 8 mei en documentatie-update van 15 juni 2026.

### F22 Twee apppagina's missen een main landmark

**Laag.** App Catalog en HubSpot Enablement hebben wel een H1 en normale inhoud, maar geen `<main>`. De andere 25 pagina's hebben die landmark wel. Dit is een toegankelijkheids- en consistentieverbetering; de pagina's zijn niet leeg en er wordt geen directe rankingstraf aangenomen.

**Actie:** omhul hun primaire inhoud met één main-element. Bronnen: de twee paginacomponenten en browser-DOM.

### Zoekintentie en beperkt marktbeeld

De diensten hebben ieder een herkenbaar taakgebied. Gebruik onderstaande onderwerpverdeling als start voor een zoekwoordenkaart, niet als claim over gemeten volume of posities:

| Pagina | Primair onderwerp |
|---|---|
| Homepage | Tom Schoorstra, HubSpot & RevOps specialist |
| Consultancy | HubSpot consultancy en portal review |
| Automation | HubSpot workflow automation |
| Integrations | HubSpot integrations, Zapier, Exact, WooCommerce |
| Custom objects | HubSpot custom object development en associations |
| Pipeline optimization | HubSpot pipeline review en optimization |
| Custom app cards | HubSpot app cards en UI extensions |
| Cases | Het concrete probleem en de eigen uitvoering achter de diensten |

Een beperkte openbare vergelijking met [Vorin](https://vorinops.com/) en [Lupo Digital](https://www.lupodigital.com/technical-consulting-services) laat zien dat audit, ontwerp, implementatie en custom objects ook bij andere aanbieders terugkomen. Dat proces alleen is dus geen sterk onderscheid. Toms concrete Account-model, checks op bronactualiteit en uitleg van ontwerpkeuzes bieden een specifieker verhaal. Dit is een vergelijking van openbare propositiepagina's, geen vastgestelde concurrentieranglijst of oordeel over uitvoeringskwaliteit.

De app-cards-guide en het sunset-artikel beantwoorden verschillende vragen en linken al naar elkaar. De twee AI-artikelen en de Spotlight-recap hebben overlap, maar zonder zoekquerydata is niet aangetoond dat ze met elkaar concurreren. Geef elk artikel een eigen doel en link gericht door; voeg ze niet uitsluitend op basis van woordoverlap samen.

## Controle per pagina

F03 geldt voor alle 27 pagina's. De beschikbaarheidsbanner en gedeelde header beïnvloeden eveneens de hele website. Onderstaande tabel benoemt daarom vooral de aanvullende lokale aandachtspunten.

| Pagina | Inhoudelijk oordeel | Gerichte vervolgstap |
|---|---|---|
| `/` | Sterke persoonlijke opening en vier bewijsroutes | Beschikbaarheid verduidelijken; eventueel B2B-doelgroep eerder expliciet maken |
| `/about` | Eigen rol, aanpak en tools zijn concreet | Engagement formats afstemmen op beschikbaarheid; behouden wat al specifiek is |
| `/services` | Zes diensten zijn goed scanbaar | HubSpot explicieter in de titel; keuzes vanuit herkenbare situaties ondersteunen |
| `/case-studies` | Heldere overzichtsroute met vijf cases | Resultaatlabels blijven technisch beschrijven; geen nieuwe effectcijfers toevoegen |
| `/contact` | Duidelijke reactieverwachting en alternatief via LinkedIn | F11–F13, F18–F19; actuele beschikbaarheid en budgetpresentatie afstemmen |
| `/app-catalog` | Duidelijk aanbod, maar afhankelijk van één installatie | F04 herstellen; previewbeeld en main toevoegen |
| `/hubspot-enablement` | Concrete belofte met drie stappen | Eerst installatie verifiëren; claims over automatische aflevering pas daarna bevestigen |
| `/services/automation` | Duidelijke scope en finance-case | Bewijs eerder tonen; reviewpunten aan concreet gebruik koppelen |
| `/services/consultancy` | Goede aansluiting bij complexe bestaande omgevingen | Cliché over een stoffig rapport vervangen door concrete output |
| `/services/integrations` | Tools en implementatieproces zijn duidelijk | “Single source of truth” en “Any tool” begrenzen; titel kan HubSpot explicieter noemen |
| `/services/custom-objects` | Goede verbinding met de Account-case | HubSpot aan titel toevoegen; uitleg wanneer standaardobjecten volstaan behouden |
| `/services/pipeline-optimization` | Praktische inrichting en monitoring | Voorspellingsbelofte afstemmen op bewijs; HubSpot in titel |
| `/services/custom-app-cards` | Relevante case en genuanceerde abonnements-FAQ | Platformafhankelijkheid ook in development-belofte consequent houden |
| `/case-studies/customer-lifecycle` | Sterk: rol, architectuur en wekelijkse review | Snapshotstatus inhoudelijk bevestigen bij volgende update; geen generieke tijdswinst verzinnen |
| `/case-studies/crm-data-quality` | Sterk: detectie, bronactualiteit en herstel onderscheiden | Open member-countvalidatie en status bij volgende update controleren |
| `/case-studies/finance-automation` | Concreet proces en Finance-review behouden | Huidige kwalitatieve resultaten behouden tot meetbewijs beschikbaar is |
| `/case-studies/renewal-status-card` | Duidelijke taak, techniek en read-only grens | Inleiding en aanpak beschrijven de statussen net anders; terminologie gelijk trekken |
| `/case-studies/pipeline-consolidation` | Duidelijk wat één pipeline oplost | Eventuele latere rapportage-uitkomst alleen met bewijs toevoegen |
| `/blog` | Acht artikelen zijn bereikbaar | F15, F19; later expliciete thema's en verbinding met expertise |
| `/blog/hubspot-aeo-smb` | Bruikbare afweging, conclusies soms te stellig | F17; productwerking en causaliteit preciseren |
| `/blog/hubspot-app-cards-guide` | Heldere uitleg en dienstlink | Direct naar renewal-case linken; eigen klantclaims en stellige terugverdienclaim controleren |
| `/blog/hubspot-classic-crm-cards-sunset` | Relevante bevestigde deadline | Advies actualiseren voor 31 oktober; “half-day job” niet als algemene migratiegarantie laten staan |
| `/blog/hubspot-contractor-vs-agency` | Bruikbare keuzevragen, onaffe productie | F02 en F07; eenzijdige claims, ranges en eigen positie controleren |
| `/blog/hubspot-breeze-ai-smb` | Relevante datafundamenten, grootste afwerkprobleem | F02, F05, F07 en F08; introductiedatum en eigen ervaring controleren |
| `/blog/hubspot-lifecycle-stages-setup-guide` | Praktisch onderwerp met belangrijke feitfouten | F06 heeft voorrang op stijl; F19 en auteurpresentatie daarna |
| `/blog/hubspot-spring-2026-spotlight` | Nuttige historische recap | Oude vervolgstappen dateren en actualiseren; F19 |
| `/blog/hubspot-onboarding-mistakes` | Herkenbare problemen, te brede uitspraken | F07: 55%-claim, ongefundeerde bureaumotieven en harde implementatietermijnen controleren |

## Tekstvoorstellen om later te beoordelen

De onderstaande opties verduidelijken boodschap en vervolgstap. Ze zijn geen afgeronde Tom Voice-herschrijving en zijn niet in de website toegepast.

| Plaats | Optie | Reden |
|---|---|---|
| Homepage ondersteunende zin | “I help B2B teams connect customer records, automate handovers and investigate data issues in HubSpot.” | Maakt doelgroep en taken direct expliciet |
| Homepage alternatieve ondersteunende zin | “At AIHR, I design CRM structures, build integrations and check how customer data moves between systems.” | Houdt het praktijkbewijs centraal |
| Primaire bewijsroute | “See the work” behouden, of “Explore the case studies” | Beide sluiten aan op de bewijsroute; wijziging is optioneel |
| Header naar formulier | “Get in touch” of “Talk through your HubSpot setup” | Verwachting sluit beter aan op een formulier |
| Consultancy outcome | “A prioritized list of issues, with a recommendation on what to fix first.” | Beschrijft de concrete output |
| Integrations outcome | “Clear ownership for each field, with documented sync rules between systems.” | Onderbouwbaarder dan een algemene single-source-garantie |
| Pipeline outcome | “Consistent deal stages and reporting that make pipeline progress easier to follow.” | Past bij het getoonde casebewijs |

## Vervolgvolgorde

1. **Publieke fouten herstellen:** de twee blogs afwerken, de Slack-beschikbaarheid rechtzetten, mobiele overflow oplossen en canonical-signalen gelijk trekken. Controleer de betrokken routes opnieuw.
2. **Inhoudelijke betrouwbaarheid herstellen:** lifecycle-uitleg, Breeze-chronologie, ervaringsclaims en verlopen adviezen controleren. Pas bij een werkelijke inhoudelijke wijziging de reviewdatum aan.
3. **Beschikbaarheid en contactdoel kiezen:** het portfoliodoel en eventuele dienstverlening expliciet op elkaar afstemmen. Daarna CTA-tekst, formulier en beschikbaarheidsmelding consequent maken.
4. **Tom Voice-review:** beoordeel de uiteindelijke verbeterlijst en relevante teksten met de bestaande Tom Voice-skill. Behoud sterke persoonlijke passages en pas vooral de gemarkeerde onderdelen aan.
5. **Gerichte verbeteringen testen:** bijvoorbeeld eerder casebewijs op diensten, een explicietere doelgroepzin of een eenvoudiger formulier. Stel eerst een bruikbare meetbasis vast. Zonder voldoende verkeer heeft een formele A/B-test weinig zin; begin dan met kwalitatieve lezersfeedback en een gecontroleerde wijziging.

## Reikwijdte van metingen

Browserchecks gebruiken een geïsoleerde Playwright-sessie zonder persoonlijke browserlogin. Er zijn 81 combinaties van pagina en schermbreedte gecontroleerd. De handmatige functionele controles betreffen de primaire CTA, mobiel menu, één diensten-FAQ en het contactformulier. Er is geen volledige toegankelijkheidscertificering of compatibiliteitsronde over meerdere browserengines uitgevoerd.

Google PageSpeed Insights retourneerde HTTP 429 wegens ontbrekende beschikbare quota. Er is daarom **geen Lighthouse-score of Core Web Vitals-pass/fail** gerapporteerd. De snelle netwerkrequests tijdens de crawl zijn geen vervanging voor een veldmeting van LCP, INP en CLS.

Er zijn geen GSC- of GA4-prestatiecijfers opgehaald. Indexdekking, gekozen Google-canonical, zoekvolumes, posities, backlinks, feitelijke formulieruitval en omzetimpact blijven daardoor buiten de meetconclusies. De audit kan wel concrete HTML-, inhouds- en gebruiksfouten vaststellen. Externe productclaims zijn gericht gecontroleerd op de hierboven genoemde onderwerpen; niet elk getal in alle blogs is volledig gefactcheckt.

De websitecode en publieke teksten zijn tijdens deze audit niet gewijzigd. De vier Corey-skills zijn projectlokaal geïnstalleerd. De gedeelde context staat in `.agents/product-marketing.md`. Rapport en publiek auditbewijs staan naast de bestaande websiteprojectdocumentatie.
