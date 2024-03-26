import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Header/Navbar";
import Footer from "./components/Footer/Footer";
import AnimatedCursor from "react-animated-cursor"
import ScrollToTopButton from "./utils/ScrollToTopButton";



const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default:"Create Next App",
    template:"%s - clicksalesmedia Dubai Marketing Agency"},
  description: "clicksalesmedia is here",
  keywords: "digital marketing, marketing, sales, business to business"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      <Navbar />
      <AnimatedCursor
      innerSize={8}
      outerSize={10}
      color='178, 137, 85'
      outerAlpha={0.2}
      innerScale={0.7}
      outerScale={5}
      clickables={[
        'a',
        'input[type="text"]',
        'input[type="email"]',
        'input[type="number"]',
        'input[type="submit"]',
        'input[type="image"]',
        'label[for]',
        'select',
        'textarea',
        'button',
        '.link'
      ]}
    />
     
        {children}
        <ScrollToTopButton />
      <Footer />
        </body>
    </html>
  );
}
