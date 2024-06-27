import Image from 'next/image'
import React from 'react'

function Grid() {
  return (
<section className='p-20'>
  <div className="container px-6 m-auto">
    <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 border border-neutral-400 border-opacity-30">
      <div className="col-span-4 lg:col-span-7 border-r border-neutral-400 border-opacity-30">          
      <object type="image/svg+xml" data="/svg/robot-ai.svg">svg-animation</object>
      </div>
      <div className="col-span-4 lg:col-span-5">
        <Image 
        src="/svg/ai.svg"
        alt="ai marketing"
        width={600}
        height={700}
        />
      </div>
    </div>
  </div>
  <div className="container px-6 m-auto">
    <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 border-t-0 border border-neutral-400 border-opacity-30">
      <div className="col-span-4 lg:col-span-6 border-r border-neutral-400 border-opacity-30">
      <Image 
        src="/svg/companiesv.svg"
        alt="ai marketing"
        width={1000}
        height={700}
        />
      </div>
      <div className="col-span-4 lg:col-span-6">
        <div className='p-4'>
        <h2 className='text-secondaryColor text-2xl font-semibold py-2'>Our AI Technology is Built to Skyrocket Your Company</h2>
        <p className='text-white text-justify'>At our core, we believe in transforming your marketing and sales experience with the power of AI and automation. Our cutting-edge solutions are designed to seamlessly enhance your performance and boost your ROI. Imagine a world where your marketing efforts are finely tuned and effortlessly scalable, delivering exceptional results. With our innovative approach, you can unlock new levels of efficiency and effectiveness, all while focusing on what truly matters. Let us guide you on this exciting journey towards smarter, more impactful marketing.</p>
        </div>
      </div>
    </div>
  </div>
</section>


  
  )
}

export default Grid