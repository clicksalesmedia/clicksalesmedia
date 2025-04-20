import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import prisma from '@/lib/prisma';

// GET /api/tracking/logs - Fetch all tracking logs
export async function GET(req: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get query parameters
    const searchParams = req.nextUrl.searchParams;
    const scriptId = searchParams.get('scriptId');
    const limit = parseInt(searchParams.get('limit') || '50', 10);
    
    // Build query
    const query: any = {
      orderBy: {
        timestamp: 'desc'
      },
      take: limit,
      include: {
        trackingScript: {
          select: {
            id: true,
            name: true
          }
        }
      }
    };
    
    // Add filter by scriptId if provided
    if (scriptId) {
      query.where = {
        trackingScriptId: scriptId
      };
    }

    // Fetch logs
    const logs = await prisma.trackingLog.findMany(query);

    return NextResponse.json(logs);
  } catch (error) {
    console.error('Error fetching tracking logs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tracking logs' },
      { status: 500 }
    );
  }
}

// POST /api/tracking/logs - Create a new log entry
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
    if (!data.trackingScriptId || !data.action) {
      return NextResponse.json(
        { error: 'trackingScriptId and action are required fields' },
        { status: 400 }
      );
    }

    // Create log entry
    const log = await prisma.trackingLog.create({
      data: {
        trackingScriptId: data.trackingScriptId,
        action: data.action,
        userEmail: userEmail,
        details: data.details || ''
      }
    });

    // If action is 'verified', update the script's lastVerified timestamp
    if (data.action === 'verified') {
      await prisma.trackingScript.update({
        where: { id: data.trackingScriptId },
        data: { lastVerified: new Date() }
      });
    }

    return NextResponse.json(log, { status: 201 });
  } catch (error) {
    console.error('Error creating tracking log:', error);
    return NextResponse.json(
      { error: 'Failed to create tracking log' },
      { status: 500 }
    );
  }
} 