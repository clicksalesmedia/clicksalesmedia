'use client'
import React from 'react';
import { motion } from 'framer-motion';
import {
  SiTailwindcss,
  SiCloudways,
  SiAndroidstudio,
  SiFlutter,
  SiGoogleads,
  SiHeroku,
} from 'react-icons/si';
import {
  FaReact,
  FaAngular,
  FaLaravel,
  FaWordpress,
  FaCss3Alt,
  FaHtml5,
  FaAws,
  FaDigitalOcean,
  FaGithub,
  FaHubspot,
} from 'react-icons/fa';
import { TbBrandNextjs } from 'react-icons/tb';
import { IoLogoJavascript, IoLogoVercel } from 'react-icons/io5';
import { DiJqueryLogo } from 'react-icons/di';
import { Link } from 'lucide-react';

interface TranslateWrapperProps {
  children: React.ReactNode;
  reverse?: boolean;
}

const TranslateWrapper: React.FC<TranslateWrapperProps> = ({ children, reverse = false }) => {
  return (
    <motion.div
      initial={{ translateX: reverse ? '-100%' : '0%' }}
      animate={{ translateX: reverse ? '0%' : '-100%' }}
      transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
      className="flex gap-4 px-2"
    >
      {children}
    </motion.div>
  );
};

interface LogoItemProps {
  Icon: React.ElementType; // React.ElementType represents a component type (e.g., a component class or a functional component).
}

const LogoItem: React.FC<LogoItemProps> = ({ Icon }) => {
  return (
    <div className="w-16 md:w-24 h-16 md:h-24 flex justify-center items-center hover:text-[#222222] text-secondaryColor transition-colors">
      <Icon className="text-4xl md:text-5xl" />
    </div>
  );
};

// Unified LogoItems component
interface LogoItemsProps {
  icons: React.ElementType[];
}

const LogoItems: React.FC<LogoItemsProps> = ({ icons }) => (
  <>
    {icons.map((Icon, index) => (
      <LogoItem key={index} Icon={Icon} />
    ))}
  </>
);

const Partner: React.FC = () => {
  // Define the icons for the top and bottom rows
  const topRowIcons = [TbBrandNextjs, FaReact, FaAngular, FaLaravel, FaWordpress, SiTailwindcss, FaCss3Alt, FaHtml5, IoLogoJavascript, DiJqueryLogo];
  const bottomRowIcons = [FaAws, FaDigitalOcean, IoLogoVercel, SiCloudways, FaGithub, SiAndroidstudio, SiFlutter, SiGoogleads, FaHubspot, SiHeroku];

  return (
    <section className="bg-primaryColor py-4">
      <div className="flex overflow-hidden">
        <TranslateWrapper>
          <LogoItems icons={topRowIcons} />
        </TranslateWrapper>
        <TranslateWrapper>
          <LogoItems icons={topRowIcons} />
        </TranslateWrapper>
        <TranslateWrapper>
          <LogoItems icons={topRowIcons} />
        </TranslateWrapper>
      </div>
      <div className="flex overflow-hidden mt-4">
        <TranslateWrapper reverse>
          <LogoItems icons={bottomRowIcons} />
        </TranslateWrapper>
        <TranslateWrapper reverse>
          <LogoItems icons={bottomRowIcons} />
        </TranslateWrapper>
        <TranslateWrapper reverse>
          <LogoItems icons={bottomRowIcons} />
        </TranslateWrapper>
      </div>
    </section>
  );
};

export default Partner;
