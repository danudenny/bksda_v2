import prisma from "../../../utils/db";
import { useAuth, requireAdmin } from "../../../utils/auth";
import { generateSlug, generateUniqueSlug } from "../../../utils/slug";
import { successResponse, errorResponse } from "../../../utils/response";

export default defineEventHandler(async (event) => {
  try {
    // Authenticate user
    const user = useAuth(event);
    requireAdmin(user);

    const id = getRouterParam(event, "id");
    if (!id) {
      return errorResponse("Category ID is required");
    }

    const body = await readBody(event);
    const { name, description, imageUrl, order, isActive } = body;

    // Check if category exists
    const existing = await prisma.kawasanCategory.findUnique({
      where: { id },
    });

    if (!existing) {
      return errorResponse("Category not found");
    }

    // Generate new slug if name changed
    let newSlug = existing.slug;
    if (name && name !== existing.name) {
      const baseSlug = generateSlug(name);
      newSlug = await generateUniqueSlug(baseSlug, async (s) => {
        const found = await prisma.kawasanCategory.findUnique({
          where: { slug: s },
        });
        return !!found && found.id !== id;
      });
    }

    // Update category
    const updated = await prisma.kawasanCategory.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(description && { description }),
        ...(imageUrl && { imageUrl }),
        ...(order !== undefined && { order }),
        ...(isActive !== undefined && { isActive }),
        ...(newSlug !== existing.slug && { slug: newSlug }),
      },
    });

    return successResponse("Category updated successfully", updated);
  } catch (error: any) {
    console.error("Update category error:", error);
    return errorResponse("Failed to update category", error.message);
  }
});
