import { NextResponse } from 'next/server';
import { prisma } from '../../lib/prisma';
import { headers } from 'next/headers';

// Set CORS headers to avoid cross-origin issues
async function setCorsHeaders(res: NextResponse): Promise<NextResponse> {
  const headersList = await headers();
  const origin = headersList.get('origin') ?? '*';
  
  res.headers.set('Access-Control-Allow-Origin', origin);
  res.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return res;
}

// Handle preflight requests
export async function OPTIONS() {
  const res = new NextResponse(null, { status: 204 });
  return setCorsHeaders(res);
}

export async function GET(request: Request) {
  try {
    console.log('Fetching blog posts');
    
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10');
    const page = parseInt(searchParams.get('page') || '1');
    const category = searchParams.get('category');
    const featured = searchParams.get('featured') === 'true';
    
    console.log('Query params:', { limit, page, category, featured });
    
    const skip = (page - 1) * limit;
    
    const where = {
      published: true,
      ...(category && {
        categories: {
          some: {
            slug: category
          }
        }
      }),
      ...(featured && { featured: true })
    };
    
    console.log('Where clause:', where);
    
    const posts = await prisma.blogPost.findMany({
      where,
      orderBy: {
        createdAt: 'desc'
      },
      skip,
      take: limit,
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
    });
    
    const total = await prisma.blogPost.count({ where });
    
    console.log(`Found ${posts.length} posts out of ${total} total`);
    
    const response = NextResponse.json({
      posts,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    });
    
    return setCorsHeaders(response);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    
    const errorResponse = NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
    
    return setCorsHeaders(errorResponse);
  }
} 