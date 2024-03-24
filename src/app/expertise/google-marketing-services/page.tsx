'use client'
import FAQ from "@/app/components/expertise/ppcads/Faq";
import FitText from "@/app/components/expertise/ppcads/FitText";
import GoogleServices from "@/app/components/expertise/ppcads/GoogleServices";
import Hero from "@/app/components/expertise/ppcads/Hero";
import CodeBeams from "@/app/ui/CodeBeams";
import { FaGoogle } from "react-icons/fa";

export default function PpcAds() {
  
  return (
    <> 
    <CodeBeams
  icon={<FaGoogle />}
  title="Google Marketing Solutions"
  description="Show why you're better than your competitors"

/>
    <main className="p-20">
      <Hero />  
      <FitText />
      <GoogleServices /> 
      <FAQ />
    </main>
    </>
  );
}
