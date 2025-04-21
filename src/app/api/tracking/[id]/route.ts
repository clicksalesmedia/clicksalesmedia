import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/app/lib/prisma';
import { authOptions } from '@/app/lib/auth';

// GET /api/tracking/[id] - Get a single tracking script
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    // Fetch the tracking script
    const script = await prisma.trackingScript.findUnique({
      where: { id },
    });

    if (!script) {
      return NextResponse.json(
        { error: 'Tracking script not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(script);
  } catch (error) {
    console.error('Error fetching tracking script:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tracking script' },
      { status: 500 }
    );
  }
}

// PATCH /api/tracking/[id] - Update a tracking script
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const data = await request.json();

    // Update the tracking script
    const script = await prisma.trackingScript.update({
      where: { id },
      data,
    });

    return NextResponse.json(script);
  } catch (error) {
    console.error('Error updating tracking script:', error);
    return NextResponse.json(
      { error: 'Failed to update tracking script' },
      { status: 500 }
    );
  }
}

// DELETE /api/tracking/[id] - Delete a tracking script
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    // Delete the tracking script
    await prisma.trackingScript.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting tracking script:', error);
    return NextResponse.json(
      { error: 'Failed to delete tracking script' },
      { status: 500 }
    );
  }
} 