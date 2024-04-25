import Data from '@/app/ui/data';
import Image from 'next/image';
import React from 'react';


interface FeatureItem {
  title: string;
  description: string;
  imageUrl: string; 
}


const features: FeatureItem[] = [
  {
    title: 'Research and plan',
    description:
      "We do extensive research on industry trends, customer behavior, and competition analysis to create a strategic content roadmap that is perfect for your company's objectives.",
    imageUrl: "/expertise/icons/targeting.png", 
  },
  {
    title: 'SEO strategy implementation',
    description:
      "Improve your web page visibility with our SEO content strategy and execution services. We use innovative techniques to improve your website's exposure and enhance organic traffic, assuring long-term success in the digital world.",
    imageUrl: "/expertise/icons/backlinks.png", 
  },
  {
    title: 'Technical and Performance Analysis',
    description:
      "Our technical and performance study analyzes the complexities of your website's structure. From page speed  to mobile responsiveness, we discover and fix technical issues to improve the user experience and performance in general.",
    imageUrl: "/expertise/icons/speed-seo-website.png", 
  },
  {
    title: 'Keywords Plan and Analysis',
    description:
      'Our complete keyword plan and research will help you maximize the power of your keywords. We carefully research and choose relevant keywords specific to your industry and target demographic, then optimize your content for greatest exposure and communication.',
    imageUrl: "/expertise/icons/seo-keywords.png", // Placeholder image URL
  },
  {
    title: 'Results Analysis',
    description:
      'Our results analysis services provide helpful details about the success of your marketing activities. We analyze key performance measures, evaluate data patterns, and make practical suggestions to help refine tactics and promote continual progress.',
    imageUrl: "/expertise/icons/seo-analysis.png", // Placeholder image URL
  },
  {
    title: 'Traffic and ROI Strategy',
    description:
      'Our traffic and ROI approach maximizes investment returns. We create tailored strategies to attract quality customers, improve website traffic, and optimize conversion rates, resulting in a meaningful impact on your bottom line.',
    imageUrl: "/expertise/icons/result-seo-clicksalesmedia.png", // Placeholder image URL
  },
  
];

// Step 2: Create the functional component
const SeoServices: React.FC = () => {
  return (
    <section>
      <div className="container px-6 m-auto">
        <div className='mt-20'>
        <Data sectionName='seoServices' />
        </div>
        <div className="grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12">
          {features.map((feature, index) => (
            <div key={index} className="col-span-4">
              <div className="flex flex-col items-center gap-4 text-center">
                <div>
                  <Image
                    src={feature.imageUrl}
                    width={100}
                    height={100}
                    alt={`${feature.title} icon`}
                  />
                </div>
                <div className="flex w-full min-w-0 flex-col items-center justify-center gap-0 text-base">
                  <h3 className="mb-2 py-2 text-lg leading-6 text-secondaryColor">{feature.title}</h3>
                  <p className="text-whiteColor">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SeoServices;
