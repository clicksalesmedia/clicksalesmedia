import Image from "next/image"
import Link from "next/link"
 
const ContentSection = () => {
return (
    <section className="py-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-12 lg:px-5 flex flex-col md:flex-row gap-16">
            <div className="md:w-1/2 space-y-12 text-whiteColor dark:text-gray-300 md:py-8">
                <h1 className="text-secondaryColor dark:text-white font-semibold text-2xl sm:text-3xl md:text-4xl">
                Social Media Management
                </h1>
                <p className="text-whiteColor">
                Our social media management services aim to empower your brand fully in the diverse and competitive digital landscape. We set up your social media accounts, considering the visual strategies and identity that align with your brand. This service also includes comprehensive content planning, scheduling, and goal setting for your brand.
                </p>

                <p className="text-whiteColor">
                Our social media management strategy also involves crafting integrated and engaging content strategies that highlight your brand’s identity, along with posting schedules and the objectives you seek to achieve. We believe in the power of paid advertising on social media and offer services to design paid advertising strategies on all platforms. We create strategies to maximize reach and engagement to ensure your brand’s objectives are met.
                </p>

                <p className="text-whiteColor">
                We place great importance on analyzing your competitors in the social media field through a detailed study of their strategies, evaluating their audience engagement tactics, and monitoring the growth of the audiences they target.
                </p>

                <div className="flex">
                    <Link href="#" className="px-5 h-11 flex items-center bg-secondaryColor dark:bg-gray-100 rounded-xs text-white dark:text-gray-900">
                        Know more
                    </Link>
                </div>
            </div>
            <div className="flex md:flex-1">
                <Image src="/social/social.png" alt="creative agency " width={1300} height={900} className="w-full md:h-full object-cover rounded-lg" />
            </div>
        </div>
    </section>
)
}
export default ContentSection