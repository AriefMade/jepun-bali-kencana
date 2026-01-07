import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/src/lib/db';
import { verifyToken } from '@/src/lib/jwt';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    const where = category && category !== 'Semua' 
      ? { category } 
      : {};

    const products = await prisma.product.findMany({
      where,
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json({ success: true, products });
  } catch (error) {
    console.error('Get products error:', error);
    return NextResponse.json(
      { success: false, error: 'Gagal mengambil data produk' },
      { status: 500 }
    );
  }
}

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

    // 👇 Ubah dari request.json() ke formData()
    const formData = await request.formData();
    
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const category = formData.get('category') as string;
    const stock = parseInt(formData.get('stock') as string) || 0;
    const imageFile = formData.get('image') as File | null;

    let imagePath = null;

    // Handle file upload
    if (imageFile && imageFile.size > 0) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Generate unique filename
      const timestamp = Date.now();
      const originalName = imageFile.name.replace(/\s+/g, '-');
      const filename = `product-${timestamp}-${originalName}`;
      
      // Create uploads directory if not exists
      const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'products');
      try {
        await mkdir(uploadDir, { recursive: true });
      } catch (err) {
        // Directory might already exist
      }

      // Save file
      const filepath = path.join(uploadDir, filename);
      await writeFile(filepath, buffer);
      
      imagePath = `/uploads/products/${filename}`;
    }

    const product = await prisma.product.create({
      data: {
        name,
        description: description || null,
        category,
        stock,
        image: imagePath,
        updatedAt: new Date()
      }
    });

    return NextResponse.json({ success: true, product });
  } catch (error) {
    console.error('Create product error:', error);
    return NextResponse.json(
      { success: false, error: 'Gagal membuat produk: ' + (error as Error).message },
      { status: 500 }
    );
  }
}
