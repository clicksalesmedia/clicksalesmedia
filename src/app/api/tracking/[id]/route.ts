import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import prisma from '@/lib/prisma';

// GET /api/tracking/[id] - Get a single tracking script
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const id = params.id;
    
    // Fetch the tracking script
    const trackingScript = await prisma.trackingScript.findUnique({
      where: { id },
      include: {
        logs: {
          orderBy: {
            timestamp: 'desc'
          },
          take: 10
        }
      }
    });

    if (!trackingScript) {
      return NextResponse.json(
        { error: 'Tracking script not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(trackingScript);
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
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user's email
    const userEmail = session.user?.email || 'unknown';

    const id = params.id;
    const data = await req.json();
    
    // Check if script exists
    const existingScript = await prisma.trackingScript.findUnique({
      where: { id }
    });

    if (!existingScript) {
      return NextResponse.json(
        { error: 'Tracking script not found' },
        { status: 404 }
      );
    }

    // Update the script
    const updatedScript = await prisma.trackingScript.update({
      where: { id },
      data: {
        name: data.name,
        type: data.type,
        provider: data.provider,
        script: data.script,
        active: data.active,
        location: data.location,
        loadType: data.loadType,
        notes: data.notes,
        triggerConditions: data.triggerConditions
      }
    });

    // Create log entry
    await prisma.trackingLog.create({
      data: {
        trackingScriptId: updatedScript.id,
        action: 'modified',
        userEmail: userEmail,
        details: `Updated ${updatedScript.name} tracking script`
      }
    });

    return NextResponse.json(updatedScript);
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
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user's email
    const userEmail = session.user?.email || 'unknown';

    const id = params.id;
    
    // Check if script exists
    const existingScript = await prisma.trackingScript.findUnique({
      where: { id }
    });

    if (!existingScript) {
      return NextResponse.json(
        { error: 'Tracking script not found' },
        { status: 404 }
      );
    }

    // Create log entry before deletion
    await prisma.trackingLog.create({
      data: {
        action: 'deleted',
        userEmail: userEmail,
        details: `Deleted ${existingScript.name} tracking script`
      }
    });

    // Delete the script
    await prisma.trackingScript.delete({
      where: { id }
    });

    return NextResponse.json({ success: true, message: 'Tracking script deleted successfully' });
  } catch (error) {
    console.error('Error deleting tracking script:', error);
    return NextResponse.json(
      { error: 'Failed to delete tracking script' },
      { status: 500 }
    );
  }
} 