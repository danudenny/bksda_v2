import prisma from "../../utils/db";
import { successResponse, errorResponse } from "../../utils/response";
import { useAuth, requireAdmin } from "../../utils/auth";

export default defineEventHandler(async (event) => {
  try {
    const user = useAuth(event);
    requireAdmin(user);

    const id = getRouterParam(event, "id");
    if (!id) {
      return errorResponse("User ID is required");
    }

    // Prevent deleting yourself
    if (id === user.userId) {
      return errorResponse("You cannot delete your own account");
    }

    await prisma.user.delete({
      where: { id },
    });

    return successResponse("User deleted successfully");
  } catch (error: any) {
    console.error("Delete user error:", error);
    return errorResponse("Failed to delete user", error.message);
  }
});
