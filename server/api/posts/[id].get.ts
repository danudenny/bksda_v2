import prisma from "../../utils/db";
import { successResponse, errorResponse } from "../../utils/response";

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, "id");

    if (!id) {
      return errorResponse("Post ID is required");
    }

    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        category: true,
      },
    });

    if (!post) {
      return errorResponse("Post not found");
    }

    return successResponse("Post retrieved successfully", post);
  } catch (error: any) {
    console.error("Get post error:", error);
    return errorResponse("Failed to retrieve post", error.message);
  }
});
