import prisma from "../../../utils/db";
import { useAuth, requireAdmin } from "../../../utils/auth";
import { generateSlug } from "../../../utils/slug";
import { successResponse, errorResponse } from "../../../utils/response";

export default defineEventHandler(async (event) => {
  try {
    // Authenticate user
    const user = useAuth(event);
    requireAdmin(user);

    const id = getRouterParam(event, "id");
    if (!id) {
      return errorResponse("Location ID is required");
    }

    const body = await readBody(event);
    const { name, description, order, isActive } = body;

    // Check if location exists
    const existing = await prisma.kawasanLocation.findUnique({
      where: { id },
    });

    if (!existing) {
      return errorResponse("Location not found");
    }

    // Generate new slug if name changed
    let newSlug = existing.slug;
    if (name && name !== existing.name) {
      newSlug = generateSlug(name);

      // Check if slug already exists in this category
      const duplicate = await prisma.kawasanLocation.findFirst({
        where: {
          categoryId: existing.categoryId,
          slug: newSlug,
          id: { not: id },
        },
      });

      if (duplicate) {
        return errorResponse(
          "Location with this name already exists in this category",
        );
      }
    }

    // Update location
    const updated = await prisma.kawasanLocation.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(description !== undefined && { description }),
        ...(order !== undefined && { order }),
        ...(isActive !== undefined && { isActive }),
        ...(newSlug !== existing.slug && { slug: newSlug }),
      },
    });

    return successResponse("Location updated successfully", updated);
  } catch (error: any) {
    console.error("Update location error:", error);
    return errorResponse("Failed to update location", error.message);
  }
});
