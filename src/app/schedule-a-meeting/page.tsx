import { Metadata } from 'next';
import Calendly from '../components/Calendly/Calendly';
import Data from '../ui/data';

export const metadata: Metadata = {
  title: 'Schedule a meeting with our team',
  description: "Connect with Clicksalesmedia in Dubai. Schedule a meeting to discuss tailored web solutions and elevate your business with our expert services. Book your consultation today!",
  keywords:'Schedule a meeting with clicksalesmedia team'
}

const ScheduleMeeting = () => {
  return (
    <>
    <div className='pt-40'><Data sectionName="scheduleMeeting" /></div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#272727' }}>
        <Calendly />
      </div>
    </>
  );
};

export default ScheduleMeeting;
