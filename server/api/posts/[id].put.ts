import prisma from "../../utils/db";
import { useAuth } from "../../utils/auth";
import { generateSlug, generateUniqueSlug } from "../../utils/slug";
import { successResponse, errorResponse } from "../../utils/response";
import { readMultipartFormData } from 'h3';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs/promises';

export default defineEventHandler(async (event) => {
  try {
    const user = useAuth(event);
    const id = getRouterParam(event, "id");
    if (!id) return errorResponse("Post ID is required");

    const existing = await prisma.post.findUnique({ where: { id } });
    if (!existing) return errorResponse("Post not found");

    if (user.role !== "ADMIN" && existing.authorId !== user.userId) {
      return errorResponse("You can only edit your own posts");
    }

    const body = await readMultipartFormData(event);
    const title = body.find(item => item.name === 'title')?.data.toString();
    const content = body.find(item => item.name === 'content')?.data.toString();
    const excerpt = body.find(item => item.name === 'excerpt')?.data.toString();
    const categoryId = body.find(item => item.name === 'categoryId')?.data.toString();
    const published = body.find(item => item.name === 'published')?.data.toString() === 'true';
    const imageFile = body.find(item => item.name === 'image');
    let imageUrl = body.find(item => item.name === 'imageUrl')?.data.toString();

    if (imageFile && imageFile.data) {
      const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'posts');
      await fs.mkdir(uploadsDir, { recursive: true });
      const fileName = `${Date.now()}-${generateSlug(imageFile.filename || 'image')}.avif`;
      const filePath = path.join(uploadsDir, fileName);
      await sharp(imageFile.data).toFormat('avif', { quality: 80 }).toFile(filePath);
      imageUrl = `/uploads/posts/${fileName}`;
    }

    if (categoryId) {
      const category = await prisma.category.findUnique({ where: { id: categoryId } });
      if (!category) return errorResponse("Category not found");
    }

    let newSlug = existing.slug;
    if (title && title !== existing.title) {
      const baseSlug = generateSlug(title);
      newSlug = await generateUniqueSlug(baseSlug, async (s) => {
        const found = await prisma.post.findUnique({ where: { slug: s } });
        return !!found && found.id !== id;
      });
    }

    const updated = await prisma.post.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(content && { content }),
        ...(excerpt !== undefined && { excerpt }),
        ...(categoryId && { categoryId }),
        ...(imageUrl && { imageUrl }),
        ...(published !== undefined && { published, publishedAt: published && !existing.publishedAt ? new Date() : existing.publishedAt }),
        ...(newSlug !== existing.slug && { slug: newSlug }),
      },
      include: {
        author: { select: { id: true, name: true, email: true } },
        category: true,
      },
    });

    return successResponse("Post updated successfully", updated);
  } catch (error: any) {
    console.error("Update post error:", error);
    return errorResponse("Failed to update post", error.message);
  }
});
