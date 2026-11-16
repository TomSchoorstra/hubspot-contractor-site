// The monthly budget once the house is delivered: the same overview as the month view, plus who pays which part.
// A small side view of the house tracker. It changes nothing on the tracker, in the scenario or in this month's budget.
// Like the rest of the page this is HTML in strings. Inside the String.raw blocks: no backticks and no template placeholders.
// No amounts live here: every number comes from the stored budget document.

export const LIVING_CSS = String.raw`
.lv-layout{display:grid;gap:16px;align-items:start}
#view-wonen .page-heading{align-items:center;flex-wrap:wrap;gap:8px 12px}
#view-wonen .page-heading h1{font-size:clamp(30px,8vw,40px)}
#view-wonen .page-heading>.ghost{min-height:40px;padding:6px 12px;font-size:13px;white-space:nowrap}
.lv-layout .section{margin-bottom:0;min-width:0}
.lv-side{display:grid;gap:12px;min-width:0}
#view-wonen .section-head{flex-wrap:wrap;gap:4px 12px}
.lv-fold{border-top:1px solid var(--edge-soft)}
.lv-fold>summary{display:grid;grid-template-columns:minmax(0,1fr) auto 16px;align-items:center;gap:10px;min-height:74px;padding:14px 0;cursor:pointer;list-style:none}
.lv-fold>summary::-webkit-details-marker{display:none}
.lv-fold>summary:hover .lv-fold-title{color:var(--tide)}
.lv-fold-title{display:block;font-family:var(--display);font-size:18px;font-weight:700;overflow-wrap:anywhere}
.lv-fold small{display:block;font-family:var(--body);font-size:13px;font-weight:500;color:var(--mut);overflow-wrap:anywhere}
.lv-fold-total{font-family:var(--display);font-size:19px;font-weight:800;font-variant-numeric:tabular-nums;white-space:nowrap;text-align:right}
.lv-chevron{width:9px;height:9px;border-right:2px solid var(--mut);border-bottom:2px solid var(--mut);transform:rotate(45deg);transition:transform .15s}
.lv-fold[open]>summary .lv-chevron{transform:rotate(225deg)}
.lv-fold-body{padding:0 0 16px}
.lv-fold-body>.hero-note{margin-bottom:12px}
.lv-fold-body .sc-grid{margin-top:12px}
.lv-fold-body .sc-grid>label{display:grid;gap:4px;min-width:0}
.lv-fold-body .section-foot{gap:6px 12px}
.lv-settings{padding:0;border-top:1px solid var(--edge-soft)}
.lv-settings>summary{padding:16px}
.lv-settings>.lv-fold-body{padding:0 16px 16px}
.lv-settings .lv-fold-title{font-size:17px}
.lv-settings .lv-fold-total{font-size:17px}
.lv-income-lines{margin-bottom:10px}
.lv-income-lines>div{display:flex;justify-content:space-between;gap:12px;padding:8px 0;color:var(--mut);font-size:14px}
.lv-income-lines b{color:var(--ink);white-space:nowrap;font-variant-numeric:tabular-nums}
.lv-income-lines span{min-width:0;overflow-wrap:anywhere}
.lv-breakdown{overflow-x:auto}
.lv-split{width:100%;border-collapse:collapse;font-size:13px;font-variant-numeric:tabular-nums}
.lv-split th,.lv-split td{padding:9px 6px;text-align:right;vertical-align:top;white-space:nowrap}
.lv-split th:first-child{padding-left:0;text-align:left;white-space:normal;overflow-wrap:anywhere;min-width:90px}
.lv-split thead th{color:var(--mut);font-weight:600;white-space:normal;max-width:110px;overflow-wrap:anywhere}
.lv-split tbody th{font-weight:500}
.lv-split td{font-weight:700}
.lv-split .dim{color:var(--mut)}
.lv-split .t>*{padding-top:12px;border-top:1px solid var(--edge-soft);font-weight:800}
.lv-split small{font-size:12px}
.lv-sticky{position:fixed;top:calc(10px + env(safe-area-inset-top));left:50%;transform:translateX(-50%);z-index:25;display:flex;align-items:center;justify-content:space-between;gap:16px;width:min(380px,calc(100% - 24px));padding:10px 18px;border-radius:999px;text-align:left}
.lv-sticky span{font-size:13px;color:var(--mut)}
.lv-sticky b{font-family:var(--display);font-size:21px;font-weight:800;white-space:nowrap}
.lv-sticky .short{color:var(--amber)}.lv-sticky .good{color:var(--tide)}
#view-wonen .lv-overview-stats>div:last-child{grid-column:1/-1;display:flex;justify-content:space-between;align-items:baseline;gap:12px}
#view-wonen .lv-overview-stats strong{font-size:22px}
@media(min-width:840px){.lv-layout{grid-template-columns:minmax(0,1.2fr) minmax(0,1fr);gap:18px}#view-wonen .lv-overview-stats>div:last-child{grid-column:auto;display:block}}
/* Keep the cost toggle and its compact payment options in one card, as sibling buttons. */
.lv-line{border-radius:var(--r-sm)}
.lv-line.is-on{background:rgba(116,236,208,.12)}
.lv-line.is-on .row[aria-checked=true]{background:transparent}
.lv-line .row{min-height:56px;padding:8px 12px;gap:10px}
.seg{display:flex;flex-wrap:wrap;justify-content:flex-end;gap:4px;padding:0 12px 8px}
.seg button{min-height:28px;padding:3px 9px;border-radius:999px;border:1px solid var(--edge-soft);background:rgba(255,255,255,.04);font-size:12px;font-weight:700;line-height:1.25;color:var(--mut);transition:background .2s,border-color .2s}
.seg button[aria-checked=true]{border-color:var(--ink);background:rgba(255,255,255,.14);color:var(--ink)}
/* What is left over, added up month by month: one bar per month, the amount on hover or focus. */
.lv-chart{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));margin-top:14px}
.lv-bar{position:relative;display:flex;flex-direction:column;justify-content:flex-end;align-items:center;height:216px;outline:0}
.lv-bar i{display:block;width:62%;max-width:26px;border-radius:4px 4px 0 0;background:var(--tide);transition:filter .15s}
.lv-bar.neg i{background:var(--amber)}
.lv-bar:hover i,.lv-bar:focus i{filter:brightness(1.25)}
.lv-bar:focus-visible i{outline:2px solid var(--ink);outline-offset:2px}
.lv-bar small{width:100%;height:36px;padding-top:6px;border-top:1px solid var(--edge);font-size:12px;font-weight:700;line-height:1.25;color:var(--mut);text-align:center;text-transform:uppercase}
.lv-bar small em{display:block;font-style:normal;font-weight:500;text-transform:none;color:var(--dim)}
.lv-val{position:absolute;font-family:var(--display);font-size:15px;font-weight:800;font-variant-numeric:tabular-nums;white-space:nowrap}
.lv-val.first{left:0}.lv-val.last{right:0}
.lv-tip{display:none;position:absolute;top:0;z-index:12;width:max-content;padding:10px 12px;border-radius:14px;background:#141b38;border:1px solid var(--edge);box-shadow:0 18px 40px -18px rgba(0,0,0,.9);font-size:13px;font-weight:500;line-height:1.4;color:var(--mut);text-align:left;pointer-events:none}
.lv-tip.l{left:0}.lv-tip.r{right:0}.lv-tip.c{left:50%;transform:translateX(-50%)}
.lv-tip b{display:block;font-family:var(--display);font-size:17px;font-weight:800;color:var(--ink);font-variant-numeric:tabular-nums}
.lv-bar:focus .lv-tip{display:block}
@media(hover:hover){.lv-bar:hover .lv-tip{display:block}}
`;

export const LIVING_VIEW = String.raw`<section class="view" id="view-wonen" hidden aria-labelledby="lvTitle">
<header class="page-heading"><div><div class="micro">Maandbudget · na de bouw</div><h1 id="lvTitle">Na de bouw</h1></div><a class="ghost" href="#huis">Terug naar Huis</a></header>
<div class="section pane" id="lvEmpty" hidden><h2 style="font-size:22px;font-weight:700">Nog niets ingevuld</h2><p class="hero-note" style="margin:8px 0 16px">Maak je maandbudget voor als je in je huis woont: wat er binnenkomt, wat het kost en wie welk deel betaalt. Deze maand en je Huis-pagina veranderen hier niet door.</p><button type="button" class="primary" data-act="start">Beginnen</button></div>
<div id="lvBody" hidden>
<section class="hero glass" id="lvOverview" aria-label="Je maand na de bouw"><div class="hero-label" id="lvLabel"></div><div class="hero-number" id="lvResult">€ 0</div><p class="hero-note" id="lvNote"></p><div class="stats lv-overview-stats"><div><span id="lvIncomeLabel">Inkomen incl. renteaftrek</span><strong id="lvIncome">€ 0</strong></div><div><span>Jouw uitgaven + sparen</span><strong id="lvMe">€ 0</strong></div><div><span id="lvPartnerLabel"></span><strong id="lvPartner">€ 0</strong></div></div></section>
<button type="button" class="lv-sticky glass" id="lvSticky" data-act="overview" aria-label="Terug naar het maandoverzicht" hidden><span id="lvStickyLabel"></span><b id="lvStickyAmount"></b></button>
<div class="lv-layout"><section class="section pane" aria-labelledby="lvCostsTitle"><div class="section-head"><h2 id="lvCostsTitle">Maandbedragen</h2><button type="button" class="text-button" id="lvCostsEdit" data-act="edit-costs">Posten aanpassen</button></div><p class="hero-note" id="lvCostsHint" style="margin-bottom:10px"></p><div id="lvIncomeSection"></div><div id="lvCostsHost"></div><div class="section-foot" id="lvCopyFoot" hidden><button type="button" class="ghost" data-act="copy">Neem over van Deze maand</button><span class="hero-note">Kopieert je posten en inkomen.</span></div></section>
<aside class="lv-side" id="lvControls" aria-label="Verdeling en vooruitblik"></aside></div>
</div>
</section>`;

export const LIVING_SCRIPT = String.raw`
const Living = (() => {
  const T=Budget.tools,U=Scenario.ui;
  let bound=false,observer=null,reveal=null,editReturn=null;const editing={costs:false,income:false},open=new Set(),view=()=>$('view-wonen'),plan=()=>Budget.doc().living;
  const E=n=>T.euro(Math.abs(Math.round(n))),money=n=>(Math.round(n)<0?'− ':'')+E(n),signed=n=>(Math.round(n)<0?'− ':'+ ')+E(n),pct=n=>String(n).replace('.',',')+'%';
  const who=l=>l.partner.trim()||'je partner',cap=text=>text.charAt(0).toUpperCase()+text.slice(1);

  // Everything per month, net. Repayment builds the owner's own equity, so the owner pays it. Interest and the
  // lines are shared when living together, unless a line is the owner's alone. The tax benefit belongs to the
  // owner, unless the refund on the interest is shared. What is left is the owner's income minus the owner's part of everything.
  function calc(l){
    const sum=T.sum,on=l.lines.filter(x=>x.on),costLines=on.filter(x=>!x.saving),saveLines=on.filter(x=>x.saving),principal=Math.max(0,T.round(l.payment-l.interest));
    const interestShare=l.together?l.interestShare/100:1,costShare=l.together?l.costShare/100:1,part=x=>x.mine?x.amount:x.amount*costShare;
    const costs=sum(costLines,x=>x.amount),costsMe=sum(costLines,part),savings=sum(saveLines,x=>x.amount),savingsMe=sum(saveLines,part);
    const deductible=T.round(l.interest+sum(on.filter(x=>x.deduct),x=>x.amount));
    const benefit=l.taxOn?T.round(l.taxRate/100*deductible-l.forfait):0,interestMe=T.round(l.interest*interestShare);
    // Shared, the partner gets back the refund on the interest the partner pays, so both pay their part of the net interest.
    // The deduction on other lines and the notional rental value stay with the owner.
    const benefitPartner=l.taxOn&&l.together&&l.taxShared?T.round(l.taxRate/100*l.interest*(1-interestShare)):0,benefitMe=T.round(benefit-benefitPartner);
    const rows=[{key:'principal',name:'Aflossing',me:principal,all:principal},{key:'interest',name:'Rente',me:interestMe,all:l.interest},{key:'costs',name:'Vaste lasten',me:costsMe,all:costs}];
    if(savings>0)rows.push({key:'savings',name:'Sparen',me:savingsMe,all:savings});
    if(l.taxOn)rows.push({key:'tax',name:'Belasting',me:-benefitMe,all:-benefit});
    const me=sum(rows,r=>r.me),all=sum(rows,r=>r.all),income=sum(l.income||[],x=>x.amount);
    // The refund is money coming in: it is shown as income, and the mortgage as what really leaves the account.
    const out=T.round(me+benefitMe),outAll=T.round(all+benefit);
    return {rows,me,all,partner:T.round(all-me),principal,interestMe,benefit,benefitMe,costs,costsMe,savings,savingsMe,deductible,costShare,mortgageMe:T.round(principal+interestMe),out,outAll,income,incomeAll:T.round(income+benefitMe),left:T.round(income-me)};
  }
  // What is left each month, added up: a month keeps what the months before it left.
  function growth(d,l,count=12){
    const c=calc(l),each=c.income>0?c.left:0,start=d.scenario?d.scenario.delivery:d.house.target,months=[];
    let y=Number(start.slice(0,4)),m=Number(start.slice(5,7));
    for(let k=1;k<=count;k++){months.push({month:y+'-'+String(m).padStart(2,'0'),total:T.round(each*k)});m++;if(m>12){m=1;y++;}}
    return {each,months};
  }
  function chartHtml(g){
    const top=Math.max(...g.months.map(x=>Math.abs(x.total)),1),neg=g.each<0,last=g.months.length-1;
    return '<div class="lv-chart" role="list" aria-label="Wat je overhoudt, opgeteld per maand">'+g.months.map((x,k)=>{
      const h=Math.max(3,Math.round(Math.abs(x.total)/top*150)),name=T.monthName(x.month),letter=name.slice(0,1),jan=x.month.slice(5,7)==='01'||k===0;
      return '<div class="lv-bar'+(neg?' neg':'')+'" role="listitem" tabindex="0" aria-label="'+escapeHtml(name+': '+money(x.total))+'">'+
        (k===0||k===last?'<span class="lv-val '+(k===0?'first':'last')+'" style="bottom:'+(h+42)+'px">'+money(x.total)+'</span>':'')+
        '<i style="height:'+h+'px"></i><small>'+letter+(jan?'<em>'+x.month.slice(0,4)+'</em>':'')+'</small>'+
        '<span class="lv-tip '+(k<4?'l':k>7?'r':'c')+'">'+escapeHtml(name)+'<b>'+money(x.total)+'</b>'+signed(g.each)+' deze maand</span></div>';}).join('')+'</div>';
  }
  function empty(d){const sc=d.scenario;
    return {partner:'',together:true,payment:sc?sc.mortgageFull:0,interest:0,interestShare:50,costShare:50,taxOn:true,taxRate:sc?sc.taxRate:0,forfait:0,taxShared:false,income:[],lines:[]};}
  // Posts that belong to where you live now are copied switched off: the house has its own. The tax refund is
  // A post the plan already has under the same first word comes in switched off too, and an empty post is not copied.
  // calculated here, so an income line for it is left out. Lines that were copied before are skipped.
  const OLD_HOME=/huur|hypothe|energie|stroom|gas|internet|water|inboedel|huis/i,REFUND=/teruggaaf|renteaftrek|belasting/i;
  function copyMonth(d,l){
    const first=name=>(name.toLowerCase().match(/[a-z]{3,}/)||[''])[0],known=new Set(l.lines.map(x=>first(x.name)).filter(Boolean));
    const have=new Set(l.lines.map(x=>x.id)),lines=d.costs.filter(c=>!have.has(c.id)&&c.amount>0).map(c=>({id:c.id,name:c.name,amount:c.amount,on:!OLD_HOME.test(c.name)&&!known.has(first(c.name)),mine:true,deduct:false,saving:c.saving}));
    const income=l.income.length?[]:d.income.filter(i=>!REFUND.test(i.name)).map(i=>({id:i.id,name:i.name,amount:i.amount}));
    l.lines.push(...lines);l.income.push(...income);
    return {lines:lines.length,off:lines.filter(x=>!x.on).length,income:income.length};
  }

  function lineRow(l,x){
    const pay=(mine,label)=>'<button type="button" role="radio" aria-checked="'+(x.mine===mine)+'" tabindex="'+(x.mine===mine?'0':'-1')+'"'+U.attr({act:'pay',id:x.id,mine:mine?'1':'0'})+'>'+label+'</button>';
    return '<div class="lv-line'+(x.on?' is-on':'')+'"><button type="button" class="row" role="checkbox" aria-checked="'+x.on+'"'+U.attr({act:'line',id:x.id})+'><span class="tick">'+icon('check')+'</span><span class="row-name">'+escapeHtml(x.name||'Naamloos')+'<small data-out="ln:'+x.id+'"></small></span><span class="row-amount">'+T.euro(x.amount)+'</span></button>'+(l.together&&x.on?'<div class="seg" role="radiogroup" aria-label="'+escapeHtml('Wie betaalt '+(x.name||'deze post'))+'">'+pay(false,'Samen delen')+pay(true,'Ik betaal alles')+'</div>':'')+'</div>';
  }
  // Native details keep every category one action away without rendering the whole budget as a long list.
  function fold(key,title,body,settings=false){
    return '<details class="lv-fold'+(settings?' lv-settings section pane':'')+'" data-place="'+key+'"'+(open.has(key)?' open':'')+'><summary id="lv-summary-'+key+'"><span><span class="lv-fold-title">'+title+'</span><small data-out="note:'+key+'"></small></span><b class="lv-fold-total" data-out="total:'+key+'"></b><span class="lv-chevron" aria-hidden="true"></span></summary><div class="lv-fold-body">'+body+'</div></details>';
  }
  function renderControls(){
    const l=plan(),name=escapeHtml(who(l));
    $('lvCostsEdit').textContent=editing.costs?'Klaar':'Posten aanpassen';$('lvCopyFoot').hidden=!editing.costs;
    const field=(label,key,type)=>U.fieldHtml(label,{sc:'num',key},l[key],type);
    $('lvIncomeSection').innerHTML=fold('income','Inkomen','<div data-income-lines class="lv-income-lines"'+(editing.income?' hidden':'')+'></div><div id="lvIncomeHost"></div><button type="button" class="text-button" id="lvIncomeEdit" data-act="edit-income">'+(editing.income?'Klaar':'Inkomen aanpassen')+'</button><p class="hero-note">De renteaftrek wordt berekend bij Belasting en telt hier mee als inkomen.</p>');
    if(editing.income)T.editor($('lvIncomeHost'),l.income,[{key:'name',label:'Naam',type:'text'},{key:'amount',label:'Bedrag per maand',type:'money'}],'Inkomen toevoegen',()=>({id:T.newId(),name:'',amount:0}));
    const host=$('lvCostsHost');
    if(editing.costs)T.editor(host,l.lines,[{key:'name',label:'Naam',type:'text'},{key:'amount',label:'Bedrag per maand',type:'money'},{key:'saving',label:'Dit is sparen',type:'check'},{key:'mine',label:'Ik betaal alles',type:'check'},{key:'deduct',label:'Aftrekbaar voor de belasting',type:'check'}],'Post toevoegen',()=>({id:T.newId(),name:'',amount:0,on:true,mine:false,deduct:false,saving:false}));
    else{
      const on=l.lines.filter(x=>x.on),costs=on.filter(x=>!x.saving),saving=on.filter(x=>x.saving),off=l.lines.filter(x=>!x.on);
      const still=(label,amount,note)=>'<div class="row static"><span class="row-name">'+label+'<small data-out="'+note+'"></small></span><span class="row-amount" data-out="'+amount+'"></span></div>';
      const group=(key,label,rows)=>fold(key,label,(rows.length?'<div class="rows">'+rows.map(x=>lineRow(l,x)).join('')+'</div>':'<p class="empty">Nog geen posten in dit onderdeel.</p>')+'<button type="button" class="text-button" data-act="edit-costs" data-group="'+key+'">Alle posten aanpassen</button>');
      host.innerHTML=fold('mortgage','Hypotheek','<div class="rows">'+still('Aflossing','hy:principal','hn:principal')+still('Rente','hy:interest','hn:interest')+'</div><div class="sc-grid">'+field('Bruto per maand','payment','money')+field('Waarvan rente','interest','money')+'</div>')+
        group('costs','Vaste lasten',costs)+group('savings','Sparen',saving)+(off.length?group('off','Uitgeschakeld',off):'');
    }
    const sw=(act,on,title,note)=>'<button type="button" class="row" role="checkbox" aria-checked="'+on+'" data-act="'+act+'"><span class="tick">'+icon('check')+'</span><span class="row-name">'+title+'<small>'+note+'</small></span><span class="row-amount"></span><span class="row-tip" data-why="'+act+'"></span></button>';
    const slider=(key,label)=>'<div class="slider"><div class="slider-top"><label for="lv-'+key+'">'+label+'</label><output for="lv-'+key+'" data-out="sp:'+key+'"></output></div><input type="range" id="lv-'+key+'" min="0" max="100" step="5" value="'+l[key]+'"'+U.attr({lv:'share',key})+'><p class="hero-note" data-out="sn:'+key+'"></p></div>';
    $('lvControls').innerHTML=
      fold('division','Verdeling instellen','<div class="rows">'+sw('together',l.together,'Samen met '+name,'Uit: je woont er alleen en betaalt alles zelf')+'</div>'+(l.together?'<div class="sc-grid">'+field('Naam van je partner','partner','text')+'</div>'+slider('interestShare','Jouw deel van de rente')+slider('costShare','Jouw deel van gedeelde posten'):'')+'<p class="hero-note">De aflossing betaal jij zelf: daarmee bouw je vermogen op in je huis.</p>',true)+
      fold('tax','Belasting','<div class="rows">'+sw('tax',l.taxOn,'Renteaftrek meerekenen','Teruggaaf min het eigenwoningforfait')+(l.together?sw('tax-shared',l.taxShared,'Netto rente delen met '+name,'Deel de teruggaaf over de rente die ieder betaalt'):'')+'</div><div class="sc-grid">'+field('Voordeel per euro aftrek (%)','taxRate','pct')+field('Eigenwoningforfait kost per maand','forfait','money')+'</div><p class="hero-note" data-out="deduct" style="margin-top:10px"></p>',true)+
      fold('breakdown','Wie betaalt wat','<p class="hero-note">Per maand, per post. De renteaftrek staat apart onder de uitgaven.</p><div class="lv-breakdown" role="region" aria-label="Verdeling per post" tabindex="0" data-split></div>',true)+
      fold('growth','Na 12 maanden','<p class="hero-note" data-out="keepNote"></p><div data-chart></div>',true);
  }
  // Every number on the page, refreshed without redrawing the inputs themselves.
  function numbers(){
    const d=Budget.doc(),l=plan();if(!l)return;const c=calc(l),name=who(l),out=new Map(),has=c.income>0,nowLeft=T.summary(d).month.left,more=T.round(c.left-nowLeft);
    $('lvLabel').textContent=has?'Over per maand na de bouw, netto':'Jouw kosten per maand, netto';
    $('lvResult').innerHTML=has?E(c.left)+'<small>'+(c.left<0?'tekort':'over')+'</small>':E(c.me)+'<small>per maand</small>';$('lvResult').className='hero-number'+(has?c.left<0?' short':' good':'');
    $('lvNote').textContent=(l.together?'Samen met '+name+'. ':'Je woont er alleen. ')+(has?Math.abs(more)<0.5?'Evenveel als je nu overhoudt.':E(more)+(more>0?' meer':' minder')+' dan de '+money(nowLeft)+' die je nu per maand overhoudt.':'Vul je inkomen in bij Inkomen om te zien wat je overhoudt.');
    $('lvIncomeLabel').textContent=l.taxOn?'Inkomen incl. renteaftrek':'Netto inkomen';$('lvIncome').textContent=money(c.incomeAll);$('lvMe').textContent=money(c.out);
    $('lvPartnerLabel').textContent=l.together?cap(name)+' betaalt netto':'Waarvan aflossing';$('lvPartner').textContent=money(l.together?c.partner:c.principal);
    $('lvStickyLabel').textContent=has?c.left<0?'Tekort per maand':'Over per maand':'Jouw kosten, netto';
    $('lvStickyAmount').textContent=E(has?c.left:c.me);$('lvStickyAmount').className=has?(c.left<0?'short':'good'):'';
    $('lvCostsHint').textContent=editing.costs?'Pas namen en bedragen aan, of sleep om de volgorde te wijzigen.':'Jouw deel per maand. Open een onderdeel om het te bekijken of aan te passen.';
    const incomeLine=(label,amount)=>'<div><span>'+escapeHtml(label||'Naamloos')+'</span><b>'+money(amount)+'</b></div>';
    view().querySelectorAll('[data-income-lines]').forEach(el=>{el.innerHTML=l.income.map(x=>incomeLine(x.name,x.amount)).join('')+(l.taxOn?incomeLine('Hypotheekrenteaftrek',c.benefitMe):'')+(l.income.length?'':'<p class="empty">Voeg je inkomen toe om te zien wat je overhoudt.</p>');});
    out.set('total:income',money(c.incomeAll));out.set('note:income',l.taxOn?'Netto inkomen + jouw renteaftrek':'Netto inkomen');
    out.set('total:mortgage',money(c.mortgageMe));out.set('note:mortgage','Jouw aflossing + '+(l.together?'jouw deel van de rente':'rente'));
    const costs=l.lines.filter(x=>x.on&&!x.saving),savings=l.lines.filter(x=>x.on&&x.saving),off=l.lines.filter(x=>!x.on);
    for(const [key,rows,me,all] of [['costs',costs,c.costsMe,c.costs],['savings',savings,c.savingsMe,c.savings]]){
      out.set('total:'+key,money(me));out.set('note:'+key,rows.length+(rows.length===1?' post':' posten')+(l.together?' · samen '+money(all):''));
    }
    out.set('total:off',String(off.length));out.set('note:off','Tellen niet mee in je maandbudget');
    out.set('total:division',l.together?'Samen':'Alleen');out.set('note:division',l.together?'Jouw deel: rente '+pct(l.interestShare)+' · posten '+pct(l.costShare):'Je betaalt alles zelf');
    out.set('total:tax',l.taxOn?money(c.benefitMe):'Uit');out.set('note:tax',!l.taxOn?'Renteaftrek telt niet mee':l.together&&l.taxShared?'Jouw teruggaaf · netto rente gedeeld':'De teruggaaf is voor jou');
    out.set('total:breakdown',money(l.together?c.outAll:c.out));out.set('note:breakdown',l.together?'Alle uitgaven samen, vóór renteaftrek':'Jouw uitgaven, vóór renteaftrek');
    out.set('hy:principal',E(c.principal));out.set('hn:principal','Betaal jij: jouw vermogen in het huis');
    out.set('hy:interest',E(c.interestMe));out.set('hn:interest',l.together?'Jouw deel van '+E(l.interest):'Betaal je zelf');
    const head='<thead><tr><th scope="col">Post</th><th scope="col">Jij</th>'+(l.together?'<th scope="col">'+escapeHtml(cap(name))+'</th><th scope="col">Samen</th>':'')+'</tr></thead>';
    const line=(label,me,all,cls)=>'<tr class="'+cls+'"><th scope="row">'+label+'</th><td>'+money(me)+'</td>'+(l.together?'<td'+(Math.abs(all-me)<0.5?' class="dim"':'')+'>'+money(all-me)+'</td><td class="dim">'+money(all)+'</td>':'')+'</tr>';
    const active=l.lines.filter(x=>x.on),own=x=>({name:escapeHtml(x.name||'Naamloos')+(x.saving?' <small>sparen</small>':''),me:x.mine||!l.together?x.amount:x.amount*c.costShare,all:x.amount});
    const detail=[c.rows[0],c.rows[1],...active.filter(x=>!x.saving).map(own),...active.filter(x=>x.saving).map(own)];
    view().querySelectorAll('[data-split]').forEach(el=>{el.innerHTML='<table class="lv-split"><caption class="sr-only">Wie betaalt wat per maand</caption>'+head+'<tbody>'+detail.map(r=>line(r.name,r.me,r.all,'')).join('')+line('Uitgaven + sparen',c.out,c.outAll,'t')+(l.taxOn?line('Renteaftrek terug',-c.benefitMe,-c.benefit,'dim'):'')+line('Netto',c.me,c.all,'t')+'</tbody></table>';});
    out.set('sp:interestShare',pct(l.interestShare));out.set('sp:costShare',pct(l.costShare));
    out.set('sn:interestShare',E(l.interest*l.interestShare/100)+' voor jou, '+E(l.interest*(1-l.interestShare/100))+' voor '+name);
    const shared=T.sum(l.lines.filter(x=>x.on&&!x.mine),x=>x.amount);
    out.set('sn:costShare','Van de '+E(shared)+' die jullie delen: '+E(shared*c.costShare)+' voor jou, '+E(shared*(1-c.costShare))+' voor '+name);
    for(const x of l.lines)out.set('ln:'+x.id,(!x.on?'Telt nu niet mee':!l.together?'Betaal je zelf':x.mine?'Betaal jij helemaal':'Jouw deel '+E(x.amount*c.costShare))+(x.deduct?' · aftrekbaar':''));
    const g=growth(d,l),end=g.months[g.months.length-1];
    out.set('total:growth',has?money(end.total):'—');
    out.set('note:growth',has?(g.each<0?'Tekort loopt op':'Wat je overhoudt, opgeteld')+' · vanaf '+T.monthName(g.months[0].month):'Vul eerst je inkomen in');
    out.set('keepNote',!has?'Vul je inkomen in bij Inkomen. Dan zie je hier wat je elke maand overhoudt en hoe dat oploopt.':Math.abs(g.each)<0.5?'Je houdt niets over en komt niets tekort, dus er loopt niets op.':g.each>0?'Zoveel houd je per maand over. Elke maand komt het overschot bij dat van de maanden ervoor: na '+g.months.length+' maanden is dat '+E(end.total)+'.':'Je komt elke maand tekort. Na '+g.months.length+' maanden is dat opgelopen tot '+E(end.total)+'.');
    view().querySelectorAll('[data-chart]').forEach(el=>{el.innerHTML=has&&Math.abs(g.each)>=0.5?chartHtml(g):'';});
    out.set('deduct','Aftrekbaar per maand: '+E(c.deductible)+' (rente en aangevinkte posten). Voordeel: '+money(l.taxRate/100*c.deductible-l.forfait)+'.');
    // What each switch does to the owner's monthly amount, shown while the pointer is on it.
    const flip=change=>{const copy=JSON.parse(JSON.stringify(l));change(copy);return calc(copy).me-c.me;};
    const effect=(on,delta)=>'<b>'+(Math.abs(delta)<0.5?'Maakt nu geen verschil':(on?'Uitzetten: ':'Aanzetten: ')+'jij betaalt '+E(delta)+(delta>0?' meer':' minder')+' per maand')+'</b>';
    const why=new Map();
    why.set('together','Samen deel je de rente en de gedeelde posten. De aflossing blijft van jou.'+effect(l.together,flip(x=>{x.together=!x.together;})));
    why.set('tax','Rente en erfpacht zijn aftrekbaar. Daar gaat het eigenwoningforfait vanaf. Wat overblijft krijg je terug.'+effect(l.taxOn,flip(x=>{x.taxOn=!x.taxOn;})));
    why.set('tax-shared','De teruggaaf komt op jouw naam binnen. Aan: '+escapeHtml(name)+' krijgt de teruggaaf over het deel van de rente dat zij of hij betaalt, zodat jullie allebei netto rente betalen. De aftrek op andere posten en het eigenwoningforfait blijven bij jou. Uit: '+escapeHtml(name)+' betaalt de rente voor aftrek en jij houdt de hele teruggaaf.'+effect(l.taxShared,flip(x=>{x.taxShared=!x.taxShared;})));
    view().querySelectorAll('[data-why]').forEach(el=>{el.innerHTML=why.get(el.dataset.why)||'';});
    view().querySelectorAll('[data-out]').forEach(el=>{if(out.has(el.dataset.out))el.textContent=out.get(el.dataset.out);});
  }
  const keyOf=el=>el.id||JSON.stringify(el.dataset);
  function redraw(){
    const active=document.activeElement,key=active&&view().contains(active)?keyOf(active):null;
    view().querySelectorAll('details[data-place]').forEach(el=>{if(el.open)open.add(el.dataset.place);else open.delete(el.dataset.place);});
    if(reveal){open.add(reveal);reveal=null;}
    renderControls();numbers();
    if(key&&key!=='{}'&&!view().contains(document.activeElement))[...view().querySelectorAll('button,input,select,summary')].find(el=>keyOf(el)===key)?.focus({preventScroll:true});
  }

  // A change is saved at once, like on the month view. The page's own totals follow through Budget's number refresh.
  function onInput(event){
    const el=event.target,d=el.dataset,l=plan();if(!l)return;
    if(d.lv==='share'){l[d.key]=Number(el.value);T.commit(false);return;}
    if(d.sc!=='num')return;let value;
    if(d.type==='text')value=el.value.slice(0,80);
    else{value=T.parseMoney(el.value);const bad=value===undefined||(d.type==='pct'&&value>100);el.setAttribute('aria-invalid',String(bad));if(bad)return;}
    l[d.key]=value;T.commit(false);
  }
  function onClick(event){
    const button=event.target.closest('[data-act]');if(!button)return;const d=button.dataset,doc=Budget.doc();
    if(d.act==='start'){if(doc&&!doc.living){doc.living=empty(doc);open.add('income');open.add('mortgage');T.commit();}return;}
    const l=plan();if(!l)return;
    if(d.act==='overview'){$('lvOverview').scrollIntoView({block:'start'});return;}
    // Opening or closing an editor changes nothing in the budget itself.
    if(d.act==='edit-costs'){
      const closing=editing.costs;if(!closing)editReturn=d.group||null;else reveal=editReturn;
      editing.costs=!editing.costs;redraw();$(closing&&editReturn?'lv-summary-'+editReturn:'lvCostsEdit')?.focus();return;
    }
    if(d.act==='edit-income'){editing.income=!editing.income;reveal='income';redraw();return;}
    if(d.act==='copy'){const before=JSON.stringify(l),done=copyMonth(doc,l);
      if(!done.lines&&!done.income){toast('Alles van Deze maand staat er al');return;}
      T.commit();toastAction(done.lines+(done.lines===1?' post':' posten')+' overgenomen'+(done.off?', '+done.off+' uitgezet':''),'Ongedaan maken',()=>{Budget.doc().living=JSON.parse(before);T.commit();});return;}
    if(d.act==='together')l.together=!l.together;
    else if(d.act==='tax')l.taxOn=!l.taxOn;
    else if(d.act==='tax-shared')l.taxShared=!l.taxShared;
    else if(d.act==='line'){const row=l.lines.find(x=>x.id===d.id);if(row){row.on=!row.on;reveal=row.on?(row.saving?'savings':'costs'):'off';}}
    else if(d.act==='pay'){const row=l.lines.find(x=>x.id===d.id);if(row)row.mine=d.mine==='1';}
    else return;
    T.commit();
  }
  function bind(){
    if(bound)return;bound=true;const root=view();
    if(window.IntersectionObserver){observer=new window.IntersectionObserver(entries=>{$('lvSticky').hidden=entries[0].isIntersecting||!plan();});observer.observe($('lvOverview'));}
    root.addEventListener('input',onInput);
    // The partner's name shows up in several places, so the page is redrawn once the field is left.
    root.addEventListener('change',event=>{if(event.target.dataset.sc==='num'&&event.target.dataset.type==='text'&&plan())redraw();});
    root.addEventListener('click',onClick);
    root.addEventListener('keydown',event=>{
      const button=event.target.closest('[role="radio"]');if(button?.dataset.act!=='pay'||!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home','End'].includes(event.key))return;
      event.preventDefault();const buttons=[...button.parentElement.querySelectorAll('[role="radio"]')],index=buttons.indexOf(button);
      const next=event.key==='Home'?0:event.key==='End'?buttons.length-1:(index+(['ArrowLeft','ArrowUp'].includes(event.key)?-1:1)+buttons.length)%buttons.length;
      buttons[next].focus({preventScroll:true});buttons[next].click();
    });
    root.addEventListener('toggle',event=>{const key=event.target.dataset?.place;if(!key||!root.contains(event.target))return;if(event.target.open)open.add(key);else open.delete(key);},true);
  }
  function render(){
    bind();const l=Budget.doc().living;
    $('lvEmpty').hidden=Boolean(l);$('lvBody').hidden=!l;
    if(l)redraw();
  }
  return {render,numbers,calc,empty,growth,copyMonth};
})();
`;
