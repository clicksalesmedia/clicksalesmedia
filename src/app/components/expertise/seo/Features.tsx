import SeoCounter from '@/app/ui/seoCounter'
import Link from 'next/link'
import React from 'react'
import { MdOutlineArrowOutward } from 'react-icons/md'

function Features() {
  return (
    <section>
        <div className="container px-6 m-auto">
          <div className="grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12">
            <div className="col-span-4 lg:col-span-6">
          <div className="grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12">
            <div className="col-span-4 lg:col-span-6">
            <div className="overflow-hidden bg-secondaryColor rounded shadow-md text-white">
                 <div className="flex justify-between items-center p-6 bg-secondaryColor">
                     <span className="text-white font-medium">Label</span>
                          <Link href="#" className="text-white">
                          <MdOutlineArrowOutward />
                          </Link>
                 </div>

                <div className="p-6">
                    <h3 className="mb-4 text-xl font-medium text-[#1E1E1E]">Title</h3>
                         <p className='text-white'>
                             Description text goes here. Ensure full accessibility by adhering to WAI-ARIA standards, enabling people with disabilities to use the website effectively.
                        </p>
                     </div>
               </div>

            </div>
            <div className="col-span-4 lg:col-span-6">
            <div className="overflow-hidden bg-[#1E1E1E] rounded shadow-md text-white">
                 <div className="flex justify-between items-center p-6 bg-[#1E1E1E]">
                     <span className="text-white font-medium">Label</span>
                          <Link href="#" className="text-white">
                          <MdOutlineArrowOutward />
                          </Link>
                 </div>

                <div className="p-6">
                    <h3 className="mb-4 text-xl font-medium text-secondaryColor">Title</h3>
                         <p className='text-white'>
                             Description text goes here. Ensure full accessibility by adhering to WAI-ARIA standards, enabling people with disabilities to use the website effectively.
                        </p>
                     </div>
               </div>
            </div>
          </div>
            </div>
            <div className="col-span-4 lg:col-span-6">
            <p className='text-white'>
            For starters, it improves organic search by making optimized content more visible and hence more likely to convert users into buyers.
Second, it increases site quality since search engines base their overall evaluation of a website on its searchability.
                        </p>
                        <p className='text-white'>
                        Finally, SEO produces concrete benefits by raising exposure, generating conversions, and drawing consumers; without it, an invisible website might put you at a competitive disadvantage.
                        </p>
                <SeoCounter />
            </div>
          </div>
        </div>
     </section>
  )
}

export default Features