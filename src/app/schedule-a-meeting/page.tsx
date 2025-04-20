import { Metadata } from 'next';
import Data from '../ui/data';
import BookingCalendar from '../components/BookingCalendar/BookingCalendar';

export const metadata: Metadata = {
  title: 'Schedule a meeting with our team',
  description: "Connect with Clicksalesmedia in Dubai. Schedule a meeting to discuss tailored web solutions and elevate your business with our expert services. Book your consultation today!",
  keywords:'Schedule a meeting with clicksalesmedia team'
}

const ScheduleMeeting = () => {
  return (
    <>
      <div className='pt-40'><Data sectionName="scheduleMeeting" /></div>
      <div className="min-h-[calc(100vh-160px)] bg-[#272727] py-12">
        <BookingCalendar />
      </div>
    </>
  );
};

export default ScheduleMeeting;
