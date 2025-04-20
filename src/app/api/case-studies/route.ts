import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';
import { prisma } from '@/app/lib/prisma';

export async function GET() {
  try {
    const caseStudies = await prisma.caseStudy.findMany({
      select: {
        id: true,
        title: true,
        slug: true,
        clientName: true,
        published: true,
        createdAt: true,
        author: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(caseStudies);
  } catch (error) {
    console.error('Error fetching case studies:', error);
    return NextResponse.json(
      { error: 'An error occurred while fetching the case studies' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { error: 'You must be signed in to create a case study' },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const { 
      title, 
      slug, 
      clientName, 
      description, 
      challenge, 
      solution, 
      results, 
      coverImage,
      gallery,
      services,
      published 
    } = body;

    const caseStudy = await prisma.caseStudy.create({
      data: {
        title,
        slug,
        clientName,
        description,
        challenge,
        solution,
        results,
        coverImage,
        gallery: gallery || [],
        services: services || [],
        published: published || false,
        author: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });

    return NextResponse.json(caseStudy);
  } catch (error) {
    console.error('Error creating case study:', error);
    return NextResponse.json(
      { error: 'An error occurred while creating the case study' },
      { status: 500 }
    );
  }
} 