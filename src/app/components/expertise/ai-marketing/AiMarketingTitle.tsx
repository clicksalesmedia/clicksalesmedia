'use client'
import { useLanguage } from "@/app/providers/LanguageProvider";

const AiMarketingTitle = () => {
  const { language } = useLanguage();
  
  return (
    <div className="max-w-3xl mx-auto text-center my-10 px-4">
      <h1 className="text-3xl md:text-4xl font-bold text-secondaryColor mb-4">
        {language === 'en' 
          ? "AI-Powered Marketing Solutions" 
          : "حلول تسويقية مدعومة بالذكاء الاصطناعي"}
      </h1>
      <p className="text-whiteColor text-lg">
        {language === 'en'
          ? "Leverage the power of artificial intelligence to optimize your marketing strategies, automate processes, and drive measurable results."
          : "استفد من قوة الذكاء الاصطناعي لتحسين استراتيجياتك التسويقية، وأتمتة العمليات، وتحقيق نتائج قابلة للقياس."}
      </p>
    </div>
  );
};

export default AiMarketingTitle; 