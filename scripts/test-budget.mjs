import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import * as nodeCrypto from "node:crypto";
import test from "node:test";
import ts from "typescript";

// Runs the production TypeScript against an in-memory store. Every amount in this file is invented;
// no real budget, password or database is read or written.
function world(env = {}) {
  const store = new Map(), cache = new Map();
  const storage = {
    readTrainingRows: async ids => ids.filter(id => store.has(id)).map(id => ({ id, data: structuredClone(store.get(id)) })),
    writeTrainingRow: async (id, data) => { store.set(id, structuredClone(data)); },
  };
  const processStub = { env: { NODE_ENV: "test", ...env } };
  function load(file) {
    file = path.normalize(file);
    if (cache.has(file)) return cache.get(file).exports;
    const output = ts.transpileModule(fs.readFileSync(file, "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true } });
    const compiled = { exports: {} };
    cache.set(file, compiled);
    vm.runInNewContext(output.outputText, {
      module: compiled, exports: compiled.exports, Request, Response, URL, Buffer, process: processStub,
      setTimeout: callback => { callback(); return 1; },
      require(name) {
        if (name === "node:crypto") return nodeCrypto;
        if (name.endsWith("workout-storage")) return storage;
        if (name.startsWith("@/")) return load("src/" + name.slice(2) + ".ts");
        if (name.startsWith(".")) return load(path.join(path.dirname(file), name) + ".ts");
        throw Error("Unexpected dependency " + name);
      },
    }, { filename: file });
    return compiled.exports;
  }
  return { load, store, env: processStub.env };
}
const PASSWORD = "test-only-" + nodeCrypto.randomBytes(9).toString("hex");
const fixture = () => ({
  version: 1, updatedAt: 1700000000000,
  income: [{ id: "salary", name: "Salaris", amount: 3000 }, { id: "refund", name: "Teruggaaf", amount: 200 }],
  costs: [
    { id: "rent", name: "Huur", amount: 1000, paid: true, saving: false },
    { id: "food", name: "Boodschappen", amount: 400.5, paid: false, saving: false },
    { id: "house", name: "Sparen huis", amount: 500, paid: true, saving: true },
    { id: "phone", name: "Telefoon", amount: 20, paid: false, saving: false },
  ],
  house: {
    target: "2028-10",
    items: [{ id: "kitchen", name: "Keuken", amount: 9000 }, { id: "floor", name: "Vloer", amount: 6000 }],
    extras: [{ id: "cheque", name: "Cheque", amount: 1000, received: false }, { id: "old", name: "Al binnen", amount: 700, received: true }],
    pots: [
      { id: "house", name: "Huis", balance: 400, monthly: 500, counts: true },
      { id: "savings", name: "Sparen", balance: 1000, monthly: 100, counts: true },
      { id: "holiday", name: "Vakantie", balance: 50, monthly: 100, counts: false },
    ],
  },
});
const request = (url, { method = "GET", cookie, origin, site, body, form, address = "203.0.113.5" } = {}) => new Request("https://site.test" + url, {
  method,
  headers: { host: "site.test", "x-forwarded-for": address, ...(cookie ? { cookie } : {}), ...(origin ? { origin } : {}), ...(site ? { "sec-fetch-site": site } : {}), ...(form ? { "Content-Type": "application/x-www-form-urlencoded" } : body ? { "Content-Type": "application/json" } : {}) },
  ...(form ? { body: new URLSearchParams(form).toString() } : body !== undefined ? { body: typeof body === "string" ? body : JSON.stringify(body) } : {}),
});

test("budget documents validate amounts, ids, the target month and drop unknown fields", () => {
  const { normalizeBudget } = world().load("src/lib/budget.ts");
  const clean = normalizeBudget({ ...fixture(), secret: "x" });
  assert.equal(clean.costs.length, 4); assert.equal(clean.secret, undefined); assert.equal(clean.costs[1].amount, 400.5);
  const broken = change => { const doc = fixture(); change(doc); return normalizeBudget(doc); };
  assert.equal(broken(d => { d.costs[0].amount = -1; }), null);
  assert.equal(broken(d => { d.costs[0].amount = 1.005; }), null);
  assert.equal(broken(d => { d.costs[1].id = "rent"; }), null);
  assert.equal(broken(d => { d.costs[0].paid = "yes"; }), null);
  assert.equal(broken(d => { d.house.target = "2028-13"; }), null);
  assert.equal(broken(d => { d.version = 2; }), null);
  assert.equal(broken(d => { d.income = Array.from({ length: 101 }, (_, i) => ({ id: "i" + i, name: "", amount: 1 })); }), null);
  assert.equal(broken(d => { d.house.pots[0].counts = 1; }), null);
  // Documents saved before gradual spending existed get the defaults; given values are kept and checked.
  assert.equal(clean.costs[0].variable, false); assert.equal(clean.costs[0].spent, 0);
  const spending = fixture(); spending.costs[1].variable = true; spending.costs[1].spent = 120.5;
  assert.equal(normalizeBudget(spending).costs[1].spent, 120.5); assert.equal(normalizeBudget(spending).costs[1].variable, true);
  assert.equal(broken(d => { d.costs[1].spent = -1; }), null);
  // House items saved before deposits existed count as nothing paid; a given deposit is kept and checked.
  assert.equal(clean.house.items[0].paid, 0);
  const deposit = fixture(); deposit.house.items[0].paid = 2250.5;
  assert.equal(normalizeBudget(deposit).house.items[0].paid, 2250.5);
  assert.equal(broken(d => { d.house.items[0].paid = -1; }), null);
  assert.equal(broken(d => { d.house.items[0].paid = "25%"; }), null);
  assert.equal(broken(d => { d.costs[1].variable = "yes"; }), null);
  assert.equal(normalizeBudget(null), null);
});

test("only the configured password opens a session, and sessions expire, cannot be forged and end when the password changes", () => {
  const w = world({ BUDGET_PASSWORD: PASSWORD }), auth = w.load("src/lib/budget-auth.ts");
  assert.equal(auth.passwordMatches(PASSWORD), true);
  assert.equal(auth.passwordMatches(PASSWORD + "x"), false);
  assert.equal(auth.passwordMatches(""), false);
  assert.equal(auth.passwordMatches(undefined), false);
  const now = 1800000000000, token = auth.createSession(now);
  assert.equal(auth.sessionValid(token, now + 1000), true);
  assert.equal(auth.sessionValid(token, now + 31 * 86400000), false);
  const [expires, signature] = token.split(".");
  assert.equal(auth.sessionValid(Number(expires) + 86400 + "." + signature, now), false);
  assert.equal(auth.sessionValid(expires + "." + signature.slice(0, -1) + (signature.endsWith("A") ? "B" : "A"), now), false);
  assert.equal(auth.sessionValid("", now), false);
  w.env.BUDGET_PASSWORD = PASSWORD + "-changed";
  assert.equal(auth.sessionValid(token, now + 1000), false);
  // A missing or short password means nothing can log in.
  w.env.BUDGET_PASSWORD = "short";
  assert.equal(auth.passwordConfigured(), false);
  assert.equal(auth.passwordMatches("short"), false);
  assert.equal(auth.sessionValid(auth.createSession(now), now), false);
  assert.match(auth.sessionCookie("abc"), /HttpOnly; SameSite=Strict/);
  assert.match(auth.sessionCookie("abc"), /Path=\/budget/);
});

test("five failed logins lock one visitor address for fifteen minutes without locking others", async () => {
  const w = world({ BUDGET_PASSWORD: PASSWORD }), auth = w.load("src/lib/budget-auth.ts");
  const visitor = request("/budget/login", { method: "POST" }), other = request("/budget/login", { method: "POST", address: "198.51.100.9" });
  const now = 1800000000000;
  for (let i = 0; i < 4; i++) await auth.recordLogin(visitor, false, now + i);
  assert.equal(await auth.loginLocked(visitor, now + 10), false);
  await auth.recordLogin(visitor, false, now + 10);
  assert.equal(await auth.loginLocked(visitor, now + 20), true);
  assert.equal(await auth.loginLocked(other, now + 20), false);
  assert.equal(await auth.loginLocked(visitor, now + 16 * 60000), false);
  // A successful login clears earlier misses. Addresses are stored hashed.
  await auth.recordLogin(other, false, now); await auth.recordLogin(other, true, now + 1);
  assert.equal(JSON.stringify(w.store.get("budget:auth")).includes("198.51.100.9"), false);
  assert.equal(Object.keys(w.store.get("budget:auth").attempts).length, 1);
});

test("the page shows only a login form without a session and the data routes refuse anonymous and cross-site requests", async () => {
  const w = world({ BUDGET_PASSWORD: PASSWORD });
  const page = w.load("src/app/budget/route.ts"), login = w.load("src/app/budget/login/route.ts"), data = w.load("src/app/budget/data/route.ts"), logout = w.load("src/app/budget/logout/route.ts");
  const anonymous = await page.GET(request("/budget"));
  const html = await anonymous.text();
  assert.equal(anonymous.status, 200);
  assert.match(html, /name="password"/); assert.equal(html.includes("Budget.initialize"), false); assert.equal(html.includes("__BUDGET__"), false);
  assert.equal(anonymous.headers.get("x-robots-tag"), "noindex, nofollow"); assert.equal(anonymous.headers.get("cache-control"), "no-store");
  assert.match(await (await page.GET(request("/budget?fout=1"))).text(), /Dat wachtwoord klopt niet/);
  assert.equal((await data.GET(request("/budget/data"))).status, 401);
  assert.equal((await data.PUT(request("/budget/data", { method: "PUT", body: { doc: fixture() } }))).status, 401);
  assert.equal(w.store.has("budget:tom"), false);

  const wrong = await login.POST(request("/budget/login", { method: "POST", origin: "https://site.test", form: { password: "not-the-password" } }));
  assert.equal(wrong.status, 303); assert.equal(wrong.headers.get("location"), "/budget?fout=1"); assert.equal(wrong.headers.get("set-cookie"), null);
  assert.equal((await login.POST(request("/budget/login", { method: "POST", origin: "https://evil.test", form: { password: PASSWORD } }))).status, 403);
  const right = await login.POST(request("/budget/login", { method: "POST", origin: "https://site.test", form: { password: PASSWORD } }));
  assert.equal(right.status, 303); assert.equal(right.headers.get("location"), "/budget");
  const cookie = right.headers.get("set-cookie").split(";")[0];

  const signedIn = await (await page.GET(request("/budget", { cookie }))).text();
  assert.match(signedIn, /Budget\.initialize/); assert.equal(signedIn.includes("name=\"password\""), false);
  // The page itself never carries amounts; they arrive through the data route.
  assert.equal(signedIn.includes("Keuken"), false);
  assert.equal((await (await data.GET(request("/budget/data", { cookie }))).json()).data, null);
  assert.equal((await data.PUT(request("/budget/data", { method: "PUT", cookie, origin: "https://evil.test", body: { doc: fixture() } }))).status, 403);
  const saved = await data.PUT(request("/budget/data", { method: "PUT", cookie, origin: "https://site.test", body: { doc: fixture() } }));
  assert.equal(saved.status, 200); assert.equal(w.store.get("budget:tom").costs.length, 4);
  const invalid = fixture(); invalid.costs[0].amount = -5;
  assert.equal((await data.PUT(request("/budget/data", { method: "PUT", cookie, origin: "https://site.test", body: { doc: invalid } }))).status, 400);
  assert.equal(w.store.get("budget:tom").costs[0].amount, 1000);
  assert.equal((await (await data.GET(request("/budget/data", { cookie }))).json()).data.house.target, "2028-10");
  assert.match((await logout.POST(request("/budget/logout", { method: "POST", cookie, origin: "https://site.test" }))).headers.get("set-cookie"), /Max-Age=0/);
});

test("without a configured password the page explains the setup, and the preview never exists in production", async () => {
  const unset = world({});
  assert.equal((await unset.load("src/app/budget/route.ts").GET(request("/budget"))).status, 503);
  const local = world({ BUDGET_PASSWORD: PASSWORD });
  assert.match(await (await local.load("src/app/budget/route.ts").GET(request("/budget?voorbeeld=1"))).text(), /"preview":true/);
  const production = world({ BUDGET_PASSWORD: PASSWORD, NODE_ENV: "production" });
  const html = await (await production.load("src/app/budget/route.ts").GET(request("/budget?voorbeeld=1"))).text();
  assert.match(html, /name="password"/); assert.equal(html.includes("__BUDGET__"), false);
});

test("the month and house totals follow the document", async () => {
  const w = world({ BUDGET_PASSWORD: PASSWORD });
  const { BUDGET_APP_HTML } = w.load("src/app/budget/budget-html.ts");
  const elements = new Map();
  const element = id => { if (!elements.has(id)) elements.set(id, { textContent: "", innerHTML: "", hidden: false, value: "", dataset: {}, style: {}, classList: { add() {}, remove() {}, toggle() {} }, setAttribute() {}, removeAttribute() {}, addEventListener() {}, appendChild() {}, querySelectorAll: () => [], querySelector: () => null }); return elements.get(id); };
  const script = BUDGET_APP_HTML.match(/<script>([\s\S]*?)<\/script>/)[1].replace("/*__BUDGET_CONFIG__*/", "window.__BUDGET__=" + JSON.stringify({ preview: true, demo: fixture() }) + ";");
  const context = vm.createContext({ window: { addEventListener() {}, location: { hash: "" } }, document: { getElementById: element, querySelectorAll: () => [], createElement: () => element("created") }, Intl, URL, Blob, setTimeout: () => 1, clearTimeout() {}, fetch: () => { throw Error("The preview must not fetch"); } });
  vm.runInContext(script, context);
  const run = code => vm.runInContext(code, context);
  const s = run('JSON.stringify(Budget.summary(Budget.doc(),"2026-11-10"))'), { month, house } = JSON.parse(s);
  assert.deepEqual(month, { total: 1920.5, paid: 1500, open: 420.5, income: 3200, fixed: 1420.5, savings: 500, left: 1279.5, count: 4, paidCount: 2 });
  // 23 months remain. Counted pots: (400 + 23 x 500) + (1000 + 23 x 100) = 15200, plus the cheque that is still expected.
  assert.deepEqual(house, { months: 23, budget: 15000, paid: 0, remaining: 15000, extras: 1000, now: 1400, expected: 16200, everything: 18550, diff: 1200, diffAll: 3550 });
  // A 25% deposit on the kitchen has already left the pots, so only the rest still has to be covered.
  run('Budget.doc().house.items.find(x=>x.id==="kitchen").paid=2250');
  const deposit = JSON.parse(run('JSON.stringify(Budget.summary(Budget.doc(),"2026-11-10").house)'));
  assert.equal(deposit.paid, 2250); assert.equal(deposit.remaining, 12750); assert.equal(deposit.budget, 15000);
  assert.equal(deposit.diff, 3450); assert.equal(deposit.diffAll, 5800);
  // Paying more than an item's amount never lowers what the other items still need.
  run('Budget.doc().house.items.find(x=>x.id==="kitchen").paid=9500');
  assert.equal(JSON.parse(run('JSON.stringify(Budget.summary(Budget.doc(),"2026-11-10").house)')).remaining, 6000);
  run('Budget.doc().house.items.find(x=>x.id==="kitchen").paid=0');
  assert.equal(run('Budget.monthsUntil("2028-10","2028-11-01")'), 0);
  assert.equal(run('Budget.monthsUntil("2028-10","2028-10-31")'), 0);
  assert.equal(run('Budget.monthsUntil("2028-10","2027-12-31")'), 10);
  for (const [text, value] of [["1.091", 1091], ["1.091,50", 1091.5], ["€ 600", 600], ["64,5", 64.5], ["64.5", 64.5], ["", 0], ["12.50", 12.5]]) assert.equal(run("Budget.parseMoney(" + JSON.stringify(text) + ")"), value, text);
  for (const text of ["abc", "-5", "1,234,5", "1.2345", "99999999"]) assert.equal(run("Budget.parseMoney(" + JSON.stringify(text) + ")"), undefined, text);
  // Groceries fill up through the month: what is spent counts as paid, the rest of its budget is still needed.
  run('(()=>{const c=Budget.doc().costs.find(x=>x.id==="food");c.variable=true;c.spent=150.25;})()');
  const spending = JSON.parse(run('JSON.stringify(Budget.summary(Budget.doc(),"2026-11-10").month)'));
  assert.equal(spending.paid, 1650.25); assert.equal(spending.open, 270.25); assert.equal(spending.total, 1920.5); assert.equal(spending.paidCount, 2);
  // Spending more than the budget never makes the amount still needed negative.
  run('Budget.doc().costs.find(x=>x.id==="food").spent=500');
  const over = JSON.parse(run('JSON.stringify(Budget.summary(Budget.doc(),"2026-11-10").month)'));
  assert.equal(over.open, 20); assert.equal(over.paid, 2000); assert.equal(over.paidCount, 3);
  run('(()=>{const c=Budget.doc().costs.find(x=>x.id==="food");c.variable=false;c.spent=0;})()');
  assert.equal(elements.get("mOpen").textContent.replace(/\s/g, " "), "€ 420,50");
  assert.equal(elements.get("hDiff").innerHTML.replace(/\s/g, " "), "€ 1.200<small>over</small>");
});

test("a real browser on this page sends Origin: null; same-site requests pass and cross-site requests are refused", async () => {
  const w = world({ BUDGET_PASSWORD: PASSWORD });
  const login = w.load("src/app/budget/login/route.ts"), data = w.load("src/app/budget/data/route.ts");
  // The page uses no-referrer, so the browser reports the origin as "null" for its own form and fetch requests.
  const right = await login.POST(request("/budget/login", { method: "POST", origin: "null", site: "same-origin", form: { password: PASSWORD } }));
  assert.equal(right.status, 303); assert.equal(right.headers.get("location"), "/budget");
  const cookie = right.headers.get("set-cookie").split(";")[0];
  assert.equal((await data.PUT(request("/budget/data", { method: "PUT", cookie, origin: "null", site: "same-origin", body: { doc: fixture() } }))).status, 200);
  assert.equal((await login.POST(request("/budget/login", { method: "POST", origin: "null", site: "cross-site", form: { password: PASSWORD } }))).status, 403);
  assert.equal((await login.POST(request("/budget/login", { method: "POST", origin: "https://site.test", site: "cross-site", form: { password: PASSWORD } }))).status, 403);
  assert.equal((await data.PUT(request("/budget/data", { method: "PUT", cookie, origin: "null", site: "same-site", body: { doc: fixture() } }))).status, 403);
});
