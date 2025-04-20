'use client'
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FiDollarSign, FiEye, FiPlay, FiSearch } from "react-icons/fi";
import { FiCheckCircle } from "react-icons/fi";
import { useTranslation } from "@/app/hooks/useTranslation";
import { useLanguage } from "@/app/providers/LanguageProvider";

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
  const { language } = useLanguage();

  useEffect(() => {
    if (isInView) {
      setFeatureInView(featureInView);
    }
  }, [isInView]);

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
  const { language } = useLanguage();
  
  return (
    <div className="relative h-96 w-full rounded-xl bg-slate-800 shadow-xl overflow-hidden">
      {/* Image display */}
      <Image width={600} height={300} src={featureInView.imageUrl} alt={language === 'en' ? featureInView.title.en : featureInView.title.ar} className="absolute inset-0 h-full w-full object-cover" />
    </div>
  );
};


export default Swap;

const features: Feature[] = [
 
  {
    id: 1,
    callout: "Branding",
    title: {
      en: "Branding Strategy",
      ar: "استراتيجية العلامة التجارية"
    },
    description: {
      en: "Developing a comprehensive branding strategy to guide your brand's growth, messaging, and positioning in the market.",
      ar: "تطوير استراتيجية شاملة للعلامة التجارية لتوجيه نمو علامتك التجارية ورسائلها وموقعها في السوق."
    },
    advantages: [
        { 
          id: 'bs1', 
          text: {
            en: "Defining your brand's mission, values, and unique selling points.",
            ar: "تحديد مهمة علامتك التجارية وقيمها ونقاط البيع الفريدة."
          }
        },
        { 
          id: 'bs2', 
          text: {
            en: "Identifying target audience characteristics and preferences.",
            ar: "تحديد خصائص وتفضيلات الجمهور المستهدف."
          }
        },
        { 
          id: 'bs3', 
          text: {
            en: "Crafting a roadmap for brand development and market presence.",
            ar: "إعداد خارطة طريق لتطوير العلامة التجارية والتواجد في السوق."
          }
        },
      ],
    contentPosition: "l",
    Icon: FiPlay,
    imageUrl: '/brandstrategy.jpg',
  },
  {
    id: 2,
    callout: "Branding",
    title: {
      en: "Brand Guidelines​",
      ar: "إرشادات العلامة التجارية"
    },
    description: {
      en: "Creating clear and comprehensive brand guidelines to ensure consistency in visual elements, messaging, and brand identity.",
      ar: "إنشاء إرشادات واضحة وشاملة للعلامة التجارية لضمان الاتساق في العناصر المرئية والرسائل وهوية العلامة التجارية."
    },
    advantages: [
        { 
          id: 'bs1', 
          text: {
            en: "Designing a style guide encompassing logo usage, color schemes, typography, and imagery.",
            ar: "تصميم دليل أسلوب يشمل استخدام الشعار وألوان المخططات والطباعة والصور."
          }
        },
        { 
          id: 'bs2', 
          text: {
            en: "Documenting your brand's tone of voice, messaging guidelines, and communication protocols.",
            ar: "توثيق نبرة صوت علامتك التجارية وإرشادات الرسائل وبروتوكولات الاتصال."
          }
        },
        { 
          id: 'bs3', 
          text: {
            en: "Establishing a set of standards to maintain brand consistency across all materials.",
            ar: "وضع مجموعة من المعايير للحفاظ على اتساق العلامة التجارية عبر جميع المواد."
          }
        },
      ],
    contentPosition: "r",
    Icon: FiDollarSign,
    imageUrl: '/branding-guid.jpg',
  },
  
  {
    id: 3,
    callout: "Branding",
    title: {
      en: "Company Profile​",
      ar: "ملف تعريف الشركة"
    },
    description: {
      en: "Creating a compelling company profile that showcases your brand's story, values, and achievements.",
      ar: "إنشاء ملف تعريف شركة جذاب يعرض قصة علامتك التجارية وقيمها وإنجازاتها."
    },
    advantages: [
        { 
          id: 'bs1', 
          text: {
            en: "Crafting a narrative that resonates with your audience and communicates your brand's journey.",
            ar: "صياغة سرد يتردد صداه مع جمهورك ويوصل رحلة علامتك التجارية."
          }
        },
        { 
          id: 'bs2', 
          text: {
            en: "Designing a visually appealing company profile with impactful graphics and content.",
            ar: "تصميم ملف تعريف شركة جذاب بصريًا مع رسومات ومحتوى مؤثر."
          }
        },
        { 
          id: 'bs3', 
          text: {
            en: "Highlighting your brand's unique offerings and competitive advantages.",
            ar: "إبراز العروض الفريدة لعلامتك التجارية والمزايا التنافسية."
          }
        },
      ],
    contentPosition: "l",
    Icon: FiDollarSign,
    imageUrl: '/company-profile.jpg',
  },
 
  {
    id: 4,
    callout: "Branding",
    title: {
      en: "Brand Positioning",
      ar: "تموضع العلامة التجارية"
    },
    description: {
      en: "Strategically positioning your brand in the market to stand out, connect with your target audience, and gain a competitive edge.",
      ar: "تموضع علامتك التجارية استراتيجيًا في السوق للتميز والتواصل مع جمهورك المستهدف واكتساب ميزة تنافسية."
    },
    advantages: [
        { 
          id: 'bs1', 
          text: {
            en: "Identifying your unique selling propositions and competitive advantages.",
            ar: "تحديد عروض البيع الفريدة والمزايا التنافسية."
          }
        },
        { 
          id: 'bs2', 
          text: {
            en: "Crafting a brand story and messaging that resonates with your target audience.",
            ar: "صياغة قصة العلامة التجارية ورسائل تتردد صداها مع جمهورك المستهدف."
          }
        },
        { 
          id: 'bs3', 
          text: {
            en: "Developing a strategic plan to establish your brand's position in the market.",
            ar: "تطوير خطة استراتيجية لتأسيس مكانة علامتك التجارية في السوق."
          }
        },
      ],
    contentPosition: "r",
    Icon: FiPlay,
    imageUrl: '/brandpositioning.jpg',
  },
];