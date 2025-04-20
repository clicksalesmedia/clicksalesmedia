'use client';

import React, { useState, useEffect } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isWeekend, isBefore, startOfWeek, endOfWeek, addDays } from 'date-fns';
import { FiChevronLeft, FiChevronRight, FiCalendar, FiInfo } from 'react-icons/fi';
import { enUS } from 'date-fns/locale';

interface DatePickerProps {
  onDateSelect: (date: Date) => void;
  selectedDate: Date | null;
}

const DatePicker: React.FC<DatePickerProps> = ({ onDateSelect, selectedDate }) => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today);
  const [calendarDays, setCalendarDays] = useState<Date[]>([]);

  useEffect(() => {
    const days = getCalendarDays(currentMonth);
    setCalendarDays(days);
  }, [currentMonth]);

  const getCalendarDays = (date: Date) => {
    const monthStart = startOfMonth(date);
    const monthEnd = endOfMonth(date);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const days: Date[] = [];
    let day = startDate;

    while (day <= endDate) {
      days.push(day);
      day = addDays(day, 1);
    }

    return days;
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    const prevDate = subMonths(currentMonth, 1);
    if (isBefore(endOfMonth(prevDate), today)) {
      // If the previous month's end date is before today, don't go back
      return;
    }
    setCurrentMonth(prevDate);
  };

  const isDateSelectable = (day: Date) => {
    // Can't select dates in the past
    if (isBefore(day, new Date().setHours(0, 0, 0, 0))) {
      return false;
    }
    
    // Can't select weekends
    if (isWeekend(day)) {
      return false;
    }
    
    return true;
  };

  const getDayClass = (day: Date) => {
    // Base classes
    let classes = "flex items-center justify-center h-10 w-10 rounded-full text-sm";
    
    const isToday = isSameDay(day, today);
    const isPast = isBefore(day, new Date().setHours(0, 0, 0, 0));
    const isWeekendDay = isWeekend(day);
    const isSelected = selectedDate && isSameDay(day, selectedDate);
    const isCurrentMonth = isSameMonth(day, currentMonth);
    
    // Apply styles based on date status
    if (isSelected) {
      classes += " bg-primaryColor text-white";
    } else if (isPast || isWeekendDay) {
      classes += " bg-[#444444] text-gray-500 cursor-not-allowed opacity-50";
    } else if (isCurrentMonth) {
      classes += " bg-[#444444] text-white cursor-pointer hover:bg-[#555555]";
    } else {
      classes += " bg-[#3A3A3A] text-gray-500";
    }
    
    // Add today indicator
    if (isToday) {
      classes += " ring-2 ring-primaryColor";
    }
    
    return classes;
  };

  return (
    <div className="bg-[#333333] rounded-lg p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <FiCalendar className="text-primaryColor" size={20} />
          <h3 className="text-white text-lg font-medium">Select a Date</h3>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={prevMonth}
            className="p-2 rounded-full bg-[#444444] text-white hover:bg-[#555555]"
          >
            <FiChevronLeft size={16} />
          </button>
          <button
            onClick={nextMonth}
            className="p-2 rounded-full bg-[#444444] text-white hover:bg-[#555555]"
          >
            <FiChevronRight size={16} />
          </button>
        </div>
      </div>
      
      <div className="text-center mb-4">
        <h3 className="text-white font-medium">
          {format(currentMonth, 'MMMM yyyy', { locale: enUS })}
        </h3>
      </div>
      
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
          <div key={index} className="flex items-center justify-center text-gray-400 font-medium text-xs h-8">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((day, idx) => (
          <div key={idx} className="flex items-center justify-center py-1">
            <button
              onClick={() => isDateSelectable(day) && onDateSelect(day)}
              disabled={!isDateSelectable(day)}
              className={getDayClass(day)}
            >
              <span className="flex items-center justify-center w-full h-full">
                {format(day, 'd')}
              </span>
            </button>
          </div>
        ))}
      </div>
      
      <div className="mt-4 flex items-center space-x-4">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-primaryColor"></div>
          <span className="ml-2 text-xs text-gray-400">Today</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-[#444444] opacity-50"></div>
          <span className="ml-2 text-xs text-gray-400">Not Available</span>
        </div>
      </div>
    </div>
  );
};

export default DatePicker; 