'use client'
import { FaGoogle } from "react-icons/fa"
import CodeBeams from "@/app/ui/CodeBeams"
import FAQ from "@/app/components/expertise/ppcads/Faq"
import FitText from "@/app/components/expertise/ppcads/FitText"
import Hero from "@/app/components/expertise/ppcads/Hero"
import GoogleServices from "@/app/components/expertise/ppcads/GoogleServices"
import { useTranslation } from '@/app/hooks/useTranslation'

function GoogleMarketingServices() {
  const { t } = useTranslation()
  
  return (
    <>
      <CodeBeams
        icon={<FaGoogle />}
        title={t('nav.megaMenu.googleMarketing.title')}
        description={t('nav.megaMenu.googleMarketing.description')}
      />
      <main className="py-20">
        <Hero />
        <FitText />
        <GoogleServices />
        <FAQ />
      </main>
    </>
  )
}

export default GoogleMarketingServices
