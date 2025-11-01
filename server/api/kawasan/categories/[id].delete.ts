import prisma from "../../../utils/db";
import { useAuth, requireAdmin } from "../../../utils/auth";
import { successResponse, errorResponse } from "../../../utils/response";

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
    const existing = await prisma.kawasanCategory.findUnique({
      where: { id },
    });

    if (!existing) {
      return errorResponse("Category not found");
    }

    // Delete category (cascade will delete locations)
    await prisma.kawasanCategory.delete({
      where: { id },
    });

    return successResponse("Category deleted successfully");
  } catch (error: any) {
    console.error("Delete category error:", error);
    return errorResponse("Failed to delete category", error.message);
  }
});
