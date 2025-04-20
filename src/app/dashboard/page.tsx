'use client';

import { useState, useEffect } from 'react';
import { FaUserPlus, FaCalendarAlt, FaExclamationTriangle, FaCheck } from 'react-icons/fa';
import Link from 'next/link';
import { format, parseISO, isAfter, startOfDay } from 'date-fns';

interface Lead {
  id: string;
  name: string;
  email: string;
  status: string;
  createdAt: string;
}

interface Meeting {
  id: string;
  name: string;
  email: string;
  date: string;
  time: string;
  status: string;
  service?: string;
}

export default function Dashboard() {
  const [leadsCount, setLeadsCount] = useState<number>(0);
  const [meetingsCount, setMeetingsCount] = useState<number>(0);
  const [upcomingMeetings, setUpcomingMeetings] = useState<Meeting[]>([]);
  const [recentLeads, setRecentLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Fetch leads
        const leadsResponse = await fetch('/api/leads');
        if (!leadsResponse.ok) throw new Error('Failed to fetch leads');
        const leadsData = await leadsResponse.json();

        // Fetch meetings
        const meetingsResponse = await fetch('/api/meetings');
        if (!meetingsResponse.ok) throw new Error('Failed to fetch meetings');
        const meetingsData = await meetingsResponse.json();
        
        // Process data
        const today = startOfDay(new Date());
        
        // Filter upcoming meetings (today and future)
        const upcoming = meetingsData
          .filter((meeting: Meeting) => {
            const meetingDate = parseISO(meeting.date);
            return isAfter(meetingDate, today) || format(meetingDate, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd');
          })
          .filter((meeting: Meeting) => meeting.status !== 'CANCELLED')
          .sort((a: Meeting, b: Meeting) => {
            const dateA = new Date(`${a.date}T${a.time}`);
            const dateB = new Date(`${b.date}T${b.time}`);
            return dateA.getTime() - dateB.getTime();
          })
          .slice(0, 3); // Show only next 3 meetings
        
        // Get recent leads
        const recent = leadsData
          .sort((a: Lead, b: Lead) => {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          })
          .slice(0, 3); // Show only 3 most recent leads
        
        setLeadsCount(leadsData.length);
        setMeetingsCount(meetingsData.length);
        setUpcomingMeetings(upcoming);
        setRecentLeads(recent);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);

  // Format date (e.g., "Mon, 15 May")
  const formatMeetingDate = (dateStr: string) => {
    const date = parseISO(dateStr);
    return format(date, 'EEE, d MMM');
  };

  // Format time (e.g., "14:30" → "2:30 PM")
  const formatMeetingTime = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(':');
    const date = new Date();
    date.setHours(parseInt(hours, 10));
    date.setMinutes(parseInt(minutes, 10));
    return format(date, 'h:mm a');
  };

  // Get status color for meetings
  const getMeetingStatusColor = (status: string) => {
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

  // Get status color for leads
  const getLeadStatusColor = (status: string) => {
    switch (status) {
      case 'LEAD':
        return 'bg-blue-100 text-blue-800';
      case 'MQL':
        return 'bg-purple-100 text-purple-800';
      case 'SQL':
        return 'bg-yellow-100 text-yellow-800';
      case 'CUSTOMER':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="w-8 h-8 border-t-2 border-blue-500 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-md">
        <div className="flex">
          <FaExclamationTriangle className="mr-2 mt-1 flex-shrink-0" />
          <div>{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-700">Total Leads</h2>
            <div className="p-2 bg-blue-100 rounded-md">
              <FaUserPlus className="text-blue-500" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-800">{leadsCount}</div>
          <Link 
            href="/dashboard/leads" 
            className="mt-4 inline-block text-sm text-blue-600 hover:text-blue-800"
          >
            View all leads →
          </Link>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-700">Total Meetings</h2>
            <div className="p-2 bg-green-100 rounded-md">
              <FaCalendarAlt className="text-green-500" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-800">{meetingsCount}</div>
          <Link 
            href="/dashboard/meetings" 
            className="mt-4 inline-block text-sm text-green-600 hover:text-green-800"
          >
            View all meetings →
          </Link>
        </div>
        
        {/* Can add more stat cards here */}
      </div>
      
      {/* Upcoming Meetings & Recent Leads */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Meetings */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-700 flex items-center">
              <FaCalendarAlt className="mr-2 text-green-500" /> Upcoming Meetings
            </h2>
          </div>
          <div className="p-6">
            {upcomingMeetings.length > 0 ? (
              <div className="space-y-4">
                {upcomingMeetings.map((meeting) => (
                  <div 
                    key={meeting.id} 
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-md hover:bg-gray-50"
                  >
                    <div className="mb-2 sm:mb-0">
                      <div className="font-medium">{meeting.name}</div>
                      <div className="text-sm text-gray-500">{meeting.service || 'Consultation'}</div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm text-gray-500 mr-2">
                        {formatMeetingDate(meeting.date)} at {formatMeetingTime(meeting.time)}
                      </span>
                      <span 
                        className={`px-2 py-1 text-xs rounded-full ${getMeetingStatusColor(meeting.status)}`}
                      >
                        {meeting.status}
                      </span>
                    </div>
                  </div>
                ))}
                <div className="mt-4 text-center">
                  <Link 
                    href="/dashboard/meetings" 
                    className="text-sm text-green-600 hover:text-green-800"
                  >
                    View all meetings →
                  </Link>
                </div>
              </div>
            ) : (
              <div className="text-center py-6 text-gray-500">
                No upcoming meetings scheduled
              </div>
            )}
          </div>
        </div>
        
        {/* Recent Leads */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-700 flex items-center">
              <FaUserPlus className="mr-2 text-blue-500" /> Recent Leads
            </h2>
          </div>
          <div className="p-6">
            {recentLeads.length > 0 ? (
              <div className="space-y-4">
                {recentLeads.map((lead) => (
                  <div 
                    key={lead.id} 
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-md hover:bg-gray-50"
                  >
                    <div className="mb-2 sm:mb-0">
                      <div className="font-medium">{lead.name}</div>
                      <div className="text-sm text-gray-500">{lead.email}</div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm text-gray-500 mr-2">
                        {format(new Date(lead.createdAt), 'MMM d, yyyy')}
                      </span>
                      <span 
                        className={`px-2 py-1 text-xs rounded-full ${getLeadStatusColor(lead.status)}`}
                      >
                        {lead.status}
                      </span>
                    </div>
                  </div>
                ))}
                <div className="mt-4 text-center">
                  <Link 
                    href="/dashboard/leads" 
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    View all leads →
                  </Link>
                </div>
              </div>
            ) : (
              <div className="text-center py-6 text-gray-500">
                No recent leads
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 