import React from 'react';

function Services() {
  return (
    <div className="h-[50rem] w-full dark:bg-black bg-primaryColor dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-primaryColor [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <p className="text-center text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-secondaryColor to-[#94744d] py-8">
        Enhance Client Understanding with Engaging Web Animations for Clear Service Explanations
      </p>
    </div>
  );
}

export default Services;
