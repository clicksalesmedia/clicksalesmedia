const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function getAdminId() {
  try {
    const admin = await prisma.user.findUnique({
      where: { email: 'admin@clicksalesmedia.com' },
      select: { id: true, email: true, name: true }
    });

    if (!admin) {
      console.log('Admin user not found');
      return;
    }

    console.log('Admin user details:');
    console.log(`ID: ${admin.id}`);
    console.log(`Email: ${admin.email}`);
    console.log(`Name: ${admin.name}`);
    
  } catch (error) {
    console.error('Error getting admin user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

getAdminId(); 