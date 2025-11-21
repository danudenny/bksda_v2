import { requireAdmin, useAuth } from '../../../utils/auth';
import prisma from '../../../utils/db';
import { errorResponse, successResponse } from '../../../utils/response';
import { generateSlug } from '../../../utils/slug';

export default defineEventHandler(async (event) => {
    try {
        // Authenticate user
        const user = useAuth(event);
        requireAdmin(user);

        const body = await readBody(event);
        const {
            name,
            categoryId,
            description,
            content,
            imageUrl,
            latitude,
            longitude,
            order,
        } = body;

        // Validation
        if (!name || !categoryId) {
            return errorResponse('Name and category ID are required');
        }

        // Check if category exists
        const category = await prisma.kawasanCategory.findUnique({
            where: { id: categoryId },
        });

        if (!category) {
            return errorResponse('Category not found');
        }

        // Generate slug
        const slug = generateSlug(name);

        // Check if slug already exists in this category
        const existing = await prisma.kawasanLocation.findFirst({
            where: {
                categoryId,
                slug,
            },
        });

        if (existing) {
            return errorResponse(
                'Location with this name already exists in this category'
            );
        }

        // Create location
        const location = await prisma.kawasanLocation.create({
            data: {
                name,
                slug,
                categoryId,
                description: description || null,
                content: content || null,
                imageUrl: imageUrl || null,
                latitude:
                    latitude !== undefined &&
                    latitude !== null &&
                    latitude !== ''
                        ? Number(latitude)
                        : null,
                longitude:
                    longitude !== undefined &&
                    longitude !== null &&
                    longitude !== ''
                        ? Number(longitude)
                        : null,
                order: order ? Number(order) : 0,
                isActive: true,
            },
        });

        return successResponse('Location created successfully', location);
    } catch (error: any) {
        console.error('Create location error:', error);
        return errorResponse('Failed to create location', error.message);
    }
});
