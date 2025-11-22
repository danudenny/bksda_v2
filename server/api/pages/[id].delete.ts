import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    try {
        const id = event.context.params?.id;

        await prisma.page.delete({
            where: { id },
        });

        return {
            success: true,
        };
    } catch (error) {
        console.error('Error deleting page:', error);
        throw createError({
            statusCode: 500,
            statusMessage: 'Internal Server Error',
        });
    }
});
