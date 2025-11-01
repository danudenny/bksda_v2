import prisma from "../../utils/db";
import { paginatedResponse, errorResponse } from "../../utils/response";

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const page = Math.max(1, parseInt(query.page as string) || 1);
    const limit = Math.min(100, parseInt(query.limit as string) || 10);
    const skip = (page - 1) * limit;

    const [links, total] = await Promise.all([
      prisma.externalLink.findMany({
        where: { isActive: true },
        orderBy: { order: "asc" },
        skip,
        take: limit,
      }),
      prisma.externalLink.count({ where: { isActive: true } }),
    ]);

    return paginatedResponse(
      links,
      total,
      page,
      limit,
      "External links retrieved successfully",
    );
  } catch (error: any) {
    console.error("Get external links error:", error);
    return errorResponse("Failed to retrieve external links", error.message);
  }
});
