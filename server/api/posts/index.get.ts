import prisma from "../../utils/db";
import { paginatedResponse, errorResponse } from "../../utils/response";

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const page = Math.max(1, parseInt(query.page as string) || 1);
    const limit = Math.min(100, parseInt(query.limit as string) || 10);
    const skip = (page - 1) * limit;
    const published = query.published === "true";

    const whereClause: any = {};
    if (query.published !== undefined) {
      whereClause.published = published;
    }

    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where: whereClause,
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          category: true,
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.post.count({ where: whereClause }),
    ]);

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
