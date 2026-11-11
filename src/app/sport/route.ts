import { PRIVATE_HEADERS, SPORT_COOKIE, passwordConfigured, sessionFromRequest } from "@/lib/budget-auth";
import { LOADS, MUSCLES, RUN_PROGRAMME, SEED_EXERCISES, SEED_TEMPLATES, WEEK_TARGET } from "@/lib/training-library";
import { SPORT_SETUP_HTML, TRAINING_HTML, sportLoginHtml } from "./training-html";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const HEADERS = {
  ...PRIVATE_HEADERS,
  "Content-Type": "text/html; charset=utf-8",
  "Content-Security-Policy": "default-src 'self'; style-src 'unsafe-inline'; script-src 'unsafe-inline'; img-src 'self' data:; frame-ancestors 'none'; base-uri 'none'; form-action 'self'",
  "X-Frame-Options": "DENY",
};

function app(preview: boolean): Response {
  const config = JSON.stringify({
    rowId: "tom",
    api: "/sport/data",
    seeds: { exercises: SEED_EXERCISES, templates: SEED_TEMPLATES },
    run: RUN_PROGRAMME,
    muscles: MUSCLES,
    loads: LOADS,
    weekTarget: WEEK_TARGET,
    preview,
  }).replace(/</g, "\\u003c");
  return new Response(TRAINING_HTML.replace("/*__TRAINING_CONFIG__*/", () => `window.__TRAINING__=${config};`), { headers: HEADERS });
}

// The page is private: it opens with the site password and a session cookie, never with a key in the address.
export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  // The preview stores everything on the device and only exists outside production.
  if (process.env.NODE_ENV !== "production" && url.searchParams.get("voorbeeld") === "1") return app(true);
  if (!passwordConfigured()) return new Response(SPORT_SETUP_HTML, { status: 503, headers: HEADERS });
  if (!sessionFromRequest(request, SPORT_COOKIE)) return new Response(sportLoginHtml(url.searchParams.get("fout")), { headers: HEADERS });
  return app(false);
}
