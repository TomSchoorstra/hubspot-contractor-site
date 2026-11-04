import { mkdir, readFile, readdir, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { getSupabase } from "./supabase";

const localRoot = path.join(process.cwd(), ".local", "training");
export function localTrainingStorage(): boolean {
  const configured = Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
  if (!configured && (process.env.SUPABASE_URL || process.env.SUPABASE_SERVICE_ROLE_KEY)) throw new Error("Incomplete training database configuration");
  if (!configured && process.env.NODE_ENV === "production") throw new Error("Training database is not configured");
  return !configured;
}
async function localJson(file: string): Promise<unknown | null> {
  try { return JSON.parse(await readFile(path.join(localRoot, file), "utf8")); }
  catch (error) { if ((error as NodeJS.ErrnoException).code === "ENOENT") return null; throw error; }
}
export async function readTrainingRows(ids: string[]): Promise<{ id: string; data: unknown }[]> {
  if (!localTrainingStorage()) {
    const { data, error } = await getSupabase().from("training_state").select("id, data").in("id", ids);
    if (error) throw error;
    return data ?? [];
  }
  const values = await Promise.all(ids.map(async id => ({id, data: await localJson("sessions/" + encodeURIComponent(id) + ".json")})));
  return values.filter(row => row.data !== null);
}
export async function writeTrainingRow(id: string, data: unknown): Promise<void> {
  if (!localTrainingStorage()) {
    const { error } = await getSupabase().from("training_state").upsert({ id, data, updated_at: new Date().toISOString() });
    if (error) throw error;
    return;
  }
  const dir = path.join(localRoot, "sessions");
  await mkdir(dir, { recursive: true, mode: 0o700 });
  const target = path.join(dir, encodeURIComponent(id) + ".json");
  const temporary = target + "." + randomUUID() + ".tmp";
  await writeFile(temporary, JSON.stringify(data), { mode: 0o600 });
  await rename(temporary, target);
}
export async function readTrainingPrefix(prefix: string): Promise<{ id: string; data: unknown }[]> {
  if (!localTrainingStorage()) {
    const rows: { id: string; data: unknown }[] = [];
    // PostgREST defaults to 1,000 rows; paginate so older sessions stay available.
    for (let offset = 0; ; offset += 500) {
      const { data, error } = await getSupabase().from("training_state").select("id, data").like("id", prefix + "%").order("id").range(offset, offset + 499);
      if (error) throw error;
      rows.push(...(data ?? []));
      if (!data || data.length < 500) break;
    }
    return rows;
  }
  let files: string[];
  try { files = await readdir(path.join(localRoot, "sessions")); }
  catch (error) { if ((error as NodeJS.ErrnoException).code === "ENOENT") return []; throw error; }
  const ids = files.filter(name => name.endsWith(".json")).flatMap(name => {
    try { const id = decodeURIComponent(name.slice(0, -5)); return id.startsWith(prefix) ? [id] : []; }
    catch { return []; }
  });
  return readTrainingRows(ids);
}
