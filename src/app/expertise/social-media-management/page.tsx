'use client'
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
 
 
export default function HeroSection() {
return (
<>
<CodeBeams
  icon={<AiOutlineHeart />}
  title="Social Marketing"
  description="Show why you're better than your competitors"
/>
  <main className="w-full">
    <section className="relative pt-20 xl:pt-24">
      <div className="mx-auto lg:max-w-7xl w-full px-5 sm:px-10 md:px-12 lg:px-5 flex flex-col lg:flex-row gap-8 lg:gap-10 xl:gap-12">
        <div className="mx-auto text-center lg:text-left flex flex-col max-w-3xl justify-center lg:justify-start lg:py-20 flex-1 lg:w-1/2 lg:max-w-none">
        <DataRight sectionName="Social" />
         
        <button className="my-10 px-6 py-2 font-medium bg-gradient-to-br from-secondaryColor from-20% via-[#AD8253] via-30% to-[#8C5C28] text-white w-fit transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]">
          Schedule a Free Meeting
        </button>

        </div>
        <div className="flex flex-1 lg:w-1/2 relative max-w-3xl mx-auto lg:max-w-none">
        <SpinningSocial />
          <div className="absolute left-1/2 -translate-x-1/2 lg:-translate-x-0 -bottom-10 w-60 p-4 rounded-lg bg-white dark:bg-gray-950 border dark:border-gray-800">
            <div className="flex children:ring-4 children:ring-white dark:children:ring-gray-950 children:w-9 children:h-9 children:object-cover children:-ml-1 children:rounded-full">
              <Image src="/images/creative-agency-production.webp" alt="employee image" width={1920} height={1320} className="!-ml-0" />
              <Image src="/images/creative-agency-production.webp" alt="employee image" width={1920} height={1320} />
              <Image src="/images/creative-agency-production.webp" alt="employee image" width={1920} height={1320} />
              <Image src="/images/creative-agency-production.webp" alt="employee image" width={1920} height={1320} />
            </div>
            <div>
              <p className="text-lg font-semibold text-indigo-950 dark:text-white">45+ employees</p>
              <p className="text-gray-700 dark:text-gray-300 flex">
                <span className="text-yellow-500 text-xl">★</span> 5.0 (2.5k reviews)
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>

<Features />
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