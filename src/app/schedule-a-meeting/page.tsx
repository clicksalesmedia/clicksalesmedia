import Calendly from '../components/Calendly/Calendly';
import Data from '../ui/data';


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
