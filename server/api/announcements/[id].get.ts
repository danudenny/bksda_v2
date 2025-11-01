import prisma from "../../utils/db";
import { successResponse, errorResponse } from "../../utils/response";

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, "id");

    if (!id) {
      return errorResponse("Announcement ID is required");
    }

    const announcement = await prisma.announcement.findUnique({
      where: { id },
    });

    if (!announcement) {
      return errorResponse("Announcement not found");
    }

    return successResponse("Announcement retrieved successfully", announcement);
  } catch (error: any) {
    console.error("Get announcement error:", error);
    return errorResponse("Failed to retrieve announcement", error.message);
  }
});
