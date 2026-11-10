// The programme module: navigation, the 12-week overview, week details and the
// intentional scheduling actions. The global keeps its earlier name (RunPlan)
// because the calendar and tests address it that way; it now covers gym and run.
export const RUNPLAN_MARKUP = String.raw`
<header class="masthead"><a class="brand" href="#kalender"><span class="brand-mark" data-icon="activity"></span><span>Kracht &amp; 5 km</span></a><div class="local-note" id="runLocalNote">Lokale test<span>Alleen op dit apparaat</span></div><nav class="dock glass" aria-label="Hoofdnavigatie"><a href="#kalender" data-main-nav="kalender"><span data-icon="calendar"></span>Kalender</a><a href="#renschema" data-main-nav="renschema"><span data-icon="layers"></span>Programma</a></nav></header>
`;

export const RUNPLAN_VIEWS = String.raw`
<section class="view" id="view-renschema" aria-labelledby="runPlanTitle" hidden>
<header class="page-heading"><div><div class="micro">12 weken · 3 × gym en 1 run per week</div><h1 id="runPlanTitle">Programma</h1></div></header>
<section class="run-summary glass" aria-label="Doel en nulmeting"><div><span class="micro">Doel</span><h2>5 km onder 27:30</h2><p>Gemiddeld sneller dan 5:30/km, en sterker over je hele lichaam</p></div><div class="run-baseline"><span>Nulmeting</span><strong id="runBaseline">Nog niet gelogd</strong><small id="runBaselinePace">Week 2 bepaalt je trainingstempo’s</small></div><div class="run-progress"><strong id="runProgress">0 / 48</strong><span>trainingen gelogd</span><div class="run-progress-track"><i id="runProgressBar"></i></div></div></section>
<section class="prog-activate pane" aria-labelledby="progActivateTitle"><div class="prog-activate-head"><h2 id="progActivateTitle">Inplannen</h2><p>Het programma staat klaar als sjabloon. Er komt pas iets in je kalender als je hieronder op inplannen tikt.</p></div>
<div class="prog-form"><label for="progStart">Week 1 begint in de week van<input type="date" id="progStart" required></label><label for="progDayA">Full body A<select id="progDayA"></select></label><label for="progDayB">Full body B<select id="progDayB"></select></label><label for="progDayC">Full body C<select id="progDayC"></select></label><label for="progDayRun">Run<select id="progDayRun"></select></label></div>
<div class="prog-summary" id="progSummary" role="status" aria-live="polite"></div>
<div class="prog-actions"><button type="button" class="primary" id="progApply">Inplannen</button><button type="button" class="text-button" id="progClear" hidden>Geplande sessies verwijderen</button></div></section>
<div class="run-plan-heading"><h2>Je trainingen</h2><span>Vrij in te plannen</span></div><div id="runWeekCards" class="run-week-grid"></div>
<details class="run-notes pane"><summary>Afspraken bij dit schema</summary><p>Begin na herstel van de halve marathon. Houd als startpunt ongeveer 48 uur tussen zware beenkracht en je run. Bij onvoldoende herstel schuif je de training door. Stop de belastende activiteit bij hamstringpijn.</p><p>De tempo’s zijn richtpunten uit je nulmeting. Na de controle in week 7 gaan ze alleen omhoog als die beheerst ging. 27:30 blijft een doel, geen voorspelling.</p><div id="runRules"></div></details>
</section>
<section class="view" id="view-runweek" aria-labelledby="runWeekTitle" hidden><div class="planner-editor-top"><a class="planner-back" href="#renschema">‹ Programma</a></div><div id="runWeekDetail"></div></section>
`;

export const RUNPLAN_CSS = String.raw`
/* Programme overview */
.run-summary{display:grid;gap:18px;padding:22px 20px;border-radius:var(--r-lg);margin-bottom:18px}
.run-summary h2{font-size:30px;line-height:1.1;font-weight:800;letter-spacing:-.6px;margin-top:4px}
.run-summary p{font-size:15px;color:var(--mut);margin-top:6px}
.run-baseline,.run-progress{padding-top:16px;border-top:1px solid var(--edge-soft)}
.run-baseline>span,.run-progress>span{display:block;font-size:14px;font-weight:600;color:var(--mut)}
.run-baseline strong{display:block;font-family:var(--display);font-size:26px;font-weight:800;letter-spacing:-.4px;font-variant-numeric:tabular-nums}
.run-baseline small{display:block;font-size:14px;color:var(--mut)}
.run-progress strong{font-family:var(--display);font-size:26px;font-weight:800;font-variant-numeric:tabular-nums;margin-right:8px}
.run-progress>span{display:inline}
.run-progress-track{height:10px;border-radius:999px;background:rgba(255,255,255,.12);margin-top:12px;overflow:hidden}
.run-progress-track i{display:block;height:100%;width:0;border-radius:999px;background:linear-gradient(90deg,var(--iris),var(--tide));transition:width .5s var(--ease)}

.prog-activate{padding:20px 16px;border-radius:var(--r-lg);margin-bottom:26px}
.prog-activate-head h2,.run-plan-heading h2{font-size:22px;font-weight:700;letter-spacing:-.3px}
.prog-activate-head p{font-size:15px;color:var(--mut);margin-top:4px;max-width:44em}
.prog-form{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:16px}
.prog-form label{display:grid;gap:6px;min-width:0}
.prog-form label:first-child{grid-column:1/-1}
.prog-summary{display:grid;gap:6px;margin-top:16px;font-size:15px;line-height:1.5;color:var(--mut)}
.prog-summary b{color:var(--ink)}
.prog-summary .prog-warning{color:var(--amber);font-weight:600}
.prog-actions{display:flex;flex-wrap:wrap;align-items:center;gap:8px 18px;margin-top:16px}
.prog-actions .primary{flex:1 1 220px}

.run-plan-heading{display:flex;align-items:baseline;justify-content:space-between;gap:12px;margin-bottom:12px}
.run-plan-heading>span{font-size:14px;color:var(--mut)}
.run-week-grid{display:grid;gap:12px}
.run-week-card{display:grid;gap:12px;min-width:0;padding:18px 16px;border-radius:var(--r-md);text-decoration:none;transition:transform .2s var(--ease),border-color .2s,background .2s}
.run-week-card:hover{transform:translateY(-2px);border-color:var(--edge)}
.run-week-card:active{transform:scale(.99)}
.run-week-card.is-next{border-color:var(--iris);box-shadow:inset 0 1px 0 rgba(255,255,255,.3),0 0 0 1px var(--iris),0 24px 60px -28px rgba(124,98,240,.9)}
.run-card-top{display:flex;align-items:center;justify-content:space-between;gap:10px}
.run-card-top h3{font-size:24px;font-weight:800;letter-spacing:-.4px}
.run-card-phase{font-size:13px;font-weight:700;padding:4px 10px;border-radius:999px;background:rgba(255,255,255,.1)}
.run-card-focus{font-size:15px;line-height:1.45;color:var(--mut)}
.run-card-slots{display:grid;gap:6px;list-style:none}
.run-card-slots li{display:flex;align-items:center;justify-content:space-between;gap:10px;min-height:34px;font-size:15px}
.run-card-slots li>span:first-child{display:inline-flex;align-items:center;gap:8px;min-width:0;font-weight:600}
.slot-mark{display:grid;place-items:center;width:24px;height:24px;flex-shrink:0;border-radius:7px;background:var(--iris);color:#16103a}
.slot-mark.run{border-radius:50%;background:var(--tide);color:#04261f}
.slot-mark .icon{width:14px;height:14px;stroke-width:2.2}
.run-card-pace{font-size:14px;color:var(--mut)}
.run-notes{border-radius:var(--r-md);margin-top:22px;padding:6px 18px;font-size:15px;color:var(--mut)}
.run-notes summary{cursor:pointer;min-height:52px;display:flex;align-items:center;font-weight:700;color:var(--ink)}
.run-notes p{line-height:1.6;margin-bottom:12px;max-width:52em}
.run-notes h3{font-size:17px;font-weight:700;color:var(--ink);margin:18px 0 8px}
.run-notes ul{display:grid;gap:8px;padding-left:20px;margin-bottom:14px;line-height:1.55;max-width:52em}

/* Week detail */
.run-detail-header{margin-bottom:18px}
.run-detail-header h1{font-size:40px;line-height:1.05;font-weight:800;letter-spacing:-1px;margin:2px 0 8px}
.run-detail-header p{font-size:16px;color:var(--mut);max-width:44em}
.session-stack{display:grid;gap:14px}
.session-card{padding:18px 16px;border-radius:var(--r-md)}
.session-card-head{display:flex;align-items:flex-start;gap:12px;margin-bottom:14px}
.session-card-head>div{flex:1;min-width:0}
.session-card-head h2{font-size:22px;font-weight:800;letter-spacing:-.3px;line-height:1.15}
.session-card-head p{font-size:14px;line-height:1.45;color:var(--mut);margin-top:4px}
.rx-list{list-style:none;display:grid;border-top:1px solid var(--edge-soft)}
.rx-list li{display:grid;gap:4px;padding:12px 0;border-bottom:1px solid var(--edge-soft)}
.rx-name{display:flex;flex-wrap:wrap;align-items:center;gap:8px;font-size:17px;font-weight:700}
.rx-dose{display:flex;flex-wrap:wrap;gap:4px 14px;font-size:15px;color:var(--ink)}
.rx-dose b{font-family:var(--display);font-size:18px;font-weight:800}
.rx-list small{font-size:14px;line-height:1.45;color:var(--mut)}
.rx-list small.rx-note{color:var(--amber)}
.run-step{display:grid;grid-template-columns:32px minmax(0,1fr);gap:12px;padding:12px 0;border-bottom:1px solid var(--edge-soft)}
.run-step:first-of-type{border-top:1px solid var(--edge-soft)}
.run-step-number{display:grid;place-items:center;width:30px;height:30px;border-radius:50%;background:rgba(116,236,208,.18);color:var(--tide);font-family:var(--display);font-size:15px;font-weight:800}
.run-step strong{font-size:17px;font-weight:700}
.run-step p{font-size:16px;color:var(--ink);margin-top:2px}
.run-step small{display:block;font-size:14px;line-height:1.5;color:var(--mut);margin-top:4px}
.run-guidance{display:grid;gap:8px;margin-top:14px;font-size:15px;line-height:1.5;color:var(--mut)}
.run-guidance b{color:var(--ink)}
.run-pace-warning{font-size:15px;color:var(--amber);margin-top:12px;line-height:1.5}
.session-schedule{display:grid;grid-template-columns:minmax(0,1fr);gap:10px;margin-top:16px}
.session-schedule label{display:grid;gap:6px}
.session-schedule .primary{width:100%}
.session-schedule .text-button{justify-content:center}
.run-result-mini{margin-top:14px;padding:12px 14px;border-radius:var(--r-sm);background:rgba(116,236,208,.14);font-size:15px;line-height:1.6}
.week-warmup{padding:14px 16px;border-radius:var(--r-md);font-size:15px;line-height:1.5;color:var(--mut)}
.week-warmup b{color:var(--ink)}

/* Programme parts inside the workout editor */
.session-brief{display:grid;gap:8px;padding:16px;border-radius:var(--r-md);margin-bottom:14px;font-size:15px;line-height:1.5;color:var(--mut)}
.session-brief b{color:var(--ink)}
.session-brief a{font-weight:600;color:var(--ink);min-height:44px;display:inline-flex;align-items:center}
.run-inline-plan{padding:16px;border-radius:var(--r-md);margin-bottom:14px}
.run-inline-plan h2{font-size:18px;font-weight:700;margin-bottom:8px}
.run-inline-plan p{font-size:15px;line-height:1.55;color:var(--mut)}
.run-inline-plan p b{color:var(--ink)}
.run-inline-plan a{display:inline-flex;align-items:center;min-height:44px;font-size:15px;font-weight:600}
.run-log-extra{display:grid;gap:14px;padding-top:16px;border-top:1px solid var(--edge-soft)}
.run-log-extra label{display:grid;gap:6px}
.run-log-extra small{font-size:14px;font-weight:500;line-height:1.5;color:var(--mut)}
.gym-log-extra{margin-top:18px;padding:16px;border-radius:var(--r-md);border:1px solid var(--edge-soft);background:var(--pane)}
.run-log-confirm{width:100%;min-height:56px}
.run-log-edit{justify-content:center}

@media(min-width:560px){
 .prog-form{grid-template-columns:repeat(4,minmax(0,1fr))}
 .run-week-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
 .session-schedule{grid-template-columns:minmax(0,1fr) auto;align-items:end}
 .session-schedule .primary{width:auto;min-width:180px}
 .session-schedule .text-button{grid-column:1/-1;justify-content:flex-start}
}
@media(min-width:900px){
 .run-summary{grid-template-columns:1.4fr 1fr 1fr;align-items:center;gap:28px;padding:28px}
 .run-summary h2{font-size:38px}
 .run-baseline,.run-progress{padding-top:0;border-top:0;padding-left:28px;border-left:1px solid var(--edge-soft)}
 .prog-activate{padding:24px 28px}
 .prog-form{grid-template-columns:1.5fr repeat(4,minmax(0,1fr))}
 .prog-form label:first-child{grid-column:auto}
 .prog-actions .primary{flex:0 0 auto}
 .run-week-grid{grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}
 .run-detail-header h1{font-size:54px;letter-spacing:-1.6px}
 .session-stack{grid-template-columns:repeat(2,minmax(0,1fr));align-items:start;gap:18px}
 .session-card{padding:22px}
 .week-warmup{grid-column:1/-1}
 .run-plan-editing .app{max-width:1120px}
}
`;

export const RUNPLAN_SCRIPT = String.raw`
const RunPlan = window.RunPlan = (()=>{
 const P=CONFIG.programme||{id:'kracht-5k-12-v2',weeks:[],rules:[],runTestWeeks:[2,12],paceCheckWeek:7,paceCheckBonusSeconds:5,defaultDays:{A:1,B:3,C:5,run:7},warmup:''};
 const programId=P.id,weeks=P.weeks.map(w=>w.run),KEYS=['A','B','C'],SLOTS=['A','B','C','run'];
 // The earlier run-only plan. Its entries keep their original week titles and are never counted in this programme.
 const LEGACY_ID='five-k-12-v1',LEGACY_TITLES=['Rustig hervatten','Nulmeting','Tempo','Lichtere week','Intervals','Tempo','Intervals','Lichtere week','Tempo','5 km-blokken','Korte sessie','Eindtest'];
 const DAY_NAMES=['maandag','dinsdag','woensdag','donderdag','vrijdag','zaterdag','zondag'];
 const esc=escapeHtml;
 const meta=e=>e?.runPlan?.programId===programId?e.runPlan:null;
 const gymMeta=e=>e?.gymPlan?.programId===programId?e.gymPlan:null;
 const legacy=e=>e?.runPlan?.programId===LEGACY_ID?e.runPlan:null;
 const all=()=>Object.values(Planner.entries()).filter(e=>!e.deleted);
 const logged=e=>Boolean(e?.runPlan?.logged&&e.distanceKm>0&&e.durationSeconds>0&&(!P.runTestWeeks.includes(e.runPlan.week)||e.runPlan.testSeconds>0)&&!Planner.invalidDrafts(e.id));
 const done=e=>Boolean(e)&&(e.runPlan?logged(e):Planner.completed(e));
 const pick=list=>list.sort((a,b)=>Number(done(b))-Number(done(a))||b.updatedAt-a.updatedAt)[0];
 const entry=n=>pick(all().filter(e=>meta(e)?.week===n));
 const gymEntry=(n,key)=>pick(all().filter(e=>gymMeta(e)?.week===n&&gymMeta(e).session===key));
 const slot=(n,key)=>key==='run'?entry(n):gymEntry(n,key);
 const session=(n,key)=>P.weeks[n-1]?.sessions.find(s=>s.key===key);
 function addDays(date,count){const d=new Date(date+'T12:00:00Z');d.setUTCDate(d.getUTCDate()+count);return d.toISOString().slice(0,10);}
 function mondayOf(date){return addDays(date,-((new Date(date+'T12:00:00Z').getUTCDay()+6)%7));}
 function shortDate(date){return new Date(date+'T12:00:00Z').toLocaleDateString('nl-NL',{weekday:'short',day:'numeric',month:'short',timeZone:'UTC'});}

 // Paces come only from a logged 5 km test in week 2 of this programme. Nothing is assumed before that.
 function baseline(){const e=entry(2);return logged(e)&&meta(e).testSeconds?meta(e).testSeconds/5:null;}
 function paceBonus(){const e=entry(P.paceCheckWeek),m=meta(e);return logged(e)&&m.asPlanned===true&&m.effort!==null&&m.effort<=8?P.paceCheckBonusSeconds:0;}
 function pace(w){const t=baseline();
  if(w.kind==='easy')return t?'Praattempo · richtlijn '+timeText(t+60)+'–'+timeText(t+90)+'/km':'Praattempo';
  if(w.kind==='test')return w.week===2?'Gelijkmatig vol te houden tempo':t?'Start rond '+timeText(t)+'/km, het tempo van je nulmeting':'Start op het tempo van je nulmeting';
  if(!t)return 'Tempo na nulmeting';
  const bonus=w.week>P.paceCheckWeek?paceBonus():0;return timeText(t+w.paceOffset[0]-bonus)+'–'+timeText(t+w.paceOffset[1]-bonus)+'/km';
 }
 const steps=w=>w.steps.map(s=>s.text===''?{...s,text:pace(w)}:s);
 function title(e){const m=meta(e),g=gymMeta(e),old=legacy(e);
  return m?'W'+m.week+' · '+weeks[m.week-1].title:g?'W'+g.week+' · Full body '+g.session:old?'W'+old.week+' · '+LEGACY_TITLES[old.week-1]:null;}
 // In a calendar cell the date already tells the week, so the chip only names the session.
 function shortTitle(e){const m=meta(e),g=gymMeta(e);return m?weeks[m.week-1].title:g?'Full body '+g.session:null;}
 function state(e,next){return done(e)?{label:'Gelogd',css:'logged',mark:'check'}:e?(e.date<localToday()?{label:'Nog niet gelogd',css:'late',mark:'clock'}:{label:'Gepland',css:'scheduled',mark:'clock'}):next?{label:'Volgende',css:'next',mark:'arrowRight'}:{label:'Niet gepland',css:'',mark:''};}
 const tag=(s,text)=>'<span class="status-tag '+s.css+'">'+(s.mark?icon(s.mark):'')+esc(text||s.label)+'</span>';
 function restText(range){const f=v=>String(v/60).replace('.',',');return range[1]<=60?range[0]+'–'+range[1]+' s':f(range[0])+'–'+f(range[1])+' min';}

 function renderNav(){$('runLocalNote').hidden=!CONFIG.preview;const hash=(window.location?.hash||'').slice(1),current=Planner.entries()[hash.split('/')[1]];
  const name=activeView==='renschema'||activeView==='runweek'||activeView==='workout'&&(meta(current)||gymMeta(current))?'renschema':'kalender';
  document.querySelectorAll('[data-main-nav]').forEach(a=>{if(a.dataset.mainNav===name)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
  document.body.classList.toggle('run-plan-editing',activeView==='runweek');}
 function nextSlot(){for(const w of P.weeks)for(const key of SLOTS)if(!done(slot(w.week,key)))return w.week+key;return null;}
 function render(){renderNav();const t=baseline(),total=P.weeks.length*SLOTS.length,next=nextSlot();
  let count=0;for(const w of P.weeks)for(const key of SLOTS)if(done(slot(w.week,key)))count++;
  $('runBaseline').textContent=t?timeText(t*5):'Nog niet gelogd';$('runBaselinePace').textContent=t?timeText(t)+'/km · alleen de 5 km-test'+(paceBonus()?' · tempo’s 5 s/km sneller na week 7':''):'Week 2 bepaalt je trainingstempo’s';
  $('runProgress').textContent=count+' / '+total;$('runProgressBar').style.width=(total?count/total*100:0)+'%';
  $('runWeekCards').innerHTML=P.weeks.map(w=>{const isNext=next!==null&&parseInt(next,10)===w.week;
   return '<a href="#renschema/week/'+w.week+'" class="run-week-card pane '+(isNext?'is-next':'')+'" data-run-week="'+w.week+'"><div class="run-card-top"><h3>Week '+w.week+'</h3><span class="run-card-phase">'+esc(w.phase)+(w.light?' · lichter':'')+'</span></div><p class="run-card-focus">'+esc(w.focus)+'</p><ul class="run-card-slots">'+SLOTS.map(key=>{const e=slot(w.week,key),s=state(e,next===w.week+key),run=key==='run';
    return '<li><span><i class="slot-mark '+(run?'run':'gym')+'">'+icon(run?'run':'dumbbell')+'</i>'+(run?'Run · '+esc(w.run.title):'Full body '+key)+'</span>'+tag(s,e&&!done(e)?shortDate(e.date):s.label)+'</li>';}).join('')+'</ul><p class="run-card-pace">'+esc(w.run.block)+' · '+esc(pace(w.run))+'</p></a>';}).join('');
  renderPlanner();if(activeView==='runweek')renderWeek();
 }
 function route(hash){if(hash==='renschema')return 'renschema';const m=/^renschema\/week\/(\d{1,2})$/.exec(hash);return m&&P.weeks[Number(m[1])-1]?'runweek':null;}
 function stepMarkup(w){return steps(w).map((s,i)=>'<div class="run-step"><span class="run-step-number">'+(i+1)+'</span><div><strong>'+esc(s.title)+'</strong><p>'+esc(s.text)+'</p>'+(s.note?'<small>'+esc(s.note)+'</small>':'')+'</div></div>').join('');}

 // A sensible date for a session that is not scheduled yet, based on what is already in the calendar.
 function suggest(n,key){let start=null;
  for(const w of P.weeks)for(const k of SLOTS){const e=slot(w.week,k);if(e&&!start)start=addDays(mondayOf(e.date),(n-w.week)*7);}
  const date=addDays(start||planStart,P.defaultDays[key]-1+(start?0:(n-1)*7));return date<localToday()?localToday():date;}
 function rxMarkup(x,list){const pair=x.superset?list.filter(o=>o.superset===x.superset):[],first=pair[0]?.key===x.key;
  return '<li><span class="rx-name">'+esc(x.name)+(x.superset?'<span class="exercise-superset">Superset</span>':'')+'</span><span class="rx-dose"><b>'+x.sets+' × '+esc(x.reps)+(x.perSide?' per kant':'')+'</b><span>RIR '+esc(x.rir)+'</span><span>'+(pair.length>1&&first?'direct door naar '+esc(pair[1].name):'rust '+restText(x.restSeconds))+'</span></span>'+(x.note?'<small class="rx-note">'+esc(x.note)+'</small>':'')+'<small>'+esc(x.cue)+' Vervanger: '+x.alternatives.map(esc).join(' of ')+'.</small></li>';}
 let shownWeek=null;
 function renderWeek(){const n=Number((window.location.hash||'').split('/').at(-1)),w=P.weeks[n-1];if(!w)return;const host=$('runWeekDetail');
  if(shownWeek===n&&host.contains?.(document.activeElement)&&document.activeElement?.tagName==='INPUT')return;shownWeek=n;
  const run=w.run,e=entry(n),s=state(e,false);
  host.innerHTML='<header class="run-detail-header"><div class="micro">'+esc(w.phase)+(w.light?' · lichtere week':'')+'</div><h1 id="runWeekTitle">Week '+n+'</h1><p>'+esc(w.focus)+'</p></header><div class="session-stack"><p class="week-warmup pane"><b>Opwarmen in de gym.</b> '+esc(P.warmup)+'</p>'+w.sessions.map(g=>{const ge=gymEntry(n,g.key),gs=state(ge,false);
   return '<section class="session-card pane gym" aria-labelledby="session-'+g.key+'"><div class="session-card-head"><span class="session-symbol gym">'+icon('dumbbell')+'</span><div><h2 id="session-'+g.key+'">'+esc(g.title)+'</h2><p>Ongeveer '+g.minutes+' minuten · '+esc(g.focus)+'</p></div>'+tag(gs)+'</div><ol class="rx-list">'+g.exercises.map(x=>rxMarkup(x,g.exercises)).join('')+'</ol><div class="session-schedule"><label for="sched-'+g.key+'">Datum<input type="date" id="sched-'+g.key+'" value="'+(ge?.date||suggest(n,g.key))+'" required></label><button type="button" class="primary" data-sched="'+g.key+'">'+(ge?'Training openen':'Inplannen')+'</button></div></section>';}).join('')
   +'<section class="session-card pane run" aria-labelledby="session-run"><div class="session-card-head"><span class="session-symbol run">'+icon('run')+'</span><div><h2 id="session-run">Run · '+esc(run.title)+'</h2><p>'+esc(run.type)+' · '+esc(run.totalKm)+' km totaal</p></div>'+tag(s)+'</div>'+stepMarkup(run)+'<div class="run-guidance"><p><b>Inspanning.</b> '+esc(run.effort)+'</p><p><b>Aanpassen.</b> '+esc(run.adjust)+'</p></div><div class="session-schedule"><label for="runScheduleDate">Datum<input type="date" id="runScheduleDate" value="'+(e?.date||suggest(n,'run'))+'" required></label><button type="button" class="primary" id="runSchedule">'+(e?'Training openen':'Inplannen')+'</button>'+(!e?'<button type="button" class="text-button" id="runLogToday">Vandaag loggen</button>':'')+'</div>'+(logged(e)?'<div class="run-result-mini"><b>Gelogd op '+esc(shortDate(e.date))+'</b><br>'+esc(String(e.distanceKm).replace('.',','))+' km · '+timeText(e.durationSeconds)+' totaal'+(meta(e).testSeconds?'<br>5 km-test: '+timeText(meta(e).testSeconds):'')+'</div>':'')+'</section></div>';
  const dateFrom=id=>{const input=$(id);if(!validDate(input.value)){input.reportValidity?.();return null;}return input.value;};
  host.querySelectorAll('[data-sched]').forEach(b=>b.addEventListener('click',()=>{const date=dateFrom('sched-'+b.dataset.sched);if(date)scheduleGym(n,b.dataset.sched,date);}));
  $('runSchedule').addEventListener('click',()=>{const date=dateFrom('runScheduleDate');if(date)schedule(n,date);});
  $('runLogToday')?.addEventListener('click',()=>schedule(n,localToday()));
 }

 // Scheduling is always a user action. An existing session for the same week is reused, never duplicated.
 const runLink=n=>({runPlan:{programId,week:n,logged:false,effort:null,asPlanned:null,testSeconds:null}});
 const gymLink=(n,key)=>({gymPlan:{programId,week:n,session:key,logged:false,effort:null}});
 const rows=(n,key)=>session(n,key).exercises.map(x=>({name:x.name,sets:x.sets}));
 function schedule(n,date,show=true){let e=entry(n);
  if(!e)e=Planner.create('run',date,false,{patch:runLink(n),silent:true});
  else if(e.date!==date)Planner.update(e.id,{date,runPlan:{...meta(e),logged:false}});
  if(show)Planner.open(e.id);return e;}
 function scheduleGym(n,key,date,show=true){let e=gymEntry(n,key);
  if(!e)e=Planner.create('full',date,false,{patch:gymLink(n,key),rows:rows(n,key),silent:true});
  else if(e.date!==date)Planner.update(e.id,{date});
  if(show)Planner.open(e.id);return e;}

 // A session added from the calendar takes the programme week its date falls in when the programme is
 // already in the calendar and that session is still free; otherwise the first week without it.
 function anchor(){for(const w of P.weeks)for(const k of SLOTS){const e=slot(w.week,k);if(e)return addDays(mondayOf(e.date),-(w.week-1)*7);}return null;}
 function weekFor(key,date){const start=anchor();
  if(start){const n=Math.round((Date.parse(mondayOf(date)+'T12:00:00Z')-Date.parse(start+'T12:00:00Z'))/604800000)+1;if(n>=1&&P.weeks[n-1]&&!slot(n,key))return n;}
  return P.weeks.find(w=>!slot(w.week,key))?.week||null;}
 function addSession(key,date,show=true){const n=weekFor(key,date);
  if(!n){toastAction('Alle 12 sessies Full body '+key+' staan al in je kalender','Programma',()=>{window.location.hash='renschema';});return null;}
  const e=scheduleGym(n,key,date,show);if(!show){Planner.refresh();toast('Week '+n+' · Full body '+key+' toegevoegd');}return e;}

 // Planning all twelve weeks at once: a preview first, then one explicit action with undo.
 // Default start: this Monday if today is a Monday, otherwise next Monday.
 let planStart=mondayOf(addDays(localToday(),6)),planDays={...P.defaultDays},clearArmed=false;
 function planItems(){const list=[];for(const w of P.weeks)for(const key of SLOTS)list.push({week:w.week,key,date:addDays(planStart,(w.week-1)*7+planDays[key]-1)});return list;}
 function planSummary(){const items=planItems(),today=localToday(),first=items[0]?.date,last=items.reduce((max,i)=>i.date>max?i.date:max,first);
  const present=items.filter(i=>slot(i.week,i.key)),missing=items.filter(i=>!slot(i.week,i.key)),fresh=missing.filter(i=>i.date>=today),past=missing.length-fresh.length;
  const others=all().filter(e=>!meta(e)&&!gymMeta(e)&&e.date>=today&&e.date>=planStart&&e.date<=last).length,warnings=[];
  for(const key of ['A','B']){const gap=(planDays.run-planDays[key]+7)%7;if(gap<2)warnings.push('Full body '+key+' staat '+(gap?'de dag vóór':'op dezelfde dag als')+' je run. Houd bij voorkeur 48 uur tussen zware beenkracht en je run.');}
  const gymDays=KEYS.map(k=>planDays[k]).sort((a,b)=>a-b);
  if(new Set(gymDays).size<3)warnings.push('Twee gymsessies vallen op dezelfde dag.');
  else if(gymDays.some((d,i)=>(gymDays[(i+1)%3]-d+7)%7===1))warnings.push('Gymsessies op opeenvolgende dagen geven minder herstel.');
  return {fresh,present:present.length,past,others,warnings,first:fresh[0]?.date,last:fresh.at(-1)?.date};}
 function renderPlanner(){const summary=planSummary(),host=$('progSummary');
  host.innerHTML='<p>Week 1 loopt van '+esc(shortDate(planStart))+' tot en met '+esc(shortDate(addDays(planStart,6)))+'.</p>'
   +(summary.fresh.length?'<p><b>'+summary.fresh.length+' sessies</b> komen in je kalender, van '+esc(shortDate(summary.first))+' tot en met '+esc(shortDate(summary.last))+'. Ze staan als gepland; je logt ze zelf.</p>':'<p><b>Alles uit dit programma staat al in je kalender.</b></p>')
   +(summary.present?'<p>'+summary.present+' sessies staan er al en blijven staan. Er komen geen dubbele sessies.</p>':'')
   +(summary.past?'<p>'+summary.past+' sessies vallen vóór vandaag en worden overgeslagen.</p>':'')
   +(summary.others?'<p>'+summary.others+' andere workouts in deze periode blijven ongewijzigd in je kalender staan.</p>':'')
   +summary.warnings.map(text=>'<p class="prog-warning">'+esc(text)+'</p>').join('');
  $('progApply').textContent=summary.fresh.length?'Plan '+summary.fresh.length+' sessies in':'Inplannen';$('progApply').disabled=!summary.fresh.length;
  const removable=clearTargets().length;$('progClear').hidden=!removable;if(!clearArmed)$('progClear').textContent='Geplande sessies verwijderen';
 }
 function applyPlan(){const summary=planSummary();if(!summary.fresh.length)return;
  const ids=summary.fresh.map(i=>(i.key==='run'?schedule(i.week,i.date,false):scheduleGym(i.week,i.key,i.date,false)).id);
  Planner.refresh();
  toastAction(ids.length+' sessies ingepland','Ongedaan maken',()=>{const current=Planner.entries();Planner.persistMany(ids.map(id=>current[id]).filter(e=>e&&!e.deleted&&!done(e)).map(e=>({...e,deleted:true})));Planner.refresh();toast('Planning teruggedraaid');});
 }
 // Only future sessions that were never logged. Logged training is never removed here.
 function clearTargets(){const today=localToday();return all().filter(e=>(meta(e)||gymMeta(e))&&!done(e)&&e.date>=today);}
 function clearPlan(){const targets=clearTargets();if(!targets.length)return;
  if(!clearArmed){clearArmed=true;$('progClear').textContent='Tik nogmaals om '+targets.length+' geplande sessies te verwijderen';setTimeout(()=>{clearArmed=false;renderPlanner();},5000);return;}
  clearArmed=false;const ids=targets.map(e=>e.id);Planner.persistMany(targets.map(e=>({...e,deleted:true})));Planner.refresh();
  toastAction(ids.length+' geplande sessies verwijderd','Ongedaan maken',()=>{const current=Planner.entries();Planner.persistMany(ids.map(id=>current[id]).filter(e=>e&&e.deleted).map(e=>({...e,deleted:false})));Planner.refresh();toast('Planning hersteld');});
 }
 function initialize(){
  $('progStart').value=planStart;
  $('progStart').addEventListener('change',event=>{if(!validDate(event.target.value)){event.target.reportValidity?.();return;}planStart=mondayOf(event.target.value);event.target.value=planStart;renderPlanner();});
  for(const [id,key] of [['progDayA','A'],['progDayB','B'],['progDayC','C'],['progDayRun','run']]){
   $(id).innerHTML=DAY_NAMES.map((name,i)=>'<option value="'+(i+1)+'" '+(planDays[key]===i+1?'selected':'')+'>'+name+'</option>').join('');
   $(id).addEventListener('change',event=>{planDays[key]=Number(event.target.value);renderPlanner();});
  }
  $('progApply').addEventListener('click',applyPlan);$('progClear').addEventListener('click',clearPlan);
  $('runRules').innerHTML=P.rules.map(rule=>'<h3>'+esc(rule.title)+'</h3><ul>'+rule.items.map(item=>'<li>'+esc(item)+'</li>').join('')+'</ul>').join('');
 }

 // Shown inside an exercise card when the workout belongs to a programme session.
 function exerciseInfo(e,row){const g=gymMeta(e),list=g&&session(g.week,g.session)?.exercises;if(!list)return '';
  const name=row.name.trim().toLowerCase(),x=list.find(o=>[o.name,...o.alternatives].some(n=>n.toLowerCase()===name));if(!x)return '';
  const pair=x.superset?list.filter(o=>o.superset===x.superset):[],first=pair[0]?.key===x.key,swaps=[x.name,...x.alternatives].filter(n=>n.toLowerCase()!==name);
  return '<div class="exercise-plan">'+(pair.length>1?'<span class="exercise-superset">Superset met '+esc(pair[first?1:0].name)+'</span>':'')+'<div class="exercise-target"><strong>'+x.sets+' × '+esc(x.reps)+'</strong>'+(x.perSide?'<span>per kant</span>':'')+'<span>RIR '+esc(x.rir)+'</span><span>'+(pair.length>1&&first?'Direct door':'Rust '+restText(x.restSeconds))+'</span></div><p>'+esc(x.cue)+'</p>'+(x.note?'<p class="exercise-note">'+esc(x.note)+'</p>':'')+'<div class="exercise-swap"><span>Wissel:</span>'+swaps.map(n=>'<button type="button" data-row="'+row.id+'" data-swap="'+esc(n)+'">'+esc(n)+'</button>').join('')+'</div></div>';}

 function attachGym(e){const g=gymMeta(e),w=P.weeks[g.week-1],plan=session(g.week,g.session),host=$('plannerEditor'),list=$('plannerExercises');if(!plan||!list?.before)return;
  $('plannerWorkoutTitle').textContent='Week '+g.week+' · '+plan.title;$('plannerWorkoutState').textContent=state(e,false).label;
  const brief=document.createElement('section');brief.className='session-brief pane';brief.setAttribute('aria-label','Geplande training');
  brief.innerHTML='<p><b>'+esc(w.phase)+(w.light?' · lichtere week':'')+'.</b> '+esc(w.focus)+'</p><p><b>Ongeveer '+plan.minutes+' minuten.</b> '+esc(P.warmup)+'</p><p><b>RIR</b> is het aantal goede herhalingen dat je na een set nog over hebt.</p><a href="#renschema/week/'+g.week+'">Volledige week bekijken →</a>';list.before(brief);
  const extra=document.createElement('div');extra.className='run-log-extra gym-log-extra';
  extra.innerHTML='<label for="gymEffort">Inspanning (optioneel)<select id="gymEffort"><option value="">Niet ingevuld</option>'+Array.from({length:10},(_,i)=>'<option value="'+(i+1)+'" '+(g.effort===i+1?'selected':'')+'>'+(i+1)+' / 10</option>').join('')+'</select></label><button type="button" id="gymConfirm" class="primary run-log-confirm '+(done(e)?'logged':'')+'">'+(done(e)?'Gelogd · wijzigingen bewaren automatisch':'Training afronden')+'</button>'+(done(e)?'<button type="button" class="text-button run-log-edit" id="gymUnconfirm">Terugzetten naar gepland</button>':'');
  $('plannerFieldError').before(extra);
  const set=patch=>Planner.update(e.id,{gymPlan:{...gymMeta(Planner.entries()[e.id]),...patch}});
  $('gymEffort').addEventListener('change',event=>set({effort:event.target.value?Number(event.target.value):null}));
  $('gymConfirm').addEventListener('click',()=>{const current=Planner.entries()[e.id];let error='';
   if(Planner.invalidDrafts(e.id))error='Controleer de gemarkeerde velden.';
   else if(current.date>localToday())error='Deze training staat in de toekomst. Pas de datum aan om hem te loggen.';
   else if(!Planner.hasReps(current))error='Vul bij minstens één set je herhalingen in.';
   if(error){$('plannerFieldError').textContent=error;$('plannerFieldError').scrollIntoView?.({block:'center',behavior:'smooth'});return;}
   set({logged:true});Planner.refresh(true);toast('Training gelogd');
  });
  $('gymUnconfirm')?.addEventListener('click',()=>{set({logged:false});Planner.refresh(true);});
 }
 function attach(e){if(gymMeta(e)){attachGym(e);return;}
  const m=e?.runPlan&&(meta(e)||legacy(e));if(!m)return;const current=Boolean(meta(e)),w=current?weeks[m.week-1]:null,test=P.runTestWeeks.includes(m.week),host=$('plannerEditor'),form=host.querySelector?.('.planner-run-form');if(!form)return;
  $('plannerWorkoutTitle').textContent='Week '+m.week+' · '+(w?w.title:LEGACY_TITLES[m.week-1]);$('plannerWorkoutState').textContent=state(e,false).label;
  const panel=document.createElement('section');panel.className='run-inline-plan pane';panel.setAttribute('aria-label','Geplande training');
  panel.innerHTML=w?'<h2>Training · '+esc(w.totalKm)+' km totaal</h2>'+steps(w).map(s=>'<p><b>'+esc(s.title)+'</b>'+(s.text?' · '+esc(s.text):'')+'</p>').join('')+'<p>'+esc(w.effort)+'</p><a href="#renschema/week/'+m.week+'">Volledig plan bekijken →</a>':'<h2>Uit je eerdere renschema</h2><p>Deze run hoort bij het vorige schema en telt niet mee in het huidige programma. Je gegevens blijven bewaard zoals je ze hebt ingevuld.</p>';form.before(panel);
  const extra=document.createElement('div');extra.className='run-log-extra';
  extra.innerHTML=(test?'<label for="runTestTime">Tijd over de 5 km<input id="runTestTime" type="text" inputmode="decimal" placeholder="mm:ss" value="'+esc(Planner.draftValue(e.id,'planTestSeconds',m.testSeconds?timeText(m.testSeconds):''))+'" aria-invalid="'+Planner.hasDraft(e.id,'planTestSeconds')+'"><small>Alleen de 5 km-test, zonder in- en uitlopen. Totale tijd vul je hierboven in.</small></label>':'')+'<label for="runEffort">Inspanning (optioneel)<select id="runEffort"><option value="">Niet ingevuld</option>'+Array.from({length:10},(_,i)=>'<option value="'+(i+1)+'" '+(m.effort===i+1?'selected':'')+'>'+(i+1)+' / 10</option>').join('')+'</select></label><label for="runAsPlanned">Volgens plan uitgevoerd?<select id="runAsPlanned"><option value="">Kies een optie</option><option value="yes" '+(m.asPlanned===true?'selected':'')+'>Ja</option><option value="no" '+(m.asPlanned===false?'selected':'')+'>Aangepast</option></select></label><button type="button" id="runConfirm" class="primary run-log-confirm '+(logged(e)?'logged':'')+'">'+(logged(e)?'Gelogd · wijzigingen bewaren automatisch':'Training afronden')+'</button>'+(logged(e)?'<button type="button" class="text-button run-log-edit" id="runUnconfirm">Terugzetten naar gepland</button>':'');form.appendChild(extra);
  const set=patch=>{const now=Planner.entries()[e.id];Planner.update(e.id,{runPlan:{...now.runPlan,...patch}});if(!Planner.entries()[e.id].runPlan.logged)markEditing(e.id);};
  $('runTestTime')?.addEventListener('input',event=>{const raw=event.target.value,value=raw.trim()===''?null:parseTime(raw),invalid=raw.trim()!==''&&!value;Planner.rememberDraft(e.id,'planTestSeconds',raw,invalid);event.target.setAttribute('aria-invalid',String(invalid));if(!invalid)set({testSeconds:value,logged:false});});
  $('runEffort').addEventListener('change',event=>set({effort:event.target.value?Number(event.target.value):null}));$('runAsPlanned').addEventListener('change',event=>set({asPlanned:event.target.value===''?null:event.target.value==='yes'}));
  $('runConfirm').addEventListener('click',()=>{const now=Planner.entries()[e.id],data=now.runPlan;let error='';
   if(Planner.invalidDrafts(e.id))error='Controleer de gemarkeerde velden.';
   else if(!now.distanceKm||!now.durationSeconds)error='Vul je werkelijke afstand en totale tijd in.';
   else if(now.date>localToday())error='Deze training staat in de toekomst. Pas de datum aan om hem te loggen.';
   else if(test&&(!data.testSeconds||now.distanceKm<5||data.testSeconds>now.durationSeconds))error='Vul een geldige 5 km-testtijd in, niet langer dan je totale sessietijd, en minimaal 5 km afstand.';
   else if(data.asPlanned===null)error='Kies of je de training volgens plan hebt uitgevoerd.';
   if(error){$('plannerFieldError').textContent=error;$('plannerFieldError').scrollIntoView?.({block:'center',behavior:'smooth'});return;}
   set({logged:true});Planner.refresh(true);toast('Training gelogd');
  });
  $('runUnconfirm')?.addEventListener('click',()=>{set({logged:false});Planner.refresh(true);});
 }
 function markEditing(id){const m=Planner.entries()[id]?.runPlan;if(m&&!m.logged){const b=$('runConfirm');if(b){b.textContent='Training afronden';b.classList.remove('logged');}if($('runUnconfirm'))$('runUnconfirm').hidden=true;}}
 initialize();
 return {shortTitle,markEditing,render,route,attach,meta,gymMeta,title,logged,done,baseline,paceBonus,entry,gymEntry,pace,weeks,schedule,scheduleGym,weekFor,addSession,exerciseInfo,planSummary,applyPlan,clearPlan,clearTargets,setPlan:(start,days)=>{planStart=mondayOf(start);if(days)planDays={...planDays,...days};}};
})();
`;
