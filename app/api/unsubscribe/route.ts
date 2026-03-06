import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase-server";

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email");

  if (!email) {
    return new NextResponse(
      `<html><body style="font-family:sans-serif;text-align:center;padding:40px"><h1>Enlace inválido</h1><p>El enlace de cancelación no es válido.</p></body></html>`,
      { headers: { "Content-Type": "text/html" } }
    );
  }

  const supabase = createServiceClient();
  await supabase.from("subscribers").update({ status: "unsubscribed" }).eq("email", email);

  return new NextResponse(
    `<html><body style="font-family:Georgia,serif;text-align:center;padding:60px;background:#FAF7F2;color:#2C1A0E">
    <h1 style="font-size:2rem;margin-bottom:1rem">Te has dado de baja</h1>
    <p style="color:#6B4C35;max-width:400px;margin:0 auto">Ya no recibirás correos de Somos Dualidad. Si fue un error, puedes volver a suscribirte en <a href="${process.env.NEXT_PUBLIC_SITE_URL}/subscribe" style="color:#C4714F">somosdualidad.com/subscribe</a>.</p>
    </body></html>`,
    { headers: { "Content-Type": "text/html" } }
  );
}
