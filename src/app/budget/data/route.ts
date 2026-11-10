import { PRIVATE_HEADERS, sameOrigin, sessionFromRequest } from "@/lib/budget-auth";
import { BUDGET_ROW_ID, normalizeBudget } from "@/lib/budget";
import { readTrainingRows, writeTrainingRow } from "@/lib/workout-storage";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const json = (body: unknown, status = 200) => Response.json(body, { status, headers: PRIVATE_HEADERS });

export async function GET(request: Request): Promise<Response> {
  if (!sessionFromRequest(request)) return json({ error: "Niet ingelogd" }, 401);
  try {
    const rows = await readTrainingRows([BUDGET_ROW_ID]);
    // A stored document that no longer validates is reported, never silently replaced.
    if (rows[0] && !normalizeBudget(rows[0].data)) return json({ error: "Opgeslagen budget is ongeldig" }, 500);
    return json({ data: rows[0] ? normalizeBudget(rows[0].data) : null });
  } catch {
    return json({ error: "Laden mislukt" }, 500);
  }
}

export async function PUT(request: Request): Promise<Response> {
  if (!sessionFromRequest(request)) return json({ error: "Niet ingelogd" }, 401);
  if (!sameOrigin(request)) return json({ error: "Forbidden" }, 403);
  let body: unknown;
  try {
    const text = await request.text();
    if (text.length > 200_000) return json({ error: "Te groot" }, 413);
    body = JSON.parse(text);
  } catch {
    return json({ error: "Ongeldige invoer" }, 400);
  }
  const doc = normalizeBudget((body as { doc?: unknown } | null)?.doc);
  if (!doc) return json({ error: "Ongeldige invoer" }, 400);
  try {
    await writeTrainingRow(BUDGET_ROW_ID, doc);
    return json({ data: doc });
  } catch {
    return json({ error: "Opslaan mislukt" }, 500);
  }
}
