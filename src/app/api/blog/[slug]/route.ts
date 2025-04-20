import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';

// Check if multilingual fields exist in database
async function hasMultilingualFields() {
  const dbInfo = await prisma.$queryRaw`
    SELECT column_name 
    FROM information_schema.columns 
    WHERE table_name = 'BlogPost'
  `;
  
  const columns = Array.isArray(dbInfo) ? dbInfo.map((col: any) => col.column_name?.toLowerCase()) : [];
  return columns.includes('titlear');
}

// GET a single blog post by slug
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;
  
  // Log the incoming slug for debugging
  console.log('Fetching blog post with slug:', slug);

  try {
    // First check if the database has multilingual fields
    const multilingualSupport = await hasMultilingualFields();
    console.log('Database has multilingual fields:', multilingualSupport);
    
    // Try to find post by ID first (backward compatibility)
    let post: any = null;
    
    try {
      post = await prisma.blogPost.findUnique({
        where: { id: slug },
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
    } catch (error) {
      console.log('Not found by ID, trying slug');
    }
    
    // If not found by ID, try by slug
    if (!post) {
      post = await prisma.blogPost.findUnique({
        where: { slug },
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
    }

    if (!post) {
      console.log('Post not found for slug:', slug);
      
      // Try a different approach with findFirst and case insensitive search
      post = await prisma.blogPost.findFirst({
        where: { 
          slug: { 
            equals: slug,
            mode: 'insensitive' // Case insensitive search
          } 
        },
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
      
      if (!post) {
        return NextResponse.json(
          { error: 'Blog post not found' },
          { status: 404 }
        );
      }
    }
    
    // Log the post details for debugging
    console.log(`Found blog post: "${post.title}", cover image: "${post.coverImage}"`);

    // Add empty multilingual fields if they don't exist
    const processedPost = {
      ...post,
      titleAr: post.titleAr || "",
      contentAr: post.contentAr || "",
      excerptAr: post.excerptAr || "",
      // Ensure coverImage has the correct format
      coverImage: post.coverImage ? post.coverImage : '',
    };

    return NextResponse.json(processedPost);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog post', details: (error as Error).message },
      { status: 500 }
    );
  }
}

// PATCH to update an existing blog post
export async function PATCH(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { slug } = params;
  let postId;
  
  try {
    // Check for multilingual support
    const multilingualSupport = await hasMultilingualFields();
    
    // First determine if the input is an ID or a slug
    let existingPost: any = null;
    
    try {
      existingPost = await prisma.blogPost.findUnique({
        where: { id: slug },
        include: { categories: true },
      });
    } catch (error) {
      console.log('Not an ID, trying as slug');
    }
    
    if (!existingPost) {
      existingPost = await prisma.blogPost.findUnique({
        where: { slug },
        include: { categories: true },
      });
    }
    
    if (!existingPost) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }
    
    // Save the ID for later use
    postId = existingPost.id;

    // Extract data from request
    const {
      title,
      titleAr,
      slug: newSlug,
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

    // Check if slug already exists on a different post
    if (newSlug !== existingPost.slug) {
      const slugExists = await prisma.blogPost.findFirst({
        where: {
          slug: newSlug,
          id: { not: existingPost.id }, // Exclude current post
        },
      });

      if (slugExists) {
        return NextResponse.json(
          { error: 'A blog post with this slug already exists' },
          { status: 400 }
        );
      }
    }

    // Disconnect all existing categories
    await prisma.blogPost.update({
      where: { id: postId },
      data: {
        categories: {
          disconnect: existingPost.categories.map((cat: {id: string}) => ({ id: cat.id })),
        },
      },
    });

    // Connect or create new categories
    const categoryConnections = await Promise.all(
      categories.map(async (name: string) => {
        const existingCategory = await prisma.category.findFirst({
          where: { name },
        });

        if (existingCategory) {
          return { id: existingCategory.id };
        } else {
          const newCategory = await prisma.category.create({
            data: {
              name,
              slug: name.toLowerCase().replace(/\s+/g, '-'),
            },
          });
          return { id: newCategory.id };
        }
      })
    );

    // Create update data with only fields that exist in the database
    const updateData: any = {
      title,
      slug: newSlug,
      content,
      excerpt,
      coverImage: coverImage || '', // Always include the coverImage field, even if empty
      published: published || false,
      categories: {
        connect: categoryConnections,
      },
    };
    
    console.log('Updating blog post with data:', {
      ...updateData,
      content: updateData.content?.substring(0, 50) + '...', // Truncate content for logging
      coverImage: updateData.coverImage // Log the coverImage being saved
    });
    
    // Only include multilingual fields if they exist in the database
    if (multilingualSupport) {
      updateData.titleAr = titleAr || "";
      updateData.contentAr = contentAr || "";
      updateData.excerptAr = excerptAr || "";
    }

    // Update the post with all data including categories
    const post = await prisma.blogPost.update({
      where: { id: postId },
      data: updateData,
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

    // Add empty multilingual fields if they don't exist
    const processedPost = {
      ...post,
      titleAr: post.titleAr || "",
      contentAr: post.contentAr || "",
      excerptAr: post.excerptAr || ""
    };

    return NextResponse.json(processedPost);
  } catch (error) {
    console.error('Error updating blog post:', error);
    return NextResponse.json(
      { error: 'Failed to update blog post', details: (error as Error).message },
      { status: 500 }
    );
  }
}

// DELETE a blog post
export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { slug } = params;
  let postId;

  try {
    // Try to find by ID first
    let post = null;
    
    try {
      post = await prisma.blogPost.findUnique({
        where: { id: slug },
      });
    } catch (error) {
      console.log('Not an ID, trying as slug');
    }
    
    // If not found by ID, try finding by slug
    if (!post) {
      post = await prisma.blogPost.findUnique({
        where: { slug },
      });
    }

    if (!post) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }
    
    postId = post.id;

    // Delete the post
    await prisma.blogPost.delete({
      where: { id: postId },
    });

    return NextResponse.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json(
      { error: 'Failed to delete blog post', details: (error as Error).message },
      { status: 500 }
    );
  }
} 