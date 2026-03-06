import { NextRequest, NextResponse } from "next/server";
import { createClient, createServiceClient } from "@/lib/supabase-server";

export async function GET(req: NextRequest) {
  const page = req.nextUrl.searchParams.get("page") || "home";
  const supabase = createServiceClient();
  const { data } = await supabase.from("page_configs").select("config").eq("page", page).single();
  return NextResponse.json(data || { config: [] });
}

export async function POST(req: NextRequest) {
  // Verify admin
  const authClient = createClient();
  const { data: { user } } = await authClient.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { page, config } = await req.json();
  if (!page || !config) return NextResponse.json({ error: "Missing fields" }, { status: 400 });

  const supabase = createServiceClient();
  const { error } = await supabase.from("page_configs").upsert({ page, config, updated_at: new Date().toISOString() }, { onConflict: "page" });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
