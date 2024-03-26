import { Metadata } from "next";
import BlogSection from "../components/Blog/BlogSection";
import LatestBlog from "../components/Blog/latestBlog";
import CodeBeams from "../ui/CodeBeams";
import { BiDetail } from "react-icons/bi";

export const metadata: Metadata = {
  title: 'Blog',
  description: 'its branding page',
}

export default function Blog() {
  
    return (
      <> 
      <CodeBeams
  icon={<BiDetail />}
  title="Blogs & Articles"
  description="Show why you're better than your competitors"
/>
      <section className="p-10">
        <LatestBlog />
        <BlogSection />
      </section>
      </>
    );
  }