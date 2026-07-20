// Loopschema-app — volledige frontend als string. Wordt geserveerd door
// ./route.ts, dat /*__LOOP_CONFIG__*/ vervangt door window.__LOOP__={...}.
// String.raw houdt alle backslashes (regex \d etc.) intact. De bron bevat
// geen backticks of ${ }, dus dit is veilig.
//
// T.o.v. de originele single-file app is alleen gewijzigd:
//  - opslaglaag: localStorage/Claude -> Supabase-proxy (/api/loopschema)
//  - één persoon per pagina (athlete-switch + rename verwijderd)
//  - auto-pace en handmatig HR-veld toegevoegd
//  - sync-indicator, focus-states, noindex-meta

export const LOOPSCHEMA_HTML = String.raw`<!DOCTYPE html>
<html lang="nl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
<meta name="robots" content="noindex, nofollow">
<title>Route naar 1 november — Halve Marathon</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
  :root{
    --bg:#0E1418; --panel:#161F26; --panel2:#1D2933; --line:#263440;
    --ink:#EDF3F6; --mut:#7E909C; --orange:#FF5A1F; --orange-soft:#FF5A1F26;
    --green:#43C98A; --green-soft:#43C98A22; --amber:#EAB251; --red:#E5484D;
    --r:14px;
  }
  *{box-sizing:border-box; margin:0; padding:0; -webkit-tap-highlight-color:transparent;}
  html{scroll-behavior:smooth;}
  body{
    background:var(--bg); color:var(--ink);
    font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
    font-size:15px; line-height:1.5;
    background-image:radial-gradient(circle at 20% 0%, #16222B 0%, transparent 55%);
    min-height:100vh; padding-bottom:90px;
  }
  .wrap{max-width:680px; margin:0 auto; padding:20px 16px;}
  .disp{font-family:'Barlow Condensed','Inter',sans-serif; text-transform:uppercase; letter-spacing:.04em;}

  /* ---------- header ---------- */
  header{margin-bottom:18px;}
  .eyebrow{color:var(--orange); font-weight:600; font-size:13px; letter-spacing:.14em;}
  h1{font-family:'Barlow Condensed',sans-serif; font-weight:700; font-size:42px; line-height:1; text-transform:uppercase; letter-spacing:.02em; margin:4px 0 2px;}
  .sub{color:var(--mut); font-size:13.5px;}

  /* ---------- route signature ---------- */
  .route-card{background:var(--panel); border:1px solid var(--line); border-radius:var(--r); padding:16px 16px 10px; margin:14px 0;}
  .route-head{display:flex; justify-content:space-between; align-items:baseline; margin-bottom:4px;}
  .route-head .disp{font-size:17px; font-weight:600; color:var(--ink);}
  .route-head span:last-child{color:var(--mut); font-size:12.5px;}
  svg.route{width:100%; height:auto; display:block;}
  .route-legend{display:flex; justify-content:space-between; color:var(--mut); font-size:11.5px; margin-top:2px;}

  /* ---------- stats ---------- */
  .stats{display:grid; grid-template-columns:repeat(4,1fr); gap:8px; margin:14px 0;}
  .stat{background:var(--panel); border:1px solid var(--line); border-radius:12px; padding:10px 6px; text-align:center;}
  .stat .v{font-family:'Barlow Condensed'; font-size:26px; font-weight:700; line-height:1.05;}
  .stat .l{color:var(--mut); font-size:10.5px; letter-spacing:.05em; text-transform:uppercase; margin-top:2px;}
  .ham-dots{display:flex; gap:4px; justify-content:center; padding-top:8px;}
  .ham-dots i{width:10px; height:10px; border-radius:50%; background:var(--line); display:inline-block;}
  .ham-dots i.g{background:var(--green);} .ham-dots i.a{background:var(--amber);} .ham-dots i.r{background:var(--red);}

  /* ---------- zones ---------- */
  .card{background:var(--panel); border:1px solid var(--line); border-radius:var(--r); padding:16px; margin:14px 0;}
  .card h2{font-family:'Barlow Condensed'; font-size:20px; font-weight:600; text-transform:uppercase; letter-spacing:.05em; margin-bottom:10px;}
  .zones{display:grid; gap:7px;}
  .zone{display:flex; justify-content:space-between; align-items:center; font-size:14px; padding:7px 10px; border-radius:9px; background:var(--panel2);}
  .zone b{font-weight:600;}
  .zone .p{font-family:'Barlow Condensed'; font-size:18px; font-weight:600; color:var(--orange); letter-spacing:.03em;}
  .note{color:var(--mut); font-size:12.5px; margin-top:10px; line-height:1.55;}
  .note b{color:var(--amber); font-weight:600;}

  /* ---------- weeks ---------- */
  .fase-label{margin:22px 0 8px; color:var(--mut); font-size:12px; letter-spacing:.16em; text-transform:uppercase; font-weight:600; display:flex; align-items:center; gap:10px;}
  .fase-label::after{content:""; flex:1; height:1px; background:var(--line);}
  details.week{background:var(--panel); border:1px solid var(--line); border-radius:var(--r); margin-bottom:10px; overflow:hidden;}
  details.week[open]{border-color:#33455470;}
  details.week.current{border-color:var(--orange);}
  summary{list-style:none; display:flex; align-items:center; gap:12px; padding:13px 14px; cursor:pointer;}
  summary::-webkit-details-marker{display:none;}
  .wk-num{font-family:'Barlow Condensed'; font-size:26px; font-weight:700; color:var(--ink); min-width:64px; line-height:1;}
  .wk-num small{display:block; font-size:10px; color:var(--mut); font-family:'Inter'; text-transform:uppercase; letter-spacing:.08em; font-weight:600;}
  .wk-meta{flex:1; min-width:0;}
  .wk-meta .t{font-size:13.5px; font-weight:600;}
  .wk-meta .d{font-size:12px; color:var(--mut);}
  .wk-prog{font-family:'Barlow Condensed'; font-size:18px; font-weight:600; color:var(--mut); white-space:nowrap;}
  .wk-prog.done{color:var(--green);}
  .wk-body{padding:0 14px 14px; display:grid; gap:8px;}
  .wk-focus{font-size:12.5px; color:var(--mut); background:var(--panel2); border-radius:9px; padding:9px 11px; line-height:1.5;}

  .sess{display:flex; align-items:center; gap:11px; background:var(--panel2); border:1px solid transparent; border-radius:11px; padding:11px 12px; cursor:pointer;}
  .sess.done{border-color:var(--green); background:var(--green-soft);}
  .sess .chk{width:24px; height:24px; border-radius:50%; border:2px solid var(--mut); flex-shrink:0; display:flex; align-items:center; justify-content:center; font-size:13px;}
  .sess.done .chk{border-color:var(--green); background:var(--green); color:#0E1418; font-weight:700;}
  .sess .info{flex:1; min-width:0;}
  .sess .name{font-weight:600; font-size:14px;}
  .sess .det{font-size:12px; color:var(--mut); line-height:1.45;}
  .sess .km{font-family:'Barlow Condensed'; font-size:24px; font-weight:700; color:var(--orange); white-space:nowrap;}
  .sess.race .km{color:var(--amber);}
  .sess .logged{font-size:11px; color:var(--green); font-weight:600;}
  .tag{display:inline-block; font-size:10px; font-weight:700; letter-spacing:.06em; text-transform:uppercase; padding:2px 7px; border-radius:20px; margin-left:6px; vertical-align:2px;}
  .tag.q{background:var(--orange-soft); color:var(--orange);}
  .tag.l{background:#3B82F626; color:#7EB3F8;}
  .tag.r{background:#EAB25126; color:var(--amber);}
  .kracht{display:flex; gap:8px;}
  .kracht .sess{flex:1; padding:9px 11px;}
  .kracht .name{font-size:12.5px;}

  /* ---------- weekly bars ---------- */
  .bars{display:flex; align-items:flex-end; gap:4px; height:110px; padding-top:8px;}
  .bar{flex:1; display:flex; flex-direction:column; justify-content:flex-end; align-items:center; gap:4px; height:100%;}
  .bar .stack{width:100%; max-width:26px; display:flex; flex-direction:column; justify-content:flex-end; height:100%; border-radius:5px 5px 2px 2px; background:var(--panel2); overflow:hidden; position:relative;}
  .bar .fill{width:100%; background:var(--orange); border-radius:5px 5px 0 0;}
  .bar .lbl{font-size:9.5px; color:var(--mut);}

  /* ---------- modal / bottom sheet ---------- */
  .overlay{position:fixed; inset:0; background:#000A; display:none; z-index:40;}
  .overlay.on{display:block;}
  .sheet{position:fixed; left:0; right:0; bottom:0; z-index:50; background:var(--panel); border-radius:20px 20px 0 0; border-top:1px solid var(--line); padding:20px 18px calc(20px + env(safe-area-inset-bottom)); transform:translateY(105%); transition:transform .25s ease; max-width:680px; margin:0 auto; max-height:88vh; overflow-y:auto;}
  .sheet.on{transform:translateY(0);}
  .sheet h3{font-family:'Barlow Condensed'; font-size:24px; font-weight:700; text-transform:uppercase; letter-spacing:.03em;}
  .sheet .sd{color:var(--mut); font-size:13px; margin:2px 0 16px;}
  .frow{margin-bottom:14px;}
  .frow label{display:block; font-size:12px; font-weight:600; color:var(--mut); text-transform:uppercase; letter-spacing:.07em; margin-bottom:6px;}
  .frow input[type=text], .frow input[type=number], .frow textarea{
    width:100%; background:var(--panel2); border:1px solid var(--line); border-radius:10px;
    color:var(--ink); font-family:'Inter'; font-size:16px; padding:11px 12px; outline:none;
  }
  .frow input:focus, .frow textarea:focus{border-color:var(--orange);}
  .pace-live{color:var(--orange); font-family:'Barlow Condensed'; font-size:16px; font-weight:600; letter-spacing:.03em; margin-top:-8px; margin-bottom:14px; min-height:18px;}
  .pill-row{display:flex; gap:7px;}
  .pill-row button{flex:1; padding:11px 6px; border-radius:10px; border:1px solid var(--line); background:var(--panel2); color:var(--mut); font-size:13px; font-weight:600; cursor:pointer;}
  .pill-row button.sel{border-color:var(--orange); color:var(--ink); background:var(--orange-soft);}
  .pill-row.ham button.sel[data-v="goed"]{border-color:var(--green); background:var(--green-soft);}
  .pill-row.ham button.sel[data-v="licht"]{border-color:var(--amber); background:#EAB25122;}
  .pill-row.ham button.sel[data-v="erger"]{border-color:var(--red); background:#E5484D22;}
  .feel-row button{font-size:20px;}
  .btns{display:flex; gap:9px; margin-top:18px;}
  .btn{flex:1; padding:14px; border-radius:12px; border:none; font-family:'Barlow Condensed'; font-size:19px; font-weight:700; text-transform:uppercase; letter-spacing:.05em; cursor:pointer;}
  .btn.pri{background:var(--orange); color:#10100E;}
  .btn.ghost{background:var(--panel2); color:var(--mut); border:1px solid var(--line); flex:0 0 auto; padding:14px 16px;}
  .btn.danger{background:none; border:1px solid var(--line); color:var(--red); flex:0 0 auto; padding:14px 16px; font-size:15px; font-family:'Inter'; font-weight:600; text-transform:none;}
  .warn-box{display:none; background:#E5484D1A; border:1px solid #E5484D55; color:#F1A3A8; border-radius:10px; padding:10px 12px; font-size:12.5px; margin-bottom:14px; line-height:1.5;}
  .warn-box.on{display:block;}

  /* ---------- footer ---------- */
  .foot{margin-top:24px; text-align:center;}
  .foot .storage-mode{font-size:11.5px; color:var(--mut);}
  .foot .exp{display:flex; gap:8px; justify-content:center; margin-top:10px;}
  .foot .exp button{background:var(--panel); border:1px solid var(--line); color:var(--mut); font-size:12.5px; padding:8px 14px; border-radius:9px; cursor:pointer;}
  .toast{position:fixed; bottom:24px; left:50%; transform:translateX(-50%) translateY(80px); background:var(--ink); color:var(--bg); padding:10px 18px; border-radius:30px; font-size:13.5px; font-weight:600; transition:transform .25s; z-index:60;}
  .toast.on{transform:translateX(-50%) translateY(0);}
  textarea.io{min-height:140px; font-size:12px !important; font-family:monospace !important;}
  :focus-visible{outline:2px solid var(--orange); outline-offset:2px; border-radius:8px;}
  @media (prefers-reduced-motion: reduce){ *{transition:none !important;} }
  @media (max-width:380px){ .stats{grid-template-columns:repeat(2,1fr);} h1{font-size:36px;} }
</style>
</head>
<body>
<div class="wrap">

  <header>
    <div class="eyebrow disp">Halve marathon · 1 november 2026</div>
    <h1>Route naar 1 nov</h1>
    <div class="sub" id="countdown"></div>
  </header>

  <!-- signature: route progress -->
  <div class="route-card">
    <div class="route-head">
      <span class="disp" id="routeTitle">De route</span>
      <span id="routeKm"></span>
    </div>
    <svg class="route" viewBox="0 0 600 120" aria-hidden="true">
      <path id="routeBg" d="M20,95 C90,95 90,30 170,30 C250,30 240,90 320,90 C400,90 390,25 470,25 C520,25 545,55 560,60"
            fill="none" stroke="#263440" stroke-width="7" stroke-linecap="round" stroke-dasharray="1 14"/>
      <path id="routeFill" d="M20,95 C90,95 90,30 170,30 C250,30 240,90 320,90 C400,90 390,25 470,25 C520,25 545,55 560,60"
            fill="none" stroke="#FF5A1F" stroke-width="7" stroke-linecap="round"/>
      <circle id="routeDot" r="9" fill="#FF5A1F" stroke="#0E1418" stroke-width="3"/>
      <g transform="translate(560,60)">
        <line x1="0" y1="0" x2="0" y2="-26" stroke="#EDF3F6" stroke-width="2.5"/>
        <path d="M0,-26 L18,-21 L0,-16 Z" fill="#EAB251"/>
      </g>
    </svg>
    <div class="route-legend"><span>start · 13 juli</span><span>finish · 1 nov</span></div>
  </div>

  <div class="stats">
    <div class="stat"><div class="v" id="stWeeks">–</div><div class="l">weken te gaan</div></div>
    <div class="stat"><div class="v" id="stKm">0</div><div class="l">km gelopen</div></div>
    <div class="stat"><div class="v" id="stSess">0%</div><div class="l">sessies klaar</div></div>
    <div class="stat"><div class="ham-dots" id="stHam"><i></i><i></i><i></i></div><div class="l" id="stHamLbl">hamstring</div></div>
  </div>

  <div class="card" id="zonesCard">
    <h2 id="zonesTitle">Tempo-zones</h2>
    <div class="zones" id="zonesList"></div>
    <div class="note" id="zonesNote"></div>
  </div>

  <div class="card">
    <h2>Weekvolume (gepland vs. gelopen)</h2>
    <div class="bars" id="bars"></div>
  </div>

  <div id="weeks"></div>

  <div class="foot">
    <div class="storage-mode" id="storageMode"></div>
    <div class="exp">
      <button id="exportBtn">Data exporteren</button>
      <button id="importBtn">Data importeren</button>
    </div>
  </div>
</div>

<!-- log sheet -->
<div class="overlay" id="overlay"></div>
<div class="sheet" id="sheet">
  <h3 id="shTitle"></h3>
  <div class="sd" id="shDesc"></div>
  <div class="warn-box" id="hamWarn"><b>Let op:</b> hamstring verergerd. Advies: sla de volgende kwaliteitssessie over, houd alles rustig en bespreek dit met je fysio voordat je opbouwt.</div>
  <div class="frow" id="rowDist"><label>Afstand (km)</label><input type="number" step="0.01" inputmode="decimal" id="inDist" placeholder="bijv. 6.4"></div>
  <div class="frow" id="rowTime"><label>Tijd (mm:ss of u:mm:ss)</label><input type="text" inputmode="numeric" id="inTime" placeholder="bijv. 38:04"></div>
  <div class="pace-live" id="paceLive"></div>
  <div class="frow" id="rowHr"><label>Gem. hartslag (optioneel)</label><input type="number" step="1" inputmode="numeric" id="inHr" placeholder="bijv. 156"></div>
  <div class="frow"><label>Hoe voelde het?</label>
    <div class="pill-row feel-row" id="inFeel">
      <button data-v="1">😖</button><button data-v="2">😕</button><button data-v="3">🙂</button><button data-v="4">😄</button><button data-v="5">🚀</button>
    </div>
  </div>
  <div class="frow" id="rowHam"><label>Hamstring-check</label>
    <div class="pill-row ham" id="inHam">
      <button data-v="goed">✅ Goed</button><button data-v="licht">⚠️ Licht gevoel</button><button data-v="erger">🔴 Verergerd</button>
    </div>
  </div>
  <div class="frow"><label>Notitie</label><textarea id="inNote" rows="2" placeholder="optioneel"></textarea></div>
  <div class="btns">
    <button class="btn danger" id="btnClear">Wis</button>
    <button class="btn ghost" id="btnCancel">Sluit</button>
    <button class="btn pri" id="btnSave">Opslaan ✓</button>
  </div>
</div>

<!-- export/import sheet -->
<div class="sheet" id="ioSheet">
  <h3 id="ioTitle">Data</h3>
  <div class="sd" id="ioDesc"></div>
  <div class="frow"><textarea class="io" id="ioText"></textarea></div>
  <div class="btns">
    <button class="btn ghost" id="ioCancel">Sluit</button>
    <button class="btn pri" id="ioAction">Kopieer</button>
  </div>
</div>

<div class="toast" id="toast"></div>

<script>
/*__LOOP_CONFIG__*/
const LOOP = (typeof window !== "undefined" && window.__LOOP__) || {apiKey:"", name:"", hamstring:false, zones:"partner", rowId:"denise"};

/* ================= PLAN DATA ================= */
const RACE_DATE = new Date(2026,10,1);
const START_DATE = new Date(2026,6,13); // ma 13 juli, week 1

const ZONES_TOM = [
  {n:"Rustig / long run", p:"6:45–7:15", d:"praattempo"},
  {n:"Vlot duurloop", p:"6:15–6:40", d:"stevig maar comfortabel"},
  {n:"Racetempo (doel ± 2:20)", p:"6:35–6:45", d:"halve-marathontempo"},
  {n:"Tempo", p:"5:45–6:00", d:"pittig, gecontroleerd"},
  {n:"Interval / strides", p:"5:25–5:40", d:"korte snelle stukken"}
];

// type: e=rustig, q=kwaliteit, l=long, t=test, r=race
const PLAN = [
 {w:1, fase:"Basis", focus:"Startweek (al onderweg!). Alles op praattempo — echt rustig. Hamstring-check na elke run. Fysio-oefeningen zijn leidend. 2 runs deze week is ook prima.",
  runs:[{t:"e",km:4,n:"Rustige run"},{t:"e",km:5,n:"Rustige run"},{t:"l",km:6,n:"Duurloop"}]},
 {w:2, fase:"Basis", focus:"Frequentie naar vast 3× per week. Zelfde opzet, iets langer. Blijft de hamstring 'licht' of beter? Dan door.",
  runs:[{t:"e",km:4,n:"Rustige run"},{t:"e",km:5,n:"Rustige run"},{t:"l",km:7,n:"Duurloop"}]},
 {w:3, fase:"Basis", focus:"Rustig doorbouwen. Nog steeds alles op praattempo.",
  runs:[{t:"e",km:5,n:"Rustige run"},{t:"e",km:6,n:"Rustige run"},{t:"l",km:8,n:"Duurloop"}]},
 {w:4, fase:"Basis", focus:"Laatste opbouwweek van de basisfase. Extra basisweek = extra fundament voor de hamstring.",
  runs:[{t:"e",km:5,n:"Rustige run"},{t:"e",km:6,n:"Rustige run"},{t:"l",km:9,n:"Duurloop"}]},
 {w:5, fase:"Basis", herstel:true, focus:"Herstelweek — volume bewust omlaag. Herstel is waar de aanpassing gebeurt.",
  runs:[{t:"e",km:4,n:"Rustige run"},{t:"e",km:4,n:"Rustige run"},{t:"l",km:6,n:"Duurloop"}]},
 {w:6, fase:"Opbouw", focus:"Eerste snelheidsprikkel — alléén als de hamstring-trend groen is. Zo niet: strides overslaan, run gewoon rustig uitlopen.",
  runs:[{t:"e",km:5,n:"Rustige run"},{t:"q",km:6,n:"Rustig + strides",d:"Rustige run, laatste 2 km: 6× 20 sec vlot (strides) met 1 min dribbel ertussen"},{t:"l",km:10,n:"Duurloop"}]},
 {w:7, fase:"Opbouw", focus:"Eerste echte tempoblokken. Gecontroleerd — je moet het gevoel hebben dat je er nog één zou kunnen.",
  runs:[{t:"e",km:5,n:"Rustige run"},{t:"q",km:6,n:"Tempo 3× 5 min",d:"Inlopen, 3× 5 min @ 5:45–6:00 met 2–3 min dribbel, uitlopen"},{t:"l",km:11,n:"Duurloop"}]},
 {w:8, fase:"Opbouw", focus:"Testweek: de 5k-test bepaalt je definitieve streeftijd en zones.",
  runs:[{t:"e",km:5,n:"Rustige run"},{t:"t",km:8,n:"5K-TEST",d:"2 km inlopen · 5 km vlak-uit maar gelijkmatig · 1 km uitlopen. Noteer de 5k-tijd in de log!"},{t:"l",km:12,n:"Duurloop"}]},
 {w:9, fase:"Opbouw", focus:"Laatste week vóór de vakantie — hier piek je bewust. De long run van 14 km is je fundament voor na de trip. Neem water/gelletje mee.",
  runs:[{t:"e",km:6,n:"Rustige run"},{t:"q",km:7,n:"Tempo 2× 10 min",d:"Inlopen, 2× 10 min @ 5:45–6:00 met 3 min dribbel, uitlopen"},{t:"l",km:14,n:"Duurloop"}]},
 {w:10, fase:"Vakantie", focus:"Kirgizië! Hiken telt volop mee als training — veel uren op de benen is precies wat een halve-marathonloper nodig heeft. Vink je hikes af, afstand invullen mag.",
  runs:[{t:"h",km:0,n:"Hike / actieve dag"},{t:"h",km:0,n:"Hike / actieve dag"},{t:"h",km:0,n:"Lange hike"}]},
 {w:11, fase:"Vakantie", focus:"Genieten en bewegen. Lukt er tóch ergens een rustig rondje hardlopen (20-30 min), mooi meegenomen — maar niets moet.",
  runs:[{t:"h",km:0,n:"Hike / actieve dag"},{t:"h",km:0,n:"Hike / actieve dag"},{t:"h",km:0,n:"Lange hike"}]},
 {w:12, fase:"Herstart", focus:"Terug op 1 oktober. Na 2,5 week niet gelopen: start écht rustig, korter en langzamer dan je denkt te kunnen. Hamstring-check extra serieus nemen deze week.",
  runs:[{t:"h",km:0,n:"Laatste vakantiedagen"},{t:"e",km:4,n:"Herstart-run",d:"Kort en heel rustig — voelen hoe de benen erbij staan"},{t:"e",km:5,n:"Rustige run"}]},
 {w:13, fase:"Herstart", focus:"Loopritme terug opbouwen. De hike-basis merk je nu: conditie is er, de benen moeten weer wennen aan de klappen.",
  runs:[{t:"e",km:5,n:"Rustige run"},{t:"q",km:6,n:"Rustig + strides",d:"Rustige run, laatste 2 km: 6× 20 sec vlot met 1 min dribbel"},{t:"l",km:12,n:"Duurloop"}]},
 {w:14, fase:"Piek", focus:"Piekweek: de langste run van het schema. Laatste 3 km op racetempo als het goed voelt. Test je race-ontbijt en gelletjes op deze long run.",
  runs:[{t:"e",km:6,n:"Rustige run"},{t:"q",km:7,n:"Racetempo 2× 3 km",d:"Inlopen, 2× 3 km @ racetempo (± 6:40) met 3 min dribbel, uitlopen"},{t:"l",km:16,n:"Duurloop — langste!"}]},
 {w:15, fase:"Taper", focus:"Taper: volume flink omlaag, beetje intensiteit erin houden. Je wordt hier fitter zonder te trainen — vertrouw het.",
  runs:[{t:"e",km:5,n:"Rustige run"},{t:"q",km:6,n:"Racetempo 2× 2 km",d:"Inlopen, 2× 2 km @ racetempo, uitlopen"},{t:"l",km:10,n:"Duurloop"}]},
 {w:16, fase:"Race", focus:"Raceweek! Alles kort en fris. Niets nieuws op racedag: geen nieuwe schoenen, geen nieuw ontbijt. Start rustig — de eerste 5 km moeten te langzaam voelen.",
  runs:[{t:"e",km:4,n:"Rustige run"},{t:"q",km:5,n:"Opfrisser 3× 1 km",d:"3× 1 km @ racetempo + paar strides, verder heel rustig"},{t:"r",km:21.1,n:"🏁 HALVE MARATHON"}]}
];
const KRACHT = "Hamstring-kracht (fysio-oefeningen · later Nordic curls, single-leg bridge, hip thrust)";
const TYPE_META = {e:{tag:null}, q:{tag:["KWALITEIT","q"]}, l:{tag:["LONG RUN","l"]}, t:{tag:["TEST","q"]}, r:{tag:["RACE","r"]}, h:{tag:["VAKANTIE","l"]}};

/* ================= SEED (startdata per persoon — ingebakken) ================= */
const SEED_TOM = {athletes:{
  a:{name:"Tom", logs:{
    "w1r1": {done:true, note:"Gelopen op ma 13 juli (geen data gedeeld).", ts:1752400800000},
    "w1r3": {done:true, dist:6.26, time:"41:25", feel:3, ham:"licht",
      note:"COACH: te snel voor een rustige run — gem. 6:36 (doel 6:45–7:15), HR gem. 176 / max 190, laatste km 6:11. Sterk uitgelopen, nul pauzes. Volgende run: starten op 7:00–7:15 en HR onder ~160 houden. Hamstring rustig; wel linkerheup wat stijf/gevoelig (zelfde kant) — monitoren en melden bij fysio. Conditioneel zwaar na 6 wk weinig lopen: logisch op dit tempo.", ts:1752924300000},
    "w2r1": {done:true, dist:4.27, time:"31:01", feel:3, ham:"goed",
      note:"COACH: loopband, 8,3 km/u @ 1,7% helling = gem. 7:16/km. Kalibratie-run: HR gem. 156 / max 170 — ~20 slagen lager dan de veldrun (176/190). Bewijst dat rustig tempo veel beter zit. Heup/hamstring: nergens last gehad — vlakke bandondergrond beviel goed. NB: Fitbit-afstand onbruikbaar op de band (gokte 4,57 km); bandwaarde 4,27 km aangehouden. Dag na de long run, dus HR licht verhoogd door restvermoeidheid.", ts:1753027260000}
  }}
}};
const SEED_DENISE = {athletes:{ a:{name:"Denise <3", logs:{}} }};

function baseSeed(){
  const s = LOOP.rowId === "tom" ? SEED_TOM : SEED_DENISE;
  const out = JSON.parse(JSON.stringify(s));
  out.athletes.a.name = LOOP.name || out.athletes.a.name;
  return out;
}
function mergeSeed(stored){
  const out = baseSeed();
  if(stored && stored.athletes && stored.athletes.a){
    if(stored.athletes.a.name) out.athletes.a.name = stored.athletes.a.name;
    Object.assign(out.athletes.a.logs, stored.athletes.a.logs || {});
  }
  return out;
}

/* ================= STORAGE LAYER (Supabase via serverless proxy) ================= */
const API = "/api/loopschema";
const CACHE_KEY = "hm-" + LOOP.rowId;
let lastSynced = null;
let dbStatus = "unknown"; // "unknown" | "empty" | "row" — of de DB al een rij had

function readCache(){
  try{ const c = localStorage.getItem(CACHE_KEY); if(c) return JSON.parse(c); }catch(e){}
  return null;
}
function cachedOrSeed(){
  const c = readCache();
  return mergeSeed(c);
}
async function loadState(){
  try{
    const res = await fetch(API + "?key=" + encodeURIComponent(LOOP.apiKey), {cache:"no-store"});
    if(res.ok){
      const j = await res.json();
      lastSynced = Date.now();
      if(j && j.data){
        dbStatus = "row";
        try{ localStorage.setItem(CACHE_KEY, JSON.stringify(j.data)); }catch(e){}
        return mergeSeed(j.data);
      }
      // DB heeft nog geen rij. Gebruik de lokale cache als die er is (offline-first):
      // zo blijven runs die zónder DB-verbinding gelogd zijn behouden en worden ze
      // straks bij de eerste succesvolle verbinding omhoog gesynct (zie init).
      dbStatus = "empty";
      const c = readCache();
      if(c) return mergeSeed(c);
      return mergeSeed(null);
    }
  }catch(e){ /* offline / netwerk — val terug op cache */ }
  return cachedOrSeed();
}
let saveTimer=null, retryTimer=null;
function saveState(){
  try{ localStorage.setItem(CACHE_KEY, JSON.stringify(state)); }catch(e){}
  clearTimeout(saveTimer);
  saveTimer = setTimeout(async ()=>{
    try{
      const res = await fetch(API + "?key=" + encodeURIComponent(LOOP.apiKey), {
        method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({data:state})
      });
      if(!res.ok) throw new Error("status " + res.status);
      lastSynced = Date.now();
      clearTimeout(retryTimer);
      try{ renderFoot(); }catch(e){}
    }catch(e){
      toast("Even geen verbinding — je run is bewaard en wordt zo gesynct");
      clearTimeout(retryTimer);
      retryTimer = setTimeout(saveState, 5000);
    }
  }, 250);
}

/* ================= APP STATE ================= */
let state = null;
const who = "a";         // één persoon per pagina — altijd slot 'a'
let openSess = null;     // {id, run, w}
let formVals = {};

const $ = id => document.getElementById(id);

function fmt(n){ return (Math.round(n*10)/10).toString().replace(".",","); }

function parseTime(t){
  if(!t) return 0;
  const parts = String(t).trim().split(":").map(function(x){ return Number(x); });
  if(parts.some(function(x){ return isNaN(x); })) return 0;
  if(parts.length===3) return parts[0]*3600 + parts[1]*60 + parts[2];
  if(parts.length===2) return parts[0]*60 + parts[1];
  if(parts.length===1) return parts[0];
  return 0;
}
function paceStr(distKm, timeStr){
  const secs = parseTime(timeStr);
  const d = parseFloat(String(distKm==null?"":distKm).replace(",","."));
  if(!secs || !d || d<=0) return "";
  const per = secs/d;
  const m = Math.floor(per/60), s = Math.round(per%60);
  const ss = s<10 ? "0"+s : ""+s;
  return m + ":" + ss + " /km";
}

function logsOf(){ return state.athletes[who].logs; }
function totalPlannedKm(){ return PLAN.reduce((s,w)=> s + w.runs.reduce((a,r)=>a+r.km,0), 0); }

function currentWeek(){
  const now = new Date();
  const diff = Math.floor((now - START_DATE) / 864e5);
  if(diff < 0) return 0;
  return Math.min(16, Math.floor(diff/7)+1);
}

/* ================= RENDER ================= */
function render(){
  const parts = [renderRoute, renderStats, renderZones, renderBars, renderWeeks, renderFoot];
  parts.forEach(fn=>{ try{ fn(); }catch(e){ console.error(fn.name, e); } });
}

function renderRoute(){
  const path = $("routeFill"), dot = $("routeDot");
  const L = path.getTotalLength();
  const done = Object.entries(logsOf()).reduce((s,[id,l])=> s + (l.done ? (l.dist ?? sessKm(id)) : 0), 0);
  const pct = Math.min(1, done / totalPlannedKm());
  path.style.strokeDasharray = L;
  path.style.strokeDashoffset = L * (1-pct);
  const pt = path.getPointAtLength(L*pct);
  dot.setAttribute("cx",pt.x); dot.setAttribute("cy",pt.y);
  $("routeTitle").textContent = state.athletes[who].name + " onderweg";
  $("routeKm").textContent = fmt(done) + " / " + Math.round(totalPlannedKm()) + " km gepland";
}
function sessKm(id){
  const m = id.match(/^w(\d+)r(\d+)$/); if(!m) return 0;
  return PLAN[+m[1]-1].runs[+m[2]-1].km;
}

function renderStats(){
  const wk = currentWeek();
  const weeksLeft = Math.max(0, Math.ceil((RACE_DATE - new Date())/(7*864e5)));
  $("stWeeks").textContent = weeksLeft;
  const logs = logsOf();
  let km=0, done=0, total=0;
  PLAN.forEach(w=>{
    w.runs.forEach((r,i)=>{
      total++;
      const l = logs["w"+w.w+"r"+(i+1)];
      if(l && l.done){ done++; km += (l.dist!=null && l.dist!=="" ? +l.dist : r.km); }
    });
  });
  $("stKm").textContent = fmt(km);
  $("stSess").textContent = Math.round(100*done/total) + "%";
  // hamstring trend: laatste 3 checks (alleen bij hamstring-profiel)
  const hamEl = $("stHam");
  if(LOOP.hamstring){
    const checks = [];
    PLAN.forEach(w=> w.runs.forEach((r,i)=>{
      const l = logs["w"+w.w+"r"+(i+1)];
      if(l && l.done && l.ham) checks.push(l.ham);
    }));
    const last = checks.slice(-3);
    hamEl.innerHTML = [0,1,2].map(i=>{
      const v = last[i];
      const c = v==="goed"?"g": v==="licht"?"a": v==="erger"?"r":"";
      return '<i class="'+c+'"></i>';
    }).join("");
    $("stHamLbl").textContent = "hamstring";
    hamEl.parentElement.style.display = "";
  } else {
    hamEl.innerHTML = "<i></i><i></i><i></i>";
    $("stHamLbl").textContent = "—";
  }
  const now = new Date();
  const days = Math.ceil((RACE_DATE - now)/864e5);
  $("countdown").textContent = wk===0
    ? "Week 1 start maandag 13 juli · nog " + days + " dagen tot de race"
    : "Week " + wk + " van 16 · nog " + days + " dagen tot de race";
}

function renderZones(){
  if(LOOP.zones==="tom"){
    $("zonesTitle").textContent = "Tempo-zones — " + state.athletes.a.name;
    $("zonesList").innerHTML = ZONES_TOM.map(z=>
      '<div class="zone"><span><b>'+z.n+'</b><br><small style="color:var(--mut)">'+z.d+'</small></span><span class="p">'+z.p+' /km</span></div>').join("");
    $("zonesNote").innerHTML = "Voorlopige streeftijd: <b>2:20–2:25</b> (met de vakantie erin is dit realistischer dan 2:15). Definitief na de 5k-test in week 8. Regel #1: bij <b>verergering van de hamstring</b> vervalt de eerstvolgende kwaliteitssessie en overleg je met je fysio.";
  } else {
    $("zonesTitle").textContent = "Tempo-zones";
    $("zonesList").innerHTML = '<div class="zone"><span><b>Nog even geduld</b><br><small style="color:var(--mut)">we stellen je zones in na je eerste runs</small></span><span class="p">—</span></div>';
    $("zonesNote").textContent = "Begin gewoon rustig en op gevoel. Zodra je een paar runs hebt gelogd, stemmen we je tempo-zones en afstanden helemaal op jou af.";
  }
}

function renderBars(){
  const logs = logsOf();
  const el = $("bars"); el.innerHTML = "";
  const maxKm = Math.max(...PLAN.map(w=> w.runs.reduce((a,r)=>a+r.km,0)));
  PLAN.forEach(w=>{
    const plan = w.runs.reduce((a,r)=>a+r.km,0);
    let act = 0;
    w.runs.forEach((r,i)=>{ const l = logs["w"+w.w+"r"+(i+1)]; if(l&&l.done) act += (l.dist!=null && l.dist!=="" ? +l.dist : r.km); });
    const bar = document.createElement("div"); bar.className="bar";
    bar.innerHTML = '<div class="stack" style="height:'+Math.round(100*plan/maxKm)+'%"><div class="fill" style="height:'+(plan? Math.min(100,Math.round(100*act/plan)) : 0)+'%"></div></div><div class="lbl">'+w.w+'</div>';
    el.appendChild(bar);
  });
}

function renderWeeks(){
  const logs = logsOf();
  const el = $("weeks"); el.innerHTML = "";
  const cur = currentWeek();
  let lastFase = "";
  PLAN.forEach(w=>{
    if(w.fase !== lastFase){
      const f = document.createElement("div"); f.className = "fase-label";
      f.textContent = "Fase · " + w.fase;
      el.appendChild(f); lastFase = w.fase;
    }
    const d = document.createElement("details"); d.className = "week";
    if(w.w === cur){ d.classList.add("current"); d.open = true; }
    const ws = START_DATE.getTime() + (w.w-1)*7*864e5;
    const we = ws + 6*864e5;
    const dateStr = new Date(ws).toLocaleDateString("nl-NL",{day:"numeric",month:"short"}) + " – " + new Date(we).toLocaleDateString("nl-NL",{day:"numeric",month:"short"});
    const planKm = w.runs.reduce((a,r)=>a+r.km,0);
    const doneCnt = w.runs.filter((r,i)=> logs["w"+w.w+"r"+(i+1)]?.done).length;

    let body = '<div class="wk-focus">'+w.focus+'</div>';
    w.runs.forEach((r,i)=>{
      const id = "w"+w.w+"r"+(i+1);
      const l = logs[id];
      const meta = TYPE_META[r.t];
      const tag = meta.tag ? '<span class="tag '+meta.tag[1]+'">'+meta.tag[0]+'</span>' : "";
      const paceHint = LOOP.zones==="tom" ? paceFor(r.t) : "";
      const pc = (l&&l.done) ? paceStr(l.dist, l.time) : "";
      const loggedLine = (l&&l.done) ? '<div class="logged">✓ '
        +(l.dist? fmt(+l.dist)+" km":"")
        +(l.time? " · "+l.time:"")
        +(pc? " · "+pc:"")
        +(l.hr? " · "+l.hr+" bpm":"")
        +(l.ham? " · hamstring: "+l.ham:"")+'</div>' : "";
      body += '<div class="sess '+(r.t==="r"?"race ":"")+((l&&l.done)?"done":"")+'" data-id="'+id+'">'
        + '<div class="chk">'+((l&&l.done)?"✓":"")+'</div>'
        + '<div class="info"><div class="name">Dag '+(i+1)+' · '+r.n+tag+'</div>'
        + '<div class="det">'+(r.d? r.d : paceHint)+'</div>'+loggedLine+'</div>'
        + '<div class="km">'+(r.t==="h" ? '<small style="font-size:14px">vrij</small>' : fmt(r.km)+'<small style="font-size:12px"> km</small>')+'</div></div>';
    });
    // kracht
    const k1 = logs["w"+w.w+"k1"], k2 = logs["w"+w.w+"k2"];
    body += '<div class="kracht">'
      + '<div class="sess '+(k1?.done?"done":"")+'" data-id="w'+w.w+'k1" data-kracht="1"><div class="chk">'+(k1?.done?"✓":"")+'</div><div class="info"><div class="name">Kracht 1</div></div></div>'
      + '<div class="sess '+(k2?.done?"done":"")+'" data-id="w'+w.w+'k2" data-kracht="1"><div class="chk">'+(k2?.done?"✓":"")+'</div><div class="info"><div class="name">Kracht 2</div></div></div>'
      + '</div>'
      + '<div class="note" style="margin-top:2px">'+KRACHT+'</div>';

    d.innerHTML = '<summary>'
      + '<div class="wk-num">W'+w.w+'<small>'+(w.herstel?"herstel":w.fase)+'</small></div>'
      + '<div class="wk-meta"><div class="t">'+dateStr+'</div><div class="d">'+w.runs.length+' runs · '+fmt(planKm)+' km gepland</div></div>'
      + '<div class="wk-prog '+(doneCnt===w.runs.length?"done":"")+'">'+doneCnt+'/'+w.runs.length+'</div>'
      + '</summary><div class="wk-body">'+body+'</div>';
    el.appendChild(d);
  });

  el.querySelectorAll(".sess").forEach(s=>{
    s.onclick = ()=>{
      const id = s.dataset.id;
      if(s.dataset.kracht){ toggleKracht(id); }
      else openLog(id);
    };
  });
}
function paceFor(t){
  if(LOOP.zones!=="tom") return "";
  return {e:"Tempo: 6:45–7:15 /km — praattempo", l:"Tempo: 6:45–7:15 /km, comfortabel volhouden", q:"Zie omschrijving", t:"", r:"Start op ± 6:40 /km — niet sneller!", h:"Uren op de benen = training. Afstand loggen mag, hoeft niet."}[t] || "";
}

function renderFoot(){
  $("storageMode").textContent = lastSynced
    ? "Laatst gesynct: " + new Date(lastSynced).toLocaleTimeString("nl-NL",{hour:"2-digit",minute:"2-digit"})
    : "Verbinden…";
}

/* ================= LOG SHEET ================= */
function updatePaceLive(){
  const p = paceStr($("inDist").value, $("inTime").value);
  $("paceLive").textContent = p ? "Tempo: " + p : "";
}
function openLog(id){
  const m = id.match(/^w(\d+)r(\d+)$/);
  const w = PLAN[+m[1]-1], r = w.runs[+m[2]-1];
  openSess = {id, run:r, w:w.w};
  const l = logsOf()[id] || {};
  formVals = {dist:l.dist ?? "", time:l.time ?? "", feel:l.feel ?? null, ham:l.ham ?? null, note:l.note ?? ""};
  $("shTitle").textContent = "Week "+w.w+" · Dag "+m[2]+" — "+r.n;
  $("shDesc").textContent = (r.d || "") + (r.d? " · ":"") + "Gepland: "+fmt(r.km)+" km";
  $("inDist").value = formVals.dist;
  $("inTime").value = formVals.time;
  $("inHr").value = l.hr ?? "";
  $("inNote").value = formVals.note;
  $("rowHam").style.display = LOOP.hamstring ? "" : "none";
  $("hamWarn").classList.remove("on");
  updatePaceLive();
  syncPills();
  $("overlay").classList.add("on"); $("sheet").classList.add("on");
}
function syncPills(){
  $("inFeel").querySelectorAll("button").forEach(b=> b.classList.toggle("sel", +b.dataset.v === +formVals.feel));
  $("inHam").querySelectorAll("button").forEach(b=> b.classList.toggle("sel", b.dataset.v === formVals.ham));
}
$("inDist").oninput = updatePaceLive;
$("inTime").oninput = updatePaceLive;
$("inFeel").onclick = e=>{ if(e.target.dataset.v){ formVals.feel = +e.target.dataset.v; syncPills(); } };
$("inHam").onclick = e=>{ if(e.target.dataset.v){ formVals.ham = e.target.dataset.v; syncPills(); $("hamWarn").classList.toggle("on", formVals.ham==="erger"); } };
$("btnCancel").onclick = closeSheet;
$("overlay").onclick = ()=>{ closeSheet(); closeIO(); };
function closeSheet(){ $("overlay").classList.remove("on"); $("sheet").classList.remove("on"); openSess=null; }

$("btnSave").onclick = ()=>{
  if(!openSess) return;
  logsOf()[openSess.id] = {
    done:true,
    dist: $("inDist").value.trim()==="" ? null : parseFloat($("inDist").value.replace(",",".")),
    time: $("inTime").value.trim(),
    hr: $("inHr").value.trim()==="" ? null : parseInt($("inHr").value,10),
    feel: formVals.feel, ham: (LOOP.hamstring ? formVals.ham : null),
    note: $("inNote").value.trim(), ts: Date.now()
  };
  saveState(); closeSheet(); render(); toast("Run opgeslagen ✓");
};
$("btnClear").onclick = ()=>{
  if(!openSess) return;
  delete logsOf()[openSess.id];
  saveState(); closeSheet(); render(); toast("Log gewist");
};
function toggleKracht(id){
  const logs = logsOf();
  if(logs[id]?.done) delete logs[id]; else logs[id] = {done:true, ts:Date.now()};
  saveState(); render();
}

/* ================= EXPORT / IMPORT ================= */
let ioMode = "export";
$("exportBtn").onclick = ()=>{
  ioMode="export";
  $("ioTitle").textContent = "Exporteren";
  $("ioDesc").textContent = "Kopieer deze data als backup, of plak hem in de app op een ander apparaat (importeren).";
  $("ioText").value = JSON.stringify(state);
  $("ioAction").textContent = "Kopieer";
  $("overlay").classList.add("on"); $("ioSheet").classList.add("on");
};
$("importBtn").onclick = ()=>{
  ioMode="import";
  $("ioTitle").textContent = "Importeren";
  $("ioDesc").textContent = "Plak hier eerder geëxporteerde data. Let op: dit overschrijft de huidige data.";
  $("ioText").value = "";
  $("ioAction").textContent = "Importeer";
  $("overlay").classList.add("on"); $("ioSheet").classList.add("on");
};
$("ioCancel").onclick = closeIO;
function closeIO(){ $("ioSheet").classList.remove("on"); $("overlay").classList.remove("on"); }
$("ioAction").onclick = async ()=>{
  if(ioMode==="export"){
    try{ await navigator.clipboard.writeText($("ioText").value); toast("Gekopieerd ✓"); }
    catch(e){ $("ioText").select(); document.execCommand("copy"); toast("Gekopieerd ✓"); }
  } else {
    try{
      const parsed = JSON.parse($("ioText").value);
      if(!parsed.athletes) throw 0;
      state = mergeSeed(parsed); saveState(); closeIO(); render(); toast("Data geïmporteerd ✓");
    }catch(e){ toast("Ongeldige data — check de tekst"); }
  }
};

let toastTimer=null;
function toast(msg){
  const t = $("toast"); t.textContent = msg; t.classList.add("on");
  clearTimeout(toastTimer); toastTimer = setTimeout(()=> t.classList.remove("on"), 2200);
}

/* ================= INIT ================= */
(async function(){
  try{
    // als de opslag-laag hangt, na 1,5 s renderen met cache of ingebakken data
    state = await Promise.race([
      loadState(),
      new Promise(res=> setTimeout(()=> res(cachedOrSeed()), 1500))
    ]);
  }catch(e){
    state = cachedOrSeed();
  }
  render();
  // Als de DB positief bevestigd nog leeg was, push de huidige state één keer
  // omhoog: dit maakt de rij aan en synct offline-gelogde runs. Alleen bij
  // "empty" (niet bij "unknown"), zodat we nooit een bestaande rij overschrijven.
  if(dbStatus === "empty") saveState();
})();
</script>
</body>
</html>`;
