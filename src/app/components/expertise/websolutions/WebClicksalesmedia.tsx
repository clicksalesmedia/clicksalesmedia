import Image from 'next/image'
import React from 'react'

function WebClicksalesmedia() {
  return (
    <>
    <section className='py-20'>
    <div className="container px-6 m-auto">
      <div className="grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12">
        <div className="col-span-4 lg:col-span-6">
        <div>
                <span className="rounded-lg px-2.5 py-1 text-xs font-semibold tracking-wide text-whiteColor bg-gradient-to-br from-secondaryColor from-20% via-[#AD8253] via-30% to-[#8C5C28]">
                 Web Performance
                </span>
                <h2 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                 The performance and speed
                </h2>
                <p className="mt-4 text-lg text-gray-300">
                  The product has built-in sentiment analysis capabilities, allowing
                  it to determine the sentiment (positive, negative, or neutral)
                  expressed in text or customer feedback.
                </p>
              </div>
        </div>
        <div className="col-span-4 lg:col-span-6">
            <Image src="/expertise/websolutions/ui-web.png" width={600} height={400} alt='Web performance' />
        </div>
      </div>
    </div>
  </section>
  <section className='py-20'>
    <div className="container px-6 m-auto">
      <div className="grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12">
        <div className="col-span-4 lg:col-span-6">
            <Image src="/expertise/websolutions/website-performance.png" width={600} height={400} alt='Web performance' />
        </div>
        <div className="col-span-4 lg:col-span-6">
        <div>
                <span className="rounded-lg px-2.5 py-1 text-xs font-semibold tracking-wide text-whiteColor bg-gradient-to-br from-secondaryColor from-20% via-[#AD8253] via-30% to-[#8C5C28]">
                 Web Performance
                </span>
                <h2 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                 The performance and speed
                </h2>
                <p className="mt-4 text-lg text-gray-300">
                  The product has built-in sentiment analysis capabilities, allowing
                  it to determine the sentiment (positive, negative, or neutral)
                  expressed in text or customer feedback.
                </p>
              </div>
        </div>
      </div>
    </div>
  </section>
  <section className='py-20'>
    <div className="container px-6 m-auto">
      <div className="grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12">
        <div className="col-span-4 lg:col-span-6">
        <div>
                <span className="rounded-lg px-2.5 py-1 text-xs font-semibold tracking-wide text-whiteColor bg-gradient-to-br from-secondaryColor from-20% via-[#AD8253] via-30% to-[#8C5C28]">
                 Our Unique System
                </span>
                <h2 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                 From Website to client
                </h2>
                <p className="mt-4 text-lg text-gray-300">
                  The product has built-in sentiment analysis capabilities, allowing
                  it to determine the sentiment (positive, negative, or neutral)
                  expressed in text or customer feedback.
                </p>
              </div>
        </div>
        <div className="col-span-4 lg:col-span-6">
            <Image src="/expertise/websolutions/system-clicksalesmedia.png" width={600} height={400} alt='Web performance' />
        </div>
      </div>
    </div>
  </section>
  </>
  )
}

export default WebClicksalesmedia
