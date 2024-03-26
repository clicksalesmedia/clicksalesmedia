'use client'
import React from 'react'
import List from '../components/Casestudy/List'
import CodeBeams from '../ui/CodeBeams'
import { FaChartBar } from 'react-icons/fa'
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Case Studies',
  description: 'its branding page',
}

function page() {
  return (
    <>
    <CodeBeams
    icon={<FaChartBar />}
    title="Our case studies"
    description="Show why you're better than your competitors"
  />
    <section className='py-10'>
      <List />
    </section>
    </>
  )
}

export default page