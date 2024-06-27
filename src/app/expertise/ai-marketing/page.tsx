import AiServices from '@/app/components/expertise/ai-marketing/AiServices'
import FAQ from '@/app/components/expertise/ai-marketing/Faq'
import Grid from '@/app/components/expertise/ai-marketing/grid'
import Hero from '@/app/components/expertise/ai-marketing/hero'
import React from 'react'

function page() {
  return (
    <div>
      <Hero />
      <Grid />
      <AiServices />
    </div>
  )
}

export default page