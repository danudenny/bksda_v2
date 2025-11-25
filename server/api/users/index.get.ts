import prisma from "../../utils/db";
import { paginatedResponse, errorResponse } from "../../utils/response";
import { useAuth, requireAdmin } from "../../utils/auth";

export default defineEventHandler(async (event) => {
  try {
    const user = useAuth(event);
    requireAdmin(user);

    const query = getQuery(event);
    const page = Math.max(1, parseInt(query.page as string) || 1);
    const limit = Math.min(100, parseInt(query.limit as string) || 10);
    const skip = (page - 1) * limit;
    const search = (query.search as string) || "";

    const where: any = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
      ];
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          isActive: true,
          createdAt: true,
          updatedAt: true,
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.user.count({ where }),
    ]);

    return paginatedResponse(
      users,
      total,
      page,
      limit,
      "Users retrieved successfully"
    );
  } catch (error: any) {
    console.error("Get users error:", error);
    return errorResponse("Failed to retrieve users", error.message);
  }
});
