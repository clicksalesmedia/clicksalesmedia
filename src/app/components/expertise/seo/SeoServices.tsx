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
    title: 'Responsive Design',
    description:
      'Wind UI ensures your web application looks and functions flawlessly on various devices, from smartphones to desktops.',
    imageUrl: "/expertise/icons/targeting.png", // Placeholder image URL
  },
  {
    title: 'Responsive Design',
    description:
      'Wind UI ensures your web application looks and functions flawlessly on various devices, from smartphones to desktops.',
    imageUrl: "/expertise/icons/backlinks.png", // Placeholder image URL
  },
  {
    title: 'Responsive Design',
    description:
      'Wind UI ensures your web application looks and functions flawlessly on various devices, from smartphones to desktops.',
    imageUrl: "/expertise/icons/speed-seo-website.png", // Placeholder image URL
  },
  {
    title: 'Responsive Design',
    description:
      'Wind UI ensures your web application looks and functions flawlessly on various devices, from smartphones to desktops.',
    imageUrl: "/expertise/icons/seo-keywords.png", // Placeholder image URL
  },
  {
    title: 'Responsive Design',
    description:
      'Wind UI ensures your web application looks and functions flawlessly on various devices, from smartphones to desktops.',
    imageUrl: "/expertise/icons/seo-analysis.png", // Placeholder image URL
  },
  {
    title: 'Responsive Design',
    description:
      'Wind UI ensures your web application looks and functions flawlessly on various devices, from smartphones to desktops.',
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
