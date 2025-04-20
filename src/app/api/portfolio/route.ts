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
    const portfolioItems = await prisma.portfolio.findMany({
      where: {
        ...(published === 'true' ? { published: true } : {}),
        ...(featured === 'true' ? { featured: true } : {}),
        ...(projectType ? { projectType: projectType as any } : {}),
      },
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

    return NextResponse.json(portfolioItems);
  } catch (error) {
    console.error('Error fetching portfolio items:', error);
    return NextResponse.json(
      { error: 'Failed to fetch portfolio items' },
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