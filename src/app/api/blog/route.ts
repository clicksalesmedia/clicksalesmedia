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
    const published = searchParams.get('published') === 'true';
    const format = searchParams.get('format'); // 'array' or 'paginated'
    
    console.log('Query params:', { limit, page, category, featured, published, format });
    
    const skip = (page - 1) * limit;
    
    const where = {
      ...(published && { published: true }),
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
    
    // For backward compatibility, return array format by default for published=true requests
    if (published && format !== 'paginated') {
      const response = NextResponse.json(posts);
      return setCorsHeaders(response);
    }
    
    // Return paginated format for dashboard and explicit requests
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

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Find or use admin user as author
    let authorId = data.authorId;
    if (!authorId) {
      // Try to find admin user
      const adminUser = await prisma.user.findFirst({
        where: {
          OR: [
            { email: 'admin@clicksalesmedia.com' },
            { role: 'ADMIN' }
          ]
        }
      });
      
      if (adminUser) {
        authorId = adminUser.id;
      } else {
        throw new Error('No admin user found');
      }
    }
    
    const blogPost = await prisma.blogPost.create({
      data: {
        title: data.title,
        titleAr: data.titleAr || null,
        slug: data.slug,
        content: data.content,
        contentAr: data.contentAr || null,
        excerpt: data.excerpt || null,
        excerptAr: data.excerptAr || null,
        coverImage: data.coverImage || null,
        published: data.published || false,
        authorId: authorId,
        categories: {
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
    });
    
    const response = NextResponse.json(blogPost, { status: 201 });
    return setCorsHeaders(response);
  } catch (error) {
    console.error('Error creating blog post:', error);
    
    const errorResponse = NextResponse.json(
      { error: 'Failed to create blog post' },
      { status: 500 }
    );
    
    return setCorsHeaders(errorResponse);
  }
} 