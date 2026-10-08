# Typografievoorstel na de livegang

Datum: 8 oktober 2026. Status: lokaal uitgewerkt; nog niet gepusht of gedeployed.

Tom vindt de grote letters te onrustig en vraagt om professionelere typografie die nog speels blijft. De aangeleverde screenshot en lokale fontconfiguratie zijn de basis; geen browser gebruikt.

## Keuze

- Koppen gebruiken Geist in plaats van Syne. Geist wordt al voor de lopende tekst geladen; er is geen nieuw lettertype of dependency nodig. Syne en de bijbehorende fontdownload zijn verwijderd.
- De grote H1-titels gebruiken gewicht 600 in plaats van 800, regelhoogte 1,12 en gebalanceerde regelafbreking. Ook de gedeelde paginakop, About, diensten, cases, contact en blogdetails volgen deze keuze.
- About heeft geen extra grote 72px desktopstap meer; de titel volgt dezelfde maximale schaal als de homepage.
- De speelse uitstraling blijft in de oranje/teal-accenten, het kleurverloop, de afgeronde vormen en het achtergrondpatroon.
- Bodycopy, pagina-inhoud, routes, aanbiedingen en analytics zijn niet gewijzigd. De bestaande OG-afbeelding gebruikt al een afzonderlijke sans-serif en is niet gewijzigd.

## Controle

Lint geslaagd met de twee bestaande loopschema-waarschuwingen. Volledige previewbuild geslaagd, inclusief beide planvalidaties en 35 gegenereerde pagina’s. Standalone TypeScript is na de build opnieuw en succesvol uitgevoerd: de eerste parallelle poging raakte een tijdelijk ontbrekend Next-typebestand tijdens build-regeneratie, geen broncodefout. Gegenereerde HTML van 15 gewijzigde pagina’s/templatevarianten en 323 interne linkverwijzingen opnieuw gecontroleerd. De tijdelijke bronkopie heeft dezelfde bronbestanden, configuratie en lockfile als de websitefolder.

Geen visuele browsercontrole of automatische screenshot gemaakt. De typografische richting is lokaal gereed, maar daadwerkelijke regelafbreking en weergave op verschillende schermen zijn niet visueel bevestigd. Publicatie van deze vervolgcorrectie is nog niet uitgevoerd. De live website blijft op release `6b8d352`.

## Tweede lokale iteratie — directer en iets creatiever

Tom vraagt om iets meer karakter en vindt “A clearer customer picture. Processes that connect.” te marketingachtig. De hero gebruikt nu **“I work on the complicated bits of HubSpot.”** De toelichting benoemt concreet CRM-structuur, workflows, integraties en datakwaliteit bij AIHR. Geen extra resultaatbelofte.

De hoofdregel blijft Geist maar gebruikt gewicht 500. Alleen “of HubSpot.” krijgt een cursieve Georgia/Times-serif in de bestaande donkere oranje accentkleur. Dit geeft de hero een klein redactioneel contrast; overige paginakoppen blijven Geist. Georgia is een systeemfont en vraagt geen extra dependency of externe fontdownload. De brede zware Syne-vormen komen niet terug.

De lokale bronkopie en localhost-versie worden bijgewerkt. Geen browserchecks; geen push of deploy. De oude hero blijft onderdeel van productiebron `6b8d352` tot deze lokale richting apart wordt gepubliceerd.

Controles tweede iteratie: scoped ESLint geslaagd; volledige previewbuild inclusief TypeScript en planvalidaties geslaagd; HTML/linkchecks opnieuw geslaagd voor 15 pagina’s/templatevarianten en 323 linkverwijzingen. Localhost-productieserver opnieuw gestart op poort 3100 met de previewbuild.
