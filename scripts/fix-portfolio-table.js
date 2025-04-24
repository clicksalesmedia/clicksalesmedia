const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function fixPortfolioTable() {
  try {
    console.log('Checking database tables...');
    
    // Check if Portfolio table exists
    const portfolioTableCheck = await prisma.$queryRaw`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public'
        AND table_name = 'Portfolio'
      );
    `;
    
    console.log('Portfolio table exists:', portfolioTableCheck[0].exists);
    
    if (!portfolioTableCheck[0].exists) {
      console.log('Portfolio table does not exist, this suggests a schema issue');
      return;
    }
    
    // Check the schema of the Portfolio table
    const portfolioSchema = await prisma.$queryRaw`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'Portfolio';
    `;
    
    console.log('Portfolio table schema:', portfolioSchema);
    
    // Count portfolio items
    const portfolioCount = await prisma.portfolio.count();
    console.log(`Portfolio count: ${portfolioCount}`);
    
    // Find admin user for the portfolio author
    const adminUser = await prisma.user.findFirst({
      where: { role: 'ADMIN' }
    });
    
    if (!adminUser) {
      console.log('No admin user found for portfolio author');
      return;
    }
    
    console.log('Found admin user for portfolio author:', adminUser.email);
    
    // Add sample portfolio item if none exist
    if (portfolioCount === 0) {
      console.log('Adding sample portfolio item...');
      
      const newPortfolio = await prisma.portfolio.create({
        data: {
          title: 'Sample Portfolio Project',
          slug: 'sample-portfolio-project',
          description: 'This is a sample portfolio project to demonstrate functionality.',
          projectType: 'WEBSITE',
          clientName: 'Demo Client',
          coverImage: '/images/portfolio/sample-cover.jpg',
          published: true,
          featured: true,
          results: 'Excellent results from this project.',
          authorId: adminUser.id,
          techStack: ['React', 'Next.js', 'Tailwind CSS'],
          gallery: ['/images/portfolio/gallery1.jpg', '/images/portfolio/gallery2.jpg']
        }
      });
      
      console.log('Added sample portfolio item:', newPortfolio.title);
    }
    
    // Check database permissions
    console.log('Checking database permissions...');
    const permissionCheck = await prisma.$queryRaw`
      SELECT grantee, privilege_type 
      FROM information_schema.table_privileges 
      WHERE table_name = 'Portfolio';
    `;
    
    console.log('Portfolio table permissions:', permissionCheck);
    
  } catch (error) {
    console.error('Error fixing portfolio table:', error);
  } finally {
    await prisma.$disconnect();
  }
}

fixPortfolioTable(); 