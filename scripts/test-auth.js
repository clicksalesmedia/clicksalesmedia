// Load environment variables from .env file
require('dotenv').config();

const { PrismaClient } = require('@prisma/client');
const bcryptjs = require('bcryptjs');

// Check if DATABASE_URL is available
if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL environment variable is not set');
  process.exit(1);
}

const prisma = new PrismaClient();

async function testAuth() {
  try {
    // Test credentials
    const testCredentials = [
      { email: 'admin@clicksalesmedia.com', password: 'adminpass123!' },
      { email: 'admin@clicksalesmedia.com', password: 'admin123' },
      { email: 'moncef@clicksalesmedia.com', password: 'Moncef123!' }
    ];
    
    for (const cred of testCredentials) {
      console.log(`Testing credentials: ${cred.email} / ${cred.password}`);
      
      // Find user
      const user = await prisma.user.findUnique({
        where: { email: cred.email }
      });
      
      if (!user) {
        console.log(`User not found: ${cred.email}`);
        continue;
      }
      
      // Test password
      const isPasswordValid = await bcryptjs.compare(
        cred.password,
        user.password
      );
      
      console.log(`Password valid: ${isPasswordValid}`);
      
      if (isPasswordValid) {
        console.log('Authentication successful for:', cred.email);
      } else {
        console.log('Authentication failed for:', cred.email);
      }
      
      console.log('-----------------------------------');
    }
    
  } catch (error) {
    console.error('Error testing authentication:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testAuth(); 