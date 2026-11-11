// Blocking check for Kracht & 5 km. Runs before every build: a seed library,
// template set or run sequence that breaks its own rules must not be deployable.
import fs from "node:fs";
import vm from "node:vm";
import ts from "typescript";

function load(file) {
  const output = ts.transpileModule(fs.readFileSync(file, "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } });
  const compiled = { exports: {} };
  vm.runInNewContext(output.outputText, { module: compiled, exports: compiled.exports, require() { throw Error("The training library must stay dependency-free"); } }, { filename: file });
  return compiled.exports;
}

const library = load("src/lib/training-library.ts");
const errors = library.validateSetup();

// The client script is plain text inside a template literal: make sure it still parses.
const script = load("src/app/sport/planner-script.ts").PLANNER_SCRIPT;
try { new vm.Script(script, { filename: "planner-script (client)" }); }
catch (error) { errors.push("Client script does not parse: " + error.message); }

if (errors.length) {
  console.error("Training validation failed:\n- " + errors.join("\n- "));
  process.exit(1);
}
const time = seconds => Math.floor(seconds / 60) + ":" + String(Math.round(seconds % 60)).padStart(2, "0");
const run = library.RUN_PROGRAMME;
console.log(`Library: ${library.SEED_EXERCISES.length} exercises. Templates: ${library.SEED_TEMPLATES.map(t => `${t.name} ${t.slots.reduce((sum, s) => sum + s.sets, 0)} sets/${library.estimateMinutes(t)} min`).join(", ")}. Runs: ${run.runs.length}, ${time(run.baselineSeconds)} -> ${time(run.goalSeconds)}. OK`);
