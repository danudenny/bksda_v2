import { requireAdmin, useAuth } from '../../utils/auth';
import { uploadToS3 } from '../../utils/s3';
import prisma from '../../utils/db';
import { errorResponse, successResponse } from '../../utils/response';
import { generateSlug } from '../../utils/slug';

export default defineEventHandler(async (event) => {
    try {
        const user = useAuth(event);
        requireAdmin(user);

        const body = await readMultipartFormData(event);
        if (!body) return errorResponse('No data provided');

        const name =
            body.find((item) => item.name === 'name')?.data.toString() || '';
        const type =
            body.find((item) => item.name === 'type')?.data.toString() || '';
        const location =
            body.find((item) => item.name === 'location')?.data.toString() ||
            '';
        let slug =
            body.find((item) => item.name === 'slug')?.data.toString() || null;
        const description =
            body.find((item) => item.name === 'description')?.data.toString() ||
            '';
        const order = body
            .find((item) => item.name === 'order')
            ?.data.toString();
        const isActive =
            body.find((item) => item.name === 'isActive')?.data.toString() ===
            'true';

        // Auto-generate slug if not provided
        if (!slug && name) {
            slug = generateSlug(name);
        }

        const imageFile = body.find((item) => item.name === 'image');
        let imageUrl =
            body.find((item) => item.name === 'imageUrl')?.data.toString() ||
            '';

        if (imageFile && imageFile.data && imageFile.data.length > 0) {
            try {
                imageUrl = await uploadToS3(imageFile.data, 'hero-slides', imageFile.type);
            } catch (error) {
                console.error('Failed to upload hero image:', error);
                throw new Error('Failed to upload image');
            }
        }

        const slide = await prisma.heroSlide.create({
            data: {
                name,
                type,
                location,
                slug,
                imageUrl,
                description,
                order: order ? parseInt(order) : 0,
                isActive,
            },
        });

        return successResponse('Hero slide created successfully', slide);
    } catch (error: any) {
        console.error('Create hero slide error:', error);
        return errorResponse('Failed to create hero slide', error.message);
    }
});
