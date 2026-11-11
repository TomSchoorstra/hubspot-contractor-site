// The whole client: exercise library, workout templates, the calendar, the workout
// editor and the 5 km run sequence. Logic functions never touch the DOM, so the
// tests can call them directly; the render functions only read state.
export const PLANNER_SCRIPT = String.raw`const App = (() => {
  const key = 'training-v2-'+CONFIG.rowId+(CONFIG.preview?'-voorbeeld':'');
  const RUN = CONFIG.run, MUSCLES = CONFIG.muscles, LOADS = CONFIG.loads, TARGET = CONFIG.weekTarget;
  const LOAD_NOTE = {total:'totaalgewicht','per-dumbbell':'gewicht per dumbbell',bodyweight:'extra gewicht bij lichaamsgewicht',none:'zonder gewicht'};
  const uuid = () => crypto.randomUUID();
  const dkey = d => d.type+':'+d.id;
  const kg = v => String(v).replace('.',',');
  let docs={},pending=new Set(),invalid=new Set(),month=localToday().slice(0,7),activeId=null,activeTpl=null,addDate=localToday(),returnHash=null;
  let ready=CONFIG.preview,ok=CONFIG.preview,localOk=true,saving=false,mode='cloud',dirtyTimer=null,retryTimer=null,retryDelay=3000,loading=false,drag=null,lastDay=localToday(),lastUndo=null,showArchived=false,search='',sheetCtx=null,lastView=null;

  // ---- State ----
  function shape(d){return Boolean(d)&&typeof d==='object'&&['exercise','template','workout'].includes(d.type)&&typeof d.id==='string'&&Number.isSafeInteger(d.updatedAt)&&d.updatedAt>0&&(d.type!=='workout'||(validDate(d.date)&&Array.isArray(d.exercises)&&typeof d.deleted==='boolean'))&&(d.type!=='template'||Array.isArray(d.slots));}
  const byType = type => Object.values(docs).filter(d=>d.type===type);
  // Stored documents override the seeds with the same ID, so a renamed or archived seed keeps its identity.
  function exercises(all=false){const map=new Map(CONFIG.seeds.exercises.map(x=>[x.id,x]));for(const d of byType('exercise'))map.set(d.id,d);return [...map.values()].filter(x=>all||!x.archived).sort((a,b)=>a.name.localeCompare(b.name,'nl'));}
  const exercise = id => docs['exercise:'+id]||CONFIG.seeds.exercises.find(x=>x.id===id)||null;
  function templates(all=false){const map=new Map(CONFIG.seeds.templates.map(t=>[t.id,t]));for(const d of byType('template'))map.set(d.id,d);return [...map.values()].filter(t=>all||!t.archived);}
  const tpl = id => docs['template:'+id]||CONFIG.seeds.templates.find(t=>t.id===id)||null;
  const workouts = () => byType('workout').filter(w=>!w.deleted);
  const workout = id => docs['workout:'+id];
  const hasDone = w => w.exercises.some(r=>r.sets.some(s=>s.done));
  const runComplete = w => w.distanceKm>0&&w.durationSeconds>0&&(w.runStep!==RUN.testStep||(w.testSeconds>0&&w.distanceKm>=5&&w.testSeconds<=w.durationSeconds));

  function cache(){try{localStorage.setItem(key,JSON.stringify({version:2,docs,pending:[...pending]}));localOk=true;}catch{localOk=false;}}
  function read(){
    try{const c=JSON.parse(localStorage.getItem(key)||'null');if(!c||c.version!==2)return;
      for(const [k,d] of Object.entries(c.docs||{}))if(shape(d)&&k===dkey(d))docs[k]=d;
      pending=new Set((Array.isArray(c.pending)?c.pending:[]).filter(k=>docs[k]));
    }catch{localOk=false;}
  }
  // Every change goes through here. A workout cannot stay logged in the future, without a confirmed set or without run data.
  function put(doc){
    if(doc.type==='workout'&&doc.logged&&(doc.date>localToday()||(doc.kind==='gym'?!hasDone(doc):!runComplete(doc))))doc={...doc,logged:false};
    const k=dkey(doc);doc={...doc,updatedAt:Math.max(Date.now(),(docs[k]?.updatedAt||0)+1)};
    docs[k]=doc;pending.add(k);cache();status();clearTimeout(dirtyTimer);dirtyTimer=setTimeout(flush,550);return doc;
  }
  function saveText(){
    if(!localOk&&!ok)return {status:'error',text:'Niet opgeslagen · laat dit scherm open'};
    if(invalid.size)return {status:'error',text:'Controleer de gemarkeerde velden'};
    if(CONFIG.preview)return {status:localOk?'ok':'error',text:localOk?'Alleen lokaal opgeslagen':'Niet opgeslagen op dit apparaat'};
    if(saving)return {status:'saving',text:'Opslaan…'};
    if(pending.size||!ok)return {status:ok?'saving':'offline',text:localOk?(ok?'Opslaan…':'Alleen lokaal opgeslagen'):'Niet opgeslagen · probeer opnieuw'};
    if(!ready)return {status:'saving',text:'Laden…'};
    return {status:'ok',text:mode==='local'?'Alleen lokaal opgeslagen':'Opgeslagen'};
  }
  function status(){const s=saveText();
    for(const id of ['plannerEditorSave','tplSave']){$(id).textContent=s.text;$(id).dataset.status=s.status;}
    $('syncText').textContent=s.text;$('syncLine').dataset.status=s.status==='error'?'offline':s.status;$('retrySync').hidden=CONFIG.preview||ok;
  }
  async function transport(method,body){const control=new AbortController(),timer=setTimeout(()=>control.abort(),8000);try{
    const response=await fetch(CONFIG.api,{method,cache:'no-store',headers:{'Content-Type':'application/json'},...(body?{body:JSON.stringify(body)}:{}),signal:control.signal});
    // The session has ended: reload, so the login page appears. Unsaved changes stay in the local cache.
    if(response.status===401){window.location?.reload?.();throw Error('Signed out');}
    if(!response.ok)throw Error('HTTP '+response.status);return await response.json();
  }finally{clearTimeout(timer);}}
  function retry(){clearTimeout(retryTimer);retryTimer=setTimeout(()=>{if(!ready||!ok)load();else flush();},retryDelay);retryDelay=Math.min(retryDelay*2,30000);}
  async function flush(){
    if(CONFIG.preview||saving||loading||!ready)return;clearTimeout(dirtyTimer);saving=true;status();
    try{while(pending.size){const k=[...pending][0],snapshot=JSON.parse(JSON.stringify(docs[k]));await transport('POST',{doc:snapshot});if(docs[k].updatedAt===snapshot.updatedAt)pending.delete(k);cache();}ok=true;retryDelay=3000;}
    catch{ok=false;retry();}finally{saving=false;status();}
  }
  async function load(){
    if(CONFIG.preview){ready=true;ok=true;refresh();return;}if(loading)return;loading=true;status();
    try{const result=await transport('GET');if(result.data?.version!==2||!result.data.docs||typeof result.data.docs!=='object')throw Error('Invalid data');
      const remote={};for(const [k,d] of Object.entries(result.data.docs)){if(!shape(d)||k!==dkey(d))throw Error('Invalid document');remote[k]=d;}
      for(const k of pending)remote[k]=docs[k];docs=remote;mode=result.data.storage==='local'?'local':'cloud';ok=true;retryDelay=3000;cache();
    }catch{ok=false;retry();}finally{loading=false;ready=true;refresh();if(pending.size)flush();}
  }

  // ---- Dates ----
  function addDays(date,count){const d=new Date(date+'T12:00:00Z');d.setUTCDate(d.getUTCDate()+count);return d.toISOString().slice(0,10);}
  function mondayOf(date){return addDays(date,-((new Date(date+'T12:00:00Z').getUTCDay()+6)%7));}
  const dateText = date => new Date(date+'T12:00:00Z').toLocaleDateString('nl-NL',{day:'numeric',month:'long',weekday:'long',timeZone:'UTC'});
  const dayShort = date => new Date(date+'T12:00:00Z').toLocaleDateString('nl-NL',{weekday:'short',day:'numeric',month:'short',timeZone:'UTC'});

  // ---- Creating workouts. Scheduling is always a user action and never logs anything. ----
  const emptySets = count => Array.from({length:count},()=>({id:uuid(),weightKg:null,reps:null,done:false}));
  const exRow = (x,sets,repMin,repMax,pair) => ({id:uuid(),exerciseId:x.id,name:x.name,load:x.load,targetSets:sets,repMin,repMax,pair,sets:emptySets(sets)});
  // The workout takes its own copy of the template. Later template changes do not reach it.
  function gymRows(t){const rows=[];let carry=null;
    for(let i=0;i<t.slots.length;i++){const s=t.slots[i],x=exercise(s.exerciseId);let pair=carry;carry=null;
      if(s.superset&&t.slots[i+1]){pair=pair||uuid();carry=pair;}
      if(x)rows.push(exRow(x,s.sets,s.repMin,s.repMax,pair));}
    return rows;
  }
  const baseWorkout = (kind,date,title) => ({type:'workout',id:uuid(),kind,date,deleted:false,updatedAt:0,logged:false,note:'',title,templateId:null,exercises:[],runStep:null,distanceKm:null,durationSeconds:null,averageHeartRate:null,testSeconds:null,hamstring:null});
  function runWorkout(step){return workouts().filter(w=>w.runStep===step).sort((a,b)=>Number(b.logged)-Number(a.logged)||b.updatedAt-a.updatedAt)[0]||null;}
  // The next run to schedule: the first one that is not in the calendar yet.
  function nextStep(){for(const r of RUN.runs)if(!runWorkout(r.step))return r.step;return null;}
  // The next run to do: the first one that is not logged yet.
  function nextOpen(){for(const r of RUN.runs)if(!runWorkout(r.step)?.logged)return r.step;return null;}
  function types(){const n=nextStep(),r=n?RUN.runs[n-1]:null;
    return [...templates().map(t=>({id:'tpl:'+t.id,name:t.name,kind:'gym',lines:t.slots.map(s=>exercise(s.exerciseId)?.name).filter(Boolean)})),
      ...(r?[{id:'run:next',name:'Run '+n+' van '+RUN.runs.length,kind:'run',lines:[r.title+' · '+r.main+' · '+paceLabel(r)]}]:[]),
      {id:'run:loose',name:'Losse run',kind:'run',lines:['Afstand · tijd · hartslag']},
      {id:'empty',name:'Lege workout',kind:'gym',lines:['Kies zelf oefeningen uit je library']}];
  }
  function add(typeId,date,show=true){
    if(!validDate(date))return null;let w;
    if(typeId==='empty')w=baseWorkout('gym',date,'Workout');
    else if(typeId==='run:loose')w=baseWorkout('run',date,'Run');
    else if(typeId==='run:next'||/^run:\d+$/.test(typeId)){
      const n=typeId==='run:next'?nextStep():Number(typeId.slice(4)),r=n?RUN.runs[n-1]:null;
      if(!r){toast('Alle '+RUN.runs.length+' runs staan al in je kalender');return null;}
      const existing=runWorkout(n);if(existing){if(show)open(existing.id);return existing;}
      w={...baseWorkout('run',date,'Run '+n+' · '+r.title),runStep:n};
    }else{const t=tpl(typeId.replace(/^tpl:/,''));if(!t)return null;w={...baseWorkout('gym',date,t.name),templateId:t.id,exercises:gymRows(t)};}
    w=put(w);month=date.slice(0,7);
    if(show)open(w.id);else{refresh();toast(w.title+' toegevoegd');}
    return w;
  }
  function remove(id){const w=workout(id);if(!w||w.deleted)return;lastUndo=id;put({...w,deleted:true});if(activeView==='workout')back();else refresh();
    toastAction('Workout verwijderd','Ongedaan maken',()=>{if(lastUndo===id){put({...workout(id),deleted:false});lastUndo=null;refresh();toast('Workout hersteld');}});
  }
  function weekStats(day=localToday()){const from=mondayOf(day),to=addDays(from,6),list=workouts().filter(w=>w.logged&&w.date>=from&&w.date<=to);
    return {gym:list.filter(w=>w.kind==='gym').length,run:list.filter(w=>w.kind==='run').length};}
  // Two gym sessions and one run are the weekly base. A third gym session counts as extra, never as missed.
  function weekText(){const s=weekStats(),part=(name,count,goal)=>name+' '+Math.min(count,goal)+' van '+goal+(count>goal?' (+'+(count-goal)+' extra)':'');
    return 'Deze week: '+part('gym',s.gym,TARGET.gym)+' · '+part('run',s.run,TARGET.run);}

  // ---- Previous performance. Read-only: it never changes that record and never invents a set. ----
  // Preferably the last time in the same template, otherwise the last time the exercise was done anywhere.
  function previous(w,row){let same=null,any=null;
    const newer=(o,best)=>!best||o.date>best.date||(o.date===best.date&&o.updatedAt>best.updatedAt);
    for(const o of workouts()){
      if(o.id===w.id||o.kind!=='gym'||o.date>w.date)continue;
      const sets=o.exercises.filter(r=>r.exerciseId===row.exerciseId).flatMap(r=>r.sets.filter(s=>s.done));if(!sets.length)continue;
      const hit={date:o.date,updatedAt:o.updatedAt,title:o.title,sets};
      if(w.templateId&&o.templateId===w.templateId&&newer(o,same))same={...hit,same:true};
      if(newer(o,any))any={...hit,same:false};
    }
    return same||any;
  }
  function prevText(p){const weights=new Set(p.sets.map(s=>s.weightKg));
    if(weights.size===1)return (p.sets[0].weightKg===null?'':kg(p.sets[0].weightKg)+' kg × ')+p.sets.map(s=>s.reps).join(' / ');
    return p.sets.map(s=>(s.weightKg===null?'':kg(s.weightKg)+' kg × ')+s.reps).join(' · ');}

  // ---- Workout logic ----
  const mapRow = (w,rowId,fn) => ({...w,exercises:w.exercises.map(r=>r.id===rowId?fn(r):r)});
  const setInvalid = setId => [...invalid].some(k=>k.startsWith(setId+':'));
  // Confirming a set stores what was typed, or the grey proposal from last time when nothing was typed.
  function tick(id,rowId,setId){const w=workout(id),row=w?.exercises.find(r=>r.id===rowId),i=row?row.sets.findIndex(s=>s.id===setId):-1;if(i<0)return false;
    if(setInvalid(setId)){toast('Controleer eerst de gemarkeerde velden');return false;}
    const set=row.sets[i];let next;
    if(set.done)next={...set,done:false};
    else{const p=previous(w,row)?.sets[i],reps=set.reps??p?.reps??null,weightKg=row.load==='none'?null:set.weightKg??p?.weightKg??null;
      if(reps===null){toast('Vul eerst je herhalingen in');return false;}
      next={...set,reps,weightKg,done:true};}
    put(mapRow(w,rowId,r=>({...r,sets:r.sets.map(s=>s.id===setId?next:s)})));return true;
  }
  function setValue(id,rowId,setId,field,value){const w=workout(id);if(!w)return;
    put(mapRow(w,rowId,r=>({...r,sets:r.sets.map(s=>{if(s.id!==setId)return s;const n={...s,[field]:value};if(n.reps===null)n.done=false;return n;})})));}
  function addSet(id,rowId){const w=workout(id),row=w?.exercises.find(r=>r.id===rowId);if(!row)return false;
    if(row.sets.length>=20){toast('Maximaal 20 sets per oefening');return false;}
    put(mapRow(w,rowId,r=>({...r,sets:[...r.sets,...emptySets(1)]})));return true;}
  function removeLastSet(id,rowId){const w=workout(id),row=w?.exercises.find(r=>r.id===rowId);if(!row||row.sets.length<2)return false;
    if(row.sets.at(-1).done){toast('De laatste set is bevestigd. Zet hem eerst terug.');return false;}
    put(mapRow(w,rowId,r=>({...r,sets:r.sets.slice(0,-1)})));return true;}
  function addExercise(id,x){const w=workout(id);if(!w||!x)return false;if(w.exercises.length>=40){toast('Maximaal 40 oefeningen per workout');return false;}
    put({...w,exercises:[...w.exercises,exRow(x,3,null,null,null)]});return true;}
  // A swap only changes this workout. Confirmed sets keep the exercise they were done on.
  function swapExercise(id,rowId,x){const w=workout(id),row=w?.exercises.find(r=>r.id===rowId);if(!row||!x)return false;
    if(row.sets.some(s=>s.done)){toast('Deze oefening heeft al bevestigde sets. Voeg de andere oefening los toe.');return false;}
    put(mapRow(w,rowId,r=>({...r,exerciseId:x.id,name:x.name,load:x.load,sets:r.sets.map(s=>({...s,weightKg:null,reps:null}))})));return true;}
  function removeExercise(id,rowId){const w=workout(id),index=w?w.exercises.findIndex(r=>r.id===rowId):-1;if(index<0)return;const removed=w.exercises[index];
    put({...w,exercises:w.exercises.filter(r=>r.id!==rowId)});
    toastAction('Oefening verwijderd','Ongedaan maken',()=>{const now=workout(id);if(!now||now.exercises.some(r=>r.id===removed.id))return;const list=[...now.exercises];list.splice(Math.min(index,list.length),0,removed);put({...now,exercises:list});renderEditor(true);});
  }
  // The two exercises of a superset move as one block.
  function blocks(w){const out=[];for(const row of w.exercises){const last=out.at(-1);if(row.pair&&last&&last[0].pair===row.pair)last.push(row);else out.push([row]);}return out;}
  // The order chosen during training belongs to this workout only; the template keeps its own order.
  function reorder(id,order){const w=workout(id);if(!w)return false;const map=new Map(blocks(w).map(b=>[b[0].id,b]));
    if(order.length!==map.size||order.some(key=>!map.has(key)))return false;
    const list=order.flatMap(key=>map.get(key));if(list.map(r=>r.id).join()===w.exercises.map(r=>r.id).join())return false;
    put({...w,exercises:list});return true;}
  function moveBlock(id,blockId,delta){const w=workout(id);if(!w)return false;const order=blocks(w).map(b=>b[0].id),index=order.indexOf(blockId),to=index+delta;
    if(index<0||to<0||to>=order.length)return false;order.splice(to,0,...order.splice(index,1));return reorder(id,order);}
  function finish(id){const w=workout(id);if(!w)return 'Deze workout is niet beschikbaar.';
    if(invalid.size)return 'Controleer de gemarkeerde velden.';
    if(w.date>localToday())return 'Deze training staat in de toekomst. Pas de datum aan om hem te loggen.';
    if(w.kind==='gym'&&!hasDone(w))return 'Bevestig minstens één set.';
    if(w.kind==='run'&&(!w.distanceKm||!w.durationSeconds))return 'Vul je afstand en totale tijd in.';
    if(w.kind==='run'&&!runComplete(w))return 'Vul een geldige 5 km-testtijd in, niet langer dan je totale tijd, en minimaal 5 km afstand.';
    put({...w,logged:true});return '';
  }

  // ---- Library logic ----
  function saveExercise(x,fields){const name=fields.name.trim();
    if(!name)return 'Geef de oefening een naam.';
    if(exercises(true).some(o=>o.id!==x?.id&&o.name.toLowerCase()===name.toLowerCase()))return 'Er bestaat al een oefening met deze naam. Kies een naam die het verschil aangeeft.';
    if(!MUSCLES.some(m=>m[0]===fields.muscle)||!LOADS.some(l=>l[0]===fields.load))return 'Kies een spiergroep en een notatie.';
    return put({type:'exercise',id:x?.id||uuid(),name,muscle:fields.muscle,load:fields.load,archived:Boolean(fields.archived),updatedAt:0});
  }
  function saveTemplate(t){const slots=t.slots.map((s,i)=>({exerciseId:s.exerciseId,sets:s.sets,repMin:s.repMin,repMax:s.repMax,superset:Boolean(s.superset)&&i<t.slots.length-1}));
    return put({type:'template',id:t.id,name:t.name,slots,archived:Boolean(t.archived),updatedAt:0});}
  function newTemplate(){let n=1,name='Nieuwe template';while(templates(true).some(t=>t.name===name))name='Nieuwe template '+(++n);return saveTemplate({id:uuid(),name,slots:[],archived:false});}

  // ---- Navigation ----
  function go(hash,replace=false){window.history?.[replace?'replaceState':'pushState'](null,'','#'+hash);readView();renderView();window.scrollTo?.({top:0,behavior:'auto'});}
  function route(hash){let m;
    if(hash==='kalender'||hash==='bibliotheek'||hash==='run')return hash;
    if((m=/^workout\/([0-9a-f-]{36})$/i.exec(hash))){activeId=m[1];return 'workout';}
    if((m=/^toevoegen\/(\d{4}-\d{2}-\d{2})$/.exec(hash))&&validDate(m[1])){addDate=m[1];return 'toevoegen';}
    if((m=/^template\/([a-z0-9-]{1,64})$/.exec(hash))){activeTpl=m[1];return 'template';}
    return null;
  }
  function remember(){const from=(window.location?.hash||'').slice(1);if(from&&!from.startsWith('workout/')&&!from.startsWith('toevoegen/'))returnHash=from;}
  function open(id){remember();activeId=id;invalid.clear();go('workout/'+id);}
  function openAdd(date=localToday()){remember();addDate=validDate(date)?date:localToday();go('toevoegen/'+addDate);}
  function back(){if(activeView==='workout'&&workout(activeId))month=workout(activeId).date.slice(0,7);clearTimeout(dirtyTimer);flush();invalid.clear();const target=returnHash||'kalender';returnHash=null;go(target);}

  // ---- Calendar ----
  const completed = w => Boolean(w.logged);
  const label = w => w.logged?'Gelogd':w.date<localToday()?'Nog niet gelogd':w.date===localToday()?'Vandaag · gepland':'Gepland';
  const short = w => w.kind==='run'?(w.runStep?'R'+w.runStep:'Run'):w.title.length<=6?w.title:w.title.split(/\s+/).map(word=>word[0]).join('').slice(0,4).toUpperCase();
  function typeButton(t,picker=false){
    return '<button type="button" class="planner-template" '+(picker?'data-choose':'data-template')+'="'+escapeHtml(t.id)+'" '+(picker?'':'draggable="true"')+'><span class="session-symbol '+(t.kind==='run'?'run':'gym')+'">'+icon(t.kind==='run'?'run':'dumbbell')+'</span><b>'+escapeHtml(t.name)+'</b><p>'+t.lines.map(escapeHtml).join(picker?'<br>':', ')+'</p></button>';}
  function renderToday(){const items=workouts().filter(w=>w.date===localToday());
    $('plannerTodayDate').textContent=dateText(localToday());$('weekLine').textContent=weekText();
    $('plannerTodayItems').innerHTML=items.length?items.map(w=>'<button type="button" class="planner-today-item" data-open="'+w.id+'"><span class="session-symbol '+(w.kind==='run'?'run':'gym')+'">'+icon(w.kind==='run'?'run':'dumbbell')+'</span><span><b>'+escapeHtml(w.title)+'</b><small>'+escapeHtml(label(w))+'</small></span>'+icon('chevronRight')+'</button>').join(''):'<p class="planner-today-empty">Niets gepland</p>';
  }
  function renderCalendar(){
    renderToday();$('plannerTemplates').innerHTML=types().map(t=>typeButton(t)).join('');
    const first=new Date(month+'-01T12:00:00Z'),offset=(first.getUTCDay()+6)%7,days=new Date(Date.UTC(first.getUTCFullYear(),first.getUTCMonth()+1,0)).getUTCDate(),slots=Math.ceil((offset+days)/7)*7;
    $('plannerMonthTitle').textContent=first.toLocaleDateString('nl-NL',{month:'long',year:'numeric',timeZone:'UTC'});
    const list=workouts();let out='';
    for(let i=0;i<slots;i++){const n=i-offset+1;if(n<1||n>days){out+='<div class="planner-day other-month" aria-hidden="true"></div>';continue;}
      const date=month+'-'+String(n).padStart(2,'0'),day=list.filter(w=>w.date===date);
      out+='<div class="planner-day" data-planner-date="'+date+'"><button type="button" class="planner-day-head '+(date===localToday()?'is-today':'')+'" data-add-on="'+date+'" aria-label="Workout toevoegen op '+escapeHtml(dateText(date))+'"><span>'+n+'</span><span class="plus-day" aria-hidden="true">+</span></button><div class="planner-day-items">'+day.map(w=>
        '<button type="button" class="planner-event '+w.kind+(w.logged?'':' planned')+'" data-open="'+w.id+'" data-entry="'+w.id+'" draggable="true" aria-label="'+escapeHtml(w.title+' · '+label(w)+' · '+dateText(date))+'"><span><span class="event-full">'+escapeHtml(w.title)+'</span><span class="event-short" aria-hidden="true">'+escapeHtml(short(w))+'</span></span>'+icon(w.logged?'check':'clock')+'</button>'
      ).join('')+'</div></div>';
    }
    $('plannerDays').innerHTML=out;
    const own=list.filter(w=>w.date.startsWith(month));$('plannerMonthCount').textContent=own.filter(completed).length+' gedaan · '+own.filter(w=>!completed(w)).length+' gepland';
  }
  function finishDrag(){drag=null;$('plannerReturn').classList.remove('active');$('plannerDays').querySelectorAll('.drag-over').forEach(el=>el.classList.remove('drag-over'));}
  function renderPicker(){$('plannerAddDate').value=addDate;$('plannerPickerTemplates').innerHTML=types().map(t=>typeButton(t,true)).join('');}

  // ---- Workout editor ----
  function setRow(row,set,i,prev){const p=prev?.sets[i],name=escapeHtml(row.name),none=row.load==='none',n=i+1;
    return '<div class="set-row'+(set.done?' is-done':'')+(none?' no-weight':'')+'" data-set="'+set.id+'"><span class="planner-set-number">'+n+'</span>'
      +(none?'':'<input data-row="'+row.id+'" data-set-id="'+set.id+'" data-field="weightKg" type="text" inputmode="decimal" autocomplete="off" placeholder="'+(p&&p.weightKg!==null?kg(p.weightKg):'–')+'" value="'+(set.weightKg===null?'':kg(set.weightKg))+'" aria-label="Gewicht in kg, set '+n+' van '+name+'">')
      +'<input data-row="'+row.id+'" data-set-id="'+set.id+'" data-field="reps" type="text" inputmode="numeric" autocomplete="off" placeholder="'+(p?p.reps:'–')+'" value="'+(set.reps===null?'':set.reps)+'" aria-label="Herhalingen, set '+n+' van '+name+'">'
      +'<button type="button" class="set-tick" data-tick="'+set.id+'" data-row="'+row.id+'" aria-pressed="'+set.done+'" aria-label="Set '+n+' van '+name+(set.done?' is bevestigd. Tik om terug te zetten.':' bevestigen')+'">'+icon('check')+'</button></div>';
  }
  function card(w,row){const prev=previous(w,row),mate=row.pair?w.exercises.find(r=>r.pair===row.pair&&r.id!==row.id):null,name=escapeHtml(row.name),none=row.load==='none';
    const target=row.repMin?row.targetSets+' × '+(row.repMin===row.repMax?row.repMin:row.repMin+'–'+row.repMax):'';
    return '<article class="planner-exercise pane" data-exercise="'+row.id+'"><div class="ex-head"><button type="button" class="drag-handle" data-move="'+row.id+'" aria-label="Verplaats '+name+'. Sleep, of gebruik de pijltjestoetsen omhoog en omlaag.">'+icon('grip')+'</button><div class="ex-title"><h2>'+name+'</h2>'+(target?'<p class="ex-target">'+target+'</p>':'')+'<p>'+[LOAD_NOTE[row.load],mate?'superset met '+escapeHtml(mate.name):''].filter(Boolean).join(' · ')+'</p></div><button type="button" class="ex-action" data-swap="'+row.id+'" aria-label="'+name+' wisselen voor een andere oefening">Wissel</button><button type="button" class="ex-action icon-only" data-remove-exercise="'+row.id+'" aria-label="'+name+' verwijderen">'+icon('trash')+'</button></div>'
      +'<p class="exercise-previous">'+(prev?'Vorige keer ('+escapeHtml(dayShort(prev.date))+(prev.same?'':' · '+escapeHtml(prev.title))+'): <b>'+escapeHtml(prevText(prev))+'</b>':'Nog geen eerdere sets')+'</p>'
      +'<div class="set-head'+(none?' no-weight':'')+'" aria-hidden="true"><span>Set</span>'+(none?'':'<span>kg</span>')+'<span>Reps</span><span></span></div><div class="planner-set-list">'+row.sets.map((s,i)=>setRow(row,s,i,prev)).join('')+'</div>'
      +'<div class="set-actions"><button type="button" class="planner-add-set" data-add-set="'+row.id+'" aria-label="Set toevoegen aan '+name+'">'+icon('plus')+'Set</button>'+(row.sets.length>1?'<button type="button" class="planner-add-set minus" data-remove-set="'+row.id+'" aria-label="Laatste set van '+name+' verwijderen">Laatste set weg</button>':'')+'</div></article>';
  }
  function finishMarkup(w){return '<button type="button" id="finishBtn" class="primary run-log-confirm '+(w.logged?'logged':'')+'">'+(w.logged?'Gelogd · wijzigingen bewaren automatisch':'Training afronden')+'</button>'+(w.logged?'<button type="button" class="text-button run-log-edit" id="unfinishBtn">Terugzetten naar gepland</button>':'');}
  function formMetric(w,field,title,placeholder,mode='decimal'){const time=field==='durationSeconds'||field==='testSeconds',value=w[field]===null?'':time?timeText(w[field]):kg(w[field]);
    return '<label for="run-'+field+'">'+title+'<input id="run-'+field+'" data-run-field="'+field+'" type="text" inputmode="'+mode+'" autocomplete="off" placeholder="'+placeholder+'" value="'+escapeHtml(value)+'"></label>';}
  function paceLabel(r){return r.paceSeconds?(r.paceSeconds[0]===r.paceSeconds[1]?timeText(r.paceSeconds[0]):timeText(r.paceSeconds[0])+'–'+timeText(r.paceSeconds[1]))+' per km':'praattempo';}
  function runSteps(r){
    if(r.kind==='easy')return [{title:r.main,text:'Praattempo'}];
    return [{title:RUN.warmup,text:''},{title:r.main,text:(r.kind==='test'?'Start op ':'')+paceLabel(r)},...(r.recovery?[{title:'Herstel tussen de herhalingen',text:r.recovery}]:[]),{title:RUN.cooldown,text:''}];}
  function stepMarkup(r){return runSteps(r).map((s,i)=>'<div class="run-step"><span class="run-step-number">'+(i+1)+'</span><div><strong>'+escapeHtml(s.title[0].toUpperCase()+s.title.slice(1))+'</strong>'+(s.text?'<p>'+escapeHtml(s.text)+'</p>':'')+'</div></div>').join('')+'<p class="run-note">'+escapeHtml(r.note)+'</p>';}
  function renderEditor(force=false){
    const host=$('plannerEditor'),w=workout(activeId);
    if(!force&&host.contains?.(document.activeElement))return;
    if(!w||w.deleted){host.innerHTML='<div class="planner-no-workout">'+(!ready?'Workout laden…':!ok&&!CONFIG.preview?'Je workout is nog niet geladen. Controleer je verbinding; lokaal bewaarde workouts blijven beschikbaar.':w?.deleted?'Deze workout is uit de kalender gehaald.':'Deze workout is niet beschikbaar op dit apparaat.')+'</div>';return;}
    const gym=w.kind==='gym',r=w.runStep?RUN.runs[w.runStep-1]:null;
    const head='<header class="planner-editor-head"><div><div class="micro"><span class="session-symbol '+(gym?'gym':'run')+'" style="width:28px;height:28px;border-radius:'+(gym?'9px':'50%')+'">'+icon(gym?'dumbbell':'run')+'</span><span id="plannerWorkoutState">'+escapeHtml(label(w))+'</span></div><h1 id="plannerWorkoutTitle">'+escapeHtml(w.title)+'</h1></div><label class="planner-date-label" for="plannerWorkoutDate">Datum<input id="plannerWorkoutDate" type="date" value="'+w.date+'" required></label></header>';
    const body=gym
      ?'<div class="planner-exercises" id="plannerExercises">'+blocks(w).map(b=>'<div class="ex-block'+(b.length>1?' is-pair':'')+'" data-block="'+b[0].id+'">'+b.map(row=>card(w,row)).join('')+'</div>').join('')+'</div><button type="button" class="planner-add-exercise" id="addExercise">'+icon('plus')+'Oefening toevoegen</button>'
      :(r?'<section class="run-inline-plan pane" aria-label="Geplande training"><h2>'+escapeHtml(r.main)+' · '+escapeHtml(r.totalKm)+' km totaal</h2>'+stepMarkup(r)+'</section>':'')
        +'<div class="planner-run-form pane"><div class="planner-run-columns">'+formMetric(w,'distanceKm','Afstand (km)','5,0')+formMetric(w,'durationSeconds','Totale tijd (mm:ss)','27:30')+'</div><div class="planner-pace" id="plannerRunPace">'+(paceText(w.distanceKm,w.durationSeconds)||'')+'</div>'
        +(w.runStep===RUN.testStep?formMetric(w,'testSeconds','Tijd over de 5 km (mm:ss)','27:30')+'<p class="panel-sub">Alleen de 5 km-test, zonder in- en uitlopen.</p>':'')
        +formMetric(w,'averageHeartRate','Gemiddelde hartslag (optioneel)','150','numeric')
        +'<label for="plannerHamstring">Hamstring (optioneel)<select id="plannerHamstring"><option value="">Niet ingevuld</option>'+[['goed','Goed'],['licht','Voelbaar'],['erger','Pijnlijk']].map(([v,text])=>'<option value="'+v+'" '+(w.hamstring===v?'selected':'')+'>'+text+'</option>').join('')+'</select></label></div>';
    host.innerHTML=head+body+'<label class="workout-note" for="workoutNote">Notitie (optioneel)<textarea id="workoutNote" rows="2" maxlength="1000">'+escapeHtml(w.note)+'</textarea></label><p class="planner-notice" id="plannerFieldError" role="status"></p><div id="finishArea" class="finish-area">'+finishMarkup(w)+'</div><button type="button" class="planner-delete" id="deleteWorkout">Workout verwijderen</button>';
    status();
  }
  // Small in-place updates keep the scroll position and the keyboard open during training.
  function refreshState(){const w=workout(activeId);if(!w)return;if($('finishArea'))$('finishArea').innerHTML=finishMarkup(w);if($('plannerWorkoutState'))$('plannerWorkoutState').textContent=label(w);}
  function refreshCard(rowId){const w=workout(activeId),row=w?.exercises.find(r=>r.id===rowId),el=$('plannerEditor').querySelector?.('[data-exercise="'+rowId+'"]');if(row&&el)el.outerHTML=card(w,row);refreshState();}
  function numberField(value,max,integer=false,zero=false){
    if(value.trim()==='')return null;
    if(!/^(?:\d+(?:[.,]\d{0,3})?|[.,]\d{1,3})$/.test(value.trim()))return undefined;
    const n=Number(value.replace(',','.'));return Number.isFinite(n)&&n>=(zero?0:1)&&n<=max&&(!integer||Number.isInteger(n))?n:undefined;
  }
  function mark(input,name,bad){input.setAttribute('aria-invalid',String(bad));if(bad)invalid.add(name);else invalid.delete(name);status();
    if($('plannerFieldError'))$('plannerFieldError').textContent=invalid.size?'Controleer de gemarkeerde velden.':'';}
  function onSetInput(input){const field=input.dataset.field,setId=input.dataset.setId,value=field==='weightKg'?numberField(input.value,2000,false,true):numberField(input.value,1000,true);
    mark(input,setId+':'+field,value===undefined);if(value===undefined)return;
    setValue(activeId,input.dataset.row,setId,field,value);
    const set=workout(activeId).exercises.find(r=>r.id===input.dataset.row)?.sets.find(s=>s.id===setId),rowEl=input.closest('.set-row');
    if(set&&rowEl){rowEl.classList.toggle('is-done',set.done);rowEl.querySelector('[data-tick]')?.setAttribute('aria-pressed',String(set.done));}
    refreshState();
  }
  function onRunInput(input){const field=input.dataset.runField;let value;
    if(field==='durationSeconds'||field==='testSeconds')value=input.value.trim()===''?null:parseTime(input.value)||undefined;
    else if(field==='distanceKm'){value=numberField(input.value,1000,false,true);if(value===0)value=undefined;}
    else value=numberField(input.value,300,true);
    mark(input,'run:'+field,value===undefined);if(value===undefined)return;
    put({...workout(activeId),[field]:value});$('plannerRunPace').textContent=paceText(workout(activeId).distanceKm,workout(activeId).durationSeconds)||'';refreshState();
  }
  // Reordering: drag the grip with a finger or mouse, or focus it and use the arrow keys.
  function startSort(event,handle,host,selector,done){
    if(event.button!==0)return;event.preventDefault();
    const item=handle.closest(selector),pointer=event.pointerId;item.classList.add('dragging');document.body.classList.add('is-sorting');
    const move=e=>{if(e.pointerId!==pointer)return;e.preventDefault();
      const others=[...host.querySelectorAll(selector)].filter(el=>el!==item);
      const before=others.find(el=>{const box=el.getBoundingClientRect();return e.clientY<box.top+box.height/2;});
      if(before){if(item.nextElementSibling!==before)host.insertBefore(item,before);}else{const last=others.at(-1);if(last&&last.nextElementSibling!==item)last.after(item);}
      if(e.clientY<90)window.scrollBy(0,-14);else if(e.clientY>window.innerHeight-110)window.scrollBy(0,14);
    };
    // Listen on the window: moving the item in the DOM can release pointer capture.
    const end=e=>{if(e.pointerId!==pointer)return;
      window.removeEventListener('pointermove',move);window.removeEventListener('pointerup',end);window.removeEventListener('pointercancel',end);
      item.classList.remove('dragging');document.body.classList.remove('is-sorting');done([...host.querySelectorAll(selector)]);
    };
    window.addEventListener('pointermove',move,{passive:false});window.addEventListener('pointerup',end);window.addEventListener('pointercancel',end);
  }

  // ---- Library and templates ----
  const loadText = id => LOADS.find(l=>l[0]===id)?.[1]||'';
  function exerciseGroups(list,row){return MUSCLES.map(([id,name])=>{const items=list.filter(x=>x.muscle===id);return items.length?'<h3>'+escapeHtml(name)+'</h3>'+items.map(row).join(''):'';}).join('');}
  const matches = (x,q) => !q||x.name.toLowerCase().includes(q.trim().toLowerCase());
  function renderLibrary(){
    $('tplList').innerHTML=templates(true).filter(t=>showArchived||!t.archived).map(t=>'<a class="lib-card pane'+(t.archived?' is-archived':'')+'" href="#template/'+t.id+'"><b>'+escapeHtml(t.name)+'</b><small>'+t.slots.length+' oefeningen · '+t.slots.reduce((sum,s)=>sum+s.sets,0)+' sets'+(t.archived?' · gearchiveerd':'')+'</small><p>'+t.slots.map(s=>escapeHtml(exercise(s.exerciseId)?.name||'Onbekende oefening')).join(', ')+'</p></a>').join('')||'<p class="planner-today-empty">Nog geen templates</p>';
    const list=exercises(true).filter(x=>(showArchived||!x.archived)&&matches(x,search));
    $('exList').innerHTML=exerciseGroups(list,x=>'<button type="button" class="lib-row'+(x.archived?' is-archived':'')+'" data-edit-exercise="'+x.id+'"><span><b>'+escapeHtml(x.name)+'</b><small>'+escapeHtml(loadText(x.load))+(x.archived?' · gearchiveerd':'')+'</small></span>'+icon('chevronRight')+'</button>')||'<p class="planner-today-empty">Geen oefening gevonden</p>';
  }
  function slotRow(t,s,i){const name=escapeHtml(exercise(s.exerciseId)?.name||'Onbekende oefening'),field=(key,title,value)=>'<label>'+title+'<input class="field" type="text" inputmode="numeric" autocomplete="off" data-slot-field="'+key+'" data-i="'+i+'" value="'+value+'" aria-label="'+title+' voor '+name+'"></label>';
    return '<div class="slot-row pane" data-slot="'+i+'"><button type="button" class="drag-handle" data-move-slot="'+i+'" aria-label="Verplaats '+name+'. Sleep, of gebruik de pijltjestoetsen omhoog en omlaag.">'+icon('grip')+'</button><div class="slot-main"><h3>'+name+'</h3><div class="slot-fields">'+field('sets','Sets',s.sets)+field('repMin','Reps van',s.repMin)+field('repMax','tot',s.repMax)+'</div>'+(i<t.slots.length-1?'<label class="slot-super"><input type="checkbox" data-slot-field="superset" data-i="'+i+'" '+(s.superset?'checked':'')+'>Superset met de volgende oefening</label>':'')+'</div><button type="button" class="ex-action icon-only" data-remove-slot="'+i+'" aria-label="'+name+' uit de template halen">'+icon('trash')+'</button></div>';}
  function renderTemplate(force=false){const host=$('tplEditor'),t=tpl(activeTpl);
    if(!force&&host.contains?.(document.activeElement))return;
    if(!t){host.innerHTML='<div class="planner-no-workout">'+(ready?'Deze template bestaat niet.':'Template laden…')+'</div>';return;}
    host.innerHTML='<header class="planner-editor-head"><label class="tpl-name" for="tplName">Naam van de template<input class="field" id="tplName" type="text" maxlength="60" autocomplete="off" value="'+escapeHtml(t.name)+'"></label></header><p class="panel-sub tpl-hint">'+t.slots.length+' oefeningen · '+t.slots.reduce((sum,s)=>sum+s.sets,0)+' sets. Wijzigingen gelden voor workouts die je hierna toevoegt; wat al in je kalender staat verandert niet.</p><div class="tpl-slots" id="tplSlots">'+t.slots.map((s,i)=>slotRow(t,s,i)).join('')+'</div><button type="button" class="planner-add-exercise" id="tplAdd">'+icon('plus')+'Oefening toevoegen</button><p class="planner-notice" id="tplError" role="status"></p><button type="button" class="planner-delete" id="tplArchive">'+(t.archived?'Template terugzetten':'Template archiveren')+'</button>';
    status();
  }
  function onSlotInput(input){const t=tpl(activeTpl),i=Number(input.dataset.i),field=input.dataset.slotField,s=t?.slots[i];if(!s)return;
    if(field==='superset'){saveTemplate({...t,slots:t.slots.map((o,n)=>n===i?{...o,superset:input.checked}:o)});return;}
    const value=numberField(input.value,field==='sets'?10:100,true),next={...s,[field]:value};
    const bad=value===undefined||value===null||next.repMin>next.repMax;
    mark(input,'slot:'+i+':'+field,bad);$('tplError').textContent=bad?(value!==undefined&&value!==null?'Het laagste aantal herhalingen kan niet hoger zijn dan het hoogste.':'Vul een heel getal in.'):'';
    if(!bad)saveTemplate({...t,slots:t.slots.map((o,n)=>n===i?next:o)});
  }

  // ---- Sheet: pick an exercise or edit one ----
  function openSheet(title,html){$('sheetTitle').textContent=title;$('sheetBody').innerHTML=html;$('sheet').hidden=false;document.body.classList.add('sheet-open');}
  function closeSheet(){$('sheet').hidden=true;$('sheetBody').innerHTML='';document.body.classList.remove('sheet-open');sheetCtx=null;}
  function exerciseForm(x,after){sheetCtx={kind:'exercise',x,after};const option=(list,current)=>list.map(([id,name])=>'<option value="'+id+'" '+(id===current?'selected':'')+'>'+escapeHtml(name)+'</option>').join('');
    openSheet(x?'Oefening bewerken':'Nieuwe oefening','<form id="exForm" class="sheet-form" novalidate><label for="exName">Naam<input class="field" id="exName" type="text" maxlength="60" autocomplete="off" value="'+escapeHtml(x?.name||'')+'"></label><label for="exMuscle">Spiergroep<select class="field" id="exMuscle">'+option(MUSCLES,x?.muscle||'borst')+'</select></label><label for="exLoad">Gewicht noteren als<select class="field" id="exLoad">'+option(LOADS,x?.load||'total')+'</select></label>'+(x?'<p class="panel-sub">Je geschiedenis blijft bij deze oefening, ook als je de naam verandert. Eerdere sets houden de notatie waarmee je ze hebt ingevuld.</p>':'<p class="panel-sub">Train je dezelfde oefening op twee verschillende machines, maak er dan twee oefeningen van. Zo blijft je vorige keer vergelijkbaar.</p>')+'<p class="planner-notice" id="exError" role="status"></p><button type="submit" class="primary">Opslaan</button>'+(x?'<button type="button" class="text-button" id="exArchive">'+(x.archived?'Terugzetten in je library':'Archiveren')+'</button>':'')+'</form>');
    $('exName').focus?.();
  }
  function renderPick(){const list=exercises().filter(x=>matches(x,sheetCtx.q));
    $('pickList').innerHTML=exerciseGroups(list,x=>'<button type="button" class="lib-row" data-pick="'+x.id+'"><span><b>'+escapeHtml(x.name)+'</b><small>'+escapeHtml(loadText(x.load))+'</small></span>'+icon('plus')+'</button>')||'<p class="planner-today-empty">Geen oefening gevonden</p>';}
  function pickExercise(title,done){sheetCtx={kind:'pick',done,q:'',title};
    openSheet(title,'<input class="field" id="pickSearch" type="search" placeholder="Zoek een oefening" autocomplete="off" aria-label="Zoek een oefening"><div id="pickList" class="lib-list pick-list"></div><button type="button" class="planner-add-exercise" id="pickNew">'+icon('plus')+'Nieuwe oefening</button>');renderPick();}

  // ---- 5 km ----
  function runState(w,next){return w?.logged?{label:'Gelogd',css:'logged',mark:'check'}:w?(w.date<localToday()?{label:'Nog niet gelogd',css:'late',mark:'clock'}:{label:dayShort(w.date),css:'scheduled',mark:'clock'}):next?{label:'Volgende',css:'next',mark:'arrowRight'}:null;}
  function renderRun(){const logged=RUN.runs.filter(r=>runWorkout(r.step)?.logged).length,next=nextOpen(),test=runWorkout(RUN.testStep),result=test?.logged?test.testSeconds:null;
    const baseDate=new Date(RUN.baselineDate+'T12:00:00Z').toLocaleDateString('nl-NL',{day:'numeric',month:'long',year:'numeric',timeZone:'UTC'});
    $('runView').innerHTML='<section class="run-summary glass" aria-label="Doel en nulmeting"><div><span class="micro">Doel</span><h2>5 km in '+timeText(RUN.goalSeconds)+'</h2><p>'+timeText(RUN.goalSeconds/5)+' per km</p></div><div class="run-baseline"><span>'+(result?'Eindtest':'Nulmeting')+'</span><strong>'+timeText(result||RUN.baselineSeconds)+'</strong><small>'+(result?'Nulmeting was '+timeText(RUN.baselineSeconds):timeText(RUN.baselineSeconds/5)+' per km · '+escapeHtml(baseDate))+'</small></div><div class="run-progress"><strong>'+logged+' / '+RUN.runs.length+'</strong><span>runs gelogd</span><div class="run-progress-track"><i style="width:'+(logged/RUN.runs.length*100)+'%"></i></div></div></section>'
      +'<p class="panel-sub run-intro">Je loopt de runs in volgorde, één per week. Sla je een week over, dan schuift de reeks op. Voelt een snelle run te zwaar, herhaal hem dan als losse run voordat je verdergaat.</p><div class="run-list">'
      +RUN.runs.map(r=>{const w=runWorkout(r.step),s=runState(w,next===r.step);
        return '<details class="run-card pane'+(next===r.step?' is-next':'')+'" '+(next===r.step?'open':'')+'><summary><span class="run-num">'+r.step+'</span><span class="run-card-title"><b>'+escapeHtml(r.title)+'</b><small>'+escapeHtml(r.main)+' · '+escapeHtml(paceLabel(r))+'</small></span>'+(s?'<span class="status-tag '+s.css+'">'+icon(s.mark)+escapeHtml(s.label)+'</span>':'')+'</summary><div class="run-card-body">'+stepMarkup(r)+'<button type="button" class="'+(next===r.step?'primary':'ghost')+'" data-run-open="'+r.step+'">'+(w?'Training openen':'Inplannen voor vandaag')+'</button></div></details>';}).join('')+'</div>';
  }

  // ---- Rendering ----
  function renderNav(){if(lastView!==activeView){if(lastView){invalid.clear();if(sheetCtx)closeSheet();}lastView=activeView;}const name=activeView==='bibliotheek'||activeView==='template'?'bibliotheek':activeView==='run'?'run':'kalender';
    document.querySelectorAll('[data-main-nav]').forEach(a=>{if(a.dataset.mainNav===name)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
    document.body.classList?.toggle?.('planner-editing',['workout','toevoegen','template'].includes(activeView));$('localNote').hidden=!CONFIG.preview;}
  function render(){
    renderNav();renderCalendar();
    if(activeView==='toevoegen')renderPicker();if(activeView==='workout')renderEditor();
    if(activeView==='bibliotheek')renderLibrary();if(activeView==='template')renderTemplate();if(activeView==='run')renderRun();
    status();
  }
  function refresh(force=false){render();if(force&&activeView==='workout')renderEditor(true);if(force&&activeView==='template')renderTemplate(true);}
  function changeMonth(delta){const d=new Date(month+'-01T12:00:00Z');d.setUTCMonth(d.getUTCMonth()+delta);month=d.toISOString().slice(0,7);renderCalendar();}
  function checkDay(){if(lastDay!==localToday()){lastDay=localToday();refresh();}}

  // ---- Events: one delegated listener per area, so partial re-renders need no rebinding. ----
  function initialize(){
    read();
    const on=(id,type,handler,options)=>$(id).addEventListener(type,handler,options),hit=(event,selector)=>event.target.closest?.(selector);
    on('retrySync','click',()=>{clearTimeout(retryTimer);load();});on('plannerAddToday','click',()=>openAdd());on('plannerAddBack','click',back);on('plannerWorkoutBack','click',back);
    on('plannerPrevMonth','click',()=>changeMonth(-1));on('plannerNextMonth','click',()=>changeMonth(1));
    on('plannerAddDate','change',event=>{if(validDate(event.target.value))addDate=event.target.value;});
    on('plannerPickerTemplates','click',event=>{const b=hit(event,'[data-choose]');if(!b)return;const date=$('plannerAddDate').value;if(!validDate(date)){$('plannerAddDate').reportValidity?.();return;}returnHash=returnHash||'kalender';add(b.dataset.choose,date);});
    on('plannerTodayItems','click',event=>{const b=hit(event,'[data-open]');if(b)open(b.dataset.open);});
    on('plannerTemplates','click',event=>{const b=hit(event,'[data-template]');if(b)add(b.dataset.template,localToday());});
    on('plannerTemplates','dragstart',event=>{const b=hit(event,'[data-template]');if(!b)return;drag={typeId:b.dataset.template};event.dataTransfer.setData('text/plain',b.dataset.template);event.dataTransfer.effectAllowed='copy';});
    on('plannerDays','click',event=>{const e=hit(event,'[data-open]');if(e){open(e.dataset.open);return;}const d=hit(event,'[data-add-on]');if(d)openAdd(d.dataset.addOn);});
    on('plannerDays','dragstart',event=>{const e=hit(event,'[data-entry]');if(!e)return;drag={id:e.dataset.entry};event.dataTransfer.setData('text/plain',e.dataset.entry);event.dataTransfer.effectAllowed='move';});
    on('plannerDays','dragover',event=>{const cell=hit(event,'[data-planner-date]');if(!drag||!cell)return;event.preventDefault();cell.classList.add('drag-over');event.dataTransfer.dropEffect=drag.id?'move':'copy';});
    on('plannerDays','dragleave',event=>{const cell=hit(event,'[data-planner-date]');if(cell&&!cell.contains(event.relatedTarget))cell.classList.remove('drag-over');});
    on('plannerDays','drop',event=>{const cell=hit(event,'[data-planner-date]');if(!cell)return;event.preventDefault();const date=cell.dataset.plannerDate;
      if(drag?.id&&workout(drag.id)){put({...workout(drag.id),date});refresh();}else if(drag?.typeId)add(drag.typeId,date,false);finishDrag();});
    const area=$('plannerReturn');area.addEventListener('dragover',event=>{if(!drag?.id)return;event.preventDefault();area.classList.add('active');event.dataTransfer.dropEffect='move';});area.addEventListener('dragleave',()=>area.classList.remove('active'));area.addEventListener('drop',event=>{event.preventDefault();if(drag?.id)remove(drag.id);finishDrag();});
    window.addEventListener('dragend',finishDrag);

    // Workout editor
    on('plannerEditor','input',event=>{const t=event.target;
      if(t.dataset.field)onSetInput(t);else if(t.dataset.runField)onRunInput(t);
      else if(t.id==='workoutNote')put({...workout(activeId),note:t.value});});
    on('plannerEditor','change',event=>{const t=event.target;
      if(t.id==='plannerWorkoutDate'){if(!validDate(t.value)){t.reportValidity?.();return;}put({...workout(activeId),date:t.value});refreshState();renderCalendar();}
      else if(t.id==='plannerHamstring')put({...workout(activeId),hamstring:t.value||null});});
    on('plannerEditor','click',event=>{let b;
      if((b=hit(event,'[data-tick]'))){if(tick(activeId,b.dataset.row,b.dataset.tick))refreshCard(b.dataset.row);}
      else if((b=hit(event,'[data-add-set]'))){if(addSet(activeId,b.dataset.addSet))refreshCard(b.dataset.addSet);}
      else if((b=hit(event,'[data-remove-set]'))){if(removeLastSet(activeId,b.dataset.removeSet))refreshCard(b.dataset.removeSet);}
      else if((b=hit(event,'[data-swap]'))){const rowId=b.dataset.swap;pickExercise('Wissel voor',x=>{if(swapExercise(activeId,rowId,x)){renderEditor(true);toast('Oefening gewisseld');}});}
      else if((b=hit(event,'[data-remove-exercise]'))){removeExercise(activeId,b.dataset.removeExercise);renderEditor(true);}
      else if(hit(event,'#addExercise'))pickExercise('Oefening toevoegen',x=>{if(addExercise(activeId,x))renderEditor(true);});
      else if(hit(event,'#finishBtn')){if(workout(activeId)?.logged)return;const error=finish(activeId);$('plannerFieldError').textContent=error;
        if(error)$('plannerFieldError').scrollIntoView?.({block:'center',behavior:'smooth'});else{refreshState();renderCalendar();toast('Training gelogd');}}
      else if(hit(event,'#unfinishBtn')){put({...workout(activeId),logged:false});refreshState();renderCalendar();}
      else if(hit(event,'#deleteWorkout'))remove(activeId);
    });
    on('plannerEditor','pointerdown',event=>{const handle=hit(event,'[data-move]'),host=$('plannerExercises');if(!handle||!host)return;
      startSort(event,handle,host,'.ex-block',items=>{if(reorder(activeId,items.map(el=>el.dataset.block)))toast('Volgorde aangepast');});});
    on('plannerEditor','keydown',event=>{const handle=hit(event,'[data-move]');if(!handle||(event.key!=='ArrowUp'&&event.key!=='ArrowDown'))return;event.preventDefault();
      const block=handle.closest('.ex-block').dataset.block;if(moveBlock(activeId,block,event.key==='ArrowUp'?-1:1)){renderEditor(true);$('plannerEditor').querySelector('[data-move="'+handle.dataset.move+'"]')?.focus();}});

    // Library and templates
    on('tplNew','click',()=>{const t=newTemplate();go('template/'+t.id);});on('exNew','click',()=>exerciseForm(null,null));
    on('exSearch','input',event=>{search=event.target.value;renderLibrary();});on('exArchived','change',event=>{showArchived=event.target.checked;renderLibrary();});
    on('exList','click',event=>{const b=hit(event,'[data-edit-exercise]');if(b)exerciseForm(exercise(b.dataset.editExercise),null);});
    on('tplEditor','input',event=>{const t=event.target;
      if(t.id==='tplName'){const name=t.value.trim();mark(t,'tpl:name',!name);if(name)saveTemplate({...tpl(activeTpl),name});}
      else if(t.dataset.slotField&&t.type!=='checkbox')onSlotInput(t);});
    on('tplEditor','change',event=>{if(event.target.dataset.slotField==='superset')onSlotInput(event.target);});
    on('tplEditor','click',event=>{let b;const t=tpl(activeTpl);if(!t)return;
      if((b=hit(event,'[data-remove-slot]'))){saveTemplate({...t,slots:t.slots.filter((s,i)=>i!==Number(b.dataset.removeSlot))});invalid.clear();renderTemplate(true);}
      else if(hit(event,'#tplAdd'))pickExercise('Oefening toevoegen',x=>{const now=tpl(activeTpl);if(now.slots.length>=20){toast('Maximaal 20 oefeningen per template');return;}saveTemplate({...now,slots:[...now.slots,{exerciseId:x.id,sets:3,repMin:8,repMax:12,superset:false}]});renderTemplate(true);});
      else if(hit(event,'#tplArchive')){saveTemplate({...t,archived:!t.archived});toast(t.archived?'Template teruggezet':'Template gearchiveerd');go('bibliotheek');}
    });
    const moveSlots=order=>{const t=tpl(activeTpl);if(order.join()===t.slots.map((s,i)=>i).join())return false;saveTemplate({...t,slots:order.map(i=>({...t.slots[i],superset:false}))});invalid.clear();renderTemplate(true);return true;};
    on('tplEditor','pointerdown',event=>{const handle=hit(event,'[data-move-slot]'),host=$('tplSlots');if(!handle||!host)return;
      startSort(event,handle,host,'.slot-row',items=>{if(moveSlots(items.map(el=>Number(el.dataset.slot))))toast('Volgorde aangepast. Supersets zijn losgekoppeld.');});});
    on('tplEditor','keydown',event=>{const handle=hit(event,'[data-move-slot]');if(!handle||(event.key!=='ArrowUp'&&event.key!=='ArrowDown'))return;event.preventDefault();
      const t=tpl(activeTpl),i=Number(handle.dataset.moveSlot),to=i+(event.key==='ArrowUp'?-1:1);if(to<0||to>=t.slots.length)return;
      const order=t.slots.map((s,n)=>n);order.splice(to,0,...order.splice(i,1));if(moveSlots(order))$('tplEditor').querySelector('[data-move-slot="'+to+'"]')?.focus();});

    // Sheet
    on('sheetClose','click',closeSheet);on('sheet','click',event=>{if(event.target.id==='sheet')closeSheet();});
    on('sheetBody','input',event=>{if(event.target.id==='pickSearch'&&sheetCtx?.kind==='pick'){sheetCtx.q=event.target.value;renderPick();}});
    on('sheetBody','click',event=>{let b;const ctx=sheetCtx;if(!ctx)return;
      if((b=hit(event,'[data-pick]'))){const x=exercise(b.dataset.pick);closeSheet();ctx.done(x);}
      else if(hit(event,'#pickNew'))exerciseForm(null,ctx);
      else if(hit(event,'#exArchive')){const saved=saveExercise(ctx.x,{name:ctx.x.name,muscle:ctx.x.muscle,load:ctx.x.load,archived:!ctx.x.archived});if(typeof saved==='string'){$('exError').textContent=saved;return;}closeSheet();refresh();toast(saved.archived?'Oefening gearchiveerd':'Oefening teruggezet');}
    });
    on('sheetBody','submit',event=>{event.preventDefault();const ctx=sheetCtx;if(ctx?.kind!=='exercise')return;
      const saved=saveExercise(ctx.x,{name:$('exName').value,muscle:$('exMuscle').value,load:$('exLoad').value,archived:ctx.x?.archived});
      if(typeof saved==='string'){$('exError').textContent=saved;return;}
      closeSheet();if(ctx.after)ctx.after.done(saved);else{refresh(true);toast('Oefening opgeslagen');}});
    document.addEventListener?.('keydown',event=>{if(event.key==='Escape'&&!$('sheet').hidden)closeSheet();});

    // 5 km
    on('runView','click',event=>{const b=hit(event,'[data-run-open]');if(!b)return;const step=Number(b.dataset.runOpen),w=runWorkout(step);if(w)open(w.id);else add('run:'+step,localToday());});

    window.addEventListener('online',()=>load());window.addEventListener('focus',()=>{checkDay();if(!ok||pending.size)load();});
    window.addEventListener('storage',event=>{
      if(event.key!==key||!event.newValue)return;try{const other=JSON.parse(event.newValue);if(other.version!==2)return;
        for(const [k,d] of Object.entries(other.docs||{}))if(shape(d)&&k===dkey(d)&&(!docs[k]||d.updatedAt>docs[k].updatedAt)){docs[k]=d;if(other.pending?.includes(k))pending.add(k);}
        refresh();if(pending.size)flush();
      }catch{}
    });
    setInterval(checkDay,60000);document.addEventListener?.('visibilitychange',()=>{if(!document.hidden){checkDay();if(pending.size)flush();}});
  }
  return {initialize,load,flush,render,refresh,route,open,openAdd,add,remove,types,put,docs:()=>docs,pending:()=>pending,cacheKey:key,
    exercises,exercise,templates,tpl,workouts,workout,previous,prevText,tick,setValue,addSet,removeLastSet,addExercise,swapExercise,removeExercise,blocks,reorder,moveBlock,finish,
    saveExercise,saveTemplate,newTemplate,weekStats,weekText,nextStep,nextOpen,runWorkout,paceLabel,numberField,status,exportData:()=>({docs})};
})();
App.initialize();
`;
