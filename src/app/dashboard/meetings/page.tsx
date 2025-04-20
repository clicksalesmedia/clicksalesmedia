'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { format, parseISO } from 'date-fns';
import { FaCalendar, FaClock, FaEnvelope, FaPhone, FaBuilding, FaCheck, FaTimes, FaSpinner, FaUserClock } from 'react-icons/fa';

interface Meeting {
  id: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message?: string;
  service?: string;
  date: string;
  time: string;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
  createdAt: string;
  updatedAt: string;
}

export default function MeetingsPage() {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isUpdating, setIsUpdating] = useState(false);
  
  const searchParams = useSearchParams();
  const meetingId = searchParams?.get('id');

  useEffect(() => {
    fetchMeetings();
  }, []);

  // Select meeting based on URL param if provided
  useEffect(() => {
    if (meetingId && meetings.length > 0) {
      const meeting = meetings.find(m => m.id === meetingId);
      if (meeting) {
        setSelectedMeeting(meeting);
      }
    }
  }, [meetingId, meetings]);

  const fetchMeetings = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/meetings');
      
      if (!response.ok) {
        throw new Error('Failed to fetch meetings');
      }
      
      const data = await response.json();
      
      // Sort meetings by date (newest first)
      const sortedMeetings = data.sort((a: Meeting, b: Meeting) => {
        const dateA = new Date(`${a.date}T${a.time}`);
        const dateB = new Date(`${b.date}T${b.time}`);
        return dateB.getTime() - dateA.getTime();
      });
      
      setMeetings(sortedMeetings);
    } catch (err) {
      console.error('Error fetching meetings:', err);
      setError('Failed to load meetings. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const updateMeetingStatus = async (id: string, status: string) => {
    try {
      setIsUpdating(true);
      const response = await fetch(`/api/meetings/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update meeting status');
      }
      
      // Update local state
      setMeetings(prevMeetings => 
        prevMeetings.map(meeting => 
          meeting.id === id ? { ...meeting, status: status as Meeting['status'] } : meeting
        )
      );
      
      // Update selected meeting if it's the one being updated
      if (selectedMeeting && selectedMeeting.id === id) {
        setSelectedMeeting(prev => prev ? { ...prev, status: status as Meeting['status'] } : null);
      }
      
    } catch (err) {
      console.error('Error updating meeting status:', err);
      alert('Failed to update meeting status. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  const getFilteredMeetings = () => {
    if (statusFilter === 'all') return meetings;
    return meetings.filter(meeting => meeting.status === statusFilter);
  };

  // Format date (e.g., "Monday, January 1, 2023")
  const formatDate = (dateStr: string) => {
    return format(parseISO(dateStr), 'EEEE, MMMM d, yyyy');
  };

  // Format time (e.g., "14:30" → "2:30 PM")
  const formatTime = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(':');
    const date = new Date();
    date.setHours(parseInt(hours, 10));
    date.setMinutes(parseInt(minutes, 10));
    return format(date, 'h:mm a');
  };

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'CONFIRMED':
        return 'bg-green-100 text-green-800';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800';
      case 'COMPLETED':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-8 h-8 border-t-2 border-blue-500 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4 text-red-800">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Meetings</h1>
        <div className="flex items-center space-x-2">
          <label htmlFor="statusFilter" className="text-sm font-medium text-gray-700">
            Filter by status:
          </label>
          <select
            id="statusFilter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-md border border-gray-300 shadow-sm p-2 text-sm"
          >
            <option value="all">All Meetings</option>
            <option value="PENDING">Pending</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="CANCELLED">Cancelled</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Meetings List */}
        <div className="lg:w-1/2">
          <div className="bg-white shadow overflow-hidden rounded-md">
            <ul className="divide-y divide-gray-200">
              {getFilteredMeetings().length > 0 ? (
                getFilteredMeetings().map((meeting) => (
                  <li 
                    key={meeting.id}
                    className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                      selectedMeeting?.id === meeting.id ? 'bg-blue-50' : ''
                    }`}
                    onClick={() => setSelectedMeeting(meeting)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {meeting.name}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {meeting.email}
                        </p>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(meeting.status)}`}>
                          {meeting.status}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <FaCalendar className="flex-shrink-0 mr-1.5 text-gray-400" />
                        <p>{format(parseISO(meeting.date), 'MMM d, yyyy')}</p>
                        <FaClock className="flex-shrink-0 mx-1.5 text-gray-400" />
                        <p>{formatTime(meeting.time)}</p>
                      </div>
                      {meeting.service && (
                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                          <p className="truncate">{meeting.service}</p>
                        </div>
                      )}
                    </div>
                  </li>
                ))
              ) : (
                <li className="p-4 text-center text-gray-500">
                  No meetings found
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Meeting Details */}
        <div className="lg:w-1/2">
          {selectedMeeting ? (
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6 flex justify-between items-start">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Meeting Details
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    {format(parseISO(selectedMeeting.createdAt), 'MMM d, yyyy')} at {format(parseISO(selectedMeeting.createdAt), 'h:mm a')}
                  </p>
                </div>
                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(selectedMeeting.status)}`}>
                  {selectedMeeting.status}
                </span>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200">
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500 flex items-center">
                      <FaUserClock className="mr-2" /> Date and Time
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {formatDate(selectedMeeting.date)} at {formatTime(selectedMeeting.time)}
                    </dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Client Name</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {selectedMeeting.name}
                    </dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500 flex items-center">
                      <FaEnvelope className="mr-2" /> Email
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <a href={`mailto:${selectedMeeting.email}`} className="text-blue-600 hover:text-blue-800">
                        {selectedMeeting.email}
                      </a>
                    </dd>
                  </div>
                  {selectedMeeting.phone && (
                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500 flex items-center">
                        <FaPhone className="mr-2" /> Phone
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <a href={`tel:${selectedMeeting.phone}`} className="text-blue-600 hover:text-blue-800">
                          {selectedMeeting.phone}
                        </a>
                      </dd>
                    </div>
                  )}
                  {selectedMeeting.company && (
                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500 flex items-center">
                        <FaBuilding className="mr-2" /> Company
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {selectedMeeting.company}
                      </dd>
                    </div>
                  )}
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Service</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {selectedMeeting.service || 'General Consultation'}
                    </dd>
                  </div>
                  {selectedMeeting.message && (
                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">Message</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 whitespace-pre-line">
                        {selectedMeeting.message}
                      </dd>
                    </div>
                  )}
                </dl>
              </div>
              
              {/* Actions */}
              <div className="border-t border-gray-200 px-4 py-4 sm:px-6">
                <div className="flex flex-wrap gap-3">
                  {selectedMeeting.status === 'PENDING' && (
                    <>
                      <button
                        type="button"
                        onClick={() => updateMeetingStatus(selectedMeeting.id, 'CONFIRMED')}
                        disabled={isUpdating}
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isUpdating ? <FaSpinner className="animate-spin mr-2" /> : <FaCheck className="mr-2" />}
                        Confirm
                      </button>
                      <button
                        type="button"
                        onClick={() => updateMeetingStatus(selectedMeeting.id, 'CANCELLED')}
                        disabled={isUpdating}
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isUpdating ? <FaSpinner className="animate-spin mr-2" /> : <FaTimes className="mr-2" />}
                        Cancel
                      </button>
                    </>
                  )}
                  
                  {selectedMeeting.status === 'CONFIRMED' && (
                    <>
                      <button
                        type="button"
                        onClick={() => updateMeetingStatus(selectedMeeting.id, 'COMPLETED')}
                        disabled={isUpdating}
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isUpdating ? <FaSpinner className="animate-spin mr-2" /> : <FaCheck className="mr-2" />}
                        Mark as Completed
                      </button>
                      <button
                        type="button"
                        onClick={() => updateMeetingStatus(selectedMeeting.id, 'CANCELLED')}
                        disabled={isUpdating}
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isUpdating ? <FaSpinner className="animate-spin mr-2" /> : <FaTimes className="mr-2" />}
                        Cancel
                      </button>
                    </>
                  )}
                  
                  {selectedMeeting.status === 'CANCELLED' && (
                    <button
                      type="button"
                      onClick={() => updateMeetingStatus(selectedMeeting.id, 'PENDING')}
                      disabled={isUpdating}
                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isUpdating ? <FaSpinner className="animate-spin mr-2" /> : null}
                      Reopen as Pending
                    </button>
                  )}
                  
                  {selectedMeeting.status === 'COMPLETED' && (
                    <button
                      type="button"
                      onClick={() => updateMeetingStatus(selectedMeeting.id, 'CONFIRMED')}
                      disabled={isUpdating}
                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isUpdating ? <FaSpinner className="animate-spin mr-2" /> : null}
                      Reopen as Confirmed
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white shadow rounded-lg p-8 text-center">
              <FaCalendar className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">No meeting selected</h3>
              <p className="mt-1 text-sm text-gray-500">
                Select a meeting from the list to view details
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 