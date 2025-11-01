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
      return errorResponse("Link ID is required");
    }

    // Check if link exists
    const existing = await prisma.externalLink.findUnique({
      where: { id },
    });

    if (!existing) {
      return errorResponse("Link not found");
    }

    // Delete link
    await prisma.externalLink.delete({
      where: { id },
    });

    return successResponse("Link deleted successfully");
  } catch (error: any) {
    console.error("Delete link error:", error);
    return errorResponse("Failed to delete link", error.message);
  }
});
