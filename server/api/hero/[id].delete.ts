import prisma from "../../utils/db";
import { useAuth, requireAdmin } from "../../utils/auth";
import { successResponse, errorResponse } from "../../utils/response";

export default defineEventHandler(async (event) => {
  try {
    const user = useAuth(event);
    requireAdmin(user);
    const id = getRouterParam(event, 'id');

    await prisma.heroSlide.delete({
      where: { id },
    });

    return successResponse("Hero slide deleted successfully");
  } catch (error: any) {
    console.error("Delete hero slide error:", error);
    return errorResponse("Failed to delete hero slide", error.message);
  }
});
