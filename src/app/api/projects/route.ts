import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/src/lib/db';

// GET: Fetch semua projects dengan filter
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const published = searchParams.get('published');

    const where: any = {};
    
    if (category && category !== 'all') {
      where.category = category;
    }
    
    if (featured === 'true') {
      where.isFeatured = true;
    }
    
    if (published === 'true') {
      where.isPublished = true;
    }

    const projects = await prisma.project.findMany({
      where,
      include: {
        images: {
          orderBy: { sortOrder: 'asc' }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ projects });
  } catch (error) {
    console.error('Get projects error:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil data project' },
      { status: 500 }
    );
  }
}

// POST: Create new project
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Auto-generate slug dari title
    const slug = body.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    // Parse JSON strings untuk array fields
    const data = {
      ...body,
      slug,
      mainChallenges: JSON.stringify(body.mainChallenges || []),
      clientNeeds: JSON.stringify(body.clientNeeds || []),
      constructionSteps: JSON.stringify(body.constructionSteps || []),
      functionalBenefits: JSON.stringify(body.functionalBenefits || [])
    };

    const project = await prisma.project.create({
      data
    });

    return NextResponse.json({ project }, { status: 201 });
  } catch (error) {
    console.error('Create project error:', error);
    return NextResponse.json(
      { error: 'Gagal membuat project' },
      { status: 500 }
    );
  }
}