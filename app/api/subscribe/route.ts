import { NextRequest, NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload/client'

const requestLog = new Map<string, number[]>()

function limited(ip: string) {
  const now = Date.now()
  const windowMs = 60_000
  const max = 8
  const previous = (requestLog.get(ip) || []).filter((x) => now - x < windowMs)
  previous.push(now)
  requestLog.set(ip, previous)
  return previous.length > max
}

export async function POST(request: NextRequest) {
  const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
  if (limited(ip)) return NextResponse.json({ error: 'Too many requests' }, { status: 429 })

  const body = await request.json()
  if (body.hp) return NextResponse.json({ ok: true })
  if (!body.email || !body.consent) return NextResponse.json({ error: 'Invalid body' }, { status: 400 })

  try {
    const payload = await getPayloadClient()
    await payload.create({
      collection: 'subscribers',
      data: {
        email: String(body.email).toLowerCase(),
        name: body.name || undefined,
        consent: true,
      },
    })

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Already subscribed or server error' }, { status: 409 })
  }
}
