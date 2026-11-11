import { NextRequest, NextResponse } from "next/server";
import { profileForKey } from "@/lib/loopschema";
import { localTrainingStorage, readTrainingPrefix, writeTrainingRow } from "@/lib/workout-storage";
import { docKey, normalizeDoc, TRAINING_NAMESPACE, type TrainingDoc } from "@/lib/training-library";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const json = (body: unknown, status = 200) => NextResponse.json(body, { status, headers: { "Cache-Control": "no-store", Vary: "x-loop-key" } });
function prefix(request: NextRequest) {
  const profile = profileForKey(request.headers.get("x-loop-key"));
  return profile?.rowId === "tom" ? `${profile.rowId}:${TRAINING_NAMESPACE}:` : null;
}
// Every exercise, template and workout is its own row. Saving one can never overwrite
// another, and rows from the earlier calendar or the running plan are out of reach.
export async function GET(request: NextRequest) {
  const key = prefix(request);
  if (!key) return json({ error: "forbidden" }, 403);
  try {
    const docs: Record<string, TrainingDoc> = {};
    for (const row of await readTrainingPrefix(key)) {
      const doc = normalizeDoc(row.data);
      if (!doc || row.id !== key + docKey(doc)) throw new Error("Invalid stored training document");
      docs[docKey(doc)] = doc;
    }
    return json({ data: { version: 2, docs, storage: localTrainingStorage() ? "local" : "cloud" } });
  } catch { console.error("training GET failed"); return json({ error: "load_failed" }, 500); }
}
export async function POST(request: NextRequest) {
  const key = prefix(request);
  if (!key) return json({ error: "forbidden" }, 403);
  let doc: TrainingDoc | null;
  try {
    const text = await request.text();
    if (text.length > 512000) return json({ error: "payload_too_large" }, 413);
    doc = normalizeDoc(JSON.parse(text)?.doc);
  } catch { return json({ error: "bad_request" }, 400); }
  if (!doc) return json({ error: "invalid_document" }, 400);
  try {
    // Deleting a workout is a tombstone, so delayed offline updates and undo can sync too.
    await writeTrainingRow(key + docKey(doc), doc);
    return json({ ok: true });
  } catch { console.error("training POST failed"); return json({ error: "save_failed" }, 500); }
}
