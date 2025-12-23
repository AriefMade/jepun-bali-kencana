import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/src//lib/db';

// GET: Fetch single project by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {

   const {id} = await params;

    const project = await prisma.project.findUnique({
      where: { id: parseInt(id) },
      include: {
        images: {
          orderBy: { sortOrder: 'asc' }
        }
      }
    });

    if (!project) {
      return NextResponse.json(
        { error: 'Project tidak ditemukan' },
        { status: 404 }
      );
    }

    // Parse JSON strings ke array
    const projectData = {
      ...project,
      mainChallenges: JSON.parse(project.mainChallenges),
      clientNeeds: JSON.parse(project.clientNeeds),
      constructionSteps: JSON.parse(project.constructionSteps),
      functionalBenefits: JSON.parse(project.functionalBenefits)
    };

    return NextResponse.json({ project: projectData });
  } catch (error) {
    console.error('Get project error:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil data project' },
      { status: 500 }
    );
  }
}

// PUT: Update project
export async function PUT(
 request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const {id} = await params;
    const body = await request.json();

    // Auto-generate slug jika title berubah
    const slug = body.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const data = {
      ...body,
      slug,
      mainChallenges: JSON.stringify(body.mainChallenges || []),
      clientNeeds: JSON.stringify(body.clientNeeds || []),
      constructionSteps: JSON.stringify(body.constructionSteps || []),
      functionalBenefits: JSON.stringify(body.functionalBenefits || [])
    };

    const project = await prisma.project.update({
      where: { id: parseInt(id) },
      data
    });

    return NextResponse.json({ project });
  } catch (error) {
    console.error('Update project error:', error);
    return NextResponse.json(
      { error: 'Gagal update project' },
      { status: 500 }
    );
  }
}

// DELETE: Delete project
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const {id} = await params;

    await prisma.project.delete({
      where: { id: parseInt(id) }
    });

    return NextResponse.json({ message: 'Project berhasil dihapus' });
  } catch (error) {
    console.error('Delete project error:', error);
    return NextResponse.json(
      { error: 'Gagal menghapus project' },
      { status: 500 }
    );
  }
}