import prisma from '../../../utils/db';
import { errorResponse, successResponse } from '../../../utils/response';

export default defineEventHandler(async (event) => {
    try {
        const query = getQuery(event);
        const { category, slug } = query;

        if (!category || !slug) {
            return errorResponse(
                'Category slug and Location slug are required'
            );
        }

        const location = await prisma.kawasanLocation.findFirst({
            where: {
                slug: String(slug),
                category: {
                    slug: String(category),
                },
                isActive: true,
            },
            include: {
                category: true,
            },
        });

        if (!location) {
            return errorResponse('Location not found');
        }

        return successResponse('Location retrieved successfully', location);
    } catch (error: any) {
        console.error('Get public location error:', error);
        return errorResponse('Failed to retrieve location', error.message);
    }
});
