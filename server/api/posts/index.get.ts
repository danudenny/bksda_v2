import prisma from "../../utils/db";
import { paginatedResponse, errorResponse } from "../../utils/response";

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    
    // 1. Parsing Parameter Pagination
    const page = Math.max(1, parseInt(query.page as string) || 1);
    const limit = Math.min(100, parseInt(query.limit as string) || 10);
    const skip = (page - 1) * limit;
    
    // 2. Parsing Filter
    const published = query.published === "true";
    // Ambil category_ids dari query params (format: "id1,id2")
    const categoryIds = query.category_ids ? (query.category_ids as string).split(',') : [];

    // 3. Membangun Where Clause (Dynamic Filtering)
    const whereClause: any = {};

    // Filter Published
    if (query.published !== undefined) {
      whereClause.published = published;
    }

    // Filter Category (TAMBAHAN PENTING)
    // Jika ada category_ids yang dikirim, filter berdasarkan array tersebut
    if (categoryIds.length > 0) {
      whereClause.categoryId = {
        in: categoryIds
      };
    }

    // 4. Eksekusi Database (Parallel)
    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where: whereClause,
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true // Pastikan role diambil untuk ditampilkan di UI
            },
          },
          category: true,
        },
        orderBy: { createdAt: "desc" }, // Urutkan dari yang terbaru
        skip,
        take: limit,
      }),
      prisma.post.count({ where: whereClause }),
    ]);

    // 5. Return Response
    return paginatedResponse(
      posts,
      total,
      page,
      limit,
      "Posts retrieved successfully",
    );

  } catch (error: any) {
    console.error("Get posts error:", error);
    return errorResponse("Failed to retrieve posts", error.message);
  }
});