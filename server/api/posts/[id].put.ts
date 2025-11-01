import prisma from "../../utils/db";
import { useAuth } from "../../utils/auth";
import { generateSlug, generateUniqueSlug } from "../../utils/slug";
import { successResponse, errorResponse } from "../../utils/response";

export default defineEventHandler(async (event) => {
  try {
    // Authenticate user
    const user = useAuth(event);

    const id = getRouterParam(event, "id");
    if (!id) {
      return errorResponse("Post ID is required");
    }

    const body = await readBody(event);
    const { title, content, excerpt, categoryId, imageUrl, published } = body;

    // Check if post exists
    const existing = await prisma.post.findUnique({
      where: { id },
    });

    if (!existing) {
      return errorResponse("Post not found");
    }

    // Check if user is author or admin
    if (user.role !== "ADMIN" && existing.authorId !== user.userId) {
      return errorResponse("You can only edit your own posts");
    }

    // Check if category exists if provided
    if (categoryId) {
      const category = await prisma.category.findUnique({
        where: { id: categoryId },
      });
      if (!category) {
        return errorResponse("Category not found");
      }
    }

    // Generate new slug if title changed
    let newSlug = existing.slug;
    if (title && title !== existing.title) {
      const baseSlug = generateSlug(title);
      newSlug = await generateUniqueSlug(baseSlug, async (s) => {
        const found = await prisma.post.findUnique({
          where: { slug: s },
        });
        return !!found && found.id !== id;
      });
    }

    // Update post
    const updated = await prisma.post.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(content && { content }),
        ...(excerpt !== undefined && { excerpt }),
        ...(categoryId && { categoryId }),
        ...(imageUrl && { imageUrl }),
        ...(published !== undefined && {
          published,
          publishedAt:
            published && !existing.publishedAt
              ? new Date()
              : existing.publishedAt,
        }),
        ...(newSlug !== existing.slug && { slug: newSlug }),
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

    return successResponse("Post updated successfully", updated);
  } catch (error: any) {
    console.error("Update post error:", error);
    return errorResponse("Failed to update post", error.message);
  }
});
