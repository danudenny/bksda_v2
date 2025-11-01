import prisma from "../../utils/db";
import { generateAccessToken, verifyRefreshToken } from "../../utils/jwt";
import { successResponse, errorResponse } from "../../utils/response";

export default defineEventHandler(async (event) => {
  try {
    const refreshToken = getCookie(event, "refreshToken");

    if (!refreshToken) {
      return errorResponse("Refresh token not found");
    }

    // Verify refresh token
    const payload = verifyRefreshToken(refreshToken);
    if (!payload) {
      return errorResponse("Invalid or expired refresh token");
    }

    // Check if token exists in database
    const storedToken = await prisma.refreshToken.findUnique({
      where: { token: refreshToken },
    });

    if (!storedToken || storedToken.expiresAt < new Date()) {
      return errorResponse("Refresh token has expired");
    }

    // Get user
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
    });

    if (!user || !user.isActive) {
      return errorResponse("User not found or inactive");
    }

    // Generate new access token
    const newAccessToken = generateAccessToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    return successResponse("Token refreshed successfully", {
      accessToken: newAccessToken,
    });
  } catch (error: any) {
    console.error("Token refresh error:", error);
    return errorResponse("Token refresh failed", error.message);
  }
});
