import { promises as fs } from 'fs';
import path from 'path';
import { errorResponse, successResponse } from '../../utils/response';

export default defineEventHandler(async (event) => {
    try {
        const query = getQuery(event) as any;
        // Map Cloudinary folder structure to local if needed, or just use as is
        let folderParam = query.folder || '';

        // Simple mapping: if it contains 'bksda_v2/uploads', map to 'public/uploads'
        // or if it's just a subfolder name like 'posts', map to 'public/uploads/posts'
        let localFolder = 'public/uploads';
        if (folderParam && folderParam !== 'bksda_v2/uploads') {
            // If param is like "bksda_v2/uploads/posts", extract "posts"
            const parts = folderParam.split('/');
            const lastPart = parts[parts.length - 1];
            if (lastPart !== 'uploads') {
                localFolder = `public/uploads/${lastPart}`;
            }
        }

        const q = (query.q as string) || '';
        const limit = Math.min(100, parseInt(query.limit as string) || 50);
        // Simple pagination: nextCursor is just the index/offset
        const offset = parseInt((query.nextCursor as string) || '0');

        const uploadDir = path.join(process.cwd(), localFolder);

        // Check if directory exists
        try {
            await fs.access(uploadDir);
        } catch {
            return successResponse('Assets retrieved', {
                assets: [],
                nextCursor: null,
                totalCount: 0,
            });
        }

        const files = await fs.readdir(uploadDir);

        // Filter and map files
        let fileStats = await Promise.all(files.map(async (file) => {
            const filePath = path.join(uploadDir, file);
            try {
                const stat = await fs.stat(filePath);
                if (stat.isDirectory()) return null;
                return {
                    filename: file,
                    path: filePath,
                    created_at: stat.birthtime,
                    size: stat.size
                };
            } catch {
                return null;
            }
        }));

        let assets = fileStats.filter((f): f is NonNullable<typeof f> => f !== null);

        // Sort by created_at desc
        assets.sort((a, b) => b.created_at.getTime() - a.created_at.getTime());

        // Apply search "q" (simple filename contains)
        if (q) {
            assets = assets.filter(a => a.filename.toLowerCase().includes(q.toLowerCase()));
        }

        const totalCount = assets.length;
        const pagedAssets = assets.slice(offset, offset + limit);

        const mappedAssets = pagedAssets.map(a => {
            // efficient way to get relative path?
            // localFolder is like "public/uploads/posts"
            // public URL is "/uploads/posts/filename"
            // Remove "public" from start
            const urlFolder = localFolder.startsWith('public') ? localFolder.substring(6) : localFolder;
            return {
                public_id: a.filename, // Use filename as ID
                url: `${urlFolder}/${a.filename}`,
                width: 0, // Unknown
                height: 0, // Unknown
                format: a.filename.split('.').pop(),
                bytes: a.size,
                created_at: a.created_at.toISOString(),
                folder: folderParam,
                filename: a.filename,
            };
        });

        const nextCursor = offset + limit < totalCount ? String(offset + limit) : null;

        return successResponse('Assets retrieved', {
            assets: mappedAssets,
            nextCursor: nextCursor,
            totalCount: totalCount,
        });

    } catch (err: any) {
        console.error('Local list assets error:', err);
        return errorResponse('Failed to retrieve assets', err.message || '');
    }
});
