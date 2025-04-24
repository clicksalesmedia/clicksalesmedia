import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../lib/auth';
import { prisma } from '../../lib/prisma';
import { headers } from 'next/headers';

// Set CORS headers
async function setCorsHeaders(res: NextResponse): Promise<NextResponse> {
  const headersList = await headers();
  const origin = headersList.get('origin') ?? '*';
  
  res.headers.set('Access-Control-Allow-Origin', origin);
  res.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return res;
}

// Handle preflight requests
export async function OPTIONS() {
  const res = new NextResponse(null, { status: 204 });
  return setCorsHeaders(res);
}

export async function GET() {
  try {
    // Check session
    const session = await getServerSession(authOptions);
    
    // Count users to test database connection
    const userCount = await prisma.user.count();
    
    const response = NextResponse.json({
      session: session ? {
        user: session.user,
        expires: session.expires
      } : null,
      databaseConnected: true,
      userCount,
      env: {
        nextAuthUrl: process.env.NEXTAUTH_URL,
        hasSecret: !!process.env.NEXTAUTH_SECRET,
        nodeEnv: process.env.NODE_ENV
      }
    });
    
    return setCorsHeaders(response);
  } catch (error: any) {
    console.error('Error in auth test route:', error);
    
    const errorResponse = NextResponse.json({
      error: 'Auth test failed',
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 500 });
    
    return setCorsHeaders(errorResponse);
  }
} 