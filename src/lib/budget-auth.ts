// Password login for the private budget page.
// The password only exists as an environment variable (BUDGET_PASSWORD); nothing in this repository can open the page.
import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { readTrainingRows, writeTrainingRow } from "./workout-storage";

export const SESSION_COOKIE = "budget_session";
// The training app at /sport uses the same password with its own cookie, scoped to its own path.
export const SPORT_COOKIE = "sport_session";
export const SPORT_PATH = "/sport";
const SESSION_SECONDS = 60 * 60 * 24 * 30;
const MIN_PASSWORD_LENGTH = 10;
const MAX_FAILURES = 5;
const WINDOW_MS = 15 * 60 * 1000;
const AUTH_ROW_ID = "budget:auth";

const sha256 = (value: string) => createHash("sha256").update(value).digest();

export function passwordConfigured(): boolean {
  return (process.env.BUDGET_PASSWORD ?? "").length >= MIN_PASSWORD_LENGTH;
}
// Sessions are signed with a key derived from the password, so changing the password signs everyone out.
function sessionKey(): Buffer {
  return sha256("budget-session-key:" + (process.env.BUDGET_SESSION_SECRET ?? "") + ":" + process.env.BUDGET_PASSWORD);
}
export function passwordMatches(candidate: unknown): boolean {
  if (!passwordConfigured() || typeof candidate !== "string" || candidate.length > 200) return false;
  // Compare hashes so the comparison takes the same time for every length.
  return timingSafeEqual(sha256(candidate), sha256(process.env.BUDGET_PASSWORD as string));
}

function sign(expires: number): string {
  return createHmac("sha256", sessionKey()).update("budget-session:" + expires).digest("base64url");
}
export function createSession(now = Date.now()): string {
  const expires = Math.floor(now / 1000) + SESSION_SECONDS;
  return expires + "." + sign(expires);
}
export function sessionValid(token: unknown, now = Date.now()): boolean {
  if (!passwordConfigured() || typeof token !== "string") return false;
  const match = /^(\d{10,12})\.([A-Za-z0-9_-]{43})$/.exec(token);
  if (!match || Number(match[1]) * 1000 <= now) return false;
  const given = Buffer.from(match[2]), expected = Buffer.from(sign(Number(match[1])));
  return given.length === expected.length && timingSafeEqual(given, expected);
}
export function sessionFromRequest(request: Request, name: string = SESSION_COOKIE): boolean {
  const cookie = request.headers.get("cookie") ?? "";
  const found = cookie.split(";").map(part => part.trim()).find(part => part.startsWith(name + "="));
  return sessionValid(found?.slice(name.length + 1));
}
export function sessionCookie(token: string | null, name: string = SESSION_COOKIE, path = "/budget"): string {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  return `${name}=${token ?? ""}; Path=${path}; HttpOnly; SameSite=Strict${secure}; Max-Age=${token ? SESSION_SECONDS : 0}`;
}

// A request that changes something must come from this site itself.
// The page sends no referrer, so browsers report the origin as "null" even for same-site requests.
// Sec-Fetch-Site is set by the browser and cannot be set by a page, so it decides when it is present.
export function sameOrigin(request: Request): boolean {
  const site = request.headers.get("sec-fetch-site");
  if (site) return site === "same-origin" || site === "none";
  const origin = request.headers.get("origin");
  if (!origin || origin === "null") return true;
  try { return new URL(origin).host === (request.headers.get("x-forwarded-host") ?? request.headers.get("host") ?? new URL(request.url).host); }
  catch { return false; }
}

// Failed logins are counted per visitor address. Five misses lock that address for fifteen minutes.
type Attempts = Record<string, { count: number; first: number; lockedUntil: number }>;
function visitorKey(request: Request): string {
  const address = (request.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
  return sha256("budget-visitor:" + address).toString("hex").slice(0, 24);
}
async function readAttempts(now: number): Promise<Attempts> {
  const rows = await readTrainingRows([AUTH_ROW_ID]);
  const stored = rows[0]?.data as { attempts?: Attempts } | undefined;
  const attempts: Attempts = {};
  for (const [key, entry] of Object.entries(stored?.attempts ?? {})) {
    if (entry && typeof entry.count === "number" && typeof entry.first === "number" && typeof entry.lockedUntil === "number" && Math.max(entry.first + WINDOW_MS, entry.lockedUntil) > now) attempts[key] = entry;
  }
  return attempts;
}
export async function loginLocked(request: Request, now = Date.now()): Promise<boolean> {
  return ((await readAttempts(now))[visitorKey(request)]?.lockedUntil ?? 0) > now;
}
export async function recordLogin(request: Request, success: boolean, now = Date.now()): Promise<void> {
  const attempts = await readAttempts(now), key = visitorKey(request);
  if (success) {
    if (!attempts[key]) return;
    delete attempts[key];
  } else {
    const entry = attempts[key] ?? { count: 0, first: now, lockedUntil: 0 };
    entry.count += 1;
    if (entry.count >= MAX_FAILURES) entry.lockedUntil = now + WINDOW_MS;
    attempts[key] = entry;
  }
  await writeTrainingRow(AUTH_ROW_ID, { attempts });
}

export const PRIVATE_HEADERS = {
  "X-Robots-Tag": "noindex, nofollow",
  "Cache-Control": "no-store",
  "Referrer-Policy": "no-referrer",
} as const;
