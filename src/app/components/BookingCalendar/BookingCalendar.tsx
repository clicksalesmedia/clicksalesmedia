'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { FiCalendar, FiClock, FiUser, FiArrowRight, FiCheck, FiGlobe } from 'react-icons/fi';
import DatePicker from './DatePicker';
import TimeSlotPicker from './TimeSlotPicker';
import BookingForm from './BookingForm';
import BookingSuccess from './BookingSuccess';
import { BookingFormData } from './BookingForm';

interface BookingDetailsSuccess {
  name: string;
  email: string;
  service?: string;
  date: string;
  time: string;
  company?: string;
  message?: string;
}

interface BookingDetails {
  name: string;
  email: string;
  phone?: string;
  message?: string;
  service: string;
  date: Date;
  time: string;
  company?: string;
}

const BookingCalendar: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookingDetails, setBookingDetails] = useState<BookingDetailsSuccess | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const steps = [
    { id: 1, title: 'Select Date', description: 'Choose a date for your meeting. You can book appointments on weekdays (Monday-Friday).', icon: FiCalendar },
    { id: 2, title: 'Choose Time', description: 'Select an available time slot. We\'re available between 9:00 AM and 5:00 PM Dubai time.', icon: FiClock },
    { id: 3, title: 'Your Details', description: 'Please provide your information to confirm your booking.', icon: FiUser },
  ];

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setStep(2);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setStep(3);
  };

  const handleFormSubmit = async (formData: BookingFormData) => {
    if (!selectedDate || !selectedTime) return;

    setIsSubmitting(true);
    setSubmissionError(null);
    
    try {
      // Format date as YYYY-MM-DD for API
      const formattedDate = format(selectedDate, 'yyyy-MM-dd');
      
      // Prepare the data to send to the API
      const bookingData = {
        ...formData,
        date: formattedDate,
        time: selectedTime,
      };
      
      // Make the API call to create the booking
      const response = await fetch('/api/meetings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create booking');
      }
      
      const result = await response.json();
      
      // Create the success details object for display
      const details: BookingDetailsSuccess = {
        ...formData,
        date: formattedDate,
        time: selectedTime,
      };
      
      setBookingDetails(details);
      setStep(4);
    } catch (error) {
      console.error('Error creating booking:', error);
      setSubmissionError(error instanceof Error ? error.message : 'Failed to schedule meeting. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetBooking = () => {
    setSelectedDate(null);
    setSelectedTime(null);
    setBookingDetails(null);
    setSubmissionError(null);
    setStep(1);
  };

  return (
    <div className="max-w-5xl mx-auto bg-gray-900 rounded-lg shadow-xl overflow-hidden border border-gray-800">
      {/* Booking Steps */}
      <div className="grid grid-cols-1 lg:grid-cols-4 border-b border-gray-800">
        {steps.map((stepItem) => (
          <div
            key={stepItem.id}
            className={`flex items-center p-4 ${
              step >= stepItem.id
                ? 'bg-primaryColor text-white'
                : 'bg-gray-800 text-gray-400'
            } ${stepItem.id < steps.length ? 'border-b lg:border-b-0 lg:border-r border-gray-700' : ''}`}
          >
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full mr-3 ${
                step > stepItem.id
                  ? 'bg-white text-primaryColor'
                  : step === stepItem.id
                  ? 'bg-white text-primaryColor'
                  : 'bg-gray-700 text-gray-400'
              }`}
            >
              {step > stepItem.id ? (
                <FiCheck className="text-lg" />
              ) : (
                <stepItem.icon className="text-lg" />
              )}
            </div>
            <div>
              <p className="text-sm font-medium">{stepItem.title}</p>
              <p className={`text-xs ${step >= stepItem.id ? 'text-gray-100' : 'text-gray-500'}`}>
                {stepItem.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Timezone Notice */}
      <div className="bg-blue-900/30 text-blue-200 py-3 px-4 text-sm flex items-center justify-center border-b border-blue-900/50">
        <FiGlobe className="mr-2 text-blue-400" />
        <strong>Important:</strong>&nbsp;All meeting times are shown in Dubai time (GMT+4)
      </div>

      {/* Booking Content */}
      <div className="p-6 bg-gray-900">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="date"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-semibold text-white mb-4">Select a Date</h3>
              <DatePicker 
                onDateSelect={handleDateSelect} 
                selectedDate={selectedDate}
              />
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="time"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-semibold text-white mb-4">
                Select a Time <span className="text-sm font-normal text-blue-400">(Dubai Time - GMT+4)</span>
              </h3>
              <p className="text-sm text-gray-400 mb-4">
                Available time slots for {selectedDate ? format(selectedDate, 'EEEE, MMMM d, yyyy') : ''}
              </p>
              {selectedDate && (
                <TimeSlotPicker
                  selectedDate={selectedDate}
                  onTimeSelect={handleTimeSelect}
                  selectedTime={selectedTime}
                />
              )}
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-semibold text-white mb-4">Your Details</h3>
              <p className="text-sm text-gray-400 mb-4">
                Please provide your information to confirm your booking.
              </p>
              
              {submissionError && (
                <div className="bg-red-900/30 text-red-300 p-4 mb-4 rounded-md border border-red-900/50">
                  <p className="text-sm flex items-start">
                    <FiCheck className="mt-1 mr-2 flex-shrink-0" />
                    {submissionError}
                  </p>
                </div>
              )}
              
              <BookingForm
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                onSubmit={handleFormSubmit}
                isSubmitting={isSubmitting}
              />
            </motion.div>
          )}

          {step === 4 && bookingDetails && (
            <motion.div
              key="success"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <BookingSuccess
                bookingDetails={bookingDetails}
                onClose={resetBooking}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Booking Summary */}
      {(step > 1 && step < 4) && (
        <div className="bg-gray-800 p-6 border-t border-gray-700">
          <h4 className="text-lg font-medium text-white mb-3">Booking Summary</h4>
          <div className="space-y-3 text-gray-300">
            {selectedDate && (
              <div className="flex items-center">
                <FiCalendar className="text-primaryColor mr-2 flex-shrink-0" />
                <span>Date: {format(selectedDate, 'EEEE, MMMM d, yyyy')}</span>
              </div>
            )}
            {selectedTime && (
              <div className="flex items-center">
                <FiClock className="text-primaryColor mr-2 flex-shrink-0" />
                <span>
                  Time: {selectedTime} 
                  <span className="text-sm text-blue-400 ml-1 font-medium">(Dubai Time - GMT+4)</span>
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="p-6 bg-gray-800 border-t border-gray-700">
        {step > 1 && (
          <button
            onClick={() => setStep(step - 1)}
            className="px-4 py-2 border border-gray-600 rounded mr-3 text-gray-300 hover:bg-gray-700 transition-colors"
          >
            Back
          </button>
        )}
        {step < 4 && step > 1 && selectedDate && (
          <button
            onClick={() => setStep(step + 1)}
            className="px-4 py-2 bg-primaryColor text-white rounded hover:bg-primaryColor/90 transition-colors"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default BookingCalendar; 