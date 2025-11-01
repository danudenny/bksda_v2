import prisma from "../../utils/db";
import { useAuth, requireAdmin } from "../../utils/auth";
import { validateExternalLinkData } from "../../utils/validation";
import { successResponse, errorResponse } from "../../utils/response";

export default defineEventHandler(async (event) => {
  try {
    // Authenticate user
    const user = useAuth(event);
    requireAdmin(user);

    const body = await readBody(event);
    const { title, subtitle, url, status, order } = body;

    // Validate data
    const validationErrors = validateExternalLinkData({ title, subtitle, url });
    if (validationErrors.length > 0) {
      return errorResponse("Validation failed", validationErrors);
    }

    // Create external link
    const link = await prisma.externalLink.create({
      data: {
        title,
        subtitle,
        url,
        status: status || "ACTIVE",
        order: order || 0,
        isActive: true,
      },
    });

    return successResponse("External link created successfully", link);
  } catch (error: any) {
    console.error("Create external link error:", error);
    return errorResponse("Failed to create external link", error.message);
  }
});
