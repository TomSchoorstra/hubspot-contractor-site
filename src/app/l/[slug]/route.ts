import { LOOPSCHEMA_HTML } from "./loopschema-html";
import { PROFILES } from "@/lib/loopschema";

// Serveert de loopschema-app op een obscure, niet-geïndexeerde route.
// Elke geldige slug krijgt z'n eigen persoonlijke pagina (naam, zones, hamstring).

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> },
): Promise<Response> {
  const { slug } = await params;
  const profile = PROFILES[slug];
  if (!profile) return new Response("Not found", { status: 404 });

  const cfg = JSON.stringify({
    apiKey: slug,
    name: profile.name,
    check: profile.check,
    zones: profile.zones,
    rowId: profile.rowId,
  });
  const html = LOOPSCHEMA_HTML.replace(
    "/*__LOOP_CONFIG__*/",
    `window.__LOOP__=${cfg};`,
  );

  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "X-Robots-Tag": "noindex, nofollow",
      "Cache-Control": "no-store",
    },
  });
}
