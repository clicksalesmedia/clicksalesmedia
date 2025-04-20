import { PrismaClient } from '@prisma/client';

async function main() {
  console.log('Connecting to database...');
  const prisma = new PrismaClient();
  
  try {
    console.log('Querying blog posts...');
    
    // Get total count
    const totalCount = await prisma.blogPost.count();
    console.log(`Total blog posts: ${totalCount}`);
    
    // Get published posts
    const publishedPosts = await prisma.blogPost.count({
      where: { published: true }
    });
    console.log(`Published posts: ${publishedPosts}`);
    
    // Get draft posts
    const draftPosts = await prisma.blogPost.count({
      where: { published: false }
    });
    console.log(`Draft posts: ${draftPosts}`);
    
    // Get all posts with details
    const allPosts = await prisma.blogPost.findMany({
      include: {
        author: {
          select: {
            name: true,
            email: true
          }
        },
        categories: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    console.log('\nDetails of all blog posts:');
    allPosts.forEach((post, index) => {
      console.log(`\n--- Post ${index + 1} ---`);
      console.log(`ID: ${post.id}`);
      console.log(`Title: ${post.title}`);
      console.log(`Slug: ${post.slug}`);
      console.log(`Status: ${post.published ? 'Published' : 'Draft'}`);
      console.log(`Author: ${post.author.name} (${post.author.email})`);
      console.log(`Categories: ${post.categories.map(c => c.name).join(', ')}`);
      console.log(`Created: ${post.createdAt}`);
      console.log(`Updated: ${post.updatedAt}`);
    });
    
  } catch (error) {
    console.error('Error querying the database:', error);
  } finally {
    await prisma.$disconnect();
    console.log('\nDatabase connection closed.');
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  }); 