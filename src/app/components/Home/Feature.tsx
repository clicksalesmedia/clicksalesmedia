import Image from 'next/image'
import Data from "@/app/ui/data";
import { FaChessKnight } from "react-icons/fa";
import { TiSocialInstagram } from "react-icons/ti";
import { IoBusiness } from "react-icons/io5";
import { MdAutoGraph } from "react-icons/md";
import ScrollAnimationWrapper from '@/app/ui/ScrollAnimationWrapper';


function Feature() {
  return (
    <ScrollAnimationWrapper>
    <section className="py-20 relative">

        <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
        <Image 
          src="/svg/arrows.svg" // Assuming the SVG is located at public/arrows.svg
          alt="Arrows"
          width={45} // Adjust based on your SVG's size
          height={45} // Adjust based on your SVG's size
          layout="fixed"
        />
      </div>

    <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-12 lg:px-5">
        <div className="flex flex-col  space-y-16">
        <Data sectionName="features" />
            <div className="grid gap-14 md:grid-cols-2 lg:grid-cols-4 lg:items-center">
                <div className="order-1 grid gap-10 sm:grid-cols-2 md:order-1 md:grid-cols-1 lg:order-1">
                    <div className="flex flex-col space-y-6 justify-center md:justify-start">
                        <span className="p-2 rounded-md bg-secondaryColor text-whiteColor dark:bg-gray-900 dark:text-blue-500 flex w-max">
                            {/* feature icon */}
                            <FaChessKnight />
                        </span>
                        <h1 className="flex text-lg font-semibold capitalize text-secondaryColor dark:text-white">
                         Branding 
                        </h1>
                        <p className="text-sm font-light text-whiteColor dark:text-gray-300">
                        Where brands evolve. Unleash your potential, Empower your Brand, Optimize resources, and Expand your reach for market leadership.
                        </p>
                    </div>
                    <div className="flex flex-col space-y-6 justify-center md:justify-start">
                        <span className="p-2 rounded-md bg-secondaryColor text-whiteColor dark:bg-gray-900 dark:text-blue-500 flex w-max">
                            {/* feature icon */}
                            <TiSocialInstagram />
                        </span>
                        <h1 className="flex text-lg font-semibold capitalize text-secondaryColor dark:text-white">
                        Social Media Management
                        </h1>
                        <p className="text-sm font-light text-whiteColor dark:text-gray-300">
                        Unlock the potential of your online presence with our top-tier team of Social Media Management experts.
                        </p>
                    </div>
                </div>
                <div className="flex items-center justify-center order-3 md:col-span-2 lg:order-2 lg:row-span-2 lg:h-full">
                    <div className="flex-1 relative bg-gradient-to-tr from-sky-100 to-indigo-300 
              p-6 rounded-lg aspect-[4/2.4] overflow-hidden">
                        <Image src="/business-services.jpg"
                         alt="illustration"
                        className="wfull hauto"
                        fill={true}
                        
                        />
                    </div>
                </div>
                <div className="order-1 grid gap-10 sm:grid-cols-2 md:order-2 md:grid-cols-1 lg:order-3">
                    <div className="flex flex-col space-y-6 justify-center md:justify-start">
                        <span className="p-2 rounded-md bg-secondaryColor text-whiteColor dark:bg-gray-900 dark:text-blue-500 flex w-max">
                            {/* feature icon */}
                            <IoBusiness />
                        </span>
                        <h1 className="flex text-lg font-semibold capitalize text-secondaryColor dark:text-white">
                           B2B Marketing
                        </h1>
                        <p className="text-sm font-light text-whiteColor dark:text-gray-300">
                            Unlock B2B success with Click Sales Media. Streamline operations, ignite growth, and elevate your industry position with our strategic marketing solutions.
                        </p>
                    </div>
                    <div className="flex flex-col space-y-6 justify-center md:justify-start">
                        <span className="p-2 rounded-md bg-secondaryColor text-whiteColor dark:bg-gray-900 dark:text-blue-500 flex w-max">
                            {/* feature icon */}
                            <MdAutoGraph />
                        </span>
                        <h1 className="flex text-lg font-semibold capitalize text-secondaryColor dark:text-white">
                            Performance Management
                        </h1>
                        <p className="text-sm font-light text-whiteColor dark:text-gray-300">
                            {"Lorem Ipsum is simply dummy text of the printing and type setting industry. Industry's standard dummy"}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
</ScrollAnimationWrapper>
  )
}

export default Feature