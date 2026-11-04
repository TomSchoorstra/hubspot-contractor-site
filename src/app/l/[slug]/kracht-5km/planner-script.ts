export const PLANNER_SCRIPT = String.raw`const Planner = (() => {
  const templates = CONFIG.workoutTemplates || [];
  const key = 'workout-planner-v1-'+CONFIG.rowId+(CONFIG.preview?'-voorbeeld':'');
  const template = id => templates.find(t=>t.id===id);
  const uuid = () => crypto.randomUUID();
  const idOk = value => typeof value === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
  const nullable = (value,max,integer=false,zero=false) => value === null || Number.isFinite(value) && value >= (zero?0:1) && value<=max && (!integer||Number.isInteger(value));
  function upgrade(e){
    if(!e||!idOk(e.id)||!template(e.templateId)||!validDate(e.date)||typeof e.deleted!=='boolean'||!Number.isSafeInteger(e.updatedAt)||e.updatedAt<=0||e.updatedAt>8640000000000000||!Array.isArray(e.exercises)||e.exercises.length>40)return null;
    const ids=new Set(),exercises=[];
    for(const row of e.exercises){
      if(!row||!idOk(row.id)||ids.has(row.id)||typeof row.name!=='string'||row.name.length>100)return null;
      ids.add(row.id);let sets,legacySummary;
      if(Array.isArray(row.sets)){
        if(row.sets.length>100)return null;
        const setIds=new Set();sets=[];
        for(const set of row.sets){if(!set||!idOk(set.id)||setIds.has(set.id)||!nullable(set.reps,1000,true)||!nullable(set.weightKg,2000,false,true))return null;setIds.add(set.id);sets.push({id:set.id,reps:set.reps,weightKg:set.weightKg});}
        if(row.legacySummary!==undefined){const old=row.legacySummary;if(!old||!nullable(old.sets,100,true)||!nullable(old.reps,1000,true)||!nullable(old.weightKg,2000,false,true))return null;legacySummary={sets:old.sets,reps:old.reps,weightKg:old.weightKg};}
      }else{
        if(!nullable(row.sets,100,true)||!nullable(row.reps,1000,true)||!nullable(row.weightKg,2000,false,true))return null;
        legacySummary={sets:row.sets,reps:row.reps,weightKg:row.weightKg};
        sets=Array.from({length:row.sets??1},(_,index)=>({id:row.id.slice(0,24)+(BigInt('0x'+row.id.slice(24))^BigInt(index)).toString(16).padStart(12,'0'),reps:row.reps,weightKg:row.weightKg}));
      }
      exercises.push({id:row.id,name:row.name,sets,...(legacySummary?{legacySummary}:{})});
    }
    if(!nullable(e.distanceKm,1000,false,true)||e.distanceKm===0||!nullable(e.durationSeconds,86400,true)||!nullable(e.averageHeartRate,300,true)||![null,'goed','licht','erger'].includes(e.hamstring)||typeof e.note!=='string'||e.note.length>1000)return null;
    if(template(e.templateId).kind==='gym'?(e.distanceKm!==null||e.durationSeconds!==null||e.averageHeartRate!==null):exercises.length!==0)return null;
    return {...e,exercises};
  }
  function valid(e){return Boolean(upgrade(e));}
  function migrateDrafts(){
    for(const [id,fields] of Object.entries(drafts)){
      for(const [name,value] of Object.entries(fields)){
        const parts=name.split(':');if(parts.length!==2)continue;
        const row=entries[id]?.exercises.find(r=>r.id===parts[0]);if(!row)continue;
        if(parts[1]==='sets'){if(!legacyDrafts[id])legacyDrafts[id]={};legacyDrafts[id][name]=value;delete fields[name];}
        else if(['reps','weightKg'].includes(parts[1])){for(const set of row.sets)fields[row.id+':'+set.id+':'+parts[1]]=value;delete fields[name];}
      }
    }
  }
  let entries={},pending=new Set(),drafts={},legacyDrafts={},month=localToday().slice(0,7),activeId=null,addDate=localToday();
  let ready=CONFIG.preview,ok=CONFIG.preview,localOk=true,saving=false,mode='cloud',dirtyTimer=null,retryTimer=null,retryDelay=3000,loading=false,drag=null,lastDay=localToday(),lastUndo=null;
  const completed = e => !e.deleted && e.date<localToday();
  function visible(){return Object.values(entries).filter(e=>!e.deleted);}
  function asTraining(){return visible().map(e=>({...e,kind:template(e.templateId).kind,title:template(e.templateId).name,done:completed(e),week:null,legacy:false,planner:true,recordedAt:new Date(e.updatedAt).toISOString()}));}
  function cache(){try{localStorage.setItem(key,JSON.stringify({version:1,resetId:CONFIG.resetId||null,entries,pending:[...pending],drafts,legacyDrafts}));localOk=true;}catch{localOk=false;}}
  function read(){
    try{const c=JSON.parse(localStorage.getItem(key)||'null');if(!c||c.version!==1)return;
      if(CONFIG.resetId&&c.resetId!==CONFIG.resetId){cache();return;}
      for(const [id,e] of Object.entries(c.entries||{}))if(id===e.id){const normalized=upgrade(e);if(normalized)entries[id]=normalized;}
      pending=new Set((Array.isArray(c.pending)?c.pending:[]).filter(id=>entries[id]));
      if(c.drafts&&typeof c.drafts==='object')for(const [id,fields] of Object.entries(c.drafts))if(entries[id]&&fields&&typeof fields==='object')drafts[id]=Object.fromEntries(Object.entries(fields).filter(([name,v])=>name.length<150&&typeof v==='string'&&v.length<=1000));
      if(c.legacyDrafts&&typeof c.legacyDrafts==='object')for(const [id,fields] of Object.entries(c.legacyDrafts))if(entries[id]&&fields&&typeof fields==='object')legacyDrafts[id]=Object.fromEntries(Object.entries(fields).filter(([name,v])=>name.length<150&&typeof v==='string'&&v.length<=1000));
      migrateDrafts();cache();
    }catch{localOk=false;}
  }
  function saveText(){
    if(!localOk&&!ok)return {status:'error',text:'Niet opgeslagen · laat dit scherm open'};
    if(activeId&&Object.keys(drafts[activeId]||{}).length)return {status:'error',text:'Controleer de gemarkeerde velden'};
    if(CONFIG.preview)return {status:localOk?'ok':'error',text:localOk?'Alleen lokaal opgeslagen':'Niet opgeslagen op dit apparaat'};
    if(saving)return {status:'saving',text:'Opslaan…'};
    if(pending.size||!ok)return {status:ok?'saving':'offline',text:localOk?(ok?'Opslaan…':'Alleen lokaal opgeslagen'):'Niet opgeslagen · probeer opnieuw'};
    if(!ready)return {status:'saving',text:'Laden…'};
    return {status:'ok',text:mode==='local'?'Alleen lokaal opgeslagen':'Opgeslagen'};
  }
  function status(){const s=saveText();$('plannerEditorSave').textContent=s.text;$('plannerEditorSave').dataset.status=s.status;
    $('syncText').textContent=s.text;$('syncLine').dataset.status=s.status==='error'?'offline':s.status;$('retrySync').hidden=CONFIG.preview||ok;
  }
  async function transport(method,body){const control=new AbortController(),timer=setTimeout(()=>control.abort(),8000);try{
    const response=await fetch(CONFIG.plannerApi||'/api/workout-sessions',{method,cache:'no-store',headers:{'Content-Type':'application/json','x-loop-key':CONFIG.apiKey},...(body?{body:JSON.stringify(body)}:{}),signal:control.signal});
    if(!response.ok)throw Error('HTTP '+response.status);return await response.json();
  }finally{clearTimeout(timer);}}
  function retry(){clearTimeout(retryTimer);retryTimer=setTimeout(()=>{if(!ready||!ok)load();else flush();},retryDelay);retryDelay=Math.min(retryDelay*2,30000);}
  async function flush(){
    if(CONFIG.preview||saving||loading||!ready)return;clearTimeout(dirtyTimer);saving=true;status();
    try{while(pending.size){const id=[...pending][0],snapshot=JSON.parse(JSON.stringify(entries[id]));await transport('POST',{entry:snapshot});if(entries[id].updatedAt===snapshot.updatedAt)pending.delete(id);cache();}ok=true;retryDelay=3000;}
    catch{ok=false;retry();}finally{saving=false;status();}
  }
  async function load(){
    if(CONFIG.preview){ready=true;ok=true;refresh();return;}if(loading)return;loading=true;status();
    try{const result=await transport('GET');if(result.data?.version!==1||!result.data.entries||typeof result.data.entries!=='object')throw Error('Invalid workouts');
      const remote={};for(const [id,e] of Object.entries(result.data.entries)){const normalized=upgrade(e);if(id!==e.id||!normalized)throw Error('Invalid workout');remote[id]=normalized;}
      for(const id of pending)remote[id]=entries[id];entries=remote;mode=result.data.storage==='local'?'local':'cloud';ok=true;retryDelay=3000;cache();
    }catch{ok=false;retry();}finally{loading=false;ready=true;refresh();if(pending.size)flush();}
  }
  function persist(e){e.updatedAt=Math.max(Date.now(),(entries[e.id]?.updatedAt||0)+1);entries[e.id]=e;pending.add(e.id);cache();status();clearTimeout(dirtyTimer);dirtyTimer=setTimeout(flush,550);}
  function scheduleRoute(hash,replace=false){window.history?.[replace?'replaceState':'pushState'](null,'','#'+hash);readView();renderView();refresh();window.scrollTo?.({top:0,behavior:'auto'});}
  function open(id){if(!idOk(id))return;activeId=id;scheduleRoute('workout/'+id);}
  function openAdd(date=localToday()){addDate=validDate(date)?date:localToday();scheduleRoute('toevoegen/'+addDate);}
  function back(){if(activeId&&entries[activeId])month=entries[activeId].date.slice(0,7);clearTimeout(dirtyTimer);flush();scheduleRoute('kalender');}
  function route(hash){const match=/^workout\/([0-9a-f-]{36})$/i.exec(hash);if(match&&idOk(match[1])){activeId=match[1];return 'workout';}const add=/^toevoegen\/(\d{4}-\d{2}-\d{2})$/.exec(hash);if(add&&validDate(add[1])){addDate=add[1];return 'toevoegen';}return null;}
  function create(templateId,date,show=true){const t=template(templateId);if(!t||!validDate(date))return;
    const e={id:uuid(),templateId,date,deleted:false,updatedAt:Date.now(),exercises:t.exercises.map(name=>({id:uuid(),name,sets:[{id:uuid(),reps:null,weightKg:null}]})),distanceKm:null,durationSeconds:null,averageHeartRate:null,hamstring:null,note:''};
    persist(e);month=date.slice(0,7);if(show)open(e.id);else{refresh();toast(t.name+' toegevoegd');}return e;
  }
  function remove(id){const e=entries[id];if(!e||e.deleted)return;lastUndo=id;persist({...e,deleted:true});if(activeView==='workout')back();else refresh();
    toast('Workout verwijderd');const undo=document.createElement('button');undo.type='button';undo.className='planner-undo';undo.textContent='Ongedaan maken';undo.addEventListener('click',()=>{if(lastUndo===id){persist({...entries[id],deleted:false});lastUndo=null;refresh();toast('Workout hersteld');}});$('toast').appendChild(undo);clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('toast').classList.remove('on'),8000);
  }
  const dateText = date => new Date(date+'T12:00:00Z').toLocaleDateString('nl-NL',{day:'numeric',month:'long',weekday:'long',timeZone:'UTC'});
  const label = e => e.planner ? (e.date<localToday()?'Gedaan':e.date===localToday()?'Vandaag · gepland':'Gepland') : 'Uit je eerdere logboek';
  function templateButton(t,picker=false){return '<button type="button" class="planner-template" '+(picker?'data-choose':'data-template')+'="'+t.id+'" '+(picker?'':'draggable="true"')+'><span class="session-symbol">'+icon(t.kind==='run'?'run':'dumbbell')+'</span><b>'+escapeHtml(t.name)+'</b>'+ (t.exercises.length?'<p>'+t.exercises.map(escapeHtml).join('<br>')+'</p>':'<p>Afstand · tijd · hartslag</p>')+'</button>';}
  function calendarEntries(){return asTraining();}
  function openEntry(e){open(e.id);}
  function renderToday(host,compact=false){const items=calendarEntries().filter(e=>e.date===localToday());
    host.innerHTML=items.length?items.map(e=>'<button type="button" class="planner-today-item" data-today-id="'+escapeHtml(e.id)+'"><span class="session-symbol">'+icon(e.kind==='run'?'run':'dumbbell')+'</span><span><b>'+escapeHtml(e.title)+'</b><small>'+escapeHtml(label(e))+'</small></span>'+icon('chevronRight')+'</button>').join(''):'<p class="planner-today-empty">Niets gepland</p>';
    host.querySelectorAll('[data-today-id]').forEach(b=>b.addEventListener('click',()=>openEntry(items.find(e=>e.id===b.dataset.todayId))));
    if(compact){const b=document.createElement('button');b.type='button';b.className='arrow-link';b.textContent='+ Workout toevoegen';b.addEventListener('click',()=>openAdd());host.appendChild(b);}
  }
  function renderCalendar(){
    $('plannerTodayDate').textContent=dateText(localToday());renderToday($('plannerTodayItems'));
    $('plannerTemplates').innerHTML=templates.map(t=>templateButton(t)).join('');
    $('plannerTemplates').querySelectorAll('[data-template]').forEach(b=>{b.addEventListener('click',()=>create(b.dataset.template,localToday()));b.addEventListener('dragstart',event=>{drag={templateId:b.dataset.template};event.dataTransfer.setData('text/plain',JSON.stringify(drag));event.dataTransfer.effectAllowed='copy';});});
    const first=new Date(month+'-01T12:00:00Z'),offset=(first.getUTCDay()+6)%7,days=new Date(Date.UTC(first.getUTCFullYear(),first.getUTCMonth()+1,0)).getUTCDate(),slots=Math.ceil((offset+days)/7)*7;
    $('plannerMonthTitle').textContent=first.toLocaleDateString('nl-NL',{month:'long',year:'numeric',timeZone:'UTC'});
    const list=calendarEntries(),byId=new Map(list.map(e=>[e.id,e]));let out='';
    for(let i=0;i<slots;i++){const n=i-offset+1;if(n<1||n>days){out+='<div class="planner-day other-month" aria-hidden="true"></div>';continue;}
      const date=month+'-'+String(n).padStart(2,'0'),day=list.filter(e=>e.date===date),both=day.some(e=>e.kind==='gym')&&day.some(e=>e.kind==='run');
      out+='<div class="planner-day" data-planner-date="'+date+'" data-both="'+both+'"><button type="button" class="planner-day-head '+(date===localToday()?'is-today':'')+'" aria-label="Workout toevoegen op '+escapeHtml(dateText(date))+'"><span>'+n+'</span><span class="plus-day" aria-hidden="true">+</span></button><div class="planner-day-items">'+day.map(e=>{
        const t=e.planner?template(e.templateId):null,short=t?.short||(e.kind==='run'?'Run':e.kind==='gym'?'Gym':'Overig');
        return '<button type="button" class="planner-event '+e.kind+(!e.done?' planned':'')+(!e.planner?' historical':'')+'" data-entry="'+escapeHtml(e.id)+'" '+(e.planner?'draggable="true"':'')+' aria-label="'+escapeHtml(e.title+' · '+label(e)+' · '+dateText(date))+'"><span><span class="event-full">'+escapeHtml(e.title)+'</span><span class="event-short" aria-hidden="true">'+escapeHtml(short)+'</span></span>'+icon(e.done?'check':'clock')+'</button>';
      }).join('')+'</div></div>';
    }
    $('plannerDays').innerHTML=out;
    $('plannerDays').querySelectorAll('[data-planner-date]').forEach(cell=>{
      const date=cell.dataset.plannerDate;cell.querySelector('.planner-day-head').addEventListener('click',()=>openAdd(date));
      cell.addEventListener('dragover',event=>{if(!drag)return;event.preventDefault();cell.classList.add('drag-over');event.dataTransfer.dropEffect=drag.id?'move':'copy';});
      cell.addEventListener('dragleave',event=>{if(!cell.contains(event.relatedTarget))cell.classList.remove('drag-over');});
      cell.addEventListener('drop',event=>{event.preventDefault();if(drag?.id&&entries[drag.id]){persist({...entries[drag.id],date});refresh();}else if(drag?.templateId)create(drag.templateId,date,false);finishDrag();});
    });
    $('plannerDays').querySelectorAll('[data-entry]').forEach(b=>{const e=byId.get(b.dataset.entry);b.addEventListener('click',()=>openEntry(e));if(e.planner)b.addEventListener('dragstart',event=>{drag={id:e.id};event.dataTransfer.setData('text/plain',JSON.stringify(drag));event.dataTransfer.effectAllowed='move';});});
    const own=list.filter(e=>e.date?.startsWith(month));$('plannerMonthCount').textContent=own.filter(e=>e.done).length+' gedaan · '+own.filter(e=>!e.done).length+' gepland';

  }
  function finishDrag(){drag=null;$('plannerReturn').classList.remove('active');$('plannerDays').querySelectorAll('.drag-over').forEach(el=>el.classList.remove('drag-over'));}
  function renderPicker(){
    $('plannerAddDate').value=addDate;$('plannerPickerTemplates').innerHTML=templates.map(t=>templateButton(t,true)).join('');
    $('plannerPickerTemplates').querySelectorAll('[data-choose]').forEach(b=>b.addEventListener('click',()=>{const date=$('plannerAddDate').value;if(!validDate(date)){$('plannerAddDate').reportValidity();return;}create(b.dataset.choose,date);}));
  }
  function fieldValue(e,name,fallback){return Object.hasOwn(drafts[e.id]||{},name)?drafts[e.id][name]:fallback===null||fallback===undefined?'':String(fallback).replace('.',',');}
  function exerciseMarkup(e,row,index){
    const label=escapeHtml(row.name||'Oefening '+(index+1));
    return '<article class="planner-exercise glass" data-exercise="'+row.id+'"><div class="planner-exercise-head"><label for="exercise-'+row.id+'">Oefening '+(index+1)+'<input id="exercise-'+row.id+'" data-row="'+row.id+'" data-field="name" type="text" autocomplete="off" maxlength="100" placeholder="Naam van de oefening" value="'+escapeHtml(row.name)+'"></label><button type="button" class="planner-remove-exercise" data-remove-exercise="'+row.id+'" aria-label="'+label+' verwijderen">'+icon('trash')+'</button></div><div class="planner-set-grid planner-set-head" aria-hidden="true"><span>Set</span><span>Reps</span><span>Gewicht (kg)</span><span></span></div><div class="planner-set-list">'+row.sets.map((set,setIndex)=>'<div class="planner-set-grid planner-set-row" data-set="'+set.id+'"><span class="planner-set-number">'+(setIndex+1)+'</span>'+[['reps','Reps','numeric'],['weightKg','Gewicht (kg)','decimal']].map(([field,title,mode])=>{
      const name=row.id+':'+set.id+':'+field;
      return '<input id="set-'+row.id+'-'+set.id+'-'+field+'" data-row="'+row.id+'" data-set-id="'+set.id+'" data-field="'+field+'" type="text" inputmode="'+mode+'" autocomplete="off" placeholder="–" value="'+escapeHtml(fieldValue(e,name,set[field]))+'" aria-label="'+title+', set '+(setIndex+1)+' van '+label+'" aria-invalid="'+Object.hasOwn(drafts[e.id]||{},name)+'">';
    }).join('')+'<button type="button" class="planner-remove-set" data-row="'+row.id+'" data-remove-set="'+set.id+'" aria-label="Set '+(setIndex+1)+' van '+label+' verwijderen">×</button></div>').join('')+'</div><button type="button" class="planner-add-set" data-add-set="'+row.id+'" aria-label="Set toevoegen aan '+label+'">'+icon('plus')+'Set toevoegen</button></article>';
  }
  function addSet(id,rowId){
    const e=entries[id],row=e?.exercises.find(r=>r.id===rowId);if(!row)return null;
    if(row.sets.length>=100){toast('Maximaal 100 sets per oefening');return null;}
    const set={id:uuid(),reps:null,weightKg:null};
    persist({...e,exercises:e.exercises.map(r=>r.id===rowId?{...r,sets:[...r.sets,set]}:r)});
    return set.id;
  }
  function removeSet(id,rowId,setId){
    const e=entries[id];if(!e)return;
    for(const field of Object.keys(drafts[id]||{}))if(field.startsWith(rowId+':'+setId+':'))delete drafts[id][field];
    persist({...e,exercises:e.exercises.map(r=>r.id===rowId?{...r,sets:r.sets.filter(set=>set.id!==setId)}:r)});
  }
  function formMetric(e,field,title,placeholder,mode='decimal'){
    const value=field==='durationSeconds'?(e.durationSeconds?timeText(e.durationSeconds):''):e[field];
    return '<label for="planner-'+field+'">'+title+'<input id="planner-'+field+'" data-run-field="'+field+'" type="text" inputmode="'+mode+'" autocomplete="off" placeholder="'+placeholder+'" value="'+escapeHtml(fieldValue(e,field,value))+'" aria-invalid="'+Object.hasOwn(drafts[e.id]||{},field)+'"></label>';
  }
  function renderEditor(force=false){
    const host=$('plannerEditor'),e=entries[activeId];
    if(!force&&host.contains?.(document.activeElement))return;
    if(!e||e.deleted){host.innerHTML='<div class="planner-no-workout">'+(!ready?'Workout laden…':!ok&&!CONFIG.preview?'Je workout is nog niet geladen. Controleer je verbinding; lokaal bewaarde workouts blijven beschikbaar.':e?.deleted?'Deze workout is uit de kalender gehaald.':'Deze workout is niet beschikbaar op dit apparaat.')+'</div>';return;}
    const t=template(e.templateId);
    const gym=t.kind==='gym';
    const runForm='<div class="planner-run-form glass"><div class="planner-run-columns">'+formMetric(e,'distanceKm','Afstand (km)','5,0')+formMetric(e,'durationSeconds','Tijd (mm:ss)','27:30')+'</div>'+formMetric(e,'averageHeartRate','Gemiddelde hartslag (optioneel)','150','numeric')+'<div class="planner-pace" id="plannerRunPace">'+(paceText(e.distanceKm,e.durationSeconds)||'')+'</div><label for="plannerHamstring">Hamstring (optioneel)<select id="plannerHamstring" style="min-height:46px;border-radius:10px;font-size:16px;padding:10px;border:1px solid #d4deee;background:#fff;color:#4d6589"><option value="">Niet ingevuld</option>'+[['goed','Goed'],['licht','Voelbaar'],['erger','Pijnlijk']].map(([v,label])=>'<option value="'+v+'" '+(e.hamstring===v?'selected':'')+'>'+label+'</option>').join('')+'</select></label><label for="plannerNote">Notitie (optioneel)<textarea id="plannerNote" rows="3" maxlength="1000">'+escapeHtml(e.note)+'</textarea></label></div>';
    const previous=Object.values(legacyDrafts[e.id]||{});
    host.innerHTML='<header class="planner-editor-head"><div><div class="micro">'+(completed(e)?'Gedaan':e.date===localToday()?'Vandaag · gepland':'Gepland')+'</div><h1 id="plannerWorkoutTitle">'+escapeHtml(t.name)+'</h1></div><label class="planner-date-label" for="plannerWorkoutDate">Datum<input id="plannerWorkoutDate" type="date" value="'+e.date+'" required></label></header>'+(gym?'<div class="planner-exercises" id="plannerExercises">'+e.exercises.map((row,i)=>exerciseMarkup(e,row,i)).join('')+'</div><button type="button" class="planner-add-exercise" id="plannerAddExercise">'+icon('plus')+'Oefening toevoegen</button>':runForm)+(previous.length?'<details class="planner-editor-help"><summary>Eerdere invoer voor aantal sets</summary><p>'+previous.map(escapeHtml).join(', ')+'. Controleer het aantal setrijen hierboven.</p></details>':'')+'<p class="planner-notice" id="plannerFieldError" role="status"></p><button type="button" class="planner-delete" id="plannerDeleteWorkout">Workout verwijderen</button>';
    $('plannerWorkoutDate').addEventListener('change',event=>{if(!validDate(event.target.value)){event.target.reportValidity();return;}persist({...entries[e.id],date:event.target.value});refresh(true);});
    host.querySelectorAll('[data-field]').forEach(input=>input.addEventListener('input',()=>updateExercise(e.id,input)));
    host.querySelectorAll('[data-add-set]').forEach(button=>button.addEventListener('click',()=>{
      const setId=addSet(e.id,button.dataset.addSet);if(!setId)return;renderEditor(true);
      const input=$('set-'+button.dataset.addSet+'-'+setId+'-reps');input.focus();input.scrollIntoView?.({block:'center',behavior:'smooth'});
    }));
    host.querySelectorAll('[data-remove-set]').forEach(button=>button.addEventListener('click',()=>{removeSet(e.id,button.dataset.row,button.dataset.removeSet);renderEditor(true);}));
    host.querySelectorAll('[data-remove-exercise]').forEach(button=>button.addEventListener('click',()=>{
      const current=entries[e.id],next=current.exercises.filter(row=>row.id!==button.dataset.removeExercise);
      for(const field of Object.keys(drafts[e.id]||{}))if(field.startsWith(button.dataset.removeExercise+':'))delete drafts[e.id][field];
      if(legacyDrafts[e.id])for(const field of Object.keys(legacyDrafts[e.id]))if(field.startsWith(button.dataset.removeExercise+':'))delete legacyDrafts[e.id][field];
      persist({...current,exercises:next});renderEditor(true);
    }));
    if(gym)$('plannerAddExercise').addEventListener('click',()=>{
      const current=entries[e.id];if(current.exercises.length>=40){toast('Maximaal 40 oefeningen per sessie');return;}
      const row={id:uuid(),name:'',sets:[{id:uuid(),reps:null,weightKg:null}]};persist({...current,exercises:[...current.exercises,row]});renderEditor(true);
      const input=$('exercise-'+row.id);input.focus();input.scrollIntoView?.({block:'center',behavior:'smooth'});
    });
    else {
      host.querySelectorAll('[data-run-field]').forEach(input=>input.addEventListener('input',()=>updateRun(e.id,input)));
      $('plannerHamstring').addEventListener('change',event=>persist({...entries[e.id],hamstring:event.target.value||null}));
      $('plannerNote').addEventListener('input',event=>persist({...entries[e.id],note:event.target.value}));
    }
    $('plannerDeleteWorkout').addEventListener('click',()=>remove(e.id));showValidation();status();
  }
  function numberField(value,max,integer=false,zero=false){
    if(value.trim()==='')return null;
    if(!/^(?:\d+(?:[.,]\d{0,3})?|[.,]\d{1,3})$/.test(value.trim()))return undefined;
    const n=Number(value.replace(',','.'));return Number.isFinite(n)&&n>=(zero?0:1)&&n<=max&&(!integer||Number.isInteger(n))?n:undefined;
  }
  function rememberDraft(id,name,value,invalid){if(!drafts[id])drafts[id]={};if(invalid)drafts[id][name]=value;else delete drafts[id][name];cache();status();showValidation();}
  function showValidation(){if(!$('plannerFieldError'))return;$('plannerFieldError').textContent=activeId&&Object.keys(drafts[activeId]||{}).length?'Controleer de gemarkeerde velden. Je invoer blijft op dit apparaat bewaard.':'';}
  function updateExercise(id,input){
    const field=input.dataset.field,rowId=input.dataset.row,setId=input.dataset.setId;
    const e=entries[id];
    if(field==='name'){persist({...e,exercises:e.exercises.map(row=>row.id===rowId?{...row,name:input.value}:row)});return;}
    const name=rowId+':'+setId+':'+field;
    const value=field==='weightKg'?numberField(input.value,2000,false,true):numberField(input.value,1000,true);
    rememberDraft(id,name,input.value,value===undefined);input.setAttribute('aria-invalid',value===undefined?'true':'false');if(value===undefined)return;
    persist({...e,exercises:e.exercises.map(row=>row.id===rowId?{...row,sets:row.sets.map(set=>set.id===setId?{...set,[field]:value}:set)}:row)});
  }
  function updateRun(id,input){
    const field=input.dataset.runField;let value;
    if(field==='durationSeconds')value=input.value.trim()===''?null:parseTime(input.value)||undefined;
    else value=numberField(input.value,field==='distanceKm'?1000:300,field!=='distanceKm',field==='distanceKm');
    if(field==='distanceKm'&&value===0)value=undefined;
    rememberDraft(id,field,input.value,value===undefined);input.setAttribute('aria-invalid',value===undefined?'true':'false');if(value===undefined)return;
    persist({...entries[id],[field]:value});$('plannerRunPace').textContent=paceText(entries[id].distanceKm,entries[id].durationSeconds)||'';
  }
  function render(){
    renderCalendar();if(activeView==='toevoegen')renderPicker();if(activeView==='workout')renderEditor();status();
    document.body.classList?.toggle?.('planner-editing',activeView==='workout'||activeView==='toevoegen');
  }
  function refresh(forceEditor=false){render();if(forceEditor&&activeView==='workout')renderEditor(true);}
  function initialize(){
    read();$('retrySync').addEventListener('click',()=>{clearTimeout(retryTimer);load();});$('plannerAddToday').addEventListener('click',()=>openAdd());$('plannerAddBack').addEventListener('click',back);$('plannerWorkoutBack').addEventListener('click',back);
    $('plannerPrevMonth').addEventListener('click',()=>changeMonth(-1));$('plannerNextMonth').addEventListener('click',()=>changeMonth(1));
    const area=$('plannerReturn');area.addEventListener('dragover',event=>{if(!drag?.id)return;event.preventDefault();area.classList.add('active');event.dataTransfer.dropEffect='move';});area.addEventListener('dragleave',()=>area.classList.remove('active'));area.addEventListener('drop',event=>{event.preventDefault();if(drag?.id)remove(drag.id);finishDrag();});
    window.addEventListener('dragend',finishDrag);window.addEventListener('online',()=>load());window.addEventListener('focus',()=>{checkDay();if(!ok||pending.size)load();});
    window.addEventListener('storage',event=>{
      if(event.key!==key||!event.newValue)return;try{const other=JSON.parse(event.newValue);if(CONFIG.resetId&&other.resetId!==CONFIG.resetId)return;
        for(const [id,e] of Object.entries(other.entries||{}))if(id===e.id&&valid(e)&&(!entries[id]||e.updatedAt>entries[id].updatedAt)){entries[id]=upgrade(e);if(other.pending?.includes(id))pending.add(id);}
        refresh();if(pending.size)flush();
      }catch{}
    });
    setInterval(checkDay,60000);document.addEventListener?.('visibilitychange',()=>{if(!document.hidden){checkDay();if(pending.size)flush();}});
  }
  function changeMonth(delta){const d=new Date(month+'-01T12:00:00Z');d.setUTCMonth(d.getUTCMonth()+delta);month=d.toISOString().slice(0,7);renderCalendar();}
  function checkDay(){if(lastDay!==localToday()){lastDay=localToday();refresh();}}
  return {initialize,load,flush,render,route,open,openAdd,create,remove,addSet,removeSet,asTraining,valid,upgrade,numberField,entries:()=>entries,update:(id,patch)=>{if(entries[id])persist({...entries[id],...patch});},pending:()=>pending,cacheKey:key,exportData:()=>({entries,drafts,legacyDrafts}),status};
})();
Planner.initialize();
`;
