import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations";
import { sanitizeText } from "@/lib/utils";

type AttemptMap = Map<string, { count: number; timestamp: number }>;

const rateLimitStore: AttemptMap = globalThis.__contactRateLimitStore ?? new Map();

if (!globalThis.__contactRateLimitStore) {
  globalThis.__contactRateLimitStore = rateLimitStore;
}

const WINDOW_MS = 60_000;
const MAX_ATTEMPTS = 5;

function getIp(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const record = rateLimitStore.get(ip);

  if (!record || now - record.timestamp > WINDOW_MS) {
    rateLimitStore.set(ip, { count: 1, timestamp: now });
    return false;
  }

  if (record.count >= MAX_ATTEMPTS) {
    return true;
  }

  rateLimitStore.set(ip, { count: record.count + 1, timestamp: record.timestamp });
  return false;
}

export async function POST(request: Request) {
  const ip = getIp(request);

  if (isRateLimited(ip)) {
    return NextResponse.json({ message: "Demasiadas solicitudes. Intenta más tarde." }, { status: 429 });
  }

  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ message: "Datos inválidos", errors: parsed.error.flatten() }, { status: 400 });
    }

    const payload = {
      name: sanitizeText(parsed.data.name),
      email: sanitizeText(parsed.data.email),
      message: sanitizeText(parsed.data.message)
    };

    console.info("[CONTACT_FORM]", payload);

    return NextResponse.json({ message: "Mensaje recibido" }, { status: 200 });
  } catch {
    return NextResponse.json({ message: "No se pudo procesar la solicitud" }, { status: 500 });
  }
}

declare global {
  var __contactRateLimitStore: AttemptMap | undefined;
}
