import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    try {
        const pages = await prisma.page.findMany({
            orderBy: {
                updatedAt: 'desc',
            },
        });

        return {
            success: true,
            data: pages,
        };
    } catch (error) {
        console.error('Error fetching pages:', error);
        throw createError({
            statusCode: 500,
            statusMessage: 'Internal Server Error',
        });
    }
});
