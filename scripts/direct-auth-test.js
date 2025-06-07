// Load environment variables from .env file
require('dotenv').config();

const { PrismaClient } = require('@prisma/client');
const bcryptjs = require('bcryptjs');
const bcrypt = require('bcrypt'); // regular bcrypt for comparison

// Check if DATABASE_URL is available
if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL environment variable is not set');
  process.exit(1);
}

const prisma = new PrismaClient();

async function directAuthTest() {
  try {
    // Get all users
    const users = await prisma.user.findMany();
    
    console.log(`Found ${users.length} users`);
    
    // Test credentials
    const testCredentials = [
      { email: 'admin@clicksalesmedia.com', password: 'adminpass123!' },
      { email: 'admin@clicksalesmedia.com', password: 'admin123' },
      { email: 'moncef@clicksalesmedia.com', password: 'Moncef123!' },
      { email: 'said@clicksalesmedia.com', password: 'Said123!' }
    ];
    
    for (const cred of testCredentials) {
      console.log(`\nTesting credentials: ${cred.email} / ${cred.password}`);
      
      // Find user
      const user = await prisma.user.findUnique({
        where: { email: cred.email }
      });
      
      if (!user) {
        console.log(`User not found: ${cred.email}`);
        continue;
      }
      
      console.log(`Found user: ${user.name} (${user.email})`);
      console.log(`Password hash: ${user.password.substring(0, 20)}...`);
      
      // Test with bcryptjs (used by NextAuth)
      const isPasswordValidJs = await bcryptjs.compare(
        cred.password,
        user.password
      );
      
      console.log(`bcryptjs validation result: ${isPasswordValidJs}`);
      
      // Test with regular bcrypt (used in some seed scripts)
      try {
        const isPasswordValidBcrypt = await bcrypt.compare(
          cred.password,
          user.password
        );
        console.log(`regular bcrypt validation result: ${isPasswordValidBcrypt}`);
      } catch (err) {
        console.log(`Error with regular bcrypt: ${err.message}`);
      }
      
      // Create new hashes for comparison
      const newBcryptJsHash = await bcryptjs.hash(cred.password, 10);
      console.log(`New bcryptjs hash: ${newBcryptJsHash}`);
      
      const newBcryptHash = await bcrypt.hash(cred.password, 10);
      console.log(`New bcrypt hash: ${newBcryptHash}`);
      
      // Try to directly update password with fresh hash
      if (!isPasswordValidJs) {
        console.log(`Updating password for ${user.email} using bcryptjs...`);
        const freshHash = await bcryptjs.hash(cred.password, 10);
        await prisma.user.update({
          where: { email: user.email },
          data: { password: freshHash }
        });
        console.log(`Password updated.`);
      }
    }
    
  } catch (error) {
    console.error('Error testing authentication:', error);
  } finally {
    await prisma.$disconnect();
  }
}

directAuthTest(); 