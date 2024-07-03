import Hero from '@/app/components/expertise/web-animation/hero'
import Pricing from '@/app/components/expertise/web-animation/pricing'
import { SectionOne } from '@/app/components/expertise/web-animation/sectionOne'
import React from 'react'

function page() {
  return (
    <main>
        <Hero />
        <SectionOne />
        <Pricing />
    </main>
  )
}

export default page