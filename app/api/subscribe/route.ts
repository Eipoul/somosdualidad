import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase-server";
import { sendWelcomeEmail } from "@/lib/resend";
import { z } from "zod";

const schema = z.object({ email: z.string().email() });

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = schema.parse(body);

    const supabase = createServiceClient();

    // Check if already subscribed
    const { data: existing } = await supabase
      .from("subscribers")
      .select("id, status")
      .eq("email", email)
      .single();

    if (existing) {
      if (existing.status === "active") {
        return NextResponse.json({ message: "Ya estás suscrita/o." }, { status: 200 });
      }
      // Re-activate
      await supabase.from("subscribers").update({ status: "active" }).eq("id", existing.id);
      await sendWelcomeEmail(email);
      return NextResponse.json({ message: "¡Bienvenida de vuelta! Te hemos reactivado." });
    }

    // Insert new subscriber
    const { error } = await supabase.from("subscribers").insert({ email, status: "active" });
    if (error) throw error;

    // Send welcome email
    await sendWelcomeEmail(email);

    return NextResponse.json({ message: "¡Gracias por suscribirte! Revisa tu correo." });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: "Correo electrónico inválido." }, { status: 400 });
    }
    console.error("Subscribe error:", err);
    return NextResponse.json({ error: "Error interno. Inténtalo de nuevo." }, { status: 500 });
  }
}
