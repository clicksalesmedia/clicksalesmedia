import Image from 'next/image'
import React from 'react'

function WhyClicksalesmedia() {
  return (
    <>
 <section className="overflow-hidden text-center">
      <div className="xl:py-24 py-16 mx-auto">
        <div className="container mx-auto">
          <div>
            <span className="text-sm font-medium py-1 px-3 rounded-full text-primary bg-primary/10">
              Features
            </span>
            <h1 className="text-3xl tight font-medium mt-3 mb-4">
              Better Management. Better Performance
            </h1>
            <p className="text-gray-500">
              Start working with <span className="text-primary">Prompt</span> to manage your workforce better
            </p>
          </div>
          <div className="xl:pt-16 xl:pb-28 py-16">
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-6 items-center justify-center">
              <div className="relative">
                <Image
                width={300}
                height={300}
                  src="/images/hero/saas1.png"
                  alt="saas1"
                  data-aos="fade-right"
                  data-aos-duration="400"
                />
                <div className="hidden sm:block">
    <div className="absolute w-20 h-20 -top-8 -right-8 z-5 bg-[url('/dot2.svg')]"></div>
    <div className="absolute w-20 h-20 -bottom-8 -left-8 z-5 bg-[url('/dot5.svg')]"></div>
  </div>
              </div>
          <div className="lg:ms-24">
            <h1>Hello</h1>
          </div>
        </div>
      </div>
      <div>
        <div className="grid lg:grid-cols-2 grid-cols-1n gap-6 items-center">
          <div
            className="order-2 lg:order-1 2xl:w-9/12"
            data-aos="fade-up"
            data-aos-duration={500}
          >
            <div className="h-12 w-12 bg-primary/10 flex items-center justify-center rounded-lg">
              <svg
                className="h-7 w-7 text-primary"
                viewBox="0 0 24 24"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                  <rect id="bound" x={0} y={0} width={24} height={24} />
                  <path
                    d="M10.8226874,8.36941377 L12.7324324,9.82298668 C13.4112512,8.93113547 14.4592942,8.4 15.6,8.4 C17.5882251,8.4 19.2,10.0117749 19.2,12 C19.2,13.9882251 17.5882251,15.6 15.6,15.6 C14.5814697,15.6 13.6363389,15.1780547 12.9574041,14.4447676 L11.1963369,16.075302 C12.2923051,17.2590082 13.8596186,18 15.6,18 C18.9137085,18 21.6,15.3137085 21.6,12 C21.6,8.6862915 18.9137085,6 15.6,6 C13.6507856,6 11.9186648,6.9294879 10.8226874,8.36941377 Z"
                    id="Combined-Shape"
                    fill="currentColor"
                    opacity="0.3"
                  />
                  <path
                    d="M8.4,18 C5.0862915,18 2.4,15.3137085 2.4,12 C2.4,8.6862915 5.0862915,6 8.4,6 C11.7137085,6 14.4,8.6862915 14.4,12 C14.4,15.3137085 11.7137085,18 8.4,18 Z"
                    id="Oval-14-Copy"
                    fill="currentColor"
                  />
                </g>
              </svg>
            </div>
            <h1 className="text-3xl/tight font-medium mt-6 mb-4">
              Smart Payroll. Paying your people couldn't be easier
            </h1>
            <p className="text-gray-500">
              You can modify your pages with drag-dropping , can import demos
              with just ” One Click” and can modify theme setting easy-to-use
              options panel.
            </p>
            
          </div>
          <div className="relative order-1 lg:order-2">
  <div className="hidden sm:block">
    <div className="absolute w-20 h-20 -top-8 -right-8 z-5 bg-[url('/dot2.svg')]"></div>
    <div className="absolute w-20 h-20 -bottom-8 -left-8 z-5 bg-[url('/dot5.svg')]"></div>
  </div>
  <Image 
    width={300}
    height={300}
    src="/images/hero/saas2.png"
    className="z-20" // Ensure this is higher than the dots' z-index
    alt="saas2"
    data-aos="fade-left"
    data-aos-duration="400"
  />
</div>

        </div>
      </div>
    </div>
  </div>
</section>

    </>
  )
}

export default WhyClicksalesmedia