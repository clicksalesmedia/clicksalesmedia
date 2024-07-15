import React from 'react';

import Services from '@/app/components/expertise/web-animation/Services';
import Why from '@/app/components/expertise/web-animation/Why';

import { Metadata } from 'next';
import Pricing from '@/app/components/expertise/web-animation/pricing';
import { SectionOne } from '@/app/components/expertise/web-animation/sectionOne';
import Hero from '@/app/components/expertise/web-animation/hero';

export const metadata: Metadata = {
  title: 'Web animation agency in Dubai',
  description: "Bring your brand to life with Clicksalemedia, Dubai's premier web animation agency. Enhance user engagement and visual appeal with our cutting-edge, customized animation solutions.",
  keywords: 'web animation agency, web animation and design agency'
};

const Page: React.FC = () => {
  return (
    <main>
      <Hero />
      <div className='overflow-hidden'>
        <Services />
        <div id="why">
          <Why />
        </div>
        <SectionOne />
        <div id="pricing">
          <Pricing />
        </div>
      </div>
    </main>
  );
};

export default Page;
