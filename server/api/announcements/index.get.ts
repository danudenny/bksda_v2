import prisma from "../../utils/db";
import { paginatedResponse, errorResponse } from "../../utils/response";

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const page = Math.max(1, parseInt(query.page as string) || 1);
    const limit = Math.min(100, parseInt(query.limit as string) || 10);
    const skip = (page - 1) * limit;

    const [announcements, total] = await Promise.all([
      prisma.announcement.findMany({
        where: { isActive: true },
        orderBy: { order: "asc" },
        skip,
        take: limit,
      }),
      prisma.announcement.count({ where: { isActive: true } }),
    ]);

    return paginatedResponse(
      announcements,
      total,
      page,
      limit,
      "Announcements retrieved successfully",
    );
  } catch (error: any) {
    console.error("Get announcements error:", error);
    return errorResponse("Failed to retrieve announcements", error.message);
  }
});
