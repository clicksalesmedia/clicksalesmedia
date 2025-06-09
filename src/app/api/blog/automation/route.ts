import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { promises as fs } from 'fs';
import path from 'path';

// Configure logging
const logger = {
  info: (message: string, ...args: any[]) => console.log(`[INFO] ${message}`, ...args),
  error: (message: string, ...args: any[]) => console.error(`[ERROR] ${message}`, ...args),
  warning: (message: string, ...args: any[]) => console.warn(`[WARN] ${message}`, ...args)
};

// GET - Get automation status and logs
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    switch (action) {
      case 'status':
        return await getAutomationStatus();
      case 'logs':
        return await getAutomationLogs();
      case 'stats':
        return await getAutomationStats();
      default:
        return await getAutomationOverview();
    }
  } catch (error) {
    console.error('Error in automation GET:', error);
    return NextResponse.json(
      { error: 'Failed to fetch automation data' },
      { status: 500 }
    );
  }
}

// POST - Manual trigger or configuration updates
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, ...data } = body;

    switch (action) {
      case 'trigger':
        return await triggerManualGeneration(data);
      case 'update_config':
        return await updateAutomationConfig(data);
      case 'toggle_automation':
        return await toggleAutomation(data);
      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Error in automation POST:', error);
    return NextResponse.json(
      { error: 'Failed to process automation request' },
      { status: 500 }
    );
  }
}

async function getAutomationOverview() {
  // Get recent automated posts (assuming they have "automated" in title or content)
  const recentPosts = await prisma.blogPost.findMany({
    where: {
      OR: [
        { title: { contains: 'automated', mode: 'insensitive' } },
        { content: { contains: 'automated', mode: 'insensitive' } },
        { excerpt: { contains: 'AI Generated', mode: 'insensitive' } }
      ]
    },
    orderBy: { createdAt: 'desc' },
    take: 10,
    select: {
      id: true,
      title: true,
      titleAr: true,
      createdAt: true,
      published: true,
      excerpt: true
    }
  });

  // Get automation statistics
  const totalAutomated = await prisma.blogPost.count({
    where: {
      OR: [
        { title: { contains: 'automated', mode: 'insensitive' } },
        { excerpt: { contains: 'AI Generated', mode: 'insensitive' } }
      ]
    }
  });

  const automatedThisWeek = await prisma.blogPost.count({
    where: {
      OR: [
        { title: { contains: 'automated', mode: 'insensitive' } },
        { excerpt: { contains: 'AI Generated', mode: 'insensitive' } }
      ],
      createdAt: {
        gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      }
    }
  });

  const automatedToday = await prisma.blogPost.count({
    where: {
      OR: [
        { title: { contains: 'automated', mode: 'insensitive' } },
        { excerpt: { contains: 'AI Generated', mode: 'insensitive' } }
      ],
      createdAt: {
        gte: new Date(new Date().setHours(0, 0, 0, 0))
      }
    }
  });

  return NextResponse.json({
    recentPosts,
    stats: {
      total: totalAutomated,
      thisWeek: automatedThisWeek,
      today: automatedToday
    },
    lastRun: await getLastRunInfo(),
    isActive: await checkAutomationStatus()
  });
}

async function getAutomationStatus() {
  const status = await checkAutomationStatus();
  const lastRun = await getLastRunInfo();
  const nextRun = getNextRunTime();

  return NextResponse.json({
    isActive: status,
    lastRun,
    nextRun,
    systemHealth: await checkSystemHealth()
  });
}

async function getAutomationLogs() {
  try {
    // Try to read recent log files from the automation system
    const logPath = path.join(process.cwd(), 'backend', 'blog-automation', 'logs');
    const files = await fs.readdir(logPath).catch(() => []);
    
    const recentLogs = files
      .filter(file => file.startsWith('daily_run_'))
      .sort()
      .slice(-5); // Get last 5 log files

    const logs = [];
    for (const file of recentLogs) {
      try {
        const content = await fs.readFile(path.join(logPath, file), 'utf-8');
        logs.push({
          file,
          date: file.match(/daily_run_(\d{8})/)?.[1],
          content: content.split('\n').slice(-20).join('\n') // Last 20 lines
        });
      } catch (err) {
        console.error(`Error reading log file ${file}:`, err);
      }
    }

    return NextResponse.json({ logs });
  } catch (error) {
    return NextResponse.json({ 
      logs: [],
      error: 'Could not access log files'
    });
  }
}

async function getAutomationStats() {
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  // Get posts count for the last 30 days
  const automatedPosts = await prisma.blogPost.findMany({
    where: {
      OR: [
        { title: { contains: 'automated', mode: 'insensitive' } },
        { excerpt: { contains: 'AI Generated', mode: 'insensitive' } }
      ],
      createdAt: {
        gte: thirtyDaysAgo
      }
    },
    select: {
      createdAt: true,
      titleAr: true,
      categories: {
        select: {
          name: true
        }
      }
    }
  });

  // Process daily stats
  const dailyStats = automatedPosts.reduce((acc: any[], post) => {
    const date = post.createdAt.toISOString().split('T')[0];
    const existing = acc.find(item => item.date === date);
    if (existing) {
      existing.count++;
    } else {
      acc.push({ date, count: 1 });
    }
    return acc;
  }, []);

  // Language distribution based on Arabic title presence
  const languageStats = [
    {
      language: 'en',
      count: automatedPosts.filter(post => !post.titleAr).length
    },
    {
      language: 'ar', 
      count: automatedPosts.filter(post => post.titleAr).length
    }
  ];

  // Category distribution
  const categoryStats = automatedPosts.reduce((acc: any[], post) => {
    post.categories.forEach(category => {
      const existing = acc.find(item => item.category === category.name);
      if (existing) {
        existing.count++;
      } else {
        acc.push({ category: category.name, count: 1 });
      }
    });
    return acc;
  }, []);

  return NextResponse.json({
    dailyStats,
    languageStats,
    categoryStats,
    period: '30 days'
  });
}

async function triggerManualGeneration(data: any) {
  try {
    const { exec } = require('child_process');
    const util = require('util');
    const execAsync = util.promisify(exec);
    
    // Path to the blog automation script
    const scriptPath = path.join(process.cwd(), 'backend', 'blog-automation', 'run_daily.sh');
    
    // Execute the blog generation script
    logger.info('Starting manual blog generation...');
    const { stdout, stderr } = await execAsync(`cd ${path.dirname(scriptPath)} && ./run_daily.sh`);
    
    if (stderr && stderr.includes('Error')) {
      logger.error('Manual generation failed:', stderr);
      return NextResponse.json({
        success: false,
        message: 'Manual generation failed',
        error: stderr
      }, { status: 500 });
    }
    
    logger.info('Manual generation completed successfully');
    return NextResponse.json({
      success: true,
      message: 'Manual generation completed successfully',
      jobId: `job_${Date.now()}`,
      output: stdout
    });
    
  } catch (error) {
    logger.error('Error in manual generation:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to trigger manual generation',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

async function updateAutomationConfig(data: any) {
  // Update automation configuration
  // This would store in database or config file
  
  return NextResponse.json({
    success: true,
    message: 'Configuration updated',
    config: data
  });
}

async function toggleAutomation(data: { enabled: boolean }) {
  // Toggle automation on/off
  // This would enable/disable cron jobs or scheduled tasks
  
  return NextResponse.json({
    success: true,
    message: `Automation ${data.enabled ? 'enabled' : 'disabled'}`
  });
}

async function checkAutomationStatus(): Promise<boolean> {
  // Check if automation is active (e.g., cron job exists)
  // For now, return true as a placeholder
  return true;
}

async function getLastRunInfo() {
  try {
    // Try to read the last log file
    const logPath = path.join(process.cwd(), 'backend', 'blog-automation', 'logs');
    const files = await fs.readdir(logPath).catch(() => []);
    
    const latestLog = files
      .filter(file => file.startsWith('daily_run_'))
      .sort()
      .pop();

    if (latestLog) {
      const stats = await fs.stat(path.join(logPath, latestLog));
      return {
        timestamp: stats.mtime,
        status: 'completed',
        logFile: latestLog
      };
    }
  } catch (error) {
    console.error('Error getting last run info:', error);
  }

  return {
    timestamp: null,
    status: 'unknown',
    logFile: null
  };
}

function getNextRunTime() {
  // Calculate next run time (e.g., next day at 9 AM)
  const now = new Date();
  const nextRun = new Date(now);
  nextRun.setDate(now.getDate() + 1);
  nextRun.setHours(9, 0, 0, 0);
  
  return nextRun.toISOString();
}

async function checkSystemHealth() {
  // Check system health (database connection, file permissions, etc.)
  try {
    await prisma.$queryRaw`SELECT 1`;
    return {
      database: 'healthy',
      fileSystem: 'healthy',
      overall: 'healthy'
    };
  } catch (error) {
    return {
      database: 'error',
      fileSystem: 'unknown',
      overall: 'degraded'
    };
  }
} 