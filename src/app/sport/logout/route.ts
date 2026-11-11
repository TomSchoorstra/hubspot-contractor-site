import { PRIVATE_HEADERS, SPORT_COOKIE, SPORT_PATH, sameOrigin, sessionCookie } from "@/lib/budget-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request): Promise<Response> {
  if (!sameOrigin(request)) return new Response("Forbidden", { status: 403, headers: PRIVATE_HEADERS });
  return new Response(null, { status: 303, headers: { ...PRIVATE_HEADERS, Location: SPORT_PATH, "Set-Cookie": sessionCookie(null, SPORT_COOKIE, SPORT_PATH) } });
}
