import HoverEffect from "@/app/ui/card-hover-effect";
import FormService from "@/app/ui/modal";

const projects = [
    {
        title: "Research & Plan",
        description:
          "A technology company that focuses on building products that advance Facebook's mission of bringing the world closer together.",
        link: "https://meta.com",
        icon: "research"
      },
    {
        title: "Googole Ads",
        description: "A technology company that builds economic infrastructure for the internet.",
        link: "https://stripe.com",
        icon: "googleadsicon"
      },
      {
        title: "Google Analytics",
        description: "A streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.",
        link: "https://netflix.com",
        icon: "googleanalyticsicon"
      },
      {
        title: "Google Tag Manager",
        description:
          "A multinational technology company that specializes in Internet-related services and products.",
        link: "https://google.com",
        icon: "googletagmanager"
      },
      {
        title: "Remarketing Strategy",
        description:
          "A multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.",
        link: "https://amazon.com",
        icon: "remarketing"
      },
      {
        title: "Reports and Analysis",
        description:
          "A multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.",
        link: "https://microsoft.com",
        icon: "reports"
      },
]
 
const Features = () => {
return (
    <section className="py-10">
                 <div className="flex flex-col justify-center text-center  mx-auto md:max-w-3xl space-y-5">
                <h1 className=" font-semibold leading-tight text-slate-200 dark:text-white text-4xl sm:text-5xl lg:text-6xl">
                Our B2B<span className="text-transparent bg-clip-text bg-gradient-to-tr from-secondaryColor to-[#B28757]"> Services</span>
        </h1>
        <p className=" flex text-slate-200 dark:text-gray-300 tracking-tight md:font-normal max-w-xl mx-auto lg:max-w-none">
       Lorem ipsum dolor sit amet consectetur adipisicing elit. Non laudantium saepe culpa ipsam suscipit mollitia harum nam, adipisci modi unde voluptate laboriosam sunt pariatur molestiae alias possimus magnam iusto iure?
        </p>
            </div>
    <div className="container px-6 py-5 mx-auto">
      <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-10 xl:gap-14">
        <HoverEffect items={projects} />
      </div>
      <div className="flex items-center justify-center">
  <div className="flex flex-col justify-center text-center mx-auto md:max-w-3xl space-y-5">
  <FormService />
  </div>
</div>

    </div>
  </section>
)
}
export default Features


