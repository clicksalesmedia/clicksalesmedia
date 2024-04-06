import HoverEffect from "@/app/ui/card-hover-effect";

const projects = [
    {
        title: "Branding",
        description:
          "A technology company that focuses on building products that advance Facebook's mission of bringing the world closer together.",
        link: "",
        icon: "branding"
      },
    {
        title: "Account Based Marketing",
        description: "A technology company that builds economic infrastructure for the internet.",
        link: "",
        icon: "sales"
      },
      {
        title: "Lead Generation",
        description: "A streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.",
        link: "",
        icon: "target-leadgen"
      },
      {
        title: "Strategy",
        description:
          "A multinational technology company that specializes in Internet-related services and products.",
        link: "",
        icon: "strategy"
      },
      {
        title: "Demand Generation",
        description:
          "A multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.",
        link: "",
        icon: "demand-generation"
      },
      {
        title: "Sales Enablement",
        description:
          "A multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.",
        link: "",
        icon: "sales-enablement"
      },
      {
        title: "Content Management",
        description:
          "A multinational technology company that specializes in Internet-related services and products.",
        link: "",
        icon: "content-management"
      },
      {
        title: "Ads Management",
        description:
          "A multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.",
        link: "",
        icon: "ads-management"
      },
      {
        title: "Innovation",
        description:
          "A multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.",
        link: "",
        icon: "innovation"
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
    </div>
  </section>
)
}
export default Features


