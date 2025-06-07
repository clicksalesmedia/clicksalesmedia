const fs = require('fs');
const path = require('path');

// Fix the blog API route
const blogRoutePath = '/var/www/clicksalesmediaAI/src/app/api/blog/route.ts';
const blogRouteContent = `import { NextResponse } from 'next/server';
import { prisma } from '../../lib/prisma';
import { headers } from 'next/headers';

// Set CORS headers to avoid cross-origin issues
function setCorsHeaders(res) {
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

export async function GET(request) {
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

// Fix the portfolio API route
const portfolioRoutePath = '/var/www/clicksalesmediaAI/src/app/api/portfolio/route.ts';
const portfolioRouteContent = `import { NextResponse } from 'next/server';
import { prisma } from '../../lib/prisma';
import { headers } from 'next/headers';

// Set CORS headers to avoid cross-origin issues
function setCorsHeaders(res) {
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

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')) : undefined;
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
  } catch (error) {
    console.error('Error fetching portfolio items:', error);
    
    const errorResponse = NextResponse.json(
      { error: 'Failed to fetch portfolio items', details: error.message },
      { status: 500 }
    );
    
    return setCorsHeaders(errorResponse);
  }
}`;

// Write the updated files
console.log(`Updating API route: ${blogRoutePath}`);
fs.writeFileSync(blogRoutePath, blogRouteContent);

console.log(`Updating API route: ${portfolioRoutePath}`);
fs.writeFileSync(portfolioRoutePath, portfolioRouteContent);

console.log('API routes updated successfully'); 