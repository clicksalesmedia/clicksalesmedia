import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';
import { prisma } from '@/app/lib/prisma';
import { slugify } from '@/app/lib/utils';

// GET all portfolio items
export async function GET(request: Request) {
  const url = new URL(request.url);
  const published = url.searchParams.get('published');
  const featured = url.searchParams.get('featured');
  const projectType = url.searchParams.get('type');
  const limit = url.searchParams.get('limit');

  try {
    console.log('Fetching portfolio items with filters:', { published, featured, projectType, limit });
    
    // Build the where clause
    const where: any = {};
    
    if (published === 'true') {
      where.published = true;
    }
    
    if (featured === 'true') {
      where.featured = true;
    }
    
    if (projectType) {
      where.projectType = projectType;
    }
    
    console.log('Portfolio query where clause:', where);
    
    // First check if Portfolio table exists
    try {
      const tableExists = await prisma.$queryRaw`
        SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE table_schema = 'public' AND 
                table_name = 'Portfolio' OR 
                table_name = 'portfolio'
        ) as exists
      `;
      console.log('Portfolio table exists check:', tableExists);
      
      // Try to get a count of portfolio items directly
      try {
        const count = await prisma.$queryRaw`
          SELECT COUNT(*) FROM "Portfolio"
        `;
        console.log('Direct Portfolio count query:', count);
      } catch (countErr) {
        console.error('Error counting Portfolio items directly:', countErr);
        
        // Try with lowercase table name
        try {
          const countLower = await prisma.$queryRaw`
            SELECT COUNT(*) FROM "portfolio"
          `;
          console.log('Direct portfolio (lowercase) count query:', countLower);
        } catch (lowerErr) {
          console.error('Error counting portfolio (lowercase) items directly:', lowerErr);
        }
      }
    } catch (err) {
      console.error('Error checking if Portfolio table exists:', err);
    }
    
    try {
      // Query the portfolio items with simplified approach
      const portfolioItems = await prisma.portfolio.findMany({
        where,
        orderBy: {
          createdAt: 'desc',
        },
        ...(limit ? { take: parseInt(limit, 10) } : {}),
        include: {
          author: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });
      
      console.log('Successfully fetched portfolio items, count:', portfolioItems.length);
      return NextResponse.json(portfolioItems);
    } catch (queryError) {
      console.error('Error in portfolio findMany:', queryError);
      return NextResponse.json(
        { 
          error: 'Database query failed',
          details: (queryError as Error).message
        },
        { status: 500 }
      );
    }
    
  } catch (error) {
    console.error('Error in portfolio GET route:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch portfolio items',
        details: (error as Error).message
      },
      { status: 500 }
    );
  }
}

// POST to create a new portfolio item
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const {
      title,
      titleAr,
      clientName,
      clientNameAr,
      description,
      descriptionAr,
      coverImage,
      gallery,
      projectType,
      results,
      resultsAr,
      metrics,
      techStack,
      url,
      published,
      featured,
    } = body;

    // Generate a slug from the title
    const slug = slugify(title);

    // Find the user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email as string },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Check if slug already exists
    const existingItem = await prisma.portfolio.findUnique({
      where: { slug },
    });

    if (existingItem) {
      return NextResponse.json(
        { error: 'A portfolio item with this title already exists' },
        { status: 400 }
      );
    }

    const portfolioItem = await prisma.portfolio.create({
      data: {
        title,
        titleAr: titleAr || null,
        slug,
        clientName,
        clientNameAr: clientNameAr || null,
        description,
        descriptionAr: descriptionAr || null,
        coverImage,
        gallery: gallery || [],
        projectType,
        results: results || null,
        resultsAr: resultsAr || null,
        metrics: metrics || null,
        techStack: techStack || [],
        url: url || null,
        published: published || false,
        featured: featured || false,
        author: {
          connect: { id: user.id },
        },
      },
    });

    return NextResponse.json(portfolioItem, { status: 201 });
  } catch (error) {
    console.error('Error creating portfolio item:', error);
    return NextResponse.json(
      { error: 'Failed to create portfolio item' },
      { status: 500 }
    );
  }
} 