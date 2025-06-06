import { Metadata } from "next";
import BlogSection from "../components/Blog/BlogSection";
import LatestBlog from "../components/Blog/latestBlog";
import CodeBeams from "../ui/CodeBeams";
import { BiDetail } from "react-icons/bi";

export const metadata: Metadata = {
  title: 'Blog - ClickSales Media',
  description: 'Discover insights and strategies to help your business thrive online',
}

export default function Blog() {
  
    return (
      <div className="min-h-screen bg-[#272727]">
        <div className="pt-20 md:pt-24">
          <CodeBeams
            icon={<BiDetail />}
            title="Blogs & Articles"
            description="Discover insights and strategies to help your business thrive online"
          />
        </div>
        <section>
          <LatestBlog />
          <BlogSection />
        </section>
      </div>
    );
  }