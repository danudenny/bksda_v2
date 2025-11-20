import prisma from "../../utils/db";
import { useAuth, requireAdmin } from "../../utils/auth";
import { successResponse, errorResponse } from "../../utils/response";

export default defineEventHandler(async (event) => {
  try {
    const user = useAuth(event);
    requireAdmin(user);

    const body = await readBody(event);
    
    const slide = await prisma.heroSlide.create({
      data: {
        name: body.name,
        type: body.type,
        location: body.location,
        imageUrl: body.imageUrl,
        description: body.description,
        order: body.order !== undefined ? parseInt(body.order) : 0,
        isActive: body.isActive !== undefined ? body.isActive : true,
      },
    });

    return successResponse("Hero slide created successfully", slide);
  } catch (error: any) {
    console.error("Create hero slide error:", error);
    return errorResponse("Failed to create hero slide", error.message);
  }
});
