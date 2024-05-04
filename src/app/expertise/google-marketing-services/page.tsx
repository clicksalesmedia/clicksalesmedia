import FAQ from "@/app/components/expertise/ppcads/Faq";
import FitText from "@/app/components/expertise/ppcads/FitText";
import GoogleServices from "@/app/components/expertise/ppcads/GoogleServices";
import Hero from "@/app/components/expertise/ppcads/Hero";
import CodeBeams from "@/app/ui/CodeBeams";
import { Metadata } from "next";
import { FaGoogle } from "react-icons/fa";

export const metadata: Metadata = {
  title: 'Google Marketing Services',
  description: 'its branding page',
}

export default function PpcAds() {
  
  return (
    <> 
    <CodeBeams
  icon={<FaGoogle />}
  title="Google Marketing Solutions"
  description="Amplify your online influence, drive conversions, and propel your business towards unparalleled success."

/>
    <main className="py-20">
      <Hero />  
      <FitText />
      <GoogleServices /> 
      <FAQ />
    </main>
    </>
  );
}
