import HoverEffect from "@/app/ui/card-hover-effect";
import FormService from "@/app/ui/modal";

const projects = [
    {
        title: "Research & Plan",
        description:
          "Before diving into the digital realm, we research and plan every step to ensure your campaign's success. From understanding your audience to creating the perfect strategy, we're with you every step of the way.",
        link: "",
        icon: "research"
      },
    {
        title: "Googole Ads",
        description: "Reach your target audience where they spend most of their time – online. With Google Ads, we create compelling campaigns that drive traffic, leads, and conversions, helping your business thrive in the digital landscape.",
        link: "",
        icon: "googleadsicon"
      },
      {
        title: "Google Analytics",
        description: "Discover the power of data with Google Analytics. Gain valuable insights into your website's performance, user behavior, and conversion rates. With this knowledge, we optimize your strategies for maximum impact and growth.",
        link: "",
        icon: "googleanalyticsicon"
      },
      {
        title: "Google Tag Manager",
        description:
          "Simplify your tracking and analytics processes with Google Tag Manager. Seamlessly manage tags, pixels, and scripts on your website, ensuring accurate data collection and streamlined performance tracking.",
        link: "",
        icon: "googletagmanager"
      },
      {
        title: "Remarketing Strategy",
        description:
          "Re-engage with past visitors and turn them into loyal customers with our remarketing strategy. By strategically targeting users who have interacted with your brand, we keep your business top-of-mind and drive repeat conversions.",
        link: "",
        icon: "remarketing"
      },
      {
        title: "Reports and Analysis",
        description:
          "Track your progress and measure your success with our comprehensive reporting and analysis services. From campaign performance to audience demographics, we provide actionable insights that inform your future strategies and drive continuous improvement.",
        link: "",
        icon: "reports"
      },
]
 
const AiServices = () => {
return (
    <section className="py-10">
                 <div className="flex flex-col justify-center text-center  mx-auto md:max-w-3xl space-y-5">
                <h1 className=" font-semibold leading-tight text-slate-200 dark:text-white text-4xl sm:text-5xl lg:text-6xl">
                Our Google<span className="text-transparent bg-clip-text bg-gradient-to-tr from-secondaryColor to-[#B28757]"> Marketing Services</span>
        </h1>
        <p className=" flex text-slate-200 dark:text-gray-300 tracking-tight md:font-normal max-w-xl mx-auto lg:max-w-none">
        {"We believe in transparency. Your investment deserves clarity — knowing where it's allocated, what's effective, and where adjustments are needed. We develop personalized dashboards for real-time insights into your ad campaigns. Our aim is to simplify the process, providing straightforward access to key metrics such as ad spend, conversions, calls, and ROI."}
        </p>
            </div>
    <div className="container px-6 py-5 mx-auto">
      <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-10 xl:gap-14">
        <HoverEffect items={projects} />
      </div>
      <div className="flex items-center justify-center">
  <div className="flex flex-col justify-center text-center mx-auto md:max-w-3xl space-y-5">
  <FormService buttonText="Boost Your ROI Today!" />
  </div>
</div>

    </div>
  </section>
)
}
export default AiServices


