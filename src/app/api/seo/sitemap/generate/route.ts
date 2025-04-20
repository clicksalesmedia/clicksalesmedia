import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { writeFile } from 'fs/promises'
import path from 'path'

export async function POST(request: Request) {
  try {
    const { entries } = await request.json()
    
    // Save entries to database
    await Promise.all(
      entries.map((entry: any) =>
        prisma.sitemapEntry.upsert({
          where: { url: entry.url },
          update: {
            priority: entry.priority,
            changefreq: entry.changefreq,
            lastmod: new Date(),
          },
          create: {
            url: entry.url,
            priority: entry.priority,
            changefreq: entry.changefreq,
            lastmod: new Date(),
          },
        })
      )
    )

    // Generate sitemap XML
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${entries
    .map(
      (entry: any) => `
  <url>
    <loc>${process.env.NEXT_PUBLIC_SITE_URL}${entry.url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`
    )
    .join('')}
</urlset>`

    // Save sitemap to public directory
    const publicDir = path.join(process.cwd(), 'public')
    await writeFile(path.join(publicDir, 'sitemap.xml'), xml)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error generating sitemap:', error)
    return NextResponse.json(
      { error: 'Failed to generate sitemap' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const entries = await prisma.sitemapEntry.findMany()
    return NextResponse.json(entries)
  } catch (error) {
    console.error('Error fetching sitemap entries:', error)
    return NextResponse.json(
      { error: 'Failed to fetch sitemap entries' },
      { status: 500 }
    )
  }
} 