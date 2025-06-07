import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET - Fetch all active logos
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const includeInactive = searchParams.get('includeInactive') === 'true';

    const logos = await prisma.logo.findMany({
      where: includeInactive ? {} : { active: true },
      orderBy: [
        { sortOrder: 'asc' },
        { createdAt: 'asc' }
      ]
    });

    return NextResponse.json(logos);
  } catch (error) {
    console.error('Error fetching logos:', error);
    return NextResponse.json(
      { error: 'Failed to fetch logos' },
      { status: 500 }
    );
  }
}

// POST - Create a new logo
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, imageUrl, altText, link, active, sortOrder } = body;

    // Validate required fields
    if (!name || !imageUrl) {
      return NextResponse.json(
        { error: 'Name and imageUrl are required' },
        { status: 400 }
      );
    }

    const logo = await prisma.logo.create({
      data: {
        name,
        imageUrl,
        altText: altText || '',
        link: link || '',
        active: active !== undefined ? active : true,
        sortOrder: sortOrder || 0
      }
    });

    return NextResponse.json(logo, { status: 201 });
  } catch (error) {
    console.error('Error creating logo:', error);
    return NextResponse.json(
      { error: 'Failed to create logo' },
      { status: 500 }
    );
  }
} 