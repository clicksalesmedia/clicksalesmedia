'use client'
import { FaGoogle } from "react-icons/fa"
import Ceo from "../components/About/Ceo"
import Hero from "../components/About/Hero"
import Partner from "../components/About/Partner"
import Team from "../components/About/Team"
import { LuCrown } from "react-icons/lu"
import CodeBeams from "../ui/CodeBeams"

function About() {
  return (
 
    <main>
         <CodeBeams
    icon={<LuCrown/>}
    title="About us"
    description="Show why you're better than your competitors"
  
  />
        <Ceo />
        <Hero />
        <Team /> 
        <Partner />
    </main>
  )
}

export default About