import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const session = await getServerSession()
    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const leads = await prisma.lead.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(leads)
  } catch (error) {
    console.error('Error fetching leads:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log('Received lead data:', body)
    
    const { name, email, company, phone, message, source, services, website, status } = body

    if (!name || !email) {
      return new NextResponse(
        JSON.stringify({ error: 'Name and email are required' }), 
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Format message to include website and services
    let formattedMessage = message || '';
    
    if (website) {
      formattedMessage = `Website: ${website}\n${formattedMessage}`;
    }
    
    if (services) {
      formattedMessage = `Service: ${services}\n${formattedMessage}`;
    }

    // Store the lead in the database
    const lead = await prisma.lead.create({
      data: {
        name,
        email,
        company: company || '',
        phone: phone || '',
        message: formattedMessage,
        source: source || 'Website Form',
        status: status || 'LEAD',
      }
    })

    // If the lead was created successfully, return it
    return NextResponse.json({ 
      success: true, 
      data: lead 
    })
  } catch (error) {
    console.error('Error creating lead:', error)
    return new NextResponse(
      JSON.stringify({ error: 'Failed to submit lead. Please try again.' }), 
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
} 