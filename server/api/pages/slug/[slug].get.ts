import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    try {
        const slug = event.context.params?.slug;

        const page = await prisma.page.findUnique({
            where: { slug },
        });

        if (!page) {
            throw createError({
                statusCode: 404,
                statusMessage: 'Page not found',
            });
        }

        if (!page.published) {
            // Optional: Check if user is admin to allow preview
            // For now, just 404
            throw createError({
                statusCode: 404,
                statusMessage: 'Page not found',
            });
        }

        return page;
    } catch (error: any) {
        console.error('Error fetching page by slug:', error);
        throw createError({
            statusCode: error.statusCode || 500,
            statusMessage: error.statusMessage || 'Internal Server Error',
        });
    }
});
