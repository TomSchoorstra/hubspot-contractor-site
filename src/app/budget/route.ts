import { PRIVATE_HEADERS, passwordConfigured, sessionFromRequest } from "@/lib/budget-auth";
import { BUDGET_APP_HTML, BUDGET_SETUP_HTML, budgetLoginHtml } from "./budget-html";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const HEADERS = {
  ...PRIVATE_HEADERS,
  "Content-Type": "text/html; charset=utf-8",
  "Content-Security-Policy": "default-src 'self'; style-src 'unsafe-inline'; script-src 'unsafe-inline'; img-src 'self' data:; frame-ancestors 'none'; base-uri 'none'; form-action 'self'",
  "X-Frame-Options": "DENY",
};

// Invented amounts for the local preview. Real amounts never live in this repository.
const DEMO = {
  version: 1, updatedAt: 1,
  income: [{ id: "salary", name: "Netto salaris", amount: 3000 }],
  costs: [
    { id: "rent", name: "Huur", amount: 900, paid: true, saving: false },
    { id: "food", name: "Boodschappen", amount: 400, paid: false, saving: false, variable: true, spent: 150 },
    { id: "house", name: "Spaarrekening huis", amount: 500, paid: true, saving: true },
    { id: "health", name: "Zorgverzekering", amount: 150, paid: true, saving: false },
    { id: "internet", name: "Internet", amount: 49.95, paid: false, saving: false },
    { id: "phone", name: "Telefoon", amount: 20, paid: false, saving: false },
  ],
  house: {
    target: "2028-10",
    items: [
      { id: "kitchen", name: "Keuken", amount: 9000, paid: 2250 },
      { id: "floor", name: "Vloer", amount: 4000 },
      { id: "bath", name: "Badkamer", amount: 6000 },
    ],
    extras: [{ id: "refund", name: "Belastingteruggaaf", amount: 2000, received: false }],
    pots: [
      { id: "house", name: "Spaarrekening huis", balance: 1500, monthly: 500, counts: true },
      { id: "holiday", name: "Vakantie", balance: 300, monthly: 100, counts: false },
    ],
  },
  scenario: {
    delivery: "2028-10",
    places: [
      { id: "home", name: "Eigen huurhuis", lines: [{ id: "rent", name: "Huur", amount: 900 }, { id: "food", name: "Boodschappen", amount: 400 }, { id: "power", name: "Energie", amount: 100 }] },
      { id: "abroad", name: "Buitenland", lines: [{ id: "rent", name: "Huur", amount: 600 }, { id: "food", name: "Boodschappen", amount: 300 }, { id: "flights", name: "Vluchten", amount: 60 }] },
      { id: "partner", name: "Bij partner", lines: [{ id: "share", name: "Bijdrage", amount: 500 }, { id: "food", name: "Boodschappen", amount: 300 }] },
    ],
    stay: { "2027-09": "abroad", "2027-10": "abroad", "2027-11": "abroad", "2027-12": "abroad", "2028-01": "abroad", "2028-02": "abroad", "2028-06": "partner", "2028-07": "partner", "2028-08": "partner", "2028-09": "partner" },
    salary: 50000, netShare: 55, raiseMonth: 4, raises: { "2027": 3, "2028": 3 },
    mortgageNow: 700, mortgageFull: 1200, depotRate: 3, depotStop: "2028-07", depotStopOn: false,
    draws: [
      { id: "t2", name: "Termijn 2", amount: 30000, month: "2027-02" },
      { id: "t3", name: "Termijn 3", amount: 40000, month: "2027-07" },
      { id: "t4", name: "Termijn 4", amount: 40000, month: "2028-01" },
      { id: "t5", name: "Termijn 5", amount: 30000, month: "2028-06" },
    ],
    interestNow: 300, taxRate: 37, taxInBudget: 150, taxFrom: "2027-01",
    oneOffs: [{ id: "move", name: "Verhuizen en opslag", amount: 800, on: true, income: false }, { id: "bonus", name: "Bonus", amount: 1500, on: false, income: true }],
    pots: [],
  },
};

function app(config: object): Response {
  const json = JSON.stringify(config).replace(/</g, "\\u003c");
  return new Response(BUDGET_APP_HTML.replace("/*__BUDGET_CONFIG__*/", () => `window.__BUDGET__=${json};`), { headers: HEADERS });
}

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  // The preview with invented amounts only exists outside production.
  if (process.env.NODE_ENV !== "production" && url.searchParams.get("voorbeeld") === "1") return app({ preview: true, demo: DEMO });
  if (!passwordConfigured()) return new Response(BUDGET_SETUP_HTML, { status: 503, headers: HEADERS });
  if (!sessionFromRequest(request)) return new Response(budgetLoginHtml(url.searchParams.get("fout")), { headers: HEADERS });
  return app({ preview: false });
}
