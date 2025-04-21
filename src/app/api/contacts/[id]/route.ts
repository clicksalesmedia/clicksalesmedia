import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';
import { prisma } from '@/app/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { error: 'You must be signed in to view a contact' },
      { status: 401 }
    );
  }

  const { id } = await params;

  try {
    const contact = await prisma.contact.findUnique({
      where: { id },
    });

    if (!contact) {
      return NextResponse.json(
        { error: 'Contact not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(contact);
  } catch (error) {
    console.error('Error fetching contact:', error);
    return NextResponse.json(
      { error: 'An error occurred while fetching the contact' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { error: 'You must be signed in to update a contact' },
      { status: 401 }
    );
  }

  const { id } = await params;
  const body = await request.json();

  try {
    // Only allow updating the status
    const { status } = body;
    
    if (!status) {
      return NextResponse.json(
        { error: 'Status is required' },
        { status: 400 }
      );
    }
    
    // Validate status
    if (!['NEW', 'IN_PROGRESS', 'COMPLETED', 'ARCHIVED'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      );
    }

    const contact = await prisma.contact.findUnique({
      where: { id },
    });

    if (!contact) {
      return NextResponse.json(
        { error: 'Contact not found' },
        { status: 404 }
      );
    }

    const updatedContact = await prisma.contact.update({
      where: { id },
      data: {
        status,
      },
    });

    return NextResponse.json(updatedContact);
  } catch (error) {
    console.error('Error updating contact:', error);
    return NextResponse.json(
      { error: 'An error occurred while updating the contact' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { error: 'You must be signed in to delete a contact' },
      { status: 401 }
    );
  }

  // Only admins can delete contacts
  if (session.user.role !== 'ADMIN') {
    return NextResponse.json(
      { error: 'You do not have permission to delete contacts' },
      { status: 403 }
    );
  }

  const { id } = await params;

  try {
    const contact = await prisma.contact.findUnique({
      where: { id },
    });

    if (!contact) {
      return NextResponse.json(
        { error: 'Contact not found' },
        { status: 404 }
      );
    }

    await prisma.contact.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting contact:', error);
    return NextResponse.json(
      { error: 'An error occurred while deleting the contact' },
      { status: 500 }
    );
  }
} 