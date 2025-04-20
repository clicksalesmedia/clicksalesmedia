import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import prisma from '@/lib/prisma';

// GET /api/tracking - Fetch all tracking scripts
export async function GET(req: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch all tracking scripts
    const trackingScripts = await prisma.trackingScript.findMany({
      orderBy: {
        updatedAt: 'desc'
      },
      include: {
        logs: {
          orderBy: {
            timestamp: 'desc'
          },
          take: 1
        }
      }
    });

    return NextResponse.json(trackingScripts);
  } catch (error) {
    console.error('Error fetching tracking scripts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tracking scripts' },
      { status: 500 }
    );
  }
}

// POST /api/tracking - Create a new tracking script
export async function POST(req: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user's email
    const userEmail = session.user?.email || 'unknown';

    // Parse request body
    const data = await req.json();
    
    // Validate required fields
    if (!data.name || !data.script) {
      return NextResponse.json(
        { error: 'Name and script are required fields' },
        { status: 400 }
      );
    }

    // Get user ID from email
    const user = await prisma.user.findUnique({
      where: { email: userEmail }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Create new tracking script
    const newScript = await prisma.trackingScript.create({
      data: {
        name: data.name,
        type: data.type,
        provider: data.provider,
        script: data.script,
        active: data.active === undefined ? true : data.active,
        location: data.location || 'head',
        loadType: data.loadType || 'async',
        notes: data.notes || '',
        triggerConditions: data.triggerConditions || {},
        userId: user.id
      }
    });

    // Create log entry
    await prisma.trackingLog.create({
      data: {
        trackingScriptId: newScript.id,
        action: 'added',
        userEmail: userEmail,
        details: `Added ${newScript.name} tracking script`
      }
    });

    return NextResponse.json(newScript, { status: 201 });
  } catch (error) {
    console.error('Error creating tracking script:', error);
    return NextResponse.json(
      { error: 'Failed to create tracking script' },
      { status: 500 }
    );
  }
}

// PUT /api/tracking - Bulk update tracking scripts
export async function PUT(req: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user's email
    const userEmail = session.user?.email || 'unknown';

    // Parse request body
    const data = await req.json();
    
    if (!Array.isArray(data)) {
      return NextResponse.json(
        { error: 'Request body must be an array of tracking scripts' },
        { status: 400 }
      );
    }

    // Process each tracking script
    const results = await Promise.all(
      data.map(async (script) => {
        // Check if script has valid ID
        if (!script.id) {
          return {
            success: false,
            error: 'Missing script ID',
            script
          };
        }

        // Update the script
        try {
          const updated = await prisma.trackingScript.update({
            where: { id: script.id },
            data: {
              active: script.active
            }
          });

          // Create log entry
          await prisma.trackingLog.create({
            data: {
              trackingScriptId: updated.id,
              action: script.active ? 'activated' : 'deactivated',
              userEmail: userEmail,
              details: `${script.active ? 'Activated' : 'Deactivated'} ${updated.name} tracking script`
            }
          });

          return {
            success: true,
            script: updated
          };
        } catch (error) {
          return {
            success: false,
            error: `Failed to update script: ${error}`,
            script
          };
        }
      })
    );

    return NextResponse.json({ results });
  } catch (error) {
    console.error('Error updating tracking scripts:', error);
    return NextResponse.json(
      { error: 'Failed to update tracking scripts' },
      { status: 500 }
    );
  }
} 