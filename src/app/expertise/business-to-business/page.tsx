
import { Metadata } from "next";
import Hero from "@/app/components/expertise/b2b/Hero";

import CodeBeams from "@/app/ui/CodeBeams";
import { IoBusiness } from "react-icons/io5";
import B2bAdvantages from "@/app/components/expertise/b2b/Section";
import Cta from "@/app/ui/Cta";
import ServicesComponent from "@/app/components/expertise/b2b/Services";

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
  description="Show why you're better than your competitors"
/>
    <section className="py-20">
      <Hero />
      <ServicesComponent />
      <B2bAdvantages />
      <Cta />
    </section>
    </>
  );
}