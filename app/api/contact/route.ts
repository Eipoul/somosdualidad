import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations";
import { sanitizeText } from "@/lib/utils";

type AttemptMap = Map<string, { count: number; timestamp: number }>;

const WINDOW_MS = 60_000;
const MAX_ATTEMPTS = 5;

// Guardamos el store en globalThis usando un Symbol (sin `var`)
const STORE_KEY = Symbol.for("somosDualidad.contactRateLimitStore");

function getStore(): AttemptMap {
  const g = globalThis as unknown as Record<symbol, AttemptMap | undefined>;
  if (!g[STORE_KEY]) g[STORE_KEY] = new Map();
  return g[STORE_KEY]!;
}

function getIp(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

function isRateLimited(store: AttemptMap, ip: string) {
  const now = Date.now();
  const record = store.get(ip);

  if (!record || now - record.timestamp > WINDOW_MS) {
    store.set(ip, { count: 1, timestamp: now });
    return false;
  }

  if (record.count >= MAX_ATTEMPTS) return true;

  store.set(ip, { count: record.count + 1, timestamp: record.timestamp });
  return false;
}

export async function POST(request: Request) {
  const store = getStore();
  const ip = getIp(request);

  if (isRateLimited(store, ip)) {
    return NextResponse.json(
      { message: "Demasiadas solicitudes. Intenta más tarde." },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { message: "Datos inválidos", errors: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const payload = {
      name: sanitizeText(parsed.data.name),
      email: sanitizeText(parsed.data.email),
      message: sanitizeText(parsed.data.message),
    };

    console.info("[CONTACT_FORM]", payload);

    return NextResponse.json({ message: "Mensaje recibido" }, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: "No se pudo procesar la solicitud" },
      { status: 500 }
    );
  }
}
