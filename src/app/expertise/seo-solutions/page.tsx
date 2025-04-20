import AboutSeo from "@/app/components/expertise/seo/AboutSeo";
import FAQ from "@/app/components/expertise/seo/Faq";
import Features from "@/app/components/expertise/seo/Features";
import SeoServices from "@/app/components/expertise/seo/SeoServices";
import CodeBeams from "@/app/ui/CodeBeams";
import Cta from "@/app/ui/Cta";
import { Metadata } from "next";
import { RiSeoLine } from "react-icons/ri";

export const metadata: Metadata = {
  title: 'SEO Solutions agency in dubai',
  description: "Enhance your online presence with Clicksalesmedia's expert SEO services in Dubai. Boost search engine rankings and drive organic traffic with our proven, AI-driven strategies.",
  keywords:'SEO Agency in dubai, SEO Marketing in dubai'
}

// Default text as fallback
const defaultTitle = "SEO Solutions";
const defaultDescription = "Boost visibility with expert SEO strategies, ensuring your valuable content reaches a wider audience effortlessly.";

export default function Seo() {
  return (
    <> 
    <CodeBeams
      icon={<RiSeoLine />}
      title={defaultTitle}
      description={defaultDescription}
      titleTransKey="seo.pageTitle"
      descriptionTransKey="seo.pageDescription"
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