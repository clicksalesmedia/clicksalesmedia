
import { Metadata } from "next";

import CodeBeams from "@/app/ui/CodeBeams";
import { IoBusiness } from "react-icons/io5";
import Cta from "@/app/ui/Cta";
import Services from "@/app/components/expertise/b2b/Services";
import Industries from "@/app/components/expertise/b2b/Industries";
import Features from "@/app/components/expertise/b2b/Features";


export const metadata: Metadata = {
  title: 'Business to Business',
  description: 'its branding page',
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
      <Features />
      <Industries />
      <Cta />
    </main>
    </>
  );
}