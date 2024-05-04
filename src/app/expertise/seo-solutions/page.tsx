import AboutSeo from "@/app/components/expertise/seo/AboutSeo";
import FAQ from "@/app/components/expertise/seo/Faq";
import Features from "@/app/components/expertise/seo/Features";
import SeoServices from "@/app/components/expertise/seo/SeoServices";
import CodeBeams from "@/app/ui/CodeBeams";
import Cta from "@/app/ui/Cta";
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
  description="Boost visibility with expert SEO strategies, ensuring your valuable content reaches a wider audience effortlessly."
/>
    <main className="py-20">
      <AboutSeo />
      <Features />
      <SeoServices />
      <FAQ />
      <Cta />
    </main>
    </>
  );
}