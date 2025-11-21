import prisma from "../../../utils/db";
import { successResponse, errorResponse } from "../../../utils/response";

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, "id");
    const query = getQuery(event);
    const includeInactive = query.includeInactive === '1' || query.includeInactive === 'true';

    if (!id) {
      return errorResponse("Category ID is required");
    }

    const category = await prisma.kawasanCategory.findUnique({
      where: { id },
      include: {
        locations: {
          ...(includeInactive ? {} : { where: { isActive: true } }),
          orderBy: { order: "asc" },
        },
      },
    });

    if (!category) {
      return errorResponse("Category not found");
    }

    return successResponse("Category retrieved successfully", category);
  } catch (error: any) {
    console.error("Get category error:", error);
    return errorResponse("Failed to retrieve category", error.message);
  }
});
