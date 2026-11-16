// Living in the house once it is delivered: what it costs per month and who pays which part.
// A small side view of the house tracker. It changes nothing on the tracker or in the scenario.
// Like the rest of the page this is HTML in strings. Inside the String.raw blocks: no backticks and no template placeholders.
// No amounts live here: every number comes from the stored budget document.

export const LIVING_CSS = String.raw`
.lv-split{display:grid;grid-template-columns:minmax(0,1.25fr) repeat(3,minmax(0,1fr));gap:12px 10px;align-items:baseline;font-variant-numeric:tabular-nums}
.lv-split.solo{grid-template-columns:minmax(0,1fr) auto}
.lv-split span{font-size:15px;font-weight:600;overflow-wrap:anywhere}
.lv-split .h{font-size:13px;font-weight:700;color:var(--mut);text-align:right}
.lv-split b{font-family:var(--display);font-size:17px;font-weight:800;text-align:right;white-space:nowrap}
.lv-split .dim{color:var(--mut)}
.lv-split .t{padding-top:12px;border-top:1px solid var(--edge-soft)}
.lv-split b.t{font-size:19px}
/* Under a shared cost line: who pays it. */
.seg{display:flex;justify-content:flex-end;gap:6px;margin-top:6px}
.seg button{min-height:40px;padding:4px 14px;border-radius:999px;border:1px solid var(--edge-soft);background:rgba(255,255,255,.04);font-size:13px;font-weight:700;color:var(--mut);transition:background .2s,border-color .2s}
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
<header class="page-heading"><div><div class="micro">Huis · na de bouw</div><h1 id="lvTitle">Wonen</h1></div><a class="ghost" href="#huis">Terug naar Huis</a></header>
<div class="section pane" id="lvEmpty" hidden><h2 style="font-size:22px;font-weight:700">Nog niets ingevuld</h2><p class="hero-note" style="margin:8px 0 16px">Reken uit wat wonen in je huis per maand kost als het klaar is, en wie welk deel betaalt. Je Huis-pagina verandert hier niet door.</p><button type="button" class="primary" data-act="start">Leeg beginnen</button></div>
<div id="lvBody" hidden>
<section class="hero glass" aria-label="Jouw woonlasten na de bouw"><div class="hero-label" id="lvLabel"></div><div class="hero-number" id="lvResult">€ 0</div><p class="hero-note" id="lvNote"></p><div class="stats"><div><span>Waarvan aflossing</span><strong id="lvPrincipal">€ 0</strong></div><div><span id="lvPartnerLabel"></span><strong id="lvPartner">€ 0</strong></div><div><span>Het huis in totaal</span><strong id="lvAll">€ 0</strong></div></div></section>
<div id="lvControls"></div>
<div id="lvAssume"></div>
</div>
</section>`;

export const LIVING_SCRIPT = String.raw`
const Living = (() => {
  const T=Budget.tools,U=Scenario.ui;
  let bound=false,editing=false;const open=new Set(),view=()=>$('view-wonen'),plan=()=>Budget.doc().living;
  const E=n=>T.euro(Math.abs(Math.round(n))),money=n=>(Math.round(n)<0?'− ':'')+E(n),signed=n=>(Math.round(n)<0?'− ':'+ ')+E(n),pct=n=>String(n).replace('.',',')+'%';
  const who=l=>l.partner.trim()||'je partner';

  // Everything per month, net. Repayment builds the owner's own equity, so the owner pays it. Interest and the
  // cost lines are shared when living together. The tax benefit belongs to the owner unless it is shared too.
  function calc(l){
    const sum=T.sum,on=l.lines.filter(x=>x.on),principal=Math.max(0,T.round(l.payment-l.interest));
    const interestShare=l.together?l.interestShare/100:1,costShare=l.together?l.costShare/100:1;
    const costs=sum(on,x=>x.amount),costsMe=sum(on,x=>x.mine?x.amount:x.amount*costShare);
    const deductible=T.round(l.interest+sum(on.filter(x=>x.deduct),x=>x.amount));
    const benefit=l.taxOn?T.round(l.taxRate/100*deductible-l.forfait):0,benefitMe=T.round(benefit*(l.taxShared?interestShare:1));
    const rows=[{key:'principal',name:'Aflossing',me:principal,all:principal},{key:'interest',name:'Rente',me:T.round(l.interest*interestShare),all:l.interest},{key:'costs',name:'Vaste lasten',me:costsMe,all:costs}];
    if(l.taxOn)rows.push({key:'tax',name:'Belasting',me:-benefitMe,all:-benefit});
    const me=sum(rows,r=>r.me),all=sum(rows,r=>r.all);
    return {rows,me,all,partner:T.round(all-me),principal,benefit,benefitMe,costs,costsMe,deductible,costShare};
  }
  // What is left over compared with today, added up: a month keeps what the months before it left.
  function growth(d,l,count=12){
    const c=calc(l),each=l.now>0?T.round(l.now-c.me):0,start=d.scenario?d.scenario.delivery:d.house.target,months=[];
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
    return {partner:'',together:true,payment:sc?sc.mortgageFull:0,interest:0,interestShare:50,costShare:50,taxOn:true,taxRate:sc?sc.taxRate:0,forfait:0,taxShared:false,now:0,lines:[]};}

  function renderControls(){
    const l=plan(),name=escapeHtml(who(l));
    const sw=(act,on,title,note)=>'<button type="button" class="row" role="checkbox" aria-checked="'+on+'" data-act="'+act+'"><span class="tick">'+icon('check')+'</span><span class="row-name">'+title+'<small>'+note+'</small></span><span class="row-amount" data-out="sw:'+act+'"></span><span class="row-tip" data-why="'+act+'"></span></button>';
    const slider=(key,label)=>'<div class="slider"><div class="slider-top"><label for="lv-'+key+'">'+label+'</label><output for="lv-'+key+'" data-out="sp:'+key+'"></output></div><input type="range" id="lv-'+key+'" min="0" max="100" step="5" value="'+l[key]+'"'+U.attr({lv:'share',key})+'><p class="hero-note" data-out="sn:'+key+'"></p></div>';
    const pay=(x,mine,label)=>'<button type="button" role="radio" aria-checked="'+(x.mine===mine)+'"'+U.attr({act:'pay',id:x.id,mine:mine?'1':'0'})+'>'+label+'</button>';
    const lines=l.lines.map(x=>'<div><button type="button" class="row" role="checkbox" aria-checked="'+x.on+'"'+U.attr({act:'line',id:x.id})+'><span class="tick">'+icon('check')+'</span><span class="row-name">'+escapeHtml(x.name||'Naamloos')+'<small data-out="ln:'+x.id+'"></small></span><span class="row-amount">'+T.euro(x.amount)+'</span></button>'+(l.together&&x.on?'<div class="seg" role="radiogroup" aria-label="'+escapeHtml('Wie betaalt '+(x.name||'deze post'))+'">'+pay(x,false,'Samen delen')+pay(x,true,'Ik betaal alles')+'</div>':'')+'</div>').join('');
    const costEditor=U.linesHtml('lines',l.lines,[{key:'name',label:'Kostenpost',type:'text'},{key:'amount',label:'Per maand',type:'step'},{key:'mine',label:'Ik betaal alles',type:'check'},{key:'deduct',label:'Aftrekbaar voor de belasting',type:'check'}],'Kostenpost toevoegen');
    $('lvControls').innerHTML=
      '<section class="section pane" aria-labelledby="lvWhoTitle"><div class="section-head"><h2 id="lvWhoTitle">Samen of alleen</h2></div><div class="rows">'+sw('together',l.together,'Samen met '+name,'Uit: je woont er alleen en betaalt alles zelf')+'</div>'+(l.together?slider('interestShare','Jouw deel van de rente')+slider('costShare','Jouw deel van de vaste lasten'):'')+'</section>'+
      '<section class="section pane" aria-labelledby="lvSplitTitle"><div class="section-head"><h2 id="lvSplitTitle">Wie betaalt wat</h2></div><p class="hero-note" style="margin-bottom:12px">Per maand, netto. De aflossing betaal jij: dat is jouw eigen vermogen in het huis.</p><div data-split></div></section>'+
      '<section class="section pane" aria-labelledby="lvCostTitle"><div class="section-head"><h2 id="lvCostTitle">Vaste lasten</h2><button type="button" class="text-button" data-act="edit">'+(editing?'Klaar':'Aanpassen')+'</button></div><p class="hero-note" style="margin-bottom:10px" data-out="costs"></p>'+(editing?costEditor:lines?'<div class="rows">'+lines+'</div>':'<p class="empty">Nog geen vaste lasten. Tik op Aanpassen om ze toe te voegen.</p>')+'</section>'+
      '<section class="section pane" aria-labelledby="lvTaxTitle"><div class="section-head"><h2 id="lvTaxTitle">Belasting</h2><span class="section-total" data-out="tax"></span></div><div class="rows">'+sw('tax',l.taxOn,'Renteaftrek meerekenen','Wat je via de belasting terugkrijgt, min het eigenwoningforfait')+(l.together?sw('tax-shared',l.taxShared,'Voordeel delen met '+name,'Uit: de teruggaaf is helemaal voor jou'):'')+'</div></section>'+
      '<section class="section pane" aria-labelledby="lvKeepTitle"><div class="section-head"><h2 id="lvKeepTitle">Wat je overhoudt</h2><span class="section-total" data-out="keep"></span></div><p class="hero-note" data-out="keepNote"></p><div data-chart></div></section>';
    $('lvAssume').innerHTML='<details class="section pane sc-assume" data-place="assume"'+(open.has('assume')?' open':'')+'><summary>Aannames</summary><p class="hero-note">Alle bedragen waar deze pagina mee rekent, per maand. Pas ze aan als je iets beter weet.</p>'+
      '<h3>Samen</h3><div class="sc-grid">'+U.fieldHtml('Naam van je partner',{sc:'num',key:'partner'},l.partner,'text')+U.fieldHtml('Wat je nu aan wonen betaalt',{sc:'num',key:'now'},l.now,'money')+'</div>'+
      '<h3>Hypotheek</h3><div class="sc-grid">'+U.fieldHtml('Bruto per maand',{sc:'num',key:'payment'},l.payment,'money')+U.fieldHtml('Waarvan rente',{sc:'num',key:'interest'},l.interest,'money')+'</div><p class="hero-note" data-out="principal"></p>'+
      '<h3>Belasting</h3><div class="sc-grid">'+U.fieldHtml('Voordeel per euro aftrek (%)',{sc:'num',key:'taxRate'},l.taxRate,'pct')+U.fieldHtml('Eigenwoningforfait kost per maand',{sc:'num',key:'forfait'},l.forfait,'money')+'</div><p class="hero-note" data-out="deduct"></p>'+'</details>';
  }
  // Every number on the page, refreshed without redrawing the inputs themselves.
  function renderNumbers(){
    const l=plan(),c=calc(l),name=who(l),out=new Map(),less=T.round(l.now-c.me);
    $('lvLabel').textContent=l.together?'Jouw deel per maand, netto':'Per maand, netto';
    $('lvResult').innerHTML=E(c.me)+'<small>per maand</small>';
    $('lvNote').textContent=(l.together?'Samen met '+name+'. ':'Je woont er alleen. ')+(l.now>0?Math.abs(less)<0.5?'Evenveel als je nu aan wonen betaalt.':E(less)+(less>0?' minder':' meer')+' dan de '+E(l.now)+' die je nu aan wonen betaalt.':'');
    $('lvPrincipal').textContent=E(c.principal);$('lvPartnerLabel').textContent=l.together?name.charAt(0).toUpperCase()+name.slice(1)+' betaalt':'Partner betaalt';$('lvPartner').textContent=l.together?money(c.partner):'€ 0';$('lvAll').textContent=money(c.all);
    const cell=(n,cls)=>'<b class="'+cls+'">'+money(n)+'</b>',head=l.together?'<span></span><span class="h">Jij</span><span class="h">'+escapeHtml(name.charAt(0).toUpperCase()+name.slice(1))+'</span><span class="h">Samen</span>':'';
    const line=(label,me,all,cls)=>'<span class="'+cls+'">'+label+'</span>'+cell(me,cls)+(l.together?cell(all-me,cls+(Math.abs(all-me)<0.5?' dim':''))+cell(all,cls+' dim'):'');
    view().querySelectorAll('[data-split]').forEach(el=>{el.className='lv-split'+(l.together?'':' solo');el.innerHTML=head+c.rows.map(r=>line(r.name,r.me,r.all,'')).join('')+line('Totaal',c.me,c.all,'t');});
    out.set('costs',editing?'Pas namen en bedragen aan. Tik op Klaar als je tevreden bent.':l.lines.length?'Samen '+E(c.costs)+' per maand'+(l.together?', waarvan '+E(c.costsMe)+' voor jou':'')+'. Tik een post uit om te zien wat er zonder gebeurt'+(l.together?', en kies per post wie hem betaalt.':'.'):'');
    out.set('tax',l.taxOn?signed(c.benefit):'€ 0');
    out.set('sp:interestShare',pct(l.interestShare));out.set('sp:costShare',pct(l.costShare));
    out.set('sn:interestShare',E(l.interest*l.interestShare/100)+' voor jou, '+E(l.interest*(1-l.interestShare/100))+' voor '+name);
    const shared=T.sum(l.lines.filter(x=>x.on&&!x.mine),x=>x.amount);
    out.set('sn:costShare','Van de '+E(shared)+' die jullie delen: '+E(shared*c.costShare)+' voor jou, '+E(shared*(1-c.costShare))+' voor '+name);
    for(const x of l.lines)out.set('ln:'+x.id,(!x.on?'Telt nu niet mee':!l.together?'Betaal je zelf':x.mine?'Betaal jij helemaal':'Jouw deel '+E(x.amount*c.costShare))+(x.deduct?' · aftrekbaar':''));
    const g=growth(Budget.doc(),l),end=g.months[g.months.length-1];
    out.set('keep',l.now>0?signed(g.each):'');
    out.set('keepNote',l.now<=0?'Vul onderaan bij Aannames in wat je nu aan wonen betaalt. Dan zie je hier wat je elke maand overhoudt en hoe dat oploopt.':Math.abs(g.each)<0.5?'Je betaalt evenveel als nu, dus er loopt niets op.':g.each>0?'Zoveel houd je per maand over, vergeleken met wat je nu aan wonen betaalt. Elke maand komt het overschot bij dat van de maanden ervoor: na '+g.months.length+' maanden is dat '+E(end.total)+'.':'Wonen kost je hier meer dan nu. Na '+g.months.length+' maanden heb je '+E(end.total)+' meer uitgegeven.');
    view().querySelectorAll('[data-chart]').forEach(el=>{el.innerHTML=l.now>0&&Math.abs(g.each)>=0.5?chartHtml(g):'';});
    out.set('principal','Aflossing: '+E(c.principal)+' per maand. Dat deel betaal jij.');
    out.set('deduct','Aftrekbaar per maand: '+E(c.deductible)+' (rente en aangevinkte posten). Voordeel: '+money(l.taxRate/100*c.deductible-l.forfait)+'.');
    // What each switch does to the owner's monthly amount, shown while the pointer is on it.
    const flip=change=>{const copy=JSON.parse(JSON.stringify(l));change(copy);return calc(copy).me-c.me;};
    const effect=(on,delta)=>'<b>'+(Math.abs(delta)<0.5?'Maakt nu geen verschil':(on?'Uitzetten: ':'Aanzetten: ')+'jij betaalt '+E(delta)+(delta>0?' meer':' minder')+' per maand')+'</b>';
    const why=new Map();
    why.set('together','Samen deel je de rente en de vaste lasten. De aflossing blijft van jou.'+effect(l.together,flip(x=>{x.together=!x.together;})));
    why.set('tax','Rente en erfpacht zijn aftrekbaar. Daar gaat het eigenwoningforfait vanaf. Wat overblijft krijg je terug.'+effect(l.taxOn,flip(x=>{x.taxOn=!x.taxOn;})));
    why.set('tax-shared','De teruggaaf komt op jouw naam binnen. Aan: je verdeelt hem in dezelfde verhouding als de rente, zodat jullie allebei de netto rente betalen. Uit: '+escapeHtml(name)+' betaalt de bruto rente en jij houdt de teruggaaf.'+effect(l.taxShared,flip(x=>{x.taxShared=!x.taxShared;})));
    view().querySelectorAll('[data-why]').forEach(el=>{el.innerHTML=why.get(el.dataset.why)||'';});
    view().querySelectorAll('[data-out]').forEach(el=>{if(out.has(el.dataset.out))el.textContent=out.get(el.dataset.out);});
  }
  const keyOf=el=>el.id||JSON.stringify(el.dataset);
  function redraw(){
    const active=document.activeElement,key=active&&view().contains(active)?keyOf(active):null;
    renderControls();renderNumbers();
    if(key&&key!=='{}')[...view().querySelectorAll('button,input,select,summary')].find(el=>keyOf(el)===key)?.focus({preventScroll:true});
  }
  // A change is saved at once, like on the Huis page. Typing only refreshes the numbers, so the field keeps its focus.
  const saved=()=>{T.commit(false);renderNumbers();};

  function onInput(event){
    const el=event.target,d=el.dataset,l=plan();if(!l)return;
    if(d.lv==='share'){l[d.key]=Number(el.value);saved();return;}
    if(!d.sc)return;const target=d.sc==='num'?l:l.lines.find(x=>x.id===d.id);if(!target)return;let value;
    if(d.type==='text')value=el.value.slice(0,80);
    else if(d.type==='check')value=el.checked;
    else{value=T.parseMoney(el.value);const bad=value===undefined||(d.type==='pct'&&value>100);el.setAttribute('aria-invalid',String(bad));if(bad)return;}
    target[d.key]=value;
    if(d.type==='check')T.commit();else saved();
  }
  function onClick(event){
    const button=event.target.closest('[data-act]');if(!button)return;const d=button.dataset,doc=Budget.doc();
    if(d.act==='start'){if(doc&&!doc.living){doc.living=empty(doc);open.add('assume');editing=true;T.commit();}return;}
    const l=plan();if(!l)return;
    // Opening or closing the editor changes nothing in the budget itself.
    if(d.act==='edit'){editing=!editing;redraw();return;}
    if(d.act==='together')l.together=!l.together;
    else if(d.act==='tax')l.taxOn=!l.taxOn;
    else if(d.act==='tax-shared')l.taxShared=!l.taxShared;
    else if(d.act==='line'){const row=l.lines.find(x=>x.id===d.id);if(row)row.on=!row.on;}
    else if(d.act==='pay'){const row=l.lines.find(x=>x.id===d.id);if(row)row.mine=d.mine==='1';}
    else if(d.act==='step'){const row=l.lines.find(x=>x.id===d.id);if(row)row[d.key]=Math.max(0,T.round(row[d.key]+Number(d.step)));}
    else if(d.act==='add'){if(l.lines.length>=40){toast('Maximaal 40 regels');return;}l.lines.push({id:T.newId(),name:'',amount:0,on:true,mine:false,deduct:false});}
    else if(d.act==='del'){const index=l.lines.findIndex(x=>x.id===d.id);if(index>=0)l.lines.splice(index,1);}
    else return;
    T.commit();
  }
  function bind(){
    if(bound)return;bound=true;const root=view();
    root.addEventListener('input',onInput);
    // Names show up in several places, so the page is redrawn once the field is left.
    root.addEventListener('change',event=>{if(event.target.dataset.type==='text'&&plan()&&!editing)redraw();});
    root.addEventListener('click',onClick);
    root.addEventListener('toggle',event=>{const key=event.target.dataset?.place;if(!key)return;if(event.target.open)open.add(key);else open.delete(key);},true);
  }
  function render(){
    bind();const l=Budget.doc().living;
    $('lvEmpty').hidden=Boolean(l);$('lvBody').hidden=!l;
    if(l)redraw();
  }
  return {render,calc,empty,growth};
})();
`;
