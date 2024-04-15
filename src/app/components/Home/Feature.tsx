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
                        <h3 className="flex text-lg font-semibold capitalize text-secondaryColor dark:text-white">
                         Branding 
                        </h3>
                        <p className="text-sm font-light text-whiteColor dark:text-gray-300">
                        We simply need to highlight the brand value and establish your market position to foster long-term business growth, to cultivate maximum brand awareness, trust, and loyalty.
                        </p>
                    </div>
                    <div className="flex flex-col space-y-6 justify-center md:justify-start">
                        <span className="p-2 rounded-md bg-secondaryColor text-whiteColor dark:bg-gray-900 dark:text-blue-500 flex w-max">
                            {/* feature icon */}
                            <TiSocialInstagram />
                        </span>
                        <h3 className="flex text-lg font-semibold capitalize text-secondaryColor dark:text-white">
                        Social Media Management
                        </h3>
                        <p className="text-sm font-light text-whiteColor dark:text-gray-300">
                        We'll maintain fidelity to your brand's values and tone as we produce content that helps you engage with new audiences and stay connected with your existing customers.
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
                            <MdAutoGraph />
                        </span>
                        <h3 className="flex text-lg font-semibold capitalize text-secondaryColor dark:text-white">
                        Efficient project management
                        </h3>
                        <p className="text-sm font-light text-whiteColor dark:text-gray-300">
                        Optimize workflows, adhere to timelines, and accomplish objectives using our tailored system.
                        </p>
                    </div>
                    <div className="flex flex-col space-y-6 justify-center md:justify-start">
                        <span className="p-2 rounded-md bg-secondaryColor text-whiteColor dark:bg-gray-900 dark:text-blue-500 flex w-max">
                            {/* feature icon */}
                            <IoBusiness />
                        </span>
                        <h3 className="flex text-lg font-semibold capitalize text-secondaryColor dark:text-white">
                        Achieve success in the B2B sphere
                        </h3>
                        <p className="text-sm font-light text-whiteColor dark:text-gray-300">
                            Streamline operations, fuel growth, and elevate industry standing with strategic marketing expertise.
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