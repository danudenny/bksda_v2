import prisma from '../../utils/db';
import { successResponse, errorResponse } from '../../utils/response';

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id');
    if (!id) {
      return errorResponse('Category ID is required');
    }

    await prisma.announcementCategory.delete({ where: { id } });

    return successResponse('Category deleted successfully', null);
  } catch (error: any) {
    console.error('Delete announcement category error:', error);
    return errorResponse('Failed to delete category', error.message);
  }
});
