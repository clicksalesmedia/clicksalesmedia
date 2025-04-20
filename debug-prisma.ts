import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Log all available model names
console.log('Prisma Client Models:');
console.log(Object.keys(prisma));

// Cleanup
async function main() {
  await prisma.$disconnect();
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  }); 