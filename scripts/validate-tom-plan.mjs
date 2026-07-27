// Blokkerende brondata-validatie voor Tom's trainingsschema.
// Draait bij `npm run build` (dus ook bij elke Vercel-deploy): een fout schema
// stopt de build met exitcode 1. Extraheert PLAN_TOM, EXPECTED_WEEK_TOTALS_TOM en
// collectTomPlanErrors LETTERLIJK uit loopschema-html.ts — geen tweede kopie van de
// validatielogica, dus geen drift tussen deze check en de client-side check.
import fs from "node:fs";

const FILE = "src/app/l/[slug]/loopschema-html.ts";
const src = fs.readFileSync(FILE, "utf8");

function grab(re) {
  const m = src.match(re);
  if (!m) throw new Error("Kon patroon niet vinden in " + FILE + ": " + re);
  return m[0];
}

const planSrc = grab(/const PLAN_TOM = \[[\s\S]*?\n\];/).replace("const PLAN_TOM = ", "").slice(0, -1);
const expectedSrc = grab(/const EXPECTED_WEEK_TOTALS_TOM = \[[\s\S]*?\];/).replace("const EXPECTED_WEEK_TOTALS_TOM = ", "").slice(0, -1);
const fnSrc = grab(/function collectTomPlanErrors\([\s\S]*?\n\}/);

const PLAN_TOM = eval(planSrc);
const EXPECTED_WEEK_TOTALS_TOM = eval(expectedSrc);
const collectTomPlanErrors = eval("(" + fnSrc + ")"); // function-expression → betrouwbaar te binden aan een const

const errors = collectTomPlanErrors(PLAN_TOM);
if (errors.length) {
  console.error("PLAN_TOM validatie FAILED:\n" + errors.map((e) => " - " + e).join("\n"));
  process.exit(1);
}

const totals = PLAN_TOM.map((w) => +w.runs.reduce((a, r) => a + r.km, 0).toFixed(1));
console.log("PLAN_TOM validatie OK — " + PLAN_TOM.length + " weken.");
console.log("Weektotalen: " + totals.join(", "));
