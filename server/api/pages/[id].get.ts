import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    try {
        const id = event.context.params?.id;

        const page = await prisma.page.findUnique({
            where: { id },
        });

        if (!page) {
            throw createError({
                statusCode: 404,
                statusMessage: 'Page not found',
            });
        }

        return {
            success: true,
            data: page,
        };
    } catch (error: any) {
        console.error('Error fetching page:', error);
        throw createError({
            statusCode: error.statusCode || 500,
            statusMessage: error.statusMessage || 'Internal Server Error',
        });
    }
});
