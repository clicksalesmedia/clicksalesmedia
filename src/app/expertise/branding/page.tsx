
import Swap from "@/app/components/expertise/branding/SwapColumnFeatures"
import Cta from "@/app/ui/Cta"
import CodeBeams from "@/app/ui/CodeBeams";
import { Metadata } from 'next';
import { IoBusiness } from "react-icons/io5";
import BrandingFeatures from "@/app/components/expertise/branding/Features";
import FitText from "@/app/components/expertise/branding/FitText";
import Services from "@/app/components/expertise/branding/Services";
import Portfolio from "@/app/components/expertise/branding/Portfolio";


export const metadata: Metadata = {
  title: 'Branding Agency',
  description: "Experience unmatched SEO and ROI with Clicksalesmedia, Dubai's top AI marketing agency. Leverage AI-driven strategies for superior search engine rankings and optimized digital campaigns.",
  keywords:'Branding agency in dubai, Brand marketing agency in dubai'
}


function Branding() {
  return (
    <>
    <CodeBeams
    icon={<IoBusiness />}
    title="Branding"
    description="Brands grow through consistent communication and engagement."
  />
  <main>
  <Swap />
  <BrandingFeatures />
  <div className="overflow-x-hidden">
  <Services />
  </div>
  <FitText />
  <Portfolio />
  <Cta />
  </main>
   </>
  )
}

export default Branding