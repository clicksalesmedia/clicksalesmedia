import About from "./components/Home/About";
import Blog from "./components/Home/Blog";
import Cta from "./ui/Cta";
import Feature from "./components/Home/Feature";
import FitText from "./components/Home/FitText";
import Hero from "./components/Home/Hero";
import LogoClient from "./components/Home/LogoClient";
import Testimonial from "./components/Home/Testimonial";
import Vision from "./components/Home/Vision";
import { Metadata } from "next";
import NewHero from "./components/Home/NewHero";

export const metadata: Metadata = {
  title: 'Clicksalesmedia: AI Perfomance Marketing Agency',
  description: "Welcome to Clicksalesmedia, the premier AI performance marketing agency dedicated to elevating your brand's online presence. We specialize in leveraging cutting-edge artificial intelligence and machine learning technologies to deliver unparalleled results for your business. Our expert team crafts data-driven strategies that optimize your digital marketing campaigns, ensuring maximum ROI and growth.",
  keywords:'Performance marketing agency, digital marketing agency, performance marketing agency'
}

export default function Home() {
  
  return (
    <> 
    <main>
      <NewHero />
      <LogoClient />
      <About />
      <FitText />
      <Feature />
      <Testimonial />
      <Vision />
      <Blog />
      <Cta />    
    </main>
    </>
  );
}
