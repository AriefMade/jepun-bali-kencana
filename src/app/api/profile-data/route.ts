import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/src/lib/db';
import { verifyToken } from '@/src/lib/jwt';

// GET: Fetch profile data (Public access)
export async function GET(request: NextRequest) {
  try {
    // Get the first (and should be only) profile record
    const profileData = await prisma.profileData.findFirst();

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

// POST: Create profile data (Admin only) - Usually only run once
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
    const { phone, address, facebook, whatsapp, instagram, gmaps } = body;

    if (!phone || !address) {
      return NextResponse.json(
        { success: false, error: 'Phone dan address wajib diisi' },
        { status: 400 }
      );
    }

    const profileData = await prisma.profileData.create({
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
    console.error('Create profile data error:', error);
    return NextResponse.json(
      { success: false, error: 'Gagal membuat data profil' },
      { status: 500 }
    );
  }
}
