'use client'
import { AnimatePresence, motion } from "framer-motion";
import { FiPlus } from "react-icons/fi";
import React, { useState, useEffect } from "react";
import { useLanguage } from '@/app/providers/LanguageProvider';

// Define the structure of each question
type QuestionType = {
  question: string;
  answer: string;
};

// Define the mapping type for the questions categorized by tabs
type QuestionsMap = {
  [key: string]: QuestionType[];
};

// Translations object with tab names and content for both languages
const localTranslations = {
  en: {
    title: "FAQ",
    description: "Explore key insights on enhancing your website's search engine performance!",
    tabs: ["SEO On-page", "SEO Off-page", "Technical SEO", "Tracking and Reports"],
    questions: {
      "SEO On-page": [
        {
          question: "What is on-page SEO and why is it important?",
          answer:
            "On-page SEO involves optimizing web page content for search engines and users. Common on-page SEO practices include optimizing title tags, content, internal links, and URLs. It's crucial for enhancing search visibility and user experience.",
        },
        {
          question: "How do you optimize meta descriptions and title tags?",
          answer:
            "We craft compelling meta descriptions and title tags that incorporate targeted keywords, align with the content on the page, and are optimized for the maximum click-through rate.",
        },
        {
          question: "What role do keywords play in on-page SEO?",
          answer:
            "Keywords are fundamental to on-page SEO. We conduct thorough keyword research to find the best terms for your content, ensuring they are effectively integrated to match user search intent.",
        },
        {
          question: "How do you ensure content quality for SEO?",
          answer:
            "We focus on creating informative, engaging, and well-structured content that serves the user's intent, incorporates strategic keyword usage, and aligns with Google's quality guidelines.",
        },
      ],
      "SEO Off-page": [
        {
          question: "What are the key components of off-page SEO?",
          answer:
            "Off-page SEO primarily involves link building, social media strategy, and managing local listings. These elements help improve the site's reputation and authority by securing credible backlinks and social media mentions.",
        },
        {
          question: "How do you approach link building?",
          answer:
            "We use a variety of techniques including guest blogging, broken link building, and creating shareable content. Our focus is on obtaining high-quality links from reputable and relevant websites.",
        },
        {
          question: "What impact do social signals have on SEO?",
          answer:
            "Social signals such as likes, shares, and comments may indirectly influence a site's search rankings by increasing online visibility and traffic to the site.",
        },
        {
          question: "How does influencer collaboration enhance SEO?",
          answer:
            "Collaborating with influencers can amplify your content's reach, generate social signals, and attract quality backlinks, all of which can boost SEO performance.",
        },
      ],
      "Technical SEO": [
        {
          question: "What is technical SEO?",
          answer:
            "Technical SEO refers to website and server optimizations that help search engine spiders crawl and index your site more effectively to improve organic rankings.",
        },
        {
          question: "How do you optimize site speed?",
          answer:
            "We enhance site speed by new technologies, optimizing images, leveraging browser caching, reducing server response time, and utilizing content distribution networks (CDNs).",
        },
        {
          question: "What are the common technical issues that affect SEO?",
          answer:
            "Common issues include slow site speed, duplicate content, broken links, and poor mobile optimization. We identify and resolve these issues to improve SEO performance.",
        },
        {
          question: "How important is mobile optimization for SEO today?",
          answer:
            "Extremely important. Mobile optimization is crucial as more users access the internet via mobile devices. Sites must be responsive and fast-loading to provide a good user experience and rank well.",
        },
      ],
      "Tracking and Reports": [
        {
          question: "How do you track SEO performance?",
          answer:
            "We use tools like Google Analytics and Google Search Console to monitor various metrics such as traffic, rankings, and conversions to assess the effectiveness of SEO strategies.",
        },
        {
          question: "What kind of SEO reports do you provide to clients?",
          answer:
            "We provide detailed reports that cover all key performance indicators, including ranking improvements, traffic data, and ROI from SEO efforts. These reports help clients understand the value we bring.",
        },
        {
          question: "How often do you review and adjust SEO strategies?",
          answer:
            "We conduct monthly reviews of our strategies based on the data collected and adjust as needed to continuously optimize performance and tackle new challenges.",
        },
        {
          question: "Can you measure the impact of SEO on overall business growth?",
          answer:
            "Yes, through analytics and tracking, we correlate SEO efforts with increases in website traffic, better quality leads, and higher conversion rates, showing the direct impact on business growth.",
        },
      ],
    }
  },
  ar: {
    title: "الأسئلة الشائعة",
    description: "استكشف الرؤى الرئيسية حول تحسين أداء محرك البحث لموقع الويب الخاص بك!",
    tabs: ["تحسين الصفحة", "تحسين خارج الصفحة", "تحسين محركات البحث التقني", "التتبع والتقارير"],
    questions: {
      "تحسين الصفحة": [
        {
          question: "ما هو تحسين محركات البحث داخل الصفحة ولماذا هو مهم؟",
          answer:
            "يتضمن تحسين محركات البحث داخل الصفحة تحسين محتوى صفحة الويب لمحركات البحث والمستخدمين. تشمل ممارسات تحسين محركات البحث داخل الصفحة الشائعة تحسين علامات العنوان والمحتوى والروابط الداخلية وعناوين URL. من الضروري تعزيز الرؤية في محركات البحث وتجربة المستخدم.",
        },
        {
          question: "كيف تقومون بتحسين الأوصاف التعريفية وعلامات العنوان؟",
          answer:
            "نقوم بصياغة أوصاف تعريفية وعلامات عنوان جذابة تتضمن الكلمات المفتاحية المستهدفة، وتتماشى مع المحتوى الموجود على الصفحة، وتم تحسينها للحصول على أقصى معدل نقر.",
        },
        {
          question: "ما هو دور الكلمات المفتاحية في تحسين محركات البحث داخل الصفحة؟",
          answer:
            "الكلمات المفتاحية أساسية لتحسين محركات البحث داخل الصفحة. نجري بحثًا شاملاً عن الكلمات المفتاحية للعثور على أفضل المصطلحات لمحتواك، مما يضمن دمجها بشكل فعال لمطابقة نية بحث المستخدم.",
        },
        {
          question: "كيف تضمنون جودة المحتوى لتحسين محركات البحث؟",
          answer:
            "نركز على إنشاء محتوى إعلامي وجذاب ومنظم جيدًا يخدم نية المستخدم، ويتضمن استخدامًا استراتيجيًا للكلمات المفتاحية، ويتوافق مع إرشادات الجودة من جوجل.",
        },
      ],
      "تحسين خارج الصفحة": [
        {
          question: "ما هي المكونات الرئيسية لتحسين محركات البحث خارج الصفحة؟",
          answer:
            "يتضمن تحسين محركات البحث خارج الصفحة بشكل أساسي بناء الروابط واستراتيجية وسائل التواصل الاجتماعي وإدارة القوائم المحلية. تساعد هذه العناصر في تحسين سمعة الموقع وسلطته من خلال تأمين روابط خلفية موثوقة وذكر في وسائل التواصل الاجتماعي.",
        },
        {
          question: "كيف تتعاملون مع بناء الروابط؟",
          answer:
            "نستخدم مجموعة متنوعة من التقنيات بما في ذلك التدوين الضيف وبناء الروابط المكسورة وإنشاء محتوى قابل للمشاركة. تركيزنا هو الحصول على روابط عالية الجودة من مواقع ذات سمعة طيبة وذات صلة.",
        },
        {
          question: "ما تأثير إشارات التواصل الاجتماعي على تحسين محركات البحث؟",
          answer:
            "قد تؤثر إشارات التواصل الاجتماعي مثل الإعجابات والمشاركات والتعليقات بشكل غير مباشر على تصنيفات البحث للموقع من خلال زيادة الرؤية عبر الإنترنت وحركة المرور إلى الموقع.",
        },
        {
          question: "كيف يعزز التعاون مع المؤثرين أداء تحسين محركات البحث؟",
          answer:
            "يمكن للتعاون مع المؤثرين تضخيم وصول المحتوى الخاص بك، وتوليد إشارات اجتماعية، وجذب روابط خلفية عالية الجودة، وكل ذلك يمكن أن يعزز أداء تحسين محركات البحث.",
        },
      ],
      "تحسين محركات البحث التقني": [
        {
          question: "ما هو تحسين محركات البحث التقني؟",
          answer:
            "يشير تحسين محركات البحث التقني إلى تحسينات الموقع والخادم التي تساعد عناكب محرك البحث على زحف وفهرسة موقعك بشكل أكثر فعالية لتحسين التصنيفات العضوية.",
        },
        {
          question: "كيف تقومون بتحسين سرعة الموقع؟",
          answer:
            "نعزز سرعة الموقع من خلال التقنيات الجديدة، وتحسين الصور، والاستفادة من التخزين المؤقت للمتصفح، وتقليل وقت استجابة الخادم، واستخدام شبكات توزيع المحتوى (CDNs).",
        },
        {
          question: "ما هي المشكلات التقنية الشائعة التي تؤثر على تحسين محركات البحث؟",
          answer:
            "تشمل المشكلات الشائعة بطء سرعة الموقع، والمحتوى المكرر، والروابط المكسورة، وضعف التحسين للجوال. نحدد ونحل هذه المشكلات لتحسين أداء تحسين محركات البحث.",
        },
        {
          question: "ما مدى أهمية تحسين الجوال لتحسين محركات البحث اليوم؟",
          answer:
            "مهم للغاية. تحسين الجوال أمر بالغ الأهمية حيث يصل المزيد من المستخدمين إلى الإنترنت عبر الأجهزة المحمولة. يجب أن تكون المواقع متجاوبة وسريعة التحميل لتوفير تجربة مستخدم جيدة والتصنيف بشكل جيد.",
        },
      ],
      "التتبع والتقارير": [
        {
          question: "كيف تتتبعون أداء تحسين محركات البحث؟",
          answer:
            "نستخدم أدوات مثل Google Analytics و Google Search Console لمراقبة المقاييس المختلفة مثل حركة المرور والتصنيفات والتحويلات لتقييم فعالية استراتيجيات تحسين محركات البحث.",
        },
        {
          question: "ما نوع تقارير تحسين محركات البحث التي تقدمونها للعملاء؟",
          answer:
            "نقدم تقارير مفصلة تغطي جميع مؤشرات الأداء الرئيسية، بما في ذلك تحسينات التصنيف وبيانات حركة المرور والعائد على الاستثمار من جهود تحسين محركات البحث. تساعد هذه التقارير العملاء على فهم القيمة التي نقدمها.",
        },
        {
          question: "كم مرة تراجعون وتعدلون استراتيجيات تحسين محركات البحث؟",
          answer:
            "نجري مراجعات شهرية لاستراتيجياتنا بناءً على البيانات التي تم جمعها ونعدل حسب الحاجة لتحسين الأداء باستمرار ومعالجة التحديات الجديدة.",
        },
        {
          question: "هل يمكنكم قياس تأثير تحسين محركات البحث على نمو الأعمال العام؟",
          answer:
            "نعم، من خلال التحليلات والتتبع، نربط جهود تحسين محركات البحث بالزيادات في حركة مرور الموقع، وتحسين جودة العملاء المحتملين، وارتفاع معدلات التحويل، مما يظهر التأثير المباشر على نمو الأعمال.",
        },
      ],
    }
  }
};

const FAQ: React.FC = () => {
  const { language } = useLanguage();
  const [isRTL, setIsRTL] = useState(false);
  const [TABS, setTABS] = useState<string[]>(localTranslations.en.tabs);
  const [QUESTIONS, setQUESTIONS] = useState<QuestionsMap>(localTranslations.en.questions);
  const [selected, setSelected] = useState<string>("");

  useEffect(() => {
    // Check document direction after component mounts
    setIsRTL(document.documentElement.dir === 'rtl');
    
    // Set content based on current language
    if (language === 'ar') {
      setTABS(localTranslations.ar.tabs);
      setQUESTIONS(localTranslations.ar.questions);
    } else {
      setTABS(localTranslations.en.tabs);
      setQUESTIONS(localTranslations.en.questions);
    }
    
    // Reset the selected tab when language changes
    setSelected(language === 'ar' ? localTranslations.ar.tabs[0] : localTranslations.en.tabs[0]);
    
    console.log('FAQ - Current language:', language);
  }, [language]);

  const textDirection = isRTL ? 'rtl' : 'ltr';
  const textAlign = isRTL ? 'text-right' : 'text-left';

  return (
    <section className="overflow-hidden bg-primaryColor px-4 py-12 text-slate-50">
      <Heading language={language} />
      <Tabs tabs={TABS} selected={selected} setSelected={setSelected} isRTL={isRTL} />
      <Questions selected={selected} questions={QUESTIONS} isRTL={isRTL} textDirection={textDirection} textAlign={textAlign} />
    </section>
  );
};

interface HeadingProps {
  language: string;
}

const Heading: React.FC<HeadingProps> = ({ language }) => {
  return (
    <>
      <div className="flex flex-col justify-center text-center mx-auto md:max-w-3xl space-y-5 py-10">
        <h1 className="font-semibold leading-tight text-slate-200 dark:text-white text-4xl sm:text-5xl lg:text-6xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-tr from-secondaryColor to-[#B28757]">
            {language === 'ar' ? localTranslations.ar.title : localTranslations.en.title}
          </span>
        </h1>
        <p className="flex text-slate-200 dark:text-gray-300 tracking-tight md:font-normal max-w-xl mx-auto lg:max-w-none">
          {language === 'ar' ? localTranslations.ar.description : localTranslations.en.description}
        </p>
      </div>
    </>
  );
};

interface TabsProps {
  tabs: string[];
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  isRTL: boolean;
}

const Tabs: React.FC<TabsProps> = ({ tabs, selected, setSelected, isRTL }) => {
  return (
    <div className="relative z-10 flex flex-wrap items-center justify-center gap-4" dir={isRTL ? 'rtl' : 'ltr'}>
      {tabs.map((tab) => (
        <button
          onClick={() => setSelected(tab)}
          className={`relative overflow-hidden whitespace-nowrap rounded-md border-[1px] px-3 py-1.5 text-sm font-medium transition-colors duration-500 ${
            selected === tab
              ? "border-[#c98727] text-slate-50"
              : "border-secondaryColor bg-transparent text-secondaryColor"
          }`}
          key={tab}
        >
          <span className="relative z-10">{tab}</span>
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
  selected: string;
  questions: QuestionsMap;
  isRTL: boolean;
  textDirection: string;
  textAlign: string;
}

const Questions: React.FC<QuestionsProps> = ({ selected, questions, isRTL, textDirection, textAlign }) => {
  return (
    <div className="mx-auto mt-12 max-w-3xl" dir={textDirection}>
    <AnimatePresence mode="wait">
      {Object.entries(questions).map(([tab, questionsList]) => {
        return selected === tab ? (
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
            {questionsList.map((q, idx) => (
              <Question key={idx} question={q.question} answer={q.answer} textAlign={textAlign} />
            ))}
          </motion.div>
        ) : undefined;
      })}
    </AnimatePresence>
  </div>
  );
};

interface QuestionProps extends QuestionType {
  textAlign: string;
}

const Question: React.FC<QuestionProps> = ({ question, answer, textAlign }) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      animate={open ? "open" : "closed"}
      className={`rounded-xl border-[1px] border-secondaryColor px-4 transition-colors ${
        open ? "bg-[#222222]" : "bg-[#1E1E1E]"
      }`}
    >
      <button
        onClick={() => setOpen((pv) => !pv)}
        className="flex w-full items-center justify-between gap-4 py-4"
      >
        <span
          className={`${textAlign} text-lg font-medium transition-colors ${
            open ? "text-secondaryColor" : "text-secondaryColor"
          }`}
        >
          {question}
        </span>
        <motion.span
          variants={{
            open: {
              rotate: "45deg",
            },
            closed: {
              rotate: "0deg",
            },
          }}
        >
          <FiPlus
            className={`text-2xl transition-colors ${
              open ? "text-secondaryColor" : "text-secondaryColor"
            }`}
          />
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{
          height: open ? "fit-content" : "0px",
          marginBottom: open ? "24px" : "0px",
        }}
        className={`overflow-hidden text-slate-400 ${textAlign}`}
      >
        <p>{answer}</p>
      </motion.div>
    </motion.div>
  );
};

export default FAQ;





