import {NextResponse} from 'next/server'
import {getLatestEpisodes} from '@/lib/sanity/podcast'

export async function GET() {
  const episodes = await getLatestEpisodes(6)
  return NextResponse.json({episodes})
}
