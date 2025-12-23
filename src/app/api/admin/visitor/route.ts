import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/src/lib/db';

export async function POST(request: NextRequest) {
  try {
    // Get today's date (YYYY-MM-DD)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

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