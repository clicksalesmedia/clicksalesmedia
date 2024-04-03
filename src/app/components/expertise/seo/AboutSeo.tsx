

import AnimatedButton from '@/app/ui/AnimatedButton'
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
                  Lorem ipsum dolor sit  <span className="text-transparent bg-clip-text bg-gradient-to-br from-secondaryColor from-20% via-[#AD8253] via-30% to-[#8C5C28]">Lorem ipsum dolor sit </span>
              </h2>
              <p className="text-whiteColor dark:text-gray-300">
                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem inventore illo doloremque deleniti reiciendis animi, earum provident sequi facilis corporis cupiditate dignissimos! Fugit, eaque voluptates sint earum deleniti asperiores impedit.
              </p>
              <p className="text-whiteColor dark:text-gray-300">
                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem inventore illo doloremque deleniti reiciendis animi, earum provident sequi facilis corporis cupiditate dignissimos! Fugit, eaque voluptates sint earum deleniti asperiores impedit.
              </p>
              <p className="text-whiteColor dark:text-gray-300">
                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem inventore illo doloremque deleniti reiciendis animi, earum provident sequi facilis corporis cupiditate dignissimos! Fugit, eaque voluptates sint earum deleniti asperiores impedit.
              </p>
          </div>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12">
            <div className="col-span-4 lg:col-span-6 py-4">
           <AnimatedButton />
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