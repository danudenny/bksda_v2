import prisma from "../../utils/db";
import { useAuth, requireAdmin } from "../../utils/auth";
import { validateExternalLinkData } from "../../utils/validation";
import { successResponse, errorResponse } from "../../utils/response";

export default defineEventHandler(async (event) => {
  try {
    // Authenticate user
    const user = useAuth(event);
    requireAdmin(user);

    const id = getRouterParam(event, "id");
    if (!id) {
      return errorResponse("Link ID is required");
    }

    const body = await readBody(event);
    const { title, subtitle, url, status, order, isActive } = body;

    // Check if link exists
    const existing = await prisma.externalLink.findUnique({
      where: { id },
    });

    if (!existing) {
      return errorResponse("Link not found");
    }

    // Validate data if provided
    if (title || subtitle || url) {
      const validationErrors = validateExternalLinkData({
        title: title || existing.title,
        subtitle: subtitle || existing.subtitle,
        url: url || existing.url,
      });
      if (validationErrors.length > 0) {
        return errorResponse("Validation failed", validationErrors);
      }
    }

    // Update link
    const updated = await prisma.externalLink.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(subtitle && { subtitle }),
        ...(url && { url }),
        ...(status && { status }),
        ...(order !== undefined && { order }),
        ...(isActive !== undefined && { isActive }),
      },
    });

    return successResponse("Link updated successfully", updated);
  } catch (error: any) {
    console.error("Update link error:", error);
    return errorResponse("Failed to update link", error.message);
  }
});
