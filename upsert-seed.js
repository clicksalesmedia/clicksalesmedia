// This is a simple script that adds seed data to the database
// It uses the Prisma Client API directly and loads environment variables

// Load environment variables from .env file
require('dotenv').config();

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

// Check if DATABASE_URL is available
if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL environment variable is not set');
  process.exit(1);
}

const prisma = new PrismaClient();

async function hashPassword(password) {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

async function main() {
  console.log('Starting upsert seed operation...');
  console.log('Using database:', process.env.DATABASE_URL);
  
  try {
    // Create admin user with upsert (create if not exists, update if exists)
    const adminPassword = await hashPassword('adminpass123!');
    const admin = await prisma.user.upsert({
      where: { email: 'admin@clicksalesmedia.com' },
      update: {
        name: 'Admin User',
        password: adminPassword,
        role: 'ADMIN',
        image: 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp',
      },
      create: {
        name: 'Admin User',
        email: 'admin@clicksalesmedia.com',
        password: adminPassword,
        role: 'ADMIN',
        image: 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp',
      },
    });
    console.log('Admin user upserted:', admin.email);
    
    // Create regular user with upsert
    const userPassword = await hashPassword('userpass123!');
    const regularUser = await prisma.user.upsert({
      where: { email: 'editor@clicksalesmedia.com' },
      update: {
        name: 'Content Editor',
        password: userPassword,
        role: 'USER',
        image: 'https://www.gravatar.com/avatar/11111111111111111111111111111111?d=mp',
      },
      create: {
        name: 'Content Editor',
        email: 'editor@clicksalesmedia.com',
        password: userPassword,
        role: 'USER',
        image: 'https://www.gravatar.com/avatar/11111111111111111111111111111111?d=mp',
      },
    });
    console.log('Regular user upserted:', regularUser.email);
    
    // Create categories with upsert
    const marketing = await prisma.category.upsert({
      where: { slug: 'marketing' },
      update: { name: 'Marketing' },
      create: { name: 'Marketing', slug: 'marketing' },
    });
    
    const ai = await prisma.category.upsert({
      where: { slug: 'ai' },
      update: { name: 'AI' },
      create: { name: 'AI', slug: 'ai' },
    });
    
    const webDev = await prisma.category.upsert({
      where: { slug: 'web-development' },
      update: { name: 'Web Development' },
      create: { name: 'Web Development', slug: 'web-development' },
    });
    
    const seo = await prisma.category.upsert({
      where: { slug: 'seo' },
      update: { name: 'SEO' },
      create: { name: 'SEO', slug: 'seo' },
    });
    
    console.log('Categories upserted');
    
    // Create blog posts with upsert
    const blogPost1 = await prisma.blogPost.upsert({
      where: { slug: 'future-of-ai-in-digital-marketing' },
      update: {
        title: 'The Future of AI in Digital Marketing',
        excerpt: 'Discover how artificial intelligence is transforming the digital marketing landscape.',
        content: 'Artificial intelligence is rapidly changing how we approach digital marketing.',
        published: true,
        coverImage: '/blog/ai-marketing.jpg',
        authorId: admin.id,
      },
      create: {
        title: 'The Future of AI in Digital Marketing',
        slug: 'future-of-ai-in-digital-marketing',
        excerpt: 'Discover how artificial intelligence is transforming the digital marketing landscape.',
        content: 'Artificial intelligence is rapidly changing how we approach digital marketing.',
        published: true,
        coverImage: '/blog/ai-marketing.jpg',
        authorId: admin.id,
      },
    });
    
    // Connect categories to the blog post after creation
    await prisma.blogPost.update({
      where: { id: blogPost1.id },
      data: {
        categories: {
          connect: [
            { id: marketing.id },
            { id: ai.id },
          ],
        },
      },
    });
    
    const blogPost2 = await prisma.blogPost.upsert({
      where: { slug: 'essential-seo-strategies-2025' },
      update: {
        title: 'Essential SEO Strategies for 2025',
        excerpt: 'Stay ahead of the competition with these cutting-edge SEO techniques.',
        content: 'Search engine algorithms are evolving rapidly, requiring new approaches to optimization.',
        published: true,
        coverImage: '/blog/seo-strategies.jpg',
        authorId: regularUser.id,
      },
      create: {
        title: 'Essential SEO Strategies for 2025',
        slug: 'essential-seo-strategies-2025',
        excerpt: 'Stay ahead of the competition with these cutting-edge SEO techniques.',
        content: 'Search engine algorithms are evolving rapidly, requiring new approaches to optimization.',
        published: true,
        coverImage: '/blog/seo-strategies.jpg',
        authorId: regularUser.id,
      },
    });
    
    // Connect categories to the blog post after creation
    await prisma.blogPost.update({
      where: { id: blogPost2.id },
      data: {
        categories: {
          connect: [
            { id: marketing.id },
            { id: seo.id },
          ],
        },
      },
    });
    
    console.log('Blog posts upserted');
    
    // Create portfolio items with upsert
    const portfolio1 = await prisma.portfolio.upsert({
      where: { slug: 'ecommerce-website-redesign' },
      update: {
        title: 'E-commerce Website Redesign',
        description: 'Complete redesign of an e-commerce platform resulting in 45% increase in conversion rates.',
        images: ['/portfolio/ecommerce-1.jpg', '/portfolio/ecommerce-2.jpg'],
        technologies: ['React', 'Next.js', 'Tailwind CSS', 'Shopify'],
        published: true,
        featured: true,
        client: 'Fashion Retailer Inc.',
        authorId: admin.id,
      },
      create: {
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
    
    const portfolio2 = await prisma.portfolio.upsert({
      where: { slug: 'ai-marketing-dashboard' },
      update: {
        title: 'AI-Powered Marketing Dashboard',
        description: 'Custom marketing analytics platform with AI-driven insights for a multinational company.',
        images: ['/portfolio/dashboard-1.jpg', '/portfolio/dashboard-2.jpg'],
        technologies: ['Python', 'TensorFlow', 'Vue.js', 'D3.js', 'AWS'],
        published: true,
        featured: true,
        client: 'Global Marketing Corp',
        authorId: admin.id,
      },
      create: {
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
    
    console.log('Portfolio items upserted');
    
    console.log('Seed data import complete!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 