// Blokkerende brondata-validatie voor Denise' trainingsschema (kwaliteitssessies).
// Draait bij `npm run build`: een fout schema stopt de build met exitcode 1.
// Extraheert PLAN_DENISE, EXPECTED_WEEK_TOTALS_DENISE en collectDenisePlanErrors
// LETTERLIJK uit loopschema-html.ts — geen tweede kopie van de validatielogica.
import fs from "node:fs";

const FILE = "src/app/l/[slug]/loopschema-html.ts";
const src = fs.readFileSync(FILE, "utf8");

function grab(re) {
  const m = src.match(re);
  if (!m) throw new Error("Kon patroon niet vinden in " + FILE + ": " + re);
  return m[0];
}

const planSrc = grab(/const PLAN_DENISE = \[[\s\S]*?\n\];/).replace("const PLAN_DENISE = ", "").slice(0, -1);
const expectedSrc = grab(/const EXPECTED_WEEK_TOTALS_DENISE = \[[\s\S]*?\];/).replace("const EXPECTED_WEEK_TOTALS_DENISE = ", "").slice(0, -1);
const fnSrc = grab(/function collectDenisePlanErrors\([\s\S]*?\n\}/);

const PLAN_DENISE = eval(planSrc);
const EXPECTED_WEEK_TOTALS_DENISE = eval(expectedSrc);
const collectDenisePlanErrors = eval("(" + fnSrc + ")");

const errors = collectDenisePlanErrors(PLAN_DENISE);
if (errors.length) {
  console.error("PLAN_DENISE validatie FAILED:\n" + errors.map((e) => " - " + e).join("\n"));
  process.exit(1);
}

const totals = PLAN_DENISE.map((w) => +w.runs.reduce((a, r) => a + r.km, 0).toFixed(1));
console.log("PLAN_DENISE validatie OK — " + PLAN_DENISE.length + " weken.");
console.log("Weektotalen: " + totals.join(", "));
