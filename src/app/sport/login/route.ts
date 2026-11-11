import { PRIVATE_HEADERS, SPORT_COOKIE, SPORT_PATH, createSession, loginLocked, passwordConfigured, passwordMatches, recordLogin, sameOrigin, sessionCookie } from "@/lib/budget-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const back = (query = "", cookie?: string) => new Response(null, {
  status: 303,
  headers: { ...PRIVATE_HEADERS, Location: SPORT_PATH + query, ...(cookie ? { "Set-Cookie": cookie } : {}) },
});

// Same password, lockout and pause as the budget login; the session cookie only travels to /sport.
export async function POST(request: Request): Promise<Response> {
  if (!sameOrigin(request)) return new Response("Forbidden", { status: 403, headers: PRIVATE_HEADERS });
  if (!passwordConfigured()) return back();
  if (await loginLocked(request)) return back("?fout=2");
  let password: unknown = null;
  try { password = (await request.formData()).get("password"); } catch { /* handled as a wrong password */ }
  const ok = passwordMatches(password);
  await recordLogin(request, ok);
  if (ok) return back("", sessionCookie(createSession(), SPORT_COOKIE, SPORT_PATH));
  await new Promise(resolve => setTimeout(resolve, 600));
  return back("?fout=1");
}
