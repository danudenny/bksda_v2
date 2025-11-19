import prisma from '../../utils/db';
import { successResponse, errorResponse } from '../../utils/response';
import { generateSlug, generateUniqueSlug } from '../../utils/slug';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { name } = body;

    if (!name) {
      return errorResponse('Name is required');
    }

    const baseSlug = generateSlug(name);
    const slug = await generateUniqueSlug(baseSlug, async (s) => {
      const existing = await prisma.announcementCategory.findUnique({ where: { slug: s } });
      return !!existing;
    });

    const category = await prisma.announcementCategory.create({
      data: { name, slug },
    });

    return successResponse('Category created successfully', category);
  } catch (error: any) {
    console.error('Create announcement category error:', error);
    return errorResponse('Failed to create category', error.message);
  }
});
