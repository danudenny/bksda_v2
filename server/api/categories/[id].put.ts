import prisma from "../../utils/db";
import { useAuth, requireAdmin } from "../../utils/auth";
import { generateSlug, generateUniqueSlug } from "../../utils/slug";
import { successResponse, errorResponse } from "../../utils/response";

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
    const { name, description } = body;

    // Check if category exists
    const existing = await prisma.category.findUnique({
      where: { id },
    });

    if (!existing) {
      return errorResponse("Category not found");
    }

    // Check if new name already exists
    if (name && name !== existing.name) {
      const duplicate = await prisma.category.findUnique({
        where: { name },
      });
      if (duplicate) {
        return errorResponse("Category with this name already exists");
      }
    }

    // Generate new slug if name changed
    let newSlug = existing.slug;
    if (name && name !== existing.name) {
      const baseSlug = generateSlug(name);
      newSlug = await generateUniqueSlug(baseSlug, async (s) => {
        const found = await prisma.category.findUnique({
          where: { slug: s },
        });
        return !!found && found.id !== id;
      });
    }

    // Update category
    const updated = await prisma.category.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(description !== undefined && { description }),
        ...(newSlug !== existing.slug && { slug: newSlug }),
      },
    });

    return successResponse("Category updated successfully", updated);
  } catch (error: any) {
    console.error("Update category error:", error);
    return errorResponse("Failed to update category", error.message);
  }
});
