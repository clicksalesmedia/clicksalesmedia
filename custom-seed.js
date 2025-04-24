// This is a simple script that adds seed data to the database
// It uses the Prisma Client API directly

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function hashPassword(password) {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

async function main() {
  console.log('Starting custom seed operation...');
  
  try {
    // Create admin user
    const adminPassword = await hashPassword('adminpass123!');
    const admin = await prisma.user.create({
      data: {
        name: 'Admin User',
        email: 'admin@clicksalesmedia.com',
        password: adminPassword,
        role: 'ADMIN',
        image: 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp',
      },
    });
    console.log('Admin user created:', admin.email);
    
    // Create editor user
    const editorPassword = await hashPassword('editorpass123!');
    const editor = await prisma.user.create({
      data: {
        name: 'Content Editor',
        email: 'editor@clicksalesmedia.com',
        password: editorPassword,
        role: 'EDITOR',
        image: 'https://www.gravatar.com/avatar/11111111111111111111111111111111?d=mp',
      },
    });
    console.log('Editor user created:', editor.email);
    
    // Create categories
    const marketing = await prisma.category.create({
      data: { name: 'Marketing', slug: 'marketing' },
    });
    
    const ai = await prisma.category.create({
      data: { name: 'AI', slug: 'ai' },
    });
    
    const webDev = await prisma.category.create({
      data: { name: 'Web Development', slug: 'web-development' },
    });
    
    const seo = await prisma.category.create({
      data: { name: 'SEO', slug: 'seo' },
    });
    
    console.log('Categories created');
    
    // Create blog posts
    const blogPost1 = await prisma.blogPost.create({
      data: {
        title: 'The Future of AI in Digital Marketing',
        slug: 'future-of-ai-in-digital-marketing',
        excerpt: 'Discover how artificial intelligence is transforming the digital marketing landscape.',
        published: true,
        coverImage: '/blog/ai-marketing.jpg',
        authorId: admin.id,
        categories: {
          connect: [
            { id: marketing.id },
            { id: ai.id },
          ],
        },
      },
    });
    
    const blogPost2 = await prisma.blogPost.create({
      data: {
        title: 'Essential SEO Strategies for 2025',
        slug: 'essential-seo-strategies-2025',
        excerpt: 'Stay ahead of the competition with these cutting-edge SEO techniques.',
        published: true,
        coverImage: '/blog/seo-strategies.jpg',
        authorId: editor.id,
        categories: {
          connect: [
            { id: marketing.id },
            { id: seo.id },
          ],
        },
      },
    });
    
    console.log('Blog posts created');
    
    // Create portfolio items
    const portfolio1 = await prisma.portfolio.create({
      data: {
        title: 'E-commerce Website Redesign',
        slug: 'ecommerce-website-redesign',
        description: 'Complete redesign of an e-commerce platform resulting in 45% increase in conversion rates.',
        images: ['/portfolio/ecommerce-1.jpg', '/portfolio/ecommerce-2.jpg'],
        technologies: ['React', 'Next.js', 'Tailwind CSS', 'Shopify'],
        published: true,
        featured: true,
        client: 'Fashion Retailer Inc.',
        authorId: admin.id,
      },
    });
    
    const portfolio2 = await prisma.portfolio.create({
      data: {
        title: 'AI-Powered Marketing Dashboard',
        slug: 'ai-marketing-dashboard',
        description: 'Custom marketing analytics platform with AI-driven insights for a multinational company.',
        images: ['/portfolio/dashboard-1.jpg', '/portfolio/dashboard-2.jpg'],
        technologies: ['Python', 'TensorFlow', 'Vue.js', 'D3.js', 'AWS'],
        published: true,
        featured: true,
        client: 'Global Marketing Corp',
        authorId: admin.id,
      },
    });
    
    console.log('Portfolio items created');
    
    console.log('Seed data import complete!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 