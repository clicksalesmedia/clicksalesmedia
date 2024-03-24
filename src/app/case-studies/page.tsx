'use client'
import React from 'react'
import List from '../components/Casestudy/List'
import CodeBeams from '../ui/CodeBeams'
import { FaChartBar } from 'react-icons/fa'

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