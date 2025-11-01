import prisma from "../../../utils/db";
import { successResponse, errorResponse } from "../../../utils/response";

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, "id");

    if (!id) {
      return errorResponse("Location ID is required");
    }

    const location = await prisma.kawasanLocation.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });

    if (!location) {
      return errorResponse("Location not found");
    }

    return successResponse("Location retrieved successfully", location);
  } catch (error: any) {
    console.error("Get location error:", error);
    return errorResponse("Failed to retrieve location", error.message);
  }
});
