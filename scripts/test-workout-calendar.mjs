import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import * as nodeCrypto from "node:crypto";
import test from "node:test";
import ts from "typescript";

// Execute the production TypeScript with an in-memory database. No real training
// data or Supabase credentials are read or written by these tests.
function loadModule(file, dependencies = {}) {
  const output = ts.transpileModule(fs.readFileSync(file, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
    reportDiagnostics: true,
  });
  const errors = output.diagnostics?.filter((d) => d.category === ts.DiagnosticCategory.Error) ?? [];
  assert.equal(errors.length, 0, errors.map((d) => ts.flattenDiagnosticMessageText(d.messageText, "\n")).join("\n"));
  const compiledModule = { exports: {} };
  vm.runInNewContext(output.outputText, {
    module: compiledModule, exports: compiledModule.exports, Request, Response, URL,
    console: { error() {} },
    require(name) {
      if (file.endsWith("training-html.ts") && name.startsWith("./planner-")) return loadModule("src/app/l/[slug]/kracht-5km/" + name.slice(2) + ".ts");
      assert.ok(Object.hasOwn(dependencies, name), `Unexpected dependency ${name}`);
      return dependencies[name];
    },
  }, { filename: file });
  return compiledModule.exports;
}

const library = loadModule("src/lib/training-library.ts");
const { TRAINING_HTML } = loadModule("src/app/l/[slug]/kracht-5km/training-html.ts");
const json = value => JSON.stringify(value);

function browserClient(cacheStore = new Map(), options = {}) {
  const config = {
    rowId: "test-user", apiKey: "test-key", name: "Test", api: "/test-api", preview: true,
    seeds: { exercises: library.SEED_EXERCISES, templates: library.SEED_TEMPLATES }, run: library.RUN_PROGRAMME,
    muscles: library.MUSCLES, loads: library.LOADS, weekTarget: library.WEEK_TARGET, ...options.config,
  };
  const elements = new Map();
  const element = (id) => {
    if (!elements.has(id)) elements.set(id, {
      textContent: "", innerHTML: "", hidden: false, value: "", dataset: {}, style: {},
      classList: { add() {}, remove() {}, toggle() {} },
      setAttribute() {}, removeAttribute() {}, addEventListener() {}, appendChild() {}, focus() {}, contains() { return false; },
      querySelectorAll() { return []; }, querySelector() { return null; },
    });
    return elements.get(id);
  };
  const script = TRAINING_HTML.match(/<script>([\s\S]*?)<\/script>/)[1]
    .replace("/*__TRAINING_CONFIG__*/", `window.__TRAINING__=${json(config)};`);
  const context = vm.createContext({
    window: { addEventListener() {} },
    document: { getElementById: element, querySelectorAll: () => [], addEventListener() {}, createElement: () => element("created"), body: { style: {}, classList: { add() {}, remove() {}, toggle() {} } } },
    localStorage: { getItem: (key) => cacheStore.get(key) ?? null, setItem: (key, value) => cacheStore.set(key, value) },
    fetch: options.fetch ?? (async () => { throw Error("Preview must not fetch"); }),
    AbortController, Blob, URL, crypto: nodeCrypto, setTimeout: () => 1, clearTimeout() {}, setInterval: () => 1,
  });
  vm.runInContext(script, context);
  // Values cross from the page context into the test: copy them so deep comparisons use this realm's prototypes.
  const run = (code) => { const value = vm.runInContext(code, context); return value && typeof value === "object" && typeof value.then !== "function" ? JSON.parse(JSON.stringify(value)) : value; };
  return { run, element, today: run("localToday()"), get: id => run("App.workout(" + json(id) + ")") };
}
const shift = (date, days) => { const d = new Date(date + "T12:00:00Z"); d.setUTCDate(d.getUTCDate() + days); return d.toISOString().slice(0, 10); };
const settle = () => new Promise((resolve) => setImmediate(resolve));

function trainingApi(store = new Map()) {
  const api = loadModule("src/app/api/training/route.ts", {
    "next/server": { NextResponse: { json: (body, init) => Response.json(body, init) } },
    "@/lib/loopschema": { profileForKey: key => key === "test-tom" ? { rowId: "tom" } : key === "test-other" ? { rowId: "denise" } : null },
    "@/lib/training-library": library,
    "@/lib/workout-storage": {
      localTrainingStorage: () => false,
      readTrainingPrefix: async prefix => [...store].filter(([id]) => id.startsWith(prefix)).map(([id, data]) => ({ id, data })),
      writeTrainingRow: async (id, data) => { store.set(id, structuredClone(data)); },
    },
  });
  const request = (method, doc, key = "test-tom") => new Request("http://localhost/api/training", { method, headers: { "Content-Type": "application/json", "x-loop-key": key }, ...(method === "POST" ? { body: typeof doc === "string" ? doc : json({ doc }) } : {}) });
  return { api, request, store };
}
const set = (patch = {}) => ({ id: nodeCrypto.randomUUID(), weightKg: null, reps: null, done: false, ...patch });
const gymFixture = (patch = {}) => ({
  type: "workout", id: nodeCrypto.randomUUID(), kind: "gym", date: "2026-11-03", deleted: false, updatedAt: 1793707200000, logged: false, note: "", title: "Full body A",
  templateId: "full-body-a", exercises: [{ id: nodeCrypto.randomUUID(), exerciseId: "bench-press", name: "Bench press", load: "total", targetSets: 3, repMin: 6, repMax: 10, pair: null, sets: [set({ weightKg: 42.5, reps: 10, done: true }), set()] }],
  runStep: null, distanceKm: null, durationSeconds: null, averageHeartRate: null, testSeconds: null, hamstring: null, ...patch,
});
const runFixture = (patch = {}) => gymFixture({ kind: "run", title: "Run", templateId: null, exercises: [], ...patch });

test("the seed library, the three templates and the run sequence pass the blocking validation", () => {
  assert.equal(library.validateSetup().join("; "), "");
  assert.equal(library.SEED_EXERCISES.length, 16);
  assert.equal(library.SEED_TEMPLATES.map(t => t.name).join(), "Full body A,Full body B,Full body C");
  for (const template of library.SEED_TEMPLATES) assert.ok(library.estimateMinutes(template) <= 60);
  const run = library.RUN_PROGRAMME;
  assert.equal(run.baselineSeconds, 29 * 60 + 23); assert.equal(run.goalSeconds, 27 * 60 + 30); assert.equal(run.runs.length, 12);
  assert.equal(run.runs.filter(r => r.kind === "interval" || r.kind === "tempo").length, 9);
  // The page no longer shows effort targets, rest times or the old programme.
  for (const gone of ["RIR", "Programma", "renschema", "Inspanning", "RunPlan", "__RUNPLAN", "Upper body"]) assert.ok(!TRAINING_HTML.includes(gone), gone + " is still on the page");
  assert.ok(!/__[A-Z_]+__\*\/|<!--__/.test(TRAINING_HTML.replace("/*__TRAINING_CONFIG__*/", "")), "an unfilled placeholder is left in the page");
});

test("the storage contract keeps proposals, confirmed sets and logged workouts apart", () => {
  const gym = gymFixture();
  assert.ok(library.normalizeDoc(gym));
  assert.ok(library.normalizeDoc({ ...gym, logged: true }));
  const open = { ...gym, exercises: [{ ...gym.exercises[0], sets: [set(), set({ weightKg: 40, reps: 8 })] }] };
  assert.ok(library.normalizeDoc(open), "typed but unconfirmed values are allowed");
  assert.equal(library.normalizeDoc({ ...open, logged: true }), null, "a workout without a confirmed set cannot be logged");
  const bad = [
    { id: "tom" }, { date: "2026-02-30" }, { kind: "swim" }, { deleted: "false" }, { updatedAt: 1e20 }, { distanceKm: 5 }, { runStep: 3 }, { title: "" }, { templateId: "Bad ID" },
    { exercises: [...gym.exercises, ...gym.exercises] },
    { exercises: [{ ...gym.exercises[0], sets: [set({ done: true })] }] },
    { exercises: [{ ...gym.exercises[0], sets: [set({ weightKg: -5, reps: 5 })] }] },
    { exercises: [{ ...gym.exercises[0], sets: [set({ reps: 1.5 })] }] },
    { exercises: [{ ...gym.exercises[0], load: "kilo" }] },
    { exercises: [{ ...gym.exercises[0], repMin: 12, repMax: 8 }] },
    { exercises: [{ ...gym.exercises[0], exerciseId: "" }] },
  ];
  for (const patch of bad) assert.equal(library.normalizeDoc({ ...gym, ...patch }), null, json(patch));
  assert.ok(library.normalizeDoc({ ...gym, exercises: [{ ...gym.exercises[0], repMin: null, repMax: null }] }), "an exercise added by hand has no rep target");

  const run = runFixture({ distanceKm: 6.4, durationSeconds: 2400, runStep: 2 });
  assert.ok(library.normalizeDoc({ ...run, logged: true }));
  assert.equal(library.normalizeDoc(runFixture({ logged: true })), null, "a run needs distance and time before it is logged");
  assert.equal(library.normalizeDoc({ ...run, testSeconds: 1700 }), null, "only the 5 km test has a test time");
  const testRun = runFixture({ runStep: 12, distanceKm: 8, durationSeconds: 3000, testSeconds: 1650, logged: true });
  assert.ok(library.normalizeDoc(testRun));
  for (const patch of [{ testSeconds: null }, { distanceKm: 4.9 }, { testSeconds: 3001 }]) assert.equal(library.normalizeDoc({ ...testRun, ...patch }), null);
  assert.equal(library.normalizeDoc({ ...run, exercises: gym.exercises }), null);

  assert.ok(library.normalizeDoc({ type: "exercise", id: nodeCrypto.randomUUID(), name: "Leg press (schijven)", muscle: "benen-voor", load: "total", archived: false, updatedAt: 5 }));
  for (const patch of [{ name: "  " }, { muscle: "nek" }, { load: "lbs" }, { archived: 0 }]) assert.equal(library.normalizeDoc({ ...library.SEED_EXERCISES[0], ...patch }), null);
  const template = library.SEED_TEMPLATES[0];
  for (const slots of [[{ ...template.slots[0], sets: 0 }], [{ ...template.slots[0], repMin: 12, repMax: 8 }], [{ ...template.slots[0], superset: "yes" }]]) assert.equal(library.normalizeDoc({ ...template, slots }), null);
  assert.equal(library.normalizeDoc({ type: "note", id: "x" }), null);
});

test("the API keeps every document in its own row and leaves earlier data and other users alone", async () => {
  const history = { original: true }, oldWorkout = { templateId: "upper" };
  const store = new Map([["tom", history], ["denise", { private: true }], ["tom:workout-sessions-v1:abc", oldWorkout]]), { api, request } = trainingApi(store);
  for (const key of ["", "bad", "test-other"]) {
    assert.equal((await api.GET(request("GET", null, key))).status, 403);
    assert.equal((await api.POST(request("POST", gymFixture(), key))).status, 403);
  }
  const a = gymFixture(), b = runFixture({ date: "2026-11-08" }), exercise = { type: "exercise", id: nodeCrypto.randomUUID(), name: "Cable fly", muscle: "borst", load: "total", archived: false, updatedAt: 9 };
  for (const doc of [a, b, exercise, { ...library.SEED_TEMPLATES[2], name: "Full body C kort", updatedAt: 10 }]) assert.equal((await api.POST(request("POST", doc))).status, 200);
  const result = await (await api.GET(request("GET"))).json();
  assert.equal(result.data.version, 2); assert.equal(Object.keys(result.data.docs).length, 4);
  assert.equal(result.data.docs["workout:" + a.id].exercises[0].sets[0].weightKg, 42.5);
  assert.equal(result.data.docs["template:full-body-c"].name, "Full body C kort");
  assert.equal(store.get("tom"), history); assert.equal(store.get("tom:workout-sessions-v1:abc"), oldWorkout); assert.equal(store.size, 7);
  assert.ok(store.has("tom:training-v2:workout:" + a.id));
  assert.equal((await api.POST(request("POST", { ...a, deleted: true, updatedAt: a.updatedAt + 1 }))).status, 200);
  const deleted = await (await api.GET(request("GET"))).json();
  assert.equal(deleted.data.docs["workout:" + a.id].deleted, true); assert.equal(deleted.data.docs["workout:" + a.id].exercises[0].name, "Bench press");
  assert.equal((await api.POST(request("POST", { ...a, id: "raceplan:w1r1" }))).status, 400);
  assert.equal((await api.POST(request("POST", { ...a, logged: true, exercises: [] }))).status, 400);
  assert.equal((await api.POST(request("POST", "{"))).status, 400);
  assert.equal((await api.POST(request("POST", "x".repeat(512001)))).status, 413);
  store.set("tom:training-v2:workout:broken", { type: "workout" });
  assert.equal((await api.GET(request("GET"))).status, 500, "a damaged row is reported, never silently dropped");
});

test("scheduling copies the template into the workout and never logs anything", () => {
  const client = browserClient(), today = client.today;
  const a = client.run(`App.add("tpl:full-body-a", ${json(today)}, false)`);
  assert.equal(a.logged, false); assert.equal(a.title, "Full body A"); assert.equal(a.templateId, "full-body-a");
  assert.deepEqual(a.exercises.map(r => r.name), ["Leg press", "Bench press", "Seated row", "Leg curl", "Lateral raise", "Triceps pushdown"]);
  assert.deepEqual(a.exercises.map(r => [r.targetSets, r.repMin, r.repMax]), [[3, 8, 12], [3, 6, 10], [3, 8, 12], [3, 10, 15], [3, 12, 15], [3, 10, 15]]);
  assert.ok(a.exercises.every(r => r.sets.length === 3 && r.sets.every(s => s.reps === null && s.weightKg === null && !s.done)));
  assert.equal(a.exercises[1].load, "total"); assert.equal(a.exercises[4].load, "per-dumbbell");
  assert.ok(a.exercises[4].pair && a.exercises[4].pair === a.exercises[5].pair, "the last two exercises are a superset");
  assert.equal(a.exercises[0].pair, null);
  // Opening and rendering the workout changes nothing.
  client.run(`App.open(${json(a.id)}); App.render()`);
  assert.equal(client.get(a.id).logged, false); assert.equal(client.get(a.id).updatedAt, a.updatedAt);
  assert.match(client.run(`App.finish(${json(a.id)})`), /Bevestig minstens één set/);
  assert.deepEqual(client.run("App.weekStats()"), { gym: 0, run: 0 });
  assert.deepEqual(client.run("App.types().map(t=>t.name)"), ["Full body A", "Full body B", "Full body C", "Run 1 van 12", "Losse run", "Lege workout"]);
  const empty = client.run(`App.add("empty", ${json(today)}, false)`);
  assert.equal(empty.exercises.length, 0); assert.equal(empty.templateId, null);
  client.run(`App.addExercise(${json(empty.id)}, App.exercise("squat"))`);
  assert.deepEqual(client.get(empty.id).exercises.map(r => [r.name, r.targetSets, r.repMin]), [["Squat", 3, null]]);
});

test("previous performance is shown per set and a grey proposal only counts once it is confirmed", () => {
  const client = browserClient(), today = client.today, lastWeek = shift(today, -7);
  const first = client.run(`App.add("tpl:full-body-c", ${json(lastWeek)}, false)`), row = first.exercises[0];
  assert.equal(row.name, "Dumbbell bench press");
  assert.equal(client.run(`App.previous(App.workout(${json(first.id)}), App.workout(${json(first.id)}).exercises[0])`), null);
  assert.equal(client.run(`App.tick(${json(first.id)}, ${json(row.id)}, ${json(row.sets[0].id)})`), false, "nothing to confirm without repetitions");
  [[20, 12], [20, 11]].forEach(([weight, reps], i) => {
    client.run(`App.setValue(${json(first.id)}, ${json(row.id)}, ${json(row.sets[i].id)}, "weightKg", ${weight}); App.setValue(${json(first.id)}, ${json(row.id)}, ${json(row.sets[i].id)}, "reps", ${reps})`);
    assert.equal(client.get(first.id).exercises[0].sets[i].done, false, "typing a value is not confirming it");
    assert.equal(client.run(`App.tick(${json(first.id)}, ${json(row.id)}, ${json(row.sets[i].id)})`), true);
  });
  // The third set was typed but never confirmed: it is not part of the record.
  client.run(`App.setValue(${json(first.id)}, ${json(row.id)}, ${json(row.sets[2].id)}, "reps", 9)`);
  assert.equal(client.run(`App.finish(${json(first.id)})`), "");
  assert.equal(client.get(first.id).logged, true);

  const second = client.run(`App.add("tpl:full-body-c", ${json(today)}, false)`), next = second.exercises[0];
  const previous = client.run(`App.previous(App.workout(${json(second.id)}), App.workout(${json(second.id)}).exercises[0])`);
  assert.equal(previous.same, true); assert.equal(previous.date, lastWeek);
  assert.deepEqual(previous.sets.map(s => [s.weightKg, s.reps]), [[20, 12], [20, 11]]);
  assert.equal(client.run(`App.prevText(App.previous(App.workout(${json(second.id)}), App.workout(${json(second.id)}).exercises[0]))`), "20 kg × 12 / 11");
  // The proposal is not stored: the new workout is still empty.
  assert.ok(client.get(second.id).exercises[0].sets.every(s => s.reps === null && s.weightKg === null && !s.done));
  // One tap confirms the proposal for set 1.
  assert.equal(client.run(`App.tick(${json(second.id)}, ${json(next.id)}, ${json(next.sets[0].id)})`), true);
  assert.deepEqual(client.get(second.id).exercises[0].sets[0], { id: next.sets[0].id, weightKg: 20, reps: 12, done: true });
  // A typed value wins over the proposal; the weight still comes from last time.
  client.run(`App.setValue(${json(second.id)}, ${json(next.id)}, ${json(next.sets[1].id)}, "reps", 12)`);
  client.run(`App.tick(${json(second.id)}, ${json(next.id)}, ${json(next.sets[1].id)})`);
  assert.deepEqual([client.get(second.id).exercises[0].sets[1].weightKg, client.get(second.id).exercises[0].sets[1].reps], [20, 12]);
  // There was no confirmed third set last time, so nothing is invented for it.
  assert.equal(client.run(`App.tick(${json(second.id)}, ${json(next.id)}, ${json(next.sets[2].id)})`), false);
  assert.equal(client.get(second.id).exercises[0].sets[2].reps, null);
  // Tapping a confirmed set again takes the confirmation back but keeps the numbers.
  client.run(`App.tick(${json(second.id)}, ${json(next.id)}, ${json(next.sets[0].id)})`);
  assert.deepEqual([client.get(second.id).exercises[0].sets[0].done, client.get(second.id).exercises[0].sets[0].reps], [false, 12]);
  // The earlier workout is untouched.
  assert.deepEqual(client.get(first.id).exercises[0].sets.map(s => [s.weightKg, s.reps, s.done]), [[20, 12, true], [20, 11, true], [null, 9, false]]);
  const html = client.run(`App.open(${json(second.id)}); activeView="workout"; App.render(); document.getElementById("plannerEditor").innerHTML`);
  assert.match(html, /Vorige keer \([^)]*\): <b>20 kg × 12 \/ 11<\/b>/); assert.match(html, /placeholder="11"/); assert.match(html, /3 × 8–12/);
  assert.ok(!/RIR|rust /i.test(html));
});

test("previous prefers the same template, falls back to the exercise and never merges by name", () => {
  const client = browserClient(), today = client.today;
  const confirm = (workout, index, weight, reps) => { const row = workout.exercises[index];
    client.run(`App.setValue(${json(workout.id)}, ${json(row.id)}, ${json(row.sets[0].id)}, "weightKg", ${weight}); App.setValue(${json(workout.id)}, ${json(row.id)}, ${json(row.sets[0].id)}, "reps", ${reps}); App.tick(${json(workout.id)}, ${json(row.id)}, ${json(row.sets[0].id)})`); };
  const prev = (workout, index) => client.run(`App.previous(App.workout(${json(workout.id)}), App.workout(${json(workout.id)}).exercises[${index}])`);
  const oldA = client.run(`App.add("tpl:full-body-a", ${json(shift(today, -10))}, false)`); confirm(oldA, 0, 100, 10);
  const recentB = client.run(`App.add("tpl:full-body-b", ${json(shift(today, -3))}, false)`); confirm(recentB, 3, 80, 15);
  const future = client.run(`App.add("tpl:full-body-a", ${json(shift(today, 5))}, false)`); confirm(future, 0, 140, 8);
  const now = client.run(`App.add("tpl:full-body-a", ${json(today)}, false)`);
  // Leg press: the same template wins, even though B was more recent. Later workouts are ignored.
  assert.deepEqual([prev(now, 0).same, prev(now, 0).sets[0].weightKg, prev(now, 0).title], [true, 100, "Full body A"]);
  // In C there is no earlier C, so the last time anywhere is shown with its workout name.
  const c = client.run(`App.add("tpl:full-body-c", ${json(today)}, false)`);
  assert.deepEqual([prev(c, 3).same, prev(c, 3).sets[0].weightKg, prev(c, 3).title], [false, 80, "Full body B"]);
  // A second machine is its own exercise: same word in the name, separate history.
  const other = client.run(`App.saveExercise(null, {name:"Leg press (stapel)", muscle:"benen-voor", load:"total"})`);
  assert.equal(client.run(`App.addExercise(${json(now.id)}, App.exercise(${json(other.id)}))`), true);
  assert.equal(prev(client.get(now.id), 6), null);
  assert.match(client.run(`App.saveExercise(null, {name:"leg press", muscle:"benen-voor", load:"total"})`), /bestaat al/);
  // Renaming keeps the ID, so the history stays with the exercise.
  const renamed = client.run(`App.saveExercise(App.exercise("leg-press"), {name:"Leg press (schijven)", muscle:"benen-voor", load:"total"})`);
  assert.equal(renamed.id, "leg-press"); assert.equal(prev(now, 0).sets[0].weightKg, 100);
  assert.equal(client.get(oldA.id).exercises[0].name, "Leg press", "the earlier workout keeps the name it was done under");
  assert.equal(client.run(`App.add("tpl:full-body-a", ${json(today)}, false).exercises[0].name`), "Leg press (schijven)");
});

test("changing a template only reaches workouts added afterwards", () => {
  const client = browserClient(), today = client.today;
  const before = client.run(`App.add("tpl:full-body-b", ${json(shift(today, 2))}, false)`);
  client.run(`(() => { const t = App.tpl("full-body-b"); App.saveTemplate({...t, slots: [{exerciseId:"squat", sets:4, repMin:5, repMax:8, superset:false}, ...t.slots.slice(1, 3)]}); })()`);
  assert.equal(library.SEED_TEMPLATES[1].slots.length, 6, "the seed itself is not mutated");
  assert.deepEqual(client.get(before.id).exercises.map(r => r.name).slice(0, 2), ["Romanian deadlift", "Incline dumbbell press"]);
  assert.equal(client.get(before.id).exercises.length, 6);
  const after = client.run(`App.add("tpl:full-body-b", ${json(shift(today, 9))}, false)`);
  assert.deepEqual(after.exercises.map(r => [r.name, r.targetSets, r.repMin, r.repMax]), [["Squat", 4, 5, 8], ["Incline dumbbell press", 3, 8, 12], ["Lat pulldown", 3, 8, 12]]);
  // A superset flag on the last exercise is dropped, and an archived template is no longer offered.
  client.run(`(() => { const t = App.tpl("full-body-b"); App.saveTemplate({...t, slots: t.slots.map(s => ({...s, superset: true})), archived: true}); })()`);
  assert.deepEqual(client.run(`App.tpl("full-body-b").slots.map(s=>s.superset)`), [true, true, false]);
  assert.ok(!client.run("App.types().map(t=>t.name)").includes("Full body B"));
  assert.equal(client.get(before.id).title, "Full body B");
  const custom = client.run("App.newTemplate()");
  assert.equal(custom.name, "Nieuwe template"); assert.equal(client.run("App.newTemplate().name"), "Nieuwe template 2");
});

test("the order can be changed during a workout; supersets move as one block and the template keeps its order", () => {
  const client = browserClient(), today = client.today;
  const w = client.run(`App.add("tpl:full-body-a", ${json(today)}, false)`), names = () => client.get(w.id).exercises.map(r => r.name);
  assert.deepEqual(client.run(`App.blocks(App.workout(${json(w.id)})).map(b=>b.length)`), [1, 1, 1, 1, 2]);
  // Leg press is taken: start with bench press.
  assert.equal(client.run(`App.moveBlock(${json(w.id)}, ${json(w.exercises[1].id)}, -1)`), true);
  assert.deepEqual(names().slice(0, 2), ["Bench press", "Leg press"]);
  assert.equal(client.run(`App.moveBlock(${json(w.id)}, ${json(w.exercises[1].id)}, -1)`), false, "already first");
  // The superset moves to the top as a pair.
  const order = [w.exercises[4].id, w.exercises[1].id, w.exercises[0].id, w.exercises[2].id, w.exercises[3].id];
  assert.equal(client.run(`App.reorder(${json(w.id)}, ${json(order)})`), true);
  assert.deepEqual(names(), ["Lateral raise", "Triceps pushdown", "Bench press", "Leg press", "Seated row", "Leg curl"]);
  assert.equal(client.run(`App.reorder(${json(w.id)}, ${json(order.slice(1))})`), false, "an incomplete order is refused");
  assert.equal(client.get(w.id).exercises.length, 6);
  assert.deepEqual(client.run(`App.tpl("full-body-a").slots.map(s=>s.exerciseId)`).slice(0, 2), ["leg-press", "bench-press"]);
  assert.equal(client.run(`App.add("tpl:full-body-a", ${json(today)}, false).exercises[0].name`), "Leg press");
});

test("swapping, removing and finishing protect what was already confirmed", () => {
  const client = browserClient(), today = client.today;
  const w = client.run(`App.add("tpl:full-body-a", ${json(today)}, false)`), row = w.exercises[0];
  assert.equal(client.run(`App.swapExercise(${json(w.id)}, ${json(row.id)}, App.exercise("squat"))`), true);
  assert.deepEqual([client.get(w.id).exercises[0].name, client.get(w.id).exercises[0].exerciseId, client.get(w.id).exercises[0].repMax], ["Squat", "squat", 12]);
  client.run(`App.setValue(${json(w.id)}, ${json(row.id)}, ${json(row.sets[0].id)}, "reps", 8); App.tick(${json(w.id)}, ${json(row.id)}, ${json(row.sets[0].id)})`);
  assert.equal(client.run(`App.swapExercise(${json(w.id)}, ${json(row.id)}, App.exercise("leg-press"))`), false, "confirmed sets keep their exercise");
  assert.equal(client.get(w.id).exercises[0].name, "Squat");
  assert.equal(client.run(`App.addSet(${json(w.id)}, ${json(row.id)})`), true); assert.equal(client.get(w.id).exercises[0].sets.length, 4);
  assert.equal(client.run(`App.removeLastSet(${json(w.id)}, ${json(row.id)})`), true); assert.equal(client.get(w.id).exercises[0].sets.length, 3);
  assert.equal(client.run(`App.finish(${json(w.id)})`), ""); assert.equal(client.get(w.id).logged, true);
  assert.deepEqual(client.run("App.weekStats()"), { gym: 1, run: 0 });
  // Clearing the only confirmed set, or moving the workout to the future, takes the log back.
  client.run(`App.setValue(${json(w.id)}, ${json(row.id)}, ${json(row.sets[0].id)}, "reps", null)`);
  assert.deepEqual([client.get(w.id).exercises[0].sets[0].done, client.get(w.id).logged], [false, false]);
  client.run(`App.setValue(${json(w.id)}, ${json(row.id)}, ${json(row.sets[0].id)}, "reps", 8); App.tick(${json(w.id)}, ${json(row.id)}, ${json(row.sets[0].id)}); App.finish(${json(w.id)})`);
  client.run(`App.put({...App.workout(${json(w.id)}), date: ${json(shift(today, 3))}})`);
  assert.equal(client.get(w.id).logged, false);
  assert.match(client.run(`App.finish(${json(w.id)})`), /toekomst/);
  for (const doc of Object.values(client.run("App.docs()"))) assert.ok(library.normalizeDoc(JSON.parse(json(doc))), "every stored document passes the server contract");
});

test("the run sequence offers the next run, the test needs its own time and the week counts two gym sessions and one run", () => {
  const client = browserClient(), today = client.today, monday = shift(today, -((new Date(today + "T12:00:00Z").getUTCDay() + 6) % 7));
  assert.equal(client.run("App.nextStep()"), 1);
  const first = client.run(`App.add("run:next", ${json(monday)}, false)`);
  assert.deepEqual([first.kind, first.runStep, first.title, first.logged], ["run", 1, "Run 1 · Rustig hervatten", false]);
  assert.equal(client.run("App.nextStep()"), 2); assert.equal(client.run("App.nextOpen()"), 1);
  assert.equal(client.run(`App.add("run:1", ${json(today)}, false).id`), first.id, "a run of the sequence exists only once");
  assert.match(client.run(`App.finish(${json(first.id)})`), /afstand en totale tijd/);
  client.run(`App.put({...App.workout(${json(first.id)}), distanceKm: 5, durationSeconds: 1950})`);
  assert.equal(client.run(`App.finish(${json(first.id)})`), ""); assert.equal(client.run("App.nextOpen()"), 2);
  assert.equal(client.run("App.paceLabel(CONFIG.run.runs[1])"), "5:30 per km");
  assert.equal(client.run("App.paceLabel(CONFIG.run.runs[2])"), "6:05–6:15 per km");
  assert.equal(client.run("App.paceLabel(CONFIG.run.runs[0])"), "praattempo");
  const test12 = client.run(`App.add("run:12", ${json(monday)}, false)`);
  client.run(`App.put({...App.workout(${json(test12.id)}), distanceKm: 8, durationSeconds: 3000})`);
  assert.match(client.run(`App.finish(${json(test12.id)})`), /5 km-testtijd/);
  client.run(`App.put({...App.workout(${json(test12.id)}), testSeconds: 1648})`);
  assert.equal(client.run(`App.finish(${json(test12.id)})`), "");
  const html = client.run(`App.render(); activeView="run"; App.render(); document.getElementById("runView").innerHTML`);
  assert.match(html, /5 km in 27:30/); assert.match(html, /Eindtest<\/span><strong>27:28/); assert.match(html, /Nulmeting was 29:23/); assert.match(html, /2 \/ 12/);

  // Week line: two gym sessions are the base, the third is extra and never missed.
  assert.equal(client.run("App.weekText()"), "Deze week: gym 0 van 2 · run 1 van 1 (+1 extra)");
  for (const id of ["full-body-a", "full-body-b", "full-body-c"]) {
    const w = client.run(`App.add("tpl:${id}", ${json(monday)}, false)`), row = w.exercises[0];
    client.run(`App.setValue(${json(w.id)}, ${json(row.id)}, ${json(row.sets[0].id)}, "reps", 10); App.tick(${json(w.id)}, ${json(row.id)}, ${json(row.sets[0].id)}); App.finish(${json(w.id)})`);
  }
  assert.equal(client.run("App.weekText()"), "Deze week: gym 2 van 2 (+1 extra) · run 1 van 1 (+1 extra)");
  assert.deepEqual(client.run(`App.weekStats(${json(shift(monday, -1))})`), { gym: 0, run: 0 });
});

test("offline changes survive a reload, sync later and never reach the earlier calendar's storage", async () => {
  let online = false; const server = {}, writes = [], cache = new Map();
  const fetch = async (url, options) => {
    assert.equal(url, "/test-api");
    if (!online) throw Error("Offline");
    if (options.method === "POST") { const { doc } = JSON.parse(options.body); assert.ok(library.normalizeDoc(doc), "the client only sends valid documents"); writes.push(doc); server[doc.type + ":" + doc.id] = doc; return { ok: true, json: async () => ({ ok: true }) }; }
    return { ok: true, json: async () => ({ data: { version: 2, docs: structuredClone(server), storage: "cloud" } }) };
  };
  const config = { preview: false };
  const client = browserClient(cache, { fetch, config });
  await client.run("App.load()"); await settle();
  const w = client.run(`App.add("tpl:full-body-a", ${json(client.today)}, false)`), row = w.exercises[0];
  client.run(`App.setValue(${json(w.id)}, ${json(row.id)}, ${json(row.sets[0].id)}, "reps", 9); App.tick(${json(w.id)}, ${json(row.id)}, ${json(row.sets[0].id)})`);
  await client.run("App.flush()"); await settle();
  assert.equal(writes.length, 0); assert.equal(client.run("App.pending().size"), 1);
  assert.deepEqual([...cache.keys()], ["training-v2-test-user"], "the earlier calendar cache key is not used");

  // Reload while still offline: the confirmed set is still there.
  const reloaded = browserClient(cache, { fetch, config });
  assert.equal(reloaded.get(w.id).exercises[0].sets[0].done, true);
  online = true; await reloaded.run("App.load()"); await settle(); await settle();
  assert.equal(writes.length, 1); assert.equal(server["workout:" + w.id].exercises[0].sets[0].reps, 9);
  assert.equal(reloaded.run("App.pending().size"), 0);

  // A second device sees the workout; deleting is a tombstone that can be undone.
  const second = browserClient(new Map(), { fetch, config });
  await second.run("App.load()"); await settle();
  assert.equal(second.get(w.id).title, "Full body A");
  second.run(`App.remove(${json(w.id)})`); await second.run("App.flush()"); await settle();
  assert.equal(server["workout:" + w.id].deleted, true); assert.equal(second.run("App.workouts().length"), 0);
  assert.equal(server["workout:" + w.id].exercises[0].sets[0].reps, 9, "a removed workout keeps its record");
});
