import prisma from "../../utils/db";
import { successResponse, errorResponse } from "../../utils/response";

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, "id");

    if (!id) {
      return errorResponse("Link ID is required");
    }

    const link = await prisma.externalLink.findUnique({
      where: { id },
    });

    if (!link) {
      return errorResponse("Link not found");
    }

    return successResponse("Link retrieved successfully", link);
  } catch (error: any) {
    console.error("Get link error:", error);
    return errorResponse("Failed to retrieve link", error.message);
  }
});
