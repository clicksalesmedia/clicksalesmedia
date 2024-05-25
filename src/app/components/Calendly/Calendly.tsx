'use client'
import Data from '@/app/ui/data';
import { useEffect } from 'react';

const Calendly = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
    <div
      className="calendly-inline-widget pt-4"
      data-url="https://calendly.com/info-hbse/clicksalesmedia-free-consultation?background_color=272727&text_color=b28757&primary_color=b28757"
      style={{ minWidth: '100%', height: '1000px' }}
    ></div>
    </>
  );
};

export default Calendly;