'use client'
import { useTranslation } from "@/app/hooks/useTranslation";

const SocialMediaTitle = () => {
  const { t } = useTranslation();
  
  return (
    <div className="max-w-3xl mx-auto text-center my-10 px-4">
      <h1 className="text-3xl md:text-4xl font-bold text-secondaryColor mb-4">
        {t('socialMediaSuccess.headline')}
      </h1>
      <p className="text-whiteColor text-lg mb-4">
        {t('socialMediaSuccess.description')}
      </p>
      <p className="text-whiteColor text-lg font-semibold">
        {t('socialMediaSuccess.cta')}
      </p>
    </div>
  );
};

export default SocialMediaTitle; 