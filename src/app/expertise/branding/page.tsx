'use client'
import Swap from "@/app/components/expertise/branding/SwapColumnFeatures"
import Cta from "@/app/ui/Cta"
import CodeBeams from "@/app/ui/CodeBeams"
import { IoBusiness } from "react-icons/io5"
import BrandingFeatures from "@/app/components/expertise/branding/Features"
import FitText from "@/app/components/expertise/branding/FitText"
import Services from "@/app/components/expertise/branding/Services"
import Portfolio from "@/app/components/expertise/branding/Portfolio"
import BrandingTitle from "@/app/components/expertise/branding/BrandingTitle"
import { useTranslation } from '@/app/hooks/useTranslation'

function Branding() {
  const { t } = useTranslation()
  
  return (
    <>
      <CodeBeams
        icon={<IoBusiness />}
        title={t('nav.megaMenu.branding.title')}
        description={t('nav.megaMenu.branding.description')}
      />
      <main>
        <BrandingTitle />
        <Swap />
        <BrandingFeatures />
        <div className="overflow-x-hidden">
          <Services />
        </div>
        <FitText />
        <Portfolio />
        <Cta />
      </main>
    </>
  )
}

export default Branding