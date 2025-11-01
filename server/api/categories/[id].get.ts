import prisma from "../../utils/db";
import { successResponse, errorResponse } from "../../utils/response";

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, "id");

    if (!id) {
      return errorResponse("Category ID is required");
    }

    const category = await prisma.category.findUnique({
      where: { id },
      include: {
        posts: {
          select: {
            id: true,
            title: true,
            slug: true,
          },
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
