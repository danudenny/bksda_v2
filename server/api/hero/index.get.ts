import prisma from "../../utils/db";
import { paginatedResponse, errorResponse } from "../../utils/response";

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const page = Math.max(1, parseInt(query.page as string) || 1);
    const limit = Math.min(100, parseInt(query.limit as string) || 100);
    const skip = (page - 1) * limit;
    const activeOnly = query.activeOnly === 'true';

    const where = activeOnly ? { isActive: true } : {};

    const [slides, total] = await Promise.all([
      prisma.heroSlide.findMany({
        where,
        orderBy: { order: "asc" },
        skip,
        take: limit,
      }),
      prisma.heroSlide.count({ where }),
    ]);

    return paginatedResponse(
      slides,
      total,
      page,
      limit,
      "Hero slides retrieved successfully",
    );
  } catch (error: any) {
    console.error("Get hero slides error:", error);
    return errorResponse("Failed to retrieve hero slides", error.message);
  }
});
