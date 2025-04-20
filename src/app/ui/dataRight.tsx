'use client'
import { useTranslation } from "@/app/hooks/useTranslation";
import { useLanguage } from "@/app/providers/LanguageProvider";

// Defining an interface for the section structure
interface Section {
  titleKey: string;
  descriptionKey: string;
  highlightKey: string;
}

// Defining an interface for the sections object
interface Sections {
  [key: string]: Section;
}

// The sections data with explicit typing and translation keys
export const sections: Sections = {
// Social media management
  Social: {
      titleKey: "socialMediaSuccess.titlePrefix",
      descriptionKey: "socialMediaSuccess.description",
      highlightKey: "socialMediaSuccess.headline",
  },

  // Web solution
  WebPortfolio: {
    titleKey: "webPortfolio.title",
    descriptionKey: "webPortfolio.description",
    highlightKey: "webPortfolio.highlight",
  },
};

// TypeScript component with typed props
const DataRight: React.FC<{ sectionName: string }> = ({ sectionName }) => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const sectionData = sections[sectionName];

  if (!sectionData) {
      return null; // Handle cases where sectionName is not found
  }

  const { titleKey, descriptionKey, highlightKey } = sectionData;
  const textAlignment = language === 'ar' ? 'text-right' : 'text-left';

  return (
      <>
          <div className={`flex flex-col justify-left ${textAlignment} mx-auto md:max-w-3xl space-y-5`}>
              <h2 className="font-semibold font-cormorant text-3xl sm:text-4xl lg:text-5xl text-transparent bg-clip-text bg-gradient-to-br from-secondaryColor from-20% via-[#AD8253] via-30% to-[#8C5C28]">
                  {t(titleKey as any)} <span className="text-transparent bg-clip-text bg-gradient-to-br from-secondaryColor from-20% via-[#AD8253] via-30% to-[#8C5C28]">{t(highlightKey as any)}</span>
              </h2>
              <p className="text-whiteColor dark:text-gray-300">
                  {t(descriptionKey as any)}
              </p>
          </div>
      </>
  );
};

export default DataRight;
