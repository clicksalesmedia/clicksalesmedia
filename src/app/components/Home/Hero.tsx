import Image from 'next/image'
import React from 'react'
import TypewriterComponent from './TypewriterComponent'
import {Home, Inbox, Bell, Camera, Heart } from 'lucide-react';

const IconCircle = ({icon}) => {
  return (
    <div className="flex items-center">
      <span className="mr-4 p-2 border-2 border-secondaryColor text-secondaryColor rounded-full">
        {icon}
      </span>
    </div>
  );
};

function Hero() {
  return (
    <section className="h-screen w-full bg-cover bg-center relative bg-[#1a1a1a]" style={{ backgroundImage: 'url("mesh-clicksalesmedia.png")' }}>
    <div className="absolute inset-0 flex items-center justify-center pt-20">
    <div className="col-span-1 w-1/10 hidden md:block px-20">

    <div className="flex flex-col items-center space-y-4">
      <IconCircle icon={<Home size={24} />}/>
      <IconCircle icon={<Inbox size={24} />}/>
      <IconCircle icon={<Bell size={24} />}/>
      <IconCircle icon={<Camera size={24} />}/>
      <IconCircle icon={<Heart size={24} />}/>
    </div>

    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2">
  <div className="p-4"> <div className="w-full px-20 text-center">
  <Image
    src="/clicksalesmedia-style.png"
    alt="clicksalesmedia Marketing strategy"
    width={750}
    height={750}
  />
</div>
  </div>

  <div className="p-4">
    <div className="w-full space-y-10 md:py-20">
      <h1 className='text-third font-cormorant font text-4xl md:text-6xl font-bold'><span className='text-secondaryColor'>Welcome to </span>Digital Marketing Agency Clicksalesmedia</h1>
          <TypewriterComponent />
          <p className='text-1xl text-thirdColor font-montserrat'>We are digital marketing agency experts in using data to create outstanding brands, engaging content, powerful stories, high conversions, and significant growth.</p>
         <button className="bg-secondaryColor text-white font-semibold py-2 px-4 rounded-sm border-2 border-transparent transition duration-300 hover:border-secondaryColor hover:bg-transparent hover:text-secondarColor">
          EXPLORE OUR SERVICES
         </button>
      </div>
  </div>



</div>

    </div>
    
  </section>


  )
}

export default Hero
