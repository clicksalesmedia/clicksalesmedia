import { NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'
import { headers } from 'next/headers'

// Set CORS headers to avoid cross-origin issues
async function setCorsHeaders(res: NextResponse): Promise<NextResponse> {
  const headersList = await headers()
  const origin = headersList.get('origin') ?? '*'
  
  res.headers.set('Access-Control-Allow-Origin', origin)
  res.headers.set('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS')
  res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  return res
}

// Handle preflight requests
export async function OPTIONS() {
  const res = new NextResponse(null, { status: 204 })
  return setCorsHeaders(res)
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    console.log('Fetching blog post with slug:', slug)
    
    const post = await prisma.blogPost.findUnique({
      where: { slug },
      include: {
        author: {
          select: {
            name: true,
            image: true
          }
        },
        categories: {
          select: {
            id: true,
            name: true,
            slug: true
          }
        }
      }
    })
    
    if (!post) {
      const errorResponse = NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      )
      return setCorsHeaders(errorResponse)
    }
    
    console.log('Found blog post:', post.title)
    
    const response = NextResponse.json(post)
    return setCorsHeaders(response)
  } catch (error) {
    console.error('Error fetching blog post:', error)
    
    const errorResponse = NextResponse.json(
      { error: 'Failed to fetch blog post' },
      { status: 500 }
    )
    
    return setCorsHeaders(errorResponse)
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const data = await request.json()
    
    const updatedPost = await prisma.blogPost.update({
      where: { slug },
      data: {
        title: data.title,
        titleAr: data.titleAr || null,
        slug: data.slug,
        content: data.content,
        contentAr: data.contentAr || null,
        excerpt: data.excerpt || null,
        excerptAr: data.excerptAr || null,
        coverImage: data.coverImage || null,
        published: data.published,
        categories: {
          set: [], // Clear existing categories
          connect: data.categories?.map((cat: any) => ({ id: cat.id })) || []
        }
      },
      include: {
        author: {
          select: {
            name: true,
            image: true
          }
        },
        categories: {
          select: {
            id: true,
            name: true,
            slug: true
          }
        }
      }
    })
    
    const response = NextResponse.json(updatedPost)
    return setCorsHeaders(response)
  } catch (error) {
    console.error('Error updating blog post:', error)
    
    const errorResponse = NextResponse.json(
      { error: 'Failed to update blog post' },
      { status: 500 }
    )
    
    return setCorsHeaders(errorResponse)
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    
    await prisma.blogPost.delete({
      where: { slug }
    })
    
    const response = NextResponse.json({ message: 'Blog post deleted successfully' })
    return setCorsHeaders(response)
  } catch (error) {
    console.error('Error deleting blog post:', error)
    
    const errorResponse = NextResponse.json(
      { error: 'Failed to delete blog post' },
      { status: 500 }
    )
    
    return setCorsHeaders(errorResponse)
  }
} 