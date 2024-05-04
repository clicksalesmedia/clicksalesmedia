import Ceo from "../components/About/Ceo"
import Hero from "../components/About/Hero"
import Partner from "../components/About/Partner"
import Team from "../components/About/Team"
import { LuCrown } from "react-icons/lu"
import CodeBeams from "../ui/CodeBeams"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'About us',
  description: 'its branding page',
}

function About() {
  return (
 
    <main>
         <CodeBeams
    icon={<LuCrown/>}
    title="About us"
    description="We prioritize integrity, innovation, and customer satisfaction."
  
  />
        <Ceo />
        <Team /> 
    </main>
  )
}

export default About