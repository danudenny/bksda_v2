import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);
        const { label, type, href, pageId, parentId, icon, order, isActive } =
            body;

        const menu = await prisma.menu.create({
            data: {
                label,
                type,
                href: href || null,
                pageId: pageId || null,
                parentId: parentId || null,
                icon: icon || null,
                order: parseInt(order) || 0,
                isActive: isActive ?? true,
            },
        });

        return {
            success: true,
            data: menu,
        };
    } catch (error) {
        console.error('Error creating menu:', error);
        throw createError({
            statusCode: 500,
            statusMessage: 'Internal Server Error',
        });
    }
});
