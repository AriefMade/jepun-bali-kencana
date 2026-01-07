import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/src/lib/db';
import { verifyToken } from '@/src/lib/jwt';
import { writeFile, mkdir, unlink } from 'fs/promises';
import path from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) }
    });

    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Produk tidak ditemukan' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, product });
  } catch (error) {
    console.error('Get product error:', error);
    return NextResponse.json(
      { success: false, error: 'Gagal mengambil data produk' },
      { status: 500 }
    );
  }
}

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
    
    const formData = await request.formData();
    
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const category = formData.get('category') as string;
    const stock = parseInt(formData.get('stock') as string) || 0;
    const imageFile = formData.get('image') as File | null;

    const existingProduct = await prisma.product.findUnique({
      where: { id: parseInt(id) }
    });

    if (!existingProduct) {
      return NextResponse.json(
        { success: false, error: 'Produk tidak ditemukan' },
        { status: 404 }
      );
    }

    let imagePath = existingProduct.image;

    if (imageFile && imageFile.size > 0) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const timestamp = Date.now();
      const originalName = imageFile.name.replace(/\s+/g, '-');
      const filename = `product-${timestamp}-${originalName}`;
      
      const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'products');
      try {
        await mkdir(uploadDir, { recursive: true });
      } catch (err) {
        console.error('Error creating upload directory:', err);
        return NextResponse.json(
          { success: false, error: 'Gagal membuat direktori upload' },
          { status: 500 }
        );
      }

      const filepath = path.join(uploadDir, filename);
      await writeFile(filepath, buffer);
      
      if (existingProduct.image) {
        try {
          const oldImagePath = path.join(process.cwd(), 'public', existingProduct.image);
          await unlink(oldImagePath);
        } catch (err) {
          console.log('Old image not found or already deleted');
        }
      }
      
      imagePath = `/uploads/products/${filename}`;
    }

    const product = await prisma.product.update({
      where: { id: parseInt(id) },
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
    console.error('Update product error:', error);
    return NextResponse.json(
      { success: false, error: 'Gagal update produk: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

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
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) }
    });

    if (product?.image) {
      try {
        const imagePath = path.join(process.cwd(), 'public', product.image);
        await unlink(imagePath);
      } catch (err) {
        console.log('Image file not found or already deleted');
      }
    }

    await prisma.product.delete({
      where: { id: parseInt(id) }
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Produk berhasil dihapus' 
    });
  } catch (error) {
    console.error('Delete product error:', error);
    return NextResponse.json(
      { success: false, error: 'Gagal menghapus produk' },
      { status: 500 }
    );
  }
}
