import { PLANNER_CSS } from "./planner-css";
import { PLANNER_MARKUP } from "./planner-markup";
import { PLANNER_SCRIPT } from "./planner-script";
import { RUNPLAN_CSS, RUNPLAN_MARKUP, RUNPLAN_VIEWS, RUNPLAN_SCRIPT } from "./planner-runplan";

export const BASE_CSS = String.raw`
/* Nachtglas: a deep atmosphere with layered glass. Strength is iris, running is tide.
   Planned sessions are hollow and dashed; completed sessions are filled. */
:root{
 --bg:#060a18;--ink:#f4f6fc;--mut:#b4bdd4;--dim:#8f9ab5;
 --iris:#b9a8ff;--iris-deep:#7c62f0;--tide:#74ecd0;--tide-deep:#15b392;--amber:#ffcf7a;--rose:#ff9c9c;
 --edge:rgba(255,255,255,.2);--edge-soft:rgba(255,255,255,.1);--pane:rgba(255,255,255,.065);--solid:#151c38;
 --field:#eef1fa;--field-ink:#0b1124;
 --r-lg:28px;--r-md:20px;--r-sm:14px;
 --display:ui-rounded,"SF Pro Rounded","Hiragino Maru Gothic ProN","Nunito",system-ui,-apple-system,"Segoe UI",sans-serif;
 --body:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
 --ease:cubic-bezier(.2,.8,.2,1);
 color-scheme:dark;
}
*{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent}
html{-webkit-text-size-adjust:100%}
body{min-height:100dvh;color:var(--ink);font:16px/1.5 var(--body);background:var(--bg);overflow-x:hidden}
button,input,textarea,select{font:inherit;color:inherit}
button{cursor:pointer;border:0;background:none}button:disabled{cursor:default;opacity:.45}
button,a,summary,select{touch-action:manipulation}
a{color:inherit;text-underline-offset:4px}
svg{display:block;flex-shrink:0}
h1,h2,h3,.num{font-family:var(--display)}
.icon{width:20px;height:20px;stroke:currentColor;fill:none;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}
[hidden]{display:none!important}
.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
:focus-visible{outline:3px solid #fff;outline-offset:3px;border-radius:12px}
.skip{position:absolute;left:16px;top:-100px;background:#fff;color:#0b1124;border-radius:12px;padding:12px 16px;z-index:30}.skip:focus{top:12px}

/* Atmosphere: one fixed layer, so glass has something to refract without costing frames. */
.atmo{position:fixed;inset:0;z-index:-1;pointer-events:none;background:
 radial-gradient(62vmax 62vmax at 8% -10%,rgba(104,74,255,.62),transparent 62%),
 radial-gradient(54vmax 54vmax at 108% 16%,rgba(18,190,160,.42),transparent 62%),
 radial-gradient(60vmax 60vmax at 46% 112%,rgba(46,96,255,.46),transparent 60%),
 radial-gradient(30vmax 30vmax at 78% 64%,rgba(255,150,190,.12),transparent 60%),
 linear-gradient(180deg,#070b1d,#0a1027 55%,#060918)}

/* Two glass weights. .glass blurs what is behind it and is reserved for a few large surfaces.
   .pane only layers light, so long lists stay smooth on a phone. */
.glass,.pane{border:1px solid var(--edge);box-shadow:inset 0 1px 0 rgba(255,255,255,.3),inset 0 -1px 0 rgba(255,255,255,.05),0 24px 60px -28px rgba(0,0,0,.75)}
.glass{background:linear-gradient(165deg,rgba(255,255,255,.15),rgba(255,255,255,.05) 46%,rgba(255,255,255,.08));-webkit-backdrop-filter:blur(22px) saturate(165%);backdrop-filter:blur(22px) saturate(165%)}
.pane{background:linear-gradient(165deg,rgba(255,255,255,.1),rgba(255,255,255,.04) 50%,rgba(255,255,255,.06));border-color:var(--edge-soft)}
@supports not ((backdrop-filter:blur(1px)) or (-webkit-backdrop-filter:blur(1px))){.glass{background:rgba(21,28,56,.96)}}
@media(prefers-reduced-transparency:reduce){.glass,.pane{background:var(--solid);-webkit-backdrop-filter:none;backdrop-filter:none}.atmo{background:#0a1027}}

.app{max-width:1120px;margin:0 auto;padding:16px 16px calc(112px + env(safe-area-inset-bottom))}
.workspace{min-width:0}
.view{animation:arrive .32s var(--ease)}
@keyframes arrive{from{transform:translateY(10px)}to{transform:none}}

/* Masthead: brand on top, tabs float at the bottom on a phone and sit in the bar on desktop. */
.masthead{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:22px;min-height:44px}
.brand{display:inline-flex;align-items:center;gap:10px;text-decoration:none;font-family:var(--display);font-weight:700;font-size:17px;letter-spacing:-.2px;min-height:44px}
.brand-mark{display:grid;place-items:center;width:36px;height:36px;border-radius:12px;background:linear-gradient(145deg,var(--iris),var(--tide));color:#0b1124;box-shadow:inset 0 1px 0 rgba(255,255,255,.6)}
.brand-mark .icon{width:20px;height:20px;stroke-width:2.2}
.local-note{font-size:13px;color:var(--mut);text-align:right;line-height:1.3}.local-note span{display:block;color:var(--dim)}
.dock{position:fixed;left:50%;bottom:calc(14px + env(safe-area-inset-bottom));transform:translateX(-50%);z-index:20;display:grid;grid-template-columns:1fr 1fr;gap:4px;width:min(340px,calc(100% - 32px));padding:6px;border-radius:999px}
.dock a{display:flex;align-items:center;justify-content:center;gap:8px;min-height:52px;border-radius:999px;text-decoration:none;font-weight:600;font-size:15px;color:var(--mut);transition:background .25s var(--ease),color .2s,transform .15s}
.dock a:active{transform:scale(.96)}
.dock a[aria-current=page]{color:#0b1124;background:linear-gradient(180deg,#fff,#dfe4ff);box-shadow:inset 0 1px 0 #fff,0 8px 22px -10px rgba(170,160,255,.9)}
.dock a:not([aria-current=page]):hover{color:var(--ink);background:rgba(255,255,255,.08)}
.planner-editing .masthead,.run-plan-editing .masthead{display:none}

.preview-banner{display:inline-flex;align-items:center;gap:8px;padding:6px 12px;margin-bottom:16px;border:1px dashed var(--amber);border-radius:999px;font-size:13px;font-weight:600;color:var(--amber)}
.micro{font-size:13px;font-weight:600;color:var(--mut);letter-spacing:.01em}
.page-heading{display:flex;align-items:flex-end;justify-content:space-between;gap:16px;margin-bottom:18px}
.page-heading h1{font-size:40px;line-height:1.05;font-weight:800;letter-spacing:-1px;margin-top:2px}
.panel-sub{font-size:14px;color:var(--mut)}

/* Buttons */
.primary{display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:52px;padding:0 24px;border-radius:999px;font-weight:700;font-size:16px;color:#0b1124;text-decoration:none;background:linear-gradient(180deg,#fff,#dde3ff);box-shadow:inset 0 1px 0 #fff,0 14px 30px -14px rgba(160,150,255,.95);transition:transform .15s var(--ease),box-shadow .2s,filter .2s}
.primary:hover{filter:brightness(1.05);box-shadow:inset 0 1px 0 #fff,0 18px 36px -14px rgba(160,150,255,1)}
.primary:active{transform:scale(.97)}
.primary.logged{background:linear-gradient(180deg,#b6f7e6,var(--tide));box-shadow:inset 0 1px 0 rgba(255,255,255,.8),0 14px 30px -14px rgba(40,210,170,.9)}
.ghost{display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:48px;padding:0 18px;border-radius:999px;border:1px solid var(--edge);background:rgba(255,255,255,.07);font-weight:600;font-size:15px;text-decoration:none;transition:background .2s,transform .15s var(--ease)}
.ghost:hover{background:rgba(255,255,255,.14)}.ghost:active{transform:scale(.97)}
.text-button{min-height:44px;display:inline-flex;align-items:center;font-size:14px;color:var(--mut);text-decoration:underline;text-underline-offset:4px}.text-button:hover{color:var(--ink)}
.icon-button{display:grid;place-items:center;width:44px;height:44px;border-radius:50%;border:1px solid var(--edge);background:rgba(255,255,255,.08);font-size:22px;line-height:1;transition:background .2s,transform .15s var(--ease)}
.icon-button:hover{background:rgba(255,255,255,.16)}.icon-button:active{transform:scale(.92)}

/* Fields are opaque and light: numbers have to be readable at arm's length, mid-set. */
.field,.planner-date-label input,.planner-exercise input,.planner-run-form input,.planner-run-form textarea,.planner-run-form select,.run-log-extra select,.run-log-extra input,.prog-form input,.prog-form select,.session-schedule input{width:100%;min-width:0;min-height:52px;padding:12px 14px;border:2px solid transparent;border-radius:var(--r-sm);background:var(--field);color:var(--field-ink);font-size:18px;font-weight:600;font-variant-numeric:tabular-nums;color-scheme:light;transition:border-color .15s,box-shadow .15s,background .15s}
input::placeholder,textarea::placeholder{color:#727c98;font-weight:500}
input:focus-visible,textarea:focus-visible,select:focus-visible{outline:none;border-color:var(--iris-deep);box-shadow:0 0 0 4px rgba(185,168,255,.55);border-radius:var(--r-sm)}
input[aria-invalid=true]{border-color:#d43d3d;background:#ffe7e7;box-shadow:0 0 0 4px rgba(255,156,156,.45)}
textarea{resize:vertical;font-weight:500;font-size:16px;line-height:1.5}
label{font-size:14px;font-weight:600;color:var(--mut)}

/* Session symbols: shape and icon carry the type, colour supports it. */
.session-symbol{display:grid;place-items:center;width:40px;height:40px;flex-shrink:0;border-radius:13px;color:#0b1124;background:var(--iris);box-shadow:inset 0 1px 0 rgba(255,255,255,.55)}
.session-symbol.run,.run .session-symbol{background:var(--tide);border-radius:50%}
.session-symbol .icon{width:20px;height:20px;stroke-width:2}
.status-tag{display:inline-flex;align-items:center;gap:6px;padding:4px 10px;border-radius:999px;font-size:13px;font-weight:600;white-space:nowrap;border:1px dashed var(--edge);color:var(--mut)}
.status-tag .icon{width:14px;height:14px}
.status-tag.logged{border-style:solid;border-color:transparent;background:rgba(116,236,208,.2);color:var(--tide)}
.status-tag.scheduled{color:var(--ink)}
.status-tag.next{border-style:solid;border-color:var(--iris);color:var(--iris)}
.status-tag.late{border-color:var(--amber);color:var(--amber)}

/* Save state */
.sync-line,.planner-save{display:inline-flex;align-items:center;gap:8px;font-size:14px;color:var(--mut)}
.sync-dot,.planner-save:before{content:'';width:9px;height:9px;border-radius:50%;background:var(--dim);flex-shrink:0}
.sync-line[data-status=ok] .sync-dot,.planner-save[data-status=ok]:before{background:var(--tide);box-shadow:0 0 0 4px rgba(116,236,208,.18)}
.sync-line[data-status=saving] .sync-dot,.planner-save[data-status=saving]:before{background:var(--iris);animation:pulse 1s ease-in-out infinite}
.sync-line[data-status=offline] .sync-dot,.planner-save[data-status=offline]:before{background:var(--amber)}
.planner-save[data-status=offline]{color:var(--amber)}
.planner-save[data-status=error]{color:var(--rose)}.planner-save[data-status=error]:before{background:var(--rose)}
@keyframes pulse{50%{opacity:.35}}
.planner-footer{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-top:28px;padding-top:16px;border-top:1px solid var(--edge-soft)}
.foot-actions{display:flex;gap:18px}
.planner-editing .planner-footer{display:none}

.toast{visibility:hidden;opacity:0;position:fixed;left:50%;bottom:calc(92px + env(safe-area-inset-bottom));transform:translate(-50%,20px);z-index:40;display:flex;align-items:center;gap:6px;width:max-content;max-width:calc(100% - 32px);padding:12px 20px;border-radius:28px;border:1px solid var(--edge);background:rgba(24,31,62,.94);-webkit-backdrop-filter:blur(18px);backdrop-filter:blur(18px);box-shadow:0 18px 50px -18px #000;font-size:15px;font-weight:600;transition:transform .25s var(--ease),opacity .2s}
.toast.on{visibility:visible;opacity:1;transform:translate(-50%,0)}
.planner-editing .toast{bottom:calc(24px + env(safe-area-inset-bottom))}
.planner-undo{min-height:44px;padding:0 10px;margin:-10px -8px -10px 4px;color:var(--iris);font-weight:700;text-decoration:underline;text-underline-offset:4px}

@media(min-width:900px){
 .app{padding:24px 32px 48px}
 .masthead{position:sticky;top:16px;z-index:20;margin-bottom:34px}
 .dock{position:static;transform:none;width:auto;grid-template-columns:auto auto;margin-left:auto}
 .dock a{min-height:46px;padding:0 22px}
 .local-note{order:3}
 .page-heading h1{font-size:54px;letter-spacing:-1.6px}
 .toast{bottom:32px}
}
@media(prefers-reduced-motion:reduce){*,*:before,*:after{transition:none!important;animation:none!important;scroll-behavior:auto!important}}
`;
const BASE_HTML = String.raw`<!DOCTYPE html>
<html lang="nl"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover"><meta name="robots" content="noindex, nofollow"><meta name="referrer" content="no-referrer"><meta name="theme-color" content="#070B1D"><title>Kracht &amp; 5 km | Trainingslogboek</title><style>/*__BASE_CSS__*/
/*__PLANNER_CSS__*/
/*__RUNPLAN_CSS__*/</style></head><body><div class="atmo" aria-hidden="true"></div><a class="skip" href="#mainContent">Naar inhoud</a><div class="app"><!--__RUNPLAN_NAV__--><main class="workspace" id="mainContent" tabindex="-1"><div class="preview-banner" id="previewNotice" hidden><span>Voorvertoning</span></div>
<!--__PLANNER_MARKUP__-->
<!--__RUNPLAN_VIEWS__-->
<footer class="page-footer planner-footer"><div class="sync-line" id="syncLine" data-status="loading"><span class="sync-dot" aria-hidden="true"></span><span id="syncText" role="status">Laden…</span></div><div class="foot-actions"><button class="text-button" id="retrySync" type="button" hidden>Opnieuw proberen</button><button class="text-button" id="exportData" type="button">Exporteren</button></div></footer></main></div><div class="toast" id="toast" role="status"></div><noscript><p style="padding:24px">Zet JavaScript aan om je kalender te gebruiken.</p></noscript><script>
/*__TRAINING_CONFIG__*/
const CONFIG = window.__TRAINING__;
const $ = id => document.getElementById(id);
const escapeHtml = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const ICONS = {
  history:'<path d="M3 5v5h5M3 10a9 9 0 1 1 2 8M12 7v5l3 2"/>',
  trash:'<path d="M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7m4-7v7"/>',
  activity:'<path d="M3 12h4l3-8 4 16 3-8h4"/>',
  dashboard:'<rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/>',
  calendar:'<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M7 3v4m10-4v4M3 11h18m-13 4h2m4 0h2"/>',
  layers:'<path d="m12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5m-18 5 9 5 9-5"/>',
  compass:'<circle cx="12" cy="12" r="9"/><path d="m16 8-2 6-6 2 2-6 6-2Z"/>',
  arrowLeft:'<path d="M20 12H4m6-6-6 6 6 6"/>', arrowRight:'<path d="M4 12h16m-6-6 6 6-6 6"/>',
  chevronLeft:'<path d="m14 6-6 6 6 6"/>', chevronRight:'<path d="m10 6 6 6-6 6"/>',
  dumbbell:'<path d="m6 15 9-9M3 13l8 8M13 3l8 8M2 17l5 5M17 2l5 5m-16 8-3 3m12-12 3-3"/>',
  run:'<circle cx="15.5" cy="4" r="1.8"/><path d="m12 8-3 4 5 3 1 6m-2-13 3 4h4M11 9l-5 1-2 4m7 1-3 5H4"/>',
  route:'<circle cx="6" cy="5" r="2"/><circle cx="18" cy="19" r="2"/><path d="M8 5h8a4 4 0 0 1 0 8H8a3 3 0 0 0 0 6h8"/>',
  sparkle:'<path d="m12 3 2.3 6.7L21 12l-6.7 2.3L12 21l-2.3-6.7L3 12l6.7-2.3L12 3Z"/>',
  leaf:'<path d="M20 3C9 2 2 8 5 15s15 5 15-12Z"/><path d="M4 21 16 9m-6 6v-5m0 5h5"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  check:'<path d="m5 12 4 4L19 6"/>', plus:'<path d="M12 5v14M5 12h14"/>',
  edit:'<path d="m15 4 5 5M4 20l5-1L21 7a2 2 0 0 0-5-5L4 14l-1 7Z"/>',
  download:'<path d="M12 3v12m-4-4 4 4 4-4M4 16v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4"/>',
  heart:'<path d="M20 5a5 5 0 0 0-8 1 5 5 0 0 0-8-1C-1 10 6 16 12 21c6-5 13-11 8-16Z"/>'
};
function icon(name){ return '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">' + (ICONS[name] || ICONS.activity) + '</svg>'; }
function localToday(){ return new Intl.DateTimeFormat('sv-SE',{timeZone:'Europe/Amsterdam'}).format(new Date()); }
function timeText(seconds){
  const s = Math.round(seconds), h = Math.floor(s/3600), m = Math.floor(s/60)%60;
  return h ? h + ':' + String(m).padStart(2,'0') + ':' + String(s%60).padStart(2,'0') : Math.floor(s/60) + ':' + String(s%60).padStart(2,'0');
}
function parseTime(value){
  const text = value.trim().replace(/[.,]/g,':');
  if(!/^\d{1,4}:\d{2}(?::\d{2})?$/.test(text)) return null;
  const parts = text.split(':').map(Number);
  if(parts[parts.length-1] > 59 || (parts.length === 3 && parts[1] > 59)) return null;
  const total = parts.length === 3 ? parts[0]*3600 + parts[1]*60 + parts[2] : parts[0]*60 + parts[1];
  return total > 0 && total <= 86400 ? total : null;
}
function parseDistance(value){
  const text = value.trim().replace(',','.');
  if(!/^\d+(?:\.\d+)?$/.test(text)) return null;
  const n = Number(text);
  return n > 0 && n <= 1000 ? n : null;
}
function validDate(value){
  if(typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(value + 'T12:00:00Z');
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0,10) === value;
}
function paceText(distance, seconds){ return distance > 0 && seconds > 0 ? timeText(seconds / distance) + ' /km' : ''; }

let activeView='kalender',toastTimer;
const VIEW_TITLES={kalender:'Kalender',workout:'Workout',toevoegen:'Workout toevoegen',renschema:'Programma',runweek:'Week'};
function readView(){
 const hash=(window.location?.hash||'').slice(1),route=Planner.route(hash)||RunPlan.route(hash);
 activeView=route||'kalender';
 if(!route&&hash&&hash!=='kalender')window.history?.replaceState(null,'','#kalender');
}
function renderView(){for(const name of Object.keys(VIEW_TITLES))$('view-'+name).hidden=name!==activeView;Planner.render();}
function toast(message){$('toast').textContent=message;$('toast').classList.add('on');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('toast').classList.remove('on'),2200);}
// A toast with one action (undo). It stays long enough to reach with a thumb.
function toastAction(message,label,action){toast(message);const button=document.createElement('button');button.type='button';button.className='planner-undo';button.textContent=label;button.addEventListener('click',()=>{button.disabled=true;action();});$('toast').appendChild(button);clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('toast').classList.remove('on'),8000);}
/*__PLANNER_SCRIPT__*/
/*__RUNPLAN_SCRIPT__*/
$('previewNotice').hidden=!CONFIG.preview;
document.querySelectorAll('[data-icon]').forEach(el=>{el.innerHTML=icon(el.dataset.icon)});
$('exportData').addEventListener('click',()=>{
 const blob=new Blob([JSON.stringify({version:1,workoutPlanner:Planner.exportData()},null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),link=document.createElement('a');
 link.href=url;link.download='workouts.json';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
});
window.addEventListener('hashchange',()=>{readView();renderView();window.scrollTo?.({top:0,behavior:'instant'});});
readView();renderView();Planner.load();
</script></body></html>`;

export const TRAINING_HTML = BASE_HTML
 .replace("/*__BASE_CSS__*/",()=>BASE_CSS)
 .replace("/*__PLANNER_CSS__*/",()=>PLANNER_CSS)
 .replace("/*__RUNPLAN_CSS__*/",()=>RUNPLAN_CSS)
 .replace("<!--__RUNPLAN_NAV__-->",()=>RUNPLAN_MARKUP)
 .replace("<!--__RUNPLAN_VIEWS__-->",()=>RUNPLAN_VIEWS)
 .replace("/*__RUNPLAN_SCRIPT__*/",()=>RUNPLAN_SCRIPT)
 .replace("<!--__PLANNER_MARKUP__-->",()=>PLANNER_MARKUP)
 .replace("/*__PLANNER_SCRIPT__*/",()=>PLANNER_SCRIPT);
