import { profileForKey } from "@/lib/loopschema";
import { LOADS, MUSCLES, RUN_PROGRAMME, SEED_EXERCISES, SEED_TEMPLATES, WEEK_TARGET } from "@/lib/training-library";
import { TRAINING_HTML } from "./training-html";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
): Promise<Response> {
  const { slug } = await params;
  const profile = profileForKey(slug);
  if (profile?.rowId !== "tom") return new Response("Not found", { status: 404 });

  const config = JSON.stringify({
    apiKey: slug,
    rowId: profile.rowId,
    name: profile.name,
    api: "/api/training",
    seeds: { exercises: SEED_EXERCISES, templates: SEED_TEMPLATES },
    run: RUN_PROGRAMME,
    muscles: MUSCLES,
    loads: LOADS,
    weekTarget: WEEK_TARGET,
    preview: new URL(request.url).searchParams.get("voorbeeld") === "1",
  }).replace(/</g, "\\u003c");

  return new Response(TRAINING_HTML.replace("/*__TRAINING_CONFIG__*/", () => `window.__TRAINING__=${config};`), {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "X-Robots-Tag": "noindex, nofollow",
      "Cache-Control": "no-store",
      "Referrer-Policy": "no-referrer",
    },
  });
}
