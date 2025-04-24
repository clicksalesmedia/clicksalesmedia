import { NextResponse } from 'next/server';
import { prisma } from '../../lib/prisma';
import { headers } from 'next/headers';
import { PortfolioType } from '@prisma/client';

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
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit') || '') : undefined;
    const featured = searchParams.get('featured') === 'true' ? true : null;
    
    // Handle projectType with proper enum typing
    const projectTypeParam = searchParams.get('projectType');
    let projectType: PortfolioType | null = null;
    
    if (projectTypeParam) {
      // Validate that projectType is a valid enum value
      const validTypes = ['WEBSITE', 'SEO', 'PPC', 'SOCIAL_MEDIA', 'EMAIL_MARKETING', 'CONTENT_MARKETING', 'BRANDING', 'OTHER'];
      if (validTypes.includes(projectTypeParam)) {
        projectType = projectTypeParam as PortfolioType;
      }
    }
    
    console.log('Fetching portfolio items with filters:', { published: 'true', featured, projectType, limit });
    
    const where = {
      published: true,
      ...(featured !== null && { featured }),
      ...(projectType && { projectType })
    };
    
    console.log('Portfolio query where clause:', where);
    
    // Check if table exists first
    try {
      const tableExists = await prisma.$queryRaw<Array<{exists: boolean}>>`
        SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE table_schema = 'public'
          AND table_name = 'Portfolio'
        );
      `;
      
      console.log('Portfolio table exists check:', tableExists);
      
      if (tableExists[0] && !tableExists[0].exists) {
        return setCorsHeaders(NextResponse.json({ items: [], total: 0 }, { status: 200 }));
      }
    } catch (checkError) {
      console.error('Error checking if Portfolio table exists:', checkError);
    }
    
    // Try counting to validate access
    try {
      const count = await prisma.$queryRaw`SELECT COUNT(*) FROM "Portfolio" WHERE "published" = true`;
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
    }).catch((error: any) => {
      console.error('Error in portfolio findMany:', error);
      return [];
    });
    
    const total = await prisma.portfolio.count({ where }).catch(() => 0);
    
    console.log(`Found ${portfolioItems.length} portfolio items`);
    
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
} 