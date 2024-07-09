import Portfolio from "@/app/components/expertise/websolutions/Portfolio";

import CodeBeams from "@/app/ui/CodeBeams";
import { MdOutlineWeb } from "react-icons/md";
import Cta from "@/app/ui/Cta";
import WebSolution from "@/app/components/expertise/websolutions/webSolutions";
import Partner from "@/app/components/expertise/websolutions/partners";
import { Metadata } from "next";
import WhyClicksalesmedia from "@/app/components/expertise/websolutions/WebClicksalesmedia";
import Solutions from "@/app/components/expertise/websolutions/solutions";

export const metadata: Metadata = {
  title: 'Website Solutions agency in dubai',
  description: "Transform your online presence with Clicksalesmedia, Dubai's leading web solutions agency. Offering comprehensive web development, design, and SEO services to drive business growth.",
  keywords:'Web solutions agency in dubai, create website, create landing page'
}

export default function WebMasterSolutions() {
  
  return (
    <> 
    <main>
    <CodeBeams
  icon={<MdOutlineWeb />}
  title="Web Solution"
  description="We design websites tailored to your brand identity, ensuring a cohesive and impactful online presence."
/>
    <WhyClicksalesmedia />
    <Solutions />
    <Partner />
    <Cta />    
    </main>
    </>
  );
}
