import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Received test lead data:', body);
    
    // Just return success for testing
    return NextResponse.json({
      success: true,
      received: body
    });
  } catch (error) {
    console.error('Error in test endpoint:', error);
    return NextResponse.json(
      { error: 'Test endpoint error' }, 
      { status: 500 }
    );
  }
} 