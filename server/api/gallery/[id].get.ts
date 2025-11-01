import prisma from "../../utils/db";
import { successResponse, errorResponse } from "../../utils/response";

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, "id");

    if (!id) {
      return errorResponse("Image ID is required");
    }

    const image = await prisma.galleryImage.findUnique({
      where: { id },
    });

    if (!image) {
      return errorResponse("Gallery image not found");
    }

    return successResponse("Gallery image retrieved successfully", image);
  } catch (error: any) {
    console.error("Get gallery image error:", error);
    return errorResponse("Failed to retrieve gallery image", error.message);
  }
});
