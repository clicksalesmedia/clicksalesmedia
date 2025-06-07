'use client';

import { usePathname, useRouter } from "next/navigation";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { FaBlog, FaBriefcase, FaEnvelope, FaTachometerAlt, FaUser, FaImages, FaSearch, FaUserPlus, FaCalendarAlt, FaCalendarCheck, FaTag, FaCode, FaBuilding } from "react-icons/fa";

interface DashboardLayoutProps {
  children: ReactNode;
}

interface Meeting {
  id: string;
  name: string;
  email: string;
  date: string;
  time: string;
  service?: string;
  status: string;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const router = useRouter();
  const pathname = usePathname() || "";
  const { data: session, status } = useSession();
  const [upcomingMeetings, setUpcomingMeetings] = useState<Meeting[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/dashboard/login");
    }
  }, [status, router]);

  // Fetch upcoming meetings for sidebar calendar
  useEffect(() => {
    if (status === "authenticated") {
      fetchUpcomingMeetings();
    }
  }, [status]);

  const fetchUpcomingMeetings = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/meetings');
      
      if (!response.ok) {
        throw new Error('Failed to fetch meetings');
      }
      
      const meetings = await response.json();
      
      // Filter for upcoming meetings (today and future) that are confirmed or pending
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const upcoming = meetings
        .filter((meeting: Meeting) => {
          const meetingDate = new Date(meeting.date);
          return (
            meetingDate >= today && 
            (meeting.status === 'CONFIRMED' || meeting.status === 'PENDING')
          );
        })
        .sort((a: Meeting, b: Meeting) => {
          // Sort by date and time
          const dateA = new Date(`${a.date}T${a.time}`);
          const dateB = new Date(`${b.date}T${b.time}`);
          return dateA.getTime() - dateB.getTime();
        })
        .slice(0, 5); // Show only next 5 meetings
      
      setUpcomingMeetings(upcoming);
    } catch (error) {
      console.error('Error fetching meetings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!session && pathname !== "/dashboard/login") {
    return null;
  }

  // Don't render sidebar for login page
  if (pathname === "/dashboard/login") {
    return <>{children}</>;
  }

  // Format date (e.g., "Mon, 15 May")
  const formatMeetingDate = (dateStr: string) => {
    const date = new Date(dateStr);
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

  // Get status color based on meeting status
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-500';
      case 'CONFIRMED':
        return 'bg-green-500';
      case 'CANCELLED':
        return 'bg-red-500';
      case 'COMPLETED':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white overflow-y-auto">
        <div className="p-6">
          <h1 className="text-2xl font-bold">CSM Dashboard</h1>
        </div>
        <nav className="mt-6">
          <SidebarLink href="/dashboard" icon={<FaTachometerAlt />} active={pathname === "/dashboard"}>
            Dashboard
          </SidebarLink>
          <SidebarLink href="/dashboard/leads" icon={<FaUserPlus />} active={pathname.startsWith("/dashboard/leads")}>
            Leads
          </SidebarLink>
          <SidebarLink href="/dashboard/meetings" icon={<FaCalendarAlt />} active={pathname.startsWith("/dashboard/meetings")}>
            Meetings
          </SidebarLink>
          <SidebarLink href="/dashboard/blog" icon={<FaBlog />} active={pathname.startsWith("/dashboard/blog")}>
            Blog Posts
          </SidebarLink>
          <SidebarLink href="/dashboard/categories" icon={<FaTag />} active={pathname.startsWith("/dashboard/categories")}>
            Categories
          </SidebarLink>
          <SidebarLink href="/dashboard/case-studies" icon={<FaBriefcase />} active={pathname.startsWith("/dashboard/case-studies")}>
            Case Studies
          </SidebarLink>
          <SidebarLink href="/dashboard/portfolio" icon={<FaImages />} active={pathname.startsWith("/dashboard/portfolio")}>
            Portfolio
          </SidebarLink>
          <SidebarLink href="/dashboard/logos" icon={<FaBuilding />} active={pathname.startsWith("/dashboard/logos")}>
            Client Logos
          </SidebarLink>
          <SidebarLink href="/dashboard/contacts" icon={<FaEnvelope />} active={pathname.startsWith("/dashboard/contacts")}>
            Contacts
          </SidebarLink>
          <SidebarLink href="/dashboard/seo" icon={<FaSearch />} active={pathname.startsWith("/dashboard/seo")}>
            SEO
          </SidebarLink>
          <SidebarLink href="/dashboard/tracking" icon={<FaCode />} active={pathname.startsWith("/dashboard/tracking")}>
            Tracking
          </SidebarLink>
          {session?.user.role === "ADMIN" && (
            <SidebarLink href="/dashboard/users" icon={<FaUser />} active={pathname.startsWith("/dashboard/users")}>
              Users
            </SidebarLink>
          )}
        </nav>

        {/* Upcoming Meetings Calendar */}
        <div className="mt-10 px-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider flex items-center">
              <FaCalendarCheck className="mr-2" /> Upcoming Meetings
            </h3>
            <Link href="/dashboard/meetings" className="text-xs text-blue-400 hover:text-blue-300">
              View All
            </Link>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-4">
              <div className="w-5 h-5 border-t-2 border-blue-400 border-solid rounded-full animate-spin"></div>
            </div>
          ) : upcomingMeetings.length > 0 ? (
            <div className="space-y-3">
              {upcomingMeetings.map((meeting) => (
                <Link 
                  href={`/dashboard/meetings?id=${meeting.id}`}
                  key={meeting.id} 
                  className="block bg-gray-700 rounded-md p-3 hover:bg-gray-600 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">{meeting.name}</p>
                      <p className="text-xs text-gray-400 truncate">{meeting.service || 'Consultation'}</p>
                    </div>
                    <div className={`${getStatusColor(meeting.status)} w-2 h-2 rounded-full mt-1`}></div>
                  </div>
                  <div className="mt-2 flex items-center text-xs text-gray-300">
                    <span className="mr-3">{formatMeetingDate(meeting.date)}</span>
                    <span>{formatMeetingTime(meeting.time)}</span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-4 text-sm text-gray-400">
              No upcoming meetings
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {pathname === "/dashboard" && "Dashboard"}
              {pathname.startsWith("/dashboard/leads") && "Leads Management"}
              {pathname.startsWith("/dashboard/meetings") && "Meetings Management"}
              {pathname.startsWith("/dashboard/blog") && "Blog Management"}
              {pathname.startsWith("/dashboard/case-studies") && "Case Studies Management"}
              {pathname.startsWith("/dashboard/portfolio") && "Portfolio Management"}
              {pathname.startsWith("/dashboard/logos") && "Client Logos Management"}
              {pathname.startsWith("/dashboard/contacts") && "Contact Management"}
              {pathname.startsWith("/dashboard/seo") && "SEO Management"}
              {pathname.startsWith("/dashboard/tracking") && "Tracking Management"}
              {pathname.startsWith("/dashboard/users") && "User Management"}
            </h2>
            {session && (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  {session.user.name || session.user.email}
                </span>
                <button 
                  onClick={() => router.push("/api/auth/signout")}
                  className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
};

interface SidebarLinkProps {
  href: string;
  icon: ReactNode;
  active: boolean;
  children: ReactNode;
}

const SidebarLink = ({ href, icon, active, children }: SidebarLinkProps) => {
  return (
    <Link
      href={href}
      className={`flex items-center px-6 py-3 hover:bg-gray-700 ${
        active ? "bg-gray-700" : ""
      }`}
    >
      <span className="mr-3">{icon}</span>
      {children}
    </Link>
  );
};

export default DashboardLayout; 