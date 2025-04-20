import { format } from 'date-fns';
import { prisma } from '@/lib/prisma';
import { MeetingStatus } from '@prisma/client';

/**
 * Check if the given date is a weekday (Monday to Friday)
 */
export function isWeekday(date: Date): boolean {
  const day = date.getDay();
  return day > 0 && day < 6; // 0 is Sunday, 6 is Saturday
}

/**
 * Get all time slots that are already booked for a specific date
 */
export async function getBookedTimeSlots(date: Date): Promise<string[]> {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);
  
  try {
    const bookedMeetings = await prisma.meeting.findMany({
      where: {
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
        status: MeetingStatus.CONFIRMED,
      },
    });
    
    return bookedMeetings.map((meeting) => meeting.time);
  } catch (error) {
    console.error('Error fetching booked time slots:', error);
    return [];
  }
}

/**
 * Generate all available time slots for a specific date
 * Time slots are from 9:00 AM to 5:00 PM Dubai time, in 30-minute intervals
 */
export function generateTimeSlots(date: Date): string[] {
  const timeSlots: string[] = [];
  
  // Set the start and end times (9 AM to 5 PM)
  const startHour = 9;
  const endHour = 17;
  
  for (let hour = startHour; hour < endHour; hour++) {
    // Add hour:00 slot
    timeSlots.push(`${hour.toString().padStart(2, '0')}:00`);
    
    // Add hour:30 slot
    timeSlots.push(`${hour.toString().padStart(2, '0')}:30`);
  }
  
  return timeSlots;
} 