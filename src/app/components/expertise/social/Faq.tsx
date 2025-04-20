'use client'
import { AnimatePresence, motion } from "framer-motion";
import { FiPlus } from "react-icons/fi";
import React, { useState } from "react";
import { useLanguage } from "@/app/providers/LanguageProvider";

// Define the structure of each question
type QuestionType = {
  question: {
    en: string;
    ar: string;
  };
  answer: {
    en: string;
    ar: string;
  };
};

// Define the mapping type for the questions categorized by tabs
type QuestionsMap = {
  [key: string]: QuestionType[];
};

// List of tabs as a constant tuple
const TABS = ["Social Media Management", "Social media Ads", "Social Media for B2B", "Social Media Content"] as const;
const TABS_AR = ["إدارة وسائل التواصل الاجتماعي", "إعلانات وسائل التواصل الاجتماعي", "وسائل التواصل الاجتماعي للشركات", "محتوى وسائل التواصل الاجتماعي"] as const;

// Deriving a union type of tab values from the TABS constant
type Tab = typeof TABS[number];

const QUESTIONS: QuestionsMap = {
  "Social Media Management": [
    {
      question: {
        en: "What is social media management and why is it important?",
        ar: "ما هي إدارة وسائل التواصل الاجتماعي ولماذا هي مهمة؟"
      },
      answer: {
        en: "Social media management involves overseeing your online interactions and content across platforms. It's crucial for maintaining a cohesive brand voice, engaging with your audience, and building your digital presence effectively.",
        ar: "تتضمن إدارة وسائل التواصل الاجتماعي الإشراف على تفاعلاتك ومحتواك عبر الإنترنت عبر المنصات. إنها ضرورية للحفاظ على صوت متماسك للعلامة التجارية، والتفاعل مع جمهورك، وبناء وجودك الرقمي بشكل فعال."
      }
    },
    {
      question: {
        en: "What strategies do you use to enhance brand presence on social media?",
        ar: "ما هي الاستراتيجيات التي تستخدمونها لتعزيز تواجد العلامة التجارية على وسائل التواصل الاجتماعي؟"
      },
      answer: {
        en: "We customize strategies to align with your brand's voice and goals, utilizing targeted content calendars, community engagement practices, and performance analytics to enhance your online presence.",
        ar: "نخصص استراتيجيات تتماشى مع صوت وأهداف علامتك التجارية، باستخدام تقويمات محتوى مستهدفة، وممارسات مشاركة المجتمع، وتحليلات الأداء لتعزيز وجودك عبر الإنترنت."
      }
    },
    {
      question: {
        en: "Can you handle multiple social media platforms?",
        ar: "هل يمكنكم إدارة منصات متعددة للتواصل الاجتماعي؟"
      },
      answer: {
        en: "Yes, we manage a range of platforms including Facebook, Instagram, Twitter, LinkedIn, and more, ensuring a cohesive brand message across all channels.",
        ar: "نعم، نقوم بإدارة مجموعة من المنصات بما في ذلك فيسبوك وانستغرام وتويتر ولينكد إن والمزيد، مما يضمن رسالة متماسكة للعلامة التجارية عبر جميع القنوات."
      }
    },
    {
      question: {
        en: "How do you deal with negative comments or a brand crisis on social media?",
        ar: "كيف تتعاملون مع التعليقات السلبية أو أزمة العلامة التجارية على وسائل التواصل الاجتماعي؟"
      },
      answer: {
        en: "We employ proactive monitoring and rapid response strategies to manage negative comments and mitigate crises, maintaining your brand's reputation.",
        ar: "نستخدم استراتيجيات المراقبة الاستباقية والاستجابة السريعة لإدارة التعليقات السلبية والتخفيف من الأزمات، والحفاظ على سمعة علامتك التجارية."
      }
    },
  ],
  "Social media Ads": [
    {
      question: {
        en: "How do you ensure our ads target the right audience?",
        ar: "كيف تضمنون استهداف إعلاناتنا للجمهور المناسب؟"
      },
      answer: {
        en: "We use advanced targeting options based on demographics, interests, behaviors, and more to reach the most relevant audience for your brand.",
        ar: "نستخدم خيارات استهداف متقدمة بناءً على الديموغرافيا والاهتمامات والسلوكيات والمزيد للوصول إلى الجمهور الأكثر صلة بعلامتك التجارية."
      }
    },
    {
      question: {
        en: "What kind of return on investment (ROI) can we expect from social media ads?",
        ar: "ما نوع العائد على الاستثمار الذي يمكن أن نتوقعه من إعلانات وسائل التواصل الاجتماعي؟"
      },
      answer: {
        en: "ROI can vary by campaign and goals, but we focus on maximizing your ad spend by optimizing campaigns for conversions and closely monitoring performance metrics.",
        ar: "يمكن أن يختلف العائد على الاستثمار حسب الحملة والأهداف، لكننا نركز على تعظيم إنفاقك الإعلاني من خلال تحسين الحملات للتحويلات ومراقبة مقاييس الأداء عن كثب."
      }
    },
    {
      question: {
        en: "Do you offer creative design services for ads?",
        ar: "هل تقدمون خدمات التصميم الإبداعي للإعلانات؟"
      },
      answer: {
        en: "Yes, we provide complete creative solutions including graphic design, video production, and copywriting to make your ads engaging and effective.",
        ar: "نعم، نقدم حلولًا إبداعية كاملة بما في ذلك التصميم الجرافيكي وإنتاج الفيديو وكتابة النصوص لجعل إعلاناتك جذابة وفعالة."
      }
    },
    {
      question: {
        en: "How often do you report on ad performance?",
        ar: "كم مرة تقدمون تقارير عن أداء الإعلانات؟"
      },
      answer: {
        en: "We offer regular reporting that suits your needs, ranging from weekly to monthly updates, including detailed analytics and insights to guide future strategies.",
        ar: "نقدم تقارير منتظمة تناسب احتياجاتك، تتراوح من تحديثات أسبوعية إلى شهرية، بما في ذلك تحليلات مفصلة ورؤى لتوجيه الاستراتيجيات المستقبلية."
      }
    },
  ],
  "Social Media for B2B": [
    {
      question: {
        en: "How does B2B social media marketing differ from B2C in your strategies?",
        ar: "كيف يختلف تسويق وسائل التواصل الاجتماعي للشركات عن تسويق المستهلكين في استراتيجياتكم؟"
      },
      answer: {
        en: "Our B2B strategies are designed to build long-term relationships and establish thought leadership through content that addresses industry-specific issues, trends, and insights.",
        ar: "تم تصميم استراتيجياتنا للشركات لبناء علاقات طويلة الأمد وإقامة قيادة فكرية من خلال محتوى يتناول قضايا واتجاهات ورؤى خاصة بالصناعة."
      }
    },
    {
      question: {
        en: "What platforms do you recommend for B2B social media marketing?",
        ar: "ما هي المنصات التي توصون بها لتسويق وسائل التواصل الاجتماعي للشركات؟"
      },
      answer: {
        en: "LinkedIn and google are a cornerstone for B2B marketing, along with Twitter and Facebook depending on your industry and target audience specifics.",
        ar: "لينكد إن وجوجل هما حجر الزاوية في التسويق للشركات، إلى جانب تويتر وفيسبوك اعتمادًا على تفاصيل صناعتك وجمهورك المستهدف."
      }
    },
    {
      question: {
        en: "How do you measure effectiveness in B2B social media marketing?",
        ar: "كيف تقيسون فعالية تسويق وسائل التواصل الاجتماعي للشركات؟"
      },
      answer: {
        en: "We focus on metrics such as lead generation, engagement with key decision-makers, and the quality of interactions over volume.",
        ar: "نركز على مقاييس مثل توليد العملاء المحتملين، والتفاعل مع صناع القرار الرئيسيين، وجودة التفاعلات على حجمها."
      }
    },
    {
      question: {
        en: "Can social media influence B2B decision-making?",
        ar: "هل يمكن لوسائل التواصل الاجتماعي أن تؤثر على صنع القرار في الشركات؟"
      },
      answer: {
        en: "Absolutely, social media allows B2B companies to position themselves as experts in their field, influencing decision-makers and shaping industry conversations.",
        ar: "بالطبع، تتيح وسائل التواصل الاجتماعي للشركات أن تضع نفسها كخبراء في مجالها، مما يؤثر على صناع القرار ويشكل محادثات الصناعة."
      }
    },
  ],
  "Social Media Content": [
    {
      question: {
        en: "How do you create content that stands out on social media?",
        ar: "كيف تقومون بإنشاء محتوى مميز على وسائل التواصل الاجتماعي؟"
      },
      answer: {
        en: "We prioritize originality and relevance in our content creation, utilizing trends, user engagement data, and brand identity to craft posts that capture attention.",
        ar: "نعطي الأولوية للأصالة والملاءمة في إنشاء المحتوى الخاص بنا، مع الاستفادة من الاتجاهات وبيانات مشاركة المستخدم وهوية العلامة التجارية لصياغة منشورات تجذب الانتباه."
      }
    },
    {
      question: {
        en: "What types of content do you think perform best on social media?",
        ar: "ما هي أنواع المحتوى التي تعتقد أنها تؤدي أفضل أداء على وسائل التواصل الاجتماعي؟"
      },
      answer: {
        en: "Video content and interactive posts typically see higher engagement rates, but the best type of content can vary depending on your audience and platform.",
        ar: "عادة ما يشهد محتوى الفيديو والمنشورات التفاعلية معدلات مشاركة أعلى، ولكن أفضل نوع من المحتوى يمكن أن يختلف اعتمادًا على جمهورك والمنصة."
      }
    },
    {
      question: {
        en: "How do you ensure content aligns with our brand values?",
        ar: "كيف تضمنون توافق المحتوى مع قيم علامتنا التجارية؟"
      },
      answer: {
        en: "We start by thoroughly understanding your brand's values and voice, which guides the content strategy to ensure consistency and authenticity in all posts.",
        ar: "نبدأ بفهم قيم وصوت علامتك التجارية بشكل شامل، مما يوجه استراتيجية المحتوى لضمان الاتساق والأصالة في جميع المنشورات."
      }
    },
    {
      question: {
        en: "Do you involve clients in the content creation process?",
        ar: "هل تشركون العملاء في عملية إنشاء المحتوى؟"
      },
      answer: {
        en: "Yes, we collaborate closely with clients to ensure content not only meets but exceeds their expectations, incorporating their feedback and insights throughout the creation process.",
        ar: "نعم، نتعاون عن كثب مع العملاء لضمان أن المحتوى لا يلبي توقعاتهم فحسب، بل يتجاوزها، مع دمج تعليقاتهم ورؤاهم طوال عملية الإنشاء."
      }
    },
  ],
};

const FAQ: React.FC = () => {
  const [selected, setSelected] = useState<Tab>(TABS[0]);
  const { language } = useLanguage();

  return (
    <section className="overflow-hidden bg-primaryColor px-4 py-12 text-slate-50">
      <Heading />
      <Tabs selected={selected} setSelected={setSelected} />
      <Questions selected={selected} />
    </section>
  );
};

const Heading: React.FC = () => {
  const { language } = useLanguage();
  
  return (
    <>
      <div className="flex flex-col justify-center text-center  mx-auto md:max-w-3xl space-y-5 py-10">
                <h1 className=" font-semibold leading-tight text-slate-200 dark:text-white text-4xl sm:text-5xl lg:text-6xl">
             <span className="text-transparent bg-clip-text bg-gradient-to-tr from-secondaryColor to-[#B28757]">FAQ</span>
        </h1>
        <p className=" flex text-slate-200 dark:text-gray-300 tracking-tight md:font-normal max-w-xl mx-auto lg:max-w-none">
          {language === 'en' 
            ? "Get quick answers on Social media strategy, ads, engagement, and more to effectively boost your online presence."
            : "احصل على إجابات سريعة حول استراتيجية وسائل التواصل الاجتماعي والإعلانات والمشاركة والمزيد لتعزيز وجودك عبر الإنترنت بشكل فعال."}
        </p>
            </div>
    </>
  );
};

interface TabsProps {
  selected: Tab;
  setSelected: React.Dispatch<React.SetStateAction<Tab>>;
}

const Tabs: React.FC<TabsProps> = ({ selected, setSelected }) => {
  const { language } = useLanguage();
  
  return (
    <div className="relative z-10 flex flex-wrap items-center justify-center gap-4">
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
          <span className="relative z-10">{language === 'en' ? tab : TABS_AR[index]}</span>
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
  selected: Tab;
}

const Questions: React.FC<QuestionsProps> = ({ selected }) => {
  return (
    <div className="mx-auto mt-12 max-w-3xl">
    <AnimatePresence mode="wait">
      {Object.entries(QUESTIONS).map(([tab, questions]) => {
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
            {questions.map((q, idx) => (
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
  const { language } = useLanguage();

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
          {language === 'en' ? question.en : question.ar}
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
        <p>{language === 'en' ? answer.en : answer.ar}</p>
      </motion.div>
    </motion.div>
  );
};

export default FAQ;





