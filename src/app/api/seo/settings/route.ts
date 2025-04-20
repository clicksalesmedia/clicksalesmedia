import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const settings = await prisma.sEOSettings.findMany()
    return NextResponse.json(settings)
  } catch (error) {
    console.error('Error fetching SEO settings:', error)
    return NextResponse.json(
      { error: 'Failed to fetch SEO settings' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { pageUrl, title, description, keywords, ogTitle, ogDescription, ogImage, canonical, robotsTxt, sitemap, schema, metaTags } = data

    const settings = await prisma.sEOSettings.create({
      data: {
        pageUrl,
        title,
        description,
        keywords,
        ogTitle,
        ogDescription,
        ogImage,
        canonical,
        robotsTxt,
        sitemap,
        schema,
        metaTags: {
          create: metaTags?.map((tag: { name: string; content: string }) => ({
            name: tag.name,
            content: tag.content,
          })) || [],
        },
      },
    })

    return NextResponse.json(settings)
  } catch (error) {
    console.error('Error creating SEO settings:', error)
    return NextResponse.json(
      { error: 'Failed to create SEO settings' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json()
    const { id, ...updateData } = data

    const settings = await prisma.sEOSettings.update({
      where: { id },
      data: {
        ...updateData,
        metaTags: {
          deleteMany: {},
          create: updateData.metaTags?.map((tag: { name: string; content: string }) => ({
            name: tag.name,
            content: tag.content,
          })) || [],
        },
      },
    })

    return NextResponse.json(settings)
  } catch (error) {
    console.error('Error updating SEO settings:', error)
    return NextResponse.json(
      { error: 'Failed to update SEO settings' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json()
    await prisma.sEOSettings.delete({
      where: { id },
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting SEO settings:', error)
    return NextResponse.json(
      { error: 'Failed to delete SEO settings' },
      { status: 500 }
    )
  }
} 