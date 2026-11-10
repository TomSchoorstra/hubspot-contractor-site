// Flexible calendar sessions are separate from the original raceplan and fixed block.
export const WORKOUT_NAMESPACE = "workout-sessions-v1";
export const WORKOUT_TEMPLATES = [
  { id: "upper", name: "Upper body", short: "Upper", kind: "gym", exercises: ["Bench press", "Lat pulldown", "Shoulder press"] },
  { id: "lower", name: "Lower body", short: "Lower", kind: "gym", exercises: ["Leg press", "Hip thrust", "Leg curl"] },
  { id: "full", name: "Full body", short: "Full", kind: "gym", exercises: ["Deadlift", "Bench press", "Seated row"] },
  { id: "run", name: "Run", short: "Run", kind: "run", exercises: [] },
] as const;
export type WorkoutTemplateId = (typeof WORKOUT_TEMPLATES)[number]["id"];
export type WorkoutSet = { id: string; reps: number | null; weightKg: number | null };
export type ExerciseLog = {
  id: string; name: string; sets: WorkoutSet[];
  legacySummary?: { sets: number | null; reps: number | null; weightKg: number | null };
};
// A workout can be linked to a programme week. The link never changes what was logged.
// "five-k-12-v1" is the earlier run-only plan; its entries stay valid and keep their meaning.
export const PROGRAMME_LINKS = {
  "five-k-12-v1": { testWeeks: [2, 12], gym: false },
  "kracht-5k-12-v2": { testWeeks: [2, 12], gym: true },
} as const;
export type ProgrammeId = keyof typeof PROGRAMME_LINKS;
export type RunPlanLog = {
  programId: ProgrammeId; week: number; logged: boolean;
  effort: number | null; asPlanned: boolean | null; testSeconds: number | null;
};
export type GymPlanLog = {
  programId: "kracht-5k-12-v2"; week: number; session: "A" | "B" | "C"; logged: boolean; effort: number | null;
};
export type WorkoutEntry = {
  id: string; templateId: WorkoutTemplateId; date: string; deleted: boolean; updatedAt: number;
  exercises: ExerciseLog[];
  distanceKm: number | null; durationSeconds: number | null; averageHeartRate: number | null;
  hamstring: "goed" | "licht" | "erger" | null; note: string;
  runPlan?: RunPlanLog;
  gymPlan?: GymPlanLog;
};
export function validWorkoutId(id: unknown): id is string {
  return typeof id === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id);
}
function validDate(value: unknown): value is string {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(value + "T12:00:00Z");
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
}
function metric(value: unknown, max: number, integer = false, zero = false): value is number | null {
  return value === null || typeof value === "number" && Number.isFinite(value) && value >= (zero ? 0 : 1) && value <= max && (!integer || Number.isInteger(value));
}
export function normalizeWorkout(value: unknown): WorkoutEntry | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const v = value as Record<string, unknown>;
  const template = WORKOUT_TEMPLATES.find(t => t.id === v.templateId);
  if (!validWorkoutId(v.id) || !template || !validDate(v.date) || typeof v.deleted !== "boolean") return null;
  if (typeof v.updatedAt !== "number" || !Number.isSafeInteger(v.updatedAt) || v.updatedAt <= 0 || v.updatedAt > 8640000000000000) return null;
  if (!Array.isArray(v.exercises) || v.exercises.length > 40 || template.kind === "run" && v.exercises.length !== 0) return null;
  const ids = new Set<string>();
  const exercises: ExerciseLog[] = [];
  for (const raw of v.exercises) {
    if (!raw || typeof raw !== "object" || Array.isArray(raw)) return null;
    const row = raw as Record<string, unknown>;
    if (!validWorkoutId(row.id) || ids.has(row.id) || typeof row.name !== "string" || row.name.length > 100) return null;
    let sets: WorkoutSet[];
    let legacySummary: ExerciseLog["legacySummary"];
    if (Array.isArray(row.sets)) {
      if (row.sets.length > 100) return null;
      const setIds = new Set<string>(); sets = [];
      for (const rawSet of row.sets) {
        if (!rawSet || typeof rawSet !== "object" || Array.isArray(rawSet)) return null;
        const set = rawSet as Record<string, unknown>;
        if (!validWorkoutId(set.id) || setIds.has(set.id) || !metric(set.reps, 1000, true) || !metric(set.weightKg, 2000, false, true)) return null;
        setIds.add(set.id); sets.push({id:set.id, reps:set.reps, weightKg:set.weightKg});
      }
      if (row.legacySummary !== undefined) {
        if (!row.legacySummary || typeof row.legacySummary !== "object" || Array.isArray(row.legacySummary)) return null;
        const original = row.legacySummary as Record<string, unknown>;
        if (!metric(original.sets, 100, true) || !metric(original.reps, 1000, true) || !metric(original.weightKg, 2000, false, true)) return null;
        legacySummary = {sets:original.sets,reps:original.reps,weightKg:original.weightKg};
      }
    } else {
      // Expand the previous compact format without changing its recorded values.
      if (!metric(row.sets, 100, true) || !metric(row.reps, 1000, true) || !metric(row.weightKg, 2000, false, true)) return null;
      legacySummary = {sets:row.sets,reps:row.reps,weightKg:row.weightKg};
      const count = row.sets ?? 1;
      sets = Array.from({length:count},()=>({
        id:row.id as string,
        reps:row.reps as number | null, weightKg:row.weightKg as number | null,
      })).map((set,index)=>({...set,id:(row.id as string).slice(0,24)+(BigInt("0x"+(row.id as string).slice(24))^BigInt(index)).toString(16).padStart(12,"0")}));
    }
    ids.add(row.id); exercises.push({id:row.id,name:row.name,sets,...(legacySummary?{legacySummary}:{})});
  }
  if (!metric(v.distanceKm, 1000, false, true) || v.distanceKm === 0 || !metric(v.durationSeconds, 86400, true) || !metric(v.averageHeartRate, 300, true)) return null;
  if (template.kind === "gym" && (v.distanceKm !== null || v.durationSeconds !== null || v.averageHeartRate !== null)) return null;
  if (![null, "goed", "licht", "erger"].includes(v.hamstring as string | null) || typeof v.note !== "string" || v.note.length > 1000) return null;
  let runPlan: RunPlanLog | undefined;
  if(v.runPlan!==undefined){
    if(template.kind!=="run"||!v.runPlan||typeof v.runPlan!=="object"||Array.isArray(v.runPlan))return null;
    const m=v.runPlan as Record<string,unknown>;
    const link=typeof m.programId==="string"&&Object.hasOwn(PROGRAMME_LINKS,m.programId)?PROGRAMME_LINKS[m.programId as ProgrammeId]:null;
    if(!link||!Number.isInteger(m.week)||Number(m.week)<1||Number(m.week)>12||typeof m.logged!=="boolean"||!metric(m.effort,10,true)||![null,true,false].includes(m.asPlanned as boolean|null)||!metric(m.testSeconds,86400,true))return null;
    const test=(link.testWeeks as readonly number[]).includes(Number(m.week));
    if(m.logged&&(!v.distanceKm||!v.durationSeconds||m.asPlanned===null||(test&&(!m.testSeconds||Number(v.distanceKm)<5||Number(m.testSeconds)>Number(v.durationSeconds)))))return null;
    runPlan={programId:m.programId as ProgrammeId,week:Number(m.week),logged:m.logged,effort:m.effort as number|null,asPlanned:m.asPlanned as boolean|null,testSeconds:m.testSeconds as number|null};
  }
  let gymPlan: GymPlanLog | undefined;
  if(v.gymPlan!==undefined){
    if(template.id!=="full"||!v.gymPlan||typeof v.gymPlan!=="object"||Array.isArray(v.gymPlan))return null;
    const m=v.gymPlan as Record<string,unknown>;
    if(m.programId!=="kracht-5k-12-v2"||!Number.isInteger(m.week)||Number(m.week)<1||Number(m.week)>12||!["A","B","C"].includes(m.session as string)||typeof m.logged!=="boolean"||!metric(m.effort,10,true))return null;
    // A gym session only counts as logged when at least one set has recorded repetitions.
    if(m.logged&&!exercises.some(row=>row.sets.some(set=>set.reps!==null)))return null;
    gymPlan={programId:"kracht-5k-12-v2",week:Number(m.week),session:m.session as GymPlanLog["session"],logged:m.logged,effort:m.effort as number|null};
  }
  return {...(runPlan?{runPlan}:{}),...(gymPlan?{gymPlan}:{}),id:v.id, templateId:template.id, date:v.date, deleted:v.deleted, updatedAt:v.updatedAt, exercises,
    distanceKm:v.distanceKm, durationSeconds:v.durationSeconds, averageHeartRate:v.averageHeartRate,
    hamstring:v.hamstring as WorkoutEntry["hamstring"], note:v.note};
}
