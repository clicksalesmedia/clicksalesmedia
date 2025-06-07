// Load environment variables from .env file
require('dotenv').config();

const { PrismaClient } = require('@prisma/client');

// Check if DATABASE_URL is available
if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL environment variable is not set');
  process.exit(1);
}

const prisma = new PrismaClient();

async function checkUsers() {
  try {
    const users = await prisma.user.findMany();
    
    console.log('Total users found:', users.length);
    
    users.forEach(user => {
      // Don't print the password hash
      const { password, ...userWithoutPassword } = user;
      console.log('User:', userWithoutPassword);
    });
    
  } catch (error) {
    console.error('Error checking users:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkUsers(); 