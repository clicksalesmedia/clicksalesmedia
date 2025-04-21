import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';
import { prisma } from '@/app/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const caseStudy = await prisma.caseStudy.findUnique({
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

    if (!caseStudy) {
      return NextResponse.json(
        { error: 'Case study not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(caseStudy);
  } catch (error) {
    console.error('Error fetching case study:', error);
    return NextResponse.json(
      { error: 'An error occurred while fetching the case study' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { error: 'You must be signed in to update a case study' },
      { status: 401 }
    );
  }

  const { id } = await params;
  const body = await request.json();

  try {
    // Check if the user is the author or an admin
    const caseStudy = await prisma.caseStudy.findUnique({
      where: { id },
      select: {
        authorId: true,
      },
    });

    if (!caseStudy) {
      return NextResponse.json(
        { error: 'Case study not found' },
        { status: 404 }
      );
    }

    if (caseStudy.authorId !== session.user.id && session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'You do not have permission to update this case study' },
        { status: 403 }
      );
    }

    // Update the case study
    const updatedCaseStudy = await prisma.caseStudy.update({
      where: { id },
      data: body,
    });

    return NextResponse.json(updatedCaseStudy);
  } catch (error) {
    console.error('Error updating case study:', error);
    return NextResponse.json(
      { error: 'An error occurred while updating the case study' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { error: 'You must be signed in to delete a case study' },
      { status: 401 }
    );
  }

  const { id } = await params;

  try {
    // Check if the user is the author or an admin
    const caseStudy = await prisma.caseStudy.findUnique({
      where: { id },
      select: {
        authorId: true,
      },
    });

    if (!caseStudy) {
      return NextResponse.json(
        { error: 'Case study not found' },
        { status: 404 }
      );
    }

    if (caseStudy.authorId !== session.user.id && session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'You do not have permission to delete this case study' },
        { status: 403 }
      );
    }

    // Delete the case study
    await prisma.caseStudy.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting case study:', error);
    return NextResponse.json(
      { error: 'An error occurred while deleting the case study' },
      { status: 500 }
    );
  }
} 