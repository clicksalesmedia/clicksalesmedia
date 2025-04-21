import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';
import { prisma } from '@/app/lib/prisma';
import { slugify } from '@/app/lib/utils';

// GET a single portfolio item
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const item = await prisma.portfolio.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });

    if (!item) {
      return NextResponse.json(
        { error: 'Portfolio item not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(item);
  } catch (error) {
    console.error('Error fetching portfolio item:', error);
    return NextResponse.json(
      { error: 'Failed to fetch portfolio item' },
      { status: 500 }
    );
  }
}

// PATCH to update a portfolio item
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();
  const {
    title,
    clientName,
    description,
    coverImage,
    gallery,
    projectType,
    results,
    metrics,
    techStack,
    url,
    published,
    featured,
  } = body;

  // Generate a new slug if title has changed
  let slug = undefined;
  if (title) {
    slug = slugify(title);
  }

  try {
    // First check if the portfolio item exists
    const existingItem = await prisma.portfolio.findUnique({
      where: { id },
      include: {
        author: {
          select: { email: true }
        }
      }
    });

    if (!existingItem) {
      return NextResponse.json(
        { error: 'Portfolio item not found' },
        { status: 404 }
      );
    }

    // Check if user is the author or has appropriate role
    const userEmail = session.user.email as string;
    const userIsAuthor = existingItem.author.email === userEmail;
    const userIsAdmin = session.user.role === 'ADMIN';

    if (!userIsAuthor && !userIsAdmin) {
      return NextResponse.json(
        { error: 'You do not have permission to update this item' },
        { status: 403 }
      );
    }

    // If slug is being updated, check if it already exists
    if (slug && slug !== existingItem.slug) {
      const slugExists = await prisma.portfolio.findUnique({
        where: { slug },
      });

      if (slugExists) {
        return NextResponse.json(
          { error: 'A portfolio item with this title already exists' },
          { status: 400 }
        );
      }
    }

    // Update the portfolio item
    const updatedItem = await prisma.portfolio.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(slug && { slug }),
        ...(clientName && { clientName }),
        ...(description && { description }),
        ...(coverImage && { coverImage }),
        ...(gallery && { gallery }),
        ...(projectType && { projectType }),
        ...(results !== undefined && { results }),
        ...(metrics !== undefined && { metrics }),
        ...(techStack && { techStack }),
        ...(url !== undefined && { url }),
        ...(published !== undefined && { published }),
        ...(featured !== undefined && { featured }),
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(updatedItem);
  } catch (error) {
    console.error('Error updating portfolio item:', error);
    return NextResponse.json(
      { error: 'Failed to update portfolio item' },
      { status: 500 }
    );
  }
}

// DELETE a portfolio item
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  try {
    // First check if the portfolio item exists
    const existingItem = await prisma.portfolio.findUnique({
      where: { id },
      include: {
        author: {
          select: { email: true }
        }
      }
    });

    if (!existingItem) {
      return NextResponse.json(
        { error: 'Portfolio item not found' },
        { status: 404 }
      );
    }

    // Check if user is the author or has appropriate role
    const userEmail = session.user.email as string;
    const userIsAuthor = existingItem.author.email === userEmail;
    const userIsAdmin = session.user.role === 'ADMIN';

    if (!userIsAuthor && !userIsAdmin) {
      return NextResponse.json(
        { error: 'You do not have permission to delete this item' },
        { status: 403 }
      );
    }

    // Delete the portfolio item
    await prisma.portfolio.delete({
      where: { id },
    });

    return NextResponse.json({ 
      message: 'Portfolio item deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting portfolio item:', error);
    return NextResponse.json(
      { error: 'Failed to delete portfolio item' },
      { status: 500 }
    );
  }
} 