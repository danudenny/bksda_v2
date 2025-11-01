import prisma from "../../utils/db";
import { successResponse, errorResponse } from "../../utils/response";

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const row = query.row as string | undefined;

    let whereClause: any = { isActive: true };
    if (row && ["ROW_1", "ROW_2", "ROW_3"].includes(row)) {
      whereClause.row = row;
    }

    const images = await prisma.galleryImage.findMany({
      where: whereClause,
      orderBy: { order: "asc" },
    });

    return successResponse("Gallery images retrieved successfully", images);
  } catch (error: any) {
    console.error("Get gallery images error:", error);
    return errorResponse("Failed to retrieve gallery images", error.message);
  }
});
