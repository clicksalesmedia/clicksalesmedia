import { getServerSession } from 'next-auth'
import prisma from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const body = await request.json();
    const { status } = body;

    await prisma.lead.update({
      where: {
        id: String(id),
      },
      data: {
        status,
      },
    });

    return NextResponse.json({ message: 'Lead updated successfully' });
  } catch (error) {
    console.error(error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const lead = await prisma.lead.findUnique({
      where: {
        id: String(id),
      },
    });

    if (!lead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    }

    return NextResponse.json(lead);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'An error occurred while fetching the lead' },
      { status: 500 }
    );
  }
} 