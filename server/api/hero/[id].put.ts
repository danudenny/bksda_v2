import { requireAdmin, useAuth } from '../../utils/auth';
import { uploadToLocal } from '../../utils/file_storage';
import prisma from '../../utils/db';
import { errorResponse, successResponse } from '../../utils/response';
import { generateSlug } from '../../utils/slug';

export default defineEventHandler(async (event) => {
    try {
        const user = useAuth(event);
        requireAdmin(user);
        const id = getRouterParam(event, 'id');
        if (!id) return errorResponse('ID is required');

        const body = await readMultipartFormData(event);
        if (!body) return errorResponse('No data provided');

        const name = body.find((item) => item.name === 'name')?.data.toString();
        const type = body.find((item) => item.name === 'type')?.data.toString();
        const location = body
            .find((item) => item.name === 'location')
            ?.data.toString();
        let slug = body.find((item) => item.name === 'slug')?.data.toString();
        const description = body
            .find((item) => item.name === 'description')
            ?.data.toString();
        const order = body
            .find((item) => item.name === 'order')
            ?.data.toString();
        const isActiveStr = body
            .find((item) => item.name === 'isActive')
            ?.data.toString();
        const isActive =
            isActiveStr !== undefined ? isActiveStr === 'true' : undefined;

        // Auto-generate slug if not provided but name is present
        if (!slug && name) {
            slug = generateSlug(name);
        }

        const imageFile = body.find((item) => item.name === 'image');
        let imageUrl = body
            .find((item) => item.name === 'imageUrl')
            ?.data.toString();

        if (imageFile && imageFile.data && imageFile.data.length > 0) {
            try {
                imageUrl = await uploadToLocal(imageFile.data, 'hero-slides');
            } catch (error) {
                console.error('Failed to upload hero image:', error);
                throw new Error('Failed to upload image');
            }
        }

        // Prepare update data
        const updateData: any = {};
        if (name !== undefined) updateData.name = name;
        if (type !== undefined) updateData.type = type;
        if (location !== undefined) updateData.location = location;
        if (slug !== undefined) updateData.slug = slug;
        if (description !== undefined) updateData.description = description;
        if (imageUrl !== undefined) updateData.imageUrl = imageUrl;
        if (order !== undefined) updateData.order = parseInt(order);
        if (isActive !== undefined) updateData.isActive = isActive;

        const slide = await prisma.heroSlide.update({
            where: { id },
            data: updateData,
        });

        return successResponse('Hero slide updated successfully', slide);
    } catch (error: any) {
        console.error('Update hero slide error:', error);
        return errorResponse('Failed to update hero slide', error.message);
    }
});
