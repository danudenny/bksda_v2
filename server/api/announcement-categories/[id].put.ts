import prisma from '../../utils/db';
import { successResponse, errorResponse } from '../../utils/response';
import { generateSlug, generateUniqueSlug } from '../../utils/slug';

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id');
    if (!id) {
      return errorResponse('Category ID is required');
    }

    const body = await readBody(event);
    const { name } = body;

    if (!name) {
      return errorResponse('Name is required');
    }

    const existing = await prisma.announcementCategory.findUnique({ where: { id } });
    if (!existing) {
      return errorResponse('Category not found');
    }

    let newSlug = existing.slug;
    if (name !== existing.name) {
      const baseSlug = generateSlug(name);
      newSlug = await generateUniqueSlug(baseSlug, async (s) => {
        const found = await prisma.announcementCategory.findUnique({ where: { slug: s } });
        return !!found && found.id !== id;
      });
    }

    const category = await prisma.announcementCategory.update({
      where: { id },
      data: { name, slug: newSlug },
    });

    return successResponse('Category updated successfully', category);
  } catch (error: any) {
    console.error('Update announcement category error:', error);
    return errorResponse('Failed to update category', error.message);
  }
});
