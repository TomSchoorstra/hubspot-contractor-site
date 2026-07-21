// Loopschema-app: koppelt een obscure URL-slug aan een persoon (eigen DB-rij).
// De slugs zijn de "sleutel" tot de data — houd ze geheim. In een publieke repo
// horen de echte slugs als Vercel-env-vars te staan; de defaults zijn voor lokaal.

const TOM_SLUG = process.env.LOOP_SLUG_TOM ?? "9fqz3k7mx2rp8wtn";
const DENISE_SLUG = process.env.LOOP_SLUG_DENISE ?? "4vhn8key2md6rqxs";

export type LoopProfile = {
  rowId: string; // primaire sleutel in training_state
  name: string;
  check: "hamstring" | "knie" | null; // blessure-check per run (null = geen)
  zones: "tom" | "partner";
};

export const PROFILES: Record<string, LoopProfile> = {
  [TOM_SLUG]: { rowId: "tom", name: "Tom", check: "hamstring", zones: "tom" },
  [DENISE_SLUG]: { rowId: "denise", name: "Denise <3", check: "knie", zones: "partner" },
};

export function profileForKey(key?: string | null): LoopProfile | null {
  if (!key) return null;
  return PROFILES[key] ?? null;
}
