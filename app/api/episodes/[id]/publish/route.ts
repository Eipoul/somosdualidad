import { NextRequest, NextResponse } from "next/server";
import { createClient, createServiceClient } from "@/lib/supabase-server";
import { sendNewEpisodeEmail } from "@/lib/resend";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  // Verify admin session
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const serviceClient = createServiceClient();

  // Get episode
  const { data: episode, error: epError } = await serviceClient
    .from("episodes")
    .select("id, title, description, cover_image_url, slug")
    .eq("id", params.id)
    .single();

  if (epError || !episode) {
    return NextResponse.json({ error: "Episode not found" }, { status: 404 });
  }

  // Get all active subscribers
  const { data: subscribers } = await serviceClient
    .from("subscribers")
    .select("email")
    .eq("status", "active");

  if (!subscribers || subscribers.length === 0) {
    return NextResponse.json({ message: "No subscribers to notify", sent: 0 });
  }

  const emails = subscribers.map((s: { email: string }) => s.email);

  try {
    await sendNewEpisodeEmail({
      subscribers: emails,
      episode: {
        title: episode.title,
        description: episode.description || "",
        coverImageUrl: episode.cover_image_url || undefined,
        slug: episode.slug,
      },
    });

    return NextResponse.json({ message: "Notifications sent", sent: emails.length });
  } catch (err) {
    console.error("Failed to send episode notifications:", err);
    return NextResponse.json({ error: "Failed to send emails" }, { status: 500 });
  }
}
