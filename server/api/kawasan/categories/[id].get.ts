import prisma from '../../../utils/db';
import { errorResponse, successResponse } from '../../../utils/response';

export default defineEventHandler(async (event) => {
    try {
        const idOrSlug = getRouterParam(event, 'id');
        const query = getQuery(event);
        const includeInactive =
            query.includeInactive === '1' || query.includeInactive === 'true';

        if (!idOrSlug) {
            return errorResponse('Category ID or Slug is required');
        }

        let category = await prisma.kawasanCategory.findUnique({
            where: { id: idOrSlug },
            include: {
                locations: {
                    ...(includeInactive ? {} : { where: { isActive: true } }),
                    orderBy: { order: 'asc' },
                },
            },
        });

        if (!category) {
            category = await prisma.kawasanCategory.findUnique({
                where: { slug: idOrSlug },
                include: {
                    locations: {
                        ...(includeInactive
                            ? {}
                            : { where: { isActive: true } }),
                        orderBy: { order: 'asc' },
                    },
                },
            });
        }

        if (!category) {
            return errorResponse('Category not found');
        }

        return successResponse('Category retrieved successfully', category);
    } catch (error: any) {
        console.error('Get category error:', error);
        return errorResponse('Failed to retrieve category', error.message);
    }
});
