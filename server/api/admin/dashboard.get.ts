import { PrismaClient } from '@prisma/client';
import { successResponse, errorResponse } from '../../utils/response';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    // Aggregate data in parallel
    const [
      postCount, 
      categoryCount, 
      userCount, 
      recentPosts, 
      postsPerCategory,
      publishedCount,
      draftCount,
      totalViews
    ] = await Promise.all([
      prisma.post.count(),
      prisma.category.count(),
      prisma.user.count(),
      prisma.post.findMany({
        take: 6, // Ambil 6 agar genap di grid 2 kolom jika di mobile
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          title: true,
          slug: true,
          createdAt: true,
          published: true, // Perlu status ini
          category: {      // Ambil nama kategori juga
            select: { name: true }
          }
        },
      }),
      prisma.category.findMany({
        take: 5, // Batasi top 5 kategori agar chart tidak penuh
        orderBy: {
          posts: {
            _count: 'desc'
          }
        },
        select: {
          name: true,
          _count: {
            select: { posts: true },
          },
        },
      }),
      prisma.post.count({ where: { published: true } }),
      prisma.post.count({ where: { published: false } }),
    ]);

    // Format data for Bar Chart (Categories)
    const categoryChartData = {
      labels: postsPerCategory.map(cat => cat.name),
      datasets: [
        {
          label: 'Posts',
          data: postsPerCategory.map(cat => cat._count.posts),
          backgroundColor: '#3b82f6', // Blue-500
          borderRadius: 4,
        },
      ],
    };

    // Format data for Doughnut Chart (Status)
    const statusChartData = {
      labels: ['Published', 'Draft'],
      datasets: [
        {
          data: [publishedCount, draftCount],
          backgroundColor: ['#10B981', '#94a3b8'], // Emerald-500, Gray-400
          borderWidth: 0,
          hoverOffset: 4
        },
      ],
    };

    const data = {
      stats: {
        posts: postCount,
        categories: categoryCount,
        users: userCount,
        published: publishedCount,
        draft: draftCount,
      },
      recentPosts,
      categoryChartData,
      statusChartData
    };

    return successResponse('Dashboard data fetched successfully', data);
  } catch (error: any) {
    console.error('Error fetching dashboard data:', error);
    return errorResponse('Failed to fetch dashboard data.', error.message);
  }
});