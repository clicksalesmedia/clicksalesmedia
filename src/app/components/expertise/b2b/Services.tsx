import { Button } from 'flowbite-react'
import React from 'react'

function Services() {
  return (
    <section>
        <div className="relative overflow-hidden bg-primaryColor pt-16 pb-32 space-y-24">
  <div className="relative">
    <div className="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24 lg:px-8 ">
      <div className="mx-auto max-w-xl px-6 lg:mx-0 lg:max-w-none lg:py-16 lg:px-0 ">
        <div>
          <div>
          <span className="rounded-lg px-2.5 py-1 text-xs w-max mx-auto font-semibold tracking-wide text-whiteColor bg-gradient-to-br from-secondaryColor from-20% via-[#AD8253] via-30% to-[#8C5C28]">ROI Optimization</span>
          </div>
          <div className="mt-6">
            <h2 className="text-3xl font-bold tracking-tight text-white">
              We help you optimize your ROI
            </h2>
            <p className="mt-4 text-lg text-gray-300">
              The AI product utilizes advanced NLP algorithms to understand and
              interpret human language, enabling it to accurately process and
              analyze text-based inputs.
            </p>
            <Button>Hello test</Button>
          </div>
        </div>
      </div>
      <div className="mt-12 sm:mt-16 lg:mt-0">
        <div className="-mr-48 pl-6 md:-mr-16 lg:relative lg:m-0 lg:h-full lg:px-0">
          <img
            loading="lazy"
            width={647}
            height={486}
            className="w-full ring-1 ring-black ring-opacity-5 lg:absolute lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
            style={{ color: "transparent" }}
            src="/expertise/b2b/returen-on-investement.png"
          />
        </div>
      </div>
    </div>
  </div>
  <div className="relative">
    <div className="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24 lg:px-8 ">
      <div className="mx-auto max-w-xl px-6 lg:mx-0 lg:max-w-none lg:py-16 lg:px-0 lg:col-start-2">
        <div>
          <div>
          <span className="rounded-lg px-2.5 py-1 text-xs w-max mx-auto font-semibold tracking-wide text-whiteColor bg-gradient-to-br from-secondaryColor from-20% via-[#AD8253] via-30% to-[#8C5C28]">Our System</span>
          </div>
          <div className="mt-6">
            <h2 className="text-3xl font-bold tracking-tight text-white">
              Sentiment Analysis:
            </h2>
            <p className="mt-4 text-lg text-gray-300">
              The product has built-in sentiment analysis capabilities, allowing
              it to determine the sentiment (positive, negative, or neutral)
              expressed in text or customer feedback.
            </p>

          </div>
        </div>
      </div>
      <div className="mt-12 sm:mt-16 lg:mt-0">
        <div className="-ml-48 pr-6 md:-ml-16 lg:relative lg:m-0 lg:h-full lg:px-0">
          <img
            alt="Inbox user interface"
            loading="lazy"
            width={647}
            height={486}
            className="w-full ring-1 ring-black ring-opacity-5 lg:absolute lg:right-0 lg:h-full lg:w-auto lg:max-w-none"
            style={{ color: "transparent" }}
            src="/expertise/b2b/clicksalesmedia-system.png"
          />
        </div>
      </div>
    </div>
  </div>
  <div className="relative">
    <div className="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24 lg:px-8 ">
      <div className="mx-auto max-w-xl px-6 lg:mx-0 lg:max-w-none lg:py-16 lg:px-0 ">
        <div>
          <div>
          <span className="rounded-lg px-2.5 py-1 text-xs w-max mx-auto font-semibold tracking-wide text-whiteColor bg-gradient-to-br from-secondaryColor from-20% via-[#AD8253] via-30% to-[#8C5C28]">Customers Optimization</span>
          </div>
          <div className="mt-6">
            <h2 className="text-3xl font-bold tracking-tight text-white">
              We help you to convert your leads to contracts
            </h2>
            <p className="mt-4 text-lg text-gray-300">
              The AI product can generate human-like written content, summaries,
              or reports based on structured data or analysis results.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-12 sm:mt-16 lg:mt-0">
        <div className="-mr-48 pl-6 md:-mr-16 lg:relative lg:m-0 lg:h-full lg:px-0">
          <img
            loading="lazy"
            width={646}
            height={485}
            className="w-full ring-1 ring-black ring-opacity-5 lg:absolute lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
            style={{ color: "transparent" }}
            src="/expertise/b2b/contract.png"
          />
        </div>
      </div>
    </div>
  </div>
</div>

    </section>
  )
}

export default Services