import { NextRequest, NextResponse } from "next/server";
import { profileForKey } from "@/lib/loopschema";
import { localTrainingStorage, readTrainingPrefix, writeTrainingRow } from "@/lib/workout-storage";
import { normalizeWorkout, WORKOUT_NAMESPACE, type WorkoutEntry } from "@/lib/workout-planner";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const json = (body: unknown, status = 200) => NextResponse.json(body, {status, headers:{"Cache-Control":"no-store",Vary:"x-loop-key"}});
function prefix(request: NextRequest) {
  const profile = profileForKey(request.headers.get("x-loop-key"));
  return profile?.rowId === "tom" ? `${profile.rowId}:${WORKOUT_NAMESPACE}:` : null;
}
export async function GET(request: NextRequest) {
  const key = prefix(request);
  if (!key) return json({error:"forbidden"},403);
  try {
    const entries: Record<string, WorkoutEntry> = {};
    for (const row of await readTrainingPrefix(key)) {
      const entry = normalizeWorkout(row.data);
      if (!entry || row.id !== key + entry.id) throw new Error("Invalid stored workout");
      entries[entry.id] = entry;
    }
    return json({data:{version:1,entries,storage:localTrainingStorage()?"local":"cloud"}});
  } catch { console.error("workout-sessions GET failed"); return json({error:"load_failed"},500); }
}
export async function POST(request: NextRequest) {
  const key = prefix(request);
  if (!key) return json({error:"forbidden"},403);
  let entry: WorkoutEntry | null;
  try {
    const text = await request.text();
    if (text.length > 512000) return json({error:"payload_too_large"},413);
    const body = JSON.parse(text);
    entry = normalizeWorkout(body?.entry);
  } catch { return json({error:"bad_request"},400); }
  if (!entry) return json({error:"invalid_workout"},400);
  try {
    // Deletion is a tombstone, so delayed offline updates and undo can sync too.
    await writeTrainingRow(key + entry.id, entry);
    return json({ok:true});
  } catch { console.error("workout-sessions POST failed"); return json({error:"save_failed"},500); }
}
