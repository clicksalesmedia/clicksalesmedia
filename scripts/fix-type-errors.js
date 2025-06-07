const fs = require('fs');

// Fix blog API route
const blogApiPath = '/var/www/clicksalesmediaAI/src/app/api/blog/route.ts';
const blogApiContent = `import { NextResponse } from 'next/server';
import { prisma } from '../../lib/prisma';
import { headers } from 'next/headers';

// Set CORS headers to avoid cross-origin issues
function setCorsHeaders(res: NextResponse): NextResponse {
  const headersList = headers();
  const origin = headersList.get('origin') || '*';
  
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
    
    console.log(\`Found \${posts.length} posts out of \${total} total\`);
    
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
}`;

// Fix portfolio API route
const portfolioApiPath = '/var/www/clicksalesmediaAI/src/app/api/portfolio/route.ts';
const portfolioApiContent = `import { NextResponse } from 'next/server';
import { prisma } from '../../lib/prisma';
import { headers } from 'next/headers';

// Set CORS headers to avoid cross-origin issues
function setCorsHeaders(res: NextResponse): NextResponse {
  const headersList = headers();
  const origin = headersList.get('origin') || '*';
  
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
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit') || '') : undefined;
    const featured = searchParams.get('featured') === 'true' ? true : null;
    const projectType = searchParams.get('projectType') || null;
    
    console.log('Fetching portfolio items with filters:', { published: 'true', featured, projectType, limit });
    
    const where = {
      published: true,
      ...(featured !== null && { featured }),
      ...(projectType && { projectType })
    };
    
    console.log('Portfolio query where clause:', where);
    
    // Check if table exists first
    try {
      const tableExists = await prisma.$queryRaw\`
        SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE table_schema = 'public'
          AND table_name = 'Portfolio'
        );
      \`;
      
      console.log('Portfolio table exists check:', tableExists);
      
      if (!tableExists[0].exists) {
        return setCorsHeaders(NextResponse.json({ items: [], total: 0 }, { status: 200 }));
      }
    } catch (checkError) {
      console.error('Error checking if Portfolio table exists:', checkError);
    }
    
    // Try counting to validate access
    try {
      const count = await prisma.$queryRaw\`SELECT COUNT(*) FROM "Portfolio" WHERE "published" = true\`;
      console.log('Count result:', count);
    } catch (countError) {
      console.error('Error counting portfolio (lowercase) items directly:', countError);
    }
    
    const portfolioItems = await prisma.portfolio.findMany({
      where,
      orderBy: { 
        createdAt: 'desc' 
      },
      take: limit,
      include: {
        author: {
          select: {
            name: true
          }
        }
      }
    }).catch(error => {
      console.error('Error in portfolio findMany:', error);
      return [];
    });
    
    const total = await prisma.portfolio.count({ where }).catch(() => 0);
    
    console.log(\`Found \${portfolioItems.length} portfolio items\`);
    
    const response = NextResponse.json({
      items: portfolioItems,
      total
    });
    
    return setCorsHeaders(response);
  } catch (error: any) {
    console.error('Error fetching portfolio items:', error);
    
    const errorResponse = NextResponse.json(
      { error: 'Failed to fetch portfolio items', details: error.message },
      { status: 500 }
    );
    
    return setCorsHeaders(errorResponse);
  }
}`;

// Fix auth test API route
const authTestApiPath = '/var/www/clicksalesmediaAI/src/app/api/auth-test/route.ts';
const authTestApiContent = `import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../lib/auth';
import { prisma } from '../../lib/prisma';
import { headers } from 'next/headers';

// Set CORS headers
function setCorsHeaders(res: NextResponse): NextResponse {
  const headersList = headers();
  const origin = headersList.get('origin') || '*';
  
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

export async function GET() {
  try {
    // Check session
    const session = await getServerSession(authOptions);
    
    // Count users to test database connection
    const userCount = await prisma.user.count();
    
    const response = NextResponse.json({
      session: session ? {
        user: session.user,
        expires: session.expires
      } : null,
      databaseConnected: true,
      userCount,
      env: {
        nextAuthUrl: process.env.NEXTAUTH_URL,
        hasSecret: !!process.env.NEXTAUTH_SECRET,
        nodeEnv: process.env.NODE_ENV
      }
    });
    
    return setCorsHeaders(response);
  } catch (error: any) {
    console.error('Error in auth test route:', error);
    
    const errorResponse = NextResponse.json({
      error: 'Auth test failed',
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 500 });
    
    return setCorsHeaders(errorResponse);
  }
}`;

// Write the updated files
console.log(`Updating blog API route: ${blogApiPath}`);
fs.writeFileSync(blogApiPath, blogApiContent);

console.log(`Updating portfolio API route: ${portfolioApiPath}`);
fs.writeFileSync(portfolioApiPath, portfolioApiContent);

console.log(`Updating auth test API route: ${authTestApiPath}`);
fs.writeFileSync(authTestApiPath, authTestApiContent);

console.log('API routes updated successfully with type fixes'); 