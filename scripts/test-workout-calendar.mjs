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
function browserClient(cacheStore, transport, configOverrides = {}) {
  const { TRAINING_HTML } = loadModule("src/app/l/[slug]/kracht-5km/training-html.ts");
  const config = {
    rowId: "test-user",
    workoutTemplates:workoutPlan.WORKOUT_TEMPLATES,plannerApi:"/test-workout-api",
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
  '@/lib/workout-planner':workoutPlan,'./training-html':html,
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
