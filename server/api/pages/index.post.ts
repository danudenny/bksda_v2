import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function slugify(text: string) {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(/[^\w\-]+/g, '') // Remove all non-word chars
        .replace(/\-\-+/g, '-'); // Replace multiple - with single -
}

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);
        const { title, slug, content, published, blocks } = body;

        const finalSlug = slug ? slugify(slug) : slugify(title);

        // Check for duplicate slug
        const existing = await prisma.page.findUnique({
            where: { slug: finalSlug },
        });

        if (existing) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Slug already exists',
            });
        }

        const page = await prisma.page.create({
            data: {
                title,
                slug: finalSlug,
                content,
                blocks: blocks ?? [],
                published: published ?? false,
            },
        });

        return {
            success: true,
            data: page,
        };
    } catch (error: any) {
        console.error('Error creating page:', error);
        throw createError({
            statusCode: error.statusCode || 500,
            statusMessage: error.statusMessage || 'Internal Server Error',
        });
    }
});
