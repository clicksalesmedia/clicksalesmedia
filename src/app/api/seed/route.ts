import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import { hashPassword } from '@/app/lib/utils';

// This route is for development purposes only
// It creates an admin user if none exists
export async function GET(request: NextRequest) {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json(
      { error: 'This endpoint is not available in production' },
      { status: 403 }
    );
  }

  // Check if API key is provided
  const apiKey = request.nextUrl.searchParams.get('key');
  if (!apiKey || apiKey !== 'development_seed_key') {
    return NextResponse.json(
      { error: 'Invalid API key' },
      { status: 403 }
    );
  }

  try {
    // Check if admin user already exists
    const adminExists = await prisma.user.findFirst({
      where: { role: 'ADMIN' },
    });

    if (adminExists) {
      return NextResponse.json({ message: 'Admin user already exists' });
    }

    // Create admin user
    const hashedPassword = await hashPassword('admin123');
    
    const admin = await prisma.user.create({
      data: {
        name: 'Administrator',
        email: 'admin@clicksalesmedia.com',
        password: hashedPassword,
        role: 'ADMIN',
      },
    });

    // Return success without password
    const { password: _, ...adminWithoutPassword } = admin;
    
    return NextResponse.json({ 
      message: 'Admin user created successfully', 
      user: adminWithoutPassword 
    });
  } catch (error) {
    console.error('Error seeding database:', error);
    return NextResponse.json(
      { error: 'An error occurred while seeding the database' },
      { status: 500 }
    );
  }
} 