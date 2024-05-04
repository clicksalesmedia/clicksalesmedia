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
  title: 'Website Solution',
  description: 'its branding page',
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
