// Kracht & 5 km, second model: exercise library -> workout templates -> scheduled
// workouts -> recorded performance. This file is the single source for the seed
// library, the three fixed templates, the twelve-run sequence and the storage
// contract. It stays dependency-free so the build validator can load it directly.
//
// Stored documents live under their own namespace. Rows written by the earlier
// calendar (workout-sessions-v1) are never read, changed or removed from here.

export const TRAINING_NAMESPACE = "training-v2";

export const MUSCLES = [
  ["borst", "Borst"], ["rug", "Rug"], ["schouders", "Schouders"], ["benen-voor", "Benen voor"],
  ["benen-achter", "Benen achter"], ["kuiten", "Kuiten"], ["armen", "Armen"], ["romp", "Romp"], ["overig", "Overig"],
] as const;
export type Muscle = (typeof MUSCLES)[number][0];

// How the weight of a set is written down. It is part of the exercise, so a number always keeps its meaning.
export const LOADS = [
  ["total", "Totaalgewicht"], ["per-dumbbell", "Per dumbbell"], ["bodyweight", "Lichaamsgewicht + extra"], ["none", "Zonder gewicht"],
] as const;
export type Load = (typeof LOADS)[number][0];

export type ExerciseDoc = { type: "exercise"; id: string; name: string; muscle: Muscle; load: Load; archived: boolean; updatedAt: number };
export type TemplateSlot = { exerciseId: string; sets: number; repMin: number; repMax: number; superset: boolean };
export type TemplateDoc = { type: "template"; id: string; name: string; slots: TemplateSlot[]; archived: boolean; updatedAt: number };
export type WorkoutSet = { id: string; weightKg: number | null; reps: number | null; done: boolean };
// A workout carries its own copy of the prescription (name, load, sets, reps), so later
// changes to a template or a renamed exercise never change what an earlier workout meant.
export type WorkoutExercise = {
  id: string; exerciseId: string; name: string; load: Load;
  targetSets: number; repMin: number | null; repMax: number | null; pair: string | null; sets: WorkoutSet[];
};
export type WorkoutDoc = {
  type: "workout"; id: string; kind: "gym" | "run"; date: string; deleted: boolean; updatedAt: number;
  logged: boolean; note: string; title: string;
  templateId: string | null; exercises: WorkoutExercise[];
  runStep: number | null; distanceKm: number | null; durationSeconds: number | null;
  averageHeartRate: number | null; testSeconds: number | null; hamstring: "goed" | "licht" | "erger" | null;
};
export type TrainingDoc = ExerciseDoc | TemplateDoc | WorkoutDoc;

// ---- Seed library: deliberately narrow. More exercises are added in the app. ----
const seed = (id: string, name: string, muscle: Muscle, load: Load): ExerciseDoc => ({ type: "exercise", id, name, muscle, load, archived: false, updatedAt: 1 });
export const SEED_EXERCISES: ExerciseDoc[] = [
  seed("bench-press", "Bench press", "borst", "total"),
  seed("dumbbell-bench-press", "Dumbbell bench press", "borst", "per-dumbbell"),
  seed("incline-dumbbell-press", "Incline dumbbell press", "borst", "per-dumbbell"),
  seed("lat-pulldown", "Lat pulldown", "rug", "total"),
  seed("seated-row", "Seated row", "rug", "total"),
  seed("shoulder-press", "Shoulder press", "schouders", "per-dumbbell"),
  seed("lateral-raise", "Lateral raise", "schouders", "per-dumbbell"),
  seed("squat", "Squat", "benen-voor", "total"),
  seed("leg-press", "Leg press", "benen-voor", "total"),
  seed("deadlift", "Deadlift", "benen-achter", "total"),
  seed("romanian-deadlift", "Romanian deadlift", "benen-achter", "total"),
  seed("leg-curl", "Leg curl", "benen-achter", "total"),
  seed("calf-raise", "Calf raise", "kuiten", "total"),
  seed("biceps-curl", "Biceps curl", "armen", "per-dumbbell"),
  seed("triceps-pushdown", "Triceps pushdown", "armen", "total"),
  seed("hanging-knee-raise", "Hanging knee raise", "romp", "none"),
];

// ---- The three fixed templates. A and B are the base; C is the optional third session. ----
const slot = (exerciseId: string, sets: number, repMin: number, repMax: number, superset = false): TemplateSlot => ({ exerciseId, sets, repMin, repMax, superset });
export const BASE_TEMPLATE_IDS = ["full-body-a", "full-body-b"];
export const SEED_TEMPLATES: TemplateDoc[] = [
  { type: "template", id: "full-body-a", name: "Full body A", archived: false, updatedAt: 1, slots: [
    slot("leg-press", 3, 8, 12), slot("bench-press", 3, 6, 10), slot("seated-row", 3, 8, 12), slot("leg-curl", 3, 10, 15),
    slot("lateral-raise", 3, 12, 15, true), slot("triceps-pushdown", 3, 10, 15),
  ] },
  { type: "template", id: "full-body-b", name: "Full body B", archived: false, updatedAt: 1, slots: [
    slot("romanian-deadlift", 3, 8, 12), slot("incline-dumbbell-press", 3, 8, 12), slot("lat-pulldown", 3, 8, 12), slot("leg-press", 3, 10, 15),
    slot("calf-raise", 3, 10, 15, true), slot("biceps-curl", 3, 10, 15),
  ] },
  { type: "template", id: "full-body-c", name: "Full body C", archived: false, updatedAt: 1, slots: [
    slot("dumbbell-bench-press", 3, 8, 12), slot("seated-row", 3, 8, 12), slot("shoulder-press", 3, 8, 12), slot("leg-press", 2, 10, 15),
    slot("biceps-curl", 3, 10, 15, true), slot("triceps-pushdown", 3, 10, 15),
  ] },
];
export const WEEK_TARGET = { gym: 2, run: 1 };

// ---- The run sequence: twelve runs from the recorded baseline to the goal. ----
// Baseline: the fastest recorded 5 km (6 August 2026). Goal: 27:30. Both are fixed facts
// agreed with the athlete; every training pace below is derived from one of the two.
export type RunStep = {
  step: number; title: string; kind: "easy" | "interval" | "tempo" | "test";
  main: string; paceSeconds: [number, number] | null; recovery: string; totalKm: string; note: string;
};
const GOAL_PACE = 330; // 27:30 over 5 km
export const RUN_PROGRAMME = {
  id: "five-k-2730-v1",
  baselineSeconds: 1763, baselineDate: "2026-08-06", goalSeconds: 1650, testStep: 12,
  warmup: "2 km rustig inlopen, afsluiten met 3 versnellingen van 20 seconden",
  cooldown: "1 km rustig uitlopen",
  runs: [
    { step: 1, title: "Rustig hervatten", kind: "easy", main: "5 km rustig", paceSeconds: null, recovery: "", totalKm: "5", note: "Praattempo. Sluit af met 4 korte versnellingen van 20 seconden." },
    { step: 2, title: "Intervals", kind: "interval", main: "6 × 400 m", paceSeconds: [GOAL_PACE, GOAL_PACE], recovery: "200 m rustig joggen of wandelen", totalKm: "6,4", note: "Je doeltempo in korte stukken. Houd alle herhalingen even snel." },
    { step: 3, title: "Tempo", kind: "tempo", main: "3 × 1 km", paceSeconds: [365, 375], recovery: "400 m rustig joggen", totalKm: "6,8", note: "Stevig maar beheerst. De derde kilometer is niet sneller dan de eerste." },
    { step: 4, title: "Intervals", kind: "interval", main: "8 × 400 m", paceSeconds: [GOAL_PACE, GOAL_PACE], recovery: "200 m rustig joggen of wandelen", totalKm: "7,6", note: "Zelfde tempo als run 2, twee herhalingen meer." },
    { step: 5, title: "Tempo", kind: "tempo", main: "2 × 2 km", paceSeconds: [365, 375], recovery: "400 m rustig joggen", totalKm: "7,4", note: "Zelfde tempo als run 3, nu langer." },
    { step: 6, title: "Intervals", kind: "interval", main: "5 × 800 m", paceSeconds: [GOAL_PACE, GOAL_PACE], recovery: "400 m rustig joggen", totalKm: "8,6", note: "Doeltempo over langere stukken." },
    { step: 7, title: "Rustig", kind: "easy", main: "6 km rustig", paceSeconds: null, recovery: "", totalKm: "6", note: "Praattempo, zonder versnellingen." },
    { step: 8, title: "Intervals", kind: "interval", main: "4 × 1 km", paceSeconds: [GOAL_PACE, GOAL_PACE], recovery: "2 minuten wandelen of rustig joggen", totalKm: "7,6", note: "Doeltempo per kilometer." },
    { step: 9, title: "Tempo", kind: "tempo", main: "2 × 2,5 km", paceSeconds: [360, 370], recovery: "400 m rustig joggen", totalKm: "8,4", note: "De langste tempotraining. De tweede herhaling is even snel als de eerste." },
    { step: 10, title: "Intervals", kind: "interval", main: "5 × 1 km", paceSeconds: [GOAL_PACE, GOAL_PACE], recovery: "2 minuten wandelen of rustig joggen", totalKm: "8,8", note: "De volledige 5 km op doeltempo, in stukken." },
    { step: 11, title: "Aanscherpen", kind: "interval", main: "4 × 400 m", paceSeconds: [325, 325], recovery: "200 m rustig joggen of wandelen", totalKm: "5,2", note: "Kort en scherp. Je stopt terwijl het nog makkelijk voelt." },
    { step: 12, title: "5 km-test", kind: "test", main: "5 km aaneengesloten", paceSeconds: [GOAL_PACE, GOAL_PACE], recovery: "", totalKm: "8", note: "Start op je doeltempo en versnel alleen in de laatste kilometer als het kan. Neem de tijd over precies 5 km." },
  ] as RunStep[],
};

// ---- Storage contract ----
const ID = /^[a-z0-9][a-z0-9-]{0,63}$/;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
const isObject = (value: unknown): value is Record<string, unknown> => Boolean(value) && typeof value === "object" && !Array.isArray(value);
const validId = (value: unknown): value is string => typeof value === "string" && ID.test(value);
const validUuid = (value: unknown): value is string => typeof value === "string" && UUID.test(value);
const validStamp = (value: unknown): value is number => typeof value === "number" && Number.isSafeInteger(value) && value > 0 && value <= 8640000000000000;
const validName = (value: unknown, max: number): value is string => typeof value === "string" && value.trim().length > 0 && value.length <= max;
const intBetween = (value: unknown, min: number, max: number): value is number => typeof value === "number" && Number.isInteger(value) && value >= min && value <= max;
function metric(value: unknown, max: number, integer = false, zero = false): value is number | null {
  return value === null || typeof value === "number" && Number.isFinite(value) && value >= (zero ? 0 : 1) && value <= max && (!integer || Number.isInteger(value));
}
function validDate(value: unknown): value is string {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(value + "T12:00:00Z");
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
}
const isMuscle = (value: unknown): value is Muscle => MUSCLES.some(item => item[0] === value);
const isLoad = (value: unknown): value is Load => LOADS.some(item => item[0] === value);

export function docKey(doc: { type: string; id: string }): string { return doc.type + ":" + doc.id; }

function normalizeExercise(v: Record<string, unknown>): ExerciseDoc | null {
  if (!validId(v.id) || !validName(v.name, 60) || !isMuscle(v.muscle) || !isLoad(v.load) || typeof v.archived !== "boolean" || !validStamp(v.updatedAt)) return null;
  return { type: "exercise", id: v.id, name: v.name.trim(), muscle: v.muscle, load: v.load, archived: v.archived, updatedAt: v.updatedAt };
}
function normalizeTemplate(v: Record<string, unknown>): TemplateDoc | null {
  if (!validId(v.id) || !validName(v.name, 60) || typeof v.archived !== "boolean" || !validStamp(v.updatedAt) || !Array.isArray(v.slots) || v.slots.length > 20) return null;
  const slots: TemplateSlot[] = [];
  for (const raw of v.slots) {
    if (!isObject(raw) || !validId(raw.exerciseId) || !intBetween(raw.sets, 1, 10) || !intBetween(raw.repMin, 1, 100) || !intBetween(raw.repMax, 1, 100) || raw.repMin > raw.repMax || typeof raw.superset !== "boolean") return null;
    slots.push({ exerciseId: raw.exerciseId, sets: raw.sets, repMin: raw.repMin, repMax: raw.repMax, superset: raw.superset });
  }
  return { type: "template", id: v.id, name: v.name.trim(), slots, archived: v.archived, updatedAt: v.updatedAt };
}
function normalizeWorkout(v: Record<string, unknown>): WorkoutDoc | null {
  if (!validUuid(v.id) || (v.kind !== "gym" && v.kind !== "run") || !validDate(v.date) || typeof v.deleted !== "boolean" || !validStamp(v.updatedAt)) return null;
  if (typeof v.logged !== "boolean" || typeof v.note !== "string" || v.note.length > 1000 || !validName(v.title, 80)) return null;
  if (!(v.templateId === null || validId(v.templateId)) || !Array.isArray(v.exercises) || v.exercises.length > 40) return null;
  if (!(v.runStep === null || intBetween(v.runStep, 1, RUN_PROGRAMME.runs.length))) return null;
  if (!metric(v.distanceKm, 1000, false, true) || v.distanceKm === 0 || !metric(v.durationSeconds, 86400, true) || !metric(v.averageHeartRate, 300, true) || !metric(v.testSeconds, 86400, true)) return null;
  if (![null, "goed", "licht", "erger"].includes(v.hamstring as string | null)) return null;
  const exercises: WorkoutExercise[] = [];
  const ids = new Set<string>();
  for (const raw of v.exercises) {
    if (!isObject(raw) || !validUuid(raw.id) || ids.has(raw.id) || !validId(raw.exerciseId) || !validName(raw.name, 60) || !isLoad(raw.load)) return null;
    if (!intBetween(raw.targetSets, 1, 20) || !(raw.pair === null || validUuid(raw.pair)) || !Array.isArray(raw.sets) || raw.sets.length > 20) return null;
    const ranged = intBetween(raw.repMin, 1, 100) && intBetween(raw.repMax, 1, 100) && raw.repMin <= raw.repMax;
    if (!ranged && !(raw.repMin === null && raw.repMax === null)) return null;
    const sets: WorkoutSet[] = [];
    const setIds = new Set<string>();
    for (const rawSet of raw.sets) {
      if (!isObject(rawSet) || !validUuid(rawSet.id) || setIds.has(rawSet.id) || !metric(rawSet.weightKg, 2000, false, true) || !metric(rawSet.reps, 1000, true) || typeof rawSet.done !== "boolean") return null;
      // A confirmed set always has repetitions; a proposal is never stored as done.
      if (rawSet.done && rawSet.reps === null) return null;
      setIds.add(rawSet.id); sets.push({ id: rawSet.id, weightKg: rawSet.weightKg, reps: rawSet.reps, done: rawSet.done });
    }
    ids.add(raw.id);
    exercises.push({ id: raw.id, exerciseId: raw.exerciseId, name: raw.name.trim(), load: raw.load, targetSets: raw.targetSets, repMin: ranged ? raw.repMin as number : null, repMax: ranged ? raw.repMax as number : null, pair: raw.pair, sets });
  }
  if (v.kind === "gym") {
    if (v.runStep !== null || v.distanceKm !== null || v.durationSeconds !== null || v.averageHeartRate !== null || v.testSeconds !== null || v.hamstring !== null) return null;
    // Opening or scheduling a workout never logs it: logged needs at least one confirmed set.
    if (v.logged && !exercises.some(row => row.sets.some(set => set.done))) return null;
  } else {
    if (exercises.length || v.templateId !== null) return null;
    const test = v.runStep === RUN_PROGRAMME.testStep;
    if (!test && v.testSeconds !== null) return null;
    if (v.logged && (!v.distanceKm || !v.durationSeconds)) return null;
    if (v.logged && test && (!v.testSeconds || Number(v.distanceKm) < 5 || Number(v.testSeconds) > Number(v.durationSeconds))) return null;
  }
  return {
    type: "workout", id: v.id, kind: v.kind, date: v.date, deleted: v.deleted, updatedAt: v.updatedAt, logged: v.logged, note: v.note, title: v.title.trim(),
    templateId: v.templateId, exercises, runStep: v.runStep, distanceKm: v.distanceKm, durationSeconds: v.durationSeconds,
    averageHeartRate: v.averageHeartRate, testSeconds: v.testSeconds, hamstring: v.hamstring as WorkoutDoc["hamstring"],
  };
}
export function normalizeDoc(value: unknown): TrainingDoc | null {
  if (!isObject(value)) return null;
  if (value.type === "exercise") return normalizeExercise(value);
  if (value.type === "template") return normalizeTemplate(value);
  if (value.type === "workout") return normalizeWorkout(value);
  return null;
}

// A deliberately conservative estimate, used to keep the seed templates near an hour.
export function estimateMinutes(template: TemplateDoc): number {
  let seconds = 6 * 60 + 4 * 60; // general warm-up and ramp-up sets for the first two lifts
  let stations = 0;
  for (let index = 0; index < template.slots.length; index++) {
    const current = template.slots[index];
    const second = index > 0 && template.slots[index - 1].superset;
    if (!second) stations++;
    // In a superset only the second exercise is followed by the rest period.
    const rest = current.superset && index < template.slots.length - 1 ? 10 : second ? 75 : 120;
    seconds += current.sets * (40 + rest);
  }
  return Math.round(seconds / 60 + stations);
}

// Blocking validation: a seed set that breaks these rules must not be deployable.
export function validateSetup(): string[] {
  const errors: string[] = [];
  const exercises = new Map(SEED_EXERCISES.map(item => [item.id, item]));
  if (exercises.size !== SEED_EXERCISES.length) errors.push("Duplicate exercise ID in the seed library");
  for (const item of SEED_EXERCISES) if (!normalizeDoc(item)) errors.push("Seed exercise " + item.id + " breaks the storage contract");
  const names = new Set(SEED_EXERCISES.map(item => item.name.toLowerCase()));
  if (names.size !== SEED_EXERCISES.length) errors.push("Two seed exercises share a name");
  if (new Set(SEED_TEMPLATES.map(item => item.id)).size !== SEED_TEMPLATES.length) errors.push("Duplicate template ID");
  for (const template of SEED_TEMPLATES) {
    const label = template.name;
    if (!normalizeDoc(template)) errors.push(label + ": breaks the storage contract");
    if (template.slots.length < 5 || template.slots.length > 7) errors.push(label + ": expected 5–7 exercises");
    if (new Set(template.slots.map(item => item.exerciseId)).size !== template.slots.length) errors.push(label + ": duplicate exercise");
    for (const item of template.slots) if (!exercises.has(item.exerciseId)) errors.push(label + ": unknown exercise " + item.exerciseId);
    if (template.slots.at(-1)?.superset) errors.push(label + ": the last exercise cannot start a superset");
    if (template.slots.some((item, index) => item.superset && template.slots[index + 1]?.superset)) errors.push(label + ": a superset has two exercises");
    const sets = template.slots.reduce((sum, item) => sum + item.sets, 0);
    if (sets > 18) errors.push(label + ": " + sets + " sets, over 18");
    const minutes = estimateMinutes(template);
    if (minutes > 60) errors.push(label + ": estimated " + minutes + " minutes, over 60");
  }
  // Two sessions a week are the base: A and B together must train the whole body.
  const base = SEED_TEMPLATES.filter(item => BASE_TEMPLATE_IDS.includes(item.id));
  if (base.length !== BASE_TEMPLATE_IDS.length) errors.push("Base templates A and B are required");
  const covered = new Set(base.flatMap(item => item.slots.map(entry => exercises.get(entry.exerciseId)?.muscle)));
  for (const muscle of ["borst", "rug", "schouders", "benen-voor", "benen-achter", "kuiten", "armen"]) if (!covered.has(muscle as Muscle)) errors.push("A and B together miss " + muscle);

  const run = RUN_PROGRAMME;
  const goalPace = run.goalSeconds / 5, basePace = run.baselineSeconds / 5;
  if (run.runs.length !== 12) errors.push("The run sequence needs twelve runs");
  if (goalPace >= basePace) errors.push("The goal must be faster than the baseline");
  if (run.testStep !== run.runs.length || run.runs.at(-1)?.kind !== "test") errors.push("The last run must be the 5 km test");
  run.runs.forEach((item, index) => {
    const label = "Run " + (index + 1);
    if (item.step !== index + 1) errors.push(label + ": wrong step number");
    if (!item.title || !item.main || !item.totalKm || !item.note) errors.push(label + ": title, main part, distance and note are required");
    if (item.kind === "test" && index !== run.runs.length - 1) errors.push(label + ": only the last run is a test");
    if (item.kind === "easy") { if (item.paceSeconds) errors.push(label + ": an easy run has no pace target"); return; }
    if (!item.paceSeconds || item.paceSeconds[0] > item.paceSeconds[1]) { errors.push(label + ": pace range missing"); return; }
    if (!item.recovery && item.kind !== "test") errors.push(label + ": recovery between repeats is required");
    // Every pace must follow from the two recorded facts: intervals at goal pace, tempo between goal and baseline.
    if (item.kind === "interval" && (item.paceSeconds[0] > goalPace || item.paceSeconds[0] < goalPace - 10)) errors.push(label + ": interval pace must be goal pace (or up to 10 s/km faster)");
    if (item.kind === "tempo" && (item.paceSeconds[0] <= goalPace || item.paceSeconds[1] > basePace + 30)) errors.push(label + ": tempo pace must lie between goal pace and baseline pace + 30 s/km");
    if (item.kind === "test" && item.paceSeconds[0] !== goalPace) errors.push(label + ": the test starts at goal pace");
  });
  if (run.runs.filter(item => item.kind === "interval" || item.kind === "tempo").length < 8) errors.push("At least eight quality runs are required");
  return errors;
}
