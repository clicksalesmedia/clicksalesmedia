import Image from 'next/image'
import React from 'react'

function WebClicksalesmedia() {
  return (
    <>
    <section className='py-20'>
    <div className="container px-6 m-auto">
      <div className="grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12">
      <div className="col-span-4 lg:col-span-6">
      <object type="image/svg+xml" data="/svg/sv.svg">svg-animation</object>
        </div>
        <div className="col-span-4 lg:col-span-6 pt-40">
        <div>
                <span className="rounded-lg px-2.5 py-1 text-xs font-semibold tracking-wide text-whiteColor bg-gradient-to-br from-secondaryColor from-20% via-[#AD8253] via-30% to-[#8C5C28]">
                Interactive Web Animation
                </span>
                <h2 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Transform Your Website with Our Interactive Web Animation Packages
                </h2>
                <p className="mt-4 text-lg text-gray-300">
                {"Enhance user engagement, improve ROI, and boost your Google SEO with our comprehensive web animation strategy. Our expertly crafted animations not only captivate your audience but also provide a seamless and enjoyable user experience. Invest in our animation solutions today and see the difference in user retention and satisfaction."} </p>
              </div>
              <div className='pt-10'>
                {/* 
              <button
                   type="button"
                 className="text-white bg-gradient-to-r from-[#e2c3a1] via-secondaryColor to-[#af8054] hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                 >
                 Learn More
              </button>
                */}
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
                UI/UX Designs
                </span>
                <h2 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Revolutionize Your Online Presence with Our Creative UI/UX Designs
                </h2>
                <p className="mt-4 text-lg text-gray-300">
                {"we believe that a brilliant user interface goes beyond good looks, acting as a pivotal driver for sales and customer engagement. Our UI/UX design services focus on creating intuitive, visually appealing websites that not only capture your brand's essence but also facilitate an effortless user journey. By prioritizing usability and aesthetic appeal, we craft experiences that encourage visitors to explore, engage, and convert. With strategic design elements tailored to your specific audience, our designs do more than just stand out—they perform. Partner with us to transform your website into a dynamic tool that enhances user satisfaction and maximizes conversion rates."} </p>
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
                Maximize Your Online Success with High-Performance Websites
                </h2>
                <p className="mt-4 text-lg text-gray-300">
                we understand that the speed and performance of your website are crucial to retaining visitors and converting them into customers. A fast-loading site improves user experience, significantly lowers bounce rates, and enhances your SEO rankings, driving more traffic and engagement. Our team leverages the latest in web technology to optimize every aspect of your site, ensuring it operates at peak efficiency. From streamlined code to advanced caching solutions and responsive design, we provide a performance-optimized platform that not only loads quickly but also handles traffic surges with ease. Invest in speed and performance with us, and watch your business grow through superior digital experiences.                </p>
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
                Empower Your Business with Our Unique CRM and Web System Solutions
                </h2>
                <p className="mt-4 text-lg text-gray-300">
                we provide not just websites or web applications, but a comprehensive system integrated with a unique CRM tailored to your business needs. Our CRM solutions are designed to start bringing you clients and driving sales effectively from day one. By automating data collection and enhancing customer interactions, our systems ensure that every customer touchpoint is an opportunity for conversion. With advanced analytics and seamless integration, our CRM tools give you a detailed overview of customer behaviors and trends, enabling you to make informed decisions that boost efficiency and profitability. Choose our systems to transform your digital infrastructure into a robust engine for business growth.                </p>
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
