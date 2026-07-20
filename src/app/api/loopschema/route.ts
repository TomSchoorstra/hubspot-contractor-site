import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { profileForKey } from "@/lib/loopschema";

// Server-side proxy naar Supabase voor de loopschema-app. De frontend stuurt
// de obscure slug mee als 'key'; die mapt server-side naar een DB-rij. Zo staat
// er nooit een Supabase-key in de browser (service-role blijft server-side).

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function resolveRowId(request: NextRequest): string | null {
  const key =
    request.nextUrl.searchParams.get("key") ??
    request.headers.get("x-loop-key") ??
    undefined;
  return profileForKey(key)?.rowId ?? null;
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  const rowId = resolveRowId(request);
  if (!rowId) return NextResponse.json({ error: "forbidden" }, { status: 403 });

  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("training_state")
      .select("data")
      .eq("id", rowId)
      .maybeSingle();
    if (error) throw error;
    return NextResponse.json({ data: data?.data ?? null });
  } catch (e) {
    console.error("loopschema GET failed", e);
    return NextResponse.json({ error: "load_failed" }, { status: 500 });
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const rowId = resolveRowId(request);
  if (!rowId) return NextResponse.json({ error: "forbidden" }, { status: 403 });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }
  const payload = (body as { data?: unknown })?.data;
  if (!payload || typeof payload !== "object") {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  try {
    const supabase = getSupabase();
    const { error } = await supabase.from("training_state").upsert({
      id: rowId,
      data: payload,
      updated_at: new Date().toISOString(),
    });
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("loopschema POST failed", e);
    return NextResponse.json({ error: "save_failed" }, { status: 500 });
  }
}
