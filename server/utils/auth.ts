import { verifyAccessToken } from "../utils/jwt";
import { errorResponse } from "../utils/response";
import type { H3Event } from "h3";

export interface AuthenticatedRequest {
  user?: {
    userId: string;
    email: string;
    role: string;
  };
}

/**
 * Middleware to verify JWT token from Authorization header
 */
export const useAuth = (event: H3Event) => {
  if (!event) {
    throw new Error("useAuth must be called with an event parameter");
  }

  const authHeader = event.node.req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
      data: errorResponse("Missing or invalid authorization header"),
    });
  }

  const token = authHeader.substring(7);
  const payload = verifyAccessToken(token);

  if (!payload) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
      data: errorResponse("Invalid or expired token"),
    });
  }

  return payload;
};

/**
 * Middleware to check if user has required role
 */
export const requireRole = (requiredRole: string) => {
  return (user: any) => {
    if (user.role !== requiredRole && user.role !== "ADMIN") {
      throw createError({
        statusCode: 403,
        statusMessage: "Forbidden",
        data: errorResponse(`This action requires ${requiredRole} role`),
      });
    }
  };
};

/**
 * Middleware to check if user is admin
 */
export const requireAdmin = (user: any) => {
  if (user.role !== "ADMIN") {
    throw createError({
      statusCode: 403,
      statusMessage: "Forbidden",
      data: errorResponse("This action requires admin privileges"),
    });
  }
};
