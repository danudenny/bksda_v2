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
      return errorResponse("Post ID is required");
    }

    // Check if post exists
    const existing = await prisma.post.findUnique({
      where: { id },
    });

    if (!existing) {
      return errorResponse("Post not found");
    }

    // Delete post
    await prisma.post.delete({
      where: { id },
    });

    return successResponse("Post deleted successfully");
  } catch (error: any) {
    console.error("Delete post error:", error);
    return errorResponse("Failed to delete post", error.message);
  }
});
