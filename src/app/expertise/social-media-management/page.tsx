import Cta from '@/app/ui/Cta'
import { AiOutlineHeart } from "react-icons/ai";
import CarouselInsta from '@/app/components/expertise/social/CarouselInsta'
import ContentSection from '@/app/components/expertise/social/Contentsocial'
import FAQ from '@/app/components/expertise/social/Faq'
import Features from '@/app/components/expertise/social/Features'
import SpinningSocial from '@/app/components/expertise/social/SpinningLogos'
import CodeBeams from '@/app/ui/CodeBeams'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import Data from '@/app/ui/data';
import DataRight from '@/app/ui/dataRight';
import { Metadata } from 'next';
import SocialFeatures from '@/app/components/expertise/social/SocialFeatures';
import FormService from '@/app/ui/modal';
 
export const metadata: Metadata = {
  title: 'Social Media Management',
  description: 'Engage, connect, and resonate with your community online.',
}
 
export default function HeroSection() {
return (
<>
<CodeBeams
  icon={<AiOutlineHeart />}
  title="Social Marketing"
  description="Engage, connect, and resonate with your community online."
/>
  <main className="w-full">
    <section className="relative pt-20 xl:pt-24">
      <div className="mx-auto lg:max-w-7xl w-full px-5 sm:px-10 md:px-12 lg:px-5 flex flex-col lg:flex-row gap-8 lg:gap-10 xl:gap-12">
        <div className="mx-auto text-center lg:text-left flex flex-col max-w-3xl justify-center lg:justify-start lg:py-20 flex-1 lg:w-1/2 lg:max-w-none">
        <DataRight sectionName="Social" />
        <div className="my-10 py-2 w-fit ">
        <FormService buttonText="Convert Visitors Now!" />
        </div>
        </div>
        <div className="flex flex-1 lg:w-1/2 relative max-w-3xl mx-auto lg:max-w-none">
        <SpinningSocial />
        </div>
      </div>
    </section>
  </main>
  
  <SocialFeatures />
  <div className='mt-10'>
 <Data sectionName="features" />
  </div>
  <CarouselInsta />
  <ContentSection />

  <FAQ />
  <Cta />
</>
)
}