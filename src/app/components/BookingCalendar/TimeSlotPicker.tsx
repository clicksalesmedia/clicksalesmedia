'use client';

import React, { useState, useEffect } from 'react';
import { format, parse } from 'date-fns';
import { FiClock, FiAlertCircle, FiLoader } from 'react-icons/fi';

interface TimeSlot {
  time: string;
  available: boolean;
}

interface TimeSlotPickerProps {
  selectedDate: Date;
  onTimeSelect: (time: string) => void;
  selectedTime: string | null;
}

const TimeSlotPicker: React.FC<TimeSlotPickerProps> = ({
  selectedDate,
  onTimeSelect,
  selectedTime,
}) => {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTimeSlots = async () => {
      if (!selectedDate) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const formattedDate = format(selectedDate, 'yyyy-MM-dd');
        const response = await fetch(`/api/meetings?date=${formattedDate}&action=checkAvailability`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch available time slots');
        }
        
        const data = await response.json();
        setTimeSlots(data.timeSlots || []);
      } catch (err) {
        console.error('Error fetching time slots:', err);
        setError('Failed to load time slots. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchTimeSlots();
  }, [selectedDate]);

  // Group time slots by hour for better display
  const groupedTimeSlots = timeSlots.reduce<Record<string, TimeSlot[]>>((acc, slot) => {
    const hour = slot.time.split(':')[0];
    if (!acc[hour]) {
      acc[hour] = [];
    }
    acc[hour].push(slot);
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="bg-[#333333] rounded-lg p-6 shadow-lg">
        <div className="flex items-center mb-4">
          <FiClock className="text-primaryColor mr-2" size={20} />
          <h3 className="text-white text-lg font-medium">Available Times</h3>
        </div>
        <div className="flex justify-center items-center py-10">
          <FiLoader className="animate-spin text-primaryColor" size={30} />
          <span className="ml-3 text-gray-300">Loading available time slots...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#333333] rounded-lg p-6 shadow-lg">
        <h3 className="text-white text-lg font-medium mb-4">Available Times</h3>
        <div className="bg-red-900/30 p-4 rounded-md text-center">
          <FiAlertCircle className="inline-block text-red-400 mb-2" size={24} />
          <p className="text-red-300">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-3 px-4 py-2 bg-red-700 text-white rounded hover:bg-red-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (timeSlots.length === 0) {
    return (
      <div className="bg-[#333333] rounded-lg p-6 shadow-lg">
        <h3 className="text-white text-lg font-medium mb-4">Available Times</h3>
        <div className="bg-yellow-900/30 p-4 rounded-md text-center">
          <FiAlertCircle className="inline-block text-yellow-400 mb-2" size={24} />
          <p className="text-yellow-300">
            No available time slots for this date. Please select another date.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#333333] rounded-lg p-6 shadow-lg">
      <div className="flex items-center mb-4">
        <FiClock className="text-primaryColor mr-2" size={20} />
        <h3 className="text-white text-lg font-medium">Available Times</h3>
      </div>
      
      <div className="bg-blue-900/30 p-3 rounded-md mb-5">
        <p className="text-gray-300 text-sm font-medium">
          All times are shown in Dubai time (GMT+4).
        </p>
      </div>

      <div className="space-y-5">
        {Object.entries(groupedTimeSlots).map(([hour, slots]) => (
          <div key={hour} className="border-b border-gray-700 pb-4 last:border-b-0">
            <h4 className="text-gray-400 font-medium mb-2">
              {parseInt(hour) === 12 ? '12 PM' : 
               parseInt(hour) > 12 ? `${parseInt(hour) - 12} PM` : 
               `${hour} AM`}
            </h4>
            <div className="grid grid-cols-3 gap-2">
              {slots.map((slot) => (
                <button
                  key={slot.time}
                  onClick={() => slot.available && onTimeSelect(slot.time)}
                  disabled={!slot.available}
                  className={`
                    py-2 px-3 rounded-md text-sm transition-colors
                    ${selectedTime === slot.time 
                      ? 'bg-primaryColor text-white' 
                      : slot.available
                      ? 'bg-[#444444] text-white hover:bg-[#555555]'
                      : 'bg-[#444444] text-gray-500 opacity-50 cursor-not-allowed'
                    }
                  `}
                >
                  {format(parse(slot.time, 'HH:mm', new Date()), 'h:mm a')}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimeSlotPicker; 