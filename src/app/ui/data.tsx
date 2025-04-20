'use client';

import { useTranslation } from "@/app/hooks/useTranslation";

// Defining an interface for the section structure
interface Section {
  title: string;
  description: string;
  highlight: string;
  subTitle: string;
}

// Defining an interface for the sections object
interface Sections {
  [key: string]: Section;
}

// The sections data with explicit typing
export const sections: Sections = {

    //Home
  services: {
      title: "webPortfolio.title",
      description: "webPortfolio.description",
      highlight: "webPortfolio.highlight",
      subTitle: "webPortfolio.subTitle"
  },
  about: {
      title: "aboutSection.title",
      description: "aboutSection.description",
      highlight: "aboutSection.highlight",
      subTitle: "aboutSection.subTitle"
  },
  // Add other sections following the same structure...
  // Example for brevity:
  features: {
      subTitle: "feature.subTitle",
      title: "feature.title",
      highlight: "feature.highlight",
      description: "feature.description"
  },

  // Expertise:
  //-Websolution:
  why: {
    subTitle: "webSolutions.why.subTitle",
    title: "webSolutions.why.title",
    highlight: "webSolutions.why.highlight",
    description: "webSolutions.why.description"
  },

  // Expertise:
  //-seo:
  seoServices: {
    subTitle: "seo.subTitle",
    title: "seo.pageTitle",
    highlight: "seo.highlight",
    description: "seo.pageDescription"
  },

  // B2B Industries
  B2bIndustries: {
    title: "b2b.industries.title",
    subTitle: "b2b.industries.subTitle",
    description: "b2b.industries.description",
    highlight: "b2b.industries.highlight"
  },

  //Schedule a meeting
  scheduleMeeting: {
    subTitle: "meeting.subTitle",
    title: "meeting.title",
    highlight: "meeting.highlight",
    description: "meeting.description"
  }
};

// TypeScript component with typed props
const Data: React.FC<{ sectionName: string }> = ({ sectionName }) => {
  const { t } = useTranslation();
  const sectionData = sections[sectionName];

  if (!sectionData) {
      return null; // Handle cases where sectionName is not found
  }

  const { title, subTitle, description, highlight } = sectionData;

  // Type assertion to ensure TypeScript compatibility with the t function
  type TranslationKey = Parameters<typeof t>[0];

  return (
      <>
          <div className="flex flex-col justify-center text-center  mx-auto md:max-w-3xl space-y-5">
              <span className="rounded-lg px-2.5 py-1 text-xs w-max mx-auto font-semibold tracking-wide text-whiteColor bg-gradient-to-br from-secondaryColor from-20% via-[#AD8253] via-30% to-[#8C5C28]">
                {t(subTitle as TranslationKey)}
              </span>
              <h2 className="font-semibold font-cormorant text-3xl sm:text-4xl lg:text-5xl text-whiteColor dark:text-white">
                  {t(title as TranslationKey)} <span className="text-transparent bg-clip-text bg-gradient-to-br from-secondaryColor from-20% via-[#AD8253] via-30% to-[#8C5C28]">{t(highlight as TranslationKey)}</span>
              </h2>
              <p className="text-whiteColor dark:text-gray-300">
                  {t(description as TranslationKey)}
              </p>
          </div>
      </>
  );
};

export default Data;
