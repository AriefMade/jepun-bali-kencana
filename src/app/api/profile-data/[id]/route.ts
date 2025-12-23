import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/src/lib/db';
import { verifyToken } from '@/src/lib/jwt';

// GET: Fetch single profile data by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const profileData = await prisma.profileData.findUnique({
      where: { id: parseInt(id) }
    });

    if (!profileData) {
      return NextResponse.json(
        { success: false, error: 'Data profil tidak ditemukan' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, profileData });
  } catch (error) {
    console.error('Get profile data error:', error);
    return NextResponse.json(
      { success: false, error: 'Gagal mengambil data profil' },
      { status: 500 }
    );
  }
}

// PUT: Update profile data (Admin only)
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
    const { phone, address, facebook, whatsapp, instagram, gmaps } = body;

    if (!phone || !address) {
      return NextResponse.json(
        { success: false, error: 'Phone dan address wajib diisi' },
        { status: 400 }
      );
    }

    const profileData = await prisma.profileData.update({
      where: { id: parseInt(id) },
      data: {
        phone,
        address,
        facebook: facebook || null,
        whatsapp: whatsapp || null,
        instagram: instagram || null,
        gmaps: gmaps || null
      }
    });

    return NextResponse.json({ success: true, profileData });
  } catch (error) {
    console.error('Update profile data error:', error);
    return NextResponse.json(
      { success: false, error: 'Gagal update data profil' },
      { status: 500 }
    );
  }
}

// DELETE: Delete profile data (Admin only)
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

    await prisma.profileData.delete({
      where: { id: parseInt(id) }
    });

    return NextResponse.json({ success: true, message: 'Data profil berhasil dihapus' });
  } catch (error) {
    console.error('Delete profile data error:', error);
    return NextResponse.json(
      { success: false, error: 'Gagal menghapus data profil' },
      { status: 500 }
    );
  }
}
