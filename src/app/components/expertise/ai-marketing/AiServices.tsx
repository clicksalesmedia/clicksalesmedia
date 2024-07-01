import HoverEffect from "@/app/ui/card-hover-effect";
import FormService from "@/app/ui/modal";

const projects = [
    {
        title: "AI Performance Marketing",
        description:
          "Our AI-driven performance marketing solutions optimize your campaigns in real-time, ensuring maximum reach and engagement while minimizing costs.",
        link: "",
        icon: "research"
      },
    {
        title: "Conversion Rate Optimization (CRO)",
        description: "Utilize AI to analyze user behavior and optimize your website for higher conversion rates, turning more visitors into loyal customers.",
        link: "",
        icon: "googleadsicon"
      },
      {
        title: "Automation Scripts",
        description: "Streamline repetitive marketing tasks with our advanced automation scripts, allowing your team to focus on strategic growth initiatives.",
        link: "",
        icon: "googleanalyticsicon"
      },
      {
        title: "AI SEO",
        description:
          "Boost your search engine rankings with AI-powered SEO strategies that adapt to changing algorithms and deliver sustainable results.",
        link: "",
        icon: "googletagmanager"
      },
      {
        title: "PPC Ads by AI",
        description:
          "Maximize the effectiveness of your pay-per-click ads with AI that dynamically adjusts bids and targets to achieve the best possible ROI.",
        link: "",
        icon: "remarketing"
      },
      {
        title: "Auto Blogging",
        description:
          "Generate high-quality, SEO-friendly content automatically with our AI-driven auto blogging solutions, keeping your website fresh and engaging.",
        link: "",
        icon: "remarketing"
      },
      {
        title: "Email Marketing",
        description:
          "Leverage AI to personalize email campaigns, increase open rates, and drive conversions with targeted, data-driven content.",
        link: "",
        icon: "remarketing"
      },
      {
        title: "Lead Generation",
        description:
          "Use AI to identify and attract high-quality leads, optimizing your sales funnel and increasing your conversion rates efficiently.",
        link: "",
        icon: "remarketing"
      },
      {
        title: "Social Media AI",
        description:
          "Enhance your social media presence with AI tools that automate posting, analyze engagement, and optimize your content strategy for better results.",
        link: "",
        icon: "reports"
      },
]
 
const AiServices = () => {
return (
    <section className="py-10">
                 <div className="flex flex-col justify-center text-center  mx-auto md:max-w-3xl space-y-5">
                <h1 className=" font-semibold leading-tight text-slate-200 dark:text-white text-4xl sm:text-5xl lg:text-6xl">
                AI<span className="text-transparent bg-clip-text bg-gradient-to-tr from-secondaryColor to-[#B28757]"> Marketing Services</span>
        </h1>
        <p className=" flex text-slate-200 dark:text-gray-300 tracking-tight md:font-normal max-w-xl mx-auto lg:max-w-none">
        {"At ClickSalesMedia, we are dedicated to transforming the marketing landscape through automation and artificial intelligence. Our mission is to help companies achieve quick and effective results"}
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


