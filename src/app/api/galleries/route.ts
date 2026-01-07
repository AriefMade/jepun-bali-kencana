import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { writeFile, unlink } from 'fs/promises';
import { join } from 'path';
import jwt from 'jsonwebtoken';
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Verify JWT token
function verifyToken(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.substring(7);
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

// GET - Fetch all galleries
export async function GET(request: NextRequest) {
  try {
    const user = verifyToken(request);
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const galleries = await prisma.gallery.findMany({
      orderBy: {
        date: 'desc'
      }
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

// POST - Create new gallery
export async function POST(request: NextRequest) {
  try {
    const user = verifyToken(request);
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const image = formData.get('image') as File;
    const date = formData.get('date') as string;

    if (!image) {
      return NextResponse.json(
        { success: false, error: 'Image is required' },
        { status: 400 }
      );
    }

    // Save image file
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const filename = `gallery-${Date.now()}-${image.name}`;
    const filepath = join(process.cwd(), 'public', 'uploads', 'galleries', filename);
    
    await writeFile(filepath, buffer);

    const imageUrl = `/uploads/galleries/${filename}`;

    // Create gallery in database
    const gallery = await prisma.gallery.create({
      data: {
        image: imageUrl,
        date: date ? new Date(date) : new Date()
      }
    });

    return NextResponse.json({
      success: true,
      gallery
    });
  } catch (error) {
    console.error('Error creating gallery:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create gallery' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const user = verifyToken(request);
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Gallery ID is required' },
        { status: 400 }
      );
    }

    // 1. Find gallery first (jangan langsung delete)
    const gallery = await prisma.gallery.findUnique({
      where: { id: parseInt(id) }
    });

    if (!gallery) {
      return NextResponse.json(
        { success: false, error: 'Gallery not found' },
        { status: 404 }
      );
    }

    // 2. Delete image file from server
    if (gallery.image) {
      const imagePath = join(process.cwd(), 'public', gallery.image);
      try {
        await unlink(imagePath);
      } catch (error) {
        console.warn('Failed to delete image file:', error);
        // Continue even if file deletion fails
      }
    }

    // 3. Delete from database (hanya sekali!)
    await prisma.gallery.delete({
      where: { id: parseInt(id) }
    });

    return NextResponse.json({
      success: true,
      message: 'Gallery deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting gallery:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete gallery' },
      { status: 500 }
    );
  }
}
