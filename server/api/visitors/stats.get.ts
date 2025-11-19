import prisma from "~~/server/utils/db";

export default defineEventHandler(async (event) => {
  try {
    const now = new Date();
    const startOfDay = new Date(now.setHours(0, 0, 0, 0));
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // Kita jalankan 6 query secara paralel (3 untuk Visitor, 3 untuk Views)
    const [
      todayUnique, todayViews,
      monthUnique, monthViews,
      totalUnique, totalViews
    ] = await Promise.all([
      // 1. HARI INI
      prisma.pageView.groupBy({ by: ['ipHash'], where: { createdAt: { gte: startOfDay } } }),
      prisma.pageView.count({ where: { createdAt: { gte: startOfDay } } }),

      // 2. BULAN INI
      prisma.pageView.groupBy({ by: ['ipHash'], where: { createdAt: { gte: startOfMonth } } }),
      prisma.pageView.count({ where: { createdAt: { gte: startOfMonth } } }),

      // 3. TOTAL SELAMANYA
      prisma.pageView.groupBy({ by: ['ipHash'] }),
      prisma.pageView.count(),
    ]);

    return {
      success: true,
      data: {
        today: {
          visitors: todayUnique.length, // Jumlah Orang
          views: todayViews             // Jumlah Halaman Dibuka
        },
        month: {
          visitors: monthUnique.length,
          views: monthViews
        },
        total: {
          visitors: totalUnique.length,
          views: totalViews
        },
      },
    };
  } catch (error) {
    console.error('Visitor stats error:', error);
    return {
      success: false,
      data: { 
        today: { visitors: 0, views: 0 }, 
        month: { visitors: 0, views: 0 }, 
        total: { visitors: 0, views: 0 } 
      },
    };
  }
});