'use client'
import Ceo from "../components/About/Ceo"
import Hero from "../components/About/Hero"
import Partner from "../components/About/Partner"
import Team from "../components/About/Team"
import { LuCrown } from "react-icons/lu"
import CodeBeams from "../ui/CodeBeams"
import { useTranslation } from '@/app/hooks/useTranslation'

function About() {
  const { t } = useTranslation()
  
  return (
    <main>
      <CodeBeams
        icon={<LuCrown/>}
        title={t('aboutHero.title')}
        description={t('aboutHero.values')}
      />
      <Hero />
      <Ceo />
      <Team /> 
    </main>
  )
}

export default About