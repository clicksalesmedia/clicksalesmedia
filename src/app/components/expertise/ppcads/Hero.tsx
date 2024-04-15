'use client'
import ButtonUX from '@/app/ui/buttonux';
import Image from 'next/image';
import React, { useState } from 'react';

const Hero = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="bg-primaryColor dark:bg-gray-900">
      <div className="container px-6 py-20 mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between space-y-10 lg:space-y-0">
          {/* Text and Button */}
          <div className="flex flex-col items-center lg:items-start lg:flex-1 max-w-lg mx-auto lg:mx-0">
            <h1 className="font-semibold py-5 leading-tight text-slate-200 dark:text-white text-4xl sm:text-5xl lg:text-6xl">
              Our Google <span className="text-transparent bg-clip-text bg-gradient-to-tr from-secondaryColor to-[#B28757]">Marketing Services</span>
            </h1>
            <p className="text-slate-200 pb-10 dark:text-gray-300 tracking-tight md:font-normal max-w-xl mx-auto lg:max-w-none px-2">
            We specialize in Google marketing, ensuring your brand stands out in the digital sphere. Whether it's search ads, display ads, or YouTube campaigns, we tailor strategies to your specific needs. With expert guidance and real-time analytics, we optimize your campaigns for maximum impact. Let us elevate your online presence and drive results that matter.
            </p>
            <ButtonUX />
          </div>
          {/* Image */}
          <div className="flex-1">
            <Image width={900} height={400} className="object-cover w-full h-96 rounded-xl" src="/expertise/ppcads/google-ads.jpg" alt="google-ads-optimization" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
