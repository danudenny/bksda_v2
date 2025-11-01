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
      return errorResponse("Location ID is required");
    }

    // Check if location exists
    const existing = await prisma.kawasanLocation.findUnique({
      where: { id },
    });

    if (!existing) {
      return errorResponse("Location not found");
    }

    // Delete location
    await prisma.kawasanLocation.delete({
      where: { id },
    });

    return successResponse("Location deleted successfully");
  } catch (error: any) {
    console.error("Delete location error:", error);
    return errorResponse("Failed to delete location", error.message);
  }
});
