import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/src/lib/db';

// GET: Fetch project by slug (untuk detail page)
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const project = await prisma.project.findUnique({
      where: { slug: params.slug },
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
    const projectData = {
      ...project,
      mainChallenges: JSON.parse(project.mainChallenges),
      clientNeeds: JSON.parse(project.clientNeeds),
      constructionSteps: JSON.parse(project.constructionSteps),
      functionalBenefits: JSON.parse(project.functionalBenefits)
    };

    return NextResponse.json({ project: projectData });
  } catch (error) {
    console.error('Get project by slug error:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil data project' },
      { status: 500 }
    );
  }
}