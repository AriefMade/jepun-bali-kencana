import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/src/lib/db';
import { verifyToken } from '@/src/lib/jwt';

export async function GET(request: NextRequest) {
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

    // Get total projects
    const totalProjects = await prisma.project.count();
    const publishedProjects = await prisma.project.count({
      where: { isPublished: true }
    });

    // Get today's visitor count
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const todayVisitors = await prisma.visitorStats.findUnique({
      where: { date: today }
    });

    // Get total testimonials
    const totalTestimonials = await prisma.testimonial.count();

    // Get total products
    const totalProducts = await prisma.product.count();

    // Get products by category
    const productsByCategory = await prisma.product.groupBy({
      by: ['category'],
      _count: {
        id: true
      }
    });

    // Get recent projects
    const recentProjects = await prisma.project.findMany({
      take: 5,
      orderBy: {
        createdAt: 'desc'
      },
      select: {
        id: true,
        title: true,
        category: true,
        createdAt: true
      }
    });

    // Get recent testimonials
    const recentTestimonials = await prisma.testimonial.findMany({
      take: 5,
      orderBy: {
        createdAt: 'desc'
      },
      select: {
        id: true,
        name: true,
        createdAt: true
      }
    });

    return NextResponse.json({
      success: true,
      stats: {
        projects: {
          total: totalProjects,
          published: publishedProjects,
          draft: totalProjects - publishedProjects
        },
        visitors: {
          today: todayVisitors?.count || 0
        },
        testimonials: {
          total: totalTestimonials
        },
        products: {
          total: totalProducts,
          byCategory: productsByCategory
        }
      },
      recentActivity: {
        projects: recentProjects,
        testimonials: recentTestimonials
      }
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch dashboard stats' },
      { status: 500 }
    );
  }
}