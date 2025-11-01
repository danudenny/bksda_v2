import prisma from "../../../utils/db";
import { useAuth, requireAdmin } from "../../../utils/auth";
import { generateSlug, generateUniqueSlug } from "../../../utils/slug";
import { successResponse, errorResponse } from "../../../utils/response";

export default defineEventHandler(async (event) => {
  try {
    // Authenticate user
    const user = useAuth(event);
    requireAdmin(user);

    const body = await readBody(event);
    const { name, description, imageUrl, order } = body;

    // Validation
    if (!name || !description || !imageUrl) {
      return errorResponse("Name, description, and image URL are required");
    }

    // Generate slug
    const baseSlug = generateSlug(name);
    const slug = await generateUniqueSlug(baseSlug, async (s) => {
      const existing = await prisma.kawasanCategory.findUnique({
        where: { slug: s },
      });
      return !!existing;
    });

    // Create category
    const category = await prisma.kawasanCategory.create({
      data: {
        name,
        slug,
        description,
        imageUrl,
        order: order || 0,
        isActive: true,
      },
    });

    return successResponse("Category created successfully", category);
  } catch (error: any) {
    console.error("Create category error:", error);
    return errorResponse("Failed to create category", error.message);
  }
});
