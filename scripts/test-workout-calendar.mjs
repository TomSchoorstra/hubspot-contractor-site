import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import os from "node:os";
import path from "node:path";
import * as filePromises from "node:fs/promises";
import * as nodeCrypto from "node:crypto";
import test from "node:test";
import ts from "typescript";

// Execute the production TypeScript with an in-memory database. No real health
// data or Supabase credentials are read or written by these tests.
function loadModule(file, dependencies = {}, globals = {}) {
  const output = ts.transpileModule(fs.readFileSync(file, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
    reportDiagnostics: true,
  });
  const errors = output.diagnostics?.filter((d) => d.category === ts.DiagnosticCategory.Error) ?? [];
  assert.equal(errors.length, 0, errors.map((d) => ts.flattenDiagnosticMessageText(d.messageText, "\n")).join("\n"));
  const compiledModule = { exports: {} };
  vm.runInNewContext(output.outputText, {
    module: compiledModule, exports: compiledModule.exports, Request, Response, URL, ...globals,
    console: { error() {} },
    require(name) {
      if(file.endsWith("training-html.ts") && name.startsWith("./planner-")) return loadModule("src/app/l/[slug]/kracht-5km/"+name.slice(2)+".ts");
      assert.ok(Object.hasOwn(dependencies, name), `Unexpected dependency ${name}`);
      return dependencies[name];
    },
  }, { filename: file });
  return compiledModule.exports;
}

const workoutPlan=loadModule("src/lib/workout-planner.ts");
const programme=loadModule("src/lib/training-programme.ts");
function browserClient(cacheStore, transport, configOverrides = {}) {
  const { TRAINING_HTML } = loadModule("src/app/l/[slug]/kracht-5km/training-html.ts");
  const config = {
    rowId: "test-user",
    workoutTemplates:workoutPlan.WORKOUT_TEMPLATES,programme:programme.TRAINING_PROGRAMME,plannerApi:"/test-workout-api",
    name: "Test", api: "/test-api", apiKey: "test-key", backUrl: "/", preview: false, ...configOverrides,
  };
  const elements = new Map();
  const element = (id) => {
    if (!elements.has(id)) elements.set(id, {
      textContent: "", innerHTML: "", hidden: false, dataset: {}, style: {},
      classList: { add() {}, remove() {}, toggle() {} },
      setAttribute() {}, addEventListener() {}, appendChild() {}, contains() { return false; }, querySelectorAll() { return []; },
    });
    return elements.get(id);
  };
  const script = TRAINING_HTML.match(/<script>([\s\S]*?)<\/script>/)[1]
    .replace("/*__TRAINING_CONFIG__*/", `window.__TRAINING__=${JSON.stringify(config)};`);
  const context = vm.createContext({
    window: { addEventListener() {} },
    document: { getElementById: element, querySelectorAll: () => [], addEventListener(){}, createElement:()=>element("created"), body: { style: {},classList:{toggle(){}} } },
    localStorage: { getItem: (key) => cacheStore.get(key) ?? null, setItem: (key, value) => cacheStore.set(key, value) },
    fetch: (url,options)=>url==="/test-workout-api"?(configOverrides.plannerTransport?configOverrides.plannerTransport(url,options):Promise.resolve({ok:true,json:async()=>({data:{version:1,entries:{},storage:"local"}})})):transport(url,options), AbortController, Blob, URL,crypto:nodeCrypto,
    setTimeout: () => 1, clearTimeout() {}, setInterval:()=>1,
  });
  vm.runInContext(script, context);
  return { run: (code) => vm.runInContext(code, context), element };
}
const settle = () => new Promise((resolve) => setImmediate(resolve));
function flexibleApi(store=new Map()){
  const api=loadModule('src/app/api/workout-sessions/route.ts',{
    'next/server':{NextResponse:{json:(body,init)=>Response.json(body,init)}},
    '@/lib/loopschema':{profileForKey:key=>key==='test-tom'?{rowId:'tom'}:key==='test-other'?{rowId:'denise'}:null},
    '@/lib/workout-planner':workoutPlan,
    '@/lib/workout-storage':{
      localTrainingStorage:()=>false,
      readTrainingPrefix:async prefix=>[...store].filter(([id])=>id.startsWith(prefix)).map(([id,data])=>({id,data})),
      writeTrainingRow:async(id,data)=>{store.set(id,structuredClone(data));},
    },
  });
  const request=(method,entry,key='test-tom')=>new Request('http://localhost/api/workout-sessions',{method,headers:{'Content-Type':'application/json','x-loop-key':key},...(method==='POST'?{body:typeof entry==='string'?entry:JSON.stringify({entry})}:{})});
  return {api,request,store};
}
const workoutFixture=()=>({id:nodeCrypto.randomUUID(),templateId:'upper',date:'2026-11-03',deleted:false,updatedAt:1793707200000,
  exercises:[{id:nodeCrypto.randomUUID(),name:'Bench press',sets:3,reps:10,weightKg:42.5}],distanceKm:null,durationSeconds:null,averageHeartRate:null,hamstring:null,note:''});

test('workout snapshots validate partial input, zero weight, real dates and unique exercise IDs',()=>{
  const entry=workoutFixture();assert.ok(workoutPlan.normalizeWorkout(entry));
  assert.ok(workoutPlan.normalizeWorkout({...entry,exercises:[{...entry.exercises[0],sets:null,reps:null,weightKg:0}]}));
  for(const patch of [{id:'tom'},{date:'2026-02-30'},{templateId:'unknown'},{deleted:'false'},{updatedAt:1e20},{distanceKm:5},{exercises:[...entry.exercises,...entry.exercises]},{exercises:[{...entry.exercises[0],weightKg:-5}]},{exercises:[{...entry.exercises[0],sets:1.5}]}])assert.equal(workoutPlan.normalizeWorkout({...entry,...patch}),null);
  const run={...entry,templateId:'run',exercises:[],distanceKm:.8,durationSeconds:300,averageHeartRate:150};assert.ok(workoutPlan.normalizeWorkout(run));
});

test('calendar API preserves history, other users, independent sessions and deletion tombstones',async()=>{
  const history={original:true},store=new Map([['tom',history],['denise',{private:true}]]),{api,request}=flexibleApi(store);
  for(const key of ['', 'bad','test-other']){
    assert.equal((await api.GET(request('GET',null,key))).status,403);
    assert.equal((await api.POST(request('POST',workoutFixture(),key))).status,403);
  }
  const a=workoutFixture(),b={...workoutFixture(),date:'2026-11-04'};
  assert.equal((await api.POST(request('POST',a))).status,200);assert.equal((await api.POST(request('POST',b))).status,200);
  const result=await (await api.GET(request('GET'))).json();assert.equal(Object.keys(result.data.entries).length,2);
  assert.equal(result.data.entries[a.id].exercises[0].sets[0].weightKg,42.5);assert.equal(store.get('tom'),history);
  assert.equal((await api.POST(request('POST',{...a,deleted:true,updatedAt:a.updatedAt+1}))).status,200);
  const deleted=await (await api.GET(request('GET'))).json();assert.equal(deleted.data.entries[a.id].deleted,true);
  assert.equal(deleted.data.entries[a.id].exercises[0].name,'Bench press');assert.equal(deleted.data.entries[b.id].deleted,false);
  assert.equal((await api.POST(request('POST',{...a,id:'raceplan:w1r1'}))).status,400);
  assert.equal((await api.POST(request('POST','{'))).status,400);
  assert.equal((await api.POST(request('POST','x'.repeat(512001)))).status,413);
});

test('templates are copied per session and calendar completion follows the date',async()=>{
  const client=browserClient(new Map(),async()=>{throw Error('Preview must not fetch');},{preview:true});
  const a=client.run('Planner.create("upper","2020-01-01",false)'),b=client.run('Planner.create("upper","2099-01-01",false)');
  assert.equal(a.exercises[0].name,'Bench press');assert.equal(a.exercises[0].sets[0].weightKg,null);
  client.run('Planner.update('+JSON.stringify(a.id)+',{exercises:[]})');
  assert.equal(client.run('Planner.entries()['+JSON.stringify(b.id)+'].exercises.length'),3);
  assert.equal(workoutPlan.WORKOUT_TEMPLATES[0].exercises.length,3);
  assert.equal(client.run('Planner.asTraining().find(e=>e.id==='+JSON.stringify(a.id)+').done'),true);
  assert.equal(client.run('Planner.asTraining().find(e=>e.id==='+JSON.stringify(b.id)+').done'),false);

  assert.equal(client.run('Planner.numberField("42,5",2000,false,true)'),42.5);
  assert.equal(client.run('Planner.numberField("-5",2000,false,true)'),undefined);
  assert.equal(client.run('parseTime("27,30")'),1650);
});

test('offline exercise edits survive reload, sync later and keep the final change during a save',async()=>{
  let online=false,release;const server={},writes=[];
  const hold=new Promise(resolve=>{release=resolve;});
  let holdNext=false;
  const plannerTransport=async(_url,options)=>{
    if(!online)throw Error('Offline');
    if(options.method==='POST'){const {entry}=JSON.parse(options.body);writes.push(structuredClone(entry));if(holdNext){holdNext=false;await hold;}server[entry.id]=entry;return {ok:true,json:async()=>({ok:true})};}
    return {ok:true,json:async()=>({data:{version:1,entries:structuredClone(server),storage:'local'}})};
  };
  const base=async()=>({ok:true,json:async()=>({data:{version:1,logs:{}}})}),cache=new Map();
  const first=browserClient(cache,base,{plannerTransport});await settle();
  const entry=first.run('Planner.create("upper","2026-11-03",false)');
  first.run('Planner.update('+JSON.stringify(entry.id)+',{exercises:[{...Planner.entries()['+JSON.stringify(entry.id)+'].exercises[0],sets:[{...Planner.entries()['+JSON.stringify(entry.id)+'].exercises[0].sets[0],weightKg:42.5}]}]})');
  const second=browserClient(cache,base,{plannerTransport});await settle();
  assert.equal(second.run('Planner.entries()['+JSON.stringify(entry.id)+'].exercises[0].sets[0].weightKg'),42.5);
  assert.equal(second.run('Planner.pending().size'),1);
  online=true;await second.run('Planner.load()');await settle();
  assert.equal(second.run('Planner.pending().size'),0);assert.equal(server[entry.id].exercises[0].sets[0].weightKg,42.5);
  second.run('Planner.update('+JSON.stringify(entry.id)+',{note:"first"})');holdNext=true;
  const saving=second.run('Planner.flush()');await settle();
  second.run('Planner.update('+JSON.stringify(entry.id)+',{note:"latest"})');release();await saving;
  assert.equal(server[entry.id].note,'latest');assert.equal(writes.at(-1).note,'latest');
});

test('local prefix listing isolates flexible sessions from the original plan and other users',async()=>{
  const directory=fs.mkdtempSync(path.join(os.tmpdir(),'flexible-training-'));
  try{
    const storage=loadModule('src/lib/workout-storage.ts',{'node:fs/promises':filePromises,'node:path':path,'node:crypto':nodeCrypto,'./supabase':{getSupabase(){throw Error('No cloud access in local test');}}},{process:{cwd:()=>directory,env:{NODE_ENV:'test'}}});
    const entry=workoutFixture(),prefix='tom:workout-sessions-v1:';
    await storage.writeTrainingRow(prefix+entry.id,entry);await storage.writeTrainingRow('denise:workout-sessions-v1:test',{private:true});await storage.writeTrainingRow('tom:kracht-5km-2026:old',{old:true});
    const rows=await storage.readTrainingPrefix(prefix);assert.equal(rows.length,1);assert.equal(rows[0].data.id,entry.id);
  }finally{fs.rmSync(directory,{recursive:true,force:true});}
});

test('legacy compact exercise logs expand losslessly with stable set IDs',()=>{
  const entry=workoutFixture(),original=JSON.stringify(entry);
  const migrated=workoutPlan.normalizeWorkout(entry),row=migrated.exercises[0];
  assert.equal(row.sets.length,3);assert.equal(new Set(row.sets.map(s=>s.id)).size,3);
  assert.deepEqual(JSON.parse(JSON.stringify(row.sets.map(s=>({reps:s.reps,weightKg:s.weightKg})))),Array(3).fill({reps:10,weightKg:42.5}));
  assert.deepEqual(JSON.parse(JSON.stringify(row.legacySummary)),{sets:3,reps:10,weightKg:42.5});
  assert.equal(JSON.stringify(entry),original);
  assert.equal(JSON.stringify(workoutPlan.normalizeWorkout(migrated)),JSON.stringify(migrated));
});

test('API preserves different reps and weights for every set and rejects invalid nested rows',async()=>{
  const entry=workoutFixture();
  entry.exercises=[{id:nodeCrypto.randomUUID(),name:'Bench press',sets:[{id:nodeCrypto.randomUUID(),reps:12,weightKg:40},{id:nodeCrypto.randomUUID(),reps:10,weightKg:45},{id:nodeCrypto.randomUUID(),reps:8,weightKg:50}]}];
  const {api,request}=flexibleApi();
  assert.equal((await api.POST(request('POST',entry))).status,200);
  const result=await (await api.GET(request('GET'))).json();
  assert.deepEqual(result.data.entries[entry.id].exercises,entry.exercises);
  for(const sets of [
    [entry.exercises[0].sets[0],entry.exercises[0].sets[0]],
    [{id:nodeCrypto.randomUUID(),reps:1.5,weightKg:40}],
    [{id:nodeCrypto.randomUUID(),reps:10,weightKg:-1}],
    Array.from({length:101},()=>({id:nodeCrypto.randomUUID(),reps:null,weightKg:null})),
  ])assert.equal((await api.POST(request('POST',{...entry,exercises:[{...entry.exercises[0],sets}]}))).status,400);
  assert.ok(workoutPlan.normalizeWorkout({...entry,exercises:[{...entry.exercises[0],sets:[]}]}));
});

test('old browser values and incomplete drafts migrate without dropping recorded input',()=>{
  const entry=workoutFixture(),row=entry.exercises[0],cache=new Map();
  cache.set('workout-planner-v1-test-user-voorbeeld',JSON.stringify({version:1,entries:{[entry.id]:entry},pending:[entry.id],drafts:{[entry.id]:{[row.id+':weightKg']:'oops',[row.id+':sets']:'abc'}}}));
  const client=browserClient(cache,async()=>{throw Error('Preview must not fetch')},{preview:true});
  assert.equal(client.run('Planner.entries()['+JSON.stringify(entry.id)+'].exercises[0].sets.length'),3);
  assert.equal(client.run('Planner.entries()['+JSON.stringify(entry.id)+'].exercises[0].sets[2].weightKg'),42.5);
  assert.equal(client.run('Object.values(Planner.exportData().drafts['+JSON.stringify(entry.id)+']).filter(v=>v==="oops").length'),3);
  assert.equal(client.run('Object.values(Planner.exportData().legacyDrafts['+JSON.stringify(entry.id)+'])[0]'),'abc');
  const second=browserClient(cache,async()=>{throw Error('Preview must not fetch')},{preview:true});
  assert.equal(second.run('Planner.entries()['+JSON.stringify(entry.id)+'].exercises[0].sets.length'),3);
});

test('adding and removing set rows preserves neighbouring set values and other sessions',()=>{
  const client=browserClient(new Map(),async()=>{throw Error('Preview must not fetch')},{preview:true});
  const entry=client.run('Planner.create("upper","2026-11-03",false)'),other=client.run('Planner.create("upper","2026-11-03",false)'),row=entry.exercises[0];
  const setId=client.run('Planner.addSet('+JSON.stringify(entry.id)+','+JSON.stringify(row.id)+')');
  assert.equal(client.run('Planner.entries()['+JSON.stringify(entry.id)+'].exercises[0].sets.length'),2);
  client.run('Planner.update('+JSON.stringify(entry.id)+',{exercises:Planner.entries()['+JSON.stringify(entry.id)+'].exercises.map((r,i)=>i===0?{...r,sets:r.sets.map((s,n)=>({...s,reps:n?8:12,weightKg:n?50:40}))}:r)})');
  client.run('Planner.removeSet('+JSON.stringify(entry.id)+','+JSON.stringify(row.id)+','+JSON.stringify(row.sets[0].id)+')');
  assert.equal(client.run('Planner.entries()['+JSON.stringify(entry.id)+'].exercises[0].sets[0].id'),setId);
  assert.equal(client.run('Planner.entries()['+JSON.stringify(entry.id)+'].exercises[0].sets[0].weightKg'),50);
  assert.equal(client.run('Planner.entries()['+JSON.stringify(other.id)+'].exercises[0].sets.length'),1);
});



test('private page serves only the existing owner and contains no historical data',async()=>{
 const html=loadModule('src/app/l/[slug]/kracht-5km/training-html.ts');
 const page=loadModule('src/app/l/[slug]/kracht-5km/route.ts',{
  '@/lib/loopschema':{profileForKey:key=>key==='test-tom'?{rowId:'tom',name:'Example'}:null},
  '@/lib/workout-planner':workoutPlan,'@/lib/training-programme':programme,'./training-html':html,
 });
 const request=new Request('http://localhost/test?voorbeeld=1');
 assert.equal((await page.GET(request,{params:Promise.resolve({slug:'unknown'})})).status,404);
 const response=await page.GET(request,{params:Promise.resolve({slug:'test-tom'})}),text=await response.text();
 assert.equal(response.status,200);assert.equal(response.headers.get('cache-control'),'no-store');
 assert.ok(text.includes('"preview":true'));assert.ok(!text.includes('view-voortgang'));assert.ok(!text.includes('raceplanHistory'));
 new vm.Script(text.match(/<script>([\s\S]*?)<\/script>/)[1]);
});

test('clean calendar resets old examples once and preserves fresh input',async()=>{
 const entry=workoutFixture(),cache=new Map(),key='workout-planner-v1-test-user-voorbeeld';
 cache.set(key,JSON.stringify({version:1,entries:{[entry.id]:entry},pending:[entry.id],drafts:{}}));
 let requests=0;const transport=async()=>{requests++;throw Error('Preview must stay local')};
 const config={preview:true,resetId:'clean-2026-11-04'};
 const client=browserClient(cache,transport,config);await settle();
 assert.equal(client.run('Object.keys(Planner.entries()).length'),0);
 assert.equal(JSON.parse(cache.get(key)).resetId,config.resetId);
 const fresh=client.run('Planner.create("upper","2026-11-04",false)');
 const second=browserClient(cache,transport,config);await settle();
 assert.equal(second.run('Object.keys(Planner.entries()).length'),1);
 assert.equal(second.run('Planner.entries()["'+fresh.id+'"].date'),'2026-11-04');assert.equal(requests,0);
});

test('old hashes return to the calendar and workout deep links remain available',()=>{
 const client=browserClient(new Map(),async()=>{throw Error('Preview must stay local')},{preview:true});
 for(const hash of ['#voortgang','#week-4','#logboek','#unknown']){
  client.run('window.location={hash:'+JSON.stringify(hash)+'};readView();renderView()');assert.equal(client.run('activeView'),'kalender');
 }
 const entry=client.run('Planner.create("upper","2026-11-04",false)');
 client.run('window.location={hash:"#workout/'+entry.id+'"};readView();renderView()');
 assert.equal(client.run('activeView'),'workout');assert.equal(client.element('view-kalender').hidden,true);
 assert.equal(client.run('parseTime("27:30")'),1650);assert.equal(client.run('parseTime("27,30")'),1650);
 assert.equal(client.run('parseTime("27:99")'),null);
});

test('run-plan API round-trips the linked week and separates 5 km time from total session time',async()=>{
 const {api,request}=flexibleApi();
 const entry={...workoutFixture(),templateId:'run',exercises:[],distanceKm:8,durationSeconds:3000,runPlan:{programId:'five-k-12-v1',week:2,logged:true,effort:8,asPlanned:true,testSeconds:1740}};
 assert.equal((await api.POST(request('POST',entry))).status,200);
 const result=await (await api.GET(request('GET'))).json();
 assert.equal(result.data.entries[entry.id].runPlan.testSeconds,1740);
 assert.equal(result.data.entries[entry.id].durationSeconds,3000);
 for(const runPlan of [{...entry.runPlan,week:13},{...entry.runPlan,effort:11},{...entry.runPlan,testSeconds:4000},{...entry.runPlan,asPlanned:null}])assert.equal((await api.POST(request('POST',{...entry,runPlan}))).status,400);
 assert.equal(workoutPlan.normalizeWorkout({...workoutFixture(),runPlan:entry.runPlan}),null);
});

test('run-plan pace uses only a confirmed baseline and past dates never complete linked runs',()=>{
 const client=browserClient(new Map(),()=>{} ,{preview:true});
 const id=client.run(`(()=>{const e=Planner.create('run','2020-01-01',false);Planner.update(e.id,{runPlan:{programId:'kracht-5k-12-v2',week:2,logged:false,effort:null,asPlanned:true,testSeconds:1740},distanceKm:8,durationSeconds:3000});return e.id;})()`);
 assert.equal(client.run('RunPlan.baseline()'),null);
 assert.equal(client.run('RunPlan.pace(RunPlan.weeks[4])'),'Tempo na nulmeting');
 assert.equal(client.run(`Planner.asTraining().find(e=>e.id==='${id}').done`),false);
 client.run(`Planner.update('${id}',{runPlan:{...Planner.entries()['${id}'].runPlan,logged:true}})`);
 assert.equal(client.run('RunPlan.baseline()'),348);
 assert.equal(client.run('RunPlan.pace(RunPlan.weeks[4])'),'5:38–5:43/km');
 client.run(`Planner.update('${id}',{date:'2099-01-01'})`);
 assert.equal(client.run('RunPlan.baseline()'),null);
});

test('the programme validates: 12 weeks, three gym sessions within an hour, one run, no invented loads or paces',()=>{
 assert.equal(programme.validateProgramme().join('; '),'');
 const weeks=programme.TRAINING_PROGRAMME.weeks;
 assert.equal(weeks.length,12);
 for(const week of weeks){
  assert.equal(week.sessions.map(s=>s.key).join(''),'ABC');
  for(const session of week.sessions)assert.ok(session.minutes<=60,`week ${week.week} ${session.key} takes ${session.minutes} min`);
  assert.ok(week.run.steps.length>=3);
 }
 assert.equal(weeks.filter(w=>w.run.kind==='test').map(w=>w.week).join(),'2,12');
 assert.equal(weeks.filter(w=>w.light).map(w=>w.week).join(),'4,8,12');
 assert.ok(!/\d\s?kg/.test(JSON.stringify(weeks)));
 // A broken programme is reported, not silently accepted.
 const broken=structuredClone(programme.TRAINING_PROGRAMME);broken.weeks[0].sessions.pop();broken.weeks[4].run.kind='test';
 assert.ok(programme.validateProgramme(broken).length>=2);
});

test('earlier run-plan entries stay valid, keep their own title and never feed the new programme',async()=>{
 const {api,request}=flexibleApi();
 const old={...workoutFixture(),templateId:'run',date:'2020-01-01',exercises:[],distanceKm:8,durationSeconds:3000,runPlan:{programId:'five-k-12-v1',week:2,logged:true,effort:8,asPlanned:true,testSeconds:1740}};
 assert.equal((await api.POST(request('POST',old))).status,200);
 const stored=(await (await api.GET(request('GET'))).json()).data.entries[old.id];
 assert.deepEqual(stored.runPlan,old.runPlan);
 const cache=new Map([['workout-planner-v1-test-user-voorbeeld',JSON.stringify({version:1,resetId:null,entries:{[old.id]:stored},pending:[],drafts:{}})]]);
 const client=browserClient(cache,()=>{},{preview:true});
 assert.equal(client.run(`Planner.asTraining().find(e=>e.id==='${old.id}').title`),'W2 · Nulmeting');
 assert.equal(client.run(`Planner.asTraining().find(e=>e.id==='${old.id}').done`),true);
 assert.equal(client.run('RunPlan.baseline()'),null);
 assert.equal(client.run('RunPlan.entry(2)'),undefined);
 assert.equal(JSON.stringify(client.run(`Planner.entries()['${old.id}'].runPlan`)),JSON.stringify(old.runPlan));
});

test('gym programme links are validated and a session only counts as logged with recorded repetitions',async()=>{
 const {api,request}=flexibleApi();
 const row={id:nodeCrypto.randomUUID(),name:'Leg press',sets:[{id:nodeCrypto.randomUUID(),reps:null,weightKg:null}]};
 const entry={...workoutFixture(),templateId:'full',exercises:[row],gymPlan:{programId:'kracht-5k-12-v2',week:1,session:'A',logged:false,effort:null}};
 assert.equal((await api.POST(request('POST',entry))).status,200);
 assert.equal((await api.POST(request('POST',{...entry,gymPlan:{...entry.gymPlan,logged:true}}))).status,400);
 const done={...entry,exercises:[{...row,sets:[{...row.sets[0],reps:10,weightKg:80}]}],gymPlan:{...entry.gymPlan,logged:true,effort:7}};
 assert.equal((await api.POST(request('POST',done))).status,200);
 const result=await (await api.GET(request('GET'))).json();
 assert.deepEqual(result.data.entries[entry.id].gymPlan,done.gymPlan);
 for(const gymPlan of [{...entry.gymPlan,week:13},{...entry.gymPlan,session:'D'},{...entry.gymPlan,programId:'five-k-12-v1'},{...entry.gymPlan,effort:11}])assert.equal((await api.POST(request('POST',{...entry,gymPlan}))).status,400);
 assert.equal(workoutPlan.normalizeWorkout({...entry,templateId:'upper'}),null);
});

test('scheduling the programme is explicit, never duplicates and leaves existing and logged workouts alone',()=>{
 const client=browserClient(new Map(),async()=>{throw Error('Preview must not fetch')},{preview:true});
 assert.equal(client.run('Object.keys(Planner.entries()).length'),0);
 const own=client.run('Planner.create("upper","2099-01-07",false)');
 client.run('RunPlan.setPlan("2099-01-05",{A:1,B:3,C:5,run:7})');
 assert.equal(client.run('RunPlan.planSummary().fresh.length'),48);
 assert.equal(client.run('RunPlan.planSummary().others'),1);
 client.run('RunPlan.applyPlan()');
 assert.equal(client.run('Object.values(Planner.entries()).filter(e=>!e.deleted).length'),49);
 assert.equal(client.run('RunPlan.planSummary().fresh.length'),0);
 client.run('RunPlan.applyPlan()');
 assert.equal(client.run('Object.values(Planner.entries()).filter(e=>!e.deleted).length'),49);
 const first=client.run('RunPlan.gymEntry(1,"A")');
 assert.equal(first.date,'2099-01-05');assert.equal(first.templateId,'full');
 assert.equal(first.exercises[0].name,'Leg press');assert.equal(first.exercises[0].sets.length,2);
 assert.ok(first.exercises.every(r=>r.sets.every(s=>s.reps===null&&s.weightKg===null)));
 assert.equal(client.run('RunPlan.entry(12)').date,'2099-03-29');
 assert.equal(client.run(`Planner.asTraining().find(e=>e.id==='${first.id}').done`),false);
 assert.equal(client.run(`Planner.asTraining().find(e=>e.id==='${first.id}').title`),'W1 · Full body A');
 // Scheduling the same session again moves it instead of adding a second one.
 client.run('RunPlan.scheduleGym(1,"A","2099-01-06",false)');
 assert.equal(client.run('Object.values(Planner.entries()).filter(e=>!e.deleted&&e.gymPlan?.week===1&&e.gymPlan.session==="A").length'),1);
 // A logged session survives clearing the plan; so does the unrelated workout.
 client.run(`(()=>{const e=Planner.entries()['${first.id}'];Planner.update(e.id,{date:'2020-01-01',exercises:e.exercises.map((r,i)=>i?r:{...r,sets:r.sets.map(s=>({...s,reps:10,weightKg:80}))})});Planner.update(e.id,{gymPlan:{...Planner.entries()[e.id].gymPlan,logged:true}});})()`);
 assert.equal(client.run(`Planner.asTraining().find(e=>e.id==='${first.id}').done`),true);
 assert.equal(client.run('RunPlan.clearTargets().length'),47);
 client.run('RunPlan.clearPlan();RunPlan.clearPlan()');
 const left=client.run('Object.values(Planner.entries()).filter(e=>!e.deleted).map(e=>e.id)');
 assert.deepEqual([...left].sort(),[own.id,first.id].sort());
 assert.equal(client.run(`Planner.entries()['${first.id}'].exercises[0].sets[0].weightKg`),80);
 // Removing the repetitions or moving the date forward withdraws the logged state, never the data.
 client.run(`Planner.update('${first.id}',{date:'2099-01-05'})`);
 assert.equal(client.run(`Planner.entries()['${first.id}'].gymPlan.logged`),false);
 assert.equal(client.run(`Planner.entries()['${first.id}'].exercises[0].sets[0].reps`),10);
});

test('the pace check in week 7 only speeds up later paces after a controlled, as-planned log',()=>{
 const client=browserClient(new Map(),()=>{},{preview:true});
 const log=(week,extra)=>client.run(`(()=>{const e=RunPlan.schedule(${week},'2020-01-0${week}',false);Planner.update(e.id,{distanceKm:8,durationSeconds:3000,runPlan:{...Planner.entries()[e.id].runPlan,asPlanned:true,logged:true,...${JSON.stringify(extra)}}});return e.id;})()`);
 log(2,{testSeconds:1740});
 assert.equal(client.run('RunPlan.pace(RunPlan.weeks[8])'),'5:43–5:48/km');
 const check=log(7,{effort:9});
 assert.equal(client.run('RunPlan.paceBonus()'),0);
 client.run(`Planner.update('${check}',{runPlan:{...Planner.entries()['${check}'].runPlan,effort:8}})`);
 assert.equal(client.run('RunPlan.paceBonus()'),5);
 assert.equal(client.run('RunPlan.pace(RunPlan.weeks[8])'),'5:38–5:43/km');
 assert.equal(client.run('RunPlan.pace(RunPlan.weeks[4])'),'5:38–5:43/km');
});

test('calendar workout types match the programme sessions and link to a free programme week without duplicates',()=>{
 const client=browserClient(new Map(),async()=>{throw Error('Preview must not fetch')},{preview:true});
 assert.equal(client.run('Planner.types().map(t=>t.name).join("|")'),'Full body A|Full body B|Full body C|Upper body|Lower body|Run');
 assert.equal(client.run('Planner.types()[0].exercises.join("|")'),programme.TRAINING_PROGRAMME.weeks[0].sessions[0].exercises.map(x=>x.name).join('|'));
 // Nothing scheduled yet: the first Full body A becomes week 1, the next one week 2.
 const first=client.run('Planner.add("prog:A","2099-01-05",false)');
 assert.equal(first.templateId,'full');assert.equal(first.gymPlan.week,1);assert.equal(first.gymPlan.session,'A');assert.equal(first.gymPlan.logged,false);
 assert.equal(client.run(`Planner.asTraining().find(e=>e.id==='${first.id}').title`),'W1 · Full body A');
 assert.equal(client.run('Planner.add("prog:A","2099-01-06",false)').gymPlan.week,2);
 // With the programme in the calendar, a date in week 5 takes week 5 when that session is free.
 assert.equal(client.run('RunPlan.weekFor("B","2099-02-04")'),5);
 assert.equal(client.run('Planner.add("prog:B","2099-02-04",false)').gymPlan.week,5);
 assert.equal(client.run('RunPlan.weekFor("B","2099-02-05")'),1);
 // Free workouts stay unlinked.
 const upper=client.run('Planner.add("upper","2099-01-07",false)');
 assert.equal(upper.gymPlan,undefined);assert.equal(upper.templateId,'upper');
 // Once all twelve are in the calendar, nothing more is added.
 client.run('RunPlan.setPlan("2099-01-05");RunPlan.applyPlan()');
 const count=client.run('Object.values(Planner.entries()).filter(e=>!e.deleted).length');
 assert.equal(client.run('RunPlan.weekFor("A","2099-01-12")'),null);
 assert.equal(client.run('Planner.add("prog:A","2099-01-12",false)'),null);
 assert.equal(client.run('Object.values(Planner.entries()).filter(e=>!e.deleted).length'),count);
 assert.equal(client.run('Object.values(Planner.entries()).filter(e=>!e.deleted&&e.gymPlan?.session==="A").length'),12);
});
