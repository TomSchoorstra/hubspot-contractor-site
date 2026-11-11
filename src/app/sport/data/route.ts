import { PRIVATE_HEADERS, SPORT_COOKIE, sameOrigin, sessionFromRequest } from "@/lib/budget-auth";
import { localTrainingStorage, readTrainingPrefix, writeTrainingRow } from "@/lib/workout-storage";
import { docKey, normalizeDoc, TRAINING_NAMESPACE, type TrainingDoc } from "@/lib/training-library";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const json = (body: unknown, status = 200) => Response.json(body, { status, headers: PRIVATE_HEADERS });
const PREFIX = `tom:${TRAINING_NAMESPACE}:`;

// Every exercise, template and workout is its own row. Saving one can never overwrite
// another, and rows from the earlier calendar or the running plan are out of reach.
export async function GET(request: Request): Promise<Response> {
  if (!sessionFromRequest(request, SPORT_COOKIE)) return json({ error: "signed_out" }, 401);
  try {
    const docs: Record<string, TrainingDoc> = {};
    for (const row of await readTrainingPrefix(PREFIX)) {
      const doc = normalizeDoc(row.data);
      if (!doc || row.id !== PREFIX + docKey(doc)) throw new Error("Invalid stored training document");
      docs[docKey(doc)] = doc;
    }
    return json({ data: { version: 2, docs, storage: localTrainingStorage() ? "local" : "cloud" } });
  } catch { console.error("training GET failed"); return json({ error: "load_failed" }, 500); }
}
export async function POST(request: Request): Promise<Response> {
  if (!sessionFromRequest(request, SPORT_COOKIE)) return json({ error: "signed_out" }, 401);
  // A request that changes something must come from this site itself.
  if (!sameOrigin(request)) return json({ error: "forbidden" }, 403);
  let doc: TrainingDoc | null;
  try {
    const text = await request.text();
    if (text.length > 512000) return json({ error: "payload_too_large" }, 413);
    doc = normalizeDoc(JSON.parse(text)?.doc);
  } catch { return json({ error: "bad_request" }, 400); }
  if (!doc) return json({ error: "invalid_document" }, 400);
  try {
    // Deleting a workout is a tombstone, so delayed offline updates and undo can sync too.
    await writeTrainingRow(PREFIX + docKey(doc), doc);
    return json({ ok: true });
  } catch { console.error("training POST failed"); return json({ error: "save_failed" }, 500); }
}
