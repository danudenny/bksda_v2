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

    const body = await readBody(event);
    const { imageUrl, altText, row, order, isActive } = body;

    // Check if image exists
    const existing = await prisma.galleryImage.findUnique({
      where: { id },
    });

    if (!existing) {
      return errorResponse("Gallery image not found");
    }

    // Validate row if provided
    if (row && !["ROW_1", "ROW_2", "ROW_3"].includes(row)) {
      return errorResponse("Row must be ROW_1, ROW_2, or ROW_3");
    }

    // Update image
    const updated = await prisma.galleryImage.update({
      where: { id },
      data: {
        ...(imageUrl && { imageUrl }),
        ...(altText && { altText }),
        ...(row && { row }),
        ...(order !== undefined && { order }),
        ...(isActive !== undefined && { isActive }),
      },
    });

    return successResponse("Gallery image updated successfully", updated);
  } catch (error: any) {
    console.error("Update gallery image error:", error);
    return errorResponse("Failed to update gallery image", error.message);
  }
});
