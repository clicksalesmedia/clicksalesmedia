'use client'
import ButtonGen from "@/app/ui/button";

interface FeatureItemProps {
    title: string;
    description: string;
    icon: string; 
    id: string | number; 
  }
 
const iconRender = (val: string) => {
switch (val) {
    case "stat-ico":
        return (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
            </svg>
        )
    default:
        return <>No Icon</>;
}
}
 
const FeatureItem: React.FC<FeatureItemProps> = ({ title, description, icon, id }) => {
return (
    <div className={
        ` space-y-4 
        ${id === 1 ? "sm:pr-4 pb-4"
            : id === 2 ? "pt-4 sm:pt-0 sm:pl-4 pb-4 sm:!border-t-transparent"
                : id === 3 ? "sm:pr-4 pt-4 sm:!border-l-transparent" : "sm:pl-4 pt-4"}
        `
    }>
        <span className="p-2 rounded-md bg-secondaryColor text-whiteColor dark:bg-gray-900 dark:text-blue-500 flex w-max">
            {iconRender(icon)}
        </span>
        <h1 className="flex text-lg font-semibold capitalize text-secondaryColor dark:text-white">
            {title}
        </h1>
        <p className="text-sm font-light text-whiteColor dark:text-gray-300">
            {description}
        </p>
    </div>
)
}
const features = [
{
    id: 1,
    title: "Feature 1",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto deserunt culpa autem",
    icon: "stat-ico"
},
{
    id: 2,
    title: "Feature 2",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto deserunt culpa autem",
    icon: "stat-ico"
},
{
    id: 3,
    title: "Feature 3",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto deserunt culpa autem",
    icon: "stat-ico"
},
{
    id: 4,
    title: "Feature 4",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto deserunt culpa autem",
    icon: "stat-ico"
},

]
 
const Features = () => {
return (
    <section className="py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-12 lg:px-5">
            <div className="mt-16 flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-10 xl:gap-14">
                <div className="lg:w-[55%] lg:items-center grid sm:grid-cols-2  sm:divide-x divide-y divide-secondaryColor dark:divide-gray-800">
                    {
                        features.map(feature => (
                            <FeatureItem key={feature.id} {...feature} />
                        ))
                    }
                </div>
                <div className="flex-1 py-10 lg:py-8 space-y-8 max-w-2xl">
                    <h2 className="text-4xl font-semibold text-secondaryColor dark:text-white">
                        Stay focus to your business strategagy
                    </h2>
                    <p className="text-whiteColor dark:text-gray-300 max-w-md">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi assumenda rem inventore odit quibusdam pariatur explicabo vel temporibus
                    </p>
                    <div className="flex">
                       <ButtonGen />
                    </div>
                </div>
            </div>
        </div>
    </section>
)
}
 
export default Features