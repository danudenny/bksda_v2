import prisma from '../../utils/db';
import { errorResponse, paginatedResponse } from '../../utils/response';

export default defineEventHandler(async (event) => {
    try {
        const query = getQuery(event);

        // 1. Parsing Parameter Pagination
        const page = Math.max(1, parseInt(query.page as string) || 1);
        const limit = Math.max(1, parseInt(query.limit as string) || 10); // Remove 100 limit cap
        const skip = (page - 1) * limit;

        // 2. Parsing Filter
        const search = query.search as string;
        const published = query.published === 'true';
        // Ambil category_ids dari query params (format: "id1,id2")
        const categoryIds = query.category_ids
            ? (query.category_ids as string).split(',')
            : [];

        // 3. Membangun Where Clause (Dynamic Filtering)
        const whereClause: any = {};

        // Search Filter
        if (search) {
            whereClause.OR = [
                { title: { contains: search } }, // Default prisma contains is case-insensitive in some DBs, but explicit mode might be needed depending on DB provider. Assuming default for now.
                { slug: { contains: search } },
            ];
        }

        // Filter Published
        if (query.published !== undefined && query.published !== 'all') {
            whereClause.published = published;
        }

        // Filter Category (TAMBAHAN PENTING)
        // Jika ada category_ids yang dikirim, filter berdasarkan array tersebut
        if (categoryIds.length > 0 && categoryIds[0] !== 'all') {
            whereClause.categoryId = {
                in: categoryIds,
            };
        }

        // 4. Eksekusi Database (Parallel)
        const [posts, total, globalTotal, globalPublished] = await Promise.all([
            prisma.post.findMany({
                where: whereClause,
                include: {
                    author: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            role: true, // Pastikan role diambil untuk ditampilkan di UI
                        },
                    },
                    category: true,
                },
                orderBy: { createdAt: 'desc' }, // Urutkan dari yang terbaru
                skip,
                take: limit,
            }),
            prisma.post.count({ where: whereClause }),
            prisma.post.count(), // Global Total
            prisma.post.count({ where: { published: true } }), // Global Published
        ]);

        const globalDraft = globalTotal - globalPublished;

        // 5. Return Response
        const response = paginatedResponse(
            posts,
            total,
            page,
            limit,
            'Posts retrieved successfully'
        );

        return {
            ...response,
            stats: {
                total: globalTotal,
                published: globalPublished,
                draft: globalDraft,
            },
        };
    } catch (error: any) {
        console.error('Get posts error:', error);
        return errorResponse('Failed to retrieve posts', error.message);
    }
});
