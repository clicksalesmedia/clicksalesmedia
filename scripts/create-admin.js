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
    name: 'Administrator',
    email: 'admin@clicksalesmedia.com',
    password: 'admin123',
    role: 'ADMIN'
  },
  {
    name: 'Moncef Bennassar',
    email: 'moncef@clicksalesmedia.com',
    password: 'Moncef123!',
    role: 'ADMIN'
  },
  {
    name: 'Said Jabouri',
    email: 'said@clicksalesmedia.com',
    password: 'Said123!',
    role: 'ADMIN'
  },
  {
    name: 'Rafif Shaaban',
    email: 'rafif@clicksalesmedia.com',
    password: 'Rafif123!',
    role: 'ADMIN'
  }
];

async function createUsers() {
  try {
    for (const user of users) {
      // Check if user already exists
      const existingUser = await prisma.user.findFirst({
        where: { 
          OR: [
            { email: user.email },
            { name: user.name }
          ]
        }
      });

      if (existingUser) {
        console.log('User already exists:', existingUser.email);
        continue;
      }

      // Hash password with bcryptjs
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(user.password, saltRounds);

      // Create user
      const createdUser = await prisma.user.create({
        data: {
          name: user.name,
          email: user.email,
          password: hashedPassword,
          role: user.role,
        },
      });

      console.log('User created successfully:', createdUser.email);
    }
  } catch (error) {
    console.error('Error creating users:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createUsers(); 