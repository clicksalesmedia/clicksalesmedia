'use client';

import { useLanguage } from '../providers/LanguageProvider';
import { motion } from 'framer-motion';
import { IoLanguageOutline } from 'react-icons/io5';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    const newLang = language === 'ar' ? 'en' : 'ar';
    setLanguage(newLang);
  };

  return (
    <motion.button
      onClick={toggleLanguage}
      className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-full border-2 border-secondaryColor text-secondaryColor hover:bg-secondaryColor hover:text-primaryColor transition-all duration-300"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <IoLanguageOutline className="text-lg" />
      <span>{language === 'ar' ? 'English' : 'العربية'}</span>
    </motion.button>
  );
} 