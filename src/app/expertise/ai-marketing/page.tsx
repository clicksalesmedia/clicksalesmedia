import AiServices from '@/app/components/expertise/ai-marketing/AiServices'
import FAQ from '@/app/components/expertise/ai-marketing/Faq'
import Grid from '@/app/components/expertise/ai-marketing/grid'
import Hero from '@/app/components/expertise/ai-marketing/hero'
import Swap from '@/app/components/expertise/ai-marketing/SwapColumnFeatures'
import AiMarketingTitle from '@/app/components/expertise/ai-marketing/AiMarketingTitle'
import Cta from '@/app/ui/Cta'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Ai marketing agency in dubai',
  description: "Discover cutting-edge AI marketing solutions with clicksalesmedia. Boost ROI, enhance SEO, and optimize PPC campaigns with our data-driven strategies. Contact us today for transformative results!",
  keywords:'AI marketing agency, AI performance marketing agency'
}

function page() {
  return (
    <div>
      <Hero />
      <AiMarketingTitle />
      <Swap />
      <Grid />
      <AiServices />
      <FAQ />
      <Cta />
    </div>
  )
}

export default page