'use client'
import CodeBeams from "@/app/ui/CodeBeams"
import { IoBusiness } from "react-icons/io5"
import Cta from "@/app/ui/Cta"
import Services from "@/app/components/expertise/b2b/Services"
import Industries from "@/app/components/expertise/b2b/Industries"
import Features from "@/app/components/expertise/b2b/Features"
import Animationsvg from "@/app/components/expertise/b2b/animationsvg"
import { useTranslation } from '@/app/hooks/useTranslation'

function BusinessToBusiness() {
  const { t } = useTranslation()
  
  return (
    <> 
      <CodeBeams
        icon={<IoBusiness />}
        title={t('nav.megaMenu.b2b.title')}
        description={t('nav.megaMenu.b2b.description')}
      />
      <main className="py-20">
        <Services />
        <Animationsvg />
        <Features />
        <Industries />
        <Cta />
      </main>
    </>
  )
}

export default BusinessToBusiness