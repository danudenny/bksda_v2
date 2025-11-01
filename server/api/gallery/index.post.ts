import prisma from "../../utils/db";
import { useAuth, requireAdmin } from "../../utils/auth";
import { successResponse, errorResponse } from "../../utils/response";

export default defineEventHandler(async (event) => {
  try {
    // Authenticate user
    const user = useAuth(event);
    requireAdmin(user);

    const body = await readBody(event);
    const { imageUrl, altText, row, order } = body;

    // Validation
    if (!imageUrl || !altText || !row) {
      return errorResponse("Image URL, alt text, and row are required");
    }

    if (!["ROW_1", "ROW_2", "ROW_3"].includes(row)) {
      return errorResponse("Row must be ROW_1, ROW_2, or ROW_3");
    }

    // Create gallery image
    const image = await prisma.galleryImage.create({
      data: {
        imageUrl,
        altText,
        row,
        order: order || 0,
        isActive: true,
      },
    });

    return successResponse("Gallery image created successfully", image);
  } catch (error: any) {
    console.error("Create gallery image error:", error);
    return errorResponse("Failed to create gallery image", error.message);
  }
});
