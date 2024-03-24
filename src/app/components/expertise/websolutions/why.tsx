import Data from "@/app/ui/data";
import Image from "next/image";
import { FC } from "react";

// Define type for the advantages
type Advantage = {
    id: number;
    text: string;
  };
  
  // Define type for the feature
  type Feature = {
    id: number;
    title: string;
    description: string;
    advantages: Advantage[];
    icon: "cross" | "sync";
    image: string;
  };
 
  const iconRender = (val: "cross" | "sync"): JSX.Element => {
    switch (val) {
      case "cross":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path fillRule="evenodd" d="M2 3a1 1 0 00-1 1v1a1 1 0 001 1h16a1 1 0 001-1V4a1 1 0 00-1-1H2zm0 4.5h16l-.811 7.71a2 2 0 01-1.99 1.79H4.802a2 2 0 01-1.99-1.79L2 7.5zM10 9a.75.75 0 01.75.75v2.546l.943-1.048a.75.75 0 111.114 1.004l-2.25 2.5a.75.75 0 01-1.114 0l-2.25-2.5a.75.75 0 111.114-1.004l.943 1.048V9.75A.75.75 0 0110 9z" clipRule="evenodd" />
          </svg>
        );
      case "sync":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path fillRule="evenodd" d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.219-.53V2.929a.75.75 0 00-1.5 0V5.36l-.31-.31A7 7 0 003.239 8.188a.75.75 0 101.448.389A5.5 5.5 0 0113.89 6.11l.311.31h-2.432a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.219z" clipRule="evenodd" />
          </svg>
        );
      default:
        return <>No Icon</>;
    }
  };
 
const FeatureItem: FC<Feature> = ({ id, title, description, advantages, icon, image }) => {
return (
    <div className={`flex flex-col md:items-center gap-10 lg:gap-14 ${id%2===0? "md:flex-row" :"md:flex-row-reverse"}`}>
        <div className="md:w-[48%] xl:w-[45%] md:py-6 xl:py-12 space-y-8">
            <div className="space-y-6">
                <span className="p-2 rounded-md bg-purple-100 text-purple-700 dark:bg-gray-900 dark:text-purple-500 flex w-max">
                    {iconRender(icon)}
                </span>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {title}
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                    {description}
                </p>
            </div>
            <ul role="list" className="space-y-5 children:flex children:items-start children:gap-4 children:text-gray-600 dark:children:text-gray-400">
                {
                    advantages.map(advantage => (
                        <li key={advantage.id}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 fill-purple-600 dark:fill-purple-500">
                                <path fillRule="evenodd" d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                            </svg>
                            {advantage.text}
                        </li>
                    ))
                }
            </ul>
        </div>
        <div className="flex-1 relative bg-gradient-to-tr from-sky-100 to-indigo-300 
                  p-6 rounded-lg aspect-[4/2.4] overflow-hidden">
            <Image src={image} alt="illustration" width={1800} height={1000} className="w-full h-auto" />
        </div>
    </div>
)
}
const features: Feature[] = [
{
    id: 1,
    title: "All your patients record at one and same place",
    icon: "cross",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto deserunt culpa autem",
    advantages: [
        {
            id: 1,
            text: "Advantage of this feature"
        },
        {
            id: 2,
            text: "Advantage of this feature"
        },
        {
            id: 3,
            text: "Advantage of this feature"
        },
    ],
    image: "/websites/speed-website.jpg"
},
{
    id: 2,
    title: "Cross-plateforme based app, compatible with all Devices",
    icon: "cross",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto deserunt culpa autem",
    advantages: [
        {
            id: 1,
            text: "Advantage of this feature"
        },
        {
            id: 2,
            text: "Advantage of this feature"
        },
        {
            id: 3,
            text: "Advantage of this feature"
        },
    ],
    image: "/websites/speed-website.jpg"
},
{
    id: 3,
    title: "Stay sync, work without internet and then sync your data after",
    icon: "sync",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto deserunt culpa autem",
    advantages: [
        {
            id: 1,
            text: "Advantage of this feature"
        },
        {
            id: 2,
            text: "Advantage of this feature"
        },
        {
            id: 3,
            text: "Advantage of this feature"
        },
    ],
    image: "/websites/speed-website.jpg"
},
]
 
const Why: FC = () => {
return (
    <section className="py-32">
        <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-12 lg:px-5">
            <div className="flex flex-col  space-y-16">
                <div className="flex flex-col justify-center text-center  mx-auto md:max-w-2xl space-y-5">
                <Data sectionName="why" />
                </div>
                <div className="grid divide-y divide-gray-300/60 dark:divide-gray-800/30 gap-12 children:py-5 first:pt-0 last:pb-0">
                    {
                        features.map(feature=>(
                            <FeatureItem key={feature.id} {...feature}/>
                        ))
                    }
                </div>
            </div>
        </div>
    </section>
)
}
 
export default Why