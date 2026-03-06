import { NextRequest, NextResponse } from "next/server";
import { createClient, createServiceClient } from "@/lib/supabase-server";
import { getBroadcastClient, FROM_EMAIL } from "@/lib/resend";

export async function POST(req: NextRequest) {
  const authClient = createClient();
  const { data: { user } } = await authClient.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { subject, body } = await req.json();
  if (!subject || !body) return NextResponse.json({ error: "Missing subject or body" }, { status: 400 });

  const supabase = createServiceClient();
  const { data: subscribers } = await supabase.from("subscribers").select("email").eq("status", "active");

  if (!subscribers || subscribers.length === 0) {
    return NextResponse.json({ message: "No active subscribers", sent: 0 });
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const emails = subscribers.map((s: { email: string }) => s.email);

  const batches: string[][] = [];
  for (let i = 0; i < emails.length; i += 100) batches.push(emails.slice(i, i + 100));

  try {
    const resend = getBroadcastClient();
    for (const batch of batches) {
      await resend.batch.send(
        batch.map((email) => ({
          from: FROM_EMAIL,
          to: email,
          subject,
          html: `
            <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;padding:40px 20px;background:#FAF7F2;color:#2C1A0E">
              <h1 style="font-size:1.5rem;margin-bottom:1rem;color:#2C1A0E">Somos Dualidad</h1>
              <div style="white-space:pre-wrap;line-height:1.8;color:#6B4C35">${body}</div>
              <hr style="border:none;border-top:1px solid #E8E1D7;margin:40px 0"/>
              <p style="font-size:12px;color:#8F8678">
                <a href="${siteUrl}/api/unsubscribe?email=${encodeURIComponent(email)}" style="color:#C4714F">Cancelar suscripción</a>
              </p>
            </div>
          `,
        }))
      );
    }
    return NextResponse.json({ message: "Broadcast sent", sent: emails.length });
  } catch (err) {
    console.error("Broadcast error:", err);
    return NextResponse.json({ error: "Failed to send broadcast" }, { status: 500 });
  }
}
