import Image from 'next/image'
import React from 'react'

function SocialFeatures() {
  return (
    <div className="bg-primaryColor pb-10">
  <div
    aria-hidden="true"
    className="absolute inset-0 h-max w-full m-auto grid grid-cols-2 -space-x-52 opacity-20"
  >
    <div className="blur-[106px] h-56 bg-gradient-to-br  to-primaryColor from-[#222222]" />
    <div className="blur-[106px] h-32 bg-gradient-to-r from-[#222222]  to-primaryColor" />
  </div>
  <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
    <div className="mt-16 grid divide-x divide-y  divide-secondaryColor overflow-hidden  rounded-3xl border text-gray-600 border-secondaryColor sm:grid-cols-2 lg:grid-cols-4  lg:divide-y-0 xl:grid-cols-4">
      <div className="group relative bg-primaryColor transition hover:z-[1] hover:shadow-2xl  hover:shadow-gray-600/10">
        <div className="relative space-y-8 py-12 p-8">
          <Image
            alt=''
            src="/social/instagram-icon.svg"
            loading="lazy"
            width={200}
            height={200}
            className="w-12 h-12"
            style={{ color: "transparent" }}
          />
          <div className="space-y-2">
            <h5 className="text-xl font-semibold text-secondaryColor transition group-hover:text-secondary">
              Preparation Face
            </h5>
            <p className="text-gray-300">
            Setting the foundation for success, our Preparation Phase ensures all tools, strategies, and goals are perfectly aligned. This stage is all about creating a solid groundwork to support innovative breakthroughs.
            </p>
          </div>
        </div>
      </div>
      <div className="group relative bg-primaryColor transition hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10">
        <div className="relative space-y-8 py-12 p-8">
          <Image
            alt=''
            src="/social/social-media-ads-icon.svg"
            loading="lazy"
            width={200}
            height={200}
            className="w-12 h-12"
            style={{ color: "transparent" }}
          />
          <div className="space-y-2">
            <h5 className="text-xl font-semibold text-secondaryColor transition group-hover:text-secondary">
              Testing Face
            </h5>
            <p className="text-gray-300">
            Dedicated to quality and precision, the Testing Phase involves thorough evaluations to guarantee the reliability and effectiveness of our solutions. We test rigorously today to ensure a flawless performance tomorrow.
            </p>
          </div>
        </div>
      </div>
      <div className="group relative bg-primaryColor transition hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10">
        <div className="relative space-y-8 py-12 p-8">
          <Image
            alt=''
            src="/social/social-media-managment-icon.svg"
            loading="lazy"
            width={200}
            height={200}
            className="w-12 h-12"
            style={{ color: "transparent" }}
          />
          <div className="space-y-2">
            <h5 className="text-xl font-semibold text-secondaryColor transition group-hover:text-secondary">
              Optimization Face
            </h5>
            <p className="text-gray-300">
            In the Optimization Phase, we focus on refining and enhancing our processes to achieve peak performance. This stage is crucial for turning good results into great outcomes through meticulous improvements.
            </p>
          </div>
        </div>
      </div>
      <div className="group relative bg-primaryColor transition hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10">
        <div className="relative space-y-8 py-12 p-8">
          <Image
            alt=''
            src="/social/social-media-scale.svg"
            loading="lazy"
            width={200}
            height={200}
            className="w-12 h-12"
            style={{ color: "transparent" }}
          />
          <div className="space-y-2">
            <h5 className="text-xl font-semibold text-secondaryColor transition group-hover:text-secondary">
              Scaling up Face
            </h5>
            <p className="text-gray-300">
            Expanding horizons in the Scaling Up Phase, we take our validated solutions to new markets and broader audiences. Watch as we grow our reach and impact on a global scale.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  )
}

export default SocialFeatures