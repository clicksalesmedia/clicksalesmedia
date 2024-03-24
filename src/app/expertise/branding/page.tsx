
import Swap from "@/app/components/expertise/branding/SwapColumnFeatures"
import Cta from "@/app/ui/Cta"
import CodeBeams from "@/app/ui/CodeBeams";
import { Metadata } from 'next';
import { IoBusiness } from "react-icons/io5";


export const metadata: Metadata = {
  title: 'Branding',
  description: 'its branding page',
}


function Branding() {
  return (
    <>
    <CodeBeams
    icon={<IoBusiness />}
    title="Business to Business Solutions"
    description="Show why you're better than your competitors"
  />
  <section>
  <Swap />
  <Cta />
  </section>
   </>
  )
}

export default Branding