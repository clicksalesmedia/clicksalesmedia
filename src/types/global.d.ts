import { PrismaClient } from '@prisma/client'

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

// Add TypeScript module augmentation for the prisma client
declare module '@prisma/client' {
  interface PrismaClient {
    trackingScript: any;
    trackingLog: any;
  }
} 