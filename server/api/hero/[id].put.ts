import prisma from "../../utils/db";
import { useAuth, requireAdmin } from "../../utils/auth";
import { successResponse, errorResponse } from "../../utils/response";

export default defineEventHandler(async (event) => {
  try {
    const user = useAuth(event);
    requireAdmin(user);
    const id = getRouterParam(event, 'id');
    const body = await readBody(event);

    // Prepare data object, handling order parsing if present
    const data: any = { ...body };
    if (data.order !== undefined) {
        data.order = parseInt(data.order);
    }
    // Remove id from data if it exists to avoid prisma error
    delete data.id;

    const slide = await prisma.heroSlide.update({
      where: { id },
      data,
    });

    return successResponse("Hero slide updated successfully", slide);
  } catch (error: any) {
    console.error("Update hero slide error:", error);
    return errorResponse("Failed to update hero slide", error.message);
  }
});
