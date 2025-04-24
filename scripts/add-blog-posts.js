const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function addBlogPosts() {
  try {
    console.log('Checking existing blog posts...');
    
    // Count blog posts
    const blogCount = await prisma.blogPost.count();
    console.log(`Existing blog post count: ${blogCount}`);
    
    // Get categories for blog posts
    const categories = await prisma.category.findMany();
    console.log(`Found ${categories.length} categories`);
    
    if (categories.length === 0) {
      console.log('Creating categories first...');
      await prisma.category.createMany({
        data: [
          { name: 'Marketing', slug: 'marketing' },
          { name: 'SEO', slug: 'seo' },
          { name: 'Web Development', slug: 'web-development' },
          { name: 'AI', slug: 'ai' }
        ],
        skipDuplicates: true
      });
      console.log('Categories created');
    }
    
    // Find admin user for the blog post author
    const adminUser = await prisma.user.findFirst({
      where: { role: 'ADMIN' }
    });
    
    if (!adminUser) {
      console.log('No admin user found for blog post author');
      return;
    }
    
    console.log('Found admin user:', adminUser.email);
    
    // Get updated categories
    const updatedCategories = await prisma.category.findMany();
    
    // Find Marketing category
    const marketingCategory = updatedCategories.find(c => c.slug === 'marketing');
    // Find SEO category
    const seoCategory = updatedCategories.find(c => c.slug === 'seo');
    // Find AI category
    const aiCategory = updatedCategories.find(c => c.slug === 'ai');
    // Find Web Development category
    const webDevCategory = updatedCategories.find(c => c.slug === 'web-development');
    
    console.log('Categories prepared for blog posts');
    
    // Add sample blog posts if few exist
    if (blogCount < 3) {
      console.log('Adding sample blog posts...');
      
      // Blog post 1
      const blogPost1 = await prisma.blogPost.create({
        data: {
          title: 'The Future of Digital Marketing in 2025',
          slug: 'future-of-digital-marketing-2025',
          excerpt: 'Explore the emerging trends and technologies shaping the future of digital marketing in 2025 and beyond.',
          content: '# The Future of Digital Marketing in 2025\n\nDigital marketing continues to evolve at a rapid pace, driven by technological advancements and changing consumer behaviors. In this post, we explore the key trends that will shape digital marketing in 2025.\n\n## AI-Powered Personalization\n\nArtificial Intelligence is revolutionizing how marketers understand and engage with their audiences. By 2025, AI will enable hyper-personalized marketing at scale, analyzing vast amounts of data to predict consumer preferences and behavior with unprecedented accuracy.\n\n## Voice and Visual Search Optimization\n\nAs voice assistants and visual search technologies become more sophisticated, optimizing for these channels will be essential. Marketers will need to adapt their SEO strategies to accommodate conversational queries and image-based searches.\n\n## Immersive Experiences\n\nAugmented reality (AR) and virtual reality (VR) will transform how brands engage with consumers, creating immersive experiences that blur the line between digital and physical worlds. From virtual try-ons to interactive product demonstrations, these technologies offer exciting new ways to showcase products and services.\n\n## Privacy-First Marketing\n\nWith increasing concerns about data privacy and security, successful marketers will prioritize transparency and ethical data practices. This approach builds trust with consumers while still leveraging data for personalized experiences.\n\n## Conclusion\n\nThe future of digital marketing promises exciting opportunities for brands that stay ahead of these trends. By embracing new technologies and focusing on creating meaningful connections with consumers, businesses can thrive in the dynamic marketing landscape of 2025.',
          coverImage: '/images/blog/digital-marketing-future.jpg',
          published: true,
          authorId: adminUser.id,
          categories: {
            connect: [
              { id: marketingCategory.id },
              { id: aiCategory.id }
            ]
          }
        }
      });
      
      console.log('Added blog post 1:', blogPost1.title);
      
      // Blog post 2
      const blogPost2 = await prisma.blogPost.create({
        data: {
          title: 'Essential SEO Strategies for 2025',
          slug: 'essential-seo-strategies-2025',
          excerpt: 'Master the latest SEO techniques to improve your search engine rankings and drive organic traffic.',
          content: '# Essential SEO Strategies for 2025\n\nSearch Engine Optimization continues to evolve with algorithm updates and changing search behaviors. Here are the essential SEO strategies that will help your website succeed in 2025.\n\n## Core Web Vitals Optimization\n\nGoogle\'s Core Web Vitals have become increasingly important ranking factors. Focusing on loading performance, interactivity, and visual stability of your website will improve both user experience and search rankings.\n\n## AI-Generated Content Guidelines\n\nWith the proliferation of AI content generation tools, search engines have developed sophisticated methods to evaluate content quality. While AI can assist in content creation, ensuring human oversight, originality, and expertise remains crucial for ranking success.\n\n## Semantic Search Understanding\n\nSearch engines now understand context and user intent better than ever. Creating content that comprehensively addresses topics rather than focusing on specific keywords will yield better results in semantic search environments.\n\n## Mobile-First Indexing\n\nAs mobile browsing continues to dominate, optimizing for mobile-first indexing is no longer optional. Responsive design, fast loading speeds, and mobile-friendly navigation are essential elements of successful SEO strategies.\n\n## Local SEO Enhancement\n\nFor businesses with physical locations, local SEO remains a powerful tool. Optimizing Google Business profiles, managing local citations, and generating authentic customer reviews will boost visibility in local search results.\n\n## Conclusion\n\nStaying ahead in SEO requires adaptability and a commitment to delivering value to users. By implementing these strategies, businesses can improve their search visibility and drive meaningful organic traffic in 2025 and beyond.',
          coverImage: '/images/blog/seo-strategies.jpg',
          published: true,
          authorId: adminUser.id,
          categories: {
            connect: [
              { id: seoCategory.id },
              { id: marketingCategory.id }
            ]
          }
        }
      });
      
      console.log('Added blog post 2:', blogPost2.title);
      
      // Blog post 3
      const blogPost3 = await prisma.blogPost.create({
        data: {
          title: 'Building Modern Web Applications in 2025',
          slug: 'building-modern-web-applications-2025',
          excerpt: 'Discover the latest frameworks, tools, and best practices for developing cutting-edge web applications.',
          content: '# Building Modern Web Applications in 2025\n\nWeb development continues to evolve rapidly, with new frameworks, tools, and methodologies emerging regularly. This post explores the essential approaches for building modern web applications in 2025.\n\n## Server Components and Hybrid Rendering\n\nThe distinction between client-side and server-side rendering has blurred, giving way to hybrid approaches that optimize for both performance and interactivity. Frameworks like Next.js and similar technologies allow developers to choose the most appropriate rendering strategy for each component.\n\n## API-First Development\n\nAPI-first development has become the standard approach for building scalable applications. By designing robust APIs before implementing the front-end, developers can ensure flexibility, reusability, and better integration with various platforms and services.\n\n## Micro-Frontend Architecture\n\nAs applications grow in complexity, micro-frontend architecture offers a way to manage development at scale. This approach enables teams to work independently on different parts of an application while maintaining a cohesive user experience.\n\n## Web Components and Shadow DOM\n\nWeb Components provide a standardized way to create reusable, encapsulated components without relying on specific frameworks. Combined with Shadow DOM for style isolation, this approach enhances maintainability and reduces dependencies.\n\n## Performance Optimization\n\nWith Core Web Vitals affecting both user experience and search rankings, performance optimization has become more critical than ever. Techniques like code splitting, lazy loading, and effective caching strategies are essential for delivering fast, responsive web applications.\n\n## Conclusion\n\nBuilding modern web applications requires a thoughtful approach to architecture, performance, and user experience. By embracing these methodologies and staying informed about emerging technologies, developers can create web applications that are robust, scalable, and delightful to use.',
          coverImage: '/images/blog/web-development.jpg',
          published: true,
          authorId: adminUser.id,
          categories: {
            connect: [
              { id: webDevCategory.id },
              { id: marketingCategory.id }
            ]
          }
        }
      });
      
      console.log('Added blog post 3:', blogPost3.title);
    }
    
    // Final count of blog posts
    const updatedBlogCount = await prisma.blogPost.count();
    console.log(`Updated blog post count: ${updatedBlogCount}`);
    
  } catch (error) {
    console.error('Error adding blog posts:', error);
  } finally {
    await prisma.$disconnect();
  }
}

addBlogPosts(); 