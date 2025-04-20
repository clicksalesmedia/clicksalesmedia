'use client'
import FormService from "@/app/ui/modal";
import React from "react";
import { useLanguage } from "@/app/providers/LanguageProvider";

export default function BrandingFeatures() {
  const { language } = useLanguage();
  
  return (
    <>
<section>
  <div className="px-6 m-auto">
    <div className="grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12">
      <div className="col-span-4 md:col-span-8 lg:col-span-12 bg-[#000000] p-20 flex flex-col items-center justify-center">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-secondaryColor md:text-5xl lg:text-6xl dark:text-white text-center">
          {language === 'en' 
            ? "The Way Successful Brands Grow Strong" 
            : "الطريق لبناء علامات تجارية ناجحة وقوية"}
        </h1>
        <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400 text-center">
          {language === 'en'
            ? "Empower your potential, enhance your brand, optimize your resources, and broaden your reach to achieve market dominance."
            : "عزز إمكاناتك، وقوي علامتك التجارية، وحسن مواردك، ووسع نطاق وصولك لتحقيق الريادة في السوق."}
        </p>
        <FormService buttonText={language === 'en' ? "Shape Your Brand Future!" : "شكّل مستقبل علامتك التجارية!"} />
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
              {language === 'en' ? (
                <>
                Lost {" "}
                <span className="text-secondaryColor dark:text-blue-500">revenue</span>{" "}
                ?
                </>
              ) : (
                <>
                <span className="text-secondaryColor dark:text-blue-500">إيرادات</span>{" "}
                مفقودة؟
                </>
              )}
            </h1>
            <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
              {language === 'en' 
                ? "Without an effective strategy, the money you spend on marketing will be wasted attempting to compete in an overcrowded market rather than building a niche within a crowd."
                : "بدون استراتيجية فعالة، ستضيع الأموال التي تنفقها على التسويق في محاولة للمنافسة في سوق مزدحم بدلاً من بناء مكانة متخصصة داخل هذا الازدحام."}
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
              {language === 'en' ? (
                <>
                A deep {" "}
                <span className="text-secondaryColor dark:text-blue-500">understand of your</span>{" "}
                brand.
                </>
              ) : (
                <>
                فهم {" "}
                <span className="text-secondaryColor dark:text-blue-500">عميق لعلامتك</span>{" "}
                التجارية.
                </>
              )}
            </h1>
            <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
              {language === 'en'
                ? "We immerse in your brand's history, goals, and culture to build a brand that will succeed. We define your goals, vision, values, audiences, and unique value propositions to help you develop your identity, niche, and future campaigns, and then design your stationary accordingly."
                : "نغوص في تاريخ علامتك التجارية وأهدافها وثقافتها لبناء علامة تجارية ناجحة. نحدد أهدافك ورؤيتك وقيمك وجماهيرك وعروض القيمة الفريدة لمساعدتك في تطوير هويتك ومكانتك المتخصصة وحملاتك المستقبلية، ثم نصمم المواد المطبوعة وفقًا لذلك."}
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
                {language === 'en' ? (
                  <>
                  Lost <span className="text-secondaryColor dark:text-blue-500">revenue?</span>
                  </>
                ) : (
                  <>
                  <span className="text-secondaryColor dark:text-blue-500">إيرادات مفقودة؟</span>
                  </>
                )}
              </h1>
              <p className="mt-4 text-sm md:text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
                {language === 'en'
                  ? "Without an effective strategy, the money you spend on marketing will be wasted attempting to compete in an overcrowded market."
                  : "بدون استراتيجية فعالة، ستضيع الأموال التي تنفقها على التسويق في محاولة للمنافسة في سوق مزدحم."}
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
                {language === 'en' ? (
                  <>
                  A deep <span className="text-secondaryColor dark:text-blue-500">understanding of your brand.</span>
                  </>
                ) : (
                  <>
                  <span className="text-secondaryColor dark:text-blue-500">فهم عميق لعلامتك التجارية.</span>
                  </>
                )}
              </h1>
              <p className="mt-4 text-sm md:text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
                {language === 'en'
                  ? "We immerse in your brand's history, goals, and culture to build a brand that will succeed."
                  : "نغوص في تاريخ علامتك التجارية وأهدافها وثقافتها لبناء علامة تجارية ناجحة."}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
