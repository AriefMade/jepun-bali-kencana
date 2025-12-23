import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/src/lib/db';
import { verifyToken } from '@/src/lib/jwt';

// GET: Fetch single testimonial by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const testimonial = await prisma.testimonial.findUnique({
      where: { id: parseInt(id) }
    });

    if (!testimonial) {
      return NextResponse.json(
        { success: false, error: 'Testimoni tidak ditemukan' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, testimonial });
  } catch (error) {
    console.error('Get testimonial error:', error);
    return NextResponse.json(
      { success: false, error: 'Gagal mengambil data testimoni' },
      { status: 500 }
    );
  }
}

// PUT: Update testimonial (Admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { id } = await params;
    const body = await request.json();

    const testimonial = await prisma.testimonial.update({
      where: { id: parseInt(id) },
      data: {
        name: body.name,
        message: body.message,
        rating: parseInt(body.rating) || 5,
        category: body.category || null,
        avatar: body.avatar || null,
        date: body.date ? new Date(body.date) : undefined
      }
    });

    return NextResponse.json({ success: true, testimonial });
  } catch (error) {
    console.error('Update testimonial error:', error);
    return NextResponse.json(
      { success: false, error: 'Gagal update testimoni' },
      { status: 500 }
    );
  }
}

// DELETE: Delete testimonial (Admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { id } = await params;

    await prisma.testimonial.delete({
      where: { id: parseInt(id) }
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Testimoni berhasil dihapus' 
    });
  } catch (error) {
    console.error('Delete testimonial error:', error);
    return NextResponse.json(
      { success: false, error: 'Gagal menghapus testimoni' },
      { status: 500 }
    );
  }
}
