# Laatste review vóór publicatie — 22 oktober 2026

Tom accepteerde de compacte vormgeving en vroeg om één kritische feedbackronde vóór publicatie. Tijdens deze controle vroeg hij expliciet om de volledige App Catalog te verwijderen. De objectieve correcties hieronder zijn uitgevoerd; de drie redactionele keuzes zijn nog voorstellen. Geen push of deploy uitgevoerd.

## Uitgevoerd

- App Catalog uit footer en sitemap verwijderd. Catalogus, HubSpot Tips for Slack-pagina, statuscomponent, OAuth/callback-routes, Slack-helper en tipverzendroute verwijderd. `vercel.json` bevat geen cron meer; dit wordt bij publicatie actief. Bestaande externe Slack-installaties, tokens en databasegegevens zijn niet gewijzigd. Gedeelde Supabase-code voor de privé-loopschema’s blijft behouden.
- Portretattributen op Home en About gecorrigeerd naar de echte 512 × 512 verhouding. Een vertraagde afbeeldingstest bevestigt dat de gereserveerde en geladen afmetingen nu gelijk blijven. De visuele uitsnede blijft gelijk.
- Donkerder oranje voor actieve navigatietekst en formulierfouten. Witte kleine bannertekst heeft nu een donkerder achtergrond. Gemeten effen kleurcombinaties: tekst/wit 5,74:1, banner 5,10:1, fouttekst/vlak 5,49:1. Dit is geen volledige toegankelijkheidscertificering.
- Succesmelding contactformulier gebruikt H2 onder de pagina-H1. Formspree-configuratie gedocumenteerd in README en env-voorbeeld.
- Next.js en bijbehorende ESLint-config bijgewerkt van 16.1.6 naar 16.4.2. Overige compatibele securitypatches in lockfile. De verouderde gray-matter-keten vervangen door YAML 2 plus een kleine frontmatter-parser. Alle metadata en de volledige body van elk van de acht MDX-artikelen zijn exact vergeleken met de oorspronkelijke parser: gelijk.

De oorspronkelijke productieaudit meldde 11 dependencybevindingen (1 critical, 6 high, 4 moderate). De bijgewerkte productieboom meldt **0 bekende bevindingen** (`npm audit --omit=dev`, 22 oktober). Dit is geen bewijs dat de site volledig kwetsbaarheidsvrij is of eerder misbruikt werd. Officiële Next-advisories beschrijven onder meer een [AVIF-optimizerprobleem](https://github.com/vercel/next.js/security/advisories/GHSA-2xp9-vwfh-vxw4); de toepasbaarheid hangt af van configuratie en input. Deze site neemt geen willekeurige AVIF-uploads aan. De volledige dependencyaudit houdt vijf high-meldingen over die teruggaan op één ongepatchte `braces`-dependency in ESLint/fast-glob. Dit is ontwikkeltooling, afwezig uit de productieboom; de door npm voorgestelde downgrade naar ESLint-config 14 is niet toegepast.

## Drie voorstellen voor de laatste feedbackronde

1. **De prominente beschikbaarheidsbanner verwijderen.** Nu is “not taking on client projects” de eerste en opvallendste boodschap op iedere pagina. Behoud die informatie op About en Contact, eventueel een rustige korte regel op Home. De banner verschijnt bovendien na hydration; in de lokale vertraagde-laadtest veroorzaakt dat nog een kleine verschuiving. Die labwaarneming is geen veldmeting van Core Web Vitals.
2. **De tweede uitgelichte homepagecase vervangen door de renewal status card.** De huidige twee gaan allebei over CRM/data en hebben relatief abstracte beschrijvingen. De Account-case plus de kleine, zichtbare card laten meer variatie zien. De bestaande card-screenshots ondersteunen het bewijs; geen nieuwe sectie nodig.
3. **About minder uitleg over de wekelijkse AI-review geven.** Codex en Claude Code worden nu in twee opeenvolgende alinea’s genoemd, waarna een operationele toelichting volgt. Kort dit in tot één zin over AI-assisted reviews en verwijs naar de case voor het proces en de grenzen. Behoud de door Tom aangeleverde motivatie, techstackverantwoordelijkheid, toolkit, ornamenten en accreditaties.

Deze keuzes zijn niet stilzwijgend uitgevoerd. Tom beoordeelt ze als de afgesproken laatste feedbackronde. Daarna de gekozen wijzigingen lokaal controleren, publiceren en de live routes verifiëren.

## Verificatie na de updates

[Samenvatting en regressieresultaten](prepublish-preview-2026-10-22/summary.json):

- Productiebuild inclusief TypeScript en beide verplichte loopschema-validators geslaagd. Oude gegenereerde `.next/dev`-types van verwijderde routes gewist in de tijdelijke testkopie vóór de schone build.
- Volledige lint: nul errors, zeven bestaande warnings in vendor-confetti en twee loopschema-validators. Build meldt bestaande deprecation van Edge Runtime; runtime-migratie valt buiten deze correctieronde.
- 25 publieke canonical-pagina’s op 320, 390, 768 en 1440 px: 100 checks, status 200, één H1, logische kopvolgorde, geen overflow of page-errors, geladen beelden met alttekst, Space Grotesk en Geist, unieke titels/beschrijvingen/canonicals, socialmetadata en gerenderde Person-schema’s. Inhoud gelijk over breedtes na normalisatie van presentatiewitruimte.
- Alle 25 interne linkbestemmingen geven 200. Geen catalogus- of enablementlinks. Sitemap bevat 25 URL’s. Beide verwijderde pagina’s, de drie verwijderde endpoints en drie onbekende detailroutes geven 404.
- Mobiel menu: focusbegrenzing, Escape, focusherstel, achtergrondblokkering, sluiten bij desktopresize en navigatie geslaagd. Kernreis van homepage naar case, expertise, About en Contact geslaagd.
- Formulier met onderschepte requests: één start-event, veldfouten en focus, mislukking met behoud van invoer en zonder lead-event, succes met één lead-event en H2. **Geen echte berichten verzonden.** Productie-HTML toont een ingeschakelde verzendknop; inboxaflevering is hiermee niet bewezen.
- Homepage desktop en About mobiel visueel beoordeeld. Foto’s blijven stabiel bij vertraagd laden. Bestaande ornamenten, accreditaties en toolkit behouden.

De actuele lokale preview draait met Next 16.4.2 op poort 3102. Previews zijn geen productiepublicatie. Hosting, echte formulieraflevering en externe analytics worden niet door lokale mocks bewezen.
