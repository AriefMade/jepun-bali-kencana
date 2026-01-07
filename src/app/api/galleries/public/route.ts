import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export async function GET() {
  try {
    const galleries = await prisma.gallery.findMany({
      orderBy: {
        date: 'desc'
      },
      take: 10
    });

    return NextResponse.json({
      success: true,
      galleries
    });
  } catch (error) {
    console.error('Error fetching galleries:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch galleries' },
      { status: 500 }
    );
  }
}