// The 12-week "Kracht & 5 km" programme: three full-body gym sessions and one
// weekend run per week. This file is the single source for prescriptions.
// It only describes the plan. Scheduled workouts and logged performance live in
// the workout calendar (see workout-planner.ts) and are never written from here.
//
// Reasoning and sources: docs/training/kracht-5km-programma.md

export const PROGRAMME_ID = "kracht-5k-12-v2";
export const PROGRAMME_WEEKS = 12;
export const RUN_TEST_WEEKS = [2, 12];
export const SESSION_KEYS = ["A", "B", "C"] as const;
export type SessionKey = (typeof SESSION_KEYS)[number];

type Role = "primary" | "secondary" | "assist" | "light" | "accessory" | "core";
type ExerciseDefinition = {
  key: string; name: string; alternatives: string[]; role: Role; cue: string;
  perSide?: boolean; superset?: string; unit?: string;
};
export type ExercisePrescription = {
  key: string; name: string; alternatives: string[]; cue: string; superset: string | null;
  sets: number; reps: string; perSide: boolean; rir: string; restSeconds: [number, number]; note: string;
};
export type GymSession = {
  key: SessionKey; title: string; focus: string; minutes: number; exercises: ExercisePrescription[];
};
export type RunStep = { title: string; text: string; note?: string };
export type RunWeek = {
  week: number; title: string; type: string; kind: "easy" | "test" | "tempo" | "interval" | "check";
  block: string; totalKm: string; effort: string; adjust: string;
  // Offsets in seconds per km relative to the measured 5 km pace. Null means effort only.
  paceOffset: [number, number] | null; steps: RunStep[];
};
export type ProgrammeWeek = {
  week: number; phase: string; focus: string; light: boolean; sessions: GymSession[]; run: RunWeek;
};

const SESSIONS: Record<SessionKey, { title: string; focus: string; exercises: ExerciseDefinition[] }> = {
  A: {
    title: "Full body A",
    focus: "Squat en duwen. De zwaarste beendag: plan hem minstens twee dagen vóór je run.",
    exercises: [
      { key: "leg-press", name: "Leg press", alternatives: ["Hack squat", "Goblet squat"], role: "primary", cue: "Zak gecontroleerd tot je heupen nog net op de zitting blijven. Knieën volgen je tenen." },
      { key: "bench-press", name: "Bench press", alternatives: ["Dumbbell bench press", "Chest press machine"], role: "secondary", cue: "Schouderbladen naar achteren en omlaag. Stang raakt je borst, voeten blijven staan." },
      { key: "seated-row", name: "Seated row", alternatives: ["Chest-supported row", "One-arm dumbbell row"], role: "assist", cue: "Trek naar je navel en houd één tel vast. Romp blijft stil." },
      { key: "leg-curl", name: "Leg curl", alternatives: ["Stability ball leg curl", "Slider leg curl"], role: "assist", cue: "Laat het gewicht in 2–3 tellen terugkomen. Stop bij hamstringpijn." },
      { key: "lateral-raise", name: "Lateral raise", alternatives: ["Cable lateral raise"], role: "accessory", superset: "1", cue: "Hef tot schouderhoogte, ellebogen licht gebogen. Geen zwaai." },
      { key: "dead-bug", name: "Dead bug", alternatives: ["Plank"], role: "core", superset: "1", perSide: true, cue: "Onderrug blijft op de mat. Beweeg langzaam." },
    ],
  },
  B: {
    title: "Full body B",
    focus: "Heup en trekken. Sterke hamstrings en bilspieren voor je loopafzet.",
    exercises: [
      { key: "romanian-deadlift", name: "Romanian deadlift", alternatives: ["Dumbbell Romanian deadlift", "Back extension"], role: "primary", cue: "Heupen naar achteren, rug neutraal, stang dicht langs je benen. Ga tot je hamstrings rekken, zonder pijn." },
      { key: "lat-pulldown", name: "Lat pulldown", alternatives: ["Assisted pull-up", "Pull-up"], role: "secondary", cue: "Trek de stang naar je bovenborst. Ellebogen wijzen omlaag." },
      { key: "shoulder-press", name: "Shoulder press", alternatives: ["Machine shoulder press", "Landmine press"], role: "assist", cue: "Span je buik aan en druk recht omhoog. Geen holle rug." },
      { key: "split-squat", name: "Split squat", alternatives: ["Reverse lunge", "Step-up"], role: "assist", perSide: true, cue: "Zak recht omlaag, voorste voet plat. Beide benen evenveel herhalingen." },
      { key: "triceps-pushdown", name: "Triceps pushdown", alternatives: ["Overhead triceps extension"], role: "accessory", superset: "1", cue: "Ellebogen tegen je zij, strek volledig uit." },
      { key: "face-pull", name: "Face pull", alternatives: ["Reverse fly"], role: "accessory", superset: "1", cue: "Trek het touw naar je voorhoofd, ellebogen hoog." },
      { key: "pallof-press", name: "Pallof press", alternatives: ["Side plank"], role: "core", perSide: true, cue: "Druk de kabel recht voor je uit en laat je romp niet meedraaien." },
    ],
  },
  C: {
    title: "Full body C",
    focus: "Bovenlichaam en lichte benen. Deze sessie past het best vóór je run.",
    exercises: [
      { key: "hip-thrust", name: "Hip thrust", alternatives: ["Glute bridge", "Cable pull-through"], role: "primary", cue: "Kin naar je borst, strek je heupen volledig en houd één tel vast." },
      { key: "incline-press", name: "Incline dumbbell press", alternatives: ["Incline machine press", "Push-up"], role: "secondary", cue: "Bank op ongeveer 30 graden. Laat de dumbbells gecontroleerd zakken." },
      { key: "chest-supported-row", name: "Chest-supported row", alternatives: ["One-arm dumbbell row", "Seated row"], role: "assist", cue: "Borst blijft op het kussen. Trek je ellebogen langs je lichaam." },
      { key: "goblet-squat", name: "Goblet squat", alternatives: ["Leg extension", "Step-up"], role: "light", cue: "Houd het bewust licht. Je benen moeten fris blijven voor je run." },
      { key: "calf-raise", name: "Calf raise", alternatives: ["Seated calf raise", "Leg press calf raise"], role: "accessory", superset: "1", cue: "Volledig omhoog, in 2–3 tellen omlaag tot je kuit rekt." },
      { key: "biceps-curl", name: "Biceps curl", alternatives: ["Hammer curl", "Cable curl"], role: "accessory", superset: "1", cue: "Ellebogen blijven naast je lichaam. Geen zwaai." },
      { key: "knee-raise", name: "Hanging knee raise", alternatives: ["Reverse crunch", "Dead bug"], role: "core", cue: "Kantel je bekken en til je knieën zonder te slingeren." },
    ],
  },
};

type WeekShape = { phase: string; focus: string; mode: "intro" | "build" | "light" | "check" | "taper"; block: 1 | 2 | 3 };
const WEEK_SHAPES: WeekShape[] = [
  { phase: "Basis", focus: "Zoekweek. Leer de oefeningen en kies per oefening een gewicht waarmee je na de laatste herhaling nog 3–4 goede herhalingen over hebt.", mode: "intro", block: 1 },
  { phase: "Basis", focus: "Volledige sessies op de gevonden gewichten. Zondag je nulmeting.", mode: "build", block: 1 },
  { phase: "Basis", focus: "Zelfde opzet. Voeg herhalingen toe waar het kan.", mode: "build", block: 1 },
  { phase: "Basis", focus: "Lichtere week. Minder sets, zelfde gewicht, ruim van falen af.", mode: "light", block: 1 },
  { phase: "Opbouw", focus: "Zwaarder en korter op de hoofdoefeningen.", mode: "build", block: 2 },
  { phase: "Opbouw", focus: "Bouw door met dezelfde regels.", mode: "build", block: 2 },
  { phase: "Opbouw", focus: "Laatste zware week van dit blok. Zondag een controle op 5 km-tempo.", mode: "build", block: 2 },
  { phase: "Opbouw", focus: "Lichtere week. Herstel voor het laatste blok.", mode: "light", block: 2 },
  { phase: "Kracht", focus: "Vier sets op de eerste oefening, lagere herhalingen.", mode: "build", block: 3 },
  { phase: "Kracht", focus: "Zwaarste week van het programma.", mode: "build", block: 3 },
  { phase: "Kracht", focus: "Krachtcheck op de eerste oefening van elke sessie.", mode: "check", block: 3 },
  { phase: "Kracht", focus: "Lichtere week met de gewichten van week 11. Fris naar je 5 km-eindtest.", mode: "taper", block: 3 },
];

const REPS: Record<Role, [string, string, string]> = {
  primary: ["8–12", "6–10", "5–8"],
  secondary: ["8–12", "6–10", "6–8"],
  assist: ["10–12", "8–12", "8–10"],
  light: ["10–12", "10–12", "10–12"],
  accessory: ["12–15", "10–15", "10–15"],
  core: ["8–12", "8–12", "8–12"],
};
const REST: Record<Role, [number, number]> = {
  primary: [120, 180], secondary: [120, 150], assist: [90, 120], light: [90, 120], accessory: [60, 90], core: [45, 60],
};

function prescribe(definition: ExerciseDefinition, shape: WeekShape): ExercisePrescription {
  const { role } = definition;
  const reduced = shape.mode === "intro" || shape.mode === "light" || shape.mode === "taper";
  const main = role === "primary" || role === "secondary";
  let sets = main || role === "assist" ? 3 : 2;
  // The calf and biceps pair gets a third round until the first lift moves to four sets.
  if ((definition.key === "calf-raise" || definition.key === "biceps-curl") && shape.block < 3) sets = 3;
  if (definition.perSide && role === "assist") sets = 2;
  if (role === "primary" && shape.block === 3 && !reduced) sets = 4;
  if (reduced) sets = 2;

  let rir = "2–3";
  if (shape.mode === "intro" || shape.mode === "light") rir = "3–4";
  else if (shape.mode === "taper") rir = "3";
  else if (role === "light") rir = "3–4";
  else if (role === "core") rir = "2–3";
  else if (shape.block === 2) rir = main || role === "assist" ? "2" : "1–2";
  else if (shape.block === 3) rir = main ? "1–2" : role === "assist" ? "2" : "1–2";

  // Week-wide instructions live in the week focus; a note is only for this exercise.
  let note = "";
  if (shape.mode === "check" && role === "primary") note = "Krachtcheck: doe in de laatste set zoveel goede herhalingen als kan en stop met 1 in reserve. Vergelijk met week 3.";
  else if (role === "light") note = "Blijft het hele programma licht.";

  return {
    key: definition.key, name: definition.name, alternatives: definition.alternatives, cue: definition.cue,
    superset: definition.superset ?? null, sets, reps: REPS[role][shape.block - 1], perSide: Boolean(definition.perSide),
    rir, restSeconds: REST[role], note,
  };
}

// A deliberately conservative estimate, used by the validator to keep sessions near 60 minutes.
export function estimateMinutes(exercises: ExercisePrescription[], definitions: ExerciseDefinition[]): number {
  let minutes = 6; // general warm-up
  const stations = new Set<string>();
  for (const exercise of exercises) {
    const definition = definitions.find(item => item.key === exercise.key);
    if (!definition) continue;
    stations.add(exercise.superset ? "superset-" + exercise.superset : exercise.key);
    if (definition.role === "primary") minutes += 2.5; // two ramp-up sets
    if (definition.role === "secondary") minutes += 1.5; // one ramp-up set
    const work = exercise.perSide ? 70 : 40;
    // In a superset only the second exercise is followed by the rest period.
    const partner = exercise.superset ? exercises.filter(item => item.superset === exercise.superset) : [];
    const rest = partner.length > 1 && partner[0].key === exercise.key ? 10 : (exercise.restSeconds[0] + exercise.restSeconds[1]) / 2;
    minutes += exercise.sets * (work + rest) / 60;
  }
  return Math.round(minutes + stations.size);
}

const EASY_ADJUST = "Te zwaar of zware benen van de gym: loop langzamer of wandel een minuut. Het praattempo gaat voor.";
const HARD_ADJUST = "Voelt het inlopen al zwaarder dan normaal, of trekt je hamstring: loop de rustige variant (5 km praattempo) en log de training als aangepast.";
const WARMUP: RunStep = { title: "2 km rustig inlopen", text: "Praattempo, RPE 3–4. Sluit af met 3 versnellingen van 20 seconden." };
const COOLDOWN: RunStep = { title: "1 km rustig uitlopen", text: "Praattempo, daarna wandelen." };

const RUNS: Omit<RunWeek, "week">[] = [
  {
    title: "Rustig hervatten", type: "Easy run", kind: "easy", block: "5 km rustig", totalKm: "5", paceOffset: null,
    effort: "RPE 3–4. Je kunt in hele zinnen praten.", adjust: EASY_ADJUST,
    steps: [
      { title: "5 minuten wandelen en losmaken", text: "Enkels, heupen en een paar rustige passen." },
      { title: "5 km rustig", text: "Praattempo", note: "Rustig genoeg om een gesprek te voeren. Loop langzamer als dat nodig is." },
      { title: "5 minuten uitwandelen", text: "Geen aparte cooling-down nodig." },
    ],
  },
  {
    title: "Nulmeting", type: "5 km-test", kind: "test", block: "5 km aaneengesloten", totalKm: "8", paceOffset: null,
    effort: "RPE 8–9 over de hele 5 km. Zwaar, maar gelijkmatig.", adjust: "Niet fit of pijnlijke hamstring: verplaats de test een week en loop vandaag 5 km rustig.",
    steps: [
      WARMUP,
      { title: "5 km aaneengesloten", text: "Gelijkmatig vol te houden tempo", note: "Start beheerst. Loop de 5 km zo gelijkmatig mogelijk op je beste vol te houden inspanning. Geen sprintstart." },
      { title: "5 km-tijd apart meten", text: "Neem de tijd over precies 5 km; in- en uitlopen tellen hiervoor niet mee." },
      COOLDOWN,
    ],
  },
  {
    title: "Tempo", type: "Tempo", kind: "tempo", block: "3 × 1 km", totalKm: "6,8", paceOffset: [15, 25],
    effort: "RPE 6–7. Stevig maar beheerst: korte zinnen lukken nog.", adjust: HARD_ADJUST,
    steps: [
      WARMUP,
      { title: "3 × 1 km", text: "", note: "Stevig maar beheerst: ongeveer 6–7 op 10 qua inspanning. De derde kilometer is niet sneller dan de eerste." },
      { title: "400 m herstel", text: "Rustig joggend tussen de herhalingen, ongeveer 2,5 minuut." },
      COOLDOWN,
    ],
  },
  {
    title: "Lichtere week", type: "Easy run", kind: "easy", block: "5–6 km rustig", totalKm: "5–6", paceOffset: null,
    effort: "RPE 3–4. Je kunt in hele zinnen praten.", adjust: EASY_ADJUST,
    steps: [
      { title: "5 minuten wandelen en losmaken", text: "Enkels, heupen en een paar rustige passen." },
      { title: "5–6 km rustig", text: "Praattempo", note: "Sluit af met 4 ontspannen versnellingen van 20 seconden als je benen goed voelen." },
      { title: "5 minuten uitwandelen", text: "Geen aparte cooling-down nodig." },
    ],
  },
  {
    title: "Intervals", type: "Intervals", kind: "interval", block: "6 × 400 m", totalKm: "6,4", paceOffset: [-10, -5],
    effort: "RPE 8. Gecontroleerd snel, nooit sprinten.", adjust: HARD_ADJUST,
    steps: [
      WARMUP,
      { title: "6 × 400 m", text: "", note: "Gecontroleerd snel: ongeveer 8 op 10. Houd alle herhalingen ongeveer even snel. Kan de laatste niet meer op tempo, stop dan één herhaling eerder." },
      { title: "200 m herstel", text: "Rustig joggend of wandelend tussen de herhalingen, ongeveer 2 minuten." },
      COOLDOWN,
    ],
  },
  {
    title: "Tempo", type: "Tempo", kind: "tempo", block: "2 × 2 km", totalKm: "7,4", paceOffset: [15, 25],
    effort: "RPE 6–7. Stevig maar beheerst.", adjust: HARD_ADJUST,
    steps: [
      WARMUP,
      { title: "2 × 2 km", text: "", note: "Zelfde tempo als week 3, nu langer. Het hoort beheerst te blijven tot het einde." },
      { title: "400 m herstel", text: "Rustig joggend, ongeveer 3 minuten." },
      COOLDOWN,
    ],
  },
  {
    title: "Controle", type: "5 km-tempo", kind: "check", block: "4 × 1 km", totalKm: "7,6", paceOffset: [-3, 3],
    effort: "RPE 8. Dit is een controle, geen test: je eindigt met iets over.", adjust: HARD_ADJUST,
    steps: [
      WARMUP,
      { title: "4 × 1 km", text: "", note: "Loop elke kilometer op het tempo van je nulmeting. Lukt dat beheerst (inspanning 8 of lager, volgens plan), dan gaan de tempo's vanaf week 9 vijf seconden per kilometer omhoog. Anders blijven ze gelijk." },
      { title: "2 minuten herstel", text: "Wandelend of heel rustig joggend, ongeveer 200 m." },
      COOLDOWN,
    ],
  },
  {
    title: "Lichtere week", type: "Easy run", kind: "easy", block: "5–6 km rustig", totalKm: "5–6", paceOffset: null,
    effort: "RPE 3–4. Je kunt in hele zinnen praten.", adjust: EASY_ADJUST,
    steps: [
      { title: "5 minuten wandelen en losmaken", text: "Enkels, heupen en een paar rustige passen." },
      { title: "5–6 km rustig", text: "Praattempo", note: "Sluit af met 4 ontspannen versnellingen van 20 seconden als je benen goed voelen." },
      { title: "5 minuten uitwandelen", text: "Geen aparte cooling-down nodig." },
    ],
  },
  {
    title: "Intervals", type: "Intervals", kind: "interval", block: "5 × 800 m", totalKm: "8,6", paceOffset: [-5, 0],
    effort: "RPE 8. Zwaar in de laatste 200 m, maar je houdt je vorm.", adjust: HARD_ADJUST,
    steps: [
      WARMUP,
      { title: "5 × 800 m", text: "", note: "Net sneller dan je 5 km-tempo. Houd alle herhalingen even snel. Verlies je meer dan vijf seconden op een herhaling, dan is dat de laatste." },
      { title: "400 m herstel", text: "Rustig joggend, ongeveer 3 minuten." },
      COOLDOWN,
    ],
  },
  {
    title: "Tempo", type: "Tempo", kind: "tempo", block: "2 × 2,5 km", totalKm: "8,4", paceOffset: [15, 25],
    effort: "RPE 7. De langste tempotraining van het programma.", adjust: HARD_ADJUST,
    steps: [
      WARMUP,
      { title: "2 × 2,5 km", text: "", note: "Beheerst beginnen. De tweede herhaling is even snel als de eerste, niet sneller." },
      { title: "400 m herstel", text: "Rustig joggend, ongeveer 3 minuten." },
      COOLDOWN,
    ],
  },
  {
    title: "Aanscherpen", type: "Intervals", kind: "interval", block: "4 × 400 m", totalKm: "5,2", paceOffset: [-10, -5],
    effort: "RPE 7–8. Vlot en ontspannen, je houdt bewust in.", adjust: HARD_ADJUST,
    steps: [
      WARMUP,
      { title: "4 × 400 m", text: "", note: "Kort en scherp. Je stopt terwijl het nog makkelijk voelt, zodat je fris aan de eindtest begint." },
      { title: "200 m herstel", text: "Rustig joggend of wandelend, ongeveer 2 minuten." },
      COOLDOWN,
    ],
  },
  {
    title: "Eindtest", type: "5 km-test", kind: "test", block: "5 km aaneengesloten", totalKm: "8", paceOffset: null,
    effort: "RPE 9. Je beste gelijkmatige 5 km.", adjust: "Niet fit of pijnlijke hamstring: verplaats de test een week. Een test met klachten zegt niets over je vorm.",
    steps: [
      WARMUP,
      { title: "5 km aaneengesloten", text: "Start op het tempo van je nulmeting", note: "Gebruik hetzelfde parcours als bij de nulmeting. Loop de eerste 3 km op je nulmetingstempo en versnel daarna alleen als het kan." },
      { title: "5 km-tijd apart meten", text: "Neem de tijd over precies 5 km; in- en uitlopen tellen hiervoor niet mee." },
      COOLDOWN,
    ],
  },
];

export const PROGRAMME_RULES: { title: string; items: string[] }[] = [
  {
    title: "Hoe zwaar: RIR en RPE",
    items: [
      "RIR is het aantal goede herhalingen dat je aan het eind van een set nog over hebt. RIR 2 betekent: je had er nog twee kunnen doen.",
      "RPE is je inspanning op een schaal van 1 tot 10. Bij krachttraining is RIR 2 ongeveer RPE 8. Bij hardlopen is RPE 3–4 praattempo en RPE 8 het tempo van een zware 5 km.",
      "Er staan geen startgewichten in het programma. In week 1 zoek je per oefening een gewicht dat past bij de herhalingen en de RIR. Daarna gebruik je je eigen logboek.",
    ],
  },
  {
    title: "Wanneer zwaarder, gelijk of lichter",
    items: [
      "Omhoog: haal je in alle sets de bovenkant van het herhalingsbereik met de bedoelde RIR, dan gaat de volgende keer het gewicht omhoog met de kleinste stap (2,5–5 kg of één schijf, ongeveer 2–5%).",
      "Gelijk: zit je binnen het bereik, houd dan het gewicht vast en probeer er een herhaling bij te doen.",
      "Omlaag: haal je de onderkant van het bereik niet, of moet je tot falen gaan, verlaag dan 5–10%.",
      "In lichtere weken (4, 8 en 12) verhoog je niets.",
    ],
  },
  {
    title: "Kracht en hardlopen combineren",
    items: [
      "Standaardweek: A op maandag, B op woensdag, C op vrijdag, run op zondag. Houd ongeveer 48 uur tussen zware beenkracht (A en B) en je run.",
      "Sessie C is licht voor de benen en mag dichter op de run liggen.",
      "Eén run per week is genoeg om je looproutine vast te houden en gericht aan je 5 km te werken, maar de winst is kleiner dan met twee of drie runs. Er staat geen beloofde eindtijd.",
    ],
  },
  {
    title: "Gemiste training",
    items: [
      "Eén gymsessie gemist: sla hem over of schuif hem een dag op als er nog een rustdag tussen blijft. Nooit twee sessies op één dag.",
      "Twee of meer sessies gemist in een week: herhaal die week voordat je verdergaat.",
      "Run gemist: haal hem binnen twee dagen in, alleen als er daarna nog een dag rust is voor sessie A. Anders overslaan. Een gemiste test schuift een week op.",
    ],
  },
  {
    title: "Ongewoon vermoeid",
    items: [
      "Slecht geslapen, spierpijn die langer dan 48 uur duurt of een warming-up die zwaar voelt: train wel, maar doe één set minder per oefening en blijf op RIR 3–4.",
      "Loop in zo'n week de rustige variant van je run: 5 km praattempo.",
      "Twee weken achter elkaar zo: neem direct de lichtere week en ga daarna verder.",
      "Hamstringpijn tijdens een oefening of run: stop daarmee, kies de vervanger en noteer het.",
    ],
  },
  {
    title: "Terug na een korte onderbreking",
    items: [
      "Tot een week weg: herhaal de laatste afgeronde week met dezelfde gewichten.",
      "Eén tot twee weken weg: ga één week terug in het programma en begin 5–10% lichter.",
      "Twee tot vier weken weg: begin 10–20% lichter met twee sets per oefening en start met een rustige run.",
      "Ziek met koorts: niet trainen tot je klachtenvrij bent.",
    ],
  },
];

export const TRAINING_PROGRAMME = {
  id: PROGRAMME_ID,
  name: "Kracht & 5 km",
  runTestWeeks: RUN_TEST_WEEKS,
  paceCheckWeek: 7,
  paceCheckBonusSeconds: 5,
  // Monday = 1 ... Sunday = 7
  defaultDays: { A: 1, B: 3, C: 5, run: 7 },
  warmup: "5 minuten rustig fietsen of roeien, daarna twee lichtere opbouwsets van de eerste oefening en één van de tweede.",
  rules: PROGRAMME_RULES,
  weeks: WEEK_SHAPES.map((shape, index): ProgrammeWeek => ({
    week: index + 1,
    phase: shape.phase,
    focus: shape.focus,
    light: shape.mode === "light" || shape.mode === "taper",
    sessions: SESSION_KEYS.map((key): GymSession => {
      const exercises = SESSIONS[key].exercises.map(definition => prescribe(definition, shape));
      return { key, title: SESSIONS[key].title, focus: SESSIONS[key].focus, minutes: estimateMinutes(exercises, SESSIONS[key].exercises), exercises };
    }),
    run: { week: index + 1, ...RUNS[index] },
  })),
};
export type TrainingProgramme = typeof TRAINING_PROGRAMME;

// Blocking validation: a programme that breaks these rules must not be deployable.
export function validateProgramme(programme: TrainingProgramme = TRAINING_PROGRAMME): string[] {
  const errors: string[] = [];
  if (programme.weeks.length !== PROGRAMME_WEEKS) errors.push("Programme must have 12 weeks");
  let previousHardSets = 0;
  programme.weeks.forEach((week, index) => {
    const label = "Week " + (index + 1);
    if (week.week !== index + 1) errors.push(label + ": wrong week number");
    if (week.sessions.map(session => session.key).join("") !== "ABC") errors.push(label + ": needs exactly gym sessions A, B and C");
    if (!week.run) errors.push(label + ": needs exactly one run");
    let hardSets = 0;
    for (const session of week.sessions) {
      const name = label + " " + session.key;
      if (session.minutes > 60) errors.push(name + ": estimated " + session.minutes + " minutes, over 60");
      if (session.exercises.length < 5 || session.exercises.length > 8) errors.push(name + ": expected 5–8 exercises");
      const keys = new Set(session.exercises.map(exercise => exercise.key));
      if (keys.size !== session.exercises.length) errors.push(name + ": duplicate exercise");
      for (const exercise of session.exercises) {
        if (exercise.sets < 1 || exercise.sets > 5) errors.push(name + " " + exercise.name + ": sets out of range");
        if (!/^\d+–\d+$/.test(exercise.reps)) errors.push(name + " " + exercise.name + ": reps need a range");
        if (!/^\d(–\d)?$/.test(exercise.rir)) errors.push(name + " " + exercise.name + ": RIR missing");
        if (exercise.restSeconds[0] < 30 || exercise.restSeconds[1] < exercise.restSeconds[0]) errors.push(name + " " + exercise.name + ": rest missing");
        if (!exercise.alternatives.length) errors.push(name + " " + exercise.name + ": needs a substitution");
        if (/\d\s?kg/i.test(exercise.note + exercise.cue)) errors.push(name + " " + exercise.name + ": no invented loads");
        hardSets += exercise.sets;
      }
      for (const group of new Set(session.exercises.map(exercise => exercise.superset).filter(Boolean))) {
        if (session.exercises.filter(exercise => exercise.superset === group).length !== 2) errors.push(name + ": superset " + group + " needs two exercises");
      }
    }
    // Lower-body, push, pull and trunk work must all be present every week.
    const all = week.sessions.flatMap(session => session.exercises.map(exercise => exercise.key));
    const patterns: Record<string, string[]> = {
      squat: ["leg-press", "split-squat", "goblet-squat"], hinge: ["romanian-deadlift", "hip-thrust", "leg-curl"],
      push: ["bench-press", "shoulder-press", "incline-press"], pull: ["seated-row", "lat-pulldown", "chest-supported-row"],
      trunk: ["dead-bug", "pallof-press", "knee-raise"], calf: ["calf-raise"],
    };
    for (const [pattern, keys] of Object.entries(patterns)) if (!keys.some(key => all.includes(key))) errors.push(label + ": missing " + pattern + " work");
    if (week.light && hardSets >= previousHardSets) errors.push(label + ": a lighter week must reduce total sets");
    previousHardSets = hardSets;
    const run = week.run;
    if (run.steps.length < 3) errors.push(label + " run: needs warm-up, main part and cool-down");
    if (!run.effort || !run.adjust) errors.push(label + " run: effort and adjustment are required");
    if (programme.runTestWeeks.includes(run.week) !== (run.kind === "test")) errors.push(label + " run: test weeks do not match");
    if (run.kind === "test" && run.paceOffset) errors.push(label + " run: a test has no prescribed pace");
    if (/\d:\d\d/.test(JSON.stringify(run))) errors.push(label + " run: no invented paces or times");
  });
  const kinds = programme.weeks.map(week => week.run.kind);
  for (let index = 1; index < kinds.length; index++) {
    if (kinds[index] === "test" && kinds[index - 1] === "test") errors.push("Two tests in a row");
  }
  if (kinds.filter(kind => kind === "easy").length < 3) errors.push("At least three easy runs are required");
  if (kinds.filter(kind => kind === "test").length !== 2) errors.push("Exactly a baseline and a final 5 km test are required");
  if (!programme.weeks.at(-1)?.light || kinds.at(-1) !== "test") errors.push("The final week must be lighter and end with the 5 km test");
  return errors;
}
