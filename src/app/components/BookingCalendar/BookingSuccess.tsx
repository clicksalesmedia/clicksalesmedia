'use client';

import React from 'react';
import { format, parseISO } from 'date-fns';
import { FiCalendar, FiClock, FiCheck, FiUser, FiMail, FiArrowRight, FiMessageSquare, FiGlobe } from 'react-icons/fi';
import { motion } from 'framer-motion';

interface BookingSuccessProps {
  bookingDetails: {
    name: string;
    email: string;
    service?: string;
    date: string;
    time: string;
    company?: string;
    message?: string;
  };
  onClose: () => void;
}

const BookingSuccess: React.FC<BookingSuccessProps> = ({ bookingDetails, onClose }) => {
  // Format date (yyyy-MM-dd → readable format)
  const formattedDate = format(parseISO(bookingDetails.date), 'EEEE, MMMM d, yyyy');
  
  // Format time (HH:mm → 12-hour format)
  const formatTime = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(':');
    const date = new Date();
    date.setHours(parseInt(hours, 10));
    date.setMinutes(parseInt(minutes, 10));
    return format(date, 'h:mm a');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#333333] rounded-lg p-8 shadow-lg max-w-2xl mx-auto"
    >
      <div className="flex flex-col items-center justify-center text-center mb-8">
        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
          <FiCheck className="text-green-500 text-4xl" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Booking Confirmed!</h2>
        <p className="text-gray-400">
          Thank you for scheduling a meeting with us. We&apos;ve sent a confirmation to your email.
        </p>
      </div>

      <div className="bg-[#222222] rounded-lg p-6 mb-6">
        <h3 className="text-lg font-medium text-primaryColor mb-4">Meeting Details</h3>
        
        <div className="space-y-4">
          <div className="flex items-start">
            <FiCalendar className="mt-1 mr-3 text-primaryColor flex-shrink-0" />
            <div>
              <p className="text-gray-400 text-sm">Date</p>
              <p className="text-white">{formattedDate}</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <FiClock className="mt-1 mr-3 text-primaryColor flex-shrink-0" />
            <div>
              <p className="text-gray-400 text-sm">Time</p>
              <p className="text-white">
                {formatTime(bookingDetails.time)} 
                <span className="text-gray-400 text-xs ml-1">(Dubai Time - GMT+4)</span>
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <FiUser className="mt-1 mr-3 text-primaryColor flex-shrink-0" />
            <div>
              <p className="text-gray-400 text-sm">Name</p>
              <p className="text-white">{bookingDetails.name}</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <FiMail className="mt-1 mr-3 text-primaryColor flex-shrink-0" />
            <div>
              <p className="text-gray-400 text-sm">Email</p>
              <p className="text-white">{bookingDetails.email}</p>
            </div>
          </div>
          
          {bookingDetails.service && (
            <div className="flex items-start">
              <FiMessageSquare className="mt-1 mr-3 text-primaryColor flex-shrink-0" />
              <div>
                <p className="text-gray-400 text-sm">Service</p>
                <p className="text-white">{bookingDetails.service}</p>
              </div>
            </div>
          )}
          
          <div className="flex items-start pt-2 border-t border-[#333333]">
            <FiGlobe className="mt-1 mr-3 text-blue-400 flex-shrink-0" />
            <div>
              <p className="text-gray-300 text-sm">
                Please note that all meeting times are in Dubai time (GMT+4). 
                Please adjust for your local time zone accordingly.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#222222] rounded-lg p-6 mb-6">
        <h3 className="text-lg font-medium text-primaryColor mb-4">What to Expect</h3>
        <ul className="space-y-3">
          <li className="flex items-start text-gray-300">
            <FiArrowRight className="mt-1 mr-2 text-primaryColor flex-shrink-0" />
            <span>We&apos;ll send a calendar invitation to your email shortly</span>
          </li>
          <li className="flex items-start text-gray-300">
            <FiArrowRight className="mt-1 mr-2 text-primaryColor flex-shrink-0" />
            <span>You&apos;ll receive a Zoom/Google Meet link for the meeting</span>
          </li>
          <li className="flex items-start text-gray-300">
            <FiArrowRight className="mt-1 mr-2 text-primaryColor flex-shrink-0" />
            <span>Our team will be prepared to discuss your needs and goals</span>
          </li>
        </ul>
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={onClose}
          className="px-6 py-3 bg-primaryColor text-white font-medium rounded-md hover:bg-primaryColor/90 transition-colors"
        >
          Return to Homepage
        </button>
      </div>
    </motion.div>
  );
};

export default BookingSuccess; 