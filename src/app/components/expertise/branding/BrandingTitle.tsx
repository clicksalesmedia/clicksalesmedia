'use client'
import { useLanguage } from "@/app/providers/LanguageProvider";

const BrandingTitle = () => {
  const { language } = useLanguage();
  
  return (
    <div className="max-w-3xl mx-auto text-center my-10 px-4">
      <h1 className="text-3xl md:text-4xl font-bold text-secondaryColor mb-4">
        {language === 'en' 
          ? "The Way Successful Brands Grow Strong" 
          : "الطريق لبناء علامات تجارية ناجحة وقوية"}
      </h1>
      <p className="text-whiteColor text-lg">
        {language === 'en'
          ? "Empower your potential, enhance your brand, optimize your resources, and broaden your reach to achieve market dominance. Shape Your Brand Future!"
          : "عزز إمكاناتك، وقوي علامتك التجارية، وحسن مواردك، ووسع نطاق وصولك لتحقيق الريادة في السوق. شكّل مستقبل علامتك التجارية!"}
      </p>
    </div>
  );
};

export default BrandingTitle;

 