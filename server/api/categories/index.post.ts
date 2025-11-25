import prisma from "../../utils/db";
import { useAuth, requireAdmin } from "../../utils/auth";
import { generateSlug, generateUniqueSlug } from "../../utils/slug";
import { successResponse, errorResponse } from "../../utils/response";

export default defineEventHandler(async (event) => {
  try {
    // Authenticate user
    const user = useAuth(event);
    requireAdmin(user);

    const body = await readBody(event);
    const { name, description, color } = body;

    // Validation
    if (!name) {
      return errorResponse("Category name is required");
    }

    // Check if category already exists
    const existing = await prisma.category.findUnique({
      where: { name },
    });

    if (existing) {
      return errorResponse("Category with this name already exists");
    }

    // Generate slug
    const baseSlug = generateSlug(name);
    const slug = await generateUniqueSlug(baseSlug, async (s) => {
      const found = await prisma.category.findUnique({
        where: { slug: s },
      });
      return !!found;
    });

    // Create category
    const category = await prisma.category.create({
      data: {
        name,
        slug,
        description: description || null,
        color: color || null,
      },
    });

    return successResponse("Category created successfully", category);
  } catch (error: any) {
    console.error("Create category error:", error);
    return errorResponse("Failed to create category", error.message);
  }
});
