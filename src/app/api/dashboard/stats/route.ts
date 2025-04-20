import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';
import { prisma } from '@/app/lib/prisma';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { error: 'You must be signed in to access this endpoint' },
      { status: 401 }
    );
  }

  try {
    const [blogPostsCount, caseStudiesCount, contactsCount, usersCount] = await Promise.all([
      prisma.blogPost.count(),
      prisma.caseStudy.count(),
      prisma.contact.count(),
      prisma.user.count(),
    ]);

    return NextResponse.json({
      blogPosts: blogPostsCount,
      caseStudies: caseStudiesCount,
      contacts: contactsCount,
      users: usersCount,
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json(
      { error: 'An error occurred while fetching the dashboard stats' },
      { status: 500 }
    );
  }
} 