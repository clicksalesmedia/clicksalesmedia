'use client'
import { AnimatePresence, motion } from "framer-motion";
import { FiPlus } from "react-icons/fi";
import React, { useState, useEffect } from "react";
import { useLanguage } from "@/app/providers/LanguageProvider";
import { useTranslation } from "@/app/hooks/useTranslation";

// Define the structure of each question
type QuestionType = {
  question: string;
  answer: string;
};

// Define the mapping type for the questions categorized by tabs
type QuestionsMap = {
  [key: string]: QuestionType[];
};

// Get translations from i18n files and keep them in the component
const getLocalTranslations = (language: string): {
  title: string;
  description: string;
  tabs: string[];
  questions: QuestionsMap;
} => {
  const isArabic = language === 'ar';

  // Define tabs in both languages
  const tabs = isArabic 
    ? [
        "استراتيجيات إعلانات الدفع لكل نقرة",
        "البحث المدفوع",
        "الأداء الأقصى",
        "جوجل شوبينج",
        "نشاطي التجاري على جوجل"
      ]
    : [
        "PPC Ads Strategies",
        "Paid Search",
        "Performance Max",
        "Google Shopping",
        "Google My Business"
      ];

  // Define questions for each tab based on language
  const questions: QuestionsMap = {};
  
  // PPC Ads Strategies questions
  questions[tabs[0]] = isArabic
    ? [
        {
          question: "ما هي العناصر الأساسية لحملة إعلانية ناجحة بنظام الدفع لكل نقرة؟",
          answer: "تتضمن الحملة الإعلانية الناجحة بنظام الدفع لكل نقرة اختيار الكلمات المفتاحية بعناية، ونصوص إعلانية جذابة، وصفحات هبوط محسنة، وإدارة استراتيجية للمزايدات لتحقيق أقصى عائد على الاستثمار."
        },
        {
          question: "كيف تحددون الميزانية المناسبة لحملة إعلانية بنظام الدفع لكل نقرة؟",
          answer: "نقوم بتقييم أهداف عملك، والجمهور المستهدف، والمشهد التنافسي لتحديد ميزانية تعظم الظهور والتحويلات مع الحفاظ على فعالية التكلفة."
        },
        {
          question: "ما هي الاستراتيجيات التي تستخدمونها لتحسين أداء إعلانات الدفع لكل نقرة؟",
          answer: "نستخدم اختبار A/B، وتحسين الكلمات المفتاحية، وتحليلات الأداء لتحسين الإعلانات باستمرار وضمان تفاعلها مع الجمهور المستهدف وتحقيق النتائج."
        },
        {
          question: "كيف تضمنون وصول إعلانات الدفع لكل نقرة إلى الجمهور المقصود؟",
          answer: "نستفيد من خيارات الاستهداف المتقدمة بما في ذلك الفلاتر الديموغرافية والجغرافية والنفسية، فضلاً عن تقنيات إعادة الاستهداف لضمان رؤية الإعلانات من قبل المستخدمين الأكثر صلة."
        }
      ]
    : [
        {
          question: "What are the key elements of a successful PPC campaign?",
          answer: "A successful PPC campaign involves careful keyword selection, compelling ad copy, optimized landing pages, and strategic bid management to maximize ROI."
        },
        {
          question: "How do you determine the right budget for a PPC campaign?",
          answer: "We assess your business goals, target audience, and competitive landscape to set a budget that maximizes visibility and conversions while maintaining cost-efficiency."
        },
        {
          question: "What strategies do you use to improve PPC ad performance?",
          answer: "We utilize A/B testing, keyword refinement, and performance analytics to continually optimize ads and ensure they resonate with the target audience and drive results."
        },
        {
          question: "How do you ensure PPC ads reach the intended audience?",
          answer: "We leverage advanced targeting options including demographic, geographic, and psychographic filters, as well as retargeting techniques to ensure ads are seen by the most relevant users."
        }
      ];
  
  // Paid Search questions
  questions[tabs[1]] = isArabic
    ? [
        {
          question: "ما الذي يميز البحث المدفوع عن أشكال الإعلان الرقمي الأخرى؟",
          answer: "يستهدف البحث المدفوع المستخدمين الذين يبحثون بنشاط عن منتجاتك أو خدماتك، مما يوفر ظهورًا فوريًا واستجابة مباشرة مقارنةً بأنواع الإعلانات الرقمية ذات النطاق الأوسع."
        },
        {
          question: "كيف تحسنون إعلانات البحث المدفوع لتحقيق معدلات تحويل عالية؟",
          answer: "نركز على استهداف الكلمات المفتاحية بدقة، وإنشاء نصوص إعلانية جذابة، وتصميم صفحات هبوط سهلة الاستخدام ومحسنة للتحويلات."
        },
        {
          question: "ما هي المقاييس الأكثر أهمية في قياس فعالية البحث المدفوع؟",
          answer: "تشمل المقاييس الرئيسية معدل النقر (CTR)، وتكلفة النقرة (CPC)، ومعدل التحويل، والعائد على الإنفاق الإعلاني (ROAS)، والتي تساعدنا في قياس نجاح الحملة ومجالات التحسين."
        },
        {
          question: "ما هي سرعة ظهور النتائج من حملات البحث المدفوع؟",
          answer: "يمكن رؤية النتائج غالبًا بعد فترة وجيزة من إطلاق الحملة نظرًا للطبيعة الفورية للبحث المدفوع، مع تعزيز الأداء مع مرور الوقت من خلال التحسينات المستمرة."
        }
      ]
    : [
        {
          question: "What distinguishes paid search from other forms of digital advertising?",
          answer: "Paid search targets users actively searching for your products or services, offering immediate visibility and direct response compared to broader-reaching digital ad types."
        },
        {
          question: "How do you optimize paid search ads for high conversion rates?",
          answer: "We focus on precise keyword targeting, crafting engaging ad copy, and designing user-friendly landing pages that are optimized for conversions."
        },
        {
          question: "What metrics are most important in measuring paid search effectiveness?",
          answer: "Key metrics include Click-Through Rate (CTR), Cost Per Click (CPC), Conversion Rate, and Return on Ad Spend (ROAS), which help us gauge campaign success and areas for improvement."
        },
        {
          question: "How quickly can we see results from paid search campaigns?",
          answer: "Results can often be seen shortly after campaign launch due to the immediate nature of paid search, with ongoing optimizations enhancing performance over time."
        }
      ];
  
  // Performance Max questions
  questions[tabs[2]] = isArabic
    ? [
        {
          question: "ما هو الأداء الأقصى من جوجل، وكيف يفيد المعلنين؟",
          answer: "الأداء الأقصى هو نوع من حملات إعلانات جوجل التي تستخدم الذكاء الاصطناعي لتحسين وضع الإعلانات عبر جميع منصات جوجل. يعمل على تحقيق أقصى قيمة للتحويل من خلال العثور تلقائيًا على أفضل الاستراتيجيات أداءً."
        },
        {
          question: "كيف تقومون بإعداد حملة الأداء الأقصى؟",
          answer: "يتضمن الإعداد تحديد أهداف الحملة، وتحميل الأصول مثل الصور ومقاطع الفيديو، وتوفير مجموعة من إجراءات التحويل التي سيستهدفها الذكاء الاصطناعي من جوجل."
        },
        {
          question: "ما الذي يجعل الأداء الأقصى مختلفًا عن حملات الدفع لكل نقرة القياسية؟",
          answer: "يستخدم الأداء الأقصى التعلم الآلي لتعديل المزايدات والأماكن والاستهداف تلقائيًا عبر كل مخزون جوجل، مما يمكن أن يؤدي إلى تحسين الأداء وتبسيط الإدارة."
        },
        {
          question: "هل يمكن لحملات الأداء الأقصى استخدام الأصول الموجودة من حملات أخرى؟",
          answer: "نعم، يمكن للأداء الأقصى استخدام الأصول الإعلانية الموجودة، مما يتيح التكامل السلس والاستفادة من العمل الإبداعي السابق لفرص تحسين جديدة."
        }
      ]
    : [
        {
          question: "What is Google's Performance Max, and how does it benefit advertisers?",
          answer: "Performance Max is a Google Ads campaign type that uses AI to optimize ad placement across all Google platforms. It maximizes conversion value by automatically finding the best performing strategies."
        },
        {
          question: "How do you set up a Performance Max campaign?",
          answer: "Setting up involves defining campaign goals, uploading assets like images and videos, and providing a range of conversion actions for Google's AI to target."
        },
        {
          question: "What makes Performance Max different from standard PPC campaigns?",
          answer: "Performance Max utilizes machine learning to automatically adjust bids, placements, and targeting across Google's entire inventory, which can lead to improved performance and simplified management."
        },
        {
          question: "Can Performance Max campaigns use existing assets from other campaigns?",
          answer: "Yes, Performance Max can utilize existing ad assets, allowing seamless integration and leveraging past creative work for new optimization opportunities."
        }
      ];
  
  // Google Shopping questions
  questions[tabs[3]] = isArabic
    ? [
        {
          question: "كيف يعمل جوجل شوبينج للتجار؟",
          answer: "يعرض جوجل شوبينج المنتجات مباشرة في نتائج البحث، مما يتيح للمستخدمين مقارنة الأسعار ورؤية المنتجات قبل النقر للانتقال إلى موقع التاجر لإجراء عملية شراء."
        },
        {
          question: "ما هي مزايا استخدام جوجل شوبينج للتجارة الإلكترونية؟",
          answer: "يوفر تعرضًا عاليًا للزوار ذوي النية للشراء، ومقارنات مباشرة للمنتجات، ومسارًا مبسطًا للشراء، مما يمكن أن يعزز المبيعات بشكل كبير."
        },
        {
          question: "ما هي الاستراتيجيات التي تحسن حملات جوجل شوبينج؟",
          answer: "تشمل استراتيجيات التحسين توفير معلومات تفصيلية عن المنتجات، والمزايدة الاستراتيجية، والصور عالية الجودة، والمراقبة المستمرة للأداء لتعديل المزايدات وقوائم المنتجات لتحقيق أقصى عائد على الاستثمار."
        },
        {
          question: "كيف تتعاملون مع قوائم المنتجات والمزايدة في جوجل شوبينج؟",
          answer: "نقوم بإدارة قوائم المنتجات من خلال تحسين دقيق للتغذية ونستخدم استراتيجيات المزايدة المعتمدة على البيانات للمنافسة بفعالية في مزادات فئات المنتجات."
        }
      ]
    : [
        {
          question: "How does Google Shopping work for retailers?",
          answer: "Google Shopping displays products directly in search results, allowing users to compare prices and see products before clicking through to a retailer's website to make a purchase."
        },
        {
          question: "What are the advantages of using Google Shopping for e-commerce?",
          answer: "It offers high intent-to-purchase exposure, direct product comparisons, and simplified path to purchase, which can significantly boost sales."
        },
        {
          question: "What strategies optimize Google Shopping campaigns?",
          answer: "Optimization strategies include detailed product feeds, strategic bidding, high-quality images, and continuous performance monitoring to adjust bids and product listings for maximum ROI."
        },
        {
          question: "How do you handle product listings and bidding in Google Shopping?",
          answer: "We manage product listings through meticulous feed optimization and use data-driven bidding strategies to compete effectively in product category auctions."
        }
      ];
  
  // Google My Business questions
  questions[tabs[4]] = isArabic
    ? [
        {
          question: "ما هو نشاطي التجاري على جوجل ولماذا هو مهم للشركات المحلية؟",
          answer: "نشاطي التجاري على جوجل (GMB) هو أداة مجانية تتيح للشركات إدارة حضورها عبر الإنترنت على جوجل، بما في ذلك البحث والخرائط. وهي ضرورية لمساعدة الشركات المحلية على زيادة ظهورها، وجذب المزيد من العملاء، وإدارة معلوماتها بفعالية."
        },
        {
          question: "كيف تحسنون قائمة نشاطي التجاري على جوجل لتحقيق ظهور أفضل؟",
          answer: "يشمل التحسين ضمان دقة واكتمال معلومات عملك، ونشر تحديثات منتظمة، وإضافة صور عالية الجودة، وجمع تقييمات العملاء لتعزيز المصداقية وجذب المزيد من عمليات البحث المحلية."
        },
        {
          question: "ما هي أنواع المحتوى التي يجب نشرها على نشاطي التجاري على جوجل؟",
          answer: "المحتوى الفعال لـ GMB يشمل تحديثات حول عملك، والعروض الترويجية، والأحداث القادمة، والمنتجات أو الخدمات الجديدة. يحافظ النشر المنتظم على نشاط ملفك الشخصي وجاذبيته للعملاء المحتملين."
        },
        {
          question: "كيف يمكن أن يؤثر نشاطي التجاري على جوجل على ترتيب تحسين محركات البحث المحلية؟",
          answer: "يمكن لملف GMB المدار بشكل جيد أن يعزز بشكل كبير تحسين محركات البحث المحلية من خلال جعل عملك أكثر صلة وظهورًا في نتائج البحث المحلية وعلى خرائط جوجل. ويمكن أن يؤدي ذلك إلى زيادة حركة المرور سواء عبر الإنترنت أو في المتجر."
        }
      ]
    : [
        {
          question: "What is Google My Business and why is it important for local businesses?",
          answer: "Google My Business (GMB) is a free tool that allows businesses to manage their online presence across Google, including Search and Maps. It is crucial for helping local businesses increase their visibility, attract more customers, and manage their information effectively."
        },
        {
          question: "How do you optimize a Google My Business listing for better visibility?",
          answer: "Optimization includes ensuring your business information is accurate and comprehensive, posting regular updates, adding high-quality photos, and collecting customer reviews to enhance credibility and attract more local searches."
        },
        {
          question: "What types of content should be posted on Google My Business?",
          answer: "Effective content for GMB includes updates about your business, promotions, upcoming events, and new products or services. Regular posting keeps your profile active and engaging for potential customers."
        },
        {
          question: "How can Google My Business impact my local SEO rankings?",
          answer: "A well-managed GMB profile can significantly boost your local SEO by making your business more relevant and visible in local search results and on Google Maps. This can lead to increased traffic both online and in-store."
        }
      ];
  
  return {
    title: isArabic ? "الأسئلة الشائعة" : "FAQ",
    description: isArabic 
      ? "اكتشف كيف تساعدك وكالتنا على تحقيق أقصى استفادة من خدمات جوجل. توفر الأسئلة الشائعة لدينا رؤى حول استراتيجيات فعالة لإعلانات جوجل، نشاطي التجاري على جوجل، جوجل شوبينج، والمزيد، مما يضمن لعملك تحقيق أفضل مستويات الظهور والنجاح عبر الإنترنت."
      : "Discover how our agency helps you maximize the potential of Google's services. Our FAQs offer insights into effective strategies for Google Ads, Google My Business, Google Shopping, and more, ensuring your business achieves optimal online visibility and success.",
    tabs,
    questions
  };
};

const FAQ: React.FC = () => {
  const { language } = useLanguage();
  const [isRTL, setIsRTL] = useState(false);
  const [selected, setSelected] = useState<string>("");
  const [translations, setTranslations] = useState<ReturnType<typeof getLocalTranslations>>(
    getLocalTranslations('en')
  );

  useEffect(() => {
    // Check document direction after component mounts
    setIsRTL(document.documentElement.dir === 'rtl');
    
    // Load translations based on current language
    const newTranslations = getLocalTranslations(language);
    setTranslations(newTranslations);
    
    // Set initially selected tab if not already set
    if (selected === "" && newTranslations.tabs.length > 0) {
      setSelected(newTranslations.tabs[0]);
    }
    // Update selected tab to match new language if one was previously selected
    else if (selected !== "" && newTranslations.tabs.length > 0) {
      const oldIndex = translations.tabs.findIndex(tab => tab === selected);
      if (oldIndex >= 0 && oldIndex < newTranslations.tabs.length) {
        setSelected(newTranslations.tabs[oldIndex]);
      } else {
        // Fallback to first tab if the tab index doesn't exist in the new language
        setSelected(newTranslations.tabs[0]);
      }
    }
  }, [language, selected]);

  return (
    <section className="overflow-hidden bg-primaryColor px-4 py-12 text-slate-50">
      <Heading title={translations.title} description={translations.description} />
      <Tabs selected={selected} setSelected={setSelected} tabs={translations.tabs} />
      <Questions selected={selected} questions={translations.questions} />
    </section>
  );
};

interface HeadingProps {
  title: string;
  description: string;
}

const Heading: React.FC<HeadingProps> = ({ title, description }) => {
  return (
    <>
      <div className="flex flex-col justify-center text-center mx-auto md:max-w-3xl space-y-5 py-10">
        <h1 className="font-semibold leading-tight text-slate-200 dark:text-white text-4xl sm:text-5xl lg:text-6xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-tr from-secondaryColor to-[#B28757]">
            {title}
          </span>
        </h1>
        <p className="flex text-slate-200 dark:text-gray-300 tracking-tight md:font-normal max-w-xl mx-auto lg:max-w-none">
          {description}
        </p>
      </div>
    </>
  );
};

interface TabsProps {
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  tabs: string[];
}

const Tabs: React.FC<TabsProps> = ({ selected, setSelected, tabs }) => {
  return (
    <div className="relative z-10 flex flex-wrap items-center justify-center gap-4">
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
}

const Questions: React.FC<QuestionsProps> = ({ selected, questions }) => {
  return (
    <div className="mx-auto mt-12 max-w-3xl">
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
              <Question key={idx} {...q} />
            ))}
          </motion.div>
        ) : undefined;
      })}
    </AnimatePresence>
  </div>
  );
};

interface QuestionProps extends QuestionType {}

const Question: React.FC<QuestionProps> = ({ question, answer }) => {
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
          className={`text-left text-lg font-medium transition-colors ${
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
        className="overflow-hidden text-slate-400"
      >
        <p>{answer}</p>
      </motion.div>
    </motion.div>
  );
};

export default FAQ;





