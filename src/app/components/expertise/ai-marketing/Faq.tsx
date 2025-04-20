'use client'
import { AnimatePresence, motion } from "framer-motion";
import { FiPlus } from "react-icons/fi";
import React, { useState, useEffect } from "react";
import { useTranslation } from "@/app/hooks/useTranslation";
import { useLanguage } from "@/app/providers/LanguageProvider";

// Define the structure of each question
type QuestionType = {
  question: string;
  answer: string;
};

// Define the mapping type for the questions categorized by tabs
type QuestionsMap = {
  [key: string]: QuestionType[];
};

const FAQ: React.FC = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const isRTL = language === 'ar';
  
  // List of tabs as a constant array - these will be translated
  const TABS = [
    "PPC Ads Strategies", 
    "Paid Search", 
    "Performance Max", 
    "Google Shopping", 
    "Google My Business"
  ];

  // Use string type for tab
  type Tab = string;
  
  const [selected, setSelected] = useState<Tab>(TABS[0]);
  const [translatedTabs, setTranslatedTabs] = useState<string[]>([]);
  
  // Add this ref to track language changes
  const previousLanguageRef = React.useRef(language);

  // Update selected tab when language changes
  useEffect(() => {
    if (language !== previousLanguageRef.current) {
      setSelected(TABS[0]);
      previousLanguageRef.current = language;
    }
  }, [language, TABS]);

  // Debug translations
  useEffect(() => {
    console.log('Current language:', language);
    // Try to access a few translations to debug
    if (language === 'ar') {
      // The correct path is expertise.aiMarketing.faq.title
      console.log('Title translation attempt:', t('expertise.aiMarketing.faq.title' as any));
      console.log('Description translation attempt:', t('expertise.aiMarketing.faq.description' as any));
      console.log('Tab translation attempt:', t('expertise.aiMarketing.faq.tabs.PPCAdsStrategies' as any));
    }
  }, [language, t]);

  // Update tabs when language changes
  useEffect(() => {
    const translated = TABS.map((tab) => {
      try {
        // Normalize the key - convert to proper format for translation system
        // Based on the ar.json file structure, the correct path is expertise.aiMarketing.faq.tabs.KEY
        const tabKey = tab.replace(/\s+/g, '');
        
        // Try direct format first (PPCAdsStrategies)
        let translation = t(`expertise.aiMarketing.faq.tabs.${tabKey}` as any);
        if (translation && translation !== `expertise.aiMarketing.faq.tabs.${tabKey}`) {
          return translation;
        }
        
        // Log the issue and fallback to original
        console.warn(`Cannot find translation for tab "${tab}". Using original.`);
        return tab;
      } catch (e) {
        console.error(`Translation error for tab: ${tab}`, e);
        return tab;
      }
    });
    
    // Only update state if translations actually changed
    const translationsChanged = translated.some((translation, index) => 
      translation !== translatedTabs[index]
    );
    
    if (translationsChanged || translatedTabs.length === 0) {
      setTranslatedTabs(translated);
    }
  }, [language, t, translatedTabs, TABS]);

  return (
    <section className={`overflow-hidden bg-primaryColor px-4 py-12 text-slate-50 ${isRTL ? 'rtl' : 'ltr'}`}>
      <Heading />
      <Tabs TABS={TABS} translatedTabs={translatedTabs} selected={selected} setSelected={setSelected} isRTL={isRTL} />
      <Questions TABS={TABS} selected={selected} isRTL={isRTL} />
    </section>
  );
};

const Heading: React.FC = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const isRTL = language === 'ar';
  
  return (
    <>
      <div className={`flex flex-col justify-center text-center mx-auto md:max-w-3xl space-y-5 py-10 ${isRTL ? 'rtl' : 'ltr'}`}>
        <h1 className="font-semibold leading-tight text-slate-200 dark:text-white text-4xl sm:text-5xl lg:text-6xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-tr from-secondaryColor to-[#B28757]">
            {t('expertise.aiMarketing.faq.title' as any)}
          </span>
        </h1>
        <p className={`flex text-slate-200 dark:text-gray-300 tracking-tight md:font-normal max-w-xl mx-auto lg:max-w-none ${isRTL ? 'text-right justify-center' : ''}`}>
          {t('expertise.aiMarketing.faq.description' as any)}
        </p>
      </div>
    </>
  );
};

interface TabsProps {
  TABS: string[];
  translatedTabs: string[];
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  isRTL: boolean;
}

const Tabs: React.FC<TabsProps> = ({ TABS, translatedTabs, selected, setSelected, isRTL }) => {
  return (
    <div className={`relative z-10 flex flex-wrap items-center justify-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
      {TABS.map((tab, index) => (
        <button
          onClick={() => setSelected(tab)}
          className={`relative overflow-hidden whitespace-nowrap rounded-md border-[1px] px-3 py-1.5 text-sm font-medium transition-colors duration-500 ${
            selected === tab
              ? "border-[#c98727] text-slate-50"
              : "border-secondaryColor bg-transparent text-secondaryColor"
          }`}
          key={tab}
        >
          <span className="relative z-10">{translatedTabs[index] || tab}</span>
          <AnimatePresence>
            {selected === tab && (
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                exit={{ y: "100%" }}
                transition={{
                  duration: 0.5,
                  ease: "backIn",
                }}
                className="absolute inset-0 z-0 bg-gradient-to-r from-secondaryColor to-[#c9974f]"
              />
            )}
          </AnimatePresence>
        </button>
      ))}
    </div>
  );
};

interface QuestionsProps {
  TABS: string[];
  selected: string;
  isRTL: boolean;
}

const Questions: React.FC<QuestionsProps> = ({ TABS, selected, isRTL }) => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  
  // Generate questions for each tab
  const getQuestions = (tab: string) => {
    try {
      // Based on the ar.json file structure, the correct path is expertise.aiMarketing.faq.questions.KEY
      const tabKey = tab.replace(/\s+/g, '');
      const questionsCount = 4; // Each tab has 4 questions
      
      const questions: QuestionType[] = [];
      for (let i = 1; i <= questionsCount; i++) {
        try {
          const questionKey = `expertise.aiMarketing.faq.questions.${tabKey}.q${i}`;
          const answerKey = `expertise.aiMarketing.faq.questions.${tabKey}.a${i}`;
          
          const question = t(questionKey as any);
          const answer = t(answerKey as any);
          
          // Debug log the found translations
          if (language === 'ar') {
            console.log(`Attempted Q${i} translation for tab ${tab}:`, question, answer);
          }
          
          // Skip if either question or answer is missing or returns the key itself
          if (!question || !answer || 
              question === questionKey || 
              answer === answerKey ||
              question.includes(`expertise.aiMarketing.faq.questions`)) {
            console.warn(`Invalid translation for Q${i} in tab ${tab}`);
            continue;
          }
          
          questions.push({ question, answer });
        } catch (e) {
          console.error(`Translation error for question ${i} in tab ${tab}`, e);
          continue;
        }
      }
      
      return questions;
    } catch (e) {
      console.error(`Translation error for tab questions: ${tab}`, e);
      return [];
    }
  };
  
  return (
    <div className="mx-auto mt-12 max-w-3xl">
      <AnimatePresence mode="wait">
        {TABS.map((tab) => {
          if (selected !== tab) return null;
          
          const questions = getQuestions(tab);
          
          return (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{
                duration: 0.5,
                ease: "backIn",
              }}
              className="space-y-4"
              key={tab}
            >
              {questions.map((q, idx) => (
                <Question key={idx} {...q} isRTL={isRTL} />
              ))}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

interface QuestionProps extends QuestionType {
  isRTL: boolean;
}

const Question: React.FC<QuestionProps> = ({ question, answer, isRTL }) => {
  const [open, setOpen] = useState(false);

  // Define animation variants at component level
  const variants = {
    open: { rotate: "45deg" },
    closed: { rotate: "0deg" }
  };

  return (
    <motion.div
      variants={{
        open: { backgroundColor: "#222222" },
        closed: { backgroundColor: "#1E1E1E" }
      }}
      animate={open ? "open" : "closed"}
      className={`rounded-xl border-[1px] border-secondaryColor px-4 transition-colors`}
    >
      <button
        onClick={() => setOpen((pv) => !pv)}
        className={`flex w-full items-center justify-between gap-4 py-4 ${isRTL ? 'flex-row-reverse' : ''}`}
      >
        <span
          className={`text-lg font-medium transition-colors text-secondaryColor ${isRTL ? 'text-right' : 'text-left'}`}
        >
          {question}
        </span>
        <motion.span
          variants={variants}
          animate={open ? "open" : "closed"}
        >
          <FiPlus
            className="text-2xl text-secondaryColor"
          />
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{
          height: open ? "fit-content" : "0px",
          marginBottom: open ? "24px" : "0px",
        }}
        className={`overflow-hidden text-slate-400 ${isRTL ? 'text-right' : 'text-left'}`}
      >
        <p>{answer}</p>
      </motion.div>
    </motion.div>
  );
};

export default FAQ;





