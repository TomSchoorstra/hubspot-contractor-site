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
/* The cost breakdown of a place appears while the pointer or the keyboard focus is on its chip. */
.chip{position:relative}
.chip .chip-tip{display:none;position:absolute;top:calc(100% + 8px);left:0;z-index:12;width:max-content;min-width:100%;max-width:min(320px,82vw);padding:12px 14px;border-radius:14px;background:#141b38;border:1px solid var(--edge);box-shadow:0 18px 40px -18px rgba(0,0,0,.9);font-size:14px;font-weight:500;line-height:1.35;cursor:default}
.chip:focus-visible .chip-tip{display:grid;gap:6px}
@media(hover:hover){.chip:hover .chip-tip{display:grid;gap:6px}}
.row{position:relative}
.row .row-tip{display:none;position:absolute;top:calc(100% + 6px);left:12px;z-index:12;width:max-content;max-width:min(440px,calc(100% - 24px));padding:12px 14px;border-radius:14px;background:#141b38;border:1px solid var(--edge);box-shadow:0 18px 40px -18px rgba(0,0,0,.9);font-size:14px;font-weight:500;line-height:1.45;color:var(--mut);text-align:left;cursor:default}
.row:focus-visible .row-tip:not(:empty){display:block}
@media(hover:hover){.row:hover .row-tip:not(:empty){display:block}}
.row-tip b{display:block;margin-top:6px;color:var(--ink);font-weight:700;font-variant-numeric:tabular-nums}
.chip-tip span{display:flex;justify-content:space-between;align-items:baseline;gap:18px;font-size:14px;font-weight:500;color:var(--mut)}
.chip-tip b{color:var(--ink);font-weight:700;font-variant-numeric:tabular-nums;white-space:nowrap}
.chip-tip small{display:inline;font-size:12px;color:var(--dim)}
.chip-tip .sum{padding-top:6px;border-top:1px solid var(--edge-soft);color:var(--ink);font-weight:700}
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

.when{display:flex;align-items:center;gap:14px;margin-bottom:8px}.when strong{font-family:var(--display);font-size:26px;font-weight:800;min-width:9.5em;text-align:center}
.slider{padding:12px 0;border-bottom:1px solid var(--edge-soft)}.slider:last-child{border-bottom:0}
.slider-top{display:flex;align-items:baseline;justify-content:space-between;gap:12px}
.slider-top label{font-size:16px;font-weight:600;color:var(--ink)}
.slider-top output{font-family:var(--display);font-size:24px;font-weight:800;font-variant-numeric:tabular-nums}
.slider input[type=range]{width:100%;min-height:44px;accent-color:var(--iris);cursor:pointer}

.sc-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:10px;margin-bottom:6px}
.sc-grid label{display:grid;gap:4px;min-width:0}
.sc-assume summary{cursor:pointer;min-height:44px;display:flex;align-items:center;font-size:22px;font-weight:700;font-family:var(--display);letter-spacing:-.3px}
.sc-assume h3{font-size:16px;font-weight:700;margin:18px 0 8px}

@media(max-width:640px){
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
<div id="scAssume"></div>
</div>
</section>`;

export const SCENARIO_SCRIPT = String.raw`
const Scenario = (() => {
  const T=Budget.tools;
  const MONTHS=['jan','feb','mrt','apr','mei','jun','jul','aug','sep','okt','nov','dec'];
  let draft=null,seen=null,brush=null,painting=false,sim=null,plan=null,bound=false;
  const open=new Set(),view=()=>$('view-scenario');
  const clone=v=>JSON.parse(JSON.stringify(v));
  const canon=v=>Array.isArray(v)?'['+v.map(canon).join(',')+']':v&&typeof v==='object'?'{'+Object.keys(v).sort().map(k=>JSON.stringify(k)+':'+canon(v[k])).join(',')+'}':JSON.stringify(v);
  const E=n=>T.euro(Math.abs(Math.round(n)));
  const signed=n=>(Math.round(n)<0?'− ':'+ ')+E(n);
  const pct=n=>String(n).replace('.',',')+'%';
  const ym=(y,m)=>y+'-'+String(m).padStart(2,'0');
  function monthsFrom(start,end){const out=[];let y=Number(start.slice(0,4)),m=Number(start.slice(5,7));
    while(ym(y,m)<end&&out.length<120){out.push(ym(y,m));m++;if(m>12){m=1;y++;}}return out;}

  // The whole calculation. One row per month from this month up to the month before delivery.
  // Everything is measured against the monthly budget as it is today: what changes is extra or less money for the house.
  function simulate(d,sc,date){
    const start=date.slice(0,7),months=monthsFrom(start,sc.delivery),n=months.length,sum=T.sum;
    // A line that rises goes up once a year. The budget is built on today's amounts, so a rise is a cost in every month it is still paid.
    const riseMonth=sc.riseMonth||7,cost=(p,rises=0)=>sum(p.lines,l=>l.amount*Math.pow(1+(l.rise||0)/100,rises)),home=sc.places[0],homeCost=cost(home),byId=new Map(sc.places.map(p=>[p.id,p]));
    // While the building depot is full the bank pays interest on it, so the monthly payment is lower. Every amount
    // that leaves the depot raises the payment by one month of depot interest, until the full payment is reached.
    const rate=sc.depotRate/1200,gap=Math.max(0,sc.mortgageFull-sc.mortgageNow),depot=rate>0?gap/rate:0;
    const remaining=sum(d.house.items,i=>Math.max(0,i.amount-(i.paid||0))),extras=sum(d.house.extras,e=>e.received?0:Math.max(0,e.amount-(e.got||0)));
    const extraPots=d.house.pots.filter(p=>!p.counts&&sc.pots.includes(p.id));
    const potsAt=k=>{const f=T.projectPots(d.house.pots,k);return {own:sum(d.house.pots.filter(p=>p.counts),p=>f.get(p.id).total),extra:sum(extraPots,p=>f.get(p.id).total)};};
    const oneOffs=sum(sc.oneOffs,o=>o.on?(o.income?o.amount:-o.amount):0);
    // The instalments were planned for one delivery month. When delivery moves, they stretch along with the build.
    const span=(a,b)=>(Number(b.slice(0,4))-Number(a.slice(0,4)))*12+Number(b.slice(5,7))-Number(a.slice(5,7));
    const add=(m,k)=>{const t=Number(m.slice(0,4))*12+Number(m.slice(5,7))-1+k;return ym(Math.floor(t/12),t%12+1);};
    const stretch=sc.buildStart&&sc.drawsBase&&span(sc.buildStart,sc.drawsBase)>0?span(sc.buildStart,sc.delivery)/span(sc.buildStart,sc.drawsBase):1;
    const draws=sc.draws.map(x=>({...x,when:stretch===1||x.month<=sc.buildStart?x.month:add(sc.buildStart,Math.round(span(sc.buildStart,x.month)*stretch))}));
    const parts={living:0,salary:0,mortgage:0,tax:0},rows=[],raises=[],series=[];
    let gross=sc.salary,drawn=0,reloan=0,cum=0,rises=0;
    months.forEach((m,k)=>{
      const p=potsAt(k);series.push(p.own+p.extra+cum);
      if(Number(m.slice(5,7))===sc.raiseMonth&&m>start){const before=gross,share=sc.raises[m.slice(0,4)]||0;gross*=1+share/100;raises.push({year:m.slice(0,4),month:m,pct:share,net:(gross-before)*sc.netShare/1200});}
      const closed=sc.depotEndOn&&m>=sc.depotEnd;
      for(const draw of draws)if(draw.when===m){if(closed)reloan+=draw.amount;else drawn+=draw.amount;}
      if(Number(m.slice(5,7))===riseMonth&&m>start)rises++;
      const place=byId.get(sc.stay[m])||home,living=homeCost-cost(place,rises),salary=(gross-sc.salary)*sc.netShare/1200;
      // Once the depot has closed, what was left in it has paid off the loan: the payment stays where it was, plus interest on what is borrowed anew.
      const used=Math.min(gap,drawn*rate)+(closed?reloan*(sc.reloanRate||0)/1200:0),extra=!closed&&sc.depotStopOn&&m>=sc.depotStop?gap:used;
      // The tax refund in the budget is a fixed amount. From the month the provisional assessment is right, the real refund follows the interest.
      // Only interest on money that has gone into the build is deductible. When the bank stops paying depot interest,
      // the payment goes up but the deduction does not: after two years the unused part of the loan is no longer deductible.
      const benefit=sc.taxRate/100*(sc.interestNow+used),tax=m>=sc.taxFrom?benefit-sc.taxInBudget:0,total=living+salary-extra+tax;
      parts.living+=living;parts.salary+=salary;parts.mortgage-=extra;parts.tax+=tax;cum+=total;
      rows.push({month:m,place,living,salary,mortgage:-extra,tax,total,gross:sc.mortgageNow+extra,benefit:m>=sc.taxFrom?benefit:sc.taxInBudget});
    });
    const end=potsAt(n),base=end.own+extras-remaining;
    const result=base+end.extra+parts.living+parts.salary+parts.mortgage+parts.tax+oneOffs;
    series.push(end.own+end.extra+cum+extras+oneOffs);
    const costs=new Map(sc.places.map(p=>[p.id,cost(p)]));
    // Everything that falls after the depot has closed has to be borrowed anew, the last instalment at delivery included.
    const reloanAll=sc.depotEndOn?sum(draws.filter(x=>x.when>=sc.depotEnd&&x.when>=start&&x.when<=sc.delivery),x=>x.amount):0;
    return {start,months,n,rows,raises,draws,reloan:reloanAll,parts:{base,...parts,oneOffs,pots:end.extra},result,remaining,series,depot,homeCost,costs};
  }

  function emptyScenario(d){const year=Number(T.today().slice(0,4));
    return {delivery:d.house.target,places:[{id:'nu',name:'Zoals nu',lines:[]}],stay:{},riseMonth:7,salary:0,netShare:50,raiseMonth:4,raises:{},mortgageNow:0,mortgageFull:0,depotRate:0,depotStop:d.house.target,depotStopOn:false,depotEnd:d.house.target,depotEndOn:false,reloanRate:0,draws:[],buildStart:'',drawsBase:'',interestNow:0,taxRate:0,taxInBudget:0,taxFrom:ym(year+1,1),oneOffs:[],pots:[]};}
  // Unsaved changes stay in this browser, so a refresh does not throw them away.
  const KEEP='budget:scenario-draft'+(typeof location!=='undefined'&&location.search.includes('voorbeeld')?':demo':'');
  function kept(stamp){try{const saved=JSON.parse(localStorage.getItem(KEEP)||'null');
    if(saved&&saved.plan===stamp&&saved.draft&&Array.isArray(saved.draft.places)&&saved.draft.places.length)return saved.draft;localStorage.removeItem(KEEP);}catch(error){}
    return null;}
  function keep(dirty){try{if(dirty)localStorage.setItem(KEEP,JSON.stringify({plan:seen,draft}));else localStorage.removeItem(KEEP);}catch(error){}}
  function sync(){const d=Budget.doc(),stamp=d&&d.scenario?canon(d.scenario):'';
    if(stamp!==seen){seen=stamp;draft=stamp?kept(stamp)||clone(d.scenario):null;}
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
    if(type==='long')return '<label class="wide">'+label+'<input class="field" type="text" maxlength="200" autocomplete="off"'+attr({...data,type})+' value="'+escapeHtml(value??'')+'"></label>';
    if(type==='text')return '<label>'+label+'<input class="field" type="text" maxlength="80" autocomplete="off"'+attr({...data,type})+' value="'+escapeHtml(value)+'"></label>';
    const input='<input class="field" type="text" inputmode="decimal" autocomplete="off"'+attr({...data,type:type==='step'?'money':type})+' value="'+escapeHtml(T.moneyText(value??0))+'">';
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
    const chips=s.places.map(p=>'<button type="button" class="chip" role="radio" aria-checked="'+(p.id===brush)+'"'+attr({act:'brush',id:p.id})+'><i class="'+tone(p.id)+'"></i><span>'+escapeHtml(p.name||'Naamloos')+'<small data-out="pc:'+p.id+'"></small></span><span class="chip-tip" data-tip="'+p.id+'"></span></button>').join('');
    const places=s.places.map((p,index)=>'<details class="place" data-place="'+p.id+'"'+(open.has(p.id)?' open':'')+'><summary><i class="'+tone(p.id)+'"></i><span>'+escapeHtml(p.name||'Naamloos')+(index?'':' · je situatie nu')+'</span><b data-out="pt:'+p.id+'"></b></summary><div class="place-body">'+fieldHtml('Naam',{sc:'cell',list:'places',id:p.id,key:'name'},p.name,'text')+linesHtml('place:'+p.id,p.lines,[{key:'name',label:'Kostenpost',type:'text'},{key:'amount',label:'Per maand',type:'step'},{key:'rise',label:'Stijgt per jaar (%)',type:'pct'}],'Kostenpost toevoegen')+(index?'<button type="button" class="text-button"'+attr({act:'del-place',id:p.id})+'>Deze woonsituatie verwijderen</button>':'')+'</div></details>').join('');
    const raiseYears=simulate(d,s,T.today()).raises;
    const sliders=raiseYears.length?raiseYears.map(r=>'<div class="slider"><div class="slider-top"><label for="raise-'+r.year+'">Verhoging '+T.monthName(r.month)+'</label><output for="raise-'+r.year+'" data-out="rp:'+r.year+'"></output></div><input type="range" id="raise-'+r.year+'" min="0" max="10" step="0.5" value="'+r.pct+'"'+attr({sc:'raise',year:r.year})+'><p class="hero-note" data-out="rn:'+r.year+'"></p></div>').join(''):'<p class="empty">Er valt geen verhoging meer voor de oplevering.</p>';
    const offs=s.oneOffs.map(o=>'<button type="button" class="row" role="checkbox" aria-checked="'+o.on+'"'+attr({act:'oneoff',id:o.id})+'><span class="tick">'+icon('check')+'</span><span class="row-name">'+escapeHtml(o.name||'Naamloos')+'<small>'+(o.income?'Komt binnen':'Kost geld')+'</small></span><span class="row-amount">'+(o.income?'+ ':'− ')+T.euro(o.amount)+'</span><span class="row-tip" data-why="off:'+o.id+'"></span></button>').join('');
    const flow=T.projectPots(d.house.pots,monthsFrom(T.today().slice(0,7),s.delivery).length);
    const pots=d.house.pots.filter(p=>!p.counts).map(p=>'<button type="button" class="row" role="checkbox" aria-checked="'+s.pots.includes(p.id)+'"'+attr({act:'pot',id:p.id})+'><span class="tick">'+icon('check')+'</span><span class="row-name">'+escapeHtml(p.name||'Naamloos')+' inzetten<small>Telt op je Huis-pagina niet mee</small></span><span class="row-amount">+ '+E(flow.get(p.id).total)+'</span><span class="row-tip" data-why="pot:'+p.id+'"></span></button>').join('');
    const sw=(act,on,title,note)=>'<button type="button" class="row" role="checkbox" aria-checked="'+on+'" data-act="'+act+'"><span class="tick">'+icon('check')+'</span><span class="row-name">'+title+'<small>'+note+'</small></span><span class="row-amount"></span><span class="row-tip" data-why="'+act+'"></span></button>';
    $('scControls').innerHTML=
      '<section class="section pane" aria-labelledby="scWhenTitle"><div class="section-head"><h2 id="scWhenTitle">Oplevering</h2></div><div class="when"><button type="button" class="icon-button" data-act="delivery" data-step="-1" aria-label="Een maand eerder">−</button><strong id="scWhen">'+T.monthName(s.delivery)+'</strong><button type="button" class="icon-button" data-act="delivery" data-step="1" aria-label="Een maand later">+</button></div><p class="hero-note" data-out="when"></p></section>'+
      '<section class="section pane" aria-labelledby="scLiveTitle"><div class="section-head"><h2 id="scLiveTitle">Waar je woont</h2><span class="section-total" data-out="fx:living"></span></div><p class="hero-note">Kies een woonsituatie en tik op de maanden, of sleep opzij over een rij.</p><div class="chips" role="radiogroup" aria-label="Woonsituatie om in te vullen">'+chips+'</div>'+timelineHtml()+'<p class="tl-note" data-out="tl"></p><div class="places">'+places+'</div>'+(s.places.length<6?'<button type="button" class="ghost edit-add" data-act="add-place">'+icon('plus')+'Woonsituatie toevoegen</button>':'')+'</section>'+
      '<section class="section pane" aria-labelledby="scPayTitle"><div class="section-head"><h2 id="scPayTitle">Salaris</h2><span class="section-total" data-out="fx:salary"></span></div>'+(s.salary?'':'<p class="hero-note">Vul je bruto jaarsalaris in bij Aannames, dan rekenen de verhogingen mee.</p>')+sliders+'</section>'+
      '<section class="section pane" aria-labelledby="scSwitchTitle"><div class="section-head"><h2 id="scSwitchTitle">Aan of uit</h2><span class="section-total" data-out="fx:switch"></span></div>'+(offs?'<p class="group-label">Eenmalig</p><div class="rows">'+offs+'</div>':'')+(pots?'<p class="group-label">Potten</p><div class="rows">'+pots+'</div>':'')+'<p class="group-label">Hypotheek</p><div class="rows">'+sw('depot',s.depotStopOn,'Depotvergoeding stopt in '+T.monthName(s.depotStop),'Vanaf dan betaal je het volle maandbedrag')+sw('depot-end',s.depotEndOn,'Bouwdepot eindigt in '+T.monthName(s.depotEnd),'Latere termijnen leen je bij tegen '+pct(s.reloanRate||0))+'</div></section>';
    $('scAssume').innerHTML='<details class="section pane sc-assume" data-place="assume"'+(open.has('assume')?' open':'')+'><summary>Aannames</summary><p class="hero-note">Alle bedragen waar het scenario mee rekent. Pas ze aan als je iets beter weet.</p>'+
      '<h3>Oplevering</h3><div class="sc-grid">'+scalar('Maand van oplevering','delivery','month')+'</div>'+
      '<h3>Wonen</h3><div class="sc-grid"><label>Maand waarin stijgende kosten omhoog gaan<select class="field"'+attr({sc:'num',key:'riseMonth',type:'int'})+'>'+MONTHS.map((m,i)=>'<option value="'+(i+1)+'"'+((s.riseMonth||7)===i+1?' selected':'')+'>'+m+'</option>').join('')+'</select></label></div>'+
      '<h3>Salaris</h3><div class="sc-grid">'+scalar('Bruto per jaar','salary','money')+scalar('Netto van elke extra euro (%)','netShare','pct')+'<label>Maand van de verhoging<select class="field"'+attr({sc:'num',key:'raiseMonth',type:'int'})+'>'+MONTHS.map((m,i)=>'<option value="'+(i+1)+'"'+(s.raiseMonth===i+1?' selected':'')+'>'+m+'</option>').join('')+'</select></label></div>'+
      '<h3>Hypotheek</h3><div class="sc-grid">'+scalar('Bruto per maand nu','mortgageNow','money')+scalar('Bruto per maand na oplevering','mortgageFull','money')+scalar('Depotvergoeding (%)','depotRate','pct')+scalar('Depotvergoeding stopt in','depotStop','month')+scalar('Bouwdepot eindigt in','depotEnd','month')+scalar('Rente op bijlenen (%)','reloanRate','pct')+'</div><p class="hero-note" data-out="depot"></p>'+
      '<h3>Renteaftrek</h3><div class="sc-grid">'+scalar('Aftrekbare rente per maand nu','interestNow','money')+scalar('Voordeel per euro aftrek (%)','taxRate','pct')+scalar('Teruggaaf per maand in je budget','taxInBudget','money')+scalar('Echte teruggaaf vanaf','taxFrom','month')+'</div>'+
      '<h3>Bouwtermijnen</h3><p class="hero-note" style="margin-bottom:8px">Termijnen die nog uit het depot gaan. Haal een termijn weg zodra hij in je maandbedrag zit.</p><p class="hero-note" data-out="draws" style="margin-bottom:8px"></p>'+linesHtml('draws',s.draws,[{key:'name',label:'Termijn',type:'text'},{key:'month',label:'Maand',type:'month'},{key:'amount',label:'Bedrag',type:'money'}],'Termijn toevoegen')+
      '<h3>Eenmalig</h3>'+linesHtml('oneOffs',s.oneOffs,[{key:'name',label:'Naam',type:'text'},{key:'amount',label:'Bedrag',type:'money'},{key:'note',label:'Uitleg bij hoveren',type:'long'},{key:'income',label:'Dit komt binnen',type:'check'}],'Bedrag toevoegen')+'</details>';
  }

  // ---- Result ----
  function renderResults(){
    const d=Budget.doc();sim=simulate(d,draft,T.today());plan=simulate(d,d.scenario,T.today());
    const res=Math.round(sim.result),diff=Math.round(sim.result)-Math.round(plan.result),dirty=canon(draft)!==seen,word=res<0?'tekort':'over';keep(dirty);
    $('scLabel').textContent='Bij oplevering in '+T.monthName(draft.delivery);
    $('scResult').innerHTML=E(res)+'<small>'+word+'</small>';$('scResult').className='hero-number '+(res<0?'short':'good');
    $('scNote').textContent='Met alle huisposten erin. Alles wat je hier wint, gaat in deze som naar het huis.';
    $('scPlan').textContent=!dirty?'Dit is je opgeslagen plan.':diff===0?'Aangepast, zelfde uitkomst als je plan.':E(diff)+(diff>0?' beter':' slechter')+' dan je plan.';if(dirty)$('scPlan').textContent+=' Nog niet opgeslagen.';
    $('scSave').hidden=$('scReset').hidden=!dirty;
    const effect=sim.result-sim.parts.base;
    $('scBase').textContent=E(sim.parts.base)+(sim.parts.base<0?' tekort':' over');$('scEffect').textContent=signed(effect);$('scMonths').textContent=sim.n;
    $('scStickyNum').textContent=E(res)+' '+word;$('scStickyNum').className=res<0?'short':'good';$('scStickyPlan').textContent=!dirty||diff===0?'gelijk aan je plan':E(diff)+(diff>0?' beter':' slechter')+' dan plan';
    fill();
  }
  // Small derived texts next to the inputs, refreshed without redrawing the inputs themselves.
  function fill(){
    const out=new Map();
    for(const p of draft.places){const c=sim.costs.get(p.id),less=sim.homeCost-c;
      out.set('pc:'+p.id,E(c)+' per maand'+(p===draft.places[0]?'':Math.abs(less)<0.5?' · gelijk':' · '+E(less)+(less>0?' minder':' meer')));
      out.set('pt:'+p.id,E(c)+' p/m');}
    for(const r of sim.raises){const value=draft.raises[r.year]||0;out.set('rp:'+r.year,pct(value));out.set('rn:'+r.year,value?E(r.net)+' netto per maand erbij':'Geen verhoging');}
    // What each block adds to or takes from the result, shown in its heading.
    const fx=n=>Math.abs(n)<0.5?'€ 0':signed(n),depotFx=draft.depotStopOn||draft.depotEndOn?sim.result-simulate(Budget.doc(),{...draft,depotStopOn:false,depotEndOn:false},T.today()).result:0;
    out.set('fx:living',fx(sim.parts.living));out.set('fx:salary',fx(sim.parts.salary));out.set('fx:switch',fx(sim.parts.oneOffs+sim.parts.pots+depotFx));
    out.set('tl',draft.places.map(p=>({p,n:sim.rows.filter(r=>r.place===p).length})).filter(x=>x.n).map(x=>(x.p.name||'Naamloos')+' '+x.n+(x.n===1?' maand':' maanden')).join(' · '));
    const moved=sim.draws.filter(x=>x.when!==x.month&&x.when>=sim.start);
    out.set('when',(plan.n===sim.n?'Zoals in je plan.':Math.abs(sim.n-plan.n)+(Math.abs(sim.n-plan.n)===1?' maand ':' maanden ')+(sim.n>plan.n?'later':'eerder')+' dan je plan.')+(moved.length?' De bouwtermijnen schuiven mee.':'')+(sim.reloan>0?' Na het einde van het bouwdepot leen je '+E(sim.reloan)+' bij.':''));
    out.set('draws',moved.length?'Bij oplevering in '+T.monthName(draft.delivery)+' vallen ze zo: '+sim.draws.filter(x=>x.when>=sim.start).map(x=>(x.name||'Termijn')+' '+MONTHS[Number(x.when.slice(5,7))-1]+' '+x.when.slice(0,4)).join(', ')+'.':'');
    out.set('depot','Daarmee zit er nu ongeveer '+E(Math.round(sim.depot/1000)*1000)+' in je bouwdepot.');
    // Why each switch exists and what it does to the result, shown while the pointer is on it.
    const flip=change=>{const copy=clone(draft);change(copy);return simulate(Budget.doc(),copy,T.today()).result-sim.result;};
    const cost=(on,delta)=>'<b>'+(Math.abs(delta)<0.5?'Maakt nu geen verschil':on?'Staat aan: '+signed(-delta)+' op het eindbedrag':'Aanzetten: '+signed(delta)+' op het eindbedrag')+'</b>';
    const why=new Map();
    why.set('depot','De bank betaalt maar een beperkte tijd rente over het geld in je bouwdepot. Daarna betaal je het volle maandbedrag, ook over geld dat je nog niet hebt gebruikt. Die extra rente krijg je niet terug via de belasting.'+cost(draft.depotStopOn,flip(c=>{c.depotStopOn=!c.depotStopOn;})));
    why.set('depot-end','Je bouwdepot heeft een einddatum. Wat er dan nog in zit, lost af op je lening. Termijnen die daarna komen moet je opnieuw lenen, tegen de rente die bij Aannames staat. Dit speelt alleen als de oplevering na die datum valt.'+(sim.reloan>0?'<b>Opnieuw te lenen: '+E(sim.reloan)+'</b>':'')+cost(draft.depotEndOn,flip(c=>{c.depotEndOn=!c.depotEndOn;})));
    for(const o of draft.oneOffs)why.set('off:'+o.id,escapeHtml(o.note||(o.income?'Een bedrag dat je eenmalig binnenkrijgt voor de oplevering.':'Een bedrag dat je eenmalig kwijt bent voor de oplevering.'))+'<b>'+(o.on?'Telt mee in het eindbedrag':'Telt nu niet mee')+'</b>');
    for(const p of Budget.doc().house.pots)if(!p.counts)why.set('pot:'+p.id,'Deze pot telt op je Huis-pagina niet mee voor het huis. Zet hem aan om te zien wat er gebeurt als je hem bij de oplevering toch gebruikt.<b>'+(draft.pots.includes(p.id)?'Telt mee in het eindbedrag':'Telt nu niet mee')+'</b>');
    view().querySelectorAll('[data-why]').forEach(el=>{el.innerHTML=why.get(el.dataset.why)||'';});
    view().querySelectorAll('[data-tip]').forEach(el=>{const p=draft.places.find(x=>x.id===el.dataset.tip);if(!p)return;
      el.innerHTML=(p.lines.length?p.lines.map(l=>'<span><span>'+escapeHtml(l.name||'Naamloos')+(l.rise?' <small>+'+pct(l.rise)+' per jaar</small>':'')+'</span><b>'+T.euro(l.amount)+'</b></span>').join(''):'<span>Nog geen kostenposten</span>')+'<span class="sum"><span>Per maand</span><b>'+T.euro(sim.costs.get(p.id))+'</b></span>';});
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
    else if(d.type==='long')value=el.value.slice(0,200);
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
      rows.push(d.list==='draws'?{id:T.newId(),name:'',amount:0,month:draft.delivery}:d.list==='oneOffs'?{id:T.newId(),name:'',amount:0,on:true,income:false,note:''}:{id:T.newId(),name:'',amount:0,rise:0});}
    else if(d.act==='del'){const rows=listOf(d.list),index=rows?rows.findIndex(r=>r.id===d.id):-1;if(index>=0)rows.splice(index,1);}
    else if(d.act==='add-place'){if(draft.places.length>=6)return;const place={id:T.newId(),name:'Nieuwe woonsituatie',lines:draft.places[0].lines.map(l=>({...l,id:T.newId()}))};draft.places.push(place);open.add(place.id);brush=place.id;}
    else if(d.act==='del-place'){const index=draft.places.findIndex(p=>p.id===d.id);if(index>0){draft.places.splice(index,1);for(const month of Object.keys(draft.stay))if(draft.stay[month]===d.id)delete draft.stay[month];}}
    else if(d.act==='oneoff'){const row=rowOf('oneOffs',d.id);if(row)row.on=!row.on;}
    else if(d.act==='pot'){const index=draft.pots.indexOf(d.id);if(index<0)draft.pots.push(d.id);else draft.pots.splice(index,1);}
    else if(d.act==='depot')draft.depotStopOn=!draft.depotStopOn;
    else if(d.act==='depot-end')draft.depotEndOn=!draft.depotEndOn;
    else if(d.act==='delivery'){const months=monthsFrom(T.today().slice(0,7),draft.delivery),t=Number(draft.delivery.slice(0,4))*12+Number(draft.delivery.slice(5,7))-1+Number(d.step),next=ym(Math.floor(t/12),t%12+1);
      if(next<=T.today().slice(0,7)||next>'2100-12')return;
      // A month that is added continues where you lived in the last month.
      const last=months.at(-1);if(Number(d.step)>0&&last&&draft.stay[last])draft.stay[draft.delivery]=draft.stay[last];
      if(Number(d.step)<0)delete draft.stay[next];draft.delivery=next;}
    sync();redraw();
  }
  function bind(){
    if(bound)return;bound=true;const root=view();
    root.addEventListener('input',onInput);
    // Names show up in several places, so the page is redrawn once the field is left.
    root.addEventListener('change',event=>{if(event.target.dataset.type==='text'&&draft)redraw();});
    root.addEventListener('click',event=>{const cell=event.target.closest('button.tl-cell');if(cell&&draft)paint(cell);else onClick(event);});
    root.addEventListener('pointerdown',event=>{const cell=event.target.closest('button.tl-cell');if(cell&&draft&&event.button===0){painting=true;paint(cell);}});
    root.addEventListener('pointermove',event=>{if(painting){const cell=document.elementFromPoint(event.clientX,event.clientY)?.closest?.('button.tl-cell');if(cell)paint(cell);}});
    window.addEventListener('pointerup',()=>{painting=false;});window.addEventListener('pointercancel',()=>{painting=false;});
    root.addEventListener('toggle',event=>{const key=event.target.dataset?.place;if(!key)return;if(event.target.open)open.add(key);else open.delete(key);},true);
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
