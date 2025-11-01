import prisma from "../../../utils/db";
import { paginatedResponse, errorResponse } from "../../../utils/response";

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const page = Math.max(1, parseInt(query.page as string) || 1);
    const limit = Math.min(100, parseInt(query.limit as string) || 10);
    const skip = (page - 1) * limit;

    const [categories, total] = await Promise.all([
      prisma.kawasanCategory.findMany({
        where: { isActive: true },
        include: {
          locations: {
            where: { isActive: true },
            orderBy: { order: "asc" },
          },
        },
        orderBy: { order: "asc" },
        skip,
        take: limit,
      }),
      prisma.kawasanCategory.count({ where: { isActive: true } }),
    ]);

    return paginatedResponse(
      categories,
      total,
      page,
      limit,
      "Categories retrieved successfully",
    );
  } catch (error: any) {
    console.error("Get categories error:", error);
    return errorResponse("Failed to retrieve categories", error.message);
  }
});
