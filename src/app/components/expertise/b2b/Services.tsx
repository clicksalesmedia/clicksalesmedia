import React from 'react';

function Services() {
  return (
    <section className="w-full">
      <div className="relative overflow-hidden bg-primaryColor pt-16 pb-32 space-y-24">
        {/* First Section: ROI Optimization */}
        <div className="relative px-4 sm:px-6 lg:px-8">
          <div className="lg:mx-auto lg:max-w-7xl lg:grid lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24">
            <div className="px-4 py-16 sm:px-6 lg:py-20 lg:px-8 xl:py-24">
              <div>
                <span className="rounded-lg px-2.5 py-1 text-xs font-semibold tracking-wide text-whiteColor bg-gradient-to-br from-secondaryColor from-20% via-[#AD8253] via-30% to-[#8C5C28]">
                  ROI Optimization
                </span>
                <h2 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  We help you optimize your ROI
                </h2>
                <p className="mt-4 text-lg text-gray-300">
                  The AI product utilizes advanced NLP algorithms to understand and
                  interpret human language, enabling it to accurately process and
                  analyze text-based inputs.
                </p>
              </div>
            </div>
            <div className="mt-12 sm:mt-16 lg:mt-0 lg:col-start-2">
              <div className="flex justify-center lg:justify-end">
                <img
                  alt="ROI Optimization"
                  loading="lazy"
                  className="w-full max-w-md ring-1 ring-black ring-opacity-5 lg:w-auto"
                  src="/expertise/b2b/returen-on-investement.png"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Second Section: Our System */}
        <div className="relative px-4 sm:px-6 lg:px-8">
          <div className="lg:mx-auto lg:max-w-7xl lg:grid lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24 lg:col-start-2">
            <div className="px-4 py-16 sm:px-6 lg:py-20 lg:px-8 xl:py-24 lg:col-start-2">
              <div>
                <span className="rounded-lg px-2.5 py-1 text-xs font-semibold tracking-wide text-whiteColor bg-gradient-to-br from-secondaryColor from-20% via-[#AD8253] via-30% to-[#8C5C28]">
                  Our System
                </span>
                <h2 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Sentiment Analysis
                </h2>
                <p className="mt-4 text-lg text-gray-300">
                  The product has built-in sentiment analysis capabilities, allowing
                  it to determine the sentiment (positive, negative, or neutral)
                  expressed in text or customer feedback.
                </p>
              </div>
            </div>
            <div className="mt-12 sm:mt-16 lg:mt-0">
              <div className="flex justify-center lg:justify-start">
                <img
                  alt="Our System"
                  loading="lazy"
                  className="w-full max-w-md ring-1 ring-black ring-opacity-5 lg:w-auto"
                  src="/expertise/b2b/clicksalesmedia-system.png"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Third Section: Customers Optimization */}
        <div className="relative px-4 sm:px-6 lg:px-8">
          <div className="lg:mx-auto lg:max-w-7xl lg:grid lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24">
            <div className="px-4 py-16 sm:px-6 lg:py-20 lg:px-8 xl:py-24">
              <div>
                <span className="rounded-lg px-2.5 py-1 text-xs font-semibold tracking-wide text-whiteColor bg-gradient-to-br from-secondaryColor from-20% via-[#AD8253] via-30% to-[#8C5C28]">
Customers Optimization
</span>
<h2 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl">
We help you to convert your leads to contracts
</h2>
<p className="mt-4 text-lg text-gray-300">
The AI product can generate human-like written content, summaries,
or reports based on structured data or analysis results, significantly
enhancing lead conversion processes.
</p>
</div>
</div>
<div className="mt-12 sm:mt-16 lg:mt-0 lg:col-start-2">
<div className="flex justify-center lg:justify-end">
<img
               alt="Customers Optimization"
               loading="lazy"
               className="w-full max-w-md ring-1 ring-black ring-opacity-5 lg:w-auto"
               src="/expertise/b2b/contract.png"
             />
</div>
</div>
</div>
</div>
</div>
</section>
);
}

export default Services;