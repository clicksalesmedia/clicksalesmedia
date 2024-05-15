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
    description="Successful Case Studies for Our Clients"
  />
    <section className='py-10'>
      <List />
    </section>
    </>
  )
}

export default page