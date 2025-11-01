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
      return errorResponse("Species ID is required");
    }

    // Check if species exists
    const existing = await prisma.fokusKonservasi.findUnique({
      where: { id },
    });

    if (!existing) {
      return errorResponse("Species not found");
    }

    // Delete species
    await prisma.fokusKonservasi.delete({
      where: { id },
    });

    return successResponse("Species deleted successfully");
  } catch (error: any) {
    console.error("Delete species error:", error);
    return errorResponse("Failed to delete species", error.message);
  }
});
