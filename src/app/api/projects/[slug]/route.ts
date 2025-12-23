import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/src/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const project = await prisma.project.findUnique({
      where: { slug },
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