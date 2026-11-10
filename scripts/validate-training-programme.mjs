// Blocking check for the Kracht & 5 km programme. Runs before every build:
// a programme that breaks its own rules must not be deployable.
import fs from "node:fs";
import vm from "node:vm";
import ts from "typescript";

function load(file) {
  const output = ts.transpileModule(fs.readFileSync(file, "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } });
  const compiled = { exports: {} };
  vm.runInNewContext(output.outputText, { module: compiled, exports: compiled.exports, require() { throw Error("Programme files must stay dependency-free"); } }, { filename: file });
  return compiled.exports;
}

const programme = load("src/lib/training-programme.ts");
const planner = load("src/lib/workout-planner.ts");
const errors = programme.validateProgramme();

// The storage contract and the programme must agree on IDs and test weeks.
const link = planner.PROGRAMME_LINKS?.[programme.PROGRAMME_ID];
if (!link) errors.push("workout-planner.ts does not accept programme " + programme.PROGRAMME_ID);
else if (JSON.stringify(link.testWeeks) !== JSON.stringify(programme.RUN_TEST_WEEKS)) errors.push("Run test weeks differ between programme and storage validation");
if (!planner.PROGRAMME_LINKS?.["five-k-12-v1"]) errors.push("Earlier run-plan entries must stay valid (five-k-12-v1)");
for (const id of ["full", "run"]) if (!planner.WORKOUT_TEMPLATES.some(template => template.id === id)) errors.push("Missing workout template " + id);

if (errors.length) {
  console.error("Programme validation failed:\n- " + errors.join("\n- "));
  process.exit(1);
}
const weeks = programme.TRAINING_PROGRAMME.weeks;
const minutes = weeks.flatMap(week => week.sessions.map(session => session.minutes));
console.log(`Programme ${programme.PROGRAMME_ID}: ${weeks.length} weeks, ${weeks.length * 3} gym sessions (${Math.min(...minutes)}–${Math.max(...minutes)} min estimated), ${weeks.length} runs. OK`);
if (process.argv.includes("--table")) for (const week of weeks) console.log(week.week, week.phase, week.sessions.map(session => session.key + ":" + session.minutes + "m/" + session.exercises.reduce((sum, exercise) => sum + exercise.sets, 0) + "sets").join(" "), "| run:", week.run.title, week.run.block);
