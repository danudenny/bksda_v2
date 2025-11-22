import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    try {
        const menus = await prisma.menu.findMany({
            where: {
                parentId: null,
            },
            include: {
                page: true,
                children: {
                    include: {
                        page: true,
                        children: {
                            include: {
                                page: true,
                            },
                        },
                    },
                    orderBy: {
                        order: 'asc',
                    },
                },
            },
            orderBy: {
                order: 'asc',
            },
        });

        return {
            success: true,
            data: menus,
        };
    } catch (error) {
        console.error('Error fetching menus:', error);
        throw createError({
            statusCode: 500,
            statusMessage: 'Internal Server Error',
        });
    }
});
