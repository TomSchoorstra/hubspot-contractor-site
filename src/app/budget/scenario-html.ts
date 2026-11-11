// The what-if view of the house budget: where to live per month, salary raises and a few switches,
// calculated month by month until delivery. It sits next to the house tracker and never changes it.
// Like the rest of the page this is HTML in strings. Inside the String.raw blocks: no backticks and no template placeholders.
// No amounts live here: every number comes from the stored budget document.

export const SCENARIO_CSS = String.raw`
.sc-sticky{position:fixed;top:calc(10px + env(safe-area-inset-top));left:50%;z-index:25;transform:translate(-50%,-90px);display:flex;align-items:baseline;gap:10px;max-width:calc(100% - 24px);padding:10px 18px;border-radius:999px;white-space:nowrap;transition:transform .3s var(--ease)}
.sc-sticky.on{transform:translate(-50%,0)}
.sc-sticky b{font-family:var(--display);font-size:20px;font-weight:800;font-variant-numeric:tabular-nums}
.sc-sticky b.short{color:var(--amber)}.sc-sticky b.good{color:var(--tide)}
.sc-sticky span{font-size:13px;color:var(--mut);overflow:hidden;text-overflow:ellipsis}
.sc-plan{display:flex;flex-wrap:wrap;align-items:center;gap:8px 14px;margin-top:14px}
.sc-plan p{font-size:15px;font-weight:600}
.sc-plan .ghost{min-height:44px}

.chips{display:flex;flex-wrap:wrap;gap:8px;margin:12px 0 14px}
.chip{display:inline-flex;align-items:center;gap:10px;min-height:52px;padding:6px 16px 6px 10px;border-radius:999px;border:1px solid var(--edge-soft);background:rgba(255,255,255,.04);text-align:left;transition:background .2s,border-color .2s}
.chip i{width:22px;height:22px;border-radius:50%;flex-shrink:0}
.chip span{font-size:15px;font-weight:700;line-height:1.2}
.chip small{display:block;font-size:12px;font-weight:500;color:var(--mut)}
.chip[aria-checked=true]{border-color:var(--ink);background:rgba(255,255,255,.14)}
.t0{background:rgba(255,255,255,.16);color:var(--ink)}.t1{background:#74ecd0;color:#04261f}.t2{background:#b9a8ff;color:#160c40}.t3{background:#8fc2ff;color:#06203f}.t4{background:#ffcf7a;color:#2b1c00}.t5{background:#ff9c9c;color:#3d0a0a}

/* The timeline: one row per year. A sideways drag paints; an up-down drag still scrolls the page. */
.tl{display:grid;gap:4px;touch-action:pan-y;-webkit-user-select:none;user-select:none}
.tl-row{display:grid;grid-template-columns:42px repeat(12,minmax(0,1fr));gap:3px;align-items:center}
.tl-y{font-size:13px;font-weight:700;color:var(--mut)}
.tl-cell{display:grid;place-items:center;min-height:44px;border-radius:9px;font-size:12px;font-weight:700;text-transform:uppercase}
.tl-cell.off{background:none;border:1px dashed var(--edge-soft);opacity:.45}
.tl-cell.end{background:none;border:2px solid var(--amber);color:var(--amber)}
button.tl-cell{cursor:pointer;transition:transform .12s var(--ease)}button.tl-cell:active{transform:scale(.92)}
.tl-note{display:flex;flex-wrap:wrap;gap:4px 14px;margin-top:10px;font-size:13px;color:var(--mut)}

.places{display:grid;gap:8px;margin-top:16px}
.place{border:1px solid var(--edge-soft);border-radius:var(--r-sm);background:rgba(255,255,255,.04)}
.place summary{display:grid;grid-template-columns:auto minmax(0,1fr) auto;align-items:center;gap:10px;min-height:56px;padding:8px 14px;cursor:pointer;list-style:none}
.place summary::-webkit-details-marker{display:none}
.place summary i{width:16px;height:16px;border-radius:50%}
.place summary span{font-weight:700;overflow-wrap:anywhere}
.place summary b{font-family:var(--display);font-weight:800;font-variant-numeric:tabular-nums;white-space:nowrap}
.place summary b small{font-family:var(--body);font-size:12px;font-weight:500;color:var(--mut);margin-left:4px}
.place-body{padding:4px 14px 14px;display:grid;gap:10px}
.place-body>label{display:grid;gap:4px}
.sc-lines{display:grid;gap:10px}
.sc-line{display:grid;grid-template-columns:minmax(0,1fr) 44px;gap:6px 8px;align-items:end;padding-bottom:10px;border-bottom:1px solid var(--edge-soft)}
.sc-line .sc-fields{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:6px 8px;min-width:0}
.sc-line label{display:grid;gap:4px;min-width:0}
.sc-line label.check{display:flex;align-items:center;gap:10px;min-height:44px;font-size:15px;color:var(--ink)}
.sc-line input[type=checkbox]{width:24px;height:24px;accent-color:var(--iris-deep);flex-shrink:0}
.sc-line .field,.sc-grid .field,.place-body .field{min-height:46px;padding:8px 12px;font-size:17px}
.stepper{display:grid;grid-template-columns:44px minmax(0,1fr) 44px;gap:6px;align-items:center}
.stepper .field{text-align:center}
.sc-del{display:grid;place-items:center;width:44px;height:46px;border-radius:50%;color:var(--mut)}
.sc-del:hover{color:var(--rose);background:rgba(255,156,156,.14)}

.slider{padding:12px 0;border-bottom:1px solid var(--edge-soft)}.slider:last-child{border-bottom:0}
.slider-top{display:flex;align-items:baseline;justify-content:space-between;gap:12px}
.slider-top label{font-size:16px;font-weight:600;color:var(--ink)}
.slider-top output{font-family:var(--display);font-size:24px;font-weight:800;font-variant-numeric:tabular-nums}
.slider input[type=range]{width:100%;min-height:44px;accent-color:var(--iris);cursor:pointer}

.sc-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:10px;margin-bottom:6px}
.sc-grid label{display:grid;gap:4px;min-width:0}
.sc-assume summary{cursor:pointer;min-height:44px;display:flex;align-items:center;font-size:22px;font-weight:700;font-family:var(--display);letter-spacing:-.3px}
.sc-assume h3{font-size:16px;font-weight:700;margin:18px 0 8px}

/* Charts */
.chart{position:relative;margin-top:10px}
.chart svg{width:100%;height:auto;overflow:visible}
.chart text{font:500 11px var(--body);fill:var(--mut)}
.chart .hit{fill:transparent;cursor:crosshair}.chart .hit:hover{fill:rgba(255,255,255,.07)}
.sc-tip{position:absolute;top:0;left:0;z-index:5;min-width:190px;padding:10px 12px;border-radius:14px;background:#141b38;border:1px solid var(--edge);box-shadow:0 18px 40px -18px rgba(0,0,0,.9);font-size:13px;pointer-events:none}
.sc-tip strong{display:block;font-size:14px;margin-bottom:4px}
.sc-tip div{display:flex;justify-content:space-between;gap:14px;color:var(--mut)}
.sc-tip div b{color:var(--ink);font-variant-numeric:tabular-nums;font-weight:700}
.sc-tip div span{display:inline-flex;align-items:center;gap:6px}
.sc-tip i,.sc-legend i{width:10px;height:10px;border-radius:3px;flex-shrink:0}
.sc-tip .sum{margin-top:4px;padding-top:4px;border-top:1px solid var(--edge-soft);color:var(--ink);font-weight:700}
.sc-legend{display:flex;flex-wrap:wrap;gap:6px 16px;font-size:13px;color:var(--mut)}
.sc-legend span{display:inline-flex;align-items:center;gap:6px}
.sc-legend .dash{width:16px;height:0;border-top:2px dashed currentColor;border-radius:0;background:none}
.sc-legend .dot{width:12px;height:3px;border-radius:2px;background:var(--ink)}
.sc-table{margin-top:12px}
.sc-table summary{cursor:pointer;min-height:44px;display:flex;align-items:center;font-size:14px;font-weight:600;color:var(--mut)}
.sc-scroll{overflow-x:auto}
.sc-table table{border-collapse:collapse;width:100%;min-width:560px;font-size:14px;font-variant-numeric:tabular-nums}
.sc-table th,.sc-table td{padding:8px 10px;text-align:right;border-bottom:1px solid var(--edge-soft);white-space:nowrap}
.sc-table th:first-child,.sc-table td:first-child,.sc-table th:nth-child(2),.sc-table td:nth-child(2){text-align:left}
.sc-table th{font-size:13px;color:var(--mut);font-weight:600}

.br{display:grid;gap:10px}
.br-row{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,1.4fr) 104px;align-items:center;gap:12px}
.br-name{font-size:15px;font-weight:600}
.br-name small{display:block;font-size:13px;font-weight:500;color:var(--mut)}
.br-track{position:relative;height:22px}
.br-zero{position:absolute;top:-6px;bottom:-6px;width:2px;background:var(--mut);opacity:.6}
.br-bar{position:absolute;top:0;bottom:0;border-radius:6px;min-width:2px}
.br-bar.start{background:var(--amber)}.br-bar.plus{background:var(--tide)}.br-bar.min{background:var(--rose)}
.br-val{text-align:right;font-family:var(--display);font-weight:800;font-variant-numeric:tabular-nums;white-space:nowrap}
.br-row.total{padding-top:12px;border-top:1px solid var(--edge-soft)}
.br-row.total .br-name{font-size:17px;font-weight:800}.br-row.total .br-val{font-size:20px}
@media(max-width:640px){
 .br-row{grid-template-columns:1fr 104px;gap:4px 10px}.br-track{grid-column:1/-1;grid-row:2}
 .tl-row{grid-template-columns:34px repeat(12,minmax(0,1fr));gap:2px}.tl-cell{border-radius:7px;font-size:11px}
}
`;

export const SCENARIO_VIEW = String.raw`<section class="view" id="view-scenario" hidden aria-labelledby="scTitle">
<header class="page-heading"><div><div class="micro">Huis · wat als</div><h1 id="scTitle">Scenario</h1></div><a class="ghost" href="#huis">Terug naar Huis</a></header>
<div class="section pane" id="scEmpty" hidden><h2 style="font-size:22px;font-weight:700">Nog geen scenario</h2><p class="hero-note" style="margin:8px 0 16px">Plak je scenariobestand onderaan bij Importeren, of begin leeg en vul de aannames zelf in. Je Huis-pagina verandert hier niet door.</p><button type="button" class="primary" data-act="start">Leeg beginnen</button></div>
<div id="scBody" hidden>
<div class="sc-sticky glass" id="scSticky" aria-hidden="true"><b id="scStickyNum"></b><span id="scStickyPlan"></span></div>
<section class="hero glass" id="scHero" aria-label="Uitkomst van het scenario"><div class="hero-label" id="scLabel"></div><div class="hero-number" id="scResult">€ 0</div><p class="hero-note" id="scNote"></p><div class="sc-plan"><p id="scPlan" role="status"></p><button type="button" class="ghost" id="scSave" data-act="save">Plan bijwerken</button><button type="button" class="text-button" id="scReset" data-act="reset">Terug naar plan</button></div><div class="stats"><div><span>Huisbudget alleen</span><strong id="scBase">€ 0</strong></div><div><span>Effect van dit scenario</span><strong id="scEffect">€ 0</strong></div><div><span>Maanden te gaan</span><strong id="scMonths">0</strong></div></div></section>
<div id="scControls"></div>
<div id="scResults"></div>
<div id="scAssume"></div>
</div>
</section>`;

export const SCENARIO_SCRIPT = String.raw`
const Scenario = (() => {
  const T=Budget.tools;
  const MONTHS=['jan','feb','mrt','apr','mei','jun','jul','aug','sep','okt','nov','dec'];
  // Four fixed series, checked for colour-blind separation on the dark surface.
  const SERIES=[{key:'living',name:'Wonen',color:'#19a88c'},{key:'salary',name:'Salaris',color:'#8b74f2'},{key:'mortgage',name:'Hypotheek',color:'#e56565'},{key:'tax',name:'Renteaftrek',color:'#3f8fe8'}];
  let draft=null,seen=null,brush=null,painting=false,sim=null,plan=null,resizeTimer=null,bound=false,lastWidth=0;
  const open=new Set(),view=()=>$('view-scenario');
  const clone=v=>JSON.parse(JSON.stringify(v));
  const canon=v=>Array.isArray(v)?'['+v.map(canon).join(',')+']':v&&typeof v==='object'?'{'+Object.keys(v).sort().map(k=>JSON.stringify(k)+':'+canon(v[k])).join(',')+'}':JSON.stringify(v);
  const E=n=>T.euro(Math.abs(Math.round(n)));
  const signed=n=>(Math.round(n)<0?'− ':'+ ')+E(n);
  const pct=n=>String(n).replace('.',',')+'%';
  const ym=(y,m)=>y+'-'+String(m).padStart(2,'0');
  const short=m=>MONTHS[Number(m.slice(5,7))-1]+' '+m.slice(0,4);
  function monthsFrom(start,end){const out=[];let y=Number(start.slice(0,4)),m=Number(start.slice(5,7));
    while(ym(y,m)<end&&out.length<120){out.push(ym(y,m));m++;if(m>12){m=1;y++;}}return out;}

  // The whole calculation. One row per month from this month up to the month before delivery.
  // Everything is measured against the monthly budget as it is today: what changes is extra or less money for the house.
  function simulate(d,sc,date){
    const start=date.slice(0,7),months=monthsFrom(start,sc.delivery),n=months.length,sum=T.sum;
    const cost=p=>sum(p.lines,l=>l.amount),home=sc.places[0],homeCost=cost(home),byId=new Map(sc.places.map(p=>[p.id,p]));
    // While the building depot is full the bank pays interest on it, so the monthly payment is lower. Every amount
    // that leaves the depot raises the payment by one month of depot interest, until the full payment is reached.
    const rate=sc.depotRate/1200,gap=Math.max(0,sc.mortgageFull-sc.mortgageNow),depot=rate>0?gap/rate:0;
    const remaining=sum(d.house.items,i=>Math.max(0,i.amount-(i.paid||0))),extras=sum(d.house.extras,e=>e.received?0:Math.max(0,e.amount-(e.got||0)));
    const extraPots=d.house.pots.filter(p=>!p.counts&&sc.pots.includes(p.id));
    const potsAt=k=>{const f=T.projectPots(d.house.pots,k);return {own:sum(d.house.pots.filter(p=>p.counts),p=>f.get(p.id).total),extra:sum(extraPots,p=>f.get(p.id).total)};};
    const oneOffs=sum(sc.oneOffs,o=>o.on?(o.income?o.amount:-o.amount):0);
    const parts={living:0,salary:0,mortgage:0,tax:0},rows=[],raises=[],series=[];
    let gross=sc.salary,drawn=0,cum=0;
    months.forEach((m,k)=>{
      const p=potsAt(k);series.push(p.own+p.extra+cum);
      if(Number(m.slice(5,7))===sc.raiseMonth&&m>start){const before=gross,share=sc.raises[m.slice(0,4)]||0;gross*=1+share/100;raises.push({year:m.slice(0,4),month:m,pct:share,net:(gross-before)*sc.netShare/1200});}
      for(const draw of sc.draws)if(draw.month===m)drawn+=draw.amount;
      const place=byId.get(sc.stay[m])||home,living=homeCost-cost(place),salary=(gross-sc.salary)*sc.netShare/1200;
      const extra=sc.depotStopOn&&m>=sc.depotStop?gap:Math.min(gap,drawn*rate);
      // The tax refund in the budget is a fixed amount. From the month the provisional assessment is right, the real refund follows the interest.
      const benefit=sc.taxRate/100*(sc.interestNow+extra),tax=m>=sc.taxFrom?benefit-sc.taxInBudget:0,total=living+salary-extra+tax;
      parts.living+=living;parts.salary+=salary;parts.mortgage-=extra;parts.tax+=tax;cum+=total;
      rows.push({month:m,place,living,salary,mortgage:-extra,tax,total,gross:sc.mortgageNow+extra,benefit:m>=sc.taxFrom?benefit:sc.taxInBudget});
    });
    const end=potsAt(n),base=end.own+extras-remaining;
    const result=base+end.extra+parts.living+parts.salary+parts.mortgage+parts.tax+oneOffs;
    series.push(end.own+end.extra+cum+extras+oneOffs);
    const costs=new Map(sc.places.map(p=>[p.id,cost(p)]));
    return {start,months,n,rows,raises,parts:{base,...parts,oneOffs,pots:end.extra},result,remaining,series,depot,homeCost,costs};
  }

  function emptyScenario(d){const year=Number(T.today().slice(0,4));
    return {delivery:d.house.target,places:[{id:'nu',name:'Zoals nu',lines:[]}],stay:{},salary:0,netShare:50,raiseMonth:4,raises:{},mortgageNow:0,mortgageFull:0,depotRate:0,depotStop:d.house.target,depotStopOn:false,draws:[],interestNow:0,taxRate:0,taxInBudget:0,taxFrom:ym(year+1,1),oneOffs:[],pots:[]};}
  function sync(){const d=Budget.doc(),stamp=d&&d.scenario?canon(d.scenario):'';
    if(stamp!==seen){seen=stamp;draft=stamp?clone(d.scenario):null;}
    if(draft&&!draft.places.some(p=>p.id===brush))brush=(draft.places[1]||draft.places[0]).id;}
  const tone=id=>'t'+Math.max(0,draft.places.findIndex(p=>p.id===id));
  function listOf(name){if(name==='places')return draft.places;if(name==='draws')return draft.draws;if(name==='oneOffs')return draft.oneOffs;
    if(name.startsWith('place:'))return draft.places.find(p=>p.id===name.slice(6))?.lines;}
  const rowOf=(name,id)=>listOf(name)?.find(r=>r.id===id);

  // ---- Inputs ----
  const attr=(d)=>Object.entries(d).map(([k,v])=>' data-'+k+'="'+escapeHtml(v)+'"').join('');
  function fieldHtml(label,data,value,type){
    if(type==='check')return '<label class="check"><input type="checkbox"'+attr({...data,type})+(value?' checked':'')+'>'+label+'</label>';
    if(type==='month')return '<label>'+label+'<input class="field" type="month"'+attr({...data,type})+' value="'+escapeHtml(value)+'" required></label>';
    if(type==='text')return '<label>'+label+'<input class="field" type="text" maxlength="80" autocomplete="off"'+attr({...data,type})+' value="'+escapeHtml(value)+'"></label>';
    const input='<input class="field" type="text" inputmode="decimal" autocomplete="off"'+attr({...data,type:type==='step'?'money':type})+' value="'+escapeHtml(T.moneyText(value))+'">';
    if(type!=='step')return '<label>'+label+input+'</label>';
    return '<label>'+label+'<span class="stepper"><button type="button" class="icon-button"'+attr({...data,act:'step',step:-25})+' aria-label="25 euro minder">−</button>'+input+'<button type="button" class="icon-button"'+attr({...data,act:'step',step:25})+' aria-label="25 euro meer">+</button></span></label>';
  }
  function linesHtml(name,rows,columns,addLabel){
    return '<div class="sc-lines">'+rows.map(row=>'<div class="sc-line"><div class="sc-fields">'+columns.map(c=>fieldHtml(c.label,{sc:'cell',list:name,id:row.id,key:c.key},row[c.key],c.type)).join('')+'</div><button type="button" class="sc-del"'+attr({act:'del',list:name,id:row.id})+' aria-label="'+escapeHtml((row.name||'Regel')+' verwijderen')+'">'+icon('trash')+'</button></div>').join('')+'</div><button type="button" class="ghost edit-add"'+attr({act:'add',list:name})+'>'+icon('plus')+escapeHtml(addLabel)+'</button>';
  }
  const scalar=(label,key,type)=>fieldHtml(label,{sc:'num',key},draft[key],type);

  function timelineHtml(){
    const months=monthsFrom(T.today().slice(0,7),draft.delivery);if(!months.length)return '<p class="empty">De oplevering is deze maand of al geweest.</p>';
    const inside=new Set(months),first=Number(months[0].slice(0,4)),last=Number(draft.delivery.slice(0,4));let html='<div class="tl" id="scTimeline">';
    for(let y=first;y<=last;y++){html+='<div class="tl-row"><span class="tl-y">'+y+'</span>';
      for(let m=1;m<=12;m++){const key=ym(y,m);
        if(key===draft.delivery)html+='<span class="tl-cell end" title="Oplevering" aria-label="Oplevering">'+icon('home')+'</span>';
        else if(!inside.has(key))html+='<span class="tl-cell off" aria-hidden="true"></span>';
        else{const place=draft.places.find(p=>p.id===draft.stay[key])||draft.places[0];html+='<button type="button" class="tl-cell '+tone(place.id)+'" data-month="'+key+'" aria-label="'+escapeHtml(T.monthName(key)+': '+(place.name||'Naamloos'))+'">'+MONTHS[m-1].charAt(0)+'</button>';}}
      html+='</div>';}
    return html+'</div>';
  }
  function renderControls(){
    const d=Budget.doc(),s=draft;
    const chips=s.places.map(p=>'<button type="button" class="chip" role="radio" aria-checked="'+(p.id===brush)+'"'+attr({act:'brush',id:p.id})+'><i class="'+tone(p.id)+'"></i><span>'+escapeHtml(p.name||'Naamloos')+'<small data-out="pc:'+p.id+'"></small></span></button>').join('');
    const places=s.places.map((p,index)=>'<details class="place" data-place="'+p.id+'"'+(open.has(p.id)?' open':'')+'><summary><i class="'+tone(p.id)+'"></i><span>'+escapeHtml(p.name||'Naamloos')+(index?'':' · je situatie nu')+'</span><b data-out="pt:'+p.id+'"></b></summary><div class="place-body">'+fieldHtml('Naam',{sc:'cell',list:'places',id:p.id,key:'name'},p.name,'text')+linesHtml('place:'+p.id,p.lines,[{key:'name',label:'Kostenpost',type:'text'},{key:'amount',label:'Per maand',type:'step'}],'Kostenpost toevoegen')+(index?'<button type="button" class="text-button"'+attr({act:'del-place',id:p.id})+'>Deze woonsituatie verwijderen</button>':'')+'</div></details>').join('');
    const raiseYears=simulate(d,s,T.today()).raises;
    const sliders=raiseYears.length?raiseYears.map(r=>'<div class="slider"><div class="slider-top"><label for="raise-'+r.year+'">Verhoging '+T.monthName(r.month)+'</label><output for="raise-'+r.year+'" data-out="rp:'+r.year+'"></output></div><input type="range" id="raise-'+r.year+'" min="0" max="10" step="0.5" value="'+r.pct+'"'+attr({sc:'raise',year:r.year})+'><p class="hero-note" data-out="rn:'+r.year+'"></p></div>').join(''):'<p class="empty">Er valt geen verhoging meer voor de oplevering.</p>';
    const offs=s.oneOffs.map(o=>'<button type="button" class="row" role="checkbox" aria-checked="'+o.on+'"'+attr({act:'oneoff',id:o.id})+'><span class="tick">'+icon('check')+'</span><span class="row-name">'+escapeHtml(o.name||'Naamloos')+'<small>'+(o.income?'Komt binnen':'Kost geld')+'</small></span><span class="row-amount">'+(o.income?'+ ':'− ')+T.euro(o.amount)+'</span></button>').join('');
    const flow=T.projectPots(d.house.pots,monthsFrom(T.today().slice(0,7),s.delivery).length);
    const pots=d.house.pots.filter(p=>!p.counts).map(p=>'<button type="button" class="row" role="checkbox" aria-checked="'+s.pots.includes(p.id)+'"'+attr({act:'pot',id:p.id})+'><span class="tick">'+icon('check')+'</span><span class="row-name">'+escapeHtml(p.name||'Naamloos')+' inzetten<small>Telt op je Huis-pagina niet mee</small></span><span class="row-amount">+ '+E(flow.get(p.id).total)+'</span></button>').join('');
    $('scControls').innerHTML=
      '<section class="section pane" aria-labelledby="scLiveTitle"><div class="section-head"><h2 id="scLiveTitle">Waar je woont</h2></div><p class="hero-note">Kies een woonsituatie en tik op de maanden, of sleep opzij over een rij.</p><div class="chips" role="radiogroup" aria-label="Woonsituatie om in te vullen">'+chips+'</div>'+timelineHtml()+'<div class="places">'+places+'</div>'+(s.places.length<6?'<button type="button" class="ghost edit-add" data-act="add-place">'+icon('plus')+'Woonsituatie toevoegen</button>':'')+'</section>'+
      '<section class="section pane" aria-labelledby="scPayTitle"><div class="section-head"><h2 id="scPayTitle">Salaris</h2></div>'+(s.salary?'':'<p class="hero-note">Vul je bruto jaarsalaris in bij Aannames, dan rekenen de verhogingen mee.</p>')+sliders+'</section>'+
      '<section class="section pane" aria-labelledby="scSwitchTitle"><div class="section-head"><h2 id="scSwitchTitle">Aan of uit</h2></div>'+(offs?'<p class="group-label">Eenmalig</p><div class="rows">'+offs+'</div>':'')+(pots?'<p class="group-label">Potten</p><div class="rows">'+pots+'</div>':'')+'<p class="group-label">Hypotheek</p><div class="rows"><button type="button" class="row" role="checkbox" aria-checked="'+s.depotStopOn+'" data-act="depot"><span class="tick">'+icon('check')+'</span><span class="row-name">Depotvergoeding stopt in '+T.monthName(s.depotStop)+'<small>Vanaf dan betaal je het volle maandbedrag</small></span><span class="row-amount"></span></button></div></section>';
    $('scAssume').innerHTML='<details class="section pane sc-assume" data-place="assume"'+(open.has('assume')?' open':'')+'><summary>Aannames</summary><p class="hero-note">Alle bedragen waar het scenario mee rekent. Pas ze aan als je iets beter weet.</p>'+
      '<h3>Oplevering</h3><div class="sc-grid">'+scalar('Maand van oplevering','delivery','month')+'</div>'+
      '<h3>Salaris</h3><div class="sc-grid">'+scalar('Bruto per jaar','salary','money')+scalar('Netto van elke extra euro (%)','netShare','pct')+'<label>Maand van de verhoging<select class="field"'+attr({sc:'num',key:'raiseMonth',type:'int'})+'>'+MONTHS.map((m,i)=>'<option value="'+(i+1)+'"'+(s.raiseMonth===i+1?' selected':'')+'>'+m+'</option>').join('')+'</select></label></div>'+
      '<h3>Hypotheek</h3><div class="sc-grid">'+scalar('Bruto per maand nu','mortgageNow','money')+scalar('Bruto per maand na oplevering','mortgageFull','money')+scalar('Depotvergoeding (%)','depotRate','pct')+scalar('Depotvergoeding stopt in','depotStop','month')+'</div><p class="hero-note" data-out="depot"></p>'+
      '<h3>Renteaftrek</h3><div class="sc-grid">'+scalar('Aftrekbare rente per maand nu','interestNow','money')+scalar('Voordeel per euro aftrek (%)','taxRate','pct')+scalar('Teruggaaf per maand in je budget','taxInBudget','money')+scalar('Echte teruggaaf vanaf','taxFrom','month')+'</div>'+
      '<h3>Bouwtermijnen</h3><p class="hero-note" style="margin-bottom:8px">Termijnen die nog uit het depot gaan. Haal een termijn weg zodra hij in je maandbedrag zit.</p>'+linesHtml('draws',s.draws,[{key:'name',label:'Termijn',type:'text'},{key:'month',label:'Maand',type:'month'},{key:'amount',label:'Bedrag',type:'money'}],'Termijn toevoegen')+
      '<h3>Eenmalig</h3>'+linesHtml('oneOffs',s.oneOffs,[{key:'name',label:'Naam',type:'text'},{key:'amount',label:'Bedrag',type:'money'},{key:'income',label:'Dit komt binnen',type:'check'}],'Bedrag toevoegen')+'</details>';
  }

  // ---- Results ----
  const niceStep=raw=>{const p=Math.pow(10,Math.floor(Math.log10(Math.max(raw,1)))),f=raw/p;return (f<=1?1:f<=2?2:f<=5?5:10)*p;};
  function axis(lo,hi,want){const step=niceStep((hi-lo)/want||1);lo=Math.floor(lo/step)*step;hi=Math.ceil(hi/step)*step;if(hi===lo)hi=lo+step;const ticks=[];for(let v=lo;v<=hi+step/2;v+=step)ticks.push(v);return {lo,hi,ticks};}
  const compact=v=>(v<0?'−':'')+'€ '+new Intl.NumberFormat('nl-NL').format(Math.abs(v));
  function xLabels(months,x,H,extra){let out='';const all=extra?[...months,extra]:months;
    all.forEach((m,i)=>{const jan=m.slice(5,7)==='01';if(all.length<=30)out+='<text x="'+x(i)+'" y="'+(H-18)+'" text-anchor="middle">'+MONTHS[Number(m.slice(5,7))-1].charAt(0)+'</text>';
      if(jan||(i===0&&Number(m.slice(5,7))<10))out+='<text x="'+x(i)+'" y="'+(H-4)+'" text-anchor="'+(i===0?'start':'middle')+'" style="fill:var(--ink);font-weight:700">'+m.slice(0,4)+'</text>';});return out;}
  function monthChart(width){
    const rows=sim.rows,n=rows.length,W=Math.max(300,width),H=250,L=52,R=6,top=10,B=36,pw=W-L-R,ph=H-top-B;let hi=0,lo=0;
    rows.forEach(r=>{let up=0,down=0;SERIES.forEach(s=>{const v=r[s.key];if(v>0)up+=v;else down+=v;});hi=Math.max(hi,up);lo=Math.min(lo,down);});
    const a=axis(lo,hi,4),y=v=>top+(a.hi-v)/(a.hi-a.lo)*ph,band=pw/n,bw=Math.max(3,Math.min(24,band-3)),x=i=>L+i*band+band/2;
    let g='';for(const t of a.ticks)g+='<line x1="'+L+'" x2="'+(W-R)+'" y1="'+y(t)+'" y2="'+y(t)+'" stroke="rgba(255,255,255,'+(t===0?'.45':'.1')+')"/><text x="'+(L-8)+'" y="'+(y(t)+4)+'" text-anchor="end">'+compact(t)+'</text>';
    rows.forEach((r,i)=>{let up=0,down=0;
      SERIES.forEach(s=>{const v=r[s.key];if(Math.abs(v)<0.5)return;const from=v>0?up:down,to=from+v,y0=Math.min(y(from),y(to)),h=Math.abs(y(to)-y(from));if(v>0)up=to;else down=to;
        g+='<rect x="'+(x(i)-bw/2)+'" y="'+(y0+(h>4?1:0))+'" width="'+bw+'" height="'+Math.max(1,h-(h>4?2:0))+'" rx="'+Math.min(3,bw/2)+'" fill="'+s.color+'"/>';});
      g+='<rect x="'+(x(i)-bw/2-2)+'" y="'+(y(r.total)-1.5)+'" width="'+(bw+4)+'" height="3" rx="1.5" fill="#f4f6fc"/>';
      g+='<rect class="hit" data-chart="m" data-i="'+i+'" x="'+(L+i*band)+'" y="'+top+'" width="'+band+'" height="'+ph+'"/>';});
    return '<svg viewBox="0 0 '+W+' '+H+'" width="'+W+'" height="'+H+'" role="img" aria-label="Per maand: wat het scenario oplevert of kost ten opzichte van je budget nu">'+g+xLabels(sim.months,x,H)+'</svg>';
  }
  function lineChart(width){
    const same=Math.abs(plan.result-sim.result)<0.5&&plan.n===sim.n,count=Math.max(sim.series.length,same?0:plan.series.length),W=Math.max(300,width),H=240,L=58,R=10,top=12,B=36,pw=W-L-R,ph=H-top-B;
    const all=[...sim.series,...(same?[]:plan.series),sim.remaining],a=axis(Math.min(...all),Math.max(...all),4),y=v=>top+(a.hi-v)/(a.hi-a.lo)*ph,x=i=>L+(count>1?i/(count-1):0)*pw;
    const path=values=>values.map((v,i)=>(i?'L':'M')+x(i).toFixed(1)+' '+y(v).toFixed(1)).join('');
    let g='';for(const t of a.ticks)g+='<line x1="'+L+'" x2="'+(W-R)+'" y1="'+y(t)+'" y2="'+y(t)+'" stroke="rgba(255,255,255,.1)"/><text x="'+(L-8)+'" y="'+(y(t)+4)+'" text-anchor="end">'+compact(t)+'</text>';
    g+='<line x1="'+L+'" x2="'+(W-R)+'" y1="'+y(sim.remaining)+'" y2="'+y(sim.remaining)+'" stroke="#ffcf7a" stroke-width="2" stroke-dasharray="2 5" stroke-linecap="round"/>';
    if(!same)g+='<path d="'+path(plan.series)+'" fill="none" stroke="#b4bdd4" stroke-width="2" stroke-dasharray="6 5"/>';
    g+='<path d="'+path(sim.series)+'" fill="none" stroke="#b9a8ff" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>';
    const lastI=sim.series.length-1;g+='<circle cx="'+x(lastI)+'" cy="'+y(sim.series[lastI])+'" r="5" fill="#b9a8ff" stroke="#141b38" stroke-width="2"/>';
    g+='<line id="scCross" x1="0" x2="0" y1="'+top+'" y2="'+(top+ph)+'" stroke="rgba(255,255,255,.5)" visibility="hidden"/>';
    const band=count>1?pw/(count-1):pw;for(let i=0;i<sim.series.length;i++)g+='<rect class="hit" style="fill:transparent" data-chart="l" data-i="'+i+'" data-x="'+x(i)+'" x="'+(x(i)-band/2)+'" y="'+top+'" width="'+band+'" height="'+ph+'"/>';
    const longest=sim.series.length>=plan.series.length||same?sim:plan;
    return {same,svg:'<svg viewBox="0 0 '+W+' '+H+'" width="'+W+'" height="'+H+'" role="img" aria-label="Gespaard voor het huis per maand, vergeleken met wat je nog moet betalen">'+g+xLabels(longest.months,x,H,longest===sim?draft.delivery:Budget.doc().scenario.delivery)+'</svg>'};
  }
  function bridgeHtml(){
    const p=sim.parts,steps=[['Je huisbudget',p.base,'Zoals op je Huis-pagina, tot '+T.monthName(draft.delivery)],['Wonen',p.living],['Salaris',p.salary],['Hypotheek tijdens de bouw',p.mortgage],['Renteaftrek',p.tax,'Echt voordeel tegenover wat in je budget staat'],['Eenmalig',p.oneOffs],['Extra potten',p.pots]].filter((s,i)=>i===0||Math.abs(s[1])>=0.5);
    let run=0,lo=0,hi=0;const spans=steps.map(([name,value,note],i)=>{const from=i?run:0,to=i?run+value:value;run=to;lo=Math.min(lo,from,to);hi=Math.max(hi,from,to);return {name,value,note,from,to,kind:i===0?'start':value>=0?'plus':'min'};});
    const pad=(hi-lo)*.04||1;lo-=pad;hi+=pad;const at=v=>(v-lo)/(hi-lo)*100;
    const row=(s,total)=>'<div class="br-row'+(total?' total':'')+'"><span class="br-name">'+escapeHtml(s.name)+(s.note?'<small>'+escapeHtml(s.note)+'</small>':'')+'</span><span class="br-track"><i class="br-zero" style="left:'+at(0)+'%"></i><i class="br-bar '+s.kind+'" style="left:'+at(Math.min(s.from,s.to))+'%;width:'+Math.abs(at(s.to)-at(s.from))+'%"></i></span><span class="br-val">'+signed(s.value)+'</span></div>';
    return '<div class="br">'+spans.map(s=>row(s)).join('')+row({name:'Resultaat',value:sim.result,from:0,to:sim.result,kind:sim.result<0?'start':'plus'},true)+'</div>';
  }
  function tableHtml(){
    return '<details class="sc-table" data-place="table"'+(open.has('table')?' open':'')+'><summary>Tabel per maand</summary><div class="sc-scroll"><table><thead><tr><th scope="col">Maand</th><th scope="col">Woont</th><th scope="col">Wonen</th><th scope="col">Salaris</th><th scope="col">Hypotheek</th><th scope="col">Renteaftrek</th><th scope="col">Samen</th></tr></thead><tbody>'+sim.rows.map(r=>'<tr><td>'+short(r.month)+'</td><td>'+escapeHtml(r.place.name||'Naamloos')+'</td>'+[r.living,r.salary,r.mortgage,r.tax,r.total].map(v=>'<td>'+(Math.abs(v)<0.5?'€ 0':signed(v))+'</td>').join('')+'</tr>').join('')+'</tbody></table></div></details>';
  }
  function tipHtml(chart,i){
    if(chart==='l'){const month=i<sim.months.length?sim.months[i]:draft.delivery,v=sim.series[i];
      return '<strong>'+(i<sim.months.length?'Begin '+short(month):'Oplevering '+short(month))+'</strong><div><span>Gespaard</span><b>'+E(v)+'</b></div><div><span>Nog te betalen</span><b>'+E(sim.remaining)+'</b></div><div class="sum"><span>'+(v<sim.remaining?'Tekort':'Over')+'</span><b>'+E(v-sim.remaining)+'</b></div>';}
    const r=sim.rows[i];
    return '<strong>'+short(r.month)+' · '+escapeHtml(r.place.name||'Naamloos')+'</strong>'+SERIES.map(s=>'<div><span><i style="background:'+s.color+'"></i>'+s.name+'</span><b>'+(Math.abs(r[s.key])<0.5?'€ 0':signed(r[s.key]))+'</b></div>').join('')+'<div class="sum"><span>Samen</span><b>'+signed(r.total)+'</b></div><div><span>Hypotheek bruto</span><b>'+E(r.gross)+'</b></div><div><span>Teruggaaf</span><b>'+E(r.benefit)+'</b></div>';
  }
  function renderResults(){
    const d=Budget.doc();sim=simulate(d,draft,T.today());plan=simulate(d,d.scenario,T.today());
    const res=Math.round(sim.result),diff=Math.round(sim.result)-Math.round(plan.result),dirty=canon(draft)!==seen,word=res<0?'tekort':'over';
    $('scLabel').textContent='Bij oplevering in '+T.monthName(draft.delivery);
    $('scResult').innerHTML=E(res)+'<small>'+word+'</small>';$('scResult').className='hero-number '+(res<0?'short':'good');
    $('scNote').textContent='Met alle huisposten erin. Alles wat je hier wint, gaat in deze som naar het huis.';
    $('scPlan').textContent=!dirty?'Dit is je opgeslagen plan.':diff===0?'Aangepast, zelfde uitkomst als je plan.':E(diff)+(diff>0?' beter':' slechter')+' dan je plan.';
    $('scSave').hidden=$('scReset').hidden=!dirty;
    const effect=sim.result-sim.parts.base;
    $('scBase').textContent=E(sim.parts.base)+(sim.parts.base<0?' tekort':' over');$('scEffect').textContent=signed(effect);$('scMonths').textContent=sim.n;
    $('scStickyNum').textContent=E(res)+' '+word;$('scStickyNum').className=res<0?'short':'good';$('scStickyPlan').textContent=!dirty||diff===0?'gelijk aan je plan':E(diff)+(diff>0?' beter':' slechter')+' dan plan';
    const host=$('scResults'),width=(host.clientWidth||640)-(window.innerWidth>=720?50:34);
    if(!sim.n){host.innerHTML='';fill();return;}
    const line=lineChart(Math.min(width,880));
    host.innerHTML=
      '<section class="section pane" aria-labelledby="scMonthTitle"><div class="section-head"><h2 id="scMonthTitle">Per maand</h2></div><p class="hero-note" style="margin-bottom:10px">Wat je per maand meer of minder overhoudt dan in je budget nu. Het witte streepje is het saldo van die maand.</p><div class="sc-legend">'+SERIES.map(s=>'<span><i style="background:'+s.color+'"></i>'+s.name+'</span>').join('')+'<span><i class="dot"></i>Samen</span></div><div class="chart">'+monthChart(Math.min(width,880))+'<div class="sc-tip" hidden></div></div>'+tableHtml()+'</section>'+
      '<section class="section pane" aria-labelledby="scLineTitle"><div class="section-head"><h2 id="scLineTitle">Gespaard tot de oplevering</h2></div><div class="sc-legend"><span><i style="background:#b9a8ff"></i>Dit scenario</span>'+(line.same?'':'<span><i class="dash" style="color:#b4bdd4"></i>Je plan</span>')+'<span><i class="dash" style="color:#ffcf7a"></i>Nog te betalen: '+E(sim.remaining)+'</span></div><div class="chart">'+line.svg+'<div class="sc-tip" hidden></div></div><p class="hero-note" style="margin-top:8px">Bedragen die nog binnenkomen en eenmalige kosten tellen in de laatste maand mee.</p></section>'+
      '<section class="section pane" aria-labelledby="scBridgeTitle"><div class="section-head"><h2 id="scBridgeTitle">Van huisbudget naar resultaat</h2></div><p class="hero-note" style="margin-bottom:12px">Groen helpt, rood kost geld. De lijn is nul.</p>'+bridgeHtml()+'</section>';
    fill();
  }
  // Small derived texts next to the inputs, refreshed without redrawing the inputs themselves.
  function fill(){
    const out=new Map();
    for(const p of draft.places){const c=sim.costs.get(p.id),less=sim.homeCost-c;
      out.set('pc:'+p.id,E(c)+' per maand'+(p===draft.places[0]?'':Math.abs(less)<0.5?' · gelijk':' · '+E(less)+(less>0?' minder':' meer')));
      out.set('pt:'+p.id,E(c)+' p/m');}
    for(const r of sim.raises){const value=draft.raises[r.year]||0;out.set('rp:'+r.year,pct(value));out.set('rn:'+r.year,value?E(r.net)+' netto per maand erbij':'Geen verhoging');}
    out.set('depot','Daarmee zit er nu ongeveer '+E(Math.round(sim.depot/1000)*1000)+' in je bouwdepot.');
    view().querySelectorAll('[data-out]').forEach(el=>{if(out.has(el.dataset.out))el.textContent=out.get(el.dataset.out);});
  }
  const keyOf=el=>el.id||JSON.stringify(el.dataset);
  function redraw(){
    const active=document.activeElement,key=active&&view().contains(active)?keyOf(active):null;
    renderControls();renderResults();
    if(key&&key!=='{}')[...view().querySelectorAll('button,input,select,summary')].find(el=>keyOf(el)===key)?.focus({preventScroll:true});
  }

  // ---- Events ----
  function paint(cell){
    const month=cell.dataset.month,place=draft.places.find(p=>p.id===brush)||draft.places[0];
    if((draft.stay[month]||draft.places[0].id)===place.id)return;
    if(place===draft.places[0])delete draft.stay[month];else draft.stay[month]=place.id;
    cell.className='tl-cell '+tone(place.id);cell.setAttribute('aria-label',T.monthName(month)+': '+(place.name||'Naamloos'));renderResults();
  }
  function onInput(event){
    const el=event.target,d=el.dataset;if(!d.sc||!draft)return;
    if(d.sc==='raise'){draft.raises[d.year]=Number(el.value);renderResults();return;}
    const target=d.sc==='num'?draft:rowOf(d.list,d.id);if(!target)return;let value;
    if(d.type==='text')value=el.value.slice(0,80);
    else if(d.type==='check')value=el.checked;
    else if(d.type==='int')value=Number(el.value);
    else if(d.type==='month'){if(!/^\d{4}-(0[1-9]|1[0-2])$/.test(el.value)||Number(el.value.slice(0,4))<2020||Number(el.value.slice(0,4))>2100)return;value=el.value;}
    else{value=T.parseMoney(el.value);const bad=value===undefined||(d.type==='pct'&&value>100);el.setAttribute('aria-invalid',String(bad));if(bad)return;}
    target[d.key]=value;
    // A new month or switch changes what is on the page; an amount or a name only changes the numbers.
    if(d.type==='month'||d.type==='check'||d.type==='int')redraw();else renderResults();
  }
  function onClick(event){
    const button=event.target.closest('[data-act]');if(!button)return;const d=button.dataset,doc=Budget.doc();
    if(d.act==='start'){if(doc&&!doc.scenario){doc.scenario=emptyScenario(doc);open.add('assume');T.commit();}return;}
    if(!draft)return;
    if(d.act==='save'){doc.scenario=clone(draft);T.commit();toast('Plan bijgewerkt');return;}
    if(d.act==='reset')draft=clone(doc.scenario);
    else if(d.act==='brush')brush=d.id;
    else if(d.act==='step'){const row=rowOf(d.list,d.id);if(row)row[d.key]=Math.max(0,T.round(row[d.key]+Number(d.step)));}
    else if(d.act==='add'){const rows=listOf(d.list);if(!rows||rows.length>=20){toast('Maximaal 20 regels');return;}
      rows.push(d.list==='draws'?{id:T.newId(),name:'',amount:0,month:draft.delivery}:d.list==='oneOffs'?{id:T.newId(),name:'',amount:0,on:true,income:false}:{id:T.newId(),name:'',amount:0});}
    else if(d.act==='del'){const rows=listOf(d.list),index=rows?rows.findIndex(r=>r.id===d.id):-1;if(index>=0)rows.splice(index,1);}
    else if(d.act==='add-place'){if(draft.places.length>=6)return;const place={id:T.newId(),name:'Nieuwe woonsituatie',lines:draft.places[0].lines.map(l=>({...l,id:T.newId()}))};draft.places.push(place);open.add(place.id);brush=place.id;}
    else if(d.act==='del-place'){const index=draft.places.findIndex(p=>p.id===d.id);if(index>0){draft.places.splice(index,1);for(const month of Object.keys(draft.stay))if(draft.stay[month]===d.id)delete draft.stay[month];}}
    else if(d.act==='oneoff'){const row=rowOf('oneOffs',d.id);if(row)row.on=!row.on;}
    else if(d.act==='pot'){const index=draft.pots.indexOf(d.id);if(index<0)draft.pots.push(d.id);else draft.pots.splice(index,1);}
    else if(d.act==='depot')draft.depotStopOn=!draft.depotStopOn;
    sync();redraw();
  }
  function onTip(event){
    const hit=event.target.closest?.('.hit');if(!hit)return;const wrap=hit.closest('.chart'),tip=wrap.querySelector('.sc-tip');
    tip.innerHTML=tipHtml(hit.dataset.chart,Number(hit.dataset.i));tip.hidden=false;
    const box=wrap.getBoundingClientRect(),mark=hit.getBoundingClientRect(),center=mark.left+mark.width/2-box.left;
    tip.style.left=Math.max(0,Math.min(box.width-tip.offsetWidth,center<box.width/2?center+14:center-tip.offsetWidth-14))+'px';
    const cross=wrap.querySelector('#scCross');if(cross){cross.setAttribute('x1',hit.dataset.x);cross.setAttribute('x2',hit.dataset.x);cross.setAttribute('visibility','visible');}
  }
  function bind(){
    if(bound)return;bound=true;const root=view();
    root.addEventListener('input',onInput);
    // Names show up in several places, so the page is redrawn once the field is left.
    root.addEventListener('change',event=>{if(event.target.dataset.type==='text'&&draft)redraw();});
    root.addEventListener('click',event=>{const cell=event.target.closest('button.tl-cell');if(cell&&draft)paint(cell);else onClick(event);});
    root.addEventListener('pointerdown',event=>{const cell=event.target.closest('button.tl-cell');if(cell&&draft&&event.button===0){painting=true;paint(cell);}onTip(event);});
    root.addEventListener('pointermove',event=>{if(painting){const cell=document.elementFromPoint(event.clientX,event.clientY)?.closest?.('button.tl-cell');if(cell)paint(cell);}else onTip(event);});
    window.addEventListener('pointerup',()=>{painting=false;});window.addEventListener('pointercancel',()=>{painting=false;});
    root.addEventListener('pointerleave',event=>{if(event.target.classList?.contains('chart')){event.target.querySelector('.sc-tip').hidden=true;event.target.querySelector('#scCross')?.setAttribute('visibility','hidden');}},true);
    root.addEventListener('toggle',event=>{const key=event.target.dataset?.place;if(!key)return;if(event.target.open)open.add(key);else open.delete(key);},true);
    // The charts are drawn at the real width, so text stays readable on a phone; redraw them when that width changes.
    if('ResizeObserver' in window)new ResizeObserver(entries=>{const width=Math.round(entries[0].contentRect.width);if(!width||width===lastWidth)return;lastWidth=width;clearTimeout(resizeTimer);resizeTimer=setTimeout(()=>{if(draft&&!view().hidden)renderResults();},120);}).observe($('scResults'));
    if('IntersectionObserver' in window)new IntersectionObserver(entries=>{$('scSticky').classList.toggle('on',!entries[0].isIntersecting&&!view().hidden&&Boolean(draft));}).observe($('scHero'));
  }
  function render(){
    bind();sync();
    $('scEmpty').hidden=Boolean(draft);$('scBody').hidden=!draft;
    if(draft)redraw();
  }
  return {render,simulate,emptyScenario};
})();
`;
