import {createClient} from '@sanity/client'
import {type NextRequest, NextResponse} from 'next/server'

const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
})

const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_MAX_REQUESTS = 5
const requestLog = new Map<string, number[]>()

function hasExceededRateLimit(ip: string) {
  const now = Date.now()
  const history = requestLog.get(ip)?.filter((time) => now - time < RATE_LIMIT_WINDOW_MS) || []
  history.push(now)
  requestLog.set(ip, history)
  return history.length > RATE_LIMIT_MAX_REQUESTS
}

function toSafeId(email: string) {
  return email.toLowerCase().replace(/[^a-z0-9]/g, '-')
}

export async function POST(request: NextRequest) {
  if (!process.env.SANITY_API_WRITE_TOKEN) return NextResponse.json({error: 'Missing SANITY_API_WRITE_TOKEN.'}, {status: 500})

  const body = (await request.json()) as {name?: string; email?: string; consent?: boolean; sourcePage?: string; hpField?: string; startedAt?: number}

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  if (hasExceededRateLimit(ip)) return NextResponse.json({error: 'Too many requests.'}, {status: 429})
  if (body.hpField) return NextResponse.json({ok: true})
  if (body.startedAt && Date.now() - body.startedAt < 1500) return NextResponse.json({error: 'Spam protection triggered.'}, {status: 429})

  const email = body.email?.trim().toLowerCase()
  const name = body.name?.trim() || undefined
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({error: 'Invalid email.'}, {status: 400})

  const id = `newsletterSubscriber.${toSafeId(email)}`
  await writeClient.createOrReplace({_id: id, _type: 'newsletterSubscriber', email, name, consent: Boolean(body.consent), sourcePage: body.sourcePage || '/', createdAt: new Date().toISOString()})

  return NextResponse.json({ok: true})
}
