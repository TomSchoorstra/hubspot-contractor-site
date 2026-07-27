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

  /* ---------- alert (blessure-waarschuwing) ---------- */
  .alert{background:#E5484D1A; border:1px solid #E5484D55; border-radius:var(--r); padding:13px 15px; margin:14px 0; font-size:12.5px; line-height:1.55; color:#F1C3C5;}
  .alert b{color:#FF9195;}
  .alert .at{font-family:'Barlow Condensed'; font-size:16px; font-weight:700; text-transform:uppercase; letter-spacing:.03em; color:#FF9195; display:block; margin-bottom:5px;}

  /* ---------- tennis-toggle & overgeslagen run ---------- */
  .tennis{display:inline-flex; align-items:center; gap:6px; justify-self:start; font-size:12px; font-weight:600; color:var(--mut); background:var(--panel2); border:1px solid var(--line); border-radius:9px; padding:8px 11px; cursor:pointer; user-select:none;}
  .tennis.on{border-color:var(--green); color:var(--green); background:var(--green-soft);}
  .sess.skipped{opacity:.6; cursor:default;}
  .sess.skipped .name{text-decoration:line-through;}
  .sess.skipped .km{text-decoration:line-through; color:var(--mut);}
  .skip-note{color:var(--amber) !important; font-weight:600;}

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
  .hist-row{display:flex; align-items:center; gap:8px; font-size:12.5px; padding:8px 10px; border-radius:9px; background:var(--panel2); margin-bottom:6px;}
  .hist-row .hd{font-weight:600; min-width:52px;}
  .hist-row .hk{font-family:'Barlow Condensed'; font-size:16px; font-weight:700; color:var(--orange); min-width:58px;}
  .hist-row .ht{color:var(--mut); min-width:50px;}
  .hist-row .hp{color:var(--ink);}
  .hist-row .hh{color:var(--mut); margin-left:auto;}

  /* ---------- weeks ---------- */
  .fase-label{margin:22px 0 8px; color:var(--mut); font-size:12px; letter-spacing:.16em; text-transform:uppercase; font-weight:600; display:flex; align-items:center; gap:10px;}
  .fase-label::after{content:""; flex:1; height:1px; background:var(--line);}
  .phase-tabs{display:flex; gap:6px; overflow-x:auto; margin:6px 0 14px; padding-bottom:4px;}
  .phase-tabs::-webkit-scrollbar{display:none;}
  .phase-tab{flex:0 0 auto; padding:8px 13px; border-radius:20px; border:1px solid var(--line); background:var(--panel); color:var(--mut); font-family:'Barlow Condensed'; font-size:15px; font-weight:600; text-transform:uppercase; letter-spacing:.05em; cursor:pointer; white-space:nowrap;}
  .phase-tab.on{background:var(--orange); border-color:var(--orange); color:#10100E;}
  .phase-tab.cur:not(.on){border-color:var(--orange); color:var(--orange);}
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
  .sess .det ol.q-steps{margin:2px 0 0; padding-left:18px; display:grid; gap:2px;}
  .sess .det ol.q-steps li{font-size:12px; color:var(--ink); line-height:1.45;}
  .sess .det .q-why{margin-top:6px; font-style:italic; color:var(--mut); line-height:1.5;}
  .sess .det .q-pace{margin-top:6px; font-size:12px; color:var(--orange); line-height:1.5;}
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
  .kracht.single{justify-content:center;}
  .kracht.single .sess{flex:0 0 auto; padding:8px 18px; gap:9px;}
  .kracht.single .chk{width:20px; height:20px; font-size:12px;}

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
  .feel-row button{display:flex; flex-direction:column; align-items:center; justify-content:center; gap:2px; padding:9px 3px;}
  .feel-row button b{font-family:'Barlow Condensed'; font-size:18px; font-weight:700; line-height:1;}
  .feel-row button span{font-size:9.5px; line-height:1.1; color:inherit;}
  .feel-hint{font-size:11px; color:var(--mut); margin:-2px 0 8px;}
  .intent{color:var(--mut); font-size:12px; line-height:1.5; margin:-10px 0 16px;}
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

  <div class="alert" id="topAlert" style="display:none"></div>

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
    <div class="route-legend"><span id="routeStart">start</span><span>finish · 1 nov</span></div>
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

  <div class="card" id="histCard" style="display:none">
    <h2>Aanloop — runs vóór het schema</h2>
    <div id="histList"></div>
    <div class="note" id="histNote"></div>
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
  <div class="intent" id="shIntent"></div>
  <div class="warn-box" id="hamWarn"><b>Let op:</b> hamstring verergerd. Advies: sla de volgende kwaliteitssessie over, houd alles rustig en bespreek dit met je fysio voordat je opbouwt.</div>
  <div class="frow" id="rowDist"><label>Afstand (km)</label><input type="number" step="0.01" inputmode="decimal" id="inDist" placeholder="bijv. 6.4"></div>
  <div class="frow" id="rowTime"><label>Tijd (min.sec)</label><input type="text" inputmode="decimal" id="inTime" placeholder="bijv. 38.04"></div>
  <div class="pace-live" id="paceLive"></div>
  <div class="frow" id="rowHr"><label>Gem. hartslag (optioneel)</label><input type="number" step="1" inputmode="numeric" id="inHr" placeholder="bijv. 156"></div>
  <div class="frow" id="rowFiveK" style="display:none"><label>5K-testtijd (mm:ss)</label><input type="text" inputmode="decimal" id="inFiveK" placeholder="bijv. 24:00"></div>
  <div class="frow"><label>Hoe zwaar voelde het?</label>
    <div class="feel-hint">praattest: kon je nog kletsen?</div>
    <div class="pill-row feel-row" id="inFeel">
      <button data-v="1"><b>1</b><span>heel licht</span></button><button data-v="2"><b>2</b><span>licht</span></button><button data-v="3"><b>3</b><span>gemiddeld</span></button><button data-v="4"><b>4</b><span>zwaar</span></button><button data-v="5"><b>5</b><span>maximaal</span></button>
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
const LOOP = (typeof window !== "undefined" && window.__LOOP__) || {apiKey:"", name:"", check:null, zones:"partner", rowId:"denise"};
const CHECK = LOOP.check || null; // "hamstring" | "knie" | null — blessure-check per run
const CHECK_META = {
  hamstring: {label:"Hamstring", ergerLabel:"🔴 Verergerd", warn:"<b>Let op:</b> hamstring verergerd. Advies: sla de volgende kwaliteitssessie over, houd alles rustig en bespreek dit met je fysio voordat je opbouwt."},
  knie: {label:"Knie", ergerLabel:"🔴 Pijn", warn:"<b>Rustig aan met de knie.</b> Staat de knie-check 2× op rood, sla dan de eerstvolgende interval-/kwaliteitssessie over en houd alles rustig tot het weg is. Blijft het aanhouden: even langs de fysio."}
};

/* ================= PLAN DATA ================= */
const RACE_DATE = new Date(2026,10,1);
// Startdatum per atleet: Tom 14 wk vanaf 27 juli, Denise 15 wk vanaf 20 juli. Beide eindigen op de race.
const START_DATE = LOOP.rowId === "tom" ? new Date(2026,6,27) : new Date(2026,6,20);

// Rustig-tempo + jog-herstel: de racetempo-rij is dynamisch (berekend uit de 5K-test
// of handmatig bevestigd) en wordt in renderZones() aangevuld — niet hier statisch.
const ZONES_TOM = [
  {n:"Rustig (easy/long run, in-/uitlopen)", p:"7:15", d:"startpunt — praattest leidend, langzamer altijd oké"},
  {n:"Zeer rustig jog-herstel", p:"7:30–8:00", d:"tussen herhalingen, of wandelen"}
];
// Zones voor Denise, afgeleid uit haar Huawei-data (mei–juli 2026).
const ZONES_DENISE = [
  {n:"Rustig / long run", p:"6:30–6:55", d:"praattempo"},
  {n:"Vlot duurloop", p:"6:05–6:25", d:"stevig maar comfortabel"},
  {n:"Racetempo (doel 2:10)", p:"~6:00", d:"halve-marathontempo (2:00 = ~5:41)"},
  {n:"Tempo", p:"5:40–5:55", d:"pittig, gecontroleerd"},
  {n:"Interval", p:"5:15–5:30", d:"korte snelle herhalingen"}
];

// type: e=rustig/short, q=kwaliteit, l=long, t=test (5K), r=race, h=vakantie/hike
// Bron: Tom's aangeleverde 14-weeks schema (27 jul 2026 → race 1 nov). Alle titels
// en teksten zijn verbatim overgenomen. Elke sessie heeft een stabiel id-veld. Q-sessies
// dragen q-metadata (alleen voor validatie, voedt nooit de weergegeven tekst).
// hmPaceRef:true = toon het (voorlopige/bevestigde) halve-marathontempo — alleen wk 11-14.
// Weektotalen worden NIET opgeslagen; ze worden runtime gesommeerd uit runs[].km.
const PLAN_TOM = [
 {w:1, fase:"Basis", focus:"Startweek, meteen na de long run van 10,4 km op zondag. Rustig tempo op praattest, startpunt 7:15/km — langzamer mag altijd. Hamstring-check na elke run.",
  runs:[
   {id:"tom-2026-w01-short",t:"e",km:4,n:"Rustige herstelrun",d:"Loop 4 km op ontspannen gesprekstempo. Houd deze training bewust licht na de long run van 10,4 km op zondag. Niet versnellen in het laatste deel."},
   {id:"tom-2026-w01-quality",t:"q",km:5,n:"4 × 1 minuut pittig",
    steps:["Loop 1,5 km rustig in.","Loop 4 × 1 minuut pittig.","Richttempo snelle minuten: ongeveer 5:00–5:20/km.","Wandel na iedere snelle minuut 1 minuut ontspannen.","Loop na het laatste blok rustig verder totdat je 5 km totaal hebt bereikt."],
    why:["Doel: Stevig en snel, ongeveer 8/10 inspanning, maar geen sprint. Alle vier snelle minuten moeten ongeveer even sterk voelen.","Aanpassen: Voelt 5:00/km direct bijna maximaal, ga dan richting 5:15–5:30/km. Voeg geen extra herhalingen toe."],
    q:{plannedDistanceKm:5,blocks:[{type:"warmup",distanceKm:1.5},{type:"repeat",repetitions:4,durationSeconds:60,paceRangeMinPerKm:["5:00","5:20"]},{type:"recovery",durationSeconds:60,mode:"walk"},{type:"cooldown",untilTotalDistanceKm:5}]}},
   {id:"tom-2026-w01-long",t:"l",km:11.5,n:"Rustige lange duurloop",d:"Loop 11,5 km op volledig gesprekstempo. Begin bewust rustig. Geen snelle finish en geen extra kilometers."}]},
 {w:2, fase:"Basis", herstel:true, focus:"Bewust iets lichter. De long run is een herstelstap na 10,4 en 11,5 km.",
  runs:[
   {id:"tom-2026-w02-short",t:"e",km:4.5,n:"Rustige duurloop",d:"Loop 4,5 km ontspannen op gesprekstempo. Deze week is bewust iets lichter."},
   {id:"tom-2026-w02-quality",t:"q",km:5,n:"5 × 1 minuut pittig",
    steps:["Loop 1,5 km rustig in.","Loop 5 × 1 minuut pittig.","Richttempo: ongeveer 5:00–5:20/km.","Wandel na iedere snelle minuut 1 minuut ontspannen.","Loop rustig uit totdat je 5 km totaal hebt bereikt."],
    why:"Doel: De vijf herhalingen gelijkmatig uitvoeren. De laatste mag zwaar voelen, maar niet maximaal.",
    q:{plannedDistanceKm:5,blocks:[{type:"warmup",distanceKm:1.5},{type:"repeat",repetitions:5,durationSeconds:60,paceRangeMinPerKm:["5:00","5:20"]},{type:"recovery",durationSeconds:60,mode:"walk"},{type:"cooldown",untilTotalDistanceKm:5}]}},
   {id:"tom-2026-w02-long",t:"l",km:9,n:"Herstel-long run",d:"Loop 9 km rustig op gesprekstempo. Deze kortere duurloop is een bewuste herstelstap na 10,4 en 11,5 km."}]},
 {w:3, fase:"Basis", focus:"Weer opbouwen. Iets meer herhalingen en een langere long run.",
  runs:[
   {id:"tom-2026-w03-short",t:"e",km:5,n:"Rustige duurloop",d:"Loop 5 km ontspannen. Je moet eindigen met het gevoel dat je eenvoudig verder had kunnen lopen."},
   {id:"tom-2026-w03-quality",t:"q",km:6,n:"6 × 1 minuut pittig",
    steps:["Loop 1,5 km rustig in.","Loop 6 × 1 minuut pittig.","Richttempo: ongeveer 5:00–5:20/km.","Wandel na iedere snelle minuut 1 minuut ontspannen.","Loop rustig uit totdat je 6 km totaal hebt bereikt."],
    why:"Doel: Vlot en gecontroleerd. Alle zes herhalingen moeten technisch netjes blijven.",
    q:{plannedDistanceKm:6,blocks:[{type:"warmup",distanceKm:1.5},{type:"repeat",repetitions:6,durationSeconds:60,paceRangeMinPerKm:["5:00","5:20"]},{type:"recovery",durationSeconds:60,mode:"walk"},{type:"cooldown",untilTotalDistanceKm:6}]}},
   {id:"tom-2026-w03-long",t:"l",km:12.5,n:"Rustige lange duurloop",d:"Loop 12,5 km op gesprekstempo. Geen snelle finish."}]},
 {w:4, fase:"Basis", focus:"Langere pittige blokken (2 minuten). Long run naar 14 km.",
  runs:[
   {id:"tom-2026-w04-short",t:"e",km:5,n:"Rustige duurloop",d:"Loop 5 km ontspannen. Bewaar voldoende energie voor de kwaliteitssessie en long run."},
   {id:"tom-2026-w04-quality",t:"q",km:6.5,n:"5 × 2 minuten pittig",
    steps:["Loop 1,5 km rustig in.","Loop 5 × 2 minuten pittig.","Richttempo: ongeveer 5:10–5:30/km.","Wandel of jog na iedere herhaling 90 seconden zeer rustig.","Loop rustig uit totdat je 6,5 km totaal hebt bereikt."],
    why:"Doel: Stevig maar beheerst. Ongeveer 8/10 inspanning. De laatste herhaling mag zwaar zijn, maar het tempo mag niet instorten.",
    q:{plannedDistanceKm:6.5,blocks:[{type:"warmup",distanceKm:1.5},{type:"repeat",repetitions:5,durationSeconds:120,paceRangeMinPerKm:["5:10","5:30"]},{type:"recovery",durationSeconds:90,mode:"walk_or_jog"},{type:"cooldown",untilTotalDistanceKm:6.5}]}},
   {id:"tom-2026-w04-long",t:"l",km:14,n:"Rustige lange duurloop",d:"Loop 14 km op volledig gesprekstempo. Begin langzamer dan je denkt nodig te hebben. Het doel is de afstand gecontroleerd voltooien."}]},
 {w:5, fase:"Opbouw", focus:"Testweek: de 5K-test bepaalt je voorlopige halve-marathontempo. Long run bewust wat korter.",
  runs:[
   {id:"tom-2026-w05-short",t:"e",km:5,n:"Rustige duurloop",d:"Loop 5 km gemakkelijk. Geen versnellingen; bewaar energie voor de 5K-test."},
   {id:"tom-2026-w05-five-k-test",t:"t",km:7.5,n:"5K-test",isFiveKTest:true,
    steps:["Loop 1,5 km rustig in.","Loop 5 km zo snel mogelijk, maar gelijkmatig verdeeld.","Begin de eerste kilometer gecontroleerd.","Loop na de test 1 km zeer rustig uit."],
    why:["Log verplicht: eindtijd, gemiddelde hartslag, zwaarte, praattest, hamstringstatus, opmerkingen.","Doel: Een betrouwbare meting, niet de eerste kilometer te hard starten."],
    q:{plannedDistanceKm:7.5,blocks:[{type:"warmup",distanceKm:1.5},{type:"main",distanceKm:5},{type:"cooldown",distanceKm:1}]}},
   {id:"tom-2026-w05-long",t:"l",km:11,n:"Lichtere lange duurloop",d:"Loop 11 km rustig. Door de 5K-test is deze duurloop bewust korter."}]},
 {w:6, fase:"Opbouw", focus:"Eerste stevige blokken (3 minuten), gestuurd op inspanning. Long run naar 14,5 km.",
  runs:[
   {id:"tom-2026-w06-short",t:"e",km:5.5,n:"Rustige duurloop",d:"Loop 5,5 km ontspannen op gesprekstempo."},
   {id:"tom-2026-w06-quality",t:"q",km:7,n:"4 × 3 minuten stevig",
    steps:["Loop 1,5 km rustig in.","Loop 4 × 3 minuten stevig.","Gebruik na de 5K-test het vastgestelde temporichtpunt.","Jog tussen de blokken 2 minuten zeer rustig, of wandel wanneer nodig.","Loop rustig uit totdat je 7 km totaal hebt bereikt."],
    why:"Doel: Stevig en gecontroleerd, ongeveer 7,5–8/10 inspanning. Alle blokken gelijkmatig uitvoeren.",
    q:{plannedDistanceKm:7,blocks:[{type:"warmup",distanceKm:1.5},{type:"repeat",repetitions:4,durationSeconds:180},{type:"recovery",durationSeconds:120,mode:"jog"},{type:"cooldown",untilTotalDistanceKm:7}]}},
   {id:"tom-2026-w06-long",t:"l",km:14.5,n:"Rustige lange duurloop",d:"Loop 14,5 km op volledig gesprekstempo. De laatste kilometer blijft rustig."}]},
 {w:7, fase:"Opbouw", focus:"Langere stevige blokken (5 minuten). Long run is de belangrijkste training: 16 km vóór de vakantie.",
  runs:[
   {id:"tom-2026-w07-short",t:"e",km:6,n:"Rustige duurloop",d:"Loop 6 km ontspannen. Niet versnellen; de long run is deze week de belangrijkste training."},
   {id:"tom-2026-w07-quality",t:"q",km:7.5,n:"3 × 5 minuten stevig",
    steps:["Loop 1,5 km rustig in.","Loop 3 × 5 minuten stevig en gecontroleerd.","Gebruik het na de 5K-test vastgestelde temporichtpunt.","Jog of wandel tussen de blokken 2,5 minuten zeer rustig.","Loop rustig uit totdat je 7,5 km totaal hebt bereikt."],
    why:"Doel: Ongeveer 7/10 inspanning. Houd bewust iets over voor de long run.",
    q:{plannedDistanceKm:7.5,blocks:[{type:"warmup",distanceKm:1.5},{type:"repeat",repetitions:3,durationSeconds:300},{type:"recovery",durationSeconds:150,mode:"jog_or_walk"},{type:"cooldown",untilTotalDistanceKm:7.5}]}},
   {id:"tom-2026-w07-long",t:"l",km:16,n:"Langste duurloop vóór de vakantie",d:"Loop 16 km volledig op gesprekstempo. Begin zeer beheerst. Geen snelle finish en geen extra kilometers."}]},
 {w:8, fase:"Vakantie", focus:"Vakantie in Kirgizië. Hiken telt volop mee — vink je hikes af, afstand/duur invullen mag.",
  runs:[
   {id:"tom-2026-w08-hike-light",t:"h",km:0,n:"Lichte hike",d:"Rustige hike van ongeveer 60–90 minuten. Lage intensiteit. Dit is actieve hersteltijd."},
   {id:"tom-2026-w08-hike-normal",t:"h",km:0,n:"Normale hike",d:"Hike van ongeveer 2–3 uur op comfortabel tempo. Pauzes zijn onderdeel van de activiteit."},
   {id:"tom-2026-w08-hike-long",t:"h",km:0,n:"Lange hike",d:"Langere hike afhankelijk van route, hoogteverschil en herstel. Geen hardlooptraining verplicht. Log duur, afstand en zwaarte."}]},
 {w:9, fase:"Vakantie", focus:"Vakantie in Kirgizië. Genieten en bewegen; hardlopen hoeft niet.",
  runs:[
   {id:"tom-2026-w09-hike-light",t:"h",km:0,n:"Lichte hike",d:"Rustige wandel- of hikeactiviteit. Houd de belasting lager wanneer de benen vermoeid zijn."},
   {id:"tom-2026-w09-hike-normal",t:"h",km:0,n:"Normale hike",d:"Comfortabele duuractiviteit zonder prestatiedoel."},
   {id:"tom-2026-w09-hike-long",t:"h",km:0,n:"Lange hike",d:"Alleen uitvoeren wanneer herstel en benen goed voelen. Hardlopen is niet nodig."}]},
 {w:10, fase:"Herstart", focus:"Terug van vakantie. Rustig herstarten en de benen laten wennen aan hardloopbelasting.",
  runs:[
   {id:"tom-2026-w10-short",t:"e",km:4,n:"Rustige herstart",d:"Loop 4 km volledig op gevoel. Start rustig. Loop langzamer wanneer de benen nog moeten wennen aan hardloopbelasting."},
   {id:"tom-2026-w10-quality",t:"q",km:5,n:"4 × 1 minuut gecontroleerd pittig",
    steps:["Loop 1,5 km rustig in.","Loop 4 × 1 minuut pittig maar gecontroleerd.","Gebruik een tempo dat duidelijk sneller is dan easy, maar niet maximaal.","Wandel na iedere herhaling 1 minuut.","Loop rustig uit totdat je 5 km totaal hebt bereikt."],
    why:"Aanpassen: Voelen de benen zwaar of stijf na de vakantie, vervang deze sessie door 5 km rustig.",
    q:{plannedDistanceKm:5,blocks:[{type:"warmup",distanceKm:1.5},{type:"repeat",repetitions:4,durationSeconds:60},{type:"recovery",durationSeconds:60,mode:"walk"},{type:"cooldown",untilTotalDistanceKm:5}]}},
   {id:"tom-2026-w10-long",t:"l",km:11,n:"Rustige herstart-long run",d:"Loop 11 km op gesprekstempo. De afstand is bewust lager na de vakantie."}]},
 {w:11, fase:"Herstart", focus:"Eerste kilometers op halve-marathontempo. Long run 14,5 km — let op knie en hamstring na de vakantie.",
  runs:[
   {id:"tom-2026-w11-short",t:"e",km:5,n:"Rustige duurloop",d:"Loop 5 km gemakkelijk en ontspannen."},
   {id:"tom-2026-w11-quality",t:"q",km:7,n:"3 × 1 km op halve-marathoninspanning",hmPaceRef:true,
    steps:["Loop 1,5 km rustig in.","Loop 3 × 1 km op het na de 5K-test bepaalde halve-marathontempo.","Jog tussen de kilometers 2,5 minuten zeer rustig, of wandel kort.","Loop rustig uit totdat je 7 km totaal hebt bereikt."],
    why:"Doel: Gecontroleerd en ritmisch. Dit mag niet aanvoelen als een 5K-race.",
    q:{plannedDistanceKm:7,blocks:[{type:"warmup",distanceKm:1.5},{type:"repeat",repetitions:3,distanceKm:1},{type:"recovery",durationSeconds:150,mode:"jog_or_walk"},{type:"cooldown",untilTotalDistanceKm:7}]}},
   {id:"tom-2026-w11-long",t:"l",km:14.5,n:"Rustige lange duurloop",d:"Loop 14,5 km op gesprekstempo. Beoordeel vooral hoe de benen en hamstring reageren na de vakantie."}]},
 {w:12, fase:"Piek", focus:"Piekweek: de langste trainingsrun (18 km) en 2 × 2 km op halve-marathontempo.",
  runs:[
   {id:"tom-2026-w12-short",t:"e",km:5,n:"Rustige duurloop",d:"Loop 5 km volledig rustig. Geen versnellingen."},
   {id:"tom-2026-w12-quality",t:"q",km:7.5,n:"2 × 2 km op halve-marathoninspanning",hmPaceRef:true,
    steps:["Loop 1,5 km rustig in.","Loop 2 × 2 km op het vastgestelde halve-marathontempo.","Jog of wandel 3 minuten zeer rustig tussen de blokken.","Loop rustig uit totdat je 7,5 km totaal hebt bereikt."],
    why:"Doel: Stevig maar gecontroleerd. Geen extra blokken. Houd voldoende herstel over voor de 18 km.",
    q:{plannedDistanceKm:7.5,blocks:[{type:"warmup",distanceKm:1.5},{type:"repeat",repetitions:2,distanceKm:2},{type:"recovery",durationSeconds:180,mode:"jog_or_walk"},{type:"cooldown",untilTotalDistanceKm:7.5}]}},
   {id:"tom-2026-w12-long",t:"l",km:18,n:"Langste trainingsrun",d:"Loop 18 km volledig op gesprekstempo. Begin zeer beheerst. Geen snelle finish, geen tempoblokken en geen extra afstand.",why:"Voorwaarde: De 18 km blijft alleen staan wanneer de 14,5 km van week 11 klachtenvrij verliep en Tom normaal herstelde. Bij moeizaam herstel of hamstringklachten wordt deze sessie automatisch 16–17 km."}]},
 {w:13, fase:"Taper", focus:"Taperweek: volume omlaag, fris worden. Korte blokken op halve-marathontempo.",
  runs:[
   {id:"tom-2026-w13-short",t:"e",km:4.5,n:"Rustige taperduurloop",d:"Loop 4,5 km gemakkelijk. Het doel is fris worden, niet conditie opbouwen."},
   {id:"tom-2026-w13-quality",t:"q",km:6.5,n:"2 × 1,5 km op halve-marathontempo",hmPaceRef:true,
    steps:["Loop 1,5 km rustig in.","Loop 2 × 1,5 km op halve-marathontempo.","Jog 3 minuten zeer rustig tussen de blokken.","Loop rustig uit totdat je 6,5 km totaal hebt bereikt."],
    why:"Doel: Stop met het gevoel dat je nog één blok had kunnen lopen.",
    q:{plannedDistanceKm:6.5,blocks:[{type:"warmup",distanceKm:1.5},{type:"repeat",repetitions:2,distanceKm:1.5},{type:"recovery",durationSeconds:180,mode:"jog"},{type:"cooldown",untilTotalDistanceKm:6.5}]}},
   {id:"tom-2026-w13-long",t:"l",km:10,n:"Korte long run in taper",d:"Loop 10 km rustig. Geen snelle finish en geen extra afstand."}]},
 {w:14, fase:"Race", focus:"Raceweek! Alles kort en fris. Op de dag zelf: beheerst starten, daarna richting racetempo.",
  runs:[
   {id:"tom-2026-w14-short",t:"e",km:4,n:"Zeer rustige raceweekrun",d:"Loop 4 km ontspannen. Houd de benen los. Snelheid is niet belangrijk."},
   {id:"tom-2026-w14-quality",t:"q",km:5,n:"Race-opfrisser: 3 × 500 meter",hmPaceRef:true,
    steps:["Loop 1,5 km rustig in.","Loop 3 × 500 meter op halve-marathontempo.","Jog na iedere herhaling 90 seconden zeer rustig.","Loop rustig uit totdat je 5 km totaal hebt bereikt."],
    why:"Doel: Deze sessie moet gemakkelijk en soepel voelen. Geen extra herhalingen.",
    q:{plannedDistanceKm:5,blocks:[{type:"warmup",distanceKm:1.5},{type:"repeat",repetitions:3,distanceKm:0.5},{type:"recovery",durationSeconds:90,mode:"jog"},{type:"cooldown",untilTotalDistanceKm:5}]}},
   {id:"tom-2026-w14-race",t:"r",km:21.1,n:"Halve marathon",hmPaceRef:true,d:"Start de eerste 3–5 km beheerst. Loop daarna richting het afgesproken racetempo. Versnel pas na ongeveer 15–16 km wanneer ademhaling, benen en hamstring goed blijven voelen."}]}
];

// Afgesproken weektotalen (som van runs[].km per week). De validator faalt bij afwijking.
// Vakantieweken (8-9) zijn 0 (hikes met km:0).
const EXPECTED_WEEK_TOTALS_TOM = [20.5,18.5,23.5,25.5,23.5,27,29.5,0,0,20,26.5,30.5,21,30.1];

// Zuivere, DOM-vrije validator: werkt alleen op de statische PLAN_TOM-data en retourneert
// een foutenlijst. Wordt zowel client-side (non-blocking console.warn) als door het
// blokkerende Node-script scripts/validate-tom-plan.mjs gebruikt (zelfde bron, geen drift).
function collectTomPlanErrors(plan){
  const errors = [];
  const seenIds = new Map();
  let fiveKCount = 0;
  plan.forEach(function(w, wi){
    let weekTotal = 0;
    w.runs.forEach(function(r, i){
      weekTotal += r.km;
      const id = r.id;
      if(!id) errors.push("Week " + w.w + " sessie " + (i + 1) + ": ontbrekend id");
      else if(seenIds.has(id)) errors.push("Dubbel id: " + id + " (week " + w.w + " & week " + seenIds.get(id) + ")");
      else seenIds.set(id, w.w);
      if(r.isFiveKTest) fiveKCount++;
      if(!r.q) return;
      if(r.q.plannedDistanceKm !== r.km) errors.push(id + ": q.plannedDistanceKm (" + r.q.plannedDistanceKm + ") != r.km (" + r.km + ")");
      let fixedKm = 0, lastReps = 1, hasTimeBased = false, hasCooldownFill = false;
      r.q.blocks.forEach(function(b){
        if(b.type === "cooldown" && b.untilTotalDistanceKm != null) hasCooldownFill = true;
        if(b.distanceKm == null){ hasTimeBased = true; if(b.type === "repeat") lastReps = b.repetitions || 1; return; }
        if(b.type === "repeat"){ fixedKm += b.distanceKm * (b.repetitions || 1); lastReps = b.repetitions || 1; }
        else if(b.type === "recovery") fixedKm += b.distanceKm * (b.repetitions != null ? b.repetitions : Math.max(0, lastReps - 1));
        else fixedKm += b.distanceKm;
      });
      if(fixedKm > r.q.plannedDistanceKm + 0.05) errors.push(id + ": vaste afstandsblokken (" + fixedKm.toFixed(2) + "km) groter dan geplande sessieafstand (" + r.q.plannedDistanceKm + "km)");
      if(hasTimeBased && !hasCooldownFill) errors.push(id + ": tijdgebaseerde Q-sessie zonder cooling-down tot totaalafstand");
    });
    const expected = EXPECTED_WEEK_TOTALS_TOM[wi];
    if(expected == null) errors.push("Week " + w.w + ": geen afgesproken weektotaal gedefinieerd");
    else if(Math.abs(weekTotal - expected) > 0.05) errors.push("Week " + w.w + ": weektotaal " + weekTotal.toFixed(1) + "km wijkt af van afgesproken " + expected + "km");
  });
  if(fiveKCount !== 1) errors.push("Verwacht precies 1 sessie met isFiveKTest:true, gevonden: " + fiveKCount);
  if(seenIds.size !== 42) errors.push("Verwacht precies 42 unieke Tom-sessie-id's (14 weken x 3 items, incl. hikes), gevonden: " + seenIds.size);
  return errors;
}
// Client-side: puur informatief, mag de pagina nooit breken. De echte poort is het Node-script.
(function(){
  try{
    if(LOOP.rowId === "tom"){
      const errs = collectTomPlanErrors(PLAN_TOM);
      if(errs.length) console.warn("[loopschema] PLAN_TOM validatie:", errs);
    }
  }catch(e){ console.warn("[loopschema] validatie crashte:", e); }
})();

// Schema voor Denise — coach-revisie (jul 2026). Alleen rustige runs + long run
// (geen harde tempoblokken tot fysio-akkoord). Eerste 3 weken vlak/laag om de knie
// te laten settelen; long run blijft ≤~46% van het weekvolume; strak 3-op-1 patroon.
const PLAN_DENISE = [
 {w:1, fase:"Basis", focus:"Ambitieuze start! Vaste 3× per week: een rustige run, een kwaliteitssessie en een long run. Rustige km's blijven op praattempo. Knie in de gaten houden.",
  runs:[{t:"e",km:6,n:"Rustige run"},{t:"q",km:6,n:"Rustig + strides",steps:["Rustige duurloop: ~4,5 km op 6:30–6:55 (praattempo)","Strides: 6× 20 sec vloeiend versnellen, 60–90 sec dribbel/wandel ertussen (~1,5 km)"],why:"Zachtste vorm van snelheidswerk: maakt je benen wakker en verbetert je techniek zonder de klap van echte intervallen. Een stride is géén sprint, soepel en gecontroleerd, na elke stride volledig herstellen. Voel je de knie? Strides overslaan, rustig uitlopen."},{t:"l",km:9,n:"Duurloop"}]},
 {w:2, fase:"Basis", focus:"Long run tikt 10 km aan. Eerste echte intervalletjes, gedoseerd. Voelt de knie iets, minder dan of stop.",
  runs:[{t:"e",km:7,n:"Rustige run"},{t:"q",km:6,n:"Intervallen",steps:["Inlopen: 10 min rustig (~1,5 km)","Hoofddeel: 5× 400 m op 5:15–5:30, 90 sec dribbelherstel","Uitlopen: 10 min rustig (~1,5 km)"],why:"Je eerste echte intervaltraining. Korte snelle stukken maken je efficiënter en sneller; 400m is bewust kort voor deze kennismaking. Alle vijf in ongeveer hetzelfde tempo, ga je de eerste te hard dan klap je op de laatste. Herstel volledig, en stop bij kniepijn."},{t:"l",km:10,n:"Duurloop"}]},
 {w:3, fase:"Basis", herstel:true, focus:"Herstelweek. Volume omlaag zodat de benen en de knie bijtanken. Kwaliteit blijft licht.",
  runs:[{t:"e",km:6,n:"Rustige run"},{t:"q",km:5,n:"Rustig + strides",steps:["Rustige duurloop: ~3,5 km heel ontspannen","Strides: 4× 20 sec vlot met ruim herstel (~1,5 km)"],why:"Herstelweek: je lichaam verwerkt nu de opbouw, dat gebeurt tijdens rust niet tijdens de training. Alles moet makkelijk voelen; kom je hijgend thuis, dan ging het te hard. Speelde de knie? Dé week om 'm te laten kalmeren, sla desnoods de strides over."},{t:"l",km:8,n:"Duurloop"}]},
 {w:4, fase:"Opbouw", focus:"Weer omhoog. Long run 11 km, intervallen iets langer.",
  runs:[{t:"e",km:7,n:"Rustige run"},{t:"q",km:7,n:"Intervallen",steps:["Inlopen: 12 min rustig (~1,7 km)","Hoofddeel: 6× 400 m op 5:15–5:30, 90 sec dribbelherstel","Uitlopen: 12 min rustig (~1,7 km)"],why:"Voortbouwen op week 2 met één herhaling extra. Kun je nummer 6 nog in hetzelfde tempo als nummer 1? Dan goed gedoseerd. Zakt je tempo per herhaling weg, dan startte je te snel, volgende keer rustiger beginnen. Knie voelbaar: stoppen."},{t:"l",km:11,n:"Duurloop"}]},
 {w:5, fase:"Opbouw", focus:"Eerste tempoblokken: aaneengesloten iets sneller lopen. Long run 12 km.",
  runs:[{t:"e",km:7,n:"Rustige run"},{t:"q",km:7,n:"Tempo",steps:["Inlopen: 13 min rustig (~1,9 km)","Hoofddeel: 3× 5 min op tempo (5:40–5:55), 2,5 min dribbel ertussen","Uitlopen: 13 min rustig (~1,9 km)"],why:"We schakelen van korte intervallen naar langere tempoblokken, dit traint je drempel: de motor achter een snellere halve. Comfortabel-zwaar: je kunt nog een paar woorden zeggen, geen gesprek. Na het derde blok moet je je nog goed voelen; loop het niet als een race."},{t:"l",km:12,n:"Duurloop"}]},
 {w:6, fase:"Opbouw", focus:"Langere intervallen (600m). Long run 13 km. Neem water/gel mee op de long run.",
  runs:[{t:"e",km:8,n:"Rustige run"},{t:"q",km:8,n:"Intervallen",steps:["Inlopen: 14 min rustig (~2,0 km)","Hoofddeel: 5× 600 m op 5:15–5:30, 90 sec dribbelherstel","Uitlopen: 14 min rustig (~2,0 km)"],why:"Langere intervallen dan de 400m'jes: je houdt het snelle tempo iets langer vast, wat snelheid én uithoudingsvermogen bouwt. Elke 600m voelt als een klein bergje, verdeel je energie zodat je het tempo tot het eind vasthoudt. Meer belasting per herhaling, dus luister goed naar de knie."},{t:"l",km:13,n:"Duurloop"}]},
 {w:7, fase:"Opbouw", herstel:true, focus:"Herstelweek. Gas terug na drie weken opbouwen.",
  runs:[{t:"e",km:6,n:"Rustige run"},{t:"q",km:6,n:"Rustig + strides",steps:["Rustige duurloop: ~4,5 km ontspannen","Strides: 4–6× 20 sec vlot met ruim herstel (~1,5 km)"],why:"Na drie stevige weken tanken benen en knie nu bij. De strides houden je snelheid levend zonder te belasten. Voel je je aan het eind ongeduldig om te knallen, dan is de herstelweek geslaagd. Perfecte week om te checken hoe de knie ervoor staat."},{t:"l",km:10,n:"Duurloop"}]},
 {w:8, fase:"Opbouw", focus:"Langere tempoblokken. Long run 14 km. Test alvast je race-ontbijt en drinken onderweg.",
  runs:[{t:"e",km:8,n:"Rustige run"},{t:"q",km:8,n:"Tempo",steps:["Inlopen: 15 min rustig (~2,1 km)","Hoofddeel: 2× 10 min op tempo (5:40–5:55), 3 min dribbel ertussen","Uitlopen: 15 min rustig (~2,1 km)"],why:"Langere aaneengesloten tempoblokken dan week 5, je traint je vermogen om een stevig tempo écht lang vast te houden: de sleutel voor de tweede helft van je race. De eerste minuten voelen prima, richting het eind moet je focussen. Begin elk blok iets rustiger dan je denkt aan te kunnen."},{t:"l",km:14,n:"Duurloop"}]},
 {w:9, fase:"Opbouw", focus:"Long run 15 km, nieuw terrein. Intervallen op 600m.",
  runs:[{t:"e",km:9,n:"Rustige run"},{t:"q",km:8,n:"Intervallen",steps:["Inlopen: 11 min rustig (~1,6 km)","Hoofddeel: 6× 600 m op 5:15–5:30, 90 sec dribbelherstel","Uitlopen: 11 min rustig (~1,6 km)"],why:"Je zwaarste intervaltraining: zes langere herhalingen op snelheid, in de fase waarin je conditie het hardst groeit. Doel: alle zes in ongeveer hetzelfde tempo, gelijkmatigheid verslaat een heldhaftige start. Qua kniebelasting een van de zwaarste sessies; voel je iets, stop dan zonder twijfel."},{t:"l",km:15,n:"Duurloop"}]},
 {w:10, fase:"Opbouw", focus:"Long run 16 km. Stevige tempoblokken. Mooie mijlpaal richting de halve.",
  runs:[{t:"e",km:9,n:"Rustige run"},{t:"q",km:9,n:"Tempo",steps:["Inlopen: 14 min rustig (~2,0 km)","Hoofddeel: 3× 8 min op tempo (5:40–5:55), 3 min dribbel ertussen","Uitlopen: 14 min rustig (~2,0 km)"],why:"Veel tempo-volume (24 min) in de laatste grote opbouwweek, dit maakt je racetempo straks makkelijker doordat je drempel omhoog gaat. Het derde blok is een mentale test. Lukt het niet meer op tempo? Geen falen, noteer het, het vertelt ons iets over je herstel."},{t:"l",km:16,n:"Duurloop"}]},
 {w:11, fase:"Opbouw", herstel:true, focus:"Herstelweek vóór de piek. Fris worden.",
  runs:[{t:"e",km:7,n:"Rustige run"},{t:"q",km:7,n:"Rustig + strides",steps:["Rustige duurloop: ~5,5 km ontspannen","Strides: 4–6× 20 sec vlot met ruim herstel (~1,5 km)"],why:"Laatste herstelweek vóór de piek: laad je batterij op zodat je de zwaarste twee weken fris kunt aanvliegen. Ga niet stiekem harder omdat je je goed voelt, bewaar het. Check de knie: de piek vraagt straks het meeste van je."},{t:"l",km:13,n:"Duurloop"}]},
 {w:12, fase:"Piek", focus:"Piekfase. Racetempo-blokken: oefenen op je doeltempo (~6:00). Long run 17 km.",
  runs:[{t:"e",km:9,n:"Rustige run"},{t:"q",km:12,n:"Racetempo",steps:["Inlopen: 8 min rustig (~1,1 km)","Hoofddeel: 3× 3 km op racetempo (~6:00), 3 min dribbel ertussen","Uitlopen: 8 min rustig (~1,1 km)"],why:"Nu oefenen we specifiek op je wedstrijdtempo, zodat het op 1 november vertrouwd voelt in plaats van eng. Dit moet juist níet keihard voelen, racetempo hoort gecontroleerd en bijna comfortabel te zijn. Voelt het loodzwaar, dan is de streeftijd te ambitieus en stellen we bij: geef door hoe het ging, dan bepalen we samen 2:00 of 2:10."},{t:"l",km:17,n:"Duurloop"}]},
 {w:13, fase:"Piek", focus:"De langste van het schema: 18 km. Langere racetempo-blokken. Hierna weet je: de afstand komt eraan.",
  runs:[{t:"e",km:9,n:"Rustige run"},{t:"q",km:11,n:"Racetempo",steps:["Inlopen: 9 min rustig (~1,3 km)","Hoofddeel: 2× 4 km op racetempo (~6:00), 3 min dribbel ertussen","Uitlopen: 9 min rustig (~1,3 km)"],why:"Langere aaneengesloten stukken op racetempo, als laatste grote scherpteslag, je bevestigt dat je het doeltempo lang kunt vasthouden. Gecontroleerd stevig; vertrouw op wat je hebt opgebouwd. Dit valt in je drukste week (ook de 18 km long run), dus verdeel je energie en luister extra naar knie en lichaam."},{t:"l",km:18,n:"Duurloop — langste!"}]},
 {w:14, fase:"Taper", focus:"Taper: volume flink omlaag, beetje scherpte erin houden. Je wordt hier fitter zonder hard te trainen.",
  runs:[{t:"e",km:6,n:"Rustige run"},{t:"q",km:6,n:"Tempo",steps:["Inlopen: 17 min rustig (~2,5 km)","Hoofddeel: 2× 2 km op tempo (5:40–5:55), 3 min dribbel ertussen","Uitlopen: kort uitdribbelen (~0,5 km)"],why:"Taper: volume flink omlaag, een beetje scherpte erin. Je verliest geen conditie door minder te doen, je wint frisheid. Deze blokken mogen lekker aanvoelen omdat je uitgerust bent. Weersta de verleiding om nog een goede training te doen; fris aan de start is meer waard."},{t:"l",km:10,n:"Duurloop"}]},
 {w:15, fase:"Race", focus:"Raceweek! Alles kort en fris. Niets nieuws op de dag zelf. Start rustig, de eerste kilometers moeten bijna te makkelijk voelen. Geniet ervan!",
  runs:[{t:"e",km:5,n:"Rustige run"},{t:"q",km:4,n:"Opfrisser",steps:["Inlopen: kort en rustig (~0,5 km)","Hoofddeel: 3× 1 km op racetempo (~6:00) met ruim herstel + een paar losse strides","Uitlopen: kort uitdribbelen"],why:"Laatste korte opfrisser om je benen aan racetempo te herinneren zonder ze moe te maken, puur scherpte, geen training meer. Makkelijk en vertrouwd; dit tempo ken je nu. Niets nieuws deze week (schoenen, ontbijt), en op de dag zelf: start rustig, de eerste km's moeten bijna te langzaam voelen. Succes! 🏁"},{t:"r",km:21.1,n:"🏁 HALVE MARATHON"}]}
];
const KRACHT_TOM = "Hamstring-kracht (fysio-oefeningen · later Nordic curls, single-leg bridge, hip thrust)";
const KRACHT_DENISE = "Knie-kracht: glute bridges, clamshells, single-leg step-downs, wall sits en kuitheffingen. Sterke billen en quads ontlasten de knie.";

const PLAN = LOOP.rowId === "tom" ? PLAN_TOM : PLAN_DENISE;
const KRACHT = LOOP.rowId === "tom" ? KRACHT_TOM : KRACHT_DENISE;
const KRACHT_COUNT = LOOP.rowId === "tom" ? 2 : 1; // Denise: 1 krachtsessie per week
const TYPE_META = {e:{tag:null}, q:{tag:["KWALITEIT","q"]}, l:{tag:["LONG RUN","l"]}, t:{tag:["TEST","q"]}, r:{tag:["RACE","r"]}, h:{tag:["VAKANTIE","l"]}};

/* ================= SEED (startdata per persoon — ingebakken) ================= */
// Week 1 start nu 27 juli; Tom's runs van 13/18/20/26 juli liggen dus vóór het schema
// en verhuizen naar HISTORY_TOM (read-only). SEED_TOM start daarom met lege logs.
// LET OP: dit heeft geen invloed op reeds in Supabase opgeslagen data — mergeSeed()
// gebruikt SEED alleen bij een compleet lege/nooit-opgeslagen state.
const SEED_TOM = {athletes:{ a:{name:"Tom", logs:{}} }};
const SEED_DENISE = {athletes:{ a:{name:"Denise <3", logs:{
  "w1r3": {done:true, dist:6.29, time:"41:05", feel:4, hr:156, ham:"erger", note:"20 juli. Gem. 6:32/km, HR 156. Knie: pijn na afloop.", ts:1753019160000}
}} }};

// Runs van vóór de schemastart, read-only overzicht.
// Tom: 18/20/26 juli (26 juli = 10,4 km, afgesproken Fitbit-appwaarde). De 13-juli-run
// had geen gedeelde afstand/tijd en staat daarom niet als meetbare rij hierin.
const HISTORY_TOM = [
  {date:"18 jul", km:6.26, time:"41:25", pace:"6:36", hr:176},
  {date:"20 jul", km:4.27, time:"31:01", pace:"7:16", hr:156},
  {date:"26 jul", km:10.4, time:"66:04", pace:"6:20", hr:167}
];
// Denise' runs van vóór de schemastart (13 juli), uit haar Huawei-data.
const HISTORY_DENISE = [
  {date:"3 mei",  km:8.01, time:"48:43",   pace:"6:05", hr:163},
  {date:"20 mei", km:10.01, time:"1:01:38", pace:"6:09", hr:164},
  {date:"7 jun",  km:5.21, time:"30:51",   pace:"5:55", hr:171},
  {date:"12 jun", km:5.01, time:"34:41",   pace:"6:55", hr:148},
  {date:"16 jun", km:6.66, time:"45:42",   pace:"6:52", hr:151},
  {date:"28 jun", km:5.06, time:"33:20",   pace:"6:35", hr:162},
  {date:"2 jul",  km:8.02, time:"51:39",   pace:"6:26", hr:160},
  {date:"18 jul", km:5.01, time:"31:25",   pace:"6:16", hr:158}
];
const HISTORY = LOOP.rowId === "tom" ? HISTORY_TOM : HISTORY_DENISE;

function baseSeed(){
  const s = LOOP.rowId === "tom" ? SEED_TOM : SEED_DENISE;
  const out = JSON.parse(JSON.stringify(s));
  out.athletes.a.name = LOOP.name || out.athletes.a.name;
  out.athletes.a.tennisWeeks = out.athletes.a.tennisWeeks || {}; // {weeknr: true}
  return out;
}
function mergeSeed(stored){
  // Bestaat er al opgeslagen state? Dan is die volledig leidend — de SEED wordt
  // NIET opnieuw ingespoten. Anders zou een verwijderde (voor-ingevulde) run
  // bij elke herlaad terugkomen. SEED geldt dus alleen bij een lege start.
  if(stored && stored.athletes && stored.athletes.a){
    const src = stored.athletes.a;
    return {athletes:{ a:{
      ...src,                          // behoud ALLE bestaande velden (o.a. confirmedHmPace)
      name: src.name || LOOP.name,
      logs: src.logs || {},
      tennisWeeks: src.tennisWeeks || {}
    }}};
  }
  return baseSeed();
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
let activePhase = null;  // actieve fase-tab (UI-state, niet persistent)
let openWeeks = null;    // Set van uitgeklapte weeknummers (UI-state)
let formVals = {};

const $ = id => document.getElementById(id);

function fmt(n){ return (Math.round(n*10)/10).toString().replace(".",","); }

// Tolerant: 38:04 / 38.04 / 38,04 → allemaal 38:04. Punt/komma worden als
// scheidingsteken behandeld en dubbele/rand-dubbelepunten opgeschoond.
function normalizeTime(t){
  if(t==null) return "";
  return String(t).trim().replace(/[.,]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "");
}
function parseTime(t){
  const n = normalizeTime(t);
  if(!n) return 0;
  const parts = n.split(":").map(function(x){ return Number(x); });
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
function tennisWeeksOf(){ return state.athletes[who].tennisWeeks || (state.athletes[who].tennisWeeks = {}); }

// Sessie-id: Tom heeft stabiele expliciete id's (r.id, bv. "tom-2026-w05-five-k-test");
// Denise (en oude data) valt terug op het positionele patroon "w{week}r{index}".
function sessionId(w, i, r){ return (r && r.id) || ("w"+w.w+"r"+(i+1)); }
// Zoek een sessie op id op in het actieve PLAN. Werkt voor beide id-vormen.
function findSession(id){
  for(const w of PLAN){
    for(let i=0;i<w.runs.length;i++){
      if(sessionId(w,i,w.runs[i]) === id) return {w, i, r:w.runs[i]};
    }
  }
  return null;
}

// Als er in een week getennist is, vervalt de KORTSTE easy run (nooit long/kwaliteit).
// Geeft de run-id terug die die week wordt overgeslagen, of null.
function skippedRunId(w){
  if(!tennisWeeksOf()[w.w]) return null;
  let best = null, bestKm = Infinity;
  w.runs.forEach((r,i)=>{ if(r.t==="e" && r.km < bestKm){ bestKm = r.km; best = sessionId(w,i,r); } });
  return best;
}
function totalPlannedKm(){
  return PLAN.reduce((s,w)=>{
    const skip = skippedRunId(w);
    return s + w.runs.reduce((a,r,i)=> a + (sessionId(w,i,r)===skip ? 0 : r.km), 0);
  }, 0);
}

function currentWeek(){
  const now = new Date();
  const diff = Math.floor((now - START_DATE) / 864e5);
  if(diff < 0) return 0;
  return Math.min(PLAN.length, Math.floor(diff/7)+1);
}

/* ================= RENDER ================= */
function render(){
  const parts = [renderAlert, renderRoute, renderStats, renderZones, renderBars, renderHistory, renderWeeks, renderFoot];
  parts.forEach(fn=>{ try{ fn(); }catch(e){ console.error(fn.name, e); } });
}

function renderAlert(){
  const el = $("topAlert");
  if(CHECK !== "knie"){ el.style.display = "none"; return; }
  el.style.display = "";
  el.innerHTML = '<span class="at">Knie — aandachtspunt</span>'
    + 'We gaan nu ambitieus (meer km, sneller, intervallen), dus de knie blijft een monitorpunt, geen rem. <b>Vangnet: staat de knie-check 2× op rood, dan vervalt de eerstvolgende interval-/kwaliteitssessie</b> en houd je het rustig tot het weg is (die sessies belasten de knie het zwaarst). Een fysio die meekijkt is sterk aanbevolen.'
    + '<br><br><b>Cadans-tip:</b> je pasfrequentie is nu ~145–155/min. Probeer richting <b>165–170/min</b> (kortere pas, landing dichter onder je lichaam) via een metronoom-app of muziek op ~165 bpm — je directe zelf-ingreep tegen kniebelasting.';
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
  $("routeStart").textContent = "start · " + START_DATE.toLocaleDateString("nl-NL",{day:"numeric",month:"short"});
}
function sessKm(id){
  const s = findSession(id); return s ? s.r.km : 0;
}

function renderStats(){
  const wk = currentWeek();
  const weeksLeft = Math.max(0, Math.ceil((RACE_DATE - new Date())/(7*864e5)));
  $("stWeeks").textContent = weeksLeft;
  const logs = logsOf();
  let km=0, done=0, total=0;
  PLAN.forEach(w=>{
    const skip = skippedRunId(w);
    w.runs.forEach((r,i)=>{
      const id = sessionId(w,i,r);
      if(id===skip) return; // vervangen door tennis: telt niet mee als openstaand
      total++;
      const l = logs[id];
      if(l && l.done){ done++; km += (l.dist!=null && l.dist!=="" ? +l.dist : r.km); }
    });
  });
  $("stKm").textContent = fmt(km);
  $("stSess").textContent = (total? Math.round(100*done/total) : 0) + "%";
  // blessure-trend: laatste 3 checks (alleen als het profiel een check heeft)
  const hamEl = $("stHam");
  if(CHECK){
    const checks = [];
    PLAN.forEach(w=> w.runs.forEach((r,i)=>{
      const l = logs[sessionId(w,i,r)];
      if(l && l.done && l.ham) checks.push(l.ham);
    }));
    const last = checks.slice(-3);
    hamEl.innerHTML = [0,1,2].map(i=>{
      const v = last[i];
      const c = v==="goed"?"g": v==="licht"?"a": v==="erger"?"r":"";
      return '<i class="'+c+'"></i>';
    }).join("");
    $("stHamLbl").textContent = CHECK_META[CHECK].label.toLowerCase();
    hamEl.parentElement.style.display = "";
  } else {
    hamEl.innerHTML = "<i></i><i></i><i></i>";
    $("stHamLbl").textContent = "—";
  }
  const now = new Date();
  const days = Math.ceil((RACE_DATE - now)/864e5);
  const startStr = START_DATE.toLocaleDateString("nl-NL",{weekday:"long",day:"numeric",month:"long"});
  $("countdown").textContent = wk===0
    ? "Week 1 start " + startStr + " · nog " + days + " dagen tot de race"
    : "Week " + wk + " van " + PLAN.length + " · nog " + days + " dagen tot de race";
}

function renderZones(){
  if(LOOP.zones==="tom"){
    $("zonesTitle").textContent = "Tempo-zones — " + state.athletes.a.name;
    // Statische rijen + één dynamische racetempo-rij (berekend uit de 5K-test, of bevestigd).
    const conf = getConfirmedHmPaceSecPerKm();
    const calc = getCalculatedHmPaceSecPerKm();
    let raceP, raceD;
    if(conf!=null){ raceP = fmtPace(conf); raceD = "bevestigd racetempo · tik om te wijzigen"; }
    else if(calc!=null){ raceP = "≈"+fmtPace(calc); raceD = "voorlopige schatting uit je 5K-test — tik om een bevestigd tempo vast te leggen"; }
    else { raceP = "—"; raceD = "voorlopig — wordt berekend na de 5K-test in week 5 · tik om alvast handmatig vast te leggen"; }
    const staticRows = ZONES_TOM.map(z=>
      '<div class="zone"><span><b>'+z.n+'</b><br><small style="color:var(--mut)">'+z.d+'</small></span><span class="p">'+z.p+' /km</span></div>').join("");
    const raceRow = '<div class="zone" id="raceZone" style="cursor:pointer"><span><b>Racetempo (halve marathon)</b><br><small style="color:var(--mut)">'+raceD+'</small></span><span class="p">'+raceP+' /km</span></div>';
    $("zonesList").innerHTML = staticRows + raceRow;
    const rz = $("raceZone"); if(rz) rz.onclick = promptConfirmHmPace;
    $("zonesNote").innerHTML = "Rustig tempo: loop op ontspannen gesprekstempo — start eventueel rond <b>7:15/km</b>, maar de praattest is leidend; je moet volledige zinnen kunnen spreken. 7:15/km is een <b>startpunt, geen verplicht tempo en geen ondergrens</b> — langzamer mag altijd. Het racetempo hierboven is een <b>voorlopige schatting</b> (Riegel-omrekening van je 5K-test), nooit een definitief doel: bevestiging hangt ook af van hoe je long runs, herstel, trainingscontinuïteit en hamstring verlopen. <b>Extra afstand:</b> geplande afstand is de beoogde training, geen minimum — geen extra km's bij kwaliteitssessies, long runs of herstelweken; bij een gewone short run hooguit 0,5–1 km extra als je klachtenvrij en goed hersteld bent; nooit extra herhalingen. <b>Hamstring:</b> stop het snelle deel direct bij trekken, steken of een ongewoon gevoel. Is rustig joggen volledig pijnvrij, loop dan maximaal 5–10 min rustig uit; blijft het gevoel of wordt het erger, stop de hele run en wandel terug. Bij <b>2× op rij klachten</b>: sla de eerstvolgende kwaliteitssessie over.";
  } else {
    $("zonesTitle").textContent = "Tempo-zones — " + state.athletes.a.name;
    $("zonesList").innerHTML = ZONES_DENISE.map(z=>
      '<div class="zone"><span><b>'+z.n+'</b><br><small style="color:var(--mut)">'+z.d+'</small></span><span class="p">'+z.p+' /km</span></div>').join("");
    $("zonesNote").innerHTML = "Streeftijd: <b>2:10</b> realistisch, <b>2:00</b> als stretch-doel (herijken na een paar weken data / testrun). Meeste km's rustig op praattempo; de wekelijkse kwaliteitssessie maakt je sneller. <b>Knie = vangnet</b>: staat de knie-check 2× op rood, dan vervalt de eerstvolgende interval-/kwaliteitssessie tot het weg is. Fysio-check is sterk aanbevolen. Cadans richting <b>165–170</b> (kortere pas) helpt de knie het meest.";
  }
}

function renderBars(){
  const logs = logsOf();
  const el = $("bars"); el.innerHTML = "";
  const maxKm = Math.max(...PLAN.map(w=> w.runs.reduce((a,r)=>a+r.km,0)));
  PLAN.forEach(w=>{
    const skip = skippedRunId(w);
    let plan = 0, act = 0;
    w.runs.forEach((r,i)=>{
      const id = sessionId(w,i,r);
      if(id===skip) return;
      plan += r.km;
      const l = logs[id]; if(l&&l.done) act += (l.dist!=null && l.dist!=="" ? +l.dist : r.km);
    });
    const bar = document.createElement("div"); bar.className="bar";
    bar.innerHTML = '<div class="stack" style="height:'+Math.round(100*plan/maxKm)+'%"><div class="fill" style="height:'+(plan? Math.min(100,Math.round(100*act/plan)) : 0)+'%"></div></div><div class="lbl">'+w.w+'</div>';
    el.appendChild(bar);
  });
}

function renderHistory(){
  const card = $("histCard");
  if(!HISTORY.length){ card.style.display = "none"; return; }
  card.style.display = "";
  $("histList").innerHTML = HISTORY.map(r=>
    '<div class="hist-row"><span class="hd">'+r.date+'</span>'
    +'<span class="hk">'+fmt(r.km)+' km</span>'
    +'<span class="ht">'+r.time+'</span>'
    +'<span class="hp">'+r.pace+' /km</span>'
    +'<span class="hh">'+(r.hr? r.hr+" bpm" : "")+'</span></div>').join("");
  const tot = HISTORY.reduce((a,r)=> a + r.km, 0);
  const startStr = START_DATE.toLocaleDateString("nl-NL",{day:"numeric",month:"long"});
  $("histNote").textContent = HISTORY.length + " runs · " + fmt(tot) + " km, gelopen vóór de start van het schema (" + startStr + "). Mooie basis om op door te bouwen.";
}

function renderWeeks(){
  const logs = logsOf();
  const el = $("weeks"); el.innerHTML = "";
  const cur = currentWeek();
  const checkLbl = CHECK ? CHECK_META[CHECK].label.toLowerCase() : "";

  // fases in volgorde van eerste voorkomen
  const phases = [];
  PLAN.forEach(w=>{ if(!phases.includes(w.fase)) phases.push(w.fase); });
  if(openWeeks === null) openWeeks = new Set([cur]);
  if(activePhase === null || !phases.includes(activePhase)){
    activePhase = (PLAN.find(w=> w.w === cur) || PLAN[0]).fase;
  }

  // tab-balk met de fases
  const tabs = document.createElement("div"); tabs.className = "phase-tabs";
  phases.forEach(f=>{
    const b = document.createElement("button");
    const isCur = PLAN.some(w=> w.w === cur && w.fase === f);
    b.className = "phase-tab" + (f===activePhase?" on":"") + (isCur?" cur":"");
    b.textContent = f;
    b.onclick = ()=>{ activePhase = f; renderWeeks(); };
    tabs.appendChild(b);
  });
  el.appendChild(tabs);

  PLAN.filter(w=> w.fase === activePhase).forEach(w=>{
    const skip = skippedRunId(w);
    const d = document.createElement("details"); d.className = "week";
    if(w.w === cur) d.classList.add("current");
    d.open = openWeeks.has(w.w);
    d.ontoggle = ()=>{ if(d.open) openWeeks.add(w.w); else openWeeks.delete(w.w); };
    const ws = START_DATE.getTime() + (w.w-1)*7*864e5;
    const we = ws + 6*864e5;
    const dateStr = new Date(ws).toLocaleDateString("nl-NL",{day:"numeric",month:"short"}) + " – " + new Date(we).toLocaleDateString("nl-NL",{day:"numeric",month:"short"});
    // tellingen exclusief de overgeslagen (tennis) run
    let planKm = 0, total = 0, doneCnt = 0;
    w.runs.forEach((r,i)=>{ const id=sessionId(w,i,r); if(id===skip) return; planKm += r.km; total++; if(logs[id]?.done) doneCnt++; });

    const tOn = !!tennisWeeksOf()[w.w];
    let body = '<div class="tennis'+(tOn?" on":"")+'" data-tw="'+w.w+'">🎾 Getennist deze week'+(tOn?" ✓":"")+'</div>';
    body += '<div class="wk-focus">'+w.focus+'</div>';
    w.runs.forEach((r,i)=>{
      const id = sessionId(w,i,r);
      const meta = TYPE_META[r.t];
      const tag = meta.tag ? '<span class="tag '+meta.tag[1]+'">'+meta.tag[0]+'</span>' : "";
      if(id===skip){
        body += '<div class="sess skipped" data-skip="1">'
          + '<div class="chk">🎾</div>'
          + '<div class="info"><div class="name">Dag '+(i+1)+' · '+r.n+tag+'</div>'
          + '<div class="det skip-note">Vervangen door tennis deze week</div></div>'
          + '<div class="km">'+fmt(r.km)+'<small style="font-size:12px"> km</small></div></div>';
        return;
      }
      const l = logs[id];
      const paceHint = LOOP.zones==="tom" ? paceFor(r.t) : paceForPartner(r.t);
      const mainHtml = r.steps
        ? '<ol class="q-steps">'+r.steps.map(st=>'<li>'+st+'</li>').join("")+'</ol>'
        : (r.d ? r.d : paceHint);
      const whyTxt = r.why ? (Array.isArray(r.why) ? r.why.join("<br>") : r.why) : "";
      const whyHtml = whyTxt ? '<div class="q-why">'+whyTxt+'</div>' : "";
      const paceBadge = r.hmPaceRef ? '<div class="q-pace">'+hmPaceBadgeText()+'</div>' : "";
      const detHtml = mainHtml + whyHtml + paceBadge;
      const pc = (l&&l.done) ? paceStr(l.dist, l.time) : "";
      const loggedLine = (l&&l.done) ? '<div class="logged">✓ '
        +(l.dist? fmt(+l.dist)+" km":"")
        +(l.time? " · "+l.time:"")
        +(pc? " · "+pc:"")
        +(l.hr? " · "+l.hr+" bpm":"")
        +(l.ham? " · "+checkLbl+": "+l.ham:"")+'</div>' : "";
      body += '<div class="sess '+(r.t==="r"?"race ":"")+((l&&l.done)?"done":"")+'" data-id="'+id+'">'
        + '<div class="chk">'+((l&&l.done)?"✓":"")+'</div>'
        + '<div class="info"><div class="name">Dag '+(i+1)+' · '+r.n+tag+'</div>'
        + '<div class="det">'+detHtml+'</div>'+loggedLine+'</div>'
        + '<div class="km">'+(r.t==="h" ? '<small style="font-size:14px">vrij</small>' : fmt(r.km)+'<small style="font-size:12px"> km</small>')+'</div></div>';
    });
    // kracht (aantal sessies profiel-afhankelijk)
    let kracht = '<div class="kracht'+(KRACHT_COUNT===1?" single":"")+'">';
    for(let ki=1; ki<=KRACHT_COUNT; ki++){
      const kid = "w"+w.w+"k"+ki;
      const kl = logs[kid];
      kracht += '<div class="sess '+(kl?.done?"done":"")+'" data-id="'+kid+'" data-kracht="1"><div class="chk">'+(kl?.done?"✓":"")+'</div><div class="info"><div class="name">Kracht'+(KRACHT_COUNT>1?" "+ki:"")+'</div></div></div>';
    }
    kracht += '</div>';
    body += kracht + '<div class="note" style="margin-top:2px">'+KRACHT+'</div>';

    d.innerHTML = '<summary>'
      + '<div class="wk-num">W'+w.w+'<small>'+(w.herstel?"herstel":w.fase)+'</small></div>'
      + '<div class="wk-meta"><div class="t">'+dateStr+'</div><div class="d">'+total+' runs · '+fmt(planKm)+' km gepland'+(skip?" · 🎾":"")+'</div></div>'
      + '<div class="wk-prog '+(total>0 && doneCnt===total?"done":"")+'">'+doneCnt+'/'+total+'</div>'
      + '</summary><div class="wk-body">'+body+'</div>';
    el.appendChild(d);
  });

  el.querySelectorAll(".tennis").forEach(t=>{
    t.onclick = (e)=>{ e.stopPropagation(); toggleTennis(+t.dataset.tw); };
  });
  el.querySelectorAll(".sess").forEach(s=>{
    s.onclick = (e)=>{
      if(s.dataset.skip) return;
      const id = s.dataset.id;
      if(s.dataset.kracht){ toggleKracht(id); return; }
      // Tik op het rondje = direct afvinken (1-tik loggen). Rest van de rij = details.
      if(e.target.closest(".chk")){ toggleDone(id); return; }
      openLog(id);
    };
  });
}
/* ---- Halve-marathontempo: berekend (Riegel uit 5K-test) vs. bevestigd (handmatig) ---- */
// De 5K-testtijd wordt uitsluitend gelezen uit de sessie met isFiveKTest:true (week 5),
// via het stabiele sessie-id — geen scan over alle logs.
function getFiveKTestId(){
  if(LOOP.rowId !== "tom") return null;
  for(const w of PLAN_TOM){
    for(let i=0;i<w.runs.length;i++){
      const r = w.runs[i];
      if(r.isFiveKTest) return sessionId(w, i, r);
    }
  }
  return null;
}
function getFiveKSeconds(){
  const id = getFiveKTestId(); if(!id) return null;
  const l = logsOf()[id]; return (l && l.fiveK) ? parseTime(l.fiveK) : null;
}
// Riegel-formule, exponent 1.06: T_HM = T_5K * (21.1/5)^1.06 → sec/km.
function getCalculatedHmPaceSecPerKm(){
  const t5 = getFiveKSeconds(); if(!t5) return null;
  return (t5 * Math.pow(21.1/5, 1.06)) / 21.1;
}
function getConfirmedHmPaceSecPerKm(){
  const v = state && state.athletes && state.athletes.a ? state.athletes.a.confirmedHmPace : null;
  return v ? parseTime(v) : null;
}
// Bevestigd tempo heeft altijd voorrang op de berekende schatting.
function getEffectiveHmPaceSecPerKm(){
  const c = getConfirmedHmPaceSecPerKm();
  return c != null ? c : getCalculatedHmPaceSecPerKm();
}
function fmtPace(sec){ const m = Math.floor(sec/60), s = Math.round(sec%60); return m + ":" + (s<10?"0"+s:""+s); }
function hmPaceBadgeText(){
  const conf = getConfirmedHmPaceSecPerKm();
  if(conf != null) return "Temporichtpunt: " + fmtPace(conf) + " /km (bevestigd)";
  const calc = getCalculatedHmPaceSecPerKm();
  if(calc != null) return "Temporichtpunt: ≈" + fmtPace(calc) + " /km (voorlopige schatting uit je 5K-test — nog niet definitief; hangt ook af van long runs, herstel, continuïteit en hamstring)";
  return "Temporichtpunt: voorlopig — wordt berekend na de 5K-test in week 5";
}
// Handmatig een bevestigd racetempo vastleggen (geen automatische coachlogica).
function promptConfirmHmPace(){
  const cur = (state && state.athletes && state.athletes.a && state.athletes.a.confirmedHmPace) || "";
  const v = prompt("Bevestigd racetempo (mm:ss per km) — leeg laten om terug te vallen op de berekende schatting:", cur);
  if(v === null) return;
  state.athletes.a.confirmedHmPace = v.trim() ? normalizeTime(v.trim()) : null;
  saveState(); render();
}

function paceFor(t){
  if(LOOP.zones!=="tom") return "";
  let raceHint;
  const p = getEffectiveHmPaceSecPerKm();
  if(p == null) raceHint = "Racetempo: voorlopig — wordt berekend na de 5K-test (week 5)";
  else {
    const conf = getConfirmedHmPaceSecPerKm();
    raceHint = conf != null
      ? "Racetempo: " + fmtPace(p) + " /km (bevestigd) — gecontroleerd starten"
      : "Racetempo: ≈" + fmtPace(p) + " /km (voorlopige schatting) — gecontroleerd starten";
  }
  return {e:"Tempo: 7:15 /km (startpunt) — praattest leidend, langzamer mag altijd", l:"Tempo: 7:15 /km (startpunt), comfortabel volhouden", q:"Zie omschrijving", t:"", r:raceHint, h:"Uren op de benen = training. Afstand loggen mag, hoeft niet."}[t] || "";
}
function paceForPartner(t){
  return {e:"Tempo: 6:30–6:55 /km — praattempo", l:"Tempo: 6:30–6:55 /km, comfortabel volhouden", q:"Zie omschrijving", t:"", r:"Racetempo ~6:00 /km — gecontroleerd starten", h:""}[t] || "";
}
// Eén rustige regel met de bedoeling van de sessie (tempo uit de zones + bedoeld gevoel).
function intentLine(r){
  const z = LOOP.zones==="tom" ? ZONES_TOM : ZONES_DENISE;
  switch(r.t){
    case "e": return "Bedoeld: rustig praattempo (" + z[0].p + " /km) · gevoel 2–3";
    case "l": return "Bedoeld: rustig/lang, praattempo (" + z[0].p + " /km) · gevoel 2–3";
    case "q": return "Bedoeld: kwaliteit, zie omschrijving · gevoel 3–4";
    case "t": return "Bedoeld: test, zie omschrijving";
    case "r":
      if(LOOP.zones==="tom"){
        const p = getEffectiveHmPaceSecPerKm();
        return p != null
          ? ("Bedoeld: racetempo (~" + fmtPace(p) + " /km) · gecontroleerd")
          : "Bedoeld: racetempo (voorlopig, na de 5K-test) · gecontroleerd";
      }
      return "Bedoeld: racetempo (" + z[2].p + " /km) · gevoel 4, gecontroleerd";
    default: return "";
  }
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
  const found = findSession(id);
  if(!found) return;
  const w = found.w, r = found.r, dag = found.i + 1;
  openSess = {id, run:r, w:w.w};
  const l = logsOf()[id] || {};
  formVals = {dist:l.dist ?? "", time:l.time ?? "", feel:l.feel ?? null, ham:l.ham ?? null, note:l.note ?? ""};
  $("shTitle").textContent = "Week "+w.w+" · Dag "+dag+" — "+r.n;
  $("shDesc").textContent = (r.d || "") + (r.d? " · ":"") + "Gepland: "+fmt(r.km)+" km";
  const intent = intentLine(r);
  $("shIntent").textContent = intent;
  $("shIntent").style.display = intent ? "" : "none";
  // Afstand voorvullen met de geplande km (bewerkbaar) als er nog niks gelogd is.
  $("inDist").value = (l.dist!=null && l.dist!=="") ? l.dist : (r.km>0 && r.t!=="h" ? r.km : "");
  $("inTime").value = formVals.time;
  $("inHr").value = l.hr ?? "";
  $("inNote").value = formVals.note;
  // 5K-testtijd: alleen tonen bij de 5K-testsessie.
  $("rowFiveK").style.display = r.isFiveKTest ? "" : "none";
  $("inFiveK").value = l.fiveK ?? "";
  if(CHECK){
    $("rowHam").style.display = "";
    $("rowHam").querySelector("label").textContent = CHECK_META[CHECK].label + "-check";
    const ergerBtn = $("inHam").querySelector('button[data-v="erger"]');
    if(ergerBtn) ergerBtn.textContent = CHECK_META[CHECK].ergerLabel;
    $("hamWarn").innerHTML = CHECK_META[CHECK].warn;
  } else {
    $("rowHam").style.display = "none";
  }
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
$("inFeel").onclick = e=>{ const b=e.target.closest("button"); if(b && b.dataset.v){ formVals.feel = +b.dataset.v; syncPills(); } };
$("inHam").onclick = e=>{ const b=e.target.closest("button"); if(b && b.dataset.v){ formVals.ham = b.dataset.v; syncPills(); $("hamWarn").classList.toggle("on", formVals.ham==="erger"); } };
$("btnCancel").onclick = closeSheet;
$("overlay").onclick = ()=>{ closeSheet(); closeIO(); };
function closeSheet(){ $("overlay").classList.remove("on"); $("sheet").classList.remove("on"); openSess=null; }

$("btnSave").onclick = ()=>{
  if(!openSess) return;
  logsOf()[openSess.id] = {
    done:true,
    dist: $("inDist").value.trim()==="" ? null : parseFloat($("inDist").value.replace(",",".")),
    time: normalizeTime($("inTime").value),
    hr: $("inHr").value.trim()==="" ? null : parseInt($("inHr").value,10),
    fiveK: (openSess.run && openSess.run.isFiveKTest && $("inFiveK").value.trim()!=="") ? normalizeTime($("inFiveK").value) : null,
    feel: formVals.feel, ham: (CHECK ? formVals.ham : null),
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
function toggleDone(id){
  const logs = logsOf();
  if(logs[id] && logs[id].done){
    logs[id].done = false;              // ongedaan, maar bewaar eventuele details
    toast("Afvinken ongedaan");
  } else {
    logs[id] = Object.assign(logs[id] || {}, {done:true, ts:(logs[id] && logs[id].ts) || Date.now()});
    toast("Afgevinkt ✓");
  }
  saveState(); render();
}
function toggleTennis(wNum){
  const tw = tennisWeeksOf();
  if(tw[wNum]) delete tw[wNum]; else tw[wNum] = true;
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
