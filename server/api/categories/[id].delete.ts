import prisma from "../../utils/db";
import { useAuth, requireAdmin } from "../../utils/auth";
import { successResponse, errorResponse } from "../../utils/response";

export default defineEventHandler(async (event) => {
  try {
    // Authenticate user
    const user = useAuth(event);
    requireAdmin(user);

    const id = getRouterParam(event, "id");
    if (!id) {
      return errorResponse("Category ID is required");
    }

    // Check if category exists
    const existing = await prisma.category.findUnique({
      where: { id },
    });

    if (!existing) {
      return errorResponse("Category not found");
    }

    // Check if category has posts
    const postCount = await prisma.post.count({
      where: { categoryId: id },
    });

    if (postCount > 0) {
      return errorResponse("Cannot delete category with existing posts");
    }

    // Delete category
    await prisma.category.delete({
      where: { id },
    });

    return successResponse("Category deleted successfully");
  } catch (error: any) {
    console.error("Delete category error:", error);
    return errorResponse("Failed to delete category", error.message);
  }
});
