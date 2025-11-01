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
      return errorResponse("Image ID is required");
    }

    // Check if image exists
    const existing = await prisma.galleryImage.findUnique({
      where: { id },
    });

    if (!existing) {
      return errorResponse("Gallery image not found");
    }

    // Delete image
    await prisma.galleryImage.delete({
      where: { id },
    });

    return successResponse("Gallery image deleted successfully");
  } catch (error: any) {
    console.error("Delete gallery image error:", error);
    return errorResponse("Failed to delete gallery image", error.message);
  }
});
