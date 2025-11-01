import prisma from "../../utils/db";
import { useAuth } from "../../utils/auth";
import { generateSlug, generateUniqueSlug } from "../../utils/slug";
import { validatePostData } from "../../utils/validation";
import { successResponse, errorResponse } from "../../utils/response";

export default defineEventHandler(async (event) => {
  try {
    // Authenticate user
    const user = useAuth(event);

    const body = await readBody(event);
    const { title, content, excerpt, categoryId, imageUrl, published } = body;

    // Validate data
    const validationErrors = validatePostData({
      title,
      content,
      categoryId,
      imageUrl,
    });
    if (validationErrors.length > 0) {
      return errorResponse("Validation failed", validationErrors);
    }

    // Check if category exists
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      return errorResponse("Category not found");
    }

    // Generate slug
    const baseSlug = generateSlug(title);
    const slug = await generateUniqueSlug(baseSlug, async (s) => {
      const existing = await prisma.post.findUnique({
        where: { slug: s },
      });
      return !!existing;
    });

    // Create post
    const post = await prisma.post.create({
      data: {
        title,
        slug,
        content,
        excerpt: excerpt || null,
        imageUrl,
        categoryId,
        authorId: user.userId,
        published: published || false,
        publishedAt: published ? new Date() : null,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        category: true,
      },
    });

    return successResponse("Post created successfully", post);
  } catch (error: any) {
    console.error("Create post error:", error);
    return errorResponse("Failed to create post", error.message);
  }
});
