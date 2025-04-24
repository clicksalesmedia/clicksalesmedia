// Load environment variables from .env file
require('dotenv').config();

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

// Check if DATABASE_URL is available
if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL environment variable is not set');
  process.exit(1);
}

const prisma = new PrismaClient();

const users = [
  {
    email: 'admin@clicksalesmedia.com',
    password: 'adminpass123!'
  },
  {
    email: 'moncef@clicksalesmedia.com',
    password: 'Moncef123!'
  },
  {
    email: 'said@clicksalesmedia.com',
    password: 'Said123!'
  },
  {
    email: 'rafif@clicksalesmedia.com',
    password: 'Rafif123!'
  }
];

async function updatePasswords() {
  try {
    for (const user of users) {
      // Check if user exists
      const existingUser = await prisma.user.findUnique({
        where: { email: user.email }
      });

      if (!existingUser) {
        console.log('User not found:', user.email);
        continue;
      }

      // Hash password with bcryptjs
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(user.password, saltRounds);

      // Update user's password
      const updatedUser = await prisma.user.update({
        where: { email: user.email },
        data: { password: hashedPassword }
      });

      console.log('Password updated successfully for:', updatedUser.email);
    }
  } catch (error) {
    console.error('Error updating passwords:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updatePasswords(); 