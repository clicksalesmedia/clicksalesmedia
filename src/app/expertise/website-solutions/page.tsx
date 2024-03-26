import Portfolio from "@/app/components/expertise/websolutions/Portfolio";
import WhyClicksalesmedia from "@/app/components/expertise/websolutions/why";
import CodeBeams from "@/app/ui/CodeBeams";
import { MdOutlineWeb } from "react-icons/md";
import Cta from "@/app/ui/Cta";
import WebSolution from "@/app/components/expertise/websolutions/webSolutions";
import Partner from "@/app/components/expertise/websolutions/partners";
import { Metadata } from "next";

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
  description="Show why you're better than your competitors"
/>
    <WhyClicksalesmedia />
    <WebSolution />
    <Portfolio />
    <Cta />
    <Partner />
    </main>
    </>
  );
}
