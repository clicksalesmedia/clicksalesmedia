import Services from '@/app/components/expertise/web-animation/Services'
import Why from '@/app/components/expertise/web-animation/Why'
import Hero from '@/app/components/expertise/web-animation/hero'
import Pricing from '@/app/components/expertise/web-animation/pricing'
import { SectionOne } from '@/app/components/expertise/web-animation/sectionOne'
import React from 'react'

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