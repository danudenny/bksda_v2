import prisma from "../../utils/db";
import { successResponse, errorResponse } from "../../utils/response";

export default defineEventHandler(async (event) => {
  try {
    const refreshToken = getCookie(event, "refreshToken");

    if (refreshToken) {
      // Delete refresh token from database
      await prisma.refreshToken
        .delete({
          where: { token: refreshToken },
        })
        .catch(() => {
          // Token might not exist, that's okay
        });
    }

    // Clear refresh token cookie
    deleteCookie(event, "refreshToken");

    return successResponse("Logout successful");
  } catch (error: any) {
    console.error("Logout error:", error);
    return errorResponse("Logout failed", error.message);
  }
});
