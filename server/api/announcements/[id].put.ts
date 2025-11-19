import prisma from "../../utils/db";
import { useAuth, requireAdmin } from "../../utils/auth";
import { validateAnnouncementData } from "../../utils/validation";
import { successResponse, errorResponse } from "../../utils/response";

export default defineEventHandler(async (event) => {
  try {
    // Authenticate user
    const user = useAuth(event);
    requireAdmin(user);

    const id = getRouterParam(event, "id");
    if (!id) {
      return errorResponse("Announcement ID is required");
    }

    const body = await readBody(event);
    const { title, date, categoryId, content, order, isActive } = body;

    // Check if announcement exists
    const existing = await prisma.announcement.findUnique({
      where: { id },
    });

    if (!existing) {
      return errorResponse("Announcement not found");
    }

    // Validate data if provided
    if (title || date || categoryId || content) {
      const validationErrors = validateAnnouncementData({
        title: title || existing.title,
        date: date || existing.date,
        categoryId: categoryId || existing.categoryId,
        content: content || existing.content,
      });
      if (validationErrors.length > 0) {
        return errorResponse("Validation failed", validationErrors);
      }
    }

    // Update announcement
    const updated = await prisma.announcement.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(date && { date }),
        ...(categoryId && { categoryId }),
        ...(content && { content }),
        ...(order !== undefined && { order }),
        ...(isActive !== undefined && { isActive }),
      },
    });

    return successResponse("Announcement updated successfully", updated);
  } catch (error: any) {
    console.error("Update announcement error:", error);
    return errorResponse("Failed to update announcement", error.message);
  }
});
