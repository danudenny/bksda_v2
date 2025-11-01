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
      return errorResponse("Announcement ID is required");
    }

    // Check if announcement exists
    const existing = await prisma.announcement.findUnique({
      where: { id },
    });

    if (!existing) {
      return errorResponse("Announcement not found");
    }

    // Delete announcement
    await prisma.announcement.delete({
      where: { id },
    });

    return successResponse("Announcement deleted successfully");
  } catch (error: any) {
    console.error("Delete announcement error:", error);
    return errorResponse("Failed to delete announcement", error.message);
  }
});
