// Private budget page: the stored document and its validation.
// No amounts live in this repository. The document is stored server-side only.

export type BudgetLine = { id: string; name: string; amount: number };
// A variable cost is spent bit by bit through the month (groceries); `spent` is what has gone out so far.
export type BudgetCost = BudgetLine & { paid: boolean; saving: boolean; variable: boolean; spent: number };
// A house item can be partly paid already (a deposit); `paid` is what has gone out for it so far.
export type HouseItem = BudgetLine & { paid: number };
// An expected one-off amount can arrive in parts (an allowance settled per invoice); `got` is what has arrived so far.
export type BudgetExtra = BudgetLine & { received: boolean; got: number };
// A pot can stop at a maximum (`cap`, 0 = none). From then on its monthly deposit goes to another pot (`overflowTo`, "" = nowhere).
export type BudgetPot = { id: string; name: string; balance: number; monthly: number; counts: boolean; cap: number; overflowTo: string };
// The what-if plan for the months until the house is delivered. Every amount and rate in it is the owner's own
// assumption and is stored with the budget; this repository only holds the rules that calculate with them.
// A cost line of a place can rise once a year (rent): `rise` is that percentage, 0 = it stays the same.
export type ScenarioLine = BudgetLine & { rise: number };
export type ScenarioPlace = { id: string; name: string; lines: ScenarioLine[] };
export type ScenarioDraw = BudgetLine & { month: string };
// `note` is the owner's own one-line reason for the amount, shown when hovering the switch.
export type ScenarioOneOff = BudgetLine & { on: boolean; income: boolean; note: string };
export type BudgetScenario = {
  delivery: string;
  // Where the owner can live. The first place is today's situation; the others are compared with it.
  places: ScenarioPlace[];
  // Month -> place id. A month that is not listed is spent in the first place.
  stay: Record<string, string>;
  // The month of the year in which rising cost lines go up.
  riseMonth: number;
  salary: number; netShare: number; raiseMonth: number; raises: Record<string, number>;
  mortgageNow: number; mortgageFull: number; depotRate: number; depotStop: string; depotStopOn: boolean;
  // The depot has a last month. What is left then pays off the loan, and later instalments are borrowed anew at `reloanRate`.
  depotEnd: string; depotEndOn: boolean; reloanRate: number;
  draws: ScenarioDraw[];
  // The instalment months were planned for a build from `buildStart` to `drawsBase`. When delivery moves, they stretch along. "" = they stay put.
  buildStart: string; drawsBase: string;
  interestNow: number; taxRate: number; taxInBudget: number; taxFrom: string;
  oneOffs: ScenarioOneOff[];
  // Pots that do not count for the house on the tracker but are counted in this plan.
  pots: string[];
};
export type BudgetDoc = {
  version: 1;
  updatedAt: number;
  income: BudgetLine[];
  costs: BudgetCost[];
  house: { target: string; items: HouseItem[]; extras: BudgetExtra[]; pots: BudgetPot[] };
  scenario?: BudgetScenario;
};

export const BUDGET_ROW_ID = "budget:tom";
const MAX_ROWS = 100;
const MAX_AMOUNT = 10_000_000;

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}
function amount(value: unknown): value is number {
  // Euros with at most two decimals, never negative.
  return typeof value === "number" && Number.isFinite(value) && value >= 0 && value <= MAX_AMOUNT && Math.abs(value * 100 - Math.round(value * 100)) < 1e-6;
}
function line(value: unknown, ids: Set<string>): BudgetLine | null {
  if (!isRecord(value)) return null;
  const { id, name } = value;
  if (typeof id !== "string" || !/^[a-z0-9-]{1,40}$/.test(id) || ids.has(id)) return null;
  if (typeof name !== "string" || name.length > 80) return null;
  ids.add(id);
  return { id, name, amount: 0 };
}
function list<T>(value: unknown, read: (row: Record<string, unknown>, base: BudgetLine) => T | null): T[] | null {
  if (!Array.isArray(value) || value.length > MAX_ROWS) return null;
  const ids = new Set<string>();
  const rows: T[] = [];
  for (const raw of value) {
    const base = line(raw, ids);
    if (!base) return null;
    const row = read(raw as Record<string, unknown>, base);
    if (!row) return null;
    rows.push(row);
  }
  return rows;
}

export function validTargetMonth(value: unknown): value is string {
  return typeof value === "string" && /^\d{4}-(0[1-9]|1[0-2])$/.test(value) && Number(value.slice(0, 4)) >= 2020 && Number(value.slice(0, 4)) <= 2100;
}

const monthKey = (value: unknown): value is string => typeof value === "string" && /^\d{4}-(0[1-9]|1[0-2])$/.test(value);
const percentage = (value: unknown): value is number => amount(value) && value <= 100;

// Same contract as normalizeBudget: a clean copy, or null when anything is off.
function normalizeScenario(value: unknown, potIds: Set<string>): BudgetScenario | null {
  if (!isRecord(value)) return null;
  const { delivery, depotStop, depotStopOn, taxFrom, raiseMonth, salary, mortgageNow, mortgageFull, interestNow, taxInBudget, netShare, depotRate, taxRate } = value;
  if (!validTargetMonth(delivery) || !monthKey(depotStop) || !monthKey(taxFrom) || typeof depotStopOn !== "boolean") return null;
  if (!amount(salary) || !amount(mortgageNow) || !amount(mortgageFull) || !amount(interestNow) || !amount(taxInBudget)) return null;
  if (!percentage(netShare) || !percentage(depotRate) || !percentage(taxRate)) return null;
  // The delay settings were added later; plans saved before that have them switched off.
  const depotEnd = value.depotEnd === undefined ? delivery : value.depotEnd;
  const depotEndOn = value.depotEndOn === undefined ? false : value.depotEndOn;
  const reloanRate = value.reloanRate === undefined ? 0 : value.reloanRate;
  const buildStart = value.buildStart === undefined ? "" : value.buildStart, drawsBase = value.drawsBase === undefined ? "" : value.drawsBase;
  if (!monthKey(depotEnd) || typeof depotEndOn !== "boolean" || !percentage(reloanRate)) return null;
  if ((buildStart !== "" && !monthKey(buildStart)) || (drawsBase !== "" && !monthKey(drawsBase))) return null;
  // `riseMonth` was added later; plans saved before that use July, when rents usually go up.
  const riseMonth = value.riseMonth === undefined ? 7 : value.riseMonth;
  if (typeof riseMonth !== "number" || !Number.isInteger(riseMonth) || riseMonth < 1 || riseMonth > 12) return null;
  if (typeof raiseMonth !== "number" || !Number.isInteger(raiseMonth) || raiseMonth < 1 || raiseMonth > 12) return null;
  const places = list<ScenarioPlace>(value.places, (row, base) => {
    // `rise` was added later; lines saved before that do not rise.
    const lines = list<ScenarioLine>(row.lines, (line, lineBase) =>
      amount(line.amount) && (line.rise === undefined || percentage(line.rise)) ? { ...lineBase, amount: line.amount, rise: (line.rise as number | undefined) ?? 0 } : null);
    return lines && lines.length <= 30 ? { id: base.id, name: base.name, lines } : null;
  });
  const draws = list<ScenarioDraw>(value.draws, (row, base) => (amount(row.amount) && monthKey(row.month) ? { ...base, amount: row.amount, month: row.month } : null));
  const oneOffs = list<ScenarioOneOff>(value.oneOffs, (row, base) =>
    amount(row.amount) && typeof row.on === "boolean" && typeof row.income === "boolean" && (row.note === undefined || (typeof row.note === "string" && row.note.length <= 200))
      ? { ...base, amount: row.amount, on: row.on, income: row.income, note: (row.note as string | undefined) ?? "" } : null);
  if (!places || places.length < 1 || places.length > 6 || !draws || !oneOffs) return null;
  if (!isRecord(value.stay) || !isRecord(value.raises) || !Array.isArray(value.pots) || value.pots.length > MAX_ROWS) return null;
  // A month in a place that no longer exists, or in the first place, is simply not listed.
  const placeIds = new Set(places.slice(1).map(place => place.id));
  const stayEntries = Object.entries(value.stay);
  if (stayEntries.length > 240) return null;
  const stay: Record<string, string> = {};
  for (const [month, place] of stayEntries) {
    if (!monthKey(month) || typeof place !== "string") return null;
    if (placeIds.has(place)) stay[month] = place;
  }
  const raiseEntries = Object.entries(value.raises);
  if (raiseEntries.length > 40) return null;
  const raises: Record<string, number> = {};
  for (const [year, pct] of raiseEntries) {
    if (!/^\d{4}$/.test(year) || !percentage(pct)) return null;
    raises[year] = pct;
  }
  const pots: string[] = [];
  for (const id of value.pots) {
    if (typeof id !== "string") return null;
    if (potIds.has(id) && !pots.includes(id)) pots.push(id);
  }
  return { delivery, places, stay, riseMonth, salary, netShare, raiseMonth, raises, mortgageNow, mortgageFull, depotRate, depotStop, depotStopOn, depotEnd, depotEndOn, reloanRate, draws, buildStart, drawsBase, interestNow, taxRate, taxInBudget, taxFrom, oneOffs, pots };
}

// Returns a clean copy, or null when anything is off. Unknown fields are dropped.
export function normalizeBudget(value: unknown): BudgetDoc | null {
  if (!isRecord(value) || value.version !== 1) return null;
  if (typeof value.updatedAt !== "number" || !Number.isSafeInteger(value.updatedAt) || value.updatedAt <= 0) return null;
  const income = list<BudgetLine>(value.income, (row, base) => (amount(row.amount) ? { ...base, amount: row.amount } : null));
  const costs = list<BudgetCost>(value.costs, (row, base) =>
    // `variable` and `spent` were added later; documents saved before that simply lack them.
    amount(row.amount) && typeof row.paid === "boolean" && typeof row.saving === "boolean"
      && (row.variable === undefined || typeof row.variable === "boolean") && (row.spent === undefined || amount(row.spent))
      ? { ...base, amount: row.amount, paid: row.paid, saving: row.saving, variable: row.variable === true, spent: (row.spent as number | undefined) ?? 0 }
      : null);
  if (!income || !costs || !isRecord(value.house) || !validTargetMonth(value.house.target)) return null;
  // `paid` was added later; items saved before that count as nothing paid yet.
  const items = list<HouseItem>(value.house.items, (row, base) =>
    amount(row.amount) && (row.paid === undefined || amount(row.paid)) ? { ...base, amount: row.amount, paid: (row.paid as number | undefined) ?? 0 } : null);
  const extras = list<BudgetExtra>(value.house.extras, (row, base) =>
    // `got` was added later; amounts saved before that count as nothing received yet.
    amount(row.amount) && typeof row.received === "boolean" && (row.got === undefined || amount(row.got))
      ? { ...base, amount: row.amount, received: row.received, got: (row.got as number | undefined) ?? 0 } : null);
  const pots = list<BudgetPot>(value.house.pots, (row, base) =>
    // `cap` and `overflowTo` were added later; pots saved before that have no maximum.
    amount(row.balance) && amount(row.monthly) && typeof row.counts === "boolean"
      && (row.cap === undefined || amount(row.cap))
      && (row.overflowTo === undefined || (typeof row.overflowTo === "string" && /^([a-z0-9-]{1,40})?$/.test(row.overflowTo)))
      ? { id: base.id, name: base.name, balance: row.balance, monthly: row.monthly, counts: row.counts, cap: (row.cap as number | undefined) ?? 0, overflowTo: (row.overflowTo as string | undefined) ?? "" }
      : null);
  if (!items || !extras || !pots) return null;
  // A pot that overflows into itself or into a pot that no longer exists overflows nowhere.
  const potIds = new Set(pots.map(pot => pot.id));
  for (const pot of pots) if (pot.overflowTo && (pot.overflowTo === pot.id || !potIds.has(pot.overflowTo))) pot.overflowTo = "";
  const doc: BudgetDoc = { version: 1, updatedAt: value.updatedAt, income, costs, house: { target: value.house.target, items, extras, pots } };
  // The scenario was added later; documents saved before that simply have none.
  if (value.scenario !== undefined && value.scenario !== null) {
    const scenario = normalizeScenario(value.scenario, potIds);
    if (!scenario) return null;
    doc.scenario = scenario;
  }
  return doc;
}
