import { PRIVATE_HEADERS, createSession, loginLocked, passwordConfigured, passwordMatches, recordLogin, sameOrigin, sessionCookie } from "@/lib/budget-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const back = (query = "", cookie?: string) => new Response(null, {
  status: 303,
  headers: { ...PRIVATE_HEADERS, Location: "/budget" + query, ...(cookie ? { "Set-Cookie": cookie } : {}) },
});

export async function POST(request: Request): Promise<Response> {
  if (!sameOrigin(request)) return new Response("Forbidden", { status: 403, headers: PRIVATE_HEADERS });
  if (!passwordConfigured()) return back();
  if (await loginLocked(request)) return back("?fout=2");
  let password: unknown = null;
  try { password = (await request.formData()).get("password"); } catch { /* handled as a wrong password */ }
  const ok = passwordMatches(password);
  await recordLogin(request, ok);
  if (ok) return back("", sessionCookie(createSession()));
  // A short pause makes guessing slow without getting in the way of a typo.
  await new Promise(resolve => setTimeout(resolve, 600));
  return back("?fout=1");
}
