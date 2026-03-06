import { NextRequest, NextResponse } from "next/server";
import { createClient, createServiceClient } from "@/lib/supabase-server";

export async function GET() {
  const supabase = createServiceClient();
  const { data } = await supabase.from("page_configs").select("config").eq("page", "settings").single();
  return NextResponse.json(data?.config || null);
}

export async function POST(req: NextRequest) {
  const authClient = createClient();
  const { data: { user } } = await authClient.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const config = await req.json();
  const supabase = createServiceClient();
  const { error } = await supabase.from("page_configs").upsert(
    { page: "settings", config, updated_at: new Date().toISOString() },
    { onConflict: "page" }
  );

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
