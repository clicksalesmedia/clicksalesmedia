import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import prisma from '@/lib/prisma'

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession()
    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const body = await request.json()
    const { status } = body

    if (!status) {
      return new NextResponse('Status is required', { status: 400 })
    }

    const lead = await prisma.lead.update({
      where: {
        id: params.id
      },
      data: {
        status
      }
    })

    return NextResponse.json(lead)
  } catch (error) {
    console.error('Error updating lead:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
} 