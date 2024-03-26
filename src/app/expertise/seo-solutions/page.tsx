import FAQ from "@/app/components/expertise/seo/Faq";
import Hero from "@/app/components/expertise/seo/Hero";
import Services from "@/app/components/expertise/seo/Services";
import WhyClicksalesmedia from "@/app/components/expertise/seo/why";
import CodeBeams from "@/app/ui/CodeBeams";
import { Metadata } from "next";
import { RiSeoLine } from "react-icons/ri";


export const metadata: Metadata = {
  title: 'SEO Solutions',
  description: 'its branding page',
}

export default function Seo() {
  
  return (
    <> 
    <CodeBeams
  icon={<RiSeoLine />}
  title="SEO Solutions"
  description="Show why you're better than your competitors"
/>
    <section className="py-20">
      <Hero />
      <Services />
      <WhyClicksalesmedia />
      <FAQ />
    </section>
    </>
  );
}