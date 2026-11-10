// Private budget page: the stored document and its validation.
// No amounts live in this repository. The document is stored server-side only.

export type BudgetLine = { id: string; name: string; amount: number };
// A variable cost is spent bit by bit through the month (groceries); `spent` is what has gone out so far.
export type BudgetCost = BudgetLine & { paid: boolean; saving: boolean; variable: boolean; spent: number };
export type BudgetExtra = BudgetLine & { received: boolean };
export type BudgetPot = { id: string; name: string; balance: number; monthly: number; counts: boolean };
export type BudgetDoc = {
  version: 1;
  updatedAt: number;
  income: BudgetLine[];
  costs: BudgetCost[];
  house: { target: string; items: BudgetLine[]; extras: BudgetExtra[]; pots: BudgetPot[] };
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
  const items = list<BudgetLine>(value.house.items, (row, base) => (amount(row.amount) ? { ...base, amount: row.amount } : null));
  const extras = list<BudgetExtra>(value.house.extras, (row, base) =>
    amount(row.amount) && typeof row.received === "boolean" ? { ...base, amount: row.amount, received: row.received } : null);
  const pots = list<BudgetPot>(value.house.pots, (row, base) =>
    amount(row.balance) && amount(row.monthly) && typeof row.counts === "boolean"
      ? { id: base.id, name: base.name, balance: row.balance, monthly: row.monthly, counts: row.counts }
      : null);
  if (!items || !extras || !pots) return null;
  return { version: 1, updatedAt: value.updatedAt, income, costs, house: { target: value.house.target, items, extras, pots } };
}
