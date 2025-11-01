import prisma from "../../utils/db";
import { successResponse, errorResponse } from "../../utils/response";

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, "id");

    if (!id) {
      return errorResponse("Species ID is required");
    }

    const species = await prisma.fokusKonservasi.findUnique({
      where: { id },
    });

    if (!species) {
      return errorResponse("Species not found");
    }

    return successResponse("Species retrieved successfully", species);
  } catch (error: any) {
    console.error("Get species error:", error);
    return errorResponse("Failed to retrieve species", error.message);
  }
});
