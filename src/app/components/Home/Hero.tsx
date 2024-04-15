import Image from 'next/image'
import React from 'react'
import TypewriterComponent from './TypewriterComponent'
import {Home, Inbox, Bell, Camera, Heart } from 'lucide-react';
import HeroAnimatedButton from '@/app/ui/HeroAnimatedButton';
import { FaInstagram, FaLinkedinIn, FaPinterestP } from 'react-icons/fa';
import { MdOutlineEmail } from 'react-icons/md';
import { FaXTwitter } from 'react-icons/fa6';
import Link from 'next/link';

interface IconCircleProps {
  icon: React.ReactNode;
}

const IconCircle: React.FC<IconCircleProps> = ({ icon }) => {
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
      <Link href="https://www.linkedin.com/company/clicksalesmedia" target="_blank">
      <IconCircle icon={<FaLinkedinIn size={24} />}/>
      </Link>
      <Link href="https://www.instagram.com/clicksalesmedia" target="_blank">
      <IconCircle icon={<FaInstagram size={24} />}/>
      </Link>
      <Link href="https://www.twitter.com/clicksalesmedia" target="_blank">
      <IconCircle icon={<FaXTwitter size={24} />}/>
      </Link>
      <Link href="https://www.pinterest.com/clicksalesmedia/" target="_blank">
      <IconCircle icon={<FaPinterestP size={24} />}/>
      </Link>
      <Link href="mailto:info@clicksalesmedia.com" target="_blank">
      <IconCircle icon={<MdOutlineEmail size={24} />}/>
      </Link>
    </div>

    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2">
  <div className="p-4"> <div className="w-full px-20 text-center">
  <Image
    src="/clicksalesmedia-marketing-agency.png"
    alt="clicksalesmedia Marketing strategy"
    width={550}
    height={550}
  />
</div>
  </div>

  <div className="p-4">
    <div className="w-full space-y-10 md:py-20 text-center sm:text-left">
      <h1 className='text-third font-cormorant font text-4xl md:text-6xl custom-line-height font-bold'>Empowering Ambitious Brands with <span className='text-secondaryColor'>ClickSalesMedia. </span></h1>
          <TypewriterComponent />
          <p className='flex text-slate-200 dark:text-gray-300 tracking-tight md:font-normal max-w-xl mx-auto lg:max-w-none'>We are digital marketing agency experts in using data to create outstanding brands, engaging content, powerful stories, high conversions, and significant growth.</p>
          <div>
          <HeroAnimatedButton />
          </div>
          
      </div>
  </div>



</div>

    </div>
    
  </section>


  )
}

export default Hero
