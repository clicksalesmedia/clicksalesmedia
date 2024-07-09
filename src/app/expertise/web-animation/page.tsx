import Services from '@/app/components/expertise/web-animation/Services'
import Why from '@/app/components/expertise/web-animation/Why'
import Hero from '@/app/components/expertise/web-animation/hero'
import Pricing from '@/app/components/expertise/web-animation/pricing'
import { SectionOne } from '@/app/components/expertise/web-animation/sectionOne'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Web animation agency in dubai',
  description: "Bring your brand to life with Clicksalemedia, Dubai's premier web animation agency. Enhance user engagement and visual appeal with our cutting-edge, customized animation solutions.",
  keywords:'web animation agency, web animation and design agency'
}

function page() {
  return (
    <main>
        <Hero />
        <div className='overflow-hidden'>
        <Services />
        <Why />
        <SectionOne />
        <Pricing />
        </div>
    </main>
  )
}

export default page