import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/src/lib/db';

// GET by ID (untuk admin edit)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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

    // Parse JSON strings
    const projectDetail = {
      ...project,
      mainChallenges: typeof project.mainChallenges === 'string' 
        ? JSON.parse(project.mainChallenges) 
        : project.mainChallenges,
      clientNeeds: typeof project.clientNeeds === 'string'
        ? JSON.parse(project.clientNeeds)
        : project.clientNeeds,
      constructionSteps: typeof project.constructionSteps === 'string'
        ? JSON.parse(project.constructionSteps)
        : project.constructionSteps,
      functionalBenefits: typeof project.functionalBenefits === 'string'
        ? JSON.parse(project.functionalBenefits)
        : project.functionalBenefits,
    };

    return NextResponse.json({ project: projectDetail });
  } catch (error: any) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}

// PUT by ID (untuk admin update)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    const projectData = {
      ...body,
      mainChallenges: JSON.stringify(body.mainChallenges || []),
      clientNeeds: JSON.stringify(body.clientNeeds || []),
      constructionSteps: JSON.stringify(body.constructionSteps || []),
      functionalBenefits: JSON.stringify(body.functionalBenefits || []),
    };

    const project = await prisma.project.update({
      where: { id: parseInt(id) },
      data: projectData
    });

    return NextResponse.json({ project });
  } catch (error: any) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Gagal update project', details: error.message },
      { status: 500 }
    );
  }
}

// DELETE by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.project.delete({
      where: { id: parseInt(id) }
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Gagal hapus project', details: error.message },
      { status: 500 }
    );
  }
}