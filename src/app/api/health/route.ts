import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

interface TableInfo {
  table_name: string;
}

export async function GET() {
  const results = {
    status: 'ok',
    database: { 
      connected: false,
      message: '',
      tables: [] as string[],
      portfolioCount: 0
    },
    environment: {
      nodeEnv: process.env.NODE_ENV,
      databaseUrl: process.env.DATABASE_URL ? 
        // Hide password in the URL
        process.env.DATABASE_URL.replace(
          /:([^:@]+)@/, 
          ':****@'
        ) : 
        'Not configured'
    }
  };

  try {
    // Test DB connection with a simple query
    await prisma.$queryRaw`SELECT 1+1 as result`;
    results.database.connected = true;
    results.database.message = 'Database connection successful';

    // Check available tables
    try {
      const tables = await prisma.$queryRaw<TableInfo[]>`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public'
      `;
      
      results.database.tables = Array.isArray(tables) 
        ? tables.map((t: TableInfo) => t.table_name).filter(Boolean)
        : [];
      
      // Check if Portfolio table exists and count records
      if (results.database.tables.includes('Portfolio')) {
        const portfolioCount = await prisma.portfolio.count();
        results.database.portfolioCount = portfolioCount;
      }
    } catch (tablesError) {
      results.database.message += `. Error checking tables: ${(tablesError as Error).message}`;
    }
  } catch (error) {
    results.status = 'error';
    results.database.message = `Database connection failed: ${(error as Error).message}`;
  }

  return NextResponse.json(results);
} 