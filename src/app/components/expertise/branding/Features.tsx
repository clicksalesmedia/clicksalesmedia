import React from "react";

export default function BrandingFeatures() {
  return (
    <>
<section>
  <div className="px-6 m-auto">
    <div className="grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12">
      <div className="col-span-4 md:col-span-8 lg:col-span-12 bg-[#000000] p-20 flex flex-col items-center justify-center">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-secondaryColor md:text-5xl lg:text-6xl dark:text-white text-center">
        The Way Successful Brands Grow Strong
        </h1>
        <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400 text-center">
        Empower your potential, enhance your brand, optimize your resources, and broaden your reach to achieve market dominance.
        </p>
        <a
          href="#"
          className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-secondaryColor rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
        >
          Transform Your Brand Today
          <svg
            className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </a>
      </div>
    </div>
  </div>
</section>
        {/* Desktop Version */}
      <section className="hidden md:block">
        <div className="px-6 m-auto">
          <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12">
          <div className="col-span-4 lg:col-span-6 relative">
              <div
                style={{
                  backgroundImage: "url('/expertise/branding/brandstrategy.jpg')",
                  backgroundSize: 'cover', // Cover the entire div
                  backgroundPosition: 'center', // Center the background image
                }}
                className="bg-primaryColor w-full h-full"
              >
                {/* Overlay: You can adjust the opacity and color as needed */}
                <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                {/* Content of the column goes here, it will be on top of the overlay */}
              </div>
            </div>
            <div className="col-span-4 lg:col-span-6 bg-[#222222] p-20 py-80">
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-whiteColor md:text-5xl lg:text-6xl dark:text-white">
            Lost  {" "}
    <span className="text-secondaryColor dark:text-blue-500">revenue</span>{" "}
    ?
  </h1>
  <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
  Without an effective strategy, the money you spend on marketing will be wasted attempting to compete in an overcrowded market rather than building a niche within a crowd.
  </p>
            </div>
          </div>
        </div>
      </section>

      <section className="hidden md:block">
        <div className="px-6 m-auto">
          <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12">
          <div className="col-span-4 lg:col-span-6 bg-[#222222] p-20 py-60">
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-whiteColor md:text-5xl lg:text-6xl dark:text-white">
            A deep {" "}
    <span className="text-secondaryColor dark:text-blue-500">understand of your</span>{" "}
    brand.
  </h1>
  <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
  We immerse in your brand's history, goals, and culture to build a brand that will succeed. We define your goals, vision, values, audiences, and unique value propositions to help you develop your identity, niche, and future campaigns, and then design your stationary accordingly.
  </p>
            </div>
          <div className="col-span-4 lg:col-span-6 relative">
              <div
                style={{
                  backgroundImage: "url('/brandguidlines.jpg')",
                  backgroundSize: 'cover', // Cover the entire div
                  backgroundPosition: 'center', // Center the background image
                }}
                className="bg-primaryColor w-full h-full"
              >
                {/* Overlay: You can adjust the opacity and color as needed */}
                <div className="absolute inset-0 bg-black bg-opacity-60"></div>
                {/* Content of the column goes here, it will be on top of the overlay */}
              </div>
            </div>
          </div>
        </div>
      </section>

    {/* Mobile Version */}
      <section className="block md:hidden bg-primaryColor py-6 md:py-24">
        <div className="px-4 md:px-6 m-auto">
          <div className="grid grid-cols-1 md:grid-cols-8 lg:grid-cols-12 gap-4 md:gap-6">
            {/* Adjusting for mobile: Background image on the left for larger screens but on top for mobile */}
            <div className="md:col-span-4 lg:col-span-6">
              <div
                style={{
                  backgroundImage: "url('/expertise/branding/brandstrategy.jpg')",
                  backgroundSize: 'cover', // Adjust based on your preference
                  backgroundPosition: 'center',
                }}
                className="h-80 md:h-full bg-primaryColor w-full"
              >
                <div className="absolute inset-0 bg-black bg-opacity-30"></div>
              </div>
            </div>
            <div className="md:col-span-4 lg:col-span-6 bg-[#222222] p-10 md:p-20">
              <h1 className="text-2xl md:text-4xl font-extrabold leading-none tracking-tight text-white md:md:text-5xl lg:text-6xl">
                Get back to growth <span className="text-secondaryColor dark:text-blue-500">with the worlds #1 CRM.</span>
              </h1>
              <p className="mt-4 text-sm md:text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
                Here at Flowbite we focus on markets where technology, innovation, and
                capital can unlock long-term value and drive economic growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="block md:hidden bg-primaryColor py-6 md:py-24">
        <div className="px-4 md:px-6 m-auto">
          <div className="grid grid-cols-1 md:grid-cols-8 lg:grid-cols-12 gap-4 md:gap-6">
            {/* Adjusting for mobile: Background image on the left for larger screens but on top for mobile */}
            <div className="md:col-span-4 lg:col-span-6">
              <div
                style={{
                  backgroundImage: "url('/expertise/branding/brandstrategy.jpg')",
                  backgroundSize: 'cover', // Adjust based on your preference
                  backgroundPosition: 'center',
                }}
                className="h-80 md:h-full bg-primaryColor w-full"
              >
                <div className="absolute inset-0 bg-black bg-opacity-30"></div>
              </div>
            </div>
            <div className="md:col-span-4 lg:col-span-6 bg-[#222222] p-10 md:p-20">
              <h1 className="text-2xl md:text-4xl font-extrabold leading-none tracking-tight text-white md:md:text-5xl lg:text-6xl">
                Get back to growth <span className="text-secondaryColor dark:text-blue-500">with the worlds #1 CRM.</span>
              </h1>
              <p className="mt-4 text-sm md:text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
                Here at Flowbite we focus on markets where technology, innovation, and
                capital can unlock long-term value and drive economic growth.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
