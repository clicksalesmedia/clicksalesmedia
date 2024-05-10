

import AnimatedButton from '@/app/ui/AnimatedButton'
import FormService from '@/app/ui/modal'
import Image from 'next/image'
import React from 'react'

function AboutSeo() {
  return (
<div className="container px-6 m-auto pb-10">
  <div className="grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12">
  <div className="col-span-4 lg:col-span-6">
  <div className="container px-6 m-auto">
  <div className="grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12">
            <div className="col-span-4 md:col-span-8 lg:col-span-12 pb-4">
            <div className="flex flex-col justify-left text-left  mx-auto md:max-w-3xl space-y-5">
              <h2 className="font-semibold font-cormorant text-3xl sm:text-4xl lg:text-5xl text-transparent bg-clip-text bg-gradient-to-br from-secondaryColor from-20% via-[#AD8253] via-30% to-[#8C5C28]">
              ClickSalesMedia provides effective  <span className="text-transparent bg-clip-text bg-gradient-to-br from-secondaryColor from-20% via-[#AD8253] via-30% to-[#8C5C28]">professional SEO services. </span>
              </h2>
              <p className="text-whiteColor dark:text-gray-300">
              The importance of SEO extends beyond mere visibility. In today’s digital age, it acts as a credibility marker for your business, influencing consumer perception by positioning your website as a reliable resource. High rankings in search results are often equated with reputability, encouraging more engagement from potential clients. Additionally, SEO is cost-effective compared to other marketing strategies such as pay-per-click. By investing in SEO, you're focusing on attracting traffic at the moment they are looking for information or products like yours, which can lead to higher conversion rates. Hence, neglecting SEO can mean missing out on a substantial base of potential customers who are actively seeking to engage with your business.
              </p>
              <p className="text-whiteColor dark:text-gray-300">
              Before choosing strategic keywords to target certain influencers and decision-makers in the most profitable market sectors, we thoroughly understand your business strategy and goals. Our SEO agency professionals keep up with the latest tools, research, trends, and algorithm upgrades so they can notify you of any changes that can affect your SEO objectives. To keep your site optimized, they adjust or modify your content, keywords, and SEO approach.
              </p>
          </div>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12">
            <div className="col-span-4 lg:col-span-6 py-4">
            <FormService buttonText="Get a Free SEO Audit!" />
            </div>
            <div className="col-span-4 lg:col-span-6"></div>
          </div>
        </div>
  </div>
    <div className="col-span-4 lg:col-span-6">
    <Image alt={'SEO'} src={'/expertise/seo-clicksalesmedia.jpg'} width={'646'} height={'485'}
                        className="w-full rounded-xl ring-1 ring-black ring-opacity-5 lg:h-full lg:w-auto lg:max-w-none"
              />
    </div>
  </div>
</div>
  )
}

export default AboutSeo