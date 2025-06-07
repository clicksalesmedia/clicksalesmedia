import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET - Fetch single logo by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const logo = await prisma.logo.findUnique({
      where: { id }
    });

    if (!logo) {
      return NextResponse.json(
        { error: 'Logo not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(logo);
  } catch (error) {
    console.error('Error fetching logo:', error);
    return NextResponse.json(
      { error: 'Failed to fetch logo' },
      { status: 500 }
    );
  }
}

// PUT - Update logo by ID
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, imageUrl, altText, link, active, sortOrder } = body;

    // Check if logo exists
    const existingLogo = await prisma.logo.findUnique({
      where: { id }
    });

    if (!existingLogo) {
      return NextResponse.json(
        { error: 'Logo not found' },
        { status: 404 }
      );
    }

    // Update logo
    const updatedLogo = await prisma.logo.update({
      where: { id },
      data: {
        ...(name !== undefined && { name }),
        ...(imageUrl !== undefined && { imageUrl }),
        ...(altText !== undefined && { altText }),
        ...(link !== undefined && { link }),
        ...(active !== undefined && { active }),
        ...(sortOrder !== undefined && { sortOrder })
      }
    });

    return NextResponse.json(updatedLogo);
  } catch (error) {
    console.error('Error updating logo:', error);
    return NextResponse.json(
      { error: 'Failed to update logo' },
      { status: 500 }
    );
  }
}

// DELETE - Delete logo by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Check if logo exists
    const existingLogo = await prisma.logo.findUnique({
      where: { id }
    });

    if (!existingLogo) {
      return NextResponse.json(
        { error: 'Logo not found' },
        { status: 404 }
      );
    }

    // Delete logo
    await prisma.logo.delete({
      where: { id }
    });

    return NextResponse.json(
      { message: 'Logo deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting logo:', error);
    return NextResponse.json(
      { error: 'Failed to delete logo' },
      { status: 500 }
    );
  }
} 