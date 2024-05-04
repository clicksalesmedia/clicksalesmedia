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
  title: 'Home',
  description: 'its branding page',
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
