"use client"
import React from 'react';
import { Vortex } from '@/app/ui/vortex';

const Hero: React.FC = () => {
  const handleScroll = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full mx-auto rounded-md h-screen overflow-hidden">
      <Vortex
        backgroundColor="black"
        rangeY={800}
        particleCount={500}
        baseHue={120}
        className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
      >
        <h2 className="text-secondaryColor text-2xl md:text-6xl font-bold text-center">
          Transform Your Website with Stunning Animations
        </h2>
        <p className="text-white text-sm md:text-2xl max-w-6xl mt-6 text-center">
          {"Increase your ROI and revenue by making your website more interactive and animated. Our innovative web development services bring your site to life with captivating animations that engage your audience and drive conversions. We specialize in creating dynamic, user-friendly websites that not only look great but also provide an immersive experience for your visitors. Elevate your online presence and stand out in the digital landscape with our expertly crafted animations."}
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
          <button
            className="px-4 py-2 bg-secondaryColor hover:bg-[#ba9444] transition duration-200 rounded-lg text-white shadow-[0px_2px_0px_0px_#FFFFFF40_inset]"
            onClick={() => handleScroll('pricing')}
          >
            Get Started Now
          </button>
          <button
            className="px-4 py-2 text-white"
            onClick={() => handleScroll('why')}
          >
            Learn More
          </button>
        </div>
      </Vortex>
    </div>
  );
};

export default Hero;
