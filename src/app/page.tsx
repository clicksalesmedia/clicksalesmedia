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
import AIAgents from "./components/Home/AIAgents";
import FeaturedWork from "./components/Home/FeaturedWork";
import { OrganizationSchema, WebsiteSchema, LocalBusinessSchema } from "./components/JsonLdSchema";

export const metadata: Metadata = {
  title: 'Clicksalesmedia: AI Performance Marketing Agency in Dubai',
  description: "Welcome to Clicksalesmedia, the premier AI performance marketing agency dedicated to elevating your brand's online presence. We specialize in leveraging cutting-edge artificial intelligence and machine learning technologies to deliver unparalleled results for your business.",
  keywords: 'Performance marketing agency Dubai, AI marketing agency Dubai, digital marketing agency Dubai, SEO agency Dubai, social media marketing Dubai, PPC advertising Dubai',
  openGraph: {
    title: 'Clicksalesmedia: AI Performance Marketing Agency in Dubai',
    description: "Elevate your brand with cutting-edge AI-driven marketing strategies. We deliver data-driven campaigns that optimize ROI and fuel business growth.",
    images: [
      {
        url: 'https://www.clicksalesmedia.com/clicksalesmedia-marketing-agency.png',
        width: 1200,
        height: 630,
        alt: 'Clicksalesmedia - AI Marketing Agency Dubai',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Clicksalesmedia: AI Performance Marketing Agency',
    description: "AI-powered marketing strategies for maximum ROI and business growth",
    images: ['https://www.clicksalesmedia.com/clicksalesmedia-marketing-agency.png'],
  }
}

export default function Home() {
  
  return (
    <> 
      <OrganizationSchema />
      <WebsiteSchema />
      <LocalBusinessSchema />
      <main>
        <NewHero />
        <LogoClient />
        <About />
        <AIAgents />
        <FitText />
        <Feature />
        <FeaturedWork />
        <Testimonial />
        <Vision />
        <Blog />
        <Cta />    
      </main>
    </>
  );
}
