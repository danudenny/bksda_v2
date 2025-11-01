import prisma from "../../utils/db";
import { useAuth, requireAdmin } from "../../utils/auth";
import { validateAnnouncementData } from "../../utils/validation";
import { successResponse, errorResponse } from "../../utils/response";

export default defineEventHandler(async (event) => {
  try {
    // Authenticate user
    const user = useAuth(event);
    requireAdmin(user);

    const body = await readBody(event);
    const { title, date, category, href, order } = body;

    // Validate data
    const validationErrors = validateAnnouncementData({
      title,
      date,
      category,
      href,
    });
    if (validationErrors.length > 0) {
      return errorResponse("Validation failed", validationErrors);
    }

    // Create announcement
    const announcement = await prisma.announcement.create({
      data: {
        title,
        date,
        category,
        href,
        order: order || 0,
        isActive: true,
      },
    });

    return successResponse("Announcement created successfully", announcement);
  } catch (error: any) {
    console.error("Create announcement error:", error);
    return errorResponse("Failed to create announcement", error.message);
  }
});
