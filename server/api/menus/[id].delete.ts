import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    try {
        const id = event.context.params?.id;

        await prisma.menu.delete({
            where: { id },
        });

        return {
            success: true,
        };
    } catch (error) {
        console.error('Error deleting menu:', error);
        throw createError({
            statusCode: 500,
            statusMessage: 'Internal Server Error',
        });
    }
});
