import prisma from "../../utils/db";
import { useAuth } from "../../utils/auth";
import { generateSlug, generateUniqueSlug } from "../../utils/slug";
import { validatePostData } from "../../utils/validation";
import { successResponse, errorResponse } from "../../utils/response";
import { readMultipartFormData } from 'h3';
import { uploadToS3 } from "../../utils/s3";

export default defineEventHandler(async (event) => {
  try {
    const user = useAuth(event);
    const body = await readMultipartFormData(event);
    if (!body) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
        data: errorResponse('No data provided')
      });
    }

    const title = body.find(item => item.name === 'title')?.data.toString() || '';
    const slug = body.find(item => item.name === 'slug')?.data.toString() || '';
    const content = body.find(item => item.name === 'content')?.data.toString() || '';
    const excerpt = body.find(item => item.name === 'excerpt')?.data.toString();
    const categoryId = body.find(item => item.name === 'categoryId')?.data.toString() || '';
    const published = body.find(item => item.name === 'published')?.data.toString() === 'true';
    const imageFile = body.find(item => item.name === 'image');

    let imageUrl = body.find(item => item.name === 'imageUrl')?.data.toString();

    if (imageFile && imageFile.data) {
      try {
        imageUrl = await uploadToS3(imageFile.data, 'posts', imageFile.type);
      } catch (error) {
        console.error("Failed to upload post image:", error);
        throw new Error("Failed to upload image");
      }
    }

    const validationErrors = validatePostData({ title, content, categoryId, imageUrl });
    if (validationErrors.length > 0) {
      return errorResponse("Validation failed", validationErrors);
    }

    const category = await prisma.category.findUnique({ where: { id: categoryId } });
    if (!category) {
      return errorResponse("Category not found");
    }

    const finalSlug = await generateUniqueSlug(slug, async (s) => !!(await prisma.post.findUnique({ where: { slug: s } })));

    const post = await prisma.post.create({
      data: {
        title,
        slug: finalSlug,
        content,
        excerpt,
        imageUrl,
        categoryId,
        authorId: user.userId,
        published,
        publishedAt: published ? new Date() : null,
      },
      include: {
        author: { select: { id: true, name: true, email: true } },
        category: true,
      },
    });

    return successResponse("Post created successfully", post);
  } catch (error: any) {
    console.error("Create post error:", error);
    return errorResponse("Failed to create post", error.message);
  }
});
