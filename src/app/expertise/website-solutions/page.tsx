'use client'
import Portfolio from "@/app/components/expertise/websolutions/Portfolio";

import CodeBeams from "@/app/ui/CodeBeams";
import { MdOutlineWeb } from "react-icons/md";
import Cta from "@/app/ui/Cta";
import WebSolution from "@/app/components/expertise/websolutions/webSolutions";
import Partner from "@/app/components/expertise/websolutions/partners";
import WhyClicksalesmedia from "@/app/components/expertise/websolutions/WebClicksalesmedia";
import Solutions from "@/app/components/expertise/websolutions/solutions";
import { useTranslation } from '@/app/hooks/useTranslation'

export default function WebMasterSolutions() {
  const { t } = useTranslation()
  
  return (
    <> 
    <main>
    <CodeBeams
  icon={<MdOutlineWeb />}
  title={t('nav.megaMenu.websiteSolutions.title')}
  description={t('nav.megaMenu.websiteSolutions.description')}
/>
    <WhyClicksalesmedia />
    <Solutions />
    <Partner />
    <Cta />    
    </main>
    </>
  );
}
