'use client'
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import FormService from "@/app/ui/modal";
import { useTranslation } from "@/app/hooks/useTranslation";
import { useLanguage } from "@/app/providers/LanguageProvider";

interface TextParallaxContentProps {
  imgUrl: string;         
  subheadingKey: string;   
  headingKey: string;   
  children: React.ReactNode;
}

interface StickyImageProps {
  imgUrl: string;
}

interface OverlayCopyProps {
  subheadingKey: string;
  headingKey: string;
}


export const Solutions = () => {
  const { t } = useTranslation();
  
  return (
    <div className="bg-primaryColor">
      <TextParallaxContent
        imgUrl="/expertise/websolutions/web-application.jpg"
        subheadingKey="webSolutions.webApplications.title"
        headingKey="webSolutions.webApplications.subtitle">
        <WebApplication />
      </TextParallaxContent>
      <TextParallaxContent
        imgUrl="/expertise/websolutions/ecommerce-solution.jpg"
        subheadingKey="webSolutions.ecommerce.title"
        headingKey="webSolutions.ecommerce.subtitle"
      >
        <EcommerceSolutions />
      </TextParallaxContent>
      <TextParallaxContent
        imgUrl="/expertise/websolutions/landing-page-marketing.jpg"
        subheadingKey="webSolutions.marketingPages.title"
        headingKey="webSolutions.marketingPages.subtitle"
      >
        <LandingPages />
      </TextParallaxContent>
    </div>
  );
};

const IMG_PADDING = 12;

const TextParallaxContent: React.FC<TextParallaxContentProps> = ({ imgUrl, subheadingKey, headingKey, children }) => {
  return (
    <div
      style={{
        paddingLeft: IMG_PADDING,
        paddingRight: IMG_PADDING,
      }}
    >
      <div className="relative h-[150vh]">
        <StickyImage imgUrl={imgUrl} />
        <OverlayCopy headingKey={headingKey} subheadingKey={subheadingKey} />
      </div>
      {children}
    </div>
  );
};

const StickyImage = ({ imgUrl }: StickyImageProps) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <motion.div
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: `calc(100vh - ${IMG_PADDING * 2}px)`,
        top: IMG_PADDING,
        scale,
      }}
      ref={targetRef}
      className="sticky z-0 overflow-hidden rounded-3xl"
    >
      <motion.div
        className="absolute inset-0 bg-neutral-950/70"
        style={{
          opacity,
        }}
      />
    </motion.div>
  );
};

const OverlayCopy = ({ subheadingKey, headingKey }: OverlayCopyProps) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });
  const { t } = useTranslation();
  const { language } = useLanguage();
  const textDirection = language === 'ar' ? 'rtl' : 'ltr';
  const textAlign = language === 'ar' ? 'text-right' : 'text-left';

  const y = useTransform(scrollYProgress, [0, 1], [250, -250]);
  const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0]);

  return (
    <motion.div
      style={{
        y,
        opacity,
      }}
      ref={targetRef}
      className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center text-white"
      dir={textDirection}
    >
      <p className="mb-2 text-center text-xl md:mb-4 md:text-3xl text-whiteColor">
        {t(subheadingKey as any)}
      </p>
      <p className="text-center text-4xl font-bold md:text-7xl text-white">{t(headingKey as any)}</p>
    </motion.div>
  );
};

const WebApplication = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const textDirection = language === 'ar' ? 'rtl' : 'ltr';
  const textAlign = language === 'ar' ? 'text-right' : 'text-left';
  
  return (
    <div className={`mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12 ${textAlign}`} dir={textDirection}>
      <div className="col-span-1 md:col-span-12">
        <p className="mb-4 text-xl text-whiteColor md:text-2xl">
          {t('webSolutions.webApplications.description' as any)}
        </p>
        <FormService buttonText={t('webSolutions.webApplications.cta' as any)} />
      </div>
    </div>
  );
};

const EcommerceSolutions = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const textDirection = language === 'ar' ? 'rtl' : 'ltr';
  const textAlign = language === 'ar' ? 'text-right' : 'text-left';
  
  return (
    <div className={`mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12 ${textAlign}`} dir={textDirection}>
      <div className="col-span-1 md:col-span-12">
        <p className="mb-4 text-xl text-whiteColor md:text-2xl">
          {t('webSolutions.ecommerce.description' as any)}
        </p>
        <FormService buttonText={t('webSolutions.ecommerce.cta' as any)} />
      </div>
    </div>
  );
};

const LandingPages = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const textDirection = language === 'ar' ? 'rtl' : 'ltr';
  const textAlign = language === 'ar' ? 'text-right' : 'text-left';
  
  return (
    <div className={`mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12 ${textAlign}`} dir={textDirection}>
      <div className="col-span-1 md:col-span-12">
        <p className="mb-4 text-xl text-whiteColor md:text-2xl">
          {t('webSolutions.marketingPages.description' as any)}
        </p>
        <FormService buttonText={t('webSolutions.marketingPages.cta' as any)} />
      </div>
    </div>
  );
};

export default Solutions