import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function slugify(text: string) {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-');
}

export default defineEventHandler(async (event) => {
    try {
        const id = event.context.params?.id;
        const body = await readBody(event);
        const { title, slug, content, published, blocks } = body;

        const finalSlug = slug ? slugify(slug) : slugify(title);

        // Check for duplicate slug if changed
        if (slug) {
            const existing = await prisma.page.findFirst({
                where: {
                    slug: finalSlug,
                    NOT: { id },
                },
            });

            if (existing) {
                throw createError({
                    statusCode: 400,
                    statusMessage: 'Slug already exists',
                });
            }
        }

        const page = await prisma.page.update({
            where: { id },
            data: {
                title,
                slug: finalSlug,
                content,
                blocks,
                published,
            },
        });

        return {
            success: true,
            data: page,
        };
    } catch (error: any) {
        console.error('Error updating page:', error);
        throw createError({
            statusCode: error.statusCode || 500,
            statusMessage: error.statusMessage || 'Internal Server Error',
        });
    }
});
