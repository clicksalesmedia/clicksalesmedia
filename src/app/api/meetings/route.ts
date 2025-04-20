import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { format, parseISO, set, addMinutes, isAfter } from 'date-fns';
import { prisma } from '@/lib/prisma';
import { isWeekday, generateTimeSlots, getBookedTimeSlots } from '@/utils/booking';
import { MeetingStatus } from '@prisma/client';

// Dubai timezone offset (GMT+4)
const DUBAI_TIMEZONE_OFFSET = 4;

// Convert a date to Dubai time
const convertToDubaiTime = (date: Date): Date => {
  const userTimezoneOffset = date.getTimezoneOffset() / 60;
  // Convert to UTC first, then add Dubai offset
  return addMinutes(date, userTimezoneOffset + DUBAI_TIMEZONE_OFFSET * 60);
};

// Convert from Dubai time to user's local time
const convertFromDubaiTime = (date: Date): Date => {
  const userTimezoneOffset = date.getTimezoneOffset() / 60;
  // Subtract Dubai offset, then adjust for user's timezone
  return addMinutes(date, -(DUBAI_TIMEZONE_OFFSET + userTimezoneOffset) * 60);
};

export async function GET(request: NextRequest) {
  const searchParams = new URL(request.url).searchParams;
  const action = searchParams.get('action');
  const dateParam = searchParams.get('date');

  // Handle time slot availability check
  if (action === 'checkAvailability' && dateParam) {
    try {
      const date = parseISO(dateParam);
      
      // Only allow weekdays
      if (!isWeekday(date)) {
        return NextResponse.json({
          timeSlots: [],
          message: 'No slots available on weekends'
        });
      }

      // Generate all possible time slots
      const allTimeSlots = generateTimeSlots(date);
      
      // Get booked time slots
      const bookedTimeSlots = await getBookedTimeSlots(date);
      
      // Mark each slot as available or not
      const availabilitySlots = allTimeSlots.map(time => ({
        time,
        available: !bookedTimeSlots.includes(time)
      }));

      return NextResponse.json({ 
        timeSlots: availabilitySlots,
        message: 'Successfully fetched time slots' 
      });
      
    } catch (error) {
      console.error('Error checking time slot availability:', error);
      return NextResponse.json(
        { error: 'Failed to check time slot availability' },
        { status: 500 }
      );
    }
  }

  // Get all meetings for admin
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const meetings = await prisma.meeting.findMany({
      orderBy: {
        date: 'desc',
      },
    });

    return NextResponse.json(meetings);
  } catch (error) {
    console.error('Error fetching meetings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch meetings' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, phone, message, service, date, time } = body;

    // Validate required fields
    if (!name || !email || !date || !time) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate time format (HH:mm)
    const timeRegex = /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/;
    if (!timeRegex.test(time)) {
      return NextResponse.json(
        { error: 'Invalid time format. Use HH:mm format.' },
        { status: 400 }
      );
    }

    // Parse the date
    const dateObj = parseISO(date);
    
    // Validate the day is a weekday
    if (!isWeekday(dateObj)) {
      return NextResponse.json(
        { error: 'Meetings can only be scheduled on weekdays' },
        { status: 400 }
      );
    }

    // Validate time is between 9 AM and 5 PM
    const [hours, minutes] = time.split(':').map(Number);
    if (hours < 9 || (hours === 17 && minutes > 0) || hours > 17) {
      return NextResponse.json(
        { error: 'Meetings can only be scheduled between 9 AM and 5 PM Dubai time' },
        { status: 400 }
      );
    }

    // Check if the time slot is already booked
    const bookedTimeSlots = await getBookedTimeSlots(dateObj);
    if (bookedTimeSlots.includes(time)) {
      return NextResponse.json(
        { error: 'This time slot is already booked. Please select another time.' },
        { status: 400 }
      );
    }

    // Create the meeting
    const meeting = await prisma.meeting.create({
      data: {
        name,
        email,
        company: company || '',
        phone: phone || '',
        message: message || '',
        service: service || '',
        date: dateObj,
        time,
        duration: 30, // 30-minute meetings
        status: MeetingStatus.CONFIRMED,
      },
    });

    return NextResponse.json({
      meeting,
      message: 'Meeting scheduled successfully',
    });
  } catch (error) {
    console.error('Error creating meeting:', error);
    return NextResponse.json(
      { error: 'Failed to schedule meeting' },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return NextResponse.json({
    message: 'OPTIONS request handled successfully',
  });
} 