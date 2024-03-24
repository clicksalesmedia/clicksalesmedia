"use client";
import HeroScrollDemo from "@/app/components/expertise/websolutions/Hero";
import WebServices from "@/app/components/expertise/websolutions/services";
import Solutions from "@/app/components/expertise/websolutions/solutions";
import Portfolio from "@/app/components/expertise/websolutions/Portfolio";
import Features from "@/app/components/expertise/websolutions/features";
import WhyClicksalesmedia from "@/app/components/expertise/websolutions/why";
import CodeBeams from "@/app/ui/CodeBeams";
import { MdOutlineWeb } from "react-icons/md";
import Cta from "@/app/ui/Cta";
import WebSolution from "@/app/components/expertise/websolutions/webSolutions";
import Partner from "@/app/components/expertise/websolutions/partners";


export default function WebMasterSolutions() {
  
  return (
    <> 
    <main>
    <CodeBeams
  icon={<MdOutlineWeb />}
  title="Web Solution"
  description="Show why you're better than your competitors"
/>
    <WhyClicksalesmedia />
    <HeroScrollDemo />
    <WebSolution />
    <Portfolio />
    <Cta />
    <Partner />
    </main>
    </>
  );
}
