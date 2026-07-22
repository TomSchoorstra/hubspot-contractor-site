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
// Startdatum per atleet: Tom 16 wk vanaf 13 juli, Denise 15 wk vanaf 20 juli. Beide eindigen op de race.
const START_DATE = LOOP.rowId === "tom" ? new Date(2026,6,13) : new Date(2026,6,20);

const ZONES_TOM = [
  {n:"Rustig / long run", p:"6:45–7:15", d:"praattempo"},
  {n:"Vlot duurloop", p:"6:15–6:40", d:"stevig maar comfortabel"},
  {n:"Racetempo (doel ± 2:20)", p:"6:35–6:45", d:"halve-marathontempo"},
  {n:"Tempo", p:"5:45–6:00", d:"pittig, gecontroleerd"},
  {n:"Interval / strides", p:"5:25–5:40", d:"korte snelle stukken"}
];
// Zones voor Denise, afgeleid uit haar Huawei-data (mei–juli 2026).
const ZONES_DENISE = [
  {n:"Rustig / long run", p:"6:30–6:55", d:"praattempo"},
  {n:"Vlot duurloop", p:"6:05–6:25", d:"stevig maar comfortabel"},
  {n:"Racetempo (doel 2:10)", p:"~6:00", d:"halve-marathontempo (2:00 = ~5:41)"},
  {n:"Tempo", p:"5:40–5:55", d:"pittig, gecontroleerd"},
  {n:"Interval", p:"5:15–5:30", d:"korte snelle herhalingen"}
];

// type: e=rustig, q=kwaliteit, l=long, t=test, r=race
const PLAN_TOM = [
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

// Schema voor Denise — coach-revisie (jul 2026). Alleen rustige runs + long run
// (geen harde tempoblokken tot fysio-akkoord). Eerste 3 weken vlak/laag om de knie
// te laten settelen; long run blijft ≤~46% van het weekvolume; strak 3-op-1 patroon.
const PLAN_DENISE = [
 {w:1, fase:"Basis", focus:"Ambitieuze start! Vaste 3× per week: een rustige run, een kwaliteitssessie en een long run. Rustige km's blijven op praattempo. Knie in de gaten houden.",
  runs:[{t:"e",km:6,n:"Rustige run"},{t:"q",km:6,n:"Rustig + strides",d:"Rustige run, laatste km's: 6× 20 sec vlot (niet sprinten) met ruime dribbel ertussen. Zachte kennismaking met sneller lopen. Stoppen bij kniepijn."},{t:"l",km:9,n:"Duurloop"}]},
 {w:2, fase:"Basis", focus:"Long run tikt 10 km aan. Eerste echte intervalletjes, gedoseerd. Voelt de knie iets, minder dan of stop.",
  runs:[{t:"e",km:7,n:"Rustige run"},{t:"q",km:6,n:"Intervallen",d:"Inlopen, 5× 400m @ 5:15–5:30 met evenveel dribbel/wandel herstel, uitlopen. Stoppen bij kniepijn."},{t:"l",km:10,n:"Duurloop"}]},
 {w:3, fase:"Basis", herstel:true, focus:"Herstelweek. Volume omlaag zodat de benen en de knie bijtanken. Kwaliteit blijft licht.",
  runs:[{t:"e",km:6,n:"Rustige run"},{t:"q",km:5,n:"Rustig + strides",d:"Herstelweek: rustige run met 6× 20 sec licht versnellen. Niets forceren."},{t:"l",km:8,n:"Duurloop"}]},
 {w:4, fase:"Opbouw", focus:"Weer omhoog. Long run 11 km, intervallen iets langer.",
  runs:[{t:"e",km:7,n:"Rustige run"},{t:"q",km:7,n:"Intervallen",d:"Inlopen, 6× 400m @ 5:15–5:30 met gelijk herstel, uitlopen. Stoppen bij kniepijn."},{t:"l",km:11,n:"Duurloop"}]},
 {w:5, fase:"Opbouw", focus:"Eerste tempoblokken: aaneengesloten iets sneller lopen. Long run 12 km.",
  runs:[{t:"e",km:7,n:"Rustige run"},{t:"q",km:7,n:"Tempo",d:"Inlopen, 3× 5 min @ 5:55–6:10 met 2–3 min dribbel, uitlopen."},{t:"l",km:12,n:"Duurloop"}]},
 {w:6, fase:"Opbouw", focus:"Langere intervallen (600m). Long run 13 km. Neem water/gel mee op de long run.",
  runs:[{t:"e",km:8,n:"Rustige run"},{t:"q",km:8,n:"Intervallen",d:"Inlopen, 5× 600m @ 5:15–5:30 met ~90 sec dribbel/wandel, uitlopen. Stoppen bij kniepijn."},{t:"l",km:13,n:"Duurloop"}]},
 {w:7, fase:"Opbouw", herstel:true, focus:"Herstelweek. Gas terug na drie weken opbouwen.",
  runs:[{t:"e",km:6,n:"Rustige run"},{t:"q",km:6,n:"Rustig + strides",d:"Herstelweek: rustige run met een paar losse strides. Bijtanken."},{t:"l",km:10,n:"Duurloop"}]},
 {w:8, fase:"Opbouw", focus:"Langere tempoblokken. Long run 14 km. Test alvast je race-ontbijt en drinken onderweg.",
  runs:[{t:"e",km:8,n:"Rustige run"},{t:"q",km:8,n:"Tempo",d:"Inlopen, 2× 10 min @ 5:55–6:10 met 3 min dribbel, uitlopen."},{t:"l",km:14,n:"Duurloop"}]},
 {w:9, fase:"Opbouw", focus:"Long run 15 km, nieuw terrein. Intervallen op 600m.",
  runs:[{t:"e",km:9,n:"Rustige run"},{t:"q",km:8,n:"Intervallen",d:"Inlopen, 6× 600m @ 5:15–5:30 met ~90 sec herstel, uitlopen. Stoppen bij kniepijn."},{t:"l",km:15,n:"Duurloop"}]},
 {w:10, fase:"Opbouw", focus:"Long run 16 km. Stevige tempoblokken. Mooie mijlpaal richting de halve.",
  runs:[{t:"e",km:9,n:"Rustige run"},{t:"q",km:9,n:"Tempo",d:"Inlopen, 3× 8 min @ 5:55–6:10 met 3 min dribbel, uitlopen."},{t:"l",km:16,n:"Duurloop"}]},
 {w:11, fase:"Opbouw", herstel:true, focus:"Herstelweek vóór de piek. Fris worden.",
  runs:[{t:"e",km:7,n:"Rustige run"},{t:"q",km:7,n:"Rustig + strides",d:"Herstelweek: rustig met een paar strides. Fris blijven voor de piek."},{t:"l",km:13,n:"Duurloop"}]},
 {w:12, fase:"Piek", focus:"Piekfase. Racetempo-blokken: oefenen op je doeltempo (~6:00). Long run 17 km.",
  runs:[{t:"e",km:9,n:"Rustige run"},{t:"q",km:9,n:"Racetempo",d:"Inlopen, 3× 3 km @ racetempo (~6:00) met 3 min dribbel, uitlopen. Moet 'te makkelijk' voelen."},{t:"l",km:17,n:"Duurloop"}]},
 {w:13, fase:"Piek", focus:"De langste van het schema: 18 km. Langere racetempo-blokken. Hierna weet je: de afstand komt eraan.",
  runs:[{t:"e",km:9,n:"Rustige run"},{t:"q",km:9,n:"Racetempo",d:"Inlopen, 2× 4 km @ racetempo (~6:00) met 3 min dribbel, uitlopen."},{t:"l",km:18,n:"Duurloop — langste!"}]},
 {w:14, fase:"Taper", focus:"Taper: volume flink omlaag, beetje scherpte erin houden. Je wordt hier fitter zonder hard te trainen.",
  runs:[{t:"e",km:6,n:"Rustige run"},{t:"q",km:6,n:"Tempo",d:"Inlopen, 2× 2 km @ ~6:00, uitlopen. Kort en scherp."},{t:"l",km:10,n:"Duurloop"}]},
 {w:15, fase:"Race", focus:"Raceweek! Alles kort en fris. Niets nieuws op de dag zelf. Start rustig, de eerste kilometers moeten bijna te makkelijk voelen. Geniet ervan!",
  runs:[{t:"e",km:5,n:"Rustige run"},{t:"q",km:4,n:"Opfrisser",d:"3× 1 km @ racetempo (~6:00) met ruim dribbel, verder heel rustig."},{t:"r",km:21.1,n:"🏁 HALVE MARATHON"}]}
];
const KRACHT_TOM = "Hamstring-kracht (fysio-oefeningen · later Nordic curls, single-leg bridge, hip thrust)";
const KRACHT_DENISE = "Knie-kracht: glute bridges, clamshells, single-leg step-downs, wall sits en kuitheffingen. Sterke billen en quads ontlasten de knie.";

const PLAN = LOOP.rowId === "tom" ? PLAN_TOM : PLAN_DENISE;
const KRACHT = LOOP.rowId === "tom" ? KRACHT_TOM : KRACHT_DENISE;
const KRACHT_COUNT = LOOP.rowId === "tom" ? 2 : 1; // Denise: 1 krachtsessie per week
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
const SEED_DENISE = {athletes:{ a:{name:"Denise <3", logs:{
  "w1r3": {done:true, dist:6.29, time:"41:05", feel:4, hr:156, ham:"erger", note:"20 juli. Gem. 6:32/km, HR 156. Knie: pijn na afloop.", ts:1753019160000}
}} }};

// Denise' runs van vóór de schemastart (13 juli), uit haar Huawei-data. Read-only overzicht.
const HISTORY = LOOP.rowId === "denise" ? [
  {date:"3 mei",  km:8.01, time:"48:43",   pace:"6:05", hr:163},
  {date:"20 mei", km:10.01, time:"1:01:38", pace:"6:09", hr:164},
  {date:"7 jun",  km:5.21, time:"30:51",   pace:"5:55", hr:171},
  {date:"12 jun", km:5.01, time:"34:41",   pace:"6:55", hr:148},
  {date:"16 jun", km:6.66, time:"45:42",   pace:"6:52", hr:151},
  {date:"28 jun", km:5.06, time:"33:20",   pace:"6:35", hr:162},
  {date:"2 jul",  km:8.02, time:"51:39",   pace:"6:26", hr:160},
  {date:"18 jul", km:5.01, time:"31:25",   pace:"6:16", hr:158}
] : [];

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

// Als er in een week getennist is, vervalt de KORTSTE easy run (nooit long/kwaliteit).
// Geeft de run-id terug die die week wordt overgeslagen, of null.
function skippedRunId(w){
  if(!tennisWeeksOf()[w.w]) return null;
  let best = null, bestKm = Infinity;
  w.runs.forEach((r,i)=>{ if(r.t==="e" && r.km < bestKm){ bestKm = r.km; best = "w"+w.w+"r"+(i+1); } });
  return best;
}
function totalPlannedKm(){
  return PLAN.reduce((s,w)=>{
    const skip = skippedRunId(w);
    return s + w.runs.reduce((a,r,i)=> a + ("w"+w.w+"r"+(i+1)===skip ? 0 : r.km), 0);
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
    const skip = skippedRunId(w);
    w.runs.forEach((r,i)=>{
      const id = "w"+w.w+"r"+(i+1);
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
      const l = logs["w"+w.w+"r"+(i+1)];
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
    $("zonesList").innerHTML = ZONES_TOM.map(z=>
      '<div class="zone"><span><b>'+z.n+'</b><br><small style="color:var(--mut)">'+z.d+'</small></span><span class="p">'+z.p+' /km</span></div>').join("");
    $("zonesNote").innerHTML = "Voorlopige streeftijd: <b>2:20–2:25</b> (met de vakantie erin is dit realistischer dan 2:15). Definitief na de 5k-test in week 8. Regel #1: bij <b>verergering van de hamstring</b> vervalt de eerstvolgende kwaliteitssessie en overleg je met je fysio.";
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
      const id = "w"+w.w+"r"+(i+1);
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
  $("histNote").textContent = HISTORY.length + " runs · " + fmt(tot) + " km, gelopen vóór de start van het schema (13 juli). Mooie basis om op door te bouwen.";
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
    w.runs.forEach((r,i)=>{ const id="w"+w.w+"r"+(i+1); if(id===skip) return; planKm += r.km; total++; if(logs[id]?.done) doneCnt++; });

    const tOn = !!tennisWeeksOf()[w.w];
    let body = '<div class="tennis'+(tOn?" on":"")+'" data-tw="'+w.w+'">🎾 Getennist deze week'+(tOn?" ✓":"")+'</div>';
    body += '<div class="wk-focus">'+w.focus+'</div>';
    w.runs.forEach((r,i)=>{
      const id = "w"+w.w+"r"+(i+1);
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
        + '<div class="det">'+(r.d? r.d : paceHint)+'</div>'+loggedLine+'</div>'
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
function paceFor(t){
  if(LOOP.zones!=="tom") return "";
  return {e:"Tempo: 6:45–7:15 /km — praattempo", l:"Tempo: 6:45–7:15 /km, comfortabel volhouden", q:"Zie omschrijving", t:"", r:"Start op ± 6:40 /km — niet sneller!", h:"Uren op de benen = training. Afstand loggen mag, hoeft niet."}[t] || "";
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
    case "r": return "Bedoeld: racetempo (" + z[2].p + " /km) · gevoel 4, gecontroleerd";
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
  const m = id.match(/^w(\d+)r(\d+)$/);
  const w = PLAN[+m[1]-1], r = w.runs[+m[2]-1];
  openSess = {id, run:r, w:w.w};
  const l = logsOf()[id] || {};
  formVals = {dist:l.dist ?? "", time:l.time ?? "", feel:l.feel ?? null, ham:l.ham ?? null, note:l.note ?? ""};
  $("shTitle").textContent = "Week "+w.w+" · Dag "+m[2]+" — "+r.n;
  $("shDesc").textContent = (r.d || "") + (r.d? " · ":"") + "Gepland: "+fmt(r.km)+" km";
  const intent = intentLine(r);
  $("shIntent").textContent = intent;
  $("shIntent").style.display = intent ? "" : "none";
  // Afstand voorvullen met de geplande km (bewerkbaar) als er nog niks gelogd is.
  $("inDist").value = (l.dist!=null && l.dist!=="") ? l.dist : (r.km>0 && r.t!=="h" ? r.km : "");
  $("inTime").value = formVals.time;
  $("inHr").value = l.hr ?? "";
  $("inNote").value = formVals.note;
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
