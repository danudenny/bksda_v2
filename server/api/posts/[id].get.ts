import prisma from "../../utils/db";
import { successResponse, errorResponse } from "../../utils/response";

export default defineEventHandler(async (event) => {
  try {
    const idOrSlug = getRouterParam(event, "id");

    if (!idOrSlug) {
      return errorResponse("Post ID or slug is required");
    }

    const post = await prisma.$transaction(async (tx) => {
      const postToUpdate = await tx.post.findFirst({
        where: {
          OR: [{ id: idOrSlug }, { slug: idOrSlug }],
        },
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

      if (!postToUpdate) {
        return null;
      }

      return postToUpdate;
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
