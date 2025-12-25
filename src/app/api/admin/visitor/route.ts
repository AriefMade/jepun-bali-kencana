import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/src/lib/db';

export async function POST(request: NextRequest) {
  try {
    // Get today's date in local timezone (YYYY-MM-DD format)
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const todayStr = `${year}-${month}-${day}`;
    
    // Create Date object for MySQL DATE field
    const today = new Date(todayStr);
    
    console.log('📅 Tracking visitor for date:', todayStr, '→', today);

    // Upsert visitor count for today
    const visitorStat = await prisma.visitorStats.upsert({
      where: {
        date: today
      },
      update: {
        count: {
          increment: 1
        }
      },
      create: {
        date: today,
        count: 1
      }
    });
    
    console.log('✅ Visitor tracked successfully:', visitorStat);

    // Delete old records (keep only last 7 days for history)
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    await prisma.visitorStats.deleteMany({
      where: {
        date: {
          lt: sevenDaysAgo
        }
      }
    });

    return NextResponse.json({
      success: true,
      count: visitorStat.count
    });
  } catch (error) {
    console.error('Visitor tracking error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to track visitor' },
      { status: 500 }
    );
  }
}