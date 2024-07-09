
import { Metadata } from "next";

import CodeBeams from "@/app/ui/CodeBeams";
import { IoBusiness } from "react-icons/io5";
import Cta from "@/app/ui/Cta";
import Services from "@/app/components/expertise/b2b/Services";
import Industries from "@/app/components/expertise/b2b/Industries";
import Features from "@/app/components/expertise/b2b/Features";
import Animationsvg from "@/app/components/expertise/b2b/animationsvg";


export const metadata: Metadata = {
  title: 'Business to Business agency based in dubai',
  description: "Boost your business with Clicksalesmedia, Dubai's leading B2B AI marketing agency. Enhance SEO and optimize digital campaigns with our AI-driven, data-focused strategies.",
  keywords:'B2B Marketing agency in dubai, B2B marketing agency'
}

export default function BusinessToBusiness() {
  
  return (
    <> 
    <CodeBeams
  icon={<IoBusiness />}
  title="Business to Business Solutions"
  description="Our strategic marketing simplifies processes, fuels growth, and strengthens your industry presence."
/>
    <main className="py-20">

  
      <Services />
      <Animationsvg />
      <Features />
      <Industries />
      <Cta />
    </main>
    </>
  );
}