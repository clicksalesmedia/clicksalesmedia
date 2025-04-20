import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';
import { prisma } from '@/app/lib/prisma';
import { slugify } from '@/app/lib/utils';

// GET all blog posts
export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const searchParams = request.nextUrl.searchParams;
  const published = searchParams.get('published');
  const limit = searchParams.get('limit');
  const language = searchParams.get('language');
  
  console.log('Blog API - Fetching with params:', { 
    published, 
    limit, 
    language,
    isAuthenticated: !!session?.user?.email
  });
  
  try {
    const whereClause = {
      // If we're in the dashboard, show all posts of the current user
      // If we're in the public view, show only published posts
      ...(session?.user?.email
        ? { author: { email: session.user.email } }
        : { published: true }),
      ...(published === 'true' ? { published: true } : {}),
      ...(published === 'false' ? { published: false } : {}),
    };
    
    console.log('Blog API - Using where clause:', JSON.stringify(whereClause));
    
    // First check if the database has titleAr field
    const dbInfo = await prisma.$queryRaw`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'BlogPost'
    `;
    
    const columns = Array.isArray(dbInfo) ? dbInfo.map((col: any) => col.column_name?.toLowerCase()) : [];
    const hasMultilingualFields = columns.includes('titlear');
    
    console.log('Database has multilingual fields:', hasMultilingualFields);
    
    // If the database doesn't have titleAr field, don't try to select it
    const posts = await prisma.blogPost.findMany({
      where: whereClause,
      orderBy: {
        createdAt: 'desc',
      },
      ...(limit ? { take: parseInt(limit, 10) } : {}),
      include: {
        categories: true,
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
      // Use select if available to handle possibly missing fields
      ...(hasMultilingualFields ? {} : {
        select: {
          id: true,
          title: true,
          slug: true,
          content: true,
          excerpt: true,
          coverImage: true,
          published: true,
          createdAt: true,
          updatedAt: true,
          authorId: true,
          categories: {
            select: {
              id: true,
              name: true,
              slug: true,
            }
          },
          author: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
            }
          }
        }
      })
    });
    
    // Add empty multilingual fields if they don't exist
    const processedPosts = posts.map(post => ({
      ...post,
      titleAr: post.titleAr || "",
      contentAr: post.contentAr || "",
      excerptAr: post.excerptAr || ""
    }));
    
    console.log(`Blog API - Found ${processedPosts.length} posts`);
    
    return NextResponse.json(processedPosts);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    
    // Fallback if the above method fails - try with minimal fields
    try {
      console.log('Attempting fallback query with minimal fields');
      const posts = await prisma.blogPost.findMany({
        select: {
          id: true,
          title: true,
          slug: true,
          content: true,
          excerpt: true,
          coverImage: true,
          published: true,
          createdAt: true,
          updatedAt: true,
          authorId: true,
          categories: {
            select: {
              id: true,
              name: true,
              slug: true
            }
          },
          author: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      });
      
      // Add empty multilingual fields
      const processedPosts = posts.map(post => ({
        ...post,
        titleAr: "",
        contentAr: "",
        excerptAr: ""
      }));
      
      console.log(`Blog API Fallback - Found ${processedPosts.length} posts`);
      return NextResponse.json(processedPosts);
    } catch (fallbackError) {
      console.error('Fallback query also failed:', fallbackError);
      return NextResponse.json(
        { error: 'Failed to fetch blog posts' },
        { status: 500 }
      );
    }
  }
}

// POST to create a new blog post
export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const {
      title,
      titleAr,
      slug,
      content,
      contentAr,
      excerpt,
      excerptAr,
      coverImage,
      published,
      categories,
    } = await request.json();

    // Find the user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email as string },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Check if slug already exists
    const existingPost = await prisma.blogPost.findUnique({
      where: { slug },
    });

    if (existingPost) {
      return NextResponse.json(
        { error: 'A blog post with this slug already exists' },
        { status: 400 }
      );
    }
    
    // First check if the database has titleAr field
    const dbInfo = await prisma.$queryRaw`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'BlogPost'
    `;
    
    const columns = Array.isArray(dbInfo) ? dbInfo.map((col: any) => col.column_name?.toLowerCase()) : [];
    const hasMultilingualFields = columns.includes('titlear');
    
    // Create post with only fields that exist in the database
    const createData: any = {
      title,
      slug,
      content,
      excerpt,
      coverImage: coverImage || '', // Ensure coverImage is always included, even if empty
      published: published || false,
      author: {
        connect: { id: user.id },
      },
    };
    
    console.log('Creating blog post with data:', JSON.stringify({
      ...createData,
      content: createData.content?.substring(0, 50) + '...', // Truncate content for logging
      coverImage: createData.coverImage // Specifically log the coverImage being saved
    }));
    
    // Only include multilingual fields if they exist in the database
    if (hasMultilingualFields) {
      createData.titleAr = titleAr || "";
      createData.contentAr = contentAr || "";
      createData.excerptAr = excerptAr || "";
    }
    
    // Handle categories
    if (categories && Array.isArray(categories) && categories.length > 0) {
      createData.categories = {
        connectOrCreate: categories.map((name: string) => ({
          where: { name },
          create: {
            name,
            slug: slugify(name),
          },
        })),
      };
    }

    const post = await prisma.blogPost.create({
      data: createData,
      include: {
        categories: true,
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
    });
    
    // Add empty multilingual fields if they don't exist in the database
    const processedPost = {
      ...post,
      titleAr: post.titleAr || "",
      contentAr: post.contentAr || "",
      excerptAr: post.excerptAr || ""
    };

    return NextResponse.json(processedPost, { status: 201 });
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json(
      { error: 'Failed to create blog post', details: (error as Error).message },
      { status: 500 }
    );
  }
} 