import React from 'react';

function Why() {
  return (
    <div className="bg-primaryColor">
      <section id="features" className="relative block px-6 py-10 md:py-20 md:px-10">
        <div className="relative mx-auto max-w-5xl text-center">
          <h1 className="text-4xl font-semibold text-secondaryColor dark:text-white">
            Why <br />
            <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
              Web Animation
            </span>
          </h1>
        </div>
        <div className="relative mx-auto max-w-7xl z-10 grid grid-cols-1 gap-10 pt-14 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-md border border-neutral-800 bg-neutral-900/50 p-8 text-center shadow">
            <div
              className="button-text mx-auto flex h-12 w-12 items-center justify-center rounded-md border"
              style={{
                backgroundImage: "linear-gradient(rgb(195, 161, 119) 0%, rgb(148, 116, 77) 100%)",
                borderColor: "rgb(133, 103, 66)"
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-color-swatch"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M19 3h-4a2 2 0 0 0 -2 2v12a4 4 0 0 0 8 0v-12a2 2 0 0 0 -2 -2" />
                <path d="M13 7.35l-2 -2a2 2 0 0 0 -2.828 0l-2.828 2.828a2 2 0 0 0 0 2.828l9 9" />
                <path d="M7.3 13h-2.3a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h12" />
                <line x1={17} y1={17} x2={17} y2="17.01" />
              </svg>
            </div>
            <h3 className="mt-6 text-gray-400">User Experience</h3>
            <p className="my-4 mb-0 font-normal leading-relaxed tracking-wide text-gray-400">
              Web animations enhance user experience by making interactions more intuitive and engaging.
            </p>
          </div>
          <div className="rounded-md border border-neutral-800 bg-neutral-900/50 p-8 text-center shadow">
            <div
              className="button-text mx-auto flex h-12 w-12 items-center justify-center rounded-md border"
              style={{
                backgroundImage: "linear-gradient(rgb(195, 161, 119) 0%, rgb(148, 116, 77) 100%)",
                borderColor: "rgb(133, 103, 66)"
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-bolt"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <polyline points="13 3 13 10 19 10 11 21 11 14 5 14 13 3" />
              </svg>
            </div>
            <h3 className="mt-6 text-gray-400">Reduce Bounce Rate</h3>
            <p className="my-4 mb-0 font-normal leading-relaxed tracking-wide text-gray-400">
              Users stay longer on your website and bounce rates decrease with engaging animations.
            </p>
          </div>
          <div className="rounded-md border border-neutral-800 bg-neutral-900/50 p-8 text-center shadow">
            <div
              className="button-text mx-auto flex h-12 w-12 items-center justify-center rounded-md border"
              style={{
                backgroundImage: "linear-gradient(rgb(195, 161, 119) 0%, rgb(148, 116, 77) 100%)",
                borderColor: "rgb(133, 103, 66)"
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-tools"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M3 21h4l13 -13a1.5 1.5 0 0 0 -4 -4l-13 13v4" />
                <line x1="14.5" y1="5.5" x2="18.5" y2="9.5" />
                <polyline points="12 8 7 3 3 7 8 12" />
                <line x1={7} y1={8} x2="5.5" y2="9.5" />
                <polyline points="16 12 21 17 17 21 12 16" />
                <line x1={16} y1={17} x2="14.5" y2="18.5" />
              </svg>
            </div>
            <h3 className="mt-6 text-gray-400">Optimize Clicks</h3>
            <p className="my-4 mb-0 font-normal leading-relaxed tracking-wide text-gray-400">
              Animations guide users to click on important elements, optimizing their journey on your site.
            </p>
          </div>
          <div className="rounded-md border border-neutral-800 bg-neutral-900/50 p-8 text-center shadow">
            <div
              className="button-text mx-auto flex h-12 w-12 items-center justify-center rounded-md border"
              style={{
                backgroundImage: "linear-gradient(rgb(195, 161, 119) 0%, rgb(148, 116, 77) 100%)",
                borderColor: "rgb(133, 103, 66)"
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-chart-line"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M4 19h16" />
                <polyline points="4 15 8 9 12 11 16 6 20 10" />
              </svg>
            </div>
            <h3 className="mt-6 text-gray-400">Optimize Leads</h3>
            <p className="my-4 mb-0 font-normal leading-relaxed tracking-wide text-gray-400">
              Effective animations can lead users through your sales funnel, optimizing lead conversion.
            </p>
          </div>
          <div className="rounded-md border border-neutral-800 bg-neutral-900/50 p-8 text-center shadow">
            <div
              className="button-text mx-auto flex h-12 w-12 items-center justify-center rounded-md border"
              style={{
                backgroundImage: "linear-gradient(rgb(195, 161, 119) 0%, rgb(148, 116, 77) 100%)",
                borderColor: "rgb(133, 103, 66)"
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-info-circle"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <circle cx={12} cy={12} r={9} />
                <line x1={12} y1={8} x2="12.01" y2={8} />
                <polyline points="11 12 12 12 12 16 13 16" />
              </svg>
            </div>
            <h3 className="mt-6 text-gray-400">Explain Products and Services</h3>
            <p className="my-4 mb-0 font-normal leading-relaxed tracking-wide text-gray-400">
              Animations can simplify complex concepts, making it easier to explain products and services.
            </p>
          </div>
          <div className="rounded-md border border-neutral-800 bg-neutral-900/50 p-8 text-center shadow">
            <div
              className="button-text mx-auto flex h-12 w-12 items-center justify-center rounded-md border"
              style={{
                backgroundImage: "linear-gradient(rgb(195, 161, 119) 0%, rgb(148, 116, 77) 100%)",
                borderColor: "rgb(133, 103, 66)"
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-currency-dollar"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 3a7 7 0 0 1 7 7c0 4 -2.5 6 -7 7c-4.5 -1 -7 -3 -7 -7a7 7 0 0 1 7 -7" />
                <line x1={12} y1={11} x2={12} y2="11.01" />
                <line x1={12} y1={17} x2={12} y2="17.01" />
              </svg>
            </div>
            <h3 className="mt-6 text-gray-400">Increase ROI</h3>
            <p className="my-4 mb-0 font-normal leading-relaxed tracking-wide text-gray-400">
              Investing in web animations can lead to a higher return on investment by improving user engagement and conversions.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Why;
