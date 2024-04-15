"use client"
import ScrollAnimationWrapper from '@/app/ui/ScrollAnimationWrapper'
import Image from 'next/image'
import Link from 'next/link'

function About() {
  return (
    <ScrollAnimationWrapper>
    <section className="py-20 mt-14 sm:mt16 lg:mt-0">
    <div className="mx-auto lg:max-w-7xl w-full px-5 sm:px-10 md:px-12 lg:px-5 grid lg:grid-cols-2 lg:items-center gap-10">
      <div className="flex flex-col space-y-8 sm:space-y-10 lg:items-center text-center lg:text-left max-w-2xl md:max-w-3xl mx-auto">
        <h1 className=" font-semibold leading-tight text-slate-200 dark:text-white text-4xl sm:text-5xl lg:text-6xl">
          {"Your Business,"} <span className="text-transparent bg-clip-text bg-gradient-to-tr from-secondaryColor to-[#B28757]">Our Expertise.</span>
        </h1>
        <p className=" flex text-slate-200 dark:text-gray-300 tracking-tight md:font-normal max-w-xl mx-auto lg:max-w-none">
        Share with us your specific requirements, and our team of experts will create a personalized quote that perfectly aligns with your needs and vision.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 w-full">
          <Link href="#" className="px-6 font-semibold items-center h-12 rounded-md bg-gradient-to-br from-secondaryColor from-35% via-[#AD8253] via-35% to-[#8C5C28] text-white duration-300 ease-linear flex justify-center w-full sm:w-auto hover:bg-[#222222] hover:text-secondaryColor">
          Schedule a call
          </Link>
          <Link href="#" className="px-6 font-semibold items-center h-12 rounded-md text-secondaryColor border border-[#1c1c1c] dark:border-gray-800 dark:text-white bg-[#222222] dark:bg-gray-900 duration-300 ease-linear flex justify-center w-full sm:w-auto hover:bg-secondaryColor hover:text-[#222222]">
          Begin Your Journey
          </Link>
        </div>
        <div className="mt-5 flex items-center justify-center flex-wrap gap-4 lg:justify-start w-full">
          <Link href="#" target="_blank" rel='noreferer'>
            <Image width={600} height={120} src="/logo-partner-google.png" alt="client name" className="h-10 w-auto dark:grayscale" />
          </Link>
          <Link href="#" target="_blank" rel='noreferer'>
            <Image width={600} height={120} src="/logo-partner-meta.png" alt="client name" className="h-10 w-auto dark:grayscale" />
          </Link>
          <Link href="#" target="_blank" rel='noreferer'>
            <Image width={600} height={120} src="/logo-partner-hubspot.png" alt="client name" className="h-10 w-auto dark:grayscale" />
          </Link>
          <Link href="#" target="_blank" rel='noreferer'>
            <Image width={600} height={120} src="/logo-partner-semrush.png" alt="client name" className="h-10 w-auto dark:grayscale" />
          </Link>
        </div>
      </div>
      <div className="flex aspect-square lg:aspect-auto lg:h-[35rem] relative">
        <div className="w-3/5 h-[80%] rounded-3xl overflow-clip border-8 border-gray-200 dark:border-gray-950 z-30">
          <Image src="/creativehome.webp" alt="buildind plan image" width={1300} height={1300} className="w-full h-full object-cover z-30" />
        </div>
        <div className="absolute right-0 bottom-0 h-[calc(100%-50px)] w-4/5 rounded-3xl overflow-clip border-4 border-gray-200 dark:border-gray-800 z-10">
          <Image src="/background.jpg" alt="working-on-housing-project" height={1300} width={1300} className="z-10 w-full h-full object-cover" />
        </div>
      </div>
    </div>
  </section>
  </ScrollAnimationWrapper>
  )
}

export default About