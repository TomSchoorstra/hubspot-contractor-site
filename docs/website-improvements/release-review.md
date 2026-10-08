# Lokale release voor review

Datum: 8 oktober 2026. Branch: `feature/website-expertise-refresh`.
Status: checkpoints 2–8 **zelfcontrole afgerond**. Toms acceptatie staat open.
Leidend voortgangsdocument: [plan.md](plan.md).

## Wat je beoordeelt

De website positioneert Tom als **HubSpot & RevOps specialist** voor B2B-teams met een bestaande, complexe HubSpot-omgeving. Vier expertisegebieden lopen door About, cases, diensten en homepage. AI wordt concreet als werkwijze uitgelegd; er zijn geen nieuwe diensten toegevoegd.

| Onderdeel | Resultaat | Lokale commit |
|---|---|---|
| About | AIHR-rol, eigen bijdrage, vier expertisegebieden, praktijklinks en historische certificeringen | `2e2e34f` |
| Account-case | Account-model, eigen projectleadrol, fictief diagram, handmatige AI-review en open enrichment | `0a38251` |
| Data quality + finance | Nieuwe detectiecase met bekende beperkingen; ongefundeerde finance-impactcijfers kwalitatief gemaakt | `07ed704` |
| Bestaande diensten | Alle zes behouden; praktische omschrijving, relevante cases en geverifieerde HubSpot-voorwaarden | `7dabdec` |
| Homepage + gedeelde identiteit | Bewijsgerichte homepage met “See the work”, expertise en consistente profielmetadata/footer | `cf78b20` |
| Artikelbriefings | Drie Engelstalige outlines met fictieve voorbeelden, bronnen, claimgrenzen en bestaande interne links | `4b96b67` |
| Eindcontrole | Metadata/image-erfenis, counters, contrast, linkfocus en reduced-motion fallback gecorrigeerd; dit reviewdocument | Laatste checkpoint-8-commit |

De homepage gebruikt praktijkvoorbeelden als bewijs. De eerdere testimonialsectie is vervangen; geen nieuwe testimonials of effectpercentages geïntroduceerd. De beschikbaarheidsbanner blijft leidend; About beschrijft engagementvormen zonder actuele beschikbaarheid te beloven.

## Handige reviewvolgorde

1. `/` — past de hoofdboodschap, en verwijst de homepage naar het juiste bewijs?
2. `/about` — klopt de formele AIHR-rol en beschrijving van je bijdrage?
3. `/case-studies/customer-lifecycle` — klopt het Account-model en de grens tussen gerealiseerd werk, review en enrichment?
4. `/case-studies/crm-data-quality` — klopt de detectieaanpak met bronactualiteit, validatie en herstel als vervolgstappen?
5. `/case-studies/finance-automation` — past de kwalitatieve beschrijving zonder onbewezen besparingscijfers?
6. `/services` en de zes detailpagina’s — past de omschrijving bij het bestaande aanbod?
7. De drie briefings hieronder — zijn dit de juiste volgende artikelen?

- [Account-based CRM](account-based-crm-brief.md)
- [Datamismatches tussen systemen](data-mismatches-brief.md)
- [AI-ondersteunde accountreviews](ai-quality-reviews-brief.md)

De bestaande cases `/case-studies/renewal-status-card` en `/case-studies/pipeline-consolidation` zijn meegenomen in de gedeelde templatecontrole. Alle bestaande URL’s blijven behouden; alleen de datakwaliteitscase voegt een publieke route toe. De briefings maken geen blogroutes of sitemapvermeldingen aan.

## Uitgevoerde controles

| Controle | Uitkomst |
|---|---|
| `npm run lint` | Geslaagd: 0 fouten, 2 bestaande unused-variable-waarschuwingen in de loopschema-scripts |
| `npx tsc --noEmit` | Geslaagd |
| `NEXT_PUBLIC_SITE_ENV=preview npm run build` | Geslaagd, inclusief beide planvalidaties en 35 gegenereerde pagina’s |
| Gegenereerde HTML | 15 aangepaste pagina’s/templatevarianten: één H1, metadata, canonical, image-alt en geldige JSON-LD |
| Social metadata | Paginaspecifieke Open Graph/Twitter-titels en descriptions; expliciete verwijzing naar `/opengraph-image` |
| Interne links | 323 linkverwijzingen binnen de 15 gecontroleerde pagina’s verwijzen naar bestaande gegenereerde routes |
| Routebehoud en sitemap | 6 diensten, 5 cases en 8 bestaande blogs gegenereerd; gewijzigde routes in sitemap |
| Casecijfers en diagram | Alle vijf cases tonen juiste initiële cijfers; vast leesbaar cijfer voor screenreaders; alleen Account-case heeft fictief diagram |
| Previewanalytics | Preview-HTML zonder GTM; geïsoleerde modulecheck geeft 0 events voor preview/development, verwachte events in production zonder netwerk |
| Statisch contrast | Oranje tekst op lichte achtergrond 5,36:1; teal tekst 5,67:1; witte primaire knoptekst 5,10:1; hover 6,47:1 |
| Focus/reduced motion | Focusstijl voor links; reveal-fallback onder reduced-motion vóór hydration; codecontrole, geen interactietest |
| Scope | Dependency- en deployconfiguratie ongewijzigd; geen push/deploy; niet-gerelateerde documenten behouden |

De oorspronkelijke oranje knopkleur leverde 3,07:1 met wit op. Donkere leesvarianten behouden de oranje/teal-stijl; decoratieve kleuren blijven beschikbaar. Dit is een berekening van gekozen kleurparen, geen volledige audit van elke samengestelde achtergrond of interactieve toestand.

Checks liepen in `/private/tmp/hs-website-validation`, omdat de lokale node_modules gedeeltelijk iCloud-dataless zijn en processen daar vastliepen. De bronkopie gebruikt dezelfde package-lock.json en configuratie. 71 bron/script/migratiebestanden en zes buildinputbestanden zijn byte-voor-byte vergeleken met de opgeslagen websitefolder. Tijdelijke QA-dependencies zijn niet aan dit project toegevoegd.

## Nog niet bevestigd

Op Toms verzoek zijn **geen Browser-skill of browserchecks** gebruikt voor de verdere uitvoering. Mobiele/desktopweergave, tabvolgorde, menu- en accordioninteractie, motion en de daadwerkelijke social-afbeeldingsrendering blijven daardoor onbevestigd. Er is geen volledige toegankelijkheidsaudit uitgevoerd. De bestaande edge-runtime-buildmelding is informatief; de dynamische OG-route is niet visueel getest.

Projectbeschrijvingen berusten op gedateerde lokale documentatie. De website claimt geen onafhankelijk geverifieerde actuele productiestatus. Roltekst en nuance van de cases verdienen daarom Toms inhoudelijke review. Abonnementen en hostingvoorwaarden zijn bij checkpoint 5 met officiële HubSpot-documentatie gecontroleerd; bronlinks staan in [plan.md](plan.md) en waar relevant bij de diensten.

De website-uitvoering heeft niets in ea-claude geschreven. Bij de eindvergelijking bleek het Account-project-README buiten deze uitvoering gewijzigd met een nieuwe MRR-cardsectie. Die externe wijziging is behouden en maakt geen deel uit van de release. De overige gecontroleerde bronnen en niet-gerelateerde documenten zijn gelijk gebleven.

## Lokaal bekijken en volgende stap

De websitebron staat in de huidige folder. Zodra de lokale dependencies volledig beschikbaar zijn, kan Tom de versie zelf starten met:

```sh
NEXT_PUBLIC_SITE_ENV=preview npm run dev
```

De gecontroleerde tijdelijke kopie kan zolang die bestaat ook gestart worden met onderstaande commando’s, elk afzonderlijk:

```sh
cd /private/tmp/hs-website-validation
NEXT_PUBLIC_SITE_ENV=preview npm run start -- --hostname 127.0.0.1 --port 3100
```

Daarna is de lokale versie bereikbaar op `http://127.0.0.1:3100`. De agent heeft hiervoor geen browser geopend. De productiebuild in deze tijdelijke kopie is expliciet als preview gebouwd, zodat lokale beoordeling geen productieanalytics verstuurt.

Tom kan de complete release accepteren of correcties aanwijzen. Na acceptatie is checkpoint 9 een afzonderlijke opdracht: branch pushen, online preview beoordelen en pas na expliciete previewgoedkeuring mergen/deployen. Checkpoint 9 is nu niet gestart.

## Terugvalpunt

- `78749c1`: geaccepteerde inhoudelijke basis vóór de publieke pagina-aanpassingen.
- `d8e6736`: websitebasis vóór de checkpointdocumentatie.
- De zeven uitvoeringscommits van checkpoints 2–8 staan afzonderlijk op de featurebranch. De laatste hash is op te vragen met `git log -1 --format=%h`.
- Er is nog geen productie-release of release-tag. Leg bij checkpoint 9 de daadwerkelijke merge/releasecommit vast.
- Indien na publicatie terugdraaien nodig is: herstel de vorige deployment via de gebruikte hostingflow en revert de releasewijzigingen gericht op de gedeelde branch. Geen geschiedenis herschrijven of niet-gerelateerde bestanden meenemen. Dit is uitsluitend een terugvalbeschrijving; er is niets teruggedraaid.
