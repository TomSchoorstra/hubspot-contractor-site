// The private budget page, in the same Nachtglas style as the training app.
// Like that app, the page is one HTML string. Inside the String.raw blocks: no backticks and no template placeholders.
import { BASE_CSS } from "../l/[slug]/kracht-5km/training-html";

const BUDGET_CSS = String.raw`
.app{max-width:960px}
.login{max-width:420px;margin:12vh auto 0;padding:28px 22px;border-radius:var(--r-lg)}
.login h1{font-size:34px;line-height:1.1;font-weight:800;letter-spacing:-.8px;margin:14px 0 6px}
.login p{font-size:15px;color:var(--mut)}
.login form{display:grid;gap:14px;margin-top:22px}
.login label{display:grid;gap:6px}
.login .primary{width:100%}
.login-error{padding:12px 14px;border-radius:var(--r-sm);border:1px solid var(--rose);color:var(--rose);font-size:15px;font-weight:600;margin-top:16px}

.hero{padding:22px 20px;border-radius:var(--r-lg);margin-bottom:16px}
.hero-label{font-size:14px;font-weight:600;color:var(--mut)}
.hero-number{font-family:var(--display);font-size:clamp(44px,13vw,76px);line-height:1;font-weight:800;letter-spacing:-2px;font-variant-numeric:tabular-nums;margin:6px 0 4px}
.hero-number small{font-size:.42em;letter-spacing:-.5px;margin-left:.25em;white-space:nowrap}
.hero-number.short{color:var(--amber)}.hero-number.good{color:var(--tide)}
.hero-note{font-size:15px;color:var(--mut)}
.hero-note b{color:var(--ink)}
.bar{position:relative;height:14px;border-radius:999px;background:rgba(255,255,255,.12);overflow:hidden;margin:18px 0 10px}
.bar i{position:absolute;inset:0 auto 0 0;width:0;border-radius:999px;transition:width .5s var(--ease)}
.bar .bar-plan{background:repeating-linear-gradient(135deg,rgba(185,168,255,.5) 0 6px,rgba(185,168,255,.25) 6px 12px)}
.bar .bar-now{background:linear-gradient(90deg,var(--iris),var(--tide))}
.stats{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:16px;padding-top:16px;border-top:1px solid var(--edge-soft)}
.stats span{display:block;font-size:14px;font-weight:600;color:var(--mut)}
.stats strong{display:block;font-family:var(--display);font-size:24px;font-weight:800;font-variant-numeric:tabular-nums}
.legend{display:flex;flex-wrap:wrap;gap:6px 16px;font-size:13px;color:var(--mut)}
.legend span{display:inline-flex;align-items:center;gap:6px}
.legend i{width:14px;height:10px;border-radius:4px}
.legend .l-now{background:linear-gradient(90deg,var(--iris),var(--tide))}
.legend .l-plan{background:repeating-linear-gradient(135deg,rgba(185,168,255,.6) 0 4px,rgba(185,168,255,.25) 4px 8px)}

.section{padding:18px 16px;border-radius:var(--r-md);margin-bottom:16px}
.section-head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:10px}
.section-head h2{font-size:22px;font-weight:700;letter-spacing:-.3px}
.section-total{font-family:var(--display);font-weight:800;font-size:20px;font-variant-numeric:tabular-nums}
.section-foot{display:flex;flex-wrap:wrap;align-items:center;gap:6px 18px;margin-top:12px}
.group-label{font-size:13px;font-weight:700;color:var(--mut);margin:14px 0 8px}
.group-label:first-child{margin-top:0}

/* A cost line is one large toggle. Open lines are hollow and dashed; paid lines are filled with a check. */
.rows{display:grid;gap:8px}
.row{display:grid;grid-template-columns:auto minmax(0,1fr) auto;align-items:center;gap:12px;width:100%;min-height:60px;padding:10px 14px;border-radius:var(--r-sm);border:1px dashed var(--edge);background:rgba(255,255,255,.04);text-align:left;transition:background .2s,border-color .2s,transform .15s var(--ease)}
button.row:hover{background:rgba(255,255,255,.09)}button.row:active{transform:scale(.99)}
.row.static{grid-template-columns:minmax(0,1fr) auto;border-style:solid;border-color:var(--edge-soft)}
.tick{display:grid;place-items:center;width:30px;height:30px;border-radius:50%;border:2px dashed var(--dim);color:transparent}
.tick .icon{width:16px;height:16px;stroke-width:3}
.row[aria-checked=true]{border-style:solid;border-color:transparent;background:rgba(116,236,208,.12)}
.row[aria-checked=true] .tick{border:0;background:var(--tide);color:#04261f}
.row[aria-checked=true] .row-name,.row[aria-checked=true] .row-amount{color:var(--mut)}
.row-name{min-width:0;font-size:16px;font-weight:600;overflow-wrap:anywhere}
.row-name small{display:block;font-size:13px;font-weight:500;color:var(--mut)}
.row-amount{font-family:var(--display);font-size:19px;font-weight:800;font-variant-numeric:tabular-nums;white-space:nowrap;text-align:right}
.row-amount small{display:block;font-family:var(--body);font-size:13px;font-weight:500;color:var(--mut)}
.empty{font-size:15px;color:var(--mut);padding:8px 0}
.mini-bar{display:block;height:6px;border-radius:999px;background:rgba(255,255,255,.12);margin-top:8px;overflow:hidden}
.mini-bar i{display:block;height:100%;border-radius:999px;background:linear-gradient(90deg,var(--iris),var(--tide))}
.row.static.settled{background:rgba(116,236,208,.12);border-color:transparent}
.row.static.settled .row-amount small{color:var(--tide)}
.spend{padding:14px;border-radius:var(--r-sm)}
.spend-top{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:12px;align-items:start}
.spend .bar{margin:12px 0}
.spend.over .row-amount{color:var(--amber)}.spend.over .bar-now{background:var(--amber)}
.spend-form{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:10px;align-items:end}
.spend-form label{display:grid;gap:6px;min-width:0}

.split{display:grid;gap:0}
.split div{display:flex;align-items:baseline;justify-content:space-between;gap:12px;padding:12px 0;border-bottom:1px solid var(--edge-soft);font-size:16px}
.split div:last-child{border-bottom:0}
.split b{font-family:var(--display);font-size:19px;font-weight:800;font-variant-numeric:tabular-nums;white-space:nowrap}
.split small{font-size:13px;color:var(--mut);margin-left:8px;font-family:var(--body);font-weight:600}
.split .is-left{font-weight:700}
.split .is-short b{color:var(--amber)}

/* Editing */
.edit-row{display:grid;grid-template-columns:minmax(0,1fr) 44px;gap:8px 8px;padding:12px 0;border-bottom:1px solid var(--edge-soft)}
.edit-fields{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:8px 10px}
.edit-fields .field{padding:10px 12px;font-size:17px}
.edit-fields label{display:grid;gap:4px;min-width:0}
.edit-fields label.wide{grid-column:1/-1}
.edit-fields label.check{grid-column:1/-1;display:flex;align-items:center;gap:10px;min-height:44px;font-size:15px;color:var(--ink)}
.edit-fields input[type=checkbox]{width:24px;height:24px;accent-color:var(--iris-deep);flex-shrink:0}
.edit-remove{align-self:start;margin-top:22px;display:grid;place-items:center;width:44px;height:44px;border-radius:50%;color:var(--mut)}
.edit-remove:hover{color:var(--rose);background:rgba(255,156,156,.14)}
.edit-add{margin-top:12px;width:100%}
.target{display:grid;gap:6px;max-width:260px;margin-top:16px}

.import textarea{width:100%;min-height:140px;margin:10px 0;padding:12px 14px;border-radius:var(--r-sm);border:2px solid transparent;background:var(--field);color:var(--field-ink);font:500 14px/1.5 ui-monospace,Menlo,monospace;color-scheme:light}
.import summary{cursor:pointer;min-height:44px;display:flex;align-items:center;font-weight:600;color:var(--mut)}
.footer-form{display:inline}
.notice{font-size:15px;font-weight:600;color:var(--amber);margin-top:8px;min-height:1.5em}

@media(min-width:720px){
 .stats{grid-template-columns:repeat(3,1fr)}
 .hero{padding:30px 32px}
 .section{padding:24px}
 .two{display:grid;grid-template-columns:1.25fr 1fr;gap:18px;align-items:start}
 .two>.section{margin-bottom:0}
}
`;

const HEAD = String.raw`<!DOCTYPE html>
<html lang="nl"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover"><meta name="robots" content="noindex, nofollow"><meta name="referrer" content="no-referrer"><meta name="theme-color" content="#070B1D"><title>Budget</title><style>/*__BASE_CSS__*/
/*__BUDGET_CSS__*/</style></head><body><div class="atmo" aria-hidden="true"></div>`;

const BRAND_ICON = String.raw`<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 7h15a3 3 0 0 1 3 3v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Zm0 0V6a2 2 0 0 1 2-2h11M16 14h2"/></svg>`;

const LOGIN_BODY = String.raw`<div class="app"><main><section class="login glass" aria-labelledby="loginTitle"><span class="brand-mark">/*__BRAND_ICON__*/</span><h1 id="loginTitle">Budget</h1><p>Deze pagina is privé. Vul je wachtwoord in om verder te gaan.</p><!--__LOGIN_ERROR__--><form method="post" action="/budget/login"><label for="password">Wachtwoord<input class="field" id="password" name="password" type="password" autocomplete="current-password" required autofocus></label><button class="primary" type="submit">Inloggen</button></form></section></main></div></body></html>`;

const SETUP_BODY = String.raw`<div class="app"><main><section class="login glass" aria-labelledby="setupTitle"><span class="brand-mark">/*__BRAND_ICON__*/</span><h1 id="setupTitle">Budget</h1><p>Er is nog geen wachtwoord ingesteld. Zet de instelling BUDGET_PASSWORD (minimaal 10 tekens) in de omgeving van de site en open deze pagina opnieuw.</p></section></main></div></body></html>`;

const APP_BODY = String.raw`<a class="skip" href="#mainContent">Naar inhoud</a><div class="app">
<header class="masthead"><a class="brand" href="#maand"><span class="brand-mark">/*__BRAND_ICON__*/</span><span>Budget</span></a><nav class="dock glass" aria-label="Hoofdnavigatie"><a href="#maand" data-nav="maand"><span data-icon="calendar"></span>Deze maand</a><a href="#huis" data-nav="huis"><span data-icon="home"></span>Huis</a></nav></header>
<main class="workspace" id="mainContent" tabindex="-1"><div class="preview-banner" id="previewNotice" hidden><span>Voorvertoning met verzonnen bedragen</span></div>

<section class="view" id="view-laden"><p class="empty" id="loadText" role="status">Laden…</p></section>

<section class="view" id="view-leeg" hidden aria-labelledby="emptyTitle"><div class="section pane"><h1 id="emptyTitle" style="font-size:34px;font-weight:800;letter-spacing:-.8px">Nog geen budget</h1><p class="hero-note" style="margin:8px 0 16px">Plak hieronder je importbestand, of begin met een leeg budget en vul het zelf in.</p><div class="import"><label for="firstImport">Importbestand<textarea id="firstImport" spellcheck="false" autocomplete="off"></textarea></label><p class="notice" id="firstImportError" role="status"></p><div class="section-foot"><button type="button" class="primary" id="firstImportApply">Importeren</button><button type="button" class="text-button" id="startEmpty">Leeg beginnen</button></div></div></div></section>

<section class="view" id="view-maand" hidden aria-labelledby="monthTitle">
<header class="page-heading"><div><div class="micro">Maandbudget</div><h1 id="monthTitle">Deze maand</h1></div></header>
<section class="hero glass" aria-label="Stand van deze maand"><div class="hero-label">Nog nodig deze maand</div><div class="hero-number" id="mOpen">€ 0</div><p class="hero-note" id="mCount"></p><div class="bar" role="img" id="mBar" aria-label=""><i class="bar-now" id="mBarFill"></i></div><div class="stats"><div><span>Al betaald</span><strong id="mPaid">€ 0</strong></div><div><span>Totaal budget</span><strong id="mTotal">€ 0</strong></div></div></section>
<div class="two"><section class="section pane" aria-labelledby="costsTitle"><div class="section-head"><h2 id="costsTitle">Posten</h2><button type="button" class="text-button" id="costsEdit">Aanpassen</button></div><div id="costsHost"></div><div class="section-foot"><button type="button" class="ghost" id="monthReset">Nieuwe maand</button><span class="hero-note">Zet alle vinkjes uit en uitgaven op nul.</span></div></section>
<section class="section pane" aria-labelledby="splitTitle"><div class="section-head"><h2 id="splitTitle">Verdeling</h2><button type="button" class="text-button" id="incomeEdit">Inkomen aanpassen</button></div><div id="incomeHost"></div><div class="split" id="splitHost"></div></section></div>
</section>

<section class="view" id="view-huis" hidden aria-labelledby="houseTitle">
<header class="page-heading"><div><div class="micro">Spaartracker</div><h1 id="houseTitle">Huis</h1></div></header>
<section class="hero glass" aria-label="Stand van het huisbudget"><div class="hero-label" id="hLabel">Verwacht</div><div class="hero-number" id="hDiff">€ 0</div><p class="hero-note" id="hNote"></p><div class="bar" role="img" id="hBar" aria-label=""><i class="bar-plan" id="hBarPlan"></i><i class="bar-now" id="hBarNow"></i></div><div class="legend"><span><i class="l-now"></i>Nu gespaard</span><span><i class="l-plan"></i>Verwacht op de einddatum</span></div><div class="stats"><div><span>Nu gespaard</span><strong id="hNow">€ 0</strong></div><div><span>Nog te betalen</span><strong id="hBudget">€ 0</strong></div><div><span>Maanden te gaan</span><strong id="hMonths">0</strong></div></div><p class="hero-note" id="hAll" style="margin-top:14px"></p><label class="target" for="hTarget">Einddatum<input class="field" type="month" id="hTarget" required></label></section>
<div class="two"><section class="section pane" aria-labelledby="itemsTitle"><div class="section-head"><h2 id="itemsTitle">Huisbudget</h2><button type="button" class="text-button" id="itemsEdit">Aanpassen</button></div><p class="hero-note" id="itemsPaid" style="margin-bottom:10px"></p><div id="itemsHost"></div></section>
<div><section class="section pane" aria-labelledby="potsTitle"><div class="section-head"><h2 id="potsTitle">Potten</h2><button type="button" class="text-button" id="potsEdit">Aanpassen</button></div><div id="potsHost"></div></section>
<section class="section pane" aria-labelledby="extrasTitle" style="margin-top:16px"><div class="section-head"><h2 id="extrasTitle">Eenmalig</h2><button type="button" class="text-button" id="extrasEdit">Aanpassen</button></div><p class="hero-note" style="margin-bottom:10px">Bedragen die nog binnenkomen of worden verrekend. Vul bij Aanpassen in wat al binnen is, of vink af als alles binnen is.</p><div id="extrasHost"></div></section></div></div>
</section>

<footer class="page-footer planner-footer"><div class="planner-save" id="saveState" data-status="saving" role="status">Laden…</div><div class="foot-actions"><button class="text-button" id="exportData" type="button">Exporteren</button><form class="footer-form" method="post" action="/budget/logout"><button class="text-button" type="submit">Uitloggen</button></form></div></footer>
<details class="import section pane" id="importPanel" style="margin-top:16px" hidden><summary>Importeren</summary><p class="hero-note">Een volledig bestand vervangt je hele budget. Een bestand met één onderdeel, zoals je huisposten, vervangt alleen dat onderdeel.</p><label for="laterImport" class="sr-only">Importbestand</label><textarea id="laterImport" spellcheck="false" autocomplete="off"></textarea><p class="notice" id="laterImportError" role="status"></p><button type="button" class="ghost" id="laterImportApply">Importeren</button></details>
</main></div><div class="toast" id="toast" role="status"></div><noscript><p style="padding:24px">Zet JavaScript aan om je budget te gebruiken.</p></noscript><script>
/*__BUDGET_CONFIG__*/
/*__BUDGET_SCRIPT__*/
</script></body></html>`;

const BUDGET_SCRIPT = String.raw`const CONFIG = window.__BUDGET__;
const $ = id => document.getElementById(id);
const escapeHtml = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const ICONS = {
  calendar:'<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M7 3v4m10-4v4M3 11h18m-13 4h2m4 0h2"/>',
  home:'<path d="M3 11 12 3l9 8M5 9.5V21h14V9.5M10 21v-6h4v6"/>',
  check:'<path d="m5 12 4 4L19 6"/>', plus:'<path d="M12 5v14M5 12h14"/>',
  trash:'<path d="M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7m4-7v7"/>'
};
function icon(name){ return '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">' + ICONS[name] + '</svg>'; }
let toastTimer;
function toast(message){$('toast').textContent=message;$('toast').classList.add('on');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('toast').classList.remove('on'),2200);}
function toastAction(message,label,action){toast(message);const button=document.createElement('button');button.type='button';button.className='planner-undo';button.textContent=label;button.addEventListener('click',()=>{button.disabled=true;action();});$('toast').appendChild(button);clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('toast').classList.remove('on'),8000);}

const Budget = (() => {
  let doc=null,view='maand',saving=false,dirty=false,failed=false,saveTimer=null,resetArmed=false,settingTotal=null;
  const editing={costs:false,income:false,items:false,pots:false,extras:false};
  const round=n=>Math.round(n*100)/100;
  const sum=(rows,pick)=>round(rows.reduce((total,row)=>total+pick(row),0));
  const euro=n=>new Intl.NumberFormat('nl-NL',{style:'currency',currency:'EUR',minimumFractionDigits:Number.isInteger(n)?0:2,maximumFractionDigits:2}).format(n);
  const percent=(part,whole)=>whole>0?Math.round(part/whole*100)+'%':'';
  const newId=()=>'r'+Math.random().toString(36).slice(2,10)+Date.now().toString(36);
  function today(){return new Intl.DateTimeFormat('sv-SE',{timeZone:'Europe/Amsterdam'}).format(new Date());}
  // Dutch notation: 1.091 and 1.091,50 and 1091,5 are all accepted. Empty counts as zero.
  function parseMoney(text){
    let s=String(text).replace(/[€\s]/g,'');if(s==='')return 0;
    if(s.includes(','))s=s.replace(/\./g,'').replace(',','.');else if(/^\d{1,3}(\.\d{3})+$/.test(s))s=s.replace(/\./g,'');
    if(!/^\d+(\.\d{1,2})?$/.test(s))return undefined;const n=Number(s);return n<=10000000?n:undefined;
  }
  const moneyText=n=>String(n).replace('.',',');
  function monthsUntil(target,date){const y=Number(date.slice(0,4)),m=Number(date.slice(5,7));return Math.max(0,(Number(target.slice(0,4))-y)*12+Number(target.slice(5,7))-m);}
  const monthName=value=>new Date(value.slice(0,7)+'-15T12:00:00Z').toLocaleDateString('nl-NL',{month:'long',year:'numeric',timeZone:'UTC'});

  // A fixed cost is paid or not. A variable cost (groceries) fills up through the month:
  // what is spent counts as paid, and what is left of its budget is still needed.
  const spentOf=c=>c.spent||0;
  const paidPart=c=>c.variable?spentOf(c):c.paid?c.amount:0;
  const openPart=c=>c.variable?Math.max(0,round(c.amount-spentOf(c))):c.paid?0:c.amount;
  const settled=c=>c.variable?spentOf(c)>=c.amount:c.paid;
  // Every number on the page comes from here.
  function summary(d,date=today()){
    const total=sum(d.costs,c=>c.amount),paid=sum(d.costs,paidPart),open=sum(d.costs,openPart),income=sum(d.income,i=>i.amount);
    const fixed=sum(d.costs.filter(c=>!c.saving),c=>c.amount),savings=round(total-fixed);
    // Payments already made for the house have left the pots, so savings are compared with what is still to pay.
    const months=monthsUntil(d.house.target,date),budget=sum(d.house.items,i=>i.amount),housePaid=sum(d.house.items,i=>i.paid||0),remaining=sum(d.house.items,i=>Math.max(0,round(i.amount-(i.paid||0)))),extras=sum(d.house.extras,e=>e.received?0:Math.max(0,round(e.amount-(e.got||0))));
    const projected=p=>round(p.balance+p.monthly*months),counted=d.house.pots.filter(p=>p.counts);
    const now=sum(counted,p=>p.balance),expected=round(sum(counted,projected)+extras),everything=round(sum(d.house.pots,projected)+extras);
    return {month:{total,paid,open,income,fixed,savings,left:round(income-total),count:d.costs.length,paidCount:d.costs.filter(settled).length},
      house:{months,budget,paid:housePaid,remaining,extras,now,expected,everything,diff:round(expected-remaining),diffAll:round(everything-remaining)}};
  }

  function status(){const el=$('saveState');
    const s=CONFIG.preview?{status:'ok',text:'Voorvertoning · niets wordt opgeslagen'}:failed?{status:'error',text:'Niet opgeslagen · nieuwe poging volgt'}:saving||dirty?{status:'saving',text:'Opslaan…'}:{status:'ok',text:'Opgeslagen'};
    el.textContent=s.text;el.dataset.status=s.status;}
  async function save(){
    if(CONFIG.preview||saving||!dirty||!doc)return;saving=true;dirty=false;status();
    try{const response=await fetch('/budget/data',{method:'PUT',cache:'no-store',headers:{'Content-Type':'application/json'},body:JSON.stringify({doc})});
      if(response.status===401){window.location.reload();return;}
      if(!response.ok)throw Error('HTTP '+response.status);failed=false;
    }catch{failed=true;dirty=true;clearTimeout(saveTimer);saveTimer=setTimeout(save,5000);}
    finally{saving=false;status();if(dirty&&!failed)save();}
  }
  function commit(redraw=true){doc.updatedAt=Date.now();dirty=true;status();clearTimeout(saveTimer);saveTimer=setTimeout(save,500);if(redraw)render();else renderNumbers();}

  // A generic list editor: text, money and checkbox columns, plus add and remove.
  function editor(host,rows,columns,addLabel,create){
    host.innerHTML=(rows.length?'':'<p class="empty">Nog niets toegevoegd.</p>')+rows.map((row,index)=>'<div class="edit-row"><div class="edit-fields">'+columns.map(col=>{
      const id='e-'+host.id+'-'+row.id+'-'+col.key;
      if(col.type==='check')return '<label class="check" for="'+id+'"><input type="checkbox" id="'+id+'" data-row="'+row.id+'" data-key="'+col.key+'" '+(row[col.key]?'checked':'')+'>'+col.label+'</label>';
      return '<label for="'+id+'" class="'+(col.type==='text'?'wide':'')+'">'+col.label+'<input class="field" id="'+id+'" data-row="'+row.id+'" data-key="'+col.key+'" data-type="'+col.type+'" type="text" '+(col.type==='money'?'inputmode="decimal"':'maxlength="80"')+' autocomplete="off" value="'+escapeHtml(col.type==='money'?moneyText(row[col.key]):row[col.key])+'"></label>';
    }).join('')+'</div><button type="button" class="edit-remove" data-remove="'+row.id+'" aria-label="'+escapeHtml((row.name||'Regel '+(index+1))+' verwijderen')+'">'+icon('trash')+'</button></div>').join('')+'<button type="button" class="ghost edit-add">'+icon('plus')+escapeHtml(addLabel)+'</button>';
    host.querySelectorAll('input').forEach(input=>input.addEventListener(input.type==='checkbox'?'change':'input',()=>{
      const row=rows.find(r=>r.id===input.dataset.row);if(!row)return;
      if(input.type==='checkbox')row[input.dataset.key]=input.checked;
      else if(input.dataset.type==='money'){const value=parseMoney(input.value);input.setAttribute('aria-invalid',String(value===undefined));if(value===undefined)return;row[input.dataset.key]=value;}
      else row[input.dataset.key]=input.value;
      commit(false);
    }));
    host.querySelectorAll('[data-remove]').forEach(button=>button.addEventListener('click',()=>{
      const index=rows.findIndex(r=>r.id===button.dataset.remove);if(index<0)return;const [removed]=rows.splice(index,1);commit();
      toastAction('Regel verwijderd','Ongedaan maken',()=>{rows.splice(Math.min(index,rows.length),0,removed);commit();});
    }));
    host.querySelector('.edit-add').addEventListener('click',()=>{if(rows.length>=100){toast('Maximaal 100 regels');return;}const row=create();rows.push(row);commit();host.querySelector('[data-row="'+row.id+'"]')?.focus();});
  }
  function toggleEdit(key,button,label){editing[key]=!editing[key];button.textContent=editing[key]?'Klaar':label;render();}

  // A variable cost shows what went out, what is left and a field to add an expense.
  function variableRow(c){const spent=spentOf(c),left=round(c.amount-spent),setting=settingTotal===c.id,share=c.amount?Math.min(100,spent/c.amount*100):spent?100:0;
    return '<div class="spend pane'+(left<0?' over':'')+'"><div class="spend-top"><span class="row-name">'+escapeHtml(c.name||'Naamloos')+'<small>'+euro(spent)+' van '+euro(c.amount)+' uitgegeven</small></span><span class="row-amount">'+euro(Math.abs(left))+'<small>'+(left<0?'over budget':'nog over')+'</small></span></div><div class="bar" role="img" aria-label="'+escapeHtml(euro(spent)+' van '+euro(c.amount)+' uitgegeven')+'"><i class="bar-now" style="width:'+share+'%"></i></div><form class="spend-form" data-spend="'+c.id+'" novalidate><label for="spend-'+c.id+'">'+(setting?'Totaal uitgegeven':'Uitgave toevoegen')+'<input class="field" id="spend-'+c.id+'" type="text" inputmode="decimal" autocomplete="off" placeholder="0,00" value="'+(setting?moneyText(spent):'')+'"></label><button type="submit" class="primary">'+(setting?'Opslaan':'Toevoegen')+'</button></form><button type="button" class="text-button" data-set-total="'+c.id+'">'+(setting?'Annuleren':'Totaal aanpassen')+'</button></div>';}
  // A house item shows what is still to pay; a deposit shows as a thin bar and the paid amount.
  function houseRow(i){const paid=i.paid||0,left=Math.max(0,round(i.amount-paid)),done=i.amount>0&&paid>=i.amount,share=i.amount?Math.min(100,paid/i.amount*100):0;
    return '<div class="row static'+(done?' settled':'')+'"><span class="row-name">'+escapeHtml(i.name||'Naamloos')+(paid?'<small>'+euro(paid)+' van '+euro(i.amount)+' betaald'+(i.amount&&!done?' · '+Math.round(share)+'%':'')+'</small><span class="mini-bar" aria-hidden="true"><i style="width:'+share+'%"></i></span>':'')+'</span><span class="row-amount">'+euro(done?i.amount:left)+'<small>'+(done?'Betaald':paid?'nog te betalen':'')+'</small></span></div>';}
  // An expected one-off amount: tick it when all of it is in; a part that already arrived shows as a thin bar.
  function extraRow(e){const got=e.received?e.amount:Math.min(e.got||0,e.amount),left=Math.max(0,round(e.amount-got)),share=e.amount?got/e.amount*100:0;
    return '<button type="button" class="row" role="checkbox" aria-checked="'+e.received+'" data-extra="'+e.id+'"><span class="tick">'+icon('check')+'</span><span class="row-name">'+escapeHtml(e.name||'Naamloos')+(!e.received&&got?'<small>'+euro(got)+' van '+euro(e.amount)+' ontvangen</small><span class="mini-bar" aria-hidden="true"><i style="width:'+share+'%"></i></span>':'')+'</span><span class="row-amount">'+euro(e.received?e.amount:left)+'<small>'+(e.received?'Binnen':got?'nog te ontvangen':'Verwacht')+'</small></span></button>';}
  function costRow(c){return '<button type="button" class="row" role="checkbox" aria-checked="'+c.paid+'" data-cost="'+c.id+'"><span class="tick">'+icon('check')+'</span><span class="row-name">'+escapeHtml(c.name||'Naamloos')+(c.saving?'<small>Sparen</small>':'')+'</span><span class="row-amount">'+euro(c.amount)+'<small>'+(c.paid?'Betaald':'Nog te betalen')+'</small></span></button>';}
  function renderMonth(s){
    $('monthTitle').textContent=monthName(today()).replace(/^./,c=>c.toUpperCase());
    const host=$('costsHost');
    if(editing.costs)editor(host,doc.costs,[{key:'name',label:'Naam',type:'text'},{key:'amount',label:'Bedrag per maand',type:'money'},{key:'variable',label:'Geef ik geleidelijk uit',type:'check'},{key:'saving',label:'Dit is sparen',type:'check'}],'Post toevoegen',()=>({id:newId(),name:'',amount:0,paid:false,saving:false,variable:false,spent:0}));
    else{const variable=doc.costs.filter(c=>c.variable),fixedCosts=doc.costs.filter(c=>!c.variable),open=fixedCosts.filter(c=>!c.paid),paid=fixedCosts.filter(c=>c.paid);
      host.innerHTML=doc.costs.length?(variable.length?'<p class="group-label">Loopt door de maand</p><div class="rows">'+variable.map(variableRow).join('')+'</div>':'')+(open.length?'<p class="group-label">Nog te betalen · '+open.length+'</p><div class="rows">'+open.map(costRow).join('')+'</div>':fixedCosts.length?'<p class="empty">Alle vaste posten zijn betaald.</p>':'')+(paid.length?'<p class="group-label">Betaald · '+paid.length+'</p><div class="rows">'+paid.map(costRow).join('')+'</div>':''):'<p class="empty">Nog geen posten. Kies Aanpassen om ze toe te voegen.</p>';
      host.querySelectorAll('[data-cost]').forEach(button=>button.addEventListener('click',()=>{const c=doc.costs.find(x=>x.id===button.dataset.cost);c.paid=!c.paid;commit();}));
      host.querySelectorAll('[data-spend]').forEach(form=>form.addEventListener('submit',event=>{event.preventDefault();
        const c=doc.costs.find(x=>x.id===form.dataset.spend),input=form.querySelector('input'),setting=settingTotal===c.id,value=parseMoney(input.value);
        if(value===undefined||(!setting&&value===0)){input.setAttribute('aria-invalid','true');input.focus();return;}
        const before=spentOf(c);c.spent=setting?value:round(before+value);
        if(c.spent>10000000){c.spent=before;input.setAttribute('aria-invalid','true');return;}
        settingTotal=null;commit();
        toastAction(setting?'Uitgegeven bedrag aangepast':euro(value)+' toegevoegd','Ongedaan maken',()=>{c.spent=before;commit();});
      }));
      host.querySelectorAll('[data-set-total]').forEach(button=>button.addEventListener('click',()=>{settingTotal=settingTotal===button.dataset.setTotal?null:button.dataset.setTotal;render();if(settingTotal)$('spend-'+settingTotal)?.focus();}));}
    const income=$('incomeHost');
    if(editing.income)editor(income,doc.income,[{key:'name',label:'Naam',type:'text'},{key:'amount',label:'Bedrag per maand',type:'money'}],'Inkomen toevoegen',()=>({id:newId(),name:'',amount:0}));else income.innerHTML='';
    $('monthReset').hidden=editing.costs;
  }
  function renderHouse(){
    const months=summary(doc).house.months;
    $('hTarget').value=doc.house.target;
    const items=$('itemsHost');
    if(editing.items)editor(items,doc.house.items,[{key:'name',label:'Naam',type:'text'},{key:'amount',label:'Bedrag',type:'money'},{key:'paid',label:'Al betaald',type:'money'}],'Post toevoegen',()=>({id:newId(),name:'',amount:0,paid:0}));
    else items.innerHTML=doc.house.items.length?'<div class="rows">'+doc.house.items.map(houseRow).join('')+'</div>':'<p class="empty">Nog geen posten.</p>';
    const pots=$('potsHost');
    if(editing.pots)editor(pots,doc.house.pots,[{key:'name',label:'Naam',type:'text'},{key:'balance',label:'Saldo nu',type:'money'},{key:'monthly',label:'Inleg per maand',type:'money'},{key:'counts',label:'Telt mee voor het huis',type:'check'}],'Pot toevoegen',()=>({id:newId(),name:'',balance:0,monthly:0,counts:true}));
    else pots.innerHTML=doc.house.pots.length?'<div class="rows">'+doc.house.pots.map(p=>'<div class="row static"><span class="row-name">'+escapeHtml(p.name||'Naamloos')+'<small>'+(p.counts?'Telt mee':'Telt niet mee')+(p.monthly?' · '+euro(p.monthly)+' per maand':'')+'</small></span><span class="row-amount">'+euro(p.balance)+'<small>wordt '+euro(round(p.balance+p.monthly*months))+'</small></span></div>').join('')+'</div>':'<p class="empty">Nog geen potten.</p>';
    const extras=$('extrasHost');
    if(editing.extras)editor(extras,doc.house.extras,[{key:'name',label:'Naam',type:'text'},{key:'amount',label:'Bedrag',type:'money'},{key:'got',label:'Al ontvangen',type:'money'}],'Bedrag toevoegen',()=>({id:newId(),name:'',amount:0,received:false,got:0}));
    else{extras.innerHTML=doc.house.extras.length?'<div class="rows">'+doc.house.extras.map(extraRow).join('')+'</div>':'<p class="empty">Geen eenmalige bedragen.</p>';
      extras.querySelectorAll('[data-extra]').forEach(button=>button.addEventListener('click',()=>{const e=doc.house.extras.find(x=>x.id===button.dataset.extra);e.received=!e.received;commit();}));}
  }
  // Totals only: called while typing, so open inputs keep their focus.
  function renderNumbers(){
    const s=summary(doc),m=s.month,h=s.house;
    $('mOpen').textContent=euro(m.open);$('mPaid').textContent=euro(m.paid);$('mTotal').textContent=euro(m.total);
    $('mCount').textContent=m.count?m.paidCount+' van '+m.count+' posten betaald':'Nog geen posten';
    $('mBarFill').style.width=(m.total?m.paid/m.total*100:0)+'%';$('mBar').setAttribute('aria-label',euro(m.paid)+' van '+euro(m.total)+' betaald');
    $('splitHost').innerHTML='<div><span>Inkomen</span><b>'+euro(m.income)+'</b></div><div><span>Vaste lasten<small>'+percent(m.fixed,m.income)+'</small></span><b>'+euro(m.fixed)+'</b></div><div><span>Sparen<small>'+percent(m.savings,m.income)+'</small></span><b>'+euro(m.savings)+'</b></div><div class="is-left '+(m.left<0?'is-short':'')+'"><span>'+(m.left<0?'Tekort':'Over')+'<small>'+percent(Math.abs(m.left),m.income)+'</small></span><b>'+euro(Math.abs(m.left))+'</b></div>';
    const when=monthName(doc.house.target);
    $('hLabel').textContent='Verwacht in '+when;
    $('hDiff').innerHTML=euro(Math.abs(h.diff))+'<small>'+(h.diff<0?'tekort':'over')+'</small>';$('hDiff').className='hero-number '+(h.diff<0?'short':'good');
    $('hNote').innerHTML='Verwacht gespaard: <b>'+euro(h.expected)+'</b> van <b>'+euro(h.remaining)+'</b> nog te betalen';
    $('hBarNow').style.width=(h.remaining?Math.min(100,h.now/h.remaining*100):h.budget?100:0)+'%';$('hBarPlan').style.width=(h.remaining?Math.min(100,h.expected/h.remaining*100):h.budget?100:0)+'%';
    $('hBar').setAttribute('aria-label','Nu gespaard '+euro(h.now)+', verwacht '+euro(h.expected)+', nog te betalen '+euro(h.remaining));
    $('hNow').textContent=euro(h.now);$('hBudget').textContent=euro(h.remaining);$('itemsPaid').textContent=h.paid?euro(h.paid)+' van '+euro(h.budget)+' al betaald':'Totaal '+euro(h.budget);$('hMonths').textContent=h.months;
    $('hAll').textContent='Met alle potten erbij: '+euro(Math.abs(h.diffAll))+(h.diffAll<0?' tekort.':' over.');
  }
  function render(){
    for(const name of ['laden','leeg','maand','huis'])$('view-'+name).hidden=name!==(doc?view:CONFIG.loaded?'leeg':'laden');
    document.querySelectorAll('[data-nav]').forEach(a=>{if(doc&&a.dataset.nav===view)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
    $('importPanel').hidden=!doc;
    if(!doc)return;
    renderMonth();renderHouse();renderNumbers();status();
  }
  function readView(){view=(window.location.hash||'').slice(1)==='huis'?'huis':'maand';}

  function resetMonth(){
    const button=$('monthReset');
    if(!resetArmed){resetArmed=true;button.textContent='Tik nogmaals om alles uit te vinken';setTimeout(()=>{resetArmed=false;button.textContent='Nieuwe maand';},5000);return;}
    resetArmed=false;button.textContent='Nieuwe maand';const before=doc.costs.map(c=>({id:c.id,paid:c.paid,spent:spentOf(c)}));
    for(const c of doc.costs){c.paid=false;c.spent=0;}commit();
    toastAction('Nieuwe maand gestart','Ongedaan maken',()=>{for(const old of before){const c=doc.costs.find(x=>x.id===old.id);if(c){c.paid=old.paid;c.spent=old.spent;}}commit();});
  }
  async function importText(text,errorEl){
    let parsed;try{parsed=JSON.parse(text);}catch{errorEl.textContent='Dit is geen geldig importbestand.';return;}
    if(!parsed||typeof parsed!=='object'||Array.isArray(parsed)){errorEl.textContent='Dit is geen geldig importbestand.';return;}
    // A file with a version replaces the whole budget. A file without one replaces only the parts it contains,
    // so this month's ticks and spending stay as they are.
    const partial=parsed.version===undefined&&Boolean(doc),previous=doc?JSON.parse(JSON.stringify(doc)):null;let next=parsed,label='Budget geïmporteerd';
    if(partial){
      const names={costs:'posten',income:'inkomen',items:'huisposten',extras:'eenmalige bedragen',pots:'potten',target:'einddatum'},parts=[];
      next=JSON.parse(JSON.stringify(doc));
      for(const key of ['income','costs'])if(Array.isArray(parsed[key])){next[key]=parsed[key];parts.push(names[key]);}
      if(parsed.house&&typeof parsed.house==='object'){
        for(const key of ['items','extras','pots'])if(Array.isArray(parsed.house[key])){next.house[key]=parsed.house[key];parts.push(names[key]);}
        if(typeof parsed.house.target==='string'){next.house.target=parsed.house.target;parts.push(names.target);}
      }
      if(!parts.length){errorEl.textContent='Dit bestand bevat niets om te importeren.';return;}
      label='Bijgewerkt: '+parts.join(', ');
    }
    next.version=1;next.updatedAt=Date.now();
    const finish=()=>{errorEl.textContent='';render();if(previous)toastAction(label,'Ongedaan maken',()=>{doc=previous;commit();});else toast(label);};
    if(CONFIG.preview){doc=next;finish();return true;}
    try{const response=await fetch('/budget/data',{method:'PUT',cache:'no-store',headers:{'Content-Type':'application/json'},body:JSON.stringify({doc:next})});
      if(response.status===400){errorEl.textContent='Dit bestand klopt niet. Er is niets gewijzigd.';return;}
      if(!response.ok)throw Error('HTTP '+response.status);
      doc=(await response.json()).data;finish();return true;
    }catch{errorEl.textContent='Importeren is niet gelukt. Probeer het opnieuw.';}
  }
  function emptyDoc(){const d=new Date();return {version:1,updatedAt:Date.now(),income:[],costs:[],house:{target:(d.getFullYear()+2)+'-'+String(d.getMonth()+1).padStart(2,'0'),items:[],extras:[],pots:[]}};}
  async function load(){
    if(CONFIG.preview){doc=CONFIG.demo;CONFIG.loaded=true;render();return;}
    try{const response=await fetch('/budget/data',{cache:'no-store'});
      if(response.status===401){window.location.reload();return;}
      if(!response.ok)throw Error('HTTP '+response.status);
      doc=(await response.json()).data;CONFIG.loaded=true;render();if(doc)status();else $('saveState').textContent='';
    }catch{$('loadText').textContent='Laden is niet gelukt. Ververs de pagina om het opnieuw te proberen.';$('saveState').textContent='';}
  }
  function initialize(){
    document.querySelectorAll('[data-icon]').forEach(el=>{el.innerHTML=icon(el.dataset.icon);});
    $('previewNotice').hidden=!CONFIG.preview;
    $('costsEdit').addEventListener('click',event=>toggleEdit('costs',event.target,'Aanpassen'));
    $('incomeEdit').addEventListener('click',event=>toggleEdit('income',event.target,'Inkomen aanpassen'));
    $('itemsEdit').addEventListener('click',event=>toggleEdit('items',event.target,'Aanpassen'));
    $('potsEdit').addEventListener('click',event=>toggleEdit('pots',event.target,'Aanpassen'));
    $('extrasEdit').addEventListener('click',event=>toggleEdit('extras',event.target,'Aanpassen'));
    $('monthReset').addEventListener('click',resetMonth);
    $('hTarget').addEventListener('change',event=>{if(!/^\d{4}-(0[1-9]|1[0-2])$/.test(event.target.value)){event.target.value=doc.house.target;return;}doc.house.target=event.target.value;commit();});
    $('firstImportApply').addEventListener('click',()=>importText($('firstImport').value,$('firstImportError')));
    $('laterImportApply').addEventListener('click',async()=>{if(await importText($('laterImport').value,$('laterImportError')))$('laterImport').value='';});
    $('startEmpty').addEventListener('click',()=>{doc=emptyDoc();commit();});
    $('exportData').addEventListener('click',()=>{if(!doc)return;const url=URL.createObjectURL(new Blob([JSON.stringify(doc,null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download='budget-'+today()+'.json';a.click();URL.revokeObjectURL(url);});
    window.addEventListener('hashchange',()=>{readView();render();window.scrollTo?.({top:0,behavior:'instant'});});
    window.addEventListener('beforeunload',event=>{if(dirty||saving)event.preventDefault();});
    readView();render();load();
  }
  return {initialize,summary,parseMoney,monthsUntil,importText,doc:()=>doc,setDoc:value=>{doc=value;}};
})();
Budget.initialize();
`;

const page = (body: string) => (HEAD + body)
  .replace("/*__BASE_CSS__*/", () => BASE_CSS)
  .replace("/*__BUDGET_CSS__*/", () => BUDGET_CSS)
  .replace("/*__BRAND_ICON__*/", () => BRAND_ICON);

export const BUDGET_SETUP_HTML = page(SETUP_BODY);
export const BUDGET_APP_HTML = page(APP_BODY).replace("/*__BUDGET_SCRIPT__*/", () => BUDGET_SCRIPT);

const LOGIN_ERRORS: Record<string, string> = {
  "1": "Dat wachtwoord klopt niet.",
  "2": "Te veel pogingen. Probeer het over een kwartier opnieuw.",
};
export function budgetLoginHtml(error: string | null): string {
  const message = error ? LOGIN_ERRORS[error] : undefined;
  return page(LOGIN_BODY).replace("<!--__LOGIN_ERROR__-->", () => (message ? `<p class="login-error" role="alert">${message}</p>` : ""));
}
