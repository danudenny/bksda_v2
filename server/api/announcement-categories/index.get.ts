import prisma from '../../utils/db';
import { successResponse, errorResponse } from '../../utils/response';

export default defineEventHandler(async (event) => {
  try {
    const categories = await prisma.announcementCategory.findMany({
      orderBy: { name: 'asc' },
    });
    return successResponse('Categories retrieved successfully', categories);
  } catch (error: any) {
    console.error('Get announcement categories error:', error);
    return errorResponse('Failed to retrieve categories', error.message);
  }
});
