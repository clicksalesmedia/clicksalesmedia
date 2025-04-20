'use client'
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FiChevronRight, FiCpu, FiDatabase, FiSearch, FiTrendingUp } from "react-icons/fi";
import { FiCheckCircle } from "react-icons/fi";
import { useTranslation } from "@/app/hooks/useTranslation";

interface Feature {
  id: number;
  callout: string;
  title: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  };
  advantages?: { 
    id: string; 
    text: {
      en: string;
      ar: string;
    }
  }[];
  contentPosition: "l" | "r";
  Icon: React.ElementType;
  imageUrl: string;
}

const Swap = () => {
  return (
    <>
    <div className="mt-[-50px]">
      <SwapColumnFeatures />
    </div>
    </>
  );
};

const SwapColumnFeatures: React.FC = () => {
  const [featureInView, setFeatureInView] = useState<Feature>(features[0]);
  const { t } = useTranslation();

  return (  
    <section className="relative mx-auto max-w-7xl">
    <SlidingFeatureDisplay featureInView={featureInView} />
    <div className="-mt-[100vh] hidden md:block" />
    {features.map((s) => (
      <Content
        key={s.id}
        featureInView={s}
        setFeatureInView={setFeatureInView}
        {...s}
      />
    ))}
  </section>
  );
};

const SlidingFeatureDisplay: React.FC<{ featureInView: Feature }> = ({ featureInView }) => {
  return (
    <div
      style={{
        justifyContent:
          featureInView.contentPosition === "l" ? "flex-end" : "flex-start",
      }}
      className="pointer-events-none sticky top-0 z-10 hidden h-screen w-full items-center justify-center md:flex"
    >
      <motion.div
        layout
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25,
        }}
        className="h-fit w-3/5 rounded-xl p-8"
      >
        <ExampleFeature featureInView={featureInView} />
      </motion.div>
    </div>
  );
};

const Content: React.FC<{
  featureInView: Feature;
  setFeatureInView: React.Dispatch<React.SetStateAction<Feature>>;
}> = ({ featureInView, setFeatureInView }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    margin: "-150px",
  });
  const { t } = useTranslation();
  const { language } = require("@/app/providers/LanguageProvider").useLanguage();

  useEffect(() => {
    if (isInView) {
      setFeatureInView((current) => {
        if (current.id === featureInView.id) {
          return current;
        }
        return featureInView;
      });
    }
  }, [isInView, featureInView.id]);

  return (
    <section
      ref={ref}
      className="relative z-0 flex h-fit md:h-screen"
      style={{
        justifyContent:
          featureInView.contentPosition === "l" ? "flex-start" : "flex-end",
      }}
    >
      <div className="grid h-full w-full place-content-center px-4 py-12 md:w-2/5 md:px-8 md:py-8">
      <motion.div
  initial={{ opacity: 0, y: 25 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, ease: "easeInOut" }}
>
  <span className="rounded-full bg-secondaryColor px-2 py-1.5 text-xs font-medium text-whiteColor">
    {featureInView.callout}
  </span>
  <h2 className="my-3 text-5xl font-bold text-secondaryColor">
    {language === 'en' ? featureInView.title.en : featureInView.title.ar}
  </h2>
  <p className="text-whiteColor">
    {language === 'en' ? featureInView.description.en : featureInView.description.ar}
  </p>
  {featureInView.advantages && featureInView.advantages.length > 0 && (
    <ul role="list" className="space-y-2 pt-6">
      {featureInView.advantages.map((advantage) => (
        <li key={advantage.id} className="flex items-center gap-4 text-whiteColor dark:text-gray-400">
          <FiCheckCircle className="text-secondaryColor" />
          <span>{language === 'en' ? advantage.text.en : advantage.text.ar}</span>
        </li>
      ))}
    </ul>
  )}
</motion.div>
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="mt-8 block md:hidden"
        >
          <ExampleFeature featureInView={featureInView} />
        </motion.div>
      </div>
    </section>
  );
};

const ExampleFeature: React.FC<{ featureInView: Feature }> = ({ featureInView }) => {
  return (
    <div className="relative h-96 w-full rounded-xl bg-slate-800 shadow-xl overflow-hidden">
      {/* Image display */}
      <Image width={600} height={300} src={featureInView.imageUrl} alt={featureInView.title.en} className="absolute inset-0 h-full w-full object-cover" />
    </div>
  );
};


export default Swap;

const features: Feature[] = [
 
  {
    id: 1,
    callout: "AI Marketing",
    title: {
      en: "Data-Driven AI Strategies",
      ar: "استراتيجيات ذكاء اصطناعي قائمة على البيانات"
    },
    description: {
      en: "Leverage advanced AI algorithms to analyze market data, consumer behavior, and campaign performance to create hyper-targeted marketing strategies.",
      ar: "استفد من خوارزميات الذكاء الاصطناعي المتقدمة لتحليل بيانات السوق وسلوك المستهلك وأداء الحملات لإنشاء استراتيجيات تسويقية مستهدفة بدقة."
    },
    advantages: [
        { 
          id: 'ai1', 
          text: {
            en: 'Real-time data analysis for immediate strategy adjustments',
            ar: 'تحليل البيانات في الوقت الفعلي لإجراء تعديلات فورية على الاستراتيجية'
          }
        },
        { 
          id: 'ai2', 
          text: {
            en: 'Predictive analytics to forecast market trends and consumer behavior',
            ar: 'التحليلات التنبؤية للتنبؤ باتجاهات السوق وسلوك المستهلك'
          }
        },
        { 
          id: 'ai3', 
          text: {
            en: 'Competitive intelligence gathering for strategic positioning',
            ar: 'جمع المعلومات التنافسية للتموضع الاستراتيجي'
          }
        },
      ],
    contentPosition: "l",
    Icon: FiDatabase,
    imageUrl: '/ai-marketing-data.jpg',
  },
  {
    id: 2,
    callout: "AI Marketing",
    title: {
      en: "Automated Campaign Optimization",
      ar: "تحسين الحملات الآلي"
    },
    description: {
      en: "Let AI continuously monitor and optimize your marketing campaigns across all channels, ensuring maximum ROI through automated bidding, targeting, and creative adjustments.",
      ar: "دع الذكاء الاصطناعي يراقب ويحسن حملاتك التسويقية باستمرار عبر جميع القنوات، مما يضمن أقصى عائد على الاستثمار من خلال المزايدة الآلية والاستهداف وتعديلات المحتوى الإبداعي."
    },
    advantages: [
        { 
          id: 'aco1', 
          text: {
            en: 'Automated A/B testing to identify top-performing ad elements',
            ar: 'اختبار A/B آلي لتحديد أفضل عناصر الإعلان أداءً'
          }
        },
        { 
          id: 'aco2', 
          text: {
            en: 'Dynamic budget allocation to highest-performing channels',
            ar: 'توزيع ديناميكي للميزانية على القنوات ذات الأداء الأعلى'
          }
        },
        { 
          id: 'aco3', 
          text: {
            en: 'Real-time campaign adjustments based on performance metrics',
            ar: 'تعديلات الحملة في الوقت الفعلي بناءً على مقاييس الأداء'
          }
        },
      ],
    contentPosition: "r",
    Icon: FiTrendingUp,
    imageUrl: '/ai-campaign-optimization.jpg',
  },
  
  {
    id: 3,
    callout: "AI Marketing",
    title: {
      en: "Personalized Content Generation",
      ar: "إنشاء محتوى مخصص"
    },
    description: {
      en: "Utilize AI to create highly personalized content at scale, tailoring messages to individual audience segments for maximum engagement and conversion.",
      ar: "استخدم الذكاء الاصطناعي لإنشاء محتوى مخصص للغاية على نطاق واسع، مع تخصيص الرسائل لشرائح الجمهور الفردية لتحقيق أقصى قدر من المشاركة والتحويل."
    },
    advantages: [
        { 
          id: 'pcg1', 
          text: {
            en: 'AI-generated content tailored to specific audience segments',
            ar: 'محتوى منشأ بالذكاء الاصطناعي مصمم خصيصًا لشرائح جمهور محددة'
          }
        },
        { 
          id: 'pcg2', 
          text: {
            en: 'Automated content optimization for different platforms and formats',
            ar: 'تحسين المحتوى الآلي لمختلف المنصات والتنسيقات'
          }
        },
        { 
          id: 'pcg3', 
          text: {
            en: 'Intelligent content scheduling based on audience activity patterns',
            ar: 'جدولة ذكية للمحتوى بناءً على أنماط نشاط الجمهور'
          }
        },
      ],
    contentPosition: "l",
    Icon: FiCpu,
    imageUrl: '/ai-content-generation.jpg',
  },
 
  {
    id: 4,
    callout: "AI Marketing",
    title: {
      en: "Predictive Customer Analytics",
      ar: "تحليلات العملاء التنبؤية"
    },
    description: {
      en: "Harness the power of AI to predict customer behavior, identify potential high-value clients, and anticipate market shifts before they happen.",
      ar: "استفد من قوة الذكاء الاصطناعي للتنبؤ بسلوك العملاء، وتحديد العملاء المحتملين ذوي القيمة العالية، وتوقع تحولات السوق قبل حدوثها."
    },
    advantages: [
        { 
          id: 'pca1', 
          text: {
            en: 'Customer lifetime value prediction for targeted retention strategies',
            ar: 'التنبؤ بقيمة العميل مدى الحياة لاستراتيجيات الاحتفاظ المستهدفة'
          }
        },
        { 
          id: 'pca2', 
          text: {
            en: 'Churn prediction and prevention through proactive engagement',
            ar: 'التنبؤ بالتسرب ومنعه من خلال المشاركة الاستباقية'
          }
        },
        { 
          id: 'pca3', 
          text: {
            en: 'Next-best-action recommendations for sales and marketing teams',
            ar: 'توصيات الإجراء الأفضل التالي لفرق المبيعات والتسويق'
          }
        },
      ],
    contentPosition: "r",
    Icon: FiSearch,
    imageUrl: '/ai-predictive-analytics.jpg',
  },
]; 