import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/src/lib/db';
import { verifyToken } from '@/src/lib/jwt';

// GET: Fetch all testimonials
export async function GET(request: NextRequest) {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json({ success: true, testimonials });
  } catch (error) {
    console.error('Get testimonials error:', error);
    return NextResponse.json(
      { success: false, error: 'Gagal mengambil data testimoni' },
      { status: 500 }
    );
  }
}

// POST: Create new testimonial (Admin only)
export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);
    
    if (!decoded) {
      return NextResponse.json(
        { success: false, error: 'Invalid token' },
        { status: 401 }
      );
    }

    const body = await request.json();

    const testimonial = await prisma.testimonial.create({
      data: {
        name: body.name,
        message: body.message,
        rating: parseInt(body.rating) || 5,
        category: body.category || null,
        avatar: body.avatar || null,
        date: body.date ? new Date(body.date) : new Date()
      }
    });

    return NextResponse.json({ success: true, testimonial });
  } catch (error) {
    console.error('Create testimonial error:', error);
    return NextResponse.json(
      { success: false, error: 'Gagal membuat testimoni' },
      { status: 500 }
    );
  }
}
