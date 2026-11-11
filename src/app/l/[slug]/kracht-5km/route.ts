import { profileForKey } from "@/lib/loopschema";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// The training app moved to /sport, behind the site password. The key in this
// address no longer opens anything; an old bookmark lands on the login page.
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
): Promise<Response> {
  const { slug } = await params;
  if (profileForKey(slug)?.rowId !== "tom") return new Response("Not found", { status: 404 });
  return new Response(null, { status: 308, headers: { Location: "/sport", "X-Robots-Tag": "noindex, nofollow", "Cache-Control": "no-store", "Referrer-Policy": "no-referrer" } });
}
