import {NextResponse} from 'next/server'
import {getFeaturedEpisode} from '@/lib/sanity/podcast'

export async function GET() {
  const episode = await getFeaturedEpisode()
  return NextResponse.json({episode})
}
